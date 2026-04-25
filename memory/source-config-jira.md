---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-25T21:10:00Z (22:10 WAT). 22:10 WAT Apr 25 skim-tick: zero deltas across both Layer A (TDSD service_desk) and Layer B (software). Stanbic cycle 34 (Slack+email tick this tick) carries no TDSD ticket — single-track-Jira regression continues across cycles 33+34."
updated: "2026-04-25T21:23:34Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T21:10:00Z"
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

Note: `ADD` and `AS` are JQL reserved words — must be quoted in query: `project in (\"ADD\", \"AS\", ...)`.

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
When the source-config trace describes an active-situation ticket's state in narrative shorthand (e.g., \"still at approval gates\", \"still WIP\", \"still Escalated\"), MUST re-verify the description against the live `status` field (and `statusCategory.key`) every full briefing-tick. NEVER propagate a narrative description from a prior tick without checking the current Jira state — descriptions go stale silently when the ticket transitions and prior-tick text is copied forward. Trigger: TDSD-6690 was described as \"still at approval gates\" across briefing-2026-04-24 D3, briefing-2026-04-25 D4, and four prior source-config-jira tick notes — but Jira state was `status=Completed` (statusCategory=`done`) since 2026-04-22T16:58 WAT (Ekene Udodi \"Done\" comment, 67h+ ago at the 13:10 WAT tick that caught this). Resolution=null caveats the closure (informal-close-without-formal-authorization candidate), but statusCategory=done is the authoritative bucket signal.

### Skip list (patterns explicitly excluded from Layer B surface)
*(Empty — maintained via monthly periodic review + weekly skip candidate bulk-confirm per config-salience.)*

### Sweep
1. **Layer A full sweep** — JQL: `project = TDSD AND updated > \"<last_processed>\" ORDER BY updated DESC`
2. **Layer B scoped sweep** — JQL: `project in (\"ADD\",\"AS\",TCDD,ATPG,ATPP,TPSE,TD,TM,TWP,ATLAS,TDEV,TAV,ATS,NIBSS,OPS,NUS,NSS) AND updated > \"<last_processed>\" AND (priority in (Highest, Blocker, Critical) OR status changed FROM (\"Open\",\"In Progress\") TO (\"Resolved\",\"Done\",\"Completed\",\"Escalated\"))`
3. **Per-ticket reasoning** — classify by archetype + priority + active-situation match; record triggering factors.
4. **Client-side UTC filter** — Jira JQL interprets the `\"YYYY-MM-DD HH:MM\"` datetime literal in the user's configured timezone (Africa/Lagos = WAT). Since `last_processed` is stored in UTC (`YYYY-MM-DDTHH:MM:SSZ`), the server-side JQL filter using the UTC hour as-is is effectively 1h lax — it lets through updates from the hour before `last_processed`. Therefore the heartbeat MUST apply a client-side filter: convert each returned issue's `fields.updated` to UTC and compare to `last_processed`; discard any issue whose UTC-updated time ≤ `last_processed`.

## Notes

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick (last tick before overnight delegation), zero deltas across both layers; Stanbic cycle 34 (slack+email this tick) confirms single-track-Jira regression continues across cycles 33+34

22:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=last-tick-before-overnight-delegation-with-active-multi-bank-p1s-from-am-briefing). Window 19:10:00Z → 21:10:00Z = 2h. Layer A (TDSD) JQL `project = TDSD AND updated >= "2026-04-25 20:10" ORDER BY updated DESC` returned **0 issues**. Layer B (17 software projects) JQL with "ADD"/"AS" properly quoted + (priority in Highest/Blocker/Critical OR status transition) returned **0 issues**.

**Stanbic cycle 34 — Jira-track absence (skim-tick scope, full re-verification deferred to briefing tick):** The 22:10 WAT cross-source signal is a Stanbic ATS RC91 cycle 34 caught via Slack #teamapt-tech-operations (Olamide P1 post 21:01 WAT) + Gmail thread 19dc63afd3c001f0 (Olamide → Stanbic 21:00:33 → bank reconfirm-status 21:09:38 → Olamide processing-successfully 21:14:37 WAT). **No TDSD ticket visible at tick** — second consecutive Stanbic cycle (33+34) without a Jira-track entry, confirming the single-track-Jira regression first flagged at cycle 33. Pattern interpretation: cycles 30–32 carried TDSD tickets (6618, 6629, 6639) with operational maturation framing; cycles 33+34 break that maturation. Possible reasons: (a) ticketing-discipline regression on the recurring-pattern response; (b) fast resolution preempts ticket workflow when bank-side close < team workflow latency (cycle 34 was 10–14m end-to-end); (c) Qazim/Olamide structured-Slack-post pattern now captures sufficient resolution detail for the team's purposes. Two-cycle observation insufficient to establish trend; flagging for pattern-watch on cycles 35–36.

