# Stage 00 — Truth baseline

Captured after ICM harness merge `6b54cc0cf053165e9cbfade5606ad71937eedae8`.

## Canonical release truth
- Repository: `executiveusa/dos2a`.
- Default branch: `master`.
- Current merged baseline: `6b54cc0cf053165e9cbfade5606ad71937eedae8`.
- GitHub is canonical release truth; squash merge only under GRINIONS.
- The owner’s real server remains intentionally disconnected. No live production database migration has been applied by the current program.

## Current application surfaces
1. `frontend/` is the current Vercel-served dos A marketing application and migration baseline.
2. Root `src/` is a separate DJ marketplace/subscription experiment and is PARKED. It contains unsupported public metrics and pricing and must not become the dos A product baseline.
3. Root `prisma/schema.prisma` is DJ-marketplace-centric legacy data. Preserve until dependency/removal evidence exists; do not destructively mutate it into the new product.
4. The additive PostgreSQL tenant/data foundation is merged under the portable SQL path but is not connected to the owner’s real server.
5. Target architecture remains the reusable Sovereign AV Business OS with dos A as Tenant #1.

## Production baseline observed
- Vercel project: `dos2a` (`prj_tezul1L8gVyxokWFX8OwwQZRMtMA`).
- Production URL `https://dos2a.vercel.app/` returned HTTP 200 during this audit.
- The post-harness master deployment for `6b54cc0...` was observed building as `dpl_86cRLKfr1C1U7VsvYDedf9ogKZ1U`; the prior live page remained available during the build.
- Vercel root directory is `frontend`.

## Verified public-site defects / gaps
### Brand and five-second clarity
- Public metadata, navigation, footer, and hero still use legacy `DOS2A` / `D2A` rather than canonical `dos A`.
- The hero begins with a blocking cinematic intro and later requires an “Entrar” action before the actual content. This violates the approved five-second clarity rule.
- The target first-screen message is not yet present: `Audio, video, iluminación y operación. Un solo equipo.`

### Broken media / navigation
- The hero references `/images/hero-stage.jpg`; the production URL returned HTTP 404 during this audit.
- Navigation links to `#montajes` while the rendered package section is `#paquetes`, creating a broken internal jump.

### Public AI surface
- `/chat` is publicly reachable and presents `DOS2A Chat` plus provider configuration.
- The browser-side chat model stores provider configuration/API key material in localStorage and performs direct provider calls, including Anthropic browser access. This is not the governed La Genio architecture and must be removed from public use after a safe replacement exists.
- One built-in quote-agent prompt instructs the model to provide “precios reales” without a governed pricing source. Do not use it as production pricing authority.

### Lead capture
- `frontend/src/lib/api.ts` posts to `NEXT_PUBLIC_API_URL` when configured; on failure/absence it opens a `mailto:` URL and returns `{ success: true }` immediately.
- Therefore the current UI can display a successful submission without proof that a durable lead record or email delivery exists.
- The revenue circuit must not claim a lead is captured until durable persistence succeeds.

### SEO / positioning
- Metadata still uses legacy brand naming and includes `DJ equipment rental` among keywords.
- Current visible coverage copy says `Ciudad de México y alrededores`; approved positioning is Ciudad de México first with projects throughout Mexico.
- Public copy does not yet reflect the full approved service breadth or the selected audience of corporate event/marketing teams plus agencies/producers.

### Mobile / cinematic
- Current hero uses `backgroundAttachment: fixed` and desktop-oriented blocking intro behavior. This is not evidence of a separately art-directed mobile cinematic experience.
- Mobile must be treated as a first-class composition with reduced-motion fallback, not a desktop crop.

## Locked product truth supplied by owner
- Canonical public brand: `dos A`.
- Tagline: `audio · iluminación · video`.
- Audience: corporate event/marketing teams and event agencies/producers.
- Geography: Ciudad de México first; projects throughout Mexico.
- Public wording permitted by owner: `Más de 10 años de experiencia.` This is owner-approved wording; no independent historical corroboration is recorded yet.
- Supplied DOSA project photography is stated by the owner to be cleared for public use, including visible client/project branding. Each asset must still be classified and provenance-preserved before publication.
- Visual direction: grounded cinematic realism using real project proof.
- Public La Genio and owner La Genio are separate trust contexts.
- Campaign mass-send and final proposal price/send remain human-approved actions.

## Non-negotiable architecture boundaries
- Public web remains available if Hermes, CMS, or workers fail.
- Agents use governed narrow tools; no unrestricted direct SQL credentials.
- Public La Genio cannot read private owner/business records.
- Real server connection starts with inventory, backup, staging, least privilege, migration/authorization tests, and recovery evidence.
- No destructive legacy cleanup until dependency searches, builds, tests, and rollback evidence prove it safe.

## Immediate stage handoff
Stage 01 must reconcile branch/PR truth from this baseline. Stage 02 then owns the full media inventory and desktop/mobile art direction. Product/UI coding does not begin until those truth outputs are merged.
