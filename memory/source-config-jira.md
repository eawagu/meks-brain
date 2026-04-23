---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T05:10:00Z. 06:10 WAT Apr 23 briefing-tick Full sweep: critical overnight delta — TDSD-6645 Dominic broke 59h15m silence at 04:08 WAT with attribution-transfer to inwards payments team (status transition: Awaiting Scheme Update → Escalated). TDSD-6630 zero overnight movement; comment silence now ~72h43m (past 48h implicit-retire threshold, new high watermark). TDSD-6684 new Blessing-filed ticket to Dominic. TDSD-6638 closed at 02:55 WAT. TDSD-6689/TDSD-6676/TDSD-6691 no movement. Decision items D1 (attribution-transfer) + D2 (NIBSS DD retire-or-hold) carried into briefing-2026-04-23."
updated: "2026-04-23T07:20:38Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T07:10:00Z"
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

**JQL payload-size discipline (added 2026-04-22 14:15 WAT after oversize return).** Full 18-project `searchJiraIssuesUsingJql` returned 56,914 chars / 931 lines in a single call — exceeded practical context envelope. **Rule:** for tick sweeps with windows > 24h, query projects individually (iterate the scope list) or restrict by fields at source. Do not pull the union payload unconditionally. Applies to any tick with `updated > -24h` comparable window length. **Reinforced 2026-04-23 08:10 WAT:** 1h window at Full-tick still returned 64,872 chars on 15 items due to ADF-expanded descriptions/comments — probe Jira results via jq post-filter (structure: `{issues: {totalCount, nodes: [{...}]}}`) rather than reading raw MCP output when result > ~30KB.

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

### Tick 2026-04-20 17:09 WAT — Full (condensed)

**TDSD-6645 "Urgent Pending Settlement – Re-trigger Required" — P1 Highest NEW (16:52 WAT).** Filed by [[Blessing Obioha]]; assignee [[Dominic Usiabulu]]; VA 6021082035 credit-debit-reversal blocks MNFY settlement. Dominic 1min TTFR ("reviewing"). SLA open 72h (breach 2026-05-01 16:52 WAT). New situation page [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] spawned. No Immediate dispatch.

**TDSD-6643 Union Bank RC91 cycle 2** — 12m auto-recovery. Within-envelope fast-cycle. 7th cycle in 9 days.

**TDSD-6627 NIBSS Disbursements** (distinct product from TDSD-6630 NIBSS DD mandate) — Completed. Awareness.

**TDSD-6630 NIBSS DD** — silence extending (any-update ~8h51m, comment ~11h42m from 05:27 WAT). Precedent: NIBSS DD Apr 14 retired after 47h silence.

Out-of-scope via Gmail Layer 1: TISD-480 ArgoCD CVE Awaiting Control Approval + TDSD-6203 ISO Managers — Briefing-tier Decision candidates.

### Tick 2026-04-22 (condensed — full details in git history)

Six Apr 22 ticks across 14:15, 16:15, 17:09, 18:09, 20:00, 22:10 WAT. Key accumulations:

**TDSD-6645 stall pattern (14:15 WAT):** 45h+ assignee silence, 2 chase pings unanswered, status moved Awaiting Scheme Update. Pattern anomaly: TDSD-6655 + TDSD-6661 (Opeyemi-assigned, same-day close) vs. TDSD-6645 (Dominic-assigned, stall). Two variables differ (scope AND assignee); carry-forward planned.

**TDSD-6655 / TDSD-6661 / TDSD-6662** (17:09 WAT tick added TDSD-6662 as 3rd data point) — all Opeyemi-assigned same-day closes. 3:1 Opeyemi-closes vs. Dominic-stall in Urgent-Pending-Settlement family. Strengthens assignee-variable side of TDSD-6645 pattern anomaly.

**TDSD-6688 "UPDATE OF REJECTED REFUND STATUS" (16:15 WAT surfacing):** Dominic-assigned, also Awaiting Scheme Update. Dominic active elsewhere — workflow-discipline reframe added to TDSD-6645 situation ("Dominic-is-active-just-silent-on-TDSD-6645").

