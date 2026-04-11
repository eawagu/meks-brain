---
title: Direct to Bank Daily Stand Up 2026-04-09
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: direct-to-bank-daily-stand-up-20260409.md
summary: "Direct to Bank daily standup Apr 9 2026 — Zenith ATS monitoring service functional, settlement reversal pending; DD jars shared with bank but scanning/OTP feedback pending; Union Bank VPN resolved, testing to close by Friday; Access Bank deployment strategy: push critical DD vulnerability fix today, add ATS package later; jar scanning tool gap identified (Harness scans code not packaged jars); Wema Bank provided updated API collection."
---

## Summary

Zenith ATS monitoring service functional but settlement reversal entries pending David's input. DD jars shared with bank, scanning feedback and OTP API still pending. Union Bank VPN issue resolved — testing to close by Friday. Access Bank deployment prioritizing critical vulnerability fix today; ATS/GoSubscribe jars to follow. Team identified gap: no proper static scanner for packaged jars (Harness only scans code). Wema Bank provided updated API collection and test accounts. GT Bank account set received and sent to AptPay for provisioning.

## Key Points

- Zenith ATS: Monitoring service functional; Emeka Joseph to follow up with David on settlement reversal entries
- Zenith DD: Jars shared with bank; scanning feedback and OTP API error still pending; Ifeoluwa Oguntona resumed and will follow up
- UBA: Oluwatofunmi Obafemi waiting for network contact; SLA feedback pending
- Ecobank: Felix still unresponsive; Nora (head of legal) required to route documents per Felix's procedure; team to discuss streamlining with Nora
- GT Bank: Account set received from bank, sent to AptPay for provisioning
- Wema Bank: Updated API collection and two test accounts (inactive, insufficient balance) received; team to test and confirm what changes were made
- MoneyPoint: Working on environment setup; Ugochukwu Ebirika pushed transactions for bank's final check
- Union Bank: VPN issue resolved; testing commenced; target Friday closure
- Polaris: Escalation email sent about service downtime; SLA signature and onboarding agreement review pending
- Access Bank: No proper jar scanner — Harness scans code, not packaged software; banks use different tools (Checkmarx vs SonarQube) yielding different findings; agreed to fix critical+high vulnerabilities first; DD fix addresses critical system-shutdown vulnerability — deploying today
- Zenith card API: Bank requires separation of card beans before go-live; piloting with limited BINs discussed
- Security scanning: Abiodun Famoye to reach out to Simon about getting a proper static scan tool for jars

## Entities Mentioned

[[Khadijat Musa]], [[Abiodun Famoye]], [[Emeka Joseph]], [[Ifeoluwa Oguntona]], [[Abdulgafar Obeitor]], [[Opeyemi Animashaun]], [[Emmanuel Francis]], [[Taiwo Baptista]], [[Ugochukwu Ebirika]], [[Oluwatofunmi Obafemi]], [[Babajide Ojoboorun]], [[Emeka Awagu]], [[Zenith Bank]], [[UBA]], [[Ecobank]], [[GTB]], [[Wema Bank]], [[Union Bank]], [[Polaris Bank]], [[Access Bank]], [[Premium Trust Bank]]

## Concepts

[[Bank Integration]], [[OTP Authentication]]