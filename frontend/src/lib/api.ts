export interface LeadFormData {
  name: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  guests: string;
  needs: string;
}

export async function submitLead(data: LeadFormData): Promise<{ success: boolean; message?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Try real backend if available, fallback to mailto
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return { success: true };
      return { success: false };
    } catch {
      // fall through to mailto
    }
  }

  // Mailto fallback — always works, no backend needed
  const subject = encodeURIComponent(`Nueva cotización — ${data.eventType || "Evento DOS2A"}`);
  const body = encodeURIComponent(
    `Hola DOS2A,\n\nSolicitud de cotización:\n\n` +
      `Nombre: ${data.name}\n` +
      `Correo: ${data.email}\n` +
      `Tipo de evento: ${data.eventType}\n` +
      `Fecha: ${data.date}\n` +
      `Ubicación: ${data.location}\n` +
      `Asistentes: ${data.guests}\n` +
      `Necesidades: ${data.needs}\n\nGracias.`
  );
  window.location.href = `mailto:2audioiluminacion@gmail.com?subject=${subject}&body=${body}`;
  return { success: true };
}
