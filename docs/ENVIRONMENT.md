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
APP_SLUG=dos-a
APP_SCHEMA=dosa
PRODUCTION_URL=https://dos2a.vercel.app
```

These are documentation identifiers, not required runtime secrets.

## Future migration

A self-hosted migration may introduce server-side names such as:

```text
DATABASE_URL
DB_ADMIN_URL
INTERNAL_API_TOKEN
```

No values belong in Git. The managed Supabase source remains rollback until a migrated target passes row-count, RLS, function-grant, idempotency, and production smoke verification.
