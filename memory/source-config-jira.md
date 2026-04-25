---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-25T15:10:00Z (16:10 WAT). 16:10 WAT Apr 25 skim-tick: zero deltas across both Layer A (TDSD service_desk) and Layer B (software). Four consecutive zero-delta skim ticks (13:10/14:10/15:10/16:10 WAT)."
updated: "2026-04-25T16:24:25Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T16:10:00Z"
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

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (10min late), 1 Layer A delta — TDSD-6716 NIBSS PTSA Completed with leased-line RCA (situation `stable` → `resolving`)

17:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend-quiet-priors-with-active-fcmb-p1-needing-verification). Window 15:10:00Z → 16:10:00Z = 1h.

**Broad sweep — JQL `project in (TDSD, TCDD, ATPG, "ADD", "AS", ATPP, TPSE, TD, TM, TWP, ATLAS, TDEV, TAV, ATS, NIBSS, OPS, NUS, NSS) AND updated >= "2026-04-25 15:10" ORDER BY updated DESC` returned 1 issue.**

**Layer A (TDSD service_desk): 1 delta:**

- **[[TDSD-6716]] — "NIBSS|SUCCESSFUL RESPONSE NOT SENT|20260424"** — [System] Incident, Medium, reporter+assignee [[Afeez Kazeem]]. **Status transition Work in progress → Completed at 15:20:42 UTC (16:20:42 WAT)**, **Resolution=Done**. Closure comment: *"Transaction are now been routed on Nibss lease line. The intermittent error has reduced."* Filing-to-close: 29h02m (10:18 WAT Apr 24 → 16:20 WAT Apr 25). **Active-situation match: [[NIBSS PTSA — VPN Flapping Apr 22]]** — this is the operational ticket tracking the post-transition response-not-sent pattern. Closure-with-RCA confirms the leased-line architectural transition (Apr 22 19:17 WAT) as the **root-cause-fix** for the persistent error pattern. Bilateral-attribution-contested standoff with NIBSS bypassed: TeamApt declares resolution unilaterally via route change, no NIBSS RCA required. Re-escalation criterion (c) (48h-without-RCA, would have fired 20:10 WAT Apr 26) and criterion (d) (CTO-direct engagement) both moot. Situation page status transitioned `stable` → `resolving` this tick. Retirement candidate at next briefing tick (briefing-2026-04-26). Awareness candidate for briefing-2026-04-26.

**Layer B (software): 0 deltas.**

**Active-situation checkpoints (skim-tick scope per directive — full re-verification deferred to next briefing tick):**
- TDSD-6645 (Monnify VA reversal) — still Escalated, ~61h47m Dominic silence (1h advance from 16:10 WAT prior tick).
- TDSD-6699 (Firewall HA) — still Awaiting implementation (~50h at gate, 1h advance).
- **TDSD-6716 (NIBSS PTSA RC91) — CLOSED this tick** (Work in progress → Completed/Done at 16:20 WAT). NIBSS PTSA situation transition `stable` → `resolving`.
- TDSD-6690 (Account Switch Reports Stopgap) — `status=Completed` since Apr 22 16:58 WAT; competing-interpretation framework holds.
- TDSD-6711, TDSD-6727, TDSD-6726, TDSD-6728 — all Completed in prior ticks; no new activity.

No Immediate dispatch (resolution signal, not P1 start). FCMB cycle 2 (email-only filing 16:04 WAT) did not produce a Jira ticket — process gap consistent with cycle 1 morning behavior.

Factors: `source=jira`, `skim_tick`, `saturday_afternoon`, `layer_a_1_delta_tdsd6716_completed_with_rca`, `layer_b_zero_deltas`, `active_situation_resolution_signal_nibss_ptsa`, `leased_line_confirmed_root_cause_fix`, `bilateral_standoff_bypassed_unilateral_resolution`, `re_escalation_criteria_c_d_moot`, `situation_status_stable_to_resolving`, `retirement_candidate_next_briefing_tick`, `no_immediate_dispatch_resolution_signal`, `awareness_candidate_briefing_2026_04_26`, `tdsd6645_61h47m_dominic_silence_unchanged`, `quiet_weekend_window`.

### last_processed 2026-04-25T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (10min late), zero deltas across both layers (preserved summary)

16:10 WAT Apr 25 Saturday skim tick. Window 14:10:00Z → 15:10:00Z = 1h. Broad sweep 0 issues. TDSD-6645 ~60h47m Dominic silence; TDSD-6699 ~49h at gate; TDSD-6716 NIBSS bilateral 21h+ silent (under 48h threshold). No Immediate dispatch. Four consecutive zero-delta skim ticks (Layer A).