**TDSD-6687 NIP Disbursement Completed + TDSD-6689 Stanbic Participant 8AM settlement WIP NEW (16:15 WAT):** TDSD-6689 = new Stanbic failure mode (scheduled-settlement-window, not RC91-at-switch). Watchlist; no situation spawn pending further ticks.

**Keystone retirement candidate (17:09 WAT):** TDSD-6615 Completed (historical Apr 20 09:54 WAT ticket closed 16:31 WAT). Combined with backfilled TDSD-6633 confirmation from Apr 20 tick, both current + historical Keystone settlement tickets closed. Retirement candidate at briefing-2026-04-23.

**TDSD-6691 NEW High-priority Polaris outward-flows deploy (18:09 WAT Skim):** June Johnson / Saheed Yusuf. 3 bundled changes — OTP Resend Backoffice + SmartDet NSS Fix + **API Settlement Agent for Polaris outward**. Does NOT address B1 Polaris RC91 inbound P1 (different direction). Standard change path Review status. Awareness-tier.

**TDSD-6676 Access Bank exposure NEW (20:00 WAT Skim):** WIP, entity-matches [[Access Bank — Multi-Track Failures]]. "Exposure on" framing ambiguous (risk-assessment vs active remediation). Watch-next-tick for scope disambiguation.

**TDSD-5365 Monnify Dev Doc Deploy (20:00 WAT Skim):** Completed, routine.

**TDSD-6630 NIBSS DD carry across all 6 Apr 22 ticks:** No movement. Comment silence grew 56h48m (14:15) → 58h48m (16:15) → 59h42m (17:09) → 60h42m (18:09) → 62h32m (20:00) → 63h42m (22:10 WAT). User-deferred. Retirement decision deferred to briefing-2026-04-23. Retirement posture bounced from rising (16:15) → reverted-to-hold (17:09 via #monieworld-monnify customer-facing signal) → hold (rest of day).

**22:10 WAT early-exit:** Zero TDSD deltas in 20:00 → 22:10 WAT window. Combined with Slack zero-deltas triggered tick early-exit. last_processed advanced to 2026-04-22T21:00:00Z.

**Skim-scope caveat carryforward:** 18:09, 20:00, 22:10 WAT ticks queried TDSD only (17 software projects not checked). Next Full tick must re-extend to 18-project scope.

**Out-of-scope carryforward all day (Gmail MCP dark):** TISD-480 + TDSD-6203 unverifiable. Brain state unchanged. Gmail silence ~54h at end-of-day.

### Tick 2026-04-23 ~06:10 WAT — Full briefing-tick sweep (overnight; 18-project scope)

Window: 22:10 WAT Apr 22 → 06:10 WAT Apr 23 (~8h; 21:00 UTC Apr 22 → 05:10 UTC Apr 23). Step 0 declared `level=full, rationale=briefing-tick`. Full 18-project scope re-extended per skim-scope-caveat carryforward.

**Critical overnight delta — TDSD-6645 Dominic broke 59h15m silence.**
- **04:08 WAT Apr 23 Dominic comment:** "MIT|HYD|100004250509160823132420308489|1920873578377506816_CREDIT_0_RVSL was triggered by the inwards payments team, we will their review to understand why the reversal was triggered even though we have settled the merchant."
- **Status transition: Awaiting Scheme Update → Escalated.**
- **Attribution mechanism:** Dominic identifies the credit-debit-reversal that insufficient-funded the VA was triggered by a different Moniepoint internal team (inwards payments), not by scheme/NIBSS. Reframes the 3-day investigation — assignee silence was NOT scheme-upstream blocked, it was internal-team cross-reference blocked. The original hypothesis ("punted upstream to scheme/NIBSS and stopped internal comms") is partially contradicted.
- **Implication for pattern anomaly:** Workflow-discipline framing (TDSD-6688 / TDSD-6662 comparison) partially re-validates — Dominic's Awaiting Scheme Update usage may have been imprecise. More fundamentally: Dominic now punts to that team without clear ownership transfer — hot-potato handoff pattern. Root cause still unknown; accountability now diluted.
- **Options surfaced in briefing-2026-04-23 D1:** (a) accept handoff as progress / (b) chase via Oladapo (workflow-discipline issue) / (c) direct-ask Dominic for handoff documentation before closing out his involvement.
- Situation updated: [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]].

