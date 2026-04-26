---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-26T06:10:00Z (07:10 WAT). 07:10 WAT Apr 26 skim-tick: zero Tier 1 deltas in 1h window — both active P1s (CoralPay ZIB + Access Bank) silent on #teamapt-tech-operations since 06:10 WAT briefing tick. No resolution posts, no escalation messages. Continuation of 06:22 WAT Immediate dispatch."
updated: "2026-04-26T06:21:30Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T06:10:00Z"
---



## Connection
Slack MCP (workspace-scoped). User ID for DM dispatch: U080PEXEZ0E. Tier 1 channels: #teamapt-tech-operations (C0ABU8GMW75), #account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE).

## Directives

### Priority model
- Tier 1: listed channels above — read every tick.
- Tier 2: DMs mentioning the user — read every tick.
- Tier 3: keyword matches across public + private channels via `slack_search_public_and_private` — filter by epoch post-check.

### Sweep order (Slack delta path)
1. **Tier 1 channel reads** — for each Tier 1 channel, `slack_read_channel(oldest=last_processed_epoch, limit=50)` to catch parent messages filed since last tick. Must complete even if other sweeps fire.
2. **User DM scan** — `slack_search_public_and_private(query=\"to:me after:<date>\")` to catch DMs to user since last tick.
3. **Keyword scan (all channels)** — `slack_search_public_and_private` with Immediate triggers (P1, outage, RC91, RC96, RC05, RC06, breach, compromised, transaction failure, settlement failure) + `after=<epoch>` filter.
4. **Per-message salience reasoning** — for each new parent message, score factors per config-salience (channel identity, keyword floor, active-situation entity match, @mention, DM, sender weighting). Record triggering factors in the signal metadata.
5. **Epoch filter post-check** — Slack search results may include matches slightly before `oldest`/`after` timestamps due to indexing lag; filter result `message_ts` > epoch to avoid re-processing.
6. **Cost cap** — single-tick budget for Slack calls is bounded; skim-tick fast-path is a single search + channel-read sweep pair.

### Epoch arithmetic — deterministic compute MANDATORY (post 2026-04-25 09:10 WAT bug)
The Slack `oldest` parameter MUST be computed as `int(parse_iso(last_processed).timestamp())`. NEVER use precomputed epoch constants, week-shifted offsets, or arithmetic that can drift by week-aligned values (86400 × 7 = 604800 seconds). At call time, MUST assert `oldest <= int(time.time())` to refuse future epochs — a future epoch silently returns zero parent messages and produces a false zero-delta indistinguishable from a genuine quiet window. Bug history: 09:10 WAT Apr 25 tick used `oldest=1777705800` (= 2026-05-02 07:10 UTC) when intended `last_processed=1777101000` (= 2026-04-25 07:10 UTC), exactly 7 days in the future. Wema RC91 P1 post at 08:39 WAT was missed; recovered by 10:10 WAT tick re-sweep with corrected epoch. See `MISS-slack-epoch-bug-09-10-wat-tick-2026-04-25.md`.

### Salience factors (per-message inputs to config-salience dimensions)
- `channel=C0ABU8GMW75 (#teamapt-tech-operations)` — Tier 1 ops channel, highest base salience
- `channel=C098VUQCVRA (#account-switch-alerts)` — Tier 1 alert channel
- `channel=C096LCNP26P (#teamapt-x-paystack-transfer-support)` — Tier 1 Paystack ops
- `channel=C08PH35PLPK (#notifications-support-dev)` — Tier 1 dev support
- `channel=C090UHR9VDE (#go-subscribe-by-teamapt)` — Tier 1 product channel
- `keyword_floor` — match against Immediate trigger keyword list
- `active_situation_entity_match` — sender's message names an entity already tracked in a developing situation
- `@mention` — user is @mentioned
- `dm` — direct message to user
- `sender_weighting` — Tier 1/2 senders (CTO reports, ops leads) amplify salience

### Skip list (channels explicitly excluded from keyword sweep scope)
*(Empty — maintained via monthly periodic review + weekly suspected-bot bulk-confirm per config-salience.)*

## Notes

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), zero Tier 1 deltas — both active P1s silent on ops channel for 1h post-briefing

07:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=hour-after-briefing-with-2-active-p1s-needing-delta-check). Window 05:10:00Z → 06:10:00Z = 1h post-briefing-tick. Tier 1 channels read with `oldest=1777180200` (deterministic compute from `last_processed=2026-04-26T05:10:00Z`; runtime assertion `oldest <= now (1777183901)` passed):

- **#teamapt-tech-operations (C0ABU8GMW75): 0 messages.** No resolution posts, no escalation messages, no new P1s. Both active P1s (CoralPay ZIB 02:01 WAT + Access Bank 02:05 WAT, TDSD-6729) carrying forward without Slack-side state change.
- **#account-switch-alerts (C098VUQCVRA): 0 messages.**
- **Other Tier 1 (C096LCNP26P, C08PH35PLPK, C090UHR9VDE): not read this skim tick** — fast-path Tier 1 prioritized to ops + alerts (where active P1s would surface). Per skim-tick discipline these zero-traffic channels are deferred to next full-tick.

