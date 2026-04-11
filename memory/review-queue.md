---
title: review-queue
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: review-queue.md
summary: A triage queue of ambiguous signals from Slack, email, Jira, and calendar sources that the exec assistant could not confidently classify, covering TeamApt operational incidents, personnel decisions, and compliance events from late March–April 2026.
---

## Summary

This file is the exec assistant's review queue — items flagged because routing was ambiguous or context was insufficient for confident classification. Entries span April 1–11, 2026, drawn from Slack (#aptpay-tactical-team, #teamapt-tech-operations, #teamapt-4-hr), email, Jira, and Google Calendar. Topics include a potential new commercial pipeline at Stanbic via [[Frank Atashili]], multiple settlement failures, a security breach rumor touching [[Remita]], compliance readiness concerns for [[GoSubscribe]] bank expansion, and regulatory exposure from BRM employees on [[TeamApt]] payroll not yet transferred to [[Moniepoint MFB]] entity.

## Key Points

- [[Frank Atashili]] mentioned selling "Juliana-Account and Centralized Clearing & Settlement" to [[Stanbic IBTC Bank]] as a solution — possible new commercial pipeline, stated casually, unclear if formal commitment.
- [[David Oseji]] filed emergency deployment to remove "DCIR" from [[ATS]] narration — possible broader compliance directive affecting other bank integrations beyond Stanbic.
- [[Daniel Ojinaka]] flagged: same threat actor who breached [[Sterling Bank]] reportedly reached [[Remita]] (DarkWebInformer post on X). [[TeamApt]] exposure to Remita unclear.
- [[Damilare Ogunnaike]] queried whether [[TeamApt]] could join an unidentified meeting/session — context unclear.
- Three settlement P1 items (Fidelity Bank, Zenith Bank, Union Bank) entered Technical backlog simultaneously at Jira MPRC-7004 and MPRC-7031 — possible systemic settlement reliability issue.
- [[Ibukun Atoyebi]]'s standalone message "We are not yet ready" likely signals [[GoSubscribe]] bank expansion compliance readiness is blocked.
- Head of Engineering deliberation meeting (Apr 3) collapsed — [[Felix Ike]], [[Chris Purkis]], [[Pavan Venkatesan]], [[Tosin Agagu]], [[Adegoke Obasa]] all declined. Only [[John Ojetunde]] accepted; [[Alex Adeyemo]] tentative.
- TDSD-6506: Emergency firewall upgrade (v7.3.1.2 → v7.6.2) — CTO approval may still be pending despite informal email approval.
- DCIR monitoring alert at 11.11% API failure rate at 03:04 WAT Apr 5 — possible trailing signal from Access Bank RC91 or early DCIR instability.
- [[June Johnson]] sent Juliana Backoffice Update (TACHA) to Dennis/Frank/Emeka/Ravi with unread PDF attachment — content unknown.
- FCMB DCIR portal inaccessibility (TDSD-6430) attributed to "Low balance" — possible settlement account shortfall at FCMB blocking portal access.
- Three [[CoralPay]] route failures in 24h (Apr 4) — pattern may indicate systemic instability.
- [[Dennis Ajalie]] flagged offline BRM employees still on [[TeamApt]] payroll but not transferred to MFB entity — regulatory accountability exposure on CBN reporting and jurisdiction.
- WEMA Bank settlement failure (TDSD-6446) on same day as Merchant Settlement failures — broader settlement integrity exposure flagged.
- FCMB BIN intermittent failures via NIBSS PTSA (TDSD-6445) concurrent with FCMB ATS RC91 — possible bank-wide FCMB infrastructure issue.
- NIBSS PTSA: three P1 outages in 24h (Apr 8) with zero Jira tickets filed — process failure signal.
- Polaris Bank settlement (TDSD-6493) filed Apr 10 with zero comments for 28+ hours.
- Sterling Bank ATS (TDSD-6385) administratively closed without resolving the underlying suspension.

## Entities Mentioned

- [[TeamApt]]
- [[Frank Atashili]]
- [[David Oseji]]
- [[Daniel Ojinaka]]
- [[Damilare Ogunnaike]]
- [[Ibukun Atoyebi]]
- [[Dennis Ajalie]]
- [[Emeka Awagu]]
- [[Ravi]] (TeamApt)
- [[June Johnson]]
- [[Qazim Adedigba]]
- [[Oladapo Onayemi]]
- [[Feyisayo Oyeniran]]
- [[Felix Ike]]
- [[Chris Purkis]]
- [[Pavan Venkatesan]]
- [[Tosin Agagu]]
- [[Adegoke Obasa]]
- [[John Ojetunde]]
- [[Alex Adeyemo]]
- [[Innocent Nwaokorie]]
- [[Constance Onyeji-Jarret]]
- [[Ezinne Okoro]]
- [[Abraham Isinguzoro]]
- [[Babajide Ojoboorun]]
- [[Stanbic IBTC Bank]]
- [[Sterling Bank]]
- [[Remita]]
- [[FCMB]]
- [[Zenith Bank]]
- [[Fidelity Bank]]
- [[Union Bank]]
- [[WEMA Bank]]
- [[Polaris Bank]]
- [[CoralPay]]
- [[NIBSS]]
- [[Paystack]]
- [[Moniepoint MFB]]
- [[GoSubscribe]]
- [[ATS]] (Automated Transfer System)
- [[DCIR]]
- [[Fumbi Lawrence]]

## Concepts

- [[Settlement Failure]]
- [[P1 Incident Management]]
- [[RC91 Error Pattern]]
- [[Regulatory Compliance]] (CBN)
- [[Signal Triage]]
- [[BRM Regulatory Exposure]]
- [[Jira Documentation Process]]
- [[Head of Engineering Hiring]]