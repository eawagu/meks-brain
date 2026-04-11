---
title: Card Controls
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: "Card Controls are customer-configurable restrictions evaluated in real time by the Authorization Engine on every transaction, covering four types: spending limits, MCC restrictions, geographic controls, and channel controls — with changes taking effect immediately."
---

## Definition

Card Controls are customer-configurable restrictions that govern how a card can be used. They are evaluated inline by the [[Authorization Engine]] on every card transaction, after card status and balance checks. Controls can be configured at the card program level (defaults) or overridden at the individual card level.

## Four Control Types

| Type | Description |
|---|---|
| Spending Limits | Maximum spend per-transaction, per-day, per-week |
| MCC Restrictions | Block specific Merchant Category Codes (e.g., gambling, adult content) |
| Geographic Controls | Restrict to or block specific countries or regions |
| Channel Controls | Enable/disable online, contactless, ATM, POS independently |

## Key Properties

- **Immediacy**: Any control change takes effect immediately on the next transaction — no batch processing or delayed activation.
- **Hierarchy**: Program-level settings are defaults; card-level settings override them. The [[Card Management System]] owns control configuration.
- **Ownership**: The [[Card Controls Service]] (owned by [[Team 2 Card Issuance]]) stores and manages controls. The [[Authorization Engine]] (owned by [[Team 1 Card Processing]]) consumes them at runtime via a versioned API contract.
- **Cross-team contract**: Team 2 must not change the controls evaluation schema without Team 1 sign-off and a defined migration window.

## Placement in Authorization Flow

1. Card status check
2. Account status check
3. Balance check
4. **Card controls evaluation** ← here
5. APPROVE (→ TSP lien) or DECLINE (→ reason returned)

## Design Rationale

Controls are classified as "card configuration, not real-time decision logic." This is why [[Card Controls Service]] is owned by [[Team 2 Card Issuance]] rather than Team 1, even though the [[Authorization Engine]] evaluates them. The distinction: Team 2 owns what controls exist and what they say; Team 1 owns the evaluation at runtime via an API contract.

## Sources

- [[001-CI_P-exec-overview_v1.1]] — executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] — ownership rationale and cross-team API contract
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS feature specification
