# Psicométricos — Funnel de Research Pago v0.2

## Objetivo

Cerrar la fase de research con tráfico pago y medir el recorrido completo:

`Meta Ads → landing → survey_start → survey_complete → beta_click → beta_complete`

La encuesta es anónima. La solicitud Beta está separada y sí recoge datos de contacto.

## URLs de campaña

### Forense

https://www.diegocastillopsi.com/encuesta-psicometricos/?utm_source=meta&utm_medium=paid_social&utm_campaign=psi_research_oct26&utm_content=forense

### Clínica

https://www.diegocastillopsi.com/encuesta-psicometricos/?utm_source=meta&utm_medium=paid_social&utm_campaign=psi_research_oct26&utm_content=clinica

No hace falta crear dos landings. La UTM permite comparar las dos campañas en GA4 y Supabase.

## Antes del deploy

1. Abrir `supabase/encuesta-psicometricos.sql`.
2. Ejecutar todo el archivo en Supabase SQL Editor.
3. Verificar en Vercel > Project > Settings > Environment Variables:
   - `SURVEY_SUPABASE_URL`
   - `SURVEY_SUPABASE_SECRET_KEY` (preferida) o `SURVEY_SUPABASE_SERVICE_ROLE_KEY`
4. Confirmar que el Pixel `263685630967746` es el Pixel correcto en Meta Events Manager. Si no lo es, reemplazarlo en:
   - `encuesta-psicometricos/index.html`
   - `encuesta-psicometricos/gracias.html`
   - `encuesta-psicometricos/beta.html`

## Eventos GA4 / Meta

- `survey_view`: carga de la landing.
- `survey_start`: primera interacción con el formulario.
- `survey_complete`: respuesta guardada en Supabase.
- `beta_click`: clic desde Gracias hacia solicitud de Early Access.
- `beta_view`: apertura del formulario Beta.
- `beta_complete`: solicitud Beta guardada en Supabase.

Ningún evento de Analytics/Meta incluye respuestas del cuestionario, nombre, correo ni información clínica.

## Prueba end-to-end antes de gastar

Abrir la URL Forense y responder una encuesta de prueba.

Comprobar:

1. GA4 Tiempo real muestra `survey_view`, `survey_start`, `survey_complete`.
2. Supabase `survey_psicometricos_responses` tiene una fila con `utm_content = forense`.
3. En Gracias, tocar `Quiero probar Psicométricos`.
4. GA4 muestra `beta_click` y luego `beta_view`.
5. Completar la solicitud Beta.
6. Supabase `beta_psicometricos_leads` tiene una fila.
7. GA4 muestra `beta_complete`.

Después repetir con la URL Clínica y confirmar `utm_content = clinica`.

## Métricas del experimento

- Impresiones y CTR: Meta Ads.
- CPC: Meta Ads.
- Landing views: GA4.
- Tasa de inicio = survey_start / survey_view.
- Tasa de finalización = survey_complete / survey_start.
- Interés Beta = beta_click / survey_complete.
- Lead Beta = beta_complete / survey_complete.
- Costo por encuesta = gasto / survey_complete.
- Costo por lead Beta = gasto / beta_complete.

## Criterio de cierre del research

Objetivo orientativo: llegar a 40–60 respuestas totales o consumir el presupuesto del experimento, lo que ocurra primero, y analizar Forense vs Clínica por separado.
