---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-17T12:09:37Z."
updated: "2026-04-17T12:18:51Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T12:09:37Z"
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

## Notes

Tick 2026-04-17 12:09 WAT window: NIBSS PTSA P1 remained silent (2h06m since Moses Ajani 11:03 WAT) and crossed 3h40m total duration. Polaris Bank P1 silent 1h30m since 11:39 WAT filing. Adewuyi Mayowa pushed back on Ecobank reopen at 12:15 WAT ("Everything looks fine from this end"). No new P1 filings in this window. Two Immediate dispatches sent to user DM (NIBSS, Polaris) on absence-of-signal + >2h thresholds.
