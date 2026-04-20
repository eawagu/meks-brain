---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T14:09:00Z. 15:09 WAT Full tick: 8-consecutive-Slack-operational-quiet-tick streak BROKEN — Union Bank RC91 P1 brief cycle filed 14:36 WAT in #teamapt-tech-operations by Qazim Adedigba (start 14:27, end 14:33, 6m, bank-auto-recovered). Cycle 7 in 9 days on Union Bank ATS. Already-resolved at filing — no Immediate dispatch. All other Tier 1 channels silent, zero DMs, Tier 3 keyword search returned no hits (indexing lag)."
updated: "2026-04-20T15:19:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T15:09:00Z"
---

## Connection

Slack MCP (workspace-scoped). User ID for DM dispatch: U080PEXEZ0E. Tier 1 channels: #teamapt-tech-operations (C0ABU8GMW75), #account-switch-alerts (C098VUQCVRA), #teamapt-x-paystack-transfer-support (C096LCNP26P), #notifications-support-dev (C08PH35PLPK), #go-subscribe-by-teamapt (C090UHR9VDE).

## Directives

### Priority model
- Tier 1: listed channels above — read every tick.
- Tier 2: DMs mentioning the user — read every tick.
- Tier 3: keyword matches across public + private channels — apply per-message salience factors (channel identity, keyword floor, active-situation entity match, @mention, DM, sender weighting).

### Sweep order (Tier 1 read-by-default → search-all → pre-filter pipeline → per-message salience reasoning → cost cap)
1. Read Tier 1 channels and DMs every tick (fastest-path delta via channel read).
2. Search-all: keyword scan for Immediate-tier triggers per config-salience (P1, outage, RC91, RC05, breach, compromised, NIBSS).
3. Pre-filter: apply skip list and suspected-bot rules.
4. Per-message salience reasoning: apply factors to rank signals.
5. Cost cap: stop after N messages processed per tick.

### Skip list (confirmed-noise channels)
[Maintained via monthly skip-list regression review + weekly suspected-bot bulk-confirm per config-salience Periodic Reviews.]

## Notes

Tick 2026-04-20 16:09 WAT Full-level. Tier 1 channels: Stanbic cycle 32 filing + resolution within the 15:09→16:09 WAT window.

**#teamapt-tech-operations — Stanbic ATS RC91 cycle 32:**
- Cycle 32 opened 15:04 WAT, resolved 16:00 WAT (56m end-to-end, bank-auto-recovered) — within established 4m–64m fast-cycle envelope.
- TDSD-6639 raised and resolved within the tick window. Third consecutive Stanbic cycle carrying a TDSD ticket (cycles 30 / 31 / 32 ticketed as TDSD-6618 / TDSD-6629 / TDSD-6639). This is team operational maturation of ticketing discipline around the pattern, not a change in bank-side behavior.
- **No Immediate dispatch** — B6 calibration precedent holds (bank-owned recurring pattern, no CTO action required). Already-resolved by the time Act phase runs. Accumulating to briefing-2026-04-21 as awareness-tier item.
- Factors: source=slack+jira, channel=teamapt-tech-operations, keyword=P1+RC91+Stanbic, situation_delta, same_tick_open_and_close, within_pattern, no_cto_action.

**All other Tier 1 channels silent** — #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt returned zero new parent messages in the 15:09→16:09 WAT window. Zero DMs to user. Tier 3 keyword sweep returned nothing outside the Stanbic cycle 32 thread already captured via Tier 1.

**Calibration pattern — Slack-operational Tier 1 activity remains dominated by the Stanbic/Union RC91 family.** Three cycles in ~1h30m (Union 14:27–14:33 WAT in prior tick, Stanbic 15:04–16:00 WAT this tick). Both resolved in-envelope, both bank-auto-recovered. Neither crossed the Immediate threshold given B6 calibration.
