const MAX_BODY_BYTES = 24_000;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function cleanText(value, max = 800) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function cleanArray(value, maxItems = 20, maxItemLength = 120) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim().slice(0, maxItemLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function cleanEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase().slice(0, 180);
  if (!email) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Método no permitido." });
  }

  const length = Number(req.headers["content-length"] || 0);
  if (length > MAX_BODY_BYTES) {
    return send(res, 413, { error: "La respuesta es demasiado extensa." });
  }

  const SUPABASE_URL = process.env.SURVEY_SUPABASE_URL;

  // Preferimos la clave Secret moderna de Supabase.
  // Dejamos fallback al service_role legacy para compatibilidad temporal.
  const SERVER_KEY =
    process.env.SURVEY_SUPABASE_SECRET_KEY ||
    process.env.SURVEY_SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVER_KEY) {
    console.error("Survey env vars are missing.");
    return send(res, 500, {
      error: "La encuesta todavía no está configurada en el servidor.",
    });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Honeypot anti-spam.
  if (cleanText(body.website, 100)) {
    return send(res, 200, { ok: true });
  }

  const profession = cleanText(body.profession, 100);
  const frequency = cleanText(body.frequency, 100);
  const betaInterest = cleanText(body.beta_interest, 80);
  const privacyAck = body.privacy_ack === true;

  if (!profession || !frequency || !betaInterest || !privacyAck) {
    return send(res, 400, { error: "Faltan respuestas obligatorias." });
  }

  const workAreas = cleanArray(body.work_areas, 12);
  const workflow = cleanArray(body.current_workflow, 12);
  const painPoints = cleanArray(body.pain_points, 16);
  const topFeatures = cleanArray(body.top_features, 3);

  if (
    !workAreas.length ||
    !workflow.length ||
    !painPoints.length ||
    !topFeatures.length
  ) {
    return send(res, 400, { error: "Faltan respuestas obligatorias." });
  }

  const attribution =
    body.attribution && typeof body.attribution === "object"
      ? body.attribution
      : {};

  const row = {
    profession,
    work_areas: workAreas,
    frequency,
    frequent_instruments: cleanText(body.frequent_instruments, 800) || null,
    current_workflow: workflow,
    pain_points: painPoints,
    top_features: topFeatures,
    requested_instruments: cleanText(body.requested_instruments, 800) || null,
    beta_interest: betaInterest,
    beta_email: cleanEmail(body.beta_email),
    privacy_ack: true,
    utm_source: cleanText(attribution.utm_source, 120) || null,
    utm_medium: cleanText(attribution.utm_medium, 120) || null,
    utm_campaign: cleanText(attribution.utm_campaign, 160) || null,
    utm_content: cleanText(attribution.utm_content, 160) || null,
    utm_term: cleanText(attribution.utm_term, 160) || null,
    campaign_segment: cleanText(attribution.campaign_segment, 120) || null,
    landing_url: cleanText(attribution.landing_url, 500) || null,
    referrer: cleanText(attribution.referrer, 500) || null,
  };

  try {
    const response = await fetch(
      `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/survey_psicometricos_responses`,
      {
        method: "POST",
        headers: {
          apikey: SERVER_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error(
        "Supabase survey insert failed:",
        response.status,
        detail,
      );
      return send(res, 500, {
        error: "No pudimos registrar la respuesta. Intentá nuevamente.",
      });
    }

    return send(res, 200, { ok: true });
  } catch (error) {
    console.error("Survey API error:", error);
    return send(res, 500, {
      error: "No pudimos registrar la respuesta. Intentá nuevamente.",
    });
  }
};
