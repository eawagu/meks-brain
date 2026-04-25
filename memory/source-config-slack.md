---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-25T05:09:54Z (06:09 WAT). 06:09 WAT Apr 25 briefing-tick full sweep: 3 P1 messages overnight in #teamapt-tech-operations (Habari VPN flap 02:06–02:13 WAT autoreconnected, Access Bank brief RC91 02:21–02:32 WAT auto-recovered, **FCMB RC91 02:33 WAT Ongoing — Immediate-tier dispatched, 3h36m+ active**). 4 other Tier 1 channels silent. DM scan 0 hits. Keyword scan caught the 3 P1s (no FCMB closure signal)."
updated: "2026-04-25T05:27:00Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T05:09:54Z"
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

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — full-level briefing-tick, 3 P1 messages overnight + Immediate-tier dispatch

06:09 WAT Apr 25 Saturday briefing tick. Window 21:10:00Z Apr 24 → 05:09:54Z Apr 25 = ~8h overnight. **#teamapt-tech-operations 3 new P1 messages from [[Qazim Adedigba]]:**

1. **02:06–02:13 WAT — Habari VPN tunnel disconnect:** "Status: Habari VPN tunnel was briefly disconnected, RC 91 issue persists. Resolution: VPN autoreconnected. Duration 7min." VPN-flap layer auto-recovered in 7min; RC91 issue persisted independently of the VPN flap. Cross-references: [[HabariPay]], [[GTBank]].

2. **02:21–02:32 WAT — Access Bank brief RC91:** "P1: Access Bank Brief RC 91 Failures. Identified Cause From the bank. Resolution Action: Transaction auto recovered. Duration 11 min." Bank-resolved fast-cycle. Within Access Bank pattern. Awareness tier.

3. **02:33 WAT — FCMB RC91 Ongoing P1:** "P1: FCMB RC 91 Failures Across Processors. Identified Cause From the bank. Resolution Action: The issue will be escalated to the bank for resolution. Incident Duration: Ongoing." Marked Ongoing at 02:37 WAT post-time. **No resolution signal between 02:33 and 06:09 WAT (3h36m+ active). No FCMB Jira ticket created in window. Exceeds 2h Immediate-tier silence threshold (config-salience trigger #2). Immediate-tier Slack DM dispatched to user D081JT4AD0Q via `slack_send_message_draft`.**

**4 other Tier 1 channels silent.** DM scan `to:me after:2026-04-24` returned 0 hits. Keyword scan caught the 3 P1s above plus job-management noise. Cross-source: email captured 02:20 WAT hourly report (Habari + Zenith failing RC91 escalated to partners) + Union Bank RC96 fast-cycle thread; Jira captured TDSD-6727 Union RC96 + TDSD-6726 Habari Problem ticket; calendar zero deltas (weekend clear); drive zero genuinely new.

Factors: `briefing_tick`, `full_level`, `overnight_window_8h`, `tier1_channel_3_p1_messages`, `fcmb_p1_active_3h36m_immediate_dispatched`, `habari_vpn_flap_with_rc91_persists`, `access_brief_fast_cycle_within_pattern`, `keyword_scan_3_hits`, `dm_scan_zero_hits`, `cross_source_email_jira_aligned`.

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim-level scheduled 22:00-cron tick (10min late), zero-delta (preserved summary)

22:10 WAT Apr 24 Friday skim tick. Window 19:10–21:10 UTC = 2h. All 5 Tier 1 channels silent. Keyword + DM 0. Cross-source: email 0; Jira 2 Layer B CRLF-fix closures (ADD-4584/4574 Bukola Taiwo); calendar 0; drive 0.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick, Habari/GTB RC91 first observation (preserved summary)

20:10 WAT Apr 24 full tick. Habari (GTB) RC91 P1 first observation in brain at 18:36:58 WAT (Olamide structured post, 25min cycle bank-resolved). Paystack-transfer 18:26:05 WAT inflow apply (Mustapha + Christine Ogude, paired with TDSD-6725 Resolved 18:56 WAT).

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta (preserved)

18:09 WAT Apr 24 tick: 0 new across all 5 Tier 1. Keyword + DM 0. Cross-source minor.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level UBA RC91 fast-cycle (preserved summary)

16:09 WAT Apr 24 tick: Afeez P1 template UBA RC91 15:29 WAT. TDSD-6722 Completed 15:56 WAT (28m). Folded into [[UBA Bank — RC91 P1 Apr 17]].

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: all 5 Tier 1 channels empty since 22:09 WAT Apr 23 (8h10m overnight clean). Keyword + DM 0.
