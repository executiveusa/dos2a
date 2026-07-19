# Tenant Data Foundation

## Purpose

Provide one reusable data contract for dos A and future Sovereign AV Business OS tenants without inheriting the unrelated DJ marketplace schema.

## Current safety posture

The migration creates four dedicated schemas:

- `app_core`
- `crm`
- `comms`
- `agent_audit`

The Phase 03 migration intentionally adds **no browser/API grants and no RLS/auth policies**. These schemas must remain unexposed until the dedicated auth/RLS phase is accepted, tested, and approved.

## Data domains

### `app_core`

`tenants` — tenant identity, locale, timezone, currency, lifecycle status.

`tenant_memberships` — user UUID, role, membership status. The UUID is intentionally not coupled to a specific auth provider in this phase.

### `crm`

`companies` — customer/prospect organizations.

`contacts` — business contacts and communication details.

`lead_sources` — website, WhatsApp, phone, email, referral, social, partner, manual, or other source classification.

`leads` — qualification/status, event date/location, budget range, owner assignment, next action, loss reason.

`event_briefs` — one foundation brief per tenant/lead with event type, timing, venue, attendance, indoor/outdoor flag, requirements, notes.

`services` — tenant-specific service catalog.

`lead_services` — requested/related services for a lead.

### `comms`

`conversations` — channel/thread container associated with lead/contact where available.

`messages` — inbound/outbound/internal communication record.

### `agent_audit`

`agent_identities` — named tenant-scoped agent identities; credentials are not stored here.

`audit_events` — actor/action/entity/request metadata for future trusted server-side audit writes.

## Tenant-integrity rule

Tenant-owned records carry `tenant_id`.

Cross-table tenant-owned references use composite `(tenant_id, id)` foreign keys so an application bug cannot associate a lead with another tenant's contact, company, source, service, conversation, or agent identity.

This is data-integrity isolation. Authorization isolation is implemented and tested separately with RLS/auth policies before browser/API exposure.

## Roles stored by the contract

- owner
- admin
- sales
- operations
- editor
- viewer

These values are data only in Phase 03. They grant no database/API privileges until the dedicated security phase.

## Migration rules

- Never apply this migration automatically to an unknown database.
- Never point it at the legacy marketplace database without inventory/backup evidence.
- Test on an isolated Supabase/local PostgreSQL environment first.
- Run `supabase test db` or equivalent pgTAP execution before live use.
- Run Supabase security and performance advisors after DDL changes when a project exists.
- Capture the target project ID, schema baseline, backup/rollback method, and migration ID before any live apply.
- Do not expose custom schemas to PostgREST until RLS and grants are verified.

## First runtime consumer

The lead revenue circuit should be the first application to use this foundation:

```text
public quote form
→ server-side validation
→ server resolves tenant
→ contact/company dedupe
→ lead creation
→ event brief
→ audit event
→ owner notification
```

The browser must never be trusted to select arbitrary tenant IDs or write directly with privileged credentials.

## Legacy relationship

The root Prisma DJ marketplace schema remains untouched. No table in this migration depends on marketplace `User`, `DjProfile`, `Booking`, `GearItem`, `Transaction`, `Review`, or `Subscription` models.

Retirement or migration of legacy data is a separate bounded change after dependency and data inventory.
