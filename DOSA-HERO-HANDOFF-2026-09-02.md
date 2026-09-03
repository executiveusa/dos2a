# DOS A — Full Hero / Deployment Handoff

Last updated: 2026-09-02

## FIRST ACTIONS FOR THE NEXT AGENT

Before making any code, design, branch, merge, or deployment change:

1. **Connect to GitHub first** and verify access to `executiveusa/dos2a`.
2. Verify the following refs exactly:
   - `master`
   - `redesign/ivette-controlled-2026-09-02`
   - `experiment/hero-media-lab-2026-09-02`
   - `snapshot/pre-ivette-redesign-2026-09-02`
   - `snapshot/pre-hero-image-swap-2026-09-02`
3. **Connect to Vercel second** and call `list_teams` before assuming which Vercel account/team is active.
4. Enumerate projects in every available Vercel team and determine which team still has build capacity.
5. Do **not** merge anything to `master`.
6. Do **not** modify the controlled Ivette redesign branch until the user visually approves the hero experiment.
7. Use the experiment branch as the only working surface for the next hero/deployment pass.

---

# Repository facts

Repository:
- `https://github.com/executiveusa/dos2a`
- repo ID: `1211177783`
- default branch: `master`

GitHub access was verified in the prior chat with admin/push permission.

## Frozen baseline

Pre-redesign baseline:
- SHA: `08024ec529e29c8274d7a7e764d837e0ddf25f53`
- branch snapshot: `snapshot/pre-ivette-redesign-2026-09-02`

This is the permanent rollback before the controlled Ivette redesign.

## Controlled Ivette redesign

Branch:
- `redesign/ivette-controlled-2026-09-02`

Verified current head:
- `025068af73b0da9405d819491550af7b7a526b61`

PR:
- #35
- title: `WIP: controlled Ivette redesign — homepage + services + mobile final`
- remains draft/open/unmerged

Issue:
- #34
- controlled redesign authority and rollback notes

## Pre-hero snapshot

A dedicated checkpoint was created immediately before hero experiments:
- `snapshot/pre-hero-image-swap-2026-09-02`
- points to `025068af73b0da9405d819491550af7b7a526b61`

This is the correct rollback point if any hero experiment is rejected.

## Hero media lab

Experiment branch:
- `experiment/hero-media-lab-2026-09-02`

Verified current head at handoff creation:
- `a16830b00a6b75383bd96941155b8282cb4715f5`

This branch is the ONLY place the hero experiment should be developed until user approval.

---

# User-approved direction

The user explicitly chose **Hybrid B**.

The desired opening journey is:

1. A short sequence of real DOS A imagery.
2. One brief real-motion DOS A/Mobil moment.
3. The original DOS A signature / logo draw-on animation completes.
4. The whole opening fades fully to black.
5. The black layer fades away to reveal the actual Ivette homepage hero beneath it.
6. Motion stops completely.
7. The rest of the page is calm and scrollable.
8. The sequence does **not** loop.
9. It should run only once per browser session / reopen behavior, not on every internal navigation or refresh.
10. `prefers-reduced-motion` must skip directly to the static site experience.

User intent in plain language:
- a punchy but premium first impression
- show what DOS A actually does
- finish with the DOS A signature
- fade to black
- then let the real site appear and become calm
- no perpetual animated hero
- no annoying slideshow

The user asked for a Collins-level execution: restraint, hierarchy, real work, no decorative motion for motion's sake.

---

# Current hero experiment implementation

The experiment branch contains a one-time opening component created for this purpose.

Files added/changed in the hero lab include:
- `frontend/src/components/site/HeroIntro.tsx`
- `frontend/src/components/site/HeroIntro.module.css`
- `frontend/src/components/site/PublicShell.tsx`
- `icm/stages/hero-media-lab/INVESTIGATION.md`

The implementation uses `sessionStorage` with a DOS A hero-intro key so the opening does not repeatedly replay during the same browser session.

The current phase timing in `HeroIntro.tsx` is approximately:
- image 1: 0 ms
- image 2: 1250 ms
- image 3: 2500 ms
- real video: 3750 ms
- signature: 5050 ms
- black: 8450 ms
- exit: 9050 ms
- hidden/static site: 9850 ms

This ~9.8 second timing is provisional. The prior agent believed the structure was right but suspected a Collins-level final pass may shorten it by about 1–1.5 seconds after visual QA.

