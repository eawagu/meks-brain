---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-25T14:10:00Z (15:10 WAT). 15:10 WAT Apr 25 skim-tick: zero deltas across both Layer A (TDSD service_desk) and Layer B (software). Three consecutive zero-delta skim ticks (13:10/14:10/15:10 WAT)."
updated: "2026-04-25T14:20:35Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T14:10:00Z"
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
| TeamApt Payment Switch Engine | TPSE | software |
| TeamApt Dev | TD | software |
| TeamApt Messaging | TM | software |
| TeamApt Web Portal | TWP | software |
| Atlas | ATLAS | software |
| TeamApt DevOps | TDEV | software |
| TeamApt Access Vault | TAV | software |
| ATS | ATS | software |
| NIBSS | NIBSS | software |
| OPS | OPS | software |
| NUS | NUS | software |
| NSS | NSS | software |

Note: `ADD` and `AS` are JQL reserved words — must be quoted in query: `project in ("ADD", "AS", ...)`.

## Directives

### Priority model
- **Archetype signals:** service_desk (TDSD) = operational incidents (Immediate/Briefing tiers); software projects = dev work (mostly Awareness unless P1/P0).
- **Layer A — TDSD service_desk:** surface all P1/Highest/Critical priority, all status transitions on active-situation entities, all new ticket filings matching active situations.
- **Layer B — Software projects:** heuristic — surface P1/P0, Blocker priority, status transitions on pattern-tracked epics (MDRS, Harness migration, CoralPay), tickets touching entities in developing situations.
- **Layer C — Skip list:** low-signal ticket patterns — see Skip list section.

### Salience factors
- `priority=<level>` — Highest/Critical > High > Medium > Low. P1 = Immediate unless resolved fast-cycle.
- `status_transition=<from→to>` — Completed/Resolved/Done = resolution signal; Awaiting Scheme Update = potential stall; Escalated = owner change.
- `active_situation_match=<situation-page>` — ticket names an entity tracked in a developing situation.
- `assignee=<user>` — Dominic routing to Awaiting Scheme Update = workflow-discipline pattern (tracking).
- `archetype=<service_desk|software>` — service_desk tickets default to higher salience.

