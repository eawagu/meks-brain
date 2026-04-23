---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T08:10:00Z. 09:11 WAT Apr 23 Full tick (weekday work-hours; 10+ active situations): 50 deltas in-window (isLast=False — additional page available; cost-cap invoked). TDSD-6693 Chinenye-reported PENDING SETTLEMENT WIP 08:47 WAT (Oladimeji Alabi assigned, 5th pending-settlement ticket this week). ADD-4584 CRLF vulnerability DONE. ADD-4587 Direct Debit Bug Tracking new (Yasir/Nancy). Bulk grooming: ATPP MDRS new backend epic (12 items), AS Zone POS Integration project plan (~30 items). TDSD-6645/TDSD-6630 no follow-on. Cross-source asymmetry 2nd observation carryforward."
updated: "2026-04-23T08:25:02Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T08:10:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in ("TDSD", "TCDD", "ATPG", "ADD", "AS", "ATPP")`. Verified after two consecutive rejections on unquoted forms.

**JQL payload-size discipline (added 2026-04-22 14:15 WAT after oversize return).** Full 18-project `searchJiraIssuesUsingJql` returned 56,914 chars / 931 lines in a single call — exceeded practical context envelope. **Rule:** for tick sweeps with windows > 24h, query projects individually (iterate the scope list) or restrict by fields at source. Do not pull the union payload unconditionally. Applies to any tick with `updated > -24h` comparable window length. **Reinforced 2026-04-23 08:10 WAT:** 1h window at Full-tick still returned 64,872 chars on 15 items due to ADF-expanded descriptions/comments — probe Jira results via jq post-filter (structure: `{issues: [{...}]}`) rather than reading raw MCP output when result > ~30KB. **Re-reinforced 2026-04-23 09:11 WAT:** 1h Full-tick now returned 166,691 chars / 2,939 lines on 50 items (maxResults=50) with isLast=False — bulk grooming batches (AS Zone Switching Partnership project plan create + ATPP MDRS backend epic create) accumulated at weekday work-hours opener. **Rule update:** during weekday work-hours tick, anticipate 30-50+ item bulk batches and use Python jq-projection against saved file as default (not escape hatch). maxResults=50 is sufficient for 1h windows if the extraction pipeline projects key/updated/summary/status/priority/assignee/reporter only.

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

**Operationally relevant deltas (in-window):**

1. **TDSD-6693 "PENDING SETTLEMENT"** — Work in progress at 08:47 WAT. Reporter [[Chinenye Iloka]], assignee [[Oladimeji Alabi]], Medium priority. 5th "PENDING SETTLEMENT" family ticket this week (TDSD-6655/TDSD-6661/TDSD-6662 Opeyemi family + TDSD-6675 Chinenye+Oladimeji Apr 23 + TDSD-6693 Chinenye+Oladimeji Apr 23). Oladimeji-assigned x2 this morning — transitions the pattern anomaly from Opeyemi-vs-Dominic binary into broader multi-assignee accumulation. **Not applied to TDSD-6645 situation this tick** — continuing the adjacent-pattern-observation discipline from 08:10 tick (different template, different reporter/assignee vs. the TDSD-6645 Blessing→Dominic Urgent Pending Settlement family). If TDSD-6693 closes fast-cycle like TDSD-6675, record as further Oladimeji-closes-fast evidence; otherwise watch for Dominic-style stall signal. Factors: source=jira, ticket_new_in_progress, family=pending_settlement, reporter=chinenye_iloka, assignee=oladimeji_alabi, adjacent_pattern_observation, awareness_tier.

2. **ADD-4587 "Direct Debit Bug Tracking"** — new at 08:31 WAT. Reporter [[Nancy Muorah]], assignee [[Yasir Syed Ali]], Medium priority, To Do. Umbrella tracking epic for DD bugs. Relates to today's 13:00 WAT Direct Debit Production Issues Weekly Analysis meeting (Yasir organizer) — Yasir is organizing a structural container for DD bug work. No active-situation direct match but [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] proximity worth noting. Awareness-tier.

3. **ADD-4584 "Fix CRLF Injection Vulnerability on Direct Debit Cron Service"** — Done at 09:09 WAT by [[Bukola Taiwo]] (self-filed+self-closed). Security remediation completed. Awareness-tier. Factors: source=jira, security_fix_done, self_filed_self_closed, awareness_tier.

