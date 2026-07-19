# Phase 03 — Tenant Data Foundation

## Objective

Create an additive, reusable tenant-aware business data contract without touching legacy marketplace tables or creating a live authorization boundary.

## Commercial outcome

Prepare the durable records required for the first revenue circuit: tenant, membership, contact, company, lead, event brief, service request, conversations, and audit evidence.

## Approved scope

- dedicated non-exposed PostgreSQL schemas;
- additive migration only;
- tenant-aware constraints and indexes;
- structural pgTAP tests;
- no runtime connection yet.

## Explicitly deferred

- Supabase Auth mapping;
- RLS policies;
- anon/authenticated grants;
- browser Supabase client;
- production secrets;
- live project migration;
- lead form integration;
- bookings/proposals/projects;
- payments.

## Architecture

```text
app_core
├── tenants
└── tenant_memberships

crm
├── companies
├── contacts
├── lead_sources
├── leads
├── event_briefs
├── services
└── lead_services

comms
├── conversations
└── messages

agent_audit
├── agent_identities
└── audit_events
```

## Integrity rule

Every tenant-owned record carries `tenant_id`. Cross-tenant-capable references use composite same-tenant foreign keys. The schema should make cross-tenant relationships invalid at the database-integrity layer even before authorization is introduced.

## Migration rule

Do not apply against production in this phase. First create or identify an approved isolated test database, apply the migration there, execute pgTAP tests, inspect Supabase security/performance advisors, and repair findings.

## Supabase discovery

The connected Supabase account currently exposes one organization named `executiveusa@gmail.com` with ID `yqcqxdgcnbzdpeevzykk`. No active dos A project was found in the current project list. Project creation reports a current cost of 0 monthly, but tool policy still requires explicit organization confirmation before creating the project.

## Acceptance criteria

- migration is additive;
- no legacy Prisma table altered;
- no auth/RLS/grant exposure added;
- structural tests exist and pass in an isolated test database before PR merge;
- public production remains unchanged;
- a separate high-risk auth/RLS phase is created before browser/API exposure.

## Stop condition

Pause for human confirmation before creating the Supabase project because the connector requires explicit organization choice. Pause again before any later HIGH-risk auth/RLS/live migration merge.

## Rollback

Before live application: repository rollback is simply revert/remove the additive migration commit.

After any future test/live application: use a separate migration rollback/backup receipt; never assume dropping schemas is safe if data exists.
