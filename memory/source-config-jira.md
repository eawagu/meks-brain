---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-23T05:10:00Z. 06:10 WAT Apr 23 briefing-tick Full sweep: critical overnight delta — TDSD-6645 Dominic broke 59h15m silence at 04:08 WAT with attribution-transfer to inwards payments team (status transition: Awaiting Scheme Update → Escalated). TDSD-6630 zero overnight movement; comment silence now ~72h43m (past 48h implicit-retire threshold, new high watermark). TDSD-6684 new Blessing-filed ticket to Dominic. TDSD-6638 closed at 02:55 WAT. TDSD-6689/TDSD-6676/TDSD-6691 no movement. Decision items D1 (attribution-transfer) + D2 (NIBSS DD retire-or-hold) carried into briefing-2026-04-23."
updated: "2026-04-23T05:49:41Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T05:10:00Z"
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

**JQL payload-size discipline (added 2026-04-22 14:15 WAT after oversize return).** Full 18-project `searchJiraIssuesUsingJql` returned 56,914 chars / 931 lines in a single call — exceeded practical context envelope. **Rule:** for tick sweeps with windows > 24h, query projects individually (iterate the scope list) or restrict by fields at source. Do not pull the union payload unconditionally. Applies to any tick with `updated > -24h` comparable window length.

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
