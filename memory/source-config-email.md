---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T13:10:00Z. Connector Health: NEW Gmail MCP tool-upgrade failure this tick."
updated: "2026-04-17T13:16:28Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T13:10:00Z"
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

**NEW FAILURE — Tool Upgrade Error (2026-04-17 13:10 WAT tick):** Gmail MCP `gmail_search_messages` returned `"This Google Workspace integration was just upgraded and the tool you tried to call no longer exists. Your tool definitions are stale. Tell the user to reload them (e.g. refresh the page on web, or start a new session in Claude Code) and do not retry this tool call."` The tool schema is still listed in the runtime catalog but the server rejects calls. First occurrence this tick — prior tick (12:09 WAT) succeeded. Failure isolated per heartbeat error-handling rule: log and continue, do not retry.

If this failure mode persists across 3+ consecutive ticks, surface as a Decision item in the next briefing alongside the Jira blindness pattern. Investigation owner candidate: [[Nicolaas Taljaard]] (already engaged on Jira MCP auth failure — consolidating MCP reliability work under one owner reduces coordination cost).

## Notes

Tick 2026-04-17 13:10 WAT window: Gmail MCP unreachable (see Connector Health). No Layer 1 or Layer 2 observations possible this tick. The Afeez Ecobank thread from 12:01 WAT (prior tick) remains unresolved per Slack-side read; any potential Gmail reply is invisible this window.
