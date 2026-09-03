"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import PublicShell from "./PublicShell";
import BrandMark from "./BrandMark";
import styles from "./DosaEditorial.module.css";

type Bilingual = { es: string; en: string };

const homeServices: Array<{ n: string; title: Bilingual }> = [
  { n: "01.", title: { es: "Audio e Iluminación profesional.", en: "Professional audio and lighting" } },
  { n: "03.", title: { es: "Video y Pantallas LED.", en: "Video and LED screens" } },
  { n: "04.", title: { es: "Escenarios y Stands.", en: "Stages and stands" } },
  { n: "05.", title: { es: "Operación y Coordinación.", en: "Operation and coordination" } },
  { n: "06.", title: { es: "Servicios Especiales.", en: "Special services" } },
];

const audiences: Array<{ title: Bilingual; body: Bilingual; image: string; alt: Bilingual }> = [
  {
    title: { es: "Eventos Corporativos e Institucionales", en: "Corporate and Institutional Events" },
    body: {
      es: "Desde reuniones privadas de altos ejecutivos hasta congresos masivos. Audio e iluminación calibrados para que la agenda se cumpla con total fluidez.",
      en: "From private executive meetings to large-scale conferences. Audio and lighting calibrated so the agenda runs smoothly from start to finish.",
    },
    image: "/images/hero/dosa-hero-loreal-1920w.webp",
    alt: { es: "Producción audiovisual para evento corporativo", en: "Audiovisual production for a corporate event" },
  },
  {
    title: { es: "Agencias de Producción y Filmación", en: "Production and Filming Agencies" },
    body: {
      es: "Nos sumamos a producciones de gran escala como un socio estratégico. Asesoría técnica personalizada y coordinación en CDMX, toda la República o el extranjero.",
      en: "We join large-scale productions as a strategic technical partner, with tailored consulting and coordination in Mexico City, across Mexico, or abroad.",
    },
    image: "/images/projects/dosa-recovered-audio-video.webp",
    alt: { es: "Producción técnica con múltiples pantallas", en: "Technical production with multiple screens" },
  },
  {
    title: { es: "Experiencias de Marca y Activaciones", en: "Brand Experiences and Activations" },
    body: {
      es: "Diseño y montaje de stands personalizados, estructuras, video mapping y tecnología visual para hacer realidad la identidad de tu marca.",
      en: "Custom stands, structures, video mapping, and visual technology that bring a brand identity into the physical space.",
    },
    image: "/images/projects/mobil-hologram-1920w.webp",
    alt: { es: "Experiencia de marca con instalación audiovisual", en: "Brand experience with an audiovisual installation" },
  },
];

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <PublicShell>
      <div className={styles.home}>
        <section className="hero-orientation hero-orientation--black">
          <div className="hero-orientation__content">
            <BrandMark className="hero-brand" />
            <p className="eyebrow">
              {lang === "es" ? "PRODUCCIÓN AUDIOVISUAL & EVENT MANAGEMENT" : "Audiovisual production & event management"}
            </p>
            <h1>{lang === "es" ? "Audio, video, iluminación y operación. Un solo equipo." : "Audio, video, lighting, and operation. One team."}</h1>
            <p className="hero-support">
              {lang === "es"
                ? "Sistemas de audio, iluminación, pantallas LED y escenografías de alta gama, diseñados para reflejar la excelencia y potencia de tu marca."
                : "High-end audio, lighting, LED screens, and scenic systems designed to reflect the quality and strength of your brand."}
            </p>
            <div className="button-row">
              <Link className="button button--light" href="/cotizar">
                {lang === "es" ? "COTIZAR MI EVENTO" : "Get a quote"} <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="home-services-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-end">
            <div className="section-heading !mb-0">
              <p className="eyebrow">{lang === "es" ? "SERVICIOS" : "Services"}</p>
              <h2 id="home-services-title">
                {lang === "es"
                  ? "La parte técnica de tu evento, coordinada de principio a fin."
                  : "The technical side of your event, coordinated from start to finish."}
              </h2>
              <p>
                {lang === "es"
                  ? "Cubrimos necesidades puntuales o nos hacemos cargo de la producción técnica integral como un solo equipo."
                  : "We cover specific needs or take responsibility for the complete technical production as one coordinated team."}
              </p>
            </div>
            <figure className="m-0 overflow-hidden border border-[var(--line)] bg-[var(--ink2)]">
              <img
                src="/images/projects/dosa-recovered-audio-video.webp"
                alt={lang === "es" ? "Producción audiovisual con audio, video y pantallas" : "Audiovisual production with audio, video, and screens"}
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="block aspect-[16/10] h-auto w-full object-cover"
              />
            </figure>
          </div>

          <ol className="mt-12 list-none border-t border-[var(--line)] p-0">
            {homeServices.map((service) => (
              <li
                key={service.n}
                className="grid grid-cols-[52px_1fr] items-center gap-4 border-b border-[var(--line)] py-5 md:grid-cols-[80px_1fr] md:py-6"
              >
                <span className="text-xs tracking-[0.12em] text-[var(--muted)]">{service.n}</span>
                <h3 className="m-0 font-[var(--font-sora)] text-[clamp(1.25rem,2.3vw,2rem)] font-semibold tracking-[-0.035em]">
                  {service.title[lang]}
                </h3>
              </li>
            ))}
          </ol>
          <div className="section-action">
            <Link className="text-link" href="/servicios">
              {lang === "es" ? "Conoce más aquí" : "Explore all services"} <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="section section--paper" aria-labelledby="about-dosa-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-center">
            <div className="section-heading !mb-0 !max-w-[820px]">
              <p id="about-dosa-title">
                {lang === "es"
                  ? "Somos una agencia mexicana especializada en la producción integral de eventos corporativos, gubernamentales, sociales y masivos. Con más de 25 años de experiencia en el mercado, nos destacamos por ofrecer soluciones tecnológicas a la medida para presentaciones en espacios abiertos, cerrados, hoteles y empresas."
                  : "We are a Mexican agency specializing in end-to-end event production."}
              </p>
              <p className="mt-5 text-[#55534e]">
                {lang === "es"
                  ? "Nuestra filosofía se basa en cuidar los pequeños detalles que marcan la gran diferencia. Desde una junta privada de altos ejecutivos hasta un concierto multitudinario, nos aseguramos de brindar una ejecución impecable, fresca y elegante."
                  : "Our philosophy is to care for the small details that create the biggest difference. From a private executive meeting to a large concert, we aim for an execution that is precise, fresh, and elegant."}
              </p>
            </div>
            <figure className="m-0 overflow-hidden bg-[#dedbd4]">
              <img
                src="/images/projects/dosa-recovered-stand-exhibition.webp"
                alt={lang === "es" ? "Montaje integral de stand y producción audiovisual" : "Integrated exhibition stand and audiovisual production"}
                width={1600}
                height={1100}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/3] h-auto w-full object-cover"
              />
            </figure>
          </div>
        </section>

        <section className="client-wall" aria-labelledby="client-proof-title">
          <p className="client-wall__eyebrow" id="client-proof-title">
            {lang === "es" ? "MARCAS Y ORGANISMOS QUE CONFÍAN EN DOS2A" : "Brands and organizations that trust dos A"}
          </p>
          <ul>
            <li><img src="/brand/clients/coca-cola.png" alt="Coca-Cola" width={240} height={96} loading="lazy" decoding="async" /></li>
            <li><img src="/brand/clients/exxonmobil.png" alt="ExxonMobil" width={346} height={96} loading="lazy" decoding="async" /></li>
            <li><img src="/brand/clients/jpmorgan.png" alt="J.P. Morgan" width={324} height={96} loading="lazy" decoding="async" /></li>
            <li><img src="/brand/clients/loreal.png" alt="L'Oréal" width={347} height={96} loading="lazy" decoding="async" /></li>
            <li className="client-wall__tall"><img src="/brand/clients/chevron.png" alt="Chevron" width={120} height={132} loading="lazy" decoding="async" /></li>
            <li className="client-wall__tall"><img src="/brand/clients/veci.png" alt="Viajes El Corte Inglés México" width={340} height={131} loading="lazy" decoding="async" /></li>
          </ul>
          <p className="client-wall__gov">
            {lang === "es"
              ? "Producción técnica para dependencias del sector público como CONAHCYT, CONAVI, IFT y CONAPRED"
              : "Technical production for public-sector organizations including CONAHCYT, CONAVI, IFT, and CONAPRED"}
          </p>
        </section>

        <section className="section section--paper" aria-labelledby="audience-title">
          <div className="section-heading">
            <p className="eyebrow eyebrow--dark">{lang === "es" ? "SOLUCIONES AUDIOVISUALES A LA MEDIDA" : "Tailored audiovisual solutions"}</p>
            <h2 id="audience-title">
              {lang === "es"
                ? "Operación impecable para proyectos que no admiten margen de error"
                : "Precise operation for projects where there is no room for error."}
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden bg-[var(--line-dark)] lg:grid-cols-3">
            {audiences.map((item) => (
              <article key={item.title.es} className="bg-[var(--paper)]">
                <img
                  src={item.image}
                  alt={item.alt[lang]}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] h-auto w-full object-cover"
                />
                <div className="p-6 md:p-8">
                  <h3 className="m-0 font-[var(--font-sora)] text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
                    {item.title[lang]}
                  </h3>
                  <p className="mb-0 mt-4 text-[#55534e]">{item.body[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-cta">
          <h2>
            {lang === "es"
              ? "Hacemos realidad la producción técnica de tu próximo evento."
              : "We make the technical production of your next event happen."}
          </h2>
          <p className="font-[var(--font-sora)] text-[clamp(1.25rem,2.2vw,1.75rem)] !text-[var(--paper)]">
            {lang === "es" ? "¿Tienes un evento en puerta?" : "Do you have an event coming up?"}
          </p>
          <p>
            {lang === "es"
              ? "No necesitas dominar términos técnicos. Dinos qué quieres lograr y nuestro equipo diseñará la solución ideal en audio, pantallas e iluminación a la medida de tu presupuesto."
              : "You do not need to master technical terminology. Tell us what you want to accomplish and our team will define the right audio, screen, and lighting solution for your budget."}
          </p>
          <Link className="button button--light" href="/cotizar">
            {lang === "es" ? "COTIZAR MI EVENTO" : "Get a quote"} <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </PublicShell>
  );
}
