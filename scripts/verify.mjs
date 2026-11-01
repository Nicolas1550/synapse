import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'src/app/page.tsx', 'src/app/layout.tsx', 'src/app/components/projects/projects.tsx',
  'src/app/components/cases/cases.tsx', 'src/app/components/recruiter/recruiter.tsx',
  'src/app/projects/[slug]/page.tsx', 'src/app/data/creativeCases.ts',
  'src/app/robots.ts', 'src/app/sitemap.ts', 'public/og-portfolio.jpg',
  'public/cv-nicolas-luciuk.pdf',
];
let failures = 0;
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) { console.error('Falta:', file); failures++; }
}
const source = fs.readFileSync(path.join(root, 'src/app/data/projects.ts'), 'utf8');
const ids = [...source.matchAll(/"id":\s*"([a-zA-Z0-9-]+)"/g)].map((match) => match[1]);
if (ids.length !== 17 || new Set(ids).size !== 17) {
  console.error(`Se esperaban 17 proyectos distintos, hay ${ids.length}`);
  failures++;
}
const covers = [...source.matchAll(/"image":\s*"(\/projects\/[^\"]+)"/g)].map((match) => match[1]);
const creative = fs.readFileSync(path.join(root, 'src/app/data/creativeCases.ts'), 'utf8');
const gallery = [...creative.matchAll(/src: '(\/projects\/[^']+)'/g)].map((match) => match[1]);
for (const asset of [...covers, ...gallery]) {
  if (!fs.existsSync(path.join(root, 'public', asset.replace(/^\//, '')))) {
    console.error('Imagen faltante:', asset); failures++;
  }
}
for (const id of ['makeup', 'peluqueria', 'boticpartners', 'equilibrio', 'chicksgold', 'chicksx', 'nebula', 'synapse', 'speed']) {
  if (!ids.includes(id)) { console.error('Proyecto esencial ausente:', id); failures++; }
}
const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
for (const id of ['nebula', 'synapse', 'speed']) {
  if (!source.includes(`"caseStudy": "/projects/${id}"`) || !sitemap.includes(`/projects/${id}`)) {
    console.error('Falta ficha o sitemap para:', id); failures++;
  }
}
for (const url of [
  'https://nebula-chi-two.vercel.app/',
  'https://github.com/Nicolas1550/nebula',
  'https://speedv2-7rrl.vercel.app/',
  'https://github.com/Nicolas1550/speedv2',
]) {
  if (!source.includes(url)) { console.error('Enlace de proyecto ausente:', url); failures++; }
}
const synapseBlock = source.match(/"id": "synapse",[\s\S]*?"caseStudy": "\/projects\/synapse",\s*"comingSoon": true/);
if (!synapseBlock || !synapseBlock[0].includes('"link": null')) {
  console.error('SYNAPSE debe permanecer como Próximamente sin URL pública'); failures++;
}
console.log(`Proyectos: ${ids.length} · Portadas: ${covers.length} · Imágenes adicionales: ${gallery.length} · Archivos críticos: ${required.length}`);
if (failures) process.exit(1);
console.log('OK: controles estructurales superados. Esto NO reemplaza npm run build.');
