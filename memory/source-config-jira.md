---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T11:09:00Z. 12:09 WAT Apr 23 Full tick (weekday work-hours; multiple active situations): 6 in-window items (payload in-envelope, Agent delegation not required this tick). **CRITICAL DELTA: TDSD-6630 NIBSS DD DOWNTIME Completed by Kabir Yusuf at 11:30:22 WAT with zero closure RCA comment** — briefing-2026-04-23 D2 retire-or-hold ask answered by system-level closure; situation [[NIBSS DD — Downtime P1 Apr 20]] retired this tick (78h04m silent-recovery-without-RCA, exact Apr 14 precedent match). **TDSD-6697 NEW \"INTERSWITCH 91 ERRORS | 20260420\"** — Frances Omelu self-filed+self-closed in 2 minutes (11:36 WAT create → 11:38 WAT Completed), retrospective documentation of Apr 20 Interswitch RC91 cycle with \"issue originated from the issuer\" Interswitch-team attribution. Routine dev lifecycle: TCDD-1132 Log for Re-work, TDSD-6656 Awaiting implementation (Axios version bump), ADD-4254 Done, AS-4995 NEW Juliana Back office report-generation failure (Wycliffe Ochieng assignee, Pre-pilot phase, Moniepoint reporter Mariam Davies). TDSD-6645/TDSD-6696/TDSD-6684 no touch in-window. All non-Immediate; accumulating for briefing-2026-04-24."
updated: "2026-04-23T13:19:15Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T13:09:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP)`. **Verified 6th time 2026-04-23 14:09 WAT** — query executed without error when both were quoted.

**JQL payload-size discipline.** Full 18-project `searchJiraIssuesUsingJql` returned oversize across six consecutive ticks (56,914 → 166,691 → 199,382 → 196,192 → 57,262 → now 56,684 chars across 2026-04-22 14:15 WAT → 2026-04-23 14:09 WAT). **Rule (promoted from exception to default):** for weekday work-hours ticks (08:00-18:00 WAT) the default extraction path MUST be `Agent`-delegated file-chunk reads, because bulk grooming batches are persistent — saw 48-61 items in three consecutive tick windows and 11-16 items in the other three. 14:09 WAT: 11 items returned but payload still exceeded direct-read limit; Agent-delegated extraction executed cleanly. maxResults=50 is not sufficient for these windows either; raise to 100 or accept isLast=False. `markdown` response format (vs ADF) reduces payload per item but does not eliminate oversize at 11+ item windows with task descriptions.

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

### Second-cycle situation creation gate (reinforced 2026-04-23 13:09 WAT; re-affirmed 14:09 WAT)
When a product surface records a first operational signal (e.g., AS-4995 Juliana Back office report-generation Apr 23), a second distinct-cycle signal within 7 days warrants situation-page creation. **Clarification (13:09 WAT):** "second cycle on the same product surface" means a genuinely recurring failure mode on the same sub-component. AS-4995 (Juliana Back office report generation), TDSD-6698 (Juliana Switch downtime), and AS-4404 (Juliana Card Not Present refund) are on three different sub-components (Back office, Switch, CNP refund) — the Juliana brand umbrella overlaps but the failure surfaces diverge. Do NOT create a Juliana situation page from this triad alone; watch for third distinct-cycle surface OR second cycle on Back-office-specifically OR Switch-specifically OR CNP-refund-specifically. **14:09 WAT re-affirmation:** 3rd Juliana-branded surface today (AS-4404) does not auto-trigger; sub-component diversity criterion holds.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Six Apr 22 ticks across 14:15, 16:15, 17:09, 18:09, 20:00, 22:10 WAT. Key accumulations: TDSD-6645 stall pattern (45h+ assignee silence), TDSD-6655/6661/6662 Opeyemi same-day-close comparisons (3:1 vs Dominic stall), TDSD-6688 Dominic-Awaiting-Scheme-Update workflow compound, TDSD-6630 carry across all 6 ticks (no movement), Keystone retirement candidate, TDSD-6691 Polaris outward-flows deploy awareness, TDSD-6676 Access Bank exposure. 22:10 WAT early-exit advanced last_processed to 2026-04-22T21:00:00Z.

