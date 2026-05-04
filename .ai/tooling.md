# Tooling And MCP Guide

## Purpose

This file helps agents and developers choose the right tool for the job.

Typical examples:
- Angular MCP for Angular CLI or framework-aware tasks
- TypeScript MCP for language-aware inspection and typing support
- documentation MCPs when current framework/library behavior matters

## When To Use MCP

Use MCP when:
- Angular API or syntax may be version-sensitive
- TypeScript behavior needs precise inspection
- a generator or framework command is safer than hand-written boilerplate
- official docs or tool-backed answers reduce risk

## When Not To Use MCP

Avoid MCP when:
- the answer is already clear from local code
- the task is purely content/layout work
- the change is small and repo-specific

## Tool Order

Prefer local code and repo guidance first. Reach for MCP when version-sensitive behavior, typing details, or framework-aware generation would materially reduce risk.

## Practical Reminder

Do not overuse tools for simple static-page edits. For many HoReCa tasks, the nearest existing page and repo conventions are enough.
