---
title: Cost and Usage Review TeamApt AWS Accounts Dec 2025 - Feb 2026
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: Cost & Usag_Teamapt_accounts.pptx
summary: "AWS Technical Account Manager quarterly review of TeamApt's AWS spend and infrastructure operations across two accounts (AWS TeamApt and aws-teamapt-outpost) for Dec 2025 – Feb 2026."
---

## Summary

Abhinav Arora (AWS TAM) presented a quarterly account review for [[Moniepoint]] covering financial analysis (cost breakdowns by service, account, and marketplace) and operational analysis (RDS storage, Outposts, EC2 instance types, EBS, CloudWatch logs, VPC). Key operational findings include a 12% EBS usage jump in February, growing gp2 volume footprint that should be migrated to gp3, and recommendations for snapshot retention policy and unattached volume audits.

## Key Points

- Review covers two AWS accounts: AWS TeamApt (590184105533) and aws-teamapt-outpost (314146323510)
- Top services analyzed: Amazon RDS, Amazon Outposts, EC2, CloudWatch, VPC, AWS Marketplace
- aws-teamapt-outpost account incurs marketplace charges only
- RDS storage: Mirror-PIOPS-Storage-IO2 at ~100 GB/month, Aurora StorageUsage at 50-100 GB/month
- EBS usage jumped 12% in February — new workloads or services provisioned; growth trajectory unclear
- Significant gp2 footprint still growing — recommendation to default new volumes to gp3 via policy change
- Snapshot retention policy review recommended — automated snapshot lifecycle management to prevent sprawl
- 15.3K GB-Month of EBS provisioned — audit recommended for unattached or underutilized volumes
- Financial analysis includes refunds, credits, and Enterprise Discount Program discounts

## Entities Mentioned

- [[Moniepoint]] — customer account (also referenced as TeamApt)
- [[AWS]] — cloud infrastructure provider
- [[Abhinav Arora]] — AWS Technical Account Manager

## Concepts

- [[Cloud Cost Optimization]] — managing AWS spend through rightsizing, volume type migration, and resource cleanup
- [[AWS Outposts]] — on-premises AWS infrastructure extension used by TeamApt