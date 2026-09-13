# Component contracts

## `SiteHeader`
Props/state: locale, active route, menu state.
Must expose quote CTA and accessible language switch.

## `HeroOrientation`
Renders brand, eyebrow, H1, support, primary/secondary CTA, verified experience line.
Must render independently of cinematic JS/media.

## `CinematicJourney`
Progressive enhancement only. Receives desktop/mobile scene definitions and proof slots. Failure returns usable static proof journey.

## `ProjectProof`
Requires source/provenance ID, alt text, optional verified client/project label, focal positions, dimensions.
Never accepts free-form unsupported “results” copy without claim status.

## `ServiceSection`
Outcome-first title/copy; optional capability disclosure. Avoid equipment inventory as primary hierarchy.

## `QuoteBriefForm`
Accessible labels, durable-submission result contract, honest errors, idempotency support when backend exists.
Never returns success on mailto fallback.

## `LaGenioEntry`
Public entry only. Does not render owner capabilities or imply private access.

## `LanguageSwitch`
ES-MX primary, EN parity. Preserve current route and user context.

## Owner components
Separate layout/design lane. Use `OpportunityCard`, `ApprovalCard`, `ProjectRisk`, `LaGenioAction`, with plain-language labels and no cinematic behavior.
