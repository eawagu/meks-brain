---
role: cto-teamapt
type:
  - "situation"
title: Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence
status: developing
created: "2026-04-15T15:14:14Z"
summary: "Monnify Atlas NIP Outwards Transit Account 0000224028 — duplicate-debit recurrence. Exposure expanded 2026-04-18 08:54 WAT: Odunayo Esan quantifies scope at ₦32,659,067.91 across 381 transactions (Temitope's 17:35 WAT Apr 17 spreadsheet) — ~12x the originally reported ₦2.67M. Combined with ₦3.2M March unrecovered, total exposure now ~₦35.86M. Tolulope Obianwu escalation to Damilare Ogunnaike for systemic product review active."
updated: "2026-05-12T13:22:12Z"
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

**Apr 27 10:09 WAT — First closure RCA on the cluster names the structural cause.** [[TDSD-6585]] "Debits to Monnify Atlas NIP Outwards Transit (0000224028) For Unsuccessful Disbursement Transactions" (filed Apr 17 era, Medium, scope ₦3,461,021.25 across 99 disbursement transactions, assignee [[Emmanuel Eke]]) transitioned Work in progress → Completed at 09:53:25 WAT Apr 27 by Emmanuel Eke. Resolution: Done. Closure RCA comment (created 09:26 WAT, finalized 09:53 WAT): *"Hi @Odunayo Esan — Closing this ticket as discussed, as issue has been resolved. This was an internal issue with Atlas, wherein transactions that were marked failed as on Monnify were successful on Atlas."*

**Structural significance.** The RCA names the Monnify ↔ Atlas state-mismatch pathway: a transaction succeeds on Atlas (the underlying execution), but Monnify's status table marks it failed (state-replication defect between the two layers). Monnify's failure-handling then issues a reversal — and a subsequent retry / scheduler / reconciliation routine debits the Transit account a second time, because Monnify believes the original was failed. This is the explicit cause of the duplicate-debit pathway hypothesized in the Apr 15–18 sequence.

**Scope relationship.** TDSD-6585's 99 transactions / ₦3.46M is a SUBSET (or partial-cleanup) of the broader ₦32.66M / 381 transaction Odunayo-scope from Apr 18; both share the same root pathway per the closure RCA framing. The ticket-level closure does NOT extinguish the broader exposure — only this particular disbursement batch is reconciled. The Apr 18 scope-expansion exposure remains open at the situation level; engineering pathway-level fix (guard against second-debit on Monnify-Atlas state mismatch) is unverified from this closure.

**CTO posture update.** Engineering RCA visibility is now explicit on the immediate ticket: structural cause is identified and stated. The remaining CTO lever is forward-looking — confirm a pathway-level guard exists (or is being built) on the Atlas double-entry layer to refuse second debits against transactions already reversed by Monnify, so the ₦32.66M scope does not regenerate. Without pathway-level fix verification, this RCA closes a single batch but does not retire the systemic concern Tolulope escalated.

**Open questions:**
- ~~Did Damilare approve disablement?~~ → not formally documented in brain; appears not — the Atlas pathway has remained operational across the Apr 15 → Apr 27 window. Disablement decision may have been resolved informally or rejected; pathway-level fix is the standing track.
- Is there an existing engineering task on the duplicate-debit pathway from the March occurrence, and what happened to it? **Apr 27 RCA partially answers: at least one reconciliation-batch ticket existed (TDSD-6585) and is now closed, but the pathway-level guard on Atlas double-entry layer is not visible from this closure alone.** The 381-txn scope over weeks suggests either no pathway-level engineering task, or one that did not land.
- ~~Does the Atlas double-entry accounting layer have a guard for "second debit against an already-reversed transaction" — if not, that is the structural fix.~~ → **Apr 27 RCA confirms the gap: Monnify-Atlas state-mismatch pathway exists; the closure does not name a guard or pathway-level fix. Remains the standing structural fix question.**
- What is the recovery path for the ₦32.66M? Settlement reversals on transit-account duplicate debits typically require counterparty engagement. TDSD-6585's ₦3.46M batch is now reconciled per the closure; recovery on the broader 381-txn scope is unverified.
- Is TDSD-6585's closure the first of a series of batch-cleanup tickets, or the only one? The Apr 18 scope (381 txn / ₦32.66M) implies multiple batches if cleanup is per-batch.

