# Landings clínicas v0.1 — paquete completo

Este paquete incorpora en una sola carga:

- `pages/ansiedad/index.html`
- `pages/burnout/index.html`
- `pages/acoso-laboral/index.html`
- `pages/estado-de-animo/index.html`
- `pages/psicoterapia/index.html` actualizado para enlazar las cuatro páginas
- `css/clinica.css` compartido
- `css/psicoterapia.css` completo, sin cambios sustantivos pero incluido para facilitar la carga

## Arquitectura

Las cuatro landings usan un único sistema visual y estructural reutilizable.
Esto permite corregir estilos globales de la familia clínica desde `css/clinica.css`
sin mantener cuatro hojas de estilo independientes.

## Estructura clínica común

1. Hero específico
2. Señales / motivos frecuentes
3. Qué buscamos entender
4. Qué puede trabajarse durante el proceso
5. Admisión → Formulación → Intervención → Revisión
6. Posibilidad de proceso estructurado cuando corresponda
7. Nota contextual específica
8. Páginas clínicas relacionadas
9. FAQ
10. CTA Calendly + WhatsApp

## Criterios importantes

- No se presentan las páginas como autodiagnóstico.
- No se prometen resultados ni duraciones universales.
- No se venden packs de sesiones antes de admisión/evaluación.
- Burnout contempla factores individuales y organizacionales.
- Acoso laboral diferencia psicoterapia de peritaje y asesoramiento jurídico.
- Estado de ánimo contempla interconsulta cuando corresponda e incluye una nota para situaciones de emergencia.
- Los textos deben tener una revisión clínica/final antes del lanzamiento público.

## Cómo cargar

Copiar/mergear las carpetas `pages` y `css` dentro del proyecto actual.

La carpeta `assets` no se modifica.
`js/app.js` tampoco requiere cambios.

## URLs locales

- `pages/psicoterapia/index.html`
- `pages/ansiedad/index.html`
- `pages/burnout/index.html`
- `pages/acoso-laboral/index.html`
- `pages/estado-de-animo/index.html`

Antes del deploy final se definirán URLs públicas limpias, SEO definitivo y redirects 301
desde cualquier URL histórica de TiendUp que corresponda.
