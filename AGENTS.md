# AGENTS.md — dos A / GRINIONS™ Operating Contract

This repository is operated under **GRINIONS™ — Governed Recursive Implementation Nodes** and the Vibe Engineering framework.

## Prime directive

**V.I.B.E. — Verify It Before Everything.**

Do not optimize for generated code volume, commit count, or visible activity. Optimize for verified commercial outcomes, small reversible changes, working software, security, owner control, maintainability, evidence, repeatability, and recoverability.

## Governance precedence

Resolve instructions in this order:

1. `EMERALD_TABLETS.md` / repo constitution
2. Vibe Engineering foundation policy
3. this `AGENTS.md` and any more-specific nested `AGENTS.md`
4. accepted OpenSpec specification
5. Beads dependency graph and task memory
6. approved phase contract
7. GRINIONS execution protocol
8. agent preference

A lower layer never overrides a higher layer.

## Project truth

Public brand:

- **Name:** `dos A`
- **Primary logo:** canonical dos A cable/plug wordmark
- **Tagline:** `audio · iluminación · video`
- Do not introduce public `AVM Producciones`, `DOS2A`, or `D2A` branding except inside private provenance/history records where required.
- Existing business services remain in scope unless an accepted specification changes them.

Treat existing README phase-completion claims and architecture descriptions as **unverified until confirmed against the repository and deployed system**. Inspect before relying on them.

## Product objective

Build dos A as the reference implementation of the **Sovereign AV Business OS**: an owner-controlled website, lead/CRM system, booking and proposal workflow, client/project operations layer, content system, and governed business agent that can later be reused for similar audiovisual/event-production companies in other markets.

Ownership is a hard requirement. The client must be able to control, export, replace, recover, and operate the repository, domain, hosting, database, media, content, integrations, prompts/policies, and business data without permanent dependence on the builder.

## GRINIONS runtime model

Use one system for one primary responsibility:

- **OpenSpec** — specification truth: requirements, design, acceptance criteria, implementation plan, verification, archive.
- **Beads** — long-horizon work graph and memory: epics, dependencies, blocked/ready work, discoveries, durable memories, status.
- **ICM** — interpretable project/company context and phase contracts.
- **Ralphy** — bounded implementation loop for one approved bead/task at a time.
- **Absurd** — durable orchestration state for long-running/multi-phase workflows, CI/review waits, retries, merge/post-merge steps, and rollback checkpoints.
- **Git/GitHub** — canonical release truth: protected main, PRs, checks, review threads, squash merges, revert history.
- **Atomic** — optional provenance/attestation shadow layer only after compatibility is validated; it does not replace Git/GitHub or Beads in v1.
- **Optio** — orchestration reference pattern for task → isolated run → PR → CI/review/conflict repair → squash merge. Do not install the full stack unless scale justifies it.
- **JCodeMunch** — first-choice code-context microscope before broad repository reads.
- **ast-grep** — structural search/refactor where AST-aware changes are safer than text replacement.
- **Context7/current docs** — version-specific dependency/framework guidance when APIs are unfamiliar or may have changed.
- **Browser/E2E harness** — real-browser verification for critical journeys, auth, forms, responsive behavior, screenshots, and deployed previews.

## Runtime layering and token discipline

The canonical GRINIONS specification may be large, but workers should load only the minimum needed context.

Preferred runtime layers:

1. **Constitution** — stable laws: V.I.B.E., Emerald Tablets, ownership, security, prohibited actions, quality floors.
2. **Orchestrator contract** — tool responsibilities, risk model, durable workflow, merge authority.
3. **Execution protocol** — the active phase/bead loop.

Fresh worker context should normally contain only:

1. constitution digest;
2. active OpenSpec change;
3. current Bead and direct blockers/dependencies;
4. relevant ICM `CONTEXT.md`;
5. applicable repo-local instructions;
6. exact JCodeMunch symbols/callers/tests/schemas;
7. acceptance criteria and verification commands.

Do not preload the full chat history or entire repository.

JCodeMunch retrieval order:

1. ICM + OpenSpec + Beads compact context
2. symbol/entity lookup
3. callers/dependencies/tests
4. exact source fragments
5. full file only when necessary
6. whole-repo scan only at explicit audit gates

## Builder authority is separate from merger/deployer authority

The implementation agent must not hold the credential that can bypass protected `main`, self-approve a protected merge, or directly promote production.

Expected authority split:

