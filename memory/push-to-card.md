---
title: Push to Card
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-17T14:59:32Z"
updated: "2026-04-17T14:59:32Z"
summary: Proactive refund strategy — plug into Settlement/Recon to refund failed transactions within 24h of settlement, before customers report to their bank (avg customer reports in 3–4 days).
---

## Overview

Push to Card is Moniepoint's proactive refund strategy under development at the [[Moniepoint 2026 Leadership Retreat UK]] Day 1. Instead of waiting for customer dispute filings, the system detects failed transactions via Settlement/Recon data and refunds them automatically.

## Mechanism

- Plug into Settlement and Recon pipelines.
- Identify failed transactions with accurate account details.
- Refund within 24h of settlement — before the customer reports to their bank.
- Average customer report time to bank: 3–4 days (creates the intervention window).

## Impact Context

- 94% of disputes (as of Jan 2026) were successful transactions within the team's control to refund — drove dispute rate 30%→<10%.
- Remaining 6–7%: failed transactions where the system lacks visibility (requires customer/merchant to log).
- Push to Card addresses the remaining failed-transaction tail, especially cases with incorrect account numbers. Effectiveness depends on TeamApt platform implementation.

## Sources

- [[Moniepoint 2026 Leadership Retreat UK - Day 1 Savings Strategy Rate Framework CSAT Cost Governance Payments Compliance - Summary]]