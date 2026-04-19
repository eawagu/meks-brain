---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T15:09:34Z. 16:09 WAT tick promoted skim → full on substantive delta: FCMB DCIR portal re-failure at 14:59 WAT collapses two-surface divergence to convergence; Ecobank fifth reinforcement signal at 15:56 WAT (Daniel Armstrong silence-follow-up; ~24h bank-side silence); CEO Weekly Gazette 'panic mode' reply dispatched as Immediate-tier. RECOVERY HOLDING — 44h post-recovery, 16 clean ticks."
updated: "2026-04-19T17:19:48Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T17:09:34Z"
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

**RECOVERY HOLDING** — 46h post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` and `get_thread` operational; 18 consecutive ticks clean since recovery. Live delta this tick (Afeez Kazeem samples delivery on thread 19da60c7ea537e24) confirms connector continues to produce substantive Layer 2 signal. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 18:09 WAT — email source **promoted from skim to full processing mid-tick** on substantive delta detection. Window: 17:09 WAT → 18:09 WAT (since 17:09 WAT last_processed).

One operational signal in-window:

1. **TeamApt-side sample delivery completes the handshake — 17:24 WAT.** [[Afeez Kazeem]] (internal TeamApt support) replied directly to [[Adewuyi Mayowa]] on thread 19da60c7ea537e24 (Ecobank | RC91 | 20260419) with the exact message: "Hello ADEWUYI, Please note intermittent RC91 still persist. Attached are samples for your reference." Turnaround: 55m from the bank's 16:29 WAT sample request (captured last tick). The Ecobank support loop has moved from 24h-silence-baseline to full two-way exchange within 2h15m of Daniel Armstrong's 15:01 WAT fresh filing. Dual-signal interpretation: (a) **convergence strengthened** — TeamApt has delivered what the bank asked for; no further internal blocking on the ball-passing path; (b) **contested-attribution test is now live** — samples in Mayowa's hands is the exact condition that either triggers remediation (counterparty engaged) or surfaces the deflection posture under hard evidence. The next-mover clock now runs against the bank. Situation [[Ecobank — RC91 on NUS Nodes]] updated with 18:09 WAT delta row, body rewrite incorporating the sample-response cycle, and CTO-direct-action case marked suspended pending Mayowa response (not withdrawn — reactivates on silence past the bank's response window, heuristically 24h from 17:24 WAT delivery). Factors: source=email, keyword=RC91+Ecobank, sender=Afeez Kazeem (internal support), situation_delta, convergence-strengthened, sample-delivery, bank-side-next-mover, urgency=0.5, impact_scope=0.6, cto_specificity=0.4 (suspended), pattern_significance=0.95, accountability_alignment=0.9.

Layer 1 (To:me) — zero direct To:user threads in-window.

No other Layer 2 keyword matches in-window (no new Stanbic, UBA, Wema, Fidelity, Access, NIBSS, PTSA, CoralPay, CBN, P1, outage, Keystone, Polaris, Sterling, FCMB threads in-window).

No Immediate-tier dispatch this tick — the sample-delivery does not cross Immediate threshold (no action window closing inside the hour; counterparty is next-mover, wait-state is correct posture). Signal accumulates to briefing-2026-04-20 as status-update on the Ecobank CTO-direct-action item (condition-for-reactivation = bank silence past 24h from 17:24 WAT sample delivery ≈ 2026-04-20 17:24 WAT).

Gmail connector health confirmed via thread read + search. Situation write completed: [[Ecobank — RC91 on NUS Nodes]].