# Proposal — install ICM autonomous harness

## Objective
Make the approved 20-stage dos A build executable with narrow ICM context, token-saving tooling rules, deterministic stage validation, bilingual owner-handoff requirements, and GRINIONS release governance.

## Scope
Docs/config/scripts only. No production runtime, database, authentication, dependency, or public-site behavior changes.

## Acceptance
- 20 stage contracts exist.
- token-saving policy exists.
- tool install/verify scripts pass shell syntax.
- JSON configs validate.
- harness identifies stage 00 as next.
- CI validates the harness.
