<p align="center">
  <img src=".github/logo.svg" alt="Work Streams - Never Lose Context Again" width="800">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/development/.github/mvp-badge.svg" alt="NPM Package Release v1.2.1" width="800">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@tachyonoid/work-streams"><img src="https://img.shields.io/npm/v/@tachyonoid/work-streams.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@tachyonoid/work-streams"><img src="https://img.shields.io/npm/dm/@tachyonoid/work-streams.svg" alt="npm downloads"></a>
  <a href="https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@tachyonoid/work-streams.svg" alt="license"></a>
</p>

---

## Release Notes

### v1.2.0 - NPM Package & Enhanced Developer Experience (Current Release)

This release transforms Work Streams into a professional NPM package with conversational commands and enhanced configuration management.

**New Features**:
• NPM Package: Install globally or per-project with `npm install -g @tachyonoid/work-streams`
• Interactive Setup: New `/stream-init` command with conversational wizard
• Configuration Management: New `/stream-config` command with full CRUD operations
• Interactive Dashboard: Redesigned `/stream-dashboard` with conversational menu (12 actions)
• Stream Switcher: New `/stream-switch` command with fuzzy matching
• Conversational UX: All interactive commands use natural, conversational flow
• Enhanced Templates: Interactive template browser with detailed previews
• Comprehensive API: Programmatic library access for automation

**Technical Improvements**:
• Conversational interaction pattern (no fake TUI elements)
• Smart recommendations based on context, time, and progress
• Flexible input interpretation (numbers, names, natural language)
• Progressive autonomy approach for intelligent assistance
• CLI and library exports for maximum flexibility

### v1.1.0 - Stream Templates

Added comprehensive template system providing structured guidance for common development workflows.

### v1.0.0 - MVP Release

Initial release with core stream management functionality.

### Current Functionality
• 15 comprehensive commands for stream management
• NPM package for easy installation and updates
• Interactive conversational commands (dashboard, switch, init, config)
• Stream templates for common development workflows
• Template-driven workflow guidance with pre-defined goals
• Smart context injection and restoration
• Full configuration management with CRUD operations
• Git integration with branch tracking and commits
• Context monitoring with optimised thresholds
• Programmatic API for automation
• File based YAML metadata storage
• Tested with real context compaction scenarios

### What's New in v1.2.0

**Addressed in This Release:**
• Interactive conversational commands (dashboard, switch, init, config)
• Configuration management with full CRUD operations
• Fuzzy matching for stream selection
• Smart recommendations based on context and time
• Comprehensive documentation (Installation, API, Examples, Changelog)
• Programmatic API for automation
• Factually correct context monitoring (164k effective limit)
• NPM package distribution

**Future Enhancements (v1.3.0+)**

**Git Integration:**
• Remote sync detection and conflict handling
• Branch protection awareness
• Stash management
• Advanced merge conflict support

**Stream Management:**
• Advanced search and filtering
• Automated archiving and cleanup
• Stream merge and split capabilities
• Stream dependencies and linking

**Collaboration (v2.0.0):**
• Multi-developer support
• Stream sharing mechanisms
• Conflict resolution for shared streams
• Access control and permissions

**Analytics (v2.1.0):**
• Export to markdown/HTML reports
• Development metrics and insights
• Automated checkpoint suggestions based on AI
• Velocity tracking

### Roadmap

**v1.2.0: NPM Package & Enhanced UX (Current Release)** ✓
• NPM package distribution ✓
• Interactive conversational commands ✓
• Configuration management (8 CRUD operations) ✓
• Interactive dashboard with 12 actions ✓
• Stream switcher with fuzzy matching ✓
• Comprehensive documentation ✓
• Programmatic API ✓
• Corrected context monitoring (164k limit) ✓

**v1.3.0: Enhanced Stability (Next)**
• Comprehensive error handling
• Input validation and sanitization
• Automatic recovery mechanisms
• Progress indicators for long operations
• Advanced search and filtering

**v1.4.0: Advanced Git Integration**
• Remote sync detection
• Merge conflict helpers
• Branch protection awareness
• Stash management
• PR integration

**v2.0.0: Claude Agent SDK Integration**
• AI-powered stream insights
• Multi-stream orchestration
• Advanced context management
• Template-driven AI assistance
• Intelligent checkpoint suggestions

