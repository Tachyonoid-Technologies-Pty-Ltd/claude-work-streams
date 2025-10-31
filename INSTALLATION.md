# Installation Guide

Complete installation instructions for Claude Work Streams v1.2.0.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [NPM Global Installation](#npm-global-installation)
  - [NPM Project Installation](#npm-project-installation)
  - [Manual Installation](#manual-installation)
- [Interactive Setup](#interactive-setup)
- [Configuration](#configuration)
- [Verification](#verification)
- [Upgrading](#upgrading)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

**Required:**
- Claude Code CLI installed and configured
- Node.js 16.x or higher (for NPM installation)
- Git (for git integration features)

**Optional:**
- Text editor with YAML support (for manual configuration)
- Network drive or cloud storage (for team collaboration features)

**Verify Prerequisites:**
```bash
# Check Claude Code
claude --version

# Check Node.js
node --version

# Check npm
npm --version

# Check Git
git --version
```

---

## Installation Methods

### NPM Global Installation

Install once, use across all projects.

**Step 1: Install Package**
```bash
npm install -g @tachyonoid/work-streams
```

**Step 2: Initialize in Project**
```bash
cd /path/to/your/project
npx stream-init
```

**Advantages:**
- Single installation for all projects
- Easy updates with `npm update -g`
- CLI available globally

**Use When:**
- Working on multiple projects
- Want consistent version across projects
- Prefer global tools

---

### NPM Project Installation

Install per-project for version control.

**Step 1: Install as Dev Dependency**
```bash
cd /path/to/your/project
npm install --save-dev @tachyonoid/work-streams
```

**Step 2: Initialize**
```bash
npx stream-init
```

**Step 3: Add to package.json Scripts (Optional)**
```json
{
  "scripts": {
    "streams:init": "stream-init",
    "streams:status": "echo 'Run /stream-status in Claude Code'"
  }
}
```

**Advantages:**
- Version locked in package.json
- Team gets same version via npm install
- No global namespace pollution

**Use When:**
- Working in teams
- Need version consistency
- Project has package.json

---

### Manual Installation

For plugin development or air-gapped environments.

**Step 1: Clone Repository**
```bash
git clone https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams.git
```

**Step 2: Copy Plugin Files**
```bash
cd claude-work-streams

# Copy commands
cp -r .claude/commands /path/to/your/project/.claude/

# Copy templates
cp -r .claude/templates /path/to/your/project/.claude/

# Copy plugin manifest
cp plugin.json /path/to/your/project/.claude/
```

**Step 3: Create Configuration (Optional)**
```bash
cp config/defaults.yaml /path/to/your/project/.claude-streams.config.yaml
```

**Advantages:**
- No npm required
- Full control over files
- Works offline
- Can customize before installation

**Use When:**
- Developing plugin features
- Air-gapped environment
- Need full customization
- Learning how plugin works

---

## Interactive Setup

After installation, run the interactive setup wizard:

```bash
npx stream-init
```

The wizard will guide you through:

### Step 1: Template Selection

```
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

**Recommendation:** Choose "All templates" (option 1) for full functionality.

### Step 2: Git Hooks (Optional)

```
Set up git hooks for automatic stream management?
This will:
  • Auto-save checkpoint before commits
  • Detect branch switches
  • Warn about uncommitted stream changes

Install git hooks? (yes/no):
```

**Recommendation:** Say "yes" if you use git actively. Can disable later if issues arise.

### Step 3: Team Features (Experimental)

```
Enable team collaboration features? (experimental)
Features:
  • Shared stream access across team members
  • Multi-user visibility and coordination
  • Conflict resolution for concurrent work

Requirements:
  • Shared network drive or cloud storage
  • All team members must have access to shared path

Enable team features? (yes/no):
```

**Recommendation:** Say "no" unless working with a team and have shared storage ready.

### Step 4: Git Configuration

```
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

**Recommendation:** Choose option 1 for most projects. Option 2 only for solo projects or specific team workflows.

---

## Configuration

After installation, configuration is stored in:

**Location:** `.claude-streams.config.yaml` (project root)

**View Configuration:**
```bash
# In Claude Code
/stream-config show
```

**Edit Configuration:**
```bash
# Option 1: Via command
/stream-config edit

# Option 2: Direct edit
vim .claude-streams.config.yaml
```

**Common Settings to Adjust:**

```yaml
# Context thresholds (recommended defaults)
context:
  thresholds:
    healthy: 75
    monitor: 85
    warning: 90
    critical: 95

# Auto-checkpoint interval
stream:
  auto_checkpoint_interval: 30  # Minutes

# Default template
templates:
  default: "feature-development"  # or null for prompt

# Git branch prefixes
git:
  branch_prefixes:
    feature: "feature/"
    bugfix: "bugfix/"
    refactor: "refactor/"
```

**Validate Configuration:**
```bash
/stream-config validate
```

---

## Verification

Verify installation was successful:

### 1. Check Commands Available

```bash
# In Claude Code, type:
/stream-
# Press Tab to see autocomplete
```

You should see 15 commands:
- /stream-start
- /stream-status
- /stream-checkpoint
- /stream-update
- /stream-resume
- /stream-list
- /stream-end
- /stream-switch
- /stream-dashboard
- /stream-config
- /stream-init
- /stream-template
- /stream-context-check
- /stream-context-inject
- /stream-git

### 2. Check Templates Installed

```bash
/stream-template list
```

You should see:
- feature-development
- bug-fix
- refactoring
- documentation

### 3. Check Configuration

```bash
/stream-config show
```

Should display configuration with no errors.

### 4. Create Test Stream

```bash
/stream-start test-installation "Verify installation works"
/stream-status
/stream-end
```

If all commands work without errors, installation is successful!

---

## Upgrading

### From v1.1.0 to v1.2.0

**NPM Installation:**
```bash
# Global
npm update -g @tachyonoid/work-streams

# Project
npm update @tachyonoid/work-streams
```

**Manual Installation:**
```bash
# Backup existing installation
cp -r .claude .claude.backup

# Pull latest changes
cd claude-work-streams
git pull origin main

# Copy new files
cp -r .claude/commands /path/to/your/project/.claude/
cp -r .claude/templates /path/to/your/project/.claude/
```

**Migration Steps:**

1. **Backup streams:**
   ```bash
   cp -r .claude/streams .claude/streams.backup
   ```

2. **Run upgrade command:**
   ```bash
   /stream-init --upgrade
   ```

3. **Update configuration:**
   ```bash
   /stream-config validate
   /stream-config show
   ```

4. **Verify streams intact:**
   ```bash
   /stream-list
   ```

**What Gets Updated:**
- All 15 command files
- 4 built-in templates
- Configuration schema (preserves your settings)

**What Stays the Same:**
- Your stream data (.claude/streams/)
- Your custom templates
- Your custom configuration values

---

## Troubleshooting

### Commands Not Found

**Symptom:** `/stream-` commands don't autocomplete

**Solutions:**
1. Verify `.claude/commands/` directory exists
2. Check files have `.md` extension
3. Restart Claude Code
4. Re-run `npx stream-init`

### Permission Errors

**Symptom:** "Permission denied" during installation

**Solutions:**
```bash
# Option 1: Use sudo (global install only)
sudo npm install -g @tachyonoid/work-streams

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Option 3: Use project installation instead
npm install --save-dev @tachyonoid/work-streams
```

### Configuration Not Loading

**Symptom:** Commands use default settings, ignoring config

**Solutions:**
1. Check file name: `.claude-streams.config.yaml` (note the leading dot)
2. Verify YAML syntax: `/stream-config validate`
3. Check file location (must be in project root)
4. Check file permissions (must be readable)

### Templates Not Found

**Symptom:** `/stream-template list` shows empty or missing templates

**Solutions:**
1. Re-run: `npx stream-init --templates all`
2. Check `.claude/templates/` directory exists
3. Verify template files have `.yaml` extension
4. Check template YAML is valid

### Git Integration Not Working

**Symptom:** Git commands fail or branch linking doesn't work

**Solutions:**
1. Verify git is installed: `git --version`
2. Verify in git repository: `git status`
3. Check git configuration: `/stream-config show`
4. Disable git features if not needed:
   ```bash
   /stream-config set git.auto_create_branch false
   /stream-config set git.auto_link_branch false
   ```

### Context Warnings Too Frequent

**Symptom:** Getting context warnings too early

**Solution:** Adjust thresholds:
```bash
# Increase warning threshold (default: 90%)
/stream-config set context.thresholds.warning 92

# Or edit configuration file
/stream-config edit
```

### NPM Package Not Found

**Symptom:** `npm install @tachyonoid/work-streams` fails

**Solutions:**
1. Check npm registry: `npm config get registry`
2. Check package exists: `npm view @tachyonoid/work-streams`
3. Try with full URL:
   ```bash
   npm install https://registry.npmjs.org/@tachyonoid/work-streams/-/work-streams-1.2.0.tgz
   ```
4. Use manual installation method instead

---

## Getting Help

**Documentation:**
- README: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams)
- API Documentation: See API.md
- Examples: See EXAMPLES.md

**Support:**
- Issues: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues)
- Discussions: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/discussions](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/discussions)

**Quick Start After Installation:**
```bash
# View available templates
/stream-template list

# Start your first stream
/stream-start my-first-stream --template feature-development

# Open interactive dashboard
/stream-dashboard

# Get help on any command
/stream-start --help
```

---

**Installation complete! You're ready to use Claude Work Streams.**

Next: Check out [EXAMPLES.md](./EXAMPLES.md) for real-world usage scenarios.
