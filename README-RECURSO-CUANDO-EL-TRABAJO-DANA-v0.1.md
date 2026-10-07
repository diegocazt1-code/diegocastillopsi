# Recurso editorial — Cuando el trabajo daña v0.1

Integración realizada el 2026-10-06.

## Rutas
- `/recursos/` — biblioteca general.
- `/recursos/cuando-el-trabajo-dana/` — landing del libro.
- `/downloads/cuando-el-trabajo-dana-diego-castillo.pdf` — PDF descargable.

## Assets
`assets/recursos/cuando-el-trabajo-dana/` contiene mockups WebP y la imagen Open Graph JPG.

## Analítica
`js/app.js` registra elementos con `data-track`. Para este recurso se usan:
- `resource_open` (clic hacia la landing)
- `resource_view` (carga de la landing)
- `resource_download`

Parámetros: `resource_name`, `resource_type`, `resource_location`, además de `link_text` y `link_url` cuando corresponde.

## SEO
Se agregó metadata Open Graph/Twitter y datos estructurados `Book` en la landing. También se agregaron las rutas al sitemap.

## Próximos recursos
La estructura de `/recursos/` y `css/recursos.css` queda preparada para replicar nuevos libros o descargables sin rediseñar la biblioteca.