DM (`to:me after:1777180200` keyword search) — broad keyword query `after:2026-04-26 (P1 OR RC91 OR resolved OR Coralpay OR Access)` returned zero hits across public+private+IM scope. **Note:** Slack search index appears to lag for messages within the last few hours — channel reads are the more reliable path for sub-hourly deltas; the keyword query null result is a confirmation of "no resolution post" rather than authoritative coverage.

**Active P1 silence-rule check (1h post-briefing-Immediate-dispatch):**
- CoralPay ZIB RC91 active 5h09m at this tick — 1h continued silence past 06:10 WAT briefing dispatch. config-salience absence-of-signal Immediate threshold (1h no update) crosses again, but this is continuation of the same condition already dispatched at 06:22 WAT — no novel trigger.
- Access Bank RC91 cycle 8 active 5h05m at this tick — same continuation pattern.
- **No new Immediate dispatch this tick.** Structural anomaly (06:44 WAT hourly report byte-identical to 01:56 WAT and contradicts TDSD-6729 with "0 tickets raised") surfaced via email source-config — does not match config-salience Immediate trigger conditions, defers to briefing-2026-04-27 as Awareness/Decision item.

Cross-source: Email caught Hourly Reports 20260426 reply (06:44 WAT, byte-identical resend) — see source-config-email tick note. Jira zero TDSD transitions in window — TDSD-6729 unchanged Work in progress. Calendar zero delta on Sun→Mon view (Lattice block only).

Factors: source=slack, skim_tick, deterministic_epoch_compute_oldest=1777180200, oldest_le_now_assertion_passed, tier1_zero_deltas_ops_and_alerts, active_p1_silence_continuation_no_novel_trigger, no_new_immediate_dispatch, structural_anomaly_via_email_source_config, awareness_candidate_briefing_apr27.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), 2 Tier 1 deltas on #teamapt-tech-operations during overnight delegation window — both active P1s now Immediate-tier dispatched at 06:00 resume (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick (Step 0: level=full, rationale=briefing-tick — floor override). Window 21:10:00Z Apr 25 → 05:10:00Z Apr 26 = 8h overnight. Tier 1 channels read-by-default sweep with `oldest=1777151400` (deterministic compute from prior `last_processed=2026-04-25T21:10:00Z`; runtime assertion `oldest <= now (1777180230)` passed):

- **#teamapt-tech-operations (C0ABU8GMW75): 2 messages** —
  - **02:01 WAT Apr 26 (Qazim Adedigba) — CoralPay (ZIB) RC91 P1**, structured post: "Product: Switch, Incident Summary: P1: CoralPay (ZIB) RC 91 Failures, Identified Cause: From the bank, Resolution Action: The issue has been escalated to the Coralpay for review, Incident Duration: Ongoing, Start Time: 2:01 AM, End Time: Ongoing." 4h09m active at tick. Salience factors: `channel=tier1_ops`, `keyword_floor=P1+RC91`, `active_situation_match=coralpay-fbn-turned-off-production-deploy-did-not-prevent-recurrence`, `recurrence_within_6h_of_apr25_close (TDSD-6728)`, `escalating_recurrence_trajectory_1h53m_18h44m_4h09m`, `no_tdsd_ticket`, `sender_weighting=ops_lead_qazim`, `urgency_dominant`, `pattern_significance_dominant`. **Briefing-2026-04-26 D1.** **Immediate-tier dispatched** (combined draft with Access Bank to D081JT4AD0Q at 06:10 WAT — overnight delegation policy resume at 06:00 fired).
  - **02:05 WAT Apr 26 (Qazim Adedigba) — Access Bank RC91 P1**, structured post: "Product: ATS, Incident Summary: P1: Access Bank RC 91 Failures, Identified Cause: From the bank, Resolution Action: Issue escalated to the bank for resolution, Incident Duration: Ongoing, Start Time: 2:05 AM, End Time: Ongoing." 4h05m active at tick. Salience factors: `channel=tier1_ops`, `keyword_floor=P1+RC91`, `active_situation_match=access-bank-multi-track-failures`, `cycle8_breaks_3-50m_auto_recovery_pattern_cycles1_7`, `anomalous_duration_4x_upper_bound`, `tdsd6729_filed_02-24_wat_19min_lag`, `sender_weighting=ops_lead_qazim`, `urgency_dominant`, `pattern_significance_dominant`. **Briefing-2026-04-26 D2.** **Immediate-tier dispatched** (combined draft above).

- **#account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE):** zero messages each. Overnight Saturday→Sunday quiet across alerts/Paystack/dev/product channels.

DM (`to:me after:1777151400` search) zero results. Keyword sweep covered by Tier 1 reads (both P1s landed on the ops channel).

**Active P1 silence-rule check (post-overnight resume):**
- CoralPay ZIB RC91 active 4h09m, no resolution signal — exceeds 1h absence-of-signal Immediate threshold; alert dispatched at 06:00 resume per overnight delegation policy.
- Access Bank RC91 active 4h05m, no resolution signal — same; alert dispatched at 06:00 resume (combined DM with above).
- Latest visible state: Hourly Reports 20260426 01:56 WAT (5min BEFORE both P1s) — 14/17 routes operational. No 03:00 / 04:00 / 05:00 hourly reports overnight (consistent with overnight cadence gap).

