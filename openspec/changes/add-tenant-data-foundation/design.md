# Design: add-tenant-data-foundation

## Database strategy

Use a dedicated owner-controlled PostgreSQL/Supabase project for the Sovereign AV Business OS when the owner confirms the target organization. The repository migration is the source-controlled schema contract.

Do not mutate the legacy root Prisma marketplace schema. The new migration is additive and independent.

## Schema boundaries

Keep data isolated in dedicated schemas that are not exposed to browser/API roles in this phase:

- `app_core` — tenant and membership records;
- `crm` — contacts, companies, leads, event briefs, services;
- `comms` — conversations and messages;
- `agent_audit` — agent identities and audit events.

No `anon` or `authenticated` grants are added in this migration. RLS/auth exposure is a separate security phase that must be tested before any schema is exposed through the API.

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

Where one tenant-owned table references another, use composite `(tenant_id, id)` keys/constraints so a record cannot point at another tenant's contact, company, lead, service, conversation, or agent identity even before RLS is introduced.

The database therefore enforces tenant consistency as data integrity, while the later auth/RLS phase enforces who may read or mutate each tenant.

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

`agent_audit.audit_events` is structurally separated from ordinary CRM data. The later security phase will make it append-only from the application perspective and restrict direct writes to trusted server-side operations.

## Data minimization

Contacts store only business-operational information needed for inquiry/client workflows. Sensitive secrets, payment credentials, private API keys, and model-provider keys are not stored in CRM tables.

## Migration safety

- migration is additive;
- no DROP/ALTER against legacy marketplace tables;
- no production apply in this PR;
- no browser/API grants;
- no auth references or RLS policies;
- test on a local/dev Supabase database before live apply;
- capture a separate live-database backup/rollback receipt immediately before any future live migration.

## Testing

Use Supabase CLI/pgTAP-compatible SQL tests to assert:

- required schemas and tables exist;
- tenant/member primary keys and role/status constraints exist;
- tenant-owned tables have `tenant_id`;
- same-tenant composite foreign keys exist for key cross-table relationships;
- no accidental tables are created in the legacy Prisma model;
- no browser/API grants are introduced by this migration.

Behavioral RLS and cross-tenant authorization tests belong to the later security/auth phase. Structural same-tenant foreign-key tests are required here.

## Future auth/security phase

Before any of these schemas are exposed to PostgREST/browser clients:

1. map authenticated users to tenant memberships;
2. add RLS to every exposed table;
3. add schema-qualified authorization helpers in a non-exposed schema;
4. grant only required privileges;
5. test positive and negative cross-tenant access with pgTAP/client tests;
6. verify no user can self-elevate roles;
7. verify tenant deletion and audit mutation remain protected.

That phase is HIGH risk because it establishes an authorization boundary and requires explicit human approval before merge/live application.

## Future runtime integration

The first runtime consumer should be the lead/CRM revenue circuit. The public website submits to a server-side endpoint, which validates input, resolves the tenant server-side, writes one durable lead/contact/event-brief transaction, creates an audit event, and triggers owner notification. The browser must never be trusted to choose an arbitrary `tenant_id`.
