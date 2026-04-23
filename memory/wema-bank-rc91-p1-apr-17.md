---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 P1 Apr 17
status: developing
created: "2026-04-17T14:14:24Z"
summary: "Apr 23 afternoon cycle observed: Qazim Slack post 16:54 WAT + TDSD-6705 Completed 18:45 WAT (~2h within-pattern). Reinforces frequency-increasing trajectory (Apr 8, 11, 17, 23). 22:09 WAT tick is first heartbeat observation — 16:11 WAT predated post, 17/18/20 WAT ticks missed."
updated: "2026-04-23T21:16:49Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Wema Bank]] RC91 P1 failures across processors filed by [[Afeez Kazeem]] in #teamapt-tech-operations at 08:52 WAT Apr 17 — start time 08:49 WAT, ongoing at filing. Resolution action per the filing: "The issue was escalated to the partner for investigation and resolution." No thread activity, no resolution post, no keyword matches since the filing. P1 was 11h20m active at the 20:09 WAT Apr 17 tick observation; subsequent ticks noted continued silence.

**Apr 23 update — fresh Wema RC91 cycle filed and closed in the afternoon window.** Qazim Adedigba incident post in #teamapt-tech-operations at 16:54 WAT Apr 23: "Product: ATS, Incident Summary: P1: Wema Bank RC 91/22 Failures Across Processors, Start Time: 4:44 PM [16:44 WAT], End Time: Ongoing." TDSD-6705 "Wema Bank | ATS | Failing with RC 91/22 | 20260423" filed by Qazim, Completed at 18:45 WAT — ~2h cycle, within historical pattern envelope. The Apr 17 original RC91 remains unresolved/silent at ticket level, but has been silent for 6 days without net new signal. Apr 23 cycle is a distinct data point on the Wema RC91 pattern reinforcing frequency-increasing trajectory (prior Apr 8, Apr 11, Apr 17, now Apr 23).

This situation was NOT surfaced by the 12:09, 13:09, or 14:09 WAT ticks on Apr 17 — three consecutive ticks missed it. A `MISS:` calibration note was captured per the Missed Signal Capture path in [[config-salience]]. Structural fix: [[source-config-slack]] now mandates a Tier 1 channel-read sweep for parent messages every tick, so subsequent filings cannot slip by a situation-page-only retrieval pattern.

Historical context on [[Wema Bank]]: prior RC91 cycles Apr 8 and Apr 11 (3rd cycle same day Apr 11, frequency-increasing pattern), plus earlier settlement failure TDSD-6446 (Apr 6). Apr 23 TDSD-6705 confirms pattern continuity.

## Sources
Slack #teamapt-tech-operations 2026-04-17 08:52 WAT (Afeez Kazeem P1 filing); Slack #teamapt-tech-operations 2026-04-23 16:54 WAT (Qazim Adedigba Wema RC91/22 incident post); Jira TDSD-6705 Completed 2026-04-23 18:45 WAT

## Deltas
- [2026-04-17 08:49 WAT] — RC91 failures began on Wema across processors (per P1 start time).
- [2026-04-17 08:52 WAT] — P1 filed in #teamapt-tech-operations by Afeez Kazeem. Escalated to partner. Ongoing at filing.
- [2026-04-17 15:09 WAT] — First heartbeat observation of this cycle. P1 active 6h20m, silent 6h17m since filing. Immediate #2 threshold crossed. Consolidated dispatch with NIBSS PTSA and Polaris sent to user DM. `MISS:` note captured for prior-tick omission.
- [2026-04-17 16:09 WAT] — P1 active 7h20m, 7h17m silent. No Slack thread activity, Gmail MCP unreachable. No re-dispatch.
- [2026-04-17 20:09 WAT] — P1 active 11h20m, 11h17m silent. Gmail/Jira MCPs recovered. No new Wema signal in recovery queries. No re-dispatch.
- [2026-04-23 22:09 WAT] — **NEW Apr 23 cycle observed retrospectively.** Qazim Adedigba filed TDSD-6705 "Wema Bank | ATS | Failing with RC 91/22 | 20260423" (Start 16:44 WAT per Slack post); ticket Completed at 18:45 WAT, ~2h cycle, within pattern. Slack post at 16:54 WAT noted Ongoing; Jira closure at 18:45 WAT resolved. This tick is the first heartbeat observation of the cycle (16:11 WAT prior tick did not see it; 17/18/20 WAT ticks were missed). Reinforces frequency-increasing pattern on Wema (Apr 8, Apr 11, Apr 17, Apr 23). Factors: urgency 0.4 (already closed) · impact_scope 0.6 · cto_specificity 0.4 · pattern_significance 0.85 (4th cycle in ~15 days) · accountability_alignment 0.8.
