---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T10:09:00Z. 11:09 WAT Apr 23 Full tick (weekday work-hours; active Ecobank situation): 48 in-window items (payload oversize 3rd-consecutive tick — Agent-delegated summary per directive). Operational: **TDSD-6696 Intermittent RC06 on Verve TTP Work in Progress** (Olamide assignee, new operational signal — first RC06 Verve surface this week). **TDSD-6506 Firewall Emergency Upgrade Implementing** (distinct from retired Rack Centre — new emergency). TDSD-5900 Settlement Reliability Completed. AS-4854 DD Engine In Progress. Named watchlist: TDSD-6695 Waiting-for-Approval → Awaiting Scheme Update (approver identity still unknown), TDSD-6684/TDSD-6694 touched. Ruth Adetunji MDRS 34-item continuation batch. All Awareness-tier — accumulating for briefing-2026-04-24."
updated: "2026-04-23T10:22:43Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T10:09:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP)`. **Verified 3rd time 2026-04-23 10:09 WAT** — query `project in (TDSD, TCDD, ATPG, ADD, ...)` rejected with `'ADD' is a reserved JQL word. You must surround it in quotation marks`; subsequent retry without quoting `AS` rejected with same-class error `'AS' is a reserved JQL word`. Both must be quoted together.

**JQL payload-size discipline (added 2026-04-22 14:15 WAT after oversize return).** Full 18-project `searchJiraIssuesUsingJql` returned 56,914 chars / 931 lines in a single call — exceeded practical context envelope. **Rule:** for tick sweeps with windows > 24h, query projects individually (iterate the scope list) or restrict by fields at source. Do not pull the union payload unconditionally. Applies to any tick with `updated > -24h` comparable window length. **Reinforced 2026-04-23 08:10 WAT:** 1h window at Full-tick still returned 64,872 chars on 15 items due to ADF-expanded descriptions/comments — probe Jira results via jq post-filter (structure: `{issues: [{...}]}`) rather than reading raw MCP output when result > ~30KB. **Re-reinforced 2026-04-23 09:11 WAT:** 1h Full-tick now returned 166,691 chars / 2,939 lines on 50 items (maxResults=50) with isLast=False — bulk grooming batches (AS Zone Switching Partnership project plan create + ATPP MDRS backend epic create) accumulated at weekday work-hours opener. **Re-re-reinforced 2026-04-23 10:09 WAT:** 1h Full-tick returned 199,382 chars / 3,181 lines on 61 items — exceeded MCP output cap; tool auto-saved to disk and instructed subagent delegation. **Re-re-re-reinforced 2026-04-23 11:09 WAT:** 1h Full-tick returned 196,192 chars / 3,141 lines on 48 items — 3rd consecutive tick exceeding MCP output cap. **Rule update — promoted from exception to default:** for weekday work-hours ticks (08:00-18:00 WAT) the default extraction path MUST be `Agent`-delegated file-chunk reads (not raw output consumption), because bulk grooming batches are persistent — saw 48-61 items in three consecutive tick windows. maxResults=50 is not sufficient for these windows either; raise to 100 or accept isLast=False. `markdown` response format (vs ADF) reduces payload per item but does not eliminate oversize at 48+ item windows.

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

### Tick 2026-04-22 (condensed — full details in git history)

Six Apr 22 ticks across 14:15, 16:15, 17:09, 18:09, 20:00, 22:10 WAT. Key accumulations: TDSD-6645 stall pattern (45h+ assignee silence), TDSD-6655/6661/6662 Opeyemi same-day-close comparisons (3:1 vs Dominic stall), TDSD-6688 Dominic-Awaiting-Scheme-Update workflow compound, TDSD-6630 carry across all 6 ticks (no movement), Keystone retirement candidate, TDSD-6691 Polaris outward-flows deploy awareness, TDSD-6676 Access Bank exposure. 22:10 WAT early-exit advanced last_processed to 2026-04-22T21:00:00Z.

### Tick 2026-04-23 (condensed for 06:10 briefing + 07:10 skim + 08:10 full)

**06:10 WAT briefing-tick Full** — Critical overnight delta: TDSD-6645 Dominic broke 59h15m silence at 04:08 WAT with attribution-transfer to inwards payments team; status Escalated. TDSD-6630 72h43m silent (23h past Apr 14 47h precedent; D2 retire-or-hold ask). TDSD-6684 new Blessing→Dominic filing (3rd in 3 days). TDSD-6638 closed. briefing-2026-04-23 D1/D2 surfaced.

