"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import BrandMark from "./BrandMark";
import styles from "./DosaEditorial.module.css";

export default function SiteNav() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const n = siteContent.nav;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    const onTap = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onTap);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onTap);
    };
  }, [open]);

  const links = [
    ["/", n.home[lang]],
    ["/servicios", n.services[lang]],
    ["/portafolio", n.portfolio[lang]],
    ["/contacto", n.contact[lang]],
  ] as const;

  return (
    <header className={`site-header ${styles.siteChrome}`} ref={headerRef}>
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
          <button ref={menuButtonRef} className="menu-button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-haspopup="true" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
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
