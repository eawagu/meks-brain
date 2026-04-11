---
type:
  - "source"
title: 04-09 Product Meeting_ Contest Platform UI_UX, Voting Controls, Ticketing, Payments, and Launch Plan-Meeting Minutes
created: 2026-04-11
summary: "April 9, 2026 Elfrique product meeting — Mek demoed the new site's events and contests features. Covered UI/UX, per-ticket QR codes, configurable voting controls, payout management with 20% platform default share, and phased migration launching after May 9, 2026."
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 04-09 Product Meeting_ Contest Platform UI_UX, Voting Controls, Ticketing, Payments, and Launch Plan-Meeting Minutes.md
---

## Summary
[[Elfrique]] product meeting on April 9, 2026. [[Emeka Awagu]] (Mek) led the meeting, demoing the new site he is building as the developer. This demo covered the **events and contests features only** — other platform features (flights, hotels, tours, trivia) will be demoed separately. Key decisions include per-ticket unique QR codes for check-in, configurable vote display controls (number/percentage/graph), 20% default platform share with super-admin override, and a launch date after ongoing events end around May 9, 2026. The team will use a single [[Flutterwave]] web group for payment callbacks and maintain engagement with the current vendor during transition.

## Key Points
- **Homepage priority:** Ticket viewing and contest search over other features — online contests drive sales
- **Voting controls:** Per-contest settings to show/hide total votes, choose display type (number, percentage, graph), and configure minimum vote purchase thresholds
- **Leaderboard:** Top 3 display above contestants with link to full leaderboard; creator can choose display-by-ranking vs display-by-number; paginated full list with search
- **Contest types:** Normal contests and awards contests with category filtering; "Candidates" adopted as universal neutral label
- **Ticketing:** Per-ticket unique QR codes and IDs for bulk and individual check-in; standardized ticket template (to be designed); name capture per ticket for physical events; per-ticket-type start/end dates (e.g., early bird); online/physical event filter on landing page
- **Payouts:** Default 20% platform share, adjustable per event by super admin; advance/offer workflow deducted from final payout; payout screen with balance, request, and mark-as-paid
- **Sales Analysis:** Per-contest Excel export with transactions, votes, fees, and shares; sent to organizers for transparency; linked to payout module
- **Authentication:** Login reliability issues flagged (old site); passwordless/OAuth investigation recommended
- **Migration plan:** New site launches after May 9 when ongoing events complete; single Flutterwave web group for callbacks; Silverbird event targeted as anchor for launch within two weeks; pause new listings on old site immediately
- **Azure hosting:** Assessment of migration from InMotion to Azure recommended
- **Voting fix:** Highest priority before launch
- **Data migration:** Mek to extract needed data from old site database as Excel on request

## Entities Mentioned
- [[Emeka Awagu]] — developer building the new site, board member of Elfrique, meeting lead
- [[Elfrique]] — the company; events, contests, flights, hotels, tours, trivia platform
- [[Flutterwave]] — payment platform used for transactions and callbacks
- [[Azure]] — cloud hosting alternative being evaluated
- [[InMotion]] — current web hosting provider

## Concepts
- [[QR Code Ticketing]] — unique per-ticket QR codes for event check-in
- [[Configurable Voting Controls]] — organizer-configurable vote display and minimum thresholds
- [[Payout Management]] — settlement of organizer earnings with platform share
- [[Platform Migration]] — transition from old to new website preserving live events
- [[Payment Callback Reliability]] — single payment group for robust transaction confirmation