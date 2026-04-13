---
title: source — TeamApt 2025 Business Context
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt\TeamApt_2025_Business.md
created: "2026-04-13T22:44:40Z"
updated: "2026-04-13T22:44:40Z"
summary: "TeamApt 2025 business context: ₦24.2B–₦30B revenue target (actual ~₦10–12B, 35–50% attainment), 5 product units (MADD, Monnify, AptPay Suite, TPP, Juliana), Monnify dominant at ₦9.05B, Visa/MC certifications completed, TACHA beta released, bank engagement remained primary bottleneck."
---

[[TeamApt]] 2025 business context. CEO: [[Dennis Ajalie]]. Subsidiary of [[Moniepoint|Moniepoint Inc.]] (Group CEO: [[Tosin Eniolorunda]]). B2B payments infrastructure.

## Key Points

### 2025 Business Model
Two tiers:
- **Core Products (Revenue Drivers):** [[MADD]] (Multi-Account Direct Debit), [[Monnify]] (Merchant Payment Gateway)
- **Enablers:** [[AptPay Suite]] (in-bank processing), [[TPP]] (third party processing), [[Juliana]] (domestic switching)

By 2026, restructured into 4 departments: Direct Debit/CDD, Monnify, TPP, Domestic Switching (AptPay + Juliana merged under [[Babatunde Okufi]])

### Revenue Targets vs Actuals

| Business | Target | Actual | Attainment |
|---|---|---|---|
| Monnify | ₦11–13B | ₦9.05B | ~70–82% |
| Direct Debit | ₦6B | Exceeded 200% of KR | Overachieved |
| Direct to Bank (ATS) | ₦3.7B | ₦635M (Q1 only) | Underperforming |
| Juliana Switch | ₦2.5B | ~₦121M (Account Switch Q4) | Significantly under |
| TPP/IMA | ₦1B | Minimal | Early stage |
| **Total** | **₦24.2–30B** | **~₦10–12B** | **~35–50%** |

Company financial targets: Revenue ₦422M → ₦30B; EBITDA -134% → 40%; Staff Cost ₦4.5B → ₦5.4B

### Direct Debit Performance
- Revenue exceeded 200% of KR (driven by [[Access Bank]] volume)
- Auth success 95.19%, transaction success 83.48% (gap = customer-side failures)
- 20 billers onboarded (2x target) but **0% actively transacting**
- Key lesson: Integration ≠ Activation

### Monnify Performance
- ₦9.05B revenue (₦7.69B local methods), declining Q1→Q3 due to VTU merchant exits
- Card success rate improved 35% → 84.42%
- Payout success 99.99%, disbursement <3s 99.03%
- Revenue concentration risk: >50% VTU volume lost when MTN/Airtel deactivated
- Juliana Switch integration live: Wema, Access, FCMB — ~₦20M processed

### TPP Performance
- Visa endpoint + acquirer processor certification ✅
- Mastercard acquirer processor certification ✅ (POS + e-commerce)
- Visa acquiring license obtained; Mastercard pending
- [[MPGS]] integration live for Monnify and Moniepoint MFB
- [[AptPay Clearing Tool]] (ACT) launched — [[Fidelity Bank]] onboarded
- International card acceptance live on Moniepoint POS

### Domestic Switching Performance
- 37% of Moniepoint POS traffic via Juliana Card Switch (target: 70%)
- 16 domestic issuers connected
- [[TACHA]] centralized clearing beta released
- NIBSS ISO 20022 certification for Account Switch
- Account Switch: 99.89% success, ₦121.2M revenue (Q4)
- Acquiring entity expansion: 0 new (target: 15)

### Direct Debit Revenue Model
- Issuer fee ₦7.50/txn, merchant fee ₦25.00/txn → TeamApt revenue ₦17.50/txn
- Target daily volume: 804,500 transactions
- Key issuing banks: [[Moniepoint]] (235K daily), [[Access Bank]] (252K), [[Fidelity Bank]] (152.5K), GTB (165K)

### Key Bank Relationships (end 2025)
- DD live: [[Access Bank]], [[Polaris Bank]]; pilot-ready: [[Fidelity Bank]], [[Keystone Bank]]
- ATS: 11 banks with POS, 3 with Web (Access, Wema, FCMB)
- Juliana Card Switch: 12 direct issuers + GTB via HabariPay + 4 via CoralPay
- Account Switch: Polaris, Keystone, Union live; Fidelity, Sterling, FCMB planned

### Technology Platforms (end 2025)
- [[Juliana Card Switch]]: 98.96% success, 99% uptime
- [[Juliana Account Switch]]: 99.89% success, ISO 20022
- [[TACHA]]: Beta released (centralized clearing)
- [[ACS]]: Live in Access, Wema, FCMB
- [[GoSubscribe]]: Web deployed (not active), POS not deployed
- [[Loom]]: Transaction monitoring launched
- [[Harness]]: 100% CI/CD migration complete

### Regulatory (2025)
- Visa/MC processor certifications ✅
- PCI-PIN Attestation ✅
- CBN IT Standards: maturity level 4 (benchmark: 2 for PSSPs)
- CBN Spot Check conducted December 2025 — report pending
- FATF: Nigeria removed from grey list (October 2025)

## Cross-Cutting Lessons
1. Integration ≠ Activation (CDD: 20 onboarded, 0% active)
2. Revenue concentration risk (Monnify VTU exits)
3. Bank engagement remained the bottleneck
4. Moniepoint routing missed significantly (37% vs 70%)
5. DevRel massively overperformed (CSAT 94% vs 50%, NPS 88% vs 20%)
6. PTSP late start — no live transactions
7. TACHA feedback loop caused schedule slippage

## Concepts
- [[Nigerian Payments Infrastructure]], [[CBN Regulatory Framework]], [[Card Scheme Certifications]], [[Project Phoenix]]

*Sources: 2025 OKR workbook, Board Presentation February 2026, 2025 Product Strategy slide. Last updated March 2026.*