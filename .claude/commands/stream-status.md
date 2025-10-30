---
description: Show current work stream status and progress
---

# Stream Status

Display the current active work stream with progress, sessions, and next steps.

**Usage:** `/project:stream-status`

**Process:**
1. Check `.claude/streams/.current-stream` for active stream
2. Read stream metadata
3. Check git state:
   - Current branch
   - Working directory status (clean/dirty)
   - Recent commits
   - Sync status with remote (ahead/behind/diverged)
   - Uncommitted changes count
4. Display comprehensive status:
   - Stream name and description
   - Time elapsed since start
   - Number of sessions in stream
   - Current Claude session ID
   - Git branch and status
   - Completed checkpoints
   - Goals progress
   - Files modified
   - Recent activity

**Output format:**
```
Work Stream: [name]
Status: [active/paused]
Started: [timestamp] ([duration] ago)
Current Session: [session-id]

Git Status:
  Branch: [branch-name] (linked to stream)
  Working Directory: [clean/dirty - X files modified]
  Remote Status: [up-to-date/ahead X/behind X/diverged]
  Uncommitted Changes: [count] files

  Recent Commits (last 3):
    • [hash] [message] ([time] ago)
    • [hash] [message] ([time] ago)
    • [hash] [message] ([time] ago)

Progress:
  ✓ [completed checkpoint 1]
  ✓ [completed checkpoint 2]
  • [current work]

Goals:
  ✓ [completed goal]
  □ [pending goal]

Modified Files:
  - file1.ts
  - file2.ts

Next Steps:
  - [next step 1]
  - [next step 2]
```

**Git Status Details:**

1. **Branch Information**:
   - Shows current git branch
   - Indicates if it's the stream's linked branch
   - Warns if working on different branch than stream expects

2. **Working Directory Status**:
   - ✓ Clean - No uncommitted changes
   - ⚠ Dirty - Shows number of modified/staged/untracked files

3. **Remote Sync Status**:
   - ✓ Up-to-date - Local matches remote
   - ↑ Ahead X - Local has X commits not pushed
   - ↓ Behind X - Remote has X commits not pulled
   - ⚠ Diverged - Local and remote have different commits

4. **Recent Commits**:
   - Last 3 commits on current branch
   - Short hash, message, and relative time
   - Helps understand recent development activity

5. **Uncommitted Changes**:
   - Count of files with changes not yet committed
   - Reminder to commit work before checkpointing

**Status Indicators:**

- ✓ = Good/Complete
- ⚠ = Warning/Attention needed
- • = In progress
- □ = Pending
- ↑ = Ahead of remote
- ↓ = Behind remote

**Branch Mismatch Warning:**
If current git branch differs from stream's linked branch:
```
⚠ Warning: Currently on branch '[current]' but stream is linked to '[linked]'
  Consider switching to the linked branch or updating stream metadata.
```

If no active stream, suggest starting one with `/project:stream-start`.
