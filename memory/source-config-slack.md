---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-24T09:09:00Z (10:09 WAT). 10:09 WAT Apr 24 skim-level tick, elevated on deltas: #teamapt-x-paystack-transfer-support produced 2 new parent messages — Afeez Kazeem ~09:27 WAT Paystack-balance-below-₦200m alert (2nd such alert in 2 days; briefing-2026-04-23 A4 was the 1st) and Peace Emmanuel ~09:36 WAT dispute review request to Chioma (routine). Other 4 Tier 1 channels empty / bot-join noise. Keyword scan + DM scan both 0. No Immediate-tier dispatch."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T09:09:00Z"
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

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — skim elevated to full on delta

10:09 WAT Apr 24 tick: `slack_read_channel(oldest=1777018200)` swept all 5 Tier 1 channels. Deltas:

- **C096LCNP26P #teamapt-x-paystack-transfer-support — 2 new parent messages** (plus 2 empty bot-like messages skipped):
  - [[Afeez Kazeem]] at ~09:27 WAT: *"Hello <@U07UQ0C79QS|Chiamaka> <@U09CW6MAV8A|Christine Ogude> Please be informed that Paystack balance is currently below #200m, kindly assist look into this"*. Treasury-layer alert, no P1/outage framing, no CTO-tag. **2nd Paystack-balance-below-₦200m alert in 2 days** — briefing-2026-04-23 A4 captured the 1st (Daniel Armstrong 00:51 WAT Apr 23, same channel, same recipients). Pattern-awareness: two distinct reporters, same float threshold, ~33h apart. Not yet situation-page material (2 data points, different reporters, escalation path explicit to treasury). If a 3rd fires in the next 72h, open a treasury-float situation page. No Immediate dispatch. Factors: source=slack, channel=C096LCNP26P, tier1, active_situation_entity_match=paystack_treasury_recurring, treasury_tagged_not_cto, no_p1_markers, awareness_only, 2nd_alert_in_2_days, pattern_compounding_below_threshold.
  - Peace Emmanuel at ~09:36 WAT: dispute review request to <@U0259CDFBHA|Chioma> listing 4 APT-prefixed transaction IDs pending review. Routine Paystack disputes ops, no CTO signal. Factors: source=slack, channel=C096LCNP26P, tier1, routine_disputes_ops, no_cto_relevance, awareness_only.

- **C098VUQCVRA #account-switch-alerts — bot-only noise.** 1 empty-sender message at 09:27:50 WAT. Bot-authored per the channel's baseline. No content surface.

- **C08PH35PLPK #notifications-support-dev — join/noise only.** Gabriella Sanusi + Bukola Taiwo channel-join events at 09:35/09:20 WAT; 1 empty-sender Waqas Tabbasum message at 09:18 WAT. No operational content.

- **C0ABU8GMW75 + C090UHR9VDE — empty.** Zero new messages since 09:10 WAT prior tick.

**Keyword scan** `(P1 OR RC91 OR RC96 OR RC05 OR RC06 OR RC69 OR outage OR breach OR compromised) after:2026-04-24` with `after=1777018200` filter: **0 results**. **DM scan** `to:me after:2026-04-24` with same epoch filter: **0 results**.

**No Immediate-tier dispatch this tick.** Paystack balance alert is treasury-scope and has an ops-team owner trajectory (Chiamaka / Christine) — does not meet CTO Immediate triggers. Recurring-pattern observation recorded for next briefing compose (Sat 06:10 WAT).

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — zero-delta tick

09:10 WAT Apr 24 tick: all 5 Tier 1 channels empty since 08:09 WAT prior tick (3h01m post-briefing clean window). `slack_read_channel(oldest=1777061340)` returned 0 across C0ABU8GMW75 / C098VUQCVRA / C096LCNP26P / C08PH35PLPK / C090UHR9VDE. Keyword search `(P1 OR RC91 OR RC96 OR RC05 OR RC06 OR RC69 OR outage OR breach OR compromised) after:2026-04-24` returned 0. DM scan `to:me after:2026-04-24` returned 0.

Friday working-hours quiet held even as Jira surfaced TDSD-6713 (Keystone settlements 3am requery — filed 08:21 WAT by Daniel Armstrong) — ops-lead handling off-channel, consistent with prior 4-day-gap cycle (TDSD-6633) handling pattern.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — zero-delta tick

08:09 WAT Apr 24 tick: all 5 Tier 1 channels empty since 07:10 WAT prior tick. Keyword and DM scans: 0. Cross-source note: TDSD-6712 (NEW Kafka Monnify Live datasource Jira ticket) references a Slack message from the Moniepoint workspace C0812LH3BNJ — not observable via this TeamApt-scoped Slack MCP.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep

06:09 WAT Apr 24 briefing tick: **all 5 Tier 1 channels empty since 22:09 WAT Apr 23** (8h10m overnight delegation window clean). Keyword search `(P1 OR RC91 OR RC96 OR RC05 OR RC06 OR outage OR breach) after:2026-04-23` returned 0 results. DM scan `to:me after:2026-04-23` returned 0. Per briefing-2026-04-24 A1 — structural signal that overnight delegation continues to work.

### last_processed 2026-04-23T21:09:00Z (22:09 WAT) — skim-tick elevated to full on delta (preserved)

22:09 WAT Apr 23 tick: 4 of 5 Tier 1 channels empty; #teamapt-tech-operations 4 new parent messages (Qazim incident posts) — Polaris 5h20m + CoralPay ZIB 1h53m Immediate-dispatched via DM draft; Wema TDSD-6705 + Access 11m resolved in-window. 6h tick-gap observation (17/18/20 WAT ticks did not run).
