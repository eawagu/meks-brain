---
title: "Head of Engineering Interview Round 2 - Venkatesh Purushothaman - 2026-04-24 11:00 WAT"
type:
  - "source"
cssclasses:
  - "source"
source_path: Round 2_ Interview for Head of Engineering Position at Moniepoint – 2026_04_24 11_00 WAT – Notes by Gemini.md
retention_label: postgres
retention_rationale: "Hiring interview transcript for Round 2 HoE candidate Venkatesh Purushothaman — detailed technical depth across event-driven architecture, AI-augmented development at Circle.ai, Eventbrite authorization service (900M–1B daily calls, 7–12ms latency, multi-zone Redis), team building (60 engineers in 9 months, AI-bot-augmented to keep team smaller). Includes Mek's articulation of Moniepoint's AI-native company strategy and biggest tech debt (system design hindering country expansion). Future retrieval likely — referenced by hiring deliberation outcome (STRONG PROCEED), Moniepoint AI strategy, and onboarding if hired."
created: "2026-04-25T12:11:13Z"
updated: "2026-04-25T12:11:13Z"
summary: "2026-04-24 11:00 WAT Round 2 HoE interview with candidate Venkatesh Purushothaman (currently Circle.ai travel platform; ex-PayPal B2B division lead, ex-Eventbrite Authorization Service architect, ex-Innovity India). Interviewers: Pavan Venkatesan (technical), Emeka Awagu (people leadership). Highlights: AI-augmented dev (Copilot/Claude write 40-50% of code; AI bots handle 20-35% of code reviews), 60-engineer team built in 9 months, Eventbrite auth service at 900M-1B calls/day with 7-12ms latency. Mek articulated Moniepoint AI-native vision and biggest tech debt (system design hindering country-launch)."
---

## Summary

Second-round Head of Engineering interview at [[Moniepoint]] with candidate **[[Venkatesh Purushothaman]]** on 2026-04-24 11:00 WAT. Interviewers: [[Pavan Venkatesan]] (Moniepoint, accounting/inventory products \u2014 technical questions), [[Emeka Awagu]] (TeamApt CTO \u2014 people leadership). [[Chris Purkis]] (recruiting) attended. Owner: tobilola.fasanya@moniepoint.com.

Note: Candidate had previously interviewed with Moniepoint ~7 months prior for an EM/Director role (around the time [[Ravi Veluguleti|Ravi]] was hired).

## Candidate Background

- **Fintech, travel-tech, B2B/B2C/B2B2C** experience across startups + multinationals.
- **PayPal**: led B2B division; revamped global real-time merchant onboarding platform; worked on Adaptive Accounts and Payments API integrations.
- **Eventbrite**: architected the Authentication and Authorization Service (Python, event-driven, 900M\u20131B calls/day; 80% authorization, 7\u201312ms avg latency required to prevent business downtime). Multi-node multi-zone Redis on AWS East primary + AWS West failover; rerouting if latency SLA (5\u20137ms) breached. Sub-second cache refresh (token expiry 30\u201360 min). Rapid scale up/down for spiky traffic (e.g., 50,000-person event check-in).
- **Innovity (India)**: credit card swipe terminals; set up retail division; transactions/settlements/customer issues for major-store payment machines.
- **Current: Circle.ai travel platform** \u2014 marketplace (flights/hotels/cars; comparable to Expedia/Airbnb). Goal: handle 25% of global travel traffic by 2030. NOT leveraging existing org's legacy systems (.NET / Microsoft SQL Server) due to scalability issues.

## Circle.ai Architecture Details

- **AI agentic, prompt-based** system using Gemini LLM (enterprise GCP tie-up).
- **MCP** (Master Control Program) endpoint routes prompt requests to underlying services (flights, hotels) based on context.
- **Front-end**: ReactJS.
- **MCP layer**: Python-based FastAPI.
- **Microservices**: predominantly Java (95%); rest are Python FastAPI for stability-critical fintech use cases.
- **Context preservation**: local memcache for ~7 days, then pushed to other databases.
- **User identification mandatory**: users must sign in; UU ID retrieved for context/session management.

## Team Building & Productivity

- **Team size**: 55 engineers + 5\u20136 contractors (approx 60 total) fully dedicated to Circle.ai. Built **from interns to 60 in 9 months**, including senior + principal engineers.
- **Squad structure**: 4\u20137 members per squad; EMs manage 2\u20133 squads each.
- **Largest direct span of control** ever: this team. (Previously managed up to 120 as India site lead at Eventbrite.)
- **AI-augmented development**:
  - Copilot + Claude write **40\u201350% of code**.
  - AI bot agents handle **20\u201335% of code reviews**.
  - Result: smaller squads (kept the team at ~60 vs originally planned 95).
