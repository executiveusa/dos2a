# dos A — MIGRATION HANDOFF

## Current state

Repository: `https://github.com/executiveusa/dos2a`
Default branch: `master`
Production URL: `https://dos2a.vercel.app`
Current production database provider: Supabase managed PostgreSQL
Supabase project: `botanic-creations`
Project ref: `cyxdevcjycmffhmwxojh`
App schema: `dosa`
Auth: not required for public lead intake
Storage: none required for current dos A V1

## Capacity reason

Last observed database footprint: approximately 11 MB.
Last observed storage objects: 0.
Risk: LOW.
Migration trigger: 70–80% capacity, performance/privacy/commercial isolation need, independent backups, or explicit owner request.

## Data inventory

Tables:
- `dosa.leads`
- `dosa.event_briefs`
- `dosa.intake_requests`
- `dosa.audit_log`

Function:
- `public.dosa_create_public_lead(...)`

RLS:
- enabled + forced on every `dosa.*` table
- explicit deny policies for anon/authenticated CRUD

Edge Function:
- `dosa-lead-intake`

Shared registry:
- `platform.app_registry` row where `app_slug='dos-a'`

## Environment variable names

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_API_URL
DATABASE_URL
DB_ADMIN_URL
INTERNAL_API_TOKEN
```

Names only. Never copy secret values into this file.

## Migration Placement Answers

Not yet requested. When migration is requested, resolve:

1. destination server;
2. existing self-hosted Supabase vs Postgres vs new stack;
3. dedicated database vs isolated schema;
4. production domain;
5. auth migration requirement;
6. storage migration requirement;
7. downtime tolerance;
8. managed Supabase rollback-retention period.

## Secret source

When operating from an environment that actually has the Windows drive mounted, secrets may be read only from:

```text
E:\THE PAULI FILES\Cosmos_Vault.env
```

Never print, echo, commit, log, screenshot, or expose values. Cloud sessions must not assume this path exists.

## Export

```bash
pg_dump --schema=dosa --format=custom "$SOURCE_DATABASE_URL" > dosa.dump
```

Also export the server-only function definition and app registry row.

## Import

```bash
pg_restore --dbname="$DEST_DATABASE_URL" dosa.dump
```

Reapply least-privilege grants and deploy the Edge Function/runtime equivalent.

## Verification

- [ ] row counts match
- [ ] RLS enabled and forced
- [ ] explicit deny policies present
- [ ] anon direct reads/writes denied
- [ ] authenticated direct reads/writes denied
- [ ] server lead RPC works
- [ ] same idempotency key + same payload deduplicates
- [ ] same idempotency key + different payload rejects
- [ ] cross-app access denied
- [ ] production form persists a lead
- [ ] rollback remains available

## Final status

Managed Supabase is the current production source and must be retained until any future migration is accepted after full verification.
