---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T13:10:00Z. Connector Health: NEW Gmail MCP tool-upgrade failure this tick."
updated: "2026-04-17T14:16:27Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T14:09:00Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema.
- Governance: board, audit, compliance escalation.

### Skip rules
- Automated system digests that duplicate Slack-surfaced signals.
- Calendar notification emails — use calendar source directly.

## Connector Health

**ESCALATING — Tool Upgrade Error, 2nd consecutive tick (2026-04-17 15:09 WAT):** Gmail MCP `gmail_search_messages` returned `"This Google Workspace integration was just upgraded and the tool you tried to call no longer exists. Your tool definitions are stale..."` for the second consecutive tick. First occurrence was the 14:09 WAT tick; 13:09 WAT and earlier succeeded. The 15:09 WAT retry produced the same error. Failure isolated per heartbeat error-handling rule: log and continue, do not retry.

**Per policy:** if this failure mode persists across 3+ consecutive ticks, surface as a Decision item in the next briefing (briefing-2026-04-18) alongside the Jira blindness pattern. We are now 1 tick away from that threshold. Investigation owner candidate: [[Nicolaas Taljaard]] (already engaged on Jira MCP auth failure — consolidating MCP reliability work under one owner reduces coordination cost).

## Notes

Tick 2026-04-17 15:09 WAT window: Gmail MCP unreachable for the 2nd consecutive tick (see Connector Health). No Layer 1 or Layer 2 observations possible this tick. The Afeez Ecobank thread from 12:01 WAT (prior tick) remains unresolved per Slack-side read; any potential Gmail reply is invisible across two consecutive tick windows.
