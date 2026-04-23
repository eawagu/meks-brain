---
title: schema probe
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-23T14:33:07Z"
updated: "2026-04-23T14:33:07Z"
summary: Verification technique — dispatch a minimal payload that exercises a new or changed tool parameter and observe whether the side effect matches the expected post-change behavior.
---

## What

A **schema probe** is a verification technique: dispatch a minimal payload that exercises a new or changed tool parameter and observe the side effect. If the side effect matches post-change expected behavior, the new schema is live. If not, the server is still serving the old schema.

## Example

[[mcp-tool-schema-probe-2026-04-23]] — probe note dispatched to [[capture_note]] with the new `name` parameter. Landing in ingress under the intended filename confirmed the [[Phase-1 capture_note rebuild]] is live on the [[mek-brain]] server.