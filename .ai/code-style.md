# Code Style Guide

## Formatting

Follow the repo formatter and lint configuration.

General expectations:
- use single quotes
- keep code clean and compact
- keep comments sparse and useful
- preserve existing naming in nearby code

## Angular Conventions

- preserve Angular 21 patterns
- prefer `inject()` for dependency access
- use standalone components by default; do not add NgModules for new work
- do not add `standalone: true`; standalone is already the default in Angular 20+
- set `changeDetection: ChangeDetectionStrategy.OnPush` on new or touched components unless an existing local pattern prevents it
- use signals for local reactive state
- use `computed()` for derived local state
- keep templates declarative and simple
- prefer `input()` / `output()` APIs over decorator-based inputs and outputs for new code
- for UI translations, use `TranslatePipe` and `TranslateDirective`; do not add feature-specific translation JSON imports or code-side localization maps
- in templates, pass real source text to `TranslatePipe` and `TranslateDirective`, not generated translation keys such as `dish.slug`-based identifiers

## Template Rules

- prefer Angular bindings over manual DOM work
- keep templates readable
- avoid repeated complex expressions
- prefer native control flow (`@if`, `@for`, `@switch`) over structural directives in new or touched templates
- prefer `class` and `style` bindings over `ngClass` and `ngStyle`
- keep accessibility in mind for buttons, links, icons, and images

## Tailwind And SCSS

Tailwind is a primary styling tool in this repository.

- prefer Tailwind for layout, spacing, typography, borders, sizing, responsive behavior, and utility styling
- use local SCSS for structure that is not ergonomic in Tailwind
- keep SCSS component-local and shallow
- reuse theme tokens before adding raw values
- avoid large custom CSS when Tailwind solves it cleanly

## Buttons And CTAs

- prefer the shared `ui-btn` utilities for page CTAs instead of repeating long inline class strings
- use `ui-btn ui-btn-primary` for the main action on a page or empty state
- use `ui-btn ui-btn-secondary` for supporting actions
- do not hardcode `text-white` on theme-colored buttons; button text must stay theme-aware in light and dark modes
- when a CTA label can be longer, prefer a modest minimum width on the template instead of introducing one-off button variants

## TypeScript

- prefer explicit domain types over weak typing
- do not add `any` casually
- use `unknown` instead of `any` when the type is uncertain
- keep exported APIs clear
- keep helper code simple and local when possible

## General Rule

Make the smallest coherent change that solves the task without turning a simple marketing page into framework-heavy code.
