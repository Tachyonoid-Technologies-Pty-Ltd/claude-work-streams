# Changelog

All notable changes to Claude Work Streams will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.1] - 2025-10-31

### Fixed
- Corrected npm badges in README.md to reference `@tachyonoid/work-streams` instead of `@claude-code/work-streams`
- Fixed npm package page displaying incorrect badge links

---

## [1.2.0] - 2025-10-31

### Added

**NPM Package Distribution**
- Published as `@tachyonoid/work-streams` on npm registry
- Global installation support: `npm install -g @tachyonoid/work-streams`
- Project-level installation: `npm install --save-dev @tachyonoid/work-streams`
- CLI executable: `npx stream-init` for project initialization
- Programmatic API for automation and scripting

**New Commands**
- `/stream-init` - Interactive setup wizard for project initialization
- `/stream-dashboard` - Interactive dashboard with conversational menu (12 actions)
- `/stream-switch` - Stream switcher with fuzzy matching and preview
- `/stream-config` - Full configuration management (8 CRUD operations)

**Interactive Features**
- Conversational interaction pattern across all commands
- Smart recommendations based on context, time, and progress
- Flexible input interpretation (numbers, names, natural language)
- Interactive template browser in `/stream-template`
- Preview before switching streams
- Auto-resume capability after switching

**Configuration Management**
- New `/stream-config` command with 8 actions:
  - `show` - Display current configuration
  - `set` - Set configuration values
  - `get` - Retrieve specific values
  - `reset` - Reset to defaults
  - `edit` - Open in editor
  - `validate` - Validate configuration
  - `export` - Export for sharing
  - `import` - Import team configuration
- Configuration schema with 7 sections
- Dot notation for nested values (e.g., `context.thresholds.warning`)
- Type validation and range checking
- Backup before modifications

**Context Monitoring Improvements**
- Corrected context limits based on real-world Claude Code behavior
- Updated thresholds to reflect 164k effective usable space (not 200k)
- New threshold percentages: 75%/85%/90%/95% (was 90%/94%/97%/98%)
- Added detailed context window breakdown in documentation
- Token count displays in context commands
- Auto-compact trigger awareness (~155k tokens)

**Documentation**
- `INSTALLATION.md` - Comprehensive installation guide
- `API.md` - Complete programmatic API reference
- `EXAMPLES.md` - Real-world usage scenarios
- `CHANGELOG.md` - Version history (this file)
- Updated README.md with v1.2.0 features
- Accurate context window documentation throughout

**Library API**
- `getClaudeDir(options)` - Get .claude directory path
- `isInitialized(options)` - Check if work streams is initialized
- `getCurrentStream(options)` - Get active stream
- `getStream(name, options)` - Get specific stream
- `listStreams(options)` - List all streams
- `listTemplates(options)` - List available templates
- `getTemplate(name, options)` - Get specific template

### Changed

**Command Improvements**
- `/stream-template` now has interactive browser mode
- `/stream-dashboard` completely redesigned with conversational UX
- All commands now use conversational interaction (no fake TUI elements)
- Enhanced `/stream-context-check` with detailed token breakdown
- Updated `/stream-context-inject` with budget considerations

**Configuration**
- Context thresholds updated to realistic values
- Default warning threshold: 85% (was 90%)
- Configuration file location: `.claude-streams.config.yaml` (project root)
- Enhanced configuration schema with team collaboration settings

**Documentation**
- README.md completely updated for v1.2.0
- Installation instructions prioritize NPM installation
- Context monitoring section rewritten with accurate limits
- Commands list expanded to 15 commands (was 11)
- Added NPM badges and version information

### Fixed

- Corrected context limit assumptions (164k usable vs 200k theoretical)
- Fixed threshold calculations to prevent premature warnings
- Updated all documentation with factually correct token limits
- Corrected auto-compact trigger documentation (~155k tokens)

### Technical

- Package structure: `bin/`, `lib/`, `scripts/`, `config/`
- Dependencies: commander, inquirer, chalk, js-yaml, boxen, ora, cli-table3
- Post-install guidance script
- Default configuration in `config/defaults.yaml`
- .npmignore for clean package distribution

---

## [1.1.0] - 2025-10-30

### Added

**Stream Templates System**
- Four built-in workflow templates:
  - `feature-development` - Comprehensive feature implementation workflow
  - `bug-fix` - Systematic bug fixing with root cause analysis
  - `refactoring` - Safe code improvement workflow
  - `documentation` - Documentation creation and maintenance
- `/stream-template` command with three actions:
  - `list` - Display all available templates
  - `show [name]` - View detailed template information
  - `use [template] [stream]` - Create stream from template
- Template integration with `/stream-start --template` flag
- Pre-defined goals (5-8 per template)
- Checkpoint guidance (3-5 key milestones per template)
- Git branch suggestions
- Best practices and tips per workflow type
- Custom template support in `.claude/templates/custom/`

