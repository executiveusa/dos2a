# Stage 01 — Repository reconciliation

Baseline: `5d7a927156bb819e9823f366a2ac6209c4c4c72e`.

## Reconciled state
- Open pull requests at stage start: none.
- Canonical default branch: `master`.
- `frontend/` remains the only production public-app baseline and Vercel root directory.
- Root `src/` marketplace and root marketplace APIs remain PARKED. No deletion in this stage.
- Root `prisma/schema.prisma` remains preserved legacy DJ-marketplace data. No destructive conversion.
- Portable PostgreSQL tenant/data foundation remains the canonical new data direction; real owner server is still disconnected.
- Legacy README claims about a Rust/Axum backend, Railway, Supabase runtime dependency, completed AI/WhatsApp/Stripe features, and the DJ marketplace were stale/unverified and have been removed from the canonical README.

## Canonical source-of-truth order
1. `EMERALD_TABLETS.md`
2. `AGENTS.md`
3. `TOKEN_SAVING_RULES.md`
4. accepted OpenSpec change
5. active ICM stage contract/output
6. current code and tests
7. README as orientation only

## Keep / park / remove policy
### KEEP
- `frontend/` public app, migrated incrementally.
- ICM/GRINIONS/OpenSpec/ops governance.
- PostgreSQL foundation and migration/backup tooling.
- existing verified public production baseline until replacement passes parity and browser QA.

### PARK
- root DJ marketplace UI/APIs.
- root DJ Prisma schema.
- legacy experiments with no verified role in the dos A revenue circuit.

### REMOVE later only with evidence
- public BYOK `/chat` after governed La Genio replacement exists.
- legacy branding/copy during public-site rebuild.
- parked marketplace code only after dependency search, build/test proof, and rollback plan.

## Branch/PR policy
New product work starts from current `master`, one ICM stage at a time. No outstanding PR was eligible or required for reconciliation at stage start. Old merged branch names may remain on GitHub; branch-name cleanup is not a product requirement and is not worth destructive/ref manipulation without operational need.

## Handoff
Stage 02 may now curate the supplied DOSA media against this canonical repo truth. Stage 03 may use only the locked brand/audience/claims registry, not legacy README or parked marketplace copy.
