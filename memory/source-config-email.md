---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T14:09:34Z. 15:09 WAT skim tick: 1 Layer 2 Ecobank delta — Daniel Armstrong fresh RC91 filing 15:01 WAT (4th-step escalation, thread 19da60c7ea537e24, Oladapo Onayemi CC'd for first time, OSOGA@ecobank.com new recipient). FCMB ATS-track still silent. RECOVERY HOLDING — 43h post-recovery, 15 clean ticks."
updated: "2026-04-19T14:21:10Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T14:09:34Z"
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

**RECOVERY HOLDING** — 43h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 15 consecutive ticks clean since recovery. Live delta hit this tick (Ecobank 4th-step escalation filing) confirms connector continues to produce substantive Layer 2 signal. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 15:09 WAT **skim-level**. Gmail `newer_than:1h` keyword+Layer1 query returned one operational Layer 2 hit in the ~1h window since 14:09 WAT last_processed.

1. **Ecobank RC91 fourth-step escalation (Gmail thread 19da60c7ea537e24) — 15:01 WAT.** [[Daniel Armstrong]] filed fresh email thread "Ecobank | RC91 | 20260419" to CUMECHIKELU@ecobank.com, DCHUKWUJI@ecobank.com, ologunsanya@ecobank.com, MADEWUYI@ecobank.com, OSOGA@ecobank.com; CC aptpaytechnicalsupport@teamapt.com and oladapo.onayemi@moniepoint.com. Body: standard escalation template ("transactions are failing with RC91 intermittently. Kindly assist to review."). Distinct from Apr 18 thread 19da12452e0edb2e — this is a fresh thread, not a reply. **Significance:** three compounding signals in one filing — (a) reporter handoff (Daniel replaces Afeez), (b) recipient expansion (OSOGA@ new), (c) Oladapo CC elevation (first time on this escalation thread). Situation [[Ecobank — RC91 on NUS Nodes]] updated with 2026-04-19 15:09 WAT delta entry framing four-step escalation cascade with 23h+ of bank-side silence. Not Immediate (Oladapo CC is not To:user / @mention, calibration precedent B6 holds against re-dispatch on recurring patterns). Accumulates to briefing-2026-04-20 as Decision item — CTO-direct-action case materially strengthened. Factors: source=email, thread=fresh-ecobank, keyword=RC91+Ecobank, situation_delta, pattern_significance (4th-step escalation), CTO-specificity=medium (Oladapo CC elevation).

FCMB ATS-track (thread 19da0b068a16f755) — still no in-window reply. FCMB-side silence on the ATS track now exceeds 2h since Daniel Armstrong's 12:54 WAT Apr 19 message. Continues the day-3 latent-unresolved posture heading into briefing-2026-04-20.

Layer 1 (To:me) — no Layer 1 hits in-window.

No other Layer 2 keyword matches (no new Stanbic, UBA, Wema, Fidelity, Access, NIBSS, PTSA, CoralPay, CBN, P1, outage, Keystone, Polaris, Sterling, FCMB threads).

Gmail connector health confirmed. Situation write completed: [[Ecobank — RC91 on NUS Nodes]] updated with 2026-04-19 15:09 WAT delta (fourth-step escalation framing).
