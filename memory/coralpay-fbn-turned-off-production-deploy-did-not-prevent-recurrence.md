---
role: cto-teamapt
type:
  - "situation"
title: CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence
status: developing
created: "2026-04-11T16:43:52Z"
summary: "Apr 23 ZIB re-enabled+regressing: Qazim 17:29 WAT hourly report lists only FBN/PVB/SBP as turned off (ZIB removed from list). Fresh ZIB RC91 P1 active 1h53m at 22:09 WAT tick — Immediate dispatched, active-unresolved going into overnight."
updated: "2026-04-23T21:17:56Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

**Current state (22:09 WAT Apr 23):** The [[CoralPay]] suite now has a **three-bank turned-off disposition (FBN, PVB, SBP)** and a **new ZIB RC91 P1 active** filed 20:16 WAT Apr 23. Qazim Adedigba's 17:29 WAT Apr 23 hourly report explicitly listed only FBN/PVB/SBP as turned off — ZIB appears to have been re-enabled at some point between the Apr 16 Duty Handover (which listed ZIB/FBN/PVB all off) and the Apr 23 hourly report. The 20:16 WAT Qazim incident post ("Product: Switch, Incident Summary: P1: CoralPay (ZIB) RC 91 Failures Across Processors, Start Time: 8:16 PM, End Time: Ongoing") confirms ZIB is carrying live traffic and failing.

Originator thread: FBN turned off Apr 11 after [[TDSD-6047]] ([[CoralPay]] service) deployed to production at 18:45 WAT Apr 10 but RC91 recurred overnight (new P1 02:12 WAT Apr 11; ZIB/PVB recovered 34 min, FBN still failing at 02:47 WAT and subsequently turned off per Duty Handover #20260411). The production deploy did NOT prevent recurrence — whether it was the ACS connector replacement or a different component is unconfirmed.

**Scope timeline:**
- Apr 11 — FBN turned off.
- Apr 17 00:19 WAT — Duty Handover 20260416 records ZIB, FBN, PVB all turned off per business decision. Routes operational: 13/17 (down from 16/17).
- Apr 18 — Duty Handover 20260418: SBP formally reclassified into the CoralPay suite. Four banks now in CoralPay suite-off (ZIB, FBN, PVB, SBP). Net route count holds at 13/17.
- **Apr 23 17:29 WAT — Qazim hourly report lists only FBN/PVB/SBP as turned off. ZIB implicitly re-enabled — timing of re-enablement not captured in brain.**
- **Apr 23 20:16 WAT — NEW CoralPay (ZIB) RC91 P1 filed by Qazim (Slack incident post). 1h53m active at 22:09 WAT tick. No Jira ticket found in 15:11→22:09 WAT delta.**

**CoralPay engagement status (unconfirmed):** Prior handovers noted CoralPay engaging the banks on resolution. Whether the Apr 23 ZIB re-enablement represents successful CoralPay-side resolution (with the new RC91 being regression) or a unilateral business decision to re-route is unknown. Worth capturing at next briefing.

**Implication of SBP reclassification (Apr 18):** Sterling's earlier standalone route-off (since Apr 10, Day 14+) is now operationally subsumed into the CoralPay counterparty engagement — the re-enablement depends on CoralPay-side resolution rather than a direct Sterling engagement.

## Sources
slack #teamapt-tech-operations 01:24, 06:53, 06:55 WAT Apr 10; jira TDSD-6448, TDSD-6047; drive DD Production Issues notes Apr 9; email Duty Handover #20260411 (Apr 11); email Duty Handover Note 20260415 (00:06 WAT Apr 16); email Duty Handover Note 20260416 (00:19 WAT Apr 17, [[Qazim Adedigba]]); email Duty Handover Note 20260418 (Apr 18, SBP reclassification); email Qazim Hourly Reports 20260423 17:29 WAT; slack #teamapt-tech-operations 2026-04-23 20:30 WAT (Qazim ZIB RC91 P1 post, Start 20:16 WAT)

## Deltas
- 2026-04-10 07:00 WAT — New P1: CoralPay VPN Tunnel Downtime at 06:42 WAT, resolved 06:51 WAT (9 min). DD Production Issues meeting confirmed zero CoralPay/TDSD-6448 discussion.
- 2026-04-10 19:09 WAT — TDSD-6047 "DEPLOY CORALPAY SERVICE TO PRODUCTION" marked Done at 18:45 WAT by [[Ekene Udodi]]. Relationship to ACS connector replacement unconfirmed.
- 2026-04-11 03:10 WAT — New RC91 P1 at 02:12 WAT: CoralPay Bank (ZIB, FBN, PVB). ZIB/PVB recovered 34 min. FBN still failing.
- 2026-04-11 05:12 WAT — FBN no resolution signal. 2h25min since partial resolution.
- [2026-04-17 00:19 WAT] — Duty Handover Note 20260416 (Qazim Adedigba): CoralPay (ZIB, FBN, PVB) all turned off per business decision. 13/17 PTSAs operational (down from 16/17). Scope widens from FBN-only to full CoralPay suite.
- [2026-04-18 10:29 WAT] — SBP reclassification. Duty Handover Note 20260418 formally moves SBP into the CoralPay suite. Four banks now in CoralPay suite-off (ZIB, FBN, PVB, SBP). Net route count unchanged at 13/17.
- [2026-04-22 earlier ticks] — CoralPay FBN RC91 filed 05:09 WAT Apr 22 was among the P1 batch surfaced as briefing-2026-04-22 B1 and briefing-2026-04-23 D5 — draft DM unsent 18h+ after compose, no resolution signal in overnight sweep.
- [2026-04-23 22:09 WAT] — **TWO observations this tick.** (1) ZIB appears re-enabled: Qazim email hourly report 17:29 WAT Apr 23 lists only FBN/PVB/SBP as turned off — ZIB missing from the turned-off list (was present Apr 16/18). Re-enablement timing unknown — no capture in brain between Apr 18 and Apr 23. (2) **NEW CoralPay (ZIB) RC91 P1 active.** Qazim Slack incident post at 20:30 WAT: "Product: Switch, Incident Summary: P1: CoralPay (ZIB) RC 91 Failures Across Processors, Start Time: 4:16 PM [corrected — was 8:16 PM = 20:16 WAT], Ongoing, Resolution Action: escalated to bank." 1h53m active at 22:09 WAT tick. Zero Jira tickets in 15:11→22:09 WAT delta — no TDSD filed, only Slack post. **Immediate #1 (new P1) dispatched via Slack DM draft at 22:09 WAT tick** consolidating with Polaris Bank RC91 (also active, 5h20m). Going into overnight handoff (23:00 WAT), ZIB active-unresolved. Factors: urgency 0.85 · impact_scope 0.75 (ZIB re-enabled-and-failing is a regression signal) · cto_specificity 0.7 · pattern_significance 0.85 (regression after re-enablement is new pattern surface for CoralPay) · accountability_alignment 1.0.
