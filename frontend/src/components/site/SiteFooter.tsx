"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import BrandMark from "./BrandMark";
import socialStyles from "./FooterSocial.module.css";

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>;
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.03.084c-1.277.06-2.149.264-2.911.563-.789.308-1.458.72-2.123 1.388C1.331 3.703.921 4.372.616 5.162.321 5.926.121 6.799.064 8.076.008 9.354-.005 9.764.002 13.023c.006 3.259.02 3.667.082 4.947.061 1.277.264 2.148.564 2.911.308.789.72 1.457 1.388 2.123.668.665 1.337 1.074 2.128 1.38.763.295 1.636.496 2.914.552 1.277.056 1.688.069 4.946.063 3.258-.006 3.668-.021 4.948-.081 1.28-.061 2.147-.265 2.91-.563.789-.309 1.458-.72 2.123-1.388.665-.668 1.074-1.338 1.38-2.128.295-.763.496-1.636.552-2.913.056-1.281.069-1.69.063-4.948-.006-3.258-.021-3.667-.082-4.946-.061-1.28-.264-2.149-.563-2.912-.308-.789-.72-1.457-1.388-2.123C21.298 1.33 20.628.921 19.838.617 19.074.321 18.202.12 16.924.065 15.647.009 15.236-.005 11.977.001 8.718.008 8.31.022 7.03.084m4.982 5.755a6.156 6.156 0 1 0 0 12.312 6.156 6.156 0 0 0 0-12.312m0 2.161a4 4 0 1 1 0 8 4 4 0 0 1 0-8m4.941-2.414a1.44 1.44 0 1 0 2.88 0 1.44 1.44 0 0 0-2.88 0"/></svg>;
}

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
}

export default function SiteFooter() {
  const { lang } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="brand-lockup brand-lockup--footer"><BrandMark className="footer-brand"/><span>{siteContent.brand.tagline[lang]}</span></div>
        <div className="footer-links">
          <Link href="/servicios">{siteContent.nav.services[lang]}</Link>
          <Link href="/portafolio">{siteContent.nav.portfolio[lang]}</Link>
          <Link href="/contacto">{siteContent.nav.contact[lang]}</Link>
          <Link href="/cotizar">{siteContent.nav.quote[lang]}</Link>
        </div>
        <div className="footer-note">
          <p>{lang === "es" ? "Ciudad de México · proyectos en todo México" : "Mexico City · projects across Mexico"}<br/><a href="mailto:2audioiluminacion@gmail.com">2audioiluminacion@gmail.com</a>{siteContent.brand.whatsapp && <><br/><a href={`https://wa.me/${siteContent.brand.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></>}</p>
          <div className={socialStyles.social} aria-label={lang === "es" ? "Redes sociales" : "Social media"}>
            <span className={socialStyles.mark} role="img" aria-label="Facebook"><FacebookIcon/></span>
            <span className={socialStyles.mark} role="img" aria-label="Instagram"><InstagramIcon/></span>
            <span className={socialStyles.mark} role="img" aria-label="TikTok"><TikTokIcon/></span>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom"><span>© {new Date().getFullYear()} dos A</span><span>{lang === "es" ? "audio · iluminación · video" : "audio · lighting · video"}</span></div>
    </footer>
  );
}
