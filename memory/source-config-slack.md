---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-25T07:10:00Z (08:10 WAT). 08:10 WAT Apr 25 skim-tick: zero-delta — 5 Tier 1 channels silent, DM scan 0, keyword scan 0, FCMB-specific search 0. FCMB P1 from 02:33 WAT (briefing-2026-04-25 D1) implicit-resolved via email cross-source (07:02 WAT hourly report 14/17 routes operational, FCMB no longer in failure list)."
updated: "2026-04-25T08:27:55Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T08:10:00Z"
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

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, zero-delta confirmed (Wema cycle was email-only)

09:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=saturday-morning-quiet-priors-active-situations-monitoring). Window 07:10:00Z → 08:10:00Z = ~1h. **All 5 Tier 1 channels silent** — `slack_read_channel(oldest=1777705800)` returned 0 parent messages across C0ABU8GMW75, C098VUQCVRA, C096LCNP26P, C08PH35PLPK, C090UHR9VDE. DM scan `to:me after:2026-04-25` = 0. Keyword scan `(P1 OR RC91 OR outage OR breach) after:2026-04-25` = 0. Wema-specific keyword search not separately run (covered by RC91 keyword sweep).

**Cross-source: Wema Bank RC91 cycle Apr 25 captured email-only.** Per [[source-config-email]] 09:10 tick note: thread "Wema Bank | RC91 | 20260425" filed 08:34:50 WAT by Afeez Kazeem to switching&payments_services@wemabank.com (CC aptpaytechnicalsupport), bank-resolved 08:49:10 WAT (14m20s, two-way confirmation with Peace Etim). **No Slack P1 post made** — confirmed by zero-delta in Tier 1 channel sweep + zero-delta in keyword scan. **5th Wema cycle in 17 days; filing-channel divergence (Slack-driven Apr 17/23, email-only Apr 25) suggests Afeez opting into the lighter email path for fast-cycle expectations.**

**Active P1 silence-rule check:** No active P1s open at tick time. FCMB resolved by trajectory at 07:02 WAT (briefing-2026-04-25 D1 implicit closure); Stanbic cycle 33 closed 06:06 WAT; Wema Apr 25 cycle closed 08:49 WAT before tick. No Immediate dispatch.

Factors: `skim_tick`, `saturday_morning`, `tier1_silent`, `dm_zero`, `keyword_scan_zero`, `wema_cycle_email_only_no_slack_post`, `filing_channel_divergence_slack_to_email_for_fast_cycles`, `cross_source_email_carries_full_signal`, `no_active_p1_at_tick`, `no_immediate_dispatch_this_tick`.

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, zero-delta + FCMB implicit-resolved via email cross-source (preserved summary)

08:10 WAT Apr 25 skim. All 5 Tier 1 silent, DM 0, keyword 0, FCMB-keyword 0. FCMB P1 from 02:33 WAT implicit-resolved via 07:02 WAT email hourly report (14/17 routes operational, FCMB dropped from failure list). Pre-emptive Immediate dispatch from briefing-2026-04-25 06:19 WAT remains user's primary alert channel.

### last_processed 2026-04-25T06:14:54Z (07:14 WAT) — skim-level 07:00-cron tick, Stanbic cycle 33 single delta (preserved summary)

07:14 WAT Apr 25 skim. #teamapt-tech-operations 1 new parent message — Qazim Stanbic RC91 P1 06:56 WAT (cycle 33, 04:58–06:06 WAT, 1h08m bank-resolved with service-restart). 4d12h58m gap from cycle 32 close = longest inter-cycle quiet in pattern. 4 other Tier 1 silent. DM/keyword 0. Cross-source 0.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — full-level briefing-tick, 3 P1 messages overnight + Immediate-tier dispatch (preserved summary)

06:09 WAT Apr 25 briefing tick. 8h overnight window. 3 #teamapt-tech-operations P1 messages: Habari VPN flap 02:06–02:13 WAT (7min auto-recovery, RC91 persists); Access Bank brief RC91 02:21–02:32 WAT (11min auto-recovery); FCMB RC91 02:33 WAT Ongoing (3h36m+ at tick, Immediate-tier DM dispatched). DM 0, keyword 3-hits.

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
