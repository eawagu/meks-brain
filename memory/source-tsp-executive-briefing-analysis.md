---
title: source — TSP Executive Briefing Analysis
type:
  - "source"
cssclasses:
  - "source"
source_path: TSP_Executive_Briefing_Analysis.md
created: "2026-04-13T22:11:14Z"
updated: "2026-04-13T22:11:14Z"
summary: "Frank Atashili's analysis of Alex Adeyemo's TSP Executive Briefing (Mar 2026). Gaps addressed: card switching, ISO 8583, HSM, scheme connections, reconciliation, mandates. Gaps remaining: external tenant model, multi-institution clearing, Account Switch 40%, AptPay Suite, GoSubscribe, tokenization. MFB parallel stack blindspot identified (Postilion/PostCard, Atlas, Iris)."
---

Analysis by [[Frank Atashili]] (CPO/COO) of [[Alex Adeyemo]]'s TSP Platform Executive Briefing, March 23, 2026.

## Gaps Now Addressed
- Card switching explicitly owned by TSP (replaces ~60% of ATS/Juliana)
- ISO 8583 protocol handling via jPOS 3.0 + Netty 4.2
- HSM integration present
- Direct Visa and Mastercard scheme connections architected
- Reconciliation owned by TSP
- Mandate management claimed by TSP

## Gaps Remaining Open
1. **External tenant model absent** — no concept of external financial institutions as TSP clients. Most fundamental architectural issue.
2. **Multi-institution clearing/settlement** — TSP owns reconciliation but not full clearing engine (NIBSS settlement files, Visa TC33, MC IPM)
3. **Juliana 60/40 split ambiguous** — which 60%? Account Switch inter-bank routing may not be covered
4. **AptPay Suite invisible** in architecture
5. **GoSubscribe/subscription billing** — no platform home for recurring payment scheduling, retry, dunning
6. **Tokenization platform** not mentioned
7. **BIN table architecture** not described
8. **Stand-in processing** — not TSP's to build but TSP must handle scheme-initiated approvals

## Impact by Product Team
- Account Payments: HIGH (5 of 19 transaction types, Phase 1 critical path)
- Card Issuance: HIGH (6 transaction types, Phase 4)
- VAS Platform: HIGH (44 provider integrations, Phase 3)
- Cross-Border: MEDIUM (Phase 5, strategically critical for UK)
- Card Acceptance: MEDIUM (settlement changes)
- Payment Gateway (Monnify): MEDIUM (best-served business line)
- Credit: LOW-MEDIUM (Phase 5, clean separation)

## Pending Decisions (Frank's Input Required)
1. Card fee ownership: TSP Fee Engine vs FEP (Frank leans TSP)
2. Card clearing flow: TSP post_ledger vs FEP settles (Frank leans TSP)
3. Liquidity Manager scope — needs Alex clarification

## MFB Parallel Stack Blindspot
Critical dimension not addressed: MFB operates Postilion/PostCard, Smart Card Process, Safe Token, CMS Manager (~12-person team under [[Femi Davies]]), and [[Aptent]]. TSP migration plan doesn't account for migrating MFB off Interswitch stack.

Additionally: MFB operates [[Atlas]] (~500M txn/month, 12+ downstream providers, NIP via Kuwego) and [[Iris]] (15-27B+ txn/month, reconciliation across all 3 group entities). Both in [[Damilare Ogunnaike]]'s org. Monnify still uses Atlas and Iris, not TeamApt equivalents (Juliana/TACHA).

## Recommended Actions
1. Resolve 3 pending decisions with Alex
2. Request migration phase timeline with dates
3. Clarify Juliana 60/40 split
4. Raise external tenant question as roadmap item
5. Staff 4 TBH sub-platform senior roles
6. Product teams begin seam identification
7. Establish integration contracts using TSP's SPI interfaces

## References
[[Transaction Switching Platform]], [[Project Phoenix]], [[Alex Adeyemo]], [[source — Hot List Ownership Analysis]]