# Layout Navigation

- Status: accepted
- Date: 2026-04-07
- Area: architecture
- Owners: team
- Related tasks: shared layout guidance for mobile and desktop navigation
- Related files: AGENTS.md, .ai/architecture.md, .ai/onboarding.md, src/app/app.component.ts, src/app/layouts/topbar/topbar.component.ts, src/app/layouts/mobile-footer/mobile-footer.component.ts
- Supersedes: 2026-04-07 Mobile Sticky Footer Navigation
- Superseded by:

## Context

This repository is a mobile-first HoReCa marketing site. Navigation needs to stay fast, obvious, and space-efficient across breakpoints. A reusable layout decision needs to define the whole navigation system, not just one component in isolation.

## Decision

Use one responsive navigation layout with different surfaces by breakpoint:

- on mobile, keep the header compact and limited to brand and utility controls
- on mobile, primary navigation belongs in a sticky bottom footer
- on tablet and desktop, primary navigation belongs in the header
- the sticky footer is part of the layout strategy, not an optional extra when this layout is used

Default layout rules:

- the mobile header should contain only the logo or brand mark plus high-value utility controls such as language and theme
- the mobile sticky footer should contain at most five primary destinations
- footer items should share the row equally
- footer labels should stay short enough for a single-row mobile layout
- the sticky footer should be hidden on tablet and desktop breakpoints
- page layouts should reserve bottom spacing on mobile so content is not obscured by the sticky footer
- desktop header navigation should reuse the same primary destination set instead of defining a second navigation taxonomy
- if a project adopts this layout pattern, it should implement both parts together: compact mobile header plus mobile sticky footer, and desktop header navigation

## Consequences

- shared app shell code should keep header utilities and primary navigation clearly separated by breakpoint
- new projects based on this repo should start with one shared source of truth for primary navigation items
- adding more than five footer items should be treated as a layout change, not a routine content edit
- desktop layouts should not duplicate the mobile sticky footer if header navigation is already present

## Alternatives Considered

Keeping only a footer-specific decision was rejected because it does not fully describe the intended navigation system for similar projects.

Using the same visible navigation surface on all breakpoints was rejected because it wastes space on mobile or feels underpowered on desktop.

## Notes

This decision is about navigation surfaces and breakpoint behavior, not visual styling. Future projects can change the visual design of the header or footer while keeping this layout strategy.
