import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
const base=SITE_URL;
export default function sitemap():MetadataRoute.Sitemap{return ["","/servicios","/portafolio","/cotizar","/contacto","/servicios/audio","/servicios/iluminacion","/servicios/video","/servicios/escenarios"].map((path,i)=>({url:`${base}${path}`,changeFrequency:i===0?"weekly":"monthly",priority:i===0?1:(path==="/cotizar"?0.9:(path.startsWith("/servicios/")?0.7:0.8))}))}
