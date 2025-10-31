---
description: Initialize Work Streams plugin with conversational setup wizard
allowed-tools: [bash, read, write]
---

# Stream Init

Initialize Work Streams plugin in a new or existing project with full setup and configuration.

**Usage:** `/project:stream-init [options]`

**Aliases:** `/project:init-streams`, `/project:setup-streams`

**Options:**
- `--templates [all|minimal|custom]` - Install templates (default: all)
- `--git-hooks` - Set up git hooks for stream management
- `--team` - Enable team collaboration features
- `--interactive` - Interactive setup wizard (default if no options provided)
- `--skip-gitignore` - Don't prompt about .gitignore
- `--upgrade` - Upgrade existing installation
- `--reconfigure` - Reconfigure existing installation
- `--repair` - Repair broken installation

---

## How It Works

**Conversational Flow:**
1. I check if work streams is already initialized
2. If existing installation found, I show upgrade/reconfigure options
3. For new installation, I guide you through interactive setup
4. Each step: I explain options → You choose → I apply and confirm
5. After installation: I show summary and quick start guide

**Flexible Input:**
- Type a number: `1`, `2`, `3`
- Type option name: `all`, `minimal`, `yes`, `no`
- Natural language: `install all templates`, `skip git hooks`

**Direct Installation:**
- With options: Skip wizard, install directly
- Without options: Interactive wizard (recommended for first time)

---

## Installation Process

**Step 1: Pre-flight Checks**

I check if `.claude/` directory exists and if work streams is already initialized.

**If new installation:**
```
┌─ WORK STREAMS INITIALIZATION ──────────────────────────────┐
│ Welcome to Claude Work Streams v1.2.0                       │
│ Intelligent session management for Claude Code             │
└─────────────────────────────────────────────────────────────┘

No existing installation found.
Starting fresh installation...

I'll guide you through 4 quick setup steps:
  1. Template selection
  2. Git hooks (optional)
  3. Team features (optional)
  4. Git configuration

Ready to begin? (yes/no):
```

**If existing installation:**
```
⚠ Work Streams Already Initialized

Found existing installation:
  Location: .claude/
  Version: 1.1.0
  Commands: 11
  Templates: 4
  Streams: 3 (2 active, 1 completed)

What would you like to do?
  1. Upgrade to v1.2.0 (preserves all streams)
  2. Reconfigure settings (keeps installation, changes config)
  3. Repair installation (fixes broken files)
  4. Cancel (do nothing)

Your choice:
```

**Step 2: Directory Structure**

I create the following structure:
```
.claude/
  commands/        # All stream commands
  templates/       # Workflow templates
    custom/        # User custom templates
  streams/         # Stream metadata storage
  hooks/           # Git hooks (optional)
```

**Step 3: Interactive Setup Steps**

### Setup Step 1: Template Selection

```
────────────────────────────────────────────────────────────
STEP 1 of 4: Template Selection
────────────────────────────────────────────────────────────

Templates provide pre-configured workflows for common tasks.

Which templates would you like to install?

  1. All templates (recommended)
     • feature-development - Feature implementation workflow
     • bug-fix - Systematic bug fixing
     • refactoring - Code improvement
     • documentation - Documentation creation

  2. Minimal (feature-development only)
     • Installs only feature-development template
     • Faster installation, essential workflow only

  3. Custom templates only
     • No built-in templates installed
     • Create your own templates from scratch

Type number (1-3) or name (all/minimal/custom):
```

You respond with your choice (e.g., `1`, `all`, or `install all templates`)

I apply your choice and confirm:
```
✓ Installing all templates...
  ✓ feature-development.yaml
  ✓ bug-fix.yaml
  ✓ refactoring.yaml
  ✓ documentation.yaml
  ✓ custom/README.md

4 templates installed successfully.
```

### Setup Step 2: Git Hooks

```
────────────────────────────────────────────────────────────
STEP 2 of 4: Git Hooks (Optional)
────────────────────────────────────────────────────────────

Git hooks enable automatic stream management during git operations.

Features:
  ✓ Auto-save checkpoint before commits
  ✓ Detect branch switches
  ✓ Warn about uncommitted stream changes
  ✓ Link streams to branches automatically

This is optional and can be disabled later.

Install git hooks? (yes/no):
```

