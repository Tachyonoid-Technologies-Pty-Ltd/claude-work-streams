---
description: Manage git integration for the current work stream
---

# Stream Git

Manage git branch integration, synchronization, and status for work streams.

**Usage:** `/project:stream-git [action]`

**Actions:**
- `link [branch-name]` - Link stream to existing git branch
- `create [branch-name]` - Create and link new branch for stream
- `status` - Show detailed git status for stream
- `sync` - Sync stream metadata with current git state
- `unlink` - Remove git branch association from stream

## Commands

### Link Stream to Existing Branch
```
/stream-git link feature/my-feature
```

**Process:**
1. Verify branch exists
2. Optionally checkout the branch
3. Update stream metadata with branch info
4. Record base branch (current branch before switch)

**Output:**
```
✓ Stream linked to branch: feature/my-feature

Stream: [stream-name]
Git Branch: feature/my-feature
Base Branch: main
Created by Stream: No

Use /stream-status to see git state
```

### Create New Branch for Stream
```
/stream-git create feature/new-feature
```

**Process:**
1. Check for uncommitted changes (warn if dirty)
2. Create new branch from current branch
3. Checkout new branch
4. Update stream metadata
5. Record creation details

**Branch Naming Suggestions:**
If no branch name provided, suggest based on stream name:
- Stream: "oauth2-implementation" → "feature/oauth2-implementation"
- Stream: "fix-login-bug" → "bugfix/fix-login-bug"
- Stream: "refactor-auth" → "refactor/refactor-auth"

**Output:**
```
✓ Created and linked branch: feature/new-feature

Stream: [stream-name]
Git Branch: feature/new-feature
Base Branch: main
Created by Stream: Yes
Created: [timestamp]

Current branch switched to: feature/new-feature
```

### Show Git Status
```
/stream-git status
```

**Process:**
1. Read stream metadata
2. Get current git state
3. Compare stream branch vs current branch
4. Show detailed git status

**Output:**
```
Git Status for Stream: [stream-name]

Linked Branch: feature/my-feature
Current Branch: feature/my-feature ✓
Base Branch: main

Working Directory:
  Status: Clean ✓
  Uncommitted: 0 files

Remote Tracking:
  Upstream: origin/feature/my-feature
  Status: Up-to-date ✓
  Ahead: 0 commits
  Behind: 0 commits

Recent Commits (last 5):
  • a1b2c3d Add authentication logic (2 hours ago)
  • d4e5f6g Update user model (4 hours ago)
  • g7h8i9j Refactor API client (1 day ago)

Branch History:
  Created: 2 days ago
  Total Commits: 12
  Contributors: 1
```

**Status with Issues:**
```
Git Status for Stream: [stream-name]

Linked Branch: feature/my-feature
Current Branch: main ⚠ MISMATCH
  → You are on 'main' but stream expects 'feature/my-feature'
  → Run: git checkout feature/my-feature

Working Directory:
  Status: Dirty ⚠
  Uncommitted: 3 files
    M  src/auth.ts
    M  src/user.ts
    ?? src/test.ts

Remote Tracking:
  Upstream: origin/feature/my-feature
  Status: Behind 2 commits ⚠

  → Run: git pull origin feature/my-feature
```

### Sync Stream with Git
```
/stream-git sync
```

**Process:**
1. Detect current git branch
2. Update stream metadata with current branch
3. Scan for recent commits since last sync
4. Update file list with uncommitted changes

**Use Cases:**
- Manually switched branches outside of stream commands
- Want to update stream's branch association
- Need to refresh git state in metadata

**Output:**
```
✓ Stream synced with git state

Stream: [stream-name]
Previous Branch: feature/old-feature
New Branch: feature/new-feature

Updated:
  - Git branch: feature/new-feature
  - Base branch: main
  - Uncommitted files: 2
  - Recent commits: 3 new since last sync

Run /stream-checkpoint to save this state
```

### Unlink Branch
```
/stream-git unlink
```

**Process:**
1. Remove git metadata from stream
2. Keep stream active (doesn't affect stream state)
3. Confirm unlinking

**Output:**
```
✓ Git branch unlinked from stream

Stream: [stream-name]
Previously Linked: feature/my-feature

The stream is still active but no longer associated with a git branch.
You can link a new branch with: /stream-git link [branch-name]
```

## Git State in Stream Metadata

The stream metadata file stores git information:

```yaml
git:
  branch: feature/my-feature
  base_branch: main
  created_branch: true
  created_at: 2025-10-30T12:00:00Z
  last_sync: 2025-10-30T14:30:00Z
```

## Integration with Other Commands

**Stream Start:**
- Automatically prompts to create/link branch
- Records git state in initial metadata

**Stream Checkpoint:**
- Captures git state at checkpoint time
- Records commits since last checkpoint
- Lists uncommitted changes

**Stream Status:**
- Shows current git status
- Warns about branch mismatches
- Displays sync status with remote

**Stream Resume:**
- Checks if linked branch exists
- Optionally switches to linked branch
- Warns if branch state has changed

## Best Practices

1. **Create Dedicated Branches**: Use `/stream-git create` to keep stream work isolated
2. **Sync Regularly**: Run `/stream-git sync` after manual git operations
3. **Check Status**: Use `/stream-git status` to verify git state before checkpoints
4. **Handle Mismatches**: Address branch mismatches promptly to avoid confusion

## Examples

**Starting a new feature stream with branch:**
```
/stream-start oauth2-implementation
> Would you like to create a branch? (y/n): y
> Suggested: feature/oauth2-implementation
✓ Created stream and branch

# Later, explicitly manage git:
/stream-git status
```

**Linking stream to existing branch:**
```
/stream-git link feature/existing-work
✓ Linked to existing branch
```

**Switching branches mid-stream:**
```
git checkout different-branch
/stream-git sync
⚠ Branch changed from feature/old to different-branch
✓ Stream synced
```

**Creating branch after stream started:**
```
/stream-git create feature/late-branch
✓ Created and switched to new branch
```
