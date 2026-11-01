// Fichas editoriales elaboradas a partir del código y README de los tres proyectos aportados.
// No hay enlaces públicos verificados en los ZIP: se mantienen sin inventar URLs.
export type CreativeCase = {
  slug: string;
  index: string;
  kicker: string;
  subtitle: string;
  challenge: string;
  solution: string;
  capabilities: { title: string; description: string }[];
  images: { src: string; alt: string; caption: string }[];
  footnote?: string;
};

export const creativeCases: CreativeCase[] = [
  {
    slug: 'nebula',
    index: '01',
    kicker: 'EXPLORACIÓN ESPACIAL · WEBGL',
    subtitle: 'Tres mundos para descubrir proyectos, experimentar y jugar.',
    challenge: 'Convertir un portfolio en una experiencia explorable sin perder el acceso a los proyectos y a la información profesional.',
    solution: 'Una arquitectura de tres planetas: ORIGIN para portfolio y museo 3D; NEXUS para experimentos visuales; INFERNO para una misión arcade. Los módulos interiores usan Canvas 2D y se cargan cuando se necesitan.',
    capabilities: [
      { title: 'ORIGIN · Portfolio', description: 'Exploración espacial, presentación de proyectos, museo 3D y recorrido orientado a reclutadores.' },
      { title: 'NEXUS · Laboratorio', description: 'Reactor visual, pozo gravitacional y ondas de interferencia, con controles de intensidad, velocidad y pausa.' },
      { title: 'INFERNO · Minijuego', description: 'Misión de 60 segundos con movimiento, escudo, asteroides, recolección de núcleos y estados de victoria y derrota.' },
    ],
    images: [
      { src: '/projects/nebula-origin.webp', alt: 'Vista del planeta ORIGIN de NEBULA', caption: 'ORIGIN · Portfolio y museo 3D' },
      { src: '/projects/nebula-nexus.webp', alt: 'Vista del planeta NEXUS de NEBULA', caption: 'NEXUS · Laboratorio interactivo' },
      { src: '/projects/nebula-inferno.webp', alt: 'Vista del planeta INFERNO de NEBULA', caption: 'INFERNO · Misión arcade' },
    ],
    footnote: 'Los experimentos del laboratorio son simulaciones artísticas interactivas, no cálculos científicos.',
  },
  {
    slug: 'synapse',
    index: '02',
    kicker: 'INTERACCIÓN NEURONAL · THREE.JS',
    subtitle: 'Una interfaz que transforma la exploración del portfolio en una interacción visual.',
    challenge: 'Equilibrar una experiencia 3D expresiva con una presentación rápida y clara de proyectos y experiencia para reclutadores.',
    solution: 'Una red neuronal con nodos y conexiones interactivas, distintos estados visuales, fichas de proyectos y un modo reclutador que prioriza el contenido. El asistente de portfolio funciona con datos locales.',
    capabilities: [
      { title: 'Núcleo interactivo', description: 'Red neuronal 3D con nodos, interacciones del puntero y transformaciones entre formas.' },
      { title: 'Project DNA', description: 'Galería de proyectos con filtros, fichas y tecnologías, diseñada para mostrar el trabajo realizado.' },
      { title: 'Recruiter Mode', description: 'Acceso directo a experiencia, habilidades, CV y contacto sin exigir recorrer toda la experiencia 3D.' },
    ],
    images: [
      { src: '/projects/synapse.webp', alt: 'Pantalla principal de SYNAPSE con su núcleo neuronal', caption: 'SYNAPSE · Interfaz neuronal y navegación profesional' },
    ],
    footnote: 'La versión incluida como referencia es SYNAPSE V9. Los datos profesionales se pueden editar dentro del proyecto original.',
  },
  {
    slug: 'speed',
    index: '03',
    kicker: 'SCROLL STORYTELLING · MOTION DESIGN',
    subtitle: 'Una landing conceptual donde el producto acompaña la historia visual.',
    challenge: 'Construir una presentación de producto dinámica, con animaciones sincronizadas al scroll, sin comprometer la lectura ni duplicar elementos visuales.',
    solution: 'GSAP y ScrollTrigger coordinan la posición de la lata por sección; Framer Motion acompaña las transiciones y Three.js aporta anillos orbitales. El producto utiliza una imagen 2.5D, no un modelo 3D real.',
    capabilities: [
      { title: 'Storytelling por scroll', description: 'La lata se desplaza de lado a lado y cambia de escala según la sección visible.' },
      { title: 'Detalles de producto', description: 'Tratamiento visual de frío, condensación y atmósfera, con animaciones coordinadas.' },
      { title: 'Responsive', description: 'Comportamientos diferenciados para desktop y móvil, evitando que el producto tape contenido.' },
    ],
    images: [
      { src: '/projects/speed.webp', alt: 'Portada del concepto interactivo SPEED Unlimited', caption: 'SPEED Unlimited · Concepto visual de producto' },
      { src: '/projects/speed-product.webp', alt: 'Fotografía de la lata utilizada en el proyecto SPEED', caption: 'Fotografía del producto usada en el efecto 2.5D' },
    ],
    footnote: 'Proyecto conceptual independiente. No es una campaña oficial ni está afiliado a la marca representada.',
  },
];
