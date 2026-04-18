---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T14:10:00Z. RECOVERY HOLDING — 19h01m post-recovery. Stanbic RC91 cycle 29 signal 14:52–14:56 WAT Apr 18 (Daniel Armstrong → Godwin Ajiboye via TDSD-6425)."
updated: "2026-04-18T14:20:26Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T14:10:00Z"
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

**RECOVERY HOLDING** — 19h01m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; no regression across 4 consecutive ticks since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 15:09 WAT window (14:11 WAT → 15:10 WAT, Skim upgraded to Full for Email): **One new email delta — Stanbic RC91 cycle 29 signal** (Layer 2 keyword match on RC91 + Stanbic). Thread TDSD-6425, two messages in window:
1. 2026-04-18 14:52 WAT (13:52Z) — [[Daniel Armstrong]] → Stanbic team on TDSD-6425 thread: "issue has resurfaced." Cycle 29 fresh report.
2. 2026-04-18 14:56 WAT (13:56Z) — [[Godwin Ajiboye]] reply: "transactions are processing now." Bank-side resolution confirmation. ~4 minutes end-to-end.

Third cycle observed today on Stanbic (26→29 span Apr 17 11:36 WAT → Apr 18 14:56 WAT, 28.5h window excluding overnight gap) — intra-day cadence acceleration vs. ~2/day historical. [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated with cycle 29 delta. Not re-dispatched Immediate (calibration precedent briefing-2026-04-17 B1 held / briefing-2026-04-18 B6). Accumulates for briefing-2026-04-19 as pattern item — 3-cycle 28.5h cadence warrants surfacing.

No Layer 1 (To:me) catches this window. No other Layer 2 keyword hits in-window.
