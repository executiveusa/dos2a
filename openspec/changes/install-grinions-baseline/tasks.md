# Tasks: install-grinions-baseline

- [x] Create isolated phase branch from `master`.
- [x] Install `EMERALD_TABLETS.md` at repo root.
- [x] Add GRINIONS constitution.
- [x] Add GRINIONS orchestrator contract.
- [x] Add GRINIONS execution protocol.
- [x] Add OpenSpec proposal/design/tasks for this phase.
- [x] Add ICM factory context.
- [x] Add dos A tenant context.
- [x] Add rollback receipt.
- [x] Add phase report.
- [x] Open phase PR.
- [x] Inspect CI, comments, review threads, conflicts, and preview deployment.
- [x] Repair valid findings or classify non-code infrastructure failures.
- [x] Squash merge when gates pass.
- [x] Verify post-merge deployment/runtime state.

## Completion note

PR #4 was squash merged as `d536e2468266f002311798ad89cc48762c0743f5`. The public production home route returned HTTP 200 after merge. A Vercel status check remained red because the account hit the free-plan deployment quota (`api-deployments-free-per-day`), not because a source/build failure was identified. Earlier branch previews for this documentation-only phase reached READY. No application source, dependency, database, lockfile, or runtime configuration change was included.
