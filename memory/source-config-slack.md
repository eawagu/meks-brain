---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-24T16:09:00Z (17:09 WAT). 17:09 WAT Apr 24 full-level zero-delta tick: all 5 Tier 1 channels silent since 16:09 WAT prior tick (1h00m quiet). Keyword + DM scans 0 hits. Slack-side quiet 1h40m from 15:29 WAT Afeez UBA P1 template post (already captured prior tick)."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T16:09:00Z"
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

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level zero-delta tick

17:09 WAT Apr 24 tick: `slack_read_channel(oldest=1777043340)` across all 5 Tier 1 channels → 0 messages. Keyword scan `(P1 OR RC91 OR RC96 OR RC05 OR RC06 OR RC69 OR outage OR breach OR compromised) after:2026-04-24` → 0 results. DM scan `to:me after:2026-04-24` → 0. Briefing-2026-04-24 D2 Org Changes meeting currently in progress (16:30–18:00 WAT) may account for Slack-side quiet. Cross-source: email 1 Layer 1 invite (Tracy Ojaigho TPP x Platformization Apr 27) + reconciliation bucket threads; Jira 2 TDSD + 4 software deltas.

Factors: `zero_delta`, `no_immediate_dispatch`, `all_tier1_channels_silent`.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick, UBA RC91 fast-cycle captured (preserved)

16:09 WAT Apr 24 tick: `slack_read_channel(oldest=1777039740)` swept all 5 Tier 1 channels. Results: 1 new message in #teamapt-tech-operations — Afeez Kazeem P1 template post 15:29 WAT for UBA RC 91 Failures (Start Time 15:24 WAT, Identified Cause "From the bank"). Corresponding Jira [[TDSD-6722]] filed 15:28 WAT → Completed 15:56 WAT (28-min fast-cycle, Afeez self-assigned). Duty handover 16:07 WAT retagged TDSD-6722 as "UBA RC91 failures ; VPN Downtime" — VPN-downtime proximate cause, not bank-side switch. Folded into [[UBA Bank — RC91 P1 Apr 17]] as 4th failure mode in 7 days. Other 4 Tier 1 channels empty. Keyword + DM scans 0. **No Immediate-tier dispatch this tick** — UBA RC91 cycle already Completed 15:56 WAT before heartbeat observation.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level zero-delta tick (preserved summary)

15:09 WAT Apr 24 tick: all 5 Tier 1 channels empty. Keyword + DM scans 0. Cross-source: email 3 reconciliation threads (Stanbic settlement validation pending, Stanbic DCIR API documentation follow-up, Union Bank chargeback reminder); Jira 3 Opeyemi-cluster deltas (TDSD-6714 Closed + TDSD-6720 NEW + TDSD-6721 NEW).

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level zero-delta tick (preserved summary)

14:09 WAT Apr 24 tick: all 5 Tier 1 channels silent. Cross-source: Ecobank DCIR user-creation 3-week escalation (thread 19dbf704dc7edb8a, 13:21 WAT) third DCIR-portal failure mode.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: all 5 Tier 1 channels empty since 22:09 WAT Apr 23 (8h10m overnight clean). Keyword + DM scans 0.