### Active-situation checkpoint re-verification (post 2026-04-25 13:10 WAT TDSD-6690 staleness)
When the source-config trace describes an active-situation ticket's state in narrative shorthand (e.g., "still at approval gates", "still WIP", "still Escalated"), MUST re-verify the description against the live `status` field (and `statusCategory.key`) every full briefing-tick. NEVER propagate a narrative description from a prior tick without checking the current Jira state — descriptions go stale silently when the ticket transitions and prior-tick text is copied forward. Trigger: TDSD-6690 was described as "still at approval gates" across briefing-2026-04-24 D3, briefing-2026-04-25 D4, and four prior source-config-jira tick notes — but Jira state was `status=Completed` (statusCategory=`done`) since 2026-04-22T16:58 WAT (Ekene Udodi "Done" comment, 67h+ ago at the 13:10 WAT tick that caught this). Resolution=null caveats the closure (informal-close-without-formal-authorization candidate), but statusCategory=done is the authoritative bucket signal.

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > "<last_processed>" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "<last_processed>" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors.
4. **Client-side UTC filter** — Jira JQL interprets the `"YYYY-MM-DD HH:MM"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

## Notes

### last_processed 2026-04-25T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (10min late), zero deltas across both layers

15:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=quiet-saturday-prior-2-ticks-zero-deltas-active-situations-watching). Window 13:10:00Z → 14:10:00Z = 1h.

**Broad sweep — JQL `updated >= "2026-04-25 14:10" AND project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP, AVN, ECT, AUM, ASKB, AAS, NM, AMB, AGB, AOTS, AWQA, AGBS, ASD) ORDER BY updated DESC` returned 0 issues.** Layer A (TDSD service_desk): 0 deltas. Layer B (software): 0 deltas.

**Active-situation checkpoints (skim-tick scope per directive — full re-verification deferred to next briefing tick):**
- TDSD-6645 (Monnify VA reversal) — still Escalated, ~59h47m Dominic silence (1h advance from 14:10 WAT prior tick).
- TDSD-6699 (Firewall HA) — still Awaiting implementation (~48h at gate, 1h advance).
- TDSD-6716 (NIBSS PTSA RC91) — still Work in progress; NIBSS bilateral 20h+ silent (under 48h threshold).
- TDSD-6690 (Account Switch Reports Stopgap) — `status=Completed` since Apr 22 16:58 WAT per 13:10 WAT prior-tick correction; competing-interpretation framework holds (Jira-API-truth read parsimonious; resolution=null caveat).
- TDSD-6711, TDSD-6727, TDSD-6726, TDSD-6728 — all Completed in prior ticks; no new activity.

No Immediate dispatch from this Jira sweep. Three consecutive zero-delta skim ticks (Layer A, 13:10/14:10/15:10 WAT — Layer B had 2 deltas at 14:10).

Factors: `source=jira`, `skim_tick`, `saturday_afternoon`, `layer_a_zero_deltas`, `layer_b_zero_deltas`, `no_immediate_dispatch`, `tdsd6645_59h47m_dominic_silence_unchanged`, `quiet_weekend_window`, `three_consecutive_zero_delta_skim_ticks_layer_a`.

### last_processed 2026-04-25T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (10min late), Layer A 0 deltas + Layer B strict 2 deltas (Fatai Ibrahim DD cluster) + 3 broad-sweep Todo/active-state captures discarded

14:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend-afternoon-active-p1-monitoring-post-quiet-13_10-tick). Window 12:10:00Z → 13:10:00Z = 1h.

**Broad sweep — JQL `project in (TDSD, TCDD, ATPG, "ADD", "AS", TPP, MNFY, MMI, MFY, MPB, MPM, MOR, MOM, MPG, MFR, MFC, MAA, MAS) AND updated >= "2026-04-25 12:10"` returned 5 issues.** All in software-archetype projects; no TDSD service_desk hits.

**Layer A (TDSD service_desk): 0 deltas.** No new ticket filings, no priority transitions, no active-situation entity matches in TDSD.

**Layer B strict (per directive — Highest/Blocker/Critical priority OR status transition to Done/Resolved/Completed/Escalated): 2 deltas:**

1. **ADD-4563 — "PROD: Smoke tests on DD-UI web After Axios version Update"** (Task, Medium, reporter [[Fatai Ibrahim]], assignee [[Emmanuel Francis]]). Status=`Done`, updated 12:57:39 UTC (13:57 WAT). DD-UI smoke-test closure post-Axios upgrade. Active-situation entity match: tangential to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] (DD platform hygiene cluster) — does not require situation rewrite. Awareness only.

2. **ADD-4542 — "When maker checker is turned off: Status of a deactivated mandate doesnt get updated immediately"** (Bug, Medium, reporter [[Fatai Ibrahim]], assignee [[Ebenezer Igbinoba]]). Status=`Done`, updated 12:57:39 UTC (13:57 WAT). Mandate-status update bug fix. Awareness only.

**Broad-sweep captures discarded per Layer C default (Medium priority, Todo/active-state, no Highest/Blocker/Critical, no active-situation entity match):**
- **TCDD-1296** — "PROD- PF User Unable to edit merchant on Consolidated UI – 401 Access Denied" (Bug, Medium, status=`Todo`, reporter [[Abdulganiu Yusuff]], assignee [[Victor Madu]]). NEW PROD bug filing in window, but Medium priority + no active-situation match + no urgency signal — does not promote to Layer B surface. Watch-list: if escalates to High/Critical or transitions to In Progress with operational impact, promote next tick.
- **ADD-4562** — "Expired workflow requests remain in PENDING state instead of being updated to FAILED or EXPIRED" (Task, Medium, status=`Todo`, reporter [[Fatai Ibrahim]], assignee [[Mary Alaba]]). Routine DD workflow hygiene.
- **ADD-4561** — "Remove redundant information from the actionParameters field for Charge Type and Change User Role workFlowRequestType" (Task, Medium, status=`Todo`, reporter [[Fatai Ibrahim]], assignee [[Mary Alaba]]). Routine DD code hygiene.

**Active-situation checkpoints (zero new delta this tick, prior-tick re-verification stands per skim-tick scope — full re-verification deferred to next briefing tick per directive):**
- TDSD-6645 (Monnify VA reversal) — still Escalated, ~58h47m Dominic silence (1h advance from 13:10 WAT prior tick).
- TDSD-6699 (Firewall HA) — still Awaiting implementation (~47h at gate, 1h advance).
- TDSD-6716 (NIBSS PTSA RC91) — still Work in progress; NIBSS bilateral 19h+ silent (under 48h threshold).
- TDSD-6690 (Account Switch Reports Stopgap) — `status=Completed` since Apr 22 16:58 WAT per 13:10 WAT prior-tick correction; competing-interpretation framework holds (Jira-API-truth read parsimonious; resolution=null caveat).
- TDSD-6711, TDSD-6727, TDSD-6726, TDSD-6728 — all Completed in prior ticks; no new activity.

No Immediate dispatch from this Jira sweep. Both Layer B Done transitions are Awareness candidates for briefing-2026-04-26.

Factors: `source=jira`, `skim_tick`, `saturday_afternoon`, `layer_a_zero_deltas`, `layer_b_strict_2_deltas_fatai_ibrahim_dd_cluster`, `add_4563_axios_smoke_test_closure`, `add_4542_mandate_status_bug_fix`, `broad_sweep_3_todo_state_captures_discarded_layer_c_default`, `tcdd_1296_new_prod_bug_medium_no_promotion_watchlist`, `no_immediate_dispatch`, `tdsd6645_58h47m_dominic_silence_unchanged`, `awareness_only_briefing_2026_04_26_candidates`.

### last_processed 2026-04-25T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (10min late), Layer A 0 genuine deltas + TDSD-6690 staleness correction

13:10 WAT Apr 25 Saturday skim tick. Window 11:10:00Z → 12:10:00Z = 1h. Layer A 0 genuine new deltas. Layer B 0 deltas. **TDSD-6690 staleness correction:** Jira API truth `status=Completed` (statusCategory=`done`), `updated=2026-04-22T16:58:28 WAT`, `resolution=null` — narrative across briefing-2026-04-24 D3, briefing-2026-04-25 D4, and 4 prior source-config-jira tick notes propagated "still at approval gates" framing that is contradicted by Jira API state. Competing-interpretation framework documented. New "Active-situation checkpoint re-verification" directive added above. No Tuning Log tuple (self-discovered staleness, not user-signaled miss). Active-situation checkpoints unchanged: TDSD-6645 ~57h47m Dominic silence, TDSD-6699 still Awaiting implementation, TDSD-6716 NIBSS bilateral 18h+ silent (under 48h threshold).

### last_processed 2026-04-25T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (10min late), Layer A 0 deltas + Layer B 0 deltas (preserved summary)

12:10 WAT Apr 25 Saturday skim tick. Saturday-midday TDSD quiet. TDSD-6645 ~56h+ Dominic silence. TDSD-6684 Resolved 10:54 WAT (prior tick). TDSD-6699/6690 still at approval/authorize gates (~49h+ at gate). [13:10 WAT correction: TDSD-6690 actually Completed since Apr 22 16:58 WAT.]

### last_processed 2026-04-25T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (10min late), Layer A 1 delta — TDSD-6684 Resolved at 10:54 WAT (Dominic, 55h+ silence broken) (preserved summary)

11:10 WAT Apr 25 Saturday skim tick. TDSD-6684 (Pending Refund Transactions, Dominic Usiabulu) Awaiting Scheme Update → Resolved at 10:54:53 WAT — 55h+ silence broken; counter-signal to workflow-discipline observation, consistent with briefing-2026-04-24 A2 Dominic burst pattern continuing. Briefing-2026-04-26 Awareness candidate. Layer B 0 deltas.

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, Layer A 4 deltas (1 NEW + 1 portal closure + 2 already-captured/metadata) (preserved summary)

09:10 WAT Apr 25 Saturday skim tick. TDSD-6728 NEW CoralPay ZIB Interchange Stopped state incident (post-incident doc, 4-min ticket lifetime, CoralPay_Cashout failover load-bearing in production). TDSD-6711 Ecobank portal Completed at 08:13 WAT (Qazim "Portal is accessible now" closure). TDSD-6727 + TDSD-6706 metadata-only re-captures.

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, Layer A 1 delta (TDSD-6727 Completed 08:11 WAT, preserved summary)

08:10 WAT Apr 25 skim. Layer A 1 (TDSD-6727 Union RC96 Work in progress → Completed at 08:11 WAT, formalizing 02:52 WAT bank-side resolution; 5h19m formalization lag, within ops-cadence). Layer B 0 deltas. Active situations checkpoints unchanged: TDSD-6645 still ~52h+ Dominic silence, TDSD-6711 Ecobank portal still silent ~33h, TDSD-6699/6690 still at approval gates. No FCMB Jira ticket created post-resolution — process gap persists.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, Layer A 2 deltas + Layer B 2 deltas (preserved summary)

06:09 WAT Apr 25 briefing tick. 8h overnight window. Layer A 2: TDSD-6727 Union RC96 (Work in progress, 02:12 WAT filing) + TDSD-6726 Habari RC91 Problem ticket (Created 23:49 UTC + Completed 23:50 UTC, 1-min cycle = post-incident documentation of Apr 24 18:30–18:55 WAT). Layer B 2: ADD-4599 + ADD-4597 (Bukola Taiwo metadata updates 23:28 WAT Apr 24, post-closure batch).

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level 2 Layer B deltas (preserved summary)

22:10 WAT Apr 24 skim. Layer A 0; Layer B 2 — ADD-4584 + ADD-4574 CRLF Injection fixes (Bukola Taiwo end-of-day batch, paired closure 8min apart). Routine security-hygiene; not DCIR pen-test cluster.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level TDSD-6725 Paystack (preserved summary)

20:10 WAT Apr 24 full tick. TDSD-6725 PAYSTACK BALANCE ADJUSTMENT 20260424 B Resolved 18:56 WAT (22m fast-cycle, ₦4.5B inflow apply); cross-tracked with Slack #teamapt-x-paystack-transfer-support thread.

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim ADD-4596 BETA OTP (preserved)

18:22 WAT Apr 24 skim. ADD-4596 In Progress 18:16 WAT, Medium UX bug, Ebenezer Igbinoba. Awareness.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full TDSD-6713 Keystone Apr 24 cycle (preserved)

18:09 WAT Apr 24 tick. TDSD-6713 Keystone settlements Apr 24 cycle Completed 17:43 WAT David Oseji (9h22m). [[Keystone Bank — Settlement Requery Apr 20]] developing → resolving.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full TDSD-6724 + AS-4242 + ADD batches (preserved summary)

17:09 WAT Apr 24 tick. TDSD-6724 Review → Authorize 16:20 WAT (Ezinne CBA reversal). AS-4242 Sterling AS Project Plan Epic Done. ADD-4597/8/9 Tasks Done 17:03–17:06 WAT Bukola.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick. 5 TDSD deltas since 22:09 WAT Apr 23. Dominic resolution burst 23:25–23:32 WAT Apr 23. TDSD-6711 Ecobank DCIR portal filed 22:32 WAT Apr 23.
