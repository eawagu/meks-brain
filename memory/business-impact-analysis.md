---
title: Business Impact Analysis
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-20T05:37:26Z"
updated: "2026-04-20T05:37:26Z"
summary: "Structured assessment of process criticality, Recovery Point Objective, and Recovery Time Objective; TeamApt's Apr 2026 BIA identified 7 Critical, 5 Major, 4 Moderate, 14 Minor processes."
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

## Sources
- [[TeamApt Management Review 19_04_2026]]