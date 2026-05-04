# Empty State Pattern

- Status: accepted
- Date: 2026-04-30
- Area: styling
- Owners: team
- Related tasks: align favorites empty screen with existing page-empty design
- Related files: AGENTS.md, .ai/code-style.md, .ai/content-pages.md, src/app/pages/jobs/jobs.component.html, src/app/pages/events/events.component.html, src/app/pages/reviews/reviews.component.html, src/app/pages/landing/landing.component.html
- Supersedes:
- Superseded by:

## Context

This repository already contains a consistent empty-state pattern on multiple pages, but that pattern was not documented as a durable rule. A newer empty screen introduced a different visual treatment with a centered white card, shadow, and custom CTA, which created avoidable design drift.

## Decision

When a page or section has no content, follow the existing repo empty-state pattern already used on placeholder pages.

Default empty-state rules:

- reuse the current empty-state visual language from existing pages before creating a new variation
- prefer a full-width section inside the standard page container, not a detached hero card
- use theme tokens such as `var(--c-bg-secondary)`, `var(--c-border)`, `var(--c-secondary)`, and related text tokens instead of one-off raw palette classes
- prefer the established structure: icon badge, small uppercase label, title, and short supporting text
- only add a CTA when the page genuinely needs one and it fits the surrounding page pattern
- treat alternative empty-state layouts as an exception that needs a clear page-specific reason

Reference implementations currently include pages such as jobs, events, reviews, sales, articles, and quests.

## Consequences

- new empty states should be implemented by matching an existing repo example first
- visual changes to empty states should be treated as a shared pattern decision, not a one-off component tweak
- reviews should flag white-card or off-theme empty states unless the page has a documented exception

## Alternatives Considered

Allowing each page to design its own empty state was rejected because this project is small, static-first, and already has a reusable pattern.

Documenting this only in a general style guide was rejected because the rule is specific, durable, and tied to an existing cross-page design pattern.

## Notes

This decision applies to both full page empty states and section-level zero-data states such as favorites, jobs, or other not-yet-populated content areas.
