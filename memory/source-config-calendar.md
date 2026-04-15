---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: Signal source registration and filtering directives for Google Calendar (GCal MCP).
updated: "2026-04-15T09:17:10Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-15T09:09:00Z"
---

## Connection

- **Connector:** GCal MCP
- **Primary calendar:** emeka.awagu@teamapt.com (owner, Africa/Lagos timezone)
- **Secondary calendars:** eawagu@gmail.com (writer), frank.atashili@teamapt.com (reader)
- **Reference calendar:** Holidays in Nigeria
- **Access patterns:**
  - `gcal_list_events` — delta detection, scan for new/changed events since last_processed
  - `gcal_get_event` — full event detail when flagged
  - `gcal_find_my_free_time` — schedule analysis for overload detection

## Directives

### Signal types ordered by priority

**1. Declined RSVPs on meetings I organized:**
When a direct report or key participant declines a meeting I organized, surface immediately. A single decline is informational. Three or more declines from the same person within 60 days on recurring 1:1s → flag as a pattern (possible capacity issue or disengagement signal).

**2. New invites requiring decision:**
New meeting invites where I haven't responded. Prioritize by sender:
- Dennis / board members / regulatory → surface immediately
- Direct reports → surface in next briefing
- All others → batch in daily digest
- Include: meeting title, organizer, time, whether agenda/doc is attached

**3. Meeting cancellations:**
Meetings I was attending that get cancelled. Surface if:
- The cancellation frees time in the next 24 hours (opportunity signal)
- The meeting was a recurring governance/review meeting (governance gap signal)

**4. Agenda-less meeting detection:**
Meetings within 48 hours that have no description, no attached document, and no agenda link in the body. Flag with suggestion: request agenda or consider declining. Skip this check for known recurring meetings that don't use calendar descriptions (e.g., daily standups).

**5. Back-to-back overload detection:**
Days with less than 15 minutes gap between meetings for 3+ consecutive meetings. Flag as fatigue risk in the morning briefing for that day. Include: which meetings, total meeting hours for the day, suggested meeting to move or decline.

**6. Schedule conflicts:**
Double-bookings or overlapping events. Surface immediately with both events and recommendation on which to prioritize (based on sender tier, meeting recurrence, and participant seniority).

### Lower-priority signals (awareness only, daily digest)

**7. Direct report calendar visibility:**
Frank Atashili's calendar is visible (reader access). Note when Frank has blocked time that conflicts with shared meetings.

**8. Holiday awareness:**
Nigerian public holidays from the Holidays calendar. Surface 2 days before a holiday: remind of upcoming holiday, flag any meetings scheduled on the holiday that may need rescheduling.

### Skip rules

- Accepted events with no changes since last scan
- Tentative responses from others (unless from direct reports)
- Recurring standup/sync meetings with no changes — only surface if cancelled, declined, or rescheduled
- Calendar notification emails (handled by email source, not calendar source)

## Notes

- All times in Africa/Lagos (WAT, UTC+1). No DST changes.
- The observer detection heuristic (recurring meetings where I have no follow-up actions) is deferred to the Improve phase — requires cross-source correlation between calendar events and email/Slack/Jira activity.
- The `gcal_find_meeting_times` tool can be used to suggest alternative times when a conflict is detected.
- Frank Atashili's calendar (reader access) is the only other calendar currently visible. If more direct report calendars are added, extend the direct report decline pattern detection to include them.
- **TOOL RESTORED 2026-04-15T09:09 UTC (10:09 WAT):** `gcal_list_events` returning results after 12 consecutive ticks blind. Partial resolution of briefing-2026-04-15 B2 structural MCP crisis (Jira portion still blind — 82+ ticks). Today's schedule verified live: **Oladapo 1:1 confirmed 12:30–13:00 WAT** (Stanbic commitment close-out forcing function per B1). Other events today: Busy 10:00–11:00 WAT (self), Juliana Switch Standup 11:30 WAT (declined — Strategy Retreat), Tolu.A Infra Check-In 13:30–14:00 WAT (accepted), Emeka/Lateefat 14:00–14:30 WAT (accepted), ATPP Standup 14:00 WAT (declined — Strategy Retreat), CTO/Abayomi 15:00–15:30 WAT (accepted), Product-Engineering Sync 18:00–19:00 WAT (accepted), Strategy Retreat Dinner @ Madison 19:30 BST (20:30 WAT, accepted). No new Day 2 conflicts to bulk-decline — declines already applied. No overlap detected in accepted events. Calendar blind-period retroactive check: briefing-2026-04-15 B4 recommendation to delegate Day 2+3 decline to EA (Kevin Ng'Eno) appears unnecessary given current state — verify before executing.
- **TOOL UNAVAILABLE 2026-04-15T08:09 UTC (09:09 WAT):** 12th consecutive tick blind.
- **TOOL UNAVAILABLE 2026-04-15T07:09 UTC (08:10 WAT):** 11th consecutive tick blind.
- **TOOL UNAVAILABLE 2026-04-15T06:10 UTC (07:10 WAT):** 10th consecutive tick blind. Briefing-2026-04-15 B2 bundles this with source-config-jira as a structural MCP connector health crisis.
- 2026-04-14T22:09 UTC (23:09 WAT) tick: 9th consecutive tick blind.
- 2026-04-14T20:09 UTC (21:09 WAT) tick: 8th consecutive tick blind.
- 2026-04-14T18:09 UTC (19:09 WAT) tick: 7th consecutive tick blind.
