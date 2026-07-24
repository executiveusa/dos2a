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
const IDEMPOTENCY_KEY_STORAGE = "dosa_lead_idempotency";
const IDEMPOTENCY_FINGERPRINT_STORAGE = "dosa_lead_idempotency_fingerprint";

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

function fingerprintLead(data: LeadFormData) {
  const input = JSON.stringify(data);
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function getIdempotencyKey(data: LeadFormData) {
  if (typeof window === "undefined") return crypto.randomUUID();

  const fingerprint = fingerprintLead(data);
  const existingKey = sessionStorage.getItem(IDEMPOTENCY_KEY_STORAGE);
  const existingFingerprint = sessionStorage.getItem(IDEMPOTENCY_FINGERPRINT_STORAGE);

  if (existingKey && existingFingerprint === fingerprint) return existingKey;

  const created = crypto.randomUUID();
  sessionStorage.setItem(IDEMPOTENCY_KEY_STORAGE, created);
  sessionStorage.setItem(IDEMPOTENCY_FINGERPRINT_STORAGE, fingerprint);
  return created;
}

function clearIdempotencyState() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(IDEMPOTENCY_KEY_STORAGE);
  sessionStorage.removeItem(IDEMPOTENCY_FINGERPRINT_STORAGE);
}

export async function submitLead(data: LeadFormData): Promise<LeadSubmitResult> {
  try {
    const idempotencyKey = getIdempotencyKey(data);
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
      clearIdempotencyState();
      return { success: true };
    }
    return { success: false, message: `Lead API returned ${res.status}.`, mailtoUrl: buildMailto(data) };
  } catch {
    return { success: false, message: "Lead API request failed.", mailtoUrl: buildMailto(data) };
  }
}
