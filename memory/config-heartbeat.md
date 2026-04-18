---
type:
  - "config"
title: config-heartbeat
created: "2026-04-11T15:43:35Z"
summary: "Heartbeat configuration — cron as wake-only delivery (15 ticks/day, no weekday/weekend split); per-tick work-level judgment (Full/Skim/Minimal/Silent) via config-heartbeat-prompt Perceive Step 0 with floor requirements (06:00 briefing, Immediate-tier scan, pending-triage processing). Phase order, briefing tick detection, error isolation, Improve phase (7-day Triage Results, 20-tuple recalc trigger)."
updated: "2026-04-18T09:58:45Z"
cssclasses:
  - "config"
---

## Cadence

Cron delivers 15 wake opportunities per day: `0 6-18,20,22 * * *` (evaluated in local timezone per config-user). Cron carries no weekday/weekend semantics — every tick is the same wake opportunity.

Work level per tick is judgment-driven. See config-heartbeat-prompt Perceive Step 0 for the four-level ladder (Full / Skim / Minimal / Silent) and judgment inputs. Weekend, vacation, travel, and working-weekend behavior emerge from per-tick reasoning — no day-of-week rules in this config.

**Floor requirements (judgment MUST NOT skip):**
- 06:00 tick — briefing page creation per config-briefing
- Any tick — Immediate-tier signal scan + dispatch per config-salience
- Any tick — pending triage disposition processing (Improve phase)

**Briefing hour:** 06:00 (local time per config-user timezone). The 06:00 tick produces the briefing. If for any reason 06:00 is missed, the next tick that has not yet produced today's briefing creates it.

**Overnight delegation:** Overnight monitoring is delegated to the ops team. Off-hours direct contact (Slack DM, phone) is the Immediate-tier path between 23:00 and 06:00 WAT — heartbeat polling does not cover this window. Active-P1 silence rules and absence-of-signal Immediate alerts do not fire overnight; they resume at the 06:00 tick. Off-hours urgent DM signals (config-salience structural marker) still affect salience scoring at 06:00 triage.

## Phase Order (per tick)

Two phases execute sequentially within each tick. Phase 1 runs first (time-sensitive). Phase 2 runs last (patient, failure-isolated).

1. **Heartbeat** — Perceive → Predict → Plan → Act → Improve
2. **Ingest** — Scan ingress folder, process unprocessed files (picks up manually dropped files, notes captured via `capture_note`, and any other new content). MISS:-prefixed notes route to config-salience Tuning Log instead of creating source pages.

## Heartbeat Cycle (Phase 1)

### Perceive
- **Step 0 — Work-level decision (judgment):** Select Full / Skim / Minimal / Silent per config-heartbeat-prompt Perceive Step 0. Floor requirements above override the level downward — never skip floor work. Subsequent Perceive steps run only at Full or Skim levels.
- Load all source-config pages (`type: source-config`). For each source, check for deltas since `last_processed` timestamp.
- For every new signal, run semantic similarity search against the full brain via pgvector — perfect cross-referencing, zero recall decay.
- **Reminder evaluation:** After source-signal collection, enumerate open reminders (`type: reminder`, `status: pending`). Per-reminder reasoning simultaneously answers (a) surface now (time / context-match via wiki-link overlap / age) and (b) is the reminder plausibly resolved by recent brain content (auto-resolve candidate). Outputs join the signal stream; auto-resolve candidates are always Decision items. No fixed age or similarity thresholds — per-item judgment each tick.
- **Early exit:** If zero source deltas AND zero reminder surfacings, skip Predict/Plan/Act. Proceed directly to Improve (to check for absence-of-signal triggers per config-salience and process any pending triage dispositions), then exit.
- **Exclusion:** MUST NOT include `briefing` in type_filter during Perceive retrieval — briefing pages are output, not input.

### Predict
- Lightweight context assembly for classification and recommendation. For each signal: search for related situations, commitments, and entities. Enough to classify the signal's triage tier and generate a recommendation — not full multi-hop context assembly (that happens at triage time per config-triage).

### Plan
- Classify each signal against triage tiers in config-salience (Immediate / Briefing / Awareness).
- When signals contradict existing brain narratives, surface the tension — do not overwrite.
- When multiple options exist for an action item, pre-compare alternatives with tradeoffs and a recommendation.
- **Reminder surfacings:** Classify per config-salience like any other signal. Exception: when `auto_resolve_candidate` is true, force Decision tier regardless of salience score — the user must confirm or reject the auto-resolve.

### Act
- **Immediate tier signals:** Send triage alert to Dispatch.
- **Briefing tier + Awareness tier signals:** Accumulate for next briefing tick.
- **State updates:** Write new/updated commitment pages, entity updates, situation page updates to brain via MCP write tools.
- **Briefing tick detection:** Read the briefing hour from this config and the timezone from config-user. If current hour (in configured timezone) >= briefing hour, search for `briefing-YYYY-MM-DD` (today's date). If no such page exists, this is the briefing tick.
- **Briefing tick:** Create a briefing brain page via `create_page` (type: `["briefing"]`, title: `briefing-YYYY-MM-DD`, status: `current`). Format per config-briefing (Decision items: Ask → Signal → Recommended Action → Confidence → References; sequential item IDs B1, B2, etc.; ordered by salience score). Confidence per item assessed using Confidence Assessment Guidelines in config-briefing. Update the previous day's briefing page to `status: superseded` via `update_page`.
- **Reminder surfacing history:** When a reminder-derived item is included in the briefing, update the reminder page via `update_page` to append an entry to `## Surfacing history` recording tick timestamp and surface_reason (time / context-match / age / auto-resolve, or a combined value). History records the heartbeat's emission-time judgment; user triage actions update status via the existing config-triage flow.

### Improve
- **Read recent Triage Results:** Query briefing pages from the last 7 days (type: briefing). For each with a `## Triage Results` section, read the disposition table.
- **Classify dispositions into tuples:** Map each disposition to an observation type (acted/dismissed/missed) per the classification rules in config-heartbeat-prompt. Skip items already recorded in config-salience Tuning Log (deduplicate by item ID).
- **Write tuples:** Append to config-salience `## Tuning Log` via `update_page`. Format per config-salience.
- **Declaration:** Emit a completion signal — either "wrote N tuples" or "no triaged briefings to process" or "all dispositions already recorded." Absence of this declaration indicates the Improve phase did not run.
- **Recalculation check:** If config-salience Tuning Log contains 20+ tuples, surface "Salience recalculation due" as a Decision item in the next briefing.
- **Absence-of-signal check:** Evaluate absence-of-signal rules (config-salience) — fire Immediate or Briefing alerts as specified. Note: rules requiring overnight observation windows are evaluated at the 06:00 tick using elapsed-silence calculations (timestamp arithmetic), not real-time polling.

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
- Ingest (Phase 2) runs in the same ticks as heartbeat (Phase 1). Files dropped in the ingress folder overnight are picked up at the 06:00 tick — there is no separate overnight ingest cadence.
- Reminder surfacing is unified — a single Perceive-phase pass per reminder answers both "surface now?" and "resolved by recent content?" in the same reasoning step. No separate ingest-time auto-resolve mechanism. Reminders that fire both signals produce one combined briefing item.