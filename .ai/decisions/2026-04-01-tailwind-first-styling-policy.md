# Tailwind-First Styling Policy

- Status: accepted
- Date: 2026-04-01
- Area: styling
- Owners: team
- Related tasks: docs cleanup for agent guidance
- Related files: AGENTS.md, .ai/code-style.md, .ai/architecture.md, src/styles.scss, src/styles/_theme.scss
- Supersedes:
- Superseded by:

## Context

The repo guidance consistently preferred Tailwind, but the rule was only implicit and repeated. A durable styling policy is needed so future changes do not drift toward large custom CSS or inconsistent utility usage.

## Decision

Tailwind is the default styling layer for this repository.

Use Tailwind first for:

- layout
- spacing
- typography
- sizing
- borders
- responsive behavior
- utility-level visual adjustments

Use local SCSS only when:

- the styling is awkward or noisy in Tailwind
- a reusable structural pattern is clearer as component-local SCSS
- theme tokens from `src/styles/_theme.scss` need to be applied outside ergonomic utility usage

## Consequences

- large custom CSS blocks should be treated as an exception
- SCSS should stay shallow and component-local when possible
- new raw values should not be added before checking existing theme tokens and utility classes

## Alternatives Considered

A CSS-first or SCSS-first approach was rejected because it adds weight without helping the repo's core use case of small, static marketing pages.

## Notes

This policy does not require forcing unreadable utility soup into templates. Readability still matters.
