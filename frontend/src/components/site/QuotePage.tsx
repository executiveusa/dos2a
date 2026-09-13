"use client";

import { ClipboardList } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import PublicShell from "./PublicShell";
import QuoteForm from "./QuoteForm";

export default function QuotePage() {
  const { lang } = useLanguage();
  const c = siteContent.quote;

  return (
    <PublicShell>
      <section className="page-hero page-hero--compact">
        <p className="eyebrow">{lang === "es" ? "Cotizar" : "Get a quote"}</p>
        <h1>{c.title[lang]}</h1>
        <p>{c.body[lang]}</p>
      </section>
      <section id="brief" className="quote-layout">
        <aside className="quote-helper">
          <ClipboardList size={26}/>
          <p className="eyebrow">{lang === "es" ? "Brief del evento" : "Event brief"}</p>
          <h2>{c.helperTitle[lang]}</h2>
          <p>{c.helperBody[lang]}</p>
          <p className="small-note">{lang === "es" ? "La solicitud solo se confirma cuando queda guardada. Si el envío en línea no está disponible, el formulario te ofrecerá el correo preparado como alternativa." : "The request is confirmed only after it is saved. If online submission is unavailable, the form will offer a prepared email as the fallback."}</p>
        </aside>
        <QuoteForm/>
      </section>
    </PublicShell>
  );
}
