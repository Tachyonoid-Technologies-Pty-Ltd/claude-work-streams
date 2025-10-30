```
         ░██     ██░ ░█████▒ ░██▀███░ ██ ▄█▀    ░██████░▓█████▄▒██▀███░▓█████ ▄▄▄      ███▄ ▄███▓░██████░
         ▒██     ██▒▒██▒  ██░▓██   ██░██▄█▒     ██▒  ██░  ██▒ ▓▓██   ██▓█   ▀▒████▄   ▓██▒▀█▀ ██▒██▒  ██░
         ░██  █  ██░██ ░  ██░▓██  ▄█░▓███▄░    ░██  ░██░  ██  ▓▓██  ▄█ ▓███  ▒██  ▀█▄ ▓██    ▓██░██  ░██░
         ░██ ███ ██ ██  ░██░▒██▀▀█▄ ▓██ █▄    ░██ ░██  ░ ▐██▓▒▒██▀▀█▄ ▒▓█  ▄░██▄▄▄▄██ ▒██    ▒██░██ ░██░
          ░███ ███░ █████▀ ░██▓ ▒██▒██▒ █▄    ░█████▒   ░██▒░░██▓ ▒██░▒████▒▓█   ▓██▒▒██▒   ░██░█████▒
          ░▒░ ▒░▒░ ░▒▓▒ ▒  ░▒▓▒░ ▒▒▒▒ ▒▒ ▓▒    ░▒▓▒▒░   ▒██▒░░▒▓▒░ ▒▒░░ ▒░  ▒▒   ▓▒█░░ ▒░   ░  ░▒▓▒▒░
```

<p align="center"><strong>Intelligent work stream management for Claude Code</strong></p>

## The Problem

When working on complex features in Claude Code, you often hit context limits and need to start fresh sessions. This breaks your workflow as you manually track what you were doing, copy context, and re-explain your progress. Traditional session management tools are just note-taking systems that don't solve the real problem.

## The Solution

Claude Work Streams provides true session continuity by automatically preserving context, linking related sessions, and enabling seamless transitions when context limits are reached. Focus on building, not managing sessions.

## Features

- **Work Stream Tracking**: Group related work into continuous streams spanning multiple sessions
- **Smart Context Injection**: Automatic context restoration with intelligent summarization (under 2000 tokens)
- **Seamless Continuity**: Resume work streams with full context automatically injected
- **Flexible Progress Tracking**: Lightweight updates and comprehensive checkpoints
- **Context Monitoring**: Real-time context usage tracking with smart recommendations
- **Git Integration**: Full git support with branch tracking, commit management, and state monitoring
- **Stream Navigation**: Browse, resume, and manage multiple work streams
- **Neutral Commit Messages**: Professional git commits with no tool attribution

## Installation

1. Clone or download this repository to your local machine
2. Copy the `.claude` directory into your project root
3. The commands will be available immediately in Claude Code

```bash
# Clone the repository
git clone https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams.git

# Copy to your project
cp -r claude-work-streams/.claude /path/to/your/project/
```

Or manually:
1. Create `.claude/commands/` directory in your project
2. Copy all command files from this repository's `.claude/commands/` directory
3. Copy `plugin.json` to `.claude/` directory

## Quick Start

```bash
# Start a new work stream with goals
/stream-start "Add OAuth2 authentication" "- Implement OAuth2 flow" "- Add Google provider" "- Add GitHub provider"

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
/stream-resume add-oauth2-authentication
```

## Commands

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

### Context Management
```bash
# Monitor context usage throughout development
/stream-context-check

# When context gets high (90%+), create checkpoint
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

## Context Monitoring Thresholds

The plugin monitors your context usage and provides recommendations:

- **< 90%**: Healthy - Continue working normally
- **90-94%**: Monitor - Start planning checkpoint soon
- **95-97%**: Warning - Create checkpoint NOW and prepare transition
- **98%+**: Critical - Checkpoint and transition IMMEDIATELY

## Stream Metadata

All stream data is stored in `.claude/streams/[stream-name]/stream.yaml` with:
- Session history
- Checkpoints with git state
- Progress updates
- Goals and decisions
- File tracking
- Git integration data

## Why This Plugin?

Traditional session management approaches fail because they:
- Require manual context copying
- Don't preserve development context
- Lack git integration
- Don't monitor context usage
- Provide no automatic restoration

Claude Work Streams solves these problems with:
- Automatic context injection on resume
- Comprehensive git integration
- Real-time context monitoring
- Smart checkpointing system
- Professional, neutral commit messages

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
