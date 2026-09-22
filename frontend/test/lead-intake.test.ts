import test from "node:test";
import assert from "node:assert/strict";
import { handleLeadRequest, type LeadMailer, type LeadStore, type PersistResult, type StoredLead } from "../src/lib/lead-intake/core";

const valid = { name: "Ada Lovelace", email: "ada@example.com", eventType: "Corporate", date: "2026-10-10", location: "CDMX", guests: "20", needs: "A complete event setup" };
const headers = { "content-type": "application/json", "idempotency-key": "idem-key-123", "x-request-id": "request-123", "x-forwarded-for": "203.0.113.9" };

class Store implements LeadStore {
  persisted: StoredLead[] = [];
  emailUpdates: Array<[string | number, boolean, string | undefined]> = [];
  private result: PersistResult;
  private failure: boolean;
  constructor(result: PersistResult = { kind: "created", leadId: 7 }, failure = false) { this.result = result; this.failure = failure; }
  async persist(lead: StoredLead) { if (this.failure) throw new Error("db"); this.persisted.push(lead); return this.result; }
  async updateEmailResult(id: string | number, sent: boolean, error?: string) { this.emailUpdates.push([id, sent, error]); }
}
class Mailer implements LeadMailer {
  calls = 0;
  private result: { sent: boolean; error?: "smtp_not_configured" | "smtp_send_failed" };
  constructor(result: { sent: boolean; error?: "smtp_not_configured" | "smtp_send_failed" } = { sent: true }) { this.result = result; }
  async send() { this.calls += 1; return this.result; }
}
function req(body: unknown, extra: Record<string,string> = {}) { return new Request("http://localhost/api/leads", { method: "POST", headers: { ...headers, ...extra }, body: JSON.stringify(body) }); }

for (const [name, body, error] of [
  ["name", { ...valid, name: "x" }, "invalid_name"],
  ["contact", { ...valid, email: "", phone: "" }, "contact_required"],
  ["email", { ...valid, email: "bad" }, "invalid_email"],
  ["needs", { ...valid, needs: "short" }, "invalid_needs"],
  ["guests", { ...valid, guests: "0" }, "invalid_guest_count"],
  ["date", { ...valid, date: "not-a-date" }, "invalid_event_date"],
] as const) test(`validation: ${name}`, async () => { const r = await handleLeadRequest(req(body), { store: new Store(), mailer: new Mailer() }); assert.equal(r.status, 400); assert.equal(r.body.error, error); });

test("honeypot is accepted without persistence or mail", async () => { const store = new Store(); const mail = new Mailer(); const r = await handleLeadRequest(req({ ...valid, website: "spam" }), { store, mailer: mail }); assert.deepEqual(r, { status: 202, body: { accepted: true } }); assert.equal(store.persisted.length, 0); assert.equal(mail.calls, 0); });
test("idempotency replay returns prior receipt without mailing", async () => { const store = new Store({ kind: "duplicate", leadId: 4, requestId: "first", emailSent: true }); const mail = new Mailer(); const r = await handleLeadRequest(req(valid), { store, mailer: mail }); assert.equal(r.status, 200); assert.equal(r.body.duplicate, true); assert.equal(mail.calls, 0); });
test("idempotency conflict is stable", async () => { const r = await handleLeadRequest(req(valid), { store: new Store({ kind: "conflict" }), mailer: new Mailer() }); assert.deepEqual(r, { status: 409, body: { error: "idempotency_conflict" } }); });
test("rate limit is stable", async () => { const r = await handleLeadRequest(req(valid), { store: new Store({ kind: "rate_limited" }), mailer: new Mailer() }); assert.deepEqual(r, { status: 429, body: { error: "rate_limited" } }); });
test("persistence failure never mails", async () => { const mail = new Mailer(); const r = await handleLeadRequest(req(valid), { store: new Store({ kind: "created", leadId: 1 }, true), mailer: mail }); assert.deepEqual(r, { status: 500, body: { error: "persistence_failed" } }); assert.equal(mail.calls, 0); });
for (const result of [{ sent: false, error: "smtp_not_configured" as const }, { sent: false, error: "smtp_send_failed" as const }, { sent: true }]) test(`SMTP path: ${result.sent ? "success" : result.error}`, async () => { const store = new Store(); const r = await handleLeadRequest(req(valid), { store, mailer: new Mailer(result) }); assert.equal(r.status, 201); assert.equal(r.body.emailSent, result.sent); assert.equal(r.body.emailError, result.error); assert.deepEqual(store.emailUpdates[0], [7, result.sent, result.error]); });
test("aliases and caps match MariaDB columns", async () => { const store = new Store(); const r = await handleLeadRequest(req({ ...valid, date: undefined, guests: undefined, eventDate: "2026-11-01", guestCount: 15, eventType: "x".repeat(200), location: "y".repeat(300), locale: "en" }), { store, mailer: new Mailer() }); assert.equal(r.status, 201); assert.equal(store.persisted[0].eventType.length, 120); assert.equal(store.persisted[0].location.length, 255); assert.equal(store.persisted[0].eventDate, "2026-11-01"); assert.equal(store.persisted[0].guestCount, 15); });
