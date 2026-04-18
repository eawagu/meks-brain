---
role: cto-teamapt
type:
  - "situation"
title: Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence
status: developing
created: "2026-04-15T15:14:14Z"
summary: "Monnify Atlas NIP Outwards Transit Account 0000224028 — duplicate-debit recurrence. Exposure expanded 2026-04-18 08:54 WAT: Odunayo Esan quantifies scope at ₦32,659,067.91 across 381 transactions (Temitope's 17:35 WAT Apr 17 spreadsheet) — ~12x the originally reported ₦2.67M. Combined with ₦3.2M March unrecovered, total exposure now ~₦35.86M. Tolulope Obianwu escalation to Damilare Ogunnaike for systemic product review active."
updated: "2026-04-18T09:39:01Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

During a routine reconciliation of the [[Monnify]] Atlas NIP Outwards Transit Account (0000224028), [[Odunayo Esan]] (Lead, Settlement & Reconciliation, TeamApt) identified that certain transactions failed on the Disbursement Transaction Table and were reversed, yet a **second debit for the same transactions was subsequently processed from the Transit account**.

**Exposure trajectory:**
- Apr 15 15:02 WAT — Initial scope: ₦2,671,766.05 (new event).
- Apr 15 — Combined with ₦3.2M unrecovered from March 17–26, 2026 occurrence: ~₦5.87M.
- **Apr 18 08:54 WAT — SCOPE EXPANSION: ₦32,659,067.91 across 381 transactions** per Odunayo Esan's email (with Temitope Odunuga's 17:35 WAT Apr 17 reconciliation spreadsheet). This is ~12x the originally reported new-event exposure; combined with March unrecovered, total now ~₦35.86M.

The expansion reflects deeper reconciliation rather than fresh incidents — the underlying duplicate-debit pathway on Atlas NIP outwards has been active at substantially higher volume than the initial Apr 15 report captured. Systemic framing is now quantitatively supported.

[[Oluwafemi Ajayi]] (Head, Settlement & Reconciliation, Moniepoint MFB) requested at 14:24 UTC / 15:24 WAT Apr 15 that [[Damilare Ogunnaike]] (business owner) approve temporary disablement of the service until RCA and fixes are completed.

[[Tolulope Obianwu]] (Head, Core Operations & Customer Support, TeamApt — direct report to [[Emeka Awagu]]) escalated at 14:29 UTC / 15:29 WAT Apr 15, framing this as systemic rather than isolated: "yet another instance similar to the discrepancy logged in March... these frequent errors are deeply concerning and suggest that we may be dealing with systemic issues rather than isolated incidents." Tolulope asked Damilare for a **comprehensive overhaul and review of all our products** and structured periodic product reviews to prevent further financial exposure.

**Entity touched:** [[Atlas Transfer Service Specification]] — Atlas is the internal integration switch processing ~500M transactions/month via NIBSS/NIP and 12+ other providers. A systemic duplicate-debit pathway on Atlas NIP outwards is a high-impact defect surface; the ₦32.66M / 381 txn scope confirms the defect is not rare-edge.

**Related prior signal:** [[Merchant Settlement — Systemic Reconciliation Disparity]] (merchant 0000228201 / [[TDSD-6431]]) — different account and track, but the pattern of unresolved reconciliation disparities on Monnify settlement plumbing reinforces Tolulope's "systemic" framing.

**CTO posture:** Emeka is CC'd (not the primary actor). Business owner (Damilare) owns the disablement decision; Tolulope owns the product-review ask. The 12x scope expansion elevates CTO posture from reinforcement-only to needing explicit engineering RCA visibility — a ₦32.66M exposure on a single defect pathway is a board-reportable magnitude. CTO lever: ensure engineering root-causes the duplicate-debit pathway structurally (guard for "second debit against an already-reversed transaction" on Atlas double-entry layer), rather than treating each recurrence as isolated.

**Open questions:**
- Did Damilare approve disablement? If yes, this becomes a live service-off situation with capacity/revenue implications.
- Is there an existing engineering task on the duplicate-debit pathway from the March occurrence, and what happened to it? The 381-txn scope over weeks suggests either no engineering task, or a task that did not land.
- Does the Atlas double-entry accounting layer have a guard for "second debit against an already-reversed transaction" — if not, that is the structural fix.
- What is the recovery path for the ₦32.66M? Settlement reversals on transit-account duplicate debits typically require counterparty engagement.

## Sources

- Email, [[Odunayo Esan]], 2026-04-18 08:54 WAT — scope quantification (₦32,659,067.91 / 381 transactions; Temitope Odunuga's 17:35 WAT Apr 17 reconciliation spreadsheet attached)
- Email, Tolulope Obianwu, 14:29 UTC / 15:29 WAT Apr 15, "Re: URGENT: Reconciliation Discrepancy – Monnify Atlas NIP Outwards Transit Account (0000224028)"
- Email, Oluwafemi Ajayi, 14:24 UTC / 15:24 WAT Apr 15 (same thread, earlier message)
- Email, Odunayo Esan, 14:02 UTC / 15:02 WAT Apr 15 (thread origin)

## Deltas

- [2026-04-15 16:09 WAT] — Situation opened from Tolulope Obianwu CC'd URGENT escalation to [[Damilare Ogunnaike]]. ₦2.67M new exposure on Atlas NIP Outwards Transit (0000224028); ₦3.2M prior unrecovered from March 17–26 occurrence. Disablement requested by Oluwafemi Ajayi.
- [2026-04-18 10:29 WAT] — **SCOPE EXPANSION.** [[Odunayo Esan]] email 08:54 WAT Apr 18 quantifies full exposure at **₦32,659,067.91 across 381 transactions**, with Temitope Odunuga's reconciliation spreadsheet (17:35 WAT Apr 17) attached. This is ~12x the originally reported ₦2.67M new-event exposure; combined with ₦3.2M March unrecovered, total exposure now ~₦35.86M. The expansion reflects deeper reconciliation of the same underlying pathway, not fresh incidents. CTO posture moves from reinforcement-only to needing explicit engineering RCA visibility — board-reportable magnitude on a single defect.
