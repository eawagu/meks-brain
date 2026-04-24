---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T17:22:16Z (18:22 WAT). 18:22 WAT Apr 24 skim-level off-cron tick (13min after prior 18:09 WAT): 1 genuinely new delta — **ADD-4596 In Progress** (17:16 UTC / 18:16 WAT) \"BETA ENV: Phone number not properly rendered on OTP screen\", Medium, assignee Ebenezer Igbinoba, new sprint UX bug. No active-situation match, no operational keyword match. Awareness tier; accumulates for briefing-2026-04-25. No Immediate dispatch."
updated: "2026-04-24T21:17:42Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T21:10:00Z"
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

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level scheduled 22:00-cron tick (10min late), 2 Layer B deltas

22:10 WAT Apr 24 Friday skim tick. Window 19:10:00Z → 21:10:00Z = 2h.

**Layer A** — JQL `project = TDSD AND updated > "2026-04-24 21:10"` returned 0 tickets. No TDSD deltas in window.

**Layer B** — JQL `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "2026-04-24 21:10" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))` returned **2 tickets**:

1. **ADD-4584 "Fix CRLF Injection Vulnerability on Direct Debit Cron Service" — Done 2026-04-24T22:07:52.835+0100 (22:07 WAT).**
   - Issuetype: Task. Priority: Medium. Reporter + Assignee: [[Bukola Taiwo]] (bukola.taiwo@teamapt.com, Direct Debit engineer). Created: 2026-04-22 10:14 WAT → Done: 2026-04-24 22:07 WAT (~60h development cycle).
   - Classification: Awareness tier. Security-hygiene maintenance work on the Direct Debit cron service — CRLF Injection is a OWASP Top-10 web-layer vulnerability class; closure is defensive coding discipline.
   - **Not matched to [[DCIR Security Vulnerabilities]] Access Bank pen-test cluster** — that program tracks 5 CRITICAL findings (default OAuth secrets, JWT validation, etc.) on the DCIR/ACS/DD platform. CRLF Injection on DD Cron Service is Medium priority Task work, not a pen-test-CRITICAL closure.

2. **ADD-4574 "Fix CRLF Injection Vulnerability on Authentication service" — Done 2026-04-24T21:59:46.324+0100 (21:59 WAT).**
   - Issuetype: Task. Priority: Medium. Reporter + Assignee: [[Bukola Taiwo]]. Created: 2026-04-20 17:22 WAT → Done: 2026-04-24 21:59 WAT (~100h cycle).
   - Classification: Awareness tier. Paired closure with ADD-4584 — same engineer, same vulnerability class, sibling services (Direct Debit cron + Authentication). Closed 8min apart as a batch. Routine security-hygiene release.

**Pattern:** Bukola Taiwo closing two CRLF-Injection fixes in Direct Debit service cluster within 8min — consistent with end-of-day deploy batching. Accumulates alongside earlier Apr 24 Bukola deliveries: ADD-4597/4598/4599 (bank_reference unique constraint Tasks, Done 17:03–17:06 WAT). Fifth Bukola closure this day.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, **42h+ Dominic silence** since 04:08 WAT Apr 23.
- **TDSD-6684** (Blessing-Dominic refund) — still Awaiting Scheme Update, **43h+ Dominic silence**.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no updates since 22:32 WAT Apr 23. 23h+ silent at 22:10 WAT Apr 24.
- **TDSD-6699 + TDSD-6690 + TDSD-6724** — still at approval/authorize gates; briefing-2026-04-24 D3 carryforward.
- **TDSD-6716** (NIBSS PTSA response-not-sent) — Work in progress; bilateral negotiation active via email (NIBSS counter-reply 19:05 WAT this afternoon).
- **TDSD-6725** (Paystack balance adjustment B) — Resolved earlier today 18:56 WAT.
- **ADD-4596** (BETA OTP UX bug) — still In Progress per prior 18:22 WAT tick observation.

No Immediate dispatch this tick.

Factors: `source=jira`, `skim_level`, `scheduled_cron_22wat_10min_late`, `layer_a_zero_delta`, `layer_b_2_deltas_paired`, `archetype=software`, `project=ADD`, `priority=medium`, `issuetype=task`, `status_transition=in_progress_to_done`, `cycle_time=60h_and_100h`, `assignee=bukola_taiwo_5th_closure_today`, `vulnerability_class=crlf_injection`, `not_dcir_pen_test_cluster`, `batch_deploy_end_of_day`, `routine_security_hygiene`, `no_active_situation_match`, `awareness_tier`, `no_immediate_dispatch`, `42h_dominic_silence_tdsd6645`, `23h_silence_tdsd6711`.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick, 1 Layer A delta (preserved)

20:10 WAT Apr 24 full-level tick. Window 18:22:16Z → 19:10:00Z = 47m44s. Layer A 1 genuinely new — **TDSD-6725 PAYSTACK BALANCE ADJUSTMENT APRIL 24TH 2026 B** Medium Service Request, reporter Christine Ogude, assignee Daniel Fetuga, Resolved 18:56 WAT (22m fast-cycle); cross-tracked with Slack #teamapt-x-paystack-transfer-support #4.5B NGN inflow thread. Layer B 0. Active-situation checkpoints: TDSD-6645 39h59m Dominic silence; TDSD-6711 20h35m silent.

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim-level off-cron, 1 Layer B delta (preserved)

18:22 WAT Apr 24 skim tick: ADD-4596 In Progress 18:16:58 WAT, Medium, Ebenezer Igbinoba, routine DD BETA OTP-screen UX bug. Awareness tier.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level tick (preserved)

18:09 WAT Apr 24 tick: Layer A 1 genuinely new — TDSD-6713 Keystone settlements Apr 24 cycle Completed 17:43 WAT by David Oseji (9h22m cycle). [[Keystone Bank — Settlement Requery Apr 20]] `developing` → `resolving`. Layer B 2 routine DD closures (ADD-4429/4426).

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick (preserved summary)

17:09 WAT Apr 24 tick: TDSD-6724 Review → Authorize 16:20 WAT (Ezinne Ogoke CBA reversal fix); TDSD-6723 title refined. AS-4242 Sterling Account Switch Project Plan Epic Done 16:41 WAT (High); ADD-4597/4598/4599 bank_reference unique constraint Tasks Done 17:03-17:06 WAT (Bukola Taiwo).

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved summary)

16:09 WAT Apr 24 tick: Layer A 5 deltas — TDSD-6722 UBA RC91 Completed 15:56 WAT (28m, VPN-downtime proximate cause); TDSD-6721 Resolved 15:54 WAT; TDSD-6703 3ds HTTP 422 Completed 15:59 WAT; TDSD-6680 PalmPay portal touch; TDSD-6723 NEW; TDSD-6724 NEW.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23. Dominic resolution burst 23:25–23:32 WAT Apr 23 closed TDSD-6553/6612/6688/6706. TDSD-6711 Ecobank DCIR portal filed 22:32 WAT Apr 23.
