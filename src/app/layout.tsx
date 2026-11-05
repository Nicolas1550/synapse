import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://synapse-le8l.vercel.app/'),
  title: 'SYNAPSE — Portfolio interactivo | Nicolás Luciuk',
  description: 'Explorá los 22 proyectos de Nicolás Luciuk: desarrollo Full Stack, interfaces 3D con React y Three.js, experiencia profesional, demos y código.',
  applicationName: 'SYNAPSE — The Living Interface',
  authors: [{ name: 'Nicolás Luciuk' }],
  openGraph: {
    title: 'SYNAPSE — The Living Interface',
    description: '22 proyectos. Desarrollo Full Stack, experiencias 3D y trabajo real.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: { card: 'summary_large_image', title: 'SYNAPSE — Nicolás Luciuk', description: 'Portfolio interactivo Full Stack y 3D.' },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="es"><body>{children}</body></html>;
}
