# GRINIONS™ Execution Protocol

## Phase state machine

`PHASE_QUEUED → HYDRATE_CONTEXT → VALIDATE_SPEC → CLASSIFY_RISK → CAPTURE_BASELINE → PROVISION_ISOLATED_WORKSPACE → SELECT_READY_BEAD → RALPHY_EXECUTION_LOOP → LOCAL_VERIFICATION → INTEGRATE_BEADS → FULL_PHASE_VERIFICATION → CREATE_OR_UPDATE_PR → PR_WATCH_LOOP → COUNCIL/JUDGE → SQUASH_MERGE → POST_MERGE_VERIFY → ROLLBACK or ATTEST → ARCHIVE_SPEC → CLOSE_BEADS → WRITE_REPORT → QUEUE_NEXT_PHASE`

## Context hydration

1. Read relevant ICM `CONTEXT.md`.
2. Run `bd prime` in a fresh execution context when Beads is installed.
3. Run `bd ready`; select one ready bead.
4. Read the accepted OpenSpec change.
5. Load applicable repo-local instructions.
6. Use JCodeMunch for target symbols/callers/tests/schemas before broad reads.
7. Fetch current dependency docs only when needed.
8. Record assumptions and unknowns.

## Bead execution

1. claim bead;
2. create isolated worktree/sandbox;
3. load bead-scoped context;
4. implement only the accepted scope;
5. write tests before or with implementation;
6. run targeted checks;
7. fix failures;
8. verify again;
9. commit with bead ID;
10. record evidence/discoveries;
11. close only after acceptance criteria pass.

Discovered work becomes a linked bead; never silently expand scope.

## Local-first verification

Before push:

1. format;
2. lint;
3. typecheck;
4. targeted unit tests;
5. targeted integration tests;
6. secret scan;
7. dependency/security scan when dependencies changed;
8. OpenSpec validation;
9. static/policy checks;
10. build;
11. browser smoke tests for user-facing changes.

## PR watcher

Observe CI, preview deployment, mergeability/conflicts, review submissions, unresolved threads, automated comments, Vercel feedback, and security checks.

Repair valid blockers, defects, security findings, spec mismatches, maintainability issues, useful nits, merge conflicts, and preview failures. Re-run local checks before each re-push.

Default budgets: local repair 5 loops; remote CI repair 2 rounds; review repair 3 rounds. On exhaustion, mark BLOCKED, preserve state, write handoff, do not merge.

## Merge gate

Auto-squash-merge only when:

- accepted spec verifies;
- phase beads are verified/closed or explicitly deferred;
- required checks/build are green;
- no conflict;
- no unresolved valid review findings;
- secret/security scans pass;
- rollback receipt exists;
- files remain inside approved scope;
- dependency changes are expected;
- user-facing preview/accessibility/taste gates pass where applicable;
- Emerald Tablets and Council/Judge pass;
- risk class permits autonomous merge.

Merge method: **squash only**.

## Post-merge verification

Verify main SHA, critical smoke checks, expected deployment target, runtime errors, critical routes, migration state, deployment feedback, and baseline success signals. A merged PR is not proof of a successful phase.

## Stop conditions

Stop for human decision only when business truth is ambiguous, destructive migration/critical data risk appears, secrets are exposed, production payment/auth authority is uncertain, unexpected blast radius exceeds three services, rollback cannot be proven, repair budget is exhausted, a review dispute is a product decision, required access is missing, legal/compliance judgment is required, branch protection would need bypassing, or security would need weakening.

Do not stop for ordinary lint/test errors, merge conflicts, nits, or routine review feedback; repair them within budget.
