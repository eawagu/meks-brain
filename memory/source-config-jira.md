---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-22T14:15:00Z. 14:15 WAT Full tick: TDSD-6645 status moved to Awaiting Scheme Update, Dominic silent 45h+, Blessing 2 chase pings unanswered — pattern anomaly vs. TDSD-6655/TDSD-6661 (both Opeyemi-assigned 'System Failure' variants closed same-day). TDSD-6630 NIBSS DD silence continues past 53h (user-deferred, no re-dispatch). Morning briefing-2026-04-22 did not advance last_processed; this tick consolidates."
updated: "2026-04-22T14:24:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-22T14:15:00Z"
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