### Tick 2026-04-23 06:10 / 07:10 / 08:10 / 09:11 / 10:09 / 11:09 / 12:09 / 13:09 WAT (condensed — see git history)

06:10 briefing tick: TDSD-6645 Dominic broke 59h15m silence with attribution-transfer to inwards payments team; TDSD-6630 72h43m silent surfaced as D2 retire-or-hold ask; TDSD-6684 new Blessing→Dominic filing (3rd in 3 days); TDSD-6638 closed. 07:10 TDSD-6692 UBA 6-min fast-cycle Jira-only (cross-source asymmetry 1st observation). 08:10 TDSD-6675/TDSD-6592 closures + AS-* bulk grooming. 09:11 ADD-4587/ADD-4584/ADD-4589 + AS Zone Switching Partnership 30-item batch + ATPP MDRS 12-item batch. 10:09 TDSD-6694 Paystack Balance + TDSD-6695 Stopgap Public Access Waiting-for-Approval + settlement reliability closures. 11:09 TDSD-6696 RC06 Verve TTP Work in Progress (first RC06 Verve surface this week) + TDSD-6506 Firewall Emergency Upgrade Implementing + TDSD-5900 Completed + AS-4854 DD Engine In Progress + TDSD-6695 transitioned to Awaiting Scheme Update. 12:09 TDSD-6630 Completed by Kabir Yusuf 11:30 WAT with zero RCA (situation retired this tick, exact Apr 14 precedent match at 78h04m silent-recovery-without-RCA) + TDSD-6697 retrospective Interswitch RC91 self-filed+self-closed (2-min) + AS-4995 Juliana Back office first surface. 13:09 TDSD-6698 Juliana Switch Downtime retrospective self-filed+self-closed + AS-4995 status update + ATPP MDRS epic expansion opener (ATPP-1710 + 1711-1718).

### Tick 2026-04-23 ~14:09 WAT — Full (weekday work-hours; Juliana 3rd surface + Firewall HA approval + MDRS epic continuation)

Window: 12:09 UTC → 13:09 UTC Apr 23 (~60min; JQL `updated > "2026-04-23 13:09"` WAT-local per timezone-discipline). Step 0 declared `level=full, rationale=weekday-work-hours-d1-d5-untriaged-active-situations-one-hour-window`. briefing-2026-04-23 already exists — not a briefing tick. Payload oversize (56,684 chars / 915 lines — Agent-delegated extraction). 11 items in-window.

**Operationally relevant deltas:**

