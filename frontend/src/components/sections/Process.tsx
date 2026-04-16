"use client";

import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";

export default function Process() {
  const { lang } = useLanguage();
  const pr = translations.process;

  return (
    <section
      id="proceso"
      style={{
        background: "#080a0e",
        padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
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
            {pr.kicker[lang]}
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
            {pr.title[lang]}
          </h2>
          <p
            style={{
              marginTop: 16,
              maxWidth: 460,
              fontSize: "0.95rem",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            {pr.intro[lang]}
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Connector line — desktop only */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 21,
              left: "calc(2% + 20px)",
              right: "calc(2% + 20px)",
              height: 1,
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />

          {pr.steps.map((step, i) => (
            <div
              key={i}
              style={{
                padding: "0 24px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Step number */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.3)",
                    background: "rgba(212,175,55,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#d4af37",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#f1f5f9",
                    marginBottom: 8,
                  }}
                >
                  {step.title[lang]}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    color: "#64748b",
                    lineHeight: 1.65,
                  }}
                >
                  {step.copy[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
