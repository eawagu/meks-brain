---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Jira signal source. 18-project scope. last_processed 2026-04-25T07:10:00Z (08:10 WAT). 08:10 WAT Apr 25 skim-tick: Layer A 1 delta — TDSD-6727 Union RC96 transitioned Work in progress → Completed at 08:11 WAT (formalizing the 02:52 WAT bank-side resolution; 5h19m formalization lag, within ops-cadence). Layer B 0 deltas. Active situations checkpoints unchanged: TDSD-6645 still ~52h+ Dominic silence, TDSD-6711 Ecobank portal still silent ~33h, TDSD-6699/6690 still at approval gates. No FCMB Jira ticket created post-resolution — process gap persists."
updated: "2026-04-25T08:26:57Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T08:10:00Z"
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

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, Layer A 4 deltas (1 NEW + 1 portal closure + 2 already-captured/metadata)

09:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=saturday-morning-quiet-priors-active-situations-monitoring). Window 07:10:00Z → 08:10:00Z = ~1h.

**Layer A — JQL `project in (TDSD, ...) AND updated >= "2026-04-25 08:10" ORDER BY updated DESC` returned 4 tickets:**

1. **TDSD-6728 — "Switch | CoralPay (ZIB) | Interchange on Stopped State Incident | 20260425"** (NEW, Medium, Switch component, reporter+assignee [[Qazim Adedigba]]). Created 08:43:55 WAT, transitioned to **Completed at 08:47:23 WAT** (4-min ticket lifetime — post-incident documentation, not active-failure tracker). Description: incident active 01:15 → 07:48 WAT (6h33m, overnight delegation window). Trigger: Zenith EoD issue caused failed transactions; after Zenith resolved their side, CoralPay returned false statuses with interchange state stuck on `Stopped`. Workaround: failover to **CoralPay_Cashout** (now load-bearing in production per duty handover 08:06 WAT). Permanent fix: alternate-key + CoralPay key reselect → state `Running`. Resolution log evidence: `2026-04-25 06:46:56 ERROR ... Sink interchange is not active` + `07:28:01 TRACE ... Client 10.231.18.17:3001, Connected: false`. Comment by Qazim 08:44:55 WAT: "Current Status: Resolved and actively monitoring. NB: Coralpay transactions are currently routed through the CoralPay_Cashout." **Active-situation entity match → [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]]; situation page updated this tick with Apr 25 switch-layer failure-mode delta.** Distinct failure mode from the Apr 23 ZIB RC91 routing failure (RC91 = bank-side issuer-or-switch-inoperative; interchange-Stopped = TeamApt-side switch-state stuck). **Briefing-2026-04-26 Awareness candidate** — configuration-state change (CoralPay_Cashout failover persisting in production) + structural-defect candidate (alternate-key reselect remediation pattern suggests client-side state-machine lock surviving server-side recovery).

2. **TDSD-6711 — "Ecobank | ATS | Portal Inaccessibility | 20260423"** Medium. **Status transitioned Work In Progress → Completed at 08:13:14 WAT.** Resolution: Done. Closure comment by Qazim Adedigba: *"Portal is accessible now."* Total ticket lifetime ~33h41m from 22:32 WAT Apr 23 filing to 08:13 WAT Apr 25 closure — silent across overnight Apr 24/25 (no comment activity between Qazim's 22:33 WAT Apr 23 escalation note and the 08:13 WAT closure). No bank-side acknowledgement comment recorded — portal recovery appears bank-side autonomous (or recovered via off-Jira SRE escalation thread). **Active-situation entity match → [[Ecobank — RC91 on NUS Nodes]]; situation page updated this tick — compound failure stack reduces from 3 layers (transaction-routing + portal-access + user-creation) to 1 open layer (3-week user-creation persistence remains).** **Briefing-2026-04-26 Awareness candidate** — Ecobank admin-platform CTO-escalation case (briefing-2026-04-24 D1) weakens materially.

3. **TDSD-6727 — "Union Bank | ATS | RC 96 Failures Across Processors | 20260425"** Medium. Last update 08:11:35 WAT (Status Completed). **Already captured in 08:10 WAT prior tick** — the JQL window slop (Jira interprets `"2026-04-25 08:10"` as 08:10 WAT = 07:10 UTC; the 08:11 WAT update is 07:11 UTC, which is > 07:10 UTC by 1min so re-appears in this tick's window). Per source-config-jira client-side filter directive, this is a known-already-captured re-appearance, not a fresh delta. No new content; awareness-trace only.

4. **TDSD-6706 — "UPDATE OF REJECTED REFUND STATUS TO COMPLETED_VIA_PROVIDER(23042026)"** Medium, reporter Samson Anaele, assignee Dominic Usiabulu. Status transitioned **Resolved → Closed at 08:23:54 WAT**. Originally Resolved at 23:25 WAT Apr 23 in Dominic's resolution burst (briefing-2026-04-24 A2). This is a metadata-only transition (Resolved → Closed is the standard workflow promotion when the ticket originator confirms — no content delta). Awareness-trace only.

**Layer B sweep — 0 deltas.** No P1/Blocker/Critical priority transitions, no Done-state transitions on pattern-tracked entities, no developing-situation entity matches. Saturday morning dev-quiet (continuation of 08:10 tick zero-Layer-B pattern).

**Active-situation checkpoints (zero delta this tick except for situations updated above):**
- **TDSD-6645** (Monnify VA reversal) — still Escalated, **~53h+ Dominic silence** (no movement since 04:08 WAT Apr 23). Same as briefing-2026-04-25 D4 carryforward state. 1h advance from prior tick observation.
- **TDSD-6684** (Blessing-Dominic refund) — still Awaiting Scheme Update, **~54h+ Dominic silence**.
- **TDSD-6699 + TDSD-6690** — still at approval/authorize gates per Apr 24 22:10 WAT tick. No transition deltas. Now ~46h+ at approval gate (above 12h absence-of-signal threshold; already in briefing-2026-04-24 D3 + briefing-2026-04-25 D4 carryforward).
- **TDSD-6716** (NIBSS PTSA RC91 / response-not-sent) — listed Open in Olamide handover 23:05 WAT Apr 24; no Jira-side delta in window. NIBSS PTSA bilateral negotiation ~14h silent at tick (under 48h absence threshold — Apr 24 19:05 WAT NIBSS counter-reply was last activity).

No Immediate dispatch from this Jira sweep. TDSD-6728 was post-resolved + post-documented before the tick window; TDSD-6711 was bank-side autonomous closure; TDSD-6727/6706 are awareness-only re-captures.

Factors: `source=jira`, `skim_tick`, `saturday_morning`, `layer_a_4_deltas_1_new_1_portal_closure_2_recapture_metadata`, `layer_b_0_deltas`, `tdsd6728_new_coralpay_zib_interchange_stopped_state_post_incident_doc`, `coralpay_cashout_failover_load_bearing`, `alternate_key_reselect_remediation_pattern`, `tdsd6711_ecobank_portal_completed_qazim_closure_portal_accessible`, `ecobank_compound_stack_3_to_1_layer`, `tdsd6727_jql_slop_recapture`, `tdsd6706_metadata_resolved_to_closed_no_content_delta`, `tdsd6645_53h_dominic_silence_unchanged`, `tdsd6716_nibss_ptsa_under_48h_threshold`.

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
