---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-18T13:10:00Z. Zero Slack deltas at 14:09 WAT tick."
updated: 2026-04-18
cssclasses:
  - "source-config"
last_processed: "2026-04-18T13:10:00Z"
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

Tick 2026-04-18 14:09 WAT window (13:11 WAT → 14:10 WAT, Skim level, no upgrade for Slack): **Zero Slack deltas across all Tier 1 channels.** #teamapt-tech-operations empty, #account-switch-alerts empty, #teamapt-x-paystack-transfer-support empty, #notifications-support-dev empty, #go-subscribe-by-teamapt empty. DM channel (to:<@U080PEXEZ0E> after:2026-04-18) zero results. Keyword sweep (P1 / RC91 / RC05 / outage / breach / CVE after:2026-04-18) zero results. All active P1s (Stanbic cycle 27, Wema, NIBSS PTSA, UBA, Keystone RC05, FCMB) remain silent on Slack — calibration-hold per briefing-2026-04-18 B6. Parent-message sweep structural guard performed — no new filings missed. Empty-result fast path held; tick-level upgrade was driven by Gmail delta (FCMB RC91 14:03 WAT re-filing), not Slack.
