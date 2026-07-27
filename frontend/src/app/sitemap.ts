import type { MetadataRoute } from "next";
const base="https://dos2a.vercel.app";
export default function sitemap():MetadataRoute.Sitemap{return ["","/servicios","/portafolio","/cotizar","/contacto"].map((path,i)=>({url:`${base}${path}`,changeFrequency:i===0?"weekly":"monthly",priority:i===0?1:(path==="/cotizar"?0.9:0.8)}))}
