# Change: define-canonical-architecture

## Objective

Define one canonical application architecture for dos A and the reusable Sovereign AV Business OS before feature implementation begins.

## Problem

The repository currently contains two competing Next.js product surfaces:

1. a root application built around a DJ marketplace/subscription model; and
2. `frontend/`, which is the currently deployed dos A audiovisual business website.

The README also describes a Rust/Axum `backend/` that is not present in the repository. The root Prisma schema models DJs, marketplace bookings, gear, subscriptions, payments, and reviews rather than the tenant-aware CRM/booking/project model required by the approved product strategy.

Continuing feature development without resolving these boundaries would increase duplication, migration risk, and agent context waste.

## Commercial value

A canonical architecture allows the team to build one revenue path, reuse the platform for future AV/event-production tenants, avoid maintaining unrelated marketplace code, and preserve owner-controlled deployment/data boundaries.

## In scope

- inventory the current application surfaces and major route families;
- classify current code as KEEP, PARK, REPLACE, MIGRATE, or REMOVE-FROM-PUBLIC;
- define the target monorepo/application boundaries;
- define migration sequencing and safety rules;
- document the public site, admin, agent gateway, content studio, worker, and shared-package boundaries;
- identify stale/unsupported README claims;
- close the final status records for Phase 00/01.

## Out of scope

- moving application directories;
- deleting marketplace code;
- changing Prisma/database schema;
- changing authentication;
- changing Vercel project settings;
- changing public UI or copy;
- installing dependencies;
- deploying new runtime code.

## Acceptance criteria

1. One canonical architecture document exists.
2. Current application surfaces and route families are inventoried.
3. Every major current surface is classified KEEP/PARK/REPLACE/MIGRATE/REMOVE-FROM-PUBLIC.
4. The target app/package boundaries are defined.
5. The root DJ marketplace is explicitly prevented from becoming the dos A production data model by accident.
6. The public BYOK `/chat` surface is explicitly excluded from the target public product.
7. Migration is sequenced so production can remain available while new bounded applications are introduced.
8. No application source, database schema, dependency, lockfile, or deployment configuration changes are introduced.

## Risk

LOW — architecture/specification/documentation only.
