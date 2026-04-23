---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T11:09:00Z. 12:09 WAT Apr 23 Full tick (weekday work-hours; multiple active situations): 6 in-window items (payload in-envelope, Agent delegation not required this tick). **CRITICAL DELTA: TDSD-6630 NIBSS DD DOWNTIME Completed by Kabir Yusuf at 11:30:22 WAT with zero closure RCA comment** — briefing-2026-04-23 D2 retire-or-hold ask answered by system-level closure; situation [[NIBSS DD — Downtime P1 Apr 20]] retired this tick (78h04m silent-recovery-without-RCA, exact Apr 14 precedent match). **TDSD-6697 NEW \"INTERSWITCH 91 ERRORS | 20260420\"** — Frances Omelu self-filed+self-closed in 2 minutes (11:36 WAT create → 11:38 WAT Completed), retrospective documentation of Apr 20 Interswitch RC91 cycle with \"issue originated from the issuer\" Interswitch-team attribution. Routine dev lifecycle: TCDD-1132 Log for Re-work, TDSD-6656 Awaiting implementation (Axios version bump), ADD-4254 Done, AS-4995 NEW Juliana Back office report-generation failure (Wycliffe Ochieng assignee, Pre-pilot phase, Moniepoint reporter Mariam Davies). TDSD-6645/TDSD-6696/TDSD-6684 no touch in-window. All non-Immediate; accumulating for briefing-2026-04-24."
updated: "2026-04-23T12:18:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T12:09:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP)`. **Verified 5th time 2026-04-23 13:09 WAT** — query executed without error when both were quoted.

**JQL payload-size discipline.** Full 18-project `searchJiraIssuesUsingJql` returned oversize across five consecutive ticks (56,914 → 166,691 → 199,382 → 196,192 → now 57,262 chars across 2026-04-22 14:15 WAT → 2026-04-23 13:09 WAT). **Rule (promoted from exception to default):** for weekday work-hours ticks (08:00-18:00 WAT) the default extraction path MUST be `Agent`-delegated file-chunk reads, because bulk grooming batches are persistent — saw 48-61 items in three consecutive tick windows. 13:09 WAT: 16 items returned but payload still exceeded direct-read limit; Agent-delegated extraction executed cleanly. maxResults=50 is not sufficient for these windows either; raise to 100 or accept isLast=False. `markdown` response format (vs ADF) reduces payload per item but does not eliminate oversize at 16+ item windows.

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

### Second-cycle situation creation gate (reinforced 2026-04-23 13:09 WAT)
When a product surface records a first operational signal (e.g., AS-4995 Juliana Back office report-generation Apr 23), a second distinct-cycle signal within 7 days warrants situation-page creation. **Clarification (13:09 WAT):** "second cycle on the same product surface" means a genuinely recurring failure mode on the same sub-component. AS-4995 (Juliana Back office report generation) and TDSD-6698 (Juliana Switch downtime) are on different sub-components (Back office vs Switch) — the Juliana brand umbrella overlaps but the failure surfaces diverge. Do NOT create a Juliana situation page from this pair alone; watch for third Juliana-branded surface OR second cycle on Back-office-specifically OR second cycle on Switch-specifically.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Six Apr 22 ticks across 14:15, 16:15, 17:09, 18:09, 20:00, 22:10 WAT. Key accumulations: TDSD-6645 stall pattern (45h+ assignee silence), TDSD-6655/6661/6662 Opeyemi same-day-close comparisons (3:1 vs Dominic stall), TDSD-6688 Dominic-Awaiting-Scheme-Update workflow compound, TDSD-6630 carry across all 6 ticks (no movement), Keystone retirement candidate, TDSD-6691 Polaris outward-flows deploy awareness, TDSD-6676 Access Bank exposure. 22:10 WAT early-exit advanced last_processed to 2026-04-22T21:00:00Z.

### Tick 2026-04-23 06:10 / 07:10 / 08:10 / 09:11 / 10:09 / 11:09 / 12:09 WAT (condensed — see git history)

06:10 briefing tick: TDSD-6645 Dominic broke 59h15m silence with attribution-transfer to inwards payments team; TDSD-6630 72h43m silent surfaced as D2 retire-or-hold ask; TDSD-6684 new Blessing→Dominic filing (3rd in 3 days); TDSD-6638 closed. 07:10 TDSD-6692 UBA 6-min fast-cycle Jira-only (cross-source asymmetry 1st observation). 08:10 TDSD-6675/TDSD-6592 closures + AS-* bulk grooming. 09:11 ADD-4587/ADD-4584/ADD-4589 + AS Zone Switching Partnership 30-item batch + ATPP MDRS 12-item batch. 10:09 TDSD-6694 Paystack Balance + TDSD-6695 Stopgap Public Access Waiting-for-Approval + settlement reliability closures. 11:09 TDSD-6696 RC06 Verve TTP Work in Progress (first RC06 Verve surface this week) + TDSD-6506 Firewall Emergency Upgrade Implementing + TDSD-5900 Completed + AS-4854 DD Engine In Progress + TDSD-6695 transitioned to Awaiting Scheme Update. 12:09 TDSD-6630 Completed by Kabir Yusuf 11:30 WAT with zero RCA (situation retired this tick, exact Apr 14 precedent match at 78h04m silent-recovery-without-RCA) + TDSD-6697 retrospective Interswitch RC91 self-filed+self-closed (2-min) + AS-4995 Juliana Back office first surface.

