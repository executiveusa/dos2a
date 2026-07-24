"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Send, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { submitLead, type LeadFormData } from "@/lib/api";
import { useLanguage } from "@/lib/language";

const initial: LeadFormData = { name:"", email:"", eventType:"", date:"", location:"", guests:"", needs:"" };

export default function QuoteForm() {
  const { lang } = useLanguage();
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [fallback, setFallback] = useState<string | null>(null);
  const change = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(v => ({...v,[e.target.name]:e.target.value}));

  async function submit(e: FormEvent) {
    e.preventDefault(); setState("sending"); setFallback(null);
    const result = await submitLead(form);
    if (result.success) { setState("success"); return; }
    setFallback(result.mailtoUrl ?? null); setState("error");
  }

  if (state === "success") return <div className="form-state form-state--success"><CheckCircle2/><h2>{lang === "es" ? "Recibimos tu solicitud." : "We received your request."}</h2><p>{lang === "es" ? "Guardamos la información de tu evento. El siguiente paso es revisarla y contactarte para definir el alcance." : "Your event information was saved. The next step is to review it and contact you to define the scope."}</p></div>;

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="field-grid">
        <label><span>{lang === "es" ? "Nombre" : "Name"}</span><input name="name" required value={form.name} onChange={change} autoComplete="name"/></label>
        <label><span>{lang === "es" ? "Correo" : "Email"}</span><input name="email" type="email" required value={form.email} onChange={change} autoComplete="email"/></label>
      </div>
      <label><span>{lang === "es" ? "Tipo de evento" : "Event type"}</span><select name="eventType" required value={form.eventType} onChange={change}><option value="">{lang === "es" ? "Selecciona una opción" : "Choose an option"}</option><option>{lang === "es" ? "Corporativo / congreso" : "Corporate / conference"}</option><option>{lang === "es" ? "Lanzamiento / activación" : "Launch / activation"}</option><option>{lang === "es" ? "Stand / exposición" : "Stand / exhibition"}</option><option>{lang === "es" ? "Escenario / experiencia en vivo" : "Stage / live experience"}</option><option>{lang === "es" ? "Otro" : "Other"}</option></select></label>
      <div className="field-grid">
        <label><span>{lang === "es" ? "Fecha o fecha aproximada" : "Date or approximate date"}</span><input name="date" type="date" value={form.date} onChange={change}/></label>
        <label><span>{lang === "es" ? "Ciudad / lugar" : "City / venue"}</span><input name="location" value={form.location} onChange={change}/></label>
      </div>
      <label><span>{lang === "es" ? "Asistentes aproximados" : "Approximate guests"}</span><input name="guests" inputMode="numeric" value={form.guests} onChange={change}/></label>
      <label><span>{lang === "es" ? "¿Qué quieres lograr o qué necesitas?" : "What do you need to accomplish?"}</span><textarea name="needs" rows={6} required minLength={10} value={form.needs} onChange={change} placeholder={lang === "es" ? "Cuéntanos la idea con tus propias palabras. No necesitas saber términos técnicos." : "Describe the idea in your own words. You do not need technical terms."}/></label>
      {state === "error" && <div className="form-error"><AlertCircle size={18}/><div><strong>{lang === "es" ? "No pudimos guardar la solicitud en línea." : "We could not save the request online."}</strong><p>{lang === "es" ? "No te mostraremos un éxito falso. Puedes intentar de nuevo o abrir un correo con la información preparada." : "We will not show a false success. Try again or open an email with the information prepared."}</p>{fallback && <a className="button button--outline" href={fallback}><Mail size={17}/>{lang === "es" ? "Enviar por correo" : "Send by email"}</a>}</div></div>}
      <button className="button button--light button--wide" disabled={state === "sending"} type="submit"><Send size={17}/>{state === "sending" ? (lang === "es" ? "Enviando…" : "Sending…") : (lang === "es" ? "Enviar mi solicitud" : "Send my request")}</button>
      <p className="form-note">{lang === "es" ? "Tu solicitud solo se confirma cuando el sistema logra guardarla. Abrir un correo no cuenta como envío exitoso." : "Your request is confirmed only when the system saves it. Opening an email is not counted as a successful submission."}</p>
    </form>
  );
}