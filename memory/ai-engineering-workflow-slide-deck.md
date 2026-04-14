---
title: AI Engineering Workflow — Slide Deck
type:
  - "source"
cssclasses:
  - "source"
source_path: AI Engineering Workflow — Slide Deck.pdf
created: "2026-04-14T15:30:12Z"
updated: "2026-04-14T15:30:12Z"
summary: Internal slide deck specifying an AI-powered engineering workflow — end-to-end pipeline from PRD to canary deployment with 9 phases (3 AI-assisted), TDD enforcement, stack-specific test matrices (BE/Mobile/Web), human approval gates, and cross-cutting guardrails covering security, clean code, and design system compliance.
---

## Summary
Defines the reference AI-powered engineering workflow for TeamApt: a 9-phase pipeline from PRD → Test Cases → Technical Spec → Implementation → Build/Deploy → Manual QA → Regression → Canary. Three phases are AI-assisted with human approval gates (Test Case Generation, Technical Spec, Implementation). Enforces TDD Red-Green-Refactor, local-first execution, traceability from PRD through Jira to commit, mock discipline, and stack-specific test matrices.

## Key Points
- **9 sequential phases**: Test Case Generation (QA) → Technical Spec (EM/EA) → Implementation (BE/Mobile/Web) → Build & Deploy → Fast Regression → AI Testing → Manual QA → Security/Load → Canary (feature flags). 3 are AI-assisted.
- **Phase 01 — Test Case Generation**: AI skills include Repo Context Loader, Acceptance Criteria Parser, BDD Test Case Generator (Gherkin), Edge Case Inference, Jira Sync, Test Repo Committer. Minimum coverage ≥1 happy/negative/edge per story. Coverage matrix presented before approval.
- **Phase 02 — Technical Spec**: Multi-Tag Aggregator, Codebase Analyzer, Gap & Impact Analyzer, ADR Generator, Task Decomposer, Jira/Confluence Sync. "Current state first" rule — AI presents codebase understanding before proposing changes. Max scope: no task spans >1 bounded context.
- **Phase 03 — Implementation**: Full Context Assembler, Codebase Navigator, Implementation Planner, TDD Test Generator, Test Failure Analyzer (iterative feedback loop), Mock Generator, Design System Resolver, Local Test Runner, Code Generator, Git Commit Composer. 11-step flow with engineer approval gate on commit.
- **Stack test matrices**:
  - **Backend**: Unit (JUnit/pytest/Go test) + Integration (Testcontainers) + API (REST Assured/Supertest). Real DB via Testcontainers; mock only 3rd-party services. Local execution via Docker Compose.
  - **Mobile**: Unit (JUnit/XCTest/flutter_test) + Integration (integration_test/Espresso/XCUITest) + Functional (Patrol). DI-swapped repos; real state and navigation. Emulator or BrowserStack Local execution.
  - **Web**: Unit (Jest/Vitest) + Integration (Testing Library/Cypress Component) + Functional (Playwright). MSW for network layer; real components and routing. Local dev server + real browser execution.
- **Cross-cutting guardrails**: Temperature 0–0.2, prompt versioning, output validation schemas, naming convention inference, no unreviewed external writes, diff-based approvals, session audit log, context manifest, escalation protocol.
- **Security & compliance**: No secrets in output, synthetic test data only, SAST/DAST parity with human-written code, license compliance (no copyleft without approval).
- **Code quality**: Linter zero-tolerance, formatter compliance, DRY + single responsibility, cyclomatic complexity caps, conventional commits across all stacks.
- **Design system compliance** (Mobile + Web): All UI must use company DS components; no custom colors/spacing/typography outside the DS catalog; deviations require explicit approval.
- **Dependency management**: No new dependency without engineer approval; AI must provide justification, license check, bundle impact, maintenance health.

## Entities Mentioned
None — internal methodology deck with no named people or organizations.

## Concepts
[[AI Engineering Workflow]], [[TDD]], [[BDD]], [[Human-in-the-Loop AI]], [[AI Guardrails]], [[Design System Compliance]], [[Mock Discipline]], [[Architecture Decision Records]], [[Test Coverage Matrix]], [[Conventional Commits]], [[Test Traceability]], [[Stack Test Matrix]]