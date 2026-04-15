---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: Signal source registration and filtering directives for Google Calendar (GCal MCP).
updated: 2026-04-15
cssclasses:
  - "source-config"
last_processed: "2026-04-15T20:09:00Z"
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
- **2026-04-15 21:09 WAT tick:** Calendar healthy — 11th consecutive tick restored. Madison Dinner in progress 19:30 BST / 20:30 WAT (ends 20:50 BST / 21:50 WAT). Minor updates since last tick: Felix/Emeka bi-weekly updated 19:33 WAT (Felix declined — standing pattern, recurring routing confirmation); Madison Dinner metadata refresh 19:44 WAT (no attendee-list change material); Retreat Day 3 metadata refresh 19:44 WAT (no attendee-list change material). Zero new invites, zero new conflicts, zero new declines. Apr 16 tomorrow confirmed schedule: Direct to Bank standup 08:30 WAT (declined), Ravi/Emeka 10:00 WAT (accepted), Felix/Emeka 11:00 WAT (accepted — Felix declined), Ketan sync 11:30 WAT (declined — Kolkata tz), Juliana Switch standup 11:30 WAT (declined), Retreat Day 3 all-day 08:00–18:00 BST (declined — Strategy Retreat comment), Weekly Check-ins DD 13:00 Toronto (declined), ATPP standup 14:00 WAT (declined — Strategy Retreat), DD Weekly Analysis (needsAction), Product-Engineering Sync 18:00 WAT (accepted), Retreat Day 3 Dinner Capital Pleasure Boats 19:00–22:20 BST (accepted, Blackfriars Pier, Vessel Golden Flame). Lattice Review still pending (8 downward reviews; updated 15:57 WAT today, no response recorded).
- **2026-04-15 19:09 WAT tick:** Calendar healthy — 10th consecutive tick restored. Product-Engineering Sync 18:00–19:00 WAT just concluded (Frank Atashili declined — standing pattern). Upcoming today: Strategy Retreat Dinner Madison 19:30 BST / 20:30 WAT (Pawel Swiatek & Dennis Ajalie hosts, Dennis declined). NEW event detected: Strategy Retreat Day 3 Dinner Capital Pleasure Boats Apr 16 19:00–22:20 BST (updated 17:50 WAT today; Emeka accepted) — Blackfriars Pier, Vessel Golden Flame. Tomorrow Apr 16: Felix/Emeka bi-weekly 11:00–12:00 WAT (accepted), Ravi/Emeka 10:00–10:30 WAT (accepted), Ketan sync 11:30 WAT (declined — Kolkata tz), Retreat Day 3 all-day 08:00–18:00 BST, Juliana Switch standup (declined), Direct Debit Weekly Analysis (needsAction), Direct to Bank standup (declined), Lattice Review pending. No new invites requiring decision, no new cancellations, no new conflicts beyond pre-existing retreat overlaps.
- 2026-04-15 18:09 WAT tick: Calendar healthy — 9th consecutive tick restored. In progress NOW: Product-Engineering Sync 18:00–19:00 WAT. Upcoming today: Strategy Retreat Dinner Madison 19:30 BST / 20:30 WAT.
- 2026-04-15 17:09 WAT tick: Calendar healthy — 8th consecutive tick restored.
- 2026-04-15 16:09 WAT tick: Calendar healthy — 7th consecutive tick restored.
- 2026-04-15 15:09 WAT tick: Calendar healthy — 6th consecutive tick restored. In progress NOW: CTO/Abayomi Weekly Session 15:00–15:30 WAT.
- 2026-04-15 14:09 WAT tick: Calendar healthy — 5th consecutive tick restored.
- 2026-04-15 13:09 WAT tick: Calendar healthy — 4th consecutive tick.
- 2026-04-15 12:09 WAT tick: Calendar healthy — 3rd consecutive tick.
- 2026-04-15 11:09 WAT tick: Calendar restored — 2nd consecutive tick.
- 2026-04-15 10:09 WAT tick — TOOL RESTORED: After 12 consecutive ticks blind.
- 2026-04-15 09:09 WAT tick: 12th consecutive tick blind.
- 2026-04-15 08:10 WAT tick: 11th consecutive tick blind.
- 2026-04-15 07:10 WAT briefing tick: 10th consecutive tick blind.
