# Content And Page Patterns

## Purpose

This repo is for HoReCa business pages. Content should support real visitor needs quickly.

## Typical Pages

Common page types:
- home
- menu
- about
- contacts
- gallery
- delivery
- reservation
- events / banquets / catering
- loyalty / special offers

## Home Page Priorities

A good home page usually makes these clear fast:
- what the place is
- what makes it special
- where it is
- how to contact it
- how to reserve or order
- what key products or experiences are offered

## Menu Page Rules

- make categories easy to scan
- keep names and prices readable
- show highlights or signatures clearly
- do not overcomplicate filters unless needed
- keep mobile readability high

## Contacts Page Rules

Important information should be easy to find:
- address
- phone
- working hours
- map/location
- reservation or booking action
- delivery details if relevant

## Gallery Rules

- prefer a small number of strong images over many weak ones
- use images that help users understand atmosphere, dishes, and interior
- keep gallery useful, not decorative noise

## Events / Banquets / Catering

If such pages exist, they should answer:
- what kinds of events are supported
- capacity or format
- what is included
- how to inquire or book

## CTA Principles

Strong CTA examples for HoReCa:
- reserve a table
- view menu
- call now
- order delivery
- ask about events

Keep CTAs visible and clear without being aggressive.

## Feature-Backed Pages

When a page is connected to a specific feature such as team, reviews, events, dishes, or similar content:
- take page data from the API first
- if the API returns no items for that feature, use `src/data/{featureName}s.json`
- do not mix API items with local fallback items
- show a loading state before content has finished loading
- show the standard empty-state pattern only after loading has completed and the resolved list is still empty
