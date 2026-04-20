---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T13:09:00Z. 14:09 WAT Full tick: 2 new messages in-window in #go-subscribe-by-teamapt — Yasir Syed Ali 13:45 WAT asking Abdulgafar Obeitor for POS Go Subscribe sanity testing + Dennis demo (priority contention with bank vulnerabilities), plus Khadijat channel join. Zero DMs, zero Tier 3 Immediate matches. Seven consecutive Slack-operational-quiet ticks — ops signals continue to travel via email/Jira tracks."
updated: "2026-04-20T13:19:32Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T13:09:00Z"
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

Tick 2026-04-20 14:09 WAT Full-level. Tier 1 channels: 2 new items in 13:09→14:09 WAT window, both in #go-subscribe-by-teamapt.

**#go-subscribe-by-teamapt — continued activity after yesterday's silence break:**
- 13:45 WAT — [[Yasir Syed Ali]] in-channel ask to [[Abdulgafar Obeitor]]: request for POS Go Subscribe sanity testing + Dennis demo; flags priority contention against ongoing bank vulnerabilities work. CCs [[Ketan Dhamasana]], [[Daniel]], [[Ravi]], [[Kevin]], [[Khadijat]]. Second message in same burst addresses Ketan + [[Wycliffe Ochieng']] asking for platform stability commitment. Tier: Awareness (priority-contention signal with named owners). Recorded as delta on [[GoSubscribe — Integration Issues Open, Channel Silent]] situation page.
- 13:xx WAT — Khadijat channel join (membership event). No content; informational only.
- Factors: source=slack, channel=go-subscribe-by-teamapt, priority_contention, cto_cc'd_not_primary_asker, named_engineer_ownership, active_situation_entity_match=gosubscribe.

**All other Tier 1 channels silent** — #teamapt-tech-operations, #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev all returned zero new parent messages in the 13:09→14:09 WAT window. Zero DMs to user. Tier 3 keyword sweep (P1 OR outage OR RC91 OR RC05 OR breach OR compromised OR NIBSS after:2026-04-20) returned zero results.

**Seven consecutive Slack-operational-quiet ticks (08:09 + 09:09 + 10:09 + 11:09 + 12:09 + 13:09 + 14:09 WAT).** GoSubscribe activity continues to be coordination-class, not operational-incident-class. Calibration pattern intact: operational tickets (Union Bank RC91 Apr 20 cycle, NIBSS DD downtime, Merchant settlement cluster) file via Jira + email Layer 1 without Slack announcement. Ops team handling signals outside Tier 1 Slack.
