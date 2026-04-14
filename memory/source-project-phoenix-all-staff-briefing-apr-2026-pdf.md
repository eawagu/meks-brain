---
title: source — Project Phoenix All-Staff Briefing (Apr 2026, PDF)
type:
  - "source"
cssclasses:
  - "source"
source_path: Project Phoenix\Project_Phoenix_All_Staff_Briefing.pdf
created: "2026-04-14T17:20:52Z"
updated: "2026-04-14T17:20:52Z"
summary: "Frank Atashili's all-staff briefing on Project Phoenix — product-to-platform transformation, OpCo/IPCo/DevCo legal structure, five key platforms (TSP, Card Issuance, Card Acceptance, Payment Gateway, Identity), five TSP migration phases with PAY_OUT as Phase 1 critical path (target end-May 2026), strangler fig rollout, transition timeline April–June 2026."
---

## Summary

Frank Atashili's all-staff briefing deck (April 2026, Internal — Confidential) introducing Project Phoenix as a group-wide transformation from a product-centric model (where teams own full tech stacks per product) to a platform-centric model (where teams build shared platforms consumed by every Moniepoint operating entity). Explains the legal split across Moniepoint Inc. (parent), Operating Companies (Moniepoint MFB, TeamApt, MonieWorld, Sumac MFB), IP/Platform Company (Moniepoint Technologies UK), and Development Companies (MP Software Development Nigeria, Moniepoint Technologies India, Moniepoint Rep Office Spain). Lays out the five initial platforms, the five-phase TSP modernisation sequence, and the April-to-June transition timeline.

## Key Points

- **Before vs. After:** Product-Centric → Platform-Centric. Teams built around shared platforms; "build once, configure per country"; new country = config, not a rebuild. [[TeamApt]]'s CBN switching & processing licences are the foundation — platforms needing them must operate through TeamApt.
- **Two company types:**
  - **OpCos** (Moniepoint MFB, TeamApt, MonieWorld, Sumac): own country-specific licences, operations, compliance, customers, sales, P&L.
  - **Platform Companies (Moniepoint Technologies UK + DevCos):** own IP, software development, product management, design, engineering, QA, SRE. Charge OpCos for services; own P&L.
- **Group tech organisation:** Moniepoint Inc. (USA, parent) → OpCos (Moniepoint MFB, TeamApt, MonieWorld, Sumac MFB) → IPCo (Moniepoint Technologies UK, owns all platform IP) → DevCos (MP Software Development Nigeria, Moniepoint Technologies India, Moniepoint Rep Office Spain). "OpCos hold licences and run the business → IPCo owns the platform IP → DevCos employ the engineers who build the platforms."
- **Five key platforms for TeamApt:** [[Transaction Switching & Processing (TSP)]], [[Card Issuance & Processing]], [[Card Acceptance & Processing]], [[Payment Gateway (Monnify)]], [[Identity Platform]]. Additional platforms planned: Digital Banking, Business Banking, Credit, Infrastructure.
- **TSP detail:** 19 transaction types, 6 domain callers, 65 team members, 5 migration phases. Already built: ISO 8583 switching (jPOS 3.0 + Netty 4.2), direct Visa & Mastercard scheme connections, HSM integration (PIN/MAC/tokenisation), 21-step workflow engine (493 passing tests), config-driven Fee Engine replacing 5 libraries.
- **TSP migration phases:**
  - Phase 1 PAY_OUT (outbound transfers) — Strike Team: Bunmi, Ravi V, Yusuf, Chris, Abeeb. 100% dedicated. Target end-May 2026. All other teams "hold the fort."
  - Phase 2 PAY_IN_BANK_TRANSFER + INTERNAL_TRANSFER
  - Phase 3 VAS — 44 provider integrations move to TSP adapter layer
  - Phase 4 Card Switching — requires resolved fee ownership and clearing flow decisions
  - Phase 5 Cross-Border & Credit — longest runway
- **Strangler fig pattern with feature flags; no big bang; instant rollback per transaction type.**
- **Proposed team movements (likely move to platforms):** PMs & APMs, engineering managers & engineers, SREs, product designers, QAs, data engineers (embedded). "Likely Stay in OpCos": Operations (reconciliation, settlement ops, disputes), compliance/regulatory, customer support, fraud desk, sales/BD, finance, audit, legal, people ops, country-licence holders. Functional reporting unchanged; business-line reporting shifts to platform leadership triads.
- **Transition timeline:** Phase 1 Planning & Prep (Apr 1–15), Phase 2 Transition Ramp (Apr 16 – May 31), Phase 3 Stabilisation (Jun 1–30). "Nothing changes immediately. Your current OKRs still apply. The transition is gradual — platform thinking starts now, full transition by June."
- **"What You Should Do Now":** (1) deliver current OKRs, (2) think platform-first, (3) document capabilities, (4) take AI course on L&D platform, (5) watch for follow-up session on change specs + Git-based artifacts.

## Entities Mentioned

[[Frank Atashili]], [[TeamApt]], [[Moniepoint MFB]], [[MonieWorld]], [[Sumac MFB]], [[Moniepoint Technologies UK]], [[MP Software Development]], [[Moniepoint Technologies India]], [[Moniepoint Rep Office Spain]]

## Concepts

[[Project Phoenix]], [[OpCos vs DevCos]], [[Platform-Centric Model]], [[Transaction Switching & Processing (TSP)]], [[Card Issuance & Processing]], [[Card Acceptance & Processing]], [[Payment Gateway (Monnify)]], [[Identity Platform]], [[Strangler Fig Pattern]], [[CBN Switching License]]