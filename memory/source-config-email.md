---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T15:09:00Z. Connector Health: 3rd consecutive tool-upgrade failure — threshold crossed; briefing-2026-04-18 Decision item."
updated: "2026-04-17T15:17:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T15:09:00Z"
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

**BRIEFING-PROMOTION THRESHOLD CROSSED — Tool Upgrade Error, 3rd consecutive tick (2026-04-17 16:09 WAT):** Gmail MCP `gmail_search_messages` returned `"This Google Workspace integration was just upgraded and the tool you tried to call no longer exists. Your tool definitions are stale..."` for the third consecutive tick. Failure windows: 14:09 WAT (1st), 15:09 WAT (2nd), 16:09 WAT (3rd). The 13:09 WAT tick and earlier succeeded. Failure isolated per heartbeat error-handling rule: logged and moved on, no retry.

**Decision item promotion (per the 15:09 WAT policy):** this will be surfaced in briefing-2026-04-18 (morning) as a Decision item, consolidated with the Jira MCP auth-failure pattern under [[Nicolaas Taljaard]]'s investigation scope. Framing: MCP-layer reliability (two connectors down concurrently) rather than per-connector remediation. Recommended action (for the briefing): confirm Nicolaas's scope of investigation covers the Gmail upgrade path too, or tag a second owner if capacity is split. Confidence: high — two concurrent MCP failures on the same reliability surface is a single investigation, not two.

**Observability gap:** Three consecutive ticks with no Gmail visibility mean any Afeez Ecobank reply, any Oladapo / Armstrong / Adewuyi follow-up on the CoralPay suite-off decision, and any Nicolaas MCP-health update have been invisible since 13:09 WAT (~3h). This compounds the Jira blindness. Wema RC91 P1 thread and NIBSS PTSA thread are Slack-surfaced and remain visible.

## Notes

Tick 2026-04-17 16:09 WAT window: Gmail MCP unreachable for the 3rd consecutive tick (see Connector Health above). No Layer 1 or Layer 2 observations possible this tick. Ecobank reopen (12:01 WAT Afeez email) and any subsequent Afeez/Adewuyi follow-ups remain invisible on the Gmail side across three ticks — Slack-side thread also silent, so no compensating signal from the alternate channel.
