"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { CONTACT_EMAIL } from "@/lib/site-config";
import styles from "./LegalDisclosure.module.css";

type LegalKind = "privacy" | "terms" | "cancellation";
type LegalVariant = "footer" | "inline";

const OFFICIAL_EMAIL = CONTACT_EMAIL;

function PrivacyContent() {
  return (
    <article className={styles.document}>
      <p className={styles.updated}>Última actualización: Septiembre de 2026.</p>
      <p>
        <strong>2A VISUAL &amp; SOUND LAB</strong> (en lo sucesivo identificado comercialmente como “Dos2A”), con domicilio fiscal ubicado en Cedro 323 - 11, Col. Santa María la Ribera, C.P. 06400, Alcaldía Cuauhtémoc, Ciudad de México, es el responsable del tratamiento, uso y protección de sus datos personales, y al respecto le informa lo siguiente:
      </p>

      <h3>1. Datos Personales que Recopilamos</h3>
      <p>Para llevar a cabo las finalidades descritas en el presente Aviso de Privacidad, recopilamos las siguientes categorías de datos personales:</p>
      <ul>
        <li><strong>Datos de identificación y contacto:</strong> Nombre completo, correo electrónico, teléfono de contacto, ciudad y detalles del evento.</li>
        <li><strong>Datos de facturación y fiscales:</strong> Registro Federal de Contribuyentes (RFC), Razón Social, Domicilio Fiscal, Régimen Fiscal y Uso de CFDI.</li>
      </ul>

      <h3>2. Finalidades del Tratamiento de Datos Personales</h3>
      <p>Sus datos personales serán utilizados exclusivamente para las siguientes finalidades primarias, las cuales son necesarias para prestarle el servicio solicitado:</p>
      <ul>
        <li>Elaborar, enviar y dar seguimiento a cotizaciones de servicios audiovisuales y producción de eventos.</li>
        <li>Formalizar la relación contractual y elaborar contratos de prestación de servicios o arrendamiento de equipo.</li>
        <li>Coordinar la logística, montaje, operación y desmontaje en el sitio o recinto de su evento.</li>
        <li>Emitir los Comprobantes Fiscales Digitales por Internet (CFDI/Facturas) correspondientes.</li>
        <li>Gestionar procesos de cobro, pagos y administración del servicio.</li>
      </ul>
      <p className={styles.highlightNotice}>
        <strong>Uso publicitario o secundario:</strong> Hacemos de su conocimiento que NO utilizamos sus datos personales para finalidades secundarias de mercadotecnia, publicidad, envío de boletines o prospección comercial no solicitada.
      </p>

      <h3>3. Transferencia de Datos Personales</h3>
      <p>
        <strong>2A VISUAL &amp; SOUND LAB NO realiza transferencias de sus datos personales a terceros</strong>, nacionales o extranjeros, ajenos a la organización. Sus datos son tratados con estricta confidencialidad por nuestro personal autorizado únicamente para el cumplimiento de las finalidades descritas.
      </p>
      <p className={styles.caption}>
        (Se exceptúan únicamente los requerimientos de información formulados por autoridades competentes en términos de la legislación aplicable).
      </p>

      <h3>4. Ejercicio de Derechos ARCO y Revocación del Consentimiento</h3>
      <p>
        Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como Derechos ARCO.
      </p>
      <p>
        Para el ejercicio de cualquiera de los Derechos ARCO, o para revocar el consentimiento que nos haya otorgado para el tratamiento de sus datos, usted deberá presentar la solicitud correspondiente enviando un correo electrónico a la dirección:{" "}
        <a href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a>
      </p>
      <p>Su solicitud deberá contener:</p>
      <ul>
        <li>Nombre completo del titular y correo electrónico para recibir notificaciones.</li>
        <li>Documento oficial que acredite su identidad o representación legal.</li>
        <li>Descripción clara y precisa de los datos personales respecto de los cuales busca ejercer alguno de los derechos ARCO.</li>
      </ul>
      <p>
        Atenderemos su solicitud en un plazo máximo de <strong>20 (veinte) días hábiles</strong> contados desde la fecha de recepción de la misma.
      </p>

      <h3>5. Uso de Cookies y Tecnologías de Rastreo</h3>
      <p>
        Nuestro sitio web utiliza cookies y tecnologías de rastreo estándar únicamente para asegurar el funcionamiento correcto del sitio y mejorar la experiencia de navegación del usuario. Estas herramientas no recopilan información personal sensible ni son utilizadas para perfiles publicitarios.
      </p>

      <h3>6. Cambios al Aviso de Privacidad</h3>
      <p>
        El presente Aviso de Privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o de nuestras propias necesidades operativas. Cualquier modificación al presente aviso estará disponible para su consulta en nuestro sitio web oficial.
      </p>
    </article>
  );
}

