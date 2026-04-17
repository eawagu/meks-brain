---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-17T13:10:00Z."
updated: "2026-04-17T13:16:12Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T13:10:00Z"
---

## Connection

Slack MCP (workspace-scoped). User ID for DM dispatch: U080PEXEZ0E. Tier 1 channels: #teamapt-tech-operations (C0ABU8GMW75), #account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE).

## Directives

### Priority model
- Tier 1: listed channels above — read every tick.
- Tier 2: DMs mentioning the user — read every tick.
- Tier 3: keyword matches across public + private via `slack_search_public_and_private`.

### Keyword rules
- Primary: RC91, P1, outage, degraded, intermittent, failing, failure, down.
- Issuer names (always): Stanbic, Ecobank, Sterling, Polaris, Wema, NIBSS, PTSA, NUS, CoralPay.

### Skip rules
- Ignore bot-only status pings that produce no delta vs. the last recorded state.
- Ignore messages in channels not listed above unless surfaced via keyword search.

### Known limitations
- `slack_search_public_and_private` with space-separated terms is AND-only (no boolean). Use channel reads for authoritative coverage; use search only to confirm specific keyword presence.
- Rate-limiting observed on parallelized channel reads + searches. Retry once when encountered; continue the tick if persistent.

## Notes

Tick 2026-04-17 13:10 WAT window (13:09 → 14:10 WAT): Zero activity across all Tier 1 channels. Zero DMs to user. Zero keyword matches for RC91, NIBSS PTSA, Polaris, Ecobank. NIBSS PTSA P1 remained silent (3h07m since Moses Ajani 11:03 WAT, 4h41m total duration). Polaris Bank P1 silent 2h31m since 11:39 WAT filing — crosses Immediate #2 threshold. Ecobank thread silent 1h55m since Adewuyi pushback 12:15 WAT — contested attribution still unresolved. One consolidated Immediate dispatch sent to user DM covering NIBSS + Polaris (third consecutive silent-P1 tick for each). Transient rate-limiting observed on #notifications-support-dev read and one search retry; second attempt succeeded.