**Critical overnight absence — TDSD-6630 NIBSS DD zero movement.**
- Comment silence now **~72h43m** (from 05:27 WAT Apr 20 Oladapo comment). Any-update silence ~69h52m.
- **23h past Apr 14 NIBSS DD 47h implicit-retire precedent** — new high watermark.
- **Connectivity-layer hypothesis ruled out:** NIBSS PTSA thread closed at 18:40 WAT Apr 22, leased-line stable 10h47m+ through overnight, TDSD-6630 still silent. If silence were blocked on PTSA connectivity, TDSD-6630 should have moved once PTSA stabilized. Silence is ticket-specific (owner / workstream / scheme-side), not network-infrastructure-blocked.
- **Options surfaced in briefing-2026-04-23 D2:** (a) retire per bias-toward-retiring principle / (b) hold 24h to 05:27 WAT Apr 23 comment-silence checkpoint / (c) re-dispatch via Oladapo (72h+ silence on Highest priority is operationally abnormal).
- Situation updated: [[NIBSS DD — Downtime P1 Apr 20]].

**New-this-tick — TDSD-6684 "Multiple MIT transactions pending for over 2 weeks".**
- Filed 03:51 WAT Apr 23 by [[Blessing Obioha]]; assignee [[Dominic Usiabulu]]; component Monnify_settlements; Highest priority.
- **Third Blessing→Dominic escalation in 3 days** (Apr 20 TDSD-6645, Apr 21 chase, Apr 23 TDSD-6684). Blessing has escalated to ticket-based accumulation to force visibility on Dominic's queue.
- Substance: pending MIT transactions aged 2+ weeks — broader cohort of same root pattern as TDSD-6645.
- Classification: Awareness-tier, briefing-2026-04-23 A2 (D1 carries operational ask).
- Added to [[Monnify Settlements — TDSD-6645 VA Reversal Blocking Settlement Apr 20]] as 3rd data point.

**Housekeeping closures (Awareness-tier):**
- **TDSD-6638 Merchant Settlement disparity account 0000221603** — Completed 02:55 WAT Apr 23 (filed Apr 20). Closes ~3-day pending disparity carryforward from Apr 20 17:09 WAT tick.
- No other overnight TDSD deltas.

**Software projects re-extended (17 projects):** No operational deltas of Briefing-tier or higher. Routine dev/QA transitions across ATPG, ATPP, AS, ADD, TCDD — all Awareness with no active-situation entity overlap worth callout.

**Carryforward state (no changes):**
- **TDSD-6689** Stanbic Participant 8AM — still WIP (watchlist since 16:15 WAT Apr 22; now ~14h45m). Assignee-engaged holds. Awareness.
- **TDSD-6691** Polaris outward-flows deploy — still Review. Pre-deploy approval gate holds.
- **TDSD-6676** Access Bank exposure — still WIP; scope-disambiguation watch continues. Awareness.

**Out-of-scope carryforward (Gmail MCP dark):** TISD-480 + TDSD-6203 still unverifiable. Gmail silence now ~61h since last_processed 2026-04-20T16:09:00Z. Still below 7-day absence-of-signal threshold; B2 carryforward via briefing-2026-04-23 D4 holds.

**Dispatch decisions this tick:**
- No Immediate-tier dispatches — TDSD-6645 attribution-transfer is D1 three-option user ask, TDSD-6630 retirement is D2 three-option user ask (too-consequential for autonomous retirement on a 72h+ Highest ticket despite bias-toward-retiring), TDSD-6684 is A2 awareness only.
- Briefing-2026-04-23 composed + created via MCP (5 D + 5 A).
- briefing-2026-04-22 superseded via MCP.
- Situation pages updated: TDSD-6645, TDSD-6630, NIBSS PTSA (10h47m stable confirmation), Keystone (retired per pre-committed criterion — zero overnight signals).

**Advanced `last_processed` to 2026-04-23T05:10:00Z.**

### Tick 2026-04-23 ~07:10 WAT — Skim (post-briefing window)