function TermsContent() {
  return (
    <article className={styles.document}>
      <p className={styles.updated}>Última actualización: Septiembre de 2026.</p>
      <p>
        El presente documento establece los Términos y Condiciones generales (en lo sucesivo, los "Términos") bajo los cuales <strong>2A VISUAL &amp; SOUND LAB</strong> (en lo sucesivo identificado comercialmente como “Dos2A”), con domicilio fiscal en Cedro 323 - 11, Col. Santa María la Ribera, C.P. 06400, Alcaldía Cuauhtémoc, Ciudad de México, presta servicios de producción audiovisual, logística, operación y arrendamiento de equipo para eventos a sus Clientes.
      </p>
      <p className={styles.highlightNotice}>
        Al solicitar una cotización, realizar el pago de un anticipo o firmar la propuesta comercial correspondiente, el Cliente acepta de manera íntegra y sin reserva los presentes Términos y Condiciones.
      </p>

      <h3>1. Esquema de Pago y Facturación</h3>
      <ul>
        <li><strong>Reserva de fecha:</strong> Para confirmar y apartar la fecha de un evento en la agenda de Dos2A, el Cliente deberá cubrir un anticipo equivalente al 50% (cincuenta por ciento) del monto total cotizado.</li>
        <li><strong>Liquidación del saldo:</strong> El 50% restante deberá ser liquidado a más tardar el día del evento, previo al inicio de la operación o presentación técnica.</li>
        <li><strong>Formas de pago aceptadas:</strong> Dos2A acepta pagos mediante transferencia electrónica (SPEI), tarjetas de crédito/débito, depósitos bancarios y pago en efectivo.</li>
        <li><strong>Facturación:</strong> Todos los servicios son facturables. En caso de requerir Comprobante Fiscal Digital por Internet (CFDI), el Cliente deberá proporcionar sus datos fiscales actualizados al momento de realizar su pago o confirmar su servicio.</li>
      </ul>

      <h3>2. Accesos, Permisos e Infraestructura del Recinto</h3>
      <ul>
        <li><strong>Responsabilidad de acceso:</strong> El Cliente es el único responsable de gestionar los permisos de ingreso, horarios de carga/descarga y acceso de personal técnico con la administración del recinto o hotel contratado.</li>
        <li>
          <strong>Infraestructura eléctrica y logística:</strong> El Cliente asume la total responsabilidad por la idoneidad del lugar elegido. Dos2A no se hace responsable por retrasos en el montaje o fallas en la ejecución derivadas de:
          <ul>
            <li>Horarios restringidos o denegación de acceso al recinto.</li>
            <li>Suministro eléctrico deficiente, variaciones de voltaje o falta de capacidad instalada en el lugar.</li>
            <li>Espacios físicos no adecuados o sin la ventilación/protección requerida.</li>
          </ul>
        </li>
      </ul>
      <p className={styles.caption}>Cualquier retraso en el programa del evento ocasionado por estas causas será responsabilidad exclusiva del Cliente.</p>

      <h3>3. Eventos al Aire Libre, Clima y Fallas Ajenas</h3>
      <ul>
        <li><strong>Protección contra intemperie:</strong> En eventos organizados al aire libre, espacios abiertos o terrazas, el Cliente es responsable de proveer las medidas de protección necesarias (carpas, techos o estructuras impermeables) para resguardar la integridad del equipo de Dos2A.</li>
        <li><strong>Condiciones climáticas y apagones:</strong> Dos2A no asumirá responsabilidad por la suspensión parcial o total del servicio atribuible a causas climáticas (lluvia, viento extremo, tormentas) o cortes imprevistos en el suministro eléctrico del recinto. Si las condiciones ambientales ponen en riesgo el equipo o la seguridad del personal técnico, Dos2A se reserva el derecho de pausar la operación hasta que existan condiciones seguras.</li>
      </ul>

      <h3>4. Responsabilidad sobre el Equipo, Daños y Faltantes</h3>
      <ul>
        <li><strong>Cuidado del equipamiento:</strong> Durante la estancia del equipo en las instalaciones del evento, la custodia del mismo recae en el Cliente y/o la administración del recinto.</li>
        <li><strong>Reparación y Reposición:</strong> En caso de daño parcial, mal uso por parte de los asistentes, robo, extravío o destrucción total del equipo de Dos2A, el Cliente (y en su caso, en corresponsabilidad con el recinto según el contrato correspondiente) responderá por el costo total de reparación o reposición a valor mercado de los equipos afectados, conforme a las cláusulas estipuladas en el contrato de prestación de servicios firmado previamente.</li>
      </ul>

      <h3>5. Reprogramación y Cambios de Fecha</h3>
      <p>
        <strong>Cambio de fecha sin penalización:</strong> Si por razones operativas o personales el Cliente requiere cambiar la fecha de su evento, Dos2A respetará el 100% del anticipo pagado y lo aplicará a la nueva fecha, sujeto a la disponibilidad del equipo y personal técnico en la agenda de la empresa.
      </p>

      <h3>6. Jurisdicción y Ley Aplicable</h3>
      <p>
        Para la interpretación y cumplimiento de los presentes Términos y Condiciones, las partes se someten a la legislación federal vigente en los Estados Unidos Mexicanos y a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando expresamente a cualquier otro fuero que por razón de sus domicilios presentes o futuros pudiera corresponderles.
      </p>
    </article>
  );
}

