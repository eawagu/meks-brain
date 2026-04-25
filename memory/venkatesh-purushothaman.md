---
title: Venkatesh Purushothaman
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-25T12:15:22Z"
updated: "2026-04-25T12:15:22Z"
summary: Head of Engineering candidate — STRONG PROCEED outcome from 2026-04-24 deliberation. Currently leads Circle.ai travel-platform engineering; ex-PayPal B2B division, ex-Eventbrite Authorization Service architect. Demonstrated AI-augmented dev (Copilot/Claude 40-50% code) and 60-eng team built in 9 months.
---

## Stub

Venkatesh Purushothaman is the **strong-proceed Head of Engineering candidate** at [[Moniepoint]] (per the 2026-04-24 deliberation) — the top contender for the role.

Previously interviewed at Moniepoint ~7 months prior for an EM/Director role (around the time [[Ravi Veluguleti|Ravi]] was hired).

## Profile

- **Fintech, travel-tech, B2B/B2C/B2B2C** experience.
- **PayPal**: led B2B division; revamped global real-time merchant onboarding; Adaptive Accounts and Payments API integrations.
- **Eventbrite**: architected Authentication and Authorization Service (Python, event-driven, **900M–1B calls/day**, **7–12ms avg latency**, multi-zone Redis on AWS East primary + AWS West failover; sub-second cache refresh; 50K-event-spike scale).
- **Innovity (India)**: credit-card swipe terminals; retail division.
- **Currently: Circle.ai travel platform** — marketplace (flights/hotels/cars; goal 25% of global travel by 2030). Built **60-engineer team from interns in 9 months**. **Largest direct span**: 60. Previously managed up to 120 as India site lead at Eventbrite.

## Circle.ai Architecture

- AI agentic, prompt-based system on **Gemini LLM** (GCP enterprise).
- **MCP** endpoint for prompt routing.
- ReactJS front-end; Python FastAPI MCP layer; ~95% Java microservices below.
- Local memcache (~7d) for context preservation; mandatory user sign-in.

## AI-augmented productivity (key signal for Moniepoint)

- **Copilot + Claude write 40–50% of code.**
- **AI bot agents handle 20–35% of code reviews.**
- Result: smaller squads (60 vs originally planned 95).
- Productivity metrics: story points / sprint, average PR count.

## Operational Excellence approach

- TP99 / TP95 APM standards.
- Daily production health checks; CI/CD discipline.
- Story-points + business-metrics dual tracking.

## Leadership track record

- **Bad-hire recovery**: turned around an EM who was acting as a project manager rather than the **techno-managerial 80/20 persona** — via direct conversation + coaching.
- **Has terminated** for performance + attitude (Eventbrite, Expedia, current).
- **PayPal DB-misconfiguration war story**: pixel trigger sent to master DB instead of dedicated DB; 12–17 min war room call + DBA hotfix.
- **Personal recent feedback**: delegating too much; not having weekly stakeholder touchpoints — led to costly course corrections.

## Outcome (Apr 24 deliberation)

**STRONG PROCEED**. "Exceptional technical depth across multiple domains — event-driven architecture, high-scale authorization systems, payment platform design. Clear hands-on involvement in design, team building, leadership."

## Next Steps

- [[Chris Purkis]] to conduct final offer deliberation with executive stakeholders.
- Candidate to prepare ramp-up: analyze personal skill gaps; set 30/60/90 day goals.

## Sources

- [[Head of Engineering Interview Round 2 - Venkatesh Purushothaman - 2026-04-24 11:00 WAT]]
- [[Head of Engineering Hiring Deliberation - 2026-04-24 12:00 WEST]]
