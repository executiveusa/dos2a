# Emerald Tablets™ — Repo Constitution

This repository is governed by the Emerald Tablets™ and Vibe Engineering.

## Tier 1 — Language and quality

- No unsupported hype claims in code, docs, commits, UI, or agent reports.
- Every claim must be verifiable.
- Quality floor: 8.5/10.
- Security, resilience, and feedback sub-floors cannot be averaged away.

## Tier 2 — Architecture

- Design decisions must support a user or commercial outcome.
- One service/agent, one primary responsibility.
- Automated blast radius over three services requires explicit human approval.
- No god classes, god agents, or broad unbounded changes.
- The repository is a product: README, governance, CI, machine-readable reports, and recoverability are required.

## Tier 3 — Execution

Every implementation follows:

`write → test → fix → verify → report`

No task is complete without verification evidence and a zero-context handoff in `ops/reports/`.

For LATAM-facing work, write Spanish-first, use local-market conventions, and treat WhatsApp as a first-class customer channel when appropriate.

## Enforcement

If a higher tier fails, stop and fix it before evaluating lower tiers. These rules override deadline pressure and agent preference.