**v2.1.0: Team Collaboration**
• Multi-developer support
• Stream sharing and permissions
• Conflict resolution
• Team coordination features
• Shared templates

**Contributions Welcome**: Feature requests, bug reports, and pull requests encouraged at [GitHub Issues](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues).

---

## The Problem

When working on complex features in Claude Code, you often hit context limits and need to start fresh sessions. This breaks your workflow as you manually track what you were doing, copy context, and re-explain your progress. Traditional session management tools are just note-taking systems that don't solve the real problem.

## The Solution

Claude Work Streams provides true session continuity by automatically preserving context, linking related sessions, and enabling seamless transitions when context limits are reached. Focus on building, not managing sessions.

## Features

**Core Workflow Management:**
- **Stream Templates**: Pre-configured workflows for common development patterns (feature, bug-fix, refactoring, documentation)
- **Template-Driven Workflows**: Pre-defined goals, checkpoint guidance, and best practices for each workflow type
- **Work Stream Tracking**: Group related work into continuous streams spanning multiple sessions
- **Flexible Progress Tracking**: Lightweight updates and comprehensive checkpoints
- **Custom Templates**: Create your own templates for recurring workflows

**New in v1.2.0:**
- **Interactive Dashboard**: Conversational dashboard with 12 actions and smart recommendations
- **Stream Switcher**: Fuzzy matching stream selector with preview and auto-resume
- **Configuration Management**: Full CRUD operations (8 actions) with validation
- **NPM Distribution**: Install globally or per-project, programmatic API access
- **Accurate Context Monitoring**: Based on factual 164k effective limit (not 200k theoretical)

**Context & Continuity:**
- **Smart Context Injection**: Automatic context restoration with intelligent summarization (under 2000 tokens)
- **Seamless Continuity**: Resume work streams with full context automatically injected
- **Context Monitoring**: Real-time usage tracking with accurate thresholds (75%/85%/90%/95%)
- **Auto-Compact Awareness**: Warnings before Claude Code's auto-compact at 155k tokens

**Git Integration:**
- **Branch Management**: Full git support with branch tracking and linking
- **Commit Management**: Neutral commits with conventional commit format
- **State Monitoring**: Track git status, branches, and synchronization
- **Professional Messages**: No AI attribution in commits

**Developer Experience:**
- **Conversational Commands**: Natural interaction (no fake TUI elements)
- **Flexible Input**: Numbers, names, or natural language
- **Smart Recommendations**: Based on context usage, time, and progress
- **Programmatic API**: 7 functions for automation and scripting

## Installation

### Method 1: NPM Package (Recommended)

Install globally for use across all projects:

```bash
# Install globally
npm install -g @tachyonoid/work-streams

# Initialize in your project
npx stream-init
```

Or install per-project:

```bash
# Install in project
npm install --save-dev @tachyonoid/work-streams

# Initialize
npx stream-init
```

The interactive wizard will:
1. Create `.claude/` directory structure
2. Install all 15 commands
3. Install 4 built-in templates
4. Configure git integration (optional)
5. Set up team features (optional)

### Method 2: Manual Installation

For Claude Code plugin development or customization:

```bash
# Clone the repository
git clone https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams.git

# Copy to your project
cp -r claude-work-streams/.claude /path/to/your/project/
```

Or manually:
1. Create `.claude/commands/` directory in your project
2. Copy all command files from this repository's `.claude/commands/` directory
3. Create `.claude/templates/` directory and copy template files
4. Copy `plugin.json` to `.claude/` directory

**What's included**:
• 15 stream management commands
• 4 built-in workflow templates
• Interactive conversational commands
• Configuration management system
• Template system for custom workflows
• Git integration commands
• Programmatic API

## Quick Start

```bash
# Option 1: Start with a template (recommended)
/stream-template list
/stream-start user-authentication --template feature-development
# Templates pre-populate goals, checkpoints, and guidance

# Option 2: Start without template
/stream-start "Add OAuth2 authentication" "- Implement OAuth2 flow" "- Add Google provider"

# Make progress and save lightweight updates
/stream-update "Completed OAuth2 core implementation"

# Save comprehensive checkpoints
/stream-checkpoint "OAuth2 flow complete with Google provider"

# Check context usage
/stream-context-check

# Create git commits
/stream-git commit "feat: Add OAuth2 authentication with Google provider"

# View current status
/stream-status

# When ready to end
/stream-end

# Resume later with automatic context injection
/stream-resume user-authentication
```

