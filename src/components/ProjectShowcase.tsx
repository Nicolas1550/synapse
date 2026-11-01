'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check,
  ChevronDown, Code2, ExternalLink, Film, Github, Layers3, Play,
  Sparkles, X
} from 'lucide-react';
import { profile } from '@/data/content';
import { projectFilters, showcaseProjects, type ProjectFilter, type ShowcaseProject } from '@/data/showcase';

const featuredCount = showcaseProjects.filter(project => project.featured).length;

function ExternalAction({ href, label, kind='primary' }: { href:string; label:string; kind?:'primary'|'secondary' }) {
  return <a className={`work-action work-action-${kind}`} href={href} target="_blank" rel="noopener noreferrer">
    {label === 'VIDEO DEMO' ? <Play size={15} fill="currentColor"/> : label.includes('CÓDIGO') ? <Github size={16}/> : <ExternalLink size={16}/>}
    {label}<ArrowUpRight size={14}/>
  </a>;
}

function ProjectPicture({ project, priority=false, large=false }: { project:ShowcaseProject; priority?:boolean; large?:boolean }) {
  return <div className={`work-image ${large?'work-image-large':''}`}>
    <Image src={project.image} alt={`Imagen del proyecto ${project.title}`} fill sizes={large?'(max-width: 900px) 100vw, 58vw':'(max-width: 900px) 100vw, 45vw'} priority={priority} className="work-image-photo"/>
    <div className="work-image-tint"/>
    <div className="work-image-corner" aria-hidden="true"><span/><span/></div>
    <span className="work-image-caption">VISUAL ARCHIVE / {project.id.toUpperCase()}</span>
  </div>;
}

function ProjectLinks({ project, onExploreLocal }: {project:ShowcaseProject; onExploreLocal?:()=>void}) {
  return <div className="work-links">
    {project.video&&<ExternalAction href={project.video} label="VIDEO DEMO"/>}
    {project.live&&<ExternalAction href={project.live} label="VER SITIO" kind={project.video?'secondary':'primary'}/>}
    {project.repo&&<ExternalAction href={project.repo} label="CÓDIGO" kind="secondary"/>}
    {project.id==='synapse'&&<a className="work-action work-action-primary" href="#top" onClick={onExploreLocal}>EXPLORAR ESTA DEMO <ArrowUpRight size={14}/></a>}
    {!project.live&&!project.video&&!project.repo&&project.id!=='synapse'&&<span className="work-link-unavailable">Demo pública aún no enlazada</span>}
  </div>;
}

function ProjectCard({project, index, onOpen}: {project:ShowcaseProject;index:number;onOpen:(p:ShowcaseProject)=>void}) {
  return <article className="work-card" style={{'--work-accent':project.accent} as React.CSSProperties}>
    <div className="work-card-top"><span>{String(index+1).padStart(2,'0')} / {project.category.toUpperCase()}</span><span>{project.limited?'DEMO PARCIAL':'PROJECT FILE'}</span></div>
    <button type="button" className="work-image-trigger" onClick={()=>onOpen(project)} aria-label={`Abrir caso de ${project.title}`}>
      <ProjectPicture project={project}/>
      <span className="work-image-open">EXPLORAR CASO <ArrowUpRight size={17}/></span>
    </button>
    <div className="work-card-content">
      <div className="work-card-head"><div><p className="work-role">{project.role}</p><h3>{project.title}</h3></div><button className="work-open-icon" type="button" onClick={()=>onOpen(project)} aria-label={`Ver detalles de ${project.title}`}><ArrowUpRight size={23}/></button></div>
      <p className="work-card-summary">{project.summary}</p>
      <div className="work-techs">{project.technologies.slice(0,3).map(tech=><span key={tech}>{tech}</span>)}</div>
      {project.limited&&<p className="work-backend-note"><Film size={15}/> La versión pública puede no mostrar datos del backend. <strong>El video muestra el proyecto completo.</strong></p>}
      <div className="work-card-footer"><button type="button" className="work-case-link" onClick={()=>onOpen(project)}>VER CASO <ArrowRight size={16}/></button>{project.video?<a href={project.video} target="_blank" rel="noopener noreferrer" className="work-video-link"><Play size={14}/> VIDEO DEMO</a>:project.live?<a href={project.live} target="_blank" rel="noopener noreferrer" className="work-video-link"><ExternalLink size={14}/> SITIO WEB</a>:<span className="work-no-link">PROYECTO PERSONAL</span>}</div>
    </div>
  </article>;
}

function Spotlight({project,onOpen}: {project:ShowcaseProject;onOpen:(p:ShowcaseProject)=>void}) {
  return <article className="work-spotlight" style={{'--work-accent':project.accent} as React.CSSProperties}>
    <div className="work-spotlight-visual"><ProjectPicture project={project} large priority/><div className="work-spotlight-number" aria-hidden="true">01<span> / FEATURED</span></div></div>
    <div className="work-spotlight-copy"><div className="work-spotlight-kicker"><Sparkles size={16}/> FEATURED EXPERIENCE <span>2026</span></div>
      <p className="work-spotlight-category">{project.category} / {project.role}</p><h3>{project.title}<span>.</span></h3>
      <p className="work-spotlight-headline">{project.summary}</p><p className="work-spotlight-description">{project.description}</p>
      <div className="work-techs">{project.technologies.slice(0,4).map(t=><span key={t}>{t}</span>)}</div>
      <div className="work-spotlight-actions"><button type="button" className="work-primary-button" onClick={()=>onOpen(project)}>EXPLORAR CASO <ArrowUpRight size={18}/></button>{project.live&&<a className="work-outline-button" href={project.live} target="_blank" rel="noopener noreferrer">ABRIR DEMO <ExternalLink size={16}/></a>}</div>
    </div>
  </article>;
}

