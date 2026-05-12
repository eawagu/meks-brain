---
title: Salience Recalculation — Wed May 13 2026
type:
  - "commitment"
cssclasses:
  - "commitment"
due: 2026-05-13
owner: Mek
status: open
accountability: salience-tuning
created: "2026-05-12T11:39:32Z"
updated: "2026-05-12T11:39:32Z"
summary: "Execute config-salience recalculation per protocol — 24+ tuples across 5+ distinct structural defect classes; second surface after briefing-2026-04-30 B3 unactioned; scheduled Wed 2026-05-13 10:00–10:30 WAT."
---

## Status: Open

## Action

Execute salience recalculation per [[config-salience]] recalculation protocol.

**Scheduled slot:** Wednesday 2026-05-13, 10:00–10:30 WAT (weekly admin slot).

**Origin:** briefing-2026-05-12 B8 Decision item, approved via triage 2026-05-12 ~09:30 WAT.

## Context

- 20-tuple recalc threshold crossed at briefing-2026-05-11 10:10 WAT skim-tick; surfaced as briefing-2026-05-12 B8 Decision per protocol.
- **Second surface** — first was briefing-2026-04-30 B3, unactioned. Deferral has compounded calibration drift.
- Tuples since 2026-04-22 cover **5+ distinct structural defect classes**:
  1. Slack epoch bug (cached local epoch drift, Apr 23)
  2. Body-truncation defect (8192-token embedding context limit on update_page, Apr 27 first obs; sextuplet across config-salience / source-config / briefing-page paths)
  3. Single-track-Slack-no-Jira pattern (CoralPay-fronted routes, 4-5 obs in 56h as of 2026-05-12)
  4. Documentation-deficit pattern (Slack closure posts missing despite Jira resolution)
  5. Outbound-reply-detection-gap (B20 — heartbeat does not capture user's own outbound replies as resolution signals)
  6. Heartbeat-scheduler-availability-failure (3 consecutive missed ticks May 11–12, variant of May 7–8 ingest connector-availability-failure)
- **Triage 2026-05-12 added 3 MISS-class tuning tuples** (B5/B6/B7 dispositions):
  - heartbeat-carried-resolved-item (B5)
  - heartbeat-carried-misattributed-exposure (B6)
  - heartbeat-carried-infra-fixed-defect (B7)

## Expected Output

- Revised dimension weights informed by 24+ tuple corpus (21 pre-triage + 3 triage MISS tuples).
- Restructured absence-of-signal rules.
- Formalized MISS-class taxonomy covering the 3 new triage-origin classes plus existing outbound-reply-detection-gap and heartbeat-scheduler-availability-failure.
- Structural-fix candidates for evaluation: commitment-page-status cross-check on carryforwards; escalation-counter scope-verification branch at N=3; source-config health-check probe distinct from ingest sweep.

## References

- [[config-salience]]
- briefing-2026-05-12 B8 (this approval)
- briefing-2026-04-30 B3 (first surface, unactioned)
- briefing-2026-05-12 Tuning Log triage tuples (3 new MISS classes)