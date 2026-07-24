"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import PublicShell from "./PublicShell";

const projects = [
  { src: "/images/projects/dosa-recovered-hero-scale.webp", key: "hero" },
  { src: "/images/projects/dosa-recovered-audio-video.webp", key: "av" },
  { src: "/images/projects/dosa-recovered-experiential-entry.webp", key: "light" },
  { src: "/images/projects/dosa-recovered-stand-exhibition.webp", key: "stand" },
  { src: "/images/projects/dosa-recovered-experiential-entry.webp", key: "entry" },
] as const;
const captions = {
  es: [
    "Producción integrada a gran escala",
    "Video y pantallas en contexto",
    "Iluminación y experiencia espacial",
    "Stand y espacio de exposición",
    "Experiencia de entrada",
  ],
  en: [
    "Integrated large-scale production",
    "Video and screens in context",
    "Lighting and spatial experience",
    "Exhibition stand and space",
    "Entrance experience",
  ],
};

export default function PortfolioPage() {
  const { lang } = useLanguage();
  return (
    <PublicShell>
      <section className="page-hero">
        <p className="eyebrow">{lang === "es" ? "Portafolio" : "Portfolio"}</p>
        <h1>{lang === "es" ? "Trabajo real. Escala real. Producción en contexto." : "Real work. Real scale. Production in context."}</h1>
        <p>{lang === "es" ? "Una selección de proyectos para mostrar cómo se integran audio, video, iluminación, espacios y operación en situaciones reales." : "A curated selection showing how audio, video, lighting, spaces, and technical operation come together in real situations."}</p>
      </section>
      <section className="portfolio-grid">
        {projects.map((project, i) => (
          <figure key={project.key}>
            <img src={project.src} alt={captions[lang][i]} loading={i < 2 ? "eager" : "lazy"}/>
            <figcaption><span>{String(i + 1).padStart(2, "0")}</span>{captions[lang][i]}</figcaption>
          </figure>
        ))}
      </section>
      <section className="closing-cta">
        <h2>{lang === "es" ? "¿Tienes un proyecto parecido o algo completamente distinto?" : "Have a similar project or something completely different?"}</h2>
        <p>{lang === "es" ? "Empieza por el objetivo. Nosotros te ayudamos a aterrizar el alcance técnico." : "Start with the objective. We can help define the technical scope."}</p>
        <Link className="button button--light" href="/cotizar">{lang === "es" ? "Hablar de mi proyecto" : "Talk about my project"}<ArrowRight size={17}/></Link>
      </section>
    </PublicShell>
  );
}
