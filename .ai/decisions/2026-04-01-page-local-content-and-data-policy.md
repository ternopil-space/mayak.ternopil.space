# Page-Local Content And Data Policy

- Status: accepted
- Date: 2026-04-01
- Area: content
- Owners: team
- Related tasks: docs cleanup for agent guidance
- Related files: AGENTS.md, .ai/content-pages.md, .ai/architecture.md
- Supersedes:
- Superseded by:

## Context

Most pages in this repo are static business pages, but without an explicit decision it is easy to introduce services and abstractions earlier than the product actually needs.

## Decision

Keep content and simple business data close to the page by default.

For typical HoReCa pages:

- prefer page-local constants or local config
- extract shared content structures only when reuse is real and repeated
- avoid services for static page content
- avoid CMS or API integration unless explicitly required by the task

## Consequences

- simple sections should usually be implemented in the page or a directly related component
- data structures should be easy to review in the same area as the rendered content
- new shared services should justify reuse beyond a single page

## Alternatives Considered

A service-first content approach was rejected because it adds indirection to a repo whose main output is static landing pages.

## Notes

If a feature becomes truly cross-cutting or operationally dynamic, it can be promoted later. The default still starts local.
