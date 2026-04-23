---
type:
  - "entity"
title: GTBank
created: 2026-04-11
summary: "Guaranty Trust Bank — Direct Debit issuing bank partner via Habari Pay. Apr 23: API still not deployed — Zach's infra challenge persists one week after Apr 16 surfacing (same blocker)."
updated: "2026-04-23T14:43:37Z"
cssclasses:
  - "entity"
---

## Overview

[[GTBank]] (Guaranty Trust Bank) is a Nigerian bank. [[Direct Debit]] issuing bank partner via [[Habari Pay]].

## Direct to Bank Integration

**2026-04-16:** Team successfully funded the account and tested the GTBank API through the barrier yesterday (Apr 15). Deployment is pending — [[Zach]] is facing an infrastructure challenge expected to be fixed this morning. Source: [[Direct to Bank Daily Stand Up 2026-04-16]].

**2026-04-23:** API still not deployed one week later. Same pattern restated: account funded, API tested through the barrier yesterday, deployment pending on [[Zach]]'s infrastructure challenge "to be fixed this morning." The fact that this exact framing is repeated one week later suggests the infra challenge is not trivial and is being persistently under-estimated, or GT Bank-specific environment complications are blocking Zach. Source: [[note_2026-04-23T13-53-37-857Z]].

**2026-04-13:** GTB interbank transfer awaiting credentials and signed SLAs. Source: [[Direct to Bank Daily Stand Up 2026-04-13]].

## Pattern

GT Bank deployment has been "pending Zach's infra fix today" for at least one week. Either the infra challenge is genuinely harder than initially scoped, or progress tracking is not surfacing the real blocker. Worth a structural check (what is the exact infra blocker? who's unblocking Zach?) rather than another week of "will fix today."

## Related
- [[AptPay Direct Debit - OKR Planning Q2 2026]]
- [[Habari Pay]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[note_2026-04-23T13-53-37-857Z]]