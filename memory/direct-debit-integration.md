---
title: Direct Debit integration
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:00Z"
updated: "2026-04-25T11:52:00Z"
summary: "TeamApt Direct to Bank integration track for mandate creation, transaction processing, and OTP-based authentication — multi-bank pipeline. Apr 22 active: Money Point OTP/transaction-processing failure; Union Bank 10-digit account wait; Polaris API instability."
---

## Definition

**Direct Debit integration** is the [[Direct to Bank program]] track that onboards Nigerian banks for direct-debit mandate creation and transaction processing through TeamApt's [[CDD]] (Consolidated Direct Debit) platform.

## Common building blocks

- **Mandate creation** flow — customer authorizes recurring debit at the bank.
- **Transaction simulation** — end-to-end testing with bank's sandbox/staging.
- **OTP-based authentication** — bank issues OTP for transaction authorization.
- **Account validation** — confirm account number formats (some banks require 10-digit, some 9-digit).
- **JAR deployment** — see [[JAR deployment standardization]].

## Active fronts (Apr 22 D2B)

- **[[Money Point]]** — OTP delivery failing; transaction processing fails after OTP validation. War room scheduled.
- **[[Union Bank]]** — server access resolved; waiting on bank to provide a 10-digit account number (9-digit caused API failure).
- **[[Polaris Bank]]** — Name-Inquiry and Transfer APIs unstable/failing; visit + dedicated session scheduled.
- **[[Keystone Bank]]** — bank's mobile-app build with OTP not ready; team to deploy latest JAR to test environment to test in parallel.
- **[[Steel Bank]]** — awaiting project approval sign-off.
- **[[Karry MFB]]** — API/server requirements doc handoff in progress.
- **[[Abar Pay]]** — logo update underway.
- **[[GT Bank]]** — service facilitator down (transient).

## Sources

- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
