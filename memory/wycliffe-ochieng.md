---
type:
  - "entity"
title: Wycliffe Ochieng
aliases:
  - "Wycliffe Ochieng'"
created: 2026-04-11
summary: TeamApt engineer — primary TACHA architect; authored clearing/settlement RFCs (reversals/refunds/disputes Jan 2026, S3/ClickHouse archival Q2 2026); owns 4 of 10 Phoenix alignment gaps; double-hatting under Project Phoenix restructuring.
updated: "2026-04-25T12:04:17Z"
cssclasses:
  - "entity"
---

## Overview

Wycliffe Ochieng is a senior engineer at [[TeamApt]] — **EM double-hat: Switch + ATS** under [[Project Phoenix]] Phase 1 per the Apr 22, 2026 [[TeamApt-Platformization-Org-Movements (1)|Org Movements brief]]. He is also the primary architect for [[TACHA]] (centralized clearing and settlement platform). ATS engineering manager role transitioned to him from [[Kitan]] on Apr 8, 2026.

Aliases: "Wycliffe Ochieng'" (with trailing apostrophe — Kenyan style; Gemini transcripts and meeting invites render this way).

## Role Under Phoenix Phase 1

- **EM double-hat (Switch + ATS)** — hold-the-fort for [[TSPP]] Phase 1 while strike team builds the new platform in parallel. Keeps Juliana / ATS / App Centre up; no code freeze. Strangler Fig cutover, not big-bang.
- Peer to Gafar ([[Abdulgafar Obeitor]]) + AptPay BAU engineers, who hold the fort on AptPay Suite.

## TACHA Responsibilities

- Authored the TACHA Reversal, Refund & Dispute Management RFC (January 2026, under review)
- Authored the S3 → ClickHouse archival pipeline RFC (planned Q2 2026)
- Top of the tech escalation path for TACHA: [[Saheed Yusuf]] → [[Oladapo Onayemi]] → Wycliffe Ochieng → [[Ravi Kiran Veluguleti|Ravi Veluguleti]]
- Owns 4 of 10 Phoenix alignment gaps:
  - **HIGH:** Automated test coverage not stated (Phoenix standard ≥80%)
  - **HIGH:** Real production performance metrics missing (with SRE)
  - **Medium:** API versioning strategy not documented
  - **Medium:** OpenAPI/Swagger spec not confirmed

## Transitions

- **Apr 8, 2026:** ATS engineering manager role transitioned from [[Kitan]] to Wycliffe — per Direct to Bank standup Apr 8.
- **Apr 22, 2026:** Double-hat formalised as Switch + ATS EM for TSPP Phase 1 hold-the-fort.

## 2026-04-22 weekly team meeting

- **Java 21 / Cosmos library** — noted his team had a similar issue but built a **wrapper class** around the library; offered to connect with [[Priya Chawla]] to show implementation. Advised that if existing libraries are versioned, they can continue using their specific version even if core libraries move.
- **Security tooling** — agreed with [[Yasir Syed Ali]] that the security team's tooling differences cause banks to find different vulnerabilities than the internal scan finds.
- **V791** — confirmed the 3D server vulnerability is done; needs to be retested by the infosec team. Owns retest request.

Source: [[TeamApt Weekly Team Meeting - 2026-04-22 16:59 IST]].

## Sources

- [[Visa Collections-Only Implementation Status]], [[TACHA_Architecture_and_Scheduled_Jobs]], [[TACHA_Clearing_Engine_and_Settlement_Logic]], [[TACHA_Phoenix_Alignment_Checklist]], [[TACHA_Reversal_Refund_Dispute_Management]]
- [[Direct to Bank Daily Stand Up 2026-04-08]] — ATS EM transition
- [[TeamApt-Platformization-Org-Movements (1)]] — Frank's Apr 22, 2026 brief confirming Switch + ATS double-hat
- [[TeamApt Weekly Team Meeting - 2026-04-22 16:59 IST]]
