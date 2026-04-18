---
role: cto-teamapt
type:
  - "situation"
title: CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence
status: developing
created: "2026-04-11T16:43:52Z"
summary: CoralPay suite now covers four banks per Duty Handover 20260418 — ZIB, FBN, PVB, and SBP (Sterling Bank Plc, formally reclassified into the CoralPay suite). Net route count unchanged at 13/17 operational. Originated Apr 11 with FBN turned off after TDSD-6047 production deploy did not prevent RC91 recurrence; scope expanded to full CoralPay suite Apr 17; SBP reclassification Apr 18.
updated: "2026-04-18T09:40:31Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

**Current state (10:29 WAT Apr 18):** The [[CoralPay]] suite now encompasses **four banks** — ZIB, FBN, PVB, and **SBP ([[Sterling Bank|Sterling Bank Plc]])** — all turned off per business decision. Per Duty Handover Note 20260418, SBP has been **formally reclassified into the CoralPay suite** (previously tracked as an independent Sterling route-off). Net route count unchanged at **13/17** operational — this is a reclassification, not a new route-off event. The reclassification matters because Sterling-suite engagement now shares CoralPay's re-enablement criteria and counterparty path rather than having a separate track.

Originator thread: FBN turned off Apr 11 after [[TDSD-6047]] ([[CoralPay]] service) deployed to production at 18:45 WAT Apr 10 but RC91 recurred overnight (new P1 02:12 WAT Apr 11; ZIB/PVB recovered 34 min, FBN still failing at 02:47 WAT and subsequently turned off per Duty Handover #20260411). The production deploy did NOT prevent recurrence — whether it was the ACS connector replacement or a different component is unconfirmed.

**Scope timeline:**
- Apr 11 — FBN turned off.
- Apr 17 00:19 WAT — Duty Handover 20260416 records ZIB, FBN, PVB all turned off per business decision. Routes operational: 13/17 (down from 16/17).
- **Apr 18 — Duty Handover 20260418: SBP formally reclassified into the CoralPay suite.** Four banks now in the CoralPay suite-off disposition. Net route count holds at 13/17 (SBP was already off as an independent Sterling track, and is now counted under CoralPay).

**CoralPay engagement status (unconfirmed):** Prior handovers noted CoralPay engaging the banks on resolution. Whether that engagement track is still active, or whether the business decision represents abandonment of that track, is not stated in the 20260416 or 20260418 handovers. This is the primary open question today.

**Implication of SBP reclassification:** Sterling's earlier standalone route-off (since Apr 10, Day 8+) is now operationally subsumed into the CoralPay counterparty engagement — the re-enablement depends on CoralPay-side resolution rather than a direct Sterling engagement. Worth watching: does the consolidated CoralPay track actually accelerate resolution, or does Sterling's distinct failure mode get lost in the suite-wide framing?

## Sources
slack #teamapt-tech-operations 01:24, 06:53, 06:55 WAT Apr 10; jira TDSD-6448, TDSD-6047; drive DD Production Issues notes Apr 9; email Duty Handover #20260411 (Apr 11); email Duty Handover Note 20260415 (00:06 WAT Apr 16); email Duty Handover Note 20260416 (00:19 WAT Apr 17, [[Qazim Adedigba]]); email Duty Handover Note 20260418 (Apr 18, SBP reclassification)

## Deltas
- 2026-04-10 07:00 WAT — New P1: CoralPay VPN Tunnel Downtime at 06:42 WAT, resolved 06:51 WAT (9 min). DD Production Issues meeting confirmed zero CoralPay/TDSD-6448 discussion.
- 2026-04-10 19:09 WAT — TDSD-6047 "DEPLOY CORALPAY SERVICE TO PRODUCTION" marked Done at 18:45 WAT by [[Ekene Udodi]]. Relationship to ACS connector replacement unconfirmed.
- 2026-04-11 03:10 WAT — New RC91 P1 at 02:12 WAT: CoralPay Bank (ZIB, FBN, PVB). ZIB/PVB recovered 34 min. FBN still failing.
- 2026-04-11 05:12 WAT — FBN no resolution signal. 2h25min since partial resolution.
- [2026-04-17 00:19 WAT] — Duty Handover Note 20260416 (Qazim Adedigba): CoralPay (ZIB, FBN, PVB) all turned off per **business decision**. 13/17 PTSAs operational (down from 16/17). Scope widens from FBN-only to full CoralPay suite. No re-enablement timeline in the handover. CoralPay-to-bank engagement status not restated.
- [2026-04-18 10:29 WAT] — **SBP reclassification.** Duty Handover Note 20260418 formally moves SBP ([[Sterling Bank|Sterling Bank Plc]]) into the CoralPay suite. Four banks now in CoralPay suite-off (ZIB, FBN, PVB, SBP). Net route count unchanged at 13/17 — this is reclassification (Sterling was already off independently), not a new route-off event. Sterling's re-enablement path now runs through CoralPay counterparty engagement rather than direct Sterling engagement.