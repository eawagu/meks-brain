---
title: Moniepoint 2026 Leadership Retreat UK - Day 2 Platform Performance Security Customer Experience - Summary
type:
  - "source"
cssclasses:
  - "source"
source_path: Moniepoint Inc 2026 Leadership Retreat - UK - Day 2_ Platform Performance, Security, and Customer Experience-Summary.md
retention_label: postgres
retention_rationale: Structured summary with quantitative security, onboarding, payments, and reliability metrics. Historical baseline for onboarding conversion, fraud reduction, USSD billing, and 2026 reliability targets.
event_date: 2026
event: Moniepoint 2026 Leadership Retreat — UK
day: 2
created: "2026-04-17T15:23:12Z"
updated: "2026-04-17T15:23:12Z"
summary: Day 2 Platform session \u2014 DRM deactivation process, MoneyCRM self-rating, Onboarding/Channels 2025 recap (zero third-party mail account incidents, 88.2% sign-up conversion, 17.3M total active customers, CSAT 90.4%, SLA 97.3%), USSD fulfillment billing model (120% cost coverage, \u20a61.95B collected), Account Payments 2025 (70% revenue growth, 23% company share), 2026 reliability targets (P97 at 5s, P99 inbound at 2s), contact-rate vs complaint-rate shift, erroneous transfer self-service, CBN tiered pricing forecast-only.
---

From [[Moniepoint 2026 Leadership Retreat UK]], Day 2 afternoon session on Platform Performance, Security, and Customer Experience. Presenters include Speaker 9 (Onboarding & Channels lead) and Speaker 10 (Account Payments lead).

## Key Decisions

- **State coordinators directly instructed to deactivate non-productive DRMs.** Data pre-pulled and reviewed; HROBP to send email for formal approval. Deactivation approved.
- **HMO healthcare plan is inadequate.** Rolled out via Turaco (broker) / ICO (HMO); rated ~2/5 with very limited offerings. Better plans required.
- **Thinkific platform to be replaced** \u2014 learning provider is inadequate.
- **Product Security team established** \u2014 dedicated team to build detection tools against fraudulent account opening + takeovers.
- **CBN tiered pricing compliance is forecasted but not implemented** \u2014 forecast assumed \u20a610 fee below \u20a65,000 (vs. current flat \u20a620). Final decision pending.
- **2026 shift from promo-driven to sticky product** to retain customers without excessive spending.
- **Khalil/Fas session postponed to next morning** \u2014 critical for retention.

## Onboarding & Channels (Speaker 9)

### Team Structure
- Individual Onboarding and KYC.
- Business Onboarding and KYB.
- Address Verification.
- Channels Access (Web, POS, USSD, Mobile).

### 2024 Risk Mitigation \u2014 Third-Party Mail Account Fraud
- **Zero incidents** of third-party mail account fraud (synthetic identity) from late 2024 to present.
- Key security enhancements:
    - **3D Liveness Verification** (Facetech) \u2014 most secure facial verification available.
    - **Pre-onboarding Security Screening** \u2014 device intelligence to detect jailbroken/rooted phones, emulators, virtual cameras.
- Account takeover: goal zero, actual one incident \u2014 BO shared password with sales attendant; attacker bypassed biometric. Remediated with Facetech 3D liveness + risk-based challenge:
    - >\u20a610M balance \u2192 always Facetech.
    - <\u20a610M \u2192 lighter challenge.

### 2024 Compliance (CBN bi-annual audit)
- 100% BVN/NIN compliance for KYC Level 2+.
- 100% KYC level balance caps (\u20a6300K L1, \u20a6500K L2).
- 100% POS terminals only to KYC L3+.
- New workflow: senior management approval for >3 accounts at L3+.
- Onboarding screening for PEPs, sanctions lists, reserved names.

### 2024 Customer Experience
- Complaining customers: baseline 0.2% (May 2024) \u2192 goal 0.05% \u2192 **actual 0.044%**.
- SLA adherence: 77.2% \u2192 goal 95% \u2192 **actual 97.3%**.
- CSAT: 15.6% \u2192 goal 85% \u2192 **actual 90.4%**.

### 2024 Growth & Conversion
- Sign-up \u2192 account open conversion: **88.2%** (goal 88%).
- New personal customers: ~15M; new business: 2.4M.
- Total active customers: ~17.3M.

### 2024 Initiatives Shipped
- L2 support empowered to resolve more issues without escalation.
- Dashboard UX revamp: load time 30s \u2192 1.5s.
- Offline biometric login (last known balance without internet).
- PRM direct flow for account statements.
- Multiple business accounts under single profile.
- NIN verification resilience \u2014 multi-provider callback.
- Error message taxonomy revamp \u2014 user-friendly, self-resolve guidance.
- CRM-triggered WhatsApp outreach to non-converting customers on error.
- Offline onboarding (PRMs/marketers open accounts for non-smartphone customers).

