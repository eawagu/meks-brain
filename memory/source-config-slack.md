---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T05:09:34Z. 06:09 WAT Monday briefing tick: overnight delegation window quiet — zero new Tier 1 parent messages, zero DMs, zero Tier 3 keyword matches. Sunday support-cadence routing held through evening; Stanbic cycle 31 closure traveled via Jira not Slack."
updated: 2026-04-20
cssclasses:
  - "source-config"
last_processed: "2026-04-20T06:09:34Z"
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

Tick 2026-04-20 07:09 WAT Skim-level (post-06:09 briefing). Tier 1 channels quiet — zero new parent messages since 06:09 WAT. DMs to user: zero. Tier 3 keyword sweep: 2 matches, neither Tier 1 nor CTO-relevant (ng-ort onboarding UI issue; monnify-infra-support imagePullBack) — discarded. Slack signal source contributed zero surfacings this tick. Concurrent tick discovery: Union Bank RC91 cycle (email-only track, no Slack activity) missed by briefing sweep — calibration MISS note captured.
