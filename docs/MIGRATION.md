# dos A — Database Migration and Portability

## Current database

- Provider: Supabase managed PostgreSQL
- Project: `botanic-creations`
- Project ref: `cyxdevcjycmffhmwxojh`
- App schema: `dosa`
- Registry slug: `dosa`
- Shared schema used: `platform` only for `platform.app_registry`
- Forbidden cross-app schema: `chispa`
- Auth users required for public lead intake: none
- Storage required for current dos A V1: none

## Source of truth

All dos A database changes must exist under `supabase/migrations/`.

Current Supabase-specific production migrations:

- `20260724072000_dosa_supabase_lead_intake.sql`
- `20260724073500_dosa_explicit_deny_rls_policies.sql`
- `20260724074500_dosa_intake_requests_lead_index.sql`
- `20260724075000_dosa_restrictive_policies_and_rate_limit.sql`

The Edge Function source is under:

- `supabase/functions/dosa-lead-intake/index.ts`

## Data inventory

### Tables

- `dosa.leads`
- `dosa.event_briefs`
- `dosa.intake_requests`
- `dosa.audit_log`

### Functions

- `public.dosa_create_public_lead(...)`

The function is server-only. `EXECUTE` must remain revoked from `PUBLIC`, `anon`, and `authenticated`, and granted only to `service_role` or an equivalent least-privilege server identity after migration.

### RLS

All `dosa.*` tables have RLS enabled and forced. Explicit **RESTRICTIVE** deny policies exist for SELECT, INSERT, UPDATE, and DELETE for `anon` and `authenticated`. Browser clients must not write directly to these tables.

## Migration preflight

Provision the migration-only URLs in a secure environment and fail closed before any export or import:

```bash
: "${SOURCE_DATABASE_URL:?SOURCE_DATABASE_URL is required}"
: "${DEST_DATABASE_URL:?DEST_DATABASE_URL is required}"
```

Confirm both endpoints are the approved source/destination before continuing.

## Export

```bash
pg_dump --schema=dosa --format=custom "$SOURCE_DATABASE_URL" > dosa.dump
```

Also export the function definition for `public.dosa_create_public_lead` and the `platform.app_registry` row for `app_slug='dosa'`.

## Import

```bash
pg_restore --dbname="$DEST_DATABASE_URL" dosa.dump
```

Then apply/verify server-only function grants, Edge Function/runtime integration, and the registry entry.

## Verification after migration

- required `dosa` tables exist;
- RLS enabled and forced;
- exact restrictive deny-policy matrix present;
- `anon` and `authenticated` have no table grants on `dosa.*`;
- only approved server role can execute `public.dosa_create_public_lead`;
- controlled lead creation succeeds;
- exact idempotency replay returns the original lead as duplicate;
- mismatched payload reuse is rejected;
- proactive rate limiting works when source-IP hash is present;
- `chispa.*` remains inaccessible to dos A runtime;
- production quote form succeeds only after durable save.

## Rollback

Keep the managed Supabase source available until the destination passes all verification gates. Application rollback is a Vercel deployment rollback plus restoring the previous API target if changed. Database migration rollback should restore from a pre-migration backup rather than attempting destructive reverse DDL on customer data.

## Migration trigger

Plan migration before database or storage reaches roughly 70–80% capacity, or sooner for privacy, performance, independent backup, commercial criticality, or explicit owner request.
