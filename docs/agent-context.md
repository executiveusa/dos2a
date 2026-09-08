# Agent Context: dos2a (DOS A)

## Repo Purpose
Website for **dos A** (Eventos Dos2A) — high-end audiovisual production, stage lighting, sound engineering, and corporate event management in Mexico.

## Stack
- Next.js 15.5 (App Router, static export)
- React 19, TypeScript
- Tailwind CSS v4 + scoped CSS Modules (`DosaEditorial.module.css`)
- Lucide React icons
- Supabase Edge Functions / REST for lead capture fallback

## Main Directories
- `frontend/src/app/`: Next.js routes (`/`, `/servicios`, `/portafolio`, `/contacto`, `/cotizar`, etc.)
- `frontend/src/components/site/`: Main page components (`HomePage.tsx`, `ServicesPage.tsx`, `PortfolioPage.tsx`, `ContactPage.tsx`, `QuotePage.tsx`, `QuoteForm.tsx`, `PublicShell.tsx`, etc.)
- `frontend/src/lib/`: `site-content.ts` (bilingual Spanish/English copy dictionary), `api.ts`, `language.tsx`
- `frontend/public/images/`: WebP image assets organized by section (`hero/`, `projects/`, `services/`, `brand/`)

## Important Conventions & User Overrides
- **Hero Alignment**: Logo on LEFT, headline/copy/CTA on RIGHT (client email initially suggested opposite, but user gave explicit instruction: *The hero logo stays on the LEFT. The text goes on the RIGHT*).
- **Exact Verbatim Copy**: All Spanish text from Ivette/Vett Milo's Sept 5 email and Aug 31 baseline is locked verbatim without paraphrase or translation distortion.
- **Production Guardrails**: No force-push, no merge to `master`, no direct production deployment without explicit human sign-off.
- **Form Submission**: Real leads are never submitted during testing. Native HTML5 required field validation blocks empty submissions.

## Files Changed in Revision (Ivette Sept 05 Locked)
1. `frontend/src/components/site/HomePage.tsx`: Hero 2-column layout (BrandMark LEFT, text RIGHT); moved "SERVICIOS" label down to list start; replaced services preview image with `dosa-home-services-universal.webp`; replaced about preview image with `dosa-about-abbott.webp`.
2. `frontend/src/components/site/DosaEditorial.module.css`: Added `.home :global(.hero-grid)` responsive layout rules for desktop/mobile and tuned `.hero-brand` sizing.
3. `frontend/src/components/site/ServicesPage.tsx`: Truncated intro statement to exact client wording; reduced Service 01 heading clamp size; linked dedicated high-res WebP photos for Service 01 (Audio & Luz), Service 04 (Coordinación), Service 05 (Traducción), and Service 06 (Especiales).
4. `frontend/src/components/site/PortfolioPage.tsx`: Updated H1 and intro copy; updated closing CTA copy to "Cotización a la medida"; slotted Abbott in Position 04 and El Universal in Position 06.
5. `frontend/src/components/site/ContactPage.tsx`: Updated direct email to `alanis@eventosdos2a.mx`; embedded `<QuoteForm />` directly on page under WhatsApp and Email cards.
6. `frontend/src/components/site/QuotePage.tsx`: Synchronized helper sidebar copy with client specification.
7. `frontend/src/components/site/QuoteForm.tsx`: Replaced selector with simplified mandatory fields (Nombre completo, Correo electrónico, Fecha estimada del evento, Ubicación / Ciudad / Recinto, Asistentes o aforo aproximado, Detalles o idea del evento); added mandatory explanatory notice banner at top.
8. `frontend/src/lib/site-content.ts`: Updated contact copy, email address, and quote block text in both Spanish and English.
9. `frontend/public/images/projects/*` & `frontend/public/images/services/*`: 8 production-optimized, clean-cropped WebP images.

## Recent Changes (PR #39, Commit d90a62f)
1. `frontend/src/components/site/ServicesPage.tsx`: Removed redundant overlines repeating the service label in Service 03 (Escenarios & Stands) and Service 05 (Traducción Simultánea).
2. `frontend/src/components/site/HeroIntro.tsx`: Orchestrated transition timing (exit at 2300ms, end at 3200ms) with `dataset.heroIntro` set to "active" and "exiting" on `<html>`, using session key `dos2a:hero-intro:v3`.
3. `frontend/src/components/site/HeroIntro.module.css`: Added vertical opening mask (`clip-path: inset(50% 0 50% 0)`) and opacity fade transition.
4. `frontend/src/components/site/DosaEditorial.module.css`: Choreographed hero entrance during exit phase: `.hero-brand` settles from `scale(1.03)` to `scale(1)` over 1100ms; staggered text reveal for eyebrow (120ms), h1 (240ms), support (360ms), and CTA (480ms); complete reduced-motion fallback overrides.
5. Footer Email: Verified display and link to `alanis@eventosdos2a.mx`.
6. Header Logo: Verified existing approved 13% enlargement (45.2px desktop / 35px mobile).

## Validation Commands & Results
- Build: `cd frontend && npm run build` (16/16 static pages generated, 0 errors).
- CI / Checks: All GitHub Actions checks passed on PR #39 (`build-and-smoke`, Vercel deploy, Netlify preview).
- Squash-merged to `master` as commit `d90a62f`.
- Live Production Deployment: Verified live on `https://eventosdos2a.mx` and `https://dos2a.vercel.app` (HTTP 200, verified removal of duplicated overlines on `/servicios`).

## Current Known Issues / Next Steps
- Production is fully updated and verified live.
- Netlify fallback domain (`https://dos2a.netlify.app`) remains untouched as required.
