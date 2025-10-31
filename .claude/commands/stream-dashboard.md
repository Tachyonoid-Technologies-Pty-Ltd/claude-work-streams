---
description: Interactive dashboard with conversational menu for work stream overview and actions
allowed-tools: [bash, read, write]
---

# Stream Dashboard

Display comprehensive work streams overview with conversational interaction for quick actions.

**Usage:** `/project:stream-dashboard [action]`

**Aliases:** `/project:stream-dash`, `/project:dashboard`

**Arguments:**
- No arguments: Display dashboard and enter interactive mode
- `[action]`: Execute action directly (checkpoint, update, switch, status, etc.)

**Options:**
- `--compact` - Compact display mode with less spacing
- `--filter [status]` - Filter by status (active, paused, completed)
- `--sort [field]` - Sort by field (updated, created, progress, name)

---

## How It Works

**Conversational Interaction:**
1. I display the dashboard with current stream information
2. I show you numbered menu options
3. You type your choice (number, name, or description)
4. I execute that action
5. After action completes, I redisplay the dashboard
6. Loop continues until you choose to exit

**Flexible Input:**
- Type a number: `2`
- Type action name: `checkpoint`
- Type description: `create a checkpoint`
- Natural language: `I want to update the stream`

**Quick Actions:**
- `/stream-dashboard checkpoint` - Skip menu, execute directly
- `/stream-dashboard update "note"` - Execute with arguments

---

## Dashboard Display

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WORK STREAMS DASHBOARD                                │
│                      v1.2.0 - 2025-10-31 19:05:00                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ OVERVIEW ──────────────────────────────────────────────────────────────────┐
│ Total Streams: 3 (1 active, 0 paused, 2 completed)                          │
│ Current Context: ███████████░░░░░░░░░ 55% (110k/200k tokens) ✓ Healthy     │
│ Active Stream: v1.2.0-npm-package                                            │
│ Session Duration: 1h 5m | Last checkpoint: 5m ago                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ SMART RECOMMENDATION ──────────────────────────────────────────────────────┐
│ 💡 Good time to continue work - context healthy, recent checkpoint exists   │
│    Suggestion: Continue with next goal (/stream-switch command)             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ ACTIVE STREAMS ────────────────────────────────────────────────────────────┐
│ Stream Name              Branch                    Progress  Updated        │
├─────────────────────────────────────────────────────────────────────────────┤
│ • v1.2.0-npm-package     feature/v1.2.0-npm-pack  █████░ 50%  5m ago       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ RECENT ACTIVITY ───────────────────────────────────────────────────────────┐
│ • v1.2.0-npm-package: Checkpoint "Dashboard design research" (5m ago)       │
│ • v1.2.0-npm-package: Checkpoint "Configuration complete" (30m ago)         │
│ • v1.2.0-npm-package: Checkpoint "/stream-init complete" (45m ago)          │
│ ✎ v1.2.0-npm-package: Update "Implemented /stream-config" (35m ago)        │
│ ✓ phase3-stream-templates: Stream completed (1d ago)                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ GIT STATUS ────────────────────────────────────────────────────────────────┐
│ Branch: feature/v1.2.0-npm-package ✓                                        │
│ Uncommitted: 12 files (all untracked - new npm package files)               │
│ Unpushed: None (new branch, not pushed yet)                                 │
│ Status: Clean, no conflicts                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ CURRENT STREAM DETAILS ────────────────────────────────────────────────────┐
│ Name: v1.2.0-npm-package                                                     │
│ Template: feature-development                                                │
│ Goals: 5/10 completed (50%)                                                  │
│   ✓ Design npm package structure                                            │
│   ✓ Create package.json                                                     │
│   ✓ Implement /stream-init command                                          │
│   ✓ Implement /stream-config command                                        │
│   ✓ Implement /stream-dashboard command                                     │
│   □ Implement /stream-switch command                                        │
│   □ Add installation documentation                                          │
│   □ Test npm package locally                                                │
│   □ Create examples and guides                                              │
│   □ Publish to npm registry                                                 │
│                                                                              │
│ Progress: 3 checkpoints, 5 updates, 12 files modified                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Interactive Menu

After displaying the dashboard, I present this menu:

```
╔═════════════════════════════════════════════════════════════════════════════╗
║                            DASHBOARD ACTIONS                                 ║
╚═════════════════════════════════════════════════════════════════════════════╝

What would you like to do? (Type number, action name, or describe what you want)

Stream Actions:
  1. checkpoint     - Create a new checkpoint with current progress
  2. update         - Add a quick progress update note
  3. status         - View detailed stream status
  4. switch         - Switch to a different stream
  5. resume         - Resume/continue current stream work
  6. end            - End current stream with summary

Configuration & Tools:
  7. config         - View or update configuration
  8. templates      - Manage stream templates
  9. git            - Git operations (commit, push, status)

Information:
  10. list          - List all streams in detail
  11. refresh       - Refresh dashboard display
  12. help          - Show help and command reference

Navigation:
  0. exit           - Exit dashboard and return to conversation

Shortcuts: Type 'cp' for checkpoint, 'up' for update, 'q' to exit

Your choice:
```

---

## Action Handlers

### 1. Checkpoint (checkpoint, cp, 1)

**Flow:**
```
You choose: "1" or "checkpoint" or "create checkpoint"

I respond:
  "Creating checkpoint for stream: v1.2.0-npm-package"
  "What description for this checkpoint?"

You respond: "Dashboard redesign complete with conversational UX"

I execute:
  - Capture current git state
  - Save checkpoint with description
  - Show confirmation
  - Redisplay dashboard with updated info

I ask: "Dashboard action?" (back to menu)
```

**Direct execution:**
```bash
/stream-dashboard checkpoint "Dashboard redesign complete"
# Creates checkpoint and exits
```

### 2. Update (update, up, 2)

**Flow:**
```
You choose: "2" or "update"

I respond:
  "Adding update to stream: v1.2.0-npm-package"
  "What progress note would you like to add?"

You respond: "Finished researching conversational interaction patterns"

I execute:
  - Add timestamped update entry
  - Show confirmation
  - Redisplay dashboard

I ask: "Dashboard action?" (back to menu)
```

### 3. Status (status, st, 3)

**Flow:**
```
You choose: "3" or "status"

I execute:
  - Display full /stream-status output
  - Show all goals, checkpoints, updates
  - Git state details
  - Context information

I ask: "Dashboard action?" (back to menu)
```

### 4. Switch (switch, sw, 4)

**Flow:**
```
You choose: "4" or "switch"

I display:
  "Available streams:"
  "1. v1.2.0-npm-package (active) - 50% complete"
  "2. phase3-stream-templates (completed)"
  "3. building-work-streams (completed)"

I ask: "Which stream? (number or name):"

You respond: "2" or "phase3-stream-templates"

I execute:
  - Switch to selected stream
  - Display stream status
  - Update .current-stream

I ask: "Dashboard action?" (back to menu)
```

### 5. Resume (resume, rs, 5)

**Flow:**
```
You choose: "5" or "resume"

I execute:
  - Show current stream status
  - Inject context if needed
  - Provide continuation guidance

I respond:
  "Resuming work on: v1.2.0-npm-package"
  "Next goal: Implement /stream-switch command"
  "Context: 55% - Healthy"
  "Ready to continue!"

I ask: "Dashboard action?" (back to menu)
```

### 6. End (end, 6)

**Flow:**
```
You choose: "6" or "end" or "end stream"

I confirm:
  "End stream: v1.2.0-npm-package?"
  "This will mark the stream as completed and generate a summary."
  "Continue? (yes/no):"

You respond: "yes"

I execute:
  - Generate comprehensive summary
  - Mark stream as completed
  - Clear .current-stream
  - Display completion summary

I ask: "Start new stream or exit? (new/exit):"
```

### 7. Config (config, cfg, 7)

**Flow:**
```
You choose: "7" or "config"

I display:
  "Configuration options:"
  "1. Show current configuration"
  "2. Set a value"
  "3. Reset to defaults"
  "4. Export configuration"
  "0. Back to dashboard"

[Launches /stream-config in submenu mode]
```

### 8. Templates (templates, tmp, 8)

**Flow:**
```
You choose: "8" or "templates"

I display:
  "Template actions:"
  "1. List available templates"
  "2. Show template details"
  "3. Create custom template"
  "0. Back to dashboard"

[Launches /stream-template in submenu mode]
```

### 9. Git (git, 9)

**Flow:**
```
You choose: "9" or "git"

I display:
  "Git operations:"
  "1. Commit current changes"
  "2. Push to remote"
  "3. View git status"
  "4. Create branch"
  "0. Back to dashboard"

[Launches /stream-git in submenu mode]
```

### 10. List (list, ls, 10)

**Flow:**
```
You choose: "10" or "list"

I execute:
  - Display full /stream-list output
  - Show all streams with details
  - Formatted table

I ask: "Dashboard action?" (back to menu)
```

### 11. Refresh (refresh, r, 11)

**Flow:**
```
You choose: "11" or "refresh" or "r"

I execute:
  - Re-read all stream data
  - Update git status
  - Recalculate recommendations
  - Redisplay dashboard

I ask: "Dashboard action?" (back to menu)
```

### 12. Help (help, h, 12)

**Flow:**
```
You choose: "12" or "help"

I display:
  - Available commands reference
  - Keyboard shortcuts
  - Tips and tricks
  - Documentation links

I ask: "Dashboard action?" (back to menu)
```

### 0. Exit (exit, quit, q, 0)

**Flow:**
```
You choose: "0" or "exit" or "quit" or "q"

I respond:
  "Exiting dashboard."
  "Dashboard session ended."

[Conversation returns to normal mode]
```

---

## Smart Recommendations

The dashboard analyzes current state and provides intelligent suggestions:

**Context-Based:**
- Context <60%: "✓ Plenty of context - continue working"
- Context 60-89%: "✓ Context healthy - safe to continue"
- Context 90-97%: "⚠ Context usage high - consider checkpoint soon"
- Context 98%+: "⚠⚠ Critical: Create checkpoint immediately"

**Time-Based:**
- Last checkpoint <15m ago: "Recent checkpoint - continue work"
- Last checkpoint 15-30m ago: "Good time for checkpoint if at milestone"
- Last checkpoint 30-60m ago: "Consider checkpoint (30m+ since last)"
- Last checkpoint >60m ago: "Recommended: Create checkpoint (1h+ elapsed)"

**Progress-Based:**
- Goals completed: "Milestone reached - good checkpoint opportunity"
- No progress: "No recent activity - resume work or switch streams"
- High activity: "Productive session - checkpoint to preserve progress"

**Git-Based:**
- Uncommitted >10 files: "Many uncommitted changes - consider git commit"
- Unpushed commits: "Local commits exist - consider git push"
- Clean state: "✓ Git clean - good state for checkpointing"

**Stream-Based:**
- No active stream: "No active stream - start new or resume existing"
- Multiple active: "⚠ Multiple active streams - focus recommended"
- Paused streams: "N paused streams - resume or end to keep organized"

---

## Display Modes

### Standard Mode (Default)

Full dashboard with all sections:
- Overview
- Smart Recommendation
- Active Streams
- Paused Streams (if any)
- Recent Activity
- Git Status
- Current Stream Details
- Completed Streams (last 5)

### Compact Mode (`--compact`)

```
─ WORK STREAMS DASHBOARD ─────────────────────────────
Streams: 3 (1 active, 2 completed) | Context: 55% ✓
Active: v1.2.0-npm-package (50% complete)
Last checkpoint: 5m ago | Uncommitted: 12 files

💡 Good time to continue work

Recent:
• Checkpoint "Dashboard design research" (5m ago)
• Checkpoint "Configuration complete" (30m ago)

Actions: 1=checkpoint 2=update 3=status 4=switch 0=exit
```

### Filtered Mode (`--filter active`)

Shows only streams matching filter:
- `--filter active` - Active streams only
- `--filter paused` - Paused streams only
- `--filter completed` - Completed streams only

### Sorted Mode (`--sort progress`)

