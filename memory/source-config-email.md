---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-18T13:10:00Z. RECOVERY HOLDING — 18h01m post-recovery. FCMB RC91 continuation signal 14:03 WAT Apr 18 (Daniel Armstrong → FCMB; Gabriel Oluwagbemiga reply 14:08 WAT)."
updated: 2026-04-18
cssclasses:
  - "source-config"
last_processed: "2026-04-18T13:10:00Z"
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

**RECOVERY HOLDING** — 18h01m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; no regression. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 14:09 WAT window (13:11 WAT → 14:10 WAT, Skim upgraded to Full for Email): **One new email delta — FCMB RC91 continuation signal** (Layer 2 keyword match on RC91 + FCMB). Thread 19da0b068a16f755, two messages in window:
1. 2026-04-18 14:03 WAT (13:03Z) — [[Daniel Armstrong]] (daniel.armstrong@teamapt.com) → Bashir.Adeyemi@fcmb.com, SwitchApplicationSupport@fcmb.com, Ogundairo.Tobiloba@fcmb.com; CC aptpaytechnicalsupport@teamapt.com, [[Oladapo Onayemi]]. Subject: `FCMB | RC91 | 20260418`. Body: "Please be informed that transactions are failing with RC91 intermittently. Kindly assist to review."
2. 2026-04-18 14:08 WAT (13:08Z) — Gabriel Oluwagbemiga (aptpaytechnicalsupport@teamapt.com, FCMB Switch Application Support mailbox) reply: "Kindly reconfirm status and revert."

User not in To/CC. Surfaced via Layer 2 keyword match. Signal is continuation/re-filing on [[FCMB — RC91 P1 Apr 17]] (TDSD-6613 still active per morning tick; no resolution signal overnight). Situation page updated with Apr 18 14:03 WAT delta. Not re-dispatched Immediate (calibration precedent briefing-2026-04-18 B6). Accumulated for briefing-2026-04-19 — FCMB profile is shifting from one-off P1 to active-continuing with intra-day re-filing.

No Layer 1 (To:me) catches this window. No other Layer 2 keyword hits.
