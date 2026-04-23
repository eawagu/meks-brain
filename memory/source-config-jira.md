---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T15:11:00Z. 16:11 WAT Apr 23 Full tick: Agent-delegated payload (49 items, 214KB oversize). **2 Immediate candidates reclassified to Briefing** (TDSD-6702 NIBSS DD DOWNTIME self-closed in 49min silent-no-RCA, Medium → pattern-compound on [[NIBSS]] entity; TDSD-6703 3DS HTTP 422 fresh-filing, Medium → first observation under second-cycle gate). **4 Briefing-tier:** TDSD-6694 Paystack Balance Resolved, AS-4995 Juliana Back office Done, TDSD-6699 Firewall HA Awaiting implementation gate-pass, TDSD-6701 TACCS DB Awaiting Scheme Update. 43 Awareness routine dev deltas (MDRS epic continuation). Cross-source asymmetry tracker codification gate CROSSED (see source-config-slack)."
updated: "2026-04-23T15:24:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T15:11:00Z"
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

**JQL reserved-word handling.** Project keys `ADD` and `AS` are reserved JQL words and must be quoted in queries: `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP)`. **Verified 8th time 2026-04-23 16:11 WAT** — directive holds through every JQL write this week.

**JQL payload-size discipline.** Full 18-project `searchJiraIssuesUsingJql` returned oversize across seven consecutive ticks (56,914 → 166,691 → 199,382 → 196,192 → 57,262 → 56,684 → 214,831 chars across 2026-04-22 14:15 WAT → 2026-04-23 16:11 WAT). **16:11 WAT: 49 items returned in 1h window, payload 214KB oversize → Agent-delegated file-chunk extraction used (subagent returned classification summary).** Rule (holds): for weekday work-hours ticks (08:00-18:00 WAT) the default extraction path SHOULD be `Agent`-delegated when payload is oversize. Small windows (~1h) with low item counts (≤10) can be direct-read — but weekday MDRS epic grooming batches routinely push 40+ items, so assume delegation.

**JQL date-filter-timezone discipline (added 2026-04-22 16:15 WAT).** JQL `updated >= "YYYY-MM-DD HH:mm"` is evaluated in the Jira site's timezone (Africa/Lagos for teamapt.atlassian.net), NOT UTC. When filtering relative to a UTC `last_processed` stamp, either pass the WAT-local time equivalent or accept that the query may return items updated 1 hour before the stated UTC cutoff and post-filter on the assistant side.

## Directives

### Priority model
- Service desk tickets (TDSD) with P1/outage markers — Immediate-tier candidates.
- Software project tickets with CTO approval gate — Briefing-tier.
- Routine dev/QA transitions — Awareness-tier.
- **Jira [System] Incident Medium-or-higher without Slack P1 mirror** — classify per config-salience Immediate triggers (if "down"/"outage"/"breach"/"compromised" keyword in summary → still only Immediate when Slack P1 filed; Medium-priority incident-type alone is Briefing-tier). See source-config-slack Cross-source asymmetry tracker — codification gate crossed 2026-04-23 16:11 WAT; directive draft pending briefing-2026-04-24 Decision.

### Active-situation entity match
Match updated tickets against active situation pages. Overlapping entity or keyword → elevate to Briefing-tier minimum.

### Out-of-scope surfacing via Layer 1 email
When a Jira ticket from an out-of-scope project (not in the 18-project scope above) surfaces to the user via Layer 1 Gmail (To:me) approval request, fetch the ticket metadata and treat per normal tier classification. Record in notes so the next sweep can follow the ticket without re-discovery. Example: TISD-480 surfaced 2026-04-20 via approval email.

### Second-cycle situation creation gate (reinforced 2026-04-23 13:09 WAT; held through 16:11 WAT)
When a product surface records a first operational signal, a second distinct-cycle signal within 7 days warrants situation-page creation. **Same-sub-component criterion holds** — Juliana Back-office / Switch / CNP-refund are distinct surfaces. 3DS HTTP 422 (TDSD-6703) is the first 3DS surface this week — does NOT warrant page yet; watch for second 3DS cycle.

