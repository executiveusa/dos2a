"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import styles from "./LegalDisclosure.module.css";

type LegalKind = "privacy" | "terms";
type LegalVariant = "footer" | "inline";

const CONTACT_EMAIL = "2audioiluminacion@gmail.com";

function PrivacyContent() {
  return (
    <>
      <p className={styles.updated}>Última actualización: 2 de septiembre de 2026.</p>
      <p><strong>DOS A / 2 Audio Iluminación</strong>, con operación y domicilio de contacto publicado en Ciudad de México, México, es responsable del tratamiento de los datos personales recabados a través de este sitio. Para asuntos de privacidad y ejercicio de derechos, el medio de contacto es <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

      <h3>1. Datos que recabamos</h3>
      <p>El formulario de cotización puede recabar nombre, correo electrónico, tipo y fecha de evento, ciudad o lugar, número aproximado de asistentes y la descripción de necesidades del proyecto. El sitio también puede generar identificadores técnicos de sesión y datos estrictamente necesarios para seguridad, prevención de duplicados y operación del servicio. No solicitamos datos personales sensibles; te pedimos no incluirlos en campos abiertos.</p>

      <h3>2. Finalidades</h3>
      <p>Usamos los datos para atender solicitudes, preparar y dar seguimiento a cotizaciones, dimensionar necesidades técnicas, comunicarnos sobre el proyecto, prevenir fraude o abuso, mantener evidencia operativa de la solicitud y, cuando exista contratación, administrar la relación comercial y cumplir obligaciones legales, fiscales, contables o de defensa de derechos. No utilizamos una solicitud de cotización para publicidad o prospección ajena a esa relación sin una base legal o consentimiento aplicable.</p>

      <h3>3. Encargados, transferencias y almacenamiento</h3>
      <p>Podemos apoyarnos en proveedores tecnológicos que actúan como encargados para alojamiento, base de datos, correo, seguridad y operación del sitio, bajo instrucciones de DOS A y únicamente para las finalidades descritas. Los datos podrán comunicarse a autoridades competentes cuando exista obligación legal, orden fundada o sea necesario para ejercer o defender derechos. Si en el futuro se realiza una transferencia que requiera consentimiento, se informará y obtendrá conforme a la ley antes de efectuarla.</p>

      <h3>4. Derechos ARCO y limitación de uso</h3>
      <p>Puedes solicitar acceso, rectificación, cancelación u oposición (derechos ARCO), así como limitar el uso o divulgación de tus datos, enviando una solicitud a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Incluye tu nombre, un medio para responderte, el derecho que deseas ejercer, una descripción clara de los datos involucrados y, cuando sea necesario, documentos que acrediten identidad o representación. Atenderemos la solicitud dentro de los plazos y condiciones previstos por la legislación mexicana aplicable.</p>

      <h3>5. Conservación y seguridad</h3>
      <p>Conservamos los datos sólo durante el tiempo razonablemente necesario para las finalidades informadas y los plazos de prescripción, obligaciones fiscales, contractuales o de defensa que resulten aplicables. Aplicamos medidas administrativas, técnicas y físicas razonables para reducir riesgos de pérdida, alteración, acceso, uso o tratamiento no autorizado. Ningún sistema conectado a internet puede garantizar riesgo cero.</p>

      <h3>6. Tecnologías del sitio</h3>
      <p>El sitio puede utilizar almacenamiento local o de sesión estrictamente técnico para recordar estados de interfaz, evitar envíos duplicados y operar funciones del sitio. Actualmente no se declara el uso de estas tecnologías con fines de publicidad comportamental. Si se incorporan analítica, publicidad o tecnologías con finalidades adicionales que requieran información o consentimiento, este aviso y los controles correspondientes deberán actualizarse antes de su uso.</p>

      <h3>7. Cambios al aviso</h3>
      <p>Las modificaciones relevantes se comunicarán mediante este mismo aviso en el sitio, indicando la fecha de actualización. Cuando una modificación requiera nuevo consentimiento conforme a la ley, se solicitará antes de aplicar el nuevo tratamiento.</p>

      <h3>8. Marco aplicable</h3>
      <p>Este aviso se interpreta conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares vigente en México y demás disposiciones aplicables. El ejercicio de derechos ante DOS A no limita los derechos que correspondan a la persona titular frente a la autoridad competente.</p>

      <p className={styles.factNote}><strong>Nota de identificación:</strong> el nombre o razón social fiscal y el domicilio contractual completo del prestador se identificarán en la cotización o contrato emitido para cada proyecto. Este aviso no sustituye esos datos contractuales.</p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <p className={styles.updated}>Última actualización: 2 de septiembre de 2026.</p>
      <p>Estos términos regulan el uso del sitio de <strong>DOS A / 2 Audio Iluminación</strong> y el envío de solicitudes de cotización para servicios de producción audiovisual, audio, iluminación, video, pantallas, escenarios, stands, operación, coordinación y servicios relacionados en México.</p>

      <h3>1. Sitio informativo y solicitudes de cotización</h3>
      <p>La información del sitio es general. Enviar un formulario, correo o mensaje no crea por sí mismo un contrato, reserva, obligación de disponibilidad ni aceptación definitiva de precio. Una relación de servicios se perfecciona únicamente cuando DOS A y el cliente aceptan por un medio verificable la cotización, orden de servicio, contrato o documento equivalente que establezca alcance, precio, impuestos, fechas, anticipos, responsabilidades y demás condiciones aplicables.</p>

      <h3>2. Cotizaciones, precios y alcance</h3>
      <p>Los precios, disponibilidad de equipo, personal, montaje, transporte, viáticos, horarios, pruebas, horas extra, permisos, energía, rigging, internet, seguridad, seguros y servicios de terceros dependen de las características reales del evento y se definen en la propuesta aplicable. Salvo que la cotización indique otra cosa, cualquier cambio de fecha, sede, aforo, horario, alcance técnico o requerimientos puede requerir una revisión de precio y disponibilidad antes de ser aceptado.</p>

      <h3>3. Información del cliente y condiciones del recinto</h3>
      <p>El cliente debe proporcionar información razonablemente completa y veraz sobre sede, aforo, horarios, accesos, restricciones, energía disponible y necesidades técnicas. Cuando el servicio dependa de autorizaciones del recinto, permisos, condiciones estructurales, protección civil, seguridad o proveedores ajenos a DOS A, su viabilidad se confirmará antes de ejecutar trabajos que dependan de ellos.</p>

      <h3>4. Pagos, cancelaciones y reprogramaciones</h3>
      <p>Anticipos, calendario de pagos, facturación, cancelación, reprogramación, devoluciones y cargos por cambios se regirán por la cotización o contrato aceptado y por la legislación mexicana aplicable. Ninguna cláusula o condición de DOS A pretende excluir derechos irrenunciables de consumidores reconocidos por la Ley Federal de Protección al Consumidor. Cuando una contratación electrónica esté sujeta a reglas especiales de información, confirmación, cancelación o devolución, prevalecerán esas reglas legales.</p>

      <h3>5. Ejecución, fuerza mayor y terceros</h3>
      <p>DOS A ejecutará el alcance contratado con diligencia profesional. Circunstancias fuera del control razonable de las partes —incluidos cierres de sede, decisiones de autoridad, fallas generalizadas de servicios, condiciones de seguridad, fenómenos naturales o incumplimientos de terceros indispensables— se atenderán conforme al contrato aplicable y la ley, procurando documentar alternativas razonables de reprogramación, sustitución o ajuste cuando sean posibles.</p>

      <h3>6. Propiedad intelectual y materiales</h3>
      <p>El diseño del sitio, textos, fotografías, video, gráficos y elementos propios de DOS A están protegidos por las leyes aplicables. Las marcas y logotipos de terceros pertenecen a sus respectivos titulares y su aparición no transfiere derechos. El cliente es responsable de contar con autorizaciones suficientes sobre contenidos, música, marcas, artes, videos o materiales que entregue a DOS A para reproducir, proyectar o integrar en un evento.</p>

      <h3>7. Uso permitido del sitio</h3>
      <p>No se permite usar el sitio para introducir código malicioso, intentar acceso no autorizado, interferir con su operación, falsear identidad, enviar información ilícita o vulnerar derechos de terceros. DOS A puede limitar solicitudes automatizadas o abusivas para proteger la disponibilidad y seguridad del servicio.</p>

      <h3>8. Responsabilidad y derechos del consumidor</h3>
      <p>El sitio se mantiene con esfuerzos razonables para presentar información correcta, pero las características finales de cada servicio se determinan en la propuesta aceptada. Nada en estos términos limita responsabilidad que legalmente no pueda excluirse ni obliga a renunciar a derechos reconocidos por la legislación mexicana. Para aclaraciones o reclamaciones puedes escribir a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Cuando corresponda por la naturaleza de la relación, la persona consumidora conserva su derecho a acudir a PROFECO.</p>

      <h3>9. Ley aplicable y comunicaciones electrónicas</h3>
      <p>Estos términos se interpretan conforme a las leyes federales aplicables de México, incluida la legislación de protección al consumidor y las reglas mercantiles sobre mensajes de datos cuando correspondan. Las comunicaciones electrónicas podrán utilizarse como medio de solicitud, negociación, aceptación y conservación de información en la medida permitida por la ley y por el documento contractual aplicable.</p>

      <h3>10. Cambios</h3>
      <p>DOS A puede actualizar estos términos para reflejar cambios legales, técnicos u operativos. La versión vigente mostrará su fecha de actualización. Los cambios no modificarán retroactivamente contratos ya celebrados salvo acuerdo válido de las partes o disposición legal aplicable.</p>
    </>
  );
}

export default function LegalDisclosure({ kind, variant = "footer" }: { kind: LegalKind; variant?: LegalVariant }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isPrivacy = kind === "privacy";
  const label = isPrivacy
    ? (lang === "es" ? "Política de privacidad" : "Privacy notice")
    : (lang === "es" ? "Términos y condiciones" : "Terms & conditions");
  const title = isPrivacy ? "Aviso de privacidad integral" : "Términos y condiciones de uso y contratación";
  const preview = isPrivacy
    ? (lang === "es" ? "Cómo tratamos tus datos y cómo ejercer derechos ARCO." : "How we handle personal data and ARCO rights in Mexico.")
    : (lang === "es" ? "Reglas del sitio, cotizaciones, contratación y derechos del consumidor." : "Site, quote, contracting, and consumer terms in Mexico.");

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  const modal = open && typeof document !== "undefined" ? createPortal(
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>DOS A · México</p>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button ref={closeRef} className={styles.close} type="button" onClick={() => setOpen(false)} aria-label={lang === "es" ? "Cerrar" : "Close"}><X size={22} /></button>
        </header>
        <div className={styles.body}>
          {lang === "en" && <p className={styles.languageNote}>The governing legal text is presented in Spanish because the service operates in Mexico.</p>}
          {isPrivacy ? <PrivacyContent /> : <TermsContent />}
        </div>
      </section>
    </div>,
    document.body,
  ) : null;

  return (
    <span className={`${styles.disclosure} ${variant === "inline" ? styles.inline : styles.footer}`}>
      <button ref={triggerRef} className={styles.trigger} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>{label}</button>
      <span className={styles.preview} role="tooltip" aria-hidden="true">
        <strong>{label}</strong>
        <span>{preview}</span>
        <em>{lang === "es" ? "Haz clic para leer completo" : "Click to read the full text"}</em>
      </span>
      {modal}
    </span>
  );
}
