---
title: "TeamApt Weekly Team Meeting - 2026-04-22 16:59 IST"
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt _ Weekly Team Meeting – 2026_04_22 16_59 IST – Notes by Gemini.md
retention_label: postgres
retention_rationale: TeamApt weekly engineering meeting with Java 21 migration blockers (Cosmos library), specific vulnerability IDs (615, 791, 893, 891, 895), Phoenix restructuring timing (Q3 org shapes, June complete), security-team performance criticism (Access Bank 200 vulns, Checkmarx tooling consideration). Aligned decision on V615 postponement. Future retrieval likely on migration tracking, vulnerability remediation timeline, and security-team posture.
created: "2026-04-25T11:56:24Z"
updated: "2026-04-25T11:56:24Z"
summary: "2026-04-22 16:59 IST TeamApt weekly team meeting (owner Ravi Veluguleti). Java 21 migration delayed by Cosmos library dependency \u2014 wrapper-class strategy from Wycliffe's team. Vulnerability remediation: V615 postponed until system stabilizes; Monify domain vulns consolidated to Prateek; V791 done, awaiting retest. Phoenix restructuring complete by June; new org shapes around Q3. Yasir raised security-team tooling/throughput concerns (Access Bank surfaced 200 vulns post-internal-scan); Checkmarx procurement under consideration."
---

## Summary

