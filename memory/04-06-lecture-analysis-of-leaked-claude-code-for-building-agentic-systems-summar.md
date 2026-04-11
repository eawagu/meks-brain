---
title: 04-06 Lecture_ Analysis of Leaked Claude Code for Building Agentic Systems-Summary
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 04-06 Lecture_ Analysis of Leaked Claude Code for Building Agentic Systems-Summary.md
summary: Lecture summary presenting 12 production-grade primitives extracted from analysis of leaked Claude Code source, organized across three tiers — foundational, operational maturity, and agentic harness — for building robust agentic systems.
---

## Summary
A lecturer analyzed leaked [[Anthropic]] [[Claude Code]] source code to extract 12 primitives across three tiers for building robust agentic systems. The core thesis is that production-grade agents succeed because of "non-glamorous plumbing" — approximately 80% backend engineering and 20% AI. The speaker built an "agentic harnesses skill" with Design Mode and Evaluation Mode to operationalize these findings for developers.

## Key Points
- **Tier 1 Foundational Primitives (6):** Tool registry with metadata (207 commands + 184 tools in Claude Code), multi-tiered permission system (built-in/plug-in/skills), session persistence (JSON files), workflow state management (separate from conversational state), token budget management (hard limits + auto-compaction), structured streaming events (typed events as black-box recorder)
- **Tier 2 Operational Maturity (4):** Tool pool assemblers (context-based dynamic subset), transcript compaction (retain recent + initial instruction), permission audit trail (queryable first-class object), agent type system (6 built-in types: explore, plan, verify, guide, general purpose, status line setup)
- **Tier 3 Agentic Harnesses Skill:** Design Mode (architecture before code) + Evaluation Mode (gap analysis by severity); biased toward lean, single-agent designs; pushes back on premature complexity
- **Two-level verification:** Work verification (did the agent do it correctly?) + Harness verification (guardrail tests that run when harness changes)
- **System event logging:** Records what the agent DID, not what it said — critical for enterprise audit and debugging
- **Permission handlers:** Three types — interactive (human in loop), coordinator (multi-agent orchestrator), swarm worker (autonomous)
- Over-engineering is identified as the most common failure mode for agent projects

## Entities Mentioned
- [[Anthropic]] — creator of Claude Code
- [[Claude Code]] — agentic coding system whose leaked source was analyzed

## Concepts
- [[Agentic Systems]] — AI systems that autonomously execute multi-step tasks via tools
- [[Tool Registry]] — data structure defining agent capabilities before implementation
- [[Multi-Tiered Permission System]] — risk-categorized tool approval tiers
- [[Session Persistence]] — recovery of agent state after crashes
- [[Workflow State Management]] — tracking task progress separately from conversation
- [[Token Budget Management]] — hard limits on LLM token usage to prevent runaway costs
- [[Structured Streaming Events]] — typed real-time events providing agent transparency
- [[Transcript Compaction]] — automated compression of conversation history for long-running agents
- [[Agent Type System]] — distinct agent roles with constrained capabilities
- [[Permission Audit Trail]] — queryable record of permission decisions