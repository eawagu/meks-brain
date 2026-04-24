---
type:
  - "entity"
title: Emeka Awagu
aliases:
  - "Mek"
  - "Emeka"
created: 2026-04-11
summary: "CTO at TeamApt Ltd (subsidiary of Moniepoint Inc.), responsible for technology strategy, reliability, talent, and operations across the Technology Operations division. This is the brain owner's own profile — this brain belongs to Emeka Awagu (Mek)."
updated: "2026-04-24T11:46:07Z"
cssclasses:
  - "entity"
---

## Overview
Emeka Awagu (known as Mek) is the Chief Technology Officer at [[TeamApt]] Ltd. He reports to [[Dennis Ajalie]] (CEO) with a dotted line to [[Felix Ike]] (Group CTO, Moniepoint Inc.). His accountability framework was formally documented in March 2026 with a review date of September 18, 2026. Under [[Project Phoenix]] he also serves as Engineering side of the [[CI&P]] platform triad alongside [[Tracy Ojaigho]] (Product) — confirmed in Frank Atashili's Apr 22, 2026 [[TeamApt-Platformization-Org-Movements (1)|Org Movements brief]].

> **Note:** This brain belongs to Emeka Awagu. All pages, signals, and sources are written from his perspective as the brain owner.

## Role Scope
Six accountability areas as CTO:
- **Technology Reliability & Security** — incident metrics, MTTR, security posture, P95 API response times
- **Technology Scales Ahead of Business** — platform milestones, roadmap alignment, new scheme/product/market readiness
- **Right People in Right Seats** — leadership seats filled at H Threshold, active performance management, OKR cascade
- **Clear Structure & Decision Rights** — dual reporting model (Mek/Frank) actively managed; cross-domain decision ownership
- **Context & Institutional Memory** — documentation, knowledge transfer, AI-assisted operations
- **Goals Cascade Correctly** — all Technology Operations pillars have OKRs that cascade from TeamApt goals

## Phoenix Role — CI&P Engineering

Per Frank's [[TeamApt-Platformization-Org-Movements (1)|Org Movements brief]] (Apr 22, 2026), Emeka is named as the engineering side of the Card Issuance & Processing Platform triad:

- **CI&P triad:** [[Tracy Ojaigho]] (Head/Product), Emeka (Engineering), Design TBD.
- **Phase 1 team additions:** [[Ketan Dhamasana]] transfers in as EM for CMS / Card Issuance under Emeka & Tracy (from AptPay Suite).
- **Operational ownership (Apr 14):** formalized platform takeover of the existing [[MFB Cards Team]] under the Strike Team + Continuity Operating Model.
- **Integration with other platforms:** CI&P consumes [[TSPP]] (Auth Engine / 3DS–SCA path requires sub-500ms TSP responses); Payment Gateway Platform consumes CI&P for 3DS/SCA.

This is a peer triad role at the group platform level — it does not reduce Emeka's TeamApt CTO accountabilities.

## CEO Scorecard Footprint (FY2026)

The [[CEO KPI Scorecard]] (FY2026, Board-facing rubric) places ~11% direct weight on CTO-owned KPIs within a 15% Technology Excellence & Operational Performance category:
- **Platform Uptime & Reliability (6% of CEO scorecard)** — CTO-owned
- **Operational Efficiency & SLA Compliance (5%)** — CTO-owned
- **Cybersecurity Posture (4%)** — flows elsewhere, not CTO
- **Product Innovation Pipeline (6%, Strategic Growth)** — flows to [[Chief Product Officer]]
- **Platform modernisation / [[Project Phoenix]]** — flows to separate Platform Organisation

Mek's Apr 15 review (see [[note_2026-04-15T11-42-42-517Z]]) characterises this footprint as a keep-the-lights-on mandate with no build/evolve component — by design given Platform Org + CPO structure. CEO scorecard structurally treats technology as a utility at "meets expectations" level. Proposed revisions: raise platform uptime "meets" bar from 99.9% to 99.95%; add per-category floors to SLA compliance to prevent composite masking. Cybersecurity rubric accepted as-is.

