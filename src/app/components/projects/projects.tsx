'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaArrowUpRightFromSquare, FaCodeBranch, FaGithub, FaMagnifyingGlass, FaPlay } from 'react-icons/fa6';
import { portfolioProjects } from '../../data/projects';

const filters = ['Todos', 'Experiencias creativas', 'Full Stack', 'Calidad & producto', 'Liderazgo', 'Web & UX'];
// Tres proyectos de Creative Lab primero, seguidos de los casos profesionales.
const orderedProjects = [...portfolioProjects].sort((a,b) => {
  const priority=['nebula','synapse','speed','boticpartners','equilibrio','chicksgold','chicksx','tangoWeb','congreso'];
  const aIndex=priority.indexOf(a.id);
  const bIndex=priority.indexOf(b.id);
  if(aIndex>=0&&bIndex>=0)return aIndex-bIndex;
  if(aIndex>=0)return -1;
  if(bIndex>=0)return 1;
  return portfolioProjects.indexOf(a)-portfolioProjects.indexOf(b);
});

export default function Projects() {
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const filtered = useMemo(() => orderedProjects.filter((project) => {
    const categoryMatch = filter === 'Todos' || project.category === filter;
    const haystack = `${project.title} ${project.summary} ${project.description} ${project.technologies.join(' ')} ${project.role}`.toLowerCase();
    return categoryMatch && haystack.includes(query.trim().toLowerCase());
  }), [filter, query]);
  const shown = filter !== 'Todos' || query.trim() || showAll ? filtered : filtered.slice(0,6);
  return (
    <section className="projects-section section-shell" id="projects">
      <div className="container">
        <div className="section-heading">
          <div><p className="section-kicker">01 / TRABAJOS SELECCIONADOS</p><h2>Proyectos con <span className="gradient-text">impacto real.</span></h2><p>Desarrollo Full Stack, producto y experiencias creativas. Explorá los proyectos, sus decisiones técnicas y mi participación.</p></div>
          <span className="section-counter">{portfolioProjects.length} PROYECTOS / 05 ÁREAS</span>
        </div>
        <div className="creative-showcase-note"><span className="creative-showcase-pulse" aria-hidden="true"/><div><strong>CREATIVE LAB · 2026</strong><p>NEBULA, SYNAPSE y SPEED: tres proyectos personales para demostrar interfaces inmersivas, interacción y motion design. Cada uno tiene su propio caso de estudio.</p></div></div>
        <div className="project-toolbar">
          <div className="filters" role="group" aria-label="Filtrar por especialidad">
            {filters.map(item => <button type="button" key={item} onClick={() => {setFilter(item);setShowAll(true);}} className={`filter-chip ${filter===item ? 'active' : ''}`} aria-pressed={filter===item}>{item}</button>)}
          </div>
          <label className="project-search"><FaMagnifyingGlass aria-hidden="true"/><span className="sr-only">Buscar proyectos</span><input type="search" placeholder="Buscar proyecto o tecnología..." value={query} onChange={event => setQuery(event.target.value)} /></label>
        </div>
        <div className="projects-grid">
          {shown.map((project) => <article className={`portfolio-card ${project.creative ? 'portfolio-card-creative' : ''} ${project.featured && filter === 'Todos' && !query ? 'portfolio-card-featured' : ''}`} key={project.id}>
            <div className="project-cover">
              <Image src={project.image} alt={`Vista del proyecto ${project.title}`} width={1260} height={720} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" loading="lazy" />
              <span className="cover-index">{String(orderedProjects.indexOf(project)+1).padStart(2, '0')} / {portfolioProjects.length}</span>
              <span className="cover-type">{project.creative ? 'CREATIVE LAB · ' : ''}{project.role}</span>
            </div>
            <div className="portfolio-card-body">
              <div className="project-heading-row"><h3>{project.title}</h3><span className="project-category">{project.category}</span></div>
              <p className="project-summary">{project.summary}</p>
              <div className="tech-tags">{project.technologies.slice(0,4).map(t => <span key={t}>{t}</span>)}{project.technologies.length>4 && <span>+{project.technologies.length-4}</span>}</div>
              {project.comingSoon && <div className="demo-notice"><strong>Próximamente</strong><span>La demo pública de SYNAPSE está en preparación. Mientras tanto, podés ver su caso de estudio y las capturas del proyecto.</span></div>}
              {project.demoLimited && <div className="demo-notice"><strong>Demo pública parcial</strong><span>El despliegue actual muestra principalmente la interfaz; el backend y el catálogo no se mantienen activos por costos de infraestructura. El video y los repositorios permiten conocer más del desarrollo.</span></div>}
              <details className="case-details"><summary>Ver mi trabajo y detalles técnicos <FaArrowRight aria-hidden="true"/></summary><p>{project.description}</p></details>
              <div className="project-actions">
                {project.caseStudy && <Link href={project.caseStudy} className="project-case-link"><FaArrowRight/> Ver caso de estudio</Link>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer"><FaArrowUpRightFromSquare/> {project.demoLimited ? 'Ver interfaz' : project.creative ? 'Ver demo en vivo' : 'Visitar sitio'}</a>}
                {project.demoVideo && <a href={project.demoVideo} target="_blank" rel="noopener noreferrer"><FaPlay/> Video demo</a>}
                {(project.github || project.frontendGithub) && <a href={project.github || project.frontendGithub || '#'} target="_blank" rel="noopener noreferrer"><FaGithub/> Código{project.frontendGithub ? ' frontend' : ''}</a>}
                {project.backendGithub && <a href={project.backendGithub} target="_blank" rel="noopener noreferrer"><FaCodeBranch/> Backend</a>}
              </div>
            </div>
          </article>)}
        </div>
        {filtered.length === 0 && <div className="empty-state">No hay proyectos que coincidan. Probá otra búsqueda o filtro.</div>}
        {filter === 'Todos' && !query.trim() && !showAll && <div className="show-all"><button type="button" className="btn btn-outline" onClick={()=>setShowAll(true)}>Ver los {portfolioProjects.length} proyectos <FaArrowRight/></button><p>Incluye proyectos personales, colaboraciones y trabajo de producto.</p></div>}
        {filter === 'Todos' && !query.trim() && showAll && <div className="show-all"><button type="button" className="btn btn-outline" onClick={()=>{setShowAll(false);document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});}}>Ver selección principal ↑</button></div>}
      </div>
    </section>
  );
}