Cross-source: email caught Hourly Reports 20260426 01:56 WAT thread 19dc749cf20cd04b. Jira sweep returned 3 Layer A deltas (TDSD-6729 Access Bank cycle 8 filed 02:24 WAT Work in progress; TDSD-6728 CoralPay ZIB Apr 25 incident Completed 02:13 WAT — direct precursor to Apr 26 cycle; TDSD-6721 PENDING PAYABLE POSTING Closed 23:44 WAT Apr 25). Layer B 0 deltas. Calendar: Mon Apr 27 11-meeting day with 2 hard overlaps (TPP×Plat vs Channels Onboarding 11:30, ATPP vs Tech support 16:00); Sun Apr 26 clear. Drive backlog 22 unchanged.

Factors: source=slack, briefing_tick, deterministic_epoch_compute_oldest=1777151400, oldest_le_now_assertion_passed, tier1_two_deltas_p1_coralpay_zib_+_access_bank, both_active_at_tick, immediate_tier_dispatch_at_06_00_resume, post_overnight_delegation_window, no_dm_keyword_zero, four_other_tier1_silent.

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick (last tick before overnight delegation), single Stanbic cycle 34 delta on Tier 1 ops channel (preserved summary)

22:10 WAT Apr 25 Saturday skim tick. Window 19:10:00Z → 21:10:00Z = 2h. Tier 1 read with `oldest=1777144200` (deterministic, assertion passed). #teamapt-tech-operations 1 message — Olamide Ajibulu Stanbic ATS RC91 cycle 34 P1 21:01 WAT (10–14m bank-resolved fast-cycle, two-track with email thread 19dc63afd3c001f0). Other 4 Tier 1 silent. DM/keyword 0. Stanbic cycle 34 single-track-Jira regression continues across cycles 33+34.

### last_processed 2026-04-25T19:10:00Z (20:10 WAT) — skim-level 20:00-cron tick, single Account Switch maintenance announcement delta on Tier 1 Paystack channel (preserved summary)

20:10 WAT Apr 25 Saturday skim tick. Mustapha Ajibade #teamapt-x-paystack-transfer-support 18:19 WAT planned Account Switch maintenance Apr 26 6:00PM WAT (~3h downtime), tagged Paystack reps. Briefing-tier classification, awareness candidate.

### last_processed 2026-04-25T17:10:00Z (18:10 WAT) — skim-level 18:00-cron tick, single firewall-HA-notification delta on Tier 1 (preserved summary)

18:10 WAT Apr 25 Saturday skim tick. Tier 1: #teamapt-tech-operations 1 message — Mustapha 17:26 WAT firewall HA change announcement (TDSD-6699, 6pm Apr 25, NIBSS leased-line → VPN, no downtime). Cross-referenced into [[NIBSS PTSA — VPN Flapping Apr 22]] situation page. Other 4 Tier 1 silent. DM/keyword 0. Planned change Briefing-tier, no Immediate.

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (10min late), zero-delta (preserved summary)

17:10 WAT Apr 25 Saturday skim tick. Window 15:10:00Z → 16:10:00Z = 1h. All 5 Tier 1 silent. DM 0, keyword 0. FCMB cycle 2 fresh email-only signal at 16:04 WAT (caught via email keyword sweep this tick, not Slack). Five consecutive zero-delta skim ticks (13:10/14:10/15:10/16:10/17:10 WAT). Cross-source: TDSD-6716 NIBSS PTSA Completed at 16:20 WAT (Jira sweep delta this tick) — no Slack signal.

### last_processed 2026-04-25T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (10min late), zero-delta (preserved summary)

16:10 WAT Apr 25 Saturday skim tick. Four consecutive zero-delta ticks. Afeez FCMB RC91 email at 15:04:26Z within window — filed email-only, caught by next tick keyword sweep.

### last_processed 2026-04-25T09:10:00Z–14:10:00Z — preserved summary block

Multiple skim ticks across late Saturday morning/afternoon, mostly zero-delta. Notable: 10:10 WAT recovered Wema RC91 P1 08:39 WAT after 09:10 WAT epoch-bug false zero (deterministic-compute directive added).

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — full-level briefing-tick, 3 P1 messages overnight + Immediate-tier dispatch (preserved summary)

06:09 WAT Apr 25 briefing tick. 3 #teamapt-tech-operations P1 messages: Habari VPN flap 02:06–02:13 WAT (auto-recovery 7min); Access Bank brief RC91 02:21–02:32 WAT (auto-recovery 11min); FCMB RC91 02:33 WAT Ongoing (3h36m+ at tick, Immediate-tier DM dispatched). DM 0, keyword 3-hits.

### last_processed 2026-04-24T21:10:00Z–earlier — preserved summary block

22:10 WAT Apr 24 Friday skim zero-delta. 20:10 WAT Apr 24 Habari/GTB RC91 first observation (18:36:58 WAT, 25min cycle bank-resolved). Earlier preserved.
