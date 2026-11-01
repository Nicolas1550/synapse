'use client';
import dynamic from 'next/dynamic';
import { useEffect,useState } from 'react';
import NeuralLab from './NeuralLab';
import { neuralNodes, type Shape } from './NeuralCore';
import SynapseAssistant from './SynapseAssistant';
import ProjectShowcase from './ProjectShowcase';
import { ArrowDownRight, ArrowUpRight, ArrowRight, BrainCircuit, BriefcaseBusiness, Code2, Github, Linkedin, Mail, Menu, X, Zap, Download, Cpu } from 'lucide-react';
import { profile, skills, experience } from '@/data/content';
const NeuralCore = dynamic(()=>import('./NeuralCore'),{ssr:false,loading:()=> <div className="neural-placeholder"><span>INITIALIZING NEURAL NETWORK</span></div>});
const nav = [{id:'about',label:'IDENTITY'},{id:'work',label:'PROJECTS'},{id:'expertise',label:'EXPERTISE'},{id:'experience',label:'MEMORY'},{id:'lab',label:'LAB'},{id:'contact',label:'CONNECT'}];
export default function Experience(){
  const [recruiter,setRecruiter]=useState(false);
  const [shape,setShape]=useState<Shape>('sphere');
  const [selectedNode,setSelectedNode]=useState<number|null>(null);
  const [menu,setMenu]=useState(false);
  const [reduceMotion,setReduceMotion]=useState(false);
  useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduceMotion(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
  return <div className={`site ${recruiter?'recruiter':''}`}>
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/><div className="grid-overlay"/>
    <header className="header"><a className="brand" href="#top" aria-label="SYNAPSE inicio"><span className="brand-icon"><BrainCircuit size={21}/></span><span>SYNAPSE<span className="brand-dot">.</span><small>THE LIVING INTERFACE</small></span></a>
      <nav className={`nav ${menu?'open':''}`} aria-label="Navegación principal">{nav.map(n=><a key={n.id} href={`#${n.id}`} onClick={()=>setMenu(false)}>{n.label}</a>)}</nav>
      <div className="header-actions"><button className="mode-button" onClick={()=>{setRecruiter(v=>!v);setMenu(false)}} aria-pressed={recruiter}><BriefcaseBusiness size={15}/><span>{recruiter?'IMMERSIVE MODE':'RECRUITER MODE'}</span></button><button className="mobile-menu" onClick={()=>setMenu(v=>!v)} aria-label={menu?'Cerrar menú':'Abrir menú'}>{menu?<X/>:<Menu/>}</button></div>
    </header>
    <main id="top">
      <section className="hero section-shell" id="about"><div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> SYSTEM ONLINE <span className="eyebrow-line"/> PORTFOLIO / 2026</div><div className="hero-index">001 / HUMAN × MACHINE</div><h1>BUILDING<br/><span>WHAT'S</span><br/>NEXT<span className="title-period">.</span></h1><p className="hero-sub">Hola, soy <strong>{profile.name}</strong>.<br/>{profile.intro}</p><div className="hero-cta"><a className="primary-btn" href="#work">EXPLORE PROJECTS <ArrowUpRight size={18}/></a><a className="text-btn" href="#contact">LET'S CONNECT <ArrowRight size={17}/></a></div><div className="hero-foot"><span><span className="tiny-cross">✳</span> AVAILABLE FOR OPPORTUNITIES</span><span>SCROLL TO EXPLORE <ArrowDownRight size={15}/></span></div></div>
      <div className="hero-art"><div className="orb-ring ring-one"/><div className="orb-ring ring-two"/>{!recruiter&&!reduceMotion?<NeuralCore shape={shape} selected={selectedNode} onSelect={setSelectedNode}/>:<div className="static-core" aria-label="Ilustración de núcleo neuronal"><BrainCircuit size={110} strokeWidth={.55}/></div>}<div className="orb-label top-label">FIG 01 / LIVING CORE</div><div className="orb-label side-label">NEURAL POINTS <b>280</b><br/>RENDER ENGINE <b>WEBGL</b></div><div className="core-controls" aria-label="Transformar la red neuronal"><span>NEURAL SHAPES</span>{([{key:'sphere',label:'CORE'},{key:'dna',label:'PROJECT DNA'},{key:'tree',label:'MEMORY TREE'}] as const).map(item=><button type="button" key={item.key} className={shape===item.key?'active':''} onClick={()=>{setShape(item.key);setSelectedNode(null)}} aria-pressed={shape===item.key}>{item.label}</button>)}</div>
      <div className="interaction-hint">DRAG TO ROTATE · SCROLL TO ZOOM · CLICK A NODE</div>
      {selectedNode!==null&&<div className="node-inspector" role="status"><button className="node-close" onClick={()=>setSelectedNode(null)} aria-label="Cerrar detalle">×</button><span>{neuralNodes[selectedNode].category} / NODE {String(selectedNode+1).padStart(2,'0')}</span><h3>{neuralNodes[selectedNode].label}</h3><p>{neuralNodes[selectedNode].detail}</p><a href={neuralNodes[selectedNode].href}>EXPLORE SECTION ↗</a></div>}
      <div className="orb-label bottom-label"><span className="status-dot"/> INTERACTIVE SYSTEM ACTIVE</div></div>
      </section>
      <div className="ticker" aria-label="Tecnologías"><div>REACT <span>✳</span> NEXT.JS <span>✳</span> TYPESCRIPT <span>✳</span> THREE.JS <span>✳</span> CREATIVE ENGINEERING <span>✳</span> REACT <span>✳</span> NEXT.JS <span>✳</span> TYPESCRIPT</div></div>
      <ProjectShowcase/>
      <section className="section-shell content-section expertise-section" id="expertise"><div className="section-heading"><div><p className="section-kicker">/ 02 — CAPABILITIES</p><h2>TECH <em>STACK</em><span className="title-period">.</span></h2></div><p>Herramientas y disciplinas que conectan ingeniería, experiencia de usuario y desarrollo creativo.</p></div><div className="skill-grid">{skills.map((g,i)=><article className="skill-card" key={g.group}><div className="skill-card-head"><span>0{i+1} / DOMAIN</span>{i===0?<Code2/>:i===1?<Cpu/>:<Zap/>}</div><h3>{g.group}</h3><div className="skill-tags">{g.items.map(s=><span key={s}>{s}</span>)}</div></article>)}</div></section>
      <section className="section-shell content-section memory-section" id="experience"><div className="section-heading"><div><p className="section-kicker">/ 03 — CAREER ARCHIVE</p><h2>MEMORY <em>LOG</em><span className="title-period">.</span></h2></div><p>Mi recorrido en desarrollo web y la forma en que abordo nuevos desafíos.</p></div><div className="timeline">{experience.map((e,i)=><article className="timeline-row" key={i}><div className="timeline-dot"/><div className="timeline-period">{e.period}</div><div className="timeline-main"><h3>{e.title}</h3><p className="timeline-company">{e.company}</p><p>{e.description}</p></div><span className="timeline-number">0{i+1}</span></article>)}</div></section>
      <NeuralLab/><section className="section-shell contact-section" id="contact"><div className="contact-kicker"><span className="status-dot"/> / 04 — ESTABLISH CONNECTION</div><h2>LET'S BUILD<br/><em>SOMETHING</em><br/>REMARKABLE<span className="title-period">.</span></h2><p>¿Tenés un proyecto, una oportunidad o una idea interesante? Hablemos.</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight/></a><div className="contact-links"><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={18}/> GITHUB <ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LINKEDIN <ArrowUpRight size={14}/></a>{profile.cv&&<a href={profile.cv} download><Download size={18}/> DOWNLOAD CV <ArrowUpRight size={14}/></a>}<a href={`mailto:${profile.email}`}><Mail size={18}/> EMAIL <ArrowUpRight size={14}/></a></div></section>
    </main><SynapseAssistant/><footer className="footer"><span>SYNAPSE © {new Date().getFullYear()} / {profile.name}</span><span>ENGINEERED WITH INTENTION <span className="status-dot"/></span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>
}
