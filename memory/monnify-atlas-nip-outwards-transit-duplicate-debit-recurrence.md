---
title: Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-15T15:14:14Z"
updated: "2026-04-15T15:14:14Z"
summary: "Monnify Atlas NIP Outwards Transit Account 0000224028 — second duplicate-debit recurrence in 30 days (₦2,671,766 new exposure, ₦3.2M prior unrecovered). Oluwafemi Ajayi requesting service disablement pending RCA. Tolulope Obianwu escalating to Damilare Ogunnaike for product review. CTO (Emeka) CC'd."
---

During a routine reconciliation of the [[Monnify]] Atlas NIP Outwards Transit Account (0000224028), [[Odunayo Esan]] (Lead, Settlement & Reconciliation, TeamApt) identified that certain transactions failed on the Disbursement Transaction Table and were reversed, yet a **second debit for the same transactions was subsequently processed from the Transit account**. Outstanding debit items total **₦2,671,766.05** (Odunayo email, 14:02 UTC / 15:02 WAT Apr 15).

[[Oluwafemi Ajayi]] (Head, Settlement & Reconciliation, Moniepoint MFB) requested at 14:24 UTC / 15:24 WAT that [[Damilare Ogunnaike]] (business owner) approve temporary disablement of the service until RCA and fixes are completed. Oluwafemi's message notes a prior occurrence **March 17–26, 2026 with ₦3.2M unrecovered exposure**, now compounded by the new ₦2.67M event. Combined exposure ~₦5.87M across ~30 days.

[[Tolulope Obianwu]] (Head, Core Operations & Customer Support, TeamApt — direct report to [[Emeka Awagu]]) escalated at 14:29 UTC / 15:29 WAT, framing this as systemic rather than isolated: "yet another instance similar to the discrepancy logged in March... these frequent errors are deeply concerning and suggest that we may be dealing with systemic issues rather than isolated incidents." Tolulope asked Damilare for a **comprehensive overhaul and review of all our products** and structured periodic product reviews to prevent further financial exposure.

**Entity touched:** [[Atlas Transfer Service Specification]] — Atlas is the internal integration switch processing ~500M transactions/month via NIBSS/NIP and 12+ other providers. A systemic duplicate-debit pathway on Atlas NIP outwards is a high-impact defect surface.

**Related prior signal:** [[Merchant Settlement — Systemic Reconciliation Disparity]] (merchant 0000228201 / [[TDSD-6431]]) — different account and track, but the pattern of unresolved reconciliation disparities on Monnify settlement plumbing reinforces Tolulope's "systemic" framing.

**CTO posture:** Emeka is CC'd (not the primary actor). Business owner (Damilare) owns the disablement decision; Tolulope owns the product-review ask. CTO's lever here is reinforcing Tolulope's call for structured product reviews and ensuring engineering root-causes the duplicate-debit pathway rather than treating each recurrence as isolated. Emeka currently on Strategy Retreat Day 2 (London) — no in-hour action expected this afternoon; posture decision lands in tomorrow morning's briefing.

**Open questions:**
- Did Damilare approve disablement? If yes, this becomes a live service-off situation with capacity/revenue implications.
- Is there an existing engineering task on the duplicate-debit pathway from the March occurrence, and what happened to it?
- Does the Atlas double-entry accounting layer have a guard for "second debit against an already-reversed transaction" — if not, that is the structural fix.

## Sources

- Email, Tolulope Obianwu, 14:29 UTC / 15:29 WAT Apr 15, "Re: URGENT: Reconciliation Discrepancy – Monnify Atlas NIP Outwards Transit Account (0000224028)"
- Email, Oluwafemi Ajayi, 14:24 UTC / 15:24 WAT Apr 15 (same thread, earlier message)
- Email, Odunayo Esan, 14:02 UTC / 15:02 WAT Apr 15 (thread origin)

## Deltas

- [2026-04-15 16:09 WAT] — Situation opened from Tolulope Obianwu CC'd URGENT escalation to [[Damilare Ogunnaike]]. ₦2.67M new exposure on Atlas NIP Outwards Transit (0000224028); ₦3.2M prior unrecovered from March 17–26 occurrence. Disablement requested by Oluwafemi Ajayi.
