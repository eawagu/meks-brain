# Dashboard

Dynamic queries for human browsing. Do not edit — Dataview regenerates on vault load.

---

## Recently Updated

```dataview
TABLE type, updated, summary
FROM "memory"
SORT updated DESC
LIMIT 20
```

## By Type

### Entities
```dataview
TABLE summary, updated
FROM "memory"
WHERE contains(type, "entity")
SORT updated DESC
```

### Concepts
```dataview
TABLE summary, updated
FROM "memory"
WHERE contains(type, "concept")
SORT updated DESC
```

### Syntheses
```dataview
TABLE status, coverage, summary, updated
FROM "memory"
WHERE contains(type, "synthesis")
SORT updated DESC
```

### Open Commitments
```dataview
TABLE owner, counterparty, role, due, status
FROM "memory"
WHERE contains(type, "commitment") AND status = "open"
SORT due ASC
```

### Sources
```dataview
TABLE summary, created
FROM "memory"
WHERE contains(type, "source")
SORT created DESC
LIMIT 30
```

### Source Configs
```dataview
TABLE last_processed, summary
FROM "memory"
WHERE contains(type, "source-config")
SORT title ASC
```

## Stale Pages

```dataview
TABLE type, updated, summary
FROM "memory"
WHERE date(now) - date(updated) > dur(30 days)
SORT updated ASC
LIMIT 20
```

## Orphans (no inbound links)

```dataview
TABLE type, updated
FROM "memory"
WHERE length(file.inlinks) = 0
SORT updated ASC
```
