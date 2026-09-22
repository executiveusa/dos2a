import nodemailer from "nodemailer";
import type { LeadMailer, StoredLead } from "./core";

const NOTIFY_TO = "alanis@eventosdos2a.mx";

export class SmtpLeadMailer implements LeadMailer {
  async send(lead: StoredLead) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    if (!host || !user || !pass) return { sent: false, error: "smtp_not_configured" as const };

    const port = Number(process.env.SMTP_PORT || "465");
    const lines = [
      "Nueva solicitud dos A", "", `Nombre: ${lead.name}`, `Correo: ${lead.email || "-"}`,
      `Telefono: ${lead.phone || "-"}`, `Empresa: ${lead.company || "-"}`,
      `Tipo de evento: ${lead.eventType || "-"}`, `Fecha: ${lead.eventDate || "-"}`,
      `Ubicacion: ${lead.location || "-"}`, `Asistentes: ${lead.guestCount ?? "-"}`,
      `Idioma: ${lead.locale}`, "", "Necesidades:", lead.needs, "", `Ref: ${lead.requestId}`,
    ];

    try {
      const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
      await transport.sendMail({
        from: { name: "DOS2A", address: user },
        to: NOTIFY_TO,
        ...(lead.email ? { replyTo: { name: lead.name, address: lead.email } } : {}),
        subject: `Nueva solicitud dos A - ${lead.eventType || "Evento"}`,
        text: lines.join("\n"),
      });
      return { sent: true };
    } catch {
      return { sent: false, error: "smtp_send_failed" as const };
    }
  }
}
