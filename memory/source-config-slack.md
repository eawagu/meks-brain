---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-19T19:09:34Z. 20:09 WAT skim tick: one Tier 1 delta — Afeez Kazeem RC91 filing ~19:18 WAT in #teamapt-tech-operations (Stanbic cycle 31 opening, within-pattern fast-cycle). Zero DMs to user. Sunday support-cadence routing: operational traffic on email, Slack fires only for new P1 cycle openings."
updated: "2026-04-19T19:24:49Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T19:09:34Z"
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

Tick 2026-04-19 20:09 WAT **skim-level**. ~2h window since 18:09 WAT last_processed.

Tier 1 channel reads — one new parent message in-window: #teamapt-tech-operations [[Afeez Kazeem]] ~19:18 WAT filing Stanbic RC91 (cycle 31 opening). Followed on email track (thread 19da2fa4960db78b) at 19:25 WAT with bank engagement 19:31 → 19:40 WAT. Cross-referenced to [[Stanbic Bank ATS — Persistent RC91 Pattern]] which has been updated with cycle 31 body + delta. Within-pattern fast-cycle; B6 calibration precedent (bank-owned recurring pattern, no CTO action) holds. No Immediate dispatch.

Other Tier 1 channels (#account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt) — zero new parent messages in-window.

DM sweep — zero new DMs to user in-window.

Keyword sweep Tier 3 skipped at skim (channel-read authoritative).

Sunday support-cadence routing pattern continues: operational traffic primarily on email (Stanbic cycle 31 authoritative track is email thread 19da2fa4960db78b); Slack fires only as the lightweight P1-cycle-opening signal. Pattern hardens — quiet Slack + active email is the weekend default, with Slack firing at cycle boundaries only.

One Slack-sourced signal accumulates to briefing-2026-04-20 via the Stanbic situation page update (Awareness tier, within-pattern fast-cycle).