## Commands

### Setup & Configuration (New in v1.2.0)
- `/stream-init` - Interactive setup wizard for initializing Work Streams in your project
- `/stream-config show` - Display current configuration with descriptions
- `/stream-config set [key] [value]` - Set configuration value with validation
- `/stream-config get [key]` - Retrieve specific configuration value
- `/stream-config reset` - Reset configuration to defaults
- `/stream-config edit` - Open configuration in system editor
- `/stream-config validate` - Validate configuration file
- `/stream-config export [file]` - Export configuration for sharing
- `/stream-config import [file]` - Import team configuration

### Interactive Commands (New in v1.2.0)
- `/stream-dashboard` - Interactive dashboard with conversational menu (12 actions)
- `/stream-switch [name]` - Switch between streams with fuzzy matching and preview

### Stream Templates
- `/stream-template` - Interactive template browser (new)
- `/stream-template list` - Display all available templates (built-in and custom)
- `/stream-template show [name]` - View detailed template information and guidance
- `/stream-template use [template] [stream-name]` - Create stream from template
- `/stream-start [name] --template [template]` - Start stream with template (alternative method)

### Core Stream Management
- `/stream-start [description] [goals...]` - Begin a new work stream with goals
- `/stream-status` - View current stream with git integration and progress
- `/stream-checkpoint [description]` - Save comprehensive progress checkpoint with git state
- `/stream-update [note]` - Add quick timestamped progress note
- `/stream-resume [name]` - Continue a work stream with automatic context injection
- `/stream-list` - Browse all work streams (active, paused, completed)
- `/stream-end` - Complete and summarize work stream

### Context Management
- `/stream-context-check` - Monitor context usage with smart recommendations
- `/stream-context-inject` - Generate smart context summary from stream history

### Git Integration
- `/stream-git link [branch]` - Link stream to existing git branch
- `/stream-git create [branch]` - Create and link new git branch
- `/stream-git commit [message]` - Create neutral git commit with auto-staging
- `/stream-git status` - Show detailed git status for stream
- `/stream-git sync` - Sync stream metadata with current git state
- `/stream-git unlink` - Remove git branch association

## Usage Examples

### Basic Workflow
```bash
# Start a stream
/stream-start "Refactor authentication system"

# Work on your feature...
# Save progress periodically
/stream-checkpoint "Extracted auth logic into separate module"

# Check context usage
/stream-context-check
# Output: Context Status: 45% used, Status: Healthy

# Complete the stream
/stream-end
```

### With Git Integration
```bash
# Start stream and create git branch
/stream-start "Add payment processing"
/stream-git create feature/payment-processing

# Work and commit with neutral messages
/stream-git commit "feat: Add Stripe payment integration"

# Check git status
/stream-git status

# Complete stream
/stream-checkpoint "Payment processing complete"
/stream-end
```

### Using Stream Templates
```bash
# List available templates
/stream-template list

# View template details
/stream-template show feature-development

# Create stream from template (method 1)
/stream-template use feature-development user-authentication

# Or use with stream-start (method 2)
/stream-start oauth2-integration --template feature-development

# Template pre-populates:
# - 8 pre-defined goals (design, implement, test, document, review)
# - Context with decision points and next steps
# - Checkpoint guidance (5 key milestones)
# - Git branch suggestion (feature/oauth2-integration)
# - Tips and best practises

# Follow template guidance
/stream-checkpoint "Design complete - OAuth2 architecture defined"
/stream-checkpoint "Core implementation - OAuth2 flow working"
/stream-checkpoint "Tests complete - Unit and integration tests passing"
/stream-end
```

### Context Management
```bash
# Monitor context usage throughout development
/stream-context-check
# Output: Context Status: 68% used (111k of 164k tokens), Status: Healthy

# When context reaches 85%+, create checkpoint
/stream-checkpoint "API integration complete"

# End stream and resume later
/stream-end
/stream-resume add-payment-processing
# Automatic context injection restores full context
```

