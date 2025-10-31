---
description: Interactive stream switcher with conversational selection and fuzzy search
allowed-tools: [bash, read, write]
---

# Stream Switch

Switch between work streams with interactive selection, fuzzy search, and preview.

**Usage:** `/project:stream-switch [stream-name]`

**Aliases:** `/project:switch`, `/project:sw`

**Arguments:**
- No arguments: Interactive stream selector with preview
- `[stream-name]`: Switch directly to named stream

**Options:**
- `--filter [status]` - Filter by status (active, paused, completed, all)
- `--preview` - Show detailed preview before switching
- `--resume` - Automatically resume stream after switching

---

## How It Works

**Conversational Flow:**
1. I display all available streams
2. You choose by number, name, or fuzzy search
3. I show preview of selected stream
4. You confirm or choose different stream
5. I switch to selected stream
6. Optionally inject context and resume work

**Flexible Selection:**
- Type a number: `2`
- Type exact name: `v1.2.0-npm-package`
- Type partial name: `v1.2` or `npm`
- Fuzzy search: `npm pack` matches `v1.2.0-npm-package`

---

## Stream Selector Display

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STREAM SWITCHER                                    │
│                     Select a stream to switch to                            │
└─────────────────────────────────────────────────────────────────────────────┘

Available Streams (3 total):

ACTIVE (1):
  1. • v1.2.0-npm-package
     Branch: feature/v1.2.0-npm-package
     Progress: 50% (5/10 goals)
     Updated: 10m ago
     Template: feature-development

PAUSED (0):
  [No paused streams]

COMPLETED (2):
  2. ✓ phase3-stream-templates
     Branch: feature/phase3-stream-templates → merged to master
     Progress: 100% (6/6 goals)
     Completed: 1d ago

  3. ✓ building-work-streams-plugin
     Branch: master
     Progress: 100% (4/4 goals)
     Completed: 1d ago

────────────────────────────────────────────────────────────────────────────

Select stream:
- Type number (1-3)
- Type stream name (exact or partial)
- Type keywords for fuzzy search
- Type 'cancel' or '0' to exit

Your choice:
```

---

## Selection Methods

### Method 1: By Number

```
You type: "2"

I respond:
  "Selected: phase3-stream-templates"

[Shows preview]

  "This stream is completed. Switch anyway? (yes/no/choose again):"
```

### Method 2: By Exact Name

```
You type: "v1.2.0-npm-package"

I respond:
  "Selected: v1.2.0-npm-package (already active)"
  "This is the current stream."

  "Choose different stream? (yes/no):"
```

### Method 3: By Partial Name

```
You type: "npm"

I respond:
  "Found 1 match:"
  "  v1.2.0-npm-package"

  "Switch to this stream? (yes/no/search again):"
```

### Method 4: Fuzzy Search

```
You type: "phase 3 template"

I respond:
  "Fuzzy search results (2 matches):"
  "  1. phase3-stream-templates (exact match)"
  "  2. building-work-streams-plugin (contains 'template')"

  "Which stream? (1-2):"
```

### Method 5: Keywords

```
You type: "template feature"

I respond:
  "Searching for streams with: template, feature"
  "  1. phase3-stream-templates (completed)"
  "  2. v1.2.0-npm-package (template: feature-development)"

  "Select: (1-2):"
```

---

## Stream Preview

Before switching, I show detailed preview:

```
╔═════════════════════════════════════════════════════════════════════════════╗
║                           STREAM PREVIEW                                     ║
╚═════════════════════════════════════════════════════════════════════════════╝

Stream: phase3-stream-templates
Status: Completed
Template: feature-development

Description:
  Phase 3 - Implement stream templates for common development workflows

Git:
  Branch: feature/phase3-stream-templates → merged to master (v1.1.0)
  Created: 2025-10-30
  Commits: 5 total
  Status: Merged and released

Progress: 100% complete
  ✓ Design template system architecture
  ✓ Create template directory structure
  ✓ Implement core template types
  ✓ Add template selection to stream-start
  ✓ Test template system
  ✓ Release v1.1.0

History:
  • 5 checkpoints
  • 4 updates
  • Duration: 1h 5m
  • Completed: 1d ago

Notes:
  This is a completed stream. Switching will allow you to review history
  but you cannot add new checkpoints or updates to completed streams.

────────────────────────────────────────────────────────────────────────────

