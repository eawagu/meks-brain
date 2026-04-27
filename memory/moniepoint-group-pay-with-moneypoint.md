---
type:
  - "concept"
title: Moniepoint Group Pay with Moneypoint
created: "2026-04-19T15:53:59Z"
summary: "Planned Moniepoint Inc. checkout option on major Nigerian payment platforms (Paystack, Flutterwave, Interswitch) — modeled after Pay with OPay's success. Apr 27 status: integration concluded last week; TMAP DD payment-initialization blocker bank-side-fixed; testing in progress; deployment ticket TDSD-6742 filed; Express Checkout deprioritized to accelerate this + iCard."
updated: "2026-04-27T11:20:15Z"
cssclasses:
  - "concept"
---

## Overview

"Pay with Moneypoint" is a planned customer-facing option to be surfaced on major payment checkout platforms — [[Paystack]], Flutterwave, [[Interswitch]] — allowing [[Moniepoint|Moniepoint Inc.]] users to pay with their Moniepoint account directly at checkout.

## Rationale

Motivated by observed success of "Pay with OPay," which reportedly became the most-used channel after "Pay with Transfer" on some platforms. Moniepoint aims to capture similar share by making itself the default payment option for its users at external merchants.

## Context

- Part of [[Monnify]]'s 2026 growth strategy (customer-side capture).
- Complements Monnify's international expansion and Moniepoint's status as default VA provider for Temu and Udemy.

## Status (as of 2026-04-27)

Per [[Cards and Account: All Hands – 2026-04-27 10:30 WAT]]:

- **Integration concluded last week.**
- **TMAP direct-debit blocker resolved bank-side** — payment-initialization issue that was holding up testing has been confirmed fixed.
- **Testing in progress** — team aims to close both AEL Smart Cache + Pay with Moniepoint testing in the same window if no further issues surface.
- **Deployment-track ticket filed today:** [[TDSD-6742]] "Direct Debit Enhancements and Pay with Moniepoint implementation" ([System] Change, Status: Review, Reporter Muhammad Abid 11:35 WAT). Scope spans (a) merchant auto-registration on TeamApt, (b) new Get Mandates API with filters, (c) TeamApt create-mandate response-code mapping on monnify side, plus Pay with Moniepoint implementation. Deployment note linked from ticket.
- **Express Checkout temporarily deprioritized** to accelerate iCard + Pay with Moniepoint deployment.
- **NIPS authorization account dependency:** Required for Express Checkout AND mandate activation. Account details shared by [[Ankit Kushwaha]] with [[Damilare Ogunnaike]]; first account tested did not debit mandate; subsequent accounts worked. Rollout conversation proposed for next Tuesday.

## Sources

- [[Moniepoint 2026 Leadership Retreat UK - Day 2 Customer Rewards Sales OKRs Growth Strategy - Summary]]
- [[Cards and Account: All Hands – 2026-04-27 10:30 WAT]]

## Notes

- Renamed 2026-04-19 from [[Pay with Moneypoint]] per Rule 1/Rule 2.