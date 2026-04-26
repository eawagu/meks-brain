---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-26T09:10:00Z (10:10 WAT). 10:10 WAT Apr 26 skim-tick: 1 Tier 1 delta — Daniel Armstrong NEW P1 Access Bank DD Mandate Creation Failures (401 OAuth) at 10:07 WAT (Start 09:36 WAT). Immediate-tier dispatched. CoralPay ZIB cycle silent for 4h post-briefing-dispatch (8h09m+ total). No Jira-side closure post for Access cycle 8 propagated to Slack ops channel."
updated: "2026-04-26T09:23:38Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T09:10:00Z"
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

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (4h after Sunday briefing), 1 Tier 1 delta — Daniel Armstrong NEW P1 Access Bank DD Mandate Creation Failures (401 OAuth, Start 09:36 WAT)

10:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-active-2-p1s-since-briefing-tick-pattern). Window 07:10:00Z → 09:10:00Z = 2h spanning 09:00-cron tick (which appears not to have fired or fired silent — no source-config updates between 08:25 WAT Apr 26 prior-tick and this 10:10 WAT tick).

**Epoch bug recurrence note.** First-attempt `slack_read_channel` call at this tick used `oldest=1777705800` (the same 7-days-future value documented in the directive above, evidently retained from training-time priors). Returned zero messages — false zero-delta. Re-issued with deterministic compute (`int(parse_iso('2026-04-26T06:10:00Z').timestamp()) = 1777183800`) and assertion `oldest <= now` passed. This proves the directive is necessary but not sufficient — the bug recurs unless deterministic compute is the FIRST step every tick, not a fallback after observing zero-result. The MISS tuple from 2026-04-25 should be amended to note the directive alone does not prevent recurrence.

**Tier 1 channel reads (corrected epoch `oldest=1777183800`):**

- **#teamapt-tech-operations (C0ABU8GMW75): 1 message.** **NEW P1 — Daniel Armstrong** (now-active duty engineer post-08:01 WAT handover from Qazim) filed at 10:07 WAT: _"Product: DD, Incident Summary: P1: Access Bank | DD | Mandate Creation Failures, Incident Impact: Customers are unable to complete Authentication, Identified Cause: 401 https://acs-connector.accessbankplc.com/api/v1/acs-connector/oauth/, Resolution Action: The issue has been escalated to the bank for investigation and resolution, Incident Duration: Ongoing, Start Time: 9:36AM."_ Active 31m at posting (Slack-stated start 09:36 WAT, posted 10:07 WAT) / ~38m at this tick. **First incident under Daniel's day shift.** **Distinct failure mode from RC91 cycle 8** — 401 OAuth authentication-layer failure on the ACS connector, not transaction-routing. Bilateral track email simultaneously sent (caught by source-config-email this tick). Salience factors: `channel=C0ABU8GMW75`, `keyword_floor=P1+Mandate+Failures+401+UNAUTHORIZED`, `active_situation_entity_match=access-bank+access-bank-multi-track-failures`, `sender_weighting=daniel_armstrong_active_duty_engineer`, `bot_sender=false`, `dm=false`, `mention=false`, `urgency=p1_active`, `accountability_alignment=cto_oversight_credential_remediation_theme`, `cto_specificity=high_credential_rotation_hypothesis`, `pattern_significance=multi_track_concurrent_third_access_p1_in_8h`, `immediate_tier_dispatched_at_10:10_wat`.
- **#account-switch-alerts (C098VUQCVRA): 0 messages.** Sunday morning quiet on alert channel.
- **Other Tier 1 (C096LCNP26P, C08PH35PLPK, C090UHR9VDE): 0 messages each** — confirmed via channel reads.

DM (`to:me after:1777183800` keyword search) — broad keyword query `(P1 OR RC91 OR resolved OR Coralpay OR ZIB OR \"Access Bank\" OR settlement OR mandate) after:2026-04-26` returned only the new Access DD P1 already captured above.

