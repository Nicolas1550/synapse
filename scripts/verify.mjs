import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const sourcePath = path.join(root, 'src/app/data/projects.ts');
const projectText = fs.readFileSync(sourcePath, 'utf8');
const match = projectText.match(/export const portfolioProjects: PortfolioProject\[\] = (\[[\s\S]*?\]);/);
if (!match) { console.error('No se encontró el catálogo del portafolio.'); process.exit(1); }
let projects;
try { projects = JSON.parse(match[1]); } catch(err){ console.error('Error de datos:',err.message); process.exit(1); }
const expected = ['nebula','synapse','atlas','eon','speed','frame','sentinel','quantum','chicksx','boticpartners','equilibrio','chicksgold','tangoWeb','congreso','tangoFondo','fundamentals','bici','makeup','ceo-training','ciencia','peluqueria','capacitacionbursatil'];
let failures = [];
const ids = projects.map(p => p.id);
if (projects.length !== 22 || new Set(ids).size !== 22) failures.push(`Deben existir 22 proyectos distintos; hay ${projects.length}`);
for (const id of expected) if (!ids.includes(id)) failures.push(`Proyecto faltante: ${id}`);
for (const project of projects){
  if(!project.image?.startsWith('/projects/')) failures.push(`${project.id}: portada incorrecta`);
  else if (!fs.existsSync(path.join(root, 'public',project.image.slice(1)))) failures.push(`Falta imagen: ${project.image}`);
  for(const field of ['link','github','frontendGithub','backendGithub','demoVideo']){
    const value=project[field];
    if(value != null && !/^https:\/\/[a-z0-9.-]+(?:\/[^\s]*)?$/i.test(value))failures.push(`${project.id}: enlace inválido en ${field}`);
  }
}
const grounded = {
  nebula: ['https://nebula-chi-two.vercel.app/','https://github.com/Nicolas1550/nebula'],
  synapse: ['https://synapse-le8l.vercel.app/','https://github.com/Nicolas1550/synapse'],
  atlas: ['https://atlas-gamma-blue.vercel.app/','https://github.com/Nicolas1550/atlas'],
  eon: ['https://eon-three-henna.vercel.app/','https://github.com/Nicolas1550/eon'],
  speed: ['https://speedv2-7rrl.vercel.app/','https://github.com/Nicolas1550/speedv2'],
  frame: ['https://frame-sandy-nine.vercel.app/','https://github.com/Nicolas1550/frame'],
  sentinel: ['https://sentinel-sooty-two.vercel.app/','https://github.com/Nicolas1550/sentinel'],
  quantum: ['https://trading-indol-tau.vercel.app/','https://github.com/Nicolas1550/trading']
};
for (const [id, [live,repo]] of Object.entries(grounded)){
  const item=projects.find(p=>p.id===id);
  if(!item || item.link !== live || item.github !== repo) failures.push(`${id}: demo o repositorio incorrecto`);
  if(item?.comingSoon) failures.push(`${id}: se sigue marcando Próximamente`);
}
for (const id of ['nebula','synapse','atlas','eon','frame','sentinel','quantum']){
  if(projects.find(p=>p.id===id)?.image!==`/projects/${id}.webp`) failures.push(`${id}: no utiliza la portada nueva`);
}
for (const file of ['src/data/showcase.ts','src/data/portfolioProjects.ts','src/components/NeuralCore.tsx','src/components/ProjectShowcase.tsx','src/app/components/projects/projects.tsx','src/app/projects/[slug]/page.tsx','src/app/data/creativeCases.ts']){
  if(!fs.existsSync(path.join(root,file)))failures.push(`Falta ${file}`);
}
const showcase=fs.readFileSync(path.join(root,'src/data/showcase.ts'),'utf8');
if(!showcase.includes('portfolioProjects.filter(p=>!creativeIds.has(p.id))')) failures.push('Project DNA no deduplica proyectos creativos');
for (const id of ['nebula','synapse','atlas','eon','speed']){
  if(!showcase.includes(`id: '${id}'`))failures.push(`Falta panel creativo de ${id}`);
}
const reexport=fs.readFileSync(path.join(root,'src/data/portfolioProjects.ts'),'utf8');
if(!reexport.includes("from '../app/data/projects'"))failures.push('La galería no usa la misma fuente de datos');
const cases=fs.readFileSync(path.join(root,'src/app/data/creativeCases.ts'),'utf8');
for(const image of cases.matchAll(/src: '(\/projects\/[^']+)'/g)) if(!fs.existsSync(path.join(root,'public',image[1].slice(1))))failures.push(`Falta captura de caso: ${image[1]}`);
for(const problem of failures)console.error('ERROR:',problem);
console.log(`Catálogo: ${projects.length} proyectos · 7 pósteres nuevos · 8 demos con GitHub · ${failures.length} incidencias`);
if(failures.length)process.exit(1);
console.log('OK: estructura y vínculos internos verificados. La compilación y las demos externas se validan por separado.');
