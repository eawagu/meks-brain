---
title: config-page-types
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-12T19:57:07Z"
updated: "2026-04-12T19:57:07Z"
summary: Page type registry and frontmatter validation spec — read by MCP server on every create/update to validate types and type-specific fields.
---

Authoritative registry of valid page types and their frontmatter field requirements. The MCP server reads this page on every `create_page` and `update_page` call to validate incoming pages.

Each `##` heading defines a type. Bullets under each heading define type-specific frontmatter fields. The `## common` section defines fields required on all pages regardless of type.

Field format: `- name: type, required|optional`
Types: `string`, `date`, `enum [value1, value2, ...]`

To add a new page type: add a `##` heading with its fields below. The next write operation picks it up — no code deploy needed.

## common

- title: string, required
- type: string[], required
- created: date, required
- updated: date, required

## entity

No type-specific fields.

## concept

No type-specific fields.

## source

- source_path: string, required

## synthesis

- status: enum [draft, current, superseded], required
- coverage: enum [high, medium, low], required

## commitment

- owner: string, required
- counterparty: string, optional
- role: string, optional
- accountability: string, optional
- due: date, required
- status: enum [open, fulfilled, broken, cancelled], required

## situation

- status: enum [developing, stable, resolving, retired], required
- accountability: string, required
- role: string, required

## source-config

- last_processed: date, optional

## config

No type-specific fields.

## briefing

- status: enum [current, superseded], required