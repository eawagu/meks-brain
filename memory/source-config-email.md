---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T15:09:34Z. 16:09 WAT tick promoted skim → full on substantive delta: FCMB DCIR portal re-failure at 14:59 WAT collapses two-surface divergence to convergence; Ecobank fifth reinforcement signal at 15:56 WAT (Daniel Armstrong silence-follow-up; ~24h bank-side silence); CEO Weekly Gazette 'panic mode' reply dispatched as Immediate-tier. RECOVERY HOLDING — 44h post-recovery, 16 clean ticks."
updated: "2026-04-19T16:19:10Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T16:09:34Z"
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

**RECOVERY HOLDING** — 45h post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` and `get_thread` operational; 17 consecutive ticks clean since recovery. Live delta this tick (Ecobank Mayowa reply on thread 19da60c7ea537e24) confirms connector continues to produce substantive Layer 2 signal. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 17:09 WAT — email source **promoted from skim to full processing mid-tick** on substantive delta detection. Window: 16:09 WAT → 17:09 WAT (since 16:09 WAT last_processed).

One operational signal in-window:

1. **Ecobank bank-side silence broken — 16:29 WAT.** [[Adewuyi Mayowa]] replied on thread 19da60c7ea537e24 (Ecobank | RC91 | 20260419) after ~24h of bank-side silence from the Apr 18 16:09 WAT first-direct-to-bank contact. Exact message: "Hello Armstrong, Please help reconfirm status. Also, please assist with samples to enable us check further." Dual-signal interpretation: (a) **convergence** — the 24h silence absence-of-signal watch is closed, counterparty is engaged; (b) **contested-attribution revival** — the "please assist with samples to enable us check further" posture mirrors Ecobank's Apr 17 "send samples" stance, which on the prior round functioned as attribution-deflection rather than active remediation. Situation [[Ecobank — RC91 on NUS Nodes]] updated with 17:09 WAT delta, body rewrite incorporating Mayowa engagement, and CTO-direct-action confidence recalibration (high → low on receipt of the bank-side response — the sample-request posture means a wait-for-sample-response path is viable, which downgrades CTO-direct escalation from certain to optional for briefing-2026-04-20). Factors: source=email, keyword=RC91+Ecobank, sender=Adewuyi Mayowa (counterparty bank contact), situation_delta, silence-break, contested-attribution, urgency=0.55, impact_scope=0.6, cto_specificity=0.65, pattern_significance=0.95, accountability_alignment=0.9.

Layer 1 (To:me) — zero direct To:user threads in-window among the 5 threads returned by search.

No other Layer 2 keyword matches in-window (no new Stanbic, UBA, Wema, Fidelity, Access, NIBSS, PTSA, CoralPay, CBN, P1, outage, Keystone, Polaris, Sterling, FCMB threads in-window).

No Immediate-tier dispatch this tick — the silence-break does not cross Immediate threshold (no CTO-direct action window closing inside the hour; Mayowa response opens a wait-state, not an escalation trigger). Signal accumulates to briefing-2026-04-20 as a confidence recalibration on the Ecobank CTO-direct-action item rather than as a fresh Decision surface.

Gmail connector health confirmed via thread read + search. Situation write completed: [[Ecobank — RC91 on NUS Nodes]].