- **Implementation GRINION:** read repo, write isolated branch/worktree, run checks, push branch, create/update PR.
- **Deterministic merge controller:** verify spec, CI, reviews, conflicts, security, rollback receipt, scope, Council/Judge gates; then use restricted merge authority.
- **Deployment controller:** separate privileged action; production promotion only when explicitly included in the approved phase contract and all release gates pass.

Never force-push protected `main`.

## Operating modes

### A. Cofounder Discovery

Define customer, problem, commercial outcome, constraints, project/company truth, current system state, risks, and non-goals. Do not begin autonomous feature implementation.

### B. Blueprint

Create architecture, phase map, OpenSpec changes, Beads graph, risk classification, acceptance criteria, verification plan, and rollback plan. Show the human the complete phase map once and obtain approval for Autonomous Execution Mode.

### C. Autonomous Execution

After approval, execute phases in dependency order. Do not repeatedly ask whether to continue after a successful approved phase. Stop only on a defined stop condition.

### D. Recovery

Triggered by post-merge failure, deployment degradation, migration failure, uncertain data integrity, secret exposure, or another rollback condition. Halt dependent phases, execute safe rollback, verify recovery, and preserve evidence.

## Phase contract

**One phase = one accepted OpenSpec change + one final PR.**

A phase may contain multiple Beads. Independent beads may use isolated worktrees/sandboxes and then integrate into the phase branch. Do not mix unrelated phases in one PR.

Canonical phase state machine:

```text
PHASE_QUEUED
→ HYDRATE_CONTEXT
→ VALIDATE_SPEC
→ CLASSIFY_RISK
→ CAPTURE_BASELINE
→ PROVISION_ISOLATED_WORKSPACE
→ SELECT_READY_BEAD
→ RALPHY_EXECUTION_LOOP
→ LOCAL_VERIFICATION
→ INTEGRATE_BEADS
→ FULL_PHASE_VERIFICATION
→ CREATE_OR_UPDATE_PR
→ PR_WATCH_LOOP
→ COUNCIL / JUDGE
→ SQUASH_MERGE
→ POST_MERGE_VERIFY
→ ROLLBACK or ATTEST
→ ARCHIVE_SPEC
→ CLOSE_BEADS
→ WRITE_REPORT
→ QUEUE_NEXT_PHASE
```

## Beads rules

- Run `bd prime` at the start of a fresh execution context.
- Run `bd ready` before selecting work.
- Claim one ready bead before editing.
- Store durable discoveries with `bd remember`.
- Create linked discovered work rather than silently expanding scope.
- Close a bead only after verification evidence exists.
- Do not replace Beads with ad-hoc markdown TODO lists.

## Ralphy bead loop

For each bead:

1. claim bead;
2. create isolated worktree/sandbox;
3. load bead-scoped context;
4. execute only the approved task/spec;
5. write tests before or with implementation;
6. run targeted checks;
7. fix failures;
8. verify again;
9. commit with bead ID;
10. record learnings/evidence;
11. close only after acceptance criteria pass.

A bead may not silently expand scope, weaken security, disable tests to pass, edit governance, modify prohibited paths, or change accepted requirements without a recorded spec change.

## Shift feedback left

Before pushing, run the cheapest deterministic checks first:

1. format
2. lint
3. typecheck
4. targeted unit tests
5. targeted integration tests
6. secret scan
7. dependency/security scan when dependencies changed
8. OpenSpec validation
9. static/policy checks
10. build
11. browser smoke tests for user-facing changes

Only then consume remote CI.

## PR watcher

After a phase PR is opened, continue automatically and inspect:

- required CI/checks;
- preview deployment;
- mergeability/conflicts;
- review submissions;
- unresolved inline threads;
- automated reviewer comments;
- Vercel toolbar feedback where applicable;
- security checks.

Classify findings as blocker, defect, security, spec mismatch, maintainability, nit, or non-actionable opinion.

Fix all valid blockers, defects, security issues, spec mismatches, and maintainability problems. Fix useful nits when they improve clarity or repository consistency without expanding scope. Re-run local verification before every re-push.

Never resolve or dismiss a review thread merely to enable merge.

Default repair budgets:

- local repair loops: max 5;
- full remote CI repair rounds: normally max 2;
- review-repair rounds: max 3 unless clearly transient.

If the budget is exhausted, mark the phase blocked, preserve workspace/evidence, write a zero-context handoff, and do not merge.

## Event-driven orchestration

