---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T12:09:37Z."
updated: "2026-04-17T12:18:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T12:09:37Z"
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

Tick 2026-04-17 12:09 WAT window: no new Layer 1 messages and no Layer 2 keyword matches in this window. The Afeez Ecobank thread from the prior tick had a Slack follow-up (Adewuyi pushback) rather than an email reply.
