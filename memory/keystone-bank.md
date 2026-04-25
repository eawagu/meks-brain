---
type:
  - "entity"
title: Keystone Bank
created: 2026-04-11
summary: "Nigerian bank — Direct Debit issuing bank partner; near-production in Q1 2026 but blocked by bank's mobile-app deployment and OTP-based authentication build. D2B Apr 22 aligned: deploy latest JAR to test environment to test in parallel."
updated: "2026-04-25T11:47:33Z"
cssclasses:
  - "entity"
---

## Overview

Nigerian bank — Direct Debit issuing bank partner; near-production in Q1 2026 but blocked by bank's mobile app store deployment.

## Direct to Bank — D2B Apr 22 standup

- **No update from bank**; team eyeing **end of April** for major progress on bank's end.
- **Authentication blocker** — bank is building a new mobile application incorporating mobile-app + OTP-based authentication. End-to-end test has been done, but bank is **not ready to go live with OTP**.
- **Aligned decision** — team plans to obtain a test environment and **deploy the latest [[JAR deployment standardization|JAR]]** to perform testing while awaiting the bank's mobile-app completion. Production testing also being conducted in parallel.
- **Risk flag** — [[Yasir Syed Ali]] expressed concern that delays in testing could lead to realizing later that other functions are not working. Team clarified APIs have been shared; necessary integration is on the bank's side.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## Sources
- [[AptPay Direct Debit - OKR Planning Q2 2026]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
