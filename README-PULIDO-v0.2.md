# DiegoCastilloPsi — Pulido integral v0.2

Esta versión consolida la web y aplica la primera revisión minuciosa.

## Cambios de contenido
- Home: “Tres formas de entrar a un mismo universo de acompañamiento y desarrollo.”
- Footer: sello circular bicolor oficial en todas las páginas.
- Asesoría de tesis: se elimina la afirmación de que Diego es investigador/docente actualmente.
  Se describe experiencia previa en investigación/docencia y la coautoría del capítulo
  “La enseñanza de la investigación en psicología” en el libro
  “Metodología de la investigación: el desafío de su enseñanza” (UFLO Universidad, 2024).
- Programa renombrado a “Programa grupal TFI / Tesis”.
- Programa TFI: grupo privado de WhatsApp + videollamadas grupales.
- Programa TFI: anexos detallados (estadística; defensa; gestión del proceso/desarrollo personal).
- Programa TFI: recorrido circular y preview visual de diapositiva/hoja de ruta.
- Psicométricos: recorrido circular, preview visual de plataforma, validación argentina destacada,
  disclaimer de fuentes reformulado y futura acreditación profesional.
- Organométrica pasa a Organimétricas.
- Organimétricas: recorrido circular, evaluación mixta cuantitativa/cualitativa,
  medición in situ y beneficios para organizaciones.

## URLs limpias
La carpeta `/pages` deja de ser parte de la URL pública.
Ver `REDIRECTS-MAP.md`.

## SEO
Cada página incluye:
- title
- meta description
- canonical
- robots
- Open Graph
- Twitter summary

Además:
- `robots.txt`
- `sitemap.xml`

## Redirects
`vercel.json` incluye redirects 301 para las URLs históricas conocidas de TiendUp
y las rutas temporales usadas durante el desarrollo.

## Carga
Esta versión está pensada para reemplazar/mergear la estructura actual del proyecto.

IMPORTANTE:
- Conservá cualquier archivo local propio que no aparezca en este ZIP.
- Todavía falta la fotografía profesional.
- El newsletter/formulario sigue pendiente de backend real.
- Antes del deploy final haremos revisión mobile, enlaces y pruebas.
