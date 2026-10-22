const MAX_BODY_BYTES = 32_000;

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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Método no permitido." });
  }

  const length = Number(req.headers["content-length"] || 0);
  if (length > MAX_BODY_BYTES) return send(res, 413, { error: "La respuesta es demasiado extensa." });

  const SUPABASE_URL = process.env.SURVEY_SUPABASE_URL;
  const SERVER_KEY = process.env.SURVEY_SUPABASE_SECRET_KEY || process.env.SURVEY_SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVER_KEY) {
    console.error("Survey env vars are missing.");
    return send(res, 500, { error: "La encuesta todavía no está configurada en el servidor." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (cleanText(body.website, 100)) return send(res, 200, { ok: true });

  const profession = cleanText(body.profession, 100);
  const practiceMode = cleanText(body.practice_mode, 120);
  const forensicFrequency = cleanText(body.forensic_frequency, 100);
  const frequency = cleanText(body.frequency, 100);
  const processingTime = cleanText(body.processing_time, 100);
  const valueProposition = cleanText(body.value_proposition, 100);
  const paidToolStatus = cleanText(body.paid_tool_status, 120);
  const priceRange = cleanText(body.price_range, 120);
  const traceabilityImportance = Number(body.traceability_importance);
  const privacyAck = body.privacy_ack === true;

  const workAreas = cleanArray(body.work_areas, 12);
  const workflow = cleanArray(body.current_workflow, 12);
  const painPoints = cleanArray(body.pain_points, 16);
  const topFeatures = cleanArray(body.top_features, 3);

  if (
    !profession || !practiceMode || !workAreas.length || !forensicFrequency || !frequency ||
    !workflow.length || !processingTime || !painPoints.length || !Number.isInteger(traceabilityImportance) ||
    traceabilityImportance < 1 || traceabilityImportance > 5 || !topFeatures.length || !valueProposition ||
    !paidToolStatus || !priceRange || !privacyAck
  ) {
    return send(res, 400, { error: "Faltan respuestas obligatorias." });
  }

  const attribution = body.attribution && typeof body.attribution === "object" ? body.attribution : {};
  const row = {
    profession,
    practice_mode: practiceMode,
    work_areas: workAreas,
    forensic_frequency: forensicFrequency,
    frequency,
    frequent_instruments: cleanText(body.frequent_instruments, 800) || null,
    current_workflow: workflow,
    processing_time: processingTime,
    pain_points: painPoints,
    traceability_importance: traceabilityImportance,
    top_features: topFeatures,
    value_proposition: valueProposition,
    paid_tool_status: paidToolStatus,
    requested_instruments: cleanText(body.requested_instruments, 800) || null,
    price_range: priceRange,
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
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/survey_psicometricos_responses`, {
      method: "POST",
      headers: { apikey: SERVER_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Supabase survey insert failed:", response.status, detail);
      return send(res, 500, { error: "No pudimos registrar la respuesta. Intentá nuevamente." });
    }
    return send(res, 200, { ok: true });
  } catch (error) {
    console.error("Survey API error:", error);
    return send(res, 500, { error: "No pudimos registrar la respuesta. Intentá nuevamente." });
  }
};
