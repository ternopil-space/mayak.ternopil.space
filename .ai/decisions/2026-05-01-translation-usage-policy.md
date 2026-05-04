# Translation Usage Policy

- Status: accepted
- Date: 2026-05-01
- Area: i18n
- Owners: team
- Related tasks: remove profile translation JSON dependency and align agent guidance
- Related files: .ai/code-style.md, .ai/architecture.md, .ai/task-execution.md
- Supersedes:
- Superseded by:

## Context

This repo uses translation primitives in templates. Feature-specific JSON translation maps and code-side localization helpers add a second translation path that is harder to maintain and easy to leave stale.

## Decision

Use `TranslatePipe` and `TranslateDirective` as the default translation mechanism for UI copy in this repository.

In templates, pass real source text to translation primitives instead of generated translation keys. For example, prefer `{{ dish.name | translate }}` over helper-driven keys such as `{{ dishNameKey(dish.slug) | translate }}`.

Do not introduce or preserve:

- feature-specific `*.translations.json` files
- code-side translation maps for page or feature text
- localization helpers that rewrite API or fallback content into generated translation keys before rendering unless a task explicitly requires that behavior

## Consequences

- translation usage stays visible in templates
- agents should remove dead translation helper files when the template-based path replaces them
- content and fallback data should stay as plain source data rather than duplicated localized maps

## Alternatives Considered

Feature-level JSON translation files were rejected because they duplicate template translation responsibilities and create avoidable maintenance drift.
