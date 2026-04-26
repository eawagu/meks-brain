---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-26T11:10:00Z (12:10 WAT). 12:10 WAT Apr 26 skim-tick: 0 Tier 1 deltas (all 5 channels silent in 1h window); 0 DM deltas; 0 keyword deltas. Sunday late-morning quiet on Slack path. CoralPay ZIB cycle silent 5h47m+ post-briefing-dispatch (10h10m active). Access DD bank reply still NOT visible 1h59m post-bilateral filing — past typical 30–60min Access reply window — escalating concern."
updated: 2026-04-26
cssclasses:
  - "source-config"
last_processed: "2026-04-26T11:10:00Z"
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
The Slack `oldest` parameter MUST be computed as `int(parse_iso(last_processed).timestamp())`. NEVER use precomputed epoch constants, week-shifted offsets, or arithmetic that can drift by week-aligned values (86400 × 7 = 604800 seconds). At call time, MUST assert `oldest <= int(time.time())` to refuse future epochs — a future epoch silently returns zero parent messages and produces a false zero-delta indistinguishable from a genuine quiet window. Bug history: 09:10 WAT Apr 25 tick used `oldest=1777705800` (= 2026-05-02 07:10 UTC) when intended `last_processed=1777101000` (= 2026-04-25 07:10 UTC), exactly 7 days in the future. Wema RC91 P1 post at 08:39 WAT was missed; recovered by 10:10 WAT tick re-sweep with corrected epoch. **This bug recurred at 10:10 WAT Apr 26 first attempt** with the same `oldest=1777705800` value despite directive — now hardened with deterministic compute in heartbeat run; bug is reproducible if epoch is hardcoded from training-time priors. See `MISS-slack-epoch-bug-09-10-wat-tick-2026-04-25.md`.

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

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (6h after Sunday briefing), 0 Tier 1 deltas — all 5 channels silent 1h, route-pause Immediate dispatched from Jira-side

12:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=non-briefing-tick-with-2-active-overnight-P1s-and-proximate-dad-reminder). Window 10:10:00Z → 11:10:00Z = 1h. Deterministic epoch compute: `oldest=int(parse_iso('2026-04-26T10:10:00Z').timestamp())=1777198200`; assertion `oldest (1777198200) <= now (1777201867)` passed.

**Tier 1 channel reads (5 channels, oldest=1777198200):**
- **#teamapt-tech-operations (C0ABU8GMW75): 0 messages.** No new posts on the ops channel in 1h. Route-pause decision (TDSD-6732 11:18 WAT) and bank reply on Access DD bilateral path have NOT propagated to Slack. CoralPay ZIB cycle remains Slack-silent 5h47m+ post-briefing-dispatch.
- **#account-switch-alerts (C098VUQCVRA): 0 messages.**
- **#teamapt-x-paystack-transfer-support (C096LCNP26P): 0 messages.**
- **#notifications-support-dev (C08PH35PLPK): 0 messages.**
- **#go-subscribe-by-teamapt (C090UHR9VDE): 0 messages.**

**DM scan `to:me after:1777198200`: 0 results.** No DMs to user in 1h.

**Keyword sweep `(P1 OR RC91 OR RC96 OR outage OR breach OR Mandate OR resolved OR settlement OR Coralpay OR ZIB OR \"Access Bank\") after:2026-04-26` filtered to ts>1777198200: 0 results.** No P1/keyword matches in 1h window across public+private channels.

