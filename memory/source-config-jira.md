---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T08:10:00Z. 09:11 WAT Apr 23 Full tick (weekday work-hours; 10+ active situations): 50 deltas in-window (isLast=False — additional page available; cost-cap invoked). TDSD-6693 Chinenye-reported PENDING SETTLEMENT WIP 08:47 WAT (Oladimeji Alabi assigned, 5th pending-settlement ticket this week). ADD-4584 CRLF vulnerability DONE. ADD-4587 Direct Debit Bug Tracking new (Yasir/Nancy). Bulk grooming: ATPP MDRS new backend epic (12 items), AS Zone POS Integration project plan (~30 items). TDSD-6645/TDSD-6630 no follow-on. Cross-source asymmetry 2nd observation carryforward."
updated: 2026-04-23
cssclasses:
  - "source-config"
last_processed: "2026-04-23T09:10:00Z"
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

**JQL payload-size discipline (added 2026-04-22 14:15 WAT after oversize return).** Full 18-project `searchJiraIssuesUsingJql` returned 56,914 chars / 931 lines in a single call — exceeded practical context envelope. **Rule:** for tick sweeps with windows > 24h, query projects individually (iterate the scope list) or restrict by fields at source. Do not pull the union payload unconditionally. Applies to any tick with `updated > -24h` comparable window length. **Reinforced 2026-04-23 08:10 WAT:** 1h window at Full-tick still returned 64,872 chars on 15 items due to ADF-expanded descriptions/comments — probe Jira results via jq post-filter (structure: `{issues: [{...}]}`) rather than reading raw MCP output when result > ~30KB. **Re-reinforced 2026-04-23 09:11 WAT:** 1h Full-tick now returned 166,691 chars / 2,939 lines on 50 items (maxResults=50) with isLast=False — bulk grooming batches (AS Zone Switching Partnership project plan create + ATPP MDRS backend epic create) accumulated at weekday work-hours opener. **Re-re-reinforced 2026-04-23 10:09 WAT:** 1h Full-tick returned 199,382 chars / 3,181 lines on 61 items — exceeded MCP output cap; tool auto-saved to disk and instructed subagent delegation. **Rule update:** for weekday work-hours ticks (08:00-18:00 WAT) the default extraction path MUST be `Agent`-delegated file-chunk reads (not raw output consumption), because bulk grooming batches are persistent — saw 50+ items in both the 09:11 and 10:09 tick windows. maxResults=50 is not sufficient for these windows either; raise to 100 or accept isLast=False.

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

### Tick 2026-04-23 ~09:11 WAT — Full (weekday work-hours; 10+ active situations; Gmail recovery)

Window: 07:10 UTC → 08:11 UTC Apr 23 (~1h). Step 0 declared `level=full, rationale=weekday-working-hours-active-situations`. Delta query via `searchJiraIssuesUsingJql` with `updated >= "2026-04-23 08:10"` (WAT per timezone-discipline directive = 07:10 UTC, intentionally wider than last_processed 07:10 UTC) — post-filter on assistant side. 18-project scope.

**Payload oversize critically exceeded.** 50-item result (maxResults=50, isLast=False — additional page available) returned 166,691 chars / 2,939 lines. Extraction via Python jq-projection against saved file yielded key/updated/priority/status/summary/assignee/reporter projection only. **Payload-size-discipline directive updated** above: anticipate 30-50+ item batches during weekday work-hours opener; default to jq-projection from file, not raw read.

