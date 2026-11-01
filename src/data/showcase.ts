import { portfolioProjects } from './portfolioProjects';

export type ShowcaseCategory = 'Creativo 3D' | 'Full Stack' | 'Frontend' | 'Producto / QA' | 'Liderazgo';
export type ShowcaseProject = {
  id: string;
  title: string;
  category: ShowcaseCategory;
  role: string;
  kicker: string;
  summary: string;
  description: string;
  image: string;
  technologies: string[];
  live?: string;
  video?: string;
  repo?: string;
  backendRepo?: string;
  limited?: boolean;
  featured: boolean;
  accent: string;
};

const creative: ShowcaseProject[] = [
  {
    id: 'nebula', title: 'NEBULA', category: 'Creativo 3D', role: 'Creative Developer · Proyecto personal',
    kicker: 'UNIVERSO INTERACTIVO / 2026', summary: 'Tres mundos. Una experiencia.',
    description: 'Universo 3D con exploración espacial, transiciones cinematográficas, portfolio, laboratorio interactivo y experiencias jugables. Una exploración de diseño inmersivo con Next.js y Three.js.',
    image: '/projects/nebula-planets.webp', technologies: ['Next.js', 'React', 'Three.js', 'WebGL'],
    live: 'https://nebula-chi-two.vercel.app/', repo: 'https://github.com/Nicolas1550/nebula',
    featured: true, accent: '#63e6fa'
  },
  {
    id: 'synapse', title: 'SYNAPSE', category: 'Creativo 3D', role: 'Creative Developer · Proyecto personal',
    kicker: 'INTERFAZ NEURONAL / 2026', summary: 'Una interfaz que responde a cada interacción.',
    description: 'Portfolio experimental que combina una red neuronal interactiva, simulación visual, componentes React y navegación accesible para mostrar proyectos profesionales.',
    image: '/projects/synapse-cover.webp', technologies: ['Next.js', 'TypeScript', 'React Three Fiber', 'Three.js'],
    live: 'https://synapse-le8l.vercel.app/', repo: 'https://github.com/Nicolas1550/synapse',
    featured: true, accent: '#8bf3d3'
  },
  {
    id: 'atlas', title: 'ATLAS', category: 'Creativo 3D', role: 'Desarrollador · Proyecto personal',
    kicker: 'ATLAS / 2026', summary: 'Proyecto ATLAS publicado en Vercel.',
    description: 'Proyecto web personal con demo pública y código disponible en GitHub.',
    image: '/projects/atlas.svg', technologies: ['Web', 'React', 'TypeScript'],
    live: 'https://atlas-gamma-blue.vercel.app/', repo: 'https://github.com/Nicolas1550/atlas',
    featured: true, accent: '#65c9ff'
  },
  {
    id: 'eon', title: 'EON — The Living City', category: 'Creativo 3D', role: 'Desarrollador · Proyecto personal',
    kicker: 'CIUDAD 3D / 2026', summary: 'Una ciudad 3D interactiva.',
    description: 'Simulación visual de ciudad con edificios, naturaleza, vehículos y habitantes.',
    image: '/projects/eon.svg', technologies: ['Next.js', 'TypeScript', 'Three.js'],
    live: 'https://eon-three-henna.vercel.app/', repo: 'https://github.com/Nicolas1550/eon',
    featured: true, accent: '#91e4bc'
  },
  {
    id: 'speed', title: 'SPEED Unlimited', category: 'Creativo 3D', role: 'Creative Developer · Concepto independiente',
    kicker: 'SCROLL STORYTELLING / 2026', summary: 'Una experiencia publicitaria que se siente en movimiento.',
    description: 'Landing experimental no oficial ni afiliada a la marca SPEED. Combina narrativa con scroll, animaciones de producto, condensación, vapor, transiciones y elementos 3D para explorar una experiencia publicitaria interactiva. La lata utiliza fotografía 2.5D, no un modelo tridimensional.',
    image: '/projects/speed-unlimited.webp', technologies: ['Next.js', 'React', 'GSAP', 'Three.js'],
    live: 'https://speedv2-7rrl.vercel.app/', repo: 'https://github.com/Nicolas1550/speedv2',
    featured: true, accent: '#ff547c'
  },
];
const accents: Record<string,string> = {
  makeup:'#dbb5ff', peluqueria:'#ffd0a5', boticpartners:'#8a9bff', equilibrio:'#79e6ff',
  chicksgold:'#f4d57d', chicksx:'#8df5d0', tangoWeb:'#f2c88e', congreso:'#a3b8f9',
  tangoFondo:'#d2b5ff', fundamentals:'#c5ec9d', bici:'#b5e2ff',
  'ceo-training':'#d6b3ff', ciencia:'#99e6ca', capacitacionbursatil:'#e3d3a3'
};
const featured = new Set(['makeup','peluqueria','boticpartners','equilibrio','chicksgold','chicksx']);
function categoryFor(id: string, category: string): ShowcaseCategory {
  if (id==='tangoWeb'||id==='tangoFondo') return 'Liderazgo';
  if (['chicksx','chicksgold','congreso'].includes(id)) return 'Producto / QA';
  if (['bici','fundamentals','ceo-training','capacitacionbursatil'].includes(id)) return 'Frontend';
  if (category==='Full Stack') return 'Full Stack';
  return 'Frontend';
}
const professional: ShowcaseProject[] = portfolioProjects.map(p=>({
  id:p.id,
  title:p.title,
  category:categoryFor(p.id,p.category),
  role:p.role,
  kicker:p.category.toUpperCase(),
  summary:p.summary,
  description:p.description,
  image:p.image,
  technologies:p.technologies,
  live:p.link||undefined,
  video:p.demoVideo||undefined,
  repo:p.frontendGithub||p.github||undefined,
  backendRepo:p.backendGithub||undefined,
  limited:p.demoLimited,
  featured:featured.has(p.id),
  accent:accents[p.id]||'#6fe5f4',
}));
const priority = ['nebula','atlas','synapse','eon','speed','makeup','peluqueria','boticpartners','equilibrio','chicksgold','chicksx'];
export const showcaseProjects: ShowcaseProject[] = [...creative,...professional].sort((a,b)=>{
  const ai=priority.indexOf(a.id), bi=priority.indexOf(b.id);
  return (ai<0?100:ai)-(bi<0?100:bi);
});
export const projectFilters = ['Destacados','Todos','Creativo 3D','Full Stack','Frontend','Producto / QA','Liderazgo'] as const;
export type ProjectFilter = typeof projectFilters[number];
