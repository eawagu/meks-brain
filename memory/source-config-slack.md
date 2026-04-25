---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-25T07:10:00Z (08:10 WAT). 08:10 WAT Apr 25 skim-tick: zero-delta — 5 Tier 1 channels silent, DM scan 0, keyword scan 0, FCMB-specific search 0. FCMB P1 from 02:33 WAT (briefing-2026-04-25 D1) implicit-resolved via email cross-source (07:02 WAT hourly report 14/17 routes operational, FCMB no longer in failure list)."
updated: "2026-04-25T07:16:58Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T07:10:00Z"
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
2. **User DM scan** — `slack_search_public_and_private(query="to:me after:<date>")` to catch DMs to user since last tick.
3. **Keyword scan (all channels)** — `slack_search_public_and_private` with Immediate triggers (P1, outage, RC91, RC96, RC05, RC06, breach, compromised, transaction failure, settlement failure) + `after=<epoch>` filter.
4. **Per-message salience reasoning** — for each new parent message, score factors per config-salience (channel identity, keyword floor, active-situation entity match, @mention, DM, sender weighting). Record triggering factors in the signal metadata.
5. **Epoch filter post-check** — Slack search results may include matches slightly before `oldest`/`after` timestamps due to indexing lag; filter result `message_ts` > epoch to avoid re-processing.
6. **Cost cap** — single-tick budget for Slack calls is bounded; skim-tick fast-path is a single search + channel-read sweep pair.

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

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, zero-delta + FCMB implicit-resolved via email cross-source

08:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=mid-morning post-briefing tick with active P1 requiring delta-check across all sources). Window 06:24:31Z → 07:10:00Z = ~46min. **All 5 Tier 1 channels silent.** DM scan `to:me after:2026-04-25` = 0. Keyword scan `(P1 OR RC91 OR RC96 OR RC05 OR outage OR FCMB)` = 0. FCMB-specific search `FCMB after:2026-04-25` = 0 (Slack indexing window does not include the 02:33 WAT FCMB P1 post under this query — the morning briefing tick caught it via channel-read).

**Cross-source: FCMB P1 implicit-resolved.** Email source captured the 07:02 WAT hourly report (Qazim) showing **14/17 routes operational** (vs 10/17 at 02:20 WAT). Failure list now reduced to: Coralpay banks (FBN/PVB/SBP) — turned-off business decision only. **FCMB, Habari, Zenith, and Union all dropped from failure list** between 02:33 WAT and 07:02 WAT. The morning briefing-2026-04-25 D1 active-FCMB-P1 question is now stale-resolved by trajectory (no explicit FCMB closure post in Slack — process gap noted; Slack-only P1 → no Jira ticket → no formal closure cadence). 08:06 WAT duty handover Qazim → Afeez (Afeez ack 08:10 WAT) confirms 14/17 stable into Afeez's morning shift.

**Active P1 silence-rule check:** FCMB at 02:33 WAT → 1h-no-update threshold crossed at 03:33 WAT historically; this tick does NOT fire Immediate alert because the 07:02 WAT hourly report constitutes the "update" (FCMB removed from failure list). Pre-emptive Immediate dispatch from briefing-2026-04-25 06:19 WAT remains the user's primary alert channel.

Factors: `skim_tick`, `saturday_mid_morning`, `tier1_silent`, `dm_zero`, `keyword_scan_zero`, `fcmb_implicit_resolved_via_email_cross_source`, `four_route_recovery_10_to_14`, `process_gap_no_fcmb_jira`, `no_immediate_dispatch_this_tick`, `briefing_tick_dispatch_already_active`.

### last_processed 2026-04-25T06:14:54Z (07:14 WAT) — skim-level 07:00-cron tick, Stanbic cycle 33 single delta

07:14 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=saturday-post-briefing-tick). Window 05:09:54Z → 06:14:54Z = ~65min. **#teamapt-tech-operations 1 new parent message — [[Qazim Adedigba]] Stanbic RC91 P1 structured post at 06:56 WAT:** "Product: ATS, Incident Summary: P1: Stanbic RC 91 Failures, Identified Cause: From the bank, Resolution Action: Service restart, Start Time: 4:58 AM, End Time: 6:06 AM." Cycle 33 → 1h08m bank-resolved (template Duration field still "Ongoing" alongside filled End Time — treating as resolved per End Time + Resolution Action populated, template inconsistency). 4d12h58m gap from cycle 32 close = longest inter-cycle quiet in the pattern. Active-situation entity match → [[Stanbic Bank ATS — Persistent RC91 Pattern]]; Awareness-tier (B6 calibration precedent: bank-owned recurring pattern, no CTO action). 4 other Tier 1 channels silent. DM scan 0 hits. Keyword scan returned 0 hits — Stanbic post not yet indexed at scan time (channel-read sweep caught it). Cross-source confirmation: email 0 deltas, Jira TDSD/Layer-B 0 deltas, calendar 0 deltas (1 long-running Lattice Review event, no recent modification). Drive last_processed stuck at 2026-04-20T16:09:00Z (4d15h stale, 5 unprocessed Notes-by-Gemini files visible in scan — out of scope for skim tick, deferred to next briefing tick).

