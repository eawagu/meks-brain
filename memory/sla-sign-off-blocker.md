---
title: SLA sign-off blocker
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:00Z"
updated: "2026-04-25T11:52:00Z"
summary: "Pattern — multiple Direct to Bank integrations are blocked on bank-side SLA sign-off. Banks affected Apr 22: UBA, WHMA, Steel Bank, Coral Pay/Access Bank (pricing dispute), Polaris Bank (rolling 'next week' delays)."
---

## Definition

**SLA sign-off blocker** is the recurring [[Direct to Bank program]] pattern where bank-side legal/business sign-off on the integration SLA stalls go-live progress — typically waiting on the bank's legal review or pricing alignment, not on technical work.

## D2B Apr 22 — active SLA blockers

- **[[UBA]] Fund Settlements** — SLA pending review and sign-off by bank's legal team. Legal clause clarified yesterday; updated document shared with UBA for final review.
- **[[WHMA Bank]]** — team awaiting signed SLA copy for ATS integration.
- **[[Steel Bank]] Direct Debit** — team has not received feedback on project approval sign-off; [[Oluwakemi Oni]] following up.
- **[[Coral Pay]] × [[Access Bank]]** — blocked by SLA pricing dispute between bank and Coral Pay.
- **Interbank Transfer SLA × [[Access Bank]]** — bank needs to sign off; Oluwakemi reaching [[Chama]] today.
- **[[Polaris Bank]] Fund Settlement** — sign-off remains a blocker; Polaris has rolled "extend until next week" responses at least three times (Apr 16, Apr 22, Apr 23).
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## Pattern significance

Five concurrent SLA blockers across four banks at a single standup suggests this is a structural friction point in the D2B pipeline rather than per-bank delay. Worth tracking whether the bottleneck is bank legal teams, TeamApt-side legal/pricing, or a structural pricing issue across the program.

## Sources

- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
