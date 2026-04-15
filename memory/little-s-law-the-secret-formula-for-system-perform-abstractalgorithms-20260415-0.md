---
title: little-s-law-the-secret-formula-for-system-perform-abstractalgorithms-20260415-0954
type:
  - "source"
cssclasses:
  - "source"
source_path: little-s-law-the-secret-formula-for-system-perform-abstractalgorithms-20260415-0954.md
created: "2026-04-15T09:19:47Z"
updated: "2026-04-15T09:19:47Z"
summary: "AbstractAlgorithms.dev article on Little's Law (L=λW) — concurrency = throughput × latency — applied to thread pools, DB connection pools, and queue workers; covers P99 sizing, feedback loops, and Spring Boot/Micrometer observability."
---

## Summary
Technical article from abstractalgorithms.dev explaining Little's Law ($L = \lambda W$), the fundamental queuing-theory identity connecting concurrent requests in flight ($L$), throughput ($\lambda$), and response time ($W$). Saved Apr 15, 2026. The piece walks through capacity-planning use (thread pools, DB connection pools, async worker pools), illustrates the latency-spike feedback loop that drives production pool exhaustion, and provides a Spring Boot + Micrometer example for live $L = \lambda W$ monitoring with Prometheus alerts.

## Key Points
- **Little's Law:** $L = \lambda \times W$ — concurrency equals throughput multiplied by latency (all in consistent units). Proven by John D.C. Little in 1961; requires only steady state (arrival rate = departure rate over observation window).
- **Distribution-agnostic:** Makes no assumptions about arrival-time distribution (Poisson, bursty, random) or service-time distribution — applies universally.
- **Three rearrangements:** $L = \lambda W$ (size the pool), $\lambda = L/W$ (max throughput at fixed pool), $W = L/\lambda$ (implied latency at observed load).
- **Latency is a capacity multiplier:** A 5× latency spike at constant traffic (1000 RPS, 200ms → 1s) inflates required threads from 200 to 1000 — 800 requests queue, timeout, or 503 without any demand increase.
- **Size to P99, not average:** Tail latency dominates under load; average sizing leaves pools undersized for real peaks.
- **Safety factor:** 1.5×–2× the calculated $L$ to handle bursts, GC pauses, P99 tails.
- **DB pool math:** PostgreSQL with 100 max connections at 50ms queries = 2000 QPS ceiling. Same pool at 500ms queries = 200 QPS. One slow query template can cut throughput ceiling 10×.
- **Async workers:** 20 workers × 10s job time = 2 jobs/sec sustainable arrival rate. Higher arrival = unbounded queue growth.
- **Feedback loop warning:** Pool exhaustion → queue → latency spike → more concurrent requests → further exhaustion. Little's Law lets you calculate the cliff before falling off.
- **Pool size ≠ throughput:** "100 DB connections" means 100 concurrent transactions in flight, not 100 QPS. Actual throughput is $100/\text{query\_time}$.
- **Micrometer instrumentation:** Spring Boot's `ThreadPoolTaskExecutor` + `ExecutorServiceMetrics.monitor()` exposes `executor.active`, `executor.queued`, `executor.pool.size` to Prometheus. Alert on `queued > 10` as early saturation signal.
- **Micro-example:** 500 RPS target at P99 300ms × safety 1.5 = 225-thread pool; with 2 DB queries/request averaging 50ms = 25 DB connections needed (38 with safety).
- **Saturation signal:** When computed live $L = \lambda \times W$ (from Micrometer timer mean + request counter) exceeds configured pool size → PagerDuty alert before the feedback loop starts.

## Entities Mentioned
[[AbstractAlgorithms.dev]], [[John D.C. Little]], [[Spring Boot]], [[Micrometer]], [[Prometheus]], [[PostgreSQL]].

## Concepts
[[Little's Law]], [[Queuing Theory]], [[Capacity Planning]], [[Thread Pool Sizing]], [[Database Connection Pool Sizing]], [[P99 Latency]], [[Tail Latency]], [[Throughput vs Concurrency]], [[Latency-Capacity Feedback Loop]], [[Steady State]], [[Pool Saturation]], [[Back-Pressure Surfacing]].
