# dos A

**audio · iluminación · video**

Production baseline: `https://dos2a.vercel.app`

## Product

dos A is the reference tenant for the **Sovereign AV Business OS**: a reusable system for audiovisual/event-production companies that connects a clear public website to qualified inquiries, follow-up, booking, proposals, project operations, content, and a governed business assistant.

Primary market: Ciudad de México first, with projects throughout Mexico.

Primary users:
- corporate event and marketing teams;
- event agencies and producers;
- the dos A owner/operator.

## Canonical repository truth

- `frontend/` — current public Next.js application and Vercel production baseline. Keep and migrate incrementally; do not replace blindly.
- `src/` + root marketplace APIs — parked DJ marketplace experiment. Not the canonical dos A product.
- `prisma/schema.prisma` — legacy DJ-marketplace schema. Preserve until dependency/removal evidence proves a safe cleanup path.
- `supabase/migrations/` — historical path containing portable PostgreSQL migrations for the new tenant-aware foundation. Supabase is not required as the runtime.
- `icm/` — ICM context architecture and 20-stage autonomous build workspace.
- `grinions/` — GRINIONS execution governance.
- `openspec/` — accepted/change specifications.
- `ops/` — reports, evidence, and rollback receipts.

The owner's real server is intentionally disconnected until the dedicated infrastructure/security stages. Do not invent server topology or credentials.

## Governance

Read before editing:

1. `EMERALD_TABLETS.md`
2. `AGENTS.md`
3. `TOKEN_SAVING_RULES.md`
4. `icm/CONTEXT.md`
5. the active stage `icm/stages/<stage>/CONTEXT.md`

### Context and token rules

- One active ICM stage at a time.
- JCodeMunch before broad repository reads.
- RTK for verbose shell output.
- Caveman Lite for internal/status output only — never public copy, La Genio speech, proposals, or owner instructions.
- Load only 3–7 stage-relevant skills rather than the entire skill library.
- Git/GitHub is canonical release truth; squash merge only.

Tool bootstrap:

```bash
bash scripts/agent/install-token-tools.sh
bash scripts/agent/verify-token-tools.sh
python3 harness.py next
```

## Current public application

```bash
cd frontend
pnpm install
pnpm dev
```

Current frontend package truth is defined by `frontend/package.json`; do not rely on old README stack claims.

## Data foundation

The merged PostgreSQL foundation is self-hosted/vendor-neutral and includes tenant-aware schemas, migration tracking, backup/restore tooling, and database CI. It has **not** been applied to the owner's real server.

Local disposable PostgreSQL verification is available under `infra/postgres/` and `scripts/db/`.

## 20-stage ICM build

00 Truth → 01 Repo reconciliation → 02 Asset curation → 03 Conversion architecture → 04 Copy & positioning → 05 Scroll story → 06 Visual system → 07 Public website → 08 Revenue circuit → 09 La Genio public → 10 La Genio owner → 11 Voice & channels → 12 Owner console → 13 Interactive onboarding → 14 Content & portfolio → 15 Full integration → 16 Desktop/mobile QA → 17 Security/recovery → 18 Production → 19 Owner handoff.

The final owner handoff must be bilingual (Mexican Spanish first, English parity), interactive, and understandable without technical knowledge.

## Public truth currently locked

- Brand: **dos A**
- Tagline: **audio · iluminación · video**
- Hero direction: **Audio, video, iluminación y operación. Un solo equipo.**
- Experience claim permitted by owner: **Más de 10 años de experiencia.**

Do not increase the years claim or publish legacy marketplace statistics without evidence.

## La Genio

The user-facing assistant is **La Genio**.

- Public La Genio: public event concierge; no private business-data access.
- Owner La Genio: authenticated business assistant with governed tools.
- Final pricing, proposal sends, mass campaigns, contracts, financial commitments, destructive actions, and protected account/security changes require human approval.

Hermes, PopeBot, model providers, MCP, and other implementation details stay behind this nontechnical experience unless the owner explicitly asks how the system works.
