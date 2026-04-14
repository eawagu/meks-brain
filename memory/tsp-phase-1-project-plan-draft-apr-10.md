---
title: TSP Phase 1 Project Plan DRAFT (Apr 10)
type:
  - "source"
cssclasses:
  - "source"
source_path: TSP_Phase1_Project_Plan_DRAFT.md
created: "2026-04-14T13:30:53Z"
updated: "2026-04-14T13:30:53Z"
summary: "Frank Atashili's TSP Phase 1 project plan DRAFT (updated 2026-04-10b, aligned to Alex's Apr 9 4-phase delivery plan). For internal review Apr 11, leadership review (Tosin + Felix) Apr 14 afternoon. 12-week continuous delivery, all 19 transaction types, NG+GB markets, 2 strike teams / 15 people. Includes foundation-built inventory, 23+ external integrations across 6 protocols, 4 business-friendly milestones (M1 Apr 24, M2 May 15, M3 Jun 5, M4 Jun 26)."
---

## Summary

Frank's TSP Phase 1 project plan draft — the business-layer companion to Alex Adeyemo's technical 4-phase delivery plan. Aligned April 10 after reviewing Alex's full 24-slide deck and Ravi J's Stage 1 mastersheet. For internal team review Friday April 11, then leadership presentation Monday April 14 afternoon (Tosin + Felix).

## Key Points

