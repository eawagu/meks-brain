---
title: TeamApt MANCo Meeting - 31 March 2026
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt Limited - MANCo Meeting – 2026_03_31 09_52 WAT – Notes by Gemini.md
retention_label: postgres
retention_rationale: Multi-stakeholder management committee transcript with named decisions, 26 explicit next-step action items, regulatory milestones (CBN, ISO, NDPA), bank integration statuses, financial figures (Feb ₦318M loss, ₦777M revenue), and engineering migration milestones — dense referenceable detail across compliance, engineering, business development, and HR that the source-page summary necessarily compresses.
meeting_date: 2026-03-31
drive_url: "https://docs.google.com/document/d/11nwTi3pDGkS4Ky3_pw59wFAvsInfaa6naZyj2jBIx78/edit"
created: "2026-04-27T05:46:30Z"
updated: "2026-04-27T05:46:30Z"
summary: TeamApt Management Committee meeting (Mar 31, 2026) covering bank integration progress, ISO/CBN audit readiness, Harness migration completion, account-switch traffic on Outpost, BVN/AML/ATM regulatory updates, ₦318M February loss with break-even projected by end Q2, and 26 named action items.
---

## Summary

TeamApt Management Committee (MANCo) meeting held March 31, 2026 (09:52 WAT). Operations covered bank integration statuses (Sterling, Union, Fidelity, Zenith, Premium Trust pending consent letters / settlement accounts; ATS integration required for [[Juliana]] go-live with Sterling). Compliance reported "Largely compliant" CBN IT standards rating (best possible before open bank registry ready). Engineering reported [[Harness Migration]] **100% complete** (no more Jenkins/legacy systems), Account Switch traffic migrated to [[Outpost]] (cloud as DR site), and Edge Monitoring (Cloudflare/Nginx) prioritized for full real-time visibility. Finance reported February loss ₦318M with break-even projected by end of Q2. 26 explicit next-step action items recorded.

## Key Points

### Operations & Bank Integrations
- **Recruitment underway** for operations and representation teams; only 1 position remaining in representation team. Reconciliation builds and operations associate roles also pending. Inbound team for regulatory requirements + DD platform go-live considered (not budgeted; ongoing HR conversation, target end of Q2).
- **Bank integrations:** Union Bank letter received, awaiting settlement accounts; SCMB consent letter execution pending; Fidelity provided letter, awaiting accounts; Zenith ongoing integrations.
- **ATS Integration for Juliana go-live:** required for Juliana Sterling Bank plug-in; awaiting consent letter from Sterling. Premium Trust awaiting change management approvals.
- **ITSM Adoption:** improving incident management, problem management, change tickets. Portal updates with team-based categorizations.
- **ZenDesk migration complete** including WhatsApp channel. Training initiatives for agents on Monifi adjacents (domestic switching, DD).
- **Direct Debit Recovery:** [[Cowrywise]] DD exposure ₦159M earlier this year; ₦124M recovered; ₦35M outstanding (customer accounts not funded). Monifi recovery 77%.
- **[[Monnify]] Reconciliation:** down from 13–15 to 9 unreconciled accounts; one major Sterling Bank account near resolution. International acceptance deployment ongoing.

### Performance Metrics (February 2026)
- **[[PTSA Compliance]] February 2026:** Volume led by [[Access Bank]] (37.7M), UBA (36M), GTB (25.7M). Total volume **186.75M, value ₦4.45T** (-12.9% volume, -16.19% value vs January, attributed to fewer days). Success rate 99.32%, avg response 2.2s. Keystone deep approval rate 79.59%. Largest failure contributors: Providers (15.08%), Keystone, Parallax (internal bank issues).
- **Account Switch:** 100% success rate; +6.14% volume MoM.
- **[[Direct Debit Mandate Performance]]:** weekly mandate activation 1,206 → 1,828 by month-end, Access Bank dominant. 96% mandate success, 38–43% approval, total volume >30K, value ₦50.4B.
- **Web ATS:** 98.43% success, 1,274 transactions, Access Bank 58% of authentication value. Authorization ~100%, 1–2.5s response.
- **[[Monnify]] Payment Gateway:** disbursements ~100%, virtual accounts led by Money Point (5.9M transactions).
- **ITSM:** Approved change requests 19→21 (4-5 weekly). Reported incidents 220→233 February (external incidents most frequent). SLA performance improved.