4. **ADD-4589 "Update the Moniepoint ACS Details in DS"** — new at 09:05 WAT by [[Abiodun Famoye]] reporter, [[Wycliffe Ochieng']] assignee, Medium Todo. Relates to [[DCIR/ACS/DD]] multi-track situation (ACS connector replacement line). Awareness-tier, accumulating.

5. **ADD-4590 "Management portal: Filter feature on PF page not working across pages"** — new at 08:52 WAT by Fatai Ibrahim reporter, Ebenezer Igbinoba assignee. UI bug, routine. Awareness.

6. **ADD-3434 "Production - Simulation of Live Transaction"** — In Progress at 08:48 WAT by [[Taiwo Baptista]]. Zone Switching Partnership test activity. Routine, awareness.

**Bulk grooming batches (Awareness — routine project setup):**

- **AS project — Zone Switching Partnership go-live prep (30+ items in-window):** [[June Johnson]]-reportered AS-4962 through AS-4994 hierarchy covering scope sign-off, stakeholder allocation, architectural docs share, test-env setup, prod-env setup, E2E testing, UAT sign-off, CAB/Pilot approval, volume ramp-up, closure. All Medium Todo, unassigned. Matches the Zone <> TeamApt POS Integration Partnership announcement in email (Taiwo Baptista Apr 21 13:13 WAT). Structurally a new Zone-project rollout plan crystallizing on Jira. No active-situation match — project is early-stage / scope-alignment phase.
- **ATPP project — MDRS backend epic (12 items in-window):** [[Ruth Adetunji]]-reported ATPP-1624 through ATPP-1632 + ATPP-1708/1709 covering MDRS Setup (RBAC framework, multi-tenant database schema, multi-tenancy middleware, row-level security), backend services (Mastercard API Client Wrapper, Queue Polling Service, Claim Enrichment Service, AcquirerCollaborationUnworked Queue Processor), UI (Backoffice Service + Frontend Base Project Setup). All Medium To Do, unassigned. MDRS = Mastercard Dispute Resolution Service. Ties to the ATPP Daily Standup cancellation today ("because of Dispute Management Sprint Planning") — the bulk-create IS the Sprint Planning output. Context-link noted.

**TDSD-6630 / TDSD-6645 carryforward (unchanged):** TDSD-6645 Dominic silent 5h03m post-04:08 WAT attribution-transfer — within morning-hours expected quiet. TDSD-6630 comment silence now ~76h43m from 05:27 WAT Apr 20 — still held per briefing-2026-04-23 D2.

**Page 2 of results NOT pulled this tick** — cost-cap engaged. maxResults=50 isLast=False means additional items beyond the 50 fetched. Based on the 50-item sample, likely additional AS-* / ATPP-* bulk grooming + possible operational tickets. **Mitigation:** if next tick finds in-window deltas that reference items not in the observed 50, pull those via `getJiraIssue`; otherwise accept the cost-cap loss. Full-page-2 can be swept at the next briefing tick with expanded budget.

**Cross-source asymmetry carryforward (2nd observation this tick).** Ecobank RC91 P1 Apr 23 06:35-08:52 WAT surfaced via Gmail recovery, zero Slack #teamapt-tech-operations mirror, zero Jira mirror. Sole channel was email. Compounds with TDSD-6692 UBA fast-cycle (07:10 tick) as 2nd observation in 3h of operational signal routing outside the canonical Slack ops channel. Directive codification still stands-down pending 3rd observation within 24h.

**Out-of-scope carryforward (Gmail MCP recovered):** TISD-480 + TDSD-6203 status unverified this tick — Gmail backlog catch-up sweep deferred to briefing-2026-04-24. Once verified, any CTO-approval-gate action surfaces into that briefing.

**Dispatch decisions:**
- No Immediate-tier Jira dispatch (operational Immediate this tick was Ecobank-via-email, see source-config-email).
- All in-window Jira deltas Awareness-tier; accumulate for briefing-2026-04-24.
- No situation-page updates from Jira this tick (TDSD-6693 adjacent-pattern-not-applied; ADD-4587/4589/4590/3434 routine; bulk grooming no active-situation match).

**Advanced `last_processed` to 2026-04-23T08:10:00Z.**
