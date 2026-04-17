---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T16:09:00Z. Connector Health: 4th consecutive tool-upgrade failure — threshold crossed; briefing-2026-04-18 Decision item."
updated: "2026-04-17T17:14:16Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T17:09:00Z"
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

**5TH CONSECUTIVE TOOL-UPGRADE FAILURE (2026-04-17 18:09 WAT):** Gmail MCP `gmail_search_messages` returned `"This Google Workspace integration was just upgraded and the tool you tried to call no longer exists. Your tool definitions are stale..."` for the fifth consecutive tick. Failure windows: 14:09 WAT (1st), 15:09 WAT (2nd), 16:09 WAT (3rd), 17:09 WAT (4th), 18:09 WAT (5th). The 13:09 WAT tick and earlier succeeded. Failure isolated per heartbeat error-handling rule: logged and moved on, no retry.

**Decision item remains queued for briefing-2026-04-18** (morning): consolidated with the Jira MCP auth-failure pattern under [[Nicolaas Taljaard]]'s investigation scope. Framing: MCP-layer reliability (two connectors down concurrently) rather than per-connector remediation. Recommended action: confirm Nicolaas's scope of investigation covers the Gmail upgrade path too, or tag a second owner if capacity is split. Confidence: high — two concurrent MCP failures on the same reliability surface is a single investigation, not two.

**Observability gap:** Five consecutive ticks with no Gmail visibility mean any Afeez Ecobank reply, any Oladapo / Armstrong / Adewuyi follow-up on the CoralPay suite-off decision, any Duty Handover Note 20260417 (evening version typically lands ~17:00–20:00 WAT), and any Nicolaas MCP-health update have been invisible since 13:09 WAT (~5h). This compounds the Jira blindness. Wema RC91 P1 thread, NIBSS PTSA thread, Polaris P1 thread, and Ecobank NUS thread are Slack-surfaced and remain visible via situation pages.

## Notes

Tick 2026-04-17 18:09 WAT window: Gmail MCP unreachable for the 5th consecutive tick (see Connector Health above). No Layer 1 or Layer 2 observations possible this tick. Ecobank reopen (12:01 WAT Afeez email) and any subsequent Afeez/Adewuyi follow-ups remain invisible on the Gmail side across five ticks — Slack-side thread also silent, so no compensating signal from the alternate channel. Evening Duty Handover Note typically lands in this window; invisibility extends through Qazim's handover cadence.
