---
title: CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-11T16:43:52Z"
updated: "2026-04-11T16:43:52Z"
summary: TDSD-6047 deployed to production Apr 10 but RC91 recurred overnight. FBN turned off. Production deploy did not prevent recurrence.
---

[[TDSD-6448]] SLA breached. [[TDSD-6047]] ([[CoralPay]] service) deployed to production 18:45 WAT Apr 10 — but RC91 recurred overnight: new P1 at 02:12 WAT Apr 11, ZIB/PVB recovered in 34 min, [[FBN]] still failing at 02:47 WAT. FBN subsequently TURNED OFF per Daily Report/Duty Handover #20260411. No resolution signal for FBN as of 07:08 WAT (4h56min). The production deploy did NOT prevent recurrence — whether it was the ACS connector replacement or a different component is unconfirmed. FBN off reduces operational routes.

## Sources
slack #teamapt-tech-operations 01:24, 06:53, 06:55 WAT Apr 10; jira TDSD-6448; drive DD Production Issues notes Apr 9

## Deltas
- 2026-04-10 07:00 WAT — New P1: CoralPay VPN Tunnel Downtime at 06:42 WAT, resolved 06:51 WAT (9 min). DD Production Issues meeting confirmed zero CoralPay/TDSD-6448 discussion.
- 2026-04-10 19:09 WAT — TDSD-6047 "DEPLOY CORALPAY SERVICE TO PRODUCTION" marked Done at 18:45 WAT by [[Ekene Udodi]]. Relationship to ACS connector replacement unconfirmed.
- 2026-04-11 03:10 WAT — New RC91 P1 at 02:12 WAT: CoralPay Bank (ZIB, FBN, PVB). ZIB/PVB recovered 34 min. FBN still failing.
- 2026-04-11 05:12 WAT — FBN no resolution signal. 2h25min since partial resolution.