- **Quality / Operational Excellence**:
  - Rigorous quality from documentation onward; extendable + reusable code; optimized delivery speed.
  - APM with TP99 / TP95 standards.
  - Peripheral checks: CI/CD processes; daily production health checks.
- **Productivity metrics**:
  - Story points delivered per sprint/month.
  - Average PR count (expected to increase with AI-agent help).
  - Product/business: number of orders, dollar impact, revenue contribution \u2014 monitored weekly/monthly.

## Leadership Experience

### Bad Hire Recovery (former colleague)

- Hired an EM who became more of a project/delivery manager rather than the **techno-managerial 80/20 persona** expected.
- Direct conversation + coaching \u2192 individual accepted feedback, turned around performance, became more technical.

### Terminations

- Has terminated people for performance underperformance and attitude issues (Eventbrite, Expedia, current).
- Frames feedback as **"improvement areas"** rather than negative critique.
- Recent personal feedback: delegating too much; not having weekly touchpoints with stakeholders \u2014 led to costly course corrections.

### Biggest Mistake \u2014 PayPal DB Misconfiguration

- During production deployment: pixel trigger meant for low-level dedicated DB was accidentally sent to top-level master DB.
- Master DB slowed down due to millions of writes/hour.
- 12\u201317 minute war room call; collaboration with DBA team; immediate hotfix.

## Mek's Articulation of Moniepoint Context

(From [[Emeka Awagu]]'s portion of the interview \u2014 internal-facing positioning useful for brain context.)

### Moniepoint's biggest tech debt

> "**The current system design hinders easy expansion into other countries.** The company is undergoing platformization and transformation to modernize the systems to allow for **country launches within a few weeks or a month**."

### Moniepoint as fully-remote organization

- No geographical affinity except payments roles (require Nigerian-ecosystem understanding).
- Typical org: PM \u2192 business leader; EMs + Head of Engineering.
- **Primary time zone: WAT (GMT+1)** \u2014 India-based engineers work ~12:30 PM\u201310:30 PM IST.

### Moniepoint AI-native strategy

- **Transitioning into a fully AI-native company.** First cohorts: product, engineering, design.
- AI integration covers product management \u2192 engineering specs \u2192 deployment.
- AI handles: creating artifacts, translating product chain specs into engineering specs, deployment.
- **Humans don't directly interact with code or Jira** in the future state.
- **Human oversight via "gates"** to ensure correct architecture / code.
- **Current state: NOT YET running fully autonomous indefinite agents.** Early-stage; immediate focus is the **"harness" around the AI** to ensure it performs as expected. **Majority of current work** is on this harness.
- **Goal: AI integrated into entire company's workflows (incl. finance and HR) within 12 months.**

## Discussion Highlights

- Pavan asked the candidate's adjustments needed for Moniepoint's hands-on Head-of-Engineering role. Candidate clarified he is still hands-on with system design and coding (Python FastAPI + NodeJS).
- **First goal upon joining**: understand the specific division he is joining; set 30/60/90-day plan; rapidly upskill to gain team's respect; design scalable + extendable products supporting Moniepoint's regional expansion (months \u2192 weeks).
- Candidate asked which of Moniepoint's four business groups the position is for; Pavan deferred until later in the cycle (assess strong domain match first). Listed potential roles: payment gateways, lending, platformization, internal tools.

## Next Steps

- [[Venkatesh Purushothaman]] \u2014 prepare ramp-up plan: analyze personal skill gaps + necessary refinements based on the final assigned position; set 30/60/90 day goals for self + team to accelerate performance.

## Entities Mentioned

People: [[Venkatesh Purushothaman]] (candidate), [[Pavan Venkatesan]], [[Emeka Awagu]], [[Chris Purkis]], [[Tobilola Fasanya]], [[Constantinos]] (prior system-design interviewer)

External companies: [[PayPal]], [[Eventbrite]], [[Expedia]], [[Innovity]], [[Circle.ai]], [[GCP]]

Tools / tech: [[Copilot]], [[Claude]], [[Gemini LLM]], [[ReactJS]], [[FastAPI]], [[Redis]], [[AWS]]

System: [[Gemini]]

## Concepts

- [[Head of Engineering hiring]]
- [[AI-native company strategy]]
- [[AI-augmented development]]
- [[Techno-managerial 80/20 persona]]
- [[Moniepoint country-launch tech debt]]
- [[Moniepoint AI harness]]
- [[Authorization service architecture]]
- [[30-60-90 day plan]]
