---
type:
  - "concept"
title: Ingest pipeline integrity
created: "2026-04-25T11:37:37Z"
summary: "Cross-cutting concern — the brain's ingest pipeline must reject malformed or leakage inputs at the boundary rather than create empty/noise source pages downstream; defensive checks belong at capture time and ingress-scan time. Pipeline must also support deduplication/supersession when upstream emits multiple files for the same logical event."
updated: "2026-04-27T11:34:55Z"
cssclasses:
  - "concept"
---

## Definition

Ingest pipeline integrity is the property that every file reaching the ingress folder corresponds to genuine knowledge content, and that defects in upstream tooling (capture, sync, format conversion) are caught at the pipeline boundary rather than propagating into source pages and embeddings.

## Why it matters

Per config-ingest-prompt the rule is "every successfully read file gets exactly one source page". This is correct as a default but becomes a liability when upstream tooling produces malformed files — the brain ends up with noise source pages, wasted embeddings, and orphan entity stubs that will never accumulate signal.

## Known failure modes

- **Capture leakage** — shell wrappers reach ingress as file bodies. See [[Capture leakage]] (two instances observed in the 2026-04-25 ingest tick).
- **Format conversion failures** — already handled by `read_ingress` via the `error/moved_to: review/` path.
- **Empty / placeholder files** — files with valid format but no meaningful content (e.g., 102-byte stubs).
- **Duplicate emissions for the same logical event** — upstream tooling (e.g., Gemini Notes) can emit multiple Drive docs for the same meeting at slightly different timestamps with different drive_file_ids. Naive one-source-page-per-file behavior creates duplicate source pages for the same event. Mitigation: the [[Heartbeat Dispatch]] dispatcher detects the duplication and routes to ingress with an explicit "deduplicate or supersede" instruction; ingest then attaches an iteration breadcrumb to the canonical record rather than creating a parallel source page. Observed 2026-04-27 11:10 WAT tick — see [[PTSP Weekly Stand-up 2026-04-27 0940 Heartbeat Iteration Note]].

## Defense layers

1. **Capture-time validation** — reject suspicious payloads before they're written (size floor, shell-wrapper detection, self-reference detection).
2. **Ingress-scan filters** — `scan_ingress` could optionally surface anomalies (size outliers, body-vs-filename mismatch heuristics) for review routing.
3. **Source-page judgement** — the LLM extracting source pages can identify leakage and route to `discard` retention with explicit `retention_rationale`. The same judgement layer handles supersession by attaching iteration breadcrumbs to the canonical record.
4. **Periodic review** — orphan source pages with `retention_label: discard` and capture-leakage rationales are a measurable signal of upstream defects.

## Source references

- [[Disbursement Issues & Next steps – 2026_04_22 11_25 WAT – Notes by Gemini]]
- [[Phoenix Stage 1- Weekly Check in - 2026_04_07 16_59 BST - Notes by Gemini]]
- [[PTSP Weekly Stand-up 2026-04-27 0940 Heartbeat Iteration Note]]
