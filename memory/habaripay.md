---
type:
  - "entity"
title: HabariPay
created: 2026-04-11
summary: "Nigerian payment processor — integrated with Moniepoint for DCIR chargebacks and payout automation; operates as GTBank's acquiring arm for Direct Debit and switch routing. **2026-04-24 18:30–18:55 WAT: first RC91 P1 observed on Habari (GTB) route — 25min fast-cycle bank-resolved, Olamide Ajibulu filed structured P1 post at 18:36:58 WAT, Identified Cause \"From Habari.\"**"
updated: "2026-04-24T19:22:29Z"
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

**This is the first RC91 observation on HabariPay in the brain.** RC91 wave (which has been cycling across Access, Stanbic, Wema, FCMB, UBA, Fidelity, Union, NIBSS PTSA, Keystone, Ecobank, Polaris, and Sterling/CoralPay since Apr 8–10) now extends to Habari as a distinct processor-layer surface — not an issuer ATS failure but a processor-layer failure that affects GTB-routed traffic. Fast-cycle 25min bank-resolved pattern consistent with other RC91 cycles on the tracked issuer set.

**Fault-domain localization.** Olamide's Identified Cause "From Habari" indicates TeamApt ops localized the fault upstream of GTB issuer core — meaning the failure was in Habari infrastructure (processor/routing layer), not GTB's own ATS nodes. This is a meaningful distinction for pattern taxonomy:
- Issuer ATS RC91 (e.g., Stanbic, Access, Wema) — failures in bank's own switch nodes.
- Processor-layer RC91 (e.g., this Habari cycle, and historically the NIBSS PTSA route) — failures in intermediary routing infrastructure.
- Both failure modes manifest as RC91 (Issuer or Switch Inoperative) to downstream acquirers, but RCAs and escalation paths differ.

**No active-situation page created this tick.** Single-instance fast-cycle is below the situation-creation threshold; monitor for recurrence. If a 2nd Habari RC91 cycle fires within ~48h, spin up a situation page. Observation folds into the broader RC91-pattern synthesis candidate.

## Other References

Mentioned in [[TeamApt Operations and Support Annual OKR 2026]], [[AptPay Direct Debit - OKR Planning Q2 2026]].

## Related
- [[GTBank]]
- [[Habari Pay]]
- [[Direct Debit]]
- [[Olamide Ajibulu]]
