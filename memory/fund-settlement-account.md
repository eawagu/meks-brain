---
title: Fund Settlement Account
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:00Z"
updated: "2026-04-25T11:52:00Z"
summary: "Bank account designated for inter-bank settlement of TeamApt-processed transactions. D2B Apr 21 aligned: requests for new fund settlement accounts must include Kevin and Finance team; Kevin selects the account."
---

## Definition

A **Fund Settlement Account** is a bank account designated to receive and disburse settlement flows for TeamApt-processed transactions — the destination ledger that closes out interbank obligations.

## D2B Apr 21 aligned process (account whitelisting + selection)

1. Submit **all** accounts the team intends to move money from for whitelisting at the partner bank — typically both the [[Tap]] (switch) account and the [[Money Point]] account.
2. Bank validates and KYCs each account.
3. Selecting the actual account used for settlement is [[Kevin]]'s call (not [[Finance team]]'s alone) — Kevin should be included on every Finance request.
4. Strategy is to push both accounts forward together (signatures match); bank-specific issues handled case by case.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## Active sign-offs / blockers (Apr 22–23)

- **UBA Fund Settlements** — SLA pending bank legal sign-off; updated document shared with UBA for final review.
- **Polaris Bank Fund Settlement** — sign-off remains a blocker.
- **Money Point** — settlement-account configuration pending due to a technical issue with [[Finance team]].
- **Ecobank foreign settlement agent** — form, signature, and resubmission required for Himma; doesn't affect ongoing test integration but required for live.

## Sources

- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