1. **AS-4404 "Refund - Rest [Source Node] for Web Implementation Task (Card Not Present Juliana)"** — **Highest priority (P1), In Progress**, Task type. Assignee: [[Lewis Ugwu]]. Reporter: [[Kevin Ng'Eno]]. Updated 2026-04-23T13:47:02 WAT. Pre-existing ticket with status update this window (status transition details not extractable from Agent payload). **Third Juliana-branded Jira surface today** alongside AS-4995 (Back office report generation, 12:09 WAT) and TDSD-6698 (Juliana Switch Downtime, 12:32 WAT). Per Second-cycle situation creation gate (re-affirmed this tick): three surfaces on three different sub-components (Back office, Switch, CNP refund) — situation-page creation still stands down; watch for second cycle on any single sub-component or fourth distinct-surface before reconsidering. **Awareness-tier** (Highest priority but Task type + In Progress = routine dev rather than active incident). Factors: source=jira, ticket_in_progress, highest_priority, juliana_brand_3rd_surface_today, different_subcomponent_cnp_refund, second_cycle_gate_stands_down, awareness_tier.

2. **TDSD-6699 "CONFIGURATION OF HIGH AVAILABILITY ON TeamApt FIREWALL 02 and 03"** — Medium priority, **Review status** ([System] Change archetype). Assignee+Reporter: [[Olayinka Ajayi]]. Updated 2026-04-23T13:44:58 WAT. **Paired with Gmail approval thread 19dba77670436f02 at 14:11 WAT** (Fumbi Lawrence → Tolu Aina, CC Emeka Awagu + networkmanagement@teamapt.com): "Approval for HA Setup on TeamApt Prod Firewalls 02 and 03". Emeka is **CC-only, not in To** — Tolu Aina is the primary approver. Briefing-tier **Awareness** for Emeka (informational; not CTO-specific approval gate). Relates to [[TDSD-6506]] Firewall Emergency Upgrade track. Factors: source=jira+email, ticket_review_status, infrastructure_change, cto_cc_not_primary, tolu_aina_primary_approver, briefing_tier_awareness.

3. **TDSD-6693 "PENDING SETTLEMENT"** — **Done**, Medium, Task. Assignee: Oladimeji Alabi. Reporter: Chinenye Iloka. Updated 2026-04-23T13:44:24 WAT. Title references settlement but not clearly linked to [[TDSD-6645]] Monnify track (different assignee, no Blessing-Dominic pattern markers). Awareness — routine settlement closure. Factors: source=jira, ticket_completed, settlement_keyword_match, no_tdsd6645_linkage_confirmed, awareness_tier.

**Routine dev lifecycle (8 items):**

- **TCDD-1106 "Habari Pay: OTP Challenge Session Does Not Expire When OTP Is Not Entered"** — Done, High, bug fix. Assignee John Oluwole. Updated 14:08:50 WAT. Awareness (bug closure).
- **ATPP-1634 "MDRS - Backend Implement ReceiverCaseFiling Queue Processor"** — To Do, Medium, Task. Assignee Ejiro Asiuwhu. Reporter Ruth Adetunji. Updated 13:49 WAT. Awareness — MDRS epic continuation.
- **ATPP-1711-1718** (7 tasks) "MDRS - Backend/UI" suite — All To Do, Medium, various assignees (Ejiro Asiuwhu backend, Olatunbosun Olaosebikan UI). All Ruth Adetunji reporter. Updated 13:12-13:13 WAT. Coordinated epic expansion (Authentication Service, Password Policy, Token Management, Account Lockout/Security Monitoring, Forgot/Reset Password, Session Management UI, Login Page UI). Awareness — planned epic rollout continuation from earlier ATPP-1710 opener.

**Named-ticket watchlist activity (not touched in-window):**
TDSD-6645 (Dominic silence continuing ~9h47m post-04:08 WAT attribution-transfer), TDSD-6696 (Verve TTP RC06 — static since 11:09 WAT), TDSD-6684 (Awaiting Scheme Update continues), TDSD-6694 (Paystack Balance — Awaiting Scheme Update), TDSD-6695 (Stopgap Public Access — Awaiting Scheme Update), TDSD-6506 (Firewall Emergency Upgrade — Implementing; distinct ticket from TDSD-6699 Review), TDSD-6692 (UBA fast-cycle — static, cross-source tracker single-point), TDSD-6697 (Interswitch RC91 retrospective — static), AS-4995 (Juliana Back office — In Progress held).

**Cross-source asymmetry tracker status:** AS-4404 Juliana CNP Refund is Task-type P1/Highest dev work — no operational-incident Slack mirror expected. TDSD-6699 Firewall HA is a pre-planned infrastructure change — Gmail approval thread present, Slack mirror not expected. Neither contributes to tracker. **Tracker still at 1 data point.** Tracker window still open until 06:44 WAT Apr 24.

**No CTO (@Emeka Awagu) @-mentions or explicit approval asks** detected in Jira payload this window.

**Dispatch decisions:**
- No Immediate-tier Jira dispatch (no P1 markers on incidents; AS-4404 is Task-type not Incident).
- AS-4404 noted as third Juliana surface for briefing-2026-04-24 awareness.
- TDSD-6699 noted as Firewall HA Review-gate for briefing-2026-04-24 awareness.
- All routine dev deltas Awareness-tier; accumulate for briefing-2026-04-24.

**Advanced `last_processed` to 2026-04-23T13:09:00Z.**