Do not change timing blindly. First deploy and watch it.

---

# DOS A signature animation — important

The signature animation is not invented. It existed in the earlier DOS A implementation.

Historical behavior:
- the three `bm-dos` SVG paths fade in sequentially
- the `bm-cable` path then reveals/draws across using `clip-path`
- reduced-motion users receive the fully visible static mark

Historical CSS timing found in Git history:

```css
.hero-brand .bm-dos path {
  opacity: 0;
  animation: bm-fade .5s ease .4s forwards;
}

.hero-brand .bm-dos path:nth-child(2) {
  animation-delay: .8s;
}

.hero-brand .bm-dos path:nth-child(3) {
  animation-delay: 1.2s;
}

.hero-brand .bm-cable {
  clip-path: inset(0 100% 0 0);
  animation: bm-draw 2s cubic-bezier(.22,1,.36,1) 1.3s forwards;
}
```

The next agent must preserve/recover this authentic DOS A motion rather than inventing another logo effect.

---

# Ivette content fidelity — NON-NEGOTIABLE

Ivette's Spanish content must remain word-for-word.

Do not rewrite, simplify, improve, normalize punctuation, renumber services, or alter Spanish copy during hero work.

Important examples:

Hero:
- `Audio, video, iluminación y operación. Un solo equipo.`
- `PRODUCCIÓN AUDIOVISUAL & EVENT MANAGEMENT`
- `Sistemas de audio, iluminación, pantallas LED y escenografías de alta gama, diseñados para reflejar la excelencia y potencia de tu marca.`
- `COTIZAR MI EVENTO`

Homepage service numbering must remain exactly:
- `01.`
- `03.`
- `04.`
- `05.`
- `06.`

Do not "fix" the missing 02. It is intentional because Ivette supplied it that way.

Government proof remains the full sentence unless a separately approved mobile exception is invoked after rendered QA:
- `Producción técnica para dependencias del sector público como CONAHCYT, CONAVI, IFT y CONAPRED`

Do not attribute model-written English translations to Ivette.

---

# Hero design guardrails

Hero-media work is an isolated layer, not a redesign.

Do not change during this experiment:
- Ivette copy
- hero typography
- CTA copy
- navigation
- page sections
- Services copy
- footer copy
- site information architecture
- master branch

Preferred structure:

```text
opening intro overlay
  ↓
real DOS A stills
  ↓
brief real video motion
  ↓
DOS A signature draw-on
  ↓
black
  ↓
black fades away
  ↓
existing static Ivette hero revealed
  ↓
STOP
```

The main site beneath the intro should remain fully functional and static after the opening.

---

# Original media investigation

The prior agent recovered and inspected the real DOS A source deck from the project/library:
- file: `DOSA audio.pptx`
- size: approximately 473 MB

Embedded media inventory:
- 129 total embedded media assets
- 14 JPEG
- 2 JPG
- 47 PNG
- 54 TIFF
- 8 WDP
- 4 MP4

Four embedded videos discovered:
- `media1.mp4` — 117.15 s — ~316.68 MB — dark projection / architectural event material
- `media2.mp4` — 52.07 s — ~6.69 MB — immersive Mobil LED/screen environment
- `media3.mp4` — 24.73 s — ~4.83 MB — corporate/medical conference stage
- `media4.mp4` — 22.79 s — ~4.28 MB — Mobil registration / branded arrival

Repository video assets also include:
- `frontend/public/videos/mobil-experience-reel-1080p.mp4` — ~33.7 MB
- `frontend/public/videos/mobil-reveal-loop.mp4` — ~3.3 MB
- `frontend/public/videos/mobil-reveal-poster.jpg`

Do not autoplay the 33.7 MB full reel as the hero.

The hybrid prototype intentionally uses a short real-motion moment instead.

---

# Higher-quality photo source facts

The existing ICM asset manifest documents a separate source archive:
- `DOSA audio.zip`
- 82 photographs
- all documented as 4000×2250 JPEG originals

This is important because current website WebP derivatives are tiny and visibly degraded.

Known tiny current derivatives include approximately:
- `dosa-recovered-hero-scale.webp` ~12 KB
- `dosa-recovered-audio-video.webp` ~14 KB
- `dosa-recovered-stand-exhibition.webp` ~14 KB
- `dosa-recovered-experiential-entry.webp` ~10 KB