**07:10 WAT Skim** — TDSD-6692 UBA "Failing generally" 6-min fast-cycle (Daniel self-filed+closed with bank-attributed database-connectivity RCA). Cross-source asymmetry 1st observation (Jira-only, no Slack mirror). Advanced last_processed to 2026-04-23T06:10:00Z.

**08:10 WAT Full** — 3 deltas: TDSD-6675 Opeyemi-closed PENDING SETTLEMENT (4th this week; adjacent-pattern awareness only, NOT applied to TDSD-6645 situation due to different template/reporter); TDSD-6592 Kafka Monnify long-tail close; AS-* bulk grooming 12 items (Zone Switching Partnership). Payload discipline reinforced (64KB on 15 items). Advanced last_processed to 2026-04-23T07:10:00Z.

### Tick 2026-04-23 ~09:11 WAT — Full (condensed)

50-item result (maxResults=50, isLast=False — additional page available), 166,691 chars / 2,939 lines — payload discipline first re-reinforcement. TDSD-6693 new PENDING SETTLEMENT WIP; ADD-4587 Direct Debit Bug Tracking new; ADD-4584 CRLF vulnerability Done; ADD-4589 Moniepoint ACS Details in DS new; ADD-3434 Zone Switching Partnership simulation In Progress. Bulk grooming: AS Zone Switching Partnership 30+ items, ATPP MDRS backend epic 12 items. All Awareness. TDSD-6645/TDSD-6630 silent. Asymmetry 2nd observation opened (later reclassified to sequencing lag). Advanced last_processed to 2026-04-23T08:10:00Z.

### Tick 2026-04-23 ~10:09 WAT — Full (condensed)

61-item result 199,382 chars / 3,181 lines — payload discipline 2nd re-reinforcement; Agent-delegated file-chunk summary per directive. TDSD-6694 Paystack Balance Adjustment NEW (Christine→Daniel Fetuga, Awaiting Scheme Update) — 1:1 correlates with 09:29 WAT Slack treasury message. **TDSD-6695 Temporary Public Access for Account Switch Reports (Stopgap) NEW at 10:10 WAT — MEDIUM security, Waiting for Approval, Ekene→Tolu Aina, approver unnamed in description.** Settlement reliability closures batch (TDSD-5900/6219/5119 Completed). Dev status transitions (TDSD-5240/5279/6382/6546/ADD-4254). MDRS backend sprint planning continuation. Cross-source asymmetry status: Ecobank reclassified to sequencing lag (27-min Slack P1 lag after email); TDSD-6692 UBA remains sole data point. Advanced last_processed to 2026-04-23T09:10:00Z.

### Tick 2026-04-23 ~11:09 WAT — Full (weekday work-hours; active Ecobank situation)

Window: 09:10 UTC → 10:09 UTC Apr 23 (~59 min; JQL `updated > "2026-04-23 10:10"` WAT-local per timezone-discipline). Step 0 declared `level=full, rationale=weekday-working-hours-active-ops`. briefing-2026-04-23 already exists — not a briefing tick.

**Payload oversize 3rd consecutive tick:** 48-item result, 196,192 chars / 3,141 lines — exceeded MCP output cap; tool auto-saved to disk and instructed Agent delegation. Directive updated above: weekday work-hours default extraction path MUST be Agent-delegated file-chunk reads (promoted from "strongly preferred" to "MUST default").

**Operationally relevant deltas (in-window):**

1. **TDSD-6696 "Intermittent RC 06 on verve TTP" → Work in progress** — Olamide Ajibulu assignee, Medium priority. **First RC06 Verve-TTP signal this week.** Verve is the Nigerian card scheme (NIBSS-owned); TTP = Third Party Transaction Processor. RC06 = "Error" generic code on card transactions. Distinct from the RC91 wave (Issuer/Switch Inoperative) and RC96 wave (System Malfunction) dominating the Apr 17-23 corpus. Not yet matching any active situation — would create a new one if pattern extends beyond 1 cycle. Awareness-tier for briefing-2026-04-24. Factors: source=jira, ticket_new_surface, keyword=RC06+Verve+TTP, assignee=Olamide_Ajibulu, priority=medium, status=Work_in_progress, no_active_situation_match_yet, awareness_tier.

2. **TDSD-6506 "Firewall Emergency Upgrade" → Implementing** — Medium priority, assignee unknown in summary. **Distinct from retired [[Rack Centre Edge Firewall — Approval Gate Mismatch]]** situation (that was the v4.2→v4.6→v4.4 Cisco-recommended revert scenario, closed on v4.4 stability). This is either a new firewall emergency upgrade OR a re-open of the historical TDSD-6506 number — the ticket number overlap is suspicious but the "Implementing" status transition implies forward motion. **Watchpoint:** if this is a new firewall emergency, it could affect connectivity to NIBSS (PTSA leased-line transition was just 16h stable; fresh firewall work risks re-introducing flapping). Awareness-tier with elevated watch; fetch full ticket metadata next tick to disambiguate. Factors: source=jira, ticket_status_transition, possible_retired_situation_reopen, connectivity_risk_adjacent_nibss_ptsa, watchpoint_fetch_next_tick.

