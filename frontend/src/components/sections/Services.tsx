"use client";

import type { ReactElement } from "react";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";

const icons: Record<number, ReactElement> = {
  0: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 18.75a6 6 0 0 1 6-6h3M15 18.75a6 6 0 0 0-6-6H6" />
      <circle cx="12" cy="6" r="3" />
      <path d="M4 20.25v-1.5A3.75 3.75 0 0 1 7.75 15" />
      <path d="M20 20.25v-1.5A3.75 3.75 0 0 0 16.25 15" />
    </svg>
  ),
  1: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  2: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  3: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
};

export default function Services() {
  const { lang } = useLanguage();
  const s = translations.services;

  return (
    <section
      id="servicios"
      style={{
        background: "#080a0e",
        padding: "100px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 60 }}>
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
            {s.kicker[lang]}
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
            {s.title[lang]}
          </h2>
          <p
            style={{
              marginTop: 16,
              maxWidth: 480,
              fontSize: "0.95rem",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            {s.intro[lang]}
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {s.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#0a0c11",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  borderRadius: 10,
                  color: "#d4af37",
                  flexShrink: 0,
                }}
              >
                {icons[i]}
              </div>

              {/* Title */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    letterSpacing: "-0.02em",
                    color: "#f1f5f9",
                    marginBottom: 8,
                  }}
                >
                  {item.title[lang]}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    color: "#64748b",
                    lineHeight: 1.65,
                  }}
                >
                  {item.copy[lang]}
                </p>
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {item.bullets[lang].map((bullet, bi) => (
                  <li
                    key={bi}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      color: "#94a3b8",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#38bdf8",
                        marginTop: 5,
                        flexShrink: 0,
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
