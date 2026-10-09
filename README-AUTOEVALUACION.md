# Autoevaluación web — Mapa de bienestar actual v0.1

Ruta principal:

`https://diegocastillopsi.com/autoevaluacion/`

Acceso corto incluido:

`https://diegocastillopsi.com/test/`

## Archivos

Copiar dentro de la raíz actual del repositorio:

- `autoevaluacion/index.html`
- `test/index.html`
- `css/autoevaluacion.css`
- `js/autoevaluacion.js`
- `api/autoevaluacion.js`
- `README-AUTOEVALUACION.md`
- `METODOLOGIA-AUTOEVALUACION.md`
- `INTEGRACION-HOME-AUTOEVALUACION.md`

## Dependencia reutilizada

La página usa:

`js/pdf-lite.js`

Ese archivo ya forma parte del paquete de Consentimiento + Feedback v0.2 que está instalado en la web.

No se duplica aquí para evitar dos motores PDF distintos.

## Qué hace la v0.1

1. El visitante inicia sin registro.
2. Responde una pregunta por pantalla.
3. Si indica que el contexto laboral es relevante, aparecen 3 preguntas adicionales.
4. Todo el scoring se ejecuta localmente en el navegador.
5. Se muestran:
   - área más marcada;
   - mapa de señales;
   - interferencia cotidiana;
   - 3 preguntas de reflexión;
   - contenido recomendado;
   - CTA opcional a turno.
6. El visitante puede descargar un PDF.
7. Si quiere, puede ingresar un email y enviarse ese PDF.

## Importante

No es un test psicométrico validado.
No usa baremos.
No diagnostica.
No genera porcentajes de enfermedad.
No afirma burnout ni acoso laboral.
No sustituye evaluación profesional.

Ver `METODOLOGIA-AUTOEVALUACION.md`.

## Email opcional

La API reutiliza la infraestructura prevista para Resend.

Variables:

- `RESEND_API_KEY`
- `FORMS_FROM`
- `CONSENT_REPLY_TO` (opcional como reply-to)

No envía copia del resultado a Diego por defecto.

Decisión intencional:
el autotest es una experiencia pública y el resultado pertenece al visitante. Si desea compartirlo en consulta puede descargar el PDF y hacerlo voluntariamente.

## Testing local

Como la página es estática, la evaluación y el PDF pueden probarse localmente aunque Resend todavía no esté configurado.

El envío de email fallará de forma controlada hasta configurar las variables en Vercel.

## Commit sugerido

```bash
git status
git add .
git commit -m "Agrega mapa de bienestar y autoevaluacion web"
git push
```

Antes del commit:
- probar escritorio;
- probar móvil;
- recorrer resultado con contexto laboral = Sí;
- recorrer resultado con contexto laboral = No;
- probar descarga PDF;
- probar volver atrás;
- probar rehacer;
- revisar textos clínicos.
