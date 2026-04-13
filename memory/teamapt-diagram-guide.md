---
type:
  - "source"
title: TeamApt Diagram Guide
created: 2026-04-11
summary: "TeamApt C4 diagram standards: Context/Container/Component/Code levels, color conventions, XML structure, cross-system patterns, variable authorship quality."
updated: "2026-04-13T22:38:37Z"
cssclasses:
  - "source"
source_path: TeamApt_Diagram_Guide.md
---

## Summary
Reference guide for TeamApt's C4 architecture diagram standards, including visual language, color conventions, XML structure, and cross-system patterns used across all business systems.

## Key Points
- C4 Model standard (Adapted): Context (C1), Container (C2), Component (C3), Code (C4 as sequence diagrams)
- Multiple context diagrams per system: consolidated view plus audience-specific variants (partner/product)
- C4 code level implemented as UML sequence diagrams (inter-service flows) rather than class diagrams
- Color conventions: #1061B0 (TeamApt core), #1ba1e2 (TeamApt secondary), #8C8496 (external), #23A2D9 (containers)
- Sequence diagram lifeline colors: #a0522d (bank-deployed), #1ba1e2 (TeamApt-hosted), #647687 (external)
- Cross-tab navigation via draw.io links, Jira component linkage
- Standard element dimensions fixed: People 200x180, Systems 240x120, Containers 240x120
- Technology annotations: Spring Boot, React JS, MySQL/MSSQL
- Three-tier deployment pattern: TeamApt Cloud Layer, Bank-Deployed Layer, Bank Systems Layer
- Variable authorship quality across diagram tabs — some rigorous, some working sketches

## Entities Mentioned
- [[TeamApt]]
- [[C4 Model]]
- [[draw.io]]

## Concepts
- [[System Architecture]]
- [[Diagram Standards]]
- [[Visual Language]]
- [[Sequence Diagrams]]