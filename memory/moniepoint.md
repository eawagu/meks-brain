---
type:
  - "entity"
title: Moniepoint
aliases:
  - "MoniePoint"
created: 2026-04-11
summary: Moniepoint Inc. — Nigerian fintech group; parent of TeamApt Ltd; 4 business lines (DD/CDD, Monnify, TPP, Domestic Switching); 2025 revenue ₦24.2B target, ~₦10-12B actual (~35-50%); building multi-market card issuance platform (Project Phoenix); 13-level job framework.
updated: "2026-04-16T16:31:36Z"
cssclasses:
  - "entity"
---

## Overview

Moniepoint is a Nigerian fintech group (Moniepoint Inc.). It operates payment and banking infrastructure across multiple products. TeamApt Ltd is a subsidiary where [[Emeka Awagu]] serves as CTO, reporting to [[Dennis Ajalie]] (CEO, TeamApt) with a dotted line to [[Felix Ike]] (Group CTO, Moniepoint Inc.).

## Business Lines (2026 structure)

Restructured from 5 units (2025) to 4 departments:

| Department | Business Owner | Products | Key Systems |
|---|---|---|---|
| DD/CDD | [[Daniel Ojinaka]] | MADD, GoSubscribe, SAFE | ACS, GoSubscribe, SAFE, TACHA |
| [[Monnify]] | [[Damilare Ogunnaike]] | Collections (VA, web card, DD), Disbursements, VAS, International (MPGS, Cybersource) | Monnify Gateway, Loom, Limit Engine, MPGS |
| TPP | [[Tracy Ojaigho]] | Acquirer processing, Issuer processing (CMS, EMV Data Prep), ACT, MPGS dashboard, Non-Bank Acquiring | Aptent, ACT, EMV Data Prep, Rsync CMS |
| Domestic Switching | [[Babatunde Okufi]] (CBDO, TeamApt) | [[Juliana]] Card/Account Switch, ATS, PTSP/PTAD, [[TACHA]] | Juliana, ATS, TACHA, NSS |

Revenue Drivers: DD/CDD and Monnify. Enablers: TPP and Domestic Switching.

## CBN Licenses

Switching & Processing (foundation), Non-Bank Acquiring (TPP + Monnify), PTSP (Domestic Switching), SuperAgent (Domestic Switching). CBN IT Standards maturity level 4 (benchmark: 2 for PSSPs).

## Products & Platforms

- **Monnify** — payment gateway; card acquiring (MPGS/Mastercard), direct debit, chargeback management; see [[Monnify]]
- **Direct Debit (DD)** — mandate-based bank debit via NIBSS; multi-bank; see [[Direct Debit Program]]
- **ACT (Acquirer Card Transaction)** — acquiring platform; KYC-gated merchant onboarding; manual fee collection
- **GoSubscribe** — subscription product; RC91 routing dependency; CEO-level visibility Apr 2026; see [[GoSubscribe]]
- **AptPay** — payment routing layer; Fidelity UAT dependency (blocked as of Apr 9, 2026)
- **Card Issuance & Processing Platform** — under [[Project Phoenix]]; multi-market (Nigeria, UK, Kenya); Spine-and-Module architecture; Phase 1 kick-off Apr 7, 2026
- **[[TACHA]]** — centralized clearing and settlement platform; 6 microservices, 5 platform consumers, 4 daily settlement windows
- **[[Juliana]]** — domestic switching (Card Switch + Account Switch); 37% of Moniepoint POS traffic

## Financial Performance

### 2024
- Revenue baseline: $510K quarterly → $1M target (at ₦1,500/USD ≈ ₦6B annualized)
- DCIR: 7 banks live (targeted 12; 0 new banks added — bank expansion was biggest bottleneck)
- Direct Debit: 0→1 bank by mid-year (target was 7)
- Consolidated Switch (now Juliana): best-performing new product — 10 issuers, 2 domestic processors
- Reliability improved: transaction success rate 70%→96.3%, incident response 240→60 min
- Sprint velocity systemic issue: DCIR 72.3%, DD 50.5%, Switch 75% (all below targets)

