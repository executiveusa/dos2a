---
name: dos2a-studio
version: 1.0.0
description: |
  Master skill file for DOS2A — AI-powered audio, lighting, and AV production platform.
  Combines design doctrine, humanizer, video prompt generation, course creation,
  and multi-agent orchestration into one unified skill surface.
  Trigger on: any DOS2A development, design review, content generation, or course creation task.
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - WebSearch
  - AskUserQuestion
  - ExecuteCommand
---

# DOS2A Studio Skills

> Compound skill file — load once, get access to all DOS2A capabilities.

---

## Skill 1: Design Laws (from Cynthia Studio Doctrine)

### Non-Negotiable Rules
| Law | Name | Rule |
|-----|------|------|
| 0 | Feature First | Design the feature, not the layout |
| 1 | Hierarchy | Exactly 3 levels: primary, secondary, tertiary |
| 2 | Spacing Is Meaning | Spacing communicates relationships; use 4/8/12/16/24/32/48/64px scale |
| 3 | Visual Weight | Direct the eye via size, color, weight, space, position |
| 4 | Empty States | Every component needs 4 states: empty, loading, populated, error |
| 5 | Borders Last Resort | Prefer spacing → bg color → shadow → border |
| 6 | Labels = Actions | "Save Changes" not "Submit" |
| 7 | One Action Per Viewport | One clear CTA per scroll-stop |
| 8 | Mobile ≠ Small Desktop | 44px touch targets, no parallax, no overflow at 375px |
| 9 | Motion = Meaning | Animation is information, not decoration |
| 10 | Performance | Animate only transform/opacity, IntersectionObserver, lazy-load |
| 11 | Accessibility | Semantic HTML, ARIA, keyboard nav, WCAG AA, reduced-motion |
| 12 | Score Everything | UDEC 14-axis review before shipping |
| 13 | Studio Gets Smarter | Record wins, failures, patterns after every project |

### Forbidden (Hard Failures)
- Fonts: Inter, Roboto, Arial, Helvetica, Open Sans, Montserrat, Poppins, Lato
- Colors: Purple as primary, neon gradients
- Patterns: Glassmorphism on cards, gradient text, scroll listeners (use IntersectionObserver), Shadcn components, linear easing, generic AI card grids
- Missing: Lenis + GSAP, mobile breakpoints, keyboard navigation, semantic HTML

### DOS2A Design Tokens
```css
--color-bg: #080a0e;
--color-surface: #0d1017;
--color-gold: #d4af37;      /* Primary action */
--color-sky: #38bdf8;        /* Tech accent */
--color-rose: #e11d48;       /* Alerts */
--color-text: #f1f5f9;
--color-muted: #94a3b8;
--color-border: rgba(255,255,255,0.07);
--radius-card: 10px;
--radius-btn: 7px;
--font-display: Sora, sans-serif;  /* 700-800 weight */
--font-body: Inter, sans-serif;    /* 400-500-600 weight */
```

---

## Skill 2: Humanizer (v2.3.0)

When editing or reviewing text for DOS2A marketing, course content, or client-facing copy:

1. **Scan for AI patterns**: inflated symbolism, promotional language, em dash overuse, rule of three, AI vocabulary ("delve", "landscape", "tapestry", "multifaceted", "foster"), negative parallelisms
2. **Rewrite**: Replace AI-isms with natural alternatives
3. **Add soul**: Vary sentence length, have opinions, acknowledge complexity, use first person when appropriate
4. **Final pass**: Ask "What makes this obviously AI?" — fix those tells

### Banned Words/Phrases
delve, tapestry, landscape, multifaceted, foster, leverage, robust, streamline, utilize, innovative, synergy, paradigm, cutting-edge, groundbreaking, revolutionize, game-changer, seamless, holistic, empowering, transformative, stands as a testament, it's worth noting, in the realm of, at the end of the day

---

## Skill 3: Seedance Loop Prompt Builder

For generating video loop backgrounds for DOS2A website and marketing:

### Output Format (7 mandatory sections)
1. **SCENE** — Subject, environment, mood references, color palette
2. **CAMERA** — Motion type, speed, start=end position, elevation/angle
3. **ACTION ARC** — Starting state → transformation → peak moment → return
4. **TEXT CHOREOGRAPHY** — Headlines with entrance/position/exit timing
5. **LIGHTING** — Key/fill/rim setup, color temperature, dynamic changes
6. **AUDIO DIRECTION** — Sound design notes for pairing
7. **LOOP MECHANICS** — Frame 1 = frame last, transition technique

### DOS2A Default Palette for Video
- Dark void: `#080a0e`
- Gold accent light: `#d4af37`
- Sky rim: `#38bdf8`
- Smoke/haze: warm amber

---

## Skill 4: Codebase-to-Course

When asked to explain DOS2A or generate educational content:

1. **Analyze** the codebase — identify actors, data flows, user journeys
2. **Structure** as 4-6 modules (wide → deep zoom)
3. **Output** as self-contained HTML directory:
   - `styles.css` — shared styles
   - `main.js` — scroll navigation + quiz logic
   - `module-{n}.html` — per-module content
   - `index.html` — assembled course
4. **Target audience**: Vibe coders — people who build with AI but want to understand the code
5. **Every concept** explained from zero — no assumed CS knowledge
6. **Every module** answers "why should I care?" before "how does it work?"

---

## Skill 5: Multi-Provider AI Routing (from Synthia Gateway)

When configuring AI providers for DOS2A chat:

### Provider Detection (from model name)
| Prefix | Provider | Base URL |
|--------|----------|----------|
| `gpt-` | OpenAI | `https://api.openai.com/v1` |
| `claude-` | Anthropic | `https://api.anthropic.com/v1` |
| `gemini-` | Google | `https://generativelanguage.googleapis.com/v1beta` |
| `llama-`, `mixtral-` | Groq / Together | Provider URL |
| `openrouter/` | OpenRouter | `https://openrouter.ai/api/v1` |
| `ollama/` | Ollama | `http://localhost:11434/v1` |

### BYOK (Bring Your Own Key) Pattern
- User stores their own API key in browser `localStorage` (encrypted)
- Gateway proxies requests with user's key
- No server-side key storage for user keys
- OpenRouter as universal fallback (works with any model)

---

## Skill 6: UDEC Quality Scoring

14-axis scoring for design review. Minimum composite: **8.5**

| Axis | Code | Weight | Blocker? |
|------|------|--------|----------|
| Visual Hierarchy | VHR | 12% | No |
| Typography Mastery | TYP | 10% | No |
| Spatial Composition | SPA | 8% | No |
| Color System | CLR | 8% | No |
| Motion & Interaction | MOT | 12% | **YES (≥7.0)** |
| Material & Surface | MAT | 8% | No |
| Component Architecture | COM | 8% | No |
| Information Architecture | INF | 6% | No |
| Mobile Responsiveness | MOB | 8% | No |
| Performance Discipline | PER | 6% | No |
| Atmospheric Depth | ATM | 6% | No |
| Content Quality | CON | 4% | No |
| Accessibility | ACC | 2% | **YES (≥7.0)** |
| Originality | ORI | 2% | No |
