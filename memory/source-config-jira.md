---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T05:10:00Z. 06:10 WAT Apr 23 briefing-tick Full sweep: critical overnight delta — TDSD-6645 Dominic broke 59h15m silence at 04:08 WAT with attribution-transfer to inwards payments team (status transition: Awaiting Scheme Update → Escalated). TDSD-6630 zero overnight movement; comment silence now ~72h43m (past 48h implicit-retire threshold, new high watermark). TDSD-6684 new Blessing-filed ticket to Dominic. TDSD-6638 closed at 02:55 WAT. TDSD-6689/TDSD-6676/TDSD-6691 no movement. Decision items D1 (attribution-transfer) + D2 (NIBSS DD retire-or-hold) carried into briefing-2026-04-23."
updated: "2026-04-23T05:46:15Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T05:10:00Z"
---

## Connection

- **Connector:** Atlassian MCP
- **Cloud ID:** 15be6fd4-ef3b-4d52-ab1b-e6e706a38e06
- **Site:** teamapt.atlassian.net
- **Scope — 18 projects (1 service_desk + 17 software):**

| Display name | Key | Archetype |
|---|---|---|
| TeamApt-Service-Desk | TDSD | service_desk |
| AptPay Consolidated Direct Debit | TCDD | software |
| Aptpay Core Switching | ATPG | software |
| AptPay Direct Debit (DTB) | ADD | software |
| AptPay Switch | AS | software |
| AptPay Third Party Processing | ATPP | software |

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in ("TDSD", "TCDD", "ATPG", "ADD", "AS", "ATPP")`. Verified at 13:09 WAT tick after two consecutive rejections on unquoted forms.

**JQL payload-size discipline (added 2026-04-22 14:15 WAT after oversize return).** Full 18-project `searchJiraIssuesUsingJql` returned 56,914 chars / 931 lines in a single call — exceeded practical context envelope. **Rule:** for tick sweeps with windows > 24h, query projects individually (iterate the scope list) or restrict by fields at source. Do not pull the union payload unconditionally. Applies to any tick with `updated > -24h` comparable window length.

**JQL date-filter-timezone discipline (added 2026-04-22 16:15 WAT).** JQL `updated >= "YYYY-MM-DD HH:mm"` is evaluated in the Jira site's timezone (Africa/Lagos for teamapt.atlassian.net), NOT UTC. When filtering relative to a UTC `last_processed` stamp, **either** pass the WAT-local time equivalent **or** accept that the query may return items updated 1 hour before the stated UTC cutoff and post-filter on the assistant side. Applying no post-filter to a WAT-indexed query will include pre-window items and inflate the delta set.

## Directives

### Priority model
- Service desk tickets (TDSD) with P1/outage markers — Immediate-tier candidates.
- Software project tickets with CTO approval gate — Briefing-tier.
- Routine dev/QA transitions — Awareness-tier.

### Active-situation entity match
Match updated tickets against active situation pages. Overlapping entity or keyword → elevate to Briefing-tier minimum.

### Out-of-scope surfacing via Layer 1 email
When a Jira ticket from an out-of-scope project (not in the 18-project scope above) surfaces to the user via Layer 1 Gmail (To:me) approval request, fetch the ticket metadata and treat per normal tier classification. Record in notes so the next sweep can follow the ticket without re-discovery. Example: TISD-480 surfaced 2026-04-20 via approval email.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

### Tick 2026-04-20 17:09 WAT — Full-level

~30 tickets updated in 16:09→17:09 WAT window; key operational deltas below.

**TDSD-6645 "Urgent Pending Settlement – Re-trigger Required" — P1 Highest NEW (16:52 WAT).**
- Filed by [[Blessing Obioha]] (Moniepoint); component Monnify_settlements; assignee [[Dominic Usiabulu]].
- Transaction MNFY|46|20260310114548|008618 pending; VA 6021082035 (Afrinvest-AFR) credit-debit-reversal left VA insufficiently funded blocking settlement; David recommends SABEC script re-trigger.
- Dominic acknowledged at 16:53 WAT ("reviewing") — 1min TTFR. SLA open: 72h to resolution (breach 2026-05-01 16:52 WAT).
- **New situation page created:** [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]]. Status developing.
- **No Immediate-tier dispatch** — clear ownership, acknowledged within 1min, named fix path, SLA open. Next-tick watch: Dominic progress on SABEC re-trigger.
- Factors: source=jira, priority=highest, ticket_new, owner_acknowledged, fix_path_named, first_surface, situation_created.

**TDSD-6643 "Union Bank | ATS | RC 91 Failure | 20260420" — cycle 2 opened + closed 12m (Medium priority).**
- Filed by [[Qazim Adedigba]] 16:28 WAT; Resolution "Transaction auto recovered" 16:37 WAT; ticket Resolved 16:41 WAT.
- Cycle 2 of 2 on Apr 20; 7th Union Bank cycle in 9 days.
- No Immediate dispatch (within-envelope fast-cycle). [[Union Bank — RC91 P1 Apr 20]] situation updated with cycle 2 delta; page remains retired.
- Factors: source=jira+slack, cycle_2, within_envelope, pattern_compounding, no_cto_action.

**TDSD-6627 NIBSS Disbursements Downtime — Completed in window.** NIBSS Disbursements P1 closure (distinct from TDSD-6630 NIBSS DD mandate product). Awareness-tier; no bearing on active NIBSS DD situation.

**TDSD-6630 NIBSS Direct Debit — silence extends further.** No new update this tick. Any-update silence **~8h51m** (from 08:18 WAT). Comment silence **~11h42m** (from 05:27 WAT). User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state. Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

**Routine transitions / in-window status refreshes (Awareness-tier):** TDSD-6583 Done (companion to TDSD-6627); TDSD-6616, TDSD-6644 indeterminate (VCX/ACT workstream, Chijioke Achieme); TDSD-6605 VISA ADREF File Done; TDSD-6607 VCX tool update Done; TDSD-6628 TPP Documentation for SRE Handover Done; TDSD-6633 Keystone Settlement Done (was Initial Review prior tick; confirms Keystone situation trajectory); TDSD-6638 Merchant Settlement disparity account 0000221603 still new; TDSD-6642 Backlog of pending disbursement indeterminate; TDSD-6612 SETTLEMENT PAYOUT indeterminate; TDSD-6010 2ND STREAM OF SETTLEMENT ISSUES indeterminate; ADD-4573 Done, ADD-4461 Done, ADD-3972 indeterminate; TCDD-1106 Habari Pay OTP Challenge indeterminate (QA rework cycle continues); ATPP-1647/ATPP-1608/ATPP-1603 indeterminate; TDSD-6571 "Resync | RC91 | 20260414" Done.

**Out-of-scope carryforward (via Layer 1 email):**
- **TISD-480** ArgoCD CVE remediation — no further updates this tick. Still Awaiting Control Approval. Briefing-tier Decision candidate for Apr 21 briefing.
- **TDSD-6203** Request for Change of ISO Managers — no new update. Briefing-tier Decision candidate for Apr 21 briefing.

No Immediate-tier dispatches this tick. New situation (Monnify Settlements TDSD-6645) warrants next-tick monitoring.

### Tick 2026-04-22 ~14:15 WAT — Full-level (consolidation)

Morning briefing-2026-04-22 did not advance `last_processed` (catch-up briefing compose reached from Slack-first path; Jira catch-up sweep hit oversize-payload failure before completing — see JQL payload-size discipline above). This tick consolidates by querying narrower scopes.

**TDSD-6645 — 45h+ assignee silence, 2 unanswered chase pings, status moved to Awaiting Scheme Update.**
- Dominic Usiabulu silent since 16:53 WAT Apr 20 acknowledgement ("reviewing"). No comments, no status progress attributable to him.
- Reporter [[Blessing Obioha]] chase pings: Apr 21 15:02 WAT, Apr 22 12:10 WAT — both unanswered.
- Status now **Awaiting Scheme Update** (consistent with Dominic having punted upstream to scheme/NIBSS and stopping internal comms).
- **Pattern anomaly:** TDSD-6655 and TDSD-6661 — both titled "Urgent Pending Settlement – System Failure", both assigned [[Opeyemi]], both closed same-day. TDSD-6645 (VA-reversal scope, assigned Dominic) stalls. Two variables differ (scope AND assignee); insufficient data to isolate causal variable. Signal strong enough to carry forward.
- **No Immediate dispatch this tick** — 3 existing Immediate items (Polaris/UBA/CoralPay) already batched in briefing-2026-04-22 B1 awaiting user dispatch; adding 4th dilutes.
- **Carry forward as Decision candidate for briefing-2026-04-23** if still Awaiting Scheme Update with no Dominic response at compose time.
- [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation updated with delta.
- Factors: source=jira, priority=highest, assignee_silent_45h, reporter_chase_2x_unanswered, pattern_anomaly_vs_TDSD-6655+6661, no_immediate_dispatch_due_to_batch_discipline, carry_forward.

**TDSD-6655 + TDSD-6661 — Urgent Pending Settlement System Failure variants, both Done same-day.**
- Both assigned [[Opeyemi]]. Same-day close pattern. Reference points for the TDSD-6645 pattern anomaly analysis above.
- Awareness-tier themselves (resolved in-window); elevated contextual weight via their role in the TDSD-6645 comparison.

**TDSD-6630 NIBSS Direct Debit — silence past 53h.** No new update this tick. Comment silence ~56h48m (from 05:27 WAT Apr 20), any-update silence ~53h57m (from 08:18 WAT Apr 20). Still Work in progress. User-deferral through briefing-2026-04-22 holds — no Immediate re-dispatch. Retirement decision deferred to briefing-2026-04-23 pending 15:11 WAT Apr 22 NIBSS customer-facing retraction signal clarity (see NIBSS DD situation page).

**Out-of-scope carryforward (via Layer 1 email):** TISD-480 + TDSD-6203 — no new updates this tick. Both still Briefing-tier Decision candidates for next briefing.

No Immediate-tier dispatches this tick. Consolidation tick — no new situations spawned.

### Tick 2026-04-22 ~16:15 WAT — Full-level (narrowly-scoped delta sweep)

Window: 14:15 → 16:15 WAT (2h delta since prior tick). Current time 16:10 WAT = 15:10 UTC.

Queried `project = TDSD AND updated >= "2026-04-22 14:15"` (WAT-local per site timezone) — returned 10 tickets. Filtered to items updated after 14:15 UTC (= 15:15 WAT, the true delta window) for this-tick signals; remaining items were already in prior tick's scope.

**New-this-tick deltas (4 items):**

- **TDSD-6687 "DISBURSEMENT DOWNTIME (NIP) 20260422"** — Frances Omelu, Medium, filed and Completed fast-cycle (Completion stamp 16:06 WAT). NIP Disbursement family (companion to TDSD-6627 / TDSD-6583); **distinct product** from TDSD-6630 NIBSS DD mandate. Fast close, no Immediate dispatch. Awareness-tier. Factors: source=jira, product=nip_disbursement, fast_cycle_close, family_pattern_cont, no_cto_action.
- **TDSD-6689 "Stanbic bank Participant settlement for 8AM failed"** — David Oseji, Medium, Work in progress (15:21 WAT). **New Stanbic failure mode** — Participant settlement at 8AM scheduled settlement window, not RC91-at-switch. No existing situation covers scheduled-settlement-window failures on Stanbic. Early cycle, no action path yet; WIP status so assignee is engaged. **Watch next tick** — if unresolved or compounds into pattern, spawn situation. Factors: source=jira, priority=medium, ticket_new, stanbic_new_failure_mode, wip_assignee_engaged, watch_next_tick.
- **TDSD-6562 "Deploy RESYNC and MPGS Sink STAN/RRN Propagation"** — Saheed Yusuf, Medium, status Implementing (15:25 WAT). Progress on the Apr 21 23:00 WAT Aptent Services deployment captured in briefing-2026-04-22 A5 — the deployment was reported successful via Slack reaction/reply, but the Jira ticket remained in Implementing until 15:25 WAT. Normal follow-through. Awareness-tier. Factors: source=jira, deployment_continuation, awareness_carryforward.
- **(No other TDSD deltas updated after 14:15 UTC)** — remaining items returned by the WAT-local query (TDSD-6688, TDSD-6671, TDSD-6683, TDSD-6686, TDSD-6685, TDSD-6544, TDSD-6673) were all updated in the 13:22–14:13 UTC window, BEFORE the 14:15 UTC last_processed cutoff. They are covered by the 14:15 WAT tick's scope — not this-tick deltas.

**Pre-window items surfaced in this tick's WAT-local query that the 14:15 WAT tick missed** (still relevant to carry):
- **TDSD-6688 "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER(22042026)"** — Dominic-assigned, status Awaiting Scheme Update (updated 15:13 WAT = 14:13 UTC, 2 minutes before last_processed). Second Dominic-owned ticket in Awaiting Scheme Update this week — surfaced into [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation delta as "Dominic-is-active-just-silent-on-TDSD-6645" reframe of the pattern anomaly.
- **TDSD-6671 "UBA Transactions failure RC 96"** — Olamide Ajibulu-assigned, Completed at 15:03 WAT = 14:03 UTC. **Potentially corresponds to briefing-2026-04-22 B1 UBA Bank RC96 Slack item** (msg ts 1776765124.841669) — name match but no direct Slack-to-Jira cross-link visible. Cannot assert identity from names alone. Flag for next briefing: B1's UBA RC96 framing may be stale; surface to user at triage.
- **TDSD-6683 "PENDING CREATE MANDATE REQUEST"** — Frances-assigned, Completed at 15:01 WAT = 14:01 UTC. Formal Jira closure of the Apr 22 NIBSS DD P2 cycle captured in briefing-2026-04-22 B4 (Slack-resolved 13:05 WAT). Surfaced into [[NIBSS DD — Downtime P1 Apr 20]] situation delta.
- **TDSD-6686 "NIBSS SYSTEM GLITCH"** — Olamide Ajibulu-assigned, Completed at 14:48 WAT = 13:48 UTC. Housekeeping closure; no NIBSS DD mandate product bearing.
- **TDSD-6685 "PAYSTACK BALANCE ADJUSTMENT APRIL 22ND 2026"** — Daniel Fetuga-assigned, Resolved at 14:32 WAT = 13:32 UTC. Awareness; routine adjustment.
- **TDSD-6544 "Stanbic | RC91 | 20260414"** — unassigned, Resolved at 14:26 WAT = 13:26 UTC. Retrospective closure of old Apr 14 Stanbic RC91 cycle — not a new cycle, just closing out a long-open ticket. No situation bearing (Stanbic RC91 pattern situation is current; this is historical).
- **TDSD-6673 "NIBSS VPN flap 20260421"** — Olamide Ajibulu-assigned, Completed at 14:22 WAT = 13:22 UTC. Housekeeping closure of Apr 21 incident already captured in briefing-2026-04-22 A2.

**Timezone-discipline lesson.** The WAT-local `updated >= "2026-04-22 14:15"` query intentionally spans back to 15:15 WAT in prior-tick territory because the 14:15 UTC stamp on last_processed equates to 15:15 WAT — the widened window surfaced items the prior tick missed in its own timezone handling. Codified as JQL date-filter-timezone discipline directive above.

**TDSD-6630 NIBSS Direct Debit — still no movement.** Comment silence ~58h48m, any-update silence ~55h57m. No delta this tick. Situation page updated with retirement-bar-rising framing (see NIBSS DD situation).

**TDSD-6645 — still Awaiting Scheme Update, Dominic still silent on this ticket.** But TDSD-6688 shows Dominic is active elsewhere and uses same stall status — workflow-discipline reframe added to situation page. Carry-forward to briefing-2026-04-23 remains the plan.

**Out-of-scope carryforward (Layer 1 email dependent — Gmail MCP dark):** TISD-480 + TDSD-6203 — can't re-verify without Gmail. Brain state reflects prior carryforward.

No Immediate-tier dispatches this tick. No new situations spawned. TDSD-6689 (Stanbic Participant settlement) on next-tick watchlist — spawn situation if unresolved or pattern compounds.

### Tick 2026-04-22 ~17:09 WAT — Full-level (narrowly-scoped delta sweep)

Window: 16:15 → 17:09 WAT (~54min delta since prior tick). Current time 17:09 WAT = 16:09 UTC.

Queried `project = TDSD AND updated >= "2026-04-22 16:15"` (WAT-local per JQL timezone discipline above). Applied post-filter on assistant side to confirm only items updated after 15:15 UTC (= 16:15 WAT, the true delta window).

**New-this-tick deltas (4 items):**

- **TDSD-6690 — Change, Ekene-assigned, Completed.** Change-ticket family; Completion this tick. Awareness-tier. No active-situation entity overlap, no P1/outage markers. Factors: source=jira, ticket_type=change, fast_cycle_close, no_cto_action.
- **TDSD-6662 — Opeyemi-assigned Settlement ticket, Done this tick.** Third Opeyemi-same-day-close data point in the Urgent-Pending-Settlement family alongside TDSD-6655 and TDSD-6661. Strengthens the assignee-variable side of the TDSD-6645 pattern anomaly (3:1 Opeyemi-closes vs. Dominic-stall). Surfaced into [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation delta — carry-forward ask for briefing-2026-04-23 now reframed with two angles: workflow-discipline (from TDSD-6688) + assignee-pattern strengthening (from TDSD-6662). Factors: source=jira, same_day_close, opeyemi_assignee, pattern_anomaly_strengthening, cross_reference_TDSD-6645_situation.
- **TDSD-6615 "Keystone Settlement pending #20260119" — Completed at 16:31 WAT.** Historical pending-settlement ticket (filed Jan 19, surfaced into INITIAL REVIEW on Apr 20 09:54 WAT) now formally closed. Combined with backfilled confirmation of TDSD-6633 Done from 17:09 WAT Apr 20 tick, both current-cycle and historical-cycle Keystone settlement tickets are now closed. Updated [[Keystone Bank — Settlement Requery Apr 20]] situation — **retirement candidate at briefing-2026-04-23 compose** unless new Keystone settlement-layer cycle surfaces. Factors: source=jira, historical_ticket_closure, broader_review_cadence_confirmed, keystone_situation_retirement_candidate.
- **TDSD-5584 — Cancelled.** Administrative cancellation; no active-situation entity overlap, no P1/outage markers. Awareness-tier. Factors: source=jira, ticket_cancelled, administrative, no_cto_action.

**TDSD-6630 NIBSS Direct Debit — still no movement.** Comment silence ~59h42m, any-update silence ~56h51m. No delta this tick. Situation page updated with retirement-posture-reverted-to-hold framing (see NIBSS DD situation — the 16:44 WAT #monieworld-monnify customer-facing disbursement announcement reversed the prior tick's retirement trajectory).

**TDSD-6645 — unchanged this tick.** Still Awaiting Scheme Update, Dominic still silent on this ticket (assignee silence ~48h16m since 16:53 WAT Apr 20 acknowledgement). TDSD-6662 (new data point above) strengthens carry-forward ask.

**TDSD-6689 (watchlist from prior tick) — no delta this tick.** Stanbic Participant settlement 8AM failure still WIP; assignee-engaged state holds. Watch continues next tick.

**Out-of-scope carryforward (Layer 1 email dependent — Gmail MCP dark):** TISD-480 + TDSD-6203 — still unverifiable without Gmail. Brain state unchanged.

No Immediate-tier dispatches this tick. No new situations spawned. Situation updates: NIBSS DD (retirement reverted), Keystone (retirement candidate), Monnify TDSD-6645 (assignee-pattern strengthened).

### Tick 2026-04-22 ~18:09 WAT — Skim-level (narrow WAT-local delta sweep, TDSD scope only)

Window: 17:09 → 18:09 WAT (~1h delta since prior tick). Current time 18:09 WAT = 17:09 UTC. Per Step 0 `level=skim`, restricted to TDSD scope (service desk where operational P1s land) rather than all 18 projects.

Queried `project = TDSD AND updated >= "2026-04-22 17:09"` (WAT-local per JQL timezone discipline). Result: `isLast: true`, 1 ticket returned.

**New-this-tick delta (1 item):**

- **TDSD-6691 "Deploy OTP Resend, SmartDet NSS Account Fix & API Settlement Agent for Polaris Outward Flows"** — reporter [[June Johnson]], assignee [[Saheed Yusuf]], **High priority**, Status **Review** (New → Review, transitioned 17:38 WAT), created 17:33 WAT. Component: Switch.
  - **Description (3 bundled changes):**
    1. OTP Resend on Backoffice — enables backoffice users to resend OTPs during authentication/transaction verification; reduces support overhead from expired or undelivered OTPs.
    2. SmartDet NSS Account Fix — resolves incorrect processing/routing on SmartDet NSS account configuration.
    3. **API Settlement Agent for all outward flows from Polaris (Settlement Bank)** — transitions outward settlement from Polaris (Settlement Bank) to the API Settlement Agent; standardises outward disbursement processing.
  - **Relevance analysis:**
    - Assignee Saheed Yusuf is the same person who drove the Apr 21 23:00 WAT Aptent Services deployment (TDSD-6562 MPGS Sink). Continues the Switch-layer deploy cadence.
    - [[Polaris Bank]] is one of the 3 bank-side P1s in briefing-2026-04-22 B1 batch (Polaris RC91 inbound routing, 33h+ active at this tick). **BUT TDSD-6691 targets *outward* settlement flows from Polaris, which is a different direction** than the inbound RC91 routing P1. The API Settlement Agent transition is a standardisation/rework deploy, not an RC91 remediation. No direct causal link to the B1 Polaris RC91 thread.
    - Standard change-management path (Review status = pre-deploy approval gate). No Immediate-tier markers.
  - **Classification:** Awareness-tier. High priority but standard change path, multi-change bundle, not an incident response.
  - **Factors:** source=jira, priority=high, ticket_new, ticket_type=change_deploy, component=switch, active_situation_match=polaris_bank_outward_scope, no_direct_link_to_b1_polaris_rc91_inbound, awareness_tier, no_cto_action.

**TDSD-6630 NIBSS Direct Debit — still no movement.** Comment silence ~60h42m, any-update silence ~57h51m. No delta this tick. Situation page [[NIBSS DD — Downtime P1 Apr 20]] updated from Slack-side signal (18:07 WAT thread third-event on NIBSS PTSA) — see source-config-slack Notes.

**TDSD-6645 — unchanged this tick.** Still Awaiting Scheme Update, Dominic still silent (assignee silence ~49h16m since 16:53 WAT Apr 20). No delta.

**TDSD-6689 (watchlist from prior ticks) — no delta this tick.** Stanbic Participant settlement 8AM failure still WIP from 16:15 WAT tick; assignee-engaged state holds. Watch continues next tick.

**Out-of-scope carryforward (Layer 1 email dependent — Gmail MCP dark):** TISD-480 + TDSD-6203 — still unverifiable without Gmail. Brain state unchanged.

**Scope caveat (skim).** Only TDSD queried this tick; the 17 software projects not checked. Skim-level allowance per config-heartbeat-prompt Perceive Step 0. Next Full tick should re-extend to the 18-project scope (iterated per JQL payload-size discipline).

No Immediate-tier dispatches this tick. No new situations spawned.

### Tick 2026-04-22 ~20:00 WAT — Skim-level (narrow WAT-local delta sweep, TDSD scope only)

Window: 18:09 → 20:00 WAT (~1h51min delta since prior tick). Current time 20:00 WAT = 19:00 UTC. Per Step 0 `level=skim`, restricted to TDSD scope.

Queried `project = TDSD AND updated >= "2026-04-22 19:09"` (WAT-local per JQL timezone discipline — equivalent to 18:09 UTC = 19:09 WAT, the true delta window). Post-filtered on assistant side.

**New-this-tick deltas (2 items):**

- **TDSD-6676 "Exposure on Access Bank"** — Work in progress. Adds new tracking point on the [[Access Bank]] workstream. Access Bank is entity-matched to [[Access Bank — Multi-Track Failures]] situation which has tracked RC91 + settlement + multi-mode failure patterns through this week. Ticket title "Exposure on" framing suggests a risk-assessment or exposure-quantification angle rather than an active outage remediation — no P1/outage markers visible. **Uncertain whether this corresponds to an existing Access Bank situation delta or a new tracked condition** — title language ambiguous, assignee details require next-tick confirmation. Classification: Awareness-tier, WIP tracked. Watch next tick for scope clarification before spawning or updating situation. Factors: source=jira, ticket_new, entity_match_access_bank, scope_ambiguous, wip_assignee_engaged, watch_next_tick_for_disambiguation.
- **TDSD-5365 "Monnify Dev Doc Deploy"** — Completed. Dev documentation deploy for Monnify; routine completion. No operational P1, no active-situation entity overlap beyond the generic Monnify surface. Awareness-tier. Factors: source=jira, deploy_type=dev_doc, completed, routine, no_cto_action.

**TDSD-6691 (from 18:09 WAT tick) — unchanged this tick.** Still in Review status; no new transitions or comments. Pre-deploy approval gate holds.

**TDSD-6630 NIBSS Direct Debit — still no movement.** Comment silence ~62h32m, any-update silence ~59h41m. No delta this tick. Situation page [[NIBSS DD — Downtime P1 Apr 20]] will receive 20:00 WAT delta this tick to integrate the new [[NIBSS PTSA — VPN Flapping Apr 22]] situation cross-link and the DTS-mitigation stabilization signal from Slack.

**TDSD-6645 — unchanged this tick.** Still Awaiting Scheme Update, Dominic still silent (assignee silence ~51h07m since 16:53 WAT Apr 20). No delta.

**TDSD-6689 (watchlist from prior ticks) — no delta this tick.** Stanbic Participant settlement 8AM failure still WIP from 16:15 WAT tick. Now ~4h45m since file; watch continues. If still unresolved at briefing-2026-04-23 compose, candidate for briefing Decision item.

**Out-of-scope carryforward (Layer 1 email dependent — Gmail MCP dark):** TISD-480 + TDSD-6203 — still unverifiable without Gmail. Brain state unchanged.

**Scope caveat (skim).** Only TDSD queried this tick; 17 software projects not checked. Next Full tick should re-extend to 18-project scope.

No Immediate-tier dispatches this tick. No new situations spawned (TDSD-6676 watch-next-tick holds; spawn deferred pending scope clarification).

### Tick 2026-04-22 ~22:10 WAT — Skim-level (early-exit: zero TDSD deltas)

Window: 20:00 → 22:10 WAT (~2h10min; 19:00 → 21:00 UTC). Per Step 0 `level=skim`, restricted to TDSD scope.

Queried `project = TDSD AND updated >= "2026-04-22 20:00"` (WAT-local per JQL timezone discipline — equivalent to 19:00 UTC = 20:00 WAT, the true delta window). Result: `isLast: true`, **zero issues** returned. Complete TDSD quiet since 20:00 WAT — the 17:09 → 20:00 WAT window's TDSD-6676 (Exposure on Access Bank WIP) and TDSD-5365 (Monnify Dev Doc Deploy Completed) were the last Jira deltas of the day so far.

**Carryforward state (no changes this tick):**
- **TDSD-6630 NIBSS DD** — comment silence now ~63h42m, any-update silence ~60h41m. Still WIP. User-deferred. No brain-side re-dispatch.
- **TDSD-6645** — still Awaiting Scheme Update. Dominic assignee silence now ~53h16m since acknowledgement. No delta this tick. Carry-forward to briefing-2026-04-23 Decision item candidate holds.
- **TDSD-6689 (Stanbic Participant 8AM settlement)** — still WIP; watchlist since 16:15 WAT. Now ~6h45m since file. Assignee-engaged state holds. Briefing-2026-04-23 Decision candidate if unresolved at compose.
- **TDSD-6691 (Polaris outward-flows deploy)** — still in Review. Pre-deploy approval gate holds.
- **TDSD-6676 (Access Bank exposure)** — still WIP; scope-disambiguation watch continues. Awareness-tier only.

**Out-of-scope carryforward (Layer 1 email dependent — Gmail MCP dark):** TISD-480 + TDSD-6203 — still unverifiable without Gmail. Brain state unchanged. Gmail silence ~54h since last_processed — below 7-day absence-of-signal threshold.

**Scope caveat (skim).** Only TDSD queried this tick; 17 software projects not checked. Next Full tick should re-extend to 18-project scope.

**Dispatch decisions this tick:**
- Zero TDSD deltas → early-exit contribution from Jira source. Combined with Slack zero-deltas, the tick hit early-exit per config-heartbeat.
- Advanced `last_processed` to 2026-04-22T21:00:00Z for audit trail continuity.
- No Immediate dispatches. No situation spawns. No situation updates.

### Tick 2026-04-23 ~06:10 WAT — Full briefing-tick sweep (overnight window; 18-project scope)

Window: 22:10 WAT Apr 22 → 06:10 WAT Apr 23 (~8h; 21:00 UTC Apr 22 → 05:10 UTC Apr 23). Step 0 declared `level=full, rationale=briefing-tick` — first tick after 06:00 WAT with no existing briefing-2026-04-23 page. Full 18-project scope re-extended per skim-scope-caveat carryforward from prior ticks; iterated per JQL payload-size discipline.

**Critical overnight delta — TDSD-6645 Dominic broke 59h15m silence.**
- **04:08 WAT Apr 23 Dominic Usiabulu comment on TDSD-6645:** "MIT|HYD|100004250509160823132420308489|1920873578377506816_CREDIT_0_RVSL was triggered by the inwards payments team, we will their review to understand why the reversal was triggered even though we have settled the merchant."
- **Status transition: Awaiting Scheme Update → Escalated** (04:08 WAT Apr 23).
- **Attribution mechanism:** Dominic identifies that the credit-debit-reversal that insufficient-funded the VA was triggered by a different Moniepoint internal team (inwards payments), not by scheme/NIBSS. This reframes the 3-day investigation — the assignee silence was NOT scheme-upstream blocked, it was internal-team cross-reference blocked. The original hypothesis ("punted upstream to scheme/NIBSS and stopped internal comms") is partially contradicted: Dominic was waiting on information from an internal team, not the scheme.
- **Implication for pattern anomaly:** The workflow-discipline framing (TDSD-6688 / TDSD-6662 comparison) partially re-validates — Dominic's Awaiting Scheme Update usage across both TDSD-6645 and TDSD-6688 may have been imprecise; the actual dependency on TDSD-6645 was the inwards payments team, not the scheme. But more fundamentally: Dominic now punts the investigation to that team without clear ownership transfer — classic hot-potato handoff pattern. The settlement-blocking problem is unresolved; the root cause is still unknown; accountability is now diluted.
- **Options for user triage** (surfaced in briefing-2026-04-23 D1):
  (a) Accept the handoff as progress (TDSD-6645 is no longer Dominic's investigation) — close out the 3-day friction, let inwards payments team work it
  (b) Chase via [[Oladapo]] — surface the attribution-transfer pattern as a workflow-discipline issue needing CTO-level reinforcement (ownership hot-potatoing across internal teams, not just upstream)
  (c) Direct-ask Dominic — require clear handoff documentation (who is now responsible, what's the timeline, what's the communication path) before closing out Dominic's involvement
- [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation updated with Apr 23 06:10 WAT delta capturing the attribution-transfer + status transition + three-option framing.
- Factors: source=jira, priority=highest, silence_broken_59h15m, status_transitioned_escalated, attribution_transfer_to_inwards_payments_team, reframes_pattern_anomaly, three_option_user_ask, briefing_d1_tier.

**Critical overnight absence — TDSD-6630 NIBSS DD zero movement.**
- Comment silence now **~72h43m** (from 05:27 WAT Apr 20 — last comment from [[Oladapo Olusola]]).
- Any-update silence **~69h52m** (from 08:18 WAT Apr 20).
- **23h past the Apr 14 NIBSS DD 47h implicit-retire precedent.** New high watermark on NIBSS DD silent-unresolved duration.
- Both prior-tick hypotheses (retirement posture reverted via 16:44 WAT Apr 22 customer-facing signal; connectivity-layer blocked via NIBSS PTSA thread) can be tested against the overnight leased-line-stability evidence: NIBSS PTSA thread closed at 18:40 WAT Apr 22 ("Issue resolved"), leased-line stable 10h47m+ through the overnight window, TDSD-6630 still silent. **Connectivity-layer hypothesis ruled out** — if the silence were blocked on NIBSS PTSA connectivity, TDSD-6630 should have seen movement once PTSA stabilized. The silence is ticket-specific (owner / workstream / scheme-side), not network-infrastructure-blocked.
- **Options for user triage** (surfaced in briefing-2026-04-23 D2):
  (a) Retire the situation per bias-toward-retiring principle (past 48h precedent, no signal, connectivity-layer ruled out — the situation is holding no live information)
  (b) Hold 24h — wait for the 05:27 WAT Apr 23 comment-silence checkpoint (that's in ~23h) before retiring
  (c) Re-dispatch via [[Oladapo]] — send escalation chase to the CTO given 72h+ silence on a Highest-priority ticket is operationally abnormal
- [[NIBSS DD — Downtime P1 Apr 20]] situation updated with Apr 23 06:10 WAT delta capturing connectivity-layer rule-out + three-option framing.
- Factors: source=jira, priority=highest, comment_silence_72h43m, beyond_apr_14_precedent, connectivity_layer_ruled_out, retirement_candidate_via_bias_principle, three_option_user_ask, briefing_d2_tier.

**New-this-tick delta — TDSD-6684 "Multiple MIT transactions pending for over 2 weeks".**
- Filed 03:51 WAT Apr 23 by [[Blessing Obioha]] (Moniepoint); assignee [[Dominic Usiabulu]]; component Monnify_settlements; priority Highest.
- **Third Blessing→Dominic escalation in 3 days** (Apr 20 TDSD-6645, Apr 21 chase, Apr 23 TDSD-6684). Strengthens the workflow-discipline observation captured in the TDSD-6645 situation.
- Substance: pending MIT transactions aged 2+ weeks — a broader cohort of the same root pattern that TDSD-6645 represents.
- **Classification:** Awareness-tier for briefing-2026-04-23 A2 (the D1 TDSD-6645 carries the operational ask; TDSD-6684 is adjacent evidence of pattern accumulation, not a new decision item). Blessing has clearly escalated this to ticket-based accumulation to force visibility on Dominic's queue.
- [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] situation updated to add TDSD-6684 as 3rd data point to workflow-discipline observation.
- Factors: source=jira, priority=highest, ticket_new, filer=blessing, assignee=dominic, third_blessing_to_dominic_escalation_in_3_days, pattern_accumulation, awareness_tier, briefing_a2_tier.

**Housekeeping closures in window (Awareness-tier, no separate briefing placement):**
- **TDSD-6638 "Merchant Settlement disparity account 0000221603"** — Completed at 02:55 WAT Apr 23 (filed Apr 20; was carrying as "still new" from Apr 20 17:09 WAT tick). Resolution closed ~3-day pending disparity investigation. No situation bearing beyond closing a carryforward item.
- No other overnight TDSD deltas.

**Software projects re-extended this tick (17 projects):**
- No operational deltas of Briefing-tier or higher priority. Routine dev/QA transitions across ATPG, ATPP, AS, ADD, TCDD — all Awareness-tier with no active-situation entity overlap worth individual callout.

**Carryforward state (no changes this tick):**
- **TDSD-6689 (Stanbic Participant 8AM settlement)** — still WIP (watchlist since 16:15 WAT Apr 22; now ~14h45m). Assignee-engaged state holds, no closing status transition overnight. Awareness-tier.
- **TDSD-6691 (Polaris outward-flows deploy)** — still in Review status. Pre-deploy approval gate holds into Apr 23. No change.
- **TDSD-6676 (Access Bank exposure)** — still WIP; scope-disambiguation watch continues. Awareness-tier.

**Out-of-scope carryforward (Layer 1 email dependent — Gmail MCP dark):** TISD-480 + TDSD-6203 — still unverifiable without Gmail. Gmail silence now ~61h since last_processed 2026-04-20T16:09:00Z (still below 7-day absence-of-signal threshold; carryforward as B2 blocker holds via briefing-2026-04-23 D4).

**Dispatch decisions this tick:**
- No Immediate-tier dispatches — the TDSD-6645 attribution-transfer is D1 three-option user ask (not an autonomous escalation), TDSD-6630 retirement is D2 three-option user ask (not autonomous retirement — too-consequential for bias-toward-retiring without user input on a 72h+ Highest ticket), TDSD-6684 is A2 awareness only.
- Briefing-2026-04-23 composed + created via MCP.
- briefing-2026-04-22 superseded via MCP.
- Situation pages updated: TDSD-6645 (attribution-transfer + status transition + TDSD-6684 as 3rd data point), TDSD-6630 (overnight-silence + connectivity-layer rule-out), NIBSS PTSA (10h47m stable confirmation from Slack-side), Keystone (retired per pre-committed criterion — zero Keystone signals overnight).

**Advanced `last_processed` to 2026-04-23T05:10:00Z** for audit trail continuity.
