---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-23T21:09:00Z (22:09 WAT). Skim-tick elevated to full on delta: #teamapt-tech-operations 4 new Qazim incident posts — 2 active P1s (Polaris 5h20m, CoralPay ZIB 1h53m) dispatched Immediate-tier DM, 2 resolved in-window (Wema TDSD-6705 2h, Access 11m). 6h tick-gap observation — 17/18/20 WAT ticks did not run."
updated: "2026-04-23T21:18:59Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-23T21:09:00Z"
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

### last_processed 2026-04-23T21:09:00Z (22:09 WAT) — skim-tick elevated to full on delta

22:09 WAT Apr 23 tick: **4 of 5 Tier 1 channels empty; #teamapt-tech-operations 4 new parent messages** (all Qazim Adedigba incident posts):
1. **CoralPay (ZIB) RC91** Start 20:16 WAT Ongoing (Product: Switch) — Immediate #1 new P1, 1h53m active at tick.
2. **Polaris Bank RC91** Start 16:49 WAT Ongoing — Immediate #2 threshold exceeded (5h20m active, P1 >2h unresolved).
3. **Access Bank brief RC91** 16:47–16:56 WAT (11min, bank-auto-recovered).
4. **Wema Bank RC91/22** Start 16:44 WAT Ongoing (resolved via TDSD-6705 Completed 18:45 WAT).

Immediate-tier DM dispatched consolidating Polaris + CoralPay ZIB to user (U080PEXEZ0E). Wema + Access captured as context (resolved). Situation page updates written: [[Sterling + Polaris — Routes Degraded]], [[Wema Bank — RC91 P1 Apr 17]], [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] (new ZIB re-enablement regression framing).

DM scan: 0 new DMs to user. Keyword scan (P1|outage|RC91|RC96|RC05|RC06|breach|compromised|transaction failure|settlement failure) after 15:11Z: 0 additional hits beyond the Tier 1 channel-read deltas.

**6h tick-gap observation** — prior tick at 16:11 WAT; expected ticks at 17/18/20 WAT did not run (reason unknown, not a Slack-source issue). All 4 new parent messages were in the 16:11→22:09 WAT gap. Skim-tick fast-path promoted to full on delta per Step 0 directive.

### Tick 2026-04-23 16:11 WAT (preserved from prior note)

Full tick: 4 of 5 Tier 1 channels empty; #teamapt-tech-operations ONE new message (Olamide Ajibulu 15:54 WAT Ecobank RC91 P1 cycle #2 Start 15:47 WAT — Immediate-tier dispatched, DM draft already exists in self-DM so cycle-B was folded into that draft's narrative). Cross-source asymmetry tracker codification threshold crossed at 3 data points within 24h.
