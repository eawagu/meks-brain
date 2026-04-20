---
type:
  - "source-config"
title: source-config-slack
created: 2026-04-11
summary: "Slack signal-source configuration: Tier 1 channels, user DM target, and directives; last_processed 2026-04-20T14:09:00Z. 15:09 WAT Full tick: 8-consecutive-Slack-operational-quiet-tick streak BROKEN — Union Bank RC91 P1 brief cycle filed 14:36 WAT in #teamapt-tech-operations by Qazim Adedigba (start 14:27, end 14:33, 6m, bank-auto-recovered). Cycle 7 in 9 days on Union Bank ATS. Already-resolved at filing — no Immediate dispatch. All other Tier 1 channels silent, zero DMs, Tier 3 keyword search returned no hits (indexing lag)."
updated: "2026-04-20T14:19:38Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T14:09:00Z"
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

Tick 2026-04-20 15:09 WAT Full-level. Tier 1 channels: 1 new filing in 14:09→15:09 WAT window, in #teamapt-tech-operations.

**#teamapt-tech-operations — Slack-operational-quiet streak (8 ticks) BROKEN:**
- 14:36:53 BST — [[Qazim Adedigba]] filed P1 alert for Union Bank brief RC91 cycle. Format follows standard post-recovery filing: *Product: ATS | Incident: P1: Union Bank Brief RC91 Failures Across Processors | Incident Impact: Transactions were failing success rate impacted | Identified Cause: From the bank | Resolution Action: Transactions auto recovered | Incident Duration: 6 Minutes | Start Time: 2:27 PM | End Time: 2:33 PM*. **Already resolved at filing** — 6m auto-recovery by the bank. **Cycle 7 in 9 days** on [[Union Bank]] ATS route (Apr 12, 15, 16×2, 19, 20 morning 6h39m, 20 afternoon 6m). Pattern-significance: accumulating frequency + dual-cycle-in-one-day (Apr 20 morning 6h39m followed by afternoon 6m brief). Already-resolved post-recovery filing → **no Immediate dispatch required** (per config-salience trigger #1 interpretation — resolved incidents don't need within-hour dispatch). Classification: Awareness-tier for Apr 21 briefing. Delta recorded on [[Union Bank]] entity page (cycle count 5→7, longest-on-record 6h39m, same-day dual-cycle). Factors: source=slack, channel=teamapt-tech-operations, keyword=P1+RC91+Union, pattern_significance, bank_auto_recovery_brief_cycle, accumulating_cycle_count=7_in_9_days, same_day_dual_cycle, post_recovery_filing.

**All other Tier 1 channels silent** — #account-switch-alerts, #teamapt-x-paystack-transfer-support, #notifications-support-dev, #go-subscribe-by-teamapt all returned zero new parent messages in the 14:09→15:09 WAT window. Zero DMs to user. Tier 3 keyword sweep (P1 OR outage OR RC91 OR RC05 OR breach OR compromised OR NIBSS after:2026-04-20) returned zero results (Slack search indexing likely lagged behind 14:36 WAT filing — the direct channel read caught it).

**Calibration pattern — 8-tick operational-quiet streak (07:09 + 08:09 + 09:09 + 10:09 + 11:09 + 12:09 + 13:09 + 14:09 WAT) ended at 15:09 WAT with Union Bank brief cycle.** Streak-break mechanism held as expected: post-recovery P1 filings from Qazim / ops team appear when a cycle closes, even for 6m brief durations. Slack channel remains the canonical announce point for closed operational cycles — live incidents route through Jira + email direct threads first.