Do not upscale these tiny derivatives if the 4000×2250 source originals can be recovered.

Preferred pipeline:

```text
original source
→ conservative exposure/color/contrast cleanup
→ denoise/compression cleanup if necessary
→ resize/art direct crop
→ AVIF/WebP derivative
→ AI upscale only if the original itself is genuinely too soft
```

No generative alteration of:
- faces
- logos
- client branding
- signage
- equipment
- stage structures
- documented event content

---

# Existing curated photo shortlist

The repository's prior asset curation ranked these original 4000×2250 source photographs:

1. `5299628e-ea01-4bcc-a063-5ca66d2340c0-35.jpg` — hero-scale
2. `...-20.jpg` — audio/video
3. `...-17.jpg` — lighting
4. `...-23.jpg` — creative installation
5. `...-54.jpg` — experiential entrance
6. `...-62.jpg` — stand/exhibition
7. `...-36.jpg` — audience proof
8. `...-26.jpg` — immersive video
9. `...-58.jpg` — digital installation
10. `...-12.jpg` — conference operations

PowerPoint first-pass Tier A candidates included:
- `image40.png` — L'Oréal gala / corporate room
- `image38.jpeg` — Mobil immersive venue
- `image51.tiff`, `image52.tiff`, `image53.png` — multi-screen experience
- `image54.jpg` — geometric LED/scenic wall
- `image63.tiff` — corporate multi-screen stage
- `image82.tiff`, `image83.png` — Mobil registration
- `image84.tiff`, `image85.tiff` — Mobil experiential entry
- `image89.png` — El Universal illuminated corridor
- `image95.tiff`, `image96.tiff` — dark Mobil lounge/entry

Concept renders must never be presented as completed real projects.

---

# Prototype directions already tested locally

Three proof cuts were created during the previous investigation:

A. Still Motion
- real stills only
- slow camera push and controlled dissolves

B. Hybrid — USER SELECTED
- restrained real stills
- one brief genuine Mobil motion moment
- best balance of authenticity, weight, and premium feel

C. Compact Real Video
- short real moments from the four PowerPoint videos
- stronger reel energy, but less restrained/editorial

The user explicitly selected **B — Hybrid**.

Do not restart the direction-selection process unless visual QA exposes a real issue.

---

# Vercel facts and deployment blocker

Known historical Vercel data:

Project previously used for controlled redesign:
- project ID: `prj_0Tu6nDE0g7oK9BAKDmMGWw3YDmFa`
- name: `dosa`
- framework: Next.js
- root directory: `frontend`

Known Vercel team ID from previous successful deployment:
- `team_5qS6dGopLozD0HWaND62MGtM`

Known team/account labels seen in prior history:
- `pauli-4426s-projects`
- `the-pauli-effect`

Known Vercel deployment creator email observed in deployment metadata:
- `pauli@thepaulieffect.com`

GitHub commit-author email often seen in metadata:
- `executiveusa@gmail.com`

Do not assume those two emails identify two separate Vercel logins.

The last successful controlled-redesign Vercel deployment used:
- commit `025068af73b0da9405d819491550af7b7a526b61`
- deployment ID `dpl_6PYZaYSzAYwAb6wK2JqM3SGHCXXs`
- unique URL `https://dosa-ab4gho2qm-pauli-4426s-projects.vercel.app`
- stable branch alias `https://dosa-git-redesign-ivette-controlled-dbd1c5-pauli-4426s-projects.vercel.app/`

The hero experiment could not be visually deployed in the prior chat because Vercel returned:
- `Deployment rate limited — retry in 24 hours.`

That rate-limit status affected the Vercel integrations visible at that time.

The user then said another Vercel account/project had been connected and wants the next agent to use that if it has build capacity.

**Next agent must call Vercel `list_teams` first and inspect actual current account state instead of relying on old assumptions.**

Recommended temporary project if a team with capacity is available:
- project name: `dosa-hero-lab`
- repo: `executiveusa/dos2a`
- branch: `experiment/hero-media-lab-2026-09-02`
- root directory: `frontend`
- framework: Next.js

Do not repoint the existing live/review DOS A project if a clean new temporary project can be created instead.

Purpose of new Vercel project:
- visual QA only
- completely isolated from master and controlled redesign
- no domain changes
- no production promotion

---

# Required visual QA before any merge

