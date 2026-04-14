---
title: Project Phoenix Initiative (compiled March 2026)
type:
  - "source"
cssclasses:
  - "source"
source_path: Project_Phoenix_Initiative.md
created: "2026-04-14T13:29:14Z"
updated: "2026-04-14T13:29:14Z"
summary: "Frank Atashili's comprehensive Project Phoenix briefing — CEO comms (Tosin's Feb 13 announcement, Feb 16-20 AI-native mandate, Mar 27 \"Begins\" with 6-month \"sacrosanct\" deadline for NG/UK/KE), TeamApt existing systems mapped to Phoenix foundations (Revenue Drivers + Enablers), MFB parallel infrastructure blindspot (Postilion/PostCard, Smart Card, Safe Token, CMS Manager, Aptent, Atlas, Iris), Tosin's 6-cluster platform architecture, ownership framework, Eywa, TSP Phase 1 status (Apr 7/9 — Alex's 4-phase delivery plan ratified, 15-person strike team, 12-week timeline)."
---

## Summary

Compiled briefing document capturing Frank Atashili's (CPO, TeamApt) consolidated view of Project Phoenix as of April 10, 2026. Combines CEO communications, TeamApt existing-systems inventory, MFB parallel-infrastructure blindspot analysis, Tosin's formal cluster architecture from Project_Phoenix_v3, the Eywa artifact framework, Ravi Jakhodia's One Platform migration plan, and the TSP Phase 1 status update following Alex Adeyemo's 4-phase delivery plan ratified at the April 9 TSP Dev Kickoff.

## Key Points

