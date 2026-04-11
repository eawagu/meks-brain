---
title: TeamApt Weekly Team Meeting 2026-04-10
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: teamapt-weekly-team-meeting-20260410.md
summary: "TeamApt engineering weekly team meeting Apr 10 2026 — orphan repository migration to subgroups, 30% QA bandwidth for Nickel's automation standardization initiative in Q2, secret rotation for Cosmos services (payment engine secrets exposed), frustration with fragmented external vulnerability reporting (Access Bank, Stanbic raising ad-hoc vulns outside sprint planning)."
---

## Summary

Engineering weekly covering repository management, QA automation, and security vulnerabilities. Orphan repositories to be tracked and migrated to subgroups. Nickel leading QA automation standardization — every team must allocate 30% of QA bandwidth in Q2. Secret rotations pending for money atlas integration service (deploying today). Monify service test ownership unknown — not found in Monify cluster. Payment engine service secrets confirmed exposed, rotation required. Team expressed strong frustration about external vulnerability reporting: Access Bank and Stanbic Bank raising vulns ad-hoc requiring immediate resolution outside sprint planning; vulnerabilities arriving in installments rather than comprehensive pen test reports.

## Key Points

- Orphan repos: Ketan Dhamasana to fill tracking sheet; Ravi to attempt subgroup move; fallback is cloud ticket to cloud engineering
- QA automation: Nickel (QA head of engineering) standardizing automation and testing; results pushed to dashboard; 30% QA bandwidth required from every team in Q2
- Secret rotations: One pending for money atlas integration service (deploy today, done by Monday); Cosmos support requested weak secret rotation; security team raising tickets one service at a time
- Monify service test: Owner unknown, not in Monify cluster; escalate to Latifah's team if unresolved
- Manifest misconfiguration vulns: Completed by Olawale Adegboyega, re-scan requested
- External vulnerability frustration: Access Bank raised vulns yesterday requiring same-day resolution; Yasir says this has been happening for a year disrupting sprint planning; Ravi to raise with Latifah: bank-related vulns, Jira board cleanup, installment scanning delivery
- Vulnerability tooling: Not SonarQube/Harness — security team manually hitting APIs from Cosmos with default credentials

## Entities Mentioned

[[Ravi Veluguleti]], [[Wycliffe Ochieng]], [[Ketan Dhamasana]], [[Yasir Syed Ali]], [[Prateek Gupta]], [[Olawale Adegboyega]], [[Priya Chawla]], [[Emeka Awagu]], [[Access Bank]], [[Stanbic Bank]]

## Concepts

[[Platform Engineering]]