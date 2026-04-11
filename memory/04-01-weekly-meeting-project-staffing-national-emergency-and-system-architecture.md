---
title: 04-01 Weekly Meeting_ Project Staffing, National Emergency, and System Architecture-Meeting Minutes
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 04-01 Weekly Meeting_ Project Staffing, National Emergency, and System Architecture-Meeting Minutes.md
summary: April 1, 2026 meeting minutes covering architecture decisions for a unified codebase with per-country instances, team staffing for Project Phoenix, and a national financial sector security emergency meeting called for Abuja.
---

## Summary
A weekly technical meeting discussed finalizing the team for a major architecture project using the ISO Pro protocol for cards and accounts. The key architecture decision was to move from multi-tenancy to a single unified codebase with separate per-country instances, driven by data sovereignty requirements. [[Emeka Awagu]]'s team was designated as "pacesetters" for Phase 2 but given a Phase 1 mandate to begin immediately. The meeting also addressed an emergency national security meeting called in Abuja regarding threats from international actors targeting Nigeria's financial sector.

## Key Points
- **Architecture decision:** Single unified codebase with separate per-country instances (replaces original multi-tenancy proposal); data sovereignty regulations in Nigeria necessitate this
- **Phase rollout:** [[Emeka Awagu]]'s team is Phase 2 but has a Phase 1 mandate from [[Dennis Ajalie]] to start concurrently
- **Team composition:** Engineering Manager roles being finalized — [[Keitan]] is locked in, [[Nitish]] expected to join with his PM; [[Bumi]] is no longer available; [[Vishwa]] has expressed interest
- **EM coding culture:** [[Moneypoint]] expectation is that all technical staff including senior leaders code actively; EMs who don't code face consequences
- **National security emergency:** International actors threatening Nigeria's financial sector; authorities requested Moneypoint representatives (CISOs, compliance) for an Abuja meeting; [[Emeka Awagu]] identified [[Emmanuel]] as appropriate attendee
- **Project Phoenix:** Described as performing well — provides real customer feedback and helps with organization
- **CMS strategy:** New CMS to be sold to banks and deployed as a single package with everything else (one migration, not phased)
- **Cognia OS:** System mentioned for stress testing ("stress test the note system")

## Entities Mentioned
- [[Emeka Awagu]] — meeting participant, Phase 2 team lead, CTO
- [[Dennis Ajalie]] — MD/CEO, issued Phase 1 mandate
- [[Keitan]] — Engineering Manager, locked in for the project
- [[Nitish]] — Engineering Manager from CMS and card distribution
- [[Vishwa]] — Engineering Manager who reached out
- [[Bumi]] — Previously an EM option, no longer available
- [[Frank Atashili]] — referenced ("pick the best, discard the rest" principle)
- [[Toshi]] — clarified architecture email on per-country instances
- [[Wally]] — EM noted as not coding recently
- [[Daniel Ojinaka]] — mentioned as in CTL1
- [[Moneypoint]] — organization
- [[Teamapt]] — organization
- [[Project Phoenix]] — project performing well

## Concepts
- [[Unified Codebase Per-Country Architecture]] — single codebase, separate country instances
- [[ISO Pro Protocol]] — protocol for handling both cards and accounts
- [[Engineering Manager Coding Culture]] — expectation that EMs actively code
- [[Phase Gate Rollout]] — phased project rollout with pacesetters
- [[Data Sovereignty]] — regulatory driver for per-country instances
- [[National Financial Sector Security]] — emergency threat from international actors