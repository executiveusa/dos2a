# Design: add-tenant-data-foundation

## Database strategy

Use owner-controlled PostgreSQL 16+ as the durable data platform for the Sovereign AV Business OS. The repository migration is the source-controlled schema contract and must not depend on a hosted vendor-specific runtime.

Do not mutate the legacy root Prisma marketplace schema. The new migration is additive and independent.

## Schema boundaries

Keep data isolated in dedicated schemas that are not exposed to browser/API roles in this phase:

- `app_core` — tenant and membership records;
- `crm` — contacts, companies, leads, event briefs, services;
- `comms` — conversations and messages;
- `agent_audit` — agent identities and audit events.

No public/browser grants are added in this migration. Authentication/authorization exposure is a separate security phase that must be tested against the actual self-hosted runtime before any schema is made externally reachable.

## Foundation tables

### `app_core`
- `tenants`
- `tenant_memberships`

### `crm`
- `contacts`
- `companies`
- `lead_sources`
- `leads`
- `event_briefs`
- `services`
- `lead_services`

### `comms`
- `conversations`
- `messages`

### `agent_audit`
- `agent_identities`
- `audit_events`

Booking, proposals, projects, approvals, vendors, crew, assets, content, backups, and exports are introduced in later bounded migrations.

## Tenant integrity

All tenant-owned records include `tenant_id` with a foreign key to `app_core.tenants(id)`.

Where one tenant-owned table references another, use composite `(tenant_id, id)` keys/constraints so a record cannot point at another tenant's contact, company, lead, service, conversation, or agent identity even before runtime authorization is introduced.

The database therefore enforces tenant consistency as data integrity, while the later security phase enforces who may read or mutate each tenant.

## Membership roles

The data contract allows these initial roles:

- `owner`
- `admin`
- `sales`
- `operations`
- `editor`
- `viewer`

This phase stores role data only. It does not grant database/API privileges based on these values.

## Bootstrap rule

Tenant creation and initial owner membership will be a server-side, audited onboarding operation in a later phase. No browser-accessible bootstrap function or self-elevation path is created here.

## Audit rule

`agent_audit.audit_events` is structurally separated from ordinary CRM data. The later security phase will make application access append-only and restrict direct writes to trusted server-side operations.

## Data minimization

Contacts store only business-operational information needed for inquiry/client workflows. Sensitive secrets, payment credentials, private API keys, model-provider keys, SSH material, and infrastructure secrets are not stored in CRM tables.

## Migration execution model

The repository migration runner:

- discovers versioned `.sql` migrations in lexical order;
- creates `app_meta.schema_migrations` outside the business schemas;
- stores each migration filename and SHA-256 checksum;
- skips an already-applied migration only when the checksum matches;
- stops on checksum drift so an applied migration cannot be silently rewritten.

Production migration execution is never tied automatically to merge/deploy.

## Migration safety

- migration is additive;
- no DROP/ALTER against legacy marketplace tables;
- no production apply in this PR;
- no browser/API grants;
- no auth-provider coupling or authorization policies;
- verify against stock PostgreSQL 16 in CI and an isolated local/dev database;
- capture a separate live-database backup/rollback receipt immediately before any future production migration;
- require a successful restore drill before claiming disaster recovery readiness.

## Testing

Two complementary test layers are stored:

1. pgTAP-compatible structural assertions for environments with pgTAP;
2. vendor-neutral PostgreSQL verification SQL used by CI.

Verification asserts:

- required schemas and tables exist;
- tenant/member primary keys and role/status constraints exist;
- tenant-owned tables have `tenant_id`;
- same-tenant composite foreign keys exist for key cross-table relationships;
- an attempted cross-tenant association is rejected by PostgreSQL;
- `updated_at` triggers execute;
- required indexes exist;
- business schemas do not grant implicit `PUBLIC` usage;
- migration execution is repeat-safe;
- schema-only dump succeeds.

Behavioral cross-tenant authorization tests belong to the later security/auth phase. Structural same-tenant foreign-key tests are required here.

## Self-hosted server boundary

Before the real server is connected, repository work may define:

- environment contracts without secrets;
- local Docker/PostgreSQL harnesses;
- migration/backup/restore tooling;
- container and reverse-proxy templates;
- CI verification;
- API/domain contracts.

It may not invent or commit real server credentials, mutate unknown infrastructure, expose PostgreSQL publicly, or assume a production topology that has not been inventoried.

## Future auth/security phase

Before these schemas are exposed through any API:

1. define the server-side identity provider/session model;
2. map authenticated users to tenant memberships;
3. create least-privilege database identities and grants;
4. enforce authorization in the trusted server layer and, where chosen, PostgreSQL policies/functions;
5. test positive and negative cross-tenant access;
6. verify no user can self-elevate roles;
7. verify tenant deletion and audit mutation remain protected;
8. verify agents act through governed tools rather than unrestricted SQL.

That phase is HIGH risk because it establishes an authorization boundary and requires explicit approval before live application.

## Future runtime integration

The first runtime consumer should be the lead/CRM revenue circuit. The public website submits to a server-side endpoint, which validates input, resolves the tenant server-side, writes one durable contact/lead/event-brief transaction, creates an audit event, and triggers owner notification. The browser must never be trusted to choose an arbitrary `tenant_id`.
