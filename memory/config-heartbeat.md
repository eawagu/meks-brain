---
type:
  - "config"
title: config-heartbeat
created: "2026-04-11T15:43:35Z"
summary: "Heartbeat configuration — cadence, phase order, briefing tick detection (timezone from config-user, existence check), error isolation, early exit rules, confidence assessment per Decision item. Improve phase: structured tuple classification from Triage Results (7-day window), declaration requirement, recalculation trigger (20 tuples). MISS: note routing in ingest."
updated: "2026-04-12T21:29:16Z"
cssclasses:
  - "config"
---

## Cadence

- **Frequency:** Every hour
- **Briefing hour:** 06:00 (local time per config-user timezone). First tick at or after this hour that has not yet produced today's briefing creates it. All other ticks produce triage alerts only (if any signal crosses the Immediate threshold in config-salience).

## Phase Order (per tick)

Two phases execute sequentially within each tick. Phase 1 runs first (time-sensitive). Phase 2 runs last (patient, failure-isolated).

1. **Heartbeat** — Perceive → Predict → Plan → Act → Improve
2. **Ingest** — Scan ingress folder, process unprocessed files (picks up manually dropped files, notes captured via `capture_note`, and any other new content). MISS:-prefixed notes route to config-salience Tuning Log instead of creating source pages.

## Heartbeat Cycle (Phase 1)

### Perceive
- Load all source-config pages (`type: source-config`). For each source, check for deltas since `last_processed` timestamp.
- **Early exit:** If zero deltas across all sources, skip Predict/Plan/Act. Proceed directly to Improve (to check for absence-of-signal triggers per config-salience and process any pending triage dispositions), then exit.
- For every new signal, run semantic similarity search against the full brain via pgvector — perfect cross-referencing, zero recall decay.
- **Exclusion:** MUST NOT include `briefing` in type_filter during Perceive retrieval — briefing pages are output, not input.

### Predict
- Lightweight context assembly for classification and recommendation. For each signal: search for related situations, commitments, and entities. Enough to classify the signal's triage tier and generate a recommendation — not full multi-hop context assembly (that happens at triage time per config-triage).

### Plan
- Classify each signal against triage tiers in config-salience (Immediate / Briefing / Awareness).
- When signals contradict existing brain narratives, surface the tension — do not overwrite.
- When multiple options exist for an action item, pre-compare alternatives with tradeoffs and a recommendation.

### Act
- **Immediate tier signals:** Send triage alert to Dispatch.
- **Briefing tier + Awareness tier signals:** Accumulate for next briefing tick.
- **State updates:** Write new/updated commitment pages, entity updates, situation page updates to brain via MCP write tools.
- **Briefing tick detection:** Read the briefing hour from this config and the timezone from config-user. If current hour (in configured timezone) >= briefing hour, search for `briefing-YYYY-MM-DD` (today's date). If no such page exists, this is the briefing tick.
- **Briefing tick:** Create a briefing brain page via `create_page` (type: `["briefing"]`, title: `briefing-YYYY-MM-DD`, status: `current`). Format per config-briefing (Decision items: Ask → Signal → Recommended Action → Confidence → References; sequential item IDs B1, B2, etc.; ordered by salience score). Confidence per item assessed using Confidence Assessment Guidelines in config-briefing. Update the previous day's briefing page to `status: superseded` via `update_page`.

### Improve
- **Read recent Triage Results:** Query briefing pages from the last 7 days (type: briefing). For each with a `## Triage Results` section, read the disposition table.
- **Classify dispositions into tuples:** Map each disposition to an observation type (acted/dismissed/missed) per the classification rules in config-heartbeat-prompt. Skip items already recorded in config-salience Tuning Log (deduplicate by item ID).
- **Write tuples:** Append to config-salience `## Tuning Log` via `update_page`. Format per config-salience.
- **Declaration:** Emit a completion signal — either "wrote N tuples" or "no triaged briefings to process" or "all dispositions already recorded." Absence of this declaration indicates the Improve phase did not run.
- **Recalculation check:** If config-salience Tuning Log contains 20+ tuples, surface "Salience recalculation due" as a Decision item in the next briefing.
- **Absence-of-signal check:** Evaluate absence-of-signal rules (config-salience) — fire Immediate or Briefing alerts as specified.

## Error Isolation

- Phase 2 (Ingest) is wrapped in try/catch. Ingest failure does not affect Phase 1 (Heartbeat) results.
- Phase 1 (Heartbeat) failure logs the error and exits. Phase 2 does not run on a failed heartbeat.

## Notes

- Heartbeat runs first because it is time-sensitive (triage alerts). Ingest runs last so any new files dropped during the heartbeat phase get picked up in the same tick.
- Early exit on zero deltas keeps cost minimal on quiet ticks. The Improve phase still runs on early-exit ticks to process pending triage dispositions and catch absence-of-signal conditions.
- Source registration is governed by source-config pages — adding/removing sources does not require changes to this config.
- Missed signal capture has two paths: triage-time prompt (primary — config-triage Step 5b asks "Anything I should have caught?" and writes tuples directly) and async `MISS:` notes (secondary — `capture_note` with `MISS:` prefix, routed to config-salience Tuning Log by the ingest pipeline instead of creating source pages). The primary path captures misses noticed at decision time; the secondary path captures misses discovered later from any runtime.
- Timezone is read from config-user — not hardcoded. When the user travels, updating config-user propagates to all time-sensitive operations.
- Lint findings are surfaced directly by the triage client (config-triage), not folded into the briefing. This decouples lint timing from the briefing tick.