---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-18T16:09:28Z. Zero Slack deltas at 17:09 WAT tick — 2 consecutive quiet ticks."
updated: "2026-04-18T19:19:36Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T19:09:27Z"
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

Tick 2026-04-18 20:09 WAT window (17:09 WAT → 20:09 WAT, Skim upgraded to Full for Slack — per-source delta-check fired on Tier 1 channel-read hits): **Quiet streak broken — two filings from [[Afeez Kazeem]] in C0ABU8GMW75 (#teamapt-tech-operations).**

1. **Stanbic cycle 30 filing** (18:39 WAT). RC91 P1 on Stanbic ATS route, triple-track visibility this cycle: Slack filing 18:39 WAT, email 18:40 WAT, Jira [[TDSD-6618]] 18:45 WAT. Resolved 19:37 WAT (~64 minutes end-to-end) — materially slower than cycle 28 (7m) and cycle 29 (4m). [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated with behavioral-signature-shift flag; four cycles in 32h window ≈ 3x historical baseline.
2. **UBA brief cycle** (18:57 WAT filing). RC91 P1 auto-recovered in ~3 minutes (failure 18:47 WAT → recovery 18:50 WAT). Second UBA cycle in 24h; 14-minute gap behind Stanbic cycle 30 reproduces the evening-wave concurrence pattern first noted 2026-04-17. [[UBA Bank — RC91 P1 Apr 17]] updated (scope expanded to UBA ATS pattern tracker); Apr 17 P1 now 25h+ silent on Slack (implicit-resolve candidate flagged).

No Immediate dispatches fired — both resolved before this tick boundary, and calibration hold precedent (briefing-2026-04-17 B1 held / briefing-2026-04-18 B6) applies to re-dispatch suppression on cyclical RC91 patterns. Both updates accumulate for briefing-2026-04-19 as pattern items.

No DMs to <@U080PEXEZ0E> in-window. Keyword sweep (Tier 3) via `slack_search_public_and_private` returned empty on OR-style queries (known AND-only limitation) — channel-read remained authoritative path. Parent-message structural guard held — both filings surfaced via step 1 channel enumeration.
