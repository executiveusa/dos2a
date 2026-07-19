# Tasks: add-tenant-data-foundation

- [x] Split tenant data foundation from the later auth/RLS security boundary.
- [x] Add additive non-exposed PostgreSQL schema migration.
- [x] Add same-tenant composite foreign-key constraints.
- [x] Add tenant/query indexes and updated-at triggers.
- [x] Add pgTAP-compatible structural tests.
- [x] Add portable PostgreSQL verification SQL.
- [x] Add checksum-tracked migration runner.
- [x] Add guarded backup and restore scripts.
- [x] Add Docker Compose PostgreSQL 16 verification harness.
- [x] Add GitHub Actions PostgreSQL verification workflow.
- [x] Add self-hosted server environment contract and runbook.
- [x] Add data-foundation documentation and Phase 03 ICM context.
- [x] Add rollback receipt and machine-readable phase report.
- [ ] Run PostgreSQL CI verification on the phase branch/PR.
- [ ] Repair valid migration/test findings.
- [ ] Open/inspect phase PR, reviews, conflicts, and deployment feedback.
- [ ] Squash merge when repository gates pass.
- [ ] Verify public production remains unchanged.

## Current execution boundary

The owner will connect an existing private server later. Therefore Phase 03 must not create or attach a hosted database project and must not assume Supabase is the runtime.

Repository work continues against stock PostgreSQL 16 semantics. The migration remains non-exposed: no browser/API grants, no auth-provider coupling, no RLS/security policies, and no production connection.

## Stop condition

Do not:

- connect to the owner's real server before credentials/access are intentionally provided;
- apply migrations to a production or unknown database;
- establish auth/RLS grants until the runtime identity model is implemented and tested;
- expose PostgreSQL publicly;
- store real server credentials or secrets in Git.
