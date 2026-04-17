---
title: Customer-Facing Success Rate
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-17T14:59:32Z"
updated: "2026-04-17T14:59:32Z"
summary: Primary success-rate metric for Moniepoint Acquiring — customer-visible pass/fail rate (currently 91%); backend SR (94.8% 2025 / 97% 2026 target) demoted to internal metric only.
---

## Overview

Customer-Facing Success Rate is the pass/fail rate as experienced by the customer at the point of sale or in-app — distinct from the backend success rate computed from switch/processor logs.

## Key Decision

At the [[Moniepoint 2026 Leadership Retreat UK]] Day 1, the customer-facing SR was designated the **primary reported metric** for the Acquiring business. Backend SR remains for internal diagnostics.

## Current vs Target

- Customer-facing SR: ~91% (steady).
- Backend SR: 94.8% (2025 actual), 97% (2026 target).
- The gap reflects cases where a transaction fails on the POS but appears successful on the backend.

## Related Work

- HTTP query verification (replacing ISO process; KR3 target 0.01%).
- [[Push to Card]] proactive refunds.
- Dispute rate 30%→9% in Q1; target <5%, north star <1–2%.

## Sources

- [[Moniepoint 2026 Leadership Retreat UK - Day 1 Savings Strategy Rate Framework CSAT Cost Governance Payments Compliance - Summary]]