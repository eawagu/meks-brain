---
title: Platform Scaling
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-13T15:32:02Z"
updated: "2026-04-13T15:32:02Z"
summary: "Engineering and architectural practices for growing Moniepoint's payment infrastructure across volume, markets, and products — spanning throughput, multi-market deployment, team scaling, and infrastructure."
---

## Definition

Platform Scaling refers to the engineering and architectural practices for growing Moniepoint's payment infrastructure to handle increasing transaction volumes, market expansion, and product proliferation without proportional increases in operational cost or failure rates.

## Dimensions

- **Transaction throughput** — TSP targets sub-500ms authorization latency at scale; 99.99% availability target for [[Card Issuance & Processing Platform]]
- **Market expansion** — [[Spine and Module Architecture]] enables new market launches (Nigeria, UK, Kenya) without modifying shared Spine
- **Team scaling** — [[Resource Allocation]] across TSP (38 engineers), Monnify (26), PTSP (6)
- **Infrastructure** — cloud cost optimization, data centre colocation ([[Data Centre Colocation]]), CI/CD migration (Harness)

## Related Concepts

- [[Platform Engineering]] — horizontal infrastructure enabling scaling
- [[Resource Allocation]] — headcount distribution as a scaling constraint
- [[Spine and Module Architecture]] — the architectural pattern enabling multi-market scale