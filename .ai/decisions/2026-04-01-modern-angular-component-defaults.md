# Modern Angular Component Defaults

- Status: accepted
- Date: 2026-04-01
- Area: agent-behavior
- Owners: team
- Related tasks: docs cleanup for agent guidance
- Related files: AGENTS.md, .ai/code-style.md, .ai/media.md, package.json
- Supersedes:
- Superseded by:

## Context

The repo uses Angular 21, but several style rules were phrased as optional guidance instead of defaults. Angular MCP best-practice guidance supports a clearer policy for modern Angular code.

## Decision

For new or touched Angular code, use these defaults unless the surrounding code creates a concrete reason not to:

- standalone components, without adding `standalone: true`
- `changeDetection: ChangeDetectionStrategy.OnPush`
- signals for local state
- `computed()` for derived local state
- `inject()` for dependency access
- native control flow (`@if`, `@for`, `@switch`) in templates
- Angular bindings instead of manual DOM work
- `NgOptimizedImage` for static images when feasible

## Consequences

- new examples and generated code should align with modern Angular patterns
- changes that keep older patterns should have a local compatibility reason
- image handling should consider both performance and Angular's image optimization support

## Alternatives Considered

Keeping these as soft suggestions was rejected because it leads to inconsistent edits and weaker guidance for agents.

## Notes

This policy is a default, not a requirement to rewrite stable legacy code unnecessarily. Touch only what the task needs.
