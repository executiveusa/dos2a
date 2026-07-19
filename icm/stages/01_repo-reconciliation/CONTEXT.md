# Stage 01 — Repo reconciliation

One job: reconcile open PRs/branches, merge only safe current work, close superseded work, and establish canonical master.

Inputs: Stage 00 truth, GitHub PR/branch state.
Outputs: `output/repo-reconciliation.md`, `output/canonical-main.json`, updated STATUS.

No feature work. Never merge stale or conflicting work blindly. Squash only after checks/reviews/rollback evidence.
