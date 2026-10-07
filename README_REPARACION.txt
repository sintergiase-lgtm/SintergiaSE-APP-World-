SintergiaSE APP — reparación GitHub Pages

Contenido:
- index.html: v3_63 reparado; limpia Service Workers antiguos que podían servir
  una versión histórica con Three.js y evita registrar un SW inexistente.
- sw.js: Service Worker actualizado; purga caches antiguas y nunca intercepta
  Supabase /functions/v1.
- manifest.webmanifest: manifiesto relativo compatible con GitHub Pages en raíz.

La corrección NO modifica las credenciales ni la lógica de Supabase.
