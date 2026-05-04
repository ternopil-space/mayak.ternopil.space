# Mobile Sticky Footer Navigation

- Status: superseded
- Date: 2026-04-07
- Area: architecture
- Owners: team
- Related tasks: mobile footer refinement and decision capture
- Related files: .ai/decisions/index.md, src/app/app.component.ts, src/app/layouts/mobile-footer/mobile-footer.component.ts, src/app/layouts/mobile-footer/mobile-footer.component.html, src/app/layouts/mobile-footer/mobile-footer.component.scss
- Supersedes:
- Superseded by: 2026-04-07 Layout Navigation Surfaces

## Context

This website is mobile-first and content-heavy, so users need persistent access to a small set of high-value destinations. The app already used a bottom navigation pattern, but the rule was implicit: item count, visibility scope, and layout behavior were not recorded as a durable repo decision.

This decision was later broadened into a layout-level navigation policy so similar projects can reuse the full header and footer breakpoint strategy.

## Decision

Use a sticky bottom footer navigation only on mobile viewports.

Default rules:

- show the sticky footer on mobile only and hide it on tablet and desktop layouts
- keep the footer limited to a maximum of five primary destinations
- give every footer item equal width within the row
- reserve this pattern for top-priority destinations only, not overflow navigation
- keep labels short so icons and text remain readable in one row on small screens

## Consequences

- shared app shell code should keep mobile bottom navigation isolated in one layout component
- adding a sixth destination to the sticky footer should be treated as a design change, not a casual content edit
- page layouts should reserve bottom spacing on mobile so content is not obscured by the fixed footer
- tablet and desktop navigation should rely on other navigation surfaces instead of duplicating the mobile footer

## Alternatives Considered

Keeping the footer behavior undocumented was rejected because it invites silent drift in item count and breakpoint behavior.

Showing the sticky footer on all breakpoints was rejected because it wastes vertical space and conflicts with the simpler desktop layout expected for a marketing site.

## Notes

If a future requirement needs more than five destinations, prefer reducing scope or moving lower-priority links into the page content or another navigation surface before expanding the sticky footer.
