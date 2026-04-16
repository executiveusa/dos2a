"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Lang, type TranslationKey, translations } from "./translations";

type T = (section: TranslationKey, key: string, subKey?: string) => string;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  setLang: () => {},
  t: () => "",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = localStorage.getItem("dos2a-lang") as Lang | null;
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("dos2a-lang", l);
  };

  // Flexible translation accessor:
  // t("hero", "headline1") → string
  // t("services", "items", 0.title) — handled by callers using the raw translations object
  const t: T = (section, key, subKey) => {
    const sec = (translations as Record<string, unknown>)[section] as Record<string, unknown> | undefined;
    if (!sec) return key;
    const entry = sec[key] as Record<string, string> | undefined;
    if (!entry) return key;
    return entry[lang] ?? entry["es"] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
