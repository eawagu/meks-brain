---
role: cto-teamapt
type:
  - "situation"
title: CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence
status: developing
created: "2026-04-11T16:43:52Z"
summary: "CoralPay suite (ZIB, FBN, PVB) now fully off per business decision (Duty Handover 20260416, 00:19 WAT Apr 17). Routes operational: 13/17 (down from 16/17). Originated Apr 11 with FBN turned off after TDSD-6047 production deploy did not prevent RC91 recurrence; scope expanded from FBN-only to the full CoralPay suite overnight."
updated: "2026-04-17T08:38:10Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

**Current state (06:09 WAT Apr 17):** The full [[CoralPay]] suite — ZIB, FBN, PVB — is turned off per business decision. Routes operational: **13/17** (down from 16/17 yesterday). This is a suite-wide disposition, not a cycle-by-cycle recovery pattern. Originator thread: FBN turned off Apr 11 after [[TDSD-6047]] ([[CoralPay]] service) deployed to production at 18:45 WAT Apr 10 but RC91 recurred overnight (new P1 02:12 WAT Apr 11; ZIB/PVB recovered 34 min, FBN still failing at 02:47 WAT and subsequently turned off per Duty Handover #20260411). The production deploy did NOT prevent recurrence — whether it was the ACS connector replacement or a different component is unconfirmed.

**Scope expansion (Apr 17):** [[Qazim Adedigba]]'s Duty Handover Note 20260416 at 00:19 WAT Apr 17 records CoralPay-linked banks (ZIB, FBN, PVB) all turned off per business decision. Scheduled maintenance framing from prior handovers has resolved into a standing suite-off disposition. The decision is described as business-side (not a technical remediation), and the handover states no timeline for re-enablement. CTO implication: 3 additional routes off on top of [[Sterling Bank|Sterling]] (already off since Apr 10) — total 4/17 routes off this morning, 23.5% of the PTSA footprint.

**CoralPay engagement status (unconfirmed):** Prior handovers noted CoralPay engaging the banks on resolution. Whether that engagement track is still active, or whether the business decision represents abandonment of that track, is not stated in the 20260416 handover. This is the primary open question for today.

## Sources
slack #teamapt-tech-operations 01:24, 06:53, 06:55 WAT Apr 10; jira TDSD-6448, TDSD-6047; drive DD Production Issues notes Apr 9; email Duty Handover #20260411 (Apr 11); email Duty Handover Note 20260415 (00:06 WAT Apr 16); email Duty Handover Note 20260416 (00:19 WAT Apr 17, [[Qazim Adedigba]])

## Deltas
- 2026-04-10 07:00 WAT — New P1: CoralPay VPN Tunnel Downtime at 06:42 WAT, resolved 06:51 WAT (9 min). DD Production Issues meeting confirmed zero CoralPay/TDSD-6448 discussion.
- 2026-04-10 19:09 WAT — TDSD-6047 "DEPLOY CORALPAY SERVICE TO PRODUCTION" marked Done at 18:45 WAT by [[Ekene Udodi]]. Relationship to ACS connector replacement unconfirmed.
- 2026-04-11 03:10 WAT — New RC91 P1 at 02:12 WAT: CoralPay Bank (ZIB, FBN, PVB). ZIB/PVB recovered 34 min. FBN still failing.
- 2026-04-11 05:12 WAT — FBN no resolution signal. 2h25min since partial resolution.
- [2026-04-17 00:19 WAT] — Duty Handover Note 20260416 (Qazim Adedigba): CoralPay (ZIB, FBN, PVB) all turned off per **business decision**. 13/17 PTSAs operational (down from 16/17). Scope widens from FBN-only to full CoralPay suite. No re-enablement timeline in the handover. CoralPay-to-bank engagement status not restated.