### Infrastructure / Engineering
- **[[Edge Monitoring]]:** [[Damilare Ogunnaike]] noted most reports based on database data; full real-time edge visibility (Cloudflare, Nginx) lacking. [[Tolu Aina]] flagged Cloudflare access constraints, can ship Cloudflare metrics to environment with cost. Read-only access to SRE team proposed. [[Ibukun Atoyebi]] said drive with urgency.
- **[[Outpost Migration]]:** Account switch traffic migrated to Outpost (on-premise resources, [[Cloudflare]] cloud as DR site). CDC pipeline syncs DB Outpost → cloud. Cost optimization saved 10–12%.
- **Tertiary Link:** plan to onboard ISP as standby VPN carrier (current routes: VPN to partners + direct connect to AWS).
- **Infrastructure Readiness:** CBN infrastructure audit prep for license renewal (license expires August).
- **Engineering Updates ([[Ravi Veluguleti]]):** [[Harness Migration]] **100% complete** (no more Jenkins/legacy). Java 21 migration 16% (Q2 close-out). Archiving strategy OKR near completion (fee service implementation live this week).
- **Switch Enhancements:** Automated reversals complete, QA tested, planning go-live. CoralPay provider-specific integration carved out to different instance, deployed to production, traffic in ~1 week. Code coverage measurement started for most T-MAP services (target 70-80%).
- **DB Dissection:** target architecture + timelines approved; year-long project, execution Q2.
- **Reversal Deployment:** ATS needed in addition to Switch; documentation changes start, then bank-side deployment.

### Compliance / Audit / Legal / Finance
- **Compliance ([[Adefemi Opeogun]]):** DC narration corrected on 8 banks, 3 ATS banks pending. 11 income settlement account name issues — 10 regularized, only EcoBank remaining. SEAT report submitted before Mar 31 deadline. Board evaluation return submitted.
- **Audit Rating:** **"Largely compliant"** CBN IT standards rating (best possible before open bank registry ready).
- **Regulatory Returns:** Agent/merchant operations + fraud-staff info submitted. Annual data protection act compliance audit returns 2025 filed Sunday. **CBN new AML systems regulation — compliance roadmap due June 10.**
- **CBN BVN Guidelines:** BVN enrollment restricted to 18+, only one phone number amendment per BVN. Liveness checks for online account opening, mobile apps bound to one device. **20K Naira outflow cap in first 24h on newly activated device.**
- **CBN ATM Operations:** Full domestic processing/switching, mandatory interoperability, enhanced security standards.
- **[[ISO Standards Audit]]:** Scheduled April 20 (5th standard, OSS). Mock audit ongoing with OPEX team.
- **Finance ([[Olanike Adeyemi]]):** Revenue **₦777M February** (decline from January, fewer days, Monify+Switch reduced income). Other income +25% (interest income up). Costs -16%. Unrealized FX gain ₦32M. **February loss position ₦318M (slight improvement from January, projected break-even by end of Q2).**
- **2025 Audit Submission:** Final report submitted to CBN end of day Mar 31.
- **Legal ([[Precious Maduwuike]], stepping in):** Board evolution 2025 submitted. Policy harmonization ongoing. Contract requests 73 (46 signed) February vs 105 (84 signed) January. Litigation: 8 new lawsuits February, 4 assigned, 4 concluded.
- **Internal Audit ([[Olufemi Agbaje]]):** 2026 plan ready, manual policy manual for next board audit committee. Financial audit moved from current month to April 7 due to AFA submission. **Internal audit team taking over MFB declaration letter confirmation (effective April 4).** Audit plan needs 3 additional personnel; April start unrealistic, May more likely (per [[Ibukun Atoyebi]]).
- **Upcoming April Audit Focus:** User access management + change management (IT audit kickoff). Finish ongoing money-for-operations audit. Begin financial audit for finance department.

