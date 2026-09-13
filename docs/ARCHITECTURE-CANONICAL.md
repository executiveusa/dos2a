# Canonical Architecture — dos A / Sovereign AV Business OS

## Decision

The repository will evolve toward one reusable AV/event-production operating system with dos A as Tenant #1.

The current repository is not treated as one coherent application. It contains two different products and stale architecture documentation.

## Current surfaces

| Surface | Current role | Decision |
|---|---|---|
| `frontend/` Next.js app | Current deployed dos A marketing site | **KEEP / MIGRATE** to `apps/web` after behavior parity is proven |
| `frontend/src/app/chat` | Public BYOK AI-provider chat | **REMOVE FROM PUBLIC** after private governed replacement exists |
| root `src/` Next.js app | DJ marketplace/subscription experiment | **PARK**; do not extend as dos A OS |
| root `prisma/schema.prisma` | DJ marketplace data model | **PRESERVE, THEN REPLACE FOR NEW PRODUCT**; no destructive in-place migration |
| root marketplace APIs | Marketplace/DJ/gear/payment flows | **PARK** with root marketplace |
| README Rust/Axum backend description | Claimed backend architecture | **STALE/UNVERIFIED**; repository does not contain the claimed backend path |
| Vercel project `dos2a` | Current public deployment | **KEEP AS PRODUCTION BASELINE** while migration occurs |

## Why the root marketplace cannot be the canonical dos A application

The root home page markets DJ discovery, marketplace booking, subscriptions, and marketplace pricing. It includes unverified metrics such as registered DJs, gigs booked, ratings, and quote speed. These do not represent verified dos A business proof and must not be carried into the public brand.

The root data model requires DJ-centric relationships and includes subscription tiers, gear marketplace records, marketplace transactions, reviews, and DJ profiles. This conflicts with the approved reusable product model centered on tenants, leads, clients, event briefs, bookings, proposals, projects, approvals, content, integrations, and governed agent actions.

## Why `frontend/` is the migration baseline

`frontend/` is the current public dos A audiovisual site and is what the connected Vercel project serves. It already contains the basic business-facing sections needed to preserve public availability while the operating-system backend is introduced.

It is not considered finished. Known defects and strategy gaps remain, including outdated branding, broken/missing visual assets, weak proof, the public BYOK chat, an unverified lead-delivery path, and incomplete SEO/content architecture. Those are handled in later accepted phases rather than mixed into the architecture phase.

## Target monorepo

```text
apps/
├── web/                 Public tenant website
├── admin/               Authenticated owner operations console
├── agent-gateway/       Governed tools, permissions, approvals, audit
├── content-studio/      Isolated Payload CMS / editorial operations
└── worker/              Async jobs, notifications, retries, exports

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
```

A future `legacy/dj-marketplace/` archival boundary may be created only after references and deployment behavior prove the move is safe.

## Dependency direction

```text
apps/web ────────────────┐
apps/admin ──────────────┼──> shared packages
apps/agent-gateway ──────┤
apps/content-studio ─────┤
apps/worker ─────────────┘

shared packages must not import application packages
public web must not depend on agent runtime availability
content studio must not have unrestricted CRM/payment/secret access
implementation agents must not hold protected merge/deploy authority
```

## Canonical business data domains

The new data foundation should be introduced additively and tenant-aware. Expected domains:

- Tenant
- User / Role / AgentIdentity
- Contact / Company
- Lead / LeadSource
- Conversation / Message / CallSummary
- EventBrief / EventType / Venue / Service
- Availability / Booking / CalendarEvent
- Proposal / ProposalVersion / Approval
- Project / ProjectTask / CrewMember / Vendor
- Risk / ContingencyPlan
- Asset / MediaPermission / PortfolioProject / CaseStudy
- ContentBrief / Post / Category / Location
- Integration / Notification / AuditEvent
- ExportJob / BackupRecord

Every business record that is tenant-owned should be scoped by `tenantId` and audited.

## Migration rules

1. Preserve current production before every runtime phase.
2. Introduce new bounded data/auth capability before deleting or renaming legacy data structures.
3. Avoid big-bang moves from `frontend/` to `apps/web`.
4. Prove behavior parity before switching deployment roots.
5. Keep the public site available if Hermes, Payload, or background workers fail.
6. Do not reuse public BYOK credentials or browser-local provider keys in the target system.
7. Do not delete legacy marketplace code or data until dependency searches, builds, tests, and rollback evidence prove it is unused.
8. Update README only when it can describe verified repository/runtime reality.

## Release boundaries

Each runtime migration step gets its own OpenSpec change and PR. Directory moves, database/auth work, public-site redesign, content CMS installation, agent integration, and deployment-control changes must not be combined into one unbounded migration PR.

## Immediate next architecture-dependent work

The next implementation phase is the tenant/data/auth foundation. It must create the new business model additively without destructive mutation of the existing marketplace schema. Any auth/permission boundary or destructive migration is HIGH risk and requires explicit human approval immediately before merge under GRINIONS policy.
