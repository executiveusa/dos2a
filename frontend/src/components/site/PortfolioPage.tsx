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
    src: "/images/projects/dosa-portfolio-4-abbott.webp",
    key: "stand",
    caption: { es: "Stand y espacio de exposición", en: "Exhibition stand and space" },
  },
  {
    src: "/images/projects/dosa-recovered-audio-video.webp",
    key: "av",
    caption: { es: "Video y pantallas en contexto", en: "Video and screens in context" },
  },
  {
    src: "/images/projects/dosa-portfolio-6-universal.webp",
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
        <h1>{lang === "es" ? "Proyectos reales. Producción técnica de alto impacto." : "Real projects. High-impact technical production."}</h1>
        <p>{lang === "es" ? "Explora nuestra selección de eventos y observa cómo coordinamos audio, video, iluminación y operación para marcas e instituciones líderes." : "Explore our curated events and see how we coordinate audio, video, lighting, and technical operations for leading brands and institutions."}</p>
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
        <h2>{lang === "es" ? "Cada evento es único. Adaptamos la tecnología a tu visión." : "Every event is unique. We adapt technology to your vision."}</h2>
        <p>{lang === "es" ? "Cuéntanos tu objetivo. Nosotros nos encargamos de diseñar el alcance técnico de audio, video e iluminación para hacerlo realidad en cualquier recinto." : "Tell us your objective. We take care of designing the technical scope of audio, video, and lighting to make it a reality in any venue."}</p>
        <Link className="button button--light" href="/cotizar">{lang === "es" ? "Cotización a la medida" : "Custom quote"}<ArrowRight size={17}/></Link>
      </section>
    </PublicShell>
  );
}
