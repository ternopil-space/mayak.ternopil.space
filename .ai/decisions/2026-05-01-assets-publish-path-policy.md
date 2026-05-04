# 2026-05-01 Assets Publish Path Policy

## Status

Accepted

## Context

The Angular build configuration publishes files from `src/assets` from the site root:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "src/assets"
  }
]
```

There is no `output` value that would place those files under `/assets`.

## Decision

- treat `src/assets` as a source folder only
- reference published files by their output URL, not by their source path
- for files inside `src/assets`, use paths like `logo.png` or `/logo.png`
- do not use `assets/logo.png` unless the build configuration changes to publish into `/assets`

## Consequences

- Angular templates should use `ngSrc="logo.png"` or `src="/logo.png"` for `src/assets/logo.png`
- docs and examples in this repo should avoid `src/assets/...` and `assets/...` when referring to runtime URLs
- if `angular.json` asset output changes later, this rule must be revisited
