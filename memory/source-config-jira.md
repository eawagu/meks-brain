---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T11:09:00Z. 12:09 WAT Apr 23 Full tick (weekday work-hours; multiple active situations): 6 in-window items (payload in-envelope, Agent delegation not required this tick). **CRITICAL DELTA: TDSD-6630 NIBSS DD DOWNTIME Completed by Kabir Yusuf at 11:30:22 WAT with zero closure RCA comment** — briefing-2026-04-23 D2 retire-or-hold ask answered by system-level closure; situation [[NIBSS DD — Downtime P1 Apr 20]] retired this tick (78h04m silent-recovery-without-RCA, exact Apr 14 precedent match). **TDSD-6697 NEW \"INTERSWITCH 91 ERRORS | 20260420\"** — Frances Omelu self-filed+self-closed in 2 minutes (11:36 WAT create → 11:38 WAT Completed), retrospective documentation of Apr 20 Interswitch RC91 cycle with \"issue originated from the issuer\" Interswitch-team attribution. Routine dev lifecycle: TCDD-1132 Log for Re-work, TDSD-6656 Awaiting implementation (Axios version bump), ADD-4254 Done, AS-4995 NEW Juliana Back office report-generation failure (Wycliffe Ochieng assignee, Pre-pilot phase, Moniepoint reporter Mariam Davies). TDSD-6645/TDSD-6696/TDSD-6684 no touch in-window. All non-Immediate; accumulating for briefing-2026-04-24."
updated: "2026-04-23T14:20:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T14:11:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP)`. **Verified 7th time 2026-04-23 15:11 WAT** — unquoted query failed with reserved-word error on ADD first, then AS after quoting ADD. Both must be quoted from the start. The directive has been reaffirmed 7 ticks consecutively; any heartbeat that writes JQL MUST quote both keys.

**JQL payload-size discipline.** Full 18-project `searchJiraIssuesUsingJql` returned oversize across six consecutive ticks (56,914 → 166,691 → 199,382 → 196,192 → 57,262 → 56,684 chars across 2026-04-22 14:15 WAT → 2026-04-23 14:09 WAT). **15:11 WAT: 10 items returned, payload fit within direct-read limit (window was only 1h; cumulative deltas small).** Rule (promoted from exception to default): for weekday work-hours ticks (08:00-18:00 WAT) the default extraction path MUST be `Agent`-delegated file-chunk reads WHEN payload is oversize, because bulk grooming batches are persistent — saw 48-61 items in three consecutive tick windows and 10-16 items in the other four. `maxResults=50` is not sufficient for overlong windows; raise to 100 or accept isLast=False. `markdown` response format (vs ADF) reduces payload per item but does not eliminate oversize at 11+ item windows with task descriptions. Small windows (~1h) with low item counts (≤10) can be direct-read.

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

### Second-cycle situation creation gate (reinforced 2026-04-23 13:09 WAT; re-affirmed 14:09 WAT; held 15:11 WAT)
When a product surface records a first operational signal (e.g., AS-4995 Juliana Back office report-generation Apr 23), a second distinct-cycle signal within 7 days warrants situation-page creation. **Clarification (13:09 WAT):** "second cycle on the same product surface" means a genuinely recurring failure mode on the same sub-component. AS-4995 (Juliana Back office report generation), TDSD-6698 (Juliana Switch downtime), and AS-4404 (Juliana Card Not Present refund) are on three different sub-components (Back office, Switch, CNP refund) — the Juliana brand umbrella overlaps but the failure surfaces diverge. Do NOT create a Juliana situation page from this triad alone; watch for third distinct-cycle surface OR second cycle on Back-office-specifically OR Switch-specifically OR CNP-refund-specifically. **14:09 WAT re-affirmation:** 3rd Juliana-branded surface today (AS-4404) does not auto-trigger; sub-component diversity criterion holds. **15:11 WAT hold:** no new Juliana-branded deltas in-window; tracker unchanged.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Six Apr 22 ticks across 14:15, 16:15, 17:09, 18:09, 20:00, 22:10 WAT. Key accumulations: TDSD-6645 stall pattern (45h+ assignee silence), TDSD-6655/6661/6662 Opeyemi same-day-close comparisons (3:1 vs Dominic stall), TDSD-6688 Dominic-Awaiting-Scheme-Update workflow compound, TDSD-6630 carry across all 6 ticks (no movement), Keystone retirement candidate, TDSD-6691 Polaris outward-flows deploy awareness, TDSD-6676 Access Bank exposure. 22:10 WAT early-exit advanced last_processed to 2026-04-22T21:00:00Z.