function CaseStudy({project,close}: {project:ShowcaseProject;close:()=>void}) {
  const closeRef=useRef<HTMLButtonElement>(null);
  const dialogRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closeRef.current?.focus();
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){e.preventDefault();close();return;}
      if(e.key!=='Tab'||!dialogRef.current)return;
      const elements=Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
      if(!elements.length)return;
      const first=elements[0],last=elements[elements.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    };
    window.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow=oldOverflow;window.removeEventListener('keydown',onKey);previous?.focus();};
  },[close]);
  return createPortal(<div className="work-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}>
    <div className="work-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="work-modal-title" aria-describedby="work-modal-description">
      <div className="work-modal-toolbar"><span>PROJECT DNA / {project.id.toUpperCase()}</span><button type="button" ref={closeRef} onClick={close} aria-label="Cerrar caso de estudio"><X size={20}/> CERRAR</button></div>
      <div className="work-modal-picture"><ProjectPicture project={project}/></div>
      <div className="work-modal-content"><div className="work-modal-heading"><p>{project.category.toUpperCase()} / CASE STUDY</p><h2 id="work-modal-title">{project.title}<span>.</span></h2><p className="work-modal-lead">{project.summary}</p></div>
        <div className="work-modal-details"><div><span>MI ROL</span><strong>{project.role}</strong></div><div><span>TIPO DE PROYECTO</span><strong>{project.category}</strong></div></div>
        <div className="work-modal-story"><span>01 / QUÉ SE DESARROLLÓ</span><p id="work-modal-description">{project.description}</p></div>
        <div className="work-modal-story"><span>02 / TECNOLOGÍAS Y DISCIPLINAS</span><div className="work-techs">{project.technologies.map(t=><span key={t}>{t}</span>)}</div></div>
        {project.limited&&<div className="work-modal-warning"><Film size={20}/><div><strong>Demo pública limitada</strong><p>El backend de este proyecto puede estar inactivo, por lo que los productos, servicios o datos no siempre se muestran. El video demo permite ver las funcionalidades desarrolladas.</p></div></div>}
        <div className="work-modal-story"><span>03 / EXPLORAR EL TRABAJO</span><ProjectLinks project={project} onExploreLocal={close}/>{project.backendRepo&&<a className="work-backend-repo" href={project.backendRepo} target="_blank" rel="noopener noreferrer"><Code2 size={16}/> REPOSITORIO BACKEND <ArrowUpRight size={14}/></a>}</div>
        <p className="work-modal-clarity">La información describe el alcance del proyecto y las responsabilidades documentadas; no se atribuyen métricas no verificadas.</p>
      </div>
    </div>
  </div>, document.body);
}

export default function ProjectShowcase(){
  const [filter,setFilter]=useState<ProjectFilter>('Destacados');
  const [selected,setSelected]=useState<ShowcaseProject|null>(null);
  const filtered=showcaseProjects.filter(project=>filter==='Todos'||(filter==='Destacados'?project.featured:project.category===filter));
  const spotlight=filtered[0];
  const others=filtered.slice(1);
  const close=()=>setSelected(null);
  return <section className="section-shell content-section work-section" id="work">
    <div className="section-heading work-section-heading"><div><p className="section-kicker">/ 01 — SELECTED WORK</p><h2>PROJECT <em>DNA</em><span className="title-period">.</span></h2><p className="work-heading-sub">Diseño que sorprende. Ingeniería que funciona.</p></div><p>Una mirada real a lo que construí: experiencias 3D, productos full stack y trabajo en equipos de desarrollo.</p></div>
    <div className="work-status-strip"><div><span className="work-status-dot"/> <strong>{showcaseProjects.length} PROYECTOS</strong><span> · </span>{featuredCount} SELECCIONADOS</div><span className="work-status-right"><Layers3 size={15}/> IMÁGENES DE PROYECTOS · CASOS DOCUMENTADOS</span></div>
    <div className="work-filter-bar" role="group" aria-label="Filtrar proyectos">
      <div className="work-filter-scroll">{projectFilters.map(item=><button type="button" key={item} className={`work-filter ${filter===item?'active':''}`} aria-pressed={filter===item} onClick={()=>setFilter(item)}>{item}{filter===item&&<Check size={13}/>}</button>)}</div>
      <span className="work-filter-result" aria-live="polite">{filtered.length} RESULTADOS <ArrowDownRight size={14}/></span>
    </div>
    {spotlight?<><Spotlight project={spotlight} onOpen={setSelected}/>{others.length>0&&<div className="work-cards-grid">{others.map((project,i)=><ProjectCard key={project.id} project={project} index={i+1} onOpen={setSelected}/>)}</div>}</>:<p className="work-empty">No hay proyectos en esta categoría.</p>}
    {filter==='Destacados'&&<button type="button" className="work-show-all" onClick={()=>setFilter('Todos')}><span>VER LOS {showcaseProjects.length} PROYECTOS</span><span>EXPLORAR ARCHIVO COMPLETO <ArrowUpRight size={19}/></span></button>}
    <div className="work-recruiter-banner"><div className="work-recruiter-icon"><BriefcaseBusiness size={22}/></div><div><p>¿REVISANDO MI PERFIL?</p><h3>Menos promesas. Más trabajo real.</h3><span>Experiencia profesional en frontend, full stack, producto y calidad de software.</span></div><div className="work-recruiter-actions"><a href={profile.cv} download className="work-recruiter-cv">DESCARGAR CV <ArrowUpRight size={16}/></a><a href="#contact" className="work-recruiter-contact">CONTACTARME <ArrowRight size={16}/></a></div></div>
    {selected&&<CaseStudy key={selected.id} project={selected} close={close}/>}
  </section>;
}