Actions:
  [1] Switch to this stream
  [2] Switch and view details
  [3] Choose different stream
  [0] Cancel

Your choice:
```

---

## Switching Process

### Switch to Active Stream

```
You select: v1.2.0-npm-package (already current)

I respond:
  "v1.2.0-npm-package is already the active stream."

  "Would you like to:"
  "  1. View stream status"
  "  2. Create checkpoint"
  "  3. Choose different stream"
  "  0. Exit"

  "Your choice:"
```

### Switch to Paused Stream

```
You select: refactor-auth-module (paused)

I respond:
  "Switching to: refactor-auth-module"

  "This stream is paused. Would you like to:"
  "  1. Resume work (inject context)"
  "  2. Just switch (no context injection)"
  "  3. View status first"
  "  0. Cancel"

  "Your choice:"

You choose: "1"

I execute:
  - Switch .current-stream to refactor-auth-module
  - Inject context from last 3 checkpoints
  - Display stream status
  - Provide continuation guidance

I respond:
  "✓ Switched to: refactor-auth-module"
  "✓ Context injected (1,850 tokens from 3 checkpoints)"

  "Stream Status:"
  "  Progress: 80% (8/10 goals)"
  "  Last checkpoint: 3d ago"
  "  Next goal: Complete unit tests"

  "Ready to continue work!"
```

### Switch to Completed Stream

```
You select: building-work-streams-plugin (completed)

I respond:
  "⚠ Warning: This stream is completed"

  "Completed streams are read-only. You can:"
  "  - View history and checkpoints"
  "  - Review goals and decisions"
  "  - Reference past work"

  "You cannot:"
  "  - Add new checkpoints"
  "  - Add updates"
  "  - Modify goals"

  "Switch anyway? (yes/no):"

You respond: "yes"

I execute:
  - Switch .current-stream
  - Display stream summary
  - Show read-only notice

I respond:
  "✓ Switched to: building-work-streams-plugin (read-only)"

  "Stream Summary:"
  "  Completed: 1d ago"
  "  Duration: 13h 42m"
  "  Goals: 4/4 (100%)"
  "  Checkpoints: 8"

  "Use /stream-status to view full history"
```

---

## Filter Options

### Filter by Status

**Active only:**
```bash
/stream-switch --filter active
# Shows only active streams
```

**Paused only:**
```bash
/stream-switch --filter paused
# Shows only paused streams
```

**Completed only:**
```bash
/stream-switch --filter completed
# Shows only completed streams
```

**All streams (default):**
```bash
/stream-switch --filter all
# Shows all streams
```

---

## Smart Features

### Auto-Resume

**With --resume flag:**
```bash
/stream-switch refactor-auth --resume
# Switches and automatically resumes with context injection
```

**Interactive:**
```
You select paused stream

I ask: "Resume work with context injection? (yes/no):"

You respond: "yes"

I execute:
  - Switch stream
  - Inject context automatically
  - Display continuation guidance
```

### Preview Mode

**With --preview flag:**
```bash
/stream-switch --preview
# Always shows preview before switching
```

**Default behavior:**
- Active/Paused streams: Preview optional
- Completed streams: Always preview (with warning)

### Fuzzy Matching

**Smart matching algorithm:**
- Exact match: Highest priority
- Starts with: High priority
- Contains: Medium priority
- Keywords match: Low priority
- Levenshtein distance: Fallback

**Examples:**
- `npm` matches `v1.2.0-npm-package`
- `auth` matches `user-authentication` and `refactor-auth-module`
- `phase3` matches `phase3-stream-templates`
- `bug fix` matches `fixing-payment-bug` and `bug-fix-template`

---

## Error Handling

### No Streams Available

```
┌─ NO STREAMS ────────────────────────────────────────┐
│ No streams available to switch to                   │
└─────────────────────────────────────────────────────┘

Would you like to:
  1. Start a new stream
  2. View stream templates
  3. Exit

Your choice:
```

### Only One Stream Exists

```
┌─ SINGLE STREAM ─────────────────────────────────────┐
│ Only one stream exists: v1.2.0-npm-package          │
│ This stream is already active                       │
└─────────────────────────────────────────────────────┘

Would you like to:
  1. View stream status
  2. Start a new stream
  3. Exit

Your choice:
```

### Stream Not Found

```
You type: "nonexistent-stream"

