# Fix enlace “Ver el libro” — v0.1.1

Problema: si la biblioteca se abre como `/recursos` (sin barra final), un enlace relativo como `cuando-el-trabajo-dana/index.html` se resuelve como `/cuando-el-trabajo-dana/index.html`.

Solución:
- enlaces del libro convertidos a rutas absolutas desde la raíz (`/recursos/cuando-el-trabajo-dana/`);
- rutas críticas de assets y descarga robustecidas;
- fallback `/cuando-el-trabajo-dana/index.html` que redirige a la URL canónica para cubrir enlaces viejos/caché.

Copiar el contenido de este ZIP sobre la raíz del proyecto y aceptar reemplazos. Luego `git add .`, `git commit` y `git push`.
