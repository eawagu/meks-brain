---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-22T15:15:00Z. 16:15 WAT Full tick (narrow scope): 3 new-this-tick deltas — TDSD-6687 NIP Disbursement Downtime filed+Completed fast-cycle, TDSD-6689 Stanbic 8AM Participant settlement WIP (new failure mode, watchlist), TDSD-6562 Deploy RESYNC Implementing (A5 carryforward). Items updated in 13:22–14:13 UTC window (TDSD-6688 Dominic, TDSD-6671 UBA RC96 Completed, TDSD-6683 Apr 22 P2 Completed, TDSD-6686/6685/6544/6673 housekeeping) were pre-cutoff but surfaced into Monnify TDSD-6645 + NIBSS DD situations this tick — exposed a JQL-timezone handling discipline codified into directives. TDSD-6630 still no movement; retirement bar rising. TDSD-6645 unchanged; TDSD-6688 reframes pattern to workflow-discipline."
updated: 2026-04-22
cssclasses:
  - "source-config"
last_processed: "2026-04-22T15:15:00Z"
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
