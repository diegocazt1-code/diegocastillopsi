# Formularios clínicos — Diego Castillo · v0.2

Paquete aditivo para `diegocastillopsi.com`. No reemplaza la Home ni las landings existentes.

## Rutas canónicas

- `/psicoterapia/consentimiento/`
- `/psicoterapia/feedback/`

## Rutas cortas para compartir

- `https://diegocastillopsi.com/consent/`
- `https://diegocastillopsi.com/feedback/`

Las rutas cortas son páginas estáticas de redirección, por lo que no hace falta tocar `vercel.json`.

## Qué incluye

### Consentimiento informado + encuadre
- identidad de marca y M.P. N.º 2669;
- modelo de trabajo integrador (TCC + terapias contextuales);
- derechos, confidencialidad, turnos, cancelación 24 h;
- revisión trimestral de honorarios y aviso previo de 15 días;
- certificados/informes/licencias;
- comunicación, urgencias y modalidad online;
- Patient diferido a una futura adenda específica;
- aceptación electrónica para mayores de 18 años;
- PDF descargable generado en el navegador;
- email automático al paciente + BCC profesional cuando Resend esté configurado.

### Feedback confidencial
- separado de marketing/testimonios;
- no pide nombre, email, teléfono ni DNI;
- 7 ítems propios de calidad de atención (1–5 + No aplica), no psicométricos;
- 4 preguntas abiertas opcionales;
- advertencia clara: no urgencias, no turnos, no respuesta clínica inmediata;
- PDF local con copia de las respuestas;
- email profesional automático con PDF adjunto;
- sin promesa de anonimato técnico absoluto.

## Copiar al repositorio

Copiar el contenido de este ZIP sobre la raíz de:

`C:\Users\diego_hokvopn\Documents\GitHub\diegocastillopsi-web`

Se agregan:

- `psicoterapia/consentimiento/index.html`
- `psicoterapia/feedback/index.html`
- `consent/index.html`
- `feedback/index.html`
- `css/clinical-forms.css`
- `js/pdf-lite.js`
- `js/consentimiento.js`
- `js/feedback.js`
- `api/_forms-common.js`
- `api/consentimiento.js`
- `api/feedback.js`

`pdf-lite.js` es local y no llama a una CDN externa para generar los PDFs.

## Variables de entorno en Vercel

Necesarias para email:

- `RESEND_API_KEY`
- `FORMS_FROM`
  - recomendado: `Diego Castillo | Psicoterapia <formularios@notificaciones.diegocastillopsi.com>`
- `CONSENT_REPLY_TO`
  - recomendado cuando Workspace esté activo: `consultas@diegocastillopsi.com`
- `CONSENT_ARCHIVE_EMAIL`
  - recomendado: `diego@diegocastillopsi.com`
- `FEEDBACK_TO_EMAIL`
  - recomendado: `diego@diegocastillopsi.com`

### Subdominio recomendado en Resend

Verificar `notificaciones.diegocastillopsi.com` en Resend. Esto mantiene separado:

- correo humano: Google Workspace / `@diegocastillopsi.com`
- correo automático: Resend / `@notificaciones.diegocastillopsi.com`

## Privacidad y almacenamiento

Esta v0.2 deliberadamente NO crea una base clínica.

Consentimiento:
- nombre y email sólo para constancia y envío;
- PDF al paciente;
- BCC opcional a la casilla profesional.

Feedback:
- no solicita identificación directa;
- se envía al correo profesional;
- el PDF queda en el dispositivo de quien responde y en el email profesional.

Los proveedores de hosting/email pueden generar registros técnicos. Por eso el feedback se describe como "sin datos identificatorios solicitados", no como anonimato técnico absoluto.

## Limitaciones v0.2

- No hay rate limiting persistente. Hay honeypot, validación de origen y tiempo mínimo de completado. Si aparece spam, el siguiente paso es incorporar Turnstile o rate limiting sin agregarlo antes de necesitarlo.
- El email debe configurarse antes de usar ambos formularios con pacientes reales.
- El consentimiento está diseñado para mayores de 18 años. Menores requieren un flujo específico de consentimiento de responsables + asentimiento cuando corresponda.
- Antes de fijar esta versión como documento jurídico definitivo a largo plazo, es recomendable una revisión profesional/jurídica local.

## Testing sugerido

1. Copiar archivos.
2. Abrir localmente las dos rutas y revisar mobile.
3. Probar descarga PDF de consentimiento.
4. Probar feedback: hasta que el email esté configurado, el envío devolverá error y NO descargará constancia de envío; esto es intencional.
5. Configurar Resend + variables Vercel.
6. Hacer una prueba real a un email propio.
7. Verificar BCC del consentimiento y recepción del feedback.
8. Recién después compartir las URLs con pacientes.

## Commit sugerido

```bash
git add .
git commit -m "Agrega consentimiento y feedback de psicoterapia"
git push
```
