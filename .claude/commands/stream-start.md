---
description: Start a new work stream to track continuous development work
---

# Stream Start

Start a new work stream with automatic context tracking and session management.

**Usage:** `/project:stream-start [stream-name] [--template template-name]`

**Arguments:**
- `stream-name` - Name for the work stream (required)
- `--template` - Optional template to use (feature-development, bug-fix, refactoring, documentation, or custom/name)

**Process:**
1. Check for `--template` flag
   - If specified, load template from `.claude/templates/[template-name].yaml`
   - Extract template configuration: goals, context, checkpoint guidance, git settings
2. Check current git branch and status
3. Optionally suggest creating a new branch for this stream
   - Generate branch name from stream name (e.g., "oauth2-implementation" → "feature/oauth2-implementation")
   - If template specified, use template's branch prefix
   - Ask user if they want to create a new branch
   - If yes, create and checkout the new branch
4. Create stream directory: `.claude/streams/[stream-name]/`
5. Initialize stream metadata file with:
   - Stream name and description
   - Start timestamp
   - Initial Claude session ID
   - Current status (Active)
   - Git branch information
   - Goals/objectives (from template if specified)
   - Context (from template if specified)
   - Template reference (if used)
6. Create `.claude/streams/.current-stream` pointing to this stream
7. Set up context tracking
8. Display template guidance if template was used

**Stream file format:**
```yaml
name: [stream-name]
description: [user provided or extracted from name]
status: active
created: [ISO timestamp]
updated: [ISO timestamp]
template: [template-name if used]

git:
  branch: [current-branch-name]
  created_branch: [true/false - whether stream created a new branch]
  base_branch: [branch this was created from, if applicable]

sessions:
  - id: [claude-session-id]
    started: [timestamp]
    status: active

goals:
  - [ ] [goals to be defined or from template]

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
- Display template guidance if template was used
- Remind about `/project:stream-checkpoint` for saving progress
- Remind about `/project:stream-end` when work complete

## Using Templates

**Start stream with template:**
```
/stream-start my-feature --template feature-development
```

This will:
1. Load the feature-development template
2. Apply template's goals, context, and next steps
3. Suggest branch name using template's prefix (feature/)
4. Display template's checkpoint guidance and tips

**Examples:**

Feature development:
```
/stream-start user-authentication --template feature-development
# Stream: user-authentication
# Branch: feature/user-authentication
# Goals from template: design, implement, test, document, review
```

Bug fix:
```
/stream-start memory-leak-fix --template bug-fix
# Stream: memory-leak-fix
# Branch: bugfix/memory-leak-fix
# Goals from template: reproduce, diagnose, fix, verify
```

Refactoring:
```
/stream-start database-layer --template refactoring
# Stream: database-layer
# Branch: refactor/database-layer
# Goals from template: analyze, plan, refactor, test
```

Documentation:
```
/stream-start api-reference --template documentation
# Stream: api-reference
# Branch: docs/api-reference
# Goals from template: outline, write, review, publish
```

**Template Benefits:**
- Pre-defined goals aligned with workflow type
- Context templates with decision points and next steps
- Checkpoint guidance for optimal progress tracking
- Git conventions (branch prefixes, commit formats)
- Tips and best practises for the workflow
- Milestones for tracking progress phases

**Alternative:** Use `/stream-template use [template-name] [stream-name]` for more explicit template usage
