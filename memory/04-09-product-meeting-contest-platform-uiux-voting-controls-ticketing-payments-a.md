---
title: 04-09 Product Meeting_ Contest Platform UI_UX, Voting Controls, Ticketing, Payments, and Launch Plan-Meeting Minutes
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 04-09 Product Meeting_ Contest Platform UI_UX, Voting Controls, Ticketing, Payments, and Launch Plan-Meeting Minutes.md
summary: April 9, 2026 product meeting minutes covering UI/UX decisions, per-ticket QR codes, configurable voting controls, payout management with a 20% platform default share, and a phased migration plan launching after May 9, 2026 when current events conclude.
---

## Summary
The meeting reviewed a contest platform product with [[Emeka Awagu]] leading decisions on UI, ticketing, voting, payouts, and migration. Key decisions include per-ticket unique QR codes for check-in, configurable vote display controls (number/percentage/graph), 20% default platform share with super-admin override, and a launch date after ongoing events end around May 9, 2026. The team will use a single [[Flutterwave]] web group for payment callbacks and maintain engagement with the current vendor during transition.

## Key Points
- **Homepage priority:** Ticket viewing and contest search over other features — online contests drive sales
- **Voting controls:** Per-contest settings to show/hide total votes, choose display type (number, percentage, graph), and configure minimum vote purchase thresholds
- **Contest types:** Normal contests and awards contests with category filtering; "Candidates" adopted as universal neutral label
- **Ticketing:** Per-ticket unique QR codes and IDs for bulk and individual check-in; standardized ticket template with embedded QR; name capture per ticket for physical events
- **Payouts:** Default 20% platform share, adjustable per event by super admin; advance/offer workflow deducted from final payout; payout screen with balance, request, and mark-as-paid
- **Sales Analysis:** Per-contest Excel export with transactions, votes, fees, and shares; sent to organizers for transparency; linked to payout module
- **Authentication:** Login reliability issues flagged; passwordless/OAuth investigation recommended
- **Migration plan:** New site launches after May 9 when ongoing events complete; single Flutterwave web group for callbacks; current vendor engagement maintained through transition
- **Azure hosting:** Assessment of migration from InMotion to Azure recommended
- **Voting fix:** Highest priority before launch; pause new listings on old site immediately

## Entities Mentioned
- [[Emeka Awagu]] — product decision-maker in meeting
- [[Flutterwave]] — payment platform used for transactions and callbacks
- [[Azure]] — cloud hosting alternative being evaluated
- [[InMotion]] — current web hosting provider

## Concepts
- [[Contest Platform]] — multi-type voting and event platform
- [[QR Code Ticketing]] — unique per-ticket QR codes for event check-in
- [[Configurable Voting Controls]] — organizer-configurable vote display and minimum thresholds
- [[Payout Management]] — settlement of organizer earnings with platform share
- [[Platform Migration]] — transition from old to new website preserving live events
- [[Payment Callback Reliability]] — single payment group for robust transaction confirmation