# Route Inventory — Current Repository

This inventory describes the two current Next.js surfaces. It is a migration aid, not a claim that every route is production-supported.

## Current deployed `frontend/`

| Route | Purpose | Decision |
|---|---|---|
| `/` | dos A audiovisual marketing site | KEEP as migration baseline |
| `/chat` | public browser-side BYOK AI chat/provider dashboard | REMOVE FROM PUBLIC after governed private replacement exists |

The public home currently contains anchor-driven sections for services, packages, process, FAQ, and quote/contact intake.

## Root application — DJ marketplace product

Observed page route families include:

| Route | Current purpose | Decision |
|---|---|---|
| `/` | DJ marketplace/subscription landing page | PARK |
| `/analytics` | marketplace/user analytics | PARK |
| `/book/[username]` | DJ booking | PARK |
| `/bookings` | marketplace bookings | PARK |
| `/collaborate` | collaboration/team workflow | PARK |
| `/login` | marketplace authentication | PARK pending auth replacement decision |
| `/register` | marketplace registration/subscription onboarding | PARK |
| `/marketplace/djs` | DJ discovery marketplace | PARK |
| `/marketplace/gear` | gear marketplace | PARK |
| `/payment/[bookingId]` | marketplace payment flow | PARK; do not reuse without separate payment specification |
| `/profile/[username]` | marketplace public profile | PARK |

Observed root API route families from the repository audit include authentication/registration, marketplace DJs/gear, bookings/payment, profiles, reviews, analytics, payouts, Stripe webhooks, and agent endpoints. These belong to the parked marketplace product unless a future accepted spec explicitly proves a reusable component should be extracted.

## Target public route families

The future `apps/web` should own business-facing routes such as:

```text
/
/servicios
/servicios/[slug]
/eventos
/eventos/[slug]
/portafolio
/casos/[slug]
/blog
/blog/[slug]
/cotizar
```

Exact route creation belongs to later accepted frontend/content specifications.

## Target private route families

The future `apps/admin` should own authenticated operations such as:

```text
/admin
/admin/leads
/admin/clientes
/admin/reservas
/admin/propuestas
/admin/proyectos
/admin/contenido
/admin/aprobaciones
/admin/agente
/admin/reportes
/admin/configuracion
```

The target owner-agent experience replaces the public `/chat`; it must not require customers or owners to paste provider API keys into browser local storage.

## Deletion rule

No parked route or API may be deleted solely because it appears obsolete. Before removal:

1. search imports/callers and deployment references;
2. identify data dependencies;
3. verify no production traffic/consumer requires it;
4. create a rollback baseline;
5. remove in a bounded migration PR;
6. build/test/verify after removal.
