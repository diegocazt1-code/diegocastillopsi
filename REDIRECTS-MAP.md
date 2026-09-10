# Mapa de URLs y redirects

## URLs públicas limpias

- `/` → Home
- `/psicoterapia/`
- `/psicoterapia/ansiedad/`
- `/psicoterapia/burnout/`
- `/psicoterapia/acoso-laboral/`
- `/psicoterapia/estado-de-animo/`
- `/asesoria-tesis/`
- `/programa-grupal-tfi/`
- `/psicometricos/`
- `/organimetricas/`

## Redirects históricos de TiendUp

- `/page/psicologo-laboral-estres-ansiedad` → `/psicoterapia/`
- `/page/asesorias-de-tesis` → `/asesoria-tesis/`
- `/page/tesis` → `/programa-grupal-tfi/`

También se incluyen redirects desde las rutas temporales usadas durante el desarrollo en `/pages/...`.

`vercel.json` contiene la configuración si el deploy final se hace en Vercel.
Si se elige otro hosting, este archivo funciona como mapa de migración aunque la sintaxis del redirect deberá adaptarse al proveedor.
