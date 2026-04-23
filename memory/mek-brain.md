---
title: mek-brain
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-23T14:33:06Z"
updated: "2026-04-23T14:33:06Z"
summary: The Brain MCP server — authoritative source of truth for persistent knowledge, accessed via MCP tools like create_page, update_page, batch_upsert_pages, scan_ingress, and capture_note.
---

## Overview

**mek-brain** is the Brain MCP server that backs Mek's persistent knowledge store. All page writes and ingest operations go through this server's tools; direct filesystem writes to the `memory/` folder are forbidden.

## Tools (partial)

- `scan_ingress`, `read_ingress`, `finalize_ingest` — ingest pipeline
- `create_page`, `update_page`, `get_page`, `batch_get_pages`, `batch_upsert_pages`, `delete_page` — page CRUD
- `search` — hybrid BM25 + pgvector retrieval
- `capture_note` — write a note into ingress (see [[capture_note]])

## Related

- [[mcp-tool-schema-probe-2026-04-23]] — Phase-1 probe confirming the rebuilt `capture_note` schema is live on the server.