"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import { submitLead, type LeadFormData } from "@/lib/api";
import { Mic, MicOff, Send, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { lang } = useLanguage();
  const c = translations.contact;

  const [form, setForm] = useState<LeadFormData>({
    name: "",
    email: "",
    eventType: "",
    date: "",
    location: "",
    guests: "",
    needs: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    background: "#0a0c11",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    color: "#f1f5f9",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    marginBottom: 6,
    fontSize: "0.75rem",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontWeight: 600,
    color: "#64748b",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitLead(form);
    setStatus(result.success ? "success" : "error");
  };

  const toggleVoice = () => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition: SpeechRecognitionInstance = new SR();
    recognition.lang = lang === "es" ? "es-MX" : "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setForm((prev) => ({
        ...prev,
        needs: event.results[0][0].transcript,
      }));
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  if (status === "success") {
    return (
      <section id="cotiza" style={{ background: "#080a0e", padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div
          style={{
            maxWidth: 500,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <CheckCircle size={40} color="#d4af37" />
          <p style={{ fontSize: "1.1rem", fontFamily: "var(--font-sora), Sora, sans-serif", fontWeight: 700, color: "#f1f5f9" }}>
            {c.success[lang]}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cotiza"
      style={{
        background: "#080a0e",
        padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Left: Copy */}
        <div>
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
            {c.kicker[lang]}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              color: "#f1f5f9",
              whiteSpace: "pre-line",
              marginBottom: 20,
            }}
          >
            {c.title[lang]}
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: 400,
              marginBottom: 36,
            }}
          >
            {c.sub[lang]}
          </p>

          {/* Info lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              [c.email_info[lang], "2audioiluminacion@gmail.com"],
              [c.coverage_info[lang], c.coverage_val[lang]],
              [c.focus_info[lang], c.focus_val[lang]],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontWeight: 600,
                    color: "#475569",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    color: "#94a3b8",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Voice prompt */}
          <div style={{ marginTop: 40 }}>
            <button
              onClick={toggleVoice}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                background: "transparent",
                border: `1px solid ${listening ? "#38bdf8" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 8,
                color: listening ? "#38bdf8" : "#64748b",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
            >
              {listening ? <MicOff size={15} /> : <Mic size={15} />}
              {c.voice_prompt[lang]}
            </button>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Name + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label htmlFor="name" style={labelStyle}>{c.name_label[lang]}</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={c.name_ph[lang]}
                required
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="email" style={labelStyle}>{c.email_label[lang]}</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={c.email_ph[lang]}
                required
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Event type */}
          <div>
            <label htmlFor="eventType" style={labelStyle}>{c.event_type_label[lang]}</label>
            <select
              id="eventType"
              name="eventType"
              required
              value={form.eventType}
              onChange={handleChange}
              style={{ ...inputStyle, cursor: "pointer", appearance: "none" as const }}
            >
              <option value="" disabled>{c.event_type_ph[lang]}</option>
              {c.event_types[lang].map((et) => (
                <option key={et} value={et}>{et}</option>
              ))}
            </select>
          </div>

          {/* Date + Location */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label htmlFor="date" style={labelStyle}>{c.date_label[lang]}</label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                style={{ ...inputStyle, colorScheme: "dark" }}
              />
            </div>
            <div>
              <label htmlFor="location" style={labelStyle}>{c.location_label[lang]}</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder={c.location_ph[lang]}
                value={form.location}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="guests" style={labelStyle}>{c.guests_label[lang]}</label>
            <input
              id="guests"
              name="guests"
              type="text"
              placeholder={c.guests_ph[lang]}
              value={form.guests}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Needs */}
          <div>
            <label htmlFor="needs" style={labelStyle}>{c.needs_label[lang]}</label>
            <textarea
              id="contact-form-needs"
              name="needs"
              placeholder={c.needs_ph[lang]}
              rows={4}
              value={form.needs}
              onChange={handleChange}
              style={{ ...inputStyle, resize: "vertical", minHeight: 96 }}
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                background: "rgba(225,29,72,0.08)",
                border: "1px solid rgba(225,29,72,0.2)",
                borderRadius: 8,
                color: "#e11d48",
                fontSize: "0.8rem",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              <AlertCircle size={14} />
              {c.error[lang]}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 28px",
              background: "#d4af37",
              color: "#080a0e",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              borderRadius: 7,
              border: "none",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
            }}
          >
            {status === "loading" ? (
              c.sending[lang]
            ) : (
              <>
                <Send size={15} />
                {c.submit[lang]}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Mobile fallback: stacked layout */}
      <style>{`
        @media (max-width: 768px) {
          #cotiza > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
