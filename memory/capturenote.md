---
title: capture_note
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-23T14:33:06Z"
updated: "2026-04-23T14:33:06Z"
summary: Brain MCP tool for writing arbitrary notes into the ingress folder; gained an optional `name` parameter in the 2026-04-23 Phase-1 retrofit.
---

## Overview

`capture_note` is a [[mek-brain]] MCP tool that writes arbitrary notes into the ingress folder so they flow through the normal ingest pipeline.

## Phase-1 retrofit (2026-04-23)

Gained an optional `name` parameter so callers can control the resulting ingress filename. The [[Phase-1 capture_note rebuild]] was verified by the probe source [[mcp-tool-schema-probe-2026-04-23]] — the probe was dispatched with an explicit `name` and successfully landed under that filename, confirming the rebuilt schema is live on the server.

## Related

- Used by [[source-config-google-drive]] to dispatch Notes-by-Gemini transcripts into ingress with meaningful filenames (see that source-config's two-part split chain).