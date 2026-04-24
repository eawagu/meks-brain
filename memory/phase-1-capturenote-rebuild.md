---
type:
  - "concept"
title: Phase-1 capture_note rebuild
created: "2026-04-23T14:33:07Z"
summary: First phase of the capture_note retrofit — add an optional `name` parameter so callers control the resulting ingress filename; verified live via a schema probe on 2026-04-23.
updated: "2026-04-24T17:20:12Z"
cssclasses:
  - "concept"
---

## What

Phase-1 of the [[capture_note]] retrofit: add an optional `name` parameter so callers can control the resulting ingress filename, enabling meaningful names (e.g., Drive titles) instead of auto-generated timestamps.

## Verification

Confirmed live on 2026-04-23 ~13:35 UTC via a [[schema probe]] — a probe note was dispatched with an explicit `name` parameter and landed in ingress under that intended filename. See [[mcp-tool-schema-probe-2026-04-23]].