### 2025
- Revenue targets: Monnify ₦11B, DD ₦6B, Direct to Bank ₦3.7B, Switch ₦2.5B, TPP ₦1B = ₦24.2B (legal entity target ₦30B)
- Starting position: ₦422M annual revenue, -134% EBITDA
- Actual: estimated ₦10–12B (~35–50% attainment)
- Monnify: ₦9.05B achieved vs ₦13B target (79%); VTU merchant exits (MTN/Airtel) drove decline
- Direct Debit: revenue exceeded 200% of KR driven by Access Bank; auth success 95.19%
- TPP: Visa + Mastercard acquirer processor certifications completed; MPGS live
- Domestic Switching: 37% of Moniepoint POS via Juliana (target 70%); TACHA beta released
- Key lesson: Integration ≠ Activation (20 DD billers onboarded, 0% transacting)
- DevRel: CSAT 94% (vs 50% target), NPS 88% (vs 20% target)

## Customer & Partner Ecosystem

30+ entities across 4 business lines. Key relationships:

- **[[Access Bank]]** — active across all 4 business lines; primary DD volume driver
- **[[Polaris Bank]]** — primary settlement bank; NSS live; DD live; PTSP first non-Moniepoint client (planned)
- **[[Fidelity Bank]]** — settlement bank; first external ACT client (live); Juliana issuer; DD pilot-ready
- **[[Moniepoint MFB]]** — largest customer by volume (37% POS traffic); PTSP services (₦150M monthly activations); bank-side Payments Business owned by [[Solomon Amadi]]
- **[[CoralPay]]** — switch-to-switch partner (FirstBank, Zenith, Providus, Unity)
- **[[HabariPay]]** — switch-to-switch partner (GTBank); DD Payment Facilitator
- Card schemes: [[Visa]] (acquirer cert ✅, license ✅), [[Mastercard]] (acquirer cert ✅, license pending), Verve (active), Afrigo (established)

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

- [[RC91 Multi-Bank Failure Pattern]] — 13+ banks, structural routing gap. **Specific mechanism confirmed 2026-04-14** via [[Oladapo Onayemi]] DM: during a bank CBA failure, Moniepoint routes card requests to the inactive bank node; when the bank recovers, Moniepoint's routing-config restoration process is manual and slow, so Moniepoint-side failures persist on terminals after the bank is actually back up. The automation gap (automated detection of bank recovery + automated config restoration) is a Primitive 4 (Systems) responsibility of the [[Domestic Switching]] department (business owner: [[Babatunde Okufi]], Chief Business Development Officer at TeamApt, reports to [[Dennis Ajalie]]). [[Oladapo Onayemi]] has escalated to the Moniepoint team "severally" without a Moniepoint-side fix; Oladapo's escalation level has demonstrably not been sufficient to force the automation onto the backlog. Open: which intra-group leverage path (direct peer CTO→CBDO to Babatunde Okufi, dotted-line to [[Felix Ike]] as Group CTO, direct up through [[Dennis Ajalie]], or business-owner pressure via [[Solomon Amadi]] as Payments Business owner at Moniepoint MFB) has the highest chance of landing the fix.
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
- [[Daniel Ojinaka]] — DD/CDD department business owner
- [[Damilare Ogunnaike]] — Monnify department business owner
- [[Tracy Ojaigho]] — TPP department business owner
- [[Babatunde Okufi]] — CBDO, TeamApt; Domestic Switching business owner
- [[Solomon Amadi]] — Business Owner, Payments Business, Moniepoint MFB

## Notes

- Level numbers are not contiguous — gaps between 040/051/061/071 and 050/060/070 reflect the branching of IC vs. management paths at the senior level
- IC and management tracks share the 050/051 number range, indicating organizational equivalence at that band
- TeamApt Ltd is the operational subsidiary; Moniepoint Inc. is the group parent
- Nigeria removed from FATF grey list Oct 2025

## Sources

- [[Moniepoint Job Levels]]
- [[001-CI_P-exec-overview_v1.1]] — Project Phoenix executive overview
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS authored by Tracy Ojaigho, Moniepoint
- [[Source: accountabilities]] — CTO accountability framework
- [[TeamApt_2024_Business]] — 2024 business context and performance
- [[TeamApt_2025_Business]] — 2025 business context and performance
- [[TeamApt_Businesses]] — business line index
- [[TeamApt_Customer_Registry]] — customer and partner registry
- [[Source: notes-2026-04-01]] through [[Source: notes-2026-04-10]] — daily CTO signals
- [[Commitment — Stanbic RC91 Internal Processing Latency Investigation]] — 2026-04-15 resolution confirmed the routing-restoration automation gap
- User correction 2026-04-16 (Babatunde Okufi title as CBDO; Solomon Amadi role at Moniepoint MFB)
