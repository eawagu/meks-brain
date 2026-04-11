---
title: Source CMS Resync Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Card Issuance Platform\Existing\CMS-Card-Management-System-Specification.md
summary: Specification for the Resync-sourced Card Management System — .NET Core platform licensed from Resync Payments (Chris Esumeh) to replace Postilion, enable issuer processing, and serve as TPP offering to financial institutions.
---

## Summary

Discovery/research document for the Resync-based [[Card Management System]] — a separate initiative from the existing Card Manager Service. Built by [[Resync Payments]] (Christopher Esumeh), licensed to [[TeamApt]] with source code. Strategic goals: issuer processing capability, Postilion replacement, TPP service offering to FIs, and multi-scheme certification (Visa, MasterCard, Verve, Afrigo).

## Key Points

- .NET Core application, deployed via Cosmos, HSM-integrated, multi-tenant architecture
- Source code licensed from [[Resync Payments]] — 750k payment with 3-year support negotiation
- Product lead: [[Tracy Ojaigho]]; Head of Cards: [[Femi Davies]]; Engineering: Nitish Chand, Nadeem Abbas
- Executive sponsors: [[Frank Atashili]], [[Emeka Awagu]], [[Tosin]], [[Dennis Ajalie]]
- Two TPP service models: Model A (institution manages own lifecycle, TeamApt handles processing) and Model B (TeamApt manages full lifecycle via CMS)
- Certification strategy: start with Verve (cheapest iteration), then MasterCard and Visa via simulators; estimated 4-5 months
- Visa certification in progress; MasterCard pending BIN/affiliate license setup
- Data migration tool critical — must move card data from Postilion without Interswitch dependency
- Card Control module (channel blocking) requires additional paid module from Resync
- Principal bank for MasterCard issuing not finalized (Providus Bank discussed)
- Tokenization (MDES/VTS) deferred pending Visa stakeholder clarity
- Security assessment planned (Sulaiman Gbadamosi's team); maker-checker and audit trail in development

## Entities Mentioned

- [[Card Management System]], [[PostBridge]], [[Interswitch]], [[Visa]], [[MasterCard]]
- [[Tracy Ojaigho]], [[Femi Davies]], [[Frank Atashili]], [[Emeka Awagu]], [[Tosin]], [[Dennis Ajalie]]
- [[Ravi Veluguleti]], [[Resync Payments]], [[TeamApt]], [[Moniepoint]]

## Concepts

- [[Card Issuance]] — issuer processing capability and Postilion replacement
- [[Transaction Switching]] — PostBridge interface reused for scheme connectivity