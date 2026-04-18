---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T14:10:00Z. RECOVERY HOLDING — 19h01m post-recovery. Stanbic RC91 cycle 29 signal 14:52–14:56 WAT Apr 18 (Daniel Armstrong → Godwin Ajiboye via TDSD-6425)."
updated: "2026-04-18T15:22:45Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T15:09:28Z"
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

**RECOVERY HOLDING** — 20h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 5 consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 16:09 WAT window (15:10 WAT → 16:09 WAT, Skim upgraded to Full for Email): **Two new email deltas.**

1. **Ecobank RC91 direct-to-bank escalation** (Layer 2 keyword match on RC91 + Ecobank). 2026-04-18 16:09:27 WAT (15:09:27Z). [[Afeez Kazeem]] → Ecobank technical contacts (madewuyi@, ologunsanya@, cumechikelu@, dchukwuji@ecobank.com; CC aptpaytechnicalsupport). Subject: "Ecobank | RC91 | 20260418." Body: "transactions failing intermittently with RC91." Gmail thread id 19da12452e0edb2e. Escalation bypasses Adewuyi Mayowa's Apr 17 12:15 WAT internal pushback posture ("Everything looks fine from this end") by engaging the bank directly. [[Ecobank — RC91 on NUS Nodes]] situation page updated with the 16:09 WAT delta and attribution-standoff-escalation framing.

2. **Stanbic cycle 29 closure follow-up** (Layer 2 keyword match on RC91 + Stanbic). 2026-04-18 15:24:36 WAT (14:24:36Z). [[Daniel Armstrong]] → [[Godwin Ajiboye]] on TDSD-6425 thread: "transactions are processing fine at the moment." TeamApt-side confirmation ~28m after Godwin's bank-side 14:56 WAT resolution. [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated with cycle 29 two-sided closure delta.

Not re-dispatched Immediate (calibration precedent briefing-2026-04-17 B1 held / briefing-2026-04-18 B6). Both accumulate for briefing-2026-04-19 as pattern items.

No Layer 1 (To:me) catches this window. No other Layer 2 keyword hits in-window.
