# Change: add-tenant-data-foundation

## Objective

Create the additive tenant-aware PostgreSQL data foundation for the Sovereign AV Business OS without modifying, deleting, or migrating the existing DJ marketplace schema or production data.

## Commercial value

This establishes the durable record contract required for the first revenue circuit: tenants, staff membership, contacts, companies, leads, event briefs, conversations, services, and audit evidence. The same schema becomes reusable for future audiovisual/event-production tenants on owner-controlled infrastructure.

## In scope

- add a versioned portable PostgreSQL 16+ migration for the new business domain;
- place new tables in dedicated non-exposed schemas with no browser/API grants in this phase;
- create tenant-aware CRM foundation tables, constraints, and indexes;
- add pgTAP-compatible structural tests plus vendor-neutral verification SQL;
- add checksum-tracked migration execution tooling;
- add backup/restore scripts and a local PostgreSQL verification harness;
- add CI verification against stock PostgreSQL 16;
- document self-hosted deployment, bootstrap, ownership, backup, restore, and migration safety rules;
- do not connect the current public site to the new schema yet.

## Out of scope

- connecting or mutating the owner's real server before access is intentionally provided;
- applying migrations to production;
- Row Level Security policies, browser/API grants, or auth-role mapping;
- modifying existing root Prisma marketplace models;
- changing current authentication flows;
- adding browser database clients or secrets;
- lead-form runtime integration;
- booking/proposal/project tables beyond the minimum event-brief foundation;
- payments;
- destructive migrations.

## Acceptance criteria

1. New schema is additive and does not reference or alter legacy marketplace tables.
2. New business tables live in dedicated schemas that are not exposed to PUBLIC/browser roles by this migration.
3. All tenant-owned data tables include `tenant_id` and appropriate tenant/query indexes.
4. Cross-tenant foreign-key relationships are structurally constrained where records reference one another.
5. Audit records are modeled separately from ordinary business tables.
6. PostgreSQL verification asserts required schemas, tables, keys, constraints, indexes, trigger behavior, non-exposure, and cross-tenant rejection.
7. Migration execution records immutable filename + checksum and safely skips already-applied matching migrations.
8. No authenticated/anonymous grants, RLS policies, or live auth changes are introduced in this phase.
9. No production database migration is executed until the real server is inventoried, backed up, and separately approved.
10. Existing public production remains unchanged.

## Risk

MEDIUM for repository changes because this introduces the future database contract, but LOW operational impact until the migration is applied. Auth/authorization/exposure and live migration are separate HIGH-risk gates with independent verification and explicit human approval before destructive execution.