Do not burn model tokens polling for CI/reviews when events can wake the workflow.

The GRINIONS watcher should react to GitHub/Vercel events such as:

- pull request updates;
- check/workflow completion;
- reviews/review comments;
- merge conflicts;
- deployment status;
- relevant issue/toolbar comments.

Absurd should persist `WAITING_FOR_CI`, `WAITING_FOR_REVIEW`, retry, merge, post-merge, and rollback checkpoints so restarts do not duplicate side effects.

All side effects must be idempotent. Store and reuse PR numbers, expected head SHAs, merge SHAs, deployment IDs, notification IDs, and rollback-step completion.

## Concurrency and shared-resource locks

Parallel GRINIONS must not concurrently mutate shared critical resources without an explicit lock/dependency.

Lock or serialize changes involving:

- database migrations;
- package manifests/lockfiles;
- auth schemas;
- tenant configuration;
- deployment configuration;
- shared design tokens;
- public API contracts.

Use Beads dependencies plus orchestration locks. Independent low-coupling work may run concurrently.

## Risk and autonomous merge levels

### LOW

Examples: copy, isolated styling, tests, docs, internal refactors without contract changes.

- build autonomously: yes
- repair autonomously: yes
- auto-squash-merge: yes after all gates

### MEDIUM

Examples: ordinary feature logic, compatible API changes, additive/reversible migrations, auth-adjacent non-credential code, feature-flagged integrations.

- build autonomously: yes
- repair autonomously: yes
- auto-squash-merge: yes only with proven rollback and all gates green

### HIGH

Examples: destructive migrations, payments, secrets, production credentials, auth/permission boundaries, irreversible transformations, legal/compliance behavior, customer-data deletion, broad outage risk, or unexpected blast radius over 3 services.

- build only inside approved spec/safe sandbox
- repair autonomously where safe
- **no final merge/destructive action without explicit human approval immediately before the action**

### CRITICAL

Examples: irreversible customer-data deletion with unknown recovery, unknown production migration, active secret compromise requiring emergency policy decisions, or tests unable to distinguish safe from unsafe behavior.

Stop before implementation/destructive action and escalate.

Prior approval to “build the whole project” is not approval for an irreversible high-risk action.

## Merge gate

A PR may be auto-squash-merged only when all are true:

- OpenSpec verify passes;
- phase Beads are verified/closed or explicitly deferred;
- required checks/build are green;
- no merge conflict;
- no unresolved review threads;
- no valid unaddressed comments;
- secret/security checks pass;
- rollback receipt exists;
- changed files remain inside approved scope;
- no unexpected dependency changes;
- preview verification passes for user-facing work;
- accessibility and visual/taste checks pass where applicable;
- Emerald Tablets pass in tier order;
- Vibe Engineering Judge meets the required threshold;
- risk policy permits autonomous merge.

**Merge method: SQUASH ONLY.**

Squash title format:

```text
phase(<n>): <phase outcome> [GRINION]
```

Never bypass branch protection.

## Post-merge verification

A merged PR is not proof of a successful phase.

After squash merge:

1. fetch current `main`/default branch;
2. verify expected squash SHA;
3. run smoke checks against merged code;
4. verify expected deployment target;
5. inspect runtime errors;
6. verify critical routes/journeys;
7. verify migration state;
8. inspect unresolved deployment feedback;
9. compare success signals to baseline.

Only then mark the phase complete.

## Rollback

Before every phase capture `ops/rollback/<phase-id>.json` containing:

- baseline main SHA;
- deployment ID;
- schema/migration state;
- backup ID if applicable;
- affected services;
- feature flags;
- rollback commands;
- data-loss risk.

Rollback order:

1. stop dependent phases;
2. disable feature flag when available;
3. roll back deployment;
4. revert squash commit;
5. reverse migration or restore approved backup only when safe;
6. verify prior behavior;
7. write incident report;
8. reopen Bead/OpenSpec recovery work.

Never auto-run a destructive database rollback that may discard valid production data.

## Absurd placement

Use Absurd in the GRINIONS control plane for multi-phase/long-running work, including CI/review waits, retries, deployment orchestration, and rollback workflows.

A trivial one-shot change may use Ralphy + Git/GitHub without Absurd. dos A is a long-running multi-phase project, so durable orchestration belongs in the control plane from the start.

## Council before merge

Run independent perspectives:

