---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T11:09:00Z. 12:09 WAT Full tick: all 5 Tier 1 channels silent in 11:09→12:09 window, zero DMs, zero Tier 3 Immediate matches. Five consecutive Slack-quiet ticks (08:09 + 09:09 + 10:09 + 11:09 + 12:09 WAT) — ops signals continue to travel via email/Jira tracks."
updated: "2026-04-20T11:14:55Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T11:09:00Z"
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

Tick 2026-04-20 12:09 WAT Full-level. Tier 1 channels: no new parent messages in 11:09→12:09 WAT window across all 5 channels. One pre-tick message noted: Yasir Syed Ali in #go-subscribe-by-teamapt at 09:50 WAT chasing pos go-subscribe stability for sprint close-out — non-operational, already within scope of earlier ticks' visibility. DMs to user: zero. Tier 3 keyword sweep (P1 OR outage OR RC91 OR RC05 OR breach OR compromised OR NIBSS after:2026-04-20): zero results. Layer 1 to:me scope-scan: zero results.

**Five consecutive Slack-quiet ticks (08:09 + 09:09 + 10:09 + 11:09 + 12:09 WAT).** Calibration pattern from earlier tick ("Slack-silence-while-email+jira-active on Monday working hours") strengthens — operational tickets are being filed directly via Jira + email Layer 1 without Slack announcement. The overnight Union Bank RC91 Apr 20 01:17 WAT cycle (captured as MISS at 08:33 WAT) landed in email not Slack, matching this pattern.
