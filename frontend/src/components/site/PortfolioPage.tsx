"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/lib/language";
import PublicShell from "./PublicShell";

const projects = [
  {
    src: "/images/projects/mobil-hologram-1920w.webp",
    key: "hologram",
    caption: { es: "Holograma de gran formato · Experiencia Mobil", en: "Large-format hologram · Mobil experience" },
  },
  {
    src: "/images/projects/led-sculpture-1181w.webp",
    key: "sculpture",
    caption: { es: "Escultura LED con video mapping", en: "LED sculpture with video mapping" },
  },
  {
    src: "/images/hero/dosa-hero-loreal-1920w.webp",
    key: "loreal",
    caption: { es: "Gala corporativa · L'Oréal Luxe", en: "Corporate gala · L'Oréal Luxe" },
  },
  {
    src: "/images/projects/dosa-recovered-stand-exhibition.webp",
    key: "stand",
    caption: { es: "Stand y espacio de exposición", en: "Exhibition stand and space" },
  },
  {
    src: "/images/projects/dosa-recovered-audio-video.webp",
    key: "av",
    caption: { es: "Video y pantallas en contexto", en: "Video and screens in context" },
  },
  {
    src: "/images/projects/dosa-recovered-experiential-entry.webp",
    key: "entry",
    caption: { es: "Experiencia de entrada", en: "Entrance experience" },
  },
] as const;

export default function PortfolioPage() {
  const { lang } = useLanguage();
  const [playing, setPlaying] = useState(false);
  return (
    <PublicShell>
      <section className="page-hero">
        <p className="eyebrow">{lang === "es" ? "Portafolio" : "Portfolio"}</p>
        <h1>{lang === "es" ? "Trabajo real. Escala real. Producción en contexto." : "Real work. Real scale. Production in context."}</h1>
        <p>{lang === "es" ? "Una selección de proyectos para mostrar cómo se integran audio, video, iluminación, espacios y operación en situaciones reales." : "A curated selection showing how audio, video, lighting, spaces, and technical operation come together in real situations."}</p>
      </section>

      <section className="reel-case" aria-label={lang === "es" ? "Caso destacado: Experiencia Mobil" : "Featured case: Mobil experience"}>
        <div className="reel-case__media">
          {playing ? (
            <video src="/videos/mobil-experience-reel-1080p.mp4" poster="/videos/mobil-reveal-poster.jpg" controls autoPlay playsInline preload="auto"/>
          ) : (
            <button className="reel-case__poster" onClick={() => setPlaying(true)} aria-label={lang === "es" ? "Reproducir video del proyecto Mobil" : "Play Mobil project video"}>
              <img src="/videos/mobil-reveal-poster.jpg" alt={lang === "es" ? "Logotipo Mobil revelado en pantalla LED gran formato, reflejado en escultura LED" : "Mobil logo revealed on large-format LED screen, mirrored in LED sculpture"}/>
              <span className="reel-case__play"><Play size={26} fill="currentColor"/>{lang === "es" ? "Ver el proyecto en video" : "Watch the project video"}</span>
            </button>
          )}
        </div>
        <div className="reel-case__copy">
          <p className="eyebrow">{lang === "es" ? "Caso destacado" : "Featured case"}</p>
          <h2>{lang === "es" ? "Experiencia Mobil Super" : "Mobil Super experience"}</h2>
          <p>{lang === "es"
            ? "Lanzamiento de producto con pantalla LED de gran formato, escultura LED, contenido de marca y mapping arquitectónico sobre la arquería del recinto. Un solo equipo, cuatro disciplinas en escena."
            : "A product launch with a large-format LED wall, LED sculpture, brand content, and architectural mapping across the venue's arches. One team, four disciplines on stage."}</p>
          <p className="reel-case__meta">{lang === "es" ? "Video · 1 min 57 s · Producción dos A" : "Video · 1 min 57 s · dos A production"}</p>
        </div>
      </section>

      <section className="portfolio-grid">
        {projects.map((project, i) => (
          <figure key={project.key}>
            <img src={project.src} alt={project.caption[lang]} loading={i < 2 ? "eager" : "lazy"}/>
            <figcaption><span>{String(i + 1).padStart(2, "0")}</span>{project.caption[lang]}</figcaption>
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
