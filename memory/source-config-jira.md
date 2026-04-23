---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T11:09:00Z. 12:09 WAT Apr 23 Full tick (weekday work-hours; multiple active situations): 6 in-window items (payload in-envelope, Agent delegation not required this tick). **CRITICAL DELTA: TDSD-6630 NIBSS DD DOWNTIME Completed by Kabir Yusuf at 11:30:22 WAT with zero closure RCA comment** — briefing-2026-04-23 D2 retire-or-hold ask answered by system-level closure; situation [[NIBSS DD — Downtime P1 Apr 20]] retired this tick (78h04m silent-recovery-without-RCA, exact Apr 14 precedent match). **TDSD-6697 NEW \"INTERSWITCH 91 ERRORS | 20260420\"** — Frances Omelu self-filed+self-closed in 2 minutes (11:36 WAT create → 11:38 WAT Completed), retrospective documentation of Apr 20 Interswitch RC91 cycle with \"issue originated from the issuer\" Interswitch-team attribution. Routine dev lifecycle: TCDD-1132 Log for Re-work, TDSD-6656 Awaiting implementation (Axios version bump), ADD-4254 Done, AS-4995 NEW Juliana Back office report-generation failure (Wycliffe Ochieng assignee, Pre-pilot phase, Moniepoint reporter Mariam Davies). TDSD-6645/TDSD-6696/TDSD-6684 no touch in-window. All non-Immediate; accumulating for briefing-2026-04-24."
updated: "2026-04-23T11:20:15Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T11:09:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP)`. **Verified 4th time 2026-04-23 12:09 WAT** — query executed without error when both were quoted.

**JQL payload-size discipline.** Full 18-project `searchJiraIssuesUsingJql` returned oversize (56,914 → 166,691 → 199,382 → 196,192 chars across four consecutive ticks 2026-04-22 14:15 WAT → 2026-04-23 11:09 WAT). **Rule (promoted from exception to default):** for weekday work-hours ticks (08:00-18:00 WAT) the default extraction path MUST be `Agent`-delegated file-chunk reads, because bulk grooming batches are persistent — saw 48-61 items in three consecutive tick windows. maxResults=50 is not sufficient for these windows either; raise to 100 or accept isLast=False. `markdown` response format (vs ADF) reduces payload per item but does not eliminate oversize at 48+ item windows. **2026-04-23 12:09 WAT exception:** this tick returned only 6 items (~in-envelope) — no oversize. Default remains Agent-delegation; direct read works only when the in-window count is small.

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

### Tick 2026-04-23 06:10 / 07:10 / 08:10 / 09:11 / 10:09 / 11:09 WAT (condensed — see git history)

06:10 briefing tick: TDSD-6645 Dominic broke 59h15m silence with attribution-transfer to inwards payments team; TDSD-6630 72h43m silent surfaced as D2 retire-or-hold ask; TDSD-6684 new Blessing→Dominic filing (3rd in 3 days); TDSD-6638 closed. 07:10 TDSD-6692 UBA 6-min fast-cycle Jira-only (cross-source asymmetry 1st observation). 08:10 TDSD-6675/TDSD-6592 closures + AS-* bulk grooming. 09:11 ADD-4587/ADD-4584/ADD-4589 + AS Zone Switching Partnership 30-item batch + ATPP MDRS 12-item batch. 10:09 TDSD-6694 Paystack Balance + TDSD-6695 Stopgap Public Access Waiting-for-Approval + settlement reliability closures. 11:09 TDSD-6696 RC06 Verve TTP Work in Progress (first RC06 Verve surface this week) + TDSD-6506 Firewall Emergency Upgrade Implementing + TDSD-5900 Completed + AS-4854 DD Engine In Progress + TDSD-6695 transitioned to Awaiting Scheme Update.

### Tick 2026-04-23 ~12:09 WAT — Full (weekday work-hours; TDSD-6630 closure delta)

Window: 10:09 UTC → 11:09 UTC Apr 23 (~60min; JQL `updated > "2026-04-23 11:09"` WAT-local per timezone-discipline). Step 0 declared `level=full, rationale=weekday-working-hours, multiple-active-situations, overdue-reminder, prior-tick-dense`. briefing-2026-04-23 already exists — not a briefing tick. Payload this tick in-envelope (6 items, no oversize).

**Operationally relevant deltas:**

1. **TDSD-6630 "NIBSS DD DOWNTIME" → Completed at 11:30:22 WAT by Kabir Yusuf (assignee).** Zero closure RCA comment. Resolution date stamp set but no human-authored closure content. Ticket was silent 78h04m since Frances Omelu's last public comment 05:27 WAT Apr 20 ("This has been escalated to NIBSS for review and resolution"). **CRITICAL — briefing-2026-04-23 D2 retire-or-hold-or-redispatch ask answered by system-level closure.** Situation [[NIBSS DD — Downtime P1 Apr 20]] retired this tick. Exact structural match to retired Apr 14 [[NIBSS DD — Pending Mandate P1 Active]] precedent (47h silent-recovery-without-RCA). Third NIBSS DD cycle in 9-day window: Apr 14 (47h → retired), Apr 20 TDSD-6630 (78h04m → Completed-silent), Apr 22 TDSD-6683 (2h25m explicit close). Dominant NIBSS DD closure pattern on this product surface is close-without-RCA (2/3 recent cycles). Factors: source=jira, ticket_completed, silent_recovery_without_rca, assignee_closure_kabir_yusuf, comment_silence_78h04m, apr14_precedent_exact_match, briefing_d2_structural_preempt, situation_retired.

