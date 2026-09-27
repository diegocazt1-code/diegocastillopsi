# Meta Ads — estrategia de lanzamiento v0.1

## 1. Qué cambia respecto de la publicidad anterior

La publicidad sigue siendo de descubrimiento: la persona no tiene que buscarte en Google. Meta puede mostrar el anuncio mientras usa Instagram o Facebook, según audiencia, objetivo, señales y sistema de entrega.

La diferencia es el recorrido:

**Antes**
Anuncio → WhatsApp

**Ahora**
Anuncio → Landing específica → persona se identifica con su problema → completa una consulta breve → WhatsApp

La landing permite explicar mejor la oferta, filtrar mejor y medir qué anuncio produce consultas con intención real.

## 2. Herramienta recomendada

Para esta versión conviene usar **Meta Ads Manager**, no depender únicamente del botón de “publicitar” dentro de WhatsApp Business.

La app de WhatsApp Business es muy práctica para crear anuncios cuyo destino es una conversación de WhatsApp. Como ahora queremos que el anuncio visite primero la landing, Ads Manager da más control sobre destino web, objetivo, Pixel, UTMs, creativos, públicos y comparación de resultados.

## 3. Arquitectura inicial de campaña

### Campaña

Nombre sugerido:

`TESIS | Prospecting | Landing | V01`

Objetivo recomendado:

- Primera opción: **Leads**, con sitio web como ubicación/conversión si tu cuenta lo ofrece y usando el evento `Lead` del Pixel.
- Si esa configuración no aparece o da problemas al principio: usar **Traffic** optimizando a visitas de página de destino durante una fase corta de validación, y pasar luego a Leads.

### Conjunto de anuncios inicial

Nombre:

`AR | 21-45 | Broad | Advantage+`

Configuración de arranque:

- Ubicación: Argentina.
- Edad de prueba: 21–45.
- Sexo: todos.
- Idioma: español (si Meta permite dejar idioma abierto, también es válido para Argentina).
- Audiencia: empezar amplia; usar intereses solo como sugerencias si Advantage+ Audience está activo.
- Ubicaciones: **Advantage+ placements** al inicio.
- Dispositivos: automáticos.
- Destino: `https://diegocastillopsi.com/asesoria-tesis/` con UTMs.

No crear cinco audiencias pequeñas desde el primer día. Con poco presupuesto, fragmentar demasiado dificulta aprender qué funciona.

## 4. Creativos para el primer test

Usar 3 ángulos dentro del mismo conjunto de anuncios.

### Creativo A — problema general

**Texto visual corto**

TU TESIS PUEDE ESTAR TRABADA. VOS NO.

Asesoría · Corrección · Apoyo de redacción académica

**Texto principal**

Una tesis puede frenarse por una devolución que no se entiende, una metodología que no termina de cerrar o un texto que necesita estructura. Revisamos tu caso, definimos qué está bloqueando el avance y armamos un camino concreto para resolverlo.

**Título**

Volvé a avanzar con tu tesis

**CTA**

Más información

### Creativo B — correcciones

**Texto visual corto**

¿TE DEVOLVIERON LA TESIS CON CORRECCIONES?

Primero entendamos qué hay que cambiar.

**Texto principal**

Si recibiste observaciones de tu tutor o jurado, podés enviarme el trabajo y la devolución. Evaluamos qué correcciones son prioritarias, cuánto trabajo requieren y cuál es la mejor forma de abordarlas.

**Título**

Revisemos las correcciones

**CTA**

Más información

### Creativo C — redacción / estructura

**Texto visual corto**

TENÉS MATERIAL. FALTA DARLE FORMA.

Estructura · Coherencia · Redacción académica

**Texto principal**

Si ya investigaste pero te cuesta convertir ideas, bibliografía o resultados en un texto académico claro, puedo ayudarte a ordenar y mejorar el desarrollo sin perder tu autoría ni el control del trabajo.

**Título**

Mejorá el desarrollo de tu trabajo

**CTA**

Más información

## 5. Formatos

Preparar cada concepto en dos formatos principales:

- Feed: 1080 × 1350 (4:5).
- Stories/Reels: 1080 × 1920 (9:16), manteniendo textos principales dentro de la zona segura.

La pieza anterior era 1:1 y contenía demasiada información. En Meta, el anuncio debería detener el scroll y vender el clic; la landing se ocupa de explicar.

## 6. Video corto para segundo test