**Active P1 silence-rule check (4h post-briefing-Immediate-dispatch):**
- CoralPay ZIB RC91 active 8h09m+ at this tick — 4h continued silence past 06:10 WAT briefing dispatch. No closure post, no TDSD ticket, no Slack signal from any source about ZIB. config-salience absence-of-signal Immediate threshold (1h no update) crosses again, but this is continuation of the same condition already dispatched at 06:22 WAT — no novel trigger.
- Access Bank cycle 8 RC91 — closed bank-side at 07:54 WAT (TDSD-6729 Resolution=Done) per prior tick. **No Slack closure post observed** on #teamapt-tech-operations across 4h+ since closure (workflow gap: 5h49m anomalous-duration P1 resolved without ops-channel acknowledgement).
- **Access Bank DD Mandate Creation Failures NEW P1 — 38min active at this tick. Below 2h Immediate-trigger threshold by duration alone, but the new-P1 trigger fired regardless of duration. Immediate dispatched.**

**Cross-source disambiguation:** Email caught the simultaneous bilateral track for the new DD P1 (`19dc9102d9bde88a` 10:12 WAT) plus historical TDSD-6729 cycle 8 thread context (`19dc7640c5af3022`). Jira caught TDSD-6730 created+completed 09:20 WAT Daniel Armstrong "Resync | RC96 | 20260423" (historical resync, low signal) — confirms Daniel is doing tickets-side cleanup as part of day-shift onboarding. No new TDSD ticket for ZIB cycle. Calendar zero new in 2h. Drive not checked (backlog hold).

Factors: source=slack, skim_tick, deterministic_epoch_compute_oldest=1777183800, oldest_le_now_assertion_passed, epoch_bug_recurred_first_attempt_then_corrected, tier1_one_delta_new_dd_p1, distinct_failure_mode_authentication_layer, daniel_armstrong_first_p1_under_day_shift, third_access_p1_in_8h, no_zib_signal_4h_silence, immediate_tier_dispatched, briefing_apr27_decision_candidate.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (2h after Sunday briefing), zero Tier 1 deltas — Tier 1 ops + alerts silent for 2h+ since briefing Immediate dispatch (preserved summary)

08:10 WAT Apr 26 Sunday skim tick. Window 06:10:00Z → 07:10:00Z = 1h. Tier 1 read with `oldest=1777183800` (deterministic compute). Both active P1s silent. Cross-source: email 2 deltas (Hourly Reports 3rd byte-identical resend post-TDSD-6729-resolution + Duty Handover routine shift change). Jira 1 delta (TDSD-6729 → Completed/Done 07:54 WAT, end-to-end 5h49m). No Immediate dispatch.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), zero Tier 1 deltas (preserved summary)

07:10 WAT Apr 26 Sunday skim tick. Both Tier 1 ops + alerts 0 messages. Email 1 delta (Hourly Reports 06:44 WAT byte-identical resend, ambiguous at the time). No Immediate dispatch.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), 2 Tier 1 deltas on #teamapt-tech-operations during overnight delegation window — both active P1s now Immediate-tier dispatched at 06:00 resume (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick. 2 P1 messages Qazim Adedigba CoralPay ZIB RC91 02:01 WAT + Access Bank RC91 02:05 WAT. Combined Immediate-tier Slack DM dispatched.

### last_processed 2026-04-25T21:10:00Z (22:10 WAT) — skim-level 22:00-cron tick — preserved summary

22:10 WAT Apr 25 Saturday skim. Stanbic ATS RC91 cycle 34 P1 21:01 WAT (10–14m bank-resolved fast-cycle).

### last_processed 2026-04-25T17:10:00Z–20:10:00Z — preserved summary block

Multiple Saturday late-afternoon/evening skim ticks. 20:10 Account Switch maintenance announcement; 18:10 firewall HA TDSD-6699; 17:10 zero-delta.

### last_processed 2026-04-25T09:10:00Z–16:10:00Z — preserved summary block

Multiple Saturday morning/afternoon skim ticks, mostly zero-delta. 10:10 WAT recovered Wema RC91 P1 08:39 WAT after 09:10 WAT epoch-bug false zero (deterministic-compute directive added).

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — full-level briefing-tick (preserved summary)

3 #teamapt-tech-operations P1 messages: Habari VPN flap, Access brief RC91, FCMB RC91 cycle 1 (Immediate dispatched).

### last_processed 2026-04-24T21:10:00Z–earlier — preserved summary block

Apr 24 Friday skim ticks. 22:10 zero-delta. 20:10 Habari/GTB RC91 first observation.
