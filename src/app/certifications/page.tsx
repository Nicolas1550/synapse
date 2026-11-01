import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { FaArrowUpRightFromSquare, FaAward } from 'react-icons/fa6';
const certificates=[
 {name:'Carrera de Programación Backend',institution:'Coderhouse',year:'2024'},
 {name:'Desarrollador Frontend React',institution:'Coderhouse',year:'2022'},
 {name:'Next.js',institution:'Coderhouse',year:'2024'},
 {name:'Inteligencia Artificial: Prompt Engineering para programadores',institution:'Coderhouse',year:'2024'},
 {name:'Publicidad en Display de Google Ads',institution:'Google Ads',year:'Certificación'},
 {name:'Marketing Digital: Community Manager y Publicidad',institution:'Formación complementaria',year:'Curso'},
 {name:'Desarrollo Web',institution:'Formación complementaria',year:'Curso'},
];
export default function Certifications(){return <><Navbar/><main id="main-content" className="subpage"><div className="container"><p className="section-kicker">FORMACIÓN / CERTIFICACIONES</p><h1>Aprender, aplicar, <span className="gradient-text">seguir creciendo.</span></h1><p className="subpage-intro">Formaciones indicadas en mi perfil profesional. Actualmente curso Ingeniería Informática en la Universidad Siglo 21 (2023–2027, según la información de mi perfil).</p><div className="cert-grid">{certificates.map(c=><article className="cert-card" key={c.name}><span className="value-icon"><FaAward/></span><span className="cert-year">{c.year}</span><h2>{c.name}</h2><p>{c.institution}</p><a href="https://www.linkedin.com/in/nicolas-luciuk/" target="_blank" rel="noopener noreferrer">Ver perfil profesional <FaArrowUpRightFromSquare/></a></article>)}</div></div></main><Footer/></>}
