---
title: Moniepoint QBR March 2026
type:
  - "source"
created: "2026-04-11T15:15:52Z"
updated: "2026-04-11T15:15:52Z"
cssclasses:
  - "source"
source_path: "Moniepoint_QBR_Mar'26 (1).pdf"
summary: AWS Enterprise Support Quarterly Business Review for Moniepoint covering Dec 2025–Feb 2026, with financial analysis showing $185-259K monthly AWS spend, operational metrics, savings plan recommendations ($5.3K/month potential), Trusted Advisor findings, and support case analysis.
---

## Summary

[[AWS]] Enterprise Support Quarterly Business Review (QBR) for [[Moniepoint]], presented by TAM [[Abhinav Arora]] on 12 March 2026, covering the December 2025 – February 2026 period. It analyzes AWS spend, operational metrics, cost optimization opportunities, Trusted Advisor findings, and support cases.

## Key Points

- **AWS spend**: $185.9K (Dec), $185.8K (Jan), $259.0K (Feb) — excluding tax, refunds, and EDP discount
- **Top 5 accounts**: Core Services (~$93K), Moniepoint (~$54K), Teamapt Admin (~$7-95K spike in Feb), aws-teamapt-outpost (~$16K), AWS TeamApt (~$8K)
- **Top 5 services**: Amazon RDS ($68-73K), AWS Outposts ($35-36K), EC2 Compute ($18-22K), CloudWatch ($9-14K), AWS DMS ($7-12K)
- **RDS**: 100% on-demand; all accounts running without Reserved Instances
- **EC2**: 100% on-demand; potential 33% savings (~$6.2K/month) with 1-year RIs
- **Savings Plan recommendations**: Compute SP at $7.059/hr (21% savings, ~$1.4K/month); Database SP at $20.032/hr (20% savings, ~$3.9K/month)
- **Trusted Advisor Security**: 49 IAM keys need rotation (10 in error), root user access key present, 6 S3 buckets without block public access, 2 publicly accessible EKS endpoints
- **Trusted Advisor Cost**: 50 low-utilization EC2 instances ($13.4K estimated savings), 9 idle RDS instances ($2.9K savings)
- **Trusted Advisor Fault Tolerance**: 125 EBS volumes without snapshots (error), 14 non-Multi-AZ RDS instances, 50 S3 buckets without versioning
- **Lambda deprecated runtimes**: 4 functions on nodejs12.x, 1 on nodejs14.x, 3 on python3.8, 1 on python3.9
- **Support cases**: 9 total (3 Dec, 4 Jan, 2 Feb); top services: Outposts (2), EKS (2), RDS SQL Server (2)
- **AWS Marketplace**: F5 BIG-IP ($88.2K in Dec, $3.1-3.4K Jan/Feb), Postman Enterprise (~$3.4K/month)

## Entities Mentioned

- [[Moniepoint]]
- [[AWS]]
- [[Abhinav Arora]]
- [[Shlomi Gabbay]]
- [[Monnify]]

## Concepts

- [[Cloud Cost Optimization]]
- [[Cloud Support Operations]]
- [[AWS Well-Architected Framework]]