---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-19T06:11:27Z. Overnight window 22:09 WAT Apr 18 → 07:11 WAT Apr 19 produced the largest concurrent RC91 wave yet observed — Stanbic cycle 31 (7h3m, UNPRECEDENTED), Access cycle 8 (7h50m, UNPRECEDENTED), NIBSS PTSA (15m), Fidelity (14m), Union Bank (2h10m, first-time wave participant)."
updated: "2026-04-19T07:40:12Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T06:11:27Z"
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

Tick 2026-04-19 07:11 WAT briefing-tick window (22:09 WAT Apr 18 → 07:11 WAT Apr 19 — includes the overnight-delegation gap from 23:00 Apr 18 → 06:00 Apr 19, Full work level per briefing-tick override): **Five Tier 1 RC91 P1 filings across the overnight window — the largest concurrent wave observed in the watch period.**

1. **Stanbic cycle 31** (00:00 WAT onset; Slack filing timestamp not confirmed at tick time). 7h3m duration — UNPRECEDENTED bank-side resolution latency. TDSD-6624 filed 07:18 WAT Apr 19. [[Stanbic Bank ATS — Persistent RC91 Pattern]] updated with cycle 31 delta.
2. **Access cycle 8** (00:00 WAT onset; Slack filing timestamp not confirmed at tick time). 7h50m duration — UNPRECEDENTED. TDSD-6625 filed 07:21 WAT Apr 19. [[Access Bank — Multi-Track Failures]] updated with cycle 8 delta.
3. **NIBSS PTSA RC91** (01:25–01:40 WAT, 15m fast-resolved). New situation page [[NIBSS PTSA — RC91 Apr 19]] created — prior Apr 17 NIBSS PTSA situation had been retired.
4. **Fidelity Bank RC91 cycle 5** (01:50–02:04 WAT, 14m bank-resolved). [[Fidelity Bank ATS — RC91 Failure Ongoing]] updated; status change resolving → developing. Re-surface breaks ~3.5-day RC91 quiet window.
5. **Union Bank RC91** (02:40–04:50 WAT, 2h10m bank-resolved). New situation page [[Union Bank — RC91 P1 Apr 19]] — first-time participant on active RC91 multi-bank wave; fifth Union Bank cycle in 8 days.

**Stanbic + Access same-minute onset at 00:00 WAT** is the new structural signal — prior Stanbic and Access cycles had independent onset timing; concurrent onset + 7h+ resolution across both tracks is a regime-change signature pointing to upstream common-mode cause (candidates: NIBSS-side DR exercise TDSD-6626, Moniepoint routing layer, CoralPay intermediary). Three shorter overnight cycles (NIBSS PTSA 15m, Fidelity 14m, Union 2h10m) resolved on typical timescales — differentiated routing-path exposure hypothesis.

**Overnight-delegation calibration hold does NOT apply to this window's briefing framing** — the overnight-delegation rule suppresses Immediate dispatch during 23:00–06:00 WAT, but items observed post-06:00 WAT still feed briefing-tier assessment. The 7h+ resolution-latency regime change upgrades these items from awareness-tier to Decision tier (breaking the briefing-2026-04-17 B1 / briefing-2026-04-18 B6 calibration-hold precedent, which was anchored on fast-cycle RC91 patterns — the overnight wave is not that pattern).

No DMs to <@U080PEXEZ0E> in-window. Keyword sweep (Tier 3) via `slack_search_public_and_private` — channel-read remained authoritative path. Parent-message structural guard held — all 5 P1 filings surfaced via step 1 channel enumeration.
