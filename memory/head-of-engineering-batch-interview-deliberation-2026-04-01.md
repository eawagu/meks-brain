---
title: Head of Engineering Batch Interview Deliberation 2026-04-01
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: deliberation-head-of-engineering-batch-interviews-20260401.md
summary: Deliberation meeting on April 1, 2026 reviewing Head of Engineering (VP+) and Director/Senior Director candidates — calibrated system design expectations, identified resume inflation patterns, and decided to remove LLD from director-level scorecards.
---

## Summary

Panel deliberation led by [[Chris Purkis]] reviewing Head of Engineering (VP+) and Director/Senior Director interview candidates at [[Moniepoint]]. The team calibrated system design assessment expectations for director-level roles, identified patterns of resume inflation, and aligned on removing Low-Level Design (LLD) from the Round 1 scorecard to focus on high-level strategy, trade-offs, and failure points.

## Key Points

- **First VP+ candidate (unnamed, ex-Grab):** Rejected — lacked strategic thinking, focused on implementation over high-level strategy; panel assessed as senior EM level at best. Resume showed 25% productivity claim with no measurable basis.
- **Resume inflation pattern identified:** Strong CVs easy to produce with AI tools; title inconsistencies (e.g., Goldman Sachs VP = glorified senior SWE) noted. Chris Purkis to focus screening on questioning claimed accomplishments.
- **Director candidate Nish:** Mixed — Konstantinos saw good system design intuition, but Oloruntoba found depth insufficient and noted candidate didn't ask clarifying questions when challenged. Decision: no.
- **Director candidate Deepo:** Average — asked clarifying questions but missed critical elements (database scaling, async request handling). Only addressed gaps when prompted. Chukwudum's rule: "if it looks like maybe, say no."
- **Director candidate Himancho:** No — answers not clear/concise/accurate, changed the problem statement during design exercise.
- **Director candidate Shray:** No — basic design, got stuck, couldn't propose end-to-end system. Payments domain experience not required; 60-70% of design concerns are transferable.
- **Director candidate Chaz:** Yes, advance to Round 2 — strong architecture understanding, could design from scratch. Minor note: described circuit breaker pattern without using standard terminology.
- **Director candidate Loan:** No — proposed unnecessarily complex design with no justification, poor UX judgment. Would be no even for senior engineer.
- **Director candidate Son:** No — vague and high-level, fundamental errors (claimed Cassandra is ACID, Redis for 100% durability). Would be no even for mid-level.
- **Scorecard change:** LLD removed from director/senior director Round 1 assessment. Focus shifted to components, reliability, availability, trade-offs, and failure points.

## Entities Mentioned

- [[Chris Purkis]] — meeting organizer, recruiter/talent lead
- [[Pavan Venkatesan]] — VP, clarified director-level interview expectations
- [[Chukwudum Ekwueme]] — Head of Engineering, provided "maybe = no" rule
- [[Oloruntoba Ojo]] — interviewer, assessed Nish
- [[Konstantinos Prassas]] — interviewer, assessed Nish and Chaz
- [[Toyosi Oyesola]] — interviewer, assessed Deepo
- [[Smit Parsania]] — interviewer, assessed Himancho and Shray
- [[Yiannis Provataris]] — interviewer, assessed Loan and Son
- [[John Ojetunde]] — raised resume inflation concerns
- [[Pranjal Patil]] — context on Goldman Sachs title inflation
- [[Moniepoint]]

## Concepts

- [[Interview Calibration]]
- [[System Design Assessment]]
- [[Resume Vetting]]
- [[Engineering Leadership Hiring]]