---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-24T05:09:00Z (06:09 WAT). Briefing-tick full sweep: all 5 Tier 1 channels empty since 22:09 WAT Apr 23 (8h10m overnight quiet); keyword scan 0 hits; DM scan 0 hits. Clean overnight delegation window — captured in briefing-2026-04-24 A1."
updated: "2026-04-24T05:26:30Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T05:09:00Z"
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

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep

06:09 WAT Apr 24 briefing tick: **all 5 Tier 1 channels empty since 22:09 WAT Apr 23** (8h10m overnight delegation window clean). Keyword search `(P1 OR RC91 OR RC96 OR RC05 OR RC06 OR outage OR breach) after:2026-04-23` returned 0 results. DM scan `to:me after:2026-04-23` returned 0. Per briefing-2026-04-24 A1 — structural signal that overnight delegation continues to work.

No situation updates triggered by Slack sweep this tick. Ecobank compound situation (briefing-2026-04-24 D1) driven by email + Jira sources; no overnight Slack re-surface of Ecobank RC91 despite ongoing route-off state.

### last_processed 2026-04-23T21:09:00Z (22:09 WAT) — skim-tick elevated to full on delta (preserved)

22:09 WAT Apr 23 tick: 4 of 5 Tier 1 channels empty; #teamapt-tech-operations 4 new parent messages (Qazim incident posts) — Polaris 5h20m + CoralPay ZIB 1h53m Immediate-dispatched via DM draft; Wema TDSD-6705 + Access 11m resolved in-window. 6h tick-gap observation (17/18/20 WAT ticks did not run).

### Tick 2026-04-23 16:11 WAT (preserved from prior note)

Full tick: 4 of 5 Tier 1 channels empty; #teamapt-tech-operations ONE new message (Olamide Ajibulu 15:54 WAT Ecobank RC91 P1 cycle #2 Start 15:47 WAT — Immediate-tier dispatched, DM draft already exists in self-DM so cycle-B was folded into that draft's narrative). Cross-source asymmetry tracker codification threshold crossed at 3 data points within 24h.