**Active P1 silence-rule check (continuation-only, no novel triggers):**
- **CoralPay ZIB RC91** active 10h10m+ — Slack silent for 5h47m+ post-briefing-dispatch. config-salience absence-of-signal Immediate threshold (1h no update) crossed multiple times, but this is continuation of the same condition already dispatched at 06:22 WAT, 10:10 WAT, and 12:11 WAT (this tick covers the structural picture). No novel trigger.
- **Access Bank cycle 8 RC91** — bank-resolved 07:54 WAT. **Slack closure post still NOT propagated** at 4h17m+ post-resolution. Workflow gap continues — same as prior tick.
- **Access Bank DD Mandate Creation Failures** — ~2h35m active. **Bank reply on bilateral email path NOT yet visible at 1h59m post-bilateral filing — past typical 30–60min Access reply window — escalating concern.** This is a watchpoint signal: prior Access cycles had bank-side reply lag of ~30–60min (e.g., Tunde Akingbade's first reply at 02:39 WAT on cycle 8 was ~34min after Qazim's 02:05 WAT post). **Current Access DD lag now ≥1h59m and growing** — suggests credential-side rotation/expiry may not be a routine bank-side oversight (which Access usually replies to fast) but rather a coordination breakdown (bank ops uninvolved or unreachable on Sunday) or a more structural issue.
- **Route-pause delta (Jira-side, TDSD-6732 11:18 WAT) Immediate-dispatched at 12:11 WAT** — see source-config-jira this tick. Slack-side has no propagation yet; ops cadence on a Sunday afternoon may absorb this without surfacing in Slack.

**Cross-source disambiguation:** Jira caught TDSD-6732 at 11:18 WAT (Kabir Yusuf, route-pause + merchants notified). Email Layer 2 zero new in window (boundary-case dedup on the 09:12 UTC bilateral thread). Calendar zero new in 1h. Drive zero in 5h+ window (normal-chain handling active).

**Immediate dispatch this tick:** YES (from Jira-side per route-pause trigger #7 — see source-config-jira). Slack-side independently zero deltas. The combined dispatch covered Slack + Jira + email picture in one DM.

Factors: source=slack, skim_tick, deterministic_epoch_compute_oldest=1777198200, oldest_le_now_assertion_passed, tier1_zero_deltas_all_5_channels_1h, dm_zero, keyword_zero, sunday_late_morning_quiet_on_slack_path, no_zib_signal_5h47m_post_briefing_dispatch, no_access_dd_bank_reply_visible_1h59m_post_bilateral_escalating_concern, no_immediate_dispatch_from_slack_side_route_pause_came_from_jira, combined_dispatch_at_12_11_wat_covered_full_picture.

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (preserved summary)

11:10 WAT Apr 26 Sunday skim. Tier 1 zero deltas all 5 channels. DM zero. Keyword zero. CoralPay ZIB silent 5h+ post-briefing-dispatch. Access DD Mandate ~1h36m active (TDSD-6731 filed 10:18 WAT — Jira-side disambiguator). No Immediate dispatch.

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (preserved summary)

10:10 WAT Apr 26 Sunday skim. **Epoch bug recurrence** — first-attempt `oldest=1777705800` (7-days-future); re-issued with deterministic compute `oldest=1777183800`. Tier 1 1 message: NEW P1 Daniel Armstrong 10:07 WAT Access Bank DD Mandate Creation Failures (401 OAuth, Start 09:36 WAT). Bilateral track email simultaneously. Immediate dispatched at 10:10 WAT.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (preserved summary)

08:10 WAT Apr 26 Sunday skim. Tier 1 zero. Both active P1s silent. Cross-source: email 2 deltas (Hourly Reports 3rd resend + Duty Handover); Jira 1 delta (TDSD-6729 → Completed 07:54 WAT). No Immediate dispatch.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (preserved summary)

07:10 WAT Apr 26 Sunday skim. Both Tier 1 ops + alerts 0 messages. Email 1 delta (Hourly Reports 06:44 WAT byte-identical resend). No Immediate dispatch.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick. 2 P1 messages — Qazim CoralPay ZIB RC91 02:01 WAT + Access Bank RC91 02:05 WAT. Combined Immediate-tier Slack DM dispatched.

### last_processed 2026-04-25T21:10:00Z–earlier — preserved summary block

Apr 25 ticks (Stanbic ATS RC91 cycle 34, Account Switch maintenance, firewall HA, Wema epoch-bug recovery, BambooHR Layer 1 calibration miss, FCMB cycle 1, etc.).

### last_processed 2026-04-24T21:10:00Z–earlier — preserved summary block

Apr 24 Friday skim ticks. 22:10 zero-delta. 20:10 Habari/GTB RC91 first observation.