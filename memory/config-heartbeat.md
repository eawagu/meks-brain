---
title: config-heartbeat
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-11T15:43:35Z"
updated: "2026-04-11T15:43:35Z"
summary: Exec assistant heartbeat configuration — cadence, phase order, briefing tick, error isolation, early exit rules.
---

## Cadence

- **Frequency:** Every hour
- **Briefing tick:** First tick after 06:00 WAT produces the full briefing. All other ticks produce triage alerts only (if any signal crosses the Immediate threshold in config-salience).

## Phase Order (per tick)

Three phases execute sequentially within each tick. Phase 1 runs first (time-sensitive). Phase 3 runs last (patient, failure-isolated).

1. **Heartbeat** — Perceive → Predict → Plan → Act → Improve
2. **inbox.md** — Read entries, process as raw sources for ingest
3. **Ingest** — Scan ingress folder, process unprocessed files (picks up inbox entries from phase 2 + any new file drops)

## Heartbeat Cycle (Phase 1)

### Perceive
- Load all source-config pages (`type: source-config`). For each source, check for deltas since `last_processed` timestamp.
- **Early exit:** If zero deltas across all sources, skip Predict/Plan/Act. Proceed directly to Improve (to check for absence-of-signal triggers per config-salience), then exit.
- For every new signal, run semantic similarity search against the full brain via pgvector — perfect cross-referencing, zero recall decay.

### Predict
- Dynamic context assembly: signal → related commitments → related entities → historical patterns → related concepts.
- Multi-hop retrieval — not just "what changed" but "given what changed, what existing brain content validates or invalidates predictions?"

### Plan
- Classify each signal against triage tiers in config-salience (Immediate / Briefing / Awareness).
- When signals contradict existing brain narratives, surface the tension — do not overwrite.
- When multiple options exist for an action item, pre-compare alternatives with tradeoffs and a recommendation.

### Act
- **Immediate tier signals:** Send triage alert to Dispatch.
- **Briefing tier + Awareness tier signals:** Accumulate for next briefing tick.
- **State updates:** Write new/updated commitment pages, entity updates, situational context updates to brain via write operations.
- **Briefing tick only:** Produce the full briefing per config-briefing format.

### Improve
- Compare surfaced items against user actions since last tick (acted on / dismissed / missed).
- Write tuning tuple to config-salience: `[date, item_hash, action, dominant_dimension]`.
- Check absence-of-signal rules (config-salience) — fire Immediate or Briefing alerts as specified.

## Error Isolation

- Phase 3 (Ingest) is wrapped in try/catch. Ingest failure does not block Phase 1 (Heartbeat) or Phase 2 (inbox.md).
- Phase 2 (inbox.md) failure does not block Phase 1. Unprocessed entries remain in inbox.md for next tick.
- Phase 1 (Heartbeat) failure logs the error and exits. No downstream phases run on a failed heartbeat.

## Notes

- Heartbeat runs first because it is time-sensitive (triage alerts). Ingest runs last so inbox entries from Phase 2 get picked up in the same tick.
- Early exit on zero deltas keeps cost minimal on quiet ticks. The Improve phase still runs on early-exit ticks to catch absence-of-signal conditions.
- Source registration is governed by source-config pages — adding/removing sources does not require changes to this config.