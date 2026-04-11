---
title: Visa-TeamApt Processing Agreement
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Action Items\Visa-TeamApt Processing Agreement.md
summary: "Internal discussions from Visa Connect Conference 2026 covering MoniePoint's hourly settlement system, Visa T+1 settlement gap, acquirer identity (MoniePoint vs TeamApt licensing), competitive landscape, and platform consolidation into TSP."
---

## Summary

Context captured during [[Visa]] Connect Conference 2026 (March 31). Covers MoniePoint's automated hourly settlement (100% automated, deployed inside partner banks), the T+1 settlement problem with Visa (proposed bank overdraft/pre-funded solution via [[Stanbic Bank]]), [[NIBSS]] inter-bank settlement mechanics, the TeamApt/MoniePoint acquirer identity split, competitive landscape (Opay leads cards, MoniePoint leads acquiring), and internal platform consolidation.

## Key Points

- MoniePoint settlement: hourly batch (not real-time), calculates net position → debits/credits → merchant distribution → agent commissions
- Visa T+1 gap: MoniePoint settles hourly but Visa settles T+1. Solution: bank partner (e.g., Stanbic) provides overdraft/pre-funded account; repaid when Visa settlement arrives next day
- NIBSS settles in 5 daily cycles; T+1 is card scheme limitation (file submission), not NIBSS limitation
- Banks trust NIBSS/CBN NIP settlements but perceive card scheme settlements as less guaranteed — illogical but real
- **Acquirer identity**: MoniePoint is consumer brand; [[TeamApt]] is the legal entity holding PTSP and Acquiring licenses from CBN. All licenses, audits, CBN interactions go through TeamApt. "Your license, not relationships"
- CBN strict on corporate naming — licensed entity name cannot change casually; marketing overlooked this when rebranding
- Competitive: [[Opay]] has more cards than any entity in Nigeria; MoniePoint leads acquiring; agent loyalty driven by cost/efficiency
- Platform consolidation: reconciliation overlap (Iris vs TeamApt solution), TACHA clearing pilot (Fidelity, Access, Polaris), switching overlap (Atlas, TeamApt account switch, Solomon's Aptit)
- Proposed: entire TeamApt product and engineering → TSP; personnel reassigned to Monnify and Identity divisions
- Regulatory: "bulk of transactions you see are illegal" — compliance gaps in market

## Entities Mentioned

- [[Visa]], [[TeamApt]], [[Moniepoint]], [[Stanbic Bank]], [[NIBSS]], [[Opay]]
- [[TACHA]], [[TSP]], [[Monnify]], [[Ravi Jakhodia]], [[Tosin]]

## Concepts

- [[Collections-Only Processing]] — T+1 settlement gap driving pre-funded solution
- [[Transaction Switching]] — platform consolidation into single team
- [[Reconciliation]] — Iris vs TeamApt overlap
- [[Banking Partnerships]] — Stanbic pre-funded settlement proposal