**Operationally relevant deltas (in-window):** TDSD-6693 new PENDING SETTLEMENT WIP (Chinenye→Oladimeji, 5th pending-settlement this week, Awareness); ADD-4587 Direct Debit Bug Tracking new (Nancy→Yasir, Awareness — ties to today's 13:00 WAT DD Weekly Analysis); ADD-4584 CRLF vulnerability Done (Bukola self-filed-self-closed, Awareness); ADD-4589 Moniepoint ACS Details in DS new (Abiodun→Wycliffe, DCIR/ACS proximity, Awareness); ADD-4590 UI filter bug (routine, Awareness); ADD-3434 Zone Switching Partnership simulation In Progress (Taiwo Baptista, routine).

**Bulk grooming batches (Awareness):** AS project Zone Switching Partnership go-live prep 30+ items (June Johnson reporter, scope through UAT/CAB/ramp-up). ATPP project MDRS backend epic 12 items (Ruth Adetunji reporter, RBAC/multi-tenant DB/queue processors/UI — ties to today's ATPP Daily Standup cancellation "because of Dispute Management Sprint Planning").

**TDSD-6630 / TDSD-6645 carryforward:** TDSD-6645 Dominic silent 5h03m post-04:08 WAT attribution-transfer. TDSD-6630 comment silence ~76h43m, retirement still held in briefing-2026-04-23 D2.

**Page 2 NOT pulled this tick** — cost-cap engaged. isLast=False means additional items beyond 50. Full sweep deferrable to briefing-2026-04-24 if no in-window deltas reference unobserved items.

**Cross-source asymmetry carryforward (2nd observation this tick).** Ecobank RC91 P1 surfaced via Gmail, zero Slack mirror at 09:11 observation. Compounds with TDSD-6692 UBA Jira-only as 2nd observation in 3h. Directive codification still stands-down pending 3rd observation within 24h. [NOTE: see 10:09 tick below — Ecobank asymmetry reclassified as sequencing lag; TDSD-6692 remains the standing 2nd data point alone.]

**Dispatch decisions:** No Immediate-tier Jira dispatch (operational Immediate was Ecobank-via-email). All in-window Jira deltas Awareness-tier; accumulate for briefing-2026-04-24. No situation-page updates from Jira this tick.

**Advanced `last_processed` to 2026-04-23T08:10:00Z.**

### Tick 2026-04-23 ~10:09 WAT — Full (weekday work-hours; active situations)

Window: 08:10 UTC → 09:10 UTC Apr 23 (~1h). Step 0 declared `level=full, rationale=weekday-working-hours + active-P1-situations + recent-dense-signals`. briefing-2026-04-23 already exists — not a briefing tick.

Delta query via `searchJiraIssuesUsingJql` with `updated > "2026-04-23 09:10"` (WAT per timezone-discipline = 08:10 UTC). JQL reserved-word handling tripped twice — `ADD` and `AS` both required quoting (directive reinforced above for 3rd time).

**Payload oversize extreme (3rd reinforcement):** 61-item result returned 199,382 chars / 3,181 lines — exceeded MCP output cap; tool auto-saved output to file and instructed Agent delegation. Delegated to general-purpose subagent with structured instructions (total count, Highest/P1 tickets, status transitions, new tickets with reporter/assignee/priority, named-ticket updates, RC91/RC96/settlement/NIBSS/CBN mentions). Returned concise <600-word summary. **Directive update above** — weekday work-hours ticks MUST default to Agent-delegated file-chunk reads.

**Operationally relevant deltas (in-window):**

1. **TDSD-6694 "Paystack Balance Adjustment April 23rd"** — NEW at 10:10 WAT. Reporter [[Christine Ogude]], assignee [[Daniel Fetuga]], status Awaiting Scheme Update. **Correlates 1:1 with the 09:29 WAT #teamapt-x-paystack-transfer-support Slack message** (new inflows ₦1,550,465,282.14 to apply) — treasury-workflow ticket formalizing the Slack operational ask. Awareness-tier. Factors: source=jira, ticket_new, family=paystack_balance_operations, cross_source_match=slack_treasury, awareness_tier.

2. **TDSD-6695 "Temporary Public Access for Account Switch Reports (Stopgap)"** — NEW at 10:10 WAT. Reporter [[Ekene Udodi]], assignee [[Tolu Aina]], Medium priority, status **Waiting for Approval**. **CloudFront/S3 public-access stopgap — MEDIUM security risk.** Description: users are blocked from downloading account switch reports due to signed-URL/policy-token failure on `account-switch-report.teamapt.com`; temporary mitigation is to disable auth and allow public `s3:GetObject` access. Mitigation strategy: "Limit the access by only making the connection to cloud front public when a ticket has been raised and approved to download reports and manually share with the partners." **Approver not named in ticket description.** Zero comments yet. If approver is CTO — escalate to Decision tier for briefing-2026-04-24. Default classification **pending approver identification**: Awareness-tier on briefing-2026-04-24, with watch for status change or explicit CTO approval gate signal. Factors: source=jira, ticket_new, security_adjacent, medium_risk, waiting_for_approval, approver_unidentified.

3. **Settlement reliability closures (batch):** [[TDSD-5900]] "Settlement reliability" Completed; [[TDSD-6219]] "Settlement service cache optimization" Completed; [[TDSD-5119]] "Settlement entry enhancement" Completed. Batch operational improvement shipped. No active-situation direct match; [[Merchant Settlement — Systemic Reconciliation Disparity]] (retired) has adjacency. Awareness-tier — positive operational signal.

4. **Other status transitions:** TDSD-5240 Enhanced Logging for DD → Awaiting implementation; TDSD-5279 Kafka consumer groups NIBSS/TeamApt DD → Review (Smart Mekiliuwa); TDSD-6382 Compliance Review + KYC Revamp → Awaiting implementation; TDSD-6546 CBA Async Based Transaction → Authorize (Dominic Usiabulu assignee — adjacent to TDSD-6645 assignee pattern, note but don't apply to situation); ADD-4254 Bulk Settlement Narration Format → Ready for QA Testing. All Awareness.

5. **MDRS backend sprint planning continuation:** Ruth Adetunji filed ~8 more ATPP tickets (ATPP-1624 etc.) — continuation of the MDRS epic batch observed at 09:11 tick. Consistent pattern, no new signal beyond accumulation.

**Named-ticket watch (no updates in window):**
- TDSD-6645 Dominic silent 6h01m post-04:08 WAT comment — still within morning-hours expected quiet; no flag.
- TDSD-6630 NIBSS DD silent ~77h+ — retirement held in briefing-2026-04-23 D2.
- TDSD-6684 / TDSD-6688 / ADD-4587 / TDSD-6693 — no updates in window.

**Cross-source asymmetry status update.** Ecobank 09:38 WAT Slack formal P1 filing (27 min after 09:11 observation) reclassifies that observation as sequencing lag, not structural asymmetry — drops out of the pattern. Current count: **1 (TDSD-6692 UBA Jira-only, 2026-04-23 06:44 WAT).** Stand-down-pending-3rd-within-24h still holds; tracking window expires 06:44 WAT Apr 24.

**Page 2 (from 09:11 tick cost-cap)** — no evidence this tick's in-window deltas reference items not observed. Full sweep deferrable to briefing-2026-04-24.

**Dispatch decisions:**
- No Immediate-tier Jira dispatch this tick.
- All in-window Jira deltas Awareness-tier; accumulate for briefing-2026-04-24.
- TDSD-6695 flagged for approver-identification at next sweep (if approver = CTO, elevate to Decision tier with security-risk framing).
- No situation-page updates from Jira this tick.

**Advanced `last_processed` to 2026-04-23T09:10:00Z.**
