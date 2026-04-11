---
title: AptPay Direct Debit - OKR Planning Q2 2026
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: AptPay Direct Debit - OKR Planning Q2 2026.pptx
summary: "AptPay Direct Debit team's Q1 2026 OKR performance review and Q2 2026 quarterly planning deck covering mandate creation improvements, ACS enhancements, GoSubscribe Web launch, bank expansion, and deployment maturity."
---

## Summary

The AptPay Direct Debit team reviews Q1 2026 OKR performance across 8 objectives and proposes Q2 2026 roadmap items. Key accomplishments include Project Phoenix deployment reducing mandate failures, GoSubscribe Web feature completion, 100% unit test coverage, and Fidelity Bank production deployment. Several KRs were blocked by bank-side dependencies (VPN access, test environment provisioning).

## Key Points

- [[Project Phoenix]] deployed in CDD with retry mechanisms, reducing failed/pending mandate activations. Bank-side deployment (eliminating ₦50 mandatory charge) reached 50% — deployed to test environments in 2 of 3 banks.
- [[ACS]] Challenge UI delivered as fully responsive and embeddable; however, ACS upgrade rollout to [[Access Bank]], [[Wema Bank]], and [[FCMB]] stalled at 35% due to lack of test server access at Wema and FCMB.
- [[GoSubscribe Web]] MVP reached 100% feature completion and passed security/QA review. Compliance and operational requirements documented but not yet provisioned.
- [[Fidelity Bank]] production deployment completed with 3,000+ pilot transactions. [[Keystone Bank]] deployment at 90% — blocked by bank's mobile app store deployment.
- DevRel website launched but sandbox testing requires VPN; security team reluctant to expose APIs to internet.
- [[LendSqr]] blocked integration citing insufficient banks in [[TeamApt]] network. [[GlobalPay]] shifted attention to other projects.
- 100% unit test and automated E2E test coverage achieved across all Direct Debit services. Automated tests as CI quality gates not achieved (0%).
- Canary deployments not achieved (0%). Harness migration for CI/CD completed. Deployment standardization across Dev/UAT/Prod not achieved.
- Lesson learned: monitoring and operational ownership must be defined before go-live — proposed operational readiness checklist as forcing function.
- Q2 2026 candidates: ACS Portal, reconciliation channel/platform.
- Team composition: 2 Product, 1 Eng Manager, 9 Engineers, 2 QA. Open role: APM.

## Entities Mentioned

- [[AptPay]] — Direct Debit product team
- [[TeamApt]] — parent organization (also referenced as Moniepoint context)
- [[Project Phoenix]] — mandate creation flow improvement initiative
- [[GoSubscribe Web]] — web-based recurring payments channel
- [[Access Bank]] — issuing bank partner
- [[Fidelity Bank]] — issuing bank partner (production live)
- [[FCMB]] — issuing bank partner (maker-checker, ACS)
- [[Wema Bank]] — issuing bank partner (ACS)
- [[Keystone Bank]] — issuing bank partner (near-production)
- [[Polaris Bank]] — issuing bank partner
- [[Zenith Bank]] — issuing bank partner
- [[GTBank]] (Habari Pay) — issuing bank partner
- [[Premium Trust]] — issuing bank partner
- [[CowryWise]] — live merchant for pilot transactions
- [[LendSqr]] — payment facilitator (blocked integration)
- [[GlobalPay]] — payment facilitator (deprioritized)
- [[Harness]] — CI/CD platform

## Concepts

- [[Direct Debit]] — core payment product
- [[OKR Planning]] — quarterly objective and key result framework
- [[ACS (Access Control Server)]] — card/account authentication system
- [[Maker-Checker Workflow]] — dual-authorization governance control
- [[Canary Deployment]] — progressive rollout strategy
- [[DevRel]] — developer relations and API documentation