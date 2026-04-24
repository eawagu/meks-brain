---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-24T17:22:16Z (18:22 WAT). 18:22 WAT Apr 24 skim-level off-cron zero-delta tick (13min after prior 18:09 WAT): all 5 Tier 1 channels silent, keyword + DM scans 0 hits. Product-Engineering Sync meeting 18:00-19:00 WAT currently in progress."
updated: "2026-04-24T21:15:27Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T21:10:00Z"
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

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level scheduled 22:00-cron tick (10min late), zero-delta

22:10 WAT Apr 24 Friday skim tick. Window 19:10:00Z → 21:10:00Z = 2h. `slack_read_channel(oldest=1777057800)` across all 5 Tier 1 channels returned **0 new messages**. Keyword scan `(P1 OR RC91 OR RC05 OR RC06 OR RC69 OR outage OR breach OR compromised OR down) after:2026-04-24 after=1777057800` → 0 results. DM scan `to:me after:2026-04-24` → 0 results.

Clean Friday-evening window: Product-Engineering Sync 18:00–19:00 WAT concluded before last tick; no further Tier 1 activity through 22:10. 50min before overnight delegation window opens at 23:00 WAT. Active situations (Ecobank RC91 route-off, TDSD-6645 Dominic attribution-transfer 42h+ silent, NIBSS PTSA stable 37h+ post-transition, TDSD-6711 Ecobank DCIR portal 23h+ silent) all operating without new Slack-side signals this window.

Cross-source this tick: email 0 genuinely new (residual-cache filtered); Jira 2 Layer B CRLF security-fix closures (ADD-4584 22:07 WAT, ADD-4574 21:59 WAT — routine Bukola Taiwo hygiene, no active-situation match); calendar 0 deltas; drive 0 genuinely new (backlog 22 unchanged).

No Immediate dispatch this tick.

Factors: `skim_level`, `scheduled_cron_22wat_10min_late`, `zero_delta_all_5_tier1`, `keyword_scan_zero_hits`, `dm_scan_zero_hits`, `2h_clean_window`, `pre_overnight_delegation_50min`, `friday_evening`, `no_immediate_dispatch`, `cross_source_jira_2_layerB_crlf_fixes_no_match`.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick (10min late), Habari/GTB RC91 first observation

20:10 WAT Apr 24 full-level tick. Window 18:22:16Z → 19:10:00Z = 47m44s. **2 Tier 1 channels with deltas:**

**Channel C0ABU8GMW75 (#teamapt-tech-operations) — 1 new message.** [[Olamide Ajibulu]] structured P1 post at 18:36:58 WAT: Product Switch, "P1: Habari (GTB) RC 91 Failures", Start 18:30 WAT End 18:55 WAT (25m), "From Habari" cause, escalated to Habari team. **First RC91 observation on Habari/GTB route in brain** — pattern-significance signal; RC91 wave extends to GTB via [[HabariPay]] acquiring arm. Fast-cycle 25m bank-resolved. Entity-level tracking applied to [[GTBank]] + [[HabariPay]].

**Channel C096LCNP26P (#teamapt-x-paystack-transfer-support) — 2 new messages.** 18:26:05 WAT parent tagging Mustapha Ajibade + Christine Ogude: "apply *#4,500,000,000.00*" inflows with bank statement + balance screenshot. [[Christine Ogude]] "Done" 18:57:32 WAT — 22min cycle. Paired with TDSD-6725 Resolved 18:56 WAT same cycle. Routine Paystack inflow-application.

**3 Tier 1 channels silent.** Keyword + DM scans 0 hits (Habari P1 caught via channel-read, not keyword path — indexing lag). No Immediate dispatch (Habari retroactively-resolved, Paystack routine).

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim-level off-cron zero-delta tick (preserved)

18:22 WAT Apr 24 skim off-cron tick (13min after prior 18:09 WAT cron tick): all 5 Tier 1 channels silent; keyword + DM scans 0 hits. Product-Engineering Sync 18:00-19:00 WAT in progress.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta tick (preserved)

18:09 WAT Apr 24 tick: 0 new messages across all 5 Tier 1 channels. Keyword + DM 0. Cross-source: email 0; Jira 1 Layer A delta (TDSD-6713 Keystone settlements Completed 17:43 WAT) + 2 Layer B (ADD-4429/4426 DD bug fixes Done).

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level tick, UBA RC91 fast-cycle (preserved summary)

16:09 WAT Apr 24 tick: Afeez Kazeem P1 template post 15:29 WAT UBA RC91. TDSD-6722 Completed 15:56 WAT (28m fast-cycle). Folded into [[UBA Bank — RC91 P1 Apr 17]] as 4th failure mode in 7 days.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: all 5 Tier 1 channels empty since 22:09 WAT Apr 23 (8h10m overnight clean). Keyword + DM 0.
