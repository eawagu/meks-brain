---
type:
  - "concept"
title: Business Impact Analysis
created: "2026-04-20T05:37:26Z"
summary: Structured assessment identifying critical business processes and their disruption tolerance (RPO + RTO). Foundational input to ISO 22301 business continuity planning. Apr 30 ISO audit close-out flagged the need to ensure process owners are familiar with BIA methodology as an explicit remediation step.
updated: "2026-05-02T21:33:23Z"
cssclasses:
  - "concept"
---

## Overview
[[Business Impact Analysis]] (BIA) is a structured assessment that identifies critical business processes and their tolerance for disruption, captured as Recovery Point Objective (RPO — data loss tolerance) and Recovery Time Objective (RTO — downtime tolerance). Foundational input to [[ISO 22301]] business continuity planning.

## TeamApt BIA (Apr 2026)
Per the [[TeamApt Management Review 19_04_2026]]:

### Critical Processes (examples)
| Process | RPO | RTO |
|---|---|---|
| Application and Services Monitoring | 5 min | 5 min |
| Incidence Resolution | 5 min | 30 min |
| Incidence Reporting | 60 min | 60 min |
| Database Cleanup | 60 sec | 60 min |

### Major Processes (examples)
| Process | RPO | RTO |
|---|---|---|
| Deployment / Implementation | 60 min | 6 hrs |
| Product Deployment | 60 min | 6 hrs |
| Treasury Management | 60 min | 6 hrs |
| Payroll Disbursements | 60 min | 6 hrs |

### Summary Counts
- Minor: 14
- Moderate: 4
- Major: 5
- Critical: 7

## Apr 30, 2026 — ISO Audit close-out next-step

The Apr 30 [[ISO Audit]] close-out session flagged BIA familiarity as one of the 10 next-step remediation actions: *"Ensure process owners are familiar with the Business Impact Analysis methodology."* Source: [[ISO Audit-Close out session – 2026_04_30 16_27 WAT – Notes by Gemini]].

## Sources
- [[TeamApt Management Review 19_04_2026]]
- [[ISO Audit-Close out session – 2026_04_30 16_27 WAT – Notes by Gemini]]
