"use client";

import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const f = translations.footer;
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#05060a",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {/* Logo + tagline */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.12em",
              color: "#f1f5f9",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            DOS2A
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#475569",
            }}
          >
            {f.tagline[lang]}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            ["#servicios", translations.nav.services[lang]],
            ["#proceso", translations.nav.process[lang]],
            ["#cotiza", translations.nav.contact[lang]],
            [
              "https://www.instagram.com/dos2a/",
              "Instagram",
            ],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              style={{
                fontSize: "0.8rem",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "#475569",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#94a3b8")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#475569")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            color: "#334155",
          }}
        >
          © {year} DOS2A. {f.rights[lang]}
        </div>
      </div>
    </footer>
  );
}