### USSD Fulfillment Billing (new in 2024)
- **Problem:** company paid \u20a66.5/session regardless of outcome; periodic shutdowns due to payment process length.
- **Solution:** charge customer \u20a610/successful session; cost \u20a66.5.
- **Results:**
    - \u20a61.95B collected to date.
    - Revenue covers **120% of associated costs** \u2014 profitable.
    - Customers not complaining about the charge.
- Differs from other financial institutions who charge per dial.

### 2026 Goals (Onboarding & Channels)
- Blended sign-up \u2192 account open conversion: **93%** (referral 95% currently 95.2%; self-onboarded 85% currently 76.4%).
- KYC L2 upgrade: **80%** (currently 71%).
- KYC L3 upgrade: **70%** (currently 60%).
- Begin tracking CSAT.
- Initiatives: Asynchronous ID verification (for Mimsy downtime), Onboarding UX revamp, Real-time liveness guidance (brightness detection + auto-adjust).
- Address verification solutions for L3 drop-offs (~30% drop due to lack of proof of address) \u2014 combine digital + physical.
- "Sister app sensing" to prevent skewed conversion metrics.

### Cost Structure (2026)
- Enrollment cost: \u20a6106.5/customer.
- Blended L3 upgrade (50/50 digital/physical): \u20a6725; 70% digital drops to \u20a6600.
- Monthly auth cost: ~\u20a610 (3M customers doing 5-phase verifications).

### 2026 Compliance Tasks (5 exceptions to close)
- Source of wealth verification.
- Email and address verification.
- Closing existing compliance exceptions.
- 24-hour transaction limits for new accounts / new devices (new CBN requirement).
- Domain accounts reporting.
- Ultimate Beneficial Owner (UBO) register.
- Business screening.
- Initiatives shipped: Deepfake detection in onboarding; Duplicate account detection for clean devices.

### Tosin Recognition
- Acknowledged: Onboarding (Money Desk), Compliance (specifically UG), Loom, Awa teams for fraud reduction turnaround.
- Past (2015): top-5 for receiving fraudulent funds, high complaint volume.
- Present: regulators use Moniepoint as reference for how to fix fraud.

### Key PRM Account Restriction Proposal (Tosin)
- Display explicit, unmissable message to BO: "Your relationship manager has placed a restriction on your account for [performance]. Contact: [number]."
- Shifts accountability from company brand to specific PRM.

### Leadership Ask (Speaker 9)
- Fix analytics \u2014 leaking events, missing events, out-of-order events. "Flying blind" without them.
- Framed as a people problem.
- Catch-all workaround implemented to capture subsequent events for conversion rate calc.

## Account Payments (Speaker 10)

### 2025 Performance
- Revenue grew **70% vs 2024**, contributing **23% of company revenue**.
- Growth predominantly promo-driven \u2014 contribution margin impact.
- Frequent downtimes \u2014 reliability cost to customer trust.
- Execution problems.

### Revenue & Margin Analysis
- 2026 revenue trajectory positive vs forecast.
- Forecast assumed **CBN tiered pricing** (\u20a610 <\u20a65K vs flat \u20a620) \u2014 not implemented, so over-forecast.
- 2025 gross margin 80\u201390% (NIBSS-heavy); end-2025 improved as ~30% traffic moved to cheaper providers.
- Peak/dip linked to T-MAPS relationship:
    - T-MAPS offered very favorable pricing, integrated with both OPay and Moniepoint.
    - OPay terminated T-MAPS during escalation with Moniepoint \u2014 "not allow competitor to profit from our transactions."
- Final contribution margin: started 2025 near 50%; dropped on company-wide promo push. 2026 forecast uses lower margin.

### 2026 Reliability Metrics (Q1 Results)
- Transfer success rate: goal 97%; Jan 97%, Feb/Mar ~98%.
- Transfer completion time: goal \u22645s; Feb/Mar 2\u20133s avg.
- **Tosin feedback:** use percentiles (P95, P99), NOT averages \u2014 averages hide worst-case, create "false hope."

### Contact Rate (new metric, goal -90%)
- Replaces "complaint rate."
- Has NOT significantly decreased \u2014 drivers:
    - Jan/Feb downtimes.
    - Customer perception: 5-second threshold \u2014 if transfer not instant, customers call. Set by fast competitors.
    - Small delays perceived as failures.
- Actual escalatable problems are low; perception is the issue.

### Provider Performance
- TMART caused very low completion rates \u2014 reverted to other providers, completion improved.
- Actively reducing traffic to unnamed IP provider with highest complaint count.

