---
type:
  - "entity"
title: Moniepoint
created: 2026-04-11
summary: Moniepoint is a Nigerian fintech company with a formal 13-level job leveling framework and an active platform rebuild initiative (Project Phoenix) building a multi-market card issuance and processing platform.
updated: 2026-04-11
cssclasses:
  - "entity"
---

## Overview

Moniepoint is a fintech company (inferred from context; confirmed by entity name). The organization has a structured career framework that spans 13 discrete levels across individual contributor and management tracks. It is also engaged in a major platform engineering initiative — [[Project Phoenix]] — to build a new card issuance and processing capability for multiple markets (Nigeria, UK, Kenya).

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

## Notes

- Level numbers are not contiguous — gaps between 040/051/061/071 and 050/060/070 reflect the branching of IC vs. management paths at the senior level
- IC and management tracks share the 050/051 number range, indicating organizational equivalence at that band

## Sources

- [[Moniepoint Job Levels]]
- [[001-CI_P-exec-overview_v1.1]] — Project Phoenix executive overview
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS authored by Tracy Ojaigho, Moniepoint