### Business Development / Project Delivery
- **Direct Debit Push:** [[Wema Bank]] internal project planning + approvals after successful technical meeting 2 weeks prior, traction expected April. Providers Bank approval pending. [[Access Bank]] discussions on DD platform onboarding.
- **Account Switch:** [[FCMB]] SLA under legal+product review. First Bank, Ecobank reviewing proposals. NSS — GL accounts created for Zenith, Union, Peter Bank.
- **Project Delivery:** Web ATS (card not present) **complete and live**, pending SLA signing. DD implementation in test env at unnamed bank, due April 26. FCMB mandate cancellation customization stalled (bank VPN access renewal). Money Point integration **62% progress** (priority, complete by April 2026). Premium Trust UAT complete, awaiting CAB approval. Zenith engagement on vulnerability + API testing post-OTP-resolution.
- **Absolute Clearing:** Pilot with Fidelity Bank, hope to complete first 2 weeks of April.
- **UPSL Account Switch:** Moved to Q2, re-engaging Money Point.
- **Sterling Bank Account Switch:** Board resolution letter signed (required for internal GL account creation).
- **Payment Products:** **3DS integration with [[Mastercard]] complete**, deployment to production ongoing. [[Visa]] issuer processing certification opened, system configuration ongoing. Mastercard+Visa dispute management certification commencing.
- **ATS Volume:** Apt Pay on ATS ~37%. Reversal implementation complete, working on Zenith production + Money Point pilot. Funds Transfer settlement live in Union+Keystone, working on Assets Bank whitelisting + GTB account opening.
- **[[Juliana]]:** Back office for DD on production underway. Polaris pending outage resolution, Fidelity newly concluded. Card switch only with Pure currently. Account Switch — Sterling 80%, Fidelity 90% nearing go-live. ISO 222 production setup ongoing. Banks not on ATS can integrate via [[Coral Pay]] / [[HabariPay]] partnerships.
- **[[Monnify|Monify]]:** **131% of budgeted revenue February (₦2.5T transaction value).** 91.2% physical address completion top 1,000 merchants. New monitoring rules vs Ponzi schemes. **Pay engagement officially terminated — loss of ~1M daily transactions.** Sign-up integration with Money Point a major priority. Stopping further virtual account expansion (incl Access Bank VA project). Overdraft facilities for Monify disbursement to qualified merchants in partnership with Money Point loans team.
- **Marketing:** New Monify website ready before mid-April. Referral program framework drafting.
- **Engineering Manager Resignation:** Head of engineering steps in until replacement found.

### HR / People
- **Headcount:** 250 employees end of February.
- **Q4 2025 Performance Review:** 9.2% promoted, 35.6% salary review March 2026.
- **Employee Distribution:** Majority Nigeria, then India, Pakistan, Canada, Kenya, UK, 1 Australia.
- **Gender:** 61% male, 38.2% female. 7 women in technology roles.

## Next Steps (Action Items)

