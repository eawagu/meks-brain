---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-17T13:10:00Z."
updated: "2026-04-17T14:16:11Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T14:09:00Z"
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

### Sweep order (MUST execute in this order each tick)
1. **Read** all Tier 1 channel parent messages since last_processed — enumerate every new P1 filing, not only threads linked to existing situation pages. (Structural guard against the 2026-04-17 Wema miss, where the midday ticks focused on tracked situations and missed a new P1 that was filed as a parent message in the same channel.)
2. **Cross-check** any P1 filings from step 1 against existing situation pages — if untracked, create a new situation page.
3. **Read** DMs to user.
4. **Search** keyword matches (Tier 3) for the window.
5. **Per-message** salience reasoning + brain-wide similarity search.

### Known limitations
- `slack_search_public_and_private` with space-separated terms is AND-only (no boolean). Use channel reads for authoritative coverage; use search only to confirm specific keyword presence.
- Rate-limiting observed on parallelized channel reads + searches. Retry once when encountered; continue the tick if persistent.

## Notes

Tick 2026-04-17 15:09 WAT window (14:10 → 15:09 WAT): Tier 1 channel read surfaced a **previously-untracked Wema Bank RC91 P1** filed 08:52 WAT today (start 08:49 WAT, 6h20m active, silent since filing). Not caught by the 12:09, 13:09, or 14:09 WAT ticks. `MISS:` calibration note captured; new situation page created ([[Wema Bank — RC91 P1 Apr 17]]). NIBSS PTSA P1 now 5h40m active (4h06m silent, 4th consecutive silent tick). Polaris Bank P1 now 3h43m active (3h30m silent, 3rd consecutive silent tick). Ecobank reopen silent 2h54m since Adewuyi's 12:15 WAT pushback. FCMB P1 (07:47 WAT start, "services restarted" framing at filing) has no confirmed recovery post — ambiguous, flagged for monitoring. Consolidated Immediate dispatch (Wema + NIBSS + Polaris) sent to user DM. Rate-limiting observed on `slack_search_public_and_private` and one channel read retry; retries per directive. A new Sweep Order directive has been added to the Directives section above to prevent the Wema miss structurally.
