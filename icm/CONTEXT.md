# dos A ICM router

## Layer model
- Layer 0: `EMERALD_TABLETS.md`, `AGENTS.md`, GRINIONS.
- Layer 1: this router + `icm/config/project.json`.
- Layer 2: one active stage `CONTEXT.md`.
- Layer 3: only relevant files under `icm/_config/`.
- Layer 4: active stage working files + required upstream outputs.

## Operating rule
The filesystem is project memory. Do not load the entire project history. Load one stage, retrieve exact code with JCodeMunch, implement a bounded slice, verify it, write evidence, and hand off only the outputs the next stage needs.

## Mandatory token policy
Read `TOKEN_SAVING_RULES.md` before code discovery.