### Tick 2026-04-23 ~13:09 WAT — Full (weekday work-hours; new Juliana Switch incident + routine MDRS epic expansion)

Window: 11:09 UTC → 12:09 UTC Apr 23 (~60min; JQL `updated > "2026-04-23 12:09"` WAT-local per timezone-discipline). Step 0 declared `level=full, rationale=weekday-working-hours-with-active-p1-situations-and-overdue-reminder`. briefing-2026-04-23 already exists — not a briefing tick. Payload oversize (57,262 chars / 955 lines — Agent-delegated extraction). 16 items in-window.

**Operationally relevant deltas:**

1. **TDSD-6698 "JULIANA SWITCH DOWNTIME | 20260423" NEW → Completed.** [System] Incident archetype. Medium priority. Assignee: [[Frances Omelu]]. Updated 2026-04-23T12:32:10 WAT. No extracted comments from Agent reading. Same self-filed+self-closed retrospective pattern as TDSD-6697 (documented Apr 20 Interswitch RC91 at 11:36-11:38 WAT earlier today). **Second Juliana-branded surface today** — alongside AS-4995 Juliana Back office report-generation failure (filed 12:09 WAT Apr 23). Different sub-components (Switch vs Back office), same Juliana brand umbrella. Per Second-cycle situation creation gate directive (reinforced this tick): do NOT create a Juliana situation page from this pair; watch for third Juliana-branded surface OR second cycle on the same sub-component. **Awareness-tier.** Factors: source=jira, ticket_new_and_completed_same_tick, retrospective_self_filed_self_closed_pattern, frances_omelu_actor, second_juliana_surface_today, different_subcomponent_from_as4995, no_rca_content, awareness_tier.

2. **AS-4995 Juliana Back office report-generation** — status update from To Do → In Progress (at 12:09 WAT boundary; captured in 12:09 WAT window but appears again here at 12:09:59 update timestamp). Assignee still Wycliffe Ochieng'. Awareness continuation.

**Routine dev lifecycle (13 items):**

- **ATPP MDRS authentication/session management epic expansion** — ATPP-1710 (parent epic, unassigned), ATPP-1711 through ATPP-1718 (8 child tasks). All Ruth Adetunji reporter, various assignees, Medium priority, To Do status. New epic structure. Awareness-tier. Factors: source=jira, dev_lifecycle_new_epic, mdrs_authentication_session_management, ruth_adetunji_reporter, awareness_tier.
- **TCDD-857** "GlobalPay by Zenith" epic — Glory Alioha assigned, Medium, To Do. Awareness.
- **TCDD-1312** "Merchant disabled state error message bug" — John Oluwole, Medium, Todo. Awareness.
- **TCDD-1358** "GTB logo display issue on CMV page" — Funsho Abdullahi, Medium, Ready for QA Testing. Awareness (QA-lifecycle).
- **TCDD-1273** "NIBSS FAS API test task" — Victor Madu, Medium, Todo. Awareness — NIBSS keyword match but dev-test context (not operational incident).

**Named-ticket watchlist activity (in-window):**
- **Not touched in-window:** TDSD-6645 (Dominic silence continuing ~9h post-04:08 WAT attribution-transfer comment), TDSD-6696 (Verve TTP RC06 — static since 11:09 WAT), TDSD-6684 (Pending Refund — Awaiting Scheme Update continues), TDSD-6694 (Paystack Balance — continuing Awaiting Scheme Update), TDSD-6695 (Stopgap Public Access — Awaiting Scheme Update, approver still unnamed), TDSD-6506 (Firewall Emergency Upgrade — still Implementing), TDSD-6692 (UBA fast-cycle — static, cross-source tracker single-point).

**Cross-source asymmetry tracker status:** TDSD-6698 Juliana Switch Downtime is retrospective self-documentation at 12:32 WAT — no event-time component to check against Slack #teamapt-tech-operations for mirror-or-not. Does NOT contribute to tracker. **Tracker still at 1 data point.** Tracker window still open until 06:44 WAT Apr 24.

**No in-window approval-gate surface** — no items moved into Waiting for Approval or Authorize this window.

**Dispatch decisions:**
- No Immediate-tier Jira dispatch (no P1 markers; TDSD-6698 Completed on-file so no active incident).
- TDSD-6698 noted as new historical-documentation signal. Second Juliana-branded surface today — watch for third before situation creation.
- All routine dev deltas Awareness-tier; accumulate for briefing-2026-04-24.

**Advanced `last_processed` to 2026-04-23T12:09:00Z.**