- **Objective:** Unified TSP platform receiving transactions from internal MoniePoint/TeamApt domain platforms, switching to correct destinations, proving E2E processing for all 19 transaction types in both NG and GB markets with continuous delivery and in-flight migration/cutover by end of Phase 1.
- **Scope (In):** 19 transaction types (PAY_OUT, PAY_IN, INTERNAL_TRANSFER, CARD_AUTH/FINANCIAL/CLEARING, VAS_AIRTIME/DATA/BILL_PAYMENT, CROSS_CURRENCY, LOAN, DIRECT_DEBIT, MERCHANT_SETTLEMENT), Spine (scaffolded), switching (auth/clearing/settlement/dispute routing), NIP+MPS+ISO 8583/PostBridge adapters, recon+backoffice+deployment pipelines, migration/cutover with feature flags, capability discovery.
- **Scope (Out):** External bank ATS deployments (deferred), all 40+ providers (Phase 1 proves interface types with 1–2 providers each), full traffic migration, big bang cutover, SaaS-to-external-banks, banking host functions, PTSP/PTAD, multi-institution clearing engine.
- **Team (15 people, 2 strike teams):** Team Spine (EM Sulaiman Adeeyo) + Team Adapters (EM Sunday Ayodele). Alex Adeyemo (Head of Eng/Tech Lead), Frank Atashili (Product Lead, part-time), Ravi Jakhodia (Program Lead), Ravi Veluguleti (Card Switching Domain Owner, VP, TMAP). Engineers: Abeeb Ahmad, Christopher Ogbosuka, Vijyendra Mishra (UK), Muhammad Iqbal (UK), Muhammad Siddiqui (Principal), Krunal Chaudhari (UK), Moyosore Omoniyi (UK), Mubasher Saifullah (UK). Shared: 1 Architect, 1 VAS PM (Bunmi Oyefisayo), 2 QAs.
- **Resource risks:** No dedicated MoniePoint engineers despite initial commitments. Felix committed to context-sharing only. Ask to Ravi J: advocate for TSP support in team OKRs (~20% time).
- **Systems in Scope (MFB HIGHEST PRIORITY):** Atlas (500M tx/month, account switching core), Iris (27B+ tx/month recon), Postilion/PostCard (card CMS vendor-managed), CMS Manager (12-person team), Aptent (auth routing), Smart Card Process, Safe Token. TeamApt Priority 2: Juliana Card/Account Switch, TACHA, ATS Suite (deferred), DD, TPP ACT.
- **Foundation Already Delivered (as of April):** 15-module Maven monorepo at gitlab.com/tcosmos/fx/tsp-platform, 9-part LLD (21k+ lines), Tech stack (Java 25, Spring Boot 4.0, Spanner, Kafka+Debezium, jPOS 3.0.1+Netty 4.2, Harness→GKE). Spine built: workflow engine, state machine (16 states), fee engine (5 calculators), posting strategies, routing, 6 step executors, integration clients (CBA/Treasury/Loom), adapter infrastructure. Infrastructure: ISO 8583 codec (Visa+MC packagers, HSM Thales PKCS#11), CDC outbox, 34 DDL migrations, 102 test classes (85% line/80% branch coverage). Reverse engineering: NG payout (44 stories), VAS (18 stories), card switching (42 capabilities), 78 legacy components across 15 capabilities.
- **Still to Build:** TransactionService orchestrator, ~15 remaining step executors, tsp-adapter-ng (NIP SOAP, NPS ISO 20022, Interswitch, VAS), tsp-adapter-gb (ClearBank, FPS, TrueLayer, Checkout.com), Visa/MC dispatch logic, ISO 20022 codec, recon strategies, backoffice API, 3DS, deployment pipelines, feature flags (CountryActivationGuard).
- **Timeline:** 12 weeks, 4 milestones. M1 First Live Transaction wk 3 (Apr 24) — PAY_OUT NG via NIP. M2 Two Markets Six Products wk 6 (May 15) — PAY_OUT GB, PAY_IN NG+GB, INTERNAL_TRANSFER, CARD_FINANCIAL, CARD_AUTH, VAS_AIRTIME. M3 Full Catalogue & Ops-Ready wk 9 (Jun 5) — all 19 types, recon engine, backoffice, Harness CD, 3DS, feature flag guards. M4 Cutover Begun wk 12 (Jun 26) — Atlas feature flag, internal canary, 5%→25%→100% ramp, tsp-history-bridge, first legacy removal.
- **Integration Landscape:** 23+ external integrations across 6 protocols — NG (9: NPS ISO 20022, NIP SOAP, 10+ Bank FEPs PostBridge, Interswitch, CoralPay, PTSA, 44 VAS providers, NIBSS NSS, NG Account Resolver), GB (7: ClearBank FPS, RailsR FPS, TrueLayer, Volt, Checkout.com, BACS, CoP/TellMoney), Global+Core (7: CBA, Treasury/FX, Loom gRPC, Visa direct ISO 8583+SFTP, Mastercard direct ISO 8583+SFTP, HSM Thales PKCS#11, scheme clearing files).
- **Migration Pattern:** Feature flag at validation-to-fund-movement seam in Atlas. TSP initially connects to existing downstream integrations (no re-certification). Internal/test users first, gradual expansion.
- **Workstreams:** WS1 Foundation Wiring & Transaction Type Delivery (4 phases), WS2 Business Validation & Capability Sign-off (Frank + Ravi V + PMs, parallel), WS3 Program Governance (Ravi J — weekly Tue 5pm WAT Phoenix Stage 1 Check-in, bi-weekly leadership update), WS4 AI-PM Process Adoption (Frank + Bunmi, compressed to end Apr 27: GitLab repo, Jira 4-board model from MNP-SQUAD-STARTER-V2, subcapability specs with events and ACs, first Jira sync).
- **Key risks:** MoniePoint blind spots, business leader availability (BAU-consumed, Ravi's "must find the time"), resource shortfall, Atlas integration complexity, re-certification risk, Stage 2 dependency, London strategy conference Apr 14–16 consumes a week, timeline misalignment 3mo vs 2mo expectation.
- **Immediate next steps:** Ravi V capability mapping Apr 8-10, Alex's scoping before Friday, Friday Apr 11 internal team review, Monday Apr 14 afternoon leadership meeting (Tosin + Felix).

## Entities Mentioned

[[Frank Atashili]], [[Alex Adeyemo]], [[Ravi Jakhodia]], [[Ravi Veluguleti]], [[Bunmi Oyefisayo]], [[Sulaiman Adeeyo]], [[Sunday Ayodele]], [[Abeeb Ahmad]], [[Christopher Ogbosuka]], [[Vijyendra Mishra]], [[Muhammad Iqbal]], [[Muhammad Siddiqui]], [[Krunal Chaudhari]], [[Moyosore Omoniyi]], [[Mubasher Saifullah]], [[Felix Ike]], [[Tosin Eniolorunda]], [[Khalil]], [[Moniepoint]], [[TeamApt]], [[MoniePoint MFB]], [[Project Phoenix]], [[TSP]], [[Atlas]], [[Iris]], [[Juliana]], [[TACHA]], [[Aptent]], [[PostBridge]], [[NIBSS]], [[NIP]], [[NPS]], [[ClearBank]], [[TrueLayer]], [[Visa]], [[Mastercard]], [[Interswitch]], [[CoralPay]], [[Loom]]

## Concepts

[[Transaction Switching]], [[Transaction Switching Platform]], [[Spine and Module Architecture]], [[Strangler Fig Pattern]], [[Feature Flags]], [[ISO 8583]], [[ISO 20022]], [[Continuous Delivery]], [[AI PM Process]]