---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Downtime P1 Apr 20
status: developing
created: "2026-04-20T05:23:14Z"
summary: "NIBSS DD downtime P1 (TDSD-6630) filed 05:18 WAT Apr 20 by Frances Omelu during overnight delegation window. Silent since 05:59 WAT — 2h13m silent at 08:09 WAT tick. No CTO action at this tick (Immediate already dispatched at 07:09 WAT; re-firing on same silence would be noise per calibration precedent). Continues to match retired Apr 14 NIBSS DD Pending Mandate P1 silent-recovery pattern."
updated: "2026-04-20T07:16:53Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit downtime P1 raised via [[TDSD-6630]] at 2026-04-20 05:18 WAT by [[Frances Omelu]], updated 05:59 WAT, Medium priority, Work in progress at the 06:09 WAT briefing tick. Filing occurred during the overnight delegation window (23:00–06:00 WAT), so surfacing was deferred to the 06:09 briefing tick per config-heartbeat rule.

**Structural parallel to retired Apr 14 NIBSS DD P1.** The prior [[NIBSS DD — Pending Mandate P1 Active]] situation (filed 07:05 WAT Apr 14, retired 06:23 WAT Apr 16 after 47h silent-recovery pattern) is the direct precedent. Both cycles are raised by Frances Omelu, escalated to NIBSS for review without immediate resolution signal — the silent-recovery pattern [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] surfaces as the recurring "silent recovery without human closure" structural defect.

**Jira activity on TDSD-6630 (all pre-briefing-tick, silent since):**
- 05:18 WAT — Filing
- 05:23 WAT — Frances: *"Pending create mandate transactions cleared before 3am, and we noticed a decrease in pending debit mandate request count. The count kept dropping up until 4:30am, but started to go back up at 4:32am."*
- 05:27 WAT — Frances: *"This has been escalated to NIBSS for review and resolution"*
- 05:59 WAT — Last status update
- **06:09 WAT → 08:09 WAT (2h10m post-last-update, 2h silent post-briefing)**: ZERO additional activity — Jira comments, Slack thread, email — all silent

**Silence threshold crossed at 07:09 WAT Skim tick.** briefing-2026-04-20 B1 pre-registered this promotion rule: *"If no Slack update or resolution signal within 1h of tick time → absence-of-signal rule promotes to Immediate."* 1h post-briefing-tick elapsed at 07:09 WAT with zero signals. Rule fired — Immediate-tier DM dispatched at 07:09 WAT.

**No re-dispatch at 08:09 WAT.** Immediate was dispatched at 07:09 WAT for this same pattern. Re-firing Immediate for unchanged state (continued silence, same signal) would be noise — calibration precedent established by the Stanbic Bank ATS situation (see [[Stanbic Bank ATS — Persistent RC91 Pattern]] cycle 27 delta 2026-04-17 20:09 WAT: *"**No Immediate re-dispatch:** briefing-2026-04-17 16:30 triage noted all recurring RC91 P1s as expected recurring-pattern; re-firing Immediate for the same pattern would be noise"*). Apply the same rule here.

**Priority framing note.** TDSD-6630 carries Medium priority on the Jira ticket, but structurally this is a P1 (matches Apr 14 NIBSS DD Pending Mandate P1 retired after 47h silent-recovery). Config-salience absence-of-signal rule "Active P1 (unresolved) | 1 hour no update" applies by incident nature, not ticket priority field.

**Duration at 08:09 WAT tick:** 2h51m active from 05:18 WAT filing; 2h10m silent since 05:59 WAT last update. Silent-recovery pattern still consistent with Apr 14 precedent (retired after 47h with no explicit closure). If silence extends through Monday work window (next-tick check at 09:09 WAT), no promotion — already Immediate-dispatched. Resolution signal, if any, expected from Frances or NIBSS bank-side — monitor via Jira comment channel.

## Sources
Jira [[TDSD-6630]] created 05:18 WAT, last update 05:59 WAT Apr 20; heartbeat briefing tick 06:09 WAT Apr 20; heartbeat Skim tick 07:09 WAT Apr 20; heartbeat Skim tick 08:09 WAT Apr 20

## Deltas
- [2026-04-20 06:09 WAT] — Situation created from briefing tick. New NIBSS DD P1 filed overnight. Surfaced as briefing-2026-04-20 B1 (Medium priority → Briefing-tier watch with 1h silence promotion rule).
- [2026-04-20 07:09 WAT] — 1h post-briefing silence rule triggered. Zero Jira/Slack/thread activity since 05:59 WAT. Immediate-tier DM dispatched.
- [2026-04-20 08:09 WAT] — Silence continues (2h10m since last update). No new Jira comments, no Slack activity, no email. No Immediate re-dispatch per calibration precedent (unchanged state from 07:09 WAT dispatch). Awareness-tier accumulation for next briefing tick. Factors: source=jira+heartbeat, absence_of_signal_continuation, calibration_precedent_no_redispatch, silent_recovery_pattern_match.
