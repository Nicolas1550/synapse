# Portfolio de Nicolás — NEBULA + SYNAPSE + SPEED

Esta carpeta contiene el **portfolio profesional completo**, actualizado de 14 a 17 proyectos. Los tres proyectos creativos se presentan como fichas y capturas. **No se mezclaron las aplicaciones completas** con el código de este portfolio, para mantener el sitio rápido y fácil de publicar.

## 1. Ejecutar en Windows (PowerShell)

Descomprimí el ZIP. Abrí PowerShell en la carpeta que contiene `package.json`.

```powershell
npm.cmd install
npm.cmd run verify
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev
```

Abrí <http://localhost:3000> y revisá la sección **Proyectos**.

Las fichas nuevas están en:
- <http://localhost:3000/projects/nebula>
- <http://localhost:3000/projects/synapse>
- <http://localhost:3000/projects/speed>

## 2. Publicar en GitHub y Vercel

Si ya tenés el repositorio clonado, copiá el contenido de esta carpeta dentro de él **sin borrar `.git`**. Desde la carpeta del repositorio:

```powershell
npm.cmd install
npm.cmd run build
git add -A
git commit -m "Agregar NEBULA SYNAPSE y SPEED al portfolio"
git push origin main
```

Vercel detectará el cambio si el repositorio está conectado. Confirmá que la versión de Node.js seleccionada en Vercel sea compatible con el proyecto y admitida por la plataforma.

## 3. Demos y repositorios configurados

Las URLs proporcionadas por el autor ya están incorporadas en `src/app/data/projects.ts`:

- **NEBULA**: https://nebula-chi-two.vercel.app/ · https://github.com/Nicolas1550/nebula
- **SPEED V2**: https://speedv2-7rrl.vercel.app/ · https://github.com/Nicolas1550/speedv2
- **SYNAPSE**: **Próximamente** (sin demo ni repositorio públicos configurados).

Los botones *Ver demo en vivo* y *Código* aparecen en las tarjetas y en las fichas de NEBULA y SPEED. MakeUp y Peluquería conservan sus enlaces y videos.

## 4. Qué se preservó

Los 14 proyectos originales, sus enlaces, las notas de MakeUp/Peluquería, la experiencia profesional, el CV, el contacto, el diseño responsive y las páginas existentes.

## 5. Validación

Se verificaron 17 proyectos distintos, sus portadas, las imágenes de las tres fichas y la sintaxis TS/TSX. La compilación `npm run build` no pudo ejecutarse en el entorno de preparación porque no fue posible descargar las dependencias. Ejecutala localmente antes de publicar.
