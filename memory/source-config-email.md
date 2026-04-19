---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T15:09:34Z. 16:09 WAT tick promoted skim → full on substantive delta: FCMB DCIR portal re-failure at 14:59 WAT collapses two-surface divergence to convergence; Ecobank fifth reinforcement signal at 15:56 WAT (Daniel Armstrong silence-follow-up; ~24h bank-side silence); CEO Weekly Gazette 'panic mode' reply dispatched as Immediate-tier. RECOVERY HOLDING — 44h post-recovery, 16 clean ticks."
updated: "2026-04-19T15:24:23Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T15:09:34Z"
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

**RECOVERY HOLDING** — 44h post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 16 consecutive ticks clean since recovery. Live delta hits this tick (FCMB DCIR re-failure, Ecobank 55m silence-follow-up, CEO Gazette reply) confirm connector continues to produce substantive Layer 2 + Layer 1 signal. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 16:09 WAT — email source **promoted from skim to full processing mid-tick** on substantive delta detection. Window: 15:09 WAT → 16:09 WAT (since 15:09 WAT last_processed).

Three operational signals in-window:

1. **FCMB ATS-track DCIR portal re-failure — 14:59 WAT.** DCIR portal track re-failed after the 13:32 WAT interim resolution. Two-surface framing collapsed: prior tick framed FCMB as "two-surface divergence" (ATS persisting, DCIR resolving); that framing withdrew to "two-surface convergence" — both ATS and DCIR day-3 trajectories continue into Sunday evening. Situation [[FCMB — RC91 P1 Apr 17]] updated with 16:09 WAT delta and body rewrite. Factors: source=email, keyword=FCMB+DCIR+RC91, situation_delta, pattern_significance=0.95, cto_specificity=0.55, accountability_alignment=0.9, urgency=0.6, impact_scope=0.7.

2. **Ecobank fifth reinforcement signal — 15:56 WAT.** [[Daniel Armstrong]] 55m silence-follow-up on thread 19da60c7ea537e24 chasing the bank. Ecobank-side silent ~24h since Apr 18 16:09 WAT first direct-to-bank contact. Five-signal escalation cascade now documented on [[Ecobank — RC91 on NUS Nodes]] — reporter handoff, recipient expansion, Oladapo CC elevation, fresh-thread filing, and now 55m internal silence-follow-up. Situation updated with 16:09 WAT delta. Factors: source=email, keyword=RC91+Ecobank, situation_delta, escalation_cascade, pattern_significance=0.95, cto_specificity=0.8, accountability_alignment=0.9, urgency=0.75, impact_scope=0.6.

3. **CEO Weekly Gazette "panic mode" reply.** CC-to-user (not To:user); formal Immediate-trigger CC-not-To gap did not strictly match, but substantive CTO-urgent framing (CEO direct language + concurrent P1 backdrop) warranted Immediate-tier Slack DM dispatch to U080PEXEZ0E. Dispatch included concurrent context (FCMB convergence, Ecobank 24h silence, Stanbic cycle 31 closed, Access RC06 first-observation, DCIR failure band 25–27%). Calibration factors explicitly flagged in dispatch so the Improve phase can score the CC-not-To substantive-judgment override.

FCMB convergence + Ecobank 24h silence = two concurrent CTO-direct-action surfaces heading into briefing-2026-04-20. Both situations carry strengthened CTO-direct-action signal vs. prior ticks.

Layer 1 (To:me) — zero direct To:user threads in-window.

No other Layer 2 keyword matches in-window (no new Stanbic, UBA, Wema, Fidelity, Access, NIBSS, PTSA, CoralPay, CBN, P1, outage, Keystone, Polaris, Sterling threads).

Gmail connector health confirmed. Situation writes completed: [[FCMB — RC91 P1 Apr 17]] and [[Ecobank — RC91 on NUS Nodes]].