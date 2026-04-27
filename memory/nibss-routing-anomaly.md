---
title: NIBSS Routing Anomaly
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-27T05:39:26Z"
updated: "2026-04-27T05:39:26Z"
summary: Recurring NIBSS routing instability where NIBSS share collapses at the start of each week and other processors (T-Switch, ISW, UPSL) absorb the load — observed Apr 8 and Apr 17, 2026.
---

## Pattern

A recurring NIBSS routing event in which [[NIBSS]] traffic collapses to ~20% of normal daily volume early in the week, while [[TeamApt T-Switch]], [[ISW]], and [[UPSL]] absorb the redirected load. NIBSS's own success rate stays high on the volume it does carry; the issue is volume distribution / routing control, not processor quality.

## Observed instances

| Date | Event |
|---|---|
| Apr 8, 2026 | First instance noted in Wk1 of CEO Gazette monitoring window. |
| Apr 17, 2026 | NIBSS carried 1.2M txns (~20% of normal). T-Switch (3.3M), ISW (3.5M), UPSL (3.2M) absorbed load. NIBSS approval rate dipped to 84.5% (lowest of the week); success rate to 94.2% on the tail. PTSA share inverted: NIBSS 24.4%, T-Switch 67.6%. Same day, [[TeamApt Share of Moniepoint Transactions]] hit a 4-week low at 26.1%. |

## Implication

Over-reliance on T-Switch as a failover path during NIBSS instability is a [[PTSA Compliance]] risk — T-Switch was not designed to be a primary processor. The recurring start-of-week pattern suggests structural weakness rather than one-off events.

## Related

- [[NIBSS]]
- [[PTSA Compliance]]
- [[TeamApt T-Switch]]
- [[ISW]]
- [[UPSL]]
- [[TeamApt Share of Moniepoint Transactions]]
- [[CEO Gazette - 24th April 26]]