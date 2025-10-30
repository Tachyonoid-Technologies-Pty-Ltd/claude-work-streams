# Claude Work Streams

**Intelligent work stream management for Claude Code**

## The Problem

When working on complex features in Claude Code, you often hit context limits and need to start fresh sessions. This breaks your workflow as you manually track what you were doing, copy context, and re-explain your progress. Current "session management" tools are just note-taking systems.

## The Solution

Claude Work Streams provides true session continuity - automatically preserving context, linking related Claude sessions, and enabling seamless transitions when context limits are reached. Focus on building, not managing sessions.

## Features

- **Work Stream Tracking**: Group related work into continuous streams spanning multiple Claude sessions
- **Automatic Context Transfer**: Smart summarization and context injection when transitioning between sessions  
- **Seamless Continuity**: Pick up exactly where you left off without manual context recreation
- **Intelligent Checkpoints**: Auto-save work state at critical points
- **Stream Navigation**: Easily browse and resume past work streams
- **Git Integration**: Optional linking with git branches and commits
- **DDD/Clean Architecture Aligned**: Built with Domain-Driven Design principles

## Installation
```bash
/plugin marketplace add tachyonoid/claude-work-streams
/plugin install work-streams@tachyonoid
```

## Quick Start
```bash
# Start a work stream
/project:stream-start implementing-oauth2

# Work naturally - plugin tracks everything
# When context limit approaches, automatic transition happens

# Resume later
/project:stream-resume implementing-oauth2

# Complete your work
/project:stream-end
```

## Commands

- `/project:stream-start [name]` - Begin a new work stream
- `/project:stream-status` - View current stream and progress
- `/project:stream-checkpoint` - Manually save current state
- `/project:stream-resume [name]` - Continue a work stream
- `/project:stream-list` - Browse all work streams
- `/project:stream-history` - View stream timeline
- `/project:stream-end` - Complete and summarize work stream

## Status

**🚧 In Active Development**

Built by [Tachyonoid Technologies](https://github.com/tachyonoid) as a practical solution to real development workflow challenges.

## Philosophy

This plugin embodies Clean Architecture and Domain-Driven Design principles:
- Clear separation of concerns
- Domain-focused language (work streams, not sessions)
- Explicit state management
- Comprehensive documentation

## License

MIT License - See LICENSE file

## Contributing

Contributions welcome! See CONTRIBUTING.md for guidelines.
