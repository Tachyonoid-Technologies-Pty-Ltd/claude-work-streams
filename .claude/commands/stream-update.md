---
description: Add a quick progress note to the active work stream
---

# Stream Update

Add a timestamped progress note to the current work stream without creating a full checkpoint.

**Usage:** `/project:stream-update [note]`

**Process:**
1. Find active stream from `.claude/streams/.current-stream`
2. Append update entry to stream metadata
3. Include timestamp and current session
4. Confirm update added

**Update format in stream.yaml:**
```yaml
updates:
  - timestamp: [ISO timestamp]
    session_id: [current-session]
    note: [user provided text]
```

**Difference from checkpoint:**
- Lighter weight - no file scanning
- No progress summary
- Quick notes and decisions
- Use for: decisions made, issues encountered, ideas, todos

Show brief confirmation after adding update.