Window: 05:10 UTC → 06:10 UTC Apr 23 (~1h). Step 0 declared `level=skim, rationale=post-briefing-42m-window-pre-work-hours`. Delta query via `searchJiraIssuesUsingJql` with `updated >= "2026-04-23 05:10"` (JQL date-filter in WAT per timezone-discipline directive; equivalent to 04:10 UTC, intentionally wider than last_processed 05:10 UTC — post-filter on assistant side using ticket update timestamp to exclude pre-cutoff).

**One in-window delta — TDSD-6692 UBA "Failing generally" fast-cycle.**
- Filed 06:38 WAT Apr 23 by [[Daniel Armstrong]] (self-filed, self-assigned), Medium priority, [System] Incident. Title: "Uba | Failing generally | 20260421" (date-stamp in title template; actual creation 2026-04-23).
- Six-minute lifetime 06:38 → 06:44 WAT. Seven comments all by Daniel Armstrong: 5 diagnostic screenshots (06:39–06:42 WAT), 1 RCA ("Uba had network issues, their services could not reach their database"), 1 closure ("This issue has been fixed by the bank"). Status: Completed.
- Classification: Awareness-tier (already closed at observation, Medium priority, bank-auto-resolved, no CTO action path). Accumulates for briefing-2026-04-24.
- Factors: source=jira, ticket_auto_closed_within_6min_lifetime, bank_root_cause_attribution=database_connectivity, pattern_compounding_uba_multi_failure_mode, no_slack_mirror_jira_only_signal, awareness_tier.
- State update: [[UBA Bank — RC91 P1 Apr 17]] situation received delta line (skim-tick append; narrative-rewrite carryforward noted — page is stale at Apr 17–18 era, missing Apr 20–22 cycles including Apr 21 RC96 via TDSD-6671).

**TDSD-6691 caught by query but NOT a new delta.** Updated 05:50 WAT (2026-04-23T04:50 UTC) — BEFORE last_processed 05:10 UTC (06:10 WAT). Already in pre-briefing state. Verified via ticket update timestamp — post-filter correctly dropped it. Status unchanged: Review (pre-deploy approval gate).

**Zero other operational deltas.** No follow-on activity on TDSD-6645 (Dominic silent post-04:08 WAT attribution-transfer; ~3h02m quiet at tick — within overnight-to-morning expected quiet). No movement on TDSD-6630 (NIBSS DD silence compounds — ~73h43m comment-silence from 05:27 WAT Apr 20 at tick time; carryforward to briefing-2026-04-24 if D2 user-held).

**Cross-source asymmetry observation (shared with source-config-slack).** TDSD-6692 surfaced exclusively on the Jira sweep — no Slack mirror. Daniel Armstrong filed and closed within 6 min without posting to #teamapt-tech-operations. Single-instance observation; no codification yet.

**Dispatch decisions:**
- No Immediate-tier dispatch (TDSD-6692 already closed, Medium, no active P1).
- Non-briefing tick — Awareness accumulation only (next briefing 2026-04-24 06:00 WAT).
- Situation updated: UBA-RC91 tracker.

**Advanced `last_processed` to 2026-04-23T06:10:00Z** (07:10 WAT).

### Tick 2026-04-23 ~08:10 WAT — Full (weekday work-hours opener; 18-project scope)

Window: 06:10 UTC → 07:10 UTC Apr 23 (~1h). Step 0 declared `level=full, rationale=weekday-active-p1-density`. Delta query via `searchJiraIssuesUsingJql` with `updated >= "2026-04-23 06:10"` (WAT per timezone-discipline directive = 05:10 UTC, intentionally wider than last_processed 06:10 UTC) — post-filter on assistant side. 18-project scope.

**Payload oversize encountered.** 15-item result returned 64,872 chars of ADF-expanded content. Resolved by reading structured extract via `jq` post-filter against saved tool-result file (key/updated/summary/status/priority/type/assignee/reporter projection only). Reinforces payload-size-discipline directive — even at 1h Full-tick window, raw MCP output can exceed context budget when ADF descriptions/comments are expanded. Post-filter projection via jq is the reliable escape hatch.

**Three TDSD deltas in window:**

