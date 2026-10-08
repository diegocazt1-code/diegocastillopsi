# Configuración de correo — formularios clínicos

La implementación ya queda preparada en código, pero no se incluyen claves privadas en el repositorio.

## Arquitectura

Paciente / navegador
→ Vercel Function (`/api/consentimiento` o `/api/feedback`)
→ Resend
→ correo del paciente / correo profesional

## Recomendación

### Google Workspace
Correo humano:
- `diego@diegocastillopsi.com`
- alias `consultas@diegocastillopsi.com`

### Resend
Correo automático:
- subdominio `notificaciones.diegocastillopsi.com`
- sender sugerido `formularios@notificaciones.diegocastillopsi.com`

## Variables

En Vercel → Project → Settings → Environment Variables:

```text
RESEND_API_KEY=re_xxxxxxxxx
FORMS_FROM=Diego Castillo | Psicoterapia <formularios@notificaciones.diegocastillopsi.com>
CONSENT_REPLY_TO=consultas@diegocastillopsi.com
CONSENT_ARCHIVE_EMAIL=diego@diegocastillopsi.com
FEEDBACK_TO_EMAIL=diego@diegocastillopsi.com
```

No subir `.env` con claves reales a GitHub.

## Consentimiento

Al aceptar:
1. se genera PDF local;
2. se descarga inmediatamente;
3. se envía el mismo PDF al paciente;
4. se envía BCC al archivo profesional.

Si el email falla, el paciente mantiene el PDF descargado y la interfaz avisa la incidencia.

## Feedback

Al enviar:
1. la API debe confirmar el envío al email profesional;
2. recién entonces se descarga la copia PDF local;
3. no se pide email del paciente.

Esto evita mostrar una "constancia de envío" cuando el backend no pudo recibir la respuesta.
