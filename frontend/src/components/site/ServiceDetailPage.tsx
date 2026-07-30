"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import PublicShell from "./PublicShell";

export type ServiceSlug = "audio" | "iluminacion" | "video" | "escenarios";

export default function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const { lang } = useLanguage();
  const s = siteContent.servicePages[slug];
  const L = siteContent.servicePageLabels;
  const wa = siteContent.brand.whatsapp;
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(s.waMessage[lang])}`;
  return <PublicShell>
    <nav className="breadcrumb" aria-label={lang === "es" ? "Ruta de navegación" : "Breadcrumb"}>
      <Link href="/">{siteContent.nav.home[lang]}</Link><ChevronRight size={13} aria-hidden="true"/><Link href="/servicios">{siteContent.nav.services[lang]}</Link><ChevronRight size={13} aria-hidden="true"/><span aria-current="page">{s.name[lang]}</span>
    </nav>
    <section className="page-hero page-hero--compact">
      <p className="eyebrow">{lang === "es" ? `Servicio ${s.n}` : `Service ${s.n}`} — {s.name[lang]}</p>
      <h1>{s.h1[lang]}</h1>
      <p>{s.support[lang]}</p>
      <div className="button-row">
        <Link className="button button--light" href="/cotizar">{s.cta[lang]} <ArrowRight size={17}/></Link>
        <a className="text-link hero-secondary" href={waHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>WhatsApp</a>
      </div>
    </section>
    <section className="sd-facts" aria-label={lang === "es" ? "Datos clave" : "Key facts"}>
      {s.facts.map((f, i) => <div key={i}>{f[lang]}</div>)}
    </section>
    <section className="section sd-block">
      <p className="eyebrow">{L.includes[lang]}</p>
      <ul className="sd-includes">
        {s.includes.map((item, i) => <li key={i}>{item[lang]}</li>)}
      </ul>
    </section>
    <section className="sd-block sd-block--tight">
      <p className="eyebrow">{L.equipment[lang]}</p>
      <ul className="sd-brands">{s.brands.map(b => <li key={b}>{b}</li>)}</ul>
    </section>
    <section className="sd-block">
      <p className="eyebrow">{L.projects[lang]}</p>
      <div className="sd-related">
        {s.photos.map((src, i) => <img key={src} src={src} alt={`${s.name[lang]} — dos A`} width={960} height={600} loading={i === 0 ? "eager" : "lazy"} decoding="async"/>)}
      </div>
      <Link className="text-link sd-more" href="/portafolio">{L.moreProjects[lang]}<ArrowRight size={16}/></Link>
    </section>
    <section className="sd-block">
      <p className="eyebrow">{L.faq[lang]}</p>
      <div className="sd-faq">
        {s.faq.map((f, i) => <details key={i}><summary>{f.q[lang]}</summary><p>{f.a[lang]}</p></details>)}
      </div>
    </section>
    <section className="closing-cta">
      <h2>{s.closing[lang]}</h2>
      <Link className="button button--light" href="/cotizar">{s.cta[lang]} <ArrowRight size={17}/></Link>
    </section>
  </PublicShell>;
}
