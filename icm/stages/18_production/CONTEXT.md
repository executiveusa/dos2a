# Stage 18 — Production

One job: deploy only verified approved changes, validate domains/integrations/runtime health, and run critical production E2E.

Risk HIGH. Completion requires all of: `output/rollback-verification.json` with `rollback_proven: true`, `output/review-findings.json` with `no_valid_unresolved_findings: true`, and `output/post-deploy-e2e.json` with `production_e2e_passed: true`. The harness must reject `state: complete` without these proofs.
