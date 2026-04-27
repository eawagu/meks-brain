---
title: PTSA Compliance
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-27T05:39:26Z"
updated: "2026-04-27T05:39:26Z"
summary: PTSA (Payment Terminal Service Aggregator) compliance monitor — tracks routing share distribution and processor success rates across NIBSS, T-Switch, ISW, UPSL.
---

## Overview

PTSA Compliance is the regulatory monitoring framework that tracks how transaction volume is distributed across processors (NIBSS, T-Switch, ISW, UPSL) and the success rates each delivers. PTSA monitoring is reported weekly in the [[Moniepoint Group CEO Gazette]].

## Latest reading — week of Apr 24, 2026

Per [[CEO Gazette - 24th April 26]]:

- **Largest single-week routing shift in 4 weeks of data:** [[NIBSS]] share 96.5% → 69.2% (-27pp).
- **Apr 17 role reversal:** NIBSS carried just 24.4% of volume while [[TeamApt T-Switch]] absorbed 67.6%.
- **T-Switch coverage:** carried 25.9% average share this week (vs 3.5% prior week, ~7× normal) at 97.84% success rate. Compliance risk — T-Switch never designed as a primary processor.
- **NIBSS quality intact:** 99.4–99.7% success on days it carried traffic; Apr 17 dipped to 94.2% on extremely low volume (1.2M, tail of incident). Issue is routing control, not processor quality.

## February 2026 baseline (per [[TeamApt MANCo Meeting - 31 March 2026]])

Volume 186.75M, value ₦4.45T (-12.9% volume / -16.19% value vs January, attributed to fewer days). Success rate 99.32%, avg response 2.2s. Top contributors to failures: Providers (15.08%), Keystone, Parallax. Largest banks by volume: Access Bank (37.7M), UBA (36M), GTB (25.7M).

## Related

- [[NIBSS]]
- [[NIBSS Routing Anomaly]]
- [[TeamApt T-Switch]]
- [[ISW]]
- [[UPSL]]
- [[Moniepoint Group CEO Gazette]]
- [[CEO Gazette - 24th April 26]]
- [[TeamApt MANCo Meeting - 31 March 2026]]