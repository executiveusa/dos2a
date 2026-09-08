"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import styles from "./HeroIntro.module.css";

const SESSION_KEY = "dos2a:hero-intro:v3";
const EXIT_AT = 2300;
const END_AT = 3200;

type Phase = "hidden" | "signature" | "exit";

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
      // Storage is a progressive enhancement; the opening remains functional without it.
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.heroIntro = "active";
    setPhase("signature");

    const exitTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.dataset.heroIntro = "exiting";
      setPhase("exit");
    }, EXIT_AT);

    const endTimer = window.setTimeout(() => {
      delete document.documentElement.dataset.heroIntro;
      setPhase("hidden");
    }, END_AT);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(endTimer);
      delete document.documentElement.dataset.heroIntro;
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`${styles.intro} ${phase === "exit" ? styles.exiting : ""}`}
      aria-hidden="true"
    >
      <div className={`${styles.signatureStage} ${styles.signatureActive}`}>
        <BrandMark className={styles.signature} />
      </div>
    </div>
  );
}