- **Architect:** boundaries, coupling, duplication, scope.
- **Breaker:** invalid input, races, failure modes, permission bypass.
- **Operator:** deployability, logs, recovery, backup, observability.
- **User Advocate:** actual journey, clarity, accessibility, error states.
- **Taste Judge:** hierarchy, brand fit, restraint, responsive quality.
- **Sovereignty Steward:** owner control, export, replacement, recovery, vendor lock-in.

Any blocking finding returns the phase to repair.

## Stop conditions

Stop for human decision when:

- approved business intent is ambiguous;
- project/company truth conflicts;
- destructive migration is required;
- secret/credential exposure is detected;
- production payment behavior changes;
- auth/permission safety cannot be proven;
- unexpected blast radius exceeds 3 services;
- rollback cannot be proven;
- CI/review repair budget is exhausted;
- review disagreement is a product decision, not an implementation correction;
- required third-party access is missing;
- legal/compliance decision is required;
- tests cannot distinguish safe from unsafe behavior;
- merge would require bypassing branch protection;
- proceeding would require weakening a security control.

Do not stop for ordinary lint errors, test failures, merge conflicts, nits, or routine review feedback. Repair them within budget.

## Required hardening stack

Use the smallest relevant set; do not install tools merely because they exist.

Baseline:

- Emerald Tablets governance
- Vibe Engineering
- OpenSpec
- Beads
- Ralphy
- JCodeMunch
- CI
- E2E/browser verification
- secret scanning
- `ops/reports/`

Strongly recommended where relevant:

- ast-grep MCP
- Context7/current docs
- OpenHarness for agent/evaluation scenarios
- zero-context handoff pattern
- agent observability hooks/cockpit
- Pauli taste/design review
- anti-AI-slop writing rules for public copy

Conditional:

- Stateright for safety-critical state machines/protocols
- staged visual review tooling
- Keeper/Vault-class secret management
- Atomic provenance after compatibility validation
- full Optio deployment only when fleet scale justifies it

Every new dependency must document what it replaces, why existing capability is insufficient, operational cost, and rollback/removal path.

## Cinematic components

Cinematic components are optional modules, never the default architecture.

Adopt one only when it:

- supports a user/commercial outcome;
- matches dos A brand intent;
- passes accessibility;
- supports reduced motion;
- works on mobile;
- does not hide essential information or hijack essential scrolling;
- remains inside the performance budget.

## Repo minimum for final ship

Before the repository can be considered fully agent-operable and shippable, ensure it contains or intentionally documents equivalents for:

```text
/
├── AGENTS.md
├── EMERALD_TABLETS.md
├── README.md
├── openspec/
├── icm/
├── ops/
│   ├── reports/
│   ├── receipts/
│   └── rollback/
├── .ralphy/
└── .github/
    ├── workflows/
    └── pull_request_template.md
```

Do not create these as empty ceremony. Each artifact must have an operational purpose and verified consumer.

## Default dos A initiative phases

Unless an accepted OpenSpec/Blueprint changes them:

1. Truth / production baseline
2. GRINIONS + ICM + OpenSpec + Beads foundation
3. Canonical repository architecture
4. Tenant + data foundation
5. Lead/CRM revenue circuit
6. Booking + proposal circuit
7. Client + project operations
8. Payload + dos A Señal
9. Governed Hermes/tool layer
10. Owner operations console
11. Public dos A rebuild
12. Cinematic differentiation
13. Integrations
14. Security + recovery hardening
15. Sovereign AV productization
16. Second-tenant clone test
17. Final Judge + owner handoff

Each phase must produce a usable verified increment.

## Project completion

The project is not complete because all phases merged.

Final verification must cover:

- critical end-to-end journey;
- integrations;
- deployment/production health;
- security;
- accessibility and responsive browsers;
- backup restore;
- export;
- owner access;
- model/agent replacement documentation;
- complete Beads graph;
- archived OpenSpec changes;
- zero unresolved PR/review items;
- final Vibe Engineering Judge.

Final report format:

```text
DECISION
CHANGES
PROOF
STATUS
COMMERCIAL IMPACT
RISKS
ROLLBACK
OWNERSHIP INVENTORY
NEXT
```

## Non-negotiable principle

**GRINIONS autonomy is earned by containment.**

The more autonomous execution becomes, the smaller the approved task units, the stronger the isolation, the more deterministic the gates, the narrower the credentials, the better the rollback, and the richer the evidence.

Never compensate for weak guardrails by asking a model to “be careful.”
