---
title: TPP Operations Doctrine
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TPP Operations Doctrine.md
summary: Version 1.0 operations doctrine for Third-Party Payments (TPP) operations, authored by Oluwayimika Debo-Carpenter on March 10, 2026, defining control principles for financially accurate, regulatorily compliant, and auditable settlement across MPGS, MIP, and Visa transactions.
---

## Summary
A formal operations doctrine document for the TPP function, covering operating principles, scope, control framework, risk management, and documentation standards. Authored by [[Oluwayimika Debo-Carpenter]], version 1.0 dated March 10, 2026 — predating the PIP by 14 days.

## Key Points
- **Core principles (7):** Accuracy over speed; settlement integrity is paramount (traceable, reconciled, supported, explainable); every financial movement must be auditable; regulatory compliance is foundational (not periodic); exception visibility prevents loss; segregation of duties protects the system
- **Scope:** Transaction confirmation, reconciliation, merchant settlement execution, FX validation, dispute/chargeback financial handling, exception resolution, settlement reporting and audit
- **Operating model:** Layered control structure — transaction validation → reconciliation → settlement authorization → settlement execution → post-settlement verification; no stage may be skipped
- **Financial control framework:** Full reconciliation across transaction records, scheme settlement, TPP accounts (NGN and USD), and bank movement; FX must be sourced from approved providers, timestamped, documented
- **Settlement doctrine:** Execute only when funds confirmed, FX documented, beneficiary verified
- **Risk categories:** Settlement error, FX mispricing, reconciliation break, regulatory breach, dispute mis-accounting
- **Documentation standard:** Every operation generates settlement instruction record, reconciliation proof, exception log (if applicable), settlement confirmation, and audit trail
- **Zero tolerance:** Untraceable financial movement

## Entities Mentioned
- [[Oluwayimika Debo-Carpenter]] — Ops Lead, author of doctrine
- [[Tolulope Obianwu]] — Head of Core Operations (doctrine is part of PIP evidence trail)
- [[TeamApt]] — organization

## Concepts
- [[Operations Doctrine]] — formal document defining operating principles and decision standards
- [[Settlement Integrity]] — requirement that all fund movements be traceable, reconciled, and auditable
- [[Segregation of Duties]] — separation of initiation, approval, execution, and reconciliation responsibilities
- [[Third Party Processing Operations]] — TPP operations covering MPGS, MIP, Visa transactions
- [[FX Governance]] — controls on currency conversion in cross-border payments
- [[Audit Trail]] — complete reconstructible record of all financial operations
- [[Regulatory Compliance]] — continuous alignment with scheme rules and CBN requirements