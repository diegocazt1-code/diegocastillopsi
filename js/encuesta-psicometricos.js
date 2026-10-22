(() => {
  const ATTR_STORE = "dc_psicometrics_survey_utm_v2";
  const STARTED_STORE = "dc_psicometrics_survey_started_v2";

  function track(name, params = {}) {
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, params);
    } catch (_) {}

    // No enviar respuestas del formulario a Meta. Sólo eventos de navegación/conversión.
    try {
      if (typeof window.fbq === "function") {
        const metaEvents = {
          survey_view: "SurveyView",
          survey_start: "SurveyStart",
          survey_complete: "SurveyComplete",
          beta_click: "BetaClick",
          beta_view: "BetaView",
          beta_complete: "BetaComplete",
        };
        if (metaEvents[name]) window.fbq("trackCustom", metaEvents[name], params);
      }
    } catch (_) {}
  }

  function storedAttribution() {
    try {
      return JSON.parse(sessionStorage.getItem(ATTR_STORE) || "{}");
    } catch (_) {
      return {};
    }
  }

  function captureAttribution() {
    const params = new URLSearchParams(location.search);
    const old = storedAttribution();
    const attribution = {
      utm_source: params.get("utm_source") || old.utm_source || "",
      utm_medium: params.get("utm_medium") || old.utm_medium || "",
      utm_campaign: params.get("utm_campaign") || old.utm_campaign || "",
      utm_content: params.get("utm_content") || old.utm_content || "",
      utm_term: params.get("utm_term") || old.utm_term || "",
      campaign_segment:
        params.get("segment") ||
        params.get("survey_segment") ||
        params.get("utm_content") ||
        old.campaign_segment ||
        "",
    };

    try {
      sessionStorage.setItem(ATTR_STORE, JSON.stringify(attribution));
    } catch (_) {}
    return attribution;
  }

  function appendAttribution(urlString, attribution) {
    try {
      const url = new URL(urlString, location.href);
      Object.entries(attribution).forEach(([key, value]) => {
        if (!value) return;
        const targetKey = key === "campaign_segment" ? "survey_segment" : key;
        url.searchParams.set(targetKey, value);
      });
      return url.toString();
    } catch (_) {
      return urlString;
    }
  }

  const attribution = captureAttribution();
  const basicTracking = {
    campaign_segment: attribution.campaign_segment || "unknown",
    utm_campaign: attribution.utm_campaign || "",
  };

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // --- Encuesta anónima ---
  const surveyForm = document.getElementById("psychometricsSurvey");
  if (surveyForm) {
    track("survey_view", basicTracking);

    const error = document.getElementById("surveyFormError");
    const submit = document.getElementById("surveySubmitButton");
    const bar = document.getElementById("surveyProgressBar");
    const progress = document.getElementById("surveyProgressText");
    const limitMsg = document.getElementById("featureLimitMessage");

    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campaign_segment"].forEach((key) => {
      const input = document.getElementById(key);
      if (input) input.value = attribution[key] || "";
    });
    document.getElementById("landing_url").value = location.href;
    document.getElementById("referrer").value = document.referrer || "";

    function markStarted() {
      try {
        if (sessionStorage.getItem(STARTED_STORE)) return;
        sessionStorage.setItem(STARTED_STORE, "1");
      } catch (_) {}
      track("survey_start", basicTracking);
    }
    surveyForm.addEventListener("input", markStarted, { once: true });
    surveyForm.addEventListener("change", markStarted, { once: true });

    const featureInputs = [...surveyForm.querySelectorAll('input[name="top_features"]')];
    featureInputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (featureInputs.filter((item) => item.checked).length > 3) {
          input.checked = false;
          limitMsg.hidden = false;
          setTimeout(() => (limitMsg.hidden = true), 2400);
        }
        updateProgress();
      });
    });

    const hasChecked = (name) => surveyForm.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
    const checkedValues = (name) => [...surveyForm.querySelectorAll(`input[name="${name}"]:checked`)].map((el) => el.value);
    const checkedValue = (name) => surveyForm.querySelector(`[name="${name}"]:checked`)?.value || "";
    const textValue = (name) => {
      const item = surveyForm.elements.namedItem(name);
      return typeof item?.value === "string" ? item.value.trim() : "";
    };

    function updateProgress() {
      const checks = [
        hasChecked("profession"),
        hasChecked("practice_mode"),
        hasChecked("work_areas"),
        hasChecked("forensic_frequency"),
        hasChecked("frequency"),
        hasChecked("current_workflow"),
        hasChecked("processing_time"),
        hasChecked("pain_points"),
        hasChecked("traceability_importance"),
        hasChecked("top_features"),
        hasChecked("value_proposition"),
        hasChecked("paid_tool_status"),
        hasChecked("price_range"),
        !!surveyForm.querySelector('input[name="privacy_ack"]:checked'),
      ];
      const pct = Math.round((checks.filter(Boolean).length / checks.length) * 100);
      if (bar) bar.style.width = `${pct}%`;
      if (progress) progress.textContent = `${pct}% completado`;
    }
    surveyForm.addEventListener("change", updateProgress);
    updateProgress();

    function validateSurvey() {
      const requiredGroups = [
        ["profession", "Indicá tu profesión o rol principal."],
        ["practice_mode", "Indicá tu modalidad principal de ejercicio."],
        ["work_areas", "Indicá al menos un ámbito de uso."],
        ["forensic_frequency", "Indicá la frecuencia de trabajo jurídico-forense."],
        ["frequency", "Indicá con qué frecuencia utilizás instrumentos."],
        ["current_workflow", "Indicá cómo realizás hoy la corrección o procesamiento."],
        ["processing_time", "Indicá cuánto tiempo suele demandarte el procesamiento."],
        ["pain_points", "Marcá al menos una tarea que te genere carga o tiempo."],
        ["traceability_importance", "Indicá la importancia de la trazabilidad."],
        ["top_features", "Elegí al menos una función que te resultaría valiosa."],
        ["value_proposition", "Elegí la propuesta de valor que más te interese."],
        ["paid_tool_status", "Indicá si actualmente pagás alguna herramienta."],
        ["price_range", "Indicá un rango mensual o seleccioná que no sabrías decirlo."],
      ];
      for (const [name, message] of requiredGroups) {
        if (!hasChecked(name)) return message;
      }
      if (!surveyForm.querySelector('input[name="privacy_ack"]:checked')) {
        return "Confirmá la aclaración de privacidad para continuar.";
      }
      return "";
    }

    surveyForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const validationMessage = validateSurvey();
      if (validationMessage) {
        error.textContent = validationMessage;
        error.hidden = false;
        error.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      error.hidden = true;
      submit.disabled = true;
      const oldLabel = submit.textContent;
      submit.textContent = "Enviando...";

      const payload = {
        profession: checkedValue("profession"),
        practice_mode: checkedValue("practice_mode"),
        work_areas: checkedValues("work_areas"),
        forensic_frequency: checkedValue("forensic_frequency"),
        frequency: checkedValue("frequency"),
        frequent_instruments: textValue("frequent_instruments"),
        current_workflow: checkedValues("current_workflow"),
        processing_time: checkedValue("processing_time"),
        pain_points: checkedValues("pain_points"),
        traceability_importance: Number(checkedValue("traceability_importance")),
        top_features: checkedValues("top_features"),
        value_proposition: checkedValue("value_proposition"),
        paid_tool_status: checkedValue("paid_tool_status"),
        requested_instruments: textValue("requested_instruments"),
        price_range: checkedValue("price_range"),
        privacy_ack: !!surveyForm.querySelector('input[name="privacy_ack"]:checked'),
        website: textValue("website"),
        attribution: {
          ...attribution,
          landing_url: textValue("landing_url"),
          referrer: textValue("referrer"),
        },
      };

      try {
        const response = await fetch("/api/encuesta-psicometricos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const output = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(output?.error || "No pudimos registrar la respuesta.");

        track("survey_complete", basicTracking);
        const next = appendAttribution("./gracias.html", attribution);
        location.assign(next);
      } catch (err) {
        error.textContent = err instanceof Error ? err.message : "No pudimos enviar la encuesta. Intentá nuevamente.";
        error.hidden = false;
        submit.disabled = false;
        submit.textContent = oldLabel;
      }
    });
  }

  // --- Página de gracias ---
  const betaButton = document.getElementById("betaAccessButton");
  if (betaButton) {
    betaButton.href = appendAttribution(betaButton.getAttribute("href"), attribution);
    betaButton.addEventListener("click", () => track("beta_click", basicTracking));
  }

  // --- Formulario Beta separado ---
  const betaForm = document.getElementById("psychometricsBetaForm");
  if (betaForm) {
    track("beta_view", basicTracking);

    const error = document.getElementById("betaFormError");
    const submit = document.getElementById("betaSubmitButton");
    const success = document.getElementById("betaSuccess");

    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campaign_segment"].forEach((key) => {
      const input = document.getElementById(`beta_${key}`);
      if (input) input.value = attribution[key] || "";
    });
    document.getElementById("beta_landing_url").value = location.href;
    document.getElementById("beta_referrer").value = document.referrer || "";

    const checkedValues = (name) => [...betaForm.querySelectorAll(`input[name="${name}"]:checked`)].map((el) => el.value);
    const checkedValue = (name) => betaForm.querySelector(`[name="${name}"]:checked`)?.value || "";
    const textValue = (name) => {
      const item = betaForm.elements.namedItem(name);
      return typeof item?.value === "string" ? item.value.trim() : "";
    };

    betaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = textValue("name");
      const email = textValue("email");
      const profession = checkedValue("profession");
      const workAreas = checkedValues("work_areas");
      const frequency = checkedValue("frequency");
      const contactAck = !!betaForm.querySelector('input[name="contact_ack"]:checked');
      const emailInput = document.getElementById("beta_email");

      let validationMessage = "";
      if (!name) validationMessage = "Ingresá tu nombre y apellido.";
      else if (!email || !emailInput.checkValidity()) validationMessage = "Ingresá un correo electrónico válido.";
      else if (!profession) validationMessage = "Indicá tu profesión principal.";
      else if (!workAreas.length) validationMessage = "Indicá al menos un ámbito de uso.";
      else if (!frequency) validationMessage = "Indicá con qué frecuencia utilizás instrumentos.";
      else if (!contactAck) validationMessage = "Confirmá que podemos contactarte por el Early Access.";

      if (validationMessage) {
        error.textContent = validationMessage;
        error.hidden = false;
        error.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      error.hidden = true;
      submit.disabled = true;
      const oldLabel = submit.textContent;
      submit.textContent = "Enviando...";

      const payload = {
        name,
        email,
        profession,
        work_areas: workAreas,
        frequency,
        frequent_instruments: textValue("frequent_instruments"),
        contact_ack: contactAck,
        website: textValue("website"),
        attribution: {
          ...attribution,
          landing_url: textValue("landing_url"),
          referrer: textValue("referrer"),
        },
      };

      try {
        const response = await fetch("/api/beta-psicometricos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const output = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(output?.error || "No pudimos registrar la solicitud.");

        track("beta_complete", basicTracking);
        betaForm.querySelectorAll("input, textarea, button").forEach((el) => {
          if (el.id !== "betaRegistrationLink") el.disabled = true;
        });
        submit.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (err) {
        error.textContent = err instanceof Error ? err.message : "No pudimos registrar la solicitud. Intentá nuevamente.";
        error.hidden = false;
        submit.disabled = false;
        submit.textContent = oldLabel;
      }
    });
  }
})();
