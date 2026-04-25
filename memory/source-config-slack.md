---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-25T09:10:00Z (10:10 WAT). 10:10 WAT Apr 25 skim-tick: 1 Tier 1 delta recovered — Wema RC91 P1 post #teamapt-tech-operations 08:39 WAT (corrects prior 09:10 WAT tick's false zero-delta caused by wrong epoch 1777705800 = 7d future). Other 4 Tier 1 silent. DM 0, keyword scan 0. MISS captured for epoch arithmetic bug."
updated: 2026-04-25
cssclasses:
  - "source-config"
last_processed: "2026-04-25T09:10:00Z"
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

### last_processed 2026-04-25T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick, 1 Tier 1 delta recovered + epoch-bug correction

10:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend+active-situations+2h-since-last-sweep,no-immediate-firing). Window 08:10:00Z → 09:10:00Z = ~1h, but effective recovery window covers the prior 09:10 WAT tick's missed range (08:10–09:10 WAT) because of the epoch bug.

**`slack_read_channel(oldest=1777101000)` on C0ABU8GMW75 returned 1 parent message:** Afeez Kazeem P1 template post at 08:39 WAT — "Product: ATS, Incident Summary: P1: Wema RC 91 Failures Across Processors, Identified Cause: From the bank, Resolution Action: The issue has been escalated to the bank for resolution, Start Time: 08:27 AM, End Time: Ongoing." Active-situation entity match → [[Wema Bank — RC91 P1 Apr 17]]. Folded into situation page with explicit correction delta (10:10 WAT) noting the prior tick's false email-only framing and recovery via this tick.

**Other 4 Tier 1 channels silent.** DM scan (U080PEXEZ0E): 0 messages. Keyword scan `(P1 OR outage OR RC91 OR RC96 OR breach OR incident OR down) after:2026-04-25` returned 0 results — Slack search index has not yet caught up to the 08:39 WAT post (channel-read picked it up, search did not). Confirms Tier 1 channel-read is the load-bearing sweep step; keyword search alone is insufficient.

**Bug capture:** prior 09:10 WAT tick used `oldest=1777705800` = 2026-05-02 07:10 UTC = 7 days in the future. Channel-read against future epoch returned zero, propagated false zero-delta into source-config-slack note + Wema situation page. Both corrected this tick. MISS captured to `MISS-slack-epoch-bug-09-10-wat-tick-2026-04-25.md` with structural fix candidate (deterministic epoch compute + `oldest <= now()` assertion). Added new "Epoch arithmetic — deterministic compute MANDATORY" directive to this source-config (above).

**Active P1 silence-rule check:** No active P1s open at tick time. Wema cycle resolved 08:49 WAT, FCMB resolved by trajectory at 07:02 WAT, Stanbic cycle 33 closed 06:06 WAT. No Immediate dispatch.

Factors: `skim_tick`, `saturday_morning`, `tier1_channel_read_recovery`, `wema_rc91_p1_post_08_39wat_recovered`, `keyword_search_index_lag_zero_results`, `prior_tick_epoch_bug_corrected`, `dm_zero`, `no_active_p1_at_tick`, `no_immediate_dispatch_this_tick`, `miss_captured_slack_epoch_bug`.

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, FALSE zero-delta due to epoch bug (preserved for audit, see Epoch arithmetic directive)

09:10 WAT Apr 25 Saturday skim tick. **The "zero-delta confirmed" finding in this prior summary was an artifact of an epoch arithmetic bug — `oldest=1777705800` (May 2) was used instead of `1777101000` (Apr 25). The Wema Apr 25 cycle WAS posted to Slack at 08:39 WAT and was recovered by the 10:10 WAT tick. The "Wema cycle email-only" framing in the original 09:10 WAT note is incorrect and superseded by the 10:10 WAT note above.**

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