### Tick 2026-04-23 06:10 / 07:10 / 08:10 / 09:11 / 10:09 / 11:09 / 12:09 / 13:09 / 14:09 WAT (condensed — see git history)

06:10 briefing tick: TDSD-6645 Dominic broke 59h15m silence with attribution-transfer to inwards payments team; TDSD-6630 72h43m silent surfaced as D2 retire-or-hold ask; TDSD-6684 new Blessing→Dominic filing (3rd in 3 days); TDSD-6638 closed. 07:10 TDSD-6692 UBA 6-min fast-cycle Jira-only (cross-source asymmetry 1st observation). 08:10 TDSD-6675/TDSD-6592 closures + AS-* bulk grooming. 09:11 ADD-4587/ADD-4584/ADD-4589 + AS Zone Switching Partnership 30-item batch + ATPP MDRS 12-item batch. 10:09 TDSD-6694 Paystack Balance + TDSD-6695 Stopgap Public Access Waiting-for-Approval + settlement reliability closures. 11:09 TDSD-6696 RC06 Verve TTP Work in Progress (first RC06 Verve surface this week) + TDSD-6506 Firewall Emergency Upgrade Implementing + TDSD-5900 Completed + AS-4854 DD Engine In Progress + TDSD-6695 transitioned to Awaiting Scheme Update. 12:09 TDSD-6630 Completed by Kabir Yusuf 11:30 WAT with zero RCA (situation retired this tick, exact Apr 14 precedent match at 78h04m silent-recovery-without-RCA) + TDSD-6697 retrospective Interswitch RC91 self-filed+self-closed (2-min) + AS-4995 Juliana Back office first surface. 13:09 TDSD-6698 Juliana Switch Downtime retrospective self-filed+self-closed + AS-4995 status update + ATPP MDRS epic expansion opener (ATPP-1710 + 1711-1718). 14:09 TDSD-6699 Firewall HA Review (Olayinka Ajayi; paired Gmail thread 19dba77670436f02 with Tolu Aina primary approver, Emeka CC-only — not CTO-specific) + AS-4404 Juliana CNP Refund Highest/Task (3rd Juliana surface, sub-component diversity holds) + TDSD-6693 Pending Settlement Done + TCDD-1106 Habari Pay OTP bug fix Done + ATPP-1634/1711-1718 MDRS epic continuation.

### Tick 2026-04-23 ~15:11 WAT — Full (weekday work-hours; TDSD-6699 past approval gate; TDSD-6701 new Awaiting Scheme Update)

Window: 13:09 UTC → 14:11 UTC Apr 23 (~62min; JQL `updated >= "2026-04-23 14:09"` WAT-local per timezone-discipline). Step 0 declared `level=full, rationale=weekday-working-hours-active-situations-proximate-reminder-potential-mcp-recovery`. briefing-2026-04-23 already exists — not a briefing tick. 10 items in-window; direct-read payload fit within limit (no Agent delegation needed for this small window).

**Operationally relevant deltas:**

1. **TDSD-6699 "CONFIGURATION OF HIGH AVAILABILITY ON TeamApt Prod FIREWALL 02 and 03"** — status transitioned Review → **Awaiting implementation** at 15:11:26 WAT (1-min before tick observation). Approval gate passed. Per 14:09 WAT analysis: Tolu Aina was primary approver, Emeka CC-only on paired Gmail thread 19dba77670436f02 — ticket progressed via Tolu's approval, not Emeka's. No CTO action was required; the Jira-native notification at 13:32 WAT (Gmail thread 19dba8ae164169a7) was informational given the CC-not-To posture on the human approval thread. **Awareness-tier** (infrastructure change now deployment-ready). Factors: source=jira+email, status_transition_review_to_awaiting_implementation, cto_cc_not_primary_approver, tolu_aina_approved, infrastructure_change_deployment_ready, awareness_tier.

2. **TDSD-6701 NEW "UPDATE OF SETTLEMENT STATUS ON TACCS CLEARING DB"** — [System] Service request with approvals, Medium. Reporter [[Daniel Fetuga]], assignee [[Oluwaseun Oladele]]. Created 15:01:14 WAT, first transition to **Awaiting Scheme Update** at 15:10:42 WAT (9min from create to scheme-update gate). Affects TACCS clearing DB settlement state — operational settlement request. **Awareness-tier** (routine settlement service request, no Immediate markers). Factors: source=jira, ticket_new, service_request_with_approvals, taccs_clearing_settlement, medium_priority, awaiting_scheme_update, awareness_tier.