| Owner | Action |
|---|---|
| [[Tolulope Obianwu]] | Follow up with Charles (Recovery Team) re ₦35M direct debit exposure recovery closure (Cowrywise) |
| [[Oladapo Onayemi]] | Compare January and February debit mandates activation figures with growth percentages |
| [[Oladapo Onayemi]] | Schedule sync call: tools needed for edge monitoring implementation |
| [[Damilare Ogunnaike]] | Drive edge monitoring with the group (Makers end, Project Phoenix) |
| [[Adefemi Opeogun]] | Close DC narration issues for Union Bank, Stanbic, Fidelity ATS banks |
| [[Adefemi Opeogun]] | Resolve name correction for EcoBank income settlement account |
| The group | Advise team: all members check BVN ensuring phone numbers current |
| [[Tolu Aina]] | Include cost optimization savings figures in next report |
| [[Ravi Veluguleti]] | Start ATS documentation changes for necessary deployment tasks |
| [[Olanike Adeyemi]] | Reach out to [[Olufemi Agbaje]] with PTSP income updates |
| [[Olanike Adeyemi]] | Submit 2025 audit to CBN today, as early as possible |
| The group | Complete Polaris SLA sign off internally, send to bank for counter-signing |
| [[Kevin Ng'Eno]] | Create Zenith Bank GL accounts on the switch portal |
| [[Opeyemi Animashaun]] | Re-initiate engagement with Wema Bank on outstanding pricing challenges |
| [[Felix]] | Sign SLA for web ATS project, share with bank for counter-signing |
| [[Opeyemi Animashaun]] | Follow up Union Bank — check status of last engagement |
| [[Damilare Ogunnaike]] | Review CBN instant payment verification policy with Compliance team before July deadline |
| [[Damilare Ogunnaike]] | Test all USD/international payment processing systems |
| [[Damilare Ogunnaike]] | Launch new Monifi website live before mid-April |
| [[Damilare Ogunnaike]] | Draft policy framework for referral program |
| [[Damilare Ogunnaike]] | Schedule breakout session: Money Point signup integration initiative discussion |
| [[Constance Onyeji-Jarret]] | Recruit Engineering Manager (replacement for resigned role) |
| [[Olufemi Agbaje]] | Share internal audit policy manual with secretary |
| The group | Follow up with departments for remediation of audit observation exceptions |
| [[Olufemi Agbaje]] | Sync meeting with Tulu re kickstarting IT audit section |

## Adjournment

Meeting ran 16 minutes late. [[Ibukun Atoyebi]] thanked participants. [[Abdulgafar Obeitor]] moved adjournment, [[Olufemi Agbaje]] seconded.

## Entities Mentioned

### People (attendees / referenced)
- Convenors / chairs: [[Ibukun Atoyebi]], [[Abdulgafar Obeitor]]
- Department leads / actioned: [[Tolulope Obianwu]], [[Damilare Ogunnaike]], [[Tracy Ojaigho]], [[Daniel Ojinaka]], [[Ravi Veluguleti]], [[Tolu Aina]], [[Adefemi Opeogun]], [[Precious Maduwuike]], [[Olanike Adeyemi]], [[Olufemi Agbaje]], [[Constance Onyeji-Jarret]], [[Kevin Ng'Eno]], [[Oladapo Onayemi]], [[Opeyemi Animashaun]], [[Babatunde Okufi|Tunde Okufi]], [[Dennis Ajalie]], [[Emeka Awagu]], [[Frank Atashili]], [[Felix Ike|Felix]]
- Other attendees: Tayo Mustapha, Emmanuella Edeh, Tracy Ojaigho, Okechukwu Eke, Oluwatoyin Ogunledun, Nora Chukwurah-Adeyinka, Oladapo Onayemi, Lateefat Adedeji-Oyedeji, Blessing Abel-Oguche, Taiwo Ogundipe, Idris Aliyu

### Organizations / banks / partners
- [[TeamApt Limited]], [[Moniepoint]] / Money Point, [[Monnify]] (also "Monify"), [[CBN]], [[NDPA|NDPA / Data Protection Commission]], [[ISO]]
- Banks: [[Sterling Bank]], [[Union Bank]], [[Fidelity Bank]], [[Zenith Bank]], [[FCMB]], [[Eco Bank|EcoBank]], [[Wema Bank]], [[Polaris Bank]], First Bank, [[Premium Trust Bank]], [[Access Bank]], [[Stanbic Bank]], Keystone Bank, GTB, UBA, Providers Bank, Peter Bank, Assets Bank
- Card schemes / processors: [[Mastercard]], [[Visa]], [[Coral Pay]], [[HabariPay]], Pure
- Counterparties: [[CowryWise]], [[Pay]] (engagement terminated)
- Systems / platforms: [[Juliana]], [[Outpost]], [[Cloudflare]], [[Nginx]], [[Harness]], [[Jenkins]], [[Java 21]], [[ZenDesk]], [[NRS Transaction Monitoring System]], [[Project Phoenix]]

## Concepts

- [[PTSA Compliance]]
- [[Direct Debit Mandate Performance]]
- [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]]
- [[ATS Integration]]
- [[ITSM Adoption]]
- [[Edge Monitoring]]
- [[Outpost Migration]]
- [[Harness Migration]]
- [[Java 21 Migration]]
- [[DB Dissection]]
- [[Code Coverage Measurement]]
- [[ISO Standards Audit]]
- [[CBN AML Systems Regulation]]
- [[CBN BVN Guidelines (April 2026)]]
- [[CBN ATM Operations Guidelines]]
- [[Internal Audit Plan 2026]]
- [[3DS Integration]]
- [[Visa Issuer Processing Certification]]
- [[Monnify Sign-up Integration with Money Point]]
- [[Monnify Pay Engagement Terminated]]
- [[Monify Referral Program]]
- [[MFB Declaration Letter Confirmation]]
