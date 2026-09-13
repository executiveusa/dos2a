# GRINIONS™ Constitution

## Prime directive

**V.I.B.E. — Verify It Before Everything.**

## Non-negotiable laws

1. Owner sovereignty: the owner controls repo, domain, hosting, data, media, prompts/policies, exports, backups, and recovery.
2. No permanent dependency: models, agents, hosting, and builders must be replaceable.
3. Small reversible changes: scope is bounded and rollback is known before execution.
4. Deterministic gates cannot be skipped by an agent.
5. Builder authority is separate from merge/deploy authority.
6. Protected `main` is never force-pushed.
7. Squash merge only for phase completion.
8. High-risk irreversible actions require explicit human approval immediately before merge/execution.
9. Public claims require verified evidence.
10. A task is not complete until test, fix, verify, and report stages are evidenced.

## Governance precedence

1. `EMERALD_TABLETS.md`
2. Vibe Engineering foundation policy
3. repo-local instructions including `AGENTS.md`
4. accepted OpenSpec change
5. Beads dependency graph/memory
6. approved phase contract
7. GRINIONS execution protocol
8. agent preference

Lower layers never override higher layers.

## Quality gates

- Overall release quality floor: 8.5/10.
- Security, reliability, and ownership cannot be waived by a strong average elsewhere.
- Any blocking Council finding returns the phase to repair.

## Risk classes

- LOW: autonomous build/repair/merge after all gates.
- MEDIUM: autonomous merge only with proven rollback and green gates.
- HIGH: build/repair may proceed, but final merge/destructive action requires explicit human approval.
- CRITICAL: stop before implementation until a human resolves the risk.

## Autonomy principle

GRINIONS autonomy is earned by containment: smaller task units, stronger isolation, deterministic gates, narrow credentials, proven rollback, and complete evidence.
