# Tenant Data Foundation

## Purpose

Provide one reusable data contract for dos A and future Sovereign AV Business OS tenants without inheriting the unrelated DJ marketplace schema and without requiring a hosted database vendor.

The Phase 03 migration targets portable PostgreSQL 16+. It can run on owner-controlled infrastructure. The current `supabase/migrations/` path is a repository convention inherited from the earlier plan; the SQL itself does not require Supabase.

## Current safety posture

The migration creates dedicated, non-public business schemas:

- `app_core`
- `crm`
- `comms`
- `agent_audit`

The migration intentionally adds **no browser/API grants and no auth/RLS policies**. These schemas must remain private until the dedicated authorization phase is accepted and tested against the actual server/runtime identity model.

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

This is structural data-integrity isolation. Authorization isolation is implemented separately before any external API/browser access is enabled.

## Roles stored by the contract

- owner
- admin
- sales
- operations
- editor
- viewer

These values are data only in Phase 03. They grant no database/API privileges until the dedicated security phase.

## Migration execution

Use the repository migration runner:

```bash
export DB_ADMIN_URL='postgresql://...'
bash scripts/db/migrate.sh
```

The runner:

- sorts versioned SQL migrations;
- creates `app_meta.schema_migrations`;
- records filename + SHA-256 checksum;
- skips an already-applied migration when the checksum matches;
- stops if an applied migration file has changed.

Never edit an applied migration. Add a new forward migration.

## Verification

Portable verification does not require a hosted service:

```bash
docker compose -f infra/postgres/docker-compose.dev.yml up -d
export DB_ADMIN_URL='postgresql://postgres:postgres@127.0.0.1:54329/dosa_os'
bash scripts/db/migrate.sh
bash scripts/db/migrate.sh
psql "$DB_ADMIN_URL" --set=ON_ERROR_STOP=1 --file=scripts/db/verify_foundation.sql
```

The verification checks:

- required schemas/tables exist;
- business schemas are not implicitly exposed to `PUBLIC`;
- same-tenant foreign keys reject a cross-tenant association;
- `updated_at` triggers execute;
- required indexes and integrity constraints exist;
- the migration runner is repeat-safe.

A GitHub Actions PostgreSQL 16 service runs the same repository-level verification on relevant changes.

The pgTAP test file remains available for environments that install pgTAP, but production acceptance does not depend on Supabase-specific tooling.

## Migration rules

- Never apply a migration automatically to an unknown database.
- Never point it at the legacy marketplace database without inventory/backup evidence.
- Test on an isolated PostgreSQL environment first.
- Capture database baseline, backup/rollback method, migration checksums, and verification evidence before any live apply.
- Do not expose business schemas until authentication, authorization, and least-privilege grants are verified.
- Do not give agents broad direct SQL credentials.

## Backup and restore

Repository scripts:

```text
scripts/db/backup.sh
scripts/db/restore.sh
```

`backup.sh` creates a compressed SQL backup and checksum. `restore.sh` requires an explicit destructive-operation confirmation token and should target an isolated restore database during recovery drills.

See `docs/SELF-HOSTED-SERVER.md`.

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
