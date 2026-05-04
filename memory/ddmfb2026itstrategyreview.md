---
title: DDMFB_2026_IT_Strategy_Review
type:
  - "source"
cssclasses:
  - "source"
source_path: DDMFB_2026_IT_Strategy_Review.pdf
retention_label: postgres
retention_rationale: Multi-section CTO assessment with specific budget figures, per-section grades, and detailed recommendations; future retrieval likely when revisiting specific initiatives, vendor evaluation, or budget reallocation decisions.
created: "2026-05-04T12:09:01Z"
updated: "2026-05-04T12:09:01Z"
summary: "CTO assessment (Feb 2026) of DavoDani Microfinance Bank's 2026 IT Strategy document, grading each initiative and flagging critical gaps in disaster recovery, NDPC compliance, KPIs, and integration architecture."
---

## Summary

A confidential CTO-level review of the [[DavoDani Microfinance Bank]] 2026 IT Strategy document, dated February 2026. The reviewer characterizes the strategy as "a wish list with price tags" lacking prioritization, timelines, success metrics, and risk assessment. Total documented spend is ~₦138.5M, with ~72% allocated to [[Core Banking System]] selection.

## Key Points

- **Overall verdict**: The IT head identified the right focus areas (digital channels, CX, cybersecurity, core banking modernization) but the document lacks depth, rigor, and strategic sequencing.
- **SEO Strategy (₦5.5M, Grade C+)**: Reasonable annual spend but belongs under marketing, not IT. No baseline metrics established for ROI measurement.
- **Website Restructure (₦7M, Grade B-)**: Scope vague; "AI-powered chatbot" duplicated with CX section. Critical dependency on [[Core Banking System]] decision not addressed — risk of rework. Recommendation: do UX research now, hold full development until core banking decided, ensure API-first architecture.
- **Customer Experience AI-Driven (₦5M, Grade C)**: Most impactful section but severely underdeveloped. ₦5M unrealistic for omnichannel platform (WhatsApp Business API, web chat, email, IVR, CRM, sentiment analysis). [[Twilio]] or [[Infobip]] messaging fees alone consume large chunk. No staffing plan, no [[CBN]] regulatory consideration. Realistic budget ₦8–12M.
- **Social Media & Digital Marketing (₦8M, Grade C+)**: ₦6M ads + ₦2M content split reasonable but no strategy, no CAC target, no attribution framework. TikTok inclusion not validated for SME demographic.
- **Cybersecurity (₦13M, Grade D+)**: Most concerning section. ₦8M on certifications (ISO 27001, CISM, CISA, CEH, CISSP) vs only ₦4M on tools — inverted priorities. Tools section lists only EDR; missing WAF, SIEM, vulnerability scanning, encryption, IAM/PAM, backup/DR, DLP. Recommendation: flip to ₦10M+ tooling, ₦2–3M training.
- **ATM Card Deployment (TBD, Grade D)**: Incomplete — no budget, no volume targets, no processor partnerships, no timeline, no break-even analysis.
- **Core Banking (₦100M, Grade C-)**: Largest line item, least documentation (less than half a page). Candidate list includes "Microsoft Nav" which is an ERP, not a CBS — suggests ill-defined evaluation criteria. Missing: migration strategy, parallel run, staff training, [[CBN]] approval timeline, realistic 12–24 month implementation timeline.
- **"Others" section** (laptops, iPhones, software): Belongs in CAPEX budget, not strategic document — undermines professionalism.

## Critical Gaps Flagged

- **Disaster Recovery & Business Continuity Plan** — non-negotiable for a financial institution, not mentioned once.
- **Data Governance & [[NDPC]] Compliance** — Nigeria's Data Protection Act in effect, no compliance strategy.
- **IT Staffing & Organizational Structure** — no discussion of team size, capability gaps, hiring needs.
- **Timeline & Phasing** — no quarterly roadmap, no dependency mapping, no critical path.
- **KPIs & Success Metrics** — not a single measurable target in the entire document.
- **Integration Architecture** — no view of how website, CRM, chatbot, core banking, card system communicate.
- **Regulatory Alignment** — [[CBN]] circulars on technology risk management, outsourcing, cloud computing not referenced.
- **Total Budget Summary** — costs scattered, no consolidated view, no contingency (standard 15–20%).

## Top 5 Recommendations

1. Add measurable objectives — every section needs baseline + target metrics with measurement methodology.
2. Sequence and prioritize — [[Core Banking System]] selection comes first since it impacts website, CX, and card deployment.
3. Address critical gaps — DR/BCP, [[NDPC]] compliance, IT staffing plan, integration architecture, consolidated budget with contingency.
4. Reallocate cybersecurity budget — flip to tooling-heavy (₦10M+ infrastructure, ₦2–3M training).
5. Develop core banking as standalone workstream with dedicated RFP, vendor evaluation matrix, migration plan, and TCO analysis.

## Entities Mentioned

- [[DavoDani Microfinance Bank]]
- [[CBN]] (Central Bank of Nigeria)
- [[NDPC]] (Nigeria Data Protection Commission)
- [[Twilio]]
- [[Infobip]]
- [[Microsoft Dynamics NAV]]

## Concepts

- [[Core Banking System]]
- [[Cybersecurity Strategy]]
- [[Customer Experience Platform]]
- [[Disaster Recovery & Business Continuity]]
- [[NDPC Compliance]]
- [[IT Strategy Document]]
- [[Microfinance Banking IT]]
- [[Vendor Evaluation & RFP]]
