---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-26T06:10:00Z (07:10 WAT). 07:10 WAT Apr 26 skim-tick: zero Tier 1 deltas in 1h window — both active P1s (CoralPay ZIB + Access Bank) silent on #teamapt-tech-operations since 06:10 WAT briefing tick. No resolution posts, no escalation messages. Continuation of 06:22 WAT Immediate dispatch."
updated: "2026-04-26T07:20:02Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T07:10:00Z"
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

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (2h after Sunday briefing), zero Tier 1 deltas — Tier 1 ops + alerts silent for 2h+ since briefing Immediate dispatch

08:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-post-briefing-active-situations). Window 06:10:00Z → 07:10:00Z = 1h. Tier 1 channels read with `oldest=1777183800` (deterministic compute from `last_processed=2026-04-26T06:10:00Z`; runtime assertion `oldest <= now (1777187527)` passed):

- **#teamapt-tech-operations (C0ABU8GMW75): 0 messages.** No new P1, no resolution post for either active P1, no escalation. Tier 1 ops channel silent for 2h+ since 06:10 WAT briefing tick despite (a) Access cycle 8 resolution on Jira at 07:54 WAT and (b) ZIB cycle continuing at 6h09m+. **The Jira-side resolution did NOT propagate to Slack** — operational team's coordination channel silent on a 5h49m P1 closure.
- **#account-switch-alerts (C098VUQCVRA): 0 messages.** Sunday morning quiet on alert channel.
- **Other Tier 1 (C096LCNP26P, C08PH35PLPK, C090UHR9VDE): not read this skim tick** — fast-path Tier 1 prioritized to ops + alerts (where active P1 deltas would surface). Per skim-tick discipline these zero-traffic channels deferred to next full-tick.

DM (`to:me after:1777183800` keyword search) — broad keyword query `(P1 OR RC91 OR resolved OR Coralpay OR ZIB OR \"Access Bank\" OR settlement) after:2026-04-26` returned zero hits across public+private+IM scope. Search index lag caveat from 07:10 WAT tick still applies for sub-hourly deltas; channel-read zero corroborates the keyword zero.

**Active P1 silence-rule check (2h post-briefing-Immediate-dispatch):**
- CoralPay ZIB RC91 active 6h09m+ at this tick — 2h+ continued silence past 06:10 WAT briefing dispatch. No closure post, no TDSD ticket. config-salience absence-of-signal Immediate threshold (1h no update) crosses again, but this is continuation of the same condition already dispatched at 06:22 WAT — no novel trigger.
- Access Bank cycle 8 RC91 — **closed bank-side at or before 07:54 WAT (TDSD-6729 Resolution=Done) per Jira sweep this tick**. End-to-end 5h49m. **No Slack closure post observed** on #teamapt-tech-operations — this is a workflow gap: a 5h49m anomalous-duration P1 resolved without a Slack acknowledgement to the ops coordination channel. Continuation of the same hourly-report stale-state pattern (the 07:50 WAT report still says "0 tickets raised").
- **No new Immediate dispatch this tick.** Both signals are continuations of already-dispatched alerts; resolution is not an Immediate trigger.

Cross-source: Email caught 2 deltas — Hourly Reports 20260426 3rd byte-identical resend at 07:50 WAT (post-TDSD-6729-creation AND -resolution) + Duty Handover Note 20260426 at 08:01 WAT Qazim → Daniel Armstrong (routine shift change, ack 08:04 WAT). Jira caught 1 delta — TDSD-6729 → Completed/Done at 07:54 WAT, no other transitions. Calendar zero new deltas in 1h window. Drive zero in-window files.

Factors: source=slack, skim_tick, deterministic_epoch_compute_oldest=1777183800, oldest_le_now_assertion_passed, tier1_zero_deltas_ops_and_alerts, p1_resolution_jira_did_not_propagate_to_slack, ops_channel_silent_on_5h49m_p1_closure, zib_silence_continuation, no_new_immediate_dispatch, briefing_apr27_decision_candidate_workflow_gap_resolution_not_acknowledged_in_ops_channel.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), zero Tier 1 deltas (preserved summary)

