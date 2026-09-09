"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Drawer } from "vaul";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import BrandMark from "./BrandMark";
import styles from "./DosaEditorial.module.css";

export default function SiteNav() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const n = siteContent.nav;

  const links = [
    ["/", n.home[lang]],
    ["/servicios", n.services[lang]],
    ["/portafolio", n.portfolio[lang]],
    ["/contacto", n.contact[lang]],
  ] as const;

  return (
    <header className={`site-header ${styles.siteChrome}`}>
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
          <button className="menu-button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-[2px] transition-opacity" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[80] flex max-h-[85vh] flex-col rounded-t-[20px] border-t border-[var(--line)] bg-[var(--ink)] px-6 pt-4 pb-[max(28px,env(safe-area-inset-bottom))] text-[var(--paper)] focus:outline-none">
            <Drawer.Title className="sr-only">{lang === "es" ? "Menú de navegación" : "Navigation menu"}</Drawer.Title>
            <Drawer.Description className="sr-only">{lang === "es" ? "Navega por las secciones de dos A" : "Navigate through dos A sections"}</Drawer.Description>
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[var(--line)]" aria-hidden="true" />
            <nav className="flex flex-col" aria-label={lang === "es" ? "Navegación móvil" : "Mobile navigation"}>
              {links.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center border-b border-[var(--line)] text-lg font-medium text-[var(--paper2)] transition-colors active:text-[var(--paper)]"
                >
                  {label}
                </Link>
              ))}
              <Link
                className="button button--light mt-6 w-full"
                href="/cotizar"
                onClick={() => setOpen(false)}
              >
                {n.quote[lang]}
              </Link>
            </nav>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </header>
  );
}

