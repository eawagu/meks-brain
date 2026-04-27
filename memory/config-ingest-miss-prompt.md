---
title: config-ingest-miss-prompt
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-27T08:12:30Z"
updated: "2026-04-27T08:12:30Z"
summary: "MISS: routing procedure extracted from config-ingest-prompt — loaded on-demand at Step 1b when files with MISS: prefix are detected. Routes calibration signals to config-salience Tuning Log instead of creating source pages."
---

This prompt is loaded by `config-ingest-prompt` at Step 1b when files with `MISS:` prefix are detected in the ingress batch. Files starting with `MISS:` (case-insensitive) are calibration signals, not knowledge sources — they route to the config-salience Tuning Log instead of becoming source pages. Assumes base-prompt context (brain MCP tool surface, scan_ingress output schema, finalize_ingest signature, salience dimensions defined in config-salience).

## MISS: Routing — per-file procedure

For each file in this batch whose content starts with `MISS:` (case-insensitive):

1. **Extract the description.** Take the text after the `MISS:` prefix as the user description of what was missed.
2. **Infer the salience dimension.** Run `search` with the description to identify which dimension would have caught this signal. The inferred dimension must be exactly one of: urgency, impact_scope, cto_specificity, pattern_significance, or accountability_alignment (per config-salience).
3. **Append calibration tuple.** Read config-salience via `get_page`. Append a tuple to the `## Tuning Log` section via `update_page` in the format `[date, user_description, missed, inferred_dimension]`.
4. **No source page.** MUST NOT create a source page for this file — MISS: notes are calibration signals, not knowledge sources.
5. **Finalize as discard.** MUST call `finalize_ingest` with the file's `file_path`, `file_modified`, `label: "discard"`, and no `page_id`. The label is always `discard` for MISS: files — never compute it from `discard_mode`. The MCP server applies its `discard_mode` gate internally and determines actual disposal (delete in live mode, move to `raw/` in shadow mode); this is server-side behavior and does not affect the agent's call.