---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T12:09:00Z. 13:09 WAT Full tick: 1 new message in-window — Akindele Odedoyin in #go-subscribe-by-teamapt at 12:12 WAT flagging mandate_request_notification staging regression to Ketan Dhamasana and Lewis Ugwu (breaks 12-day channel silence; Awareness-tier). Zero DMs, zero Tier 3 Immediate matches. Six consecutive Slack-operational-quiet ticks — ops signals continue to travel via email/Jira tracks."
updated: "2026-04-20T12:16:11Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T12:09:00Z"
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

Tick 2026-04-20 13:09 WAT Full-level. Tier 1 channels: 1 new message in 12:09→13:09 WAT window.

**#go-subscribe-by-teamapt — channel silence broken after 12 days:**
- 12:12 WAT — [[Akindele Odedoyin]] tagged [[Ketan Dhamasana]] (`U0818PKFKQR`) and [[Lewis Ugwu]] (`U080T6P9KEZ`): "we're not receiving messages in mandate_request_notification topic on staging and it's causing us not to be able to complete end to end tests, the issue was fixed late last week but it's back again."
- Staging-only regression; not production-impacting. E2E test blocker. Tier: Awareness (low CTO-specificity, named engineers own resolution). Recorded on [[GoSubscribe — Integration Issues Open, Channel Silent]] situation page.
- Factors: source=slack, channel=go-subscribe-by-teamapt, regression_on_previously_fixed_defect, staging_only, named_engineer_ownership, active_situation_entity_match=gosubscribe.

**All other Tier 1 channels silent** — #teamapt-tech-operations, #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev all returned zero new parent messages in the 12:09→13:09 WAT window. Zero DMs to user. Tier 3 keyword sweep (P1 OR outage OR RC91 OR RC05 OR breach OR compromised OR NIBSS after:2026-04-20) returned zero results. Layer 1 to:me scope-scan returned zero results.

**Six consecutive Slack-operational-quiet ticks (08:09 + 09:09 + 10:09 + 11:09 + 12:09 + 13:09 WAT).** The GoSubscribe regression broke channel silence but is not operational-incident-class. Calibration pattern continues: operational tickets (Union Bank RC91 Apr 20 cycle, NIBSS DD downtime) are filed via Jira + email Layer 1 without Slack announcement. Ops team handling signals outside Tier 1 Slack.
