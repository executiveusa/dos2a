import type { NormalizedLeadInput } from "../../validation/src/lead-intake";

export interface TenantIntakePolicy {
  tenantId: string;
  tenantSlug: string;
  allowedServiceSlugs: ReadonlySet<string>;
}

export interface LeadBundleReceipt {
  tenantId: string;
  leadId: string;
  requestId: string;
  duplicate: boolean;
}

export interface LeadBundleRepository {
  findCompletedByIdempotency(tenantId: string, idempotencyKey: string): Promise<LeadBundleReceipt | null>;
  createLeadBundle(args: {
    tenantId: string;
    requestId: string;
    idempotencyKey?: string;
    payloadHash: string;
    sourceChannel: "web" | "la_genio" | "owner" | "import";
    input: NormalizedLeadInput;
    outboxTopic: "lead.created";
  }): Promise<LeadBundleReceipt>;
}

export interface LeadNotificationPort {
  notifyLeadCreated(receipt: LeadBundleReceipt): Promise<void>;
}

export class UnknownServiceError extends Error {}

export class LeadIntakeService {
  constructor(private readonly repository: LeadBundleRepository, private readonly notifier?: LeadNotificationPort) {}

  async create(args: {
    policy: TenantIntakePolicy;
    input: NormalizedLeadInput;
    requestId: string;
    idempotencyKey?: string;
    payloadHash: string;
    sourceChannel: "web" | "la_genio" | "owner" | "import";
  }): Promise<LeadBundleReceipt> {
    for (const slug of args.input.serviceSlugs) {
      if (!args.policy.allowedServiceSlugs.has(slug)) throw new UnknownServiceError(`Unknown service slug: ${slug}`);
    }
    if (args.idempotencyKey) {
      const existing = await this.repository.findCompletedByIdempotency(args.policy.tenantId, args.idempotencyKey);
      if (existing) return { ...existing, duplicate: true };
    }
    const receipt = await this.repository.createLeadBundle({
      tenantId: args.policy.tenantId,
      requestId: args.requestId,
      idempotencyKey: args.idempotencyKey,
      payloadHash: args.payloadHash,
      sourceChannel: args.sourceChannel,
      input: args.input,
      outboxTopic: "lead.created",
    });
    if (this.notifier) {
      try { await this.notifier.notifyLeadCreated(receipt); } catch { /* durable lead remains valid; outbox/worker retries separately */ }
    }
    return receipt;
  }
}

export function normalizePhone(value?: string): string | undefined {
  if (!value) return undefined;
  const plus = value.trim().startsWith("+");
  const digits = value.replace(/\D/g, "");
  if (!digits) return undefined;
  return `${plus ? "+" : ""}${digits}`;
}

export function deterministicContactKey(email?: string, phone?: string, whatsapp?: string): string {
  const parts = [email?.trim().toLowerCase(), normalizePhone(phone), normalizePhone(whatsapp)].filter(Boolean).sort();
  return parts.join("|");
}
