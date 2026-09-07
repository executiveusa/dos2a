"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import PublicShell from "./PublicShell";
import QuoteForm from "./QuoteForm";

const WHATSAPP_NUMBER = "525549110045";
const CONTACT_EMAIL = "alanis@eventosdos2a.mx";

export default function ContactPage() {
  const { lang } = useLanguage();
  const c = siteContent.contact;
  const q = siteContent.quote;
  const wa = WHATSAPP_NUMBER;
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(c.waMessage[lang])}`;
  const mailHref = `mailto:${CONTACT_EMAIL}`;

  return (
    <PublicShell>
      <section className="page-hero">
        <p className="eyebrow">{c.eyebrow[lang]}</p>
        <h1>{c.title[lang]}</h1>
        <p>{c.intro[lang]}</p>
      </section>

      <section className="contact-methods" aria-label={lang === "es" ? "Canales de contacto" : "Contact channels"}>
        {wa && (
          <article className="contact-card contact-card--wa">
            <h2>{c.waTitle[lang]}</h2>
            <p>{c.waBody[lang]}</p>
            <a className="button button--light" href={waHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} />
              {c.waCta[lang]}
            </a>
          </article>
        )}
        <article className="contact-card">
          <h2>{c.mailTitle[lang]}</h2>
          <p>{c.mailBody[lang]}</p>
          <a className="button button--light" href={mailHref}>
            <Mail size={17} />
            {CONTACT_EMAIL}
          </a>
        </article>
      </section>

      <section id="cotizar" className="quote-layout !mt-12 !border-t !border-[var(--line)] !pt-12">
        <aside className="quote-helper">
          <p className="eyebrow">{lang === "es" ? "Cotización" : "Quote"}</p>
          <h2>{q.helperTitle[lang]}</h2>
          <p>{q.helperBody[lang]}</p>
        </aside>
        <div>
          <div className="mb-6">
            <h2 className="font-[var(--font-sora)] text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold leading-tight tracking-[-0.035em] text-[var(--paper)]">
              {q.title[lang]}
            </h2>
            <p className="mt-2 text-[var(--paper2)]">
              {q.body[lang]}
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <p className="contact-location">
        <MapPin size={16} />
        {c.location[lang]}
      </p>
    </PublicShell>
  );
}