You respond: `yes`, `no`, `skip`, etc.

If yes:
```
✓ Installing git hooks...
  ✓ .claude/hooks/pre-commit created
  ✓ .claude/hooks/post-checkout created

Git hooks installed successfully.
```

If no:
```
⊘ Skipping git hooks installation.
  You can install later with: /stream-init --git-hooks
```

### Setup Step 3: Team Features

```
────────────────────────────────────────────────────────────
STEP 3 of 4: Team Features (Experimental)
────────────────────────────────────────────────────────────

Team features enable collaboration on shared streams.

Features:
  • Shared stream access across team members
  • Multi-user visibility and coordination
  • Conflict resolution for concurrent work

Requirements:
  ⚠ Shared network drive or cloud storage (Dropbox, OneDrive, etc.)
  ⚠ All team members must have access to shared path

Note: This is experimental. Skip if you're working solo.

Enable team features? (yes/no):
```

If yes:
```
✓ Enabling team features...

Enter shared streams path (accessible by all team members):
Example: /mnt/shared/project-streams or ~/Dropbox/team-streams

Path:
```

You provide path: `/mnt/shared/my-project-streams`

```
✓ Team features configured
  Shared path: /mnt/shared/my-project-streams
  ✓ Directory exists and is writable
```

If no:
```
⊘ Skipping team features.
  Working in solo mode (default).
```

### Setup Step 4: Git Configuration

```
────────────────────────────────────────────────────────────
STEP 4 of 4: Git Configuration
────────────────────────────────────────────────────────────

Configure how .claude/ directory is handled in git.

Options:

  1. Add streams/ to .gitignore (recommended)
     • Keeps user stream data private
     • Shares commands and templates with team
     • Each developer has their own streams

  2. Commit everything
     • Include all streams in repository
     • Share streams across team via git
     • All stream history committed

  3. Skip (manual configuration)
     • I'll configure .gitignore myself
     • No changes to git configuration

What would you like to do? (1-3):
```

You choose option `1`

```
✓ Configuring git...
  ✓ Added '.claude/streams/' to .gitignore
  ✓ Added '.claude-streams.config.yaml' to .gitignore (user-specific)

Configuration:
  • .claude/commands/ - Tracked (shared with team)
  • .claude/templates/ - Tracked (shared with team)
  • .claude/streams/ - Ignored (private)
  • .claude-streams.config.yaml - Ignored (private)
```

**Step 4: Configuration File**

```
✓ Creating configuration file...
  ✓ .claude-streams.config.yaml created

Configuration:
  version: "1.2.0"
  templates: all (4 templates)
  git_hooks: enabled
  team: disabled
  git_ignore: enabled
```

Generated configuration:
```yaml
# Work Streams Configuration
version: "1.2.0"

context_thresholds:
  healthy: 90
  monitor: 94
  warning: 97
  critical: 98

stream:
  auto_checkpoint_interval: 30
  default_template: null
  auto_git_link: true

git:
  auto_create_branch: true
  branch_prefixes:
    feature: "feature/"
    bugfix: "bugfix/"
    refactor: "refactor/"
    docs: "docs/"

templates:
  custom_directory: "custom"
  auto_load_custom: true

team:
  enabled: false
  shared_streams_path: null
```

## Installation Complete

After all setup steps complete, I show this summary:

```
╔═════════════════════════════════════════════════════════════════════════════╗
║                    WORK STREAMS INSTALLATION COMPLETE                        ║
╚═════════════════════════════════════════════════════════════════════════════╝

Installation Summary:
  ✓ Commands:     13 commands installed
  ✓ Templates:    4 templates installed
  ✓ Configuration: .claude-streams.config.yaml created
  ✓ Git Hooks:    Installed
  ✓ Git Ignore:   Configured

Installed Commands:
  • /stream-start - Start new work stream
  • /stream-status - View current stream
  • /stream-checkpoint - Save progress
  • /stream-update - Quick progress note
  • /stream-end - Complete stream
  • /stream-resume - Resume previous stream
  • /stream-list - View all streams
  • /stream-switch - Switch between streams
  • /stream-dashboard - Interactive dashboard
  • /stream-config - Configuration management
  • /stream-template - Manage templates
  • /stream-context-check - Monitor context
  • /stream-context-inject - Generate context
  • /stream-git - Git integration
  • /stream-init - Initialize plugin (this command)

Installed Templates:
  • feature-development - Feature implementation workflow
  • bug-fix - Systematic bug fixing
  • refactoring - Code improvement
  • documentation - Documentation creation

Quick Start:
  1. View templates:    /stream-template list
  2. Start first stream: /stream-start my-feature
  3. Open dashboard:    /stream-dashboard

Next Steps:
  • Review configuration: .claude-streams.config.yaml
  • Explore templates: /stream-template list
  • Start your first stream: /stream-start [name]

Documentation: https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams

Ready to start your first work stream? (yes/no):
```

