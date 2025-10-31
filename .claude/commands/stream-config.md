# Stream Config

Manage Work Streams configuration with runtime updates, validation, and defaults management.

**Usage:** `/project:stream-config [action] [key] [value]`

**Actions:**
- `show` - Display current configuration with descriptions
- `set [key] [value]` - Set configuration value
- `get [key]` - Get specific configuration value
- `reset` - Reset all configuration to defaults
- `reset [key]` - Reset specific key to default
- `edit` - Open configuration file in editor (if available)
- `validate` - Validate current configuration
- `export` - Export configuration as shareable YAML
- `import [file]` - Import configuration from file

---

## Configuration Structure

**File:** `.claude-streams.config.yaml` (project root)

```yaml
# Work Streams Configuration v1.2.0
version: "1.2.0"

# Default behavior settings
defaults:
  branch_prefix: "feature/"       # Default git branch prefix
  checkpoint_interval: "30m"      # Auto-checkpoint reminder interval
  context_warning_threshold: 85   # Context usage % warning (of 164k usable)
  auto_resume: true              # Auto-resume last stream on startup
  default_template: null         # Default template (null = prompt)

# Template configuration
templates:
  default: "feature-development"  # Default template when not specified
  custom_path: ".claude/templates/custom"  # Custom templates directory
  auto_load: true                # Automatically load custom templates
  validate_schema: true          # Validate template YAML schema

# Git integration settings
git:
  auto_commit: false             # Auto-commit before checkpoints
  commit_prefix: true            # Add conventional commit prefixes
  neutral_messages: true         # Use neutral commit messages (no AI attribution)
  auto_create_branch: true       # Offer to create branch when starting stream
  auto_link_branch: true         # Automatically link to current branch
  branch_prefixes:
    feature: "feature/"
    bugfix: "bugfix/"
    refactor: "refactor/"
    docs: "docs/"
    hotfix: "hotfix/"

# Context monitoring (based on 164k effective usable space)
# Note: Claude Code has 200k total, but ~36k overhead = ~164k usable
# Auto-compact triggers at ~155k tokens (95% of usable)
context:
  thresholds:
    healthy: 75                  # <75%: healthy (~123k tokens)
    monitor: 85                  # 75-85%: start monitoring (~139k tokens)
    warning: 90                  # 85-90%: create checkpoint soon (~148k tokens)
    critical: 95                 # 90-95%: checkpoint immediately (~156k tokens)
  auto_checkpoint: false         # Auto-create checkpoint at threshold
  auto_inject: true             # Auto-inject context on resume

# Team collaboration (experimental)
team:
  enabled: false                 # Enable team features
  sync_remote: null              # Remote sync path (network drive, S3, etc)
  handoff_enabled: false         # Enable stream handoffs between developers
  shared_templates: false        # Share custom templates with team
  conflict_resolution: "prompt"  # How to handle conflicts (prompt, auto, manual)

# Display and UI preferences
display:
  use_colors: true               # Colorized output
  use_icons: true                # Icons in output (✓, ✗, •, etc)
  compact_mode: false            # Compact output format
  timestamp_format: "relative"   # relative, absolute, iso
  show_git_status: true          # Show git status in stream-status

# Advanced settings
advanced:
  compress_checkpoints: false    # Compress old checkpoints
  checkpoint_retention_days: 90  # Days to keep checkpoints (0 = forever)
  auto_cleanup_completed: false  # Auto-archive completed streams
  backup_before_changes: true    # Backup config before modifications
  strict_validation: true        # Strict YAML validation
  log_level: "info"             # Logging level (debug, info, warn, error)
```

---

## Actions Reference

### 1. Show Configuration

Display current configuration with descriptions.

**Usage:**
```bash
/stream-config show
/stream-config show --defaults  # Show default values
/stream-config show --modified  # Show only modified values
```

