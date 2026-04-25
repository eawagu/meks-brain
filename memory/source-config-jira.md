---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-25T05:09:54Z (06:09 WAT). 06:09 WAT Apr 25 briefing-tick: Layer A 2 deltas — TDSD-6727 Union RC96 (Work in progress 02:12 WAT) + TDSD-6726 Habari RC91 Problem ticket (created+Completed 00:49→00:50 WAT, post-incident documentation of Apr 24 cycle). Layer B 2 deltas — ADD-4597, ADD-4599 Bukola Taiwo metadata updates 23:28 WAT (post-closure update of items already Done at 17:03–17:06 WAT). No FCMB Jira ticket for the active 02:33 WAT Slack-only P1 — process gap."
updated: "2026-04-25T05:27:00Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T05:09:54Z"
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

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > "<last_processed>" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "<last_processed>" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors.
4. **Client-side UTC filter** — Jira JQL interprets the `"YYYY-MM-DD HH:MM"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

## Notes

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, Layer A 2 deltas + Layer B 2 deltas

06:09 WAT Apr 25 Saturday briefing tick. Window 21:10:00Z Apr 24 → 05:09:54Z Apr 25 = ~8h overnight.

**Layer A — JQL `project = TDSD AND updated > "2026-04-24 21:10" ORDER BY updated DESC` returned 2 tickets:**

1. **TDSD-6727 — "Union Bank | ATS | RC 96 Failures Across Processors | 20260425"** Medium [System] Incident, reporter+assignee [[Qazim Adedigba]]. Created 02:12 WAT, status **Work in progress** at 02:12 WAT (last update). Description: "Transactions are failing with RC 96. Kindly assist review." Cross-tracked with email thread 19dc1fd7e4326d6a — bank-resolved 02:52 WAT (~1h40m total cycle), but ticket status has not been updated to Completed at this tick. Briefing-2026-04-25 A1 captures the cycle. No active-situation match (Union RC96 noted on briefing-2026-04-22 B1 but no Union-RC96-specific situation page).

2. **TDSD-6726 — "Habari RC 91"** Medium [System] Problem, reporter+assignee [[Olamide Ajibulu]]. Created 23:49 UTC Apr 24 (00:49 WAT Apr 25), **Completed 23:50 UTC** (1-min cycle). Description: "This were failures that lasted for 25minutes." Documents the Apr 24 18:30–18:55 WAT 25min Habari/GTB RC91 cycle (briefing-2026-04-24 capture) as post-incident closure. Problem-archetype = post-incident documentation, not active failure. Briefing-2026-04-25 A2.

**Layer B — JQL returned 2 tickets:**

1. **ADD-4599 "Change bankReference field on transactionRequest to use UUID instead of Time base id generator"** Medium Task, [[Bukola Taiwo]] reporter+assignee. Created 17:05 WAT Apr 24, status **Done** (last updated 23:28:59 WAT Apr 24). Already Done per prior tick observation at 17:06 WAT — this is metadata/comment update post-closure (likely PR-link or sub-task transition).

2. **ADD-4597 "Add a unique constrain on bank_reference column on transaction table"** Medium Task, [[Bukola Taiwo]] reporter+assignee. Created 17:03 WAT Apr 24, status **Done** (last updated 23:28:33 WAT Apr 24). Same post-closure metadata pattern; paired with ADD-4599 (sibling Tasks closed and post-closure-edited together).

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, **~50h+ Dominic silence** since 04:08 WAT Apr 23.
- **TDSD-6684** (Blessing-Dominic refund) — still Awaiting Scheme Update, **~51h+ Dominic silence**.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no updates since 22:32 WAT Apr 23. ~31h silent at 06:09 WAT.
- **TDSD-6699 + TDSD-6690** — still at approval/authorize gates per Apr 24 22:10 WAT tick.
- **TDSD-6716** (NIBSS PTSA RC91 / response-not-sent) — listed Open in Olamide handover 23:05 WAT Apr 24; no Jira-side delta in window.
- **No FCMB Jira ticket** for the active 02:33 WAT Slack-only P1 — process gap, briefing-2026-04-25 D1 captures.

No Immediate dispatch from this Jira sweep (the 02:33 WAT FCMB Slack P1 is the Immediate-tier signal; Jira sweep does not introduce a separate Immediate event).

Factors: `source=jira`, `briefing_tick`, `full_level`, `overnight_window_8h`, `layer_a_2_deltas`, `layer_b_2_deltas_post_closure_metadata`, `tdsd6727_union_rc96_work_in_progress_email_resolved`, `tdsd6726_habari_problem_post_incident_doc`, `add_4597_4599_bukola_metadata_update`, `no_fcmb_jira_for_active_p1_process_gap`, `tdsd6645_50h_dominic_silence`, `tdsd6711_31h_silent`.

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
