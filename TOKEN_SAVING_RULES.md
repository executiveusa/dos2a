# Token-saving rules — mandatory

## 1. JCodeMunch before broad repository reads
Call `jcodemunch_guide` when available and follow it. Retrieval order:
1. active ICM stage + accepted spec;
2. symbol/entity lookup;
3. callers/dependencies/tests;
4. exact fragments;
5. full file only when necessary;
6. whole-repo scan only at explicit audit gates.

Do not brute-read directories with `cat`, Read, Glob, or broad grep when symbol retrieval can answer the question.

## 2. RTK for verbose shell output
Verify the correct package with `rtk gain`. Use RTK rewriting for git, package-manager, test, build, Docker, and log commands. Prefer compact failure context over full successful logs.

## 3. Caveman Lite is internal only
Caveman Lite may compress agent chatter, tool summaries, logs, and handoffs. It must never rewrite dos A public copy, Mexican Spanish customer content, La Genio speech, proposals, contracts, or owner instructions.

## 4. ICM progressive disclosure
Load one stage only. Do not preload all 20 stage files. Load 3–7 relevant skills for the active stage, not the entire skill library.

## 5. Evidence over narration
Do not restate plans already stored in ICM. Write short state changes and machine-readable evidence. Do not paste full logs when a failing excerpt, command, exit code, and artifact path are sufficient.

## 6. Event-driven waiting
Do not burn tokens polling CI/reviews. Use workflow/review/deployment events where available. Persist waiting state and resume with the exact PR/head SHA.

## 7. Fresh verifier
For major stages, use a fresh-context verifier that reads the objective, changed files, and evidence rather than the builder's entire transcript.

## 8. Context budget discipline
Prefer a compact working packet: constitution digest, one stage contract, current task, exact symbols, acceptance criteria, and verification commands. If context grows, write a zero-context handoff and restart fresh.