**Output:**
```yaml
Work Streams Configuration v1.2.0
Location: /path/to/project/.claude-streams.config.yaml

defaults:
  branch_prefix: "feature/"
  checkpoint_interval: "30m"
  context_warning_threshold: 90
  auto_resume: true
  default_template: null

templates:
  default: "feature-development"
  custom_path: ".claude/templates/custom"
  auto_load: true
  validate_schema: true

git:
  auto_commit: false
  commit_prefix: true
  neutral_messages: true
  auto_create_branch: true
  auto_link_branch: true

[...full configuration...]

Modified from defaults: 3 settings
  • templates.default: "feature-development" (was: null)
  • git.auto_create_branch: true (was: false)
  • display.compact_mode: true (was: false)
```

### 2. Set Configuration

Set a configuration value with validation.

**Usage:**
```bash
/stream-config set [key] [value]
```

**Key Format:**
- Use dot notation: `section.subsection.key`
- Arrays use index: `git.branch_prefixes[0]`
- Nested objects: `context.thresholds.healthy`

**Examples:**
```bash
# Set default template
/stream-config set templates.default "feature-development"

# Set context threshold
/stream-config set context.thresholds.warning 95

# Enable team features
/stream-config set team.enabled true

# Set branch prefix
/stream-config set defaults.branch_prefix "feat/"

# Set checkpoint interval
/stream-config set defaults.checkpoint_interval "45m"

# Enable auto-resume
/stream-config set defaults.auto_resume false
```

**Output:**
```
✓ Configuration Updated

Key: templates.default
Old value: null
New value: "feature-development"

Configuration saved to: .claude-streams.config.yaml
```

**Validation:**
- Type checking (string, number, boolean)
- Range validation (e.g., thresholds 0-100)
- Enum validation (e.g., timestamp_format: relative|absolute|iso)
- Path validation (directories exist)
- Dependencies (some settings require others)

### 3. Get Configuration

Retrieve a specific configuration value.

**Usage:**
```bash
/stream-config get [key]
```

**Examples:**
```bash
/stream-config get templates.default
# Output: "feature-development"

/stream-config get context.thresholds.warning
# Output: 97

/stream-config get git.neutral_messages
# Output: true

/stream-config get team.enabled
# Output: false
```

**Output:**
```
Configuration Value

Key: git.neutral_messages
Value: true
Type: boolean
Default: true
Description: Use neutral commit messages without AI attribution

Source: .claude-streams.config.yaml
```

### 4. Reset Configuration

Reset configuration to defaults.

**Usage:**
```bash
/stream-config reset           # Reset all configuration
/stream-config reset [key]     # Reset specific key
```

**Examples:**
```bash
# Reset all configuration
/stream-config reset

# Reset specific section
/stream-config reset templates

# Reset specific key
/stream-config reset templates.default
```

**Output:**
```
⚠ Reset Configuration

This will reset configuration to defaults.
Current customizations will be lost.

Modified settings that will be reset:
  • templates.default: "feature-development" → null
  • git.auto_create_branch: true → false
  • display.compact_mode: true → false

Continue? (y/n)

✓ Configuration reset to defaults
Backup saved to: .claude-streams.config.yaml.backup
```

### 5. Edit Configuration

Open configuration file in editor (if available).

**Usage:**
```bash
/stream-config edit
```

**Process:**
1. Check if editor is available (EDITOR env var)
2. Backup current configuration
3. Open file in editor
4. Wait for editor to close
5. Validate new configuration
6. Apply if valid, rollback if invalid

**Output:**
```
Opening configuration in editor...
Editor: vim

Waiting for editor to close...

✓ Configuration updated successfully
Validated: No errors
Changes detected: 2 settings modified
```

### 6. Validate Configuration

Validate current configuration against schema.

**Usage:**
```bash
/stream-config validate
```

**Output:**
```
✓ Configuration Valid

File: .claude-streams.config.yaml
Version: 1.2.0
Settings: 45
Modified: 3
Errors: 0
Warnings: 1

Warnings:
  ⚠ team.sync_remote: Set but team.enabled is false
    Suggestion: Enable team features or remove sync_remote setting
```

**Validation Checks:**
- YAML syntax
- Version compatibility
- Type correctness
- Value ranges
- Required fields
- Deprecated settings
- Conflicting settings
- Path existence

