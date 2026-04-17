---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T11:09:32Z."
updated: "2026-04-17T11:19:27Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T11:09:32Z"
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

## Notes

Tick 2026-04-17 11:09 WAT window: Afeez email 12:01 WAT Ecobank reopen (Layer 1 — direct To:me). No other Layer 1 messages in this window. No Layer 2 keyword matches beyond the Afeez thread.
