# Contributing

This project is an Angular 21 landing page template built around SSR prerendering, TailwindCSS v4, shared theme variables, and a minimal project structure.

Keep contributions aligned with the current template conventions described in [README.md](README.md).

## Core rules

- Use **Conventional Commits**: `type(scope): subject`
- Keep one commit focused on one logical change
- Use **OnPush** components by default
- Keep state used in HTML class bindings as **signals**
- Prefer **Angular Signal Forms** for new forms
- Prefer Angular signal-first APIs over older decorator-heavy patterns where practical
- Use the new Angular template control flow (`@if`, `@for`, `@switch`) in new code
- Keep new code SSR-safe; do not assume browser-only APIs exist during server rendering

## Styling

- Use **TailwindCSS first** for normal UI work
- Use shared theme variables from `src/styles/_theme.scss` for colors, surfaces, spacing, radius, motion, and typography
- Use component `.scss` files for local styling only when Tailwind is not the right tool
- Avoid hard-coded hex colors and random pixel values when a theme token already exists
- Keep styles compatible with `data-mode`, `data-density`, and `data-radius`
- Avoid hover effects that change layout; prefer background, color, shadow, or opacity changes
- Always provide matching accessible focus styles for interactive elements

## Icons and assets

- Use **Material Symbols Outlined** as the default icon set
- Treat icons as decorative unless they carry meaning; add visible text or `aria-label` where needed

## Structure

- App-level pages belong in `src/app/pages`
- Layout components belong in `src/app/layouts`
- Feature-specific business logic can live in `src/app/feature/<name>`
- Generic shared code can live in `src/app/components`, `directives`, `pipes`, `services`, and `interfaces`
- Public front-end runtime config belongs in `src/environments`
- Do not place secrets in Angular environment files

## Translations

- This repo uses the `@wawjs/ngx-translate` translation stack: `provideTranslate`, `TranslateService`, `TranslatePipe`, and `Translate`
- Translation dictionaries live in `src/i18n/<code>.ts` and are aggregated in `src/i18n/index.ts`
- Language metadata lives in `src/app/feature/language/language.type.ts`, `language.interface.ts`, `language.const.ts`, and `language.service.ts`
- Keep translation keys aligned with the English source text used in templates and components
- Use one of these three patterns only:
- Prefer the `translate` directive for plain element text content. Use `[translate]` for an explicit key or bare `translate` when the element text is the key
- Use the pipe for interpolations and attribute bindings: `{{ 'Key' | translate }}` or `[aria-label]="'Key' | translate"`
- In component TypeScript, use `TranslateService.translate('Key')()` inside reactive code such as `computed()` when you need translated labels in TS
- Keep bootstrap and language switching on the existing `provideTranslate(...)` and `TranslateService.setMany(...)` path
- Do not add another translation registry such as `src/app/app.translates.ts`; `src/i18n` is the source of truth
- When removing code, check whether its translation keys are still used elsewhere; if a key is no longer referenced anywhere in the app, remove it from the translation dictionaries in the same change
- If you add a language, update `src/i18n/<code>.ts`, `src/i18n/index.ts`, `LanguageCode`, and `LANGUAGES`
- Save translation files as UTF-8 and use proper native characters for labels and translated text
- Do not replace native characters with mojibake, HTML entities, or ad hoc transliterations

## Code quality

- Keep templates and components simple and readable
- If the same signal read, computed value, or method call is used multiple times in a template, assign it with `@let`
- Prefer short, clear comments only where intent is not obvious
- Keep naming consistent with the existing codebase
- Prefix private class members with `_`, including fields and methods
- Omit explicit function and method return types; prefer inferred return types
- Order class members consistently: injected fields, public state, private state, constructor, public methods, private methods
- Respect `.editorconfig` and `.prettierrc`

## Before opening a PR

- Confirm the change matches the template conventions in the README
- Check that styling uses shared theme variables where applicable
- Check that dark mode still works
- Check that the change does not break SSR or prerender assumptions
- Check that translated strings still resolve through the expected pipe/service/provider path
- Check that any edited translations still render as proper native characters in the UI
- Keep documentation updated when project conventions or structure change
