---
description: Save current progress in the active work stream
---

# Stream Checkpoint

Create a checkpoint in the current work stream capturing progress, decisions, and state.

**Usage:** `/project:stream-checkpoint [optional description]`

**Process:**
1. Find active stream from `.claude/streams/.current-stream`
2. Read current stream metadata
3. Capture git state:
   - Detect current git branch
   - List uncommitted changes (git status --short)
   - Get recent commits since last checkpoint (git log)
   - Calculate diff stats (files changed, insertions, deletions)
4. Create checkpoint entry with:
   - Timestamp
   - Current Claude session ID
   - Description (from arguments or auto-generated)
   - Modified files (via git status)
   - Git state snapshot
   - Current progress summary
5. Update stream metadata file
6. Confirm checkpoint saved with git state summary

**Checkpoint format:**
```yaml
- timestamp: [ISO timestamp]
  session_id: [current-claude-session]
  description: [user provided or auto-generated]
  git:
    branch: [current-branch]
    uncommitted_changes:
      - [file1]
      - [file2]
    commits_since_last_checkpoint:
      - hash: [commit-hash]
        message: [commit-message]
        author: [author]
        timestamp: [timestamp]
    diff_stats:
      files_changed: [count]
      insertions: [count]
      deletions: [count]
  files_modified: [list]
  summary: [brief progress summary]
```

**Git State Tracking:**

The checkpoint captures comprehensive git state:

1. **Current Branch**: Records which branch you're working on
2. **Uncommitted Changes**: Lists all modified, added, or deleted files not yet committed
3. **Recent Commits**: Shows commits made since the last checkpoint, including:
   - Commit hash (short form)
   - Commit message
   - Author
   - Timestamp
4. **Diff Statistics**: Summary of changes:
   - Number of files changed
   - Lines added (insertions)
   - Lines removed (deletions)

**Checkpoint Display:**
After creating a checkpoint, you'll see:
```
✓ Checkpoint saved

Stream: [stream-name]
Timestamp: [timestamp]
Session: [session-id]

Git State:
  Branch: [branch-name]
  Uncommitted: [count] files
  Commits since last checkpoint: [count]
  Changes: [files] files, +[insertions] -[deletions]

Description: [description]
Files Modified: [list]
Summary: [summary]
```

**Benefits:**
- Track development progress across commits
- See which commits belong to which work stream
- Identify uncommitted work at checkpoint time
- Understand code churn and development velocity
- Easy correlation between stream progress and git history

Show confirmation with checkpoint details including git state summary.
