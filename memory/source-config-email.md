---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T11:09:34Z. Connector Health: RECOVERY HOLDING — 16h00m post-recovery."
updated: "2026-04-18T11:18:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T11:09:34Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity.
- Governance: board, audit, compliance escalation.

### Skip rules
- Automated system digests that duplicate Slack-surfaced signals.
- Calendar notification emails — use calendar source directly.

## Connector Health

**RECOVERY HOLDING** — 16h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; no regression. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 12:09 WAT window (11:10 WAT → 12:09 WAT, Skim tick): Zero NEW email deltas in window. Prior-tick TDSD-6425 activity (Stanbic 10:17–10:43 WAT email thread) re-read and re-interpreted — correction applied to [[Stanbic Bank ATS — Persistent RC91 Pattern]]: the sequence was cycle 28 fresh resurface (Daniel 10:17 WAT) → bank-side resolution (Ajiboye 10:24 WAT) → TeamApt confirmation (Daniel 10:43 WAT), a ~7m fast cycle. The 11:10 WAT tick had framed this as "continuing bank-side escalation during cycle 27 silence" — that framing misread a resolution-confirmation email as an escalation email. Calibration signal: email interpretation depth insufficient on single-message reads — when quoting a specific message as a delta, tick MUST scan the surrounding chronology (prior 3–5 messages in thread) to identify whether the message is opening, continuing, or closing an episode. Recommend adding to Sweep order or Directives as a structural fix candidate; not changing config this tick. No Layer 1 (To:me) catches this window. No new Layer 2 keyword hits. No Immediate-tier email signals.
