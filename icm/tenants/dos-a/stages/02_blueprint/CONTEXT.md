# Phase 02 — Canonical Architecture Blueprint

## Objective

Resolve the repository's competing product boundaries before runtime feature work begins.

## Owner outcome

The next agent must know exactly which current application is the dos A production baseline, which code is legacy/parked, what the target bounded architecture is, and what must not be migrated blindly.

## Inputs

- current `master` after GRINIONS baseline squash merge `d536e2468266f002311798ad89cc48762c0743f5`;
- current Vercel public site at `dos2a.vercel.app`;
- repository root application and Prisma schema;
- `frontend/` application and public `/chat` implementation;
- approved Sovereign AV Business OS strategy and dos A tenant context.

## Verified observations

1. `frontend/` is the current public dos A audiovisual website baseline.
2. Root `src/app/page.tsx` is a materially different DJ marketplace/subscription product with unsupported public metrics and pricing assumptions.
3. Root Prisma models DJs, marketplace bookings, gear, subscriptions, transactions, and reviews rather than the required tenant-aware AV business operating model.
4. The README describes a Rust/Axum `backend/`, but the expected `backend/Cargo.toml` is absent.
5. `frontend/src/app/chat` is public BYOK chat, and its provider configuration stores raw API keys in browser localStorage and performs provider calls from the client.
6. Public production remains HTTP 200 after Phase 00/01.

## Decisions

- KEEP/MIGRATE `frontend/` as the public-site baseline.
- PARK the root DJ marketplace; do not extend it as dos A OS.
- PRESERVE legacy marketplace schema/data until safe migration/retirement is proven.
- REPLACE the new product data foundation with a tenant-aware additive model rather than destructive in-place mutation.
- REMOVE-FROM-PUBLIC the BYOK `/chat` after a private governed admin/agent replacement exists.
- Treat README backend/completion claims as stale/unverified until corrected from verified implementation reality.
- Target bounded `apps/*` and `packages/*` architecture; migrate incrementally, not in one directory rewrite.

## Prohibited changes in this phase

- no runtime source edits;
- no directory moves/deletions;
- no Prisma/database migration;
- no auth changes;
- no dependency/lockfile changes;
- no Vercel configuration changes;
- no public copy/design changes.

## Acceptance criteria

- canonical architecture document exists;
- current routes/surfaces are inventoried;
- KEEP/PARK/REPLACE/MIGRATE/REMOVE decisions are explicit;
- next-phase data/auth boundaries are clear;
- rollback/report artifacts exist;
- PR diff contains documentation/spec/context/report changes only.

## Verification

- compare phase branch to `master` and confirm only approved paths;
- inspect PR mergeability, reviews, threads, status checks, and deployment feedback;
- classify Vercel quota failures separately from source/build failures;
- squash merge only after valid findings are resolved;
- post-merge verify `dos2a.vercel.app/` returns HTTP 200.

## Rollback

Revert the Phase 02 squash commit. No runtime/data changes are expected, so rollback is documentation-only apart from Vercel's automatic rebuild behavior on `master`.

## Downstream dependency

Phase 03 — tenant/data/auth foundation. Any auth/permission-boundary or destructive data action is HIGH risk and must pause for explicit human approval before merge/destructive execution.
