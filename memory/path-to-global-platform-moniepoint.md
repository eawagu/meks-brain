---
title: Path to Global Platform — Moniepoint
type:
  - "source"
cssclasses:
  - "source"
source_path: Path_to_Global_Platform_Moniepoint.pdf
created: "2026-04-14T15:39:32Z"
updated: "2026-04-14T15:39:32Z"
summary: Moniepoint internal doc v1.0 (2025) "Path to Global Platform" — 4-phase approach (Discovery, Artifact Generation, Merge, Deployment) for reverse-engineering Nigeria MFB and UK MW stacks into a unified global platform, with human confidence scoring, Kenya pressure test gate, and CORE (CBA/Cosmos) singularity as 4A precursor.
---

## Summary
Confidential internal Moniepoint document outlining the approach for unifying the Nigeria MFB (Business, Personal, backoffice) and UK MW (+ backoffice) product stacks into a single global platform. Four phases with human review gates, confidence scoring (1–5), and a Kenya pressure test before deployment begins. Explicitly identifies business leader review quality as the single biggest risk factor.

## Key Points
- **Objective:** Reverse-engineer, document, and migrate Nigeria MFB + UK MW stacks into unified global platform. 4 phases with human review + confidence scoring throughout.
- **Critical dependency:** Business leader review quality is the single biggest risk factor — reviews must be substantive, not sign-off formalities.
- **Phase 1 — Capability Discovery (run separately for MFB and MW):** Step 1 Screen Inventory → Step 2 Capability/Feature Grouping → Step 3 Back-End Code Enrichment. Each PM+EM runs Claude with preset Skills. Business leaders conduct thorough review; capabilities scored 1–5 (not binary).
- **Phase 2 — Artifact Generation (country-agnostic):** Gate — only capabilities with confidence ≥4 enter artifact generation. Step 1 Platform Capabilities & Artifacts (MFB + MW leaders with CPO). Step 2 Features/User Stories/ACs/Journeys with market-specific config tables + adapters. Step 3 Screen Mapping & Design Sanity Check. "High discipline required."
- **Phase 3 — Artifact Merge (Nigeria + UK):** Not additive — same capability may have different business logic, regulatory constraints, risk rules. Trade-off decisions require senior product, engineering, compliance input. Global platform teams own the merge. **Kenya Pressure Test** gate — framework must accommodate hypothetical Kenya launch without core changes.
- **Phase 4A — Backend Deployment:** **Precursor: single CORE (CBA, Cosmos)**. Build backend delta for all services; deploy one service at a time; both existing apps (NG + UK) consume upgraded backend.
  - **Workstream 1 — Codebase Refactoring:** Extract Nigeria-specific logic (currency, KYC, regulatory, phone formats, bank codes) from core to adapter/config layer. Observable behaviour must not change.
  - **Workstream 2 — Feature Delta Build:** Net-new capabilities identified in Phase 3 merge. Can run in parallel with Phase 3 per-feature (doesn't block).
- **Phase 4B — Frontend Merge:** Backend services stable first; NG + UK apps merged into single global app; UX iterations may be required.
- **Phase gates summary:**
  - Phase 1 gate: CPO review; all capabilities score 4+.
  - Phase 2 gate: BL sign-off; design mapping complete.
  - Phase 3 gate: Compliance + senior product sign-off on trade-offs.
  - Phase 4A gate: Uptime and error rate thresholds met.
  - Phase 4B gate: Go/no-go sign-off from both market leads.
- **Key risks:** (1) Shallow business leader reviews — mitigation: time budgets, confidence scoring. (2) Third-party integrations not surfaced — mitigation: engineering cross-check against existing 3rd-party integrations. (3) Market trade-offs underestimated — mitigation: platform + erstwhile business leader sign-off. (4) Low-confidence capabilities proceeding — **mitigation: block capabilities scoring ≤3 from Phase 2**.
- This document is the strategic framework the Alex/Paul reverse-engineering tool was built to execute.

## Entities Mentioned
[[Moniepoint]], Nigeria MFB, UK MW, [[Claude]], CBA, Cosmos

## Concepts
[[Path to Global Platform]], [[Reverse Engineering Pipeline]], [[Country-Agnostic Platform]], [[Capability Confidence Scoring]], [[Kenya Pressure Test]], [[Market Adapter Framework]], [[Single CORE Platform]], [[Trade-off Decision Audit Trail]]