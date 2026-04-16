"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "transparent"}`,
        background: scrolled ? "rgba(8,10,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.2s, border-color 0.2s, backdrop-filter 0.2s",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          {/* Icon mark */}
          <div
            style={{
              width: 36,
              height: 36,
              background: "#d4af37",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 800,
                fontSize: "0.875rem",
                color: "#080a0e",
                letterSpacing: "-0.04em",
              }}
            >
              D2A
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.14em",
                color: "#f1f5f9",
                textTransform: "uppercase",
              }}
            >
              DOS2A
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "#475569",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                letterSpacing: "0.06em",
              }}
            >
              {t("footer", "tagline")}
            </div>
          </div>
        </a>

        {/* Nav links — desktop */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
          className="hidden lg:flex"
        >
          {(
            [
              ["#servicios", t("nav", "services")],
              ["#montajes", t("nav", "portfolio")],
              ["#proceso", t("nav", "process")],
              ["#cotiza", t("nav", "contact")],
              ["/chat", "Chat IA"],
            ] as [string, string][]
          ).map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#94a3b8",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#f1f5f9")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#94a3b8")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            style={{
              padding: "5px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              color: "#94a3b8",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/dos2a/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "none",
              padding: "5px 14px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              color: "#94a3b8",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
            className="md:inline-block"
          >
            Instagram
          </a>

          {/* Quote CTA */}
          <a
            href="#cotiza"
            style={{
              padding: "8px 20px",
              background: "#d4af37",
              color: "#080a0e",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.04em",
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {t("nav", "contact")}
          </a>
        </div>
      </div>
    </header>
  );
}
