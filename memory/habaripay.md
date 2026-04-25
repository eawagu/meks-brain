---
type:
  - "entity"
title: HabariPay
created: 2026-04-11
summary: "Nigerian payment processor — integrated with Moniepoint for DCIR chargebacks and payout automation; operates as GTBank's acquiring arm for Direct Debit and switch routing. **2026-04-24 18:30–18:55 WAT first RC91 P1 (25min, bank-resolved) → 2026-04-25 02:06 WAT VPN flap with RC91 persists → 02:20 WAT hourly report Habari + Zenith failing RC91 escalated to partners. 2nd cycle within 48h crosses situation-creation threshold per Apr 24 directive.**"
updated: "2026-04-25T05:26:59Z"
cssclasses:
  - "entity"
---

## Overview

[[HabariPay]] is a Nigerian payment processor. It operates in two roles relevant to TeamApt/Moniepoint:
1. Integrated with Moniepoint for DCIR chargebacks and payout automation.
2. Serves as [[GTBank]]'s acquiring arm for Direct Debit and switch routing — TeamApt/Moniepoint transactions routed to GTB flow through Habari infrastructure.

## Switch-Route RC91 Pattern

**2026-04-24 18:30–18:55 WAT — first RC91 P1 cycle on Habari (GTB) switch route.** [[Olamide Ajibulu]] filed a structured P1 post in #teamapt-tech-operations at 18:36:58 WAT:
- Product: Switch
- Incident Summary: "P1: Habari (GTB) RC 91 Failures"
- Start Time: 18:30 WAT
- End Time: 18:55 WAT
- Duration: 25 min
- Identified Cause: "From Habari"
- Resolution Action: Escalated to the Habari team for resolution.

**This was the first RC91 observation on HabariPay in the brain.** RC91 wave (cycling across Access, Stanbic, Wema, FCMB, UBA, Fidelity, Union, NIBSS PTSA, Keystone, Ecobank, Polaris, and Sterling/CoralPay since Apr 8–10) extends to Habari as a distinct processor-layer surface — not an issuer ATS failure but a processor-layer failure that affects GTB-routed traffic. Fast-cycle 25min bank-resolved pattern consistent with other RC91 cycles on the tracked issuer set. Apr 24 entity directive: "If a 2nd Habari RC91 cycle fires within ~48h, spin up a situation page."

**2026-04-25 00:49–00:50 WAT — TDSD-6726 Habari RC 91 Problem ticket created and Completed by [[Olamide Ajibulu]]** documenting the Apr 24 25min cycle as post-incident closure (description: "This were failures that lasted for 25minutes"). Standard end-of-shift Jira hygiene; not a fresh failure.

**2026-04-25 02:06–02:13 WAT — Apr 25 cycle layer 1: VPN-flap with RC91 persists.** [[Qazim Adedigba]] structured Slack post in #teamapt-tech-operations: "Status: Habari VPN tunnel was briefly disconnected, RC 91 issue persists. Resolution Action: VPN autoreconnected. Start Time 02:06 AM End Time 02:13 AM Duration 7 Minutes." VPN-tunnel-flap layer auto-recovered in 7min, but **RC91 issue persisted independently of the VPN flap** — important fault-domain signal: the flap was an embedded sub-event in an already-active failure, not the cause.

**2026-04-25 02:20 WAT hourly report — Habari + Zenith failing RC91 escalated to partners.** Qazim hourly report (thread 19dc23924c6ed10a): "10 of 17 routes are operational. Coralpay banks (FBN, PVB, and SBP) were turned off due to business decisions. **Habari and Zenith transactions are failing with RC 91, escalated to the partners for resolution.**" Continues into Saturday morning. No closure signal observed at briefing-2026-04-25 06:09 WAT tick.

**Apr 24 → Apr 25 cycle progression (~7h45m gap closure-to-recurrence):**
- Apr 24 18:55 WAT — first cycle bank-resolved.
- Apr 25 02:06 WAT — VPN flap layer (sub-event in active failure window, ~7h11m after Apr 24 closure).
- Apr 25 02:20 WAT — hourly report confirms RC91 ongoing, escalated to partners.

**2nd cycle within 48h crosses the situation-creation threshold per the Apr 24 directive above.** Briefing-2026-04-25 D2 captures the systemic frame (multi-bank degradation overnight). Situation page spin-up deferred to user triage — preferred framing depends on whether the user wants Habari-specific tracking or broader Apr 25 multi-bank wave tracking.

## Fault-domain localization

From Apr 24 cycle: Olamide's Identified Cause "From Habari" indicates TeamApt ops localized the fault upstream of GTB issuer core — meaning the failure was in Habari infrastructure (processor/routing layer), not GTB's own ATS nodes. Apr 25 VPN-flap-with-RC91-persistence layer reinforces this: RC91 was active before the VPN-tunnel sub-event and continued after VPN auto-recovery, so the underlying failure is not VPN-tunnel-stability but processor-layer something else. This is a meaningful distinction for pattern taxonomy:
- Issuer ATS RC91 (e.g., Stanbic, Access, Wema) — failures in bank's own switch nodes.
- Processor-layer RC91 (e.g., Habari, NIBSS PTSA) — failures in intermediary routing infrastructure.
- Both failure modes manifest as RC91 (Issuer or Switch Inoperative) to downstream acquirers, but RCAs and escalation paths differ.

## Other References

Mentioned in [[TeamApt Operations and Support Annual OKR 2026]], [[AptPay Direct Debit - OKR Planning Q2 2026]].

## Related
- [[GTBank]]
- [[Habari Pay]]
- [[Direct Debit]]
- [[Olamide Ajibulu]]
- [[Qazim Adedigba]]
- [[RC91 Multi-Bank Failure Pattern]]
- [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]]
