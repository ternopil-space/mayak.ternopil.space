# Theme-Aware Button Pattern

- Status: accepted
- Date: 2026-05-01
- Area: styling
- Owners: team
- Related tasks: fix dark-mode CTA contrast and align empty-state button treatment
- Related files: .ai/code-style.md, src/styles.scss, src/app/pages/jobs/jobs.component.html, src/app/pages/menu/menu.component.html
- Supersedes:
- Superseded by:

## Context

The repo had several page CTAs with duplicated inline Tailwind classes. Filled buttons hardcoded `text-white`, which made labels low-contrast in dark mode because the dark theme uses a light secondary button background. Empty-state CTAs also drifted between outline and filled treatments.

## Decision

Use the shared `ui-btn` utilities in `src/styles.scss` for page-level CTAs.

Button rules:

- use `ui-btn ui-btn-primary` for the primary page action and for empty-state recovery actions such as returning to the menu
- use `ui-btn ui-btn-secondary` for secondary actions
- keep button colors theme-aware through CSS variables; do not hardcode white text on token-based filled buttons
- when a label may be long, add a small template-level minimum width instead of creating a new button style

## Consequences

- future CTA changes should reuse the shared button utilities first
- dark and light mode button contrast stays consistent
- reviews should flag raw ad hoc CTA class strings when they duplicate the shared pattern

## Alternatives Considered

Keeping page-local button classes was rejected because it had already caused style drift and a theme contrast bug.

Adding a dedicated Angular button component was rejected because this repo is a small static-first marketing site and the shared CSS utility is enough.
