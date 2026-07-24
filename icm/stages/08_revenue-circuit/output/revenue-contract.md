# Stage 08 — Revenue circuit

## Circuit
`Consulta/La Genio → intake idempotente → contacto/oportunidad + brief → outbox durable → seguimiento → booking/visita → propuesta versionada → aprobación humana → envío → aceptación → proyecto confirmado`

## Safety
- Tenant is resolved server-side; clients cannot choose tenant, status, role, price, or currency.
- Lead durability is independent of notification-provider success.
- Idempotency receipts prevent duplicate lead creation on retries.
- Booking conflicts are tenant/resource/time scoped and enforced in PostgreSQL with advisory transaction locks.
- Money is stored as integer minor units.
- Agents may draft/request approval; they cannot approve a proposal.
- A confirmed project snapshots the accepted immutable proposal version.
- Real owner server remains disconnected; migration is verified only in disposable PostgreSQL CI until infrastructure/security stages.
