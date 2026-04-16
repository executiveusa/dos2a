"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const { lang } = useLanguage();
  const f = translations.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        background: "#05060a",
        padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
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
            {f.kicker[lang]}
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
            }}
          >
            {f.title[lang]}
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {f.items.map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "24px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: open === i ? "#f1f5f9" : "#94a3b8",
                    lineHeight: 1.4,
                    transition: "color 0.15s",
                  }}
                >
                  {item.q[lang]}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    color: open === i ? "#d4af37" : "#475569",
                    transition: "color 0.15s",
                  }}
                >
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              {open === i && (
                <div
                  style={{
                    paddingBottom: 24,
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a[lang]}
                </div>
              )}
            </div>
          ))}
          {/* Last border */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
        </div>
      </div>
    </section>
  );
}