Factors: `skim_tick`, `saturday_post_briefing`, `tier1_channel_single_p1_message`, `stanbic_cycle_33_within_pattern_+4m`, `longest_inter_cycle_gap_4d12h58m`, `service_restart_resolution_first_of_pattern`, `single_track_slack_only`, `keyword_scan_zero_hits_indexing_lag`, `dm_scan_zero_hits`, `cross_source_zero_deltas`, `drive_stuck_state_deferred`.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — full-level briefing-tick, 3 P1 messages overnight + Immediate-tier dispatch

06:09 WAT Apr 25 Saturday briefing tick. Window 21:10:00Z Apr 24 → 05:09:54Z Apr 25 = ~8h overnight. **#teamapt-tech-operations 3 new P1 messages from [[Qazim Adedigba]]:**

1. **02:06–02:13 WAT — Habari VPN tunnel disconnect:** "Status: Habari VPN tunnel was briefly disconnected, RC 91 issue persists. Resolution: VPN autoreconnected. Duration 7min." VPN-flap layer auto-recovered in 7min; RC91 issue persisted independently of the VPN flap. Cross-references: [[HabariPay]], [[GTBank]].

2. **02:21–02:32 WAT — Access Bank brief RC91:** "P1: Access Bank Brief RC 91 Failures. Identified Cause From the bank. Resolution Action: Transaction auto recovered. Duration 11 min." Bank-resolved fast-cycle. Within Access Bank pattern. Awareness tier.

3. **02:33 WAT — FCMB RC91 Ongoing P1:** "P1: FCMB RC 91 Failures Across Processors. Identified Cause From the bank. Resolution Action: The issue will be escalated to the bank for resolution. Incident Duration: Ongoing." Marked Ongoing at 02:37 WAT post-time. **No resolution signal between 02:33 and 06:09 WAT (3h36m+ active). No FCMB Jira ticket created in window. Exceeds 2h Immediate-tier silence threshold (config-salience trigger #2). Immediate-tier Slack DM dispatched to user D081JT4AD0Q via `slack_send_message_draft`.**

**4 other Tier 1 channels silent.** DM scan `to:me after:2026-04-24` returned 0 hits. Keyword scan caught the 3 P1s above plus job-management noise. Cross-source: email captured 02:20 WAT hourly report (Habari + Zenith failing RC91 escalated to partners) + Union Bank RC96 fast-cycle thread; Jira captured TDSD-6727 Union RC96 + TDSD-6726 Habari Problem ticket; calendar zero deltas (weekend clear); drive zero genuinely new.

Factors: `briefing_tick`, `full_level`, `overnight_window_8h`, `tier1_channel_3_p1_messages`, `fcmb_p1_active_3h36m_immediate_dispatched`, `habari_vpn_flap_with_rc91_persists`, `access_brief_fast_cycle_within_pattern`, `keyword_scan_3_hits`, `dm_scan_zero_hits`, `cross_source_email_jira_aligned`.

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level scheduled 22:00-cron tick (10min late), zero-delta (preserved summary)

22:10 WAT Apr 24 Friday skim tick. Window 19:10–21:10 UTC = 2h. All 5 Tier 1 channels silent. Keyword + DM 0. Cross-source: email 0; Jira 2 Layer B CRLF-fix closures (ADD-4584/4574 Bukola Taiwo); calendar 0; drive 0.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick, Habari/GTB RC91 first observation (preserved summary)

20:10 WAT Apr 24 full tick. Habari (GTB) RC91 P1 first observation in brain at 18:36:58 WAT (Olamide structured post, 25min cycle bank-resolved). Paystack-transfer 18:26:05 WAT inflow apply (Mustapha + Christine Ogude, paired with TDSD-6725 Resolved 18:56 WAT).

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta (preserved)

18:09 WAT Apr 24 tick: 0 new across all 5 Tier 1. Keyword + DM 0. Cross-source minor.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level UBA RC91 fast-cycle (preserved summary)

16:09 WAT Apr 24 tick: Afeez P1 template UBA RC91 15:29 WAT. TDSD-6722 Completed 15:56 WAT (28m). Folded into [[UBA Bank — RC91 P1 Apr 17]].

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: all 5 Tier 1 channels empty since 22:09 WAT Apr 23 (8h10m overnight clean). Keyword + DM 0.
