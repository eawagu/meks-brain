---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T16:09:28Z. RECOVERY HOLDING — 21h00m post-recovery. FCMB recovery-then-recurrence sequence (14:14 WAT recovery → 16:17 WAT re-failure → 16:49 WAT persistence); Ecobank 16:36 WAT follow-up \"intermittent RC91 persists\"."
updated: "2026-04-18T16:19:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T16:09:28Z"
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

**RECOVERY HOLDING** — 21h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 6 consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 17:09 WAT window (16:10 WAT → 17:09 WAT, Skim upgraded to Full for Email): **Two new email delta groups.**

1. **FCMB RC91 recovery-then-recurrence sequence** (Layer 2 keyword match on RC91 + FCMB). Earlier 14:14 WAT recovery signal re-contextualized by new in-window signals: 16:17 WAT re-failure report, 16:49 WAT "Issue persists" follow-up. New behavioral signature distinct from Stanbic/Wema/UBA cyclical profiles — brief recovery followed by rapid re-failure rather than sustained recovery or sustained outage. [[FCMB — RC91 P1 Apr 17]] situation page updated with the recovery-then-recurrence delta and behavioral-signature framing.

2. **Ecobank RC91 direct-to-bank follow-up** (Layer 2 keyword match on RC91 + Ecobank). 2026-04-18 16:36 WAT on Gmail thread id 19da12452e0edb2e. "Intermittent RC91 persists" — confirms the 16:09 WAT escalation did not resolve. [[Ecobank — RC91 on NUS Nodes]] situation page updated with the 16:36 WAT follow-up delta; attribution-standoff-escalation frame continues.

Not re-dispatched Immediate (calibration precedent briefing-2026-04-17 B1 held / briefing-2026-04-18 B6). Both accumulate for briefing-2026-04-19 as pattern items — FCMB as new behavioral-signature observation, Ecobank as sustained attribution standoff beyond 24h.

No Layer 1 (To:me) catches this window. No other Layer 2 keyword hits in-window.
