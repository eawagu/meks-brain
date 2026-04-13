---
title: source — One Platform Migration Plan Analysis
type:
  - "source"
cssclasses:
  - "source"
source_path: One_Platform_Migration_Plan_Analysis.md
created: "2026-04-13T22:12:38Z"
updated: "2026-04-13T22:12:38Z"
summary: "Analysis of Ravi Jakhodia's 6-month One Platform migration plan (Strangler Fig pattern). Strengths: staged delivery, Go/No-Go gates. Risks: ambitious timeline, large TSP scope, ~4-month change freeze, Kenya underspecified, leadership transition mid-stage, no rollback plan defined."
---

Analysis of One Platform Migration Plan v2026.03-1 by [[Ravi Jakhodia]], dated March 27, 2026. Draft pending Frank's refinement.

## Plan Overview
6-month migration using Strangler Fig Pattern to consolidate Nigeria, UK, and Kenya into single unified platform.
- **Stage 1 (2 months):** Core — CBA, Osmos, Shell, Notifications + tactical headstart on Onboarding/ID/Channel UX
- **Stage 2 (3 months):** Alpha — capability decomposition, merge, build across 3 markets. Change freeze begins.
- **Stage 3 (1 month):** Beta + rollout. Go/No-Go gate with quantitative criteria.

## Strengths
- Strangler Fig avoids big-bang cutover risk
- Formal Go/No-Go gate with quantitative criteria (error rate, payment success rate, p99 latency, open bugs)
- Change freeze governance with "why can't we wait?" principle, [[Tosin Eniolorunda]] heading exception process
- Tactical headstart on independent workstreams

## Risks Identified
1. **6 months is ambitious** — Stage 2 asks for decomposition + merge + build + alpha in 3 months
2. **TSP scope is large** — "One global TSP ready for Nigeria, UK, Kenya" in Stage 1 (2 months)
3. **~4-month change freeze** is a business risk — no quantified impact on Nigeria revenue
4. **Kenya underspecified** — no dedicated Stage 2 owner, absorption mechanism unclear
5. **Stage 2 leadership transition** — ownership shifts from existing to new platform leaders mid-stage
6. **Rollback strategy mentioned but not defined**
7. **No explicit resource/staffing plan**
8. **Alpha success criteria subjective** (unlike quantitative beta criteria)

## Recommendations
1. Make alpha criteria as quantitative as beta
2. Produce concrete rollback plan
3. Define Kenya workstream with dedicated owner
4. Validate timeline with resource plan
5. Model change freeze business impact
6. Document leadership transition protocol

## References
[[Project Phoenix]], [[Ravi Jakhodia]], [[Transaction Switching Platform]]