---
type:
  - "config"
title: config-briefing
created: "2026-04-11T15:44:07Z"
summary: Briefing format specification — decision-forcing structure with Ask/Signal/Recommended Action/References, triage disposition annotations, dynamic context assembly at triage time.
updated: "2026-04-12T03:02:42Z"
cssclasses:
  - "config"
---

## Item Identification

Each item in the briefing receives a sequential ID: `B1`, `B2`, etc. IDs are assigned by the heartbeat when creating the page. IDs are stable — they do not change after creation.

## Briefing Structure

Each briefing item follows a decision-forcing structure. Two formats depending on whether a decision is needed.

### Decision Items (Ask → Signal → Recommended Action)

1. **Ask** — What you need to decide or do. Forced choice, brief.
2. **Signal** — Factual context for why this is in front of you. Sourced, timestamped. Just enough to understand — not a full narrative.
3. **Recommended Action** — The AI's recommended disposition and concrete action. When the recommendation is to delegate, includes pre-filled fields: delegatee, specific ask, due date, accountability. When multiple options exist, pre-compare alternatives with tradeoffs and state which is recommended and why (derived from brain context — entity history, commitment patterns, prior decisions).
4. **References** — Wiki-linked situation and entity page titles that provide context for this item. The triage client pulls these live at decision time for dynamic context assembly.

### Awareness Items (Signal → Recommended Action)

No Ask — no decision needed. Builds the running model.

1. **Signal** — What changed. Sourced, timestamped.
2. **Recommended Action** — Typically "noted — no action required." The AI flags any awareness item that warrants escalation to a decision item.
3. **References** — Wiki-linked situation and entity page titles.

### Implication

Not stored in the briefing. Computed at triage time by the client using dynamic context assembly — pulling referenced situation pages, entity pages, and running `search` for additional connections. This ensures context is always current at the moment of decision, not stale from creation time.

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

The Improve phase reads this table to compare Recommended Action vs Disposition per item. Overrides are the primary calibration signal.

## Briefing Boundary Rules

- Each briefing covers signals since the previous briefing (or since `last_processed` if first briefing of the day).
- Ongoing situations that had no new delta since the previous briefing are not repeated. They remain accessible via situation pages and brain search.
- Exception: items with an approaching deadline (due within 24h) are re-surfaced even without new deltas.

## Notes

- The briefing is an output mode of the heartbeat tick (config-heartbeat), not a separate task. The first tick after the configured briefing hour (config-heartbeat) in the user's timezone (config-user) produces the full briefing.
- Briefing output is a brain page (type: briefing, title: `briefing-YYYY-MM-DD`). One page per day. Previous day's page is set to `status: superseded` when the new one is created. Historical briefings are preserved.
- Triage is performed by a client-side skill/command that reads the briefing via brain MCP tools, assembles live context from referenced pages, presents items for governance, writes dispositions back, and executes approved actions via external MCPs (Slack, Jira, Gmail, GCal).