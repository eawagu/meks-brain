---
title: MasterCard Testing and Certification Requirements
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\12-testing-and-certification.md
summary: MasterCard testing and certification specification — simulator testing through production trial run, test environments, test BINs, acceptance testing phases, and success criteria (99.5% auth, 99.8% clearing, 2000 TPS).
---

## Summary

Comprehensive testing phases from simulator to production trial run. Test BINs: 516500-516599 (credit), 527070-527079 (Maestro), 588770-588779 (Cirrus), 524241-524244 (ecommerce). Success criteria: auth 99.5%, clearing 99.8%, settlement 100%, <3sec response, 2000 TPS peak. GCMS clearing cycles: 6 daily in Central Time.

## Key Points

- Test environments: DMS and SMS separate; dedicated IP ranges, TLS, client certs
- Acceptance testing: new customers 2-4 weeks, existing 1-2 weeks
- Trial run: 1,000-10,000 live transactions, 5-10 business days minimum
- Stop conditions: data corruption, security breach, availability <95%, auth success <95%
- Up to 3 trial run attempts within 90 days before escalation

## Concepts

- [[MasterCard Integration]]