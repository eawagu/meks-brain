---
title: source — Hot List Ownership Analysis
type:
  - "source"
cssclasses:
  - "source"
source_path: Hot_List_Ownership_Analysis.md
created: "2026-04-13T22:08:40Z"
updated: "2026-04-13T22:08:40Z"
summary: Industry research confirming hot lists (HOT_CARD, HOT_MERCHANT, HOT_TERMINAL, HOT_BIN, HOT_COUNTRY) belong to Card Issuance, Card Acceptance, and Loom — not TSP/switch. Corrects earlier gap analysis error.
---

Industry research and architectural analysis by [[Frank Atashili]] (CPO/COO), March 25, 2026. Corrects the February 2026 gap analysis that incorrectly placed hot list maintenance as a switch (TSP) responsibility.

## Core Finding
Hot lists are not a switch responsibility. Industry standards (PCI DSS, ISO 8583, EMV, Visa/Mastercard rules) and modern architectural practice place hot list ownership with card issuers, acquirers, schemes, and fraud prevention systems.

## Ownership Mapping to [[Project Phoenix]]

| Hot List Type | Phoenix Platform | Rationale |
|---|---|---|
| HOT_CARD | [[Card Issuance]] | Issuer function — card lifecycle, authorization decisions |
| HOT_MERCHANT | [[Card Acceptance]] | Acquirer function — merchant onboarding, scheme VMSS/MATCH |
| HOT_TERMINAL | [[Card Acceptance]] | Acquirer function — terminal management |
| HOT_BIN | [[Loom]] | Fraud prevention signal — risk decisioning |
| HOT_COUNTRY | [[Loom]] | Fraud/sanctions — geographic risk, AML |

## Key Implications
- TSP's role is orchestration: it calls these platforms during transaction processing, not maintaining hot lists itself
- [[Loom]] needs a low-latency real-time lookup path for transaction-time screening (separate from batch AML/sanctions)
- Corrects [[Alex Adeyemo]]'s TSP Executive Briefing which did not address hot lists
- Gap analysis document should be updated accordingly