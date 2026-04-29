---
type:
  - "entity"
title: Keystone Bank
created: 2026-04-11
summary: "Nigerian bank — Direct Debit issuing partner; near-production but blocked by bank's mobile-app deployment. On 2026-04-27: kicked off slightly; re-running an end-to-end test using initial mobile-app authentication; awaiting bank-supplied test account numbers (expected by Tue/Wed); awaiting official email confirmation on whether OTP authentication remains in scope alongside mobile-app auth. Apr 28: end-to-end test on test environment first, deployment targeted end of next week."
updated: "2026-04-29T11:50:39Z"
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

## 2026-04-27 — Project Delivery & Optimization Realignment

- **Kicked off slightly** — movement reported (low-light → active).
- **End-to-end re-test** — the bank reached out to request another end-to-end test using the **initial mobile-app authentication** (since the bank has not concluded on the new mobile app they are building). Team confirmed internally and asked the bank what they will need; bank asked for the **account numbers** the team will use. [[Oluwakemi Oni]] requested those account numbers from the bank — expected by Tue/Wed (28–29 April).
- **OTP authentication clarification** — although the bank had previously mentioned proceeding with OTP authentication, [[Oluwakemi Oni]] needs to receive that confirmation **officially via email**. The intent is to test OTP alongside mobile-app authentication during this round, not just mobile-app auth in isolation. Owner: Kemi to request official email confirmation from the bank.
- Source: [[Project delivery and optimization realignment - 2026-04-27 - Transcript]].

## 2026-04-28 — D2B standup

- **End-to-end test** to run on **test environment first**.
- **Deployment targeted for end of next week** (i.e., week of May 4–8).
- Source: [[Direct to Bank Daily standup - 2026-04-28 08:27 WAT]].

## Sources
- [[AptPay Direct Debit - OKR Planning Q2 2026]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]
- [[Direct to Bank Daily standup - 2026-04-28 08:27 WAT]]