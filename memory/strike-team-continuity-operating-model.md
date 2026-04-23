---
title: Strike Team + Continuity Operating Model
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-23T05:38:06Z"
updated: "2026-04-23T05:38:06Z"
summary: Phoenix operating model with two parallel tracks — Continuity (existing engineers maintain legacy system) + Build (strike team builds new platform); precedents on TSP under Frank+Alex; applied to CI&P takeover of MFB Cards under Tracy + Emeka.
---

## Definition

**Strike Team + Continuity** is the operating model used inside [[Project Phoenix]] for the transition of existing platform-relevant teams onto the new central platforms. The model has two parallel tracks:

- **Continuity track:** existing engineers in the incumbent team keep maintaining the current system. No BAU gap.
- **Build track:** a strike team (makers drawn from across the teams feeding the new platform, plus an EM and at least one other member) builds the new platform.

Once the new platform reaches parity and stability, a phased cut-over migrates workloads and engineers off the legacy stack.

## Why This Pattern

- **Protects operations:** the legacy system keeps running — no risk window where customers experience degraded service because the team is distracted building the replacement.
- **Protects talent density on the build:** the strike team is lean, focused, and not responsible for legacy BAU, so they can execute at high velocity.
- **Creates a deliberate migration gate:** workloads only move once the new platform demonstrates parity and stability — reducing dual-stack risk to a controlled phase.

## Precedents

- Pattern explicitly pioneered by [[Frank Atashili]] and [[Alex Adeyemo]] on the [[TSP]] build — 2 strike teams (Team Spine under [[Sulaiman Adeeyo]], Team Adapters under [[Sunday Ayodele]]), 15 people total.
- [[Emeka Awagu]] communicated this as the operating model to [[Tracy Ojaigho]] for the CI&P takeover of [[MFB Cards Team]] on 2026-04-14.

## Application to CI&P / MFB Cards (Apr 2026)

- **Continuity:** existing [[Damilola Oyediran]] / [[Nitish Chand]] team and [[Nadeem Abbas]] / [[Elishma Nwobodo]] team continue maintaining [[Card Manager Service]], [[Card Service]], [[Logistics Service]], etc.
- **Build:** strike team (one maker, one EM, at least one other) drawn from the MFB cards teams + TeamApt-side ([[Ketan Dhamasana]]'s proposed team) — builds the new [[Card Management System]] under [[Project Phoenix]].
- **Commitment:** audit everything the existing cards team has already built and incorporate it into the CI&P roadmap — existing work is not discarded.

## Related

- [[Project Phoenix]]
- [[TSP]]
- [[Digital Banking Platforms]]
- [[MFB Cards Team]]
- [[Card Issuance & Processing Platform]]
- [[Postillion Elimination]]
- [[Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]