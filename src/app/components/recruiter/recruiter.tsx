import Link from 'next/link';
import { FaArrowRight, FaArrowUpRightFromSquare, FaCode, FaLayerGroup, FaGaugeHigh } from 'react-icons/fa6';

const highlights = [
  { icon: FaCode, label: 'Frontend + backend', title: 'Arquitectura de productos web', detail: 'Next.js, React, Payload CMS y APIs construidas con FastAPI o Node.js.', href: '/#projects', link: 'Ver proyectos Full Stack' },
  { icon: FaLayerGroup, label: 'Ingeniería de producto', title: 'Del requisito al lanzamiento', detail: 'Experiencia en plataformas de producto con Aurelia, .NET, integración de datos y colaboración entre equipos.', href: '/#experience', link: 'Ver trayectoria' },
  { icon: FaGaugeHigh, label: 'Calidad de software', title: 'Entrega con criterio técnico', detail: 'Automatización E2E con Cypress, pruebas de flujos clave y atención a performance, UX y accesibilidad.', href: '/#projects', link: 'Explorar trabajos' },
];

export default function Recruiter() {
  return <section id="recruiter" className="recruiter-section section-shell" aria-labelledby="recruiter-title">
    <div className="container">
      <div className="recruiter-header"><div><p className="section-kicker">EN 30 SEGUNDOS / VISIÓN GENERAL</p><h2 id="recruiter-title">Lo que puedo aportar <span className="gradient-text">a tu equipo.</span></h2></div><Link href="/contact" className="recruiter-header-link">Conversemos <FaArrowUpRightFromSquare/></Link></div>
      <div className="recruiter-grid">
        {highlights.map((item,index)=> <article key={item.label} className="recruiter-card">
          <div className="recruiter-card-top"><span className="value-icon"><item.icon/></span><span className="recruiter-counter">0{index+1}</span></div>
          <p className="recruiter-label">{item.label}</p><h3>{item.title}</h3><p>{item.detail}</p>
          <Link href={item.href}>{item.link} <FaArrowRight/></Link>
        </article>)}
      </div>
      <div className="recruiter-strip"><span className="strip-pulse"/><span>EXPERIENCIA CON EQUIPOS DE ARGENTINA, CANADÁ, ESPAÑA Y FRANCIA</span><a href="/cv-nicolas-luciuk.pdf" download>Ver CV resumido <FaArrowUpRightFromSquare/></a></div>
    </div>
  </section>;
}
