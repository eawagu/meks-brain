---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T10:10:00Z. Connector Health: RECOVERY HOLDING — 15h01m post-recovery."
updated: "2026-04-18T10:20:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T10:10:00Z"
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

**RECOVERY HOLDING** — 15h01m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; no regression. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 11:10 WAT window (10:29 WAT → 11:10 WAT, Skim tick): One Layer 2 keyword catch — [[Daniel Armstrong]] → [[Godwin Ajiboye]] (Stanbic) at 10:43 WAT in the TDSD-6425 thread, continuing internal bank-side escalation on Stanbic cycle 27 during its overnight silence. Delta captured on [[Stanbic Bank ATS — Persistent RC91 Pattern]]. No Layer 1 (To:me) catches this window. No other keyword hits. No Immediate-tier email signals.
