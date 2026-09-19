# Auditoría integral de Marketing, CRO y SEO — diegocastillopsi.com v0.3

Fecha de revisión: 19/09/2026  
Objetivo: preparar la web personal y, especialmente, la landing de Psicométricos para la etapa de Early Access y el posterior Sprint 02 de validación comercial.

## 1. Diagnóstico ejecutivo

La base previa era visualmente sólida y las landings clínicas ya tenían buena estructura: problema, proceso, límites profesionales y CTA. El principal problema no era de diseño sino de **estado comercial y jerarquía**.

Los cambios más importantes de esta versión buscan resolver cinco puntos:

1. La Home atendía varios públicos pero no los derivaba con suficiente rapidez hacia su necesidad concreta.
2. Psicométricos todavía se comunicaba como un “proyecto en desarrollo” y no como un producto utilizable.
3. La propuesta de Psicométricos estaba centrada en el motor técnico, pero no suficientemente en el trabajo que resuelve para el profesional.
4. Había elementos de conversión que todavía no funcionaban realmente (formulario de novedades).
5. Faltaban algunas capas transversales de SEO, metadata, tracking futuro y control de contenido duplicado.

## 2. Posicionamiento aplicado a Psicométricos

### Categoría
**Plataforma de procesamiento psicométrico para profesionales.**

Se evita posicionarlo principalmente como “tests online”, “IA diagnóstica” o distribuidor de instrumentos.

### Promesa principal
**Procesamiento psicométrico profesional, sin planillas.**

### Regla de marca
**Vos evaluás. Psicométricos procesa.**

### Tres pilares de diferenciación
- **Control:** scoring mediante reglas determinísticas.
- **Trazabilidad:** que el profesional pueda saber qué reglas, versiones y referencias corresponden a cada implementación.
- **Integración:** pasar de test aislados a un sistema de evaluación con casos, múltiples instrumentos y lotes.

### IA
La IA queda presentada como una capa **opcional y posterior al cálculo**, nunca como mecanismo de scoring ni como sustituto de la interpretación profesional.

## 3. Cambios realizados en la Home

### Hero
Se reemplazó un mensaje institucional amplio por una propuesta que sigue siendo de marca, pero explica inmediatamente las tres áreas:
- psicoterapia;
- tesis/metodología;
- tecnología profesional.

El espacio de fotografía queda preparado para insertar la foto profesional sin mostrar “Próximamente”.

### Navegación
Se simplificó para priorizar rutas con intención concreta:
- Psicoterapia
- Tesis y TFI
- Psicométricos
- Sobre mí
- Contacto

### Rutas de entrada
Se reescribió la sección inicial para que funcione como segmentador de audiencias y no sólo como descripción del ecosistema.

### Psicométricos en Home
El estado cambia de “En desarrollo activo” a **Early Access** y se incorporan las capacidades que hoy ya forman parte del producto: scoring determinístico, exportaciones, integración multi-test y evaluaciones múltiples.

### Novedades
El formulario anterior era sólo una vista previa y no enviaba información. Se reemplazó por un CTA funcional a WhatsApp hasta implementar una captación de email real.

## 4. Nueva landing de Psicométricos

La landing se reconstruyó alrededor del funnel comercial.

### 4.1 Hero
Ahora responde inmediatamente:
- qué es;
- qué hace;
- para quién;
- qué parte sigue siendo responsabilidad profesional;
- cuál es la acción siguiente.

CTA principal: **Probar Psicométricos**.

### 4.2 Problema
Se trabaja con dolores funcionales reales:
- cálculos y planillas;
- errores manuales;
- información fragmentada;
- integración de resultados.

### 4.3 Cómo funciona
El flujo se aclara explícitamente:
1. el profesional administra;
2. carga los datos necesarios;
3. Psicométricos procesa;
4. el profesional revisa, exporta e integra.

Esto también evita comunicar que el acceso al software equivale a disponer de derechos de administración de un instrumento.

### 4.4 Producto visible
La landing ya no se limita a explicar el motor. Se muestran tres escenarios:
- dashboard/casos;
- integración multi-test;
- evaluaciones múltiples.

### 4.5 Capacidades actuales
Se comunican:
- scoring determinístico;
- resultados y gráficos;
- casos e historial;
- exportaciones;
- integración multi-test;
- evaluaciones múltiples.

### 4.6 Casos de uso
Se separan tres trabajos diferentes:
- evaluación individual;
- batería psicométrica;
- múltiples protocolos/cohortes.

### 4.7 Catálogo
Se incorpora una sección específica para que un visitante pueda responder “¿está el instrumento que uso?”.

Catálogo reflejado en esta versión:
- BDI-II
- BAI
- SCL-90-R
- IHL
- MBI

**Antes de publicar definitivamente**, actualizar esta sección con los nuevos instrumentos que se incorporen durante los próximos días.

Se añadió además un CTA “Solicitar un instrumento” como mecanismo de Product Discovery.

### 4.8 Confianza y trazabilidad
Se incorpora como argumento comercial explícito el principio de que no sólo importa el resultado, sino también la posibilidad de identificar la lógica y referencias utilizadas en el procesamiento.

