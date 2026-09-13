"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Send, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { submitLead, type LeadFormData } from "@/lib/api";
import { useLanguage } from "@/lib/language";
import LegalDisclosure from "./LegalDisclosure";

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
    if (result.success) {
      setState("success");
      toast.success(lang === "es" ? "Solicitud recibida. Te responderemos a la brevedad." : "Request received. We will get back to you shortly.");
      return;
    }
    setFallback(result.mailtoUrl ?? null);
    setState("error");
    toast.error(lang === "es" ? "No se pudo enviar la solicitud en línea." : "Could not submit online.");
  }

  if (state === "success") return <div className="form-state form-state--success"><CheckCircle2/><h2>{lang === "es" ? "Recibimos tu solicitud." : "We received your request."}</h2><p>{lang === "es" ? "Guardamos la información de tu evento. El siguiente paso es revisarla y contactarte para definir el alcance." : "Your event information was saved. The next step is to review it and contact you to define the scope."}</p></div>;

  return (
    <form className="quote-form" onSubmit={submit}>
      <p className="text-xs text-[var(--muted)] leading-relaxed m-0 border-b border-[var(--line)] pb-3">
        {lang === "es"
          ? "Todos los campos son obligatorios. Contestar cada dato nos ayuda a entender mejor tu evento para brindarte una atención precisa y agilizar tu cotización."
          : "All fields are required. Answering each detail helps us better understand your event to provide accurate attention and expedite your quote."}
      </p>
      <div className="field-grid">
        <label>
          <span>{lang === "es" ? "Nombre completo" : "Full name"}</span>
          <input name="name" required value={form.name} onChange={change} autoComplete="name"/>
        </label>
        <label>
          <span>{lang === "es" ? "Correo electrónico" : "Email address"}</span>
          <input name="email" type="email" required value={form.email} onChange={change} autoComplete="email"/>
        </label>
      </div>
      <label>
        <span>{lang === "es" ? "Tipo de evento" : "Event type"}</span>
        <select name="eventType" required value={form.eventType} onChange={change}>
          <option value="">{lang === "es" ? "Selecciona una opción" : "Choose an option"}</option>
          <option>{lang === "es" ? "Corporativo / congreso" : "Corporate / conference"}</option>
          <option>{lang === "es" ? "Lanzamiento / activación" : "Launch / activation"}</option>
          <option>{lang === "es" ? "Stand / exposición" : "Stand / exhibition"}</option>
          <option>{lang === "es" ? "Escenario / experiencia en vivo" : "Stage / live experience"}</option>
          <option>{lang === "es" ? "Otro" : "Other"}</option>
        </select>
      </label>
      <div className="field-grid">
        <label>
          <span>{lang === "es" ? "Fecha estimada del evento" : "Estimated event date"}</span>
          <input name="date" type="date" required lang="es-MX" value={form.date} onChange={change}/>
        </label>
        <label>
          <span>{lang === "es" ? "Ubicación / Ciudad / Recinto" : "Location / City / Venue"}</span>
          <input name="location" required value={form.location} onChange={change}/>
        </label>
      </div>
      <label>
        <span>{lang === "es" ? "Asistentes o aforo aproximado" : "Approximate attendees or capacity"}</span>
        <input name="guests" required inputMode="numeric" value={form.guests} onChange={change}/>
      </label>
      <label>
        <span>{lang === "es" ? "Detalles o idea del evento" : "Event details or concept"}</span>
        <textarea
          name="needs"
          rows={5}
          required
          minLength={10}
          value={form.needs}
          onChange={change}
          placeholder={lang === "es" ? "Cuéntanos qué necesitas lograr con tus propias palabras" : "Tell us what you need to achieve in your own words"}
        />
      </label>
      {state === "error" && (
        <div className="form-error">
          <AlertCircle size={18}/>
          <div>
            <strong>{lang === "es" ? "No pudimos guardar la solicitud en línea." : "We could not save the request online."}</strong>
            <p>{lang === "es" ? "No te mostraremos un éxito falso. Puedes intentar de nuevo o abrir un correo con la información preparada." : "We will not show a false success. Try again or open an email with the information prepared."}</p>
            {fallback && <a className="button button--outline" href={fallback}><Mail size={17}/>{lang === "es" ? "Enviar por correo" : "Send by email"}</a>}
          </div>
        </div>
      )}
      <p className="form-note">
        {lang === "es" ? "Antes de enviar, consulta nuestra " : "Before sending, review our "}
        <LegalDisclosure kind="privacy" variant="inline" />
        {lang === "es" ? ". No incluyas datos personales sensibles en la descripción." : ". Please do not include sensitive personal data in the description."}
      </p>
      <button className="button button--light button--wide" disabled={state === "sending"} type="submit">
        <Send size={17}/>
        {state === "sending" ? (lang === "es" ? "Enviando…" : "Sending…") : (lang === "es" ? "Enviar mi solicitud" : "Send my request")}
      </button>
      <p className="form-note">
        {lang === "es"
          ? "Tu solicitud solo se confirma cuando el sistema logra guardarla. Abrir un correo no cuenta como envío exitoso."
          : "Your request is confirmed only when the system saves it. Opening an email is not counted as a successful submission."}
      </p>
    </form>
  );
}
