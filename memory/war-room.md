---
title: War room
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:01Z"
updated: "2026-04-25T11:52:01Z"
summary: "Cross-functional working session pattern used in TeamApt to resolve specific high-friction integration issues with focused attention. D2B Apr 22: Money Point Direct Debit war room scheduled; dedicated Polaris Bank API-failure session scheduled."
---

## Definition

A **war room** in the TeamApt context is a cross-functional working session convened to drive resolution on a specific high-friction issue with focused attention — distinct from the recurring daily/weekly standup cadence. The pattern is used when the standup-level coordination is insufficient and progress requires a dedicated, time-boxed effort.

## D2B Apr 22 instances

- **[[Money Point]] Direct Debit war room** — scheduled today to address OTP delivery failures and the inability to proceed with transaction processing after OTP validation. [[Taiwo Baptista]] to shift and organize. Initial network issue from yesterday was resolved before this war-room scope formed.
- **[[Polaris Bank]] dedicated session** — the group will hold a dedicated session today to resolve continuing Polaris API failures (Name-Inquiry + Transfer APIs unstable). Implicit war-room equivalent.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## When to escalate to a war room

The Apr 22 surfaces suggest a war room is appropriate when:
- A single integration has multiple concurrent technical failures (Money Point: OTP + post-OTP processing).
- API instability is repeated across multiple endpoints (Polaris: Name-Inquiry + Transfer).
- Progress at the standup-level is no longer producing forward motion.

## Sources

- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
