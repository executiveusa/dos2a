# Change: add-tenant-data-foundation

## Objective

Create the additive tenant-aware PostgreSQL/Supabase data foundation for the Sovereign AV Business OS without modifying, deleting, or migrating the existing DJ marketplace schema or production data.

## Commercial value

This establishes the durable record system required for the first revenue circuit: tenants, staff membership, contacts, companies, leads, event briefs, conversations, services, and audit evidence. The same schema becomes reusable for future audiovisual/event-production tenants.

## In scope

- add versioned Supabase SQL migration files for the new business domain;
- implement tenant isolation with Row Level Security;
- create narrow role helpers in a non-exposed `private` schema;
- create CRM foundation tables and indexes;
- add database structure/policy tests using pgTAP conventions;
- document bootstrap, ownership, and migration safety rules;
- do not connect the current public site to the new schema yet.

## Out of scope

- creating or changing a live Supabase project without explicit organization confirmation;
- applying migrations to production;
- modifying existing root Prisma marketplace models;
- changing current authentication flows;
- adding browser Supabase clients or secrets;
- lead-form runtime integration;
- booking/proposal/project tables beyond the minimum event-brief foundation;
- payments;
- destructive migrations.

## Acceptance criteria

1. New schema is additive and does not reference or alter legacy marketplace tables.
2. All tenant-owned data tables include `tenant_id` and indexes appropriate for tenant filtering.
3. RLS is enabled for exposed business tables.
4. Membership/role checks are centralized in schema-qualified helper functions rather than copied ad hoc into every policy.
5. No authenticated client can delete a tenant through an RLS policy.
6. Audit events are append-only from the application perspective and are not writable directly by ordinary authenticated browser users.
7. Database tests assert required tables and policy inventory.
8. No production database migration is executed in this phase until a Supabase target is explicitly confirmed and a safe test environment is available.
9. Existing public production remains unchanged.

## Risk

MEDIUM for repository changes because this introduces future database contracts, but LOW operational impact until migrations are applied. Applying the migration to a live database or changing authentication/permissions is a separate HIGH-risk gate and requires explicit confirmation and verification.