### NIBSS DD cycle-4 pattern (observed 2026-04-23 16:12 WAT)
TDSD-6702 (Frances Omelu self-filed 15:23 WAT, self-closed 16:12 WAT, 49min, silent-no-RCA, Medium Incident) is the 4th NIBSS DD operational cycle in 9 days. Silent-close-without-RCA now matches 3 of 4 cycles (75%). Compounded onto [[NIBSS]] entity page. **Decision to NOT create a new situation page** for TDSD-6702: same-day self-close makes it historical-at-filing — no developing condition to monitor. If cycle 5 arrives within 48h, escalate to synthesis candidate ("NIBSS DD silent-close-without-RCA pattern") instead of a per-cycle situation page.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

### Tick 2026-04-22 (condensed — full details in git history)

Six Apr 22 ticks across 14:15, 16:15, 17:09, 18:09, 20:00, 22:10 WAT. Key accumulations: TDSD-6645 stall pattern (45h+ assignee silence), TDSD-6655/6661/6662 Opeyemi same-day-close comparisons, TDSD-6688 Dominic-Awaiting-Scheme-Update workflow compound, TDSD-6630 carry across all 6 ticks, Keystone retirement candidate, TDSD-6691 Polaris outward-flows deploy awareness, TDSD-6676 Access Bank exposure. 22:10 WAT early-exit advanced last_processed to 2026-04-22T21:00:00Z.

### Tick 2026-04-23 06:10–15:11 WAT (condensed — see git history)

06:10 briefing tick: TDSD-6645 Dominic broke 59h15m silence with attribution-transfer to inwards payments team; TDSD-6630 72h43m silent surfaced as D2; TDSD-6684 new Blessing→Dominic filing. 07:10 TDSD-6692 UBA 6-min fast-cycle Jira-only (cross-source asymmetry tracker opened). 08:10 TDSD-6675/TDSD-6592 closures + AS-* bulk grooming. 09:11 ADD-4587/ADD-4584/ADD-4589 + AS Zone Switching Partnership 30-item batch. 10:09 TDSD-6694 Paystack Balance + TDSD-6695 Stopgap Public Access. 11:09 TDSD-6696 RC06 Verve TTP + TDSD-6506 Firewall Emergency Upgrade + TDSD-5900 Completed + AS-4854 DD Engine In Progress. 12:09 TDSD-6630 Completed 11:30 WAT zero RCA (retired); TDSD-6697 retrospective Interswitch RC91 2-min self-filed+self-closed; AS-4995 Juliana Back office first surface. 13:09 TDSD-6698 Juliana Switch Downtime retrospective; ATPP MDRS epic expansion. 14:09 TDSD-6699 Firewall HA (Tolu Aina primary approver); AS-4404 Juliana CNP Refund Highest/Task; TDSD-6693 Pending Settlement Done; TCDD-1106 Habari Pay OTP Done. 15:11 TDSD-6699 past approval gate (Review → Awaiting implementation); TDSD-6701 new Awaiting Scheme Update; TDSD-6700 new Change; TDSD-6680 Palmpay re-activation. 10 items in-window; direct-read payload fit.

### Tick 2026-04-23 ~16:11 WAT — Full (Agent-delegated; 49 items; Ecobank, NIBSS DD cycle-4, 3DS HTTP 422)

Window: 14:11 UTC → 15:11 UTC Apr 23 (~60min; JQL `updated >= "2026-04-23 15:11"` WAT-local). Payload 214,831 chars oversize → delegated to Agent subagent, returned classification summary.

**Operationally significant deltas:**

