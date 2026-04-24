---
type:
  - "entity"
title: GTBank
created: 2026-04-11
summary: "Guaranty Trust Bank — Direct Debit issuing bank partner via Habari Pay. **2026-04-24 18:30–18:55 WAT: first RC91 P1 observed on GTBank via Habari (GTB's acquiring arm for switch routing) — 25min fast-cycle bank-resolved.** Apr 23: Direct Debit API still not deployed — Zach's infra challenge persists one week after Apr 16 surfacing (same blocker)."
updated: "2026-04-24T19:22:22Z"
cssclasses:
  - "entity"
---

## Overview

[[GTBank]] (Guaranty Trust Bank) is a Nigerian bank. [[Direct Debit]] issuing bank partner via [[Habari Pay]] / [[HabariPay]].

## ATS/Switch RC91 Cycles

**2026-04-24 18:30–18:55 WAT — first RC91 P1 cycle on GTBank route via Habari.** [[Olamide Ajibulu]] filed a structured P1 post in #teamapt-tech-operations at 18:36:58 WAT:
- Product: Switch
- Incident Summary: "P1: Habari (GTB) RC 91 Failures"
- Start Time: 6:30 PM (18:30 WAT)
- End Time: 6:55 PM (18:55 WAT)
- Duration: 25 min
- Identified Cause: "From Habari"
- Resolution Action: "The issue was escalated to the Habari team for resolution."

Post timestamp (18:36:58 WAT) is 19 min before the stated End Time — interpreted as template-preset filing with projected close window; no thread follow-up observed 1h+ post-filing, indicating bank-side resolution occurred as projected. **First RC91 observation on GTBank/Habari route in the brain** — RC91 wave (previously touching Access, Stanbic, Wema, FCMB, UBA, Fidelity, Union, NIBSS PTSA, Keystone, Ecobank, Polaris, Sterling/CoralPay) now extends to GTB via its [[HabariPay]] acquiring arm. Fast-cycle 25min bank-resolved pattern consistent with other RC91 cycles on the tracked issuer set.

**No active-situation page created this tick.** Single-instance fast-cycle on a previously-unobserved entity is below the situation-creation threshold; monitor for recurrence. If a 2nd Habari/GTB RC91 cycle fires within ~48h, spin up a situation page. The observation folds into the broader RC91-pattern synthesis candidate.

**Implications:**
- Pattern-expansion signal: RC91 now crosses into the Habari processor layer — adds HabariPay as a distinct infrastructure surface in the RC91 wave (beyond direct issuer ATS nodes).
- Habari is upstream of GTB for switch routing; an RC91 here may originate at Habari infrastructure rather than GTB issuer core. RCA-level distinction matters — "From Habari" Identified Cause in Olamide's post suggests TeamApt ops already localized the fault domain upstream of GTB.
- Direct-Debit track (API deployment pending Zach's infra fix) is orthogonal to this switch-route RC91 — different integration path, different failure mode. Both remain open but unrelated.

## Direct to Bank Integration

**2026-04-16:** Team successfully funded the account and tested the GTBank API through the barrier yesterday (Apr 15). Deployment is pending — [[Zach]] is facing an infrastructure challenge expected to be fixed this morning. Source: [[Direct to Bank Daily Stand Up 2026-04-16]].

**2026-04-23:** API still not deployed one week later. Same pattern restated: account funded, API tested through the barrier yesterday, deployment pending on [[Zach]]'s infrastructure challenge "to be fixed this morning." The fact that this exact framing is repeated one week later suggests the infra challenge is not trivial and is being persistently under-estimated, or GT Bank-specific environment complications are blocking Zach. Source: [[note_2026-04-23T13-53-37-857Z]].

**2026-04-13:** GTB interbank transfer awaiting credentials and signed SLAs. Source: [[Direct to Bank Daily Stand Up 2026-04-13]].

## Pattern

GT Bank deployment has been "pending Zach's infra fix today" for at least one week. Either the infra challenge is genuinely harder than initially scoped, or progress tracking is not surfacing the real blocker. Worth a structural check (what is the exact infra blocker? who's unblocking Zach?) rather than another week of "will fix today."

## Related
- [[AptPay Direct Debit - OKR Planning Q2 2026]]
- [[Habari Pay]]
- [[HabariPay]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[Olamide Ajibulu]]