TeamApt weekly team meeting at 2026-04-22 16:59 IST. Owner [[Ravi Veluguleti]]; attendees [[Wycliffe Ochieng']], [[Vaibhav Bansal]], [[Priya Chawla]], [[Yasir Syed Ali]], [[Olawale Adegboyega]], [[Prateek Gupta]], [[Ravi Veluguleti]], [[Ketan Dhamasana]], [[Emeka Awagu]]. Migration strategy and vulnerability management discussions preceded restructuring updates and security-team performance review. One aligned decision: vulnerability 615 remediation postponed until system stabilizes to prevent further transaction failures.

## Key Points

### Java 21 Migration

- **Cosmos library dependency** delaying remaining 50% of services. Services not dependent on Cosmos already migrated.
- Two resolution paths surfaced:
  1. **Replace with FX-team Java 21 flavor** \u2014 [[Prateek Gupta]] noted Moneyoint FX team has already created a Java 21 flavor of Cosmos; replacing the existing library should resolve the issue.
  2. **Wrapper class** \u2014 [[Wycliffe Ochieng']]'s team built a wrapper around the library and offered to show [[Priya Chawla]] their implementation. Wrapper is durable if libraries are versioned (can continue using a specific version even if core libraries move).
- [[Priya Chawla]] to connect with both Wycliffe and Prateek for further details.
- Offline follow-up: [[Ravi Veluguleti]] to discuss [[Ken]]'s Java 21 migration progress.

### Vulnerability Management

- **V893 + V891** (assigned to "dam"): Prateek unfamiliar; suggested they belong to Cards & Accounts team. Prateek to check and potentially raise ticket with [[Michael]] to rotate credentials. Ravi suggested services might be stale services planned for shutdown.
- **Monify domain vulns** (atm.moneyifi, app.moneyify.com): incorrectly assigned to [[Ketan Dhamasana]]. Prateek consolidated ownership for all "moneyify" vulnerabilities; will investigate and provide comments. Ketan noted the Inflow Sac filter only reported three issues.
- **V895** (account-related): rate limiting + auth applied to v2 endpoint; v1 still active because merchants are using it.
- **V615** (account-related): not addressed due to system instability caused by [[CBA]] issue \u2014 requires downtime currently being avoided.
  - **ALIGNED**: V615 remediation postponed until system stabilizes to prevent further transaction failures.
  - Action: Prateek to develop a schedule plan outlining when to pick up V615, considering required downtime.
- **V791** (3D server): done; needs to be retested by infosec team. Wycliffe owns retest request.
- **Immediate-attention vulnerability**: Olawale confirmed already fixed but still flagged \u2014 URL was recently pointed to latest version pod. Olawale to confirm status and mark for security retest.

### Restructuring & Recruitment

- Recruitment frozen until [[Project Phoenix]] restructuring takes complete shape.
- Currently handling both [[TMAP]] and the **Transaction Switching and Processing Platform (TSP)**.
- Phoenix goal: build a single TSP platform to serve all markets (UK, Nigeria, potentially Kenya) by replacing existing switchers.
- New organizational structures expected to take shape **around Q3**, with **complete restructuring by June**.

### PTSP Project Future

- [[Priya Chawla]] asked about PTSP future and current code in light of new platform preparations.
- Ravi has no visibility on whether the project will stop. Since the team is continuing work, speculated the product might stay, potentially moving under TSP. **No final decision communicated.**

### Team Social Budget

- [[Yasir Syed Ali]] raised the topic of budget for small-scale team parties or individual fun.
- Large-scale team-party budget unavailable due to growth and costs.
- Ravi to investigate availability of budget for team parties or individual reimbursement options.
- Yasir clarified suggestion is **not** bringing everyone together but rather budget for individual / small team activities.

### Security Team Performance

- [[Yasir Syed Ali]] raised concerns: security team is slowing things down and not equipped with the right tools.
- **Banks discover vulnerabilities the internal security team misses** \u2014 [[Access Bank]] raised 200 vulnerabilities; total increased after security team went on a call with them. [[Zenith Bank]] also raising different vulnerabilities.
- Wycliffe agreed: likely a tooling difference \u2014 banks discover new vulnerabilities after internal scans complete.
- Ravi: will follow up with [[Latifa]]; will escalate the discussion if zero changes occur within 1 week.
- **Tool procurement under consideration**: group is planning to get [[Checkmarx]], described as a better tool.
- Action: Ravi to contact Latifa regarding stale vulnerability cleanup on Team App; provide follow-up update.

## Decisions (ALIGNED)

- **Vulnerability 615 remediation postponed** until the system stabilizes to prevent further transaction failures.

## Next Steps

- [[Priya Chawla]] \u2014 connect with [[Wycliffe Ochieng']] and [[Prateek Gupta]] on Cosmos library version + wrapper-class implementation.
- [[Ravi Veluguleti]] \u2014 follow up with [[Ken]] on Java 21 migration progress (offline).
- [[Prateek Gupta]] \u2014 investigate V893 / V891; raise [[Michael]] ticket to rotate credentials if necessary.
- [[Prateek Gupta]] \u2014 investigate all Monify / HDK.com vulnerabilities; provide comments.
- [[Prateek Gupta]] \u2014 develop schedule plan for V615 fix.
- [[Olawale Adegboyega]] \u2014 confirm immediate-attention vulnerability fix; mark security retest.
- [[Wycliffe Ochieng']] \u2014 ensure V791 (3D server) marked for security-team retest.
- [[Ravi Veluguleti]] \u2014 investigate budget availability for team parties / individual reimbursement.
- [[Ravi Veluguleti]] \u2014 remind [[Latifa]] about security team delays; escalate if zero changes within 1 week.
- [[Ravi Veluguleti]] \u2014 contact [[Latifa]] regarding stale vulnerability cleanup on Team App.

## Entities Mentioned

People: [[Ravi Veluguleti]], [[Wycliffe Ochieng']], [[Vaibhav Bansal]], [[Priya Chawla]], [[Yasir Syed Ali]], [[Olawale Adegboyega]], [[Prateek Gupta]], [[Ketan Dhamasana]], [[Emeka Awagu]], [[Latifa]], [[Michael]], [[Ken]]

External / banks: [[Access Bank]], [[Zenith Bank]]

Tools / systems: [[Cosmos library]], [[Checkmarx]], [[Monify]], [[CBA]]

Programs: [[Project Phoenix]], [[TMAP]], [[Transaction Switching and Processing Platform]], [[PTSP project]]

System: [[Gemini]]

## Concepts

- [[Java 21 migration]]
- [[Vulnerability management]]
- [[Security team performance]]
- [[Phoenix restructuring]]
- [[Recruitment freeze]]
- [[Team social budget]]
