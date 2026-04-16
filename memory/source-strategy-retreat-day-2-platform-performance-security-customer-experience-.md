---
title: "source — Strategy Retreat Day 2: Platform Performance, Security, Customer Experience (Apr 15)"
type:
  - "source"
cssclasses:
  - "source"
source_path: 04-15_Meeting_Platform_Performance_Security_and_Customer_Experience-Summary.md
retention_label: fs
retention_rationale: Detailed meeting transcript with rich operational data across multiple business functions; retain raw for future semantic search.
created: "2026-04-16T05:40:10Z"
updated: "2026-04-16T05:40:10Z"
summary: Moniepoint 2026 Strategy Retreat session covering MoneyCRM platform enhancements, BRM deactivation process execution, HMO benefit failure (Turaco/ICO rated 2/5), Onboarding & Channels team (88.2% sign-up conversion, 3D liveness verification, zero third-party account incidents since late 2025, 100% CBN compliance), USSD billing profitability (₦1.95B collected, 120% cost coverage), Account Payments (70% YoY revenue growth, 23% of company revenue, P97@5s target, self-service erroneous transfer solution).
---

From [[2026 Executive Strategy Retreat]], Day 2 (Apr 15, 2026). Participants include [[Tosin Eniolorunda]], plus team leads for MoneyCRM, Onboarding & Channels, and Account Payments.

## Summary

Strategy retreat session covering CRM platform enhancements, BRM deactivation execution, healthcare benefit challenges, onboarding/KYC compliance achievements, security posture improvements, USSD billing model, account payment reliability, and Q2 engineering roadmap.

## Key Points

### MoneyCRM Platform
- Enhanced: real-time performance visibility for agents, payout processing reduced from 3 days to 1 day
- Standalone goal management system built: goal contracts, weighted goals, individual/team level, commission tracking
- Proposal: CRM platform rating by sales network (biggest customer) — separate from personnel ratings
- Pipeline management module launched for ENS team (replacing spreadsheets)
- Merchandise request automation deployed
- Key challenge: CRM team's OKR of "top BRM retention" questioned — should measure direct output (features, quality), not indirect outcome (retention)
- [[Tosin Eniolorunda]]: differentiate feedback from productive vs unproductive agents — if best performers dislike the software, that's the real signal

### BRM Deactivation Process
- Executed in one region: call with state coordinators, data review, direct deactivation instruction
- Regional HRBP sent formal email with all BRM data for final approval — granted
- 1,000 individuals still "locked up" — chase-down action assigned
- System limitation: BRMs working on other products become "invisible" to managers — needs platform evolution

### Healthcare Benefit (HMO) — Failure
- Provider: Turaco (broker) using ICO (underlying HMO)
- Agents turned away from hospitals not recognizing the HMO
- Overall rating: 2 out of 5
- Northern Nigeria pushback: perceived conflict with Islamic beliefs — Islamic-compliant plan suggested
- Education barrier: agents skeptical of paying for uncertain value
- Platform team built subscription management internally to avoid releasing BRM data to third party
- Thinkific (learning platform) rated as poor — seeking alternative

### Onboarding & Channels Team — Strong Results
- **Conversion:** 88.2% sign-up to account open (surpassed 88% goal)
- **Growth:** ~15M new personal + ~2.4M new business customers; 17.3M active total by year-end
- **Compliance:** 100% BVN/NIN verification on KYC L2+, 100% POS terminal issuance compliance, multi-level account approval flow, PEP/sanctions screening at onboarding
- **CX Goals surpassed:** complaining customers 0.044% (goal 0.05%), SLA adherence 97.3% (goal 95%), CSAT 90.4% (goal 85%)
- **Fraud prevention:** Zero third-party mail account incidents since late 2025; 3D liveness verification introduced across all channels; pre-onboarding device intelligence screening (detects jailbreak, root, emulators, virtual cameras)
- **One account takeover:** root cause = business owner shared password with attendant who leaked it; led to Facetech implementation + risk-based verification (>₦10M balance always challenged with Facetech)
- **Regulatory recognition:** regulators now use Moniepoint as public reference for fixing fraud issues
- **2026 Goals:** 93% blended conversion (95% referral, 85% self-onboard), KYC L2 71%→80%, KYC L3 60%→70%, 90% address verification (from 65.4%)

### USSD Billing — Cost Center to Profit
- Previous: paying ₦6.5/session, frequent service interruptions from delayed payments
- New model: charge customer ₦10/session only on fulfilled transactions (value-based, unlike competitors who charge every dial)
- Collected ₦1.95B to date, covers 120% of cost — now profitable
- No significant customer complaints

### Account Payments Team
- Revenue grew 70% YoY; contributes 23% of company revenue
- Two verticals: Auto Transfers and POS Transfers
- 2025 challenges: reliability issues, frequent downtimes, promo-driven growth eroding margins
- 2026 improvements: success rate approaching 98%, average completion time down to 2-3 seconds
- **Metric shift:** complaint rate → contact rate for 2026; target 90% reduction by Dec
- Key finding: 70% of issues escalated to support are already resolved by contact time — perception problem
- [[Tosin Eniolorunda]] mandated percentile-based metrics (P95, P99) instead of averages
- CBN compliance pending: flat ₦20 fee not compliant with tiered mandate (₦10 for ≤₦5,000 txns) — decision pending
- T-MAPS pricing deal terminated by OPay during competitive dispute — margin impact
- Strategic shift: promo-based product → sticky product

### Erroneous Transfers — Self-Service Solution
- Largest contact issue after successful-but-uncredited transfers
- MoneyPoint-to-MoneyPoint = ~40% of erroneous transfers
- Causes: inattention, "service combat" (intentional then disputed), UNO/account number confusion
- Self-service flow: sender blocks funds → recipient notified → voluntary return → escalation if no action
- Target: live before end of first week of May

### Q2 Engineering Roadmap (May Launch Targets)
- Bank prediction algorithm (90% accuracy goal — reduce erroneous transfers)
- Repeat transfer feature
- Migration to Spanner (Inbound service done, POS Transfer next)
- TempoSeed service re-architecture
- TPN/ISO 20022 compliance (NPS migration complete)
- Post-May priority: self-service erroneous transfers, account funding options, Transfer Opt-in/out

### Analytics Gap — Leadership Request
- Onboarding team "flying blind" — leaking events, missing events, out-of-order events
- Identified as "people problem" (CX team lacks resources)
- Temporary catch-all solution capturing all subsequent events for conversion analysis

## Source Links
- [[2026 Executive Strategy Retreat]]
- [[Tosin Eniolorunda]]
- [[Moniepoint]]
- [[BRM Regulatory Exposure]]