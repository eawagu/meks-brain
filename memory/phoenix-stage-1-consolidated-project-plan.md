---
title: Phoenix Stage 1 Consolidated Project Plan
type:
  - "source"
cssclasses:
  - "source"
source_path: Phoenix_Stage1_Consolidated_Project_Plan.md
created: "2026-04-14T13:29:49Z"
updated: "2026-04-14T13:29:49Z"
summary: "Ravi Jakhodia's consolidated Phoenix Stage 1 project plan (updated 2026-04-10) covering all 5 core workstreams (CBA, Cosmos, Shell, Notifications, TSP) + 3 head-starts (Kenya Onboarding/Core Discovery, Unified UX Framework). 6-month timeline (2mo Stage 1 to end May 2026, 3mo Stage 2, 1mo Stage 3). Strangler Fit migration. GitLab TSP repo live."
---

## Summary

Companion to Ravi Jakhodia's "Moniepoint Phoenix Stage 1 Project Plan.xlsx" (Google Sheets). Consolidates all Phoenix Stage 1 workstreams and timelines. Alex Adeyemo created a TSP-specific version ("Moniepoint Phoenix Stage 1 Project Plan - TSP Added.xlsx", draft) adding the TSP workstream into Ravi's master. Timeline is 6 months overall (doubled from initial 3-month estimate to reduce disruption to the Nigerian product roadmap).

## Key Points

- **Stage 1 (2 months, target end May 2026)** — 5 core workstreams: CBA (Core Banking Architecture), Cosmos (common infra), App Shell (Adegoke Obasa + Paul Okeke/Ope Adeyemi for mobile), Notifications, TSP (Frank + Alex).
- **Stage 1 Head Starts** — Kenya Onboarding Discovery (Ope Adeyemi + Emir Emanetoglu), Kenya Core Discovery (Kaushal Shukla), Unified UX Framework (Astrid Decrop brainstorm, Christine Fok to execute Stage 2).
- **Stage 2 (3 months)** — capability decomposition, market abstraction + merging, Alpha launch with gated feature flags, change governance (Tosin) takes effect after Stage 1.
- **Stage 3** — Beta (50 business + 50 personal users, mixed internal/external), phased commercial rollout 100→500→1,000→5,000 users, feature-flag controlled.
- **Key Decisions:** Strangler fit migration, 6-month overall timeline, build within existing app using feature flags (not separate app), three-stage rollout, AI-powered PM process (Romulo Braga leading) tested with Onboarding team first, director-level PMs trained first to cascade.
- **Governance & Process:** Change governance led by Tosin post-Stage 1. Change freeze during Stages 2–3 with formal exception process. Romulo's consolidated-view decision: updates to consolidated timeplan, detailed tabs optional.
- **TSP Integration:** TSP is one of the 5 core Stage 1 workstreams. Target: end of May 2026 (same as others). Alex's TSP-added version shared Apr 10 as draft. Romulo set up GitLab product repo (https://gitlab.com/tcosmos/mpi-mfb-platform/tsp) with Frank + Alex as maintainers. TSP dev kickoff presentation shared by Alex Apr 9.
- **Dependencies & Risks:** PM Workflow Adoption (could take 2–3 weeks per team in parallel), Claude Access needed immediately for new PM process, Design Components prerequisite for shell work (Astrid confirmed refinements underway), App Strategy decision pending (unified vs separate apps, single vs multi app listings), App Size bloating risk mitigated by gated rollout.
- **Key People:** Ravi Jakhodia (Program Lead), Romulo Braga (AI PM Process), Frank Atashili (TSP Product), Alex Adeyemo (TSP Engineering), Paul Okeke + Adegoke Obasa + Ope Adeyemi (Shell/Mobile), Kaushal Shukla + Ope + Emir (Kenya Discovery), Astrid Decrop + Christine Fok (Design), Tosin (Governance).

## Key Links

- Consolidated Plan: Google Sheets 1OND-BYFz4ouqGKVGAfU5QXbdGTT2OByX
- TSP-Added (Alex draft): 1CPaJj2rozr_KJmyQ93_h25GmpZMSvsiK
- One Platform Migration Plan (Ravi's doc): 1O9hBoPOP1Dycjue_0DaZHukrmMUZiKwr
- AI PM Process Playbooks: Drive folder 17MpQLwjN7h-jM2eTJC28T4EejdyvepBo
- TSP Product Repo: gitlab.com/tcosmos/mpi-mfb-platform/tsp
- Slack: #phoenix_stage-1

## Entities Mentioned

[[Ravi Jakhodia]], [[Romulo Braga]], [[Frank Atashili]], [[Alex Adeyemo]], [[Paul Okeke]], [[Adegoke Obasa]], [[Ope Adeyemi]], [[Kaushal Shukla]], [[Emir Emanetoglu]], [[Astrid Decrop]], [[Christine Fok]], [[Tosin Eniolorunda]], [[Moniepoint]], [[TeamApt]], [[Project Phoenix]], [[TSP]]

## Concepts

[[Strangler Fig Pattern]], [[Change Freeze]], [[One Platform Migration]], [[AI PM Process]], [[Feature Flags]]