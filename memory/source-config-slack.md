---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-17T19:09:00Z."
updated: "2026-04-18T09:44:26Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T09:29:50Z"
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
- Issuer names (always): Stanbic, Ecobank, Sterling, Polaris, Wema, NIBSS, PTSA, NUS, CoralPay, FCMB, Keystone.

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
- `slack_search_public_and_private` with space-separated terms is AND-only (no boolean). Use channel reads for authoritative coverage; use search only to confirm specific keyword presence. Boolean OR syntax fails silently (zero results) — confirmed again at 18:09 WAT 2026-04-17 tick.
- Rate-limiting observed on parallelized channel reads + searches. Retry once when encountered; continue the tick if persistent.
- Search index lag: recent messages (same-day filings) often return zero even when surfaced via channel-read. Channel-read is authoritative; search is confirmation-only for recent windows.

## Notes

Tick 2026-04-18 10:29 WAT window (first tick after the 23:00–05:00 WAT skip gap; spans from 19:09 WAT Apr 17 to 09:29 WAT Apr 18): Overnight Slack traffic captured three cycle-level events plus steady-state quiet on the evening-active P1s:

- **Access Bank cycle 6** filed by [[Qazim Adedigba]] at 01:10 WAT Apr 18 — start 12:49 WAT Apr 17, resolved 01:02 WAT Apr 18, 11 minutes, bank-auto-recovered. No TDSD raised. Delta captured on [[Access Bank — Multi-Track Failures]].
- **Keystone RC05 P1** filed by [[Olamide Ajibulu]] at 21:38 WAT Apr 17 — start 21:00 WAT, ongoing at this tick (13h29m). New situation page [[Keystone Bank — RC05 P1 Apr 17]] created. RC05 is distinct failure mode from the RC91 wave — card-layer, not switch-layer — keyword list updated accordingly.
- **FCMB RC91 cross-reference** (Jira-originated, TDSD-6613 23:44 WAT Apr 17) had no parent-channel filing in this Slack window — picked up via Jira sweep.

Evening-filed P1s from yesterday (Stanbic cycle 27, Polaris second cycle, UBA Apr 17) remain silent into this tick window — all exceed 1h absence threshold but re-dispatch suppressed per calibration precedent. DM channel empty. Keyword searches continued zero-return for recent filings (index lag pattern holds). The parent-message sweep structural guard continues to perform — caught Keystone and Access-cycle-6 that would have been missed by situation-page-only scanning.
