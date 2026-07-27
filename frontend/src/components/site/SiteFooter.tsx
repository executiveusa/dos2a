"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import BrandMark from "./BrandMark";

export default function SiteFooter() {
  const { lang } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="brand-lockup brand-lockup--footer"><BrandMark className="footer-brand"/><span>{siteContent.brand.tagline[lang]}</span></div>
        <div className="footer-links">
          <Link href="/servicios">{siteContent.nav.services[lang]}</Link>
          <Link href="/eventos">{siteContent.nav.events[lang]}</Link>
          <Link href="/portafolio">{siteContent.nav.portfolio[lang]}</Link>
          <Link href="/cotizar">{siteContent.nav.quote[lang]}</Link>
        </div>
        <p className="footer-note">{lang === "es" ? "Ciudad de México · proyectos en todo México" : "Mexico City · projects across Mexico"}<br/><a href="mailto:2audioiluminacion@gmail.com">2audioiluminacion@gmail.com</a></p>
      </div>
      <div className="site-footer__bottom"><span>© {new Date().getFullYear()} dos A</span><span>{lang === "es" ? "audio · iluminación · video" : "audio · lighting · video"}</span></div>
    </footer>
  );
}
