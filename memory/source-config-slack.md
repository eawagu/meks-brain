---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-17T16:09:00Z."
updated: "2026-04-17T16:18:05Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T16:09:00Z"
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
- `slack_search_public_and_private` with space-separated terms is AND-only (no boolean). Use channel reads for authoritative coverage; use search only to confirm specific keyword presence. Boolean OR syntax fails silently (zero results) — confirmed again at 16:09 WAT 2026-04-17 tick.
- Rate-limiting observed on parallelized channel reads + searches. Retry once when encountered; continue the tick if persistent.

## Notes

Tick 2026-04-17 17:09 WAT window (16:09 → 17:09 WAT): All 5 Tier 1 channels empty (zero parent messages). DM channel empty. Keyword search P1: 18 results, all out of scope — #teamapt_infra_notifications (bot-only infra pings, per skip rule, 17 hits) plus one #pos-channel-deployments deployment notification for pos-channels-jobs referencing "P1 Repo" (deployment, not incident). Keyword search RC91: zero results. Rate-limiting observed on parallel read of C096LCNP26P; serial retry succeeded. Active-P1 trio (Wema 8h17m silent since 08:52 WAT filing, NIBSS 6h06m since 11:03 WAT dispute, Polaris 5h30m since 11:39 WAT filing) continues silent — no Immediate re-dispatched this tick; 15:09 WAT consolidated dispatch remains the authoritative alert and nothing new has emerged. Aging will fold into briefing-2026-04-18.
