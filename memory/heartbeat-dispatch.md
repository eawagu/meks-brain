---
title: Heartbeat Dispatch
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-27T11:34:56Z"
updated: "2026-04-27T11:34:56Z"
summary: Pattern by which the heartbeat process routes new content to the ingest pipeline rather than handling it in-tick — used to avoid duplicate source-page creation, defer expensive extraction, or invoke deduplication/supersession reasoning that requires the full ingest pipeline.
---

## Definition

Heartbeat Dispatch is the pattern by which the brain's heartbeat process (per [[config-heartbeat-prompt]]) routes new content to the ingest pipeline rather than processing it inline within a heartbeat tick. The heartbeat detects new signal (typically a new file from a configured source like [[source-config-google-drive|Google Drive Notes by Gemini]]), captures the metadata necessary for the ingest pipeline to act, and writes it to ingress for the next [[config-ingest-prompt|ingest task run]] to handle.

## When dispatch is preferred over in-tick handling

- **Duplicate / iteration detection** — heartbeat recognizes the new content corresponds to an event already in the brain (e.g., a 5-minute-later Gemini Notes iteration of the same meeting). In-tick handling would create a parallel source page; dispatch lets the ingest pipeline reason about deduplication/supersession with full extraction context. Example: 2026-04-27 11:10 WAT tick — see [[PTSP Weekly Stand-up 2026-04-27 0940 Heartbeat Iteration Note]].
- **Expensive extraction** — vision content, multi-page documents, or transcripts that don't fit a heartbeat tick's compute budget.
- **Cross-tick continuity** — content that needs to be processed alongside other ingress files in a single batch (entity/concept reasoning benefits from co-batching).

## Dispatch payload

When the heartbeat dispatches to ingress, it writes a small markdown file containing:

- Source identifiers (e.g., Drive file ID, view URL, owner, modified timestamp)
- A meta-note explaining the dispatcher's reasoning (why dispatch rather than in-tick handling)
- Optionally, a reference to the existing canonical brain page if the dispatch is duplicate-aware

The ingest pipeline reads this payload, applies its normal source-page extraction with retention judgment, and (where appropriate) attaches iteration breadcrumbs to the canonical record rather than creating parallel source pages.

## Relation to ingest pipeline integrity

Dispatch is one of the defense layers for [[Ingest pipeline integrity]] — specifically the deduplication/supersession failure mode. By splitting detection (heartbeat) from reasoning (ingest), the system avoids creating noise source pages while preserving full traceability of upstream emissions.
