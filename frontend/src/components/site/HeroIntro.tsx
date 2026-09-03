"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import styles from "./HeroIntro.module.css";

const SESSION_KEY = "dos2a:hero-intro:v1";

type Phase = "hidden" | "image1" | "image2" | "image3" | "video" | "signature" | "black" | "exit";

const timeline: Array<{ phase: Phase; at: number }> = [
  { phase: "image1", at: 0 },
  { phase: "image2", at: 1250 },
  { phase: "image3", at: 2500 },
  { phase: "video", at: 3750 },
  { phase: "signature", at: 5050 },
  { phase: "black", at: 8450 },
  { phase: "exit", at: 9050 },
  { phase: "hidden", at: 9850 },
];

export default function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasPlayed = false;

    try {
      hasPlayed = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      hasPlayed = false;
    }

    if (reducedMotion || hasPlayed) return;

    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // The intro remains non-critical when storage is unavailable.
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers = timeline.map(({ phase: nextPhase, at }) =>
      window.setTimeout(() => setPhase(nextPhase), at),
    );

    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (phase !== "hidden") return;
    document.body.style.overflow = "";
  }, [phase]);

  if (phase === "hidden") return null;

  const mediaVisible = phase === "image1" || phase === "image2" || phase === "image3" || phase === "video";

  return (
    <div
      className={`${styles.intro} ${phase === "exit" ? styles.exiting : ""}`}
      aria-hidden="true"
    >
      <div className={`${styles.media} ${mediaVisible ? styles.mediaVisible : styles.mediaDimmed}`}>
        <img
          className={`${styles.frame} ${styles.frameOne} ${phase === "image1" ? styles.active : ""}`}
          src="/images/hero/dosa-hero-loreal-1920w.webp"
          alt=""
          decoding="async"
          fetchPriority="high"
        />
        <img
          className={`${styles.frame} ${styles.frameTwo} ${phase === "image2" ? styles.active : ""}`}
          src="/images/projects/led-sculpture-1181w.webp"
          alt=""
          decoding="async"
        />
        <img
          className={`${styles.frame} ${styles.frameThree} ${phase === "image3" ? styles.active : ""}`}
          src="/images/projects/mobil-hologram-1920w.webp"
          alt=""
          decoding="async"
        />
        <video
          className={`${styles.frame} ${styles.video} ${phase === "video" ? styles.active : ""}`}
          src="/videos/mobil-reveal-loop.mp4"
          muted
          autoPlay
          playsInline
          preload="metadata"
        />
        <div className={styles.scrim} />
      </div>

      <div className={`${styles.signatureStage} ${phase === "signature" ? styles.signatureActive : ""}`}>
        <BrandMark className={styles.signature} />
      </div>

      <div className={`${styles.blackout} ${phase === "black" || phase === "exit" ? styles.blackoutActive : ""}`} />
    </div>
  );
}
