# Design: define-canonical-architecture

## Current-state decision

The repository contains two materially different products.

### A. `frontend/` — KEEP as current public baseline

This is the currently deployed dos A company website surface. It contains the public home page, navigation, hero, services, pricing/package section, process, FAQ, contact, footer, and a public `/chat` experiment.

Decision:
- KEEP the public website implementation as the migration baseline.
- MIGRATE it later to canonical `apps/web` without a big-bang rewrite.
- REMOVE-FROM-PUBLIC the current BYOK `/chat` route when a governed private agent/admin surface exists.

### B. root Next.js application — PARK

The root app is a DJ marketplace/subscription product. It includes marketplace routes, DJ profiles, user registration/login, bookings, payments, gear, analytics, collaboration, subscriptions, reviews, and marketplace-oriented agent logic.

Decision:
- PARK as non-production legacy/experimental product code.
- Do not extend it as the dos A business operating system.
- Do not delete it in this phase.
- Do not migrate its claims, fake/unsupported marketplace metrics, pricing tiers, or marketplace assumptions into dos A.

### C. root Prisma schema — REPLACE FOR NEW PRODUCT, PRESERVE UNTIL MIGRATION

The existing schema is tightly coupled to DJs, marketplace bookings, gear rental, subscriptions, reviews, Stripe marketplace payments, and user roles.

Decision:
- Do not mutate it destructively in place.
- Define a new tenant-aware business data model in the next data-foundation phase.
- Preserve legacy schema until migration/retirement is verified.
- No existing data may be assumed disposable without an explicit inventory and backup.

### D. README backend claims — MARK STALE/UNVERIFIED

The README claims a Rust/Axum `backend/` and completed backend/agent phases, but `backend/Cargo.toml` is absent.

Decision:
- Treat README architecture/completion claims as unverified historical documentation.
- Correct README only after the canonical migration plan is implemented enough to describe reality accurately.

## Target architecture

```text
apps/
├── web/                 # public dos A / tenant marketing site
├── admin/               # authenticated owner operations console
├── agent-gateway/       # governed server-side tools, permissions, approvals
├── content-studio/      # isolated Payload CMS and editorial operations
└── worker/              # async jobs, notifications, retries, exports

packages/
├── auth/
├── database/
├── design-system/
├── brand/
├── tenant-config/
├── crm/
├── bookings/
├── proposals/
├── projects/
├── content-client/
├── permissions/
├── agent-tools/
├── integrations/
├── observability/
└── validation/

legacy/
└── dj-marketplace/      # target archival location only after verified migration
```

The `legacy/` move is a future implementation step, not part of this documentation-only phase.

## Runtime boundaries

### `apps/web`
- public and independently deployable;
- read-optimized;
- no browser-exposed business secrets;
- continues functioning when agent/CMS services are unavailable;
- owns public service, event, portfolio, case-study, blog, and quote-entry routes.

### `apps/admin`
- authenticated;
- role-based;
- conventional record views plus agent/chat assistance;
- owns leads, clients, bookings, proposals, projects, approvals, content queue, reports, and settings.

### `apps/agent-gateway`
- server-side only;
- tenant-aware tool allowlist;
- validates schemas and permissions;
- creates audit events;
- does not expose arbitrary database, shell, deployment, or code-edit capabilities.

### `apps/content-studio`
- isolated Payload application;
- separate auth and content permissions;
- drafts/versions/review workflow;
- scoped MCP; no unrestricted CRM/payment/secret access.

### `apps/worker`
- background jobs only;
- retries and idempotency;
- notifications, exports, content processing, connector jobs.

## Migration sequence

1. Preserve current production and rollback SHA/deployment.
2. Define tenant-aware data/auth foundation without deleting legacy schema/data.
3. Build first revenue circuit alongside existing public site.
4. Introduce authenticated admin and governed agent gateway.
5. Introduce isolated content studio.
6. Migrate the current `frontend/` public site into `apps/web` only after behavior parity is proven.
7. Remove public BYOK chat only after replacement owner/admin agent experience is functional.
8. Archive root marketplace code only after no production/build/runtime dependency references it.
9. Update README and deployment documentation to match verified reality.

## Safety constraints

- No big-bang directory migration.
- No destructive Prisma migration in the architecture phase.
- No reuse of marketplace metrics/claims as dos A proof.
- No client-facing secrets or AI provider keys in localStorage.
- No final price, discount, booking commitment, or publication authority given to the agent without approval policy.
- Public website availability must not depend on Hermes or Payload uptime.

## Decision rationale

The current deployed audiovisual frontend already provides a usable migration baseline. Preserving it while introducing new bounded business applications reduces production risk. The marketplace root app represents a materially different business model and should not dictate the reusable AV operating system data model.
