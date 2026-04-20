---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T05:09:34Z. 06:09 WAT Monday briefing tick: overnight delegation window quiet — zero new Tier 1 parent messages, zero DMs, zero Tier 3 keyword matches. Sunday support-cadence routing held through evening; Stanbic cycle 31 closure traveled via Jira not Slack."
updated: "2026-04-20T05:36:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T05:09:34Z"
---

## Connection

Slack MCP (workspace-scoped). User ID for DM dispatch: U080PEXEZ0E. Tier 1 channels: #teamapt-tech-operations (C0ABU8GMW75), #account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE).

## Directives

### Priority model
- Tier 1: listed channels above — read every tick.
- Tier 2: DMs mentioning the user — read every tick.
- Tier 3: keyword matches across public + private via `slack_search_public_and_private`.

### Keyword rules
- Primary: RC91, RC05, P1, outage, degraded, intermittent, failing, failure, down.
- Issuer names (always): Stanbic, Ecobank, Sterling, Polaris, Wema, NIBSS, PTSA, NUS, CoralPay, FCMB, Keystone, Access, UBA, Fidelity, Habari.

### Skip rules
- Ignore bot-only status pings that produce no delta vs. the last recorded state.
- Ignore messages in channels not listed above unless surfaced via keyword search.

### Sweep order (MUST execute in this order each tick)
1. **Read** all Tier 1 channel parent messages since last_processed — enumerate every new P1 filing, not only threads linked to existing situation pages. (Structural guard against the 2026-04-17 Wema miss.)
2. **Cross-check** any P1 filings from step 1 against existing situation pages — if untracked, create a new situation page.
3. **Read** DMs to user.
4. **Search** keyword matches (Tier 3) for the window.
5. **Per-message** salience reasoning + brain-wide similarity search.

### Known limitations
- `slack_search_public_and_private` with space-separated terms is AND-only. Use channel reads for authoritative coverage; use search only to confirm specific keyword presence.
- Rate-limiting on parallelized channel reads + searches. Retry once; continue the tick if persistent.
- Search index lag: recent messages often return zero even when surfaced via channel-read. Channel-read is authoritative.

## Notes

Tick 2026-04-20 06:09 WAT **full-level (06:00 briefing floor)**. Window: 20:09 WAT Apr 19 → 06:09 WAT Apr 20 (~10h, includes overnight delegation window 23:00–06:00 WAT).

Tier 1 channel reads — **zero new parent messages in-window** across all five Tier 1 channels (#teamapt-tech-operations, #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt). Overnight delegation quiet confirmed.

DM sweep — zero new DMs to user in-window.

Keyword sweep Tier 3 — zero new matches on RC91, RC05, P1, outage, or issuer names across public+private.

Pattern note: Stanbic cycle 31 closed overnight via [[TDSD-6629]] Completion (~00:08 WAT Apr 20, inferred from Jira transition) — no Slack closure marker observed, contrasting prior cycles where #teamapt-tech-operations often carried closure confirmations. Within-pattern variance, not an anomaly — closure-carrier channel varies cycle-to-cycle.

Weekend-to-Monday transition: Sunday support-cadence pattern (quiet Slack + active email) held through Sunday evening and overnight. Monday activation not yet observed at 06:09 WAT — team typically starts ~08:30 WAT with DTB standup.

No Immediate dispatch. No Slack signals accumulated to briefing-2026-04-20 as primary source; indirect accumulation via the Stanbic situation page update (Awareness A1) whose closure signal arrived through Jira.
