---
type:
  - "entity"
title: Moniepoint
created: 2026-04-11
summary: Moniepoint Inc. — Nigerian fintech group; parent of TeamApt Ltd; operates Monnify payment gateway, Direct Debit, ACT acquiring, and GoSubscribe; building multi-market card issuance platform (Project Phoenix); 13-level job framework.
updated: "2026-04-12T22:46:30Z"
cssclasses:
  - "entity"
aliases:
  - "MoniePoint"
---

## Overview

Moniepoint is a Nigerian fintech group (Moniepoint Inc.). It operates payment and banking infrastructure across multiple products. TeamApt Ltd is a subsidiary where [[Emeka Awagu]] serves as CTO, reporting to [[Dennis Ajalie]] (CEO, TeamApt) with a dotted line to [[Felix Ike]] (Group CTO, Moniepoint Inc.).

## Products & Platforms

- **Monnify** — payment gateway; card acquiring (MPGS/Mastercard), direct debit, chargeback management; see [[Monnify]]
- **Direct Debit (DD)** — mandate-based bank debit via NIBSS; multi-bank; see [[Direct Debit Program]]
- **ACT (Acquirer Card Transaction)** — acquiring platform; KYC-gated merchant onboarding; manual fee collection
- **GoSubscribe** — subscription product; RC91 routing dependency; CEO-level visibility Apr 2026; see [[GoSubscribe]]
- **AptPay** — payment routing layer; Fidelity UAT dependency (blocked as of Apr 9, 2026)
- **Card Issuance & Processing Platform** — under [[Project Phoenix]]; multi-market (Nigeria, UK, Kenya); Spine-and-Module architecture; Phase 1 kick-off Apr 7, 2026

## Infrastructure

- **TMS (Transaction Management System)** — HTTP migration committed Apr 2026 (root cause of routing + Kafka issues)
- **NIBSS integration** — direct debit rails; VPN dependency; ACS connector replaced Apr 10; see [[NIBSS]]
- **Harness** — CI/CD; migration 100% done (MANCo confirmed); pending CTO approval for P1 workloads; CBN AML flag
- **GitLab** — MFA enforcement effective Apr 2026
- **PostgreSQL** — VR-529: 3 critical RCE vulnerabilities (33 instances, 8 assets); Apr 1 2026

## Platform Engineering

Per [[001-CI_P-exec-overview_v1.1]], Moniepoint is building the [[Card Issuance & Processing Platform]] under [[Project Phoenix]] — a Layer 2 platform using a [[Spine and Module Architecture]] to enable multi-market deployment without modifying the shared Spine. The platform manages the complete card lifecycle and targets 99.99% availability and <500ms authorization latency.

The platform's [[Card Management System]] (documented by Tracy Ojaigho, Moniepoint) organizes card data as Issuer → Card Program → Card → Account across two deployment models (Processor and Bank/Issuer).

## Job Leveling Framework

Per [[Moniepoint Job Levels]], the rubric defines two parallel tracks:

### Individual Contributor Track
| Level | Title | Key Descriptor |
|-------|-------|----------------|
| 010 | Intern | Under close direction; temporary/student |
| 020 | Junior Associate | New to job; requires significant manager guidance |
| 030 | Associate | Delivers tasks with little guidance; needs support on complex/strategic work |
| 040 | Senior Associate | Expert IC; mentors juniors; can cover manager short-term |
| 051 | Principal | Leads craft/knowledge in domain within a team |
| 061 | Senior Principal | Leads craft/knowledge in domain across multiple teams |
| 071 | Expert | World-class SME; invents high-impact methodologies; thought leader across departments |

### Management Track
| Level | Title | Key Descriptor |
|-------|-------|----------------|
| 050 | Manager | Oversees ICs; sets team direction; relies on Directors/VPs for strategy |
| 060 | Senior Manager | Experienced manager + SME; minimal strategic guidance needed |
| 070 | Director | Multi-team, multi-quarter scope; translates business strategy into team objectives |
| 080 | Senior Director | Multi-team oversight; contributes to VP-level strategy setting |
| 100 | Vice President | Owns department domain; sets strategic vision; designs org/systems/processes |
| 200 | Senior Vice President | Holistically responsible for department business outcomes; partners with executive leadership on company strategy |

## Active Issues (as of Apr 2026)

- [[RC91 Multi-Bank Failure Pattern]] — 13+ banks, structural routing gap
- [[NIBSS]] DD compound failures — TDSD-6437
- Settlement integrity — TDSD-6424, TDSD-6431, TDSD-6276 active
- [[DCIR Security Vulnerabilities]] — 5 CRITICAL Access Bank findings; remediation in progress
- [[GoSubscribe]] — RC91 structurally reverting; war room activated Apr 8
- CBN POS recertification — overdue as of Apr 2026
- Lattice performance review deadline — Apr 10, 2026
- MANCo decisions: Harness 100% migrated, CBN AML roadmap due June 10, engineering manager resigned at Monnify, February loss ₦318M

## Key Leadership

- [[Dennis Ajalie]] — CEO, TeamApt Ltd
- [[Emeka Awagu]] — CTO, TeamApt Ltd
- [[Felix Ike]] — Group CTO, Moniepoint Inc.
- [[Tolulope Obianwu]] — Direct report to Emeka; operations leadership; on PIP

## Notes

- Level numbers are not contiguous — gaps between 040/051/061/071 and 050/060/070 reflect the branching of IC vs. management paths at the senior level
- IC and management tracks share the 050/051 number range, indicating organizational equivalence at that band
- TeamApt Ltd is the operational subsidiary; Moniepoint Inc. is the group parent

## Sources

- [[Moniepoint Job Levels]]
- [[001-CI_P-exec-overview_v1.1]] — Project Phoenix executive overview
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS authored by Tracy Ojaigho, Moniepoint
- [[Source: accountabilities]] — CTO accountability framework
- [[Source: notes-2026-04-01]] through [[Source: notes-2026-04-10]] — daily CTO signals