"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/lib/language";
import { siteContent } from "@/lib/site-content";

export default function CinematicJourney() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observers = refs.current.map((node, index) => {
      if (!node) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(index);
      }, { rootMargin: "-38% 0px -38% 0px", threshold: 0 });
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach(observer => observer?.disconnect());
  }, []);

  return (
    <section className="cinematic" aria-label={lang === "es" ? "Recorrido por capacidades y proyectos" : "Capabilities and project journey"}>
      <div className="cinematic__media" aria-hidden="true">
        {siteContent.journey.map((scene, index) => (
          <div key={scene.id} className={`cinematic__frame ${index === active ? "is-active" : ""}`}>
            <img src={scene.image} alt="" style={{ "--desktop-position": scene.position, "--mobile-position": scene.mobilePosition } as CSSProperties}/>
            <div className="cinematic__shade"/>
          </div>
        ))}
        <div className="cinematic__counter"><span>{String(active + 1).padStart(2,"0")}</span><i/><span>{String(siteContent.journey.length).padStart(2,"0")}</span></div>
      </div>
      <div className="cinematic__steps">
        {siteContent.journey.map((scene, index) => (
          <article key={scene.id} ref={el => { refs.current[index] = el; }} className="cinematic__step">
            <div className="cinematic__mobile-proof"><img src={scene.image} alt={scene.alt[lang]} loading={index < 2 ? "eager" : "lazy"} style={{ "--mobile-position": scene.mobilePosition } as CSSProperties}/></div>
            <div className="cinematic__copy">
              <p className="eyebrow">{scene.eyebrow[lang]}</p>
              <h2>{scene.title[lang]}</h2>
              <p>{scene.body[lang]}</p>
              <span className="proof-label">{lang === "es" ? "Proyecto real · archivo dos A" : "Real project · dos A archive"}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
