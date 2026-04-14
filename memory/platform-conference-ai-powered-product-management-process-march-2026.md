---
title: Platform Conference — AI-Powered Product Management Process (March 2026)
type:
  - "source"
cssclasses:
  - "source"
source_path: Platform Conference - AI-Powered Product Management Process [March 2026] .pdf
created: "2026-04-14T15:40:20Z"
updated: "2026-04-14T15:40:20Z"
summary: "Romulo Braga's March 9–10, 2026 London Platform Conference deck on AI-Powered Product Management — 4 pillars: Git as source of truth + operating system, new PM workflow (explore→branch→draft→sync→refine→deliver→PR), Jira execution governance (strategy/status vs Git truth), AI as optional accelerator via Claude Code + Skills. Artifact hierarchy: Platform→Team→Capability→Sub-Capability→Epic→Story→AC→Journey."
---

## Summary
[[Romulo Braga]]'s presentation at the Moniepoint Platform Conference in London (March 9–10, 2026) on the new AI-Powered Product Management Process. Frames the transformation: Moniepoint moving from "single-country human-only execution" to "platformized, multi-country, AI-native institution." Four pillars: Git as product operating system, new PM workflow, Jira execution governance, AI as optional accelerator. Explicitly positions human judgment as more important — not less — with AI.

## Key Points
- **Context:** Moniepoint transformation from single-country/human-only to platform/multi-country/AI-native requires fundamentally different Product Management, Design, Engineering approach.
- **Old way vs new way:**
  - Old: tribal knowledge, lossy handoffs, specs drifting from reality, meeting-heavy, scaling = rewrite.
  - New: structured/version-controlled/machine-readable artifacts in Git, capability = complete behavioral superset (country-agnostic), institutional knowledge, AI accelerates + humans decide.
- **Human judgment stays central:** AI is thinking partner for reasoning, drafting, challenging assumptions, flagging gaps. Humans own customer understanding, trade-off decisions, business judgment. **Every AI-generated content reviewed before commit. Nothing reaches repo without deliberate human action. Accountability stays human.**
- **Pillar 1 — Git as source of truth and operating system:**
  - Structured artifact hierarchy, country-agnostic by design, in version-controlled product repo.
  - **Artifact hierarchy:**
    - **Platform** (CPO) — top-level business domain. Example: Merchant Acquiring.
    - **Team** (Head of Platform) — PM + engineers/designers/copywriters/QA. Example: Payments Team.
    - **Capability** (Head of Platform) — distinct cohesive domain. Example: Accept Payment.
    - **Sub Capability** (Product Manager) — group of related Epics. Example: Accept Card Payment.
    - **Epic** — complete user intent. Example: Submit tap payment.
    - **Story** — atomic unit of user value. Example: Present terminal for tap.
    - **Acceptance Criteria** — testable Given/When/Then.
    - **Journey** — customer goal defined by entry/exit stories. Example: Merchant accepts a payment.
- **Pillar 2 — New PM workflow (7 steps):** (1) Explore & think (research, challenge, AI-assisted or solo). (2) Branch & change spec (start with Problem/Motivation/Current-Desired Behaviour). (3) Draft & commit (edit directly or use [[Claude Code]], CI validates every commit). (4) Sync to Jira (create change spec/epic/stories, link to Initiative→OKRs, apply Fix Version). (5) Refine through PM/PD/EM scoping and delivery. (6) Deliver (engineering builds from branch; update change spec if anything changes). (7) Raise PR & ship (all Jira tickets done, change spec complete, merge to main = production).
- **Pillar 3 — Jira execution governance:** **Git owns what to build (truth). Jira owns why/who/how-far (strategy + status).**
  - Jira-only: Platform OKR (HoP creates), Team OKR (PM creates), Initiative (PM creates).
  - Synced from Git: Change Spec, Epic, Story (contains ACs).
  - Future: synced from MOOS.
  - Starter Project boards: Team OKRs, Initiatives (Backlog → Initiative Brief → Change Spec → Ready for Scoping → Live/Done), Change Specs, Delivery Scoping (PM/PD/EM scoping → Ready for Delivery → In Delivery → Live/Done), Delivery Execution (Prep for Sprint → Ready for Sprint → In Dev → In Automated Testing → Ready for QA → In QA Review → Ready for Release → In Release → Live/Done).
  - Example used: Mobile money acceptance for POS and mobile app (Q1 2026 launch); 99.5% payment acceptance rate OKR; 5-African-countries-by-2027 platform OKR.
- **Pillar 4 — AI as optional accelerator:**
  - **You decide:** customer relationship, problem/outcome definition, what/why to build, trade-offs, content review before commit, artifact readiness, Jira governance.
  - **AI assists (optional):** research customer problems + competitive context, draft problem statements/stories/ACs, challenge assumptions, show diffs, run pre-release validation, assist Jira sync, commit only on explicit approval.
  - **Claude Code:** reads repo + branch state natively, drafts file changes from natural language, commits only on explicit approval, available to every role (CPO, HoP, PM).
  - **Claude Skills:** Onboarding (orients new PMs), Pre-release validation (structured checks before PR), Jira sync (drafts issues, flags missing OKR linkage).
  - **Boundary:** Repo stays clean. AI assists from outside — no configuration, no tooling, no footprint in repo; system works without it.
- **Example change spec:** add-mobile-money-acceptance (backup materials referenced).

## Entities Mentioned
[[Moniepoint]], [[Romulo Braga]], [[Claude Code]], Jira, Git, MOOS

## Concepts
[[AI-Powered Product Management Process]], [[Git as Source of Truth]], [[Artifact Hierarchy]], [[Capability Superset]], [[Country-Agnostic Artifacts]], [[Jira Execution Governance]], [[Change Spec]], [[Claude Skills]], [[Human-in-the-Loop AI]], [[Platform Conference]]