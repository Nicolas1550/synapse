# Checklist de publicación

- [ ] Ejecutar `npm install` desde esta carpeta y generar `package-lock.json` nuevo.
- [ ] Ejecutar `npm run verify`, `npm run typecheck`, `npm run build` sin errores.
- [ ] Revisar en celular y desktop: menú, búsqueda/filtros, desplegables, enlaces externos.
- [ ] Revisar fechas, cargos y textos: se tomaron del PDF de LinkedIn proporcionado; confirmá que reflejen tu situación actual.
- [ ] Abrir las 17 imágenes y verificar todas las demos/repositorios públicos.
- [ ] Revisar `/projects/nebula`, `/projects/synapse` y `/projects/speed`: abrir demos y GitHub de NEBULA/SPEED V2; confirmar que SYNAPSE muestre «Próximamente» sin enlace inventado.
- [ ] Verificar `/cv-nicolas-luciuk.pdf` y actualizarlo si cambia alguna experiencia.
- [ ] Probar `/contact` y confirmar que el formulario abre el cliente de correo correctamente; LinkedIn y el mail directo son alternativas.
- [ ] Confirmar el dominio definitivo antes de publicar. Reemplazar canonical, sitemap y robots si cambia.
- [ ] Probar tarjeta de enlace en LinkedIn: `og-portfolio.jpg`.
- [ ] Hacer el deploy en Vercel y revisar los logs del build.

## Actualización de un repositorio existente

Copiá el contenido del ZIP **dentro de tu carpeta del proyecto** y conservá su `.git`.

```powershell
npm install
npm run verify
npm run typecheck
npm run build
git add -A
git commit -m "Portfolio final - experiencia, proyectos y CV"
git push origin main
```

El enlace de Vercel se actualizará automáticamente si el proyecto ya está conectado al repositorio.
