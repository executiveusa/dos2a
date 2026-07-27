"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import PublicShell from "./PublicShell";

export default function ContactPage() {
  const { lang } = useLanguage();
  const c = siteContent.contact;
  const wa = siteContent.brand.whatsapp;
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(c.waMessage[lang])}`;
  const mailHref = `mailto:${siteContent.brand.email}`;
  return <PublicShell>
    <section className="page-hero">
      <p className="eyebrow">{c.eyebrow[lang]}</p>
      <h1>{c.title[lang]}</h1>
      <p>{c.intro[lang]}</p>
    </section>
    <section className="contact-methods" aria-label={lang === "es" ? "Canales de contacto" : "Contact channels"}>
      {wa && <article className="contact-card contact-card--wa">
        <h2>{c.waTitle[lang]}</h2>
        <p>{c.waBody[lang]}</p>
        <a className="button button--light" href={waHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{c.waCta[lang]}</a>
      </article>}
      <article className="contact-card">
        <h2>{c.mailTitle[lang]}</h2>
        <p>{c.mailBody[lang]}</p>
        <a className="button button--light" href={mailHref}><Mail size={17}/>{siteContent.brand.email}</a>
      </article>
      <article className="contact-card">
        <h2>{c.quoteTitle[lang]}</h2>
        <p>{c.quoteBody[lang]}</p>
        <Link className="button button--ghost" href="/cotizar">{c.quoteCta[lang]} <ArrowRight size={17}/></Link>
      </article>
    </section>
    <p className="contact-location"><MapPin size={16}/>{c.location[lang]}</p>
  </PublicShell>;
}
