---
title: Moniepoint AI harness
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:15:23Z"
updated: "2026-04-25T12:15:23Z"
summary: "The 'harness' Moniepoint is building around AI agents to ensure they perform as expected — the gating layer between AI agents and direct production action. Per Mek (Apr 24): the majority of current AI work is on this harness, not on autonomous agents."
---

## Definition

The **Moniepoint AI harness** is the gating / oversight layer Moniepoint is building around AI agents to ensure they perform tasks as expected before any direct production action. Articulated by [[Emeka Awagu]] in the 2026-04-24 HoE Round 2 interview.

## Current state (per Mek, Apr 24)

> "We are not yet using agents that run 'autonomously indefinitely' as we are in the early stages of this journey. Our immediate focus is on developing the 'harness' around the AI to ensure it performs tasks as expected, which I believe is **where the majority of the current work lies**."

## Why a harness comes before autonomous agents

Without a harness, an autonomous agent's failure modes propagate uncontrolled into production. The harness establishes:

1. **Gating** at architecturally sensitive points (code, deployments, schema changes, financial transactions).
2. **Verification surfaces** — ways for humans to inspect what the agent is about to do before it does.
3. **Rollback paths** — deterministic ways to revert agent actions.
4. **Observability** — measurable signals of agent behaviour (false-positive / false-negative rates, drift detection).

## Strategic implication

This framing aligns with Mek's broader preference for **structural fixes over behavioural commitments** (see his working preferences) — a harness is structural; "trust the agent more" is behavioural. The harness investment is therefore a long-lived capital investment, not a one-off engineering task.

## Sources

- [[Head of Engineering Interview Round 2 - Venkatesh Purushothaman - 2026-04-24 11:00 WAT]]
