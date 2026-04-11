---
title: TSP Pending Decisions
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Action Items\TSP Pending Decisions.md
summary: "30 pending decisions and actions for TSP platform — 3 architecture decisions needing Frank's input, architecture boundary proposal due this week, 21 decisions from April 1 meetings including \"One Switch\" confirmation, and Stanbic deposit negotiation."
---

## Summary

Comprehensive decision tracker for [[TSP]] extracted from executive briefings, architecture discussions, and April 1 meetings. 30 items across architecture (card fee ownership, clearing flow, liquidity manager scope), resource/team actions, Phoenix-level actions, confirmed April 1 architecture decisions, MasterCard/MPGS decisions, testing/QA, and Stanbic facility.

## Key Points

- 3 architecture decisions need [[Frank Atashili]]'s input: card fee ownership (TSP vs FEP), card clearing flow (post_ledger ownership), Liquidity Manager scope boundary
- Architecture boundary proposal in progress (Frank + [[Alex]]) — must resolve Atlas/Juliana, Iris/[[TACHA]] overlaps before engineering can begin
- "One Switch to Rule Them All" confirmed — single platform for card + account + VAS switching
- [[PostBridge]] confirmed as internal ISO protocol standard
- Feature-flag strategy for all TSP rollout
- Kenya first deployment; CMS is phase two
- Parallel [[Juliana]] operation — Juliana keeps fronting [[NIBSS]] and banks, TSP added as sink/route target via feature-flagged routing
- Revised timeline: 3 months (not Ravi's requested 2)
- $1.1M TSP budget needs CFO sign-off
- Payment infrastructure asset ownership unresolved: MIP hardware, [[Visa]] endpoints, MPGS, Cybersource
- [[MasterCard]] collections-only: push full clearing data without being in authorization chain
- MPGS domestic POS = patient optimization, not "flip the switch"
- Processing code 01 works, 00 fails — cryptographic issue with terminal encryption
- Activate Verve on MPGS; route Verve to [[Interswitch]] for E2E
- [[Stanbic Bank]] deposit negotiation: from 10-20B down to ~1B NGN; daily traffic ~500M may be internally funded

## Entities Mentioned

- [[TSP]], [[Project Phoenix]], [[PostBridge]], [[TACHA]], [[Visa]], [[MasterCard]], [[Interswitch]], [[NIBSS]]
- [[Frank Atashili]], [[Alex]], [[Tracy Ojaigho]], [[Emeka Awagu]], [[Ravi Jakhodia]]
- [[Abeeb Ahmad]], [[Christopher Ogbosuka]], [[Bunmi Oyefisayo]], [[Felix Ike]], [[Khalid]]
- [[Stanbic Bank]], [[Access Bank]], [[Union Bank]]

## Concepts

- [[Transaction Switching]] — unified platform architecture decisions
- [[Collections-Only Processing]] — MasterCard data visibility approach
- [[Strike Team]] — lean team model confirmed over full migration
- [[Banking Partnerships]] — Stanbic deposit negotiation