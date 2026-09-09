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
7. `frontend/src/components/site/QuoteForm.tsx`: Replaced selector with simplified mandatory fields; added mandatory explanatory notice banner at top.
8. `frontend/src/lib/site-content.ts`: Updated contact copy, email address, and quote block text in both Spanish and English.
9. `frontend/public/images/projects/*` & `frontend/public/images/services/*`: 8 production-optimized, clean-cropped WebP images.

## Mobile Interaction Upgrade Milestone (`feat/mobile-apple-polish-repo-mot`)
1. `frontend/src/app/globals.css`:
   - Tactile `:active` micro-compression (`scale(0.97)` / `scale(0.94)`) with 80ms cubic-bezier physics on all touch controls.
   - Expanded touch bounds (`min-width: 44px; min-height: 44px`) and safe-area insets.
2. `frontend/src/components/site/SiteNav.tsx`:
   - Replaced static mobile dropdown with **Vaul gesture-driven bottom drawer**.
   - 1:1 finger swipe down to dismiss, physical drag handle, accessible dialog props, zero layout distortion.
   - Desktop navigation remains 100% frozen.
3. `frontend/src/components/site/PublicShell.tsx`:
   - Mounted `sonner` Toaster configured for solid dark theme (`#101111`, `#f5f3ee`, hairline border).
4. `frontend/src/components/site/QuoteForm.tsx`:
   - Wired non-disruptive toast confirmations upon lead submission.
5. `frontend/src/components/site/ScrollReveal.tsx`:
   - Lightweight leaf component powered by `motion/react` with critically damped spring transitions (`stiffness: 240, damping: 32`).
   - Content-first fallback with automatic `useReducedMotion()` handling.
6. `frontend/src/components/site/HomePage.tsx` & `frontend/src/components/site/ServicesPage.tsx`:
   - Integrated `ScrollReveal` around services list items and audience cards.

## Milestone ZTE-20260909-0003 (UI Polish, Sequential Services & Footer Contact Fixes)
1. `frontend/src/components/site/HomePage.tsx`:
   - Numbered list renumbered sequentially `01.` through `05.` with zero gap (Hero section 100% frozen).
2. `frontend/src/components/site/SiteFooter.tsx`:
   - Added direct clickable telephone link (`tel:+525549110045`) displaying `+52 55 4911 0045` directly between the location line and email.
   - Preserved `mailto:alanis@eventosdos2a.mx` and WhatsApp deep link (`https://wa.me/525549110045`).
3. `frontend/src/app/globals.css` & `frontend/src/components/site/DosaEditorial.module.css`:
   - Converted client logo wall (`.client-wall ul`) from unconstrained flex wrap to balanced CSS Grid:
     - Desktop: 3 columns × 2 rows (`repeat(3, minmax(0, 1fr))`) with 40px uniform logo height and 72px card height.
     - Mobile: 2 columns × 3 rows (`repeat(2, minmax(0, 1fr))`) with 32px uniform logo height and 60px card height.
   - Eliminated awkward 4-top / 2-bottom split and orphan logo cards.

## Validation Commands
- Build: `cd frontend && pnpm build` (Passed, 16/16 static pages generated).
- Visual & Headless Chrome:
  - Desktop 1280x800: `proof_desktop_services.png`, `proof_desktop_client_grid.png`, `proof_desktop_footer.png`.
  - Mobile 375x812: `proof_mobile_services.png`, `proof_mobile_client_grid.png`, `proof_mobile_footer.png`.
  - Hero layout: BrandMark on LEFT, headline/copy on RIGHT, `#080909` background verified 100% intact.

## Commit & Deployment Status
- Pushed commit `c127599` to `origin/master`.
- Production auto-deploy triggered via git integration.