Duración: 15–25 segundos.

Guion base:

**0–3 s — hook**
“Si tu tesis está frenada, el problema no siempre es que te falte escribir más.”

**3–10 s — tensión**
“A veces hay una observación que no se entiende, una metodología que no cierra o demasiadas cosas para corregir al mismo tiempo.”

**10–18 s — solución**
“Trabajo con asesorías, correcciones y apoyo de redacción académica para ordenar el problema y definir el próximo paso.”

**18–25 s — CTA**
“Entrá a la página, contame en qué etapa estás y vemos qué necesitás.”

Plano recomendado: cámara a la altura de los ojos, plano medio/corto, fondo habitual de consultorio/escritorio, audio con Razer Seiren Mini y subtítulos grandes.

## 7. Presupuesto: cómo decidirlo

No fijar un monto “mágico” en pesos antes de saber el precio actual de tus servicios y el costo por consulta real.

Usar esta lógica:

1. Definir cuánto estás dispuesto a pagar por conseguir una venta nueva (CAC máximo).
2. Medir qué porcentaje de consultas calificadas termina comprando.
3. Calcular el CPL máximo tolerable:

`CPL máximo ≈ CAC máximo × tasa de cierre`

Ejemplo ilustrativo: si toleraras un CAC de $60.000 y cerraras 1 de cada 4 consultas calificadas, el CPL de equilibrio comercial sería aproximadamente $15.000. Es solo un ejemplo; reemplazar por tus números reales.

Para el primer test, priorizar continuidad durante al menos 7–10 días antes de sacar conclusiones, salvo que exista un problema evidente de tracking o de calidad del tráfico.

## 8. Qué medir

Orden de métricas:

1. Ventas generadas.
2. Costo de adquisición de cliente (CAC).
3. Consultas calificadas por WhatsApp.
4. Costo por lead/consulta.
5. Tasa Landing → Lead.
6. Visitas de landing.
7. CTR del anuncio.
8. CPM y frecuencia como métricas diagnósticas.

No optimizar la campaña únicamente porque un anuncio consigue clics baratos.

## 9. Test que conviene hacer después

Cuando tengamos volumen suficiente, comparar:

**Ruta A** — Meta Ad → Landing → WhatsApp.

**Ruta B** — Meta Ad → WhatsApp directo.

La ganadora no será la que tenga el WhatsApp más barato, sino la que produzca más ventas y mejor CAC.

## 10. UTMs por anuncio

Base:

`utm_source=meta`
`utm_medium=paid_social`
`utm_campaign=tesis_prospecting_v01`

Contenido por creativo:

- `utm_content=general_a`
- `utm_content=correcciones_b`
- `utm_content=redaccion_c`

## 11. Checklist para crear la campaña en Ads Manager

- Página de Facebook conectada.
- Cuenta de Instagram conectada.
- Cuenta publicitaria activa.
- Método de pago válido.
- Pixel/dataset verificado en Events Manager.
- Dominio `diegocastillopsi.com` disponible en los activos correspondientes.
- Landing publicada y testeada.
- Creativos 4:5 y 9:16 preparados.
- URL con UTMs.
- Evento `Lead` visible en Test Events antes de publicar.

## 12. Pago

Meta solicita un método de pago válido para publicar. Las opciones disponibles dependen del país, la moneda y la configuración de la cuenta. En la app de WhatsApp Business, Meta informa que pueden estar disponibles tarjetas de crédito/débito, PayPal, débito bancario o métodos locales según país y moneda.

Para Ads Manager, configurar el método de pago desde la cuenta publicitaria y revisar:

- moneda de la cuenta;
- zona horaria;
- método de facturación disponible;
- límite de gasto de cuenta, si querés una protección adicional.

No cambiar moneda/zona horaria de una cuenta existente sin necesidad: Meta puede requerir crear una nueva cuenta publicitaria según el cambio.

## 13. Fase de retargeting posterior

No lanzar retargeting el día 1 si todavía casi nadie visitó la landing.

Cuando exista volumen, crear audiencia de:

- visitantes de `/asesoria-tesis/`;
- personas que interactuaron con Instagram/Facebook;
- personas que vieron una parte relevante de los videos;
- excluir leads/clientes cuando sea posible.

Mensaje de retargeting sugerido:

“Si ya estuviste viendo cómo destrabar tu trabajo, podés contarme en qué etapa estás. Revisamos el caso antes de definir cualquier servicio.”
