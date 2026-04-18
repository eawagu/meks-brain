---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T12:11:47Z. Connector Health: RECOVERY HOLDING — 17h02m post-recovery. HoE Round 2 invite (Bhuvnesh Bansal) for Wed Apr 22 received 12:19 WAT."
updated: "2026-04-18T12:17:58Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T12:11:47Z"
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

**RECOVERY HOLDING** — 17h02m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; no regression. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 13:09 WAT window (12:10 WAT → 13:11 WAT, Skim upgraded to Full): **One new email delta this window — Round 2 Technical Leadership & Architecture Panel Interview invitation** for the Head of Engineering position (candidate: Bhuvnesh Bansal) scheduled Wed Apr 22 11:00–12:00 WAT, received 12:19 WAT. New candidate not yet in brain — no existing entity page. Classification: Decision-tier candidate for briefing-2026-04-19 (RSVP needed, new candidate enters HoE panel stage, time-boxed Wed Apr 22, CTO is hiring manager). Not Immediate (4 days out). Accumulated for tomorrow's briefing tick. Other in-window messages are pre-window (before 11:09 UTC / 12:09 WAT) and already captured in prior ticks or are low-signal system digests (AWS EBS CSI policy notification, AWS RDS case reminders, Lattice review reminder, Samu PTO request, Ravi Kiran time-off approval, Duty Handover 20260418). No Layer 1 (To:me) catches beyond the interview invite. No other Layer 2 keyword hits this window. No Immediate-tier email signals.
