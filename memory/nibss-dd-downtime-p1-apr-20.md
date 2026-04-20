---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Downtime P1 Apr 20
status: developing
created: "2026-04-20T05:23:14Z"
summary: "New NIBSS Direct Debit downtime P1 filed 2026-04-20 05:18 WAT via TDSD-6630 by Frances Omelu during the overnight delegation window. Medium priority, Work in progress at tick time. Same structural class as retired Apr 14 NIBSS DD Pending Mandate P1 (silent-recovery pattern). Surfaced as briefing-2026-04-20 B1."
updated: "2026-04-20T06:17:27Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit downtime P1 raised via [[TDSD-6630]] at 2026-04-20 05:18 WAT by [[Frances Omelu]], updated 05:59 WAT, Medium priority, Work in progress at the 06:09 WAT briefing tick. Filing occurred during the overnight delegation window (23:00–06:00 WAT), so surfacing was deferred to the 06:09 briefing tick per config-heartbeat rule.

**Structural parallel to retired Apr 14 NIBSS DD P1.** The prior [[NIBSS DD — Pending Mandate P1 Active]] situation (filed 07:05 WAT Apr 14, retired 06:23 WAT Apr 16 after 47h silent-recovery pattern) is the direct precedent. Both cycles are raised by Frances Omelu, escalated to NIBSS for review without immediate resolution signal — the silent-recovery pattern [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] surfaces as the recurring "silent recovery without human closure" structural defect.

**Jira activity on TDSD-6630 (all pre-briefing-tick, bank-silent since):**
- 05:18 WAT — Filing
- 05:23 WAT — Frances: *"Pending create mandate transactions cleared before 3am, and we noticed a decrease in pending debit mandate request count. The count kept dropping up until 4:30am, but started to go back up at 4:32am."*
- 05:27 WAT — Frances: *"This has been escalated to NIBSS for review and resolution"*
- 05:59 WAT — Last status update
- **06:09 WAT → 07:09 WAT**: ZERO additional activity — Jira comments, Slack thread, email — all silent

**Silence threshold crossed at 07:09 WAT Skim tick.** briefing-2026-04-20 B1 pre-registered this promotion rule: *"If no Slack update or resolution signal within 1h of tick time → absence-of-signal rule promotes to Immediate."* 1h post-briefing-tick elapsed at 07:09 WAT with zero signals. Rule fires — Immediate-tier DM dispatched.

**Priority framing note.** TDSD-6630 carries Medium priority on the Jira ticket, but structurally this is a P1 (matches Apr 14 NIBSS DD Pending Mandate P1 retired after 47h silent-recovery). Config-salience absence-of-signal rule "Active P1 (unresolved) | 1 hour no update" applies by incident nature, not ticket priority field.

**Duration at 07:09 WAT tick:** 1h51m active from 05:18 WAT filing; 1h10m silent since 05:59 WAT last update.

## Sources
Jira [[TDSD-6630]] created 05:18 WAT, last update 05:59 WAT Apr 20; heartbeat briefing tick 06:09 WAT Apr 20; heartbeat Skim tick 07:09 WAT Apr 20

## Deltas
- [2026-04-20 06:09 WAT] — Situation created from briefing tick. New NIBSS DD P1 filed overnight. Surfaced as briefing-2026-04-20 B1 (Medium priority → Briefing-tier watch with 1h silence promotion rule).
- [2026-04-20 07:09 WAT] — 1h post-briefing silence rule triggered. Zero Jira/Slack/thread activity since 05:59 WAT. Immediate-tier DM dispatched.
