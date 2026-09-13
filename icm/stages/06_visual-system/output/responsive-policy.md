# Responsive policy

## Principle
Desktop and mobile are two compositions of the same story, not one layout squeezed smaller.

## Breakpoints are content-driven
Reference ranges:
- compact: < 640px
- medium: 640–1023px
- wide: ≥ 1024px

Do not write design logic that assumes a specific phone model.

## Hero
Wide:
- H1 can occupy 50–70% of width;
- cinematic/media layer may fill viewport behind or beside content;
- CTA pair remains above fold at common laptop heights.

Compact:
- message and CTA appear before cinematic media;
- H1 3–5 lines maximum;
- use mobile-specific poster/video composition;
- avoid text over busy image unless a tested contrast treatment exists.

## Navigation
Compact menu must work at 320px CSS width and with 200% text zoom without clipping primary actions.

## Proof imagery
Every selected image gets:
- desktop focal position;
- mobile focal position or dedicated crop;
- width/height or aspect-ratio metadata;
- responsive `sizes` guidance.

## Forms
- one column on compact screens;
- labels always visible;
- input controls ≥44px tall;
- keyboard/input types appropriate to field;
- no multi-column layout below 760px unless fields are extremely short.

## Cinematic mobile
- native 9:16 chain when generated media is available;
- otherwise use deliberately composed still-based motion;
- no center-crop presented as final production experience;
- reduced-motion and low-memory fallback are equal-quality information experiences.

## Testing matrix
Minimum user-facing QA:
- 320×568
- 390×844
- 430×932
- 768×1024
- 1366×768
- 1440×900
- 1920×1080

Test touch, keyboard, 200% zoom, reduced motion, slow network, and image/video failure states.
