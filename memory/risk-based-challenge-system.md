---
title: Risk-Based Challenge System
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-17T15:26:35Z"
updated: "2026-04-17T15:26:35Z"
summary: Adaptive fraud-prevention system in Moniepoint that applies additional authentication challenges based on transaction risk signals rather than uniformly.
---

## Overview

The Risk-Based Challenge System is an adaptive authentication and fraud-prevention control that applies additional challenges (OTP, device re-auth, selfie-liveness, etc.) on the basis of computed transaction risk rather than uniformly across all transactions.

## Design Rationale

Uniform friction (e.g., OTP on every transaction) degrades CSAT and conversion. Risk-based challenges preserve low-friction experience for clearly benign transactions while escalating scrutiny for elevated-risk flows.

## Impact

Supports 90.4% CSAT and 97.3% SLA while maintaining fraud controls. Enabled the 2024 elimination of third-party mail account incidents.

## Related

- [[Product Security Team]]
- [[Moniepoint 2024 Fraud Reduction]]
- [[Moniepoint 2026 Leadership Retreat UK - Day 2 Platform Performance Security Customer Experience - Summary]]