If you say yes:
```
Great! Let's start your first stream.

What's the name of your first stream?
Example: feature-authentication, bug-fix-login, refactor-api

Stream name:
```

---

## Upgrade Flow

When existing installation is found, I present these options:

```
⚠ Work Streams Already Initialized

Found existing installation:
  Location: .claude/
  Version: 1.1.0
  Commands: 11
  Templates: 4
  Streams: 3 (2 active, 1 completed)

What would you like to do?
  1. Upgrade to v1.2.0 (preserves all streams)
  2. Reconfigure settings (keeps installation, changes config)
  3. Repair installation (fixes broken files)
  4. Cancel (do nothing)

Your choice:
```

### Option 1: Upgrade

You choose: `1` or `upgrade`

```
Upgrading to v1.2.0...

Upgrade plan:
  ✓ Preserve all existing streams (3 streams)
  ✓ Keep current configuration
  ✓ Add new commands (/stream-dashboard, /stream-switch, /stream-config)
  ✓ Update existing commands to v1.2.0
  ✓ Migrate configuration format if needed

Proceed with upgrade? (yes/no):
```

You confirm: `yes`

```
✓ Backing up current installation...
  ✓ Backup created: .claude-backup-2025-10-31

✓ Upgrading commands...
  ✓ Updated 11 existing commands
  ✓ Added 3 new commands

✓ Migrating configuration...
  ✓ Configuration migrated to v1.2.0 format
  ✓ All settings preserved

✓ Verifying streams...
  ✓ 3 streams verified and compatible

╔═════════════════════════════════════════════════════════════╗
║              UPGRADE COMPLETE                                ║
╚═════════════════════════════════════════════════════════════╝

Upgraded from v1.1.0 to v1.2.0

New features:
  • /stream-dashboard - Interactive dashboard with smart recommendations
  • /stream-switch - Switch between streams with fuzzy matching
  • /stream-config - Full configuration management

Your streams are preserved and ready to use.
```

### Option 2: Reconfigure

You choose: `2` or `reconfigure`

```
Reconfiguring Work Streams...

This will update your configuration but preserve all streams.

I'll guide you through the same 4 setup steps:
  1. Template selection
  2. Git hooks
  3. Team features
  4. Git configuration

Current configuration will be backed up.

Continue? (yes/no):
```

[Proceeds through same interactive steps as new installation]

### Option 3: Repair

You choose: `3` or `repair`

```
Repairing installation...

Checking for issues:
  ✓ .claude/commands/ - OK
  ✓ .claude/templates/ - OK
  ✓ .claude/streams/ - OK
  ⚠ .claude-streams.config.yaml - Missing

Issues found:
  • Configuration file missing

Repair actions:
  1. Regenerate missing configuration file
  2. Restore from backup if available

Proceed with repair? (yes/no):
```

You confirm: `yes`

```
✓ Repairing installation...
  ✓ Regenerated .claude-streams.config.yaml
  ✓ All commands verified
  ✓ All templates verified

Installation repaired successfully.
```

---

## Error Handling

**Permission Error:**
```
✗ Installation Failed

Error: Permission denied writing to .claude/commands/

Troubleshooting:
  • Check write permissions for current directory
  • Try: chmod -R u+w .claude/
  • Or run with appropriate permissions

Retry installation? (yes/no):
```

**Disk Space Error:**
```
✗ Installation Failed

Error: Insufficient disk space

Required: 2 MB
Available: 0.5 MB

Please free up disk space and try again.
```