### last_processed 2026-04-25T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (10min late), zero deltas across both layers (preserved summary)

15:10 WAT Apr 25 Saturday skim tick. Window 13:10:00Z → 14:10:00Z = 1h. Broad sweep 0 issues. Layer A 0; Layer B 0. TDSD-6645 ~59h47m Dominic silence; TDSD-6699 ~48h at gate; TDSD-6716 NIBSS bilateral 20h+ silent. No Immediate dispatch.

### last_processed 2026-04-25T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (10min late), Layer A 0 deltas + Layer B strict 2 deltas (Fatai Ibrahim DD cluster) (preserved summary)

14:10 WAT Apr 25 Saturday skim tick. Layer A 0 deltas. Layer B 2: ADD-4563 (DD-UI smoke-test closure), ADD-4542 (mandate-status bug fix). Both Fatai Ibrahim cluster, Awareness only. Briefing-2026-04-26 candidates.

### last_processed 2026-04-25T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (10min late), Layer A 0 genuine deltas + TDSD-6690 staleness correction (preserved summary)

13:10 WAT Apr 25 Saturday skim tick. Layer A 0 genuine new deltas. **TDSD-6690 staleness correction:** Jira API truth `status=Completed` since Apr 22 16:58 WAT — narrative across briefing-2026-04-24 D3, briefing-2026-04-25 D4 propagated stale "still at approval gates" framing. New "Active-situation checkpoint re-verification" directive added.

### last_processed 2026-04-25T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (10min late), Layer A 0 deltas + Layer B 0 deltas (preserved summary)

12:10 WAT Apr 25 Saturday skim tick. Saturday-midday TDSD quiet. TDSD-6645 ~56h+ Dominic silence.

### last_processed 2026-04-25T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (10min late), Layer A 1 delta — TDSD-6684 Resolved at 10:54 WAT (Dominic, 55h+ silence broken) (preserved summary)

11:10 WAT Apr 25 Saturday skim tick. TDSD-6684 (Pending Refund Transactions, Dominic Usiabulu) Awaiting Scheme Update → Resolved at 10:54:53 WAT — 55h+ silence broken; counter-signal to workflow-discipline observation. Briefing-2026-04-26 Awareness candidate.

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, Layer A 4 deltas (preserved summary)

09:10 WAT Apr 25 Saturday skim tick. TDSD-6728 NEW CoralPay ZIB Interchange Stopped state incident. TDSD-6711 Ecobank portal Completed at 08:13 WAT. TDSD-6727 + TDSD-6706 metadata-only re-captures.

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, Layer A 1 delta (TDSD-6727 Completed 08:11 WAT, preserved summary)

08:10 WAT Apr 25 skim. Layer A 1 (TDSD-6727 Union RC96 Work in progress → Completed at 08:11 WAT, formalizing 02:52 WAT bank-side resolution). Layer B 0 deltas.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick full sweep, Layer A 2 deltas + Layer B 2 deltas (preserved summary)

06:09 WAT Apr 25 briefing tick. 8h overnight window. Layer A 2: TDSD-6727 Union RC96 + TDSD-6726 Habari RC91 Problem ticket. Layer B 2: ADD-4599 + ADD-4597 (Bukola Taiwo metadata updates).

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level 2 Layer B deltas (preserved summary)

22:10 WAT Apr 24 skim. Layer A 0; Layer B 2 — ADD-4584 + ADD-4574 CRLF Injection fixes (Bukola Taiwo end-of-day batch).

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level TDSD-6725 Paystack (preserved summary)

20:10 WAT Apr 24 full tick. TDSD-6725 PAYSTACK BALANCE ADJUSTMENT 20260424 B Resolved 18:56 WAT (22m fast-cycle, ₦4.5B inflow apply).

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full TDSD-6713 Keystone Apr 24 cycle (preserved)

18:09 WAT Apr 24 tick. TDSD-6713 Keystone settlements Apr 24 cycle Completed 17:43 WAT David Oseji (9h22m). [[Keystone Bank — Settlement Requery Apr 20]] developing → resolving.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full TDSD-6724 + AS-4242 + ADD batches (preserved summary)

17:09 WAT Apr 24 tick. TDSD-6724 Review → Authorize 16:20 WAT. AS-4242 Sterling AS Project Plan Epic Done. ADD-4597/8/9 Tasks Done 17:03–17:06 WAT Bukola.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick. 5 TDSD deltas since 22:09 WAT Apr 23. Dominic resolution burst 23:25–23:32 WAT Apr 23. TDSD-6711 Ecobank DCIR portal filed 22:32 WAT Apr 23.
