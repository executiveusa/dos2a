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

export async function submitLead(data: LeadFormData): Promise<LeadSubmitResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { success: false, message: "Lead API is not configured.", mailtoUrl: buildMailto(data) };
  }
  try {
    const res = await fetch(`${apiUrl}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return { success: true };
    return { success: false, message: `Lead API returned ${res.status}.`, mailtoUrl: buildMailto(data) };
  } catch {
    return { success: false, message: "Lead API request failed.", mailtoUrl: buildMailto(data) };
  }
}
