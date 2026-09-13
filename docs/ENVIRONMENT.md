# dos A — Environment Contract

Names only. Never commit secret values.

## Frontend

Current production frontend does not require a Supabase browser key. Lead submission calls the public Supabase Edge Function endpoint directly.

Optional compatibility variable retained by older code paths:

```text
NEXT_PUBLIC_API_URL
```

Do not set it to a privileged/internal database endpoint.

## Supabase Edge Function

Provided by Supabase runtime:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

`SUPABASE_SERVICE_ROLE_KEY` is privileged and must remain server-side only.

## Production identity

```text
APP_SLUG=dosa
APP_SCHEMA=dosa
PRODUCTION_URL=https://dos2a.vercel.app
```

These are documentation identifiers, not required runtime secrets.

## Migration-only variables

Provision these only in a secure migration-capable environment. They must never be exposed to browser code or committed:

```text
SOURCE_DATABASE_URL
DEST_DATABASE_URL
```

Preflight before export/import:

```bash
: "${SOURCE_DATABASE_URL:?SOURCE_DATABASE_URL is required}"
: "${DEST_DATABASE_URL:?DEST_DATABASE_URL is required}"
```

`SOURCE_DATABASE_URL` points to the current managed Supabase/PostgreSQL source with permissions sufficient to export the dos A schema. `DEST_DATABASE_URL` points to the approved migration destination with permissions sufficient to restore and verify it.

## Future self-hosted runtime

A self-hosted runtime may introduce server-side names such as:

```text
DATABASE_URL
DB_ADMIN_URL
INTERNAL_API_TOKEN
```

No values belong in Git. The managed Supabase source remains rollback until a migrated target passes row-count, RLS, function-grant, idempotency, and production smoke verification.