2. **TDSD-6697 "INTERSWITCH 91 ERRORS | 20260420" NEW → Completed (2-minute self-filed+self-closed).** Created 11:36:36 WAT Apr 23 by Frances Omelu, Completed 11:38:07 WAT Apr 23 by Frances Omelu. Description records an Apr 20 05:17 WAT Interswitch gateway 500 Internal Server Error on transaction MNFY|94|20260420061740|211174_86885743 (paymentId 2648691884, bankCode 032). Single comment from Frances: "Feedback from the Interswitch team was that the issue originated from the issuer." **Retrospective 3-day lag Apr 20 → Apr 23 filing** — Frances is batch-documenting historical Interswitch events. No active Interswitch situation page; first Interswitch-rooted ticket signal observed this week. Not adequate for situation creation (1 cycle, already closed, attribution to issuer). Awareness-tier for briefing-2026-04-24; entity [[Interswitch]] gains a new historical cycle data point. Factors: source=jira, ticket_new_and_completed_same_tick, retrospective_3d_lag, self_filed_self_closed_pattern_frances_omelu, interswitch_team_attribution_to_issuer, no_active_situation_match, awareness_tier.

3. **AS-4995 "Pre pilot - Inability to generate Report for 23rd April on the Juliana Back office" NEW → In Progress.** Medium priority, reporter Mariam Davies (mdavies@moniepoint.com), assignee Wycliffe Ochieng'. Updated 12:09 WAT Apr 23. Juliana Back office report-generation failure during pre-pilot phase. First Juliana Back office operational signal on the tracker — all prior AS-* activity was Zone Switching Partnership / DD Engine workstreams. Not adequate for situation creation (single ticket, In Progress with named assignee). Awareness-tier for briefing-2026-04-24. Factors: source=jira, ticket_new, juliana_back_office_first_operational_surface, pre_pilot_phase, mdavies_moniepoint_reporter, wycliffe_ochieng_assignee, awareness_tier.

4. **TCDD-1132 "Implement Direct Debit Transaction Scheduler in DD Scheduler Service" → Log for Re-work.** Status transition (was In Progress in prior tick). Yasir Syed Ali reporter, Oluwadayo Osborne assignee. Routine dev lifecycle (re-work loop). Awareness. Factors: source=jira, dev_lifecycle_rework, dd_scheduler_service, awareness_tier.

5. **TDSD-6656 "Update Axios version on web sdk" → Awaiting implementation.** Medium, Charles Onuorah self-reporter+self-assignee. Security dependency update (Axios version bump). Awareness. Factors: source=jira, security_dependency_update, axios_web_sdk, awareness_tier.

6. **ADD-4254 "Enhance Bulk Settlement Narration Format" → Done.** Oluwadayo Osborne assignee. Final completion (was QA-Testing in prior tick). Dev lifecycle closure. Awareness. Factors: source=jira, dev_lifecycle_done, bulk_settlement_narration, awareness_tier.

**Named-ticket watchlist activity (in-window):**
- **Not touched in-window:** TDSD-6645 (Dominic silence continuing ~8h post-04:08 WAT attribution-transfer comment), TDSD-6696 (Verve TTP RC06 — no movement on Jira side despite 11:48 WAT Slack P2 from Olamide; Slack-side only signal), TDSD-6684 (Pending Refund — Awaiting Scheme Update continues), TDSD-6694 (Paystack Balance — continuing Awaiting Scheme Update), TDSD-6695 (Stopgap Public Access — Awaiting Scheme Update, approver still unnamed), TDSD-6506 (Firewall Emergency Upgrade — still Implementing, disambiguation pending), TDSD-6692 (UBA fast-cycle — static, cross-source tracker single-point).

**Cross-source asymmetry tracker status:** TDSD-6696 (Jira 10:57 WAT → Slack 11:48 WAT, 39-min sequencing lag) is **cross-source consistency**, not asymmetry — does not contribute to tracker. TDSD-6697 is Jira-only by nature (retrospective documentation of Apr 20 event; Slack coverage for Apr 20 was during overnight delegation window). Tracker still at 1 data point (TDSD-6692 UBA 06:44 WAT). Tracker window closes 06:44 WAT Apr 24.

**No in-window approval-gate surface** — no items moved into Waiting for Approval or Authorize this window.

**Dispatch decisions:**
- No Immediate-tier Jira dispatch (no P1 markers on any in-window deltas; RC06 P2 is Slack-side only this tick).
- **TDSD-6630 retirement action taken on situation page (no briefing write).** D2's user-triage disposition becomes advisory; the retirement is system-stamped.
- **TDSD-6697** noted as new historical-documentation signal. No situation creation.
- **AS-4995 Juliana Back office** noted as first-surface — if second cycle on Juliana product surfaces within 7 days, consider situation creation.
- All other in-window deltas Awareness-tier; accumulate for briefing-2026-04-24.

**Advanced `last_processed` to 2026-04-23T11:09:00Z.**
