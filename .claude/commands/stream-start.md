---
description: Start a new work stream to track continuous development work
---

# Stream Start

Start a new work stream with automatic context tracking and session management.

**Usage:** `/project:stream-start [stream-name]`

**Process:**
1. Check current git branch and status
2. Optionally suggest creating a new branch for this stream
   - Generate branch name from stream name (e.g., "oauth2-implementation" → "feature/oauth2-implementation")
   - Ask user if they want to create a new branch
   - If yes, create and checkout the new branch
3. Create stream directory: `.claude/streams/[stream-name]/`
4. Initialize stream metadata file with:
   - Stream name and description
   - Start timestamp
   - Initial Claude session ID
   - Current status (Active)
   - Git branch information
   - Goals/objectives
5. Create `.claude/streams/.current-stream` pointing to this stream
6. Set up context tracking

**Stream file format:**
```yaml
name: [stream-name]
description: [user provided or extracted from name]
status: active
created: [ISO timestamp]
updated: [ISO timestamp]

git:
  branch: [current-branch-name]
  created_branch: [true/false - whether stream created a new branch]
  base_branch: [branch this was created from, if applicable]

sessions:
  - id: [claude-session-id]
    started: [timestamp]
    status: active

goals:
  - [ ] [goals to be defined]

context:
  files: []
  decisions: []
  next_steps: []

checkpoints: []
```

**Git Branch Integration:**
When starting a stream, you'll be prompted:
- Current branch: [branch-name]
- Suggested stream branch: feature/[stream-name] (or bugfix/[stream-name], etc.)
- "Would you like to create a new branch for this stream? (y/n)"

If you choose yes:
- New branch is created from current branch
- Checkout to new branch
- Stream metadata records the branch association
- Base branch is recorded for reference

If you choose no:
- Stream uses current branch
- Branch name is recorded in metadata
- No new branch is created

**Branch Naming Convention:**
- Stream names are converted to kebab-case
- Prefix is suggested based on stream name keywords:
  - "fix", "bug" → bugfix/[name]
  - "refactor" → refactor/[name]
  - Default → feature/[name]

After creation:
- Confirm stream started
- Show stream location
- Remind about `/project:stream-checkpoint` for saving progress
- Remind about `/project:stream-end` when work complete
