---
type:
  - "config"
title: config-briefing
created: "2026-04-11T15:44:07Z"
summary: Briefing format specification — decision-forcing structure with Ask/Signal/Recommended Action/References/Confidence, three-tier triage routing, disposition annotations, dynamic context assembly at triage time.
updated: "2026-04-27T01:24:59Z"
cssclasses:
  - "config"
---

## Item Identification

Each item in the briefing receives a sequential ID: `B1`, `B2`, etc. IDs are assigned by the heartbeat when creating the page. IDs are stable — they do not change after creation.

## Briefing Structure

Each briefing item follows a decision-forcing structure. Two formats depending on whether a decision is needed.

### Decision Items (Ask → Signal → Recommended Action → Confidence)

1. **Ask** — What you need to decide or do. Forced choice, brief.
2. **Signal** — Factual context for why this is in front of you. Sourced, timestamped. Just enough to understand — not a full narrative.
3. **Recommended Action** — The AI's recommended disposition and concrete action. When the recommendation is to delegate, includes pre-filled fields: delegatee, specific ask, due date, accountability. When multiple options exist, pre-compare alternatives with tradeoffs and state which is recommended and why (derived from brain context — entity history, commitment patterns, prior decisions).
4. **Confidence** — `high` or `low`. The heartbeat's assessment of how certain the recommended action is.
   - `high` — Single clear recommendation. One reasonable disposition dominates. Routes to Tier 2 (propose/approve) during triage.
   - `low` — Multiple viable paths exist, or the AI lacks sufficient context to strongly recommend one. Routes to Tier 3 (escalate with structured alternatives) during triage.
5. **References** — Wiki-linked situation and entity page titles that provide context for this item. The triage client pulls these live at decision time for dynamic context assembly.

### Awareness Items (Signal → Recommended Action)

No Ask — no decision needed. Builds the running model. Routes to Tier 1 (auto-advance batch) during triage.

1. **Signal** — What changed. Sourced, timestamped.
2. **Recommended Action** — Typically "noted — no action required." The AI flags any awareness item that warrants escalation to a decision item.
3. **References** — Wiki-linked situation and entity page titles.

Awareness items do not carry a Confidence field — they are always Tier 1 by definition.

### Implication

Not stored in the briefing. Computed at triage time by the client using dynamic context assembly — pulling referenced situation pages, entity pages, and running `search` for additional connections. This ensures context is always current at the moment of decision, not stale from creation time.

## Confidence Assessment Guidelines

The heartbeat sets the `confidence` field per Decision item using these criteria:

**High confidence** (single clear recommendation dominates):
- One disposition is clearly superior given brain context (entity history, situation state, commitment patterns, prior decisions on similar items)
- Low risk of the recommended action being wrong — cost of error is recoverable
- No competing considerations that would reasonably lead to a different disposition

**Low confidence** (multiple viable paths, genuine uncertainty):
- Two or more dispositions are defensible with different tradeoffs
- The item involves a judgment call that depends on context the AI may not have (political considerations, unstated preferences, in-person context)
- High risk — cost of the wrong disposition is significant or irreversible
- The AI lacks sufficient brain context to strongly differentiate between options

When in doubt, mark `low` — it is better to escalate an item for human judgment than to auto-advance a genuinely ambiguous decision.

## Triage Tier Routing Summary

| Item type | Confidence | Triage tier | Interaction |
|---|---|---|---|
| Awareness | — | Tier 1 (auto-advance) | Batch summary, blanket approve |
| Decision | high | Tier 2 (propose) | One at a time, single recommendation, approve/override |
| Decision | low | Tier 3 (escalate) | One at a time, full context, structured numbered alternatives |

See config-triage for the full triage protocol.

## Ordering

1. Decision items first, ordered by salience score (highest first, per config-salience dimension weights).
2. Awareness items last, ordered by salience score.
3. Within equal salience: order by recency (most recent signal first).

## Source Attribution

- Every Signal line includes: source type (email/Slack/Jira/calendar/brain), timestamp (local time per config-user timezone), and key identifier (email subject, Slack channel + message link, Jira ticket ID, calendar event name).
- When a signal spans multiple sources, list all contributing sources.
- When a thread is referenced, include the most recent relevant message timestamp, not the thread start.

## Triage Results

After triage, the client appends a `## Triage Results` section to the briefing page body via `update_page`. Format:

```
| ID | Disposition | Action Taken | Commitment | Triaged |
|---|---|---|---|---|
| B1 | approved | [concrete action executed] | — | [ISO-8601 timestamp] |
| B2 | overridden | [replacement action] | [[commitment page title]] | [ISO-8601 timestamp] |
| B3 | noted | — | — | [ISO-8601 timestamp] |
```

Valid dispositions: `approved`, `overridden`, `held`, `discarded`, `noted` (awareness items only).

The Improve phase reads this table to compare Recommended Action vs Disposition per item. Overrides are the primary calibration signal. Tier 1 pull-outs (items moved from auto-advance to individual review) are a secondary signal — they indicate the heartbeat's confidence assessment was too high.

## Tick Instrumentation

Per-tick wall-clock timing data captured by the heartbeat (config-heartbeat-prompt) and written to the day's briefing page. The day's first briefing-tick creates this section after Improve's declaration with the column header row and the first data row. Subsequent ticks within the day append rows. Pre-briefing ticks write nothing — there is no briefing page yet to append to.

### Format

| Tick | Level | Setup | Step0 | Step1 | Step2 | Predict | Plan | Act | Improve |
|---|---|---|---|---|---|---|---|---|---|

Columns:
- **Tick** — local time (configured timezone) of tick wall-clock start, formatted `HH:MM:SS TZ`.
- **Level** — Step 0 work-level decision (`full`, `skim`, `minimal`, or `silent`).
- **Setup, Step0, Step1, Step2, Predict, Plan, Act, Improve** — wall-clock duration for that phase, formatted compactly (e.g., `12s`, `47s`, `4m12s`). Phases not executed on this tick recorded as `—`.

### Read

The instrumentation-regression check in config-judgment-lint-prompt (Phase 1 step 5; Phase 2 § Instrumentation Regression; Phase 3 § 5. Instrumentation Regression) reads this section across briefings from the last 30 days and judges whether any phase's distribution shows a meaningful regression.

### Lifecycle

The section persists for the life of the briefing page (`status: current` → `status: superseded` → historical). Briefing pages are excluded from ingest and synthesis but remain queryable via `search` with `type_filter: ["briefing"]`. The instrumentation lint reads them directly as historical timing record.

## Briefing Boundary Rules

- Each briefing covers signals since the previous briefing (or since `last_processed` if first briefing of the day).
- Ongoing situations that had no new delta since the previous briefing are not repeated. They remain accessible via situation pages and brain search.
- Exception: items with an approaching deadline (due within 24h) are re-surfaced even without new deltas.

## Notes

- The briefing is an output mode of the heartbeat tick (config-heartbeat), not a separate task. The first tick after the configured briefing hour (config-heartbeat) in the user's timezone (config-user) produces the full briefing.
- Briefing output is a brain page (type: briefing, title: `briefing-YYYY-MM-DD`). One page per day. Previous day's page is set to `status: superseded` when the new one is created. Historical briefings are preserved.
- Triage is performed by any client with brain MCP access. The client reads the briefing via `get_page`, assembles live context from referenced pages, presents items per the three-tier flow in config-triage, writes dispositions back via `update_page`, and executes approved actions via external MCPs (Slack, Jira, Gmail, GCal).