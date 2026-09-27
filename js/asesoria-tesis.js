(() => {
  const WHATSAPP_PHONE = '542984681206';
  const form = document.getElementById('thesisLeadForm');
  const serviceSelect = document.getElementById('serviceSelect');
  const errorBox = document.getElementById('formError');

  const params = new URLSearchParams(window.location.search);
  const attribution = {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    content: params.get('utm_content') || '',
    term: params.get('utm_term') || ''
  };

  if (Object.values(attribution).some(Boolean)) {
    sessionStorage.setItem('thesis_attribution', JSON.stringify(attribution));
  }

  const storedAttribution = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('thesis_attribution') || '{}');
    } catch (_) {
      return {};
    }
  })();

  function track(name, params = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  }

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      track('thesis_cta_click', {
        cta_location: el.dataset.track,
        page_path: window.location.pathname
      });
    });
  });

  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      if (serviceSelect) serviceSelect.value = link.dataset.service;
      track('thesis_service_selected', { service: link.dataset.service });
    });
  });

  function inferSourceLabel() {
    const source = (storedAttribution.source || '').toLowerCase();
    if (source.includes('meta') || source.includes('facebook') || source.includes('instagram') || source === 'ig' || source === 'fb') {
      return 'Anuncio de Instagram/Facebook';
    }
    if (source) return storedAttribution.source;
    return 'Sitio web';
  }

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorBox.textContent = '';

    const required = [...form.querySelectorAll('[required]')];
    let firstInvalid = null;
    required.forEach((field) => {
      field.classList.remove('field-invalid');
      if (!field.value.trim()) {
        field.classList.add('field-invalid');
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) {
      errorBox.textContent = 'Completá los campos obligatorios para preparar la consulta.';
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const career = data.get('career');
    const stage = data.get('stage');
    const service = data.get('service');
    const deadline = data.get('deadline') || 'Sin fecha definida';
    const institution = data.get('institution') || 'No indicada';
    const message = data.get('message');

    const lines = [
      'Hola Diego. Vengo de la página de asesorías de tesis y quería consultarte por mi trabajo.',
      '',
      `Carrera: ${career}`,
      `Etapa actual: ${stage}`,
      `Necesito principalmente: ${service}`,
      `Fecha aproximada de entrega: ${deadline}`,
      `Institución: ${institution}`,
      '',
      `Situación: ${message}`,
      '',
      `Origen: ${inferSourceLabel()}`
    ];

    const campaign = storedAttribution.campaign || '';
    if (campaign) lines.push(`Campaña: ${campaign}`);

    track('generate_lead', {
      method: 'whatsapp_prefill',
      service,
      campaign: campaign || '(direct)'
    });

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'Consulta tesis',
        content_category: service
      });
    }

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  form.addEventListener('input', (event) => {
    if (event.target.classList.contains('field-invalid') && event.target.value.trim()) {
      event.target.classList.remove('field-invalid');
    }
  });
})();
