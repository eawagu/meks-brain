---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T11:17:27Z. 12:17 WAT skim tick: zero Layer 1 + Layer 2 operational hits in-window. RECOVERY HOLDING — 40h08m post-recovery, 12 consecutive clean ticks."
updated: "2026-04-19T11:20:32Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T11:17:27Z"
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

**RECOVERY HOLDING** — 40h08m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 12 consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 12:17 WAT **skim-level**. Gmail `after:2026/04/19 newer_than:3h` returned only noise — zero operational Layer 1 or Layer 2 hits in the 2h06m window since 10:11 WAT last_processed.

Layer 1 (To:me) — no urgent direct-to-CTO email. Layer 2 keywords — no new hits on RC91 / RC06 / issuer names.

Consistent with Sunday mid-day cadence. Nothing accumulates to next briefing from email this tick.
