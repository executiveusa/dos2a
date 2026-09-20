import { createHash, randomUUID } from "node:crypto";

export const MAX_BODY_BYTES = 32 * 1024;
export const RATE_LIMIT_PER_HOUR = 5;

export type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: number | null;
  needs: string;
  locale: string;
};

export type StoredLead = Lead & {
  requestId: string;
  idempotencyKey: string;
  payloadHash: string;
  ipHash: string;
};

export type PersistResult =
  | { kind: "created"; leadId: string | number }
  | { kind: "duplicate"; leadId: string | number; requestId: string; emailSent: boolean; emailError?: string }
  | { kind: "conflict" }
  | { kind: "rate_limited" };

export interface LeadStore {
  persist(lead: StoredLead): Promise<PersistResult>;
  updateEmailResult(leadId: string | number, sent: boolean, error?: string): Promise<void>;
}

export interface LeadMailer {
  send(lead: StoredLead): Promise<{ sent: boolean; error?: "smtp_not_configured" | "smtp_send_failed" }>;
}

export type IntakeDeps = { store: LeadStore; mailer: LeadMailer };

type IntakeResult = { status: number; body: Record<string, unknown> };

function clean(value: unknown, max: number) {
  return value == null ? "" : String(value).trim().slice(0, max);
}

function fail(status: number, error: string): IntakeResult {
  return { status, body: { error } };
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function parseLead(raw: Record<string, unknown>): { lead?: Lead; error?: string; honeypot?: boolean } {
  if (clean(raw.website, 200)) return { honeypot: true };

  const name = clean(raw.name, 120);
  const email = clean(raw.email, 255).toLowerCase();
  const phone = clean(raw.phone, 80);
  const company = clean(raw.company, 200);
  const eventType = clean(raw.eventType, 120);
  const eventDate = clean(raw.eventDate ?? raw.date, 64);
  const location = clean(raw.location, 255);
  const needs = clean(raw.needs, 5000);
  const locale = clean(raw.locale === "en" ? "en" : "es-MX", 16);
  const guestRaw = raw.guestCount ?? raw.guests;
  const guestCount = guestRaw === "" || guestRaw == null ? null : Number(guestRaw);

  if (name.length < 2) return { error: "invalid_name" };
  if (!email && !phone) return { error: "contact_required" };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "invalid_email" };
  if (needs.length < 10) return { error: "invalid_needs" };
  if (guestCount !== null && (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 1_000_000)) {
    return { error: "invalid_guest_count" };
  }
  if (eventDate && Number.isNaN(Date.parse(`${eventDate}T00:00:00Z`))) return { error: "invalid_event_date" };

  return { lead: { name, email, phone, company, eventType, eventDate, location, guestCount, needs, locale } };
}

export async function handleLeadRequest(request: Request, deps: IntakeDeps): Promise<IntakeResult> {
  if (request.method !== "POST") return fail(405, "method_not_allowed");

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) return fail(413, "payload_too_large");

  let text: string;
  try {
    text = await request.text();
  } catch {
    return fail(400, "invalid_json");
  }
  if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) return fail(413, "payload_too_large");

  let raw: Record<string, unknown>;
  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== "object" || Array.isArray(value)) return fail(400, "invalid_json");
    raw = value as Record<string, unknown>;
  } catch {
    return fail(400, "invalid_json");
  }

  const parsed = parseLead(raw);
  if (parsed.honeypot) return { status: 202, body: { accepted: true } };
  if (parsed.error || !parsed.lead) return fail(400, parsed.error || "invalid_json");

  const idempotencyKey = clean(request.headers.get("idempotency-key") || raw.idempotencyKey || randomUUID(), 128);
  if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) return fail(400, "invalid_idempotency_key");
  const requestId = clean(request.headers.get("x-request-id") || randomUUID(), 128);
  const canonical = JSON.stringify(parsed.lead);
  const payloadHash = sha256(canonical);
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  const ipHash = forwarded ? sha256(forwarded) : "";
  const stored: StoredLead = { ...parsed.lead, requestId, idempotencyKey, payloadHash, ipHash };

  let persisted: PersistResult;
  try {
    persisted = await deps.store.persist(stored);
  } catch {
    return fail(500, "persistence_failed");
  }

  if (persisted.kind === "conflict") return fail(409, "idempotency_conflict");
  if (persisted.kind === "rate_limited") return fail(429, "rate_limited");
  if (persisted.kind === "duplicate") {
    return {
      status: 200,
      body: {
        accepted: true,
        duplicate: true,
        leadId: persisted.leadId,
        requestId: persisted.requestId,
        emailSent: persisted.emailSent,
        ...(persisted.emailError ? { emailError: persisted.emailError } : {}),
      },
    };
  }

  const notification = await deps.mailer.send(stored);
  try {
    await deps.store.updateEmailResult(persisted.leadId, notification.sent, notification.error);
  } catch {
    // Persistence already succeeded. Keep the public result stable and do not expose database details.
  }

  return {
    status: 201,
    body: {
      accepted: true,
      duplicate: false,
      leadId: persisted.leadId,
      requestId,
      emailSent: notification.sent,
      ...(notification.error ? { emailError: notification.error } : {}),
    },
  };
}
