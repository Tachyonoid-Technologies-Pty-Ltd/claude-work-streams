# Examples

Real-world usage scenarios for Claude Work Streams v1.2.0.

---

## Table of Contents

- [Basic Workflows](#basic-workflows)
  - [Simple Feature Development](#simple-feature-development)
  - [Bug Fix](#bug-fix)
  - [Code Refactoring](#code-refactoring)
- [Advanced Workflows](#advanced-workflows)
  - [Multi-Session Feature Development](#multi-session-feature-development)
  - [Context Management at Scale](#context-management-at-scale)
  - [Team Collaboration](#team-collaboration)
- [Interactive Commands](#interactive-commands)
  - [Using the Dashboard](#using-the-dashboard)
  - [Switching Between Streams](#switching-between-streams)
  - [Configuration Management](#configuration-management)
- [Automation Examples](#automation-examples)
  - [CI/CD Integration](#cicd-integration)
  - [Custom Scripts](#custom-scripts)
- [Best Practices](#best-practices)

---

## Basic Workflows

### Simple Feature Development

**Scenario:** Implementing a new user authentication feature.

```bash
# Start stream with template
/stream-start user-authentication --template feature-development

# Template pre-populates 8 goals:
# [ ] Design feature architecture
# [ ] Implement core functionality
# [ ] Write unit tests
# [ ] Write integration tests
# [ ] Update documentation
# [ ] Code review
# [ ] Performance optimization
# [ ] Final testing

# Create git branch
/stream-git create feature/user-authentication

# Work on design
# ... implement authentication logic ...

# Save progress
/stream-checkpoint "Authentication core logic implemented"

# Check context usage
/stream-context-check
# Output: Context Status: 45% used, Status: Healthy

# Continue working
# ... add tests ...

/stream-checkpoint "Unit tests added and passing"

# Work on documentation
# ... update README...

/stream-checkpoint "Documentation updated"

# Check status
/stream-status

# Complete feature
/stream-end
```

**Result:** Well-structured feature development with clear milestones.

---

### Bug Fix

**Scenario:** Fixing a login validation bug.

```bash
# Start with bug-fix template
/stream-start fix-login-validation --template bug-fix

# Template provides systematic process:
# [ ] Reproduce bug
# [ ] Identify root cause
# [ ] Implement fix
# [ ] Verify fix
# [ ] Add regression test

# Create branch
/stream-git create bugfix/login-validation

# Document bug reproduction
/stream-update "Bug reproduced: Empty email passes validation"

# Investigate
# ... analyze code ...

/stream-checkpoint "Root cause identified: Missing email regex check"

# Implement fix
# ... add validation ...

/stream-checkpoint "Fix implemented in auth/validator.js"

# Verify
# ... test thoroughly ...

/stream-update "Fix verified: All validation tests passing"

# Add regression test
# ... write test ...

/stream-checkpoint "Regression test added"

# Create commit
/stream-git commit "fix: Add email regex validation to prevent empty emails"

# End stream
/stream-end
```

**Result:** Systematic bug fix with clear documentation and test coverage.

---

### Code Refactoring

**Scenario:** Refactoring authentication module for better testability.

```bash
# Start with refactoring template
/stream-start refactor-auth-module --template refactoring

# Template ensures safe refactoring:
# [ ] Ensure tests pass before starting
# [ ] Extract methods/functions
# [ ] Improve naming
# [ ] Remove duplication
# [ ] Simplify conditionals
# [ ] Verify tests still pass

# Link to existing branch
/stream-git link feature/auth-improvements

# Verify tests pass
/stream-update "All 45 tests passing before refactoring"

# Start refactoring
# ... extract authentication logic to separate class ...

/stream-checkpoint "Extracted AuthValidator class from AuthService"

# Run tests
/stream-update "Tests still passing (45/45)"

# Continue refactoring
# ... improve method names ...

/stream-checkpoint "Renamed methods for clarity: checkUser -> validateCredentials"

# Remove duplication
# ... consolidate validation logic ...

/stream-checkpoint "Consolidated validation logic, removed 3 duplicate methods"

# Final verification
/stream-update "All tests passing, code coverage maintained at 92%"

# Commit
/stream-git commit "refactor: Extract AuthValidator and improve naming"

# End stream
/stream-end
```

**Result:** Safe refactoring with continuous test validation.

---

## Advanced Workflows

### Multi-Session Feature Development

**Scenario:** Large feature spanning multiple work sessions.

**Session 1: Design and Architecture**
```bash
# Start stream
/stream-start payment-integration --template feature-development

# Work on design
# ... create architecture diagrams ...
# ... define API contracts ...

/stream-checkpoint "Architecture designed: Stripe integration with webhook support"

# Check context
/stream-context-check
# Output: 35% used, Healthy

# End session
/stream-end
```

**Session 2: Core Implementation (Next Day)**
```bash
# Resume stream with automatic context injection
/stream-resume payment-integration

# Context automatically restored:
# - Previous checkpoint: Architecture designed
# - Files: api-contracts.md, architecture.png
# - Next steps: Implement Stripe SDK integration

# Continue implementation
# ... implement payment service ...

/stream-checkpoint "PaymentService implemented with Stripe SDK"

# More work
# ... add webhook handlers ...

/stream-checkpoint "Webhook handlers implemented for payment events"

# Check context
/stream-context-check
# Output: 68% used, Healthy

# End session
/stream-end
```

**Session 3: Testing and Documentation (Next Day)**
```bash
# Resume again
/stream-resume payment-integration

# Complete testing
# ... write integration tests ...

/stream-checkpoint "Integration tests added, all passing"

# Update documentation
# ... write API docs ...

/stream-checkpoint "API documentation complete"

# Final review
/stream-status

# Complete feature
/stream-end

# Summary shows:
# - 3 sessions over 3 days
# - 6 checkpoints
# - 8/8 goals completed
```

**Result:** Large feature completed across multiple sessions with perfect continuity.

---

### Context Management at Scale

**Scenario:** Working on complex feature reaching context limits.

```bash
# Start stream
/stream-start api-redesign --template refactoring

# Work intensively
# ... many file changes ...
# ... extensive discussion with Claude ...

# After several hours
/stream-context-check
# Output: 88% used (144k of 164k tokens), Status: Warning

# Create checkpoint NOW
/stream-checkpoint "API redesign phase 1 complete: REST endpoints refactored"

# Continue but monitor closely
/stream-context-check
# Output: 92% used (151k of 164k tokens), Status: Critical

# IMMEDIATE ACTION: Save and end
/stream-checkpoint "API redesign phase 2: GraphQL integration in progress"
/stream-end

# New session - resume with fresh context
/stream-resume api-redesign

# Context injected (only 2k tokens):
# - Recent checkpoints
# - Key decisions
# - Modified files
# - Next steps

# Full 162k tokens available for work
/stream-context-check
# Output: 2% used (3k of 164k tokens), Status: Healthy

# Continue work
# ... complete GraphQL integration ...

/stream-end
```

**Result:** Massive feature completed without hitting auto-compact limits.

---

### Team Collaboration

**Scenario:** Multiple developers working on same project.

**Developer A: Start Stream**
```bash
# Enable team features
/stream-config set team.enabled true
/stream-config set team.sync_remote "/mnt/shared/project-streams"

# Start stream
/stream-start api-authentication --template feature-development

# Work and checkpoint
/stream-checkpoint "OAuth2 flow designed"

# Share with team
/stream-update "API design ready for review - see api-design.md"

# Pause for review
/stream-end
```

**Developer B: Review and Continue**
```bash
# Configure team access
/stream-config set team.enabled true
/stream-config set team.sync_remote "/mnt/shared/project-streams"

# List available streams
/stream-list

# Resume team member's stream
/stream-resume api-authentication

# Review design
# ... review api-design.md ...

# Add feedback
/stream-update "Reviewed design: Suggested using refresh tokens"

# Make changes
# ... update design ...

/stream-checkpoint "Updated design with refresh token support"

# End and return to Developer A
/stream-end
```

**Developer A: Continue**
```bash
# Resume stream
/stream-resume api-authentication

# See team member's updates
/stream-status

# Implement with feedback
# ... implement OAuth2 with refresh tokens ...

/stream-checkpoint "OAuth2 implementation complete with refresh tokens"

# Complete
/stream-end
```

**Result:** Seamless handoff between team members.

---

## Interactive Commands

### Using the Dashboard

**Scenario:** Managing multiple streams efficiently.

```bash
# Open interactive dashboard
/stream-dashboard

# Displays:
# - Current stream overview
# - 12 interactive actions
# - Smart recommendations
# - Recent activity

# Dashboard shows:
# Stream: api-authentication (active)
# Progress: 6/8 goals (75%)
# Context: 45% used
# Git: feature/api-auth (3 commits)
# Last checkpoint: 25 minutes ago
#
# Recommendations:
# - Consider checkpoint soon (45 min since last)
# - 2 goals remaining
# - Git branch ahead of origin by 3 commits
#
# What would you like to do?
# 1. checkpoint - Save progress
# 2. update - Quick note
# 3. status - Detailed status
# 4. switch - Change streams
# 5. resume - Continue work
# 6. end - Complete stream
# 7. config - Configuration
# 8. templates - Templates
# 9. git - Git operations
# 10. list - All streams
# 11. refresh - Refresh
# 12. help - Help
# 0. exit - Exit
#
# Your choice:

# User types: 1
# Creates checkpoint interactively

# Dashboard refreshes automatically
# Shows updated status

# User types: 9
# Opens git submenu

# User types: 0
# Exits dashboard
```

**Result:** Efficient stream management through conversational interface.

---

### Switching Between Streams

**Scenario:** Juggling multiple features.

```bash
# Working on feature A
/stream-status
# Current: api-authentication

# Need to switch to urgent bug fix
/stream-switch

# Interactive switcher displays:
# Available Streams (4):
#
# Active (2):
#   1. api-authentication (feature, 75% complete)
#   2. database-optimization (refactor, 40% complete)
#
# Paused (1):
#   3. documentation-update (docs, 90% complete)
#
# Completed (1):
#   4. login-bug-fix (bugfix, 100% complete)
#
# Type number, name, or keywords:

# User types: "database"
# Fuzzy match finds: database-optimization

# Preview shown:
# Stream: database-optimization
# Type: refactoring
# Status: paused
# Progress: 4/10 goals (40%)
# Last activity: 2 days ago
#
# Switch to this stream? (yes/no/browse):

# User types: yes

# Switch complete with context injection:
# Switched to: database-optimization
# Context injected: 1,850 tokens
# Last checkpoint: Query optimization phase 1 complete
#
# Ready to continue work!
```

**Result:** Fast switching with zero context loss.

---

### Configuration Management

**Scenario:** Customizing Work Streams for your workflow.

```bash
# View current configuration
/stream-config show

# Adjust context thresholds for your preference
/stream-config set context.thresholds.warning 92

# Set default template
/stream-config set templates.default "feature-development"

# Enable auto-checkpoint
/stream-config set stream.auto_checkpoint_interval 20

# Customize git prefixes
/stream-config set git.branch_prefixes.feature "feat/"
/stream-config set git.branch_prefixes.bugfix "fix/"

# Export configuration for team
/stream-config export team-config.yaml

# Team members import
/stream-config import team-config.yaml

# Validate everything is correct
/stream-config validate
```

**Result:** Personalized workflow matching team conventions.

---

## Automation Examples

### CI/CD Integration

**Scenario:** Ensure no active streams before deployment.

**File:** `.github/workflows/check-streams.yml`
```yaml
name: Check Work Streams

on: [push, pull_request]

jobs:
  check-streams:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Work Streams
        run: npm install -g @tachyonoid/work-streams

      - name: Check for active streams
        run: |
          node scripts/check-streams.js

**File:** `scripts/check-streams.js`
```javascript
const streams = require('@tachyonoid/work-streams');

const current = streams.getCurrentStream();

if (current && current.status === 'active') {
  console.error('ERROR: Active stream detected in CI');
  console.error(`Stream: ${current.name}`);
  console.error('Please end stream before pushing');
  process.exit(1);
}

console.log('OK: No active streams');
process.exit(0);
```

**Result:** Prevents deployments with uncommitted stream work.

---

### Custom Scripts

**Scenario:** Weekly stream report for team standup.

**File:** `scripts/weekly-report.js`
```javascript
#!/usr/bin/env node
const streams = require('@tachyonoid/work-streams');

function generateWeeklyReport() {
  const allStreams = streams.listStreams();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Filter streams active in last week
  const recentStreams = allStreams.filter(stream => {
    const updated = new Date(stream.updated);
    return updated >= oneWeekAgo;
  });

  console.log('WEEKLY WORK STREAMS REPORT');
  console.log('='.repeat(60));
  console.log(`Period: Last 7 days`);
  console.log(`Active Streams: ${recentStreams.length}\n`);

  recentStreams.forEach(stream => {
    const completed = stream.goals.filter(g => g.startsWith('[x]')).length;
    const total = stream.goals.length;
    const progress = ((completed / total) * 100).toFixed(0);

    console.log(`${stream.name}`);
    console.log(`  Status: ${stream.status}`);
    console.log(`  Progress: ${progress}% (${completed}/${total} goals)`);
    console.log(`  Checkpoints: ${stream.checkpoints.length}`);
    console.log(`  Template: ${stream.template || 'none'}`);

    if (stream.updates.length > 0) {
      const lastUpdate = stream.updates[stream.updates.length - 1];
      console.log(`  Last Update: ${lastUpdate.note}`);
    }

    console.log();
  });

  // Summary stats
  const completed = recentStreams.filter(s => s.status === 'completed').length;
  const active = recentStreams.filter(s => s.status === 'active').length;

  console.log('SUMMARY');
  console.log(`  Completed: ${completed}`);
  console.log(`  Active: ${active}`);
  console.log(`  Total Checkpoints: ${recentStreams.reduce((sum, s) => sum + s.checkpoints.length, 0)}`);
}

generateWeeklyReport();
```

**Usage:**
```bash
# Run weekly
node scripts/weekly-report.js > weekly-report.txt

# Schedule with cron
# 0 9 * * 1 cd /project && node scripts/weekly-report.js | mail -s "Weekly Streams Report" team@company.com
```

**Result:** Automated team visibility into development progress.

---

## Best Practices

### 1. Checkpoint Early, Checkpoint Often

**Good:**
```bash
/stream-start feature
# ... work for 30 minutes ...
/stream-checkpoint "Component skeleton complete"
# ... work for 30 minutes ...
/stream-checkpoint "Business logic implemented"
# ... work for 30 minutes ...
/stream-checkpoint "Tests added"
```

**Bad:**
```bash
/stream-start feature
# ... work for 6 hours straight ...
/stream-checkpoint "Everything done"  # Too late, lost context
```

### 2. Use Descriptive Checkpoint Messages

**Good:**
```bash
/stream-checkpoint "Authentication refactored: Extracted JWT validation to middleware"
```

**Bad:**
```bash
/stream-checkpoint "Work done"
```

### 3. Monitor Context Proactively

**Good:**
```bash
# Check every hour
/stream-context-check

# At 85%
/stream-checkpoint "Save before hitting limit"
```

**Bad:**
```bash
# Never check
# Auto-compact triggers unexpectedly
```

### 4. Choose the Right Template

**Good:**
```bash
# Feature work
/stream-start oauth --template feature-development

# Bug fix
/stream-start fix-crash --template bug-fix

# Refactoring
/stream-start cleanup --template refactoring
```

**Bad:**
```bash
# Use same template for everything
/stream-start anything  # No guidance
```

### 5. Clean Up Completed Streams

**Good:**
```bash
# After successful merge
/stream-list
# Archive old completed streams manually or via config
```

**Bad:**
```bash
# Never clean up
# 100+ old streams cluttering /stream-list
```

---

## See Also

- [README.md](./README.md) - Overview and quick start
- [INSTALLATION.md](./INSTALLATION.md) - Setup instructions
- [API.md](./API.md) - Programmatic usage
- [CHANGELOG.md](./CHANGELOG.md) - Version history

---

**Need More Help?**

- GitHub Issues: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues)
- Discussions: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/discussions](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/discussions)
