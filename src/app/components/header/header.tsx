import Image from 'next/image';
import Link from 'next/link';
import { portfolioProjects } from '../../data/projects';
import { FaArrowRight, FaArrowUpRightFromSquare, FaGithub, FaLinkedinIn, FaDownload } from 'react-icons/fa6';

export default function Header() {
  return (
    <header className="hero section-shell" id="about">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="signal-dot"/> DESARROLLO FULL STACK · PRODUCT ENGINEERING</div>
          <p className="hero-introducing">Hola, soy Nicolás Luciuk <span aria-hidden="true">↗</span></p>
          <h1>Construyo productos que <span className="gradient-text">funcionan.</span><br/>Y experiencias que se recuerdan.</h1>
          <p className="hero-lead">Desarrollador Full Stack con experiencia en <strong>Next.js, React, FastAPI, .NET y automatización E2E</strong>. Trabajo conectando diseño, negocio y tecnología para llevar ideas a productos reales.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">Explorar mi trabajo <FaArrowRight/></a>
            <a className="btn btn-outline" href="/cv-nicolas-luciuk.pdf" download>Descargar CV <FaDownload/></a>
            <Link className="hero-contact-link" href="/contact">Hablemos <FaArrowUpRightFromSquare/></Link>
          </div>
          <div className="hero-creative"><span>CREATIVE LAB / 2026</span><Link href="/projects/nebula">NEBULA ↗</Link><Link href="/projects/synapse">SYNAPSE ↗</Link><Link href="/projects/speed">SPEED ↗</Link></div>
          <div className="hero-social"><span>CONOCÉ MI TRABAJO</span><a href="https://github.com/Nicolas1550" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Nicolás"><FaGithub/> GitHub</a><a href="https://linkedin.com/in/nicolas-luciuk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Nicolás"><FaLinkedinIn/> LinkedIn</a></div>
          <div className="hero-metrics">
            <div><strong>{portfolioProjects.length}</strong><span>Proyectos documentados</span></div>
            <div><strong>3 disciplinas</strong><span>Full Stack · Producto · QA</span></div>
            <div><strong>4 países</strong><span>Experiencia con equipos internacionales</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-frame">
            <div className="portrait-orbit" aria-hidden="true" />
            <Image className="portrait" src="/photo-profile.webp" width={720} height={960} priority alt="Retrato de Nicolás Luciuk" sizes="(max-width: 900px) 80vw, 420px" />
            <div className="floating-label floating-label-top"><span className="status-pulse"/> RÍO GRANDE · ARGENTINA</div>
            <div className="floating-label floating-label-bottom"><span className="tiny-code">&lt;/&gt;</span><span>Engineering × Product<br/><small>Del concepto a la entrega.</small></span></div>
          </div>
          <div className="visual-coordinates">BUILDING ON THE WEB / 01 — NICOLÁS LUCIUK</div>
        </div>
      </div>
      <div className="hero-scroll-hint"><span>DESLIZÁ PARA EXPLORAR</span><span aria-hidden="true">↓</span></div>
    </header>
  );
}
