"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import PublicShell from "./PublicShell";
import ScrollReveal from "./ScrollReveal";
import styles from "./DosaEditorial.module.css";

type Bilingual = { es: string; en: string };

type ServiceBlock = {
  n: string;
  label: Bilingual;
  overline?: Bilingual;
  title: Bilingual;
  body: Bilingual;
  image?: string;
  alt?: Bilingual;
};

const services: ServiceBlock[] = [
  {
    n: "01",
    label: { es: "Nuestro servicio estrella", en: "Our signature service" },
    overline: { es: "AUDIO + ILUMINACIÓN", en: "Audio + Lighting" },
    title: {
      es: "Sistemas de sonido e ingeniería acústica calibrados para el aforo, voz, música y formatos híbridos de tu evento.",
      en: "Sound systems and acoustic engineering calibrated for your audience size, speech, music, and hybrid event formats.",
    },
    body: {
      es: "Equipamiento Bose, dB Technologies y Shure, junto con iluminación arquitectónica adaptada a la escala de tu evento.",
      en: "Bose, dB Technologies, and Shure equipment, paired with architectural lighting adapted to the scale of your event.",
    },
    image: "/images/services/dosa-service-1-audio-luz.webp",
    alt: { es: "Consola de DJ y sistema de iluminación dos A", en: "DJ console and lighting system by dos A" },
  },
  {
    n: "02",
    label: { es: "Producción de Video & Fotografía", en: "Video & Photography Production" },
    overline: { es: "VIDEO + FOTOGRAFÍA + MAPPING", en: "Video + Photography + Mapping" },
    title: {
      es: "Pantallas de alta resolución, proyectores, monitores de apoyo para una transmisión visual impecable.",
      en: "High-resolution screens, projectors, and support monitors for a precise visual presentation.",
    },
    body: {
      es: "Circuito Cerrado de TV (CCTV), pantallas LED, proyectores y video mapping para proyectar tu contenido con máxima claridad.",
      en: "Closed-circuit television (CCTV), LED screens, projectors, and video mapping to present your content with maximum clarity.",
    },
    image: "/images/projects/dosa-recovered-audio-video.webp",
    alt: { es: "Evento con múltiples pantallas y producción de video", en: "Event with multiple screens and video production" },
  },
  {
    n: "03",
    label: { es: "Escenarios & Stands", en: "Stages & Stands" },
    title: {
      es: "Diseño, estructura y fabricación adaptada a los requerimientos de tu marca o espacio.",
      en: "Design, structure, and fabrication adapted to the requirements of your brand or venue.",
    },
    body: {
      es: "Estructura, pantallas, iluminación y marca coordinadas como una sola experiencia física y personalizada.",
      en: "Structure, screens, lighting, and brand elements coordinated as one physical and customized experience.",
    },
    image: "/images/projects/dosa-recovered-stand-exhibition.webp",
    alt: { es: "Stand de exposición con estructura y producción audiovisual", en: "Exhibition stand with structure and audiovisual production" },
  },
  {
    n: "04",
    label: { es: "Coordinación & Logística", en: "Coordination & Logistics" },
    overline: { es: "COORDINACIÓN + LOGÍSTICA + OPERACIÓN", en: "Coordination + Logistics + Operation" },
    title: { es: "Control total de principio a fin.", en: "Full control from start to finish." },
    body: {
      es: "Gestión integral de proveedores, tiempos y montaje con un profesional dedicado a la operación impecable de tu evento.",
      en: "Integrated management of vendors, timing, and setup with a professional dedicated to the precise operation of your event.",
    },
    image: "/images/services/dosa-service-4-coordinacion.webp",
    alt: { es: "Coordinación y montaje técnico para Cerveceros de México", en: "Technical coordination and setup for Cerveceros de México" },
  },
  {
    n: "05",
    label: { es: "Traducción Simultánea", en: "Simultaneous Interpretation" },
    title: { es: "Comunicación fluida sin fronteras.", en: "Clear communication across languages." },
    body: {
      es: "Sistemas de microfonía parlamentaria y traducción simultánea multilingüe para eventos internacionales y corporativos.",
      en: "Conference microphone systems and multilingual simultaneous interpretation for international and corporate events.",
    },
    image: "/images/services/dosa-service-5-traduccion.webp",
    alt: { es: "Traducción simultánea y producción en evento plenario Hilti", en: "Simultaneous interpretation and production at Hilti plenary event" },
  },
  {
    n: "06",
    label: { es: "Servicios Especiales", en: "Special Services" },
    overline: { es: "RENTA DE CÓMPUTO + PUBLICIDAD", en: "Computer Rental + Promotional Production" },
    title: { es: "Respaldo tecnológico y promocional.", en: "Technical and promotional support." },
    body: {
      es: "Alquiler de equipo informático para logística, además de producción de materiales digitales, impresos y artículos promocionales.",
      en: "Computer equipment rental for event logistics, plus production of digital materials, printed materials, and promotional items.",
    },
    image: "/images/services/dosa-service-6-especiales.webp",
    alt: { es: "Servicios especiales y cómputo en stand Cofepris", en: "Special services and computer setup at Cofepris stand" },
  },
];

