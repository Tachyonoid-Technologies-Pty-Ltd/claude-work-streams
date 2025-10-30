---
description: List all work streams (active, paused, and completed)
---

# Stream List

Display all work streams with their status, duration, and summary.

**Usage:** `/project:stream-list`

**Process:**
1. Scan `.claude/streams/` directory for all stream directories
2. Read metadata from each stream
3. Sort by: Active first, then by most recent activity
4. Display in organized format

**Output format:**
```
Active Work Streams:
  • [stream-name] - [description] (started [timeago])
    Sessions: [count] | Checkpoints: [count]

Paused Work Streams:
  ○ [stream-name] - [description] (paused [timeago])
    Sessions: [count] | Checkpoints: [count]

Completed Work Streams:
  ✓ [stream-name] - [description] (completed [timeago])
    Duration: [time] | Sessions: [count]
```

Show commands for resuming or viewing details.
