---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T19:09:34Z. 20:09 WAT skim tick: Stanbic cycle 31 filing 19:25 WAT with bank engagement (under-investigation + reconfirm-status prompt) — within-pattern fast-cycle, B6 hold; Moniepoint HoE interview invite 20:08 WAT from Tobilola Fasanya formalizing existing Apr 22 16:00 WAT slot (Bhuvnesh Bansal); Ecobank wait-state held (44m post sample-delivery). RECOVERY HOLDING — 48h post-recovery, 17 clean ticks."
updated: "2026-04-19T19:25:24Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T19:09:34Z"
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

**RECOVERY HOLDING** — 48h post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` and `get_thread` operational; 17 consecutive ticks clean since recovery. Live deltas this tick (Stanbic cycle 31 filing on thread 19da2fa4960db78b; Moniepoint interview invite on thread 19da7253c2ebc76b) confirm connector continues to produce substantive Layer 2 signal. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 20:09 WAT **skim-level**. Window: 18:09 WAT → 20:09 WAT (since 18:09 WAT last_processed).

Three signals in-window — two operational + one HR/interview:

1. **Stanbic RC91 cycle 31 — 19:25 WAT.** [[Afeez Kazeem]] filed email thread 19da2fa4960db78b "Stanbic | RC91 | 20260419" at 19:25 WAT with the standard template body ("Kindly assist in reviewing the intermittent RC91"). Bank auto-responder at 19:31 WAT: "currently under investigation" (6m engagement latency — fast). Bank follow-up at 19:40 WAT: "Kindly reconfirm status" — standard fast-cycle reconfirmation prompt. Silent since 19:40 WAT; TeamApt is now next-mover for reconfirmation. Within-pattern fast-cycle (44m active at tick, pattern range 4m–64m); bank engagement prompt and healthy. No TDSD ticket raised — email+Slack track only, contrasts with cycle 30 triple-track visibility. [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated with cycle 31 body + delta. No Immediate dispatch (B6 calibration precedent holds across all RC91 pattern members). Factors: urgency 0.5 · impact_scope 0.5 · cto_specificity 0.5 · pattern_significance 0.9 · accountability_alignment 1.0.

2. **Ecobank thread 19da60c7ea537e24 — no new activity in-window.** Last signal remains [[Afeez Kazeem]]'s 17:24 WAT sample delivery to [[Adewuyi Mayowa]] (captured prior tick). 44m elapsed since sample delivery at tick time; within bank's typical response window. Wait-state holds; no delta-worthy change to [[Ecobank — RC91 on NUS Nodes]]. Bank response window heuristic: 24h from 17:24 WAT → ~2026-04-20 17:24 WAT is the reactivation threshold for CTO-direct-action case if Mayowa remains silent.

3. **Moniepoint HoE interview invite — Tobilola Fasanya 20:08 WAT.** Email thread 19da7253c2ebc76b; candidate Bhuvnesh Bansal; scheduled Apr 22 16:00 WAT; user on panel. Maps to the existing confirmed "HoE Round 2 panel 4pm–5pm WAT" slot in the Apr 22 calendar forward view (confirmed at 13:09 WAT tick, moved from 11am). Most likely the formal invitation from the recruiter (Tobilola) following [[Chris Purkis]]'s earlier proposal and user's confirmation — same meeting being formalized, not a new conflict. Accumulates to briefing-2026-04-20 as Awareness item (meeting formalization + candidate name capture). Factors: urgency 0.3 · impact_scope 0.2 · cto_specificity 0.4 · pattern_significance 0.3 · accountability_alignment 0.7.

No other Layer 2 keyword matches in-window (no new UBA, Wema, Fidelity, Access, NIBSS, PTSA, CoralPay, CBN, Keystone, Polaris, Sterling, FCMB threads). Layer 1 (To:me) — zero direct To:user operational threads in-window beyond the Moniepoint interview invite.

No Immediate-tier dispatch this tick — Stanbic cycle 31 is bank-engaged fast-cycle (B6 calibration); Moniepoint invite is awareness; Ecobank wait-state holds.

Gmail connector health confirmed via thread reads + search. Situation write completed: [[Stanbic Bank ATS — Persistent RC91 Pattern]].