3. **TDSD-6700 NEW "International payment deployment Enhancement (Currency Aware Transaction Refund and Recall Entry)"** — [System] Change, Medium, assignee null, reporter [[David Oparanti]]. Created 14:39 WAT, status transitioned to **Awaiting implementation** at 14:58 WAT. Planned infrastructure change on international payment flows. **Awareness-tier**. Factors: source=jira, ticket_new, system_change, international_payment, awaiting_implementation, awareness_tier.

4. **TDSD-6680 "PALMPAY PORTAL | TRANSACTION NOT MIGRATING"** — [System] Incident (P2 per prior tracking), Medium, assignee null, reporter [[Afeez Kazeem]]. Filed 2026-04-22 07:54 WAT, re-touched at 15:05:03 WAT this tick (status remains INITIAL REVIEW). Incident not auto-closed despite Medium priority — continuing under initial review 31h+ post-filing. Not in active-situation tracker. **Awareness-tier** (ticket re-activation signal; no Immediate markers). Factors: source=jira, ticket_incident_medium, re_activation_signal, initial_review_sustained_31h_plus, no_assignee, awareness_tier.

**Routine dev lifecycle (6 items):**

- **TCDD-1268 "GoSubscribe POS UI Translation: Design Revamp & Mapped Color Implementation"** — In Progress, Medium. Assignee [[Ekene Oranekwu]]. Updated 15:08 WAT. Awareness.
- **TCDD-1132 "Implement Direct Debit Transaction Scheduler in DD Scheduler Service"** — **READY FOR QA TESTING**, Medium. Assignee [[Oluwadayo Osborne]]. Updated 14:56 WAT. Progression signal (In Progress → Ready for QA). Awareness.
- **ATPP-1628 "MDRS - Backend - Build Mastercard API Client Wrapper"** — To Do, Medium. Assignee [[George Ijidola]]. Updated 15:04 WAT. Awareness — MDRS epic continuation.
- **ATPP-1627 "MDRS - Backend - Implement Role-Based Access Control (RBAC) Framework"** — To Do, Medium. Assignee George Ijidola. Updated 15:02 WAT. Awareness — MDRS epic continuation.
- **ATPP-1625 "MDRS Setup - Backend - Implement Row-Level Security and Access Control"** — To Do, Medium. Assignee George Ijidola. Updated 15:02 WAT. Awareness — MDRS epic continuation.
- **ATPP-1709 "MDRS - UI - Backoffice Frontend Base Project Setup"** — To Do, Medium. Assignee [[Olatunbosun Olaosebikan]]. Updated 14:47 WAT. Awareness — MDRS epic UI track.

**Named-ticket watchlist activity (not touched in-window):**
TDSD-6645 (Dominic silence ~11h03m post-04:08 WAT attribution-transfer, under 48h threshold), TDSD-6696 (Verve TTP RC06 — static since 11:09 WAT), TDSD-6684 (Awaiting Scheme Update continues), TDSD-6694 (Paystack Balance — Awaiting Scheme Update), TDSD-6695 (Stopgap Public Access — Awaiting Scheme Update), TDSD-6506 (Firewall Emergency Upgrade — distinct from TDSD-6699), TDSD-6692 (UBA fast-cycle — static), TDSD-6697 (Interswitch RC91 retrospective — static), AS-4995 (Juliana Back office — In Progress held), AS-4404 (Juliana CNP Refund — static since 13:47 WAT), TDSD-6698 (Juliana Switch Downtime — retrospective, static).

**Cross-source asymmetry tracker status:** No new asymmetry observations this tick. Tracker still at 1 data point (TDSD-6692). Window closes 06:44 WAT Apr 24.

**Second-cycle situation gate:** No new Juliana or other product-surface deltas warrant gate review this tick. Hold.

**No CTO (@Emeka Awagu) @-mentions or explicit approval asks** detected in Jira payload this window.

**Dispatch decisions:**
- No Immediate-tier Jira dispatch.
- TDSD-6699 gate-pass + TDSD-6700 new change + TDSD-6701 new TACCS settlement request noted as Awareness items for briefing-2026-04-24.
- TDSD-6680 re-activation noted as Awareness for briefing-2026-04-24 (re-check next tick for further status movement).
- All routine dev deltas Awareness-tier; accumulate for briefing-2026-04-24.

**Advanced `last_processed` to 2026-04-23T14:11:00Z.**
