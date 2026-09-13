# Design: install-grinions-baseline

## Architecture decision

Keep release truth in Git/GitHub. Add governance and context as repository files without changing application runtime.

### Responsibility map

- `AGENTS.md`: repository operating contract.
- `EMERALD_TABLETS.md`: constitutional quality and execution gates.
- `grinions/`: stable GRINIONS runtime-layer documentation.
- `openspec/`: accepted specification changes and acceptance criteria.
- `icm/`: interpretable factory/tenant/project context.
- `ops/rollback/`: rollback baselines and recovery receipts.
- `ops/reports/`: machine-readable zero-context completion reports.

## Current-state constraints

- Default branch is `master`.
- Vercel project `dos2a` is connected to `master` and currently auto-builds production on direct master commits/merges.
- Existing README claims about backend architecture and completed phases are not trusted until verified against repository contents and deployed behavior.
- No application code is modified in this change.

## Rollback

Revert the squash commit for this phase. Since no application runtime code, database schema, or dependency changes are introduced, no data rollback is expected.
