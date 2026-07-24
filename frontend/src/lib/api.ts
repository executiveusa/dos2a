export interface LeadFormData {
  name: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  guests: string;
  needs: string;
}

export interface LeadSubmitResult {
  success: boolean;
  message?: string;
  mailtoUrl?: string;
}

const LEAD_ENDPOINT = "https://cyxdevcjycmffhmwxojh.supabase.co/functions/v1/dosa-lead-intake";

function buildMailto(data: LeadFormData) {
  const subject = encodeURIComponent(`Nueva solicitud dos A — ${data.eventType || "Evento"}`);
  const body = encodeURIComponent(
    `Hola dos A,\n\nSolicitud de cotización:\n\n` +
      `Nombre: ${data.name}\nCorreo: ${data.email}\nTipo de evento: ${data.eventType}\n` +
      `Fecha: ${data.date}\nUbicación: ${data.location}\nAsistentes: ${data.guests}\n` +
      `Necesidades: ${data.needs}\n`
  );
  return `mailto:2audioiluminacion@gmail.com?subject=${subject}&body=${body}`;
}

function getIdempotencyKey() {
  if (typeof window === "undefined") return crypto.randomUUID();
  const key = "dosa_lead_idempotency";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const created = crypto.randomUUID();
  sessionStorage.setItem(key, created);
  return created;
}

export async function submitLead(data: LeadFormData): Promise<LeadSubmitResult> {
  try {
    const idempotencyKey = getIdempotencyKey();
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
        "X-Request-ID": crypto.randomUUID(),
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      if (typeof window !== "undefined") sessionStorage.removeItem("dosa_lead_idempotency");
      return { success: true };
    }
    return { success: false, message: `Lead API returned ${res.status}.`, mailtoUrl: buildMailto(data) };
  } catch {
    return { success: false, message: "Lead API request failed.", mailtoUrl: buildMailto(data) };
  }
}
