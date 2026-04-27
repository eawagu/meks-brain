---
title: Account Transfer Integration
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-27T17:49:44Z"
updated: "2026-04-27T17:49:44Z"
summary: "Inbound/outbound account transfer integration via switch APIs — multi-bank rollout. As of 2026-04-27 status by bank: FCMB switch APIs delivered, awaiting bank's APIs and admin profiling; Fidelity SLA pending Dennis + Felix signatures, UAT target 30 April; Union Bank wants only inbound testing; Sterling SLA in Nora's final review; Payzone account-switch UAT passed Friday."
---

## Overview

Account transfer integration provides inbound and outbound bank account transfers via switch APIs. The [[Direct to Bank program]] team rolls this out per bank, often as a prerequisite for [[NSS (NIBSS Switch Service)]] consent-letter discussions.

## Cross-bank status — as of 2026-04-27

### [[FCMB]] account transfer (via switch)

- **APIs delivered** to bank: name inquiry + transfer.
- **Awaiting bank's APIs**: both inbound and outbound.
- **Admin profiling** — bank gave two users; team can only profile one as institution admin (who then profiles others). Mail sent to bank to confirm which.
- **SLA** — reviewed by [[Nora]]; sent to bank's legal team today.

### [[Fidelity Bank]] account transfer

- **SLA approved by legal and uploaded.** Pending signatures from [[Dennis]] (expected to sign after the call) and [[Felix]] (harder; routed through legal per his instruction).
- **Dev environment** — lingering queueing/flagging issues being worked through.
- **UAT target:** 30 April max (PM commitment). E-banking divisional head pushed for this week; PM hasn't responded.
- Once UAT closes, NSS consent letter discussion unlocked.

### [[Union Bank]] account transfer

- Bank wants only **inbound transfer** testing currently. Team has shared everything needed; awaiting feedback.
- SLA shared back; under bank review.

### [[Sterling Bank]] account switch

- SLA in [[Nora]]'s final-review hands; Glory shares with bank once received.
- Awaiting board-resolution-letter signature → income account → settlements unlocked.

### [[Payzone]] account switch

- Integration test + UAT completed Friday — all script items passed.
- On production setup; VPN form to be filled by Zoom; meeting tomorrow morning.

## Cross-cutting pattern

Account transfer integration sits **upstream** of NSS in the bank-onboarding sequence. Multiple NSS workstreams (FCMB, Fidelity) are gated on the account-switch SLA being signed first.

## Related

- [[NSS (NIBSS Switch Service)]]
- [[Direct Debit Integration]]
- [[Service Level Agreement (SLA) Negotiation]]
- [[Direct to Bank program]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]