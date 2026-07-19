export const ALLOWED_LOCALES = ["es-MX", "en"] as const;
export type LeadLocale = (typeof ALLOWED_LOCALES)[number];

export interface PublicLeadInput {
  name: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  company?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  guestCount?: number;
  serviceSlugs?: string[];
  needs: string;
  marketingConsent?: boolean;
  locale?: LeadLocale;
  website?: string;
}

export interface NormalizedLeadInput extends Omit<PublicLeadInput, "email" | "serviceSlugs" | "website"> {
  email?: string;
  serviceSlugs: string[];
  locale: LeadLocale;
}

const FORBIDDEN = new Set(["tenantId", "tenant_id", "ownerUserId", "status", "role", "quoteAmount", "price", "currency"]);
const SERVICE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class LeadValidationError extends Error {
  constructor(public readonly code: string, message: string) { super(message); }
}

export function rejectForbiddenLeadKeys(input: Record<string, unknown>): void {
  for (const key of Object.keys(input)) {
    if (FORBIDDEN.has(key)) throw new LeadValidationError("forbidden_field", `Client cannot set ${key}`);
  }
}

export function normalizeLeadInput(raw: Record<string, unknown>): NormalizedLeadInput {
  rejectForbiddenLeadKeys(raw);
  if (String(raw.website ?? "").trim()) throw new LeadValidationError("spam", "Honeypot must be empty");
  const name = String(raw.name ?? "").trim();
  const needs = String(raw.needs ?? "").trim();
  if (name.length < 2 || name.length > 120) throw new LeadValidationError("invalid_name", "Name must be 2–120 characters");
  if (needs.length < 10 || needs.length > 5000) throw new LeadValidationError("invalid_needs", "Needs must be 10–5000 characters");

  const email = raw.email == null ? undefined : String(raw.email).trim().toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new LeadValidationError("invalid_email", "Email is invalid");
  const phone = raw.phone == null ? undefined : String(raw.phone).trim();
  const whatsapp = raw.whatsapp == null ? undefined : String(raw.whatsapp).trim();
  if (!email && !phone && !whatsapp) throw new LeadValidationError("contact_required", "Email, phone, or WhatsApp is required");

  const guestCount = raw.guestCount == null || raw.guestCount === "" ? undefined : Number(raw.guestCount);
  if (guestCount !== undefined && (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 1_000_000)) {
    throw new LeadValidationError("invalid_guest_count", "Guest count is invalid");
  }

  const eventDate = raw.eventDate == null || raw.eventDate === "" ? undefined : String(raw.eventDate);
  if (eventDate && Number.isNaN(Date.parse(`${eventDate}T00:00:00Z`))) throw new LeadValidationError("invalid_event_date", "Event date is invalid");

  const serviceSlugs = Array.isArray(raw.serviceSlugs) ? [...new Set(raw.serviceSlugs.map(String).map(v => v.trim()).filter(Boolean))] : [];
  if (serviceSlugs.length > 20 || serviceSlugs.some(v => !SERVICE_SLUG.test(v))) throw new LeadValidationError("invalid_service", "Service slug is invalid");

  const locale = ALLOWED_LOCALES.includes(raw.locale as LeadLocale) ? raw.locale as LeadLocale : "es-MX";
  return {
    name, needs, email, phone, whatsapp,
    company: raw.company == null ? undefined : String(raw.company).trim().slice(0, 200),
    eventType: raw.eventType == null ? undefined : String(raw.eventType).trim().slice(0, 120),
    eventDate,
    location: raw.location == null ? undefined : String(raw.location).trim().slice(0, 300),
    guestCount,
    serviceSlugs,
    marketingConsent: raw.marketingConsent === true,
    locale,
  };
}