I respond:
  "❌ Stream not found: nonexistent-stream"

  "Did you mean:"
  "  1. v1.2.0-npm-package"
  "  2. phase3-stream-templates"

  "Or search again? (1-2 / search / cancel):"
```

### Ambiguous Match

```
You type: "stream"

I respond:
  "Multiple matches found (3):"
  "  1. v1.2.0-npm-package"
  "  2. phase3-stream-templates"
  "  3. building-work-streams-plugin"

  "Please be more specific or choose: (1-3):"
```

---

## Direct Switching

**Skip interactive mode:**

```bash
# By exact name
/stream-switch v1.2.0-npm-package

# By partial name
/stream-switch npm-package

# By keyword
/stream-switch phase3

# With auto-resume
/stream-switch refactor-auth --resume

# With preview
/stream-switch completed-stream --preview
```

**Response:**
```
✓ Switched to: v1.2.0-npm-package

Stream: v1.2.0-npm-package
Status: Active
Progress: 50% (5/10 goals)
Last activity: 15m ago

Next goal: Implement /stream-switch command
```

---

## Switch Confirmation

After successful switch:

```
╔═════════════════════════════════════════════════════════════════════════════╗
║                      STREAM SWITCH SUCCESSFUL                                ║
╚═════════════════════════════════════════════════════════════════════════════╝

Previous stream: v1.2.0-npm-package
Current stream: phase3-stream-templates

Context: 1,200 tokens injected from 2 most recent checkpoints

Stream Status:
  Name: phase3-stream-templates
  Status: Completed (read-only)
  Progress: 100%
  Branch: merged to master (v1.1.0)

Available actions:
  /stream-status      - View detailed status
  /stream-list        - List all streams
  /stream-switch      - Switch to another stream
  /stream-dashboard   - Open dashboard

Continue working? (Or type action)
```

---

## Examples

**Basic interactive selection:**
```bash
/stream-switch
# Shows all streams
# Wait for selection
# Preview and confirm
# Switch
```

**Quick switch by name:**
```bash
/stream-switch npm-package
# Switches directly
# Shows confirmation
```

**Fuzzy search:**
```bash
/stream-switch auth fix
# Finds streams matching keywords
# Shows matches
# Select from list
```

**Resume paused work:**
```bash
/stream-switch refactor-auth --resume
# Switches to stream
# Injects context automatically
# Ready to continue
```

**Review completed stream:**
```bash
/stream-switch phase3 --preview
# Shows detailed preview
# Warns it's completed
# Switches to read-only mode
```

**Filter and switch:**
```bash
/stream-switch --filter paused
# Shows only paused streams
# Interactive selection
```

---

## Integration with Dashboard

**From dashboard:**
```
Dashboard shows option 4: switch

You choose: "4"

I launch: Interactive stream switcher

After switch:
  I return to: Dashboard with new stream displayed
```

**Seamless workflow:**
```
Dashboard → Switch → New Stream → Dashboard
```

---

## Best Practices

**For Quick Switches:**
- Use partial names: `/stream-switch npm`
- Use keywords: `/stream-switch auth`
- Memorize numbers for frequent streams

**For Exploration:**
- Use interactive mode: `/stream-switch`
- Browse all streams
- Preview before switching

**For Resuming Work:**
- Always use `--resume` with paused streams
- Review context before continuing
- Check last checkpoint time

**For Organization:**
- Filter by status to find what you need
- Preview completed streams before opening
- Switch back to active streams after reviewing

---

## Tips

- **Quick switch:** Type first few letters of stream name
- **Fuzzy search:** Type any keywords from stream name
- **Number shortcuts:** Remember numbers for frequent streams
- **Auto-complete:** I'll suggest matches as you type
- **Preview first:** Check stream status before switching (especially completed)
- **Resume smartly:** Use `--resume` to inject context for paused streams

---

## Technical Notes

**Stream Switching:**
- Updates `.claude/streams/.current-stream` file
- Preserves all stream metadata
- No data loss when switching
- Can switch between any streams safely

**Context Injection:**
- Optional for active streams (already in context)
- Recommended for paused streams (restores context)
- Not needed for completed streams (read-only)
- Smart token limit (< 2000 tokens)

**State Management:**
- Previous stream remains untouched
- New stream becomes active
- All operations respect new stream context
- Switch history tracked in metadata

**Performance:**
- Streams cached in memory
- Fast switching (< 100ms)
- Fuzzy search optimized
- No file system overhead
