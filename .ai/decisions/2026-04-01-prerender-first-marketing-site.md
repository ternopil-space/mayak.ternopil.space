# Prerender-First Marketing Site

- Status: accepted
- Date: 2026-04-01
- Area: architecture
- Owners: team
- Related tasks: docs cleanup for agent guidance
- Related files: AGENTS.md, .ai/onboarding.md, .ai/architecture.md, .ai/task-execution.md, src/app/app.routes.ts, src/app/app.routes.server.ts
- Supersedes:
- Superseded by:

## Context

The repo is a single HoReCa website, but the guidance was repeated across multiple docs instead of being recorded as a durable decision. That made the repo direction clear in spirit but easy to drift in practice.

## Decision

This repository is a prerender-first marketing website.

Default assumptions:

- optimize for static, crawlable, content-first pages
- preserve Angular SSR and prerender compatibility by default
- keep routes simple and user-facing
- treat mobile performance, clarity, and SEO as primary concerns
- avoid turning simple pages into app-like architectures

## Consequences

- browser-only code must be guarded
- static content should remain visible in HTML and not depend on unnecessary client-side work
- page work should favor simple sections and local content over complex feature architecture
- proposals that introduce CMS, API fetching, dashboards, or heavy state should require explicit product need

## Alternatives Considered

Keeping this as repeated prose in multiple docs was rejected because it increases drift and weakens enforcement over time.

## Notes

This decision describes the repo's product and delivery model, not a ban on all interactivity. Small interactive behavior is acceptable when it does not undermine prerender, clarity, or performance.
