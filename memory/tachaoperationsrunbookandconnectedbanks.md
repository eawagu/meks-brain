---
title: TACHA_Operations_Runbook_and_Connected_Banks
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt\Systems\TACHA\TACHA_Operations_Runbook_and_Connected_Banks.md
created: "2026-04-13T23:15:37Z"
updated: "2026-04-13T23:15:37Z"
summary: TACHA operational procedures — onboarding checklist, bank readiness matrix (14 banks), settlement agent integration status, UAT/test data reference, and escalation paths.
---

## Summary

Operational runbook for [[TACHA]] covering the 7-step onboarding checklist (access, master data, participants, ledger, fees, validation, go-live), production bank readiness matrix for 14 banks, settlement agent integration status, UAT test data, and support/escalation paths.

## Key Points

- Onboarding order: FI Setup → Acquirer → Issuer → Third Party Category → Third Party → Merchant → Participant Management → Ledger (Maker-Checker) → Fee Management → Validation Test → Go-Live
- Bank readiness matrix (Feb 2026): Polaris and Wema NSS-ready; Keystone and Union API-ready; Fidelity is both a settlement bank and ACT client
- Settlement agents live: NIBSS NSS (Polaris, Wema), Polaris Disbursement API, Keystone API, Union Bank API
- Settlement agents planned: Access Bank API, Fidelity API, Atlas (Moniepoint MFB)
- Settlement agent in progress: HabariPay for GTB (AS-4757)
- Aggregated Settlement Agent Phase 1 (Sep 2025 target): Fidelity, Access, FCMB, Polaris, Keystone, Moniepoint MFB
- Phase 2: Wema, GTB, Union, UBA, Zenith, Ecobank, Parallax, PalmPay
- Escalation: Ops → Oluwadamilola Odugbesan → [[Tolulope Obianwu]] → Kevin Ng'Eno; Tech → Saheed Yusuf → [[Oladapo Onayemi]] → [[Wycliffe Ochieng']] → Ravi Veluguleti
- Backoffice: `clearing-house.teamapt.com` (migrating), Grafana Helios, Metabase
- Slack support: #switch-team

## Entities Mentioned

[[TACHA]], [[TeamApt]], [[Polaris Bank]], [[Wema Bank]], [[Keystone Bank]], [[Fidelity Bank]], [[Access Bank]], [[Union Bank]], [[FCMB]], [[GTBank]], [[Zenith Bank]], [[Moniepoint MFB]], [[UBA]], [[Ecobank]], [[HabariPay]], [[Tolulope Obianwu]], [[Oladapo Onayemi]], [[Wycliffe Ochieng']], [[Saheed Yusuf]], [[Kevin Ng'Eno]]

## Concepts

[[Clearing and Settlement]], [[NSS Smart Det]], [[Bank Onboarding]]