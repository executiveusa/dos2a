# GRINIONS™ Orchestrator Contract

Use one system for one primary responsibility.

- OpenSpec: specification truth — requirements, design, acceptance criteria, implementation plan, verification, archive.
- Beads: work graph and durable task memory — epics, dependencies, ready/blocked state, discoveries, persistent memories.
- ICM: interpretable company/project context and phase contracts.
- Ralphy: bounded implementation loop for one approved bead/task at a time.
- Absurd: durable state for long-running/multi-phase orchestration, waits, retries, PR/merge/post-merge checkpoints, and rollback.
- Git/GitHub: canonical release truth — protected main, branches, PRs, checks, review threads, squash merges, revert history.
- Atomic: optional provenance/attestation shadow layer after compatibility is proven; never replaces Git/GitHub or Beads in v1.
- Optio: orchestration reference pattern; do not install full infrastructure unless scale justifies it.
- JCodeMunch: first-choice code-context retrieval before broad repository reads.
- ast-grep: structural search/refactor when AST-aware changes are safer.
- Context7/current docs: version-specific dependency knowledge when APIs may have changed.
- Browser/E2E harness: real-browser verification for critical journeys and deployed previews.

## Authority split

### Implementation GRINION
May read the repo, write an isolated branch/worktree, run checks, push, and create/update PRs.

### Deterministic merge controller
Must verify accepted spec, CI, reviews, conflicts, security, rollback receipt, scope, Council/Judge gates, and risk policy before merge.

### Deployment controller
Production promotion is a separate privileged action and may run only when included in an approved phase contract and all release gates pass.

## Durable workflow

For multi-phase projects, Absurd persists checkpoints around:

`hydrate → baseline → validate spec → execute beads → local verify → open PR → wait for CI/review → repair loop → judge → squash merge → post-merge verify → rollback or attest → archive → next phase`

External side effects must be idempotent. Retries must reuse stored PR numbers, deployment IDs, merge SHAs, message IDs, and rollback checkpoints rather than duplicating actions.

## Runtime context discipline

Fresh workers normally receive only:

1. constitution digest;
2. active OpenSpec change;
3. current Bead and direct blockers/dependencies;
4. relevant ICM `CONTEXT.md`;
5. applicable repo-local instructions;
6. exact JCodeMunch symbols/callers/tests/schemas;
7. acceptance criteria and verification commands.

Do not preload the full chat history or whole repository.
