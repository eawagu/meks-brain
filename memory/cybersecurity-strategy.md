---
title: Cybersecurity Strategy
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-04T12:11:10Z"
updated: "2026-05-04T12:11:10Z"
summary: Allocation pattern for institutional security spend — tooling and infrastructure should significantly outweigh certifications and training, especially for regulated financial institutions.
---

A cybersecurity strategy for a financial institution must allocate budget primarily to tooling and infrastructure rather than to certifications. Certifications validate process maturity but do not protect against breaches.

## Required Tooling Categories (Per DDMFB Review)
Per [[DDMFB_2026_IT_Strategy_Review]], a financial-institution security stack should include — at minimum:
- Endpoint Detection & Response (EDR)
- Firewall and Web Application Firewall (WAF)
- SIEM / log monitoring
- Vulnerability scanning
- Database encryption
- Identity & Access Management (IAM) / Privileged Access Management (PAM)
- Backup and disaster recovery — see [[Disaster Recovery & Business Continuity]]
- Data Loss Prevention (DLP)

Many of these are not optional — [[CBN]] and [[NDPC]] regulations require multiple of these controls.

## Budget Allocation Heuristic
For a regulated financial institution: ~75–80% to tooling and infrastructure, ~15–25% to training and certifications. Reverse allocations (certs > tools) are a structural red flag.

## DDMFB 2026 — Application of Concept
[[DavoDani Microfinance Bank]]'s 2026 IT Strategy allocated ₦8M to certifications (ISO 27001, CISM, CISA, CEH, CISSP) and only ₦4M to tools, with EDR as the only listed tooling line item. The reviewer graded this section D+ and recommended flipping the allocation to ₦10M+ tooling, ₦2–3M training/certs.