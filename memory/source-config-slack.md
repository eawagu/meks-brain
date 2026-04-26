---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-26T14:10:00Z (15:10 WAT). 15:10 WAT Apr 26 skim-tick: 0 Tier 1 deltas (all 5 channels silent in 1h window); 0 DM deltas; 0 keyword deltas. Sunday afternoon quiet on Slack path. CoralPay ZIB cycle silent ~13h09m+ since 02:01 WAT filing (continuation, no novel Immediate trigger). Access DD Mandate ~5h33m active (TDSD-6731 still WIP at Babajide). No Immediate dispatch."
updated: 2026-04-26
cssclasses:
  - "source-config"
last_processed: "2026-04-26T14:10:00Z"
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

### last_processed 2026-04-26T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (9h after Sunday briefing), 0 deltas all paths

15:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-afternoon-active-p1-watch). Window 13:10:00Z → 14:10:00Z = 1h. Deterministic epoch compute: `oldest=int(parse_iso('2026-04-26T13:10:00Z').timestamp())=1777209000`; assertion `oldest (1777209000) <= now (1777212664)` passed.

**Tier 1 channel reads (5 channels):**
- **#teamapt-tech-operations (C0ABU8GMW75): 0 messages.** Both active P1s (CoralPay ZIB, Access DD Mandate) remain Slack-silent.
- **#account-switch-alerts (C098VUQCVRA): 0 messages.**
- **#teamapt-x-paystack-transfer-support (C096LCNP26P): 0 messages.** Maintenance window 18:00 WAT → 21:00 WAT is ~2h50m from this tick.
- **#notifications-support-dev (C08PH35PLPK): 0 messages.**
- **#go-subscribe-by-teamapt (C090UHR9VDE): 0 messages.**

**DM scan `to:me after:1777209000`: 0 results.** No DMs to user.

**Keyword sweep `(P1 OR RC91 OR RC96 OR RC05 OR outage OR breach OR Mandate OR resolved OR settlement OR CoralPay OR ZIB OR Access) after:2026-04-26` filtered to ts>1777209000: 0 results.** No P1/keyword matches in 1h window across public+private channels.

**Active P1 silence-rule check (continuation-only, no novel triggers):**
- **CoralPay ZIB RC91** active ~13h09m+ — Slack silent for ~9h+ post-12:11 WAT prior dispatch. Continuation of condition already dispatched at 06:22, 10:10, 12:11 WAT today. No novel trigger this tick.
- **Access Bank cycle 8 RC91** — bank-resolved 07:54 WAT. **Slack closure post still NOT propagated** at ~7h17m+ post-resolution. Workflow gap continues.
- **Access Bank DD Mandate Creation Failures** — ~5h33m active. **Bilateral email path saw the 12:55 UTC ambiguous-sender thread message captured at the prior tick (predates this 1h window cutoff).** No new email or Slack signals this hour. TDSD-6731 (technical track at Babajide) UNCHANGED ~5h+. Bank-silence watchpoint 4h post-bilateral threshold passed at 14:12 WAT prior tick — bank-side `accessbankplc.com` sender still not visible. Watchpoint shifts to briefing-2026-04-27 Decision-item escalation if no `accessbankplc.com` sender by 06:10 WAT Apr 27 (per source-config-email).

**Cross-source disambiguation:** Email 0 deltas. Jira Layer A 0 deltas. Calendar 0 priority signals / 0 metadata updates. Drive 0 in-window files.

**Immediate dispatch this tick:** NO. Zero Slack deltas in window. All active-P1 conditions are continuation of already-dispatched alerts.

Factors: source=slack, skim_tick, deterministic_epoch_compute_oldest=1777209000, oldest_le_now_assertion_passed, tier1_zero_all_5_channels, dm_zero, keyword_zero, sunday_afternoon_quiet_on_slack_path, no_zib_signal_9h_post_prior_dispatch, no_access_dd_slack_propagation_of_email_signal, bank_silence_watchpoint_passed_4h_threshold_at_prior_tick, no_immediate_dispatch_this_tick.

### last_processed 2026-04-26T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (preserved summary)

14:10 WAT Apr 26 Sunday skim. 5 of 5 Tier 1 channels 0 deltas; 0 DM; 0 keyword. CoralPay ZIB silent 12h08m+. Access DD bank-silence watchpoint reaches 4h threshold at 14:12 WAT (3min post-tick). Email 1 ambiguous-sender thread message at 13:55 WAT (`aptpaytechnicalsupport@teamapt.com` signed "Temitayo Bashir Ola-Buraimo") — conservative read = TeamApt internal acknowledgment, bank silence persists. No Immediate dispatch.

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (preserved summary)

13:10 WAT Apr 26 Sunday skim. 4 of 5 Tier 1 channels 0 deltas; 1 message on #teamapt-x-paystack-transfer-support — Mustapha Ajibade scheduled-maintenance announcement (Account Switch Service tonight 18:00 WAT 3h downtime), Awareness-tier. 0 DM, 0 keyword. CoralPay ZIB silent 11h10m+. Access DD bank reply absent 2h58m post-bilateral. No Immediate dispatch.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim. 0 Tier 1 deltas all 5 channels, DM zero, keyword zero. Sunday late-morning quiet. CoralPay ZIB silent 5h47m+ post-briefing-dispatch. Access DD bank reply 1h59m post-bilateral — escalating concern. Combined dispatch 12:11 WAT covered full picture (route-pause from Jira-side TDSD-6732).

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (preserved summary)

11:10 WAT Apr 26 Sunday skim. Tier 1 zero deltas all 5 channels. DM zero. Keyword zero. CoralPay ZIB silent 5h+. Access DD Mandate ~1h36m active (TDSD-6731 Jira-side disambiguator). No Immediate dispatch.

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (preserved summary)

10:10 WAT Apr 26 Sunday skim. Epoch bug recurrence — first-attempt `oldest=1777705800` (7d-future); re-issued with deterministic compute. Tier 1 1 message: NEW P1 Daniel Armstrong 10:07 WAT Access Bank DD Mandate Creation Failures. Immediate dispatched.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (preserved summary)

08:10 WAT Apr 26. Tier 1 zero. Both active P1s silent. Cross-source: email 2 deltas, Jira 1 delta (TDSD-6729 → Completed). No Immediate.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (preserved summary)

07:10 WAT Apr 26. Tier 1 zero. Email 1 delta. No Immediate.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (preserved summary)

06:10 WAT Apr 26 briefing. 2 P1 messages — Qazim CoralPay ZIB + Access RC91 cycle 8. Combined Immediate-tier dispatched.

### last_processed 2026-04-25T21:10:00Z–earlier — preserved summary block

Apr 25 ticks (Stanbic ATS RC91 cycle 34, Account Switch maintenance, firewall HA, Wema epoch-bug recovery, BambooHR Layer 1 calibration miss, FCMB cycle 1, etc.).

### last_processed 2026-04-24T21:10:00Z–earlier — preserved summary block

Apr 24 Friday skim ticks. 22:10 zero-delta. 20:10 Habari/GTB RC91 first observation.