import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare, FaCode, FaGithub } from 'react-icons/fa6';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { creativeCases } from '../../data/creativeCases';
import { portfolioProjects } from '../../data/projects';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return creativeCases.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.id === slug && item.creative);
  if (!project) return { title: 'Proyecto no encontrado' };
  return {
    title: `${project.title} — Caso de estudio`,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: `${project.title} | Nicolás Luciuk`, description: project.summary, images: [project.image] },
  };
}

export default async function CreativeProjectPage({ params }: Props) {
  const { slug } = await params;
  const detail = creativeCases.find((item) => item.slug === slug);
  const project = portfolioProjects.find((item) => item.id === slug && item.creative);
  if (!detail || !project) notFound();

  return <>
    <Navbar />
    <main id="main-content" className="creative-case-page">
      <div className="container">
        <nav className="case-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/#projects"><FaArrowLeft aria-hidden="true" /> Todos los proyectos</Link>
          <span aria-hidden="true">/</span>
          <span>{project.title}</span>
        </nav>
        <header className="creative-case-hero">
          <div className="creative-case-copy">
            <p className="section-kicker">CREATIVE LAB / {detail.index} — {detail.kicker}</p>
            <h1>{project.title}<span className="gradient-text">.</span></h1>
            <p className="creative-case-subtitle">{detail.subtitle}</p>
            <p className="creative-case-description">{project.description}</p>
            <div className="creative-case-tech" aria-label="Tecnologías utilizadas">
              {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <div className="creative-case-actions">
              {project.link && <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">Ver demo en vivo <FaArrowUpRightFromSquare aria-hidden="true" /></a>}
              {project.github && <a className="btn btn-outline" href={project.github} target="_blank" rel="noopener noreferrer">Ver código en GitHub <FaGithub aria-hidden="true" /></a>}
              <Link className="btn btn-outline" href="/#projects">Explorar los 17 proyectos <FaArrowRight aria-hidden="true" /></Link>
              {!project.link && <Link className="btn btn-outline" href="/contact">Contactarme <FaArrowUpRightFromSquare aria-hidden="true" /></Link>}
            </div>
            <p className="case-demo-status">{project.comingSoon ? 'SYNAPSE · Próximamente: la demo pública aún no está disponible. Podés explorar las capturas y el proceso de desarrollo en esta ficha.' : 'Demo pública y repositorio disponibles: podés probar la experiencia y revisar su implementación desde los botones anteriores.'}</p>
          </div>
          <div className="creative-case-art">
            <Image src={project.image} alt={`Portada del proyecto ${project.title}`} width={1280} height={720} sizes="(max-width: 850px) 100vw, 55vw" priority />
            <div className="creative-case-art-label"><FaCode aria-hidden="true" /> PROYECTO PERSONAL · 2026</div>
          </div>
        </header>
        <section className="creative-case-section" aria-labelledby="case-work-title">
          <div className="creative-case-section-heading"><p className="section-kicker">EL PROCESO / {detail.index}</p><h2 id="case-work-title">De la idea a la <span className="gradient-text">experiencia.</span></h2></div>
          <div className="creative-case-process">
            <article><span>01 / DESAFÍO</span><h3>El problema</h3><p>{detail.challenge}</p></article>
            <article><span>02 / ENFOQUE</span><h3>La solución</h3><p>{detail.solution}</p></article>
          </div>
        </section>
        <section className="creative-case-section" aria-labelledby="case-features-title">
          <div className="creative-case-section-heading"><p className="section-kicker">QUÉ DESARROLLÉ / {detail.index}</p><h2 id="case-features-title">Funciones <span className="gradient-text">destacadas.</span></h2></div>
          <div className="creative-capabilities">
            {detail.capabilities.map((capability, index) => <article key={capability.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{capability.title}</h3><p>{capability.description}</p></article>)}
          </div>
        </section>
        <section className="creative-case-section" aria-labelledby="case-gallery-title">
          <div className="creative-case-section-heading"><p className="section-kicker">CAPTURAS / {detail.index}</p><h2 id="case-gallery-title">Una mirada al <span className="gradient-text">proyecto.</span></h2></div>
          <div className={`creative-case-gallery ${detail.images.length === 1 ? 'single' : ''}`}>
            {detail.images.map((image) => <figure key={image.src}><div className="creative-case-gallery-image"><Image src={image.src} alt={image.alt} width={1000} height={680} sizes="(max-width: 700px) 100vw, 33vw" /></div><figcaption>{image.caption}</figcaption></figure>)}
          </div>
          {detail.footnote && <p className="creative-case-disclaimer">{detail.footnote}</p>}
        </section>
        <div className="creative-case-next"><div><p className="section-kicker">SIGUIENTE PASO</p><h2>¿Querés conocer más de este trabajo?</h2><p>Podés consultar por una demostración o explorar mis proyectos de desarrollo y producto.</p></div><div><Link className="btn btn-primary" href="/contact">Contactarme <FaArrowRight aria-hidden="true" /></Link><Link className="btn btn-outline" href="/#projects">Ver todos los proyectos</Link></div></div>
      </div>
    </main>
    <Footer />
  </>;
}
