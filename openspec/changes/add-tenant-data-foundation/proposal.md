# Change: add-tenant-data-foundation

## Objective

Create the additive tenant-aware PostgreSQL/Supabase data foundation for the Sovereign AV Business OS without modifying, deleting, or migrating the existing DJ marketplace schema or production data.

## Commercial value

This establishes the durable record contract required for the first revenue circuit: tenants, staff membership, contacts, companies, leads, event briefs, conversations, services, and audit evidence. The same schema becomes reusable for future audiovisual/event-production tenants.

## In scope

- add a versioned SQL migration for the new business domain;
- place new tables in dedicated non-exposed schemas with no browser/API grants in this phase;
- create tenant-aware CRM foundation tables, constraints, and indexes;
- add database structure/integrity tests using pgTAP conventions;
- document bootstrap, ownership, and migration safety rules;
- do not connect the current public site to the new schema yet.

## Out of scope

- creating or changing a live Supabase project without explicit organization confirmation;
- applying migrations to production;
- Row Level Security policies, browser/API grants, or auth-role mapping;
- modifying existing root Prisma marketplace models;
- changing current authentication flows;
- adding browser Supabase clients or secrets;
- lead-form runtime integration;
- booking/proposal/project tables beyond the minimum event-brief foundation;
- payments;
- destructive migrations.

## Acceptance criteria

1. New schema is additive and does not reference or alter legacy marketplace tables.
2. New business tables live in dedicated schemas that are not exposed to browser roles by this migration.
3. All tenant-owned data tables include `tenant_id` and appropriate tenant/query indexes.
4. Cross-tenant foreign-key relationships are structurally constrained where records reference one another.
5. Audit records are modeled separately from ordinary business tables.
6. Database tests assert required schemas, tables, keys, and constraints.
7. No authenticated/anonymous grants, RLS policies, or live auth changes are introduced in this phase.
8. No production database migration is executed until a Supabase target is explicitly confirmed and a safe test environment is available.
9. Existing public production remains unchanged.

## Risk

MEDIUM for repository changes because this introduces the future database contract, but LOW operational impact until the migration is applied. Auth/RLS/exposure and live migration are separate HIGH-risk gates with independent verification and explicit human approval before merge or destructive execution.