- **CEO mandate (Mar 27):** [[Tosin Eniolorunda]] confirmed Phase 1 start. Phoenix must support Nigeria, UK, and Kenya. Full production in all three in 6 months — "sacrosanct" deadline. [[Ravi Jakhodia]] leads the program.
- **AI-native directive (Feb 16–20):** Moniepoint declared AI-first; all functional managers rebuild workflows using Eywa (Claude-backed). Michael Afolabi runs Claude access.
- **Phoenix definition:** Group-wide transformation with two goals — (1) platformization (shared multi-tenant platforms consuming as tenants), (2) AI-nativeness (Eywa intelligence layer). A new country = new config profile, not new build.
- **TeamApt existing systems (Phoenix Foundations):** Revenue Drivers — Direct Debit (MADD, GoSubscribe, SAFE), Monnify (Merchant Gateway — collections/disbursements/VAS). Enablers — TPP (Issuer/Acquirer Processing, Switch Engineering, CMS spec, Transaction Switch spec), Domestic Switching (Juliana Card/Account Switch, AptPay Suite, PTSP/PTAD).
- **MFB Card Infrastructure Blindspot:** Five parallel systems MFB operates outside Phoenix specs — Postilion/PostCard (ACI/Interswitch), Smart Card Process (Interswitch), Safe Token (Interswitch), CMS Manager (12-person team, Java 21, Spanner Q3 2026 — recommended: Absorb), Aptent (MFB Payments Team — authorization routing POS→TMS→Aptent→PostBridge→TM→PostCard). Three are vendor-managed by Interswitch.
- **Reconciliation & Account Transfer blindspot:** Iris (15–27B+ tx/month group-wide recon, no dedicated PM — recommended Absorb) and Atlas (~500M tx/month multi-provider transfer orchestration, 12+ downstream providers — recommended Evaluate). Both sit in Damilare Ogunnaike's Monnify org, deployed on MFB infrastructure. TeamApt's own Monnify business has operational dependency on MFB infrastructure via these.
- **Tosin's cluster architecture (Project_Phoenix_v3):** 6 clusters — Business Banking Platforms, Digital Banking Platforms, Transaction Switching & Processing (TSP, foundational), Credit Platforms, Customer Platforms, Banking Operations Platforms. Plus cross-cutting Design System & UI Frameworks. Platform accountability: 99.99% minimum uptime, P99 latency targets, zero tolerance for unowned incidents.
- **Ownership principle:** TeamApt owns any platform requiring CBN switching/processing license OR serving multiple group companies as shared infrastructure. MFB/MonieWorld/GlobalWire own product experience layers built on top.
- **One Platform Migration (Ravi's plan):** 3 stages, 6 months. Stage 1 (Apr–May): CBA/Cosmos/Notification + TSP + Kenya Discovery + PM Process + App Shells + Design Components. Stage 2 (Jun–Aug): All Platforms + Alpha. Stage 3 (Sept): Beta + Commercial. Strangler Fig pattern. Change Freeze active in Stage 2 onward.
- **TSP Phase 1 (Apr 7 planning, Apr 9 ratified):** Scope = clean transaction switching (auth, clearing, settlement, dispute routing), all 19 transaction types, both NG+GB markets, continuous delivery 12 weeks. Team: 2 strike teams (15 people) — Team Spine (EM Sulaiman Adeeyo, ICs Abeeb Ahmad, Christopher Ogbosuka, Vijyendra Mishra UK, Muhammad Iqbal UK) + Team Adapters (EM Sunday Ayodele, ICs Muhammad Siddiqui Principal, Krunal Chaudhari UK, Moyosore Omoniyi UK, Mubasher Saifullah UK). PM: Bunmi Oyefisayo. Card Switching VP: Ravi Veluguleti. No dedicated MoniePoint engineers (best-effort only).
- **Spine foundation already built:** 15-module Maven monorepo, 9-part LLD (21k+ lines), 258 Java files, workflow engine (21 steps), state machine (15 states), ISO 8583 stack (PostBridge/TwoBridge/IPM/Netty/HSM), 6 step executors, SPI contracts, 493 passing tests (85% line / 80% branch coverage).
- **Milestones (4 phases):** M1 First Live Transaction wk 3 (Apr 24) PAY_OUT NG via NIP. M2 Two Markets Six Products wk 6 (May 15). M3 Full Catalogue & Ops-Ready wk 9 (Jun 5) — all 19 types. M4 Cutover Begun wk 12 (Jun 26) — feature flag in Atlas, internal canary, 5%→25%→100% production ramp.
- **Integration targets:** 23+ external integrations across 6 protocols — NG (9 rails: NPS, NIP, 10+ Bank FEPs, Interswitch, CoralPay, PTSA, 44 VAS providers, NIBSS NSS), GB (7 rails: ClearBank, RailsR, TrueLayer, Volt, Checkout.com, BACS, CoP/TellMoney), global (CBA, Treasury/FX, Loom, Visa, Mastercard, HSM, scheme clearing files).
- **Integration Problems (Mar 30 Frank–Ravi sync):** #1 People (blocked on architecture), #2 Tools (Ravi leads, deferred), #3+4 Architecture+Overlapping Systems — RESOLVED Apr 7 (scope formally agreed).
- **Core belief statement (meeting spine):** "TeamApt builds switching and processing systems that connect banks, fintechs, and regulators. TeamApt is not limited to building systems for a single bank." Distinguishes TeamApt from being seen as "Moniepoint MFB's technology arm."

## Entities Mentioned

[[Tosin Eniolorunda]], [[Frank Atashili]], [[Ravi Jakhodia]], [[Alex Adeyemo]], [[Ravi Veluguleti]], [[Bunmi Oyefisayo]], [[Sulaiman Adeeyo]], [[Sunday Ayodele]], [[Abeeb Ahmad]], [[Christopher Ogbosuka]], [[Muhammad Siddiqui]], [[Felix Ike]], [[Romulo Braga]], [[Astrid Decrop]], [[Christine Fok]], [[Paul Okeke]], [[Adegoke Obasa]], [[Ope Adeyemi]], [[Kaushal Shukla]], [[Emir Emanetoglu]], [[Tracy Ojaigho]], [[Damilare Ogunnaike]], [[Damilola Oyediran]], [[Femi Davies]], [[Nitish Chand]], [[Nadeem Abbas]], [[Oluwafemi Ajayi]], [[Wole Olorunleke]], [[Oluwatimilehin Ogunyemi]], [[Mofoluwake Amisu]], [[Khadijah Atere]], [[Khalil]], [[Michael Afolabi]], [[Ruth Adetunji]], [[Moniepoint]], [[TeamApt]], [[Moniepoint MFB]], [[MonieWorld]], [[GlobalWire]], [[Project Phoenix]], [[TSP]], [[Transaction Switching Platform]], [[Juliana]], [[TACHA]], [[Atlas]], [[Iris]], [[Aptent]], [[Card Management System]], [[PostBridge]], [[Eywa]], [[NIBSS]], [[Interswitch]], [[Visa]], [[Mastercard]], [[ClearBank]], [[TrueLayer]], [[CoralPay]], [[Monnify]], [[GoSubscribe]]

## Concepts

[[Platformization]], [[AI-native]], [[Transaction Switching]], [[Transaction Switching Platform]], [[Strangler Fig Pattern]], [[Issuer Processing]], [[Third Party Processing]], [[Card Issuance]], [[Spine and Module Architecture]], [[Change Freeze]], [[One Platform Migration]], [[Multi-tenant]], [[Country-agnostic]]