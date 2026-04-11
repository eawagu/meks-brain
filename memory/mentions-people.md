---
title: mentions-people
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: notes\people\mentions.md
summary: Accumulated people observation log covering April 8-10 2026, tracking individuals across GoSubscribe, security incidents, DCIR remediation, ops duty, HoE hiring, Strategy Retreat, and Stanbic escalation.
---

## Summary
This file collects casual observations on individuals without dedicated person pages, intended for monthly compression and promotion candidate review. Entries span April 8–10, 2026, and cover the GoSubscribe incident resolution, DCIR/ACS security remediation, Stanbic escalation pattern, HoE hiring pipeline, national emergency meeting, and Strategy Retreat dinner logistics.

## Key Points
- [[Timilehin Izundu]]: confirmed wrong-PIN → RC00 is dev env default (GoSubscribe); lifted P0 production rollout block
- [[Akindele Odedoyin]]: raised PR for GoSubscribe receipt generation fix; awaiting merge and retest
- [[Ekene Oranekwu]]: confirmed PIN P0 = dev env; reported RC91 routing config reverting post-patch; raised POS amount hardcoding gap
- [[Abraham Isinguzoro]]: AptPay/Fidelity Bank UAT blocked; sent follow-up to Fidelity (Ifeoma Onibuje)
- [[Oladapo Onayemi]]: declined Emeka/Oladapo 1:1 (Stanbic escalation venue) on day both SLAs breached; forwarded Public Holiday Incentive for CTO approval
- [[Frances Omelu]]: filed NIBSS DD mandate P1 (RC96); confirmed NIBSS Disbursements overnight failure resolved
- [[Abdulgafar Obeitor]]: filed TDSD-6477 (Access Bank DCIR remediation); awaiting CTO authorization
- [[Khadijat Musa]]: assigned TDSD-6476 (Parallex DCIR finding); committed ATS fix by Apr 11
- [[Emeka Joseph]]: resolved TDSD-6446 (Wema settlement) — both SLAs breached before action; PIR gap flagged
- [[Abeeb Ola]]: GoSubscribe RC91 routing config reverting post-patch; owns fix but unclear on root cause
- [[Victor Madu]]: to clarify GoSubscribe POS backend API design decision on dynamic debit amount
- [[Babajide Ojoboorun]]: confirmed ACS connector replacement via VPN — eliminates internet-facing attack surface; outstanding: credential rotation, JWT, DsMockController
- [[Olamide Ajibulu]]: reported Stanbic Cycle 15 (15 cycles in 7 days, TDSD-6425 zero activity since Apr 3)
- [[Kevin Ng'Eno]]: followed up Polaris Bank requesting formal SLA and streamlined escalation after VPN restoration
- [[Qazim Adedigba]]: CoralPay ZIB confirmed 4th bank in TDSD-6448; duty handover Apr 8-9
- [[Chukwuemeka Onyekwere]]: Polaris Bank Head of Open Banking; confirmed VPN restored Apr 8
- Strategy Retreat dinner attendees: [[Pawel Swiatek]], [[Ross Strike]], [[Gavin Thomson]], [[Damilare Ogunnaike]], [[Tolulope Alegbe]], [[Ezekiel Sanni]], [[Ifeanyi Duru]], [[Emeka Awagu]], [[Dennis Ajalie]]

## Entities Mentioned
- [[Emeka Awagu]] (Mek) — CTO
- [[Timilehin Izundu]], [[Akindele Odedoyin]], [[Ekene Oranekwu]], [[Abeeb Ola]], [[Victor Madu]] — GoSubscribe
- [[Abraham Isinguzoro]] — AptPay
- [[Oladapo Onayemi]], [[Frances Omelu]], [[Olamide Ajibulu]], [[Qazim Adedigba]], [[Emeka Joseph]] — Operations
- [[Abdulgafar Obeitor]], [[Khadijat Musa]], [[Babajide Ojoboorun]] — Security/DCIR
- [[Kevin Ng'Eno]], [[Chukwuemeka Onyekwere]] — Polaris Bank
- [[Dennis Ajalie]], [[Frank Atashili]], [[Tolulope Obianwu]] — ATS reconciliation thread
- [[Damilare Ogunnaike]] — national emergency meeting; Strategy Retreat
- [[Felix Ike]] — in London; designated Abuja rep

## Concepts
- [[GoSubscribe]] — multiple individuals coordinating resolution
- [[RC91 Multi-Bank Failure Pattern]] — Stanbic Cycle 15; CoralPay ZIB; individual operator observations
- [[DCIR Security Vulnerabilities]] — remediation progress across individuals
- [[Head of Engineering Hiring]] — Varun Singh deliberation Apr 10
- [[National Cybersecurity Coordination]] — national emergency meeting Apr 9
