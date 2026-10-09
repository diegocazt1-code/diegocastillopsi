const ALLOWED_ORIGINS = new Set([
  "https://diegocastillopsi.com",
  "https://www.diegocastillopsi.com"
]);

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLocalOrigin(origin) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || "");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const origin = req.headers.origin || "";
  const isProduction = process.env.VERCEL_ENV === "production";

  if (isProduction && origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ error: "Origen no autorizado." });
  }

  if (!isProduction && origin && !ALLOWED_ORIGINS.has(origin) && !isLocalOrigin(origin)) {
    return res.status(403).json({ error: "Origen no autorizado." });
  }

  const {
    email,
    resultId,
    version,
    pdfBase64,
    filename,
    website
  } = req.body || {};

  // Honeypot reservado para mantener una interfaz compatible si luego se amplía el formulario.
  if (String(website || "").trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  if (
    typeof email !== "string" ||
    email.length > 180 ||
    !validEmail(email) ||
    typeof resultId !== "string" ||
    !/^MBA-\d{8}-[A-Z0-9]{6,12}$/.test(resultId) ||
    version !== "MBA-1.0" ||
    typeof pdfBase64 !== "string" ||
    pdfBase64.length < 1000 ||
    pdfBase64.length > 2_000_000
  ) {
    return res.status(400).json({ error: "Datos inválidos." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.FORMS_FROM) {
    return res.status(503).json({
      error: "El envío por correo todavía no está configurado. Podés descargar el PDF directamente."
    });
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8f6fa;padding:28px;color:#17151b">
      <div style="max-width:680px;margin:auto;background:#fff;border:1px solid #e7e2ea;border-radius:18px;overflow:hidden">
        <div style="background:#2E245A;color:#fff;padding:28px">
          <div style="font-size:12px;letter-spacing:.08em;color:#D8C8E8;font-weight:700">AUTOEVALUACIÓN</div>
          <h1 style="font-size:24px;margin:8px 0 6px">Tu mapa de bienestar actual</h1>
          <div style="font-size:13px;color:#ECE8F4">Lic. Diego Castillo · Licenciado en Psicología · M.P. N.º 2669</div>
        </div>
        <div style="padding:28px">
          <p>Adjuntamos la copia que pediste de tu autoevaluación.</p>
          <p><strong>Identificador:</strong> ${resultId}</p>
          <p style="font-size:12px;color:#6E6875;line-height:1.55">
            Este resultado es orientativo. No constituye un diagnóstico, no utiliza baremos poblacionales
            y no reemplaza una evaluación psicológica profesional.
          </p>
          <p style="font-size:12px;color:#6E6875;line-height:1.55">
            Este correo fue solicitado por vos desde diegocastillopsi.com. La dirección se utilizó únicamente
            para enviar esta copia.
          </p>
        </div>
        <div style="padding:18px 28px;border-top:1px solid #e7e2ea;color:#6E6875;font-size:11px">
          Diego Castillo · M.P. N.º 2669 · Neuquén, Argentina · diegocastillopsi.com
        </div>
      </div>
    </div>
  `;

  const payload = {
    from: process.env.FORMS_FROM,
    to: [email.trim().toLowerCase()],
    subject: "Tu mapa de bienestar actual — Diego Castillo",
    html,
    attachments: [
      {
        filename: typeof filename === "string" && filename.endsWith(".pdf")
          ? filename.slice(0, 140)
          : `mapa-bienestar-${resultId}.pdf`,
        content: pdfBase64
      }
    ]
  };

  if (process.env.CONSENT_REPLY_TO) {
    payload.reply_to = process.env.CONSENT_REPLY_TO;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Autotest email provider error:", response.status, data?.name || data?.message || "unknown");
      return res.status(502).json({ error: "No pudimos enviar el correo en este momento." });
    }

    return res.status(200).json({ ok: true, providerId: data.id || null });
  } catch (error) {
    console.error("Autotest email transport error:", error?.message || "unknown");
    return res.status(502).json({ error: "No pudimos conectar con el servicio de correo." });
  }
}