3. **TDSD-5900 "Improve settlement reliability" → Completed** — David Oparanti assignee, Medium priority. Batch settlement-reliability closures continue (builds on 10:09 WAT tick's TDSD-5900/6219/5119 batch — this may be the same 5900 from that tick, or a final transition). Positive operational signal. Awareness-tier.

4. **AS-4854 "Configure Payable Account within InBank Deployed DD Engine" → In Progress** — Feyisayo Oyeniran assignee, Medium priority. DD Engine configuration work continues — adjacent to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] active situation but not a direct status-update on that. Awareness-tier.

5. **ADD-4254 "Enhance Bulk Settlement Narration Format" → QA - Testing** — Oluwadayo Osborne. Dev lifecycle progression, routine. Awareness.

**Named-ticket watchlist activity (in-window):**
- **TDSD-6684 "Pending Refund Transactions"** — update at 10:57 WAT. Status remains Awaiting Scheme Update (Dominic assignee). Update mechanism not disambiguated from summary projection (could be comment, field change, priority change, or internal transition timestamp). Continues the Dominic-Awaiting-Scheme-Update workflow pattern; no change in tier classification. Factors: source=jira, ticket_touched, situation_match=monnify-settlements, dominic_pattern_reinforcement, awareness_tier.
- **TDSD-6695 "Temporary Public Access for Account Switch Reports (Stopgap)"** — **status transitioned Waiting for Approval → Awaiting Scheme Update at 10:39 WAT.** Ekene Udodi reporter, Tolu Aina assignee. **Approver identity still not captured in summary projection.** Transition is ambiguous: could mean the approval gate fired (approved, moved to implementation queue) OR a different lifecycle step (rejected, pushed to scheme review, etc.). "Awaiting Scheme Update" status is typically for tickets waiting on external scheme/partner response — which is unusual for an internal CloudFront/S3 config change (unless it was routed through a platform-governance process that styles approvals as "scheme updates"). Medium-risk security stopgap. Awareness-tier with watch: if status transitions again next tick to a final state (Done/Implementing/Rejected), disambiguate then. Factors: source=jira, ticket_status_transition, security_adjacent, approver_still_unnamed, ambiguous_transition_semantics, awareness_tier.
- **TDSD-6694 "PAYSTACK BALANCE ADJUSTMENT APRIL 23RD 2026"** — update at 10:10 WAT. Status remains Awaiting Scheme Update (Daniel Fetuga assignee). Likely timestamp reflects ticket-creation settling or initial comment. Awareness; no tier change. Factors: source=jira, ticket_touched, family=paystack_balance_operations, awareness_tier.
- **Not touched in-window:** TDSD-6645, TDSD-6630, TDSD-6688, TDSD-6692, TDSD-6693, ADD-4587.

**Bulk grooming batch (Awareness):** Ruth Adetunji MDRS (Merchant Dispute Resolution System) continuation — additional ATPP-1624..ATPP-1708 ticket numbers filed this window (Multi-tenancy, RBAC, Mastercard API integration, claim lifecycle, queue processors, UI components). Mix of George Ijidola / Ejiro Asiuwhu / Olawale Ajala / Temitope Bamidele / Olatunbosun Olaosebikan assignees. Consistent with sprint planning cadence observed at 09:11 + 10:09 ticks.

**Cross-source asymmetry status unchanged** (still 1 data point: TDSD-6692 UBA Jira-only 06:44 WAT; tracking window expires 06:44 WAT Apr 24).

**No in-window approval-gate surface** — no items moved into Waiting for Approval or Authorize this window (only TDSD-6695 moved OUT of Waiting for Approval).

**Dispatch decisions:**
- No Immediate-tier Jira dispatch (all Medium priority, no P1/outage markers, no CTO-specificity triggers).
- All in-window Jira deltas Awareness-tier; accumulate for briefing-2026-04-24.
- **TDSD-6506 flagged for disambiguation** at next tick — fetch full metadata (priority, assignee, description, comments) to determine new-emergency vs. retired-situation-reopen.
- **TDSD-6695 status-transition ambiguity** noted; re-check next tick for final state.
- **TDSD-6696 RC06 Verve** noted as new operational surface — if second cycle surfaces within 7 days, create situation page.

**Advanced `last_processed` to 2026-04-23T10:09:00Z.**