**Requisito de producto:** toda promesa que quede visible en producción debe corresponder a información efectivamente accesible o documentada en el producto.

### 4.9 IA
Se separa visual y conceptualmente scoring determinístico de asistencia IA.

### 4.10 FAQ
Se incorporaron las objeciones comerciales principales:
- administración de instrumentos;
- IA y scoring;
- interpretación profesional;
- instrumento faltante;
- datos personales;
- precio durante Early Access.

## 5. CRO

### Decisiones aplicadas
- Un CTA principal por momento del funnel.
- Menos lenguaje de “proyecto futuro” en productos que ya pueden utilizarse.
- Menos jerga técnica antes de explicar el beneficio.
- Más demostración de producto.
- Catálogo visible.
- Solicitud de instrumentos como señal de demanda.
- FAQ antes del CTA final.
- CTA final orientado a probar el flujo, no solamente “conocer” la plataforma.

### Conversión objetivo de Psicométricos
La acción que interesa medir no es sólo el clic hacia la plataforma.

Funnel recomendado:

`landing_view → platform_click → signup → onboarding → first_evaluation_completed → results_viewed → second_evaluation_completed → subscription_started`

Activation Event recomendado:

**Primer procesamiento completado + resultado visualizado.**

## 6. Hooks preparados para Analytics

Se agregaron atributos `data-track` a CTAs relevantes. No ejecutan Analytics por sí mismos; sirven para instrumentarlos posteriormente desde el chat de desarrollo.

Ejemplos específicos de Psicométricos:
- `psy_nav_early_access`
- `psy_hero_access`
- `psy_request_instrument`
- `psy_final_access`
- `psy_final_question`
- `psy_footer_platform`
- `psy_footer_whatsapp`

En otras páginas existen además hooks genéricos como:
- `calendly_click`
- `whatsapp_click`

## 7. SEO aplicado

### Realizado
- titles y descriptions revisados en Home y Psicométricos;
- canonical existente preservado;
- Open Graph image añadida como fallback de marca;
- Twitter image añadida;
- `theme-color` y autor;
- JSON-LD de `Person` + `WebSite` en Home;
- JSON-LD de `SoftwareApplication` + `FAQPage` en Psicométricos;
- JSON-LD `Service` en las principales páginas de servicios actuales;
- sitemap actualizado con `lastmod`;
- páginas legacy bajo `/pages/` marcadas `noindex,follow` además de redirects de Vercel;
- Organimétricas corregido para reflejar el nombre final.

### Siguiente fase SEO
No corresponde llenarla ahora con artículos genéricos. El siguiente sprint SEO de Psicométricos debería construir clusters por intención profesional, por ejemplo:
- scoring psicométrico;
- baremos;
- puntuaciones T;
- procesamiento de baterías;
- páginas informativas de instrumentos compatibles, respetando copyright/licencias;
- integración de múltiples resultados.

## 8. Foto profesional

La Home queda preparada para reemplazar el placeholder del Hero.

Recomendación al elegir la foto:
- encuadre vertical aproximadamente 4:5;
- mirada clara y fondo compatible con la paleta violeta/negro;
- versión WebP o AVIF;
- idealmente menos de 250–350 KB;
- no usar lazy-loading en la foto principal del Hero;
- definir ancho/alto para evitar layout shift.

El placeholder actual está identificado con:

`data-photo-slot="hero-professional-photo"`

## 9. Lo que NO conviene hacer antes del Early Access

- Esperar a tener decenas de instrumentos.
- Crear una estrategia de contenidos masiva antes de observar el uso real.
- Invertir fuerte en Ads antes de conocer activación y conversión.
- Prometer funcionalidades que todavía no estén disponibles.
- Presentar la IA como el producto principal.
- Publicar precios definitivos sin validar primero el comportamiento de los primeros usuarios.

## 10. Requisitos pendientes antes de abrir tráfico

### Imprescindible
1. Insertar la fotografía final de Home.
2. Actualizar el catálogo de Psicométricos con los tests nuevos efectivamente disponibles.
3. Revisar `/planes` y condiciones de Early Access en psicometricos.com.ar.
4. Instrumentar Analytics dentro del SaaS.
5. Instrumentar feedback de Beta dentro del SaaS.
6. Crear encuesta + formulario separado de postulación Beta.
7. Verificar privacidad, términos y documentación comercial del SaaS antes de cobro público.
8. Hacer una última revisión visual en un Preview Deployment de Vercel, desktop + mobile.

### Muy recomendable
9. Crear una imagen OG propia de Psicométricos cuando la identidad visual quede cerrada.
10. Conectar una verdadera captura de email para novedades cuando exista un flujo de consentimiento y baja.

## 11. Criterio para el Sprint 02

Esta web ya debe servir como infraestructura de lanzamiento, no como folleto conceptual.

Sprint 02 debería generar datos de tres fuentes en paralelo:

1. **Encuesta de mercado:** qué hacen y qué necesitan los profesionales.
2. **Beta de 10–15 usuarios:** qué hacen realmente dentro del producto.
3. **Early Access comercial:** quién convierte cuando se presenta una oferta real.

El Sprint 03 deberá decidir modificaciones de producto, pricing, SEO y adquisición basándose en esos tres conjuntos de evidencia.
