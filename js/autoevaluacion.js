(() => {
  "use strict";

  const VERSION = "MBA-1.0";
  const PROFESSIONAL = {
    name: "Lic. Diego Castillo",
    profession: "Licenciado en Psicología",
    registration: "M.P. N.º 2669",
    location: "Neuquén, Argentina",
    website: "diegocastillopsi.com"
  };

  const domainMeta = {
    activation: {
      title: "Preocupación y activación",
      short: "Activación",
      icon: "◌",
      description:
        "Tus respuestas muestran una presencia relativa mayor de preocupación persistente, tensión o dificultad para bajar el nivel de activación.",
      nextTitle: "Podés empezar por entender cómo funciona la ansiedad.",
      nextDescription:
        "Conocer los mecanismos de preocupación, alerta y evitación puede ayudarte a distinguir qué está manteniendo el malestar y qué herramientas tendría sentido probar.",
      path: "/psicoterapia/ansiedad/",
      pathLabel: "Ver ansiedad y psicoterapia",
      observe: [
        ["01", "Qué dispara la activación", "¿Hay momentos, pensamientos o situaciones que hacen que tu cuerpo o tu cabeza se aceleren especialmente?"],
        ["02", "Qué hacés para aliviarla", "¿Evitás, controlás, revisás, buscás certeza o tratás de distraerte para dejar de sentirla?"],
        ["03", "Qué costo está teniendo", "¿La preocupación está afectando sueño, concentración, vínculos o decisiones cotidianas?"]
      ]
    },
    mood: {
      title: "Energía y estado de ánimo",
      short: "Ánimo / energía",
      icon: "↓",
      description:
        "Tus respuestas muestran una presencia relativa mayor de baja energía, menor interés o dificultad para sostener motivación y actividades.",
      nextTitle: "Puede ser útil mirar el vínculo entre ánimo, energía y actividad.",
      nextDescription:
        "Cuando el estado de ánimo cae, solemos reducir actividades que aportaban estructura, conexión o satisfacción. Entender ese circuito permite pensar cambios más concretos.",
      path: "/psicoterapia/estado-de-animo/",
      pathLabel: "Ver estado de ánimo y psicoterapia",
      observe: [
        ["01", "Qué dejaste de hacer", "¿Qué actividades importantes o agradables se fueron reduciendo durante estas semanas?"],
        ["02", "Cómo cambió tu energía", "¿La falta de energía aparece todo el día o cambia según el momento, la actividad o el contexto?"],
        ["03", "Qué te decís", "¿Tu diálogo interno se volvió más crítico, pesimista o exigente cuando algo cuesta?"]
      ]
    },
    overload: {
      title: "Sobrecarga y recuperación",
      short: "Sobrecarga",
      icon: "↗",
      description:
        "Tus respuestas muestran una presencia relativa mayor de demandas sostenidas y dificultad para recuperar energía aun cuando intentás descansar.",
      nextTitle: "Conviene mirar demanda, recursos y recuperación como un sistema.",
      nextDescription:
        "No todo agotamiento se resuelve descansando más. A veces también hay que revisar cantidad de demandas, límites, expectativas y cuánto espacio real existe para recuperarse.",
      path: "/psicoterapia/burnout/",
      pathLabel: "Ver burnout y sobrecarga",
      observe: [
        ["01", "Demanda real", "¿Cuánto de lo que te exige hoy depende de vos y cuánto viene impuesto por el contexto?"],
        ["02", "Recuperación real", "¿Tus descansos permiten desconectar o seguís mentalmente disponible para las mismas demandas?"],
        ["03", "Recursos disponibles", "¿Tenés margen para pedir ayuda, priorizar, renegociar o reducir algo sin exponerte a consecuencias importantes?"]
      ]
    },
    work: {
      title: "Contexto laboral o interpersonal adverso",
      short: "Contexto laboral",
      icon: "◇",
      description:
        "Tus respuestas muestran una presencia relativa mayor de tensión asociada al trabajo y a interacciones que conviene analizar con más contexto.",
      nextTitle: "No todo conflicto laboral es acoso, pero vale la pena mirar el patrón.",
      nextDescription:
        "Para evaluar una situación laboral hay que considerar repetición, duración, relaciones de poder, conductas concretas, impacto y explicaciones alternativas. Un autotest no puede establecer por sí solo que exista acoso laboral.",
      path: "/psicoterapia/acoso-laboral/",
      pathLabel: "Ver acoso y violencia laboral",
      secondaryPath: "/recursos/",
      secondaryLabel: "Explorar recursos gratuitos",
      observe: [
        ["01", "Conductas concretas", "¿Qué ocurre exactamente: descalificación, aislamiento, amenazas, cambios arbitrarios, hostilidad u otra dinámica?"],
        ["02", "Patrón y frecuencia", "¿Se trata de episodios puntuales o de una secuencia repetida y sostenida en el tiempo?"],
        ["03", "Relaciones de poder", "¿Qué capacidad real tenés para responder, poner límites, pedir ayuda o salir de esa situación sin exponerte?"]
      ]
    }
  };

  const questions = [
    {
      id: "context",
      type: "context",
      domain: "CONTEXTO",
      text: "¿El trabajo, estudio o un entorno organizacional ocupa una parte importante de lo que te está pasando?",
      help: "Esto sólo define si mostramos algunas preguntas adicionales sobre contexto laboral.",
      options: [
        { label: "Sí, es una parte importante", value: "yes", code: "A" },
        { label: "No especialmente", value: "no", code: "B" }
      ]
    },
    {
      id: "a1",
      domain: "ACTIVACIÓN",
      text: "Me costó frenar pensamientos de preocupación aunque quisiera desconectar.",
      scores: ["activation"]
    },
    {
      id: "a2",
      domain: "ACTIVACIÓN",
      text: "Sentí tensión, inquietud o que estaba demasiado en alerta.",
      scores: ["activation"]
    },
    {
      id: "a3",
      domain: "ACTIVACIÓN",
      text: "Me resultó difícil relajarme o bajar un cambio.",
      scores: ["activation", "overload"]
    },
    {
      id: "m1",
      domain: "ÁNIMO Y ENERGÍA",
      text: "Tuve menos interés o ganas por actividades que normalmente me importan.",
      scores: ["mood"]
    },
    {
      id: "m2",
      domain: "ÁNIMO Y ENERGÍA",
      text: "Sentí poca energía o me costó ponerme en marcha.",
      scores: ["mood", "overload"]
    },
    {
      id: "m3",
      domain: "ÁNIMO Y ENERGÍA",
      text: "Me costó sostener motivación incluso para cosas que antes podía hacer con mayor facilidad.",
      scores: ["mood"]
    },
    {
      id: "o1",
      domain: "DEMANDAS",
      text: "Sentí que las demandas actuales superaban los recursos que tenía disponibles.",
      scores: ["overload"]
    },
    {
      id: "o2",
      domain: "RECUPERACIÓN",
      text: "Aunque descansara, sentí que no terminaba de recuperar energía.",
      scores: ["overload", "mood"]
    },
    {
      id: "i1",
      domain: "IMPACTO",
      text: "Lo que estoy viviendo empezó a afectar mi sueño o mi descanso.",
      scores: ["interference", "activation", "overload"]
    },
    {
      id: "i2",
      domain: "IMPACTO",
      text: "Me costó más concentrarme, organizarme o tomar decisiones.",
      scores: ["interference", "mood"]
    },
    {
      id: "i3",
      domain: "IMPACTO",
      text: "Este malestar está interfiriendo en mi vida cotidiana, mis vínculos, mi trabajo o mis actividades.",
      scores: ["interference"]
    },
    {
      id: "w1",
      workOnly: true,
      domain: "TRABAJO",
      text: "Incluso fuera del horario, seguí mentalmente enganchado/a con situaciones o demandas del trabajo.",
      scores: ["work", "overload"]
    },
    {
      id: "w2",
      workOnly: true,
      domain: "TRABAJO",
      text: "Viví interacciones laborales que sentí como hostiles, descalificadoras, humillantes o de aislamiento.",
      scores: ["work"]
    },
    {
      id: "w3",
      workOnly: true,
      domain: "TRABAJO",
      text: "Empecé a evitar personas o situaciones laborales por miedo, tensión o anticipación de que algo desagradable ocurriera.",
      scores: ["work", "activation"]
    }
  ];

  const frequencyOptions = [
    { label: "Nunca o casi nunca", value: 0, code: "A" },
    { label: "Algunos días", value: 1, code: "B" },
    { label: "Bastante seguido", value: 2, code: "C" },
    { label: "Casi todos los días", value: 3, code: "D" }
  ];

  const els = {
    start: document.getElementById("startTest"),
    hero: document.querySelector(".selftest-hero"),
    stage: document.getElementById("evaluacion"),
    results: document.getElementById("resultados"),
    questionDomain: document.getElementById("questionDomain"),
    questionIndex: document.getElementById("questionIndex"),
    questionText: document.getElementById("questionText"),
    questionHelp: document.getElementById("questionHelp"),
    answerOptions: document.getElementById("answerOptions"),
    progressLabel: document.getElementById("progressLabel"),
    progressPercent: document.getElementById("progressPercent"),
    progressBar: document.getElementById("progressBar"),
    prev: document.getElementById("prevQuestion"),
    exit: document.getElementById("exitTest"),
    resultHeadline: document.getElementById("resultHeadline"),
    resultIntro: document.getElementById("resultIntro"),
    primaryIcon: document.getElementById("primaryIcon"),
    primaryTitle: document.getElementById("primaryTitle"),
    primaryDescription: document.getElementById("primaryDescription"),
    primaryLevel: document.getElementById("primaryLevel"),
    domainList: document.getElementById("domainList"),
    observeGrid: document.getElementById("observeGrid"),
    nextTitle: document.getElementById("nextTitle"),
    nextDescription: document.getElementById("nextDescription"),
    nextActions: document.getElementById("nextActions"),
    interferenceTitle: document.getElementById("interferenceTitle"),
    interferenceText: document.getElementById("interferenceText"),
    downloadPdf: document.getElementById("downloadPdf"),
    showEmail: document.getElementById("showEmail"),
    emailForm: document.getElementById("emailForm"),
    resultEmail: document.getElementById("resultEmail"),
    emailStatus: document.getElementById("emailStatus"),
    sendEmail: document.getElementById("sendEmail"),
    restart: document.getElementById("restartTest")
  };

  const state = {
    answers: {},
    visibleQuestions: [],
    currentIndex: 0,
    result: null,
    pdfBlob: null,
    pdfFilename: null,
    resultId: null
  };

  function makeId() {
    const day = new Date().toISOString().slice(0,10).replaceAll("-","");
    const rnd = (crypto?.randomUUID?.() || Math.random().toString(36).slice(2))
      .replaceAll("-","")
      .slice(0,8)
      .toUpperCase();
    return `MBA-${day}-${rnd}`;
  }

  function buildVisibleQuestions() {
    const context = state.answers.context;
    state.visibleQuestions = questions.filter(q => !q.workOnly || context === "yes");
  }

  function levelFor(avg) {
    if (avg < 0.75) return { key: "few", label: "Pocas señales", copy: "La presencia relativa de señales en esta área es baja." };
    if (avg < 1.5) return { key: "some", label: "Algunas señales", copy: "Aparecen algunas señales que pueden ser útiles para observar." };
    if (avg < 2.25) return { key: "several", label: "Varias señales", copy: "Hay varias señales presentes con cierta frecuencia." };
    return { key: "many", label: "Señales muy presentes", copy: "Las señales de esta área aparecen con bastante frecuencia." };
  }

  function average(values) {
    if (!values.length) return null;
    return values.reduce((a,b) => a + b, 0) / values.length;
  }

  function calculate() {
    const buckets = {
      activation: [],
      mood: [],
      overload: [],
      work: [],
      interference: []
    };

    questions.forEach(q => {
      if (!q.scores || !(q.id in state.answers)) return;
      const value = Number(state.answers[q.id]);
      if (!Number.isFinite(value)) return;
      q.scores.forEach(domain => buckets[domain].push(value));
    });

    const scores = {};
    Object.entries(buckets).forEach(([key, values]) => {
      scores[key] = average(values);
    });

    const primaryCandidates = ["activation", "mood", "overload"];
    if (scores.work !== null) primaryCandidates.push("work");

    primaryCandidates.sort((a,b) => scores[b] - scores[a]);
    const primary = primaryCandidates[0];
    const secondary = primaryCandidates[1];
    const maxScore = scores[primary];

    let profile = "focused";
    if (maxScore < 0.75) profile = "low";
    else if (scores[primary] - scores[secondary] < 0.25) profile = "mixed";

    return {
      scores,
      primary,
      secondary,
      profile,
      interferenceLevel: levelFor(scores.interference ?? 0)
    };
  }

  function renderQuestion() {
    buildVisibleQuestions();
    const q = state.visibleQuestions[state.currentIndex];
    if (!q) return;

    const total = state.visibleQuestions.length;
    const progress = Math.round((state.currentIndex / total) * 100);

    els.progressLabel.textContent = `Pregunta ${state.currentIndex + 1} de ${total}`;
    els.progressPercent.textContent = `${progress}%`;
    els.progressBar.style.width = `${progress}%`;

    els.questionDomain.textContent = q.domain;
    els.questionIndex.textContent = String(state.currentIndex + 1).padStart(2, "0");
    els.questionText.textContent = q.text;
    els.questionHelp.textContent = q.help || "Pensá en cómo te sentiste durante las últimas dos semanas.";

    const options = q.options || frequencyOptions;
    els.answerOptions.innerHTML = "";

    options.forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "selftest-option";
      if (state.answers[q.id] === option.value) button.classList.add("selected");
      button.innerHTML = `
        <span class="selftest-option-code">${option.code}</span>
        <span class="selftest-option-text">${option.label}</span>
        <span class="selftest-option-arrow">→</span>
      `;
      button.addEventListener("click", () => selectAnswer(q, option.value));
      els.answerOptions.appendChild(button);
    });

    els.prev.disabled = state.currentIndex === 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectAnswer(question, value) {
    state.answers[question.id] = value;

    if (question.id === "context" && value === "no") {
      ["w1","w2","w3"].forEach(id => delete state.answers[id]);
    }

    buildVisibleQuestions();

    setTimeout(() => {
      if (state.currentIndex >= state.visibleQuestions.length - 1) {
        showResults();
      } else {
        state.currentIndex += 1;
        renderQuestion();
      }
    }, 115);
  }

  function introText(result) {
    if (result.profile === "low") {
      return "En este momento no aparece una concentración fuerte de señales en un área específica. Eso no invalida lo que estés sintiendo: un resultado breve puede no captar contexto, duración o situaciones particulares.";
    }
    if (result.profile === "mixed") {
      return `Tus respuestas no se concentran en una sola área. Aparecen señales repartidas principalmente entre ${domainMeta[result.primary].title.toLowerCase()} y ${domainMeta[result.secondary].title.toLowerCase()}.`;
    }
    return `Tus respuestas se concentran relativamente más en ${domainMeta[result.primary].title.toLowerCase()}. Tomalo como una hipótesis para observar, no como una conclusión diagnóstica.`;
  }

  function headlineText(result) {
    if (result.profile === "low") return "No aparece un área claramente dominante.";
    if (result.profile === "mixed") return "Tu mapa muestra más de un frente activo.";
    return "Hay un área que hoy aparece más marcada.";
  }

  function interferenceCopy(avg) {
    if (avg < 0.75) {
      return {
        title: "Interferencia actualmente baja",
        text: "Según tus respuestas, el impacto sobre sueño, concentración y funcionamiento cotidiano aparece relativamente acotado. Si el malestar persiste, cambia o te preocupa, el contexto sigue siendo importante."
      };
    }
    if (avg < 1.5) {
      return {
        title: "Hay algo de impacto cotidiano",
        text: "Aparecen algunas señales de que lo que estás viviendo empieza a interferir en descanso, concentración o actividades. Observar si aumenta, se mantiene o se extiende a otras áreas puede ser útil."
      };
    }
    if (avg < 2.25) {
      return {
        title: "El impacto cotidiano merece atención",
        text: "Tus respuestas sugieren que el malestar está interfiriendo de manera apreciable en áreas de la vida diaria. Puede ser un buen momento para conversarlo con un profesional y evaluar el contexto con más profundidad."
      };
    }
    return {
      title: "El impacto cotidiano aparece muy presente",
      text: "Tus respuestas muestran una interferencia frecuente en sueño, concentración o funcionamiento. Este resultado no diagnostica, pero sí es una señal razonable para buscar una evaluación profesional si todavía no la estás realizando."
    };
  }

  function renderDomains(result) {
    const order = ["activation", "mood", "overload"];
    if (result.scores.work !== null) order.push("work");

    els.domainList.innerHTML = "";
    order.forEach(key => {
      const avg = result.scores[key] ?? 0;
      const level = levelFor(avg);
      const pct = Math.max(4, Math.min(100, (avg / 3) * 100));
      const row = document.createElement("div");
      row.className = "selftest-domain-row";
      row.innerHTML = `
        <div class="selftest-domain-name">
          <strong>${domainMeta[key].short}</strong>
          <span>${key === result.primary ? "Área más marcada" : "Área explorada"}</span>
        </div>
        <div class="selftest-domain-track" aria-hidden="true"><span style="width:${pct}%"></span></div>
        <div class="selftest-domain-level">${level.label}</div>
      `;
      els.domainList.appendChild(row);
    });
  }

  function renderObserve(result) {
    const cards = domainMeta[result.primary].observe;
    els.observeGrid.innerHTML = cards.map(([num,title,text]) => `
      <article class="selftest-observe-card">
        <span>${num}</span>
        <strong>${title}</strong>
        <p>${text}</p>
      </article>
    `).join("");
  }

  function renderNext(result) {
    const meta = domainMeta[result.primary];
    els.nextTitle.textContent = meta.nextTitle;
    els.nextDescription.textContent = meta.nextDescription;

    const buttons = [
      `<a class="btn btn-primary" href="${meta.path}">${meta.pathLabel}</a>`,
      `<a class="btn btn-secondary" href="https://calendly.com/diegocastillopsi" target="_blank" rel="noopener">Ver disponibilidad de turnos</a>`
    ];
    if (meta.secondaryPath) {
      buttons.splice(1,0,`<a class="btn btn-secondary" href="${meta.secondaryPath}">${meta.secondaryLabel}</a>`);
    }
    els.nextActions.innerHTML = buttons.join("");
  }

  function showResults() {
    state.result = calculate();
    state.resultId = makeId();

    const result = state.result;
    const primary = domainMeta[result.primary];
    const primaryLevel = levelFor(result.scores[result.primary] ?? 0);
    const interference = interferenceCopy(result.scores.interference ?? 0);

    els.resultHeadline.textContent = headlineText(result);
    els.resultIntro.textContent = introText(result);
    els.primaryIcon.textContent = primary.icon;
    els.primaryTitle.textContent = result.profile === "low" ? "Sin predominio claro" : primary.title;
    els.primaryDescription.textContent = result.profile === "low"
      ? "Las respuestas se distribuyen en niveles bajos o aislados. Si existe una preocupación concreta, la experiencia personal y el contexto siguen siendo más importantes que un resultado breve."
      : primary.description;
    els.primaryLevel.textContent = result.profile === "low" ? "Sin concentración marcada" : primaryLevel.label;

    renderDomains(result);
    renderObserve(result);
    renderNext(result);

    els.interferenceTitle.textContent = interference.title;
    els.interferenceText.textContent = interference.text;

    els.stage.hidden = true;
    els.hero.hidden = true;
    els.results.hidden = false;
    els.progressBar.style.width = "100%";
    state.pdfBlob = null;
    state.pdfFilename = null;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pdfBlocks() {
    const result = state.result;
    const blocks = [
      { type: "label", text: "MAPA DE BIENESTAR ACTUAL" },
      { type: "heading", text: headlineText(result), size: 16 },
      { type: "text", text: introText(result), bold: true, color: "#2E245A", size: 10 },
      { type: "space", height: 5 },
      { type: "rule" },
      { type: "kv", key: "Fecha", value: new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date()) },
      { type: "kv", key: "Identificador", value: state.resultId },
      { type: "kv", key: "Versión", value: VERSION },
      { type: "space", height: 7 },
      { type: "heading", text: "Área más marcada", size: 13 },
      {
        type: "text",
        text: result.profile === "low"
          ? "Sin predominio claro."
          : `${domainMeta[result.primary].title} — ${levelFor(result.scores[result.primary] ?? 0).label}.`,
        bold: true,
        color: "#2E245A"
      },
      {
        type: "text",
        text: result.profile === "low"
          ? "No aparece una concentración fuerte de señales en una sola de las áreas exploradas."
          : domainMeta[result.primary].description
      },
      { type: "heading", text: "Panorama por áreas", size: 13 }
    ];

    ["activation","mood","overload"].forEach(key => {
      blocks.push({
        type: "text",
        text: `${domainMeta[key].short}: ${levelFor(result.scores[key] ?? 0).label}`,
        bold: true,
        gap: 3
      });
    });

    if (result.scores.work !== null) {
      blocks.push({
        type: "text",
        text: `${domainMeta.work.short}: ${levelFor(result.scores.work ?? 0).label}`,
        bold: true,
        gap: 3
      });
    }

    const interference = interferenceCopy(result.scores.interference ?? 0);
    blocks.push(
      { type: "space", height: 6 },
      { type: "heading", text: "Impacto cotidiano", size: 13 },
      { type: "text", text: interference.title, bold: true, color: "#2E245A", gap: 3 },
      { type: "text", text: interference.text },
      { type: "heading", text: "Tres preguntas para observar", size: 13 }
    );

    domainMeta[result.primary].observe.forEach(([num,title,text]) => {
      blocks.push(
        { type: "text", text: `${num}. ${title}`, bold: true, color: "#2E245A", gap: 2 },
        { type: "text", text, size: 9, gap: 5 }
      );
    });

    blocks.push(
      { type: "heading", text: "Qué significa este resultado", size: 13 },
      {
        type: "text",
        text:
          "Esta herramienta utiliza preguntas propias de orientación y reglas determinísticas. No utiliza baremos poblacionales, no estima probabilidades diagnósticas y no constituye un test psicométrico validado. El resultado no permite concluir que exista un trastorno, burnout o acoso laboral."
      },
      {
        type: "text",
        text:
          "Si el malestar interfiere en tu vida, se mantiene o aumenta, puede ser útil realizar una evaluación profesional que considere contexto, historia, duración y otras variables que este recorrido breve no puede captar."
      },
      { type: "heading", text: "Próximo paso sugerido", size: 13 },
      { type: "text", text: domainMeta[result.primary].nextTitle, bold: true, color: "#2E245A", gap: 3 },
      { type: "text", text: domainMeta[result.primary].nextDescription },
      { type: "rule" },
      {
        type: "text",
        text:
          "Si estás atravesando una crisis o existe un riesgo inmediato para tu seguridad, esta autoevaluación no es un recurso de urgencias. Buscá asistencia presencial urgente, una guardia de salud o el servicio de emergencias de tu localidad.",
        size: 8.5
      }
    );

    return blocks;
  }

  function buildPdf() {
    if (!window.DCPdf?.make) {
      throw new Error("No se encontró el generador PDF compartido de la web.");
    }
    if (!state.pdfBlob) {
      state.pdfBlob = window.DCPdf.make({
        title: "Mapa de bienestar actual",
        subtitle: `${PROFESSIONAL.name} · ${PROFESSIONAL.profession} · ${PROFESSIONAL.registration}`,
        version: VERSION,
        footerLeft: `${PROFESSIONAL.name} - ${PROFESSIONAL.registration}`,
        footerRight: "Autoevaluación orientativa · No diagnóstica",
        blocks: pdfBlocks()
      });
      state.pdfFilename = `mapa-bienestar-${new Date().toISOString().slice(0,10)}.pdf`;
    }
    return state.pdfBlob;
  }

  function downloadPdf() {
    try {
      const blob = buildPdf();
      window.DCPdf.download(blob, state.pdfFilename);
    } catch (error) {
      alert(error.message || "No se pudo generar el PDF.");
    }
  }

  function resetTest() {
    state.answers = {};
    state.visibleQuestions = [];
    state.currentIndex = 0;
    state.result = null;
    state.pdfBlob = null;
    state.pdfFilename = null;
    state.resultId = null;

    els.results.hidden = true;
    els.stage.hidden = false;
    els.hero.hidden = true;
    els.emailForm.hidden = true;
    els.emailStatus.hidden = true;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showEmailStatus(type, text) {
    els.emailStatus.hidden = false;
    els.emailStatus.className = `selftest-email-status ${type}`;
    els.emailStatus.textContent = text;
  }

  async function emailPdf(event) {
    event.preventDefault();
    if (!els.emailForm.reportValidity()) return;

    const email = els.resultEmail.value.trim().toLowerCase();
    els.sendEmail.disabled = true;
    els.sendEmail.textContent = "Enviando…";
    els.emailStatus.hidden = true;

    try {
      const blob = buildPdf();
      const pdfBase64 = await window.DCPdf.base64(blob);

      const response = await fetch("/api/autoevaluacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          resultId: state.resultId,
          version: VERSION,
          pdfBase64,
          filename: state.pdfFilename,
          website: ""
        })
      });

      let data = {};
      try { data = await response.json(); } catch (_) {}

      if (!response.ok) {
        throw new Error(data.error || "No pudimos enviar el correo.");
      }

      showEmailStatus("success", `Listo. Enviamos la copia a ${email}.`);
      els.sendEmail.textContent = "Enviado";
    } catch (error) {
      showEmailStatus(
        "warning",
        error.message || "El envío por correo todavía no está disponible. Podés descargar el PDF directamente."
      );
      els.sendEmail.disabled = false;
      els.sendEmail.textContent = "Enviar mi PDF";
    }
  }

  els.start.addEventListener("click", () => {
    els.hero.hidden = true;
    els.results.hidden = true;
    els.stage.hidden = false;
    state.currentIndex = 0;
    renderQuestion();
  });

  els.prev.addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  });

  els.exit.addEventListener("click", () => {
    const ok = window.confirm("¿Querés salir de la autoevaluación? Tus respuestas de esta sesión se descartarán.");
    if (!ok) return;
    state.answers = {};
    state.currentIndex = 0;
    els.stage.hidden = true;
    els.results.hidden = true;
    els.hero.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  els.downloadPdf.addEventListener("click", downloadPdf);

  els.showEmail.addEventListener("click", () => {
    els.emailForm.hidden = !els.emailForm.hidden;
    if (!els.emailForm.hidden) {
      setTimeout(() => els.resultEmail.focus(), 80);
    }
  });

  els.emailForm.addEventListener("submit", emailPdf);
  els.restart.addEventListener("click", resetTest);
})();
