# Landing de Tesis + Meta Ads — paquete v0.1

Este paquete está preparado para el repositorio HTML estático de `diegocastillopsi.com`.

## Qué reemplaza / agrega

- `asesoria-tesis/index.html` — nueva landing de conversión.
- `css/asesoria-tesis.css` — estilos aislados para la landing.
- `js/asesoria-tesis.js` — formulario inteligente a WhatsApp, UTMs y eventos de medición.

La landing reutiliza activos que ya existen en la web:

- `assets/brand/logo-diego-castillo-web.png`
- `assets/images/diego-castillo-hero.webp`
- `assets/favicon/favicon-32.png`
- `assets/favicon/apple-touch-icon.png`

## Instalación en tu repo

1. Hacé una copia de seguridad o commit antes de reemplazar archivos.
2. Extraé el ZIP directamente en la raíz del repositorio `diegocastillopsi-home-v0.2.1` (o su nueva ubicación). La estructura del ZIP ya coincide con la estructura pública.
3. Confirmá que queden estos archivos:
   - `asesoria-tesis/index.html`
   - `css/asesoria-tesis.css`
   - `js/asesoria-tesis.js`
4. Probalo localmente desde la raíz:

```powershell
py -m http.server 8000
```

5. Abrí `http://localhost:8000/asesoria-tesis/`.
6. Probá el formulario final y verificá que abra WhatsApp con el mensaje correctamente armado.
7. Hacé commit + push a `main`; Vercel debería desplegar automáticamente.

## Tracking ya incorporado

### Google Analytics 4

Se incluyó la propiedad ya usada en el sitio:

`G-NE7YE3SDZD`

Eventos de interés:

- `thesis_cta_click`
- `thesis_service_selected`
- `generate_lead` (cuando la persona completa el formulario y abre WhatsApp)

### Meta Pixel

Se incluyó el Pixel que estaba instalado en la landing histórica:

`263685630967746`

Eventos:

- `PageView`
- `Lead` al completar el formulario y abrir WhatsApp

**Antes de invertir dinero:** entrar a Meta Events Manager y confirmar que ese Pixel siga siendo el dataset/pixel que querés usar en la cuenta publicitaria actual. Si Meta te muestra otro ID, reemplazar solo el número en `asesoria-tesis/index.html`.

## UTMs recomendadas

La landing guarda la atribución durante la sesión y agrega el origen al mensaje de WhatsApp.

Ejemplo para anuncio A:

`https://diegocastillopsi.com/asesoria-tesis/?utm_source=meta&utm_medium=paid_social&utm_campaign=tesis_prospecting_v01&utm_content=correcciones_a`

Usar un `utm_content` diferente para cada creativo permite comparar anuncios en GA4 y en los mensajes entrantes.

## Verificaciones antes de publicar

- Revisar en celular real, especialmente hero, formulario y CTA fijo.
- Comprobar que logo y foto carguen.
- Comprobar GA4 en DebugView/Realtime.
- Comprobar Meta Pixel con Events Manager / Test Events.
- Enviar una consulta de prueba completa a WhatsApp.
- Comprobar que `/asesoria-tesis/` esté indexable y tenga canonical correcto.

## Decisiones de copy incorporadas

- Se eliminan promesas absolutas como “progreso garantizado”.
- No se promete un plazo universal de finalización.
- Se posiciona el servicio como asesoría + corrección + apoyo de redacción académica.
- La redacción se presenta como apoyo sobre materiales, bibliografía, datos y decisiones del estudiante, manteniendo la autoría.
- El CTA principal es “Contame qué necesitás”, no “reservar turno”, para reducir fricción en tráfico frío.
