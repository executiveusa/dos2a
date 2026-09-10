"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Lang, type TranslationKey, translations } from "./translations";

type T = (section: TranslationKey, key: string, subKey?: string) => string;
interface LanguageContextValue { lang: Lang; setLang: (l: Lang) => void; t: T; }
const LanguageContext = createContext<LanguageContextValue>({lang:"es",setLang:()=>{},t:()=>""});

export function LanguageProvider({children}:{children:ReactNode}){
  const [lang,setLangState]=useState<Lang>("es");
  useEffect(()=>{
    let stored: Lang|null = null;
    try {
      stored=(localStorage.getItem("dosa-lang") ?? localStorage.getItem("dos2a-lang")) as Lang|null;
    } catch {
      stored = null;
    }
    if(stored==="es"||stored==="en"){setLangState(stored);document.documentElement.lang=stored;}
  },[]);
  const setLang=(l:Lang)=>{
    setLangState(l);
    try { localStorage.setItem("dosa-lang",l); } catch { /* Storage is optional. */ }
    document.documentElement.lang=l;
  };
  const t:T=(section,key)=>{const sec=(translations as Record<string,unknown>)[section] as Record<string,unknown>|undefined;if(!sec)return key;const entry=sec[key] as Record<string,string>|undefined;if(!entry)return key;return entry[lang]??entry.es??key;};
  return <LanguageContext.Provider value={{lang,setLang,t}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){return useContext(LanguageContext);}
