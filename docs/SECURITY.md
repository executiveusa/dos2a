# dos A — Security Boundary

## Public surface

- Vercel public website: `https://dos2a.vercel.app`
- Supabase Edge Function: `dosa-lead-intake`
- Public lead intake is unauthenticated by design, but validates input, limits payload size, uses a honeypot field, hashes source IP when available, and writes only through a narrowly scoped server path.

## Private data boundary

All dos A transactional data lives in schema `dosa`.

The browser has no direct access to `dosa.*` tables. `anon` and `authenticated` have no table grants. RLS is enabled and forced, with explicit **RESTRICTIVE** deny policies for SELECT/INSERT/UPDATE/DELETE.

## Privileged write path

`public.dosa_create_public_lead(...)` is `SECURITY DEFINER` and executable only by `service_role`. The service-role key exists only in the Supabase Edge Function environment and must never be exposed in frontend code, logs, documentation, screenshots, or issues.

## Cross-app isolation

- Allowed app schema: `dosa`
- Shared schema: `platform` only for the application registry
- Forbidden unrelated app schema: `chispa`
- No dos A runtime code should query unrelated app schemas.

## Abuse controls

Current V1 controls:

- POST/OPTIONS only;
- 32 KB request limit;
- field length limits;
- email/date/guest-count validation;
- honeypot bot field;
- idempotency key validation;
- payload-hash mismatch rejection;
- source IP stored only as SHA-256 hash when provided;
- proactive database rate limit: at most 10 newly persisted requests per hashed source IP in a rolling 10-minute window;
- HTTP 429 returned by the Edge Function when that limit is reached;
- no-store API responses;
- controlled CORS origins.

When an upstream request does not provide a usable source IP, the database IP rate limit cannot apply. Operational owner: The Pauli Effect. Monitor Supabase Edge Function error/status logs and `dosa.intake_requests` volume; investigate sustained spikes or repeated 429 responses. A future platform/WAF limit may be added as defense in depth. Rollback of the database limit requires an explicit forward migration and should occur only if verified false positives materially block legitimate client inquiries.

## Required security verification

- anonymous direct table access denied;
- authenticated direct table access denied;
- service-role RPC execution allowed;
- non-service roles cannot execute RPC;
- exact idempotency replay returns the same lead;
- changed payload under the same idempotency key fails;
- restrictive policy mode and exact predicates verified;
- proactive rate limit enforced when source-IP hash is present;
- test data is removed after acceptance testing;
- Supabase security advisor reviewed after DDL changes;
- no browser-visible privileged secrets.

## Known unrelated shared-project advisor findings

Supabase may report findings for other applications in the shared project, including Botanical storage/functions. These are not dos A permissions and must be remediated in their owning app without broadening dos A access.