At minimum inspect:
- desktop hero timing
- mobile composition
- 320 px
- 360 px
- 375 px
- 390 px
- 414 px
- 430 px
- 768 px
- 1024 px
- 1440 px
- important landscape case

Acceptance checks:
- no horizontal overflow
- no headline/CTA clipping
- signature is readable
- transitions are not frantic
- fade to black feels intentional
- site reveal does not flash or jump
- body scroll unlocks correctly
- static hero remains after intro
- intro does not replay repeatedly in same session
- reduced-motion path skips the intro
- mobile does not inherit a bad desktop crop
- first meaningful content remains clear and usable

Do not claim Collins/Apple-level completion without rendered evidence.

---

# Collins-level design standard

The guiding principle used throughout this project:

> Perfection is reached when there is nothing left to remove without harming the user's ability to succeed.

Hero-specific interpretation:
- capability before spectacle
- authenticity before generated effects
- movement should have one narrative job
- strong hierarchy
- controlled negative space
- premium pace
- no generic SaaS motion
- no infinite carousel
- no loud festival montage
- no kinetic copy competing with the DOS A mark
- the hero must become calm after the opening sequence

---

# Legal / unrelated scope warnings

Do not use hero work as an excuse to touch legal/footer facts.

Terms and Privacy remain incomplete because legal/operator facts were not verified.

Do not invent:
- operator identity
- business address
- legal jurisdiction
- controller identity
- privacy contact
- data-processing claims
- contract terms

---

# Immediate execution plan for the next agent

## Phase 1 — Connect and verify

1. Connect GitHub.
2. Verify repo `executiveusa/dos2a`.
3. Verify exact branch heads and snapshots.
4. Connect Vercel.
5. Call `list_teams`.
6. Call `list_projects` on every available team.
7. Identify a team/account with build capacity.

## Phase 2 — Inspect experiment before changing it

1. Read `DOSA-HERO-HANDOFF-2026-09-02.md`.
2. Read `icm/stages/hero-media-lab/INVESTIGATION.md`.
3. Read `HeroIntro.tsx` and `HeroIntro.module.css`.
4. Read `PublicShell.tsx`.
5. Compare experiment branch against `025068af73b0da9405d819491550af7b7a526b61`.
6. Confirm only hero-lab-specific changes exist.

## Phase 3 — Deploy a clean visual QA project

If another Vercel team has capacity:

1. Create/use a fresh project `dosa-hero-lab`.
2. Repo: `executiveusa/dos2a`.
3. Branch: `experiment/hero-media-lab-2026-09-02`.
4. Root directory: `frontend`.
5. Framework: Next.js.
6. Deploy the experiment head.
7. Do not promote to production.
8. Return the preview URL to the user.

## Phase 4 — Collins visual pass

Watch the intro from a truly fresh session.

Determine whether:
- ~9.8 s is right
- or trim 1–1.5 s while preserving the sequence

Refine only:
- timing
- transition pacing
- crop/art direction
- signature timing
- fade-to-black/reveal timing
- performance

Do not alter Ivette content or broader homepage design.

## Phase 5 — Mobile

Do an independent mobile art-direction pass if needed.

Do not simply shrink desktop.

## Phase 6 — User review

Provide:
- experimental preview URL
- untouched Ivette preview URL
- concise before/after explanation
- exact experiment branch/commit
- rollback point

Wait for explicit user approval.

## Phase 7 — Only after approval

Fold the approved hero intro changes into the controlled redesign branch.

Keep PR #35 unmerged until the user explicitly approves the completed redesign.

Never merge to master merely because tests pass.

---

# STOP CONDITIONS

Stop and ask before proceeding if any step would require:
- changing Ivette Spanish copy
- deleting current approved assets
- merging to master
- changing DNS/domain
- promoting to production
- inventing legal facts
- generatively altering documentary client/project imagery
- replacing the user-selected Hybrid B concept with a different creative direction

---

# Definition of done for the next chat

The next chat is successful when:

1. GitHub and Vercel are both connected and verified.
2. A new/available Vercel team with build capacity is identified.
3. `experiment/hero-media-lab-2026-09-02` is deployed to a safe preview project.
4. Hybrid B is visually tested from a fresh session.
5. DOS A signature completes correctly.
6. Opening fades to black and then reveals the static Ivette hero.
7. It does not loop/replay throughout the same session.
8. Mobile and desktop are visually checked.
9. User receives a working preview URL.
10. Nothing is merged to `master` without explicit approval.