### 7. Export Configuration

Export configuration as shareable YAML (without local paths).

**Usage:**
```bash
/stream-config export
/stream-config export --file config-export.yaml
```

**Output:**
```
✓ Configuration Exported

Exported to: work-streams-config-export.yaml

Shareable configuration created with:
  • Local paths converted to placeholders
  • Sensitive data removed
  • Comments added for clarity
  • Team settings preserved

Share this file with your team to maintain consistent settings.
```

### 8. Import Configuration

Import configuration from file.

**Usage:**
```bash
/stream-config import [file]
/stream-config import config-export.yaml
```

**Process:**
1. Validate import file
2. Show diff with current config
3. Prompt for confirmation
4. Backup current config
5. Merge or replace settings
6. Validate final configuration

**Output:**
```
Import Configuration

Source: config-export.yaml
Changes to apply:

Added:
  + team.enabled: true
  + team.sync_remote: "/shared/streams"

Modified:
  ~ templates.default: null → "feature-development"
  ~ git.auto_create_branch: false → true

Removed:
  - display.compact_mode

Apply changes? (y/n)

✓ Configuration imported successfully
Settings applied: 5
Backup saved to: .claude-streams.config.yaml.backup
```

---

## Configuration Options Reference

### defaults

**branch_prefix** (string, default: "feature/")
- Default git branch prefix for new streams
- Used when auto-creating branches
- Can be overridden by template settings

**checkpoint_interval** (duration, default: "30m")
- Auto-checkpoint reminder interval
- Format: "30m", "1h", "45m"
- Set to "0" or "off" to disable reminders

**context_warning_threshold** (number, default: 90)
- Context usage percentage to show warning
- Range: 0-100
- Triggers checkpoint recommendations

**auto_resume** (boolean, default: true)
- Automatically resume last active stream
- On startup or after context boundary
- Can be overridden with explicit /stream-start

**default_template** (string, default: null)
- Default template to use when not specified
- Set to null to always prompt
- Must be valid template name

### templates

**default** (string, default: null)
- Default template for /stream-start
- Overrides defaults.default_template
- Options: "feature-development", "bug-fix", "refactoring", "documentation", custom

**custom_path** (string, default: ".claude/templates/custom")
- Directory for custom templates
- Relative to project root
- Must exist if auto_load is true

**auto_load** (boolean, default: true)
- Automatically load custom templates
- Scans custom_path on startup
- Validates template schema

**validate_schema** (boolean, default: true)
- Validate template YAML schema
- Strict schema checking
- Prevents malformed templates

### git

**auto_commit** (boolean, default: false)
- Automatically commit before checkpoints
- Includes all tracked changes
- Uses neutral commit messages

**commit_prefix** (boolean, default: true)
- Add conventional commit prefixes
- Format: "feat:", "fix:", "docs:", etc.
- Based on stream template type

**neutral_messages** (boolean, default: true)
- Use neutral commit messages
- No AI/tool attribution
- Professional, descriptive messages

**auto_create_branch** (boolean, default: true)
- Offer to create branch when starting stream
- Uses template branch prefix
- Prompts user for confirmation

**auto_link_branch** (boolean, default: true)
- Automatically link stream to current branch
- Tracks branch in stream metadata
- Detects branch switches

**branch_prefixes** (object)
- Branch naming conventions by type
- feature: "feature/"
- bugfix: "bugfix/"
- refactor: "refactor/"
- docs: "docs/"
- hotfix: "hotfix/"

### context

**thresholds** (object)
- healthy (number, 0-100): Below this is healthy
- monitor (number, 0-100): Start monitoring
- warning (number, 0-100): Create checkpoint soon
- critical (number, 0-100): Checkpoint immediately

**auto_checkpoint** (boolean, default: false)
- Automatically create checkpoint at threshold
- Uses warning threshold as trigger
- Experimental feature

**auto_inject** (boolean, default: true)
- Automatically inject context on resume
- Uses smart summarization
- Keeps context under 2000 tokens