**Active-situation checkpoint summary (skim-tick scope):**
- TDSD-6716 (NIBSS PTSA RC91) — Completed Apr 25 16:20 WAT; situation page `stable → resolving`. Retirement candidate at briefing-2026-04-26.
- TDSD-6699 (Firewall HA) — Implementation window opened 18:00 WAT per Mustapha 17:26 WAT Slack post (NIBSS leased-line → VPN); ticket unchanged status this tick. No new activity in 4h post-window-open.
- TDSD-6645 (Monnify VA reversal) — still Escalated, Dominic silence ~65h+ (advancing).
- TDSD-6711 (Ecobank DCIR portal) — Completed Apr 25 08:13 WAT prior-tick.
- TDSD-6690 (Account Switch Reports Stopgap) — `status=Completed` since Apr 22 16:58 WAT; informal-close caveat holds.
- Stanbic cycles 33+34 — no Jira-track entries (single-track-Jira regression).

**FCMB cycle 2 process-gap status:** Email cycle 2 escalation filed 16:04 WAT did NOT generate a Jira ticket as of 22:10 WAT (~6h05m later). Same process-gap pattern as cycle 1 (02:33 WAT Slack post, no ticket). Consistent with FCMB multi-day bank-side cycle pattern; not flagged as anomalous.

No P1/Highest filings. No Layer A or Layer B Immediate-tier triggers. Multi-bank degradation tracking continues (situation pages already updated).

Factors: source=jira, skim_tick, layer_a_zero_deltas, layer_b_zero_deltas, stanbic_cycle34_no_tdsd_ticket_jira_track_regression_cycles33_34_consecutive, fcmb_cycle2_no_ticket_6h_within_pattern, tdsd6716_resolving_post_completion, tdsd6699_implementation_window_opened_no_post_window_activity_4h, tdsd6645_dominic_silence_65h_advancing, no_immediate_dispatch, saturday_late_evening_quiet, last_tick_before_overnight_delegation.

### last_processed 2026-04-25T19:10:00Z (20:10 WAT) — skim-level 20:00-cron tick, zero deltas across both layers (preserved summary)

20:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=saturday-evening-fcmb-active-this-am-quiet-priors). Layer A 0; Layer B 0. FCMB cycle 2 no ticket 4h05m post-filing — within-pattern. TDSD-6716 resolving (post-completion); TDSD-6699 implementation window opened; TDSD-6645 Dominic ~63h silence; TDSD-6711 Completed prior-tick; TDSD-6690 Completed (informal). No P1/Highest filings.

### last_processed 2026-04-25T17:10:00Z (18:10 WAT) — skim-level 18:00-cron tick, single TDSD-6716 closure delta (already captured prior tick) (preserved summary)

18:10 WAT Apr 25 Saturday skim tick. Layer A 1 issue (TDSD-6716 NIBSS Completed already captured at 17:10 WAT tick); Layer B 0 (after JQL quoting fix for ADD/AS). TDSD-6699 cross-referenced via Slack delta this tick (Mustapha 17:26 WAT firewall HA announcement). No P1/Highest filings, no Immediate-tier triggers.

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (10min late), 1 Layer A delta — TDSD-6716 NIBSS PTSA Completed with leased-line RCA (situation `stable` → `resolving`) (preserved summary)

17:10 WAT Apr 25 Saturday skim tick. Layer A 1 delta — TDSD-6716 Work in progress → Completed at 16:20:42 WAT, Resolution=Done. Closure comment: "Transaction are now been routed on Nibss lease line. The intermittent error has reduced." Filing-to-close 29h02m. NIBSS PTSA situation `stable → resolving`; bilateral-attribution standoff bypassed via unilateral resolution. Retirement candidate at briefing-2026-04-26. Layer B 0.

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
