---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-18T21:09:27Z. One Slack delta this tick — Access RC91 cycle 7 filing in #teamapt-tech-operations (20:23 WAT, Afeez Kazeem; part of evening-wave concurrence with Stanbic + UBA)."
updated: "2026-04-18T21:22:20Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T21:09:27Z"
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

Tick 2026-04-18 22:09 WAT window (20:09 WAT → 22:09 WAT, Skim upgraded to Full for Slack — per-source delta-check fired on Tier 1 channel-read hit): **One Tier 1 delta — Access RC91 cycle 7 filing from [[Afeez Kazeem]] in C0ABU8GMW75 (#teamapt-tech-operations).**

**Access cycle 7 filing** (20:23 WAT). Start 20:15 WAT, End 20:18 WAT, 3-minute duration, brief bank-auto-recovery. [[TDSD-6620]] (Medium, [System] Incident) created 20:20 WAT, resolved 20:25 WAT. Part of **evening-wave concurrence pattern tonight** — Stanbic cycle 30 (18:33–19:37 WAT) + UBA brief (18:47–18:50 WAT) + Access cycle 7 (20:15–20:18 WAT) = three banks within ~100 min. Seventh Access RC91 cycle in ~8 days. [[Access Bank — Multi-Track Failures]] updated with cycle 7 delta and the evening-wave concurrence flag.

No Immediate dispatch fired — Access cycle 7 resolved in 3 minutes, calibration hold precedent (briefing-2026-04-17 B1 held / briefing-2026-04-18 B6) applies to re-dispatch suppression on cyclical RC91 patterns. Evening-wave concurrence itself (now reproducing across consecutive days — Apr 17 and Apr 18) is a pattern signal carrying to briefing-2026-04-19.

No DMs to <@U080PEXEZ0E> in-window. Keyword sweep (Tier 3) via `slack_search_public_and_private` returned empty — channel-read remained authoritative path. Parent-message structural guard held — Access cycle 7 surfaced via step 1 channel enumeration.