### team

**enabled** (boolean, default: false)
- Enable team collaboration features
- Requires sync_remote configuration
- Experimental feature

**sync_remote** (string, default: null)
- Remote sync path for shared streams
- Network drive, S3, cloud storage
- Must be accessible by all team members

**handoff_enabled** (boolean, default: false)
- Enable stream handoffs between developers
- Requires team.enabled = true
- Tracks handoff history

**shared_templates** (boolean, default: false)
- Share custom templates with team
- Syncs to sync_remote
- Enables team template library

**conflict_resolution** (string, default: "prompt")
- How to handle sync conflicts
- Options: "prompt", "auto", "manual"
- "auto" uses last-write-wins

### display

**use_colors** (boolean, default: true)
- Colorized terminal output
- Improves readability
- Disable for logging/CI

**use_icons** (boolean, default: true)
- Use Unicode icons (✓, ✗, •, →)
- Enhances visual feedback
- Disable for basic terminals

**compact_mode** (boolean, default: false)
- Compact output format
- Less whitespace and detail
- Useful for CI/CD environments

**timestamp_format** (string, default: "relative")
- Timestamp display format
- Options: "relative" (2 hours ago), "absolute" (14:30), "iso" (2025-10-31T18:00:00Z)

**show_git_status** (boolean, default: true)
- Show git status in /stream-status
- Includes branch, commits, changes
- Disable for faster status checks

### advanced

**compress_checkpoints** (boolean, default: false)
- Compress old checkpoints to save space
- Uses gzip compression
- Automatic decompression on read

**checkpoint_retention_days** (number, default: 90)
- Days to keep checkpoints
- 0 = keep forever
- Automatic cleanup when exceeded

**auto_cleanup_completed** (boolean, default: false)
- Automatically archive completed streams
- Moves to .claude/streams/archive/
- Preserves metadata

**backup_before_changes** (boolean, default: true)
- Backup config before modifications
- Saves to .claude-streams.config.yaml.backup
- Automatic rollback on error

**strict_validation** (boolean, default: true)
- Strict YAML validation
- Prevents invalid configurations
- Disable to allow experimental settings

**log_level** (string, default: "info")
- Logging verbosity
- Options: "debug", "info", "warn", "error"
- Debug shows all operations

---

## Examples

**Configure for team development:**
```bash
/stream-config set team.enabled true
/stream-config set team.sync_remote "/mnt/shared/work-streams"
/stream-config set team.handoff_enabled true
```

**Set up custom branch prefixes:**
```bash
/stream-config set git.branch_prefixes.feature "feat/"
/stream-config set git.branch_prefixes.bugfix "bug/"
```

**Configure context monitoring:**
```bash
/stream-config set context.thresholds.warning 95
/stream-config set context.thresholds.critical 98
/stream-config set context.auto_inject true
```

**Enable auto-checkpoint:**
```bash
/stream-config set defaults.checkpoint_interval "20m"
/stream-config set context.auto_checkpoint true
```

**Share configuration with team:**
```bash
/stream-config export --file team-config.yaml
# Share team-config.yaml with team
# Team members: /stream-config import team-config.yaml
```

---

## Error Handling

**Invalid key:**
```
✗ Configuration Error

Key not found: invalid.key.path
Did you mean: defaults.branch_prefix?

Valid sections: defaults, templates, git, context, team, display, advanced
Use /stream-config show to see all available keys
```

**Invalid value:**
```
✗ Validation Error

Key: context.thresholds.warning
Value: 150
Error: Value out of range (0-100)

Valid range: 0-100
Current value: 97
```

**Type mismatch:**
```
✗ Type Error

Key: defaults.auto_resume
Expected: boolean
Received: "yes" (string)

Valid values: true, false
```

---

## Notes

- Configuration is project-specific (stored in project root)
- Global configuration: `~/.claude/work-streams.config.yaml`
- Project config overrides global config
- Changes take effect immediately
- Backup created before destructive operations
- Validation prevents invalid configurations
- Export/import enables team configuration sharing
