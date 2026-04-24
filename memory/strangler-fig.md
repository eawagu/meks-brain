---
title: Strangler Fig
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-24T11:50:57Z"
updated: "2026-04-24T11:50:57Z"
summary: Migration pattern for the Phoenix One Platform cutover — legacy stays up while new platform builds in parallel on a separate app; legacy routes cut over selectively over time. Applied to TSPP Phase 1 per Apr 22, 2026 Org Movements brief (no big-bang; Juliana/ATS/App Centre stay up).
---

## Definition

Strangler Fig is a **migration pattern** where legacy systems remain operational while a new system builds in parallel, and legacy routes/functionality are progressively "strangled" — cut over to the new system selectively and incrementally rather than in a single big-bang switch.

Named after the strangler fig tree, which grows around its host and eventually replaces it.

## In Project Phoenix

[[Project Phoenix]]'s [[One Platform Migration Strategy]] uses Strangler Fig for the 6-month cutover targeting Nigeria, UK, and Kenya. Led by [[Ravi Jakhodia]] (Program).

### Stage structure
- Stage 1 (Months 1–2): Core Capabilities + Kenya Discovery — target End of May 2026
- Stage 2 (Months 3–5): All Platforms + Alpha Launch — target End of August 2026 (imposes ~4-month change freeze)
- Stage 3 (Month 6): Beta + Commercial Roll-Out — target September 2026

## TSPP Phase 1 Application (per Apr 22, 2026 brief)

Frank's [[TeamApt-Platformization-Org-Movements (1)|Org Movements brief]] emphasises:

- Strike team (build) stands up the new TSPP platform in parallel
- Hold-the-fort engineers keep Juliana / ATS / App Centre up — **no code freeze** on legacy
- First alpha capabilities ship via Strangler Fig on a separate app (target late 2026)
- Legacy routes cut over selectively — **Strangler Fig cutover, not big-bang**
- 2027 steady state: Dispute extracted first, then Operator platform, then Authentication/Authorization big split

## Sources

- [[Project Phoenix]]
- [[TeamApt-Platformization-Org-Movements (1)]]