function CancellationContent() {
  return (
    <article className={styles.document}>
      <p className={styles.updated}>Última actualización: Septiembre de 2026.</p>
      <p>
        En <strong>2A VISUAL &amp; SOUND LAB</strong> (en lo sucesivo “Dos2A”), nuestro compromiso es brindar certeza técnica y transparencia operativa en cada proyecto. La presente Política regula los términos bajo los cuales el Cliente podrá solicitar reprogramaciones, cancelaciones o reembolsos de los pagos efectuados por concepto de apartado o contratación de nuestros servicios de producción audiovisual.
      </p>

      <h3>1. Anticipos y Aplicación de Pagos</h3>
      <p>
        El 50% de anticipo requerido para reservar la fecha en la agenda operativa de Dos2A se abonará directamente a la cuenta total de la factura o comprobante fiscal del servicio.
      </p>
      <p className={styles.highlightNotice}>
        En caso de que el evento no pueda realizarse en la fecha originalmente programada, el monto depositado no se pierde: este saldo a favor podrá aplicarse íntegramente para la realización del evento en una nueva fecha, sujeto a la disponibilidad de agenda y equipo de la empresa.
      </p>

      <h3>2. Cancelaciones por Parte del Cliente</h3>
      <ul>
        <li>
          <strong>Cancelaciones con más de 30 días de anticipación:</strong> Si el Cliente cancela el servicio formalmente y por escrito con más de 30 días naturales de antelación a la fecha del evento, procederá el reembolso del monto pagado, deduciendo únicamente los gastos administrativos o comisiones bancarias aplicables.
        </li>
        <li>
          <strong>Cancelaciones con menos de 30 días de anticipación:</strong> Si la cancelación se realiza con poco tiempo de anticipación (30 días o menos previo al evento), el dinero pagado no será devuelto en efectivo o transferencia, pero quedará abonado como un saldo a favor que el Cliente podrá utilizar para reagendar su evento en una fecha posterior.
        </li>
      </ul>

      <h3>3. Imposibilidad de Prestación del Servicio por Causa Imputable a Dos2A</h3>
      <p>
        En el caso eventual de que Dos2A no pueda prestar el servicio por causas directamente atribuibles a la empresa o fallas internas imprevistas, nuestra prioridad será la reagendación del evento en mutuo acuerdo con el Cliente, garantizando la misma calidad técnica y equipamiento contratado sin costo adicional.
      </p>

      <h3>4. Cancelación por Fuerza Mayor o Caso Fortuito</h3>
      <p>
        Si el evento debe cancelarse o suspenderse debido a causas ajenas a ambas partes (tales como emergencias sanitarias, desastres naturales, restricciones gubernamentales o condiciones climáticas extremas), se aplicará la retención únicamente de los gastos operativos y logísticos ya devengados por Dos2A hasta el momento de la cancelación (ej. transporte, apartado de personal técnico o insumos no recuperables). El saldo restante quedará a favor del Cliente para ser reprogramado.
      </p>

      <h3>5. Plazos y Métodos para la Devolución de Fondos</h3>
      <p>En todos los casos donde proceda una devolución en dinero:</p>
      <ul>
        <li>
          Las solicitudes deberán canalizarse a través del correo oficial:{" "}
          <a href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a>.
        </li>
        <li>
          Los tiempos de acreditación del reembolso dependerán exclusivamente del método de pago utilizado (transferencia SPEI, tarjeta de crédito o débito) y de los tiempos de procesamiento de las instituciones bancarias correspondientes. Dos2A emitirá el comprobante de dispersión en cuanto la operación sea autorizada.
        </li>
      </ul>
    </article>
  );
}

