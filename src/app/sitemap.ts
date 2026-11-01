import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap{const base='https://portafolio-web-phi-five.vercel.app';return ['','/skills','/certifications','/contact','/projects/nebula','/projects/synapse','/projects/speed'].map((path)=>({url:`${base}${path}`,changeFrequency:'monthly' as const,priority:path===''?1:0.65}))}