**Template Features**
- Pre-populated goals based on workflow type
- Context with decision points and next steps
- Checkpoint recommendations at key milestones
- Git branch naming suggestions
- Workflow-specific tips and best practices

### Changed

- Updated README.md with template system documentation
- Enhanced `/stream-start` to accept `--template` flag
- Stream metadata now stores template reference
- Added template field to stream.yaml schema

### Documentation

- Template system documentation in README.md
- Template usage examples
- Custom template creation guide

---

## [1.0.0] - 2025-10-29

### Added

**Core Stream Management**
- `/stream-start` - Begin new work stream with goals
- `/stream-status` - View current stream with git integration
- `/stream-checkpoint` - Save comprehensive progress checkpoint
- `/stream-update` - Add quick timestamped progress note
- `/stream-resume` - Continue work stream with context injection
- `/stream-list` - Browse all work streams
- `/stream-end` - Complete and summarize work stream

**Context Management**
- `/stream-context-check` - Monitor context usage
- `/stream-context-inject` - Generate smart context summary
- Smart context injection (< 2000 tokens)
- Automatic context restoration on resume
- Context usage monitoring with thresholds

**Git Integration**
- `/stream-git link` - Link stream to git branch
- `/stream-git create` - Create and link new branch
- `/stream-git commit` - Create neutral git commits
- `/stream-git status` - Show git status for stream
- `/stream-git sync` - Sync stream with git state
- `/stream-git unlink` - Remove branch association
- Branch tracking and status monitoring
- Neutral commit messages (no AI attribution)

**Stream Metadata**
- YAML-based metadata storage in `.claude/streams/`
- Session tracking
- Checkpoint history with git state
- Progress updates
- Goals and decisions tracking
- File modification tracking
- Git integration data

**Features**
- Multi-session continuity
- Smart context injection (< 2000 tokens)
- Git branch tracking
- Checkpoint system with git state
- Session history
- Goal tracking
- File tracking
- Context monitoring

### Technical

- File-based YAML metadata
- Git integration via command-line git
- Context compression for resume
- Session management
- Plugin architecture for Claude Code

---

## [Unreleased]

### Planned for v1.3.0

- Enhanced error handling and validation
- Input sanitization and safety checks
- Automatic recovery mechanisms
- Interactive prompts for critical operations
- Progress indicators for long tasks
- Search and filtering capabilities
- Stream archiving features

### Planned for v2.0.0 (Future)

- Claude Agent SDK integration
- AI-powered stream insights
- Multi-stream orchestration
- Stream templates with AI
- Advanced context management
- Team collaboration features
- Stream sharing and permissions
- Conflict resolution

---

## Migration Guides

### Upgrading from v1.1.0 to v1.2.0

**Via NPM:**
```bash
npm update -g @tachyonoid/work-streams
```

**Manual:**
1. Backup `.claude/streams/`
2. Copy new command files to `.claude/commands/`
3. Run `/stream-init --upgrade` in Claude Code
4. Verify with `/stream-config validate`

**Changes:**
- All streams are preserved
- New commands automatically available
- Configuration migrated to new schema
- Context thresholds updated to realistic values

**Action Required:**
- Review new context thresholds (75/85/90/95%)
- Update any custom scripts using old thresholds
- Consider using new `/stream-dashboard` for efficiency

### Upgrading from v1.0.0 to v1.1.0

**Changes:**
- Template system added
- Stream metadata includes template reference
- New `/stream-template` command

**Action Required:**
- None - fully backward compatible
- Explore templates with `/stream-template list`

---

## Deprecations

None currently.

---

## Security

### v1.2.0
- Added input validation in `/stream-config`
- Backup before configuration changes
- YAML schema validation
- Path sanitization in stream names

### v1.1.0
- Template YAML validation
- Safe template loading

### v1.0.0
- File path sanitization
- Git command escaping
- YAML safe loading

---

## Performance

### v1.2.0
- Optimized stream listing for large numbers of streams
- Efficient YAML parsing with js-yaml library
- Fast fuzzy matching in `/stream-switch`
- Minimal overhead for CLI operations

---

## Known Issues

### v1.2.0
- Team collaboration features are experimental
- Git hooks may need adjustment for some workflows
- Large stream metadata files (>100 checkpoints) may slow operations

**Workarounds:**
- Disable team features if not needed
- Manually archive old completed streams
- Use stream cleanup scripts (see EXAMPLES.md)

---

## Contributors

- Tachyonoid Technologies Pty Ltd - Initial development and v1.0-1.2
- Community contributors welcome!

---

## Links

- **GitHub Repository**: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams)
- **NPM Package**: [https://www.npmjs.com/package/@tachyonoid/work-streams](https://www.npmjs.com/package/@tachyonoid/work-streams)
- **Issues**: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues)
- **Discussions**: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/discussions](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/discussions)

---

**Note:** This changelog follows [Keep a Changelog](https://keepachangelog.com/) format and [Semantic Versioning](https://semver.org/) principles.