export default function ServicesPage() {
  const { lang } = useLanguage();
  const process = siteContent.process;

  return (
    <PublicShell>
      <div className={styles.services}>
        <section className="page-hero">
          <p className="eyebrow">{lang === "es" ? "Servicios" : "Services"}</p>
          <h1>
            {lang === "es"
              ? "En Dos2A transformamos cualquier espacio en una experiencia memorable."
              : "At dos A, we transform any space into a memorable experience."}
          </h1>
          <p>
            {lang === "es"
              ? "Especializados en la renta de equipo de audio e iluminación profesional para eventos corporativos, sociales y masivos."
              : "We specialize in professional audio and lighting rental for corporate, social, and large-scale events."}
          </p>
          <p>
            {lang === "es"
              ? "Integramos tecnología de vanguardia, producción de video y diseño de escenarios bajo la supervisión de un equipo experto con más de 25 años de trayectoria en México"
              : "We integrate current technology, video production, and stage design under the supervision of an experienced team with more than 25 years in Mexico."}
          </p>
        </section>

        <section className="section !pt-0" aria-label={lang === "es" ? "Servicios audiovisuales" : "Audiovisual services"}>
          <div className="border-t border-[var(--line)]">
            {services.map((service, index) => {
              const isStar = index === 0;
              return (
                <ScrollReveal key={service.n} delay={0.04} yOffset={12}>
                  <article
                    className={`grid gap-0 border-b border-[var(--line)] ${isStar ? "lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)]" : "lg:grid-cols-[120px_minmax(0,1fr)_minmax(300px,0.75fr)]"}`}
                  >
                    {isStar ? (
                      <div className="py-8 pr-0 md:py-12 lg:pr-12">
                        <div className="mb-8 flex items-center gap-4">
                          <span className="text-xs tracking-[0.12em] text-[var(--muted)]">{service.n}</span>
                          <span className="border border-[var(--line)] px-3 py-1 text-[0.7rem] tracking-[0.12em] text-[var(--paper2)]">
                            {service.label[lang]}
                          </span>
                        </div>
                        {service.overline && <p className="eyebrow">{service.overline[lang]}</p>}
                        <h2 className="m-0 max-w-[18ch] font-[var(--font-sora)] text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                          {service.title[lang]}
                        </h2>
                        <p className="mt-6 max-w-[720px] text-[1.05rem] text-[var(--paper2)]">{service.body[lang]}</p>
                      </div>
                    ) : (
                      <>
                        <div className="pt-8 text-xs tracking-[0.12em] text-[var(--muted)] lg:py-10">{service.n}</div>
                        <div className="py-6 lg:py-10 lg:pr-12">
                          <p className="mb-4 font-[var(--font-sora)] text-sm font-semibold tracking-[-0.015em] text-[var(--paper)]">{service.label[lang]}</p>
                          {service.overline && <p className="eyebrow">{service.overline[lang]}</p>}
                          <h2 className="m-0 max-w-[24ch] font-[var(--font-sora)] text-[clamp(1.75rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                            {service.title[lang]}
                          </h2>
                          <p className="mt-5 max-w-[720px] text-[var(--paper2)]">{service.body[lang]}</p>
                        </div>
                      </>
                    )}

                    {service.image ? (
                      <figure className={`m-0 overflow-hidden bg-[var(--ink2)] ${isStar ? "min-h-[360px] lg:min-h-[620px]" : "min-h-[260px] lg:my-8"}`}>
                        <img
                          src={service.image}
                          alt={service.alt?.[lang] ?? ""}
                          width={1400}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          className="h-full min-h-[260px] w-full object-cover"
                        />
                      </figure>
                    ) : (
                      <div className="hidden lg:block" aria-hidden="true" />
                    )}
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="section section--paper">
          <div className="section-heading">
            <p className="eyebrow eyebrow--dark">{lang === "es" ? "Proceso" : "Process"}</p>
            <h2>{process.title[lang]}</h2>
          </div>
          <ol className="process-list">
            {process.steps.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <div>
                  <h3>{step.title[lang]}</h3>
                  <p>{step.body[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="closing-cta">
          <h2>{lang === "es" ? "Tu idea en pantalla y escenario. Sin complicaciones." : "Your idea on screen and stage. Without complications."}</h2>
          <p>
            {lang === "es"
              ? "No necesitas ser experto en equipamiento audiovisual. Analizamos tu espacio y aforo para entregar una propuesta técnica lista para operar."
              : "You do not need to be an audiovisual equipment expert. We analyze your venue and audience size to deliver a technical proposal ready to operate."}
          </p>
          <Link className="button button--light" href="/cotizar">
            {lang === "es" ? "Cotiza tu evento" : "Get a quote"} <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </PublicShell>
  );
}
