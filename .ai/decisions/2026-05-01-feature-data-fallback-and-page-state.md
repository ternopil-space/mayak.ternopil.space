# Feature Data Fallback And Page State

- Status: accepted
- Date: 2026-05-01
- Area: data flow
- Owners: team
- Related tasks: align feature pages with API-first fallback behavior
- Related files: AGENTS.md, .ai/architecture.md, .ai/content-pages.md, .ai/task-execution.md
- Supersedes:
- Superseded by:

## Context

This repository has multiple marketing pages backed by simple feature-specific data such as team profiles, dishes, reviews, events, or similar page content. The intended behavior is consistent across these features:

- prefer bootstrap or API data when it exists
- keep a local static fallback in `src/data/`
- avoid partial merging between API records and local fallback records
- distinguish between loading state and true empty state in page UI

Without an explicit rule, agents may implement inconsistent source priority, merge local and remote records unexpectedly, or show empty states before content loading finishes.

## Decision

For page features that load list-like content, use this default flow:

- take feature data from the API first
- if the API field is `undefined`, `null`, or an empty array, use the local fallback file at `src/data/{featureName}s.json`
- do not merge API items with fallback items; the source is either API data or local fallback data
- normalize data as needed for typing and rendering, but do not combine records across sources

For page rendering states, use this default behavior:

- show a loading state while content is still loading
- after content has finished loading, if the resolved list is empty, show the page empty state
- after content has finished loading, if the resolved list has items, show the content

This rule applies when implementing a feature page unless a task explicitly asks for a different source priority or UI state flow.

## Consequences

- feature services should expose resolved content using API-first, fallback-second behavior
- local fallback JSON files remain the default non-API source for prerender-safe marketing content
- page components should track whether loading has completed so they can distinguish loading from empty
- reviews should flag index-based merging or mixed-source fallback behavior unless a task explicitly requires it

## Alternatives Considered

Merging API records with local fallback records was rejected because it creates unstable behavior when item order changes or the backend sends partial datasets.

Showing empty state immediately before loading completes was rejected because it produces misleading UI and hides the difference between no data and not loaded yet.
