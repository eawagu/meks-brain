---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T05:09:34Z. 06:09 WAT Monday briefing tick: Stanbic cycle 31 closed overnight (inferred from TDSD-6629 Completed); Ecobank wait-state held (no overnight activity); DCIR portal carryforward; Nicolaas RCA 5d overdue. RECOVERY HOLDING — 60h post-recovery, 20+ clean ticks."
updated: 2026-04-20
cssclasses:
  - "source-config"
last_processed: "2026-04-20T06:09:34Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity.

## Notes

Tick 2026-04-20 07:09 WAT Skim-level (post-06:09 briefing). 5 new threads since 06:09 tick: 4 weekly project status reports (Polaris DD Pilot, Zone Account Switch, Premium Trust DD, Sterling Account Switch — Awareness-tier, accumulate for next briefing) + 1 critical operational thread — **Union Bank RC91 | 20260420** (Olamide Ajibulu email thread, filed 01:17 WAT, 3 outreach messages, bank silent 5h52m). Union Bank cycle was missed by the 06:09 briefing sweep despite being in window — calibration MISS note captured via `capture_note` MISS: prefix. Immediate-tier DM dispatched from this tick.
