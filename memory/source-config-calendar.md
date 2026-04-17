---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: Signal source registration and filtering directives for Google Calendar (GCal MCP).
updated: "2026-04-17T10:15:29Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T10:09:00Z"
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
- Frank Atashili's calendar (reader access) is the only other calendar visible. If more direct report calendars are added, extend the direct report decline pattern detection to include them.
- **2026-04-17 ~06:09 WAT tick (briefing):** Calendar healthy. Fri Apr 17 schedule: TeamApt All Hands 08:30 WAT, Deliberation Varun Singh 10:30 WET, TeamApt/New Relic 14:00 BST, Tech support meeting 16:00 WAT, Product-Engineering Sync 18:00 WAT. Freed window 11:00–12:40 WAT (Head of Engineering interviews previously cancelled). Lattice Review block held for Fri Apr 24 15:00–17:00 WAT; Lattice window closes Apr 27 (10 days remaining).
- **2026-04-17 ~10:20 WAT tick (mid-morning, non-briefing):** No new calendar changes since 06:09 WAT briefing tick. Deliberation Varun Singh 10:30 WAT is ~10 minutes out — surfaced in morning briefing schedule, no re-surfacing needed.
- **2026-04-17 ~11:09 WAT tick (late-morning, non-briefing):** Deliberation Varun Singh ended ~10:45 WAT (10:30–10:45 WAT slot). Lattice Review multi-day event ("Hi Emeka - 8 Pending Downward Reviews," Apr 13 → Apr 28) refreshed 09:48 WAT — non-delta status update (same 8-item count). No new invites, no schedule conflicts, no declined RSVPs. Freed 11:00–12:40 WAT window remains open (candidate for dad's-birthday event-planner call per B2, or other personal/admin work). Next events: TeamApt/New Relic 14:00 WAT, Tech support meeting 16:00 WAT, Product-Engineering Sync 18:00 WAT.