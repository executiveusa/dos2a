# Stage 06 — dos A visual system

## Design character
Precise, cinematic, technical, restrained.

The brand should feel like a team trusted to run a live event, not a software startup and not a nightlife flyer.

Use real project photography as the primary source of color and emotion. The UI itself stays mostly neutral so the work carries the visual weight.

## Color
### Core
- `ink-950` #080909 — page background
- `ink-900` #101111 — raised dark surface
- `ink-800` #191a1a — secondary surface
- `paper-50` #f5f3ee — primary light text / light surface
- `paper-200` #d8d5ce — secondary light text
- `paper-500` #918f89 — muted text
- `line-dark` rgba(245,243,238,.14)
- `line-light` rgba(8,9,9,.14)

### Signal accents
Use accents sparingly and functionally:
- `signal-amber` #d4a72c — attention/active/technical marker
- `signal-blue` #4ca6d8 — information/link/technical signal

Do not use gradients as the default visual language. Do not apply gold everywhere to simulate luxury. Most surfaces should be black/charcoal/soft-white with color coming from real imagery.

## Typography
### Display
Use **Sora** only for short high-impact display text if the current implementation keeps it. Prefer weights 600–700, never 800 for long blocks.

### Body/UI
Use **Inter** for body, navigation, labels, forms, and owner interfaces.

### Hierarchy
- Hero H1: clamp(2.75rem, 7vw, 7rem), line-height .94–1.0, max 10–12 words.
- Section H2: clamp(2rem, 4.5vw, 4.5rem), line-height 1.0–1.08.
- Body lead: 1.125–1.375rem, line-height 1.5–1.65.
- Body: 1rem, line-height 1.65–1.75.
- Labels: .75–.8125rem, letter spacing .06–.12em only for short labels.

No all-caps paragraphs. No tiny gray text used to look sophisticated.

## Layout
- Content max width: 1240–1320px.
- Reading width: 640–760px.
- Desktop outer gutters: clamp(24px, 5vw, 72px).
- Mobile outer gutters: 18–22px.
- Section spacing desktop: 96–160px depending on narrative weight.
- Section spacing mobile: 64–96px.

Use asymmetry when it helps image/story rhythm, not for novelty.

## Navigation
Desktop:
- simple wordmark left;
- 4–6 primary links max;
- `Cotizar` as visible primary action;
- ES/EN as compact language control;
- no mega menu unless content volume proves need.

Mobile:
- persistent top bar with wordmark + menu;
- primary quote action remains reachable in menu and key page sections;
- menu uses full readable labels, not icon-only mystery navigation.

## Buttons
Primary:
- high-contrast paper-on-ink or ink-on-paper depending on surface;
- 44px minimum touch height;
- direct verbs: `Cotizar mi evento`, `Hablar con La Genio`.

Secondary:
- quiet border or text link with directional arrow;
- never compete visually with the primary CTA.

## Cards
Avoid grids of identical rounded SaaS cards for everything.

Use three card types only:
1. **Proof card** — image first, short factual caption.
2. **Service card** — capability + what it solves + optional details.
3. **Action card** — one owner/user action with clear next step.

Corners: 0–16px depending on component. Large media can remain square or use subtle 8–12px radius. Avoid excessive pills.

## Image treatment
- Real project photos: natural color, no fake cinematic color grade that obscures evidence.
- Generated cinema: background/transition role; no client logos or fabricated text.
- Captions clearly distinguish real proof when context could be ambiguous.
- Use focal-position metadata per breakpoint.

## Brand wordmark
Public text uses `dos A` exactly. Do not use `DOS2A`, `D2A`, or `DOSA` as the visible brand.

The stylized cable/3.5mm plug wordmark may be introduced when the approved vector asset is available; text fallback remains `dos A`.

## Accessibility
- WCAG AA text contrast minimum.
- 44×44px minimum touch target for primary controls.
- visible keyboard focus.
- no information conveyed by color alone.
- headings follow document order.
- image alt describes useful proof, not aesthetic adjectives.
