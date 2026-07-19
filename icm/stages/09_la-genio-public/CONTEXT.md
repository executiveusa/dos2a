# Stage 09 — La Genio public

One job: build a nontechnical public concierge for service questions, text/voice event intake, structured brief creation, qualification, and quote/discovery handoff.

Public La Genio must have no access to private owner data. Completion requires machine-readable evidence at `output/prompt-injection-tests.json` with `prompt_injection_passed: true` and `output/private-data-boundary.json` with `private_data_boundary_passed: true`. The harness must reject `state: complete` without both proofs.
