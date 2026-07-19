# Tasks: define-canonical-architecture

- [x] Close Phase 00/01 completion records after squash merge and post-merge verification.
- [x] Verify current public production still returns HTTP 200.
- [x] Inspect root application product intent.
- [x] Inspect current `frontend/` public application surface.
- [x] Inspect root Prisma domain model.
- [x] Verify README Rust/Axum backend claim against repository contents.
- [x] Inspect public `/chat` and browser-side provider configuration.
- [x] Define KEEP/PARK/REPLACE/MIGRATE/REMOVE-FROM-PUBLIC decisions.
- [x] Define target application/package boundaries and migration sequence.
- [x] Add canonical architecture and route-inventory documents.
- [x] Add Phase 02 ICM context.
- [x] Add rollback receipt and machine-readable report.
- [x] Open phase PR.
- [x] Inspect CI, review comments/threads, conflicts, preview/deployment status.
- [x] Repair valid findings or classify external infrastructure failures.
- [x] Squash merge when gates pass.
- [x] Verify post-merge production remains reachable and unchanged in expected behavior.

## Completion note

PR #5 was squash merged as `b003a09f0e3ac68ef0cf63ac88cc7fcf3d6f2074`. CodeRabbit status passed; no review threads or submitted reviews were present. Vercel preview/status remained blocked by the account free-plan deployment quota (`api-deployments-free-per-day`), not a source/build finding. The public production home route returned HTTP 200 after merge and continued serving the expected pre-migration site because Phase 02 changed documentation/specification only.
