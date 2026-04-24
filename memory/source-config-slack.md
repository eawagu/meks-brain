---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-24T10:09:00Z (11:09 WAT). 11:09 WAT Apr 24 skim-level tick, elevated on deltas: #teamapt-x-paystack-transfer-support produced 3 parent messages — Caret user 10:26 WAT treasury application request for ₦1.07B new inflow + Christine Ogude 10:35 WAT acknowledgment + 10:54 WAT Done. Correlates to TDSD-6717 filed+resolved 10:38-10:53 WAT. Routine treasury ops, different direction from Paystack-balance-below-₦200m alert pattern. Other 4 Tier 1 channels bot-only noise / empty. Keyword scan + DM scan both 0. No Immediate dispatch."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T10:09:00Z"
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
*(Empty — maintained via monthly periodic review + weekly suspected-bot bulk-confirm per config-salience. Bot-only channels identified as candidates enter a one-week verification queue before being added here.)*

## Notes

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta

11:09 WAT Apr 24 tick: `slack_read_channel(oldest=1777021740)` swept all 5 Tier 1 channels. Deltas:

- **C096LCNP26P #teamapt-x-paystack-transfer-support — 3 parent messages + 5 bot-like/empty**:
  - 10:26 WAT (sender name not in feed, likely external caret/bot-integration user): *"Hi <@U086Y6AT6TH|Mustapha Ajibade> <@U09CW6MAV8A|Christine Ogude> kindly see new inflows that are yet to be applied shaded in yellow. Bank statement and balance screenshot attached. Kindly apply *#1,074,864,192.35*"* — treasury application request, ₦1.07B.
  - 10:35 WAT [[Christine Ogude]]: "Hi <@U03T571RK9P|Ono (Caret)>, acknowledged" — Christine acks Caret-side user. Ono = caret.xyz integration (Paystack treasury operational counterpart).
  - 10:54 WAT [[Christine Ogude]]: "Done" — balance applied.
  - Same-day Jira formalization: [[TDSD-6717]] "PAYSTACK BALANCE ADJUSTMENT APRIL 24TH 2026" filed 10:38 WAT by [[Christine Ogude]], assignee [[Daniel Fetuga]], Medium Service Request with approvals, Resolved 10:53 WAT (15m filed→resolved). Matches Slack exactly. Routine treasury ops. **Different direction from the Paystack-balance-below-₦200m alert pattern** (Daniel Armstrong Apr 23 00:51 WAT + Afeez Kazeem Apr 24 09:27 WAT) — this is an inflow application, not a low-float alert. Does not compound with the ₦200m-alert pattern. Factors: source=slack+jira_correlation, channel=C096LCNP26P, tier1, routine_treasury_ops, fast_close_15m_filed_to_resolved, different_direction_from_low_float_pattern, awareness_only, no_cto_action.
  - 10:57:05, 10:57:07, 10:57:25 WAT — three empty-sender bot-like messages, no content surface.

- **C098VUQCVRA #account-switch-alerts — 5 bot-only messages** (10:27, 10:32, 10:57:05, 10:57:21, 10:57:50 WAT). All empty-sender per channel baseline. No content surface.

- **C0ABU8GMW75 + C08PH35PLPK + C090UHR9VDE — empty.** Zero messages since 10:09 WAT prior tick.

**Keyword scan** `(P1 OR RC91 OR RC96 OR RC05 OR RC06 OR RC69 OR outage OR breach OR compromised) after:2026-04-24` with `after=1777021740` filter: **0 results**. **DM scan** `to:me after:2026-04-24` with same epoch filter: **0 results**.

**No Immediate-tier dispatch this tick.** TDSD-6716 (NIBSS response-not-sent) surfaced via email+jira sources but Slack carried zero signal on it — consistent with the pattern that NIBSS response-not-sent events are email-layer phenomena with Jira formalization rather than Slack ops-channel material.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta (preserved summary)

10:09 WAT Apr 24 tick: `slack_read_channel(oldest=1777018200)` swept all 5 Tier 1 channels. Deltas: C096LCNP26P 2 new parent messages — Afeez Kazeem ~09:27 WAT Paystack-balance-below-₦200m alert (2nd such alert in 2 days; briefing-2026-04-23 A4 was the 1st) and Peace Emmanuel ~09:36 WAT dispute review request to Chioma (routine); other 4 Tier 1 channels empty / bot-join noise; keyword scan + DM scan both 0 hits; no Immediate dispatch.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — zero-delta tick (preserved)

09:10 WAT Apr 24 tick: all 5 Tier 1 channels empty since 08:09 WAT prior tick (3h01m post-briefing clean window). Keyword + DM scans: 0 hits.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — zero-delta tick (preserved)

08:09 WAT Apr 24 tick: all 5 Tier 1 channels empty since 07:10 WAT prior tick. Keyword + DM scans: 0.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved)

06:09 WAT Apr 24 briefing tick: **all 5 Tier 1 channels empty since 22:09 WAT Apr 23** (8h10m overnight delegation window clean). Keyword + DM scans: 0.