### POS Transfers
- Static account number attached to POS device.
- Revenue forecasting accurate.
- Contribution margin flat \u2014 primary cost is promos + cashback (DNS-directed payouts), not processing.
- Mid-2024 dip in contribution margin from increased promo spend.
- Speaker 10 took over Inbound + POS Transfers mid-2024; formal targets set late Dec. Completion rate reduced 30% over time.

### POS Settlement (Merchant Critical)
- Fast settlement to merchant wallet critical.
- 2-second target failed; lowest November.
- Delays attributed to CPA downtime + spikes.
- April respite expected from engineering changes.

### 2026 Three Strategic Pillars
1. Fix foundation + improve perception.
2. Drive profitable growth.
3. Strengthen trust.

### 2026 Targets
- P97 success rate at 5s (overall).
- P99 success rate at 2s (inbound).
- 98% success rate at 2s (POS transfer settlement).
- 98% success rate at 3s (POS transfer notification).

### Erroneous Transfers
- Second-largest complaint driver after successful-transfer issues.
- Self-service in build: sender blocks funds + notifies recipient for return; if unresolved, escalate to support.
- Root cause analysis:
    - User inattention or "service combat" (customers knowingly send to wrong person, then report).
    - UI changes attempted (bank account display, typing flow).
    - Evenly distributed between POS + mobile.
    - ~40% of erroneous transfers are Moniepoint \u2192 Moniepoint.
    - BO's UNO number mistaken for bank account number \u2014 UNO may be valid account for different user, transfer succeeds to wrong person.
- Process failure: team not consistently reaching out to DRM of erroneous receiver's BO/customer.
- Top Q2 priority after "yellow" items.

### 2026 Technical Initiatives
- **May 1 release ("yellow"):**
    - Bank Prediction Algorithm (goal ~90% accuracy on account-number \u2192 bank match).
    - Repeat Transfer (CX/Growth request).
- Migration to Spanner (inward service done; POS transfer service moving).
- TempoSeed Service re-architecture + platformization.
- Transaction Notoriety \u2192 Compliance.
- **ISO 20022 Reintegration** \u2014 TPN mandate; already on NPS (new NIP).
- Self-Service for Erroneous Transfers \u2014 top Q2 priority post-"yellow."
- Account Funding Options (first-time customer growth).
- Transfer Opt-in/Out (<1 sprint; Q2 deadline).
- Platformization work: June cutoff.

### UX Initiatives
- Better communicate successful transfers.
- Marketing campaign (with Stacy) on system reliability.
- Transaction tracker (like OPA): real-time status (sent / sent-to-bank / received).

## Other Items

### BRM Data Visibility (Cross-Team)
- ~1,000 individuals locked up; 6-week timeframe to address.
- BRMs on other products "invisible" in current system to managers \u2014 system evolution needed.
- BI team role in resolving.
- Gavin named coordinator via "Gavin skinny file platform" (can digest data from other sets).
- BRMs are contractors being paid while locked \u2014 urgency.

### [[MoneyCRM]] Two-Way Feedback (proposed)
- Sales network (platform's biggest customer) should rate Bernie CRM.
- Customer orientation mechanism, not ticket resolution CSAT.
- Segmentation: differentiate productive vs non-productive agent feedback.
- Quote: "If the best guys hate your software, we have a problem."
- Objection on using BRM retention as CRM effectiveness metric \u2014 too indirect.

### CAM Concept
- Allows users to check their accounts; expanding to show potential commission loss.
- [[Ezekiel]] + someone in business banking did analysis.
- Flagged as "important but half-baked" \u2014 Toby and Duffo to get the concept under control before rushing implementation.

### Process Improvements Launched
- Pipeline management module (ENS team \u2014 off spreadsheets).
- Automation for CM/JM requests (Corporate Business Banking sponsor) \u2014 off offline spreadsheets.
- 100% adoption accountability on business unit (admin team), NOT software team \u2014 software's job is enable, business's job is use.

### Healthcare Benefit Adoption
- Rolled out via Turaco (broker) \u2192 ICO (HMO).
- Low adoption \u2014 HMO offering quality issue, not lack of desire.
- Initial hospital rejection of HMO \u2014 resolved with specific ICO IDs.
- Northern Nigeria pushback: perceived as against Islamic beliefs \u2014 "education thing" (misunderstanding insurance concept). Users suggested Islamic-compliant HMO.
- Subscription management experience built in-house (platform team did not want to release BRM data to third party).
- Follow-up needed: true status of benefit (total failure / partial / mediocre-but-available).
- Rachel to meet Speaker 2 to discuss.

## Cross-References

- [[Moniepoint 2026 Leadership Retreat UK]]
- [[Moniepoint 2026 Leadership Retreat UK - Day 2 Customer Rewards Sales OKRs Growth Strategy - Summary]]
- [[Tosin Eniolorunda]]
- [[MoneyCRM]]
- [[SACE]]
- [[VAS]]