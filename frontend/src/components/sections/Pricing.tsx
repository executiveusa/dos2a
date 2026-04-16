"use client";

import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";

export default function Pricing() {
  const { lang } = useLanguage();
  const p = translations.packages;

  return (
    <section
      id="paquetes"
      style={{
        background: "#05060a",
        padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              fontSize: "0.7rem",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#d4af37",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 24, height: 1, background: "#d4af37", display: "inline-block" }} />
            {p.kicker[lang]}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              color: "#f1f5f9",
              whiteSpace: "pre-line",
              maxWidth: "14ch",
            }}
          >
            {p.title[lang]}
          </h2>
          <p
            style={{
              marginTop: 16,
              maxWidth: 500,
              fontSize: "0.95rem",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            {p.intro[lang]}
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {p.items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                background: item.featured ? "#0f1219" : "#080a0e",
                border: `1px solid ${item.featured ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 12,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Featured label */}
              {item.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    right: 20,
                    background: "#d4af37",
                    color: "#080a0e",
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  {p.featured_label[lang]}
                </div>
              )}

              {/* Label chip */}
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 5,
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 600,
                  color: "#64748b",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  width: "fit-content",
                }}
              >
                {item.label[lang]}
              </span>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "#f1f5f9",
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}
                >
                  {item.title[lang]}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    color: "#64748b",
                    lineHeight: 1.65,
                  }}
                >
                  {item.copy[lang]}
                </p>
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {item.bullets[lang].map((b, bi) => (
                  <li
                    key={bi}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      color: "#94a3b8",
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "rgba(56,189,248,0.1)",
                        border: "1px solid rgba(56,189,248,0.25)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#cotiza"
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "11px 22px",
                  background: item.featured ? "#d4af37" : "transparent",
                  color: item.featured ? "#080a0e" : "#94a3b8",
                  fontFamily: "var(--font-sora), Sora, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  letterSpacing: "0.03em",
                  borderRadius: 7,
                  border: item.featured ? "none" : "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {p.cta[lang]}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