07:10 WAT Apr 26 Sunday skim tick. Window 05:10:00Z → 06:10:00Z = 1h post-briefing-tick. Tier 1 read with `oldest=1777180200` (deterministic, assertion passed). #teamapt-tech-operations + #account-switch-alerts both 0 messages; other 3 Tier 1 deferred. DM/keyword 0. Both active P1s (CoralPay ZIB + Access Bank cycle 8) silent post-briefing-Immediate-dispatch — continuation, no novel trigger. Cross-source: email 1 delta (Hourly Reports 06:44 WAT byte-identical resend, contradicts TDSD-6729); Jira 0 deltas (TDSD-6729 unchanged Work in progress); Calendar 0; Drive 0. No new Immediate dispatch.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), 2 Tier 1 deltas on #teamapt-tech-operations during overnight delegation window — both active P1s now Immediate-tier dispatched at 06:00 resume (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick. Window 21:10:00Z Apr 25 → 05:10:00Z Apr 26 = 8h overnight. Tier 1 read with `oldest=1777151400`. #teamapt-tech-operations 2 messages — Qazim Adedigba CoralPay ZIB RC91 P1 02:01 WAT (Briefing-2026-04-26 D1, Immediate-tier dispatched) + Qazim Access Bank RC91 P1 02:05 WAT (Briefing-2026-04-26 D2, TDSD-6729 filed 02:24 WAT, combined Immediate-tier dispatch with above). Cycle 8 broke the auto-recovery pattern (4h05m active at tick, anomalous duration). Other 4 Tier 1 silent. DM/keyword 0. Combined Immediate-tier Slack DM dispatched to user at 06:10 WAT post-overnight-delegation resume.

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick (last tick before overnight delegation), single Stanbic cycle 34 delta on Tier 1 ops channel (preserved summary)

22:10 WAT Apr 25 Saturday skim tick. Window 19:10:00Z → 21:10:00Z = 2h. Tier 1 read with `oldest=1777144200`. #teamapt-tech-operations 1 message — Olamide Ajibulu Stanbic ATS RC91 cycle 34 P1 21:01 WAT (10–14m bank-resolved fast-cycle, two-track with email thread 19dc63afd3c001f0). Other 4 Tier 1 silent. DM/keyword 0. Stanbic cycle 34 single-track-Jira regression continues across cycles 33+34.

### last_processed 2026-04-25T17:10:00Z–20:10:00Z — preserved summary block

Multiple Saturday late-afternoon/evening skim ticks. 20:10 WAT Account Switch maintenance announcement. 18:10 WAT firewall HA change announcement (TDSD-6699). 17:10 WAT zero-delta.

### last_processed 2026-04-25T09:10:00Z–16:10:00Z — preserved summary block

Multiple Saturday morning/afternoon skim ticks, mostly zero-delta. Notable: 10:10 WAT recovered Wema RC91 P1 08:39 WAT after 09:10 WAT epoch-bug false zero (deterministic-compute directive added).

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — full-level briefing-tick, 3 P1 messages overnight + Immediate-tier dispatch (preserved summary)

06:09 WAT Apr 25 briefing tick. 3 #teamapt-tech-operations P1 messages: Habari VPN flap 02:06–02:13 WAT (auto-recovery 7min); Access Bank brief RC91 02:21–02:32 WAT (auto-recovery 11min); FCMB RC91 02:33 WAT Ongoing (3h36m+ at tick, Immediate-tier DM dispatched). DM 0, keyword 3-hits.

### last_processed 2026-04-24T21:10:00Z–earlier — preserved summary block

22:10 WAT Apr 24 Friday skim zero-delta. 20:10 WAT Apr 24 Habari/GTB RC91 first observation (18:36:58 WAT, 25min cycle bank-resolved). Earlier preserved.
