---
due: 2026-04-15
type:
  - "commitment"
owner: Emeka Awagu
title: Commitment — Stanbic RC91 Internal Processing Latency Investigation
status: fulfilled
created: "2026-04-12T16:28:31Z"
summary: Oladapo Onayemi to investigate whether Moniepoint processing latency to NIBSS node is anomalous, per NIBSS attribution of RC91 to Moniepoint timeout. Due Wed Apr 15.
updated: "2026-04-15T21:52:40Z"
cssclasses:
  - "commitment"
counterparty: Oladapo Onayemi
accountability: Technology Reliability and Security
---

## Ask

Investigate whether Moniepoint processing latency to NIBSS node is anomalous. NIBSS (Moses Ajani, 08:56 WAT Apr 12) attributed RC91 failures to "no response from your end within the timeout period" — responses received after timeout. Multi-bank RC91 overnight (Access, Wema, Stanbic, NIBSS node) is consistent with Moniepoint-side hypothesis.

Specific deliverables:
1. Measure Moniepoint processing time to NIBSS node over the past 11 days (Apr 3–12) — identify whether latency spikes correlate with RC91 cycles
2. Compare against baseline processing time from a stable period (e.g., Mar 15–31)
3. If latency is anomalous: identify root cause (infrastructure, code path, upstream dependency)
4. If latency is normal: document evidence that contradicts the NIBSS attribution

## Context

- 20 P1 RC91 cycles in 11 days across Stanbic, all bank-resolved, same root cause unfixed
- ATS JAR deployment to Stanbic pending bank action (Babajide → Oluwatobi Meshioye, Apr 11)
- Formal Stanbic escalation letter on hold pending this investigation's findings
- CTO at Strategy Retreat Tue–Thu Apr 14–16 — findings needed by Wed Apr 15 so decision can be made during a retreat break or on Fri Apr 17

## Resolution

**Fulfilled 2026-04-15.** Investigation completed. Finding contradicts NIBSS's Moniepoint-latency attribution and identifies a different root cause.

**Finding ([[Oladapo Onayemi]] DM, 2026-04-14 15:07–15:27 WAT):**

> "Yes, confirmed the stanbic issue to be an issue from the bank's infra (CBA)"
>
> "I think their main complaint is the fact that Moniepoint routes their requests to an inactive node while [Stanbic is] failing and when their service is restored they don't restore the config in time. Leading to failures of Stanbic cards on Moniepoint terminals while Stanbic is back up."
>
> "We have escalated to Moniepoint team severally but unless the process its automated, I don't see how any human will be that efficient. i.e to restore the config once a bank service is restored."

Root cause is two-part:
1. **Primary trigger (bank-side):** Stanbic CBA instability causes initial failures.
2. **Amplifier (Moniepoint-side):** Moniepoint routes Stanbic requests to an inactive Stanbic node during the failure window, then fails to restore the routing config in time after Stanbic recovers — compounding the bank's downtime with Moniepoint-side failures while Stanbic is actually up.

**Not a processing-latency problem.** Deliverable #4 satisfied — evidence contradicts NIBSS attribution. Deliverables #1–3 are moot under the new root cause.

**Moniepoint is aware.** Oladapo confirms the Moniepoint team has been escalated to "severally" without resolution. The config-restoration process is manual and slow; no automation exists on the Moniepoint side.

**Note on signal routing:** This DM sat in the brain's Slack sweep blind spot for 19 ticks due to the date-format bug diagnosed in Session 54. The Slack Sweep Hybrid Design (deployed 2026-04-15) fixes the bug and prevents recurrence — see [[source-config-slack]] Connection section's Date format rule.

## Downstream Actions (not part of this commitment)

- Formal Stanbic escalation letter is now orthogonal — Stanbic CBA is a contributor, but Moniepoint's routing-restoration gap is the structural fix. Escalation should target inside the Moniepoint group, not outward to Stanbic.
- ATS JAR deployment to Stanbic remains pending Oluwatobi Meshioye's action — unaffected by this finding.
- **Automation is Moniepoint's to build, not TeamApt's.** The automated routing-restoration capacity is a Primitive 4 (Systems) gap inside [[Moniepoint]]'s [[Domestic Switching]] department (led by [[Babatunde Okufi]], which owns ATS and the routing config). Not a TeamApt roadmap item. Oladapo's escalations to the Moniepoint team have produced no fix after multiple attempts.
- **Open question for CTO — intra-group leverage.** Which path has the highest chance of forcing the automation onto Moniepoint's backlog: direct peer escalation to [[Babatunde Okufi]] (Domestic Switching lead), dotted-line escalation to [[Felix Ike]] (Group CTO, Moniepoint Inc.), or raising through [[Dennis Ajalie]] to push onto a group-level roadmap? Oladapo's level of escalation has demonstrably not been sufficient — the fix needs higher-altitude sponsorship to land.

## References

- [[Stanbic Bank ATS — Persistent RC91 Pattern]]
- [[Stanbic Bank]]
- [[Oladapo Onayemi]]
- [[NIBSS]]
- [[Moniepoint]]
- [[Babatunde Okufi]]
- [[Felix Ike]]
- [[source-config-slack]] — Slack sweep blind-spot fix
