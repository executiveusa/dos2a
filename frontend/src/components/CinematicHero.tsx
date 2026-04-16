"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";
import { ArrowDown, Mic, MicOff } from "lucide-react";

// Cinematic intro states
type IntroState = "logo" | "tagline" | "ready" | "entered";

export default function CinematicHero() {
  const { lang, t } = useLanguage();
  const [introState, setIntroState] = useState<IntroState>("logo");
  const [listening, setListening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const h = translations.hero;

  // Cinematic intro sequence (CSS class-based, no GSAP dep needed at load time)
  useEffect(() => {
    const t1 = setTimeout(() => setIntroState("tagline"), 800);
    const t2 = setTimeout(() => setIntroState("ready"), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // GSAP lazy load after entering
  useEffect(() => {
    if (introState !== "entered") return;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        // Animate hero content on enter
        gsap.fromTo(
          "#hero-content > *",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          }
        );
      });
    });
  }, [introState]);

  // Voice recognition (Web Speech API)
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
      const transcript = event.results[0][0].transcript;
      // Scroll to contact form and pre-fill needs field
      const el = document.getElementById("contact-form-needs") as HTMLTextAreaElement | null;
      if (el) {
        el.value = transcript;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
      document.getElementById("cotiza")?.scrollIntoView({ behavior: "smooth" });
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  if (introState === "logo" || introState === "tagline") {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060a]"
        style={{ transition: "opacity 0.6s" }}
      >
        {/* Stage scan lines — subtle texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.8) 1px, rgba(255,255,255,0.8) 2px)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Amber stage wash — left */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: 0,
            left: "8%",
            width: "18%",
            height: "65%",
            background:
              "linear-gradient(to bottom, rgba(212,175,55,0.28), transparent)",
            clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
            filter: "blur(3px)",
            transform: "rotate(-8deg)",
            transformOrigin: "top center",
          }}
        />
        {/* Sky stage wash — right */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: 0,
            right: "8%",
            width: "18%",
            height: "65%",
            background:
              "linear-gradient(to bottom, rgba(56,189,248,0.22), transparent)",
            clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
            filter: "blur(3px)",
            transform: "rotate(8deg)",
            transformOrigin: "top center",
          }}
        />

        {/* Logo */}
        <div
          ref={logoRef}
          style={{
            opacity: introState === "logo" ? 0 : 1,
            transform: introState === "logo" ? "scale(0.92)" : "scale(1)",
            transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: "clamp(4rem, 12vw, 8rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "#f1f5f9",
              lineHeight: 1,
            }}
          >
            DOS2A
          </div>
          <div
            style={{
              height: 3,
              background: "#d4af37",
              marginTop: 8,
              width: "100%",
              opacity: introState === "logo" ? 0 : 1,
              transform: introState === "logo" ? "scaleX(0)" : "scaleX(1)",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s, opacity 0.3s 0.4s",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          style={{
            marginTop: 20,
            opacity: introState === "tagline" ? 1 : 0,
            transform: introState === "tagline" ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(0.75rem, 1.8vw, 1rem)",
            color: "#64748b",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {h.badge[lang]}
        </div>
      </div>
    );
  }

  // "ready" state — show enter button over the full hero
  if (introState === "ready") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center pb-16"
        style={{
          backgroundImage: "url('/images/hero-stage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(5,6,10,0.72)" }} />

        {/* Logo mark in center */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transform: "translate(-50%, -60%)", textAlign: "center" }}
        >
          <div
            style={{
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "#f1f5f9",
              lineHeight: 1,
            }}
          >
            DOS2A
          </div>
          <div
            style={{
              height: 2,
              background: "#d4af37",
              marginTop: 6,
            }}
          />
          <p
            style={{
              marginTop: 12,
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "clamp(0.7rem, 1.5vw, 0.875rem)",
              color: "#64748b",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {h.badge[lang]}
          </p>
        </div>

        {/* Enter button */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <button
            onClick={() => setIntroState("entered")}
            style={{
              padding: "14px 48px",
              background: "#d4af37",
              color: "#080a0e",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: 7,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
            }}
          >
            {h.enter[lang]}
          </button>
          <p
            style={{
              color: "#475569",
              fontSize: "0.75rem",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            ↓ {h.cta_secondary[lang]}
          </p>
        </div>
      </div>
    );
  }

  // Main hero — full experience
  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundImage: "url('/images/hero-stage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay — dark, cinematic. No gradients. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5,6,10,0.65)",
        }}
      />

      {/* Stage light accents */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "6%",
          width: "20%",
          height: "60%",
          background: "linear-gradient(to bottom, rgba(212,175,55,0.18), transparent)",
          clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
          filter: "blur(4px)",
          transform: "rotate(-9deg)",
          transformOrigin: "top center",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: "6%",
          width: "20%",
          height: "60%",
          background: "linear-gradient(to bottom, rgba(56,189,248,0.14), transparent)",
          clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
          filter: "blur(4px)",
          transform: "rotate(9deg)",
          transformOrigin: "top center",
        }}
      />

      {/* Content */}
      <div
        id="hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 24px 80px",
        }}
      >
        {/* Badge row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            fontSize: "0.7rem",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            color: "#64748b",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 1,
              background: "#d4af37",
            }}
          />
          {h.badge[lang]}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-sora), Sora, sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.055em",
            color: "#f1f5f9",
            maxWidth: "11ch",
          }}
        >
          {h.headline1[lang]}{" "}
          <span style={{ color: "#d4af37" }}>{h.headline2[lang]}</span>{" "}
          {h.headline3[lang]}
        </h1>

        {/* Sub */}
        <p
          style={{
            marginTop: 20,
            maxWidth: 520,
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            color: "#94a3b8",
            lineHeight: 1.7,
          }}
        >
          {h.sub[lang]}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 32,
          }}
        >
          <a
            href="#cotiza"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "#d4af37",
              color: "#080a0e",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {h.cta_primary[lang]}
          </a>
          <a
            href="#montajes"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "transparent",
              color: "#f1f5f9",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              borderRadius: 7,
              border: "1px solid rgba(255,255,255,0.14)",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {h.cta_secondary[lang]}
          </a>
          {/* Voice CTA */}
          <button
            onClick={toggleVoice}
            title={h.enter[lang]}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              background: "transparent",
              border: `1px solid ${listening ? "#38bdf8" : "rgba(255,255,255,0.12)"}`,
              borderRadius: 7,
              cursor: "pointer",
              color: listening ? "#38bdf8" : "#94a3b8",
            }}
          >
            {listening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        </div>

        {/* Info badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 28,
          }}
        >
          {[h.badge_response[lang], h.badge_ops[lang], h.badge_zone[lang]].map((label) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "6px 14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                fontSize: "0.75rem",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "#94a3b8",
                letterSpacing: "0.02em",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#d4af37",
                  flexShrink: 0,
                }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          color: "#475569",
          fontSize: "0.65rem",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <ArrowDown size={14} />
        {lang === "es" ? "Desliza" : "Scroll"}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(5px); }
        }
      `}</style>
    </section>
  );
}
