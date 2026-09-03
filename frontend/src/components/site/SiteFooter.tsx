"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";
import BrandMark from "./BrandMark";
import LegalDisclosure from "./LegalDisclosure";
import socialStyles from "./FooterSocial.module.css";

const WHATSAPP_NUMBER = "525549110045";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/1DXS9JAjkr/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/dos2a?igsi=MXdtenNheXNscTg2bQ==",
  tiktok: "https://www.tiktok.com/@2audio.iluminacin?_r=1&_t=ZS-99PERZGaisG",
} as const;

// Font Awesome Free 7.3.1 brand icons by @fontawesome.
// https://fontawesome.com — Icons licensed under CC BY 4.0.
function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" aria-hidden="true">
      <path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true">
      <path d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true">
      <path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" />
    </svg>
  );
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
          <p>{lang === "es" ? "Ciudad de México · proyectos en todo México" : "Mexico City · projects across Mexico"}<br/><a href="mailto:2audioiluminacion@gmail.com">2audioiluminacion@gmail.com</a><br/><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
          <div className={socialStyles.social} aria-label={lang === "es" ? "Redes sociales" : "Social media"}>
            <a className={socialStyles.mark} href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon/></a>
            <a className={socialStyles.mark} href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon/></a>
            <a className={socialStyles.mark} href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon/></a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} dos A</span>
        <span>{lang === "es" ? "audio · iluminación · video" : "audio · lighting · video"}</span>
        <LegalDisclosure kind="terms" />
        <LegalDisclosure kind="privacy" />
      </div>
    </footer>
  );
}