1. **TDSD-6675 "PENDING SETTLEMENT" — Closed 07:55 WAT by [[Opeyemi Ahmed]], reporter [[Chinenye Iloka]], Medium.** Adjacent-pattern observation for TDSD-6645 situation: 4th Opeyemi-closed settlement ticket this week extends the "Opeyemi-closes-settlement-fast" signal. **Weak 1:1 extension** — different ticket template ("PENDING SETTLEMENT" not "Urgent Pending Settlement – System Failure"), different reporter (Chinenye not Blessing). Recording here as adjacent-pattern tick note, **not** as TDSD-6645 situation-page delta, to avoid conflating templates and over-strengthening the 3:1 assignee-variable evidence. If TDSD-6645 briefing-2026-04-24 carryforward warrants narrative rewrite, the soft extension can be incorporated then. Factors: source=jira, ticket_closed, adjacent_pattern_observation, different_template_and_reporter_than_tdsd6655_family, awareness_tier.

2. **TDSD-6592 "Kafka Monnify Live datasource issue" — Completed 07:57 WAT by [[Kabir Yusuf]] (self-filed, self-assigned), Medium, [System] Incident.** Long-tail close — ticket is Apr 14-era (pre-briefing-2026-04-15 memory). No active-situation entity match at present; does not link to current Monnify settlement narrative (Kafka datasource layer vs. VA-reversal settlement layer). Routine closure, Awareness-tier. Factors: source=jira, ticket_closed, long_tail_apr14_era, no_active_situation_match, awareness_tier.

3. **AS-* bulk grooming (12 items) — June Johnson + Opeyemi Animashaun board grooming on Zone Switching Partnership go-live prep.** AS-4958 Epic "3rd Party Integration - Zone" updated 08:11 WAT + 11 related tasks updated 08:03-08:04 WAT (AS-4854 DD Engine credits config In Progress; AS-2343 3DS Directory Server monitoring In Progress; AS-3004 Production Go-live approval Todo; AS-2794 Production interchange/routing/switch setup Todo; AS-3005 Card-not-present API endpoints integration Todo; AS-3006 Web E2E pilot functional testing Todo; AS-2793 Production encryption key exchange/import Todo; AS-3259 UI modification for new merchant onboarding Todo; AS-2905 Scope of work sign-off In Progress; AS-2662 Acquirer processor onboarding pack In Progress; AS-2917 PROD Change Approval Board Todo). All Medium priority, routine task progression or labeling updates. No active-situation entity match. Factors: source=jira, bulk_grooming_batch, project=AS_zone_switching_partnership, no_active_situation_match, awareness_tier.

**TDSD-6692 (UBA fast-cycle)** — caught by query at 06:44 WAT update (05:44 UTC). 05:44 UTC < 06:10 UTC last_processed, so **pre-cutoff, already captured in 07:10 WAT skim tick**. Post-filter correctly dropped it from this tick's new-deltas set.

**TDSD-6630 / TDSD-6645 no follow-on movement.** TDSD-6645 Dominic silent 4h02m post-04:08 WAT attribution-transfer — within expected morning-hours quiet. TDSD-6630 comment silence now ~74h43m (from 05:27 WAT Apr 20) — compounds but no new delta; retirement decision still user-held in briefing-2026-04-23 D2.

**Carryforward state (unchanged):** TDSD-6689 Stanbic Participant 8AM settlement WIP (~16h45m since surface); TDSD-6691 Polaris outward-flows deploy Review (pre-deploy approval gate); TDSD-6676 Access Bank exposure WIP.

**Out-of-scope carryforward (Gmail MCP dark):** TISD-480 + TDSD-6203 still unverifiable. Gmail silence ~64h. B2/D4 carryforward holds.

**Dispatch decisions:**
- No Immediate-tier dispatch (all in-window deltas Awareness-tier).
- Non-briefing tick — all Awareness items accumulate for briefing-2026-04-24.
- No situation-page updates (TDSD-6675 intentionally not applied to TDSD-6645 situation per adjacent-pattern-observation discipline; TDSD-6592 has no active-situation match; AS-* bulk has no active-situation match).

**Advanced `last_processed` to 2026-04-23T07:10:00Z.**
