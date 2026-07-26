"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import PublicShell from "./PublicShell";
import CinematicJourney from "./CinematicJourney";
import BrandMark from "./BrandMark";

export default function HomePage() {
  const { lang } = useLanguage(); const c = siteContent;
  return <PublicShell>
    <section className="hero-orientation">
      <div className="hero-orientation__image" aria-hidden="true" style={{ background: "#0b0b0c url('/images/hero/dosa-hero-lqip.jpg') center 48% / cover no-repeat" }}>
        <picture>
          <source type="image/avif" srcSet="/images/hero/dosa-hero-loreal-1280w.avif 1280w, /images/hero/dosa-hero-loreal-1920w.avif 1920w, /images/hero/dosa-hero-loreal-2508w.avif 2508w" sizes="100vw"/>
          <source type="image/webp" srcSet="/images/hero/dosa-hero-loreal-1280w.webp 1280w, /images/hero/dosa-hero-loreal-1920w.webp 1920w, /images/hero/dosa-hero-loreal-2508w.webp 2508w" sizes="100vw"/>
          <img src="/images/hero/dosa-hero-loreal-1920w.jpg" alt="" width={2508} height={1374} fetchPriority="high" decoding="async"/>
        </picture>
        <div/>
      </div>
      <div className="hero-orientation__content">
        <BrandMark className="hero-brand"/>
        <p className="eyebrow">{c.hero.eyebrow[lang]}</p>
        <h1>{c.hero.title[lang]}</h1>
        <p className="hero-support">{c.hero.support[lang]}</p>
        <div className="button-row"><Link className="button button--light" href="/cotizar">{c.hero.primary[lang]} <ArrowRight size={17}/></Link><Link className="text-link hero-secondary" href="/portafolio">{c.hero.secondary[lang]}<ArrowRight size={17}/></Link></div>
        <p className="trust-line">{c.hero.proof[lang]}</p>
      </div>
    </section>
    <section className="client-wall" aria-label={lang === "es" ? "Clientes que confían en dos A" : "Clients who trust dos A"}>
      <p className="client-wall__eyebrow">{c.clients.eyebrow[lang]}</p>
      <ul>{c.clients.names.map(n => <li key={n}>{n}</li>)}</ul>
      <p className="client-wall__gov">{c.clients.government[lang]} <span>{c.clients.note[lang]}</span></p>
    </section>
    <CinematicJourney/>
    <section className="section section--paper"><div className="section-heading"><p className="eyebrow eyebrow--dark">{lang === "es" ? "Para proyectos donde la coordinación importa" : "For projects where coordination matters"}</p><h2>{c.audience.title[lang]}</h2></div><div className="three-grid">{c.audience.items.map(item => <article key={item.title.es} className="text-card"><h3>{item.title[lang]}</h3><p>{item.body[lang]}</p></article>)}</div></section>
    <section className="section"><div className="section-heading"><p className="eyebrow">{lang === "es" ? "Servicios" : "Services"}</p><h2>{c.services.title[lang]}</h2><p>{c.services.intro[lang]}</p></div><div className="service-grid">{c.services.items.map((item,i)=><article className="service-card" key={item.title.es}><span>{String(i+1).padStart(2,"0")}</span><h3>{item.title[lang]}</h3><p>{item.body[lang]}</p></article>)}</div><div className="section-action"><Link className="text-link" href="/servicios">{lang === "es" ? "Ver todos los servicios" : "See all services"}<ArrowRight size={17}/></Link></div></section>
    <section className="section section--paper"><div className="section-heading"><p className="eyebrow eyebrow--dark">{lang === "es" ? "Proceso" : "Process"}</p><h2>{c.process.title[lang]}</h2></div><ol className="process-list">{c.process.steps.map(step=><li key={step.n}><span>{step.n}</span><div><h3>{step.title[lang]}</h3><p>{step.body[lang]}</p></div></li>)}</ol></section>
    <section id="la-genio" className="genio-section"><div className="genio-mark" aria-hidden="true">G</div><div><p className="eyebrow">{c.genio.eyebrow[lang]}</p><h2>{c.genio.title[lang]}</h2><p>{c.genio.body[lang]}</p><Link className="button button--light" href="/cotizar#la-genio"><MessageCircle size={18}/>{c.genio.cta[lang]}</Link></div></section>
    <section className="closing-cta"><p className="eyebrow">{lang === "es" ? "Tu siguiente evento" : "Your next event"}</p><h2>{lang === "es" ? "¿Tienes un evento en puerta?" : "Do you have an event coming up?"}</h2><p>{lang === "es" ? "Cuéntanos qué necesitas lograr. Podemos ayudarte a convertir la idea en un alcance técnico claro." : "Tell us what you need to accomplish. We can help turn the idea into a clear technical scope."}</p><Link className="button button--light" href="/cotizar">{c.hero.primary[lang]} <ArrowRight size={17}/></Link></section>
  </PublicShell>;
}
