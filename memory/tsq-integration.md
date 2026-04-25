---
title: TSQ integration
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:20:43Z"
updated: "2026-04-25T12:20:43Z"
summary: "Real-time transaction status query integration — Apr 23 D2B aligned decision: insist on TSQ integration with Sterling Bank as a precondition for accepting their SLA, removing the duplicate-payment liability scenario from Clause 5.5."
---

## Definition

**TSQ integration** (Transaction Status Query) is a real-time API capability that allows Moniepoint to confirm the state of a transaction at the bank in real time, rather than relying on async post-event reconciliation.

## Why it matters (Apr 23 Sterling Bank context)

Without TSQ, Moniepoint cannot confirm a transaction's actual state in real time — if a duplicate payment occurs post-reversal (the scenario [[Sterling Bank SLA Clause 5.5]] makes Moniepoint liable for), there is no real-time mechanism to verify and prevent the duplicate.

With TSQ, the duplicate-payment liability scenario is **prevented at the source** rather than handled in the SLA contract. This shifts the verification responsibility back to a real-time confirmable state and removes the duplicate-payment liability scenario from the SLA path.

## Aligned decision (Apr 23 Project Delivery & Optimization Realignment)

The team will **reject Sterling Bank SLA Clause 5.5** and **insist on TSQ integration** to enable real-time transaction confirmation.

## Sources

- [[Project Delivery and Optimization Realignment - 2026-04-23 14:55 WAT]]