## Sources

- Email, [[Odunayo Esan]], 2026-04-18 08:54 WAT — scope quantification (₦32,659,067.91 / 381 transactions; Temitope Odunuga's 17:35 WAT Apr 17 reconciliation spreadsheet attached)
- Email, Tolulope Obianwu, 14:29 UTC / 15:29 WAT Apr 15, "Re: URGENT: Reconciliation Discrepancy – Monnify Atlas NIP Outwards Transit Account (0000224028)"
- Email, Oluwafemi Ajayi, 14:24 UTC / 15:24 WAT Apr 15 (same thread, earlier message)
- Email, Odunayo Esan, 14:02 UTC / 15:02 WAT Apr 15 (thread origin)
- jira [[TDSD-6585]] Completed 09:53:25 WAT Apr 27 by [[Emmanuel Eke]] with closure RCA: "internal issue with Atlas, wherein transactions that were marked failed as on Monnify were successful on Atlas"

## Deltas

- [2026-04-15 16:09 WAT] — Situation opened from Tolulope Obianwu CC'd URGENT escalation to [[Damilare Ogunnaike]]. ₦2.67M new exposure on Atlas NIP Outwards Transit (0000224028); ₦3.2M prior unrecovered from March 17–26 occurrence. Disablement requested by Oluwafemi Ajayi.
- [2026-04-18 10:29 WAT] — **SCOPE EXPANSION.** [[Odunayo Esan]] email 08:54 WAT Apr 18 quantifies full exposure at **₦32,659,067.91 across 381 transactions**, with Temitope Odunuga's reconciliation spreadsheet (17:35 WAT Apr 17) attached. This is ~12x the originally reported ₦2.67M new-event exposure; combined with ₦3.2M March unrecovered, total exposure now ~₦35.86M. The expansion reflects deeper reconciliation of the same underlying pathway, not fresh incidents. CTO posture moves from reinforcement-only to needing explicit engineering RCA visibility — board-reportable magnitude on a single defect.
- [2026-04-27 10:09 WAT — First closure RCA on the cluster, names structural pathway] — [[TDSD-6585]] (₦3.46M / 99 disbursement transactions, Medium, [[Emmanuel Eke]] assignee) Completed at 09:53:25 WAT by Emmanuel Eke. Resolution: Done. Closure RCA: *"This was an internal issue with Atlas, wherein transactions that were marked failed as on Monnify were successful on Atlas."* The RCA names the Monnify ↔ Atlas state-mismatch pathway as the structural cause: Atlas executes successfully, Monnify's status table marks failed, Monnify reverses, downstream re-debits the Transit account → duplicate-debit pathway. **Scope relationship**: TDSD-6585's 99 transactions appear to be a subset / partial cleanup of the broader 381-txn Odunayo-scope; closure does not extinguish the ₦32.66M exposure or confirm a pathway-level Atlas guard. **CTO posture update**: engineering RCA visibility achieved on one batch; pathway-level structural fix question (Atlas double-entry guard against second-debit on already-reversed transactions) remains the standing CTO lever. Briefing-2026-04-27 06:09 WAT did NOT surface this track — carries to next briefing-tick decision queue. No Immediate dispatch — operational containment via batch-cleanup, pathway-level fix unverified. Factors: source=jira, layer_a_status_transition_completed, ticket_closure_with_rca, structural_cause_named_monnify_atlas_state_mismatch, active_situation_match, 99_txn_subset_of_381_txn_scope, pathway_level_fix_unverified, board_reportable_magnitude_remains_open, accountability_alignment_high.

- [2026-05-12 14:14 WAT] TDSD-6928 "Dubplicate disbursement debit transactions" filed May 11 by Anuolowapo Mabinuori, assignee Emmanuel Eke, Medium, **INITIAL REVIEW**, description: "On May 10, 2026, an anomaly was identified within the disbursement processing system whereby merchants began reporting...". Possible recurrence of duplicate-debit pattern; product surface (Monnify disbursements) overlaps active situation scope. Awareness-tier — link to Atlas NIP Outwards Transit pattern to be confirmed by next-tick ticket-detail fetch.