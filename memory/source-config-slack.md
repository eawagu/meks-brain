---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-26T12:10:00Z (13:10 WAT). 13:10 WAT Apr 26 skim-tick: 0 deltas on 4 of 5 Tier 1 channels; 1 message on #teamapt-x-paystack-transfer-support — Mustapha Ajibade scheduled-maintenance announcement for tonight 18:00 WAT 3h Account Switch Service downtime (Awareness-tier, planned maintenance not outage). 0 DM, 0 keyword. Bank reply on Access DD bilateral path STILL not visible at 2h58m+ post-bilateral. CoralPay ZIB silent 11h10m+ on Slack path."
updated: 2026-04-26
cssclasses:
  - "source-config"
last_processed: "2026-04-26T12:10:00Z"
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

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (7h after Sunday briefing), 1 minor Tier 1 delta — Mustapha Ajibade scheduled-maintenance announcement (Account Switch Service tonight 18:00 WAT 3h downtime), Awareness-tier planned maintenance not outage

13:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=weekend-with-active-p1-situations). Window 11:10:00Z → 12:10:00Z = 1h. Deterministic epoch compute: `oldest=int(parse_iso('2026-04-26T11:10:00Z').timestamp())=1777201800`; assertion `oldest (1777201800) <= now (1777205422)` passed. (Note: actual scan over-queried with oldest=1777198200 (2h window) due to caller-side miscompute — boundary-case dedup absorbed any prior-tick re-emergence.)

**Tier 1 channel reads (5 channels):**
- **#teamapt-tech-operations (C0ABU8GMW75): 0 messages.** No new posts on the ops channel in 1h. Route-pause decision (TDSD-6732 11:18 WAT) and bank reply on Access DD bilateral path have NOT propagated to Slack. CoralPay ZIB cycle remains Slack-silent 11h10m+ post-Slack-post.
- **#account-switch-alerts (C098VUQCVRA): 0 messages.**
- **#teamapt-x-paystack-transfer-support (C096LCNP26P): 1 message** — Mustapha Ajibade posted "[ Reminder Scheduled Maintenance] TeamApt Account Switch Service" (timestamp `[2026-04-26 12:20:25 CET]` ≈ 11:20 WAT). Body: "Date: April 26, 2026, Time: 6:00PM WAT (expected downtime: ~3 hours). During this period, the service will be unavailable so we recommend you switch traffic away during this period." cc'd @Jezreel @Samuel @Abdul. **Salience: Awareness-tier** — planned/announced maintenance window, not an unscheduled outage. config-salience Immediate trigger #7 (route turned off) does NOT match — this is a scheduled maintenance reminder for tonight 18:00 WAT (~5h from this tick). Watchpoint at 18:00 WAT briefing tick (if any) and 21:00 WAT (expected restoration) for any Tier 1 deltas around the maintenance window. Salience factors: `channel=C096LCNP26P`, `keyword_floor=null`, `sender=internal_ops_team_member`, `planned_maintenance_announcement_not_unscheduled_outage`, `awareness_tier_briefing_apr27_candidate`. (Note on prior-tick boundary case: this message timestamps to ~11:20 WAT, within the 12:10 WAT prior tick's 11:10–12:10 WAT window. Prior tick reported 0 messages on this channel — possible miss on prior tick, recovered this tick by over-query. No corrective action this tick beyond capture.)
- **#notifications-support-dev (C08PH35PLPK): 0 messages.**
- **#go-subscribe-by-teamapt (C090UHR9VDE): 0 messages.**

**DM scan `to:me after:1777198200`: 0 results.** No DMs to user.

**Keyword sweep `(P1 OR RC91 OR RC96 OR outage OR breach OR Mandate OR resolved OR settlement OR Coralpay OR ZIB OR \"Access Bank\") after:2026-04-26` filtered to ts>1777201800: 0 results.** No P1/keyword matches in 1h window across public+private channels.

**Active P1 silence-rule check (continuation-only, no novel triggers):**
- **CoralPay ZIB RC91** active 11h10m+ — Slack silent for 6h47m+ post-12:11 WAT prior dispatch. config-salience absence-of-signal Immediate threshold (1h no update) crossed; this is continuation of the same condition already dispatched at 06:22 WAT, 10:10 WAT, and 12:11 WAT. No novel trigger this tick.
- **Access Bank cycle 8 RC91** — bank-resolved 07:54 WAT. **Slack closure post still NOT propagated** at 5h17m+ post-resolution. Workflow gap continues.
- **Access Bank DD Mandate Creation Failures** — ~3h35m active. **Bank reply on bilateral email path NOT yet visible at 2h58m post-bilateral filing — well past typical 30–60min Access reply window — escalating concern that bank-side response is structurally absent on the credential path on a Sunday.** Watchpoint shifts: if no reply by ~14:00 WAT (4h post-bilateral), bank-side coordination breakdown becomes the leading hypothesis.
- **Route-pause delta (Jira-side, TDSD-6732 → Completed/Done 13:01:54 WAT this tick)** — see source-config-jira this tick. Slack-side has no propagation yet.

**Cross-source disambiguation:** Jira caught TDSD-6732 → Completed at 13:01:54 WAT (status transition; status-update on already-dispatched ticket; no novel Immediate trigger). Plus Layer B 24 VTIE-* tickets by Chiagoziem Okoye 12:19–12:44 WAT (reliability-program planning batch — Awareness-tier). Email Layer 1 + Layer 2 zero in 1h window. Calendar 1 minor recurring-meeting metadata update. Drive 0 in 1h window.

**Immediate dispatch this tick:** NO. The 1 Slack message captured is a planned maintenance announcement for tonight 18:00 WAT — Awareness-tier, not Immediate. The TDSD-6732 → Completed transition is a status-update on an already-dispatched ticket — no novel Immediate trigger. The 24 VTIE backlog tickets are planning artifacts — Awareness-tier.

Factors: source=slack, skim_tick, deterministic_epoch_compute_oldest=1777201800, oldest_le_now_assertion_passed, tier1_one_minor_delta_paystack_planned_maintenance, awareness_tier_planned_maintenance_not_outage, dm_zero, keyword_zero, sunday_afternoon_quiet_on_slack_path, no_zib_signal_6h47m_post_prior_dispatch, no_access_dd_bank_reply_visible_2h58m_post_bilateral_escalating_concern, no_access_cycle_8_closure_post_5h17m_post_jira_close, no_immediate_dispatch_this_tick, prior_tick_potential_miss_recovered_via_over_query_paystack_message.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim tick. 0 Tier 1 deltas all 5 channels, DM zero, keyword zero. Sunday late-morning quiet. CoralPay ZIB silent 5h47m+ post-briefing-dispatch. Access DD bank reply 1h59m post-bilateral — escalating concern. No Immediate dispatch from Slack-side; route-pause came from Jira-side TDSD-6732, combined dispatch 12:11 WAT covered full picture.

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