export default function LegalDisclosure({
  kind,
  variant = "footer",
}: {
  kind: LegalKind;
  variant?: LegalVariant;
}) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LegalKind>(kind);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const getLabel = (k: LegalKind) => {
    switch (k) {
      case "privacy":
        return lang === "es" ? "Aviso de Privacidad" : "Privacy Notice";
      case "terms":
        return lang === "es" ? "Términos y Condiciones" : "Terms & Conditions";
      case "cancellation":
        return lang === "es" ? "Cancelación y Reembolsos" : "Cancellation Policy";
    }
  };

  const getTitle = (k: LegalKind) => {
    switch (k) {
      case "privacy":
        return "Aviso de Privacidad Integral";
      case "terms":
        return "Términos y Condiciones de Servicio";
      case "cancellation":
        return "Política de Cancelación y Reembolsos";
    }
  };

  const handleOpen = () => {
    setActiveTab(kind);
    setOpen(true);
  };

  const switchTab = (nextTab: LegalKind) => {
    setActiveTab(nextTab);
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 50);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  const modal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            className={styles.backdrop}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <section
              ref={panelRef}
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              {/* Mobile Drag Handle Indicator */}
              <div className={styles.dragHandle} aria-hidden="true" />

              <header className={styles.header}>
                <div className={styles.headerInfo}>
                  <p className={styles.kicker}>Dos2A · 2A Visual &amp; Sound Lab</p>
                  <h2 id={titleId} className={styles.title}>
                    {getTitle(activeTab)}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  className={styles.close}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={lang === "es" ? "Cerrar documento" : "Close document"}
                >
                  <X size={20} />
                </button>
              </header>

              {/* Apple Segmented Tab Switcher */}
              <div
                className={styles.segmentedContainer}
                role="tablist"
                aria-label={lang === "es" ? "Documentos Legales" : "Legal Documents"}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "privacy"}
                  className={`${styles.segment} ${activeTab === "privacy" ? styles.segmentActive : ""}`}
                  onClick={() => switchTab("privacy")}
                >
                  {getLabel("privacy")}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "terms"}
                  className={`${styles.segment} ${activeTab === "terms" ? styles.segmentActive : ""}`}
                  onClick={() => switchTab("terms")}
                >
                  {getLabel("terms")}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "cancellation"}
                  className={`${styles.segment} ${activeTab === "cancellation" ? styles.segmentActive : ""}`}
                  onClick={() => switchTab("cancellation")}
                >
                  {getLabel("cancellation")}
                </button>
              </div>

              {/* Scrollable Document Body */}
              <div ref={bodyRef} className={styles.body}>
                {lang === "en" && (
                  <p className={styles.languageNote}>
                    Official corporate and fiscal policies are established in Spanish in compliance with Mexican commercial jurisdiction.
                  </p>
                )}
                {activeTab === "privacy" && <PrivacyContent />}
                {activeTab === "terms" && <TermsContent />}
                {activeTab === "cancellation" && <CancellationContent />}
              </div>
            </section>
          </div>,
          document.body
        )
      : null;

  return (
    <span className={`${styles.disclosure}${variant === "inline" ? ` ${styles.inline}` : ""}`}>
      <button
        ref={triggerRef}
        className={styles.trigger}
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {getLabel(kind)}
      </button>
      {modal}
    </span>
  );
}