### Multi-Session Work
```bash
# Session 1: Start work
/stream-start "Database migration"
/stream-checkpoint "Migration scripts written"
/stream-end

# Session 2: Resume with full context
/stream-resume database-migration
# Context automatically restored
/stream-checkpoint "Migration tested"
/stream-end

# Session 3: Complete
/stream-resume database-migration
/stream-end
```

### New in v1.2.0: Interactive Dashboard
```bash
# Open interactive dashboard
/stream-dashboard

# Dashboard displays:
# - Current stream overview (name, status, progress, context usage)
# - 12 interactive actions (checkpoint, update, status, switch, etc.)
# - Smart recommendations based on time and progress
# - Git status and recent activity

# Conversational interaction
# Your choice: 1
# Creates checkpoint interactively

# Dashboard refreshes automatically
# Your choice: 4
# Opens stream switcher

# Your choice: 0
# Exits dashboard
```

### New in v1.2.0: Stream Switching
```bash
# Switch between streams with fuzzy matching
/stream-switch

# Interactive switcher shows:
# Available Streams (3):
#   1. api-authentication (feature, 75% complete)
#   2. database-optimization (refactor, 40% complete)
#   3. documentation-update (docs, 90% complete)
#
# Type number, name, or keywords:

# Type: "database"
# Fuzzy match finds: database-optimization

# Preview shown with details
# Switch to this stream? (yes/no/browse):

# Type: yes
# Context injected, ready to continue!
```

### New in v1.2.0: Configuration Management
```bash
# View configuration
/stream-config show

# Set specific values
/stream-config set context.thresholds.warning 92
/stream-config set templates.default "feature-development"

# Get current value
/stream-config get context.thresholds.warning

# Export for team
/stream-config export team-config.yaml

# Team members import
/stream-config import team-config.yaml

# Validate configuration
/stream-config validate
```

## Context Monitoring Thresholds

The plugin monitors your context usage and provides recommendations based on real-world Claude Code limits.

**Context Window Reality:**
- Total capacity: 200,000 tokens
- System overhead: ~36,000 tokens (system prompt, tools, output buffer)
- Effective usable space: ~164,000 tokens
- Auto-compact trigger: ~155,000 tokens (95% of usable space)

**Monitoring Thresholds** (percentage of 164k usable space):

- **< 75% (< 123k tokens)**: Healthy - Continue working normally
- **75-85% (123k-139k tokens)**: Monitor - Start planning checkpoint soon
- **85-90% (139k-148k tokens)**: Warning - Create checkpoint NOW and prepare transition
- **90-95% (148k-156k tokens)**: Critical - Checkpoint IMMEDIATELY (auto-compact imminent)

These realistic thresholds account for the fact that Claude Code's auto-compact triggers at approximately 155k tokens, not at the theoretical 200k limit.

## Stream Metadata

All stream data is stored in `.claude/streams/[stream-name]/stream.yaml` with:
- Template reference (if created from template)
- Session history
- Checkpoints with git state
- Progress updates
- Goals and decisions
- File tracking
- Git integration data

**Template Integration**: When a stream is created from a template, the template name is stored in metadata, and template-defined goals, context, and guidance are pre-populated.

## Why This Plugin?

Traditional session management approaches fail because they:
- Require manual context copying
- Don't preserve development context
- Lack git integration
- Don't monitor context usage
- Provide no automatic restoration
- No structured workflow guidance

Claude Work Streams solves these problems with:
- **Template-Driven Workflows**: Pre-configured guidance for common development patterns
- **Automatic Context Injection**: Smart context restoration on resume
- **Comprehensive Git Integration**: Branch tracking, commit management, and state monitoring
- **Real-Time Context Monitoring**: Know when to checkpoint and transition
- **Smart Checkpointing System**: Capture progress with git state
- **Professional Commit Messages**: Neutral, conventional commits with no tool attribution
- **Customizable Templates**: Create your own templates for recurring workflows

## License

MIT License - See LICENSE file

## Contributing

Contributions welcome! Please open an issue or pull request.

## Author

Built by [Tachyonoid Technologies Pty Ltd](https://github.com/Tachyonoid-Technologies-Pty-Ltd)

## Links

- **GitHub**: https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams
- **Issues**: https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues
- **Organization**: https://github.com/Tachyonoid-Technologies-Pty-Ltd