## Key Relationships
| Person | Role | Note |
|---|---|---|
| [[Dennis Ajalie]] | CEO | Reports to |
| [[Felix Ike]] | Group CTO, Moniepoint Inc. | Dotted line |
| [[Frank Atashili]] | CPO/COO → Head TSPP Product | Dual reporting; peer platform lead under Phoenix |
| [[Tracy Ojaigho]] | Head CI&P (Product) | CI&P triad peer |
| [[Ketan Dhamasana]] | EM, CMS / Card Issuance | Joins CI&P engineering team under Emeka (Phase 1) |
| [[Ravi Kiran Veluguleti]] | VP Enterprise Engineering | Largest engineering pillar; remains TSPP functional EM |
| [[Tolulope Obianwu]] | Head, Core Operations | Double load; highest transition risk; on PIP |
| [[Oladapo Onayemi]] | Head, SRE (Core Operations pillar retained in OpCo per Apr 22 brief) | Platform reliability |
| [[Tolu Aina]] | Head, Infrastructure | Foundation layer |
| [[Abayomi Ojamomi]] | Head, Data Engineering | Smallest pillar; highest SPF risk |
| [[Muhammad Samu]] | Head, Dev Relations & Integrations | External-facing |
| [[Lateefat Adedeji-Oyedeji]] | BISO | Information security |
| [[Ibukun Atoyebi]] | Chief Compliance Officer | Compliance intersection; OpCo retention per Apr 22 brief |

## Active Priorities (as of April 2026)
- **RC91 Multi-Bank Failure Pattern** — structural assessment due from Oladapo; per-incident bank escalation failing
- **DCIR Security Vulnerabilities** — 5 CRITICAL findings on Access Bank; ACS connector replaced; credential rotation outstanding
- **GoSubscribe** — mandate activation confirmed; RC91 routing config structurally reverting; POS amount hardcoded
- **PIP decision — Tolulope Obianwu** — due April 14 on Tolulope's return from bereavement leave
- **Head of Engineering Hiring** — Varun Singh deliberation April 10; role scoped to central product vertical
- **CBN Compliance — POS Recertification** — 10+ days overdue as of early April 2026
- **Project Phoenix** — Phase 1 kicked off April 7; CI&P Engineering role on platform triad formalised Apr 22 (Org Movements brief)
- **Paystack DD partnership** — commercial engagement at product team level
- **CEO Scorecard FY2026 Technology Section Revisions** — two proposed rubric changes logged Apr 15 (see [[note_2026-04-15T11-42-42-517Z]])
- **[[Visa Payments Forum Paris]] (30 Jun – 2 Jul 2026)** — [[French Schengen visa application]] in progress; [[Visa Europe Limited]] invitation letter received 17 Apr 2026 (see [[invitation letter - VISA Payments Forum Paris 2026 - Emeka Awagu]])

## Action Queue (CTO Authorization Pending)
- TDSD-6477: Access Bank JAR deployment for DCIR credential remediation
- TDSD-6479: Harness P1 migration (Bank Cashout + Card routing) — deployment window Apr 10
- Public Holiday Incentive: Easter Apr 3 + Apr 6; final approval gate
- Lattice performance reviews: Oladapo (deadline Apr 10); Tolulope (deadline Apr 10)

## Sources
- [[accountabilities]] — role definition, key relationships, accountability signals
- [[note_2026-04-15T11-23-46-622Z]] — full FY2026 CEO KPI Scorecard rubric
- [[note_2026-04-15T11-42-42-517Z]] — CEO Scorecard Technology section review and proposed revisions
- [[notes-2026-03-30]] through [[notes-2026-04-10]] — daily operational signals
- [[weekly-digest-2026-03-30]] — week summary
- [[invitation letter - VISA Payments Forum Paris 2026 - Emeka Awagu]] — Visa Europe support letter for French business visa (Apr 17 2026)
- [[TeamApt-Platformization-Org-Movements (1)]] — Frank's Apr 22, 2026 brief formalising CI&P engineering triad role and Ketan's EM transfer