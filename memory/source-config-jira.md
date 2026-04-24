---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-24T19:10:00Z (20:10 WAT). 20:10 WAT Apr 24 full-level 20:00-cron tick: 1 Layer A genuinely-new delta — **TDSD-6725 PAYSTACK BALANCE ADJUSTMENT APRIL 24TH 2026 B** — Medium Service Request (approvals), reporter Christine Ogude, assignee Daniel Fetuga, created 18:35:19 WAT Resolved 18:56:56 WAT (22m fast-cycle). No active-situation match; paired with #teamapt-x-paystack-transfer-support Slack #4.5B NGN inflow thread. Awareness tier; accumulates for briefing-2026-04-25. Layer B 0 new deltas. No Immediate dispatch."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T19:10:00Z"
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

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick (10min late), 1 Layer A delta

20:10 WAT Apr 24 full-level tick. Window 18:22:16Z → 19:10:00Z = 47m44s.

**Layer A** — JQL `project = TDSD AND updated > "2026-04-24 18:22"` returned 1 ticket; client-side UTC filter (>2026-04-24T18:22:16Z) yields **1 genuinely new**:

**TDSD-6725 PAYSTACK BALANCE ADJUSTMENT APRIL 24TH 2026 B — Resolved 18:56:56 WAT (22m fast-cycle).**
- Issue type: [System] Service request with approvals. Priority: Medium.
- Reporter: [[Christine Ogude]] (christine.ogude@teamapt.com). Assignee: [[Daniel Fetuga]] (daniel.fetuga@teamapt.com).
- Created: 2026-04-24T18:35:19.536+0100 (18:35 WAT) → Updated: 2026-04-24T18:56:56.817+0100 (18:56 WAT).
- Status: Resolved (statusCategory: done).
- **Cross-track with Slack #teamapt-x-paystack-transfer-support thread** — same Christine Ogude as the Slack-side actor who posted "Done" at 18:57:32 WAT (39s after Jira Resolved). The Slack thread (parent 18:26:05 WAT) is applying #4,500,000,000.00 NGN inflow per attached bank statement + balance screenshot. TDSD-6725 is the standard ITSM track for the same balance adjustment.
- No active-situation match. Routine Paystack balance-adjustment operation — 22m service-request cycle end-to-end with Daniel Fetuga executing.
- Classification: **Awareness tier** — routine service-request, fast-cycle closed, no structural signal. Accumulates for briefing-2026-04-25.
- Factors: `source=jira+slack`, `archetype=service_desk`, `priority=medium`, `issuetype=service_request_with_approvals`, `status_transition=new_to_resolved`, `cycle_time=22m`, `assignee=daniel_fetuga`, `reporter=christine_ogude`, `cross_track_slack_paystack_inflow_4.5B_ngn`, `no_active_situation_match`, `routine_paystack_balance_adjustment_ops`, `awareness_tier`, `no_immediate_dispatch`.

**Layer B** — JQL `project in ("ADD","AS",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > "2026-04-24 18:22" AND (priority in (Highest, Blocker, Critical) OR status changed FROM ("Open","In Progress") TO ("Resolved","Done","Completed","Escalated"))` returned **0 tickets**. No Highest/Blocker/Critical updates, no status transitions in the window. ADD-4596 (captured in prior 18:22 tick) remains In Progress — not re-surfaced.

**Active-situation checkpoints (zero delta this tick):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, **39h59m Dominic silence** since 04:08 WAT Apr 23 (add ~58min to prior 18:09 tick observation).
- **TDSD-6684** (Blessing-Dominic refund) — still Awaiting Scheme Update, **41h06m Dominic silence**.
- **TDSD-6711** (Ecobank DCIR portal inaccessibility) — no Jira updates since 22:32 WAT Apr 23 filing. 20h35m silent at 20:10 WAT.
- **TDSD-6699 + TDSD-6690 + TDSD-6724** — all still at approval/authorize gates; briefing-2026-04-24 D3 carryforward.
- **TDSD-6716** (NIBSS PTSA response-not-sent) — still Work in progress; no Jira updates, but bilateral email negotiation continued this tick (thread 19dc0ab7bafe02e0 NIBSS counter-reply 19:05 WAT — captured via email sweep).
- **TDSD-6719** (Verve TTP RC06 Problem) — still Problem Investigation.
- **TDSD-6720** (Blessing Olawale NEW PENDING SETTLEMENT) — still INITIAL REVIEW.
- **TDSD-6723** (Mustapha Monnify International routing) — still Awaiting Scheme Update.

No Immediate dispatch this tick.

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim-level off-cron tick, 1 Layer B delta (preserved)

18:22 WAT Apr 24 skim tick: 1 genuinely new — ADD-4596 In Progress 18:16:58 WAT, Medium, Ebenezer Igbinoba, routine DD BETA OTP-screen UX bug. Awareness tier; accumulates for briefing-2026-04-25.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level tick (preserved)

18:09 WAT Apr 24 tick: Layer A 1 genuinely new — TDSD-6713 Keystone settlements Apr 24 cycle Completed 17:43 WAT by David Oseji (9h22m cycle). Situation [[Keystone Bank — Settlement Requery Apr 20]] transitioned `developing` → `resolving`; retirement 72h window through 17:43 WAT Apr 27. Layer B 2 routine DD closures (ADD-4429/4426, Ebenezer Igbinoba, paired UX fixes). TDSD-6645 39h01m Dominic silence; TDSD-6684 40h08m. Approval queue TDSD-6699/6690/6724 all at gates.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level tick (preserved summary)

17:09 WAT Apr 24 tick: Layer A 2 new — TDSD-6724 Review → Authorize 16:20 WAT (Ezinne Ogoke Deployment Destination Account Name + CBA Reversal fix); TDSD-6723 title refined. Layer B 4 new closures — AS-4242 Sterling Account Switch Project Plan Epic Done 16:41 WAT (High); ADD-4597/4598/4599 bank_reference unique constraint Tasks Done 17:03-17:06 WAT (Bukola Taiwo).

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick (preserved summary)

16:09 WAT Apr 24 tick: Layer A 5 deltas — TDSD-6722 UBA RC91 Completed 15:56 WAT (28m, VPN-downtime proximate cause); TDSD-6721 Resolved 15:54 WAT (Opeyemi Ahmed); TDSD-6703 3ds HTTP 422 Completed 15:59 WAT; TDSD-6680 PalmPay portal touch; TDSD-6723 NEW; TDSD-6724 NEW. Layer B 3 routine.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level tick (preserved summary)

15:09 WAT Apr 24 tick: Layer A 3 deltas — TDSD-6714 Closed by Opeyemi; TDSD-6720 NEW PENDING SETTLEMENT; TDSD-6721 NEW PENDING PAYABLE POSTING. Layer B 0.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level tick (preserved summary)

14:09 WAT Apr 24 tick: TDSD-6719 Verve TTP RC06 Problem + TDSD-6696 Completed; TDSD-6718 Closed 7m after filing; TDSD-6572 FCMB backlog closure.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: 5 TDSD deltas since 22:09 WAT Apr 23. Dominic resolution burst 23:25–23:32 WAT Apr 23 closed TDSD-6553/6612/6688/6706. TDSD-6711 Ecobank DCIR portal filed 22:32 WAT Apr 23.
