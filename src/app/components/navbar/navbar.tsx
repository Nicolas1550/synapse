'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowUpRightFromSquare, FaBars, FaXmark, FaDownload } from 'react-icons/fa6';
const navItems = [
 {label:'Sobre mí',href:'/#recruiter'},
 {label:'Casos reales',href:'/#cases'},
 {label:'Proyectos',href:'/#projects'},
 {label:'Experiencia',href:'/#experience'},
 {label:'Stack',href:'/skills'},
];
export default function Navbar(){const[open,setOpen]=useState(false);return <><a className="skip-link" href="#main-content">Saltar al contenido</a><nav className="site-nav" aria-label="Navegación principal"><div className="container nav-inner"><Link href="/" className="site-logo" onClick={()=>setOpen(false)} aria-label="Inicio — Nicolás Luciuk"><span className="logo-mark">NL<span className="logo-dot">.</span></span><span className="logo-caption">Nicolás Luciuk<small>Full Stack · Product Engineer</small></span></Link><div className={`nav-menu ${open?'is-open':''}`} id="nav-menu">{navItems.map(item=><Link href={item.href} key={item.href} onClick={()=>setOpen(false)}>{item.label}</Link>)}<a className="nav-cv" href="/cv-nicolas-luciuk.pdf" download onClick={()=>setOpen(false)}><FaDownload/> CV</a><Link className="nav-contact" href="/contact" onClick={()=>setOpen(false)}>Contacto <FaArrowUpRightFromSquare size={12}/></Link></div><button type="button" className="nav-toggle" aria-label={open?'Cerrar menú':'Abrir menú'} aria-expanded={open} aria-controls="nav-menu" onClick={()=>setOpen(v=>!v)}>{open?<FaXmark/>:<FaBars/>}</button></div></nav></>}
