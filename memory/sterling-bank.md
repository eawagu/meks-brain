---
type:
  - "entity"
title: Sterling Bank
created: 2026-04-11
summary: Nigerian bank — Apr 27 compliance testing scheduled (Virtual Account + Transfer API); virtual account share gave back gains (33.9% → 31.1% w/c Apr 24); SLA Clause 5.5 being rejected, TSQ insistence; consent-letter pending; dedicated GL accounts confirmed.
updated: "2026-04-27T05:39:29Z"
cssclasses:
  - "entity"
---

## Overview

Sterling Bank is a Nigerian bank; previously breached by a threat actor who subsequently reportedly reached Remita — ATS route turned off and TDSD-6385 administratively closed without resolving the underlying suspension.

## Compliance Testing — w/c Apr 27, 2026

Per [[CEO Gazette - 24th April 26]]: Sterling Bank has scheduled a compliance testing exercise for next week, focused specifically on the Virtual Account and Transfer API services TeamApt provides. Requirements have been distributed to relevant stakeholders; prompt responses urged. See [[Sterling Bank Compliance Testing]].

## Virtual Account share — week of Apr 24, 2026

Sterling gave back last week's gains entirely: share dropped 33.9% → 31.1%, almost exactly reversing the Wk2 shift. The Apr 14 spike that looked like a competitive threat now appears to have been a one-off, not a sustained trend. (Source: [[CEO Gazette - 24th April 26]].)

## Direct Debit — D2B Project Realignment (2026-04-23)

### Aligned decision (D2B Apr 23)

The team will **reject Sterling Bank SLA Clause 5.5** (liability for duplicate payments post-reversal) and **insist on TSQ integration** to enable real-time transaction confirmation.

Why: without TSQ, Moniepoint cannot confirm transaction state in real time and would be liable for duplicate-payment cases (under Clause 5.5). TSQ integration shifts the verification responsibility back to a real-time confirmable state and removes the duplicate-payment liability scenario from the SLA path.

### Other status

- Dedicated GL accounts **confirmed**.
- Finance team drafting board resolution for team income account.
- Awaiting consent letter issuance after SLA sign-off.
- [[Glory Alioha]] following up with Legal on board-resolution drafting status.
- [[Kevin]] to send SLA comments to Sterling Bank with rejection of Clause 5.5 + TSQ insistence.

## Related

- [[Sterling Bank SLA Clause 5.5]]
- [[TSQ integration]]
- [[Sterling + Polaris — Routes Degraded]]
- [[Sterling Bank Compliance Testing]]
- [[Project Delivery and Optimization Realignment - 2026-04-23 14:55 WAT]]
- [[CEO Gazette - 24th April 26]]

## Sources

- [[review-queue]]
- [[Project Delivery and Optimization Realignment - 2026-04-23 14:55 WAT]]
- [[CEO Gazette - 24th April 26]]