1. **TDSD-6702 NIBSS DD DIWNTIME | 20260423** (Medium, [System] Incident). Reporter+assignee [[Frances Omelu]] (self-filed+self-closed). Created 15:23:11 WAT, transitioned to Completed at 16:12:10 WAT by same Frances Omelu — **~49min duration, silent-close-no-RCA**. Description: standard customer-facing NIBSS-downtime template ("We are currently experiencing issues with direct debit transactions... challenges originate from NIBSS"). **4th NIBSS DD operational cycle in 9 days; 3rd silent-close-no-RCA.** Briefing-tier Awareness (pattern compound); NOT a new situation page (historical at tick, same-day close). Cross-source asymmetry tracker 2nd data point — no Slack #teamapt-tech-operations P1 mirror at 16:11 WAT tick. Factors: source=jira, ticket_incident_medium, self_filed_self_closed, silent_close_no_rca, pattern_compound_4th_cycle_9_days, cross_source_asymmetry_jira_only, briefing_tier_awareness.

2. **TDSD-6703 3ds is currently failing with HTTP 422** (Medium, [System] Incident). Reporter+assignee [[Olamide Ajibulu]] (self-filed). Created 16:07:01 WAT, Updated 16:11:06 WAT, status **INITIAL REVIEW** — 4min active at tick, still in progress. Description: "This is being addressed by the TSE." **First 3DS HTTP 422 observation** (second-cycle gate does NOT fire — below 2-cycle threshold). Briefing-tier for briefing-2026-04-24 (emerging surface, watch for recurrence within 7 days). Cross-source asymmetry tracker 3rd data point — no Slack #teamapt-tech-operations P1 mirror at 16:11 WAT tick. Factors: source=jira, ticket_incident_medium, 3ds_acs_surface, fresh_filing_4min_active, tse_addressing, cross_source_asymmetry_jira_only, briefing_tier_first_observation.

3. **TDSD-6694 PAYSTACK BALANCE ADJUSTMENT APRIL 23RD 2026** — status Resolved at 15:40:54 WAT. Was Awaiting Scheme Update at 10:09 WAT; ~5h30m to resolution. Awareness.

4. **AS-4995 Pre pilot — Inability to generate Report for 23rd April on the Juliana Back office** — status Done at 15:34:30 WAT. Wycliffe Ochieng' assignee. Second Juliana closure today (AS-4995 Back office + AS-4404 CNP Refund Highest pending) — sub-component diversity gate still holds, no situation page. Awareness.

5. **TDSD-6699 Firewall HA** — updated 15:16 WAT (minor status resync); already Awaiting implementation since 15:11 WAT. Awareness.

6. **TDSD-6701 TACCS DB Settlement** — Awaiting Scheme Update at 15:13 WAT; already noted at 15:11 WAT. Awareness.

**Routine dev deltas (43 items):** MDRS epic continuation backend + frontend (ATPP-16xx and ATPP-17xx sub-tickets), legacy FCMB account switch continuation. All Medium, mostly To Do/In Progress. No CTO approvals, no Ecobank/RC91 new Jira filings (confirming Ecobank cycle-B is Slack+email only from Jira's perspective — no TDSD ticket yet), no new P1 issuer pattern. Named-ticket watchlist: TDSD-6645 (Dominic silence ~12h05m post-04:08 WAT attribution-transfer; under 48h threshold); TDSD-6684/6688 Awaiting Scheme Update hold; TDSD-6696 Verve TTP RC06 static since 11:09 WAT; others unchanged.

**Dispatch decisions:**
- No Immediate-tier Jira dispatch (TDSD-6702/6703 Medium, not formal P1; Ecobank Immediate routed via Slack+email already).
- Briefing-2026-04-24 candidates: TDSD-6703 (new 3DS surface); cross-source-asymmetry-tracker codification directive (per source-config-slack).
- [[NIBSS]] entity page updated with NIBSS DD silent-close pattern table (4 cycles, 3 silent-close).

**Advanced `last_processed` to 2026-04-23T15:11:00Z.**