**Partial Installation:**
```
⚠ Installation Incomplete

Installation was interrupted.
Found partial installation:
  ✓ Commands: 5/13 installed
  ✗ Templates: 0/4 installed
  ✗ Configuration: Not created

What would you like to do?
  1. Resume installation (recommended)
  2. Clean up and start over
  3. Cancel

Your choice:
```

---

## Examples

**Interactive setup (default):**
```bash
/stream-init
# Launches conversational wizard
# Guides through all 4 setup steps
# Waits for your input at each step
```

**Quick setup with options:**
```bash
/stream-init --templates all --git-hooks
# Installs all templates and git hooks
# Skips interactive prompts for these options
# Still prompts for team features and git config
```

**Minimal non-interactive:**
```bash
/stream-init --templates minimal --skip-gitignore
# Installs only feature-development template
# Skips all gitignore prompts
# Uses defaults for everything else
```

**Upgrade existing:**
```bash
/stream-init --upgrade
# Directly enters upgrade flow
# Skips detection, assumes upgrade wanted
```

**Reconfigure:**
```bash
/stream-init --reconfigure
# Launches reconfiguration wizard
# Preserves streams, updates settings
```

**Repair installation:**
```bash
/stream-init --repair
# Detects and fixes issues
# Regenerates missing files
```

---

## Direct Installation Modes

**All options specified:**
```bash
/stream-init --templates all --git-hooks --team --skip-gitignore
# Completely non-interactive
# Installs with all specified options
# Uses defaults for unspecified settings
```

**Response:**
```
✓ Work Streams Initialized (non-interactive mode)

Installation:
  ✓ Templates: all (4 templates)
  ✓ Git hooks: enabled
  ✓ Team features: enabled
  ✓ Git ignore: skipped

13 commands and 4 templates installed.

Run /stream-dashboard to get started.
```

---

## Best Practices

**For First-Time Users:**
- Use interactive mode: `/stream-init` (no options)
- Read explanations for each step
- Choose "all templates" to explore options
- Enable git hooks (optional but helpful)
- Skip team features unless working with team

**For Quick Setup:**
- Use: `/stream-init --templates all`
- Defaults work well for most projects
- Can reconfigure later with `/stream-init --reconfigure`

**For Team Setup:**
- Coordinate shared path before installation
- Use: `/stream-init --team`
- Ensure all team members have access to shared path
- Test with one member first

**For Upgrades:**
- Always use: `/stream-init --upgrade`
- Review release notes first
- Backup is automatic, but verify it exists
- Test new features after upgrade

---

## Technical Notes

**File Operations:**
- Check existing installation before any writes
- Create directory structure with proper permissions (755)
- Copy command files from package installation
- Generate configuration from user choices
- Backup existing files before overwrite

**Safety Mechanisms:**
- Pre-flight permission checks
- Automatic backup before upgrade
- Rollback on failure (deletes partial installation)
- Validation of all copied files
- Idempotent operation (safe to re-run)

**Template Installation:**
- **all**: Copies all 4 core templates + custom README
- **minimal**: Copies feature-development.yaml + custom README
- **custom**: Copies only custom/README.md

**Configuration:**
- Generated from user choices during setup
- YAML format for human readability
- Can be manually edited after installation
- Validated on load by all stream commands

**Git Integration:**
- `.gitignore` updates are optional
- Recommended: ignore `.claude/streams/` (private data)
- Recommended: ignore `.claude-streams.config.yaml` (user-specific)
- Keep `.claude/commands/` and `.claude/templates/` tracked (shared)

**Upgrade Safety:**
- Preserves all existing streams
- Migrates configuration to new format
- Adds new commands without removing old
- Backup created automatically
- Can rollback if issues detected

---

## Tips

- **First time?** Use interactive mode to learn options
- **Experienced?** Use direct options to skip wizard
- **Upgrading?** Always use `--upgrade` flag for safety
- **Problems?** Use `--repair` to fix issues
- **Team work?** Coordinate shared path before setup
- **Reconfigure anytime:** `/stream-init --reconfigure`
- **Custom templates:** Add to `.claude/templates/custom/` anytime
