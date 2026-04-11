---
type:
  - "config"
title: config-briefing
created: "2026-04-11T15:44:07Z"
summary: Exec assistant briefing format — Ask/Signal/Implication structure, ordering, source attribution, awareness items.
updated: "2026-04-11T17:55:20Z"
cssclasses:
  - "config"
---

## Briefing Structure

Each briefing item follows a decision-forcing structure optimized for cognitive efficiency under load. Two formats depending on whether a decision is needed.

### Decision Items (Ask → Signal → Implication)

1. **Ask** — What you need to decide or do. Forced choice, brief. When multiple options exist, pre-compare alternatives with tradeoffs and a recommendation. The Ask eliminates integration work — you can act on high-confidence items immediately.
2. **Signal** — Factual context for why this is in front of you. Sourced, timestamped. Just enough to understand — not a full narrative.
3. **Implication** — Why this specific decision matters in your context. Connects to commitments, entity patterns, accountabilities. Uses dynamic context assembly for multi-hop connections the human would miss.

### Awareness Items (Signal → Implication)

No Ask — no decision needed. Builds the running model.

1. **Signal** — What changed. Sourced, timestamped.
2. **Implication** — Why it matters to your domain. Connection to tracked situations, entities, or patterns.

## Ordering

1. Decision items first, ordered by salience score (highest first, per config-salience dimension weights).
2. Awareness items last, ordered by salience score.
3. Within equal salience: order by recency (most recent signal first).

## Source Attribution

- Every Signal line includes: source type (email/Slack/Jira/calendar/brain), timestamp (WAT), and key identifier (email subject, Slack channel + message link, Jira ticket ID, calendar event name).
- When a signal spans multiple sources, list all contributing sources.
- When a thread is referenced, include the most recent relevant message timestamp, not the thread start.

## Pre-Compared Alternatives

When the Ask involves choosing between options:
- Present each option with its primary tradeoff in one sentence.
- State the recommendation and the reasoning (derived from brain context — entity history, commitment patterns, prior decisions).
- The user can accept the recommendation or choose differently. The recommendation is not a default — it is a starting point for judgment.

## Briefing Boundary Rules

- Each briefing covers signals since the previous briefing (or since last_processed if first briefing of the day).
- Ongoing situations that had no new delta since the previous briefing are not repeated. They remain in situational context and are accessible on query.
- Exception: items with an approaching deadline (due within 24h) are re-surfaced even without new deltas.

## Notes

- The briefing is an output mode of the heartbeat tick (config-heartbeat), not a separate task. The first tick after 06:00 WAT produces the full briefing.
- Briefing output is a brain page (type: briefing, title: `briefing-YYYY-MM-DD`). One page per day. Previous day's page is set to `status: superseded` when the new one is created. Historical briefings are preserved — no lossy compression.
- Briefing format is modifiable through Dispatch. Changes go through the brain's MCP server with human approval.
- The Ask → Signal → Implication structure is derived from military intelligence briefing patterns and McKinsey SCR — leading with the decision respects executive cognitive load.