import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import Link from 'next/link';
import { FaArrowRight, FaCode, FaDatabase, FaChartLine } from 'react-icons/fa6';
const skills=[
 {icon:<FaCode/>,title:'Frontend & experiencia',intro:'Interfaces accesibles, componentes escalables y experiencias cuidadas.',names:['React','Next.js','TypeScript','JavaScript','Tailwind CSS','Styled Components','Redux Toolkit','Angular','Framer Motion']},
 {icon:<FaDatabase/>,title:'Backend & sistemas',intro:'Integraciones, APIs, contenido y datos que sostienen un producto.',names:['FastAPI','Node.js','Express.js','.NET','Aurelia','MySQL','Payload CMS','Sequelize','WebSockets','APIs REST']},
 {icon:<FaChartLine/>,title:'Calidad & entrega',intro:'Conectar tecnología y objetivos, probar flujos y mejorar cada entrega.',names:['Cypress','Pruebas E2E','QA','Product Engineering','SEO técnico','Performance web','Accesibilidad','Coordinación de proyectos']},
];
export default function Skills(){return <><Navbar/><main id="main-content" className="subpage"><div className="container"><p className="section-kicker">TECNOLOGÍAS / EXPERIENCIA APLICADA</p><h1>Las herramientas importan.<br/><span className="gradient-text">Lo que construís con ellas, más.</span></h1><p className="subpage-intro">Estas tecnologías aparecen en mi trayectoria profesional y proyectos. No es solo una lista: podés ver ejemplos de aplicación en los casos y trabajos publicados.</p><div className="skill-groups">{skills.map(g=><article className="skill-group" key={g.title}><span className="value-icon">{g.icon}</span><h2>{g.title}</h2><p>{g.intro}</p><div className="tech-tags">{g.names.map(n=><span key={n}>{n}</span>)}</div></article>)}</div><Link className="btn btn-primary" href="/#cases">Conocer casos reales <FaArrowRight/></Link></div></main><Footer/></>}
