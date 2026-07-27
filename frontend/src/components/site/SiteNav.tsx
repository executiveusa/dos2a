"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import BrandMark from "./BrandMark";

export default function SiteNav() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const n = siteContent.nav;
  const links = [
    ["/servicios", n.services[lang]],
    ["/eventos", n.events[lang]],
    ["/portafolio", n.portfolio[lang]],
  ] as const;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand-lockup" href="/" aria-label="dos A — inicio">
          <BrandMark className="brand-mark" />
          <span>{siteContent.brand.tagline[lang]}</span>
        </Link>
        <nav className="desktop-nav" aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}>
          {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="language-switch" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}>{lang === "es" ? "EN" : "ES"}</button>
          <Link className="button button--small button--light desktop-quote" href="/cotizar">{n.quote[lang]}</Link>
          <button className="menu-button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label={lang === "es" ? "Navegación móvil" : "Mobile navigation"}>
          {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="button button--light" href="/cotizar" onClick={() => setOpen(false)}>{n.quote[lang]}</Link>
        </nav>
      )}
    </header>
  );
}