Changes display order:
- `--sort updated` - Most recently updated first (default)
- `--sort created` - Most recently created first
- `--sort progress` - Highest progress first
- `--sort name` - Alphabetical

---

## Input Interpretation

I understand flexible input formats:

**Numbers:**
- `1`, `2`, `3` → Execute numbered action

**Action Names:**
- `checkpoint`, `update`, `switch` → Execute by name
- `cp`, `up`, `sw` → Shortcuts

**Natural Language:**
- "create a checkpoint" → Checkpoint action
- "I want to update the stream" → Update action
- "show me the status" → Status action
- "let me switch streams" → Switch action

**Partial Matches:**
- "check" → Checkpoint (fuzzy match)
- "conf" → Config
- "temp" → Templates

**Ambiguity Handling:**
```
You type: "s"

I respond:
  "Did you mean:"
  "1. status"
  "2. switch"
  "3. something else"

  "Clarify your choice:"
```

---

## Error Handling

**No Active Stream:**
```
┌─ DASHBOARD ─────────────────────────────────────────┐
│ No active work stream found                         │
└─────────────────────────────────────────────────────┘

What would you like to do?
1. Start new stream
2. Resume existing stream
3. View all streams
0. Exit

Your choice:
```

**No Streams Exist:**
```
┌─ GETTING STARTED ───────────────────────────────────┐
│ No work streams found in this project               │
│                                                      │
│ Get started:                                         │
│  1. /stream-start [name] - Start your first stream  │
│  2. /stream-init - Initialize work streams          │
│  3. /stream-template list - Browse templates        │
└─────────────────────────────────────────────────────┘

Initialize now? (yes/no):
```

**Invalid Choice:**
```
I don't recognize "xyz" as an action.

Valid options:
- Numbers: 0-12
- Actions: checkpoint, update, status, switch, exit, etc.
- Shortcuts: cp, up, st, sw, q
- Natural language: "create checkpoint", "update stream"

Try again:
```

---

## Examples

**Basic usage:**
```bash
/stream-dashboard
# Displays dashboard
# Shows menu
# Waits for your choice
# Loops until you exit
```

**Compact mode:**
```bash
/stream-dashboard --compact
# Shows condensed view
# Same interaction
```

**Direct action:**
```bash
/stream-dashboard checkpoint "Important milestone"
# Creates checkpoint immediately
# Skips menu
# Exits after completion
```

**Filtered view:**
```bash
/stream-dashboard --filter active
# Shows only active streams
# Interactive menu
```

**Combined options:**
```bash
/stream-dashboard --compact --filter active --sort progress
# Compact display
# Active streams only
# Sorted by progress
```

---

## Best Practices

**For Quick Actions:**
- Use direct execution: `/stream-dashboard checkpoint`
- Skip interactive menu when you know what you want

**For Exploration:**
- Use interactive mode: `/stream-dashboard`
- Browse options, get recommendations
- Learn available actions

**For Regular Check-ins:**
- Run `/stream-dashboard` periodically
- Check recommendations
- Monitor context usage
- Review recent activity

**For Team Workflows:**
- Use compact mode for quick standup view
- Filter by active to see current work
- Export git status for reporting

---

## Tips

- **Shortcuts:** Type first letters instead of full words (cp, up, sw)
- **Natural language:** Describe what you want, I'll understand
- **Quick exit:** Type 'q' or '0' to exit anytime
- **Action chaining:** After one action, dashboard reappears for next action
- **Smart defaults:** I suggest best next action based on state
- **Flexible navigation:** Jump to any action without menu (use direct execution)

---

## Technical Notes

**State Management:**
- Dashboard maintains conversation state
- Remembers "in dashboard mode" until exit
- Each action returns to dashboard unless explicitly exited

**Performance:**
- Streams data cached and refreshed on demand
- Git operations cached with 5-second TTL
- Smart recommendations calculated on each display

**Compatibility:**
- Works with all existing stream commands
- Composable with /stream-* command family
- Respects display configuration settings

**Extensibility:**
- Easy to add new actions to menu
- Recommendation engine can be enhanced
- Display sections can be customized via config
