PSICOMÉTRICOS — HOTFIX v0.2.1

Corrige la resolución de rutas relativas después de enviar la encuesta y al abrir la Beta.

Antes:
  new URL(urlString, location.origin)
Esto convertía ./gracias.html en /gracias.html.

Ahora:
  new URL(urlString, location.href)
Esto conserva el directorio /encuesta-psicometricos/.

Reemplazar:
  js/encuesta-psicometricos.js

Luego:
  git add -A
  git commit -m "fix: correct Psicométricos survey redirects"
  git push
