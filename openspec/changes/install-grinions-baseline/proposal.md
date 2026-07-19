# Change: install-grinions-baseline

## Objective

Establish the non-feature governance, context, specification, execution, rollback, and reporting baseline required before autonomous implementation begins.

## Commercial value

This phase reduces uncontrolled repository changes, preserves owner control, creates durable project memory, and establishes a repeatable foundation that can later be reused for other audiovisual/event-production businesses.

## In scope

- install repo constitution;
- install GRINIONS runtime-layer documentation;
- establish ICM factory and dos A tenant context;
- establish OpenSpec change structure;
- establish rollback/report artifacts;
- document current production baseline and known architecture uncertainty.

## Out of scope

- public UI changes;
- CRM implementation;
- database migrations;
- Payload installation;
- Hermes integration;
- production configuration changes;
- repository restructuring;
- dependency installation.

## Acceptance criteria

1. `EMERALD_TABLETS.md` exists at repository root.
2. GRINIONS constitution, orchestrator contract, and execution protocol exist.
3. ICM factory and dos A tenant `CONTEXT.md` files exist.
4. A rollback receipt captures the pre-phase Git/Vercel baseline.
5. A machine-readable phase report exists.
6. No application source, dependency, lockfile, database, or runtime configuration changes are introduced.
7. The phase is reviewed through a PR and squash merged only after checks and review state are clean.

## Risk

LOW — governance/documentation only. Note: because Vercel currently deploys `master` automatically, merging any commit may trigger a production rebuild even when application code is unchanged. This is a known infrastructure behavior to address in a later approved phase.
