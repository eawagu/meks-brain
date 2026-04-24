---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, directives. last_processed 2026-04-24T14:09:00Z (15:09 WAT). 15:09 WAT Apr 24 full-level zero-delta tick: all 5 Tier 1 channels silent since 14:09 WAT prior tick (1h00m quiet); keyword scan + DM scan 0 hits. Total Slack-side quiet now 4h01m from 11:09 WAT Paystack treasury ops closeout."
updated: "2026-04-24T14:19:40Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T14:09:00Z"
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

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level zero-delta tick

15:09 WAT Apr 24 tick: `slack_read_channel(oldest=1777036140)` swept all 5 Tier 1 channels. Results: all 5 channels empty in 14:09→15:09 WAT tick window. **Keyword scan** `(P1 OR RC91 OR RC96 OR RC05 OR RC06 OR RC69 OR outage OR breach OR compromised) after:2026-04-24` with `after=1777036140` filter: **0 results**. **DM scan** `to:me after:2026-04-24` with same epoch filter: **0 results**.

**No Immediate-tier dispatch this tick.** Cross-source: email sweep captured 3 reconciliation-workstream threads — Stanbic settlement validation pending (thread 19dbfa48d456d605, 14:18 WAT, David Oseji asking for session 14:23 WAT), Stanbic DCIR API documentation follow-up (thread 19dbfae110fa739c, 14:28 WAT), Union Bank chargeback reminder (thread 19d77d38df87404c, 14:49 WAT). All Awareness-level ops signals. Jira sweep captured 3 NEW Opeyemi-cluster deltas — TDSD-6714 Closed 14:48 WAT by Opeyemi (Samuel Amos reporter, NEW cluster-reporter); TDSD-6720 NEW PENDING SETTLEMENT 14:43 WAT Blessing Olawale→Opeyemi (first Blessing-Olawale routing-bypass); TDSD-6721 NEW PENDING PAYABLE POSTING 14:53 WAT Samson Anaele→Opeyemi. Slack carried zero signal on these — consistent with the pattern that email reconciliation + Jira routing-changes are not ops-channel material.

Total Slack-side quiet now 4h01m from 11:09 WAT Paystack treasury ops closeout (Christine "Done" 10:54 WAT).

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level zero-delta tick (preserved summary)

14:09 WAT Apr 24 tick: all 5 Tier 1 channels silent since 13:09 WAT prior tick. Keyword scan + DM scan 0 hits. Cross-source: Ecobank DCIR user-creation 3-week escalation email (thread 19dbf704dc7edb8a, 13:21 WAT) captured by email sweep — third DCIR-portal failure mode layer on Ecobank. TDSD-6719 Verve TTP RC06 Problem ticket + TDSD-6696 Incident Completed captured by Jira sweep. TDSD-6718 7m fast-close by Opeyemi Ahmed captured by Jira sweep — hardens Monnify Settlements Opeyemi-cluster ownership evidence.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level zero-delta tick (preserved summary)

13:09 WAT Apr 24 tick: all 5 Tier 1 channels empty. Keyword scan + DM scan 0 hits. Cross-source: NIBSS PTSA formal-escalation email layer captured by email sweep; TDSD-6718 NEW Opeyemi-direct-assigned refund ticket captured by Jira sweep.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — skim-level zero-delta tick (preserved summary)

12:09 WAT Apr 24 tick: all 5 Tier 1 channels silent since 11:09 WAT prior tick (1h01m quiet); keyword scan + DM scan 0 hits. Paystack treasury ops sequence from prior tick closed out (Christine "Done" 10:54 WAT); no new activity.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — skim elevated to full on delta (preserved summary)

11:09 WAT Apr 24 tick: Paystack treasury ops sequence 10:26→10:54 WAT (Caret treasury application ₦1.07B → Christine "Done"); TDSD-6717 closed 10:53 WAT. Routine treasury ops. Other channels empty.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick full sweep (preserved)

06:09 WAT Apr 24 briefing tick: all 5 Tier 1 channels empty since 22:09 WAT Apr 23 (8h10m overnight delegation window clean). Keyword + DM scans: 0.
