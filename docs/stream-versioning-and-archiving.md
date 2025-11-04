# Stream Versioning and Archiving System
## Comprehensive Guide for Work Streams Plugin

**Document Purpose:** Define versioning, archiving, and lifecycle management strategies for work streams to enable historical tracking, rollback capabilities, and long-term stream management.

**Target Audience:** Developers, architects, and teams using Work Streams for project context management.

**Version:** 1.0.0
**Date:** 2025-11-03
**Status:** Specification Complete

---

## Table of Contents

1. [Overview](#overview)
2. [Versioning Concepts](#versioning-concepts)
3. [Directory Structure](#directory-structure)
4. [Version Naming Conventions](#version-naming-conventions)
5. [When to Create Versions](#when-to-create-versions)
6. [Archiving Strategy](#archiving-strategy)
7. [Implementation Specification](#implementation-specification)
8. [Git Integration](#git-integration)
9. [Command Specifications](#command-specifications)
10. [Best Practices](#best-practices)
11. [Use Cases](#use-cases)
12. [Recovery Procedures](#recovery-procedures)

---

## Overview

### Problem Statement

**Current Work Streams Limitation:**
Work streams in v1.2.2 maintain a single YAML file per stream without versioning. This creates several challenges:

1. **No Rollback Capability:** Cannot restore previous stream state if errors occur
2. **No Historical Tracking:** Cannot see how stream evolved over time
3. **No Comparison Tools:** Cannot compare checkpoint strategies or goal evolution
4. **Limited Audit Trail:** Git commits track changes, but lack semantic stream versioning
5. **No Archive Management:** Completed streams accumulate without organization

### Solution: Semantic Stream Versioning

Introduce semantic versioning for stream YAML files with:
- **Major versions** for significant restructuring or comprehensive reviews
- **Minor versions** for session completions and checkpoint milestones
- **Patch versions** for corrections, clarifications, and minor updates
- **Archive system** for long-term storage of completed or paused streams
- **Git integration** for version control alignment

### Benefits

**For Developers:**
- Rollback to previous stream state if needed
- Compare checkpoint strategies across versions
- Review evolution of goals and decisions
- Restore accidentally deleted data

**For Teams:**
- Audit stream lifecycle comprehensively
- Understand stream evolution patterns
- Share versioned streams for collaboration
- Archive completed work systematically

**For Projects:**
- Historical record of all work periods
- Recovery from data corruption
- Long-term stream management
- Compliance and audit requirements

---

## Versioning Concepts

### Semantic Versioning for Streams

**Format:** `MAJOR.MINOR.PATCH`

**Version Components:**

#### Major Version (X.0.0)

**When to Increment:**
1. **Comprehensive Review:** Full stream review with significant corrections
2. **Major Restructuring:** Goals reorganized, context rewritten
3. **Stream Restart:** Stream resumed after long pause with new direction
4. **Significant Milestone:** Product release, major feature completion

**Examples:**
- `v1.0.0` → `v2.0.0`: Comprehensive review corrected all assumptions
- `v2.0.0` → `v3.0.0`: Stream restarted with new architecture approach

**Impact:** Breaking change in stream structure or direction

---

#### Minor Version (x.Y.0)

**When to Increment:**
1. **Session Completion:** Claude session ends with checkpoint
2. **Checkpoint Creation:** Major checkpoint with substantial progress
3. **Goal Completion:** Significant goal or milestone achieved
4. **Branch Merge:** Feature branch merged, stream updated

**Examples:**
- `v1.0.0` → `v1.1.0`: Session completed, first checkpoint saved
- `v1.1.0` → `v1.2.0`: Second checkpoint, additional goals completed
- `v1.2.0` → `v1.3.0`: Third session complete, feature merged

**Impact:** Additive change, new information added

---

#### Patch Version (x.y.Z)

**When to Increment:**
1. **Typo Corrections:** Fix spelling or grammar errors
2. **Clarifications:** Add missing context or explanations
3. **Metadata Updates:** Update timestamps, file lists
4. **Minor Corrections:** Fix incorrect information without restructuring

**Examples:**
- `v1.1.0` → `v1.1.1`: Fixed typo in goal description
- `v1.1.1` → `v1.1.2`: Corrected file path in context section
- `v1.1.2` → `v1.1.3`: Updated last modified timestamp

**Impact:** No structural change, corrections only

---

### Version Lifecycle

```
v1.0.0 (Initial)
  ↓ Session work, checkpoints
v1.1.0 (Checkpoint)
  ↓ More progress, updates
v1.2.0 (Checkpoint)
  ↓ Session complete
v1.3.0 (Session Complete)
  ↓ Comprehensive review
v2.0.0 (Major Review)
  ↓ Continue work
v2.1.0 (Checkpoint)
  ↓ Stream complete
v2.2.0 (Final) → Archive
```

---

## Directory Structure

### Current Structure (v1.2.2)

```
.claude/streams/
├── .current-stream
├── stream-name-1/
│   └── stream.yaml
├── stream-name-2/
│   └── stream.yaml
└── stream-name-3/
    └── stream.yaml
```

### Proposed Structure (v1.3.0+)

```
.claude/streams/
├── .current-stream                              # Active stream pointer
├── VERSIONING-GUIDE.md                         # This document
│
├── stream-name-1/                              # Active stream
│   ├── stream.yaml                             # Current version (always latest)
│   ├── versions/                               # Version history
│   │   ├── v1.0.0.yaml                        # Initial version
│   │   ├── v1.1.0.yaml                        # First checkpoint
│   │   ├── v1.2.0.yaml                        # Second checkpoint
│   │   ├── v2.0.0.yaml                        # Major review
│   │   └── VERSION-LOG.md                     # Human-readable version log
│   └── metadata.yaml                           # Stream metadata
│
├── stream-name-2/                              # Another active stream
│   ├── stream.yaml
│   ├── versions/
│   │   └── v1.0.0.yaml
│   └── metadata.yaml
│
└── archive/                                     # Archived streams
    ├── README.md                               # Archive index
    ├── archived-stream-1/                      # Completed stream
    │   ├── stream.yaml                         # Final version
    │   ├── versions/                           # Complete version history
    │   │   ├── v1.0.0.yaml
    │   │   ├── v1.1.0.yaml
    │   │   ├── v2.0.0.yaml
    │   │   └── VERSION-LOG.md
    │   └── archive-metadata.yaml              # Why archived, when, status
    │
    └── archived-stream-2/
        └── [same structure]
```

### File Descriptions

**stream.yaml**
- Current working version
- Always reflects latest state
- Modified by all stream commands
- Never deleted (only moved to archive)

**versions/vX.Y.Z.yaml**
- Immutable version snapshot
- Created at version boundaries
- Never modified after creation
- Used for rollback and comparison

**versions/VERSION-LOG.md**
- Human-readable version history
- Explains what changed in each version
- Links to git commits
- Documents reasoning for major versions

**metadata.yaml**
- Stream creation date
- Template used
- Tags and categories
- Version statistics

**archive-metadata.yaml**
- Archive date and reason
- Final version number
- Resume instructions
- Related streams

---

## Version Naming Conventions

### File Naming

**Current Version:**
```
stream.yaml
```

**Versioned Snapshots:**
```
versions/v{major}.{minor}.{patch}.yaml
```

**Examples:**
```
versions/v1.0.0.yaml          # Initial version
versions/v1.1.0.yaml          # First checkpoint
versions/v1.2.0.yaml          # Second checkpoint
versions/v2.0.0.yaml          # Major review
versions/v2.1.0.yaml          # Checkpoint after review
```

### Version Tags in YAML

**Add version metadata to stream.yaml:**

```yaml
name: feature-implementation
version: v2.1.0
version_created: 2025-11-03T14:30:00Z

version_history:
  - version: v1.0.0
    date: 2025-11-01T10:00:00Z
    description: Initial stream creation
    session: session-001

  - version: v1.1.0
    date: 2025-11-01T16:00:00Z
    description: First checkpoint - database schema designed
    session: session-001
    checkpoint: true

  - version: v1.2.0
    date: 2025-11-02T12:00:00Z
    description: Second checkpoint - API endpoints implemented
    session: session-002
    checkpoint: true

  - version: v2.0.0
    date: 2025-11-03T09:00:00Z
    description: Comprehensive review - corrected architecture assumptions
    session: session-003
    review: true
    changes:
      - Restructured goals for clarity
      - Updated context with new decisions
      - Corrected database schema approach

  - version: v2.1.0
    date: 2025-11-03T14:30:00Z
    description: Third checkpoint - testing complete
    session: session-003
    checkpoint: true
```

---

## When to Create Versions

### Automatic Version Creation

**Implemented in Commands:**

#### /stream-checkpoint

**Behavior:**
- Always creates minor version (x.Y.0)
- Saves current stream.yaml as versions/vX.Y.0.yaml
- Increments minor version in stream.yaml
- Adds entry to version_history
- Updates VERSION-LOG.md

**Example:**
```bash
/stream-checkpoint Major milestone reached

# Before: v1.1.0
# After:  v1.2.0
# Saved:  versions/v1.2.0.yaml
```

---

#### /stream-end

**Behavior:**
- Creates final minor version (x.Y.0)
- Marks stream as completed
- Optionally moves to archive
- Creates archive metadata

**Example:**
```bash
/stream-end

# Before: v2.3.0
# After:  v2.4.0 (final)
# Saved:  versions/v2.4.0.yaml
# Status: completed
```

---

### Manual Version Creation

**New Commands:**

#### /stream-version create

**Usage:**
```bash
/stream-version create [major|minor|patch] [description]
```

**Examples:**
```bash
# Create minor version (checkpoint)
/stream-version create minor "Completed API implementation"

# Create major version (comprehensive review)
/stream-version create major "Comprehensive stream review and restructuring"

# Create patch version (typo fix)
/stream-version create patch "Fixed typo in goal description"
```

---

#### /stream-version list

**Usage:**
```bash
/stream-version list [stream-name]
```

**Output:**
```
Version History: feature-implementation

v2.1.0 (current) - 2025-11-03 14:30
  Third checkpoint - testing complete
  Session: session-003

v2.0.0 - 2025-11-03 09:00
  Comprehensive review - corrected architecture
  Session: session-003
  Type: Major Review

v1.2.0 - 2025-11-02 12:00
  Second checkpoint - API endpoints implemented
  Session: session-002

v1.1.0 - 2025-11-01 16:00
  First checkpoint - database schema designed
  Session: session-001

v1.0.0 - 2025-11-01 10:00
  Initial stream creation
  Session: session-001

Total versions: 5
Duration: 3 days
```

---

#### /stream-version diff

**Usage:**
```bash
/stream-version diff [version-1] [version-2]
```

**Example:**
```bash
/stream-version diff v1.2.0 v2.0.0
```

**Output:**
```
Comparing versions: v1.2.0 → v2.0.0

Goals Changed:
  - Removed: "Design database schema with MySQL"
  + Added: "Design database schema with PostgreSQL"

  - Removed: "Implement REST API endpoints"
  + Added: "Implement GraphQL API endpoints"

Context Changes:
  + Added decision: "Switched from REST to GraphQL for flexibility"
  + Added file: graphql-schema.graphql

Checkpoints:
  + 2 new checkpoints added

Summary:
  Major architectural shift from REST to GraphQL
  Database changed from MySQL to PostgreSQL
  3 goals restructured
```

---

#### /stream-version restore

**Usage:**
```bash
/stream-version restore [version]
```

**Example:**
```bash
/stream-version restore v1.2.0
```

**Confirmation:**
```
⚠ Warning: This will restore stream to v1.2.0

Current version: v2.1.0
Restore to: v1.2.0

You will lose:
  - 2 versions of progress (v2.0.0, v2.1.0)
  - 3 checkpoints
  - 5 updates

Current version will be saved as: versions/v2.1.0-backup-20251103.yaml

Restore? (yes/no):
```

**Process:**
1. Backup current version with timestamp
2. Copy requested version to stream.yaml
3. Update version metadata
4. Log restoration in version_history

---

## Archiving Strategy

### When to Archive

**Automatic Archiving:**

1. **Stream Completion** (`/stream-end`)
   - Status: completed
   - All goals achieved
   - Final version created

2. **Long-Term Pause** (Optional)
   - Status: paused
   - No activity for 30+ days
   - Manual trigger: `/stream-archive`

**Manual Archiving:**

3. **Stream Consolidation**
   - Multiple streams merged
   - Original streams archived

4. **Major Restructuring**
   - Stream completely rewritten
   - Original archived for reference

### Archive Process

**Automatic Steps:**

1. **Create Archive Directory**
   ```
   .claude/streams/archive/stream-name/
   ```

2. **Move Stream Files**
   - Copy stream.yaml as final version
   - Move entire versions/ directory
   - Move metadata.yaml

3. **Create Archive Metadata**
   ```yaml
   # archive-metadata.yaml
   archived_date: 2025-11-03T15:00:00Z
   archived_reason: Stream completed
   final_version: v2.4.0
   final_status: completed

   statistics:
     duration_days: 12
     sessions: 5
     checkpoints: 8
     updates: 23
     versions: 9

   resume_instructions: |
     To resume this stream:
     1. Run: /stream-unarchive stream-name
     2. Review final version and last checkpoint
     3. Update goals if project direction changed
     4. Continue with new session
   ```

4. **Update Archive Index**
   - Add entry to archive/README.md
   - Include summary and statistics

5. **Remove from Active Directory**
   - Delete original stream directory
   - Update .current-stream if this was active

### Archive Index Format

**archive/README.md:**

```markdown
# Archived Work Streams

Total archived streams: 15
Last updated: 2025-11-03

## Recently Archived

### feature-user-authentication (v2.4.0)
- Archived: 2025-11-03
- Reason: Stream completed
- Duration: 12 days
- Sessions: 5
- Status: completed

### refactor-database-layer (v3.1.0)
- Archived: 2025-11-02
- Reason: Stream paused for 60 days
- Duration: 45 days
- Sessions: 12
- Status: paused

## By Status

**Completed (12):**
- feature-user-authentication
- feature-payment-integration
- [...]

**Paused (3):**
- refactor-database-layer
- migrate-to-microservices
- [...]

## By Date

**2025-11:**
- feature-user-authentication (completed)
- refactor-database-layer (paused)

**2025-10:**
- feature-payment-integration (completed)
- [...]
```

---

## Implementation Specification

### Version Metadata Schema

**Addition to stream.yaml:**

```yaml
# Version information (new section)
version: v2.1.0
version_created: 2025-11-03T14:30:00Z
version_type: minor  # major, minor, patch

version_history:
  - version: string
    date: timestamp
    description: string
    session: string
    type: string  # initial, checkpoint, review, correction
    checkpoint: boolean
    review: boolean
    changes: [list]  # For major versions
    git_commit: string  # Optional git SHA

# Existing stream.yaml fields follow...
name: string
description: string
status: string
[...]
```

### Archive Metadata Schema

**archive-metadata.yaml:**

```yaml
# Archive information
name: string
archived_date: timestamp
archived_reason: string  # completed, long-pause, restructuring, consolidation
final_version: string
final_status: string  # completed, paused

# Statistics
statistics:
  duration_days: number
  duration_hours: number
  sessions: number
  checkpoints: number
  updates: number
  versions: number
  goals_completed: number
  goals_total: number
  files_modified: number

# Version summary
versions:
  first: string
  last: string
  count: number
  major_versions: number

# Sessions summary
sessions:
  - id: string
    duration: string
    versions: [list]

# Related information
related_streams:
  - name: string
    relationship: string  # depends-on, follows, merged-into

tags: [list]

# Resume information
resume_instructions: |
  Detailed instructions for resuming this stream

blocked_by: [list]  # If paused due to blockers
blocked_on: string  # Description of what's blocking
```

---

## Git Integration

### Git Commit Strategy

**Version Creation Commits:**

```bash
# Minor version (checkpoint)
git add .claude/streams/stream-name/versions/v1.2.0.yaml
git commit -m "stream: stream-name v1.2.0 - Checkpoint description"

# Major version (review)
git add .claude/streams/stream-name/versions/v2.0.0.yaml
git commit -m "stream: stream-name v2.0.0 - Major review description"

# Archive
git add .claude/streams/archive/stream-name/
git commit -m "stream: Archive stream-name v2.4.0 - completed"
```

### Git Tags for Streams

**Tag Naming Convention:**

```
stream-{name}-v{version}
stream-{name}-archived
stream-{name}-session-{id}
```

**Examples:**

```bash
# Version tag
git tag -a stream-user-auth-v1.0.0 \
  -m "Initial version: User authentication stream"

# Session tag
git tag -a stream-user-auth-session-001 \
  -m "Session 001 complete: Basic auth implemented"

# Archive tag
git tag -a stream-user-auth-archived \
  -m "Stream completed and archived"
```

### Git Log Integration

**Link versions to git commits:**

```yaml
version_history:
  - version: v1.2.0
    date: 2025-11-02T12:00:00Z
    description: API endpoints implemented
    git_commit: a1b2c3d4
    git_tag: stream-user-auth-v1.2.0
```

**Query git history:**

```bash
# View all stream-related commits
git log --oneline --grep="stream: stream-name"

# View commits for specific version
git log --oneline stream-user-auth-v1.0.0..stream-user-auth-v1.2.0
```

---

## Command Specifications

### New Commands for v1.3.0

#### /stream-version

**Subcommands:**

**create** - Create new version
```bash
/stream-version create [major|minor|patch] "description"
```

**list** - List all versions
```bash
/stream-version list [stream-name]
```

**show** - Show specific version
```bash
/stream-version show [version]
```

**diff** - Compare two versions
```bash
/stream-version diff [version-1] [version-2]
```

**restore** - Restore to previous version
```bash
/stream-version restore [version]
```

**log** - Show version log
```bash
/stream-version log [stream-name]
```

---

#### /stream-archive

**Archive a stream:**

```bash
/stream-archive [stream-name] [reason]
```

**Options:**
- `--keep-active` - Archive but keep in active streams
- `--no-index` - Do not update archive index

**Example:**
```bash
/stream-archive refactor-auth-module "Paused for backend completion"
```

---

#### /stream-unarchive

**Restore archived stream:**

```bash
/stream-unarchive [stream-name]
```

**Process:**
1. Copy from archive/ to active streams/
2. Update status to active or paused
3. Create new session
4. Optionally create new major version

**Example:**
```bash
/stream-unarchive refactor-auth-module
```

**Output:**
```
✓ Unarchived: refactor-auth-module

Restored from archive:
  Final version: v3.1.0
  Archived: 45 days ago
  Status: paused

Would you like to:
  1. Resume as-is (keep v3.1.0)
  2. Start new major version (v4.0.0)
  3. Review before deciding

Choice:
```

---

### Modified Commands for v1.3.0

#### /stream-checkpoint (Enhanced)

**Add automatic versioning:**

```bash
/stream-checkpoint [description]
```

**New behavior:**
1. Save current stream.yaml as versions/vX.Y.0.yaml
2. Increment minor version
3. Add version_history entry
4. Update VERSION-LOG.md
5. Commit to git with version tag

---

#### /stream-end (Enhanced)

**Add archiving option:**

```bash
/stream-end [--archive] [--no-archive]
```

**Options:**
- `--archive` - Immediately archive after completion
- `--no-archive` - Keep in active streams (default)

**New behavior:**
1. Create final version
2. Optionally move to archive
3. Create archive metadata
4. Update archive index

---

## Best Practices

### Version Creation Guidelines

**Create Major Version When:**
1. Comprehensive stream review completed
2. Goals significantly restructured
3. Stream direction fundamentally changed
4. After long pause (30+ days) when resuming

**Create Minor Version When:**
1. Checkpoint created with `/stream-checkpoint`
2. Session completed
3. Significant milestone reached
4. Stream paused for another stream

**Create Patch Version When:**
1. Typo or grammar corrected
2. Metadata updated (timestamps, file lists)
3. Clarification added without structural change
4. Minor correction made

### Active Directory Management

**Keep Clean:**
- Active directory should have 10-20 active streams maximum
- Archive completed streams within 7 days
- Archive paused streams after 30 days of inactivity

**Version Storage:**
- Keep all versions in versions/ directory
- No size limit (versions are small YAML files)
- Git handles storage efficiently

### Archive Management

**Archive Immediately:**
- Completed streams
- Streams consolidated into others
- Streams replaced by major rewrite

**Archive After Delay:**
- Paused streams (after 30 days)
- Streams with no activity (after 60 days)

### Git Integration

**Always Tag:**
- Major versions: `git tag stream-name-vX.0.0`
- Session completions: `git tag stream-name-session-00X`
- Archives: `git tag stream-name-archived`

**Commit Messages:**
```bash
# Good
git commit -m "stream: user-auth v1.2.0 - API endpoints complete"

# Bad
git commit -m "updated stream"
```

---

## Use Cases

### Use Case 1: Rollback After Error

**Scenario:** Accidentally deleted important context from stream

**Solution:**
```bash
# View recent versions
/stream-version list

# Current: v2.3.0 (damaged)
# Previous: v2.2.0 (good)

# Restore previous version
/stream-version restore v2.2.0

# Current version backed up as v2.3.0-backup-20251103.yaml
# Stream restored to v2.2.0
# Continue work with correct context
```

---

### Use Case 2: Compare Checkpoint Strategies

**Scenario:** Want to see how checkpoint descriptions evolved

**Solution:**
```bash
# Compare early and recent versions
/stream-version diff v1.1.0 v2.5.0

# View differences in:
# - Checkpoint descriptions
# - Goal structure
# - Context organization
# - Decision documentation

# Learn what worked and what didn't
# Apply learnings to new streams
```

---

### Use Case 3: Resume After Long Pause

**Scenario:** Stream paused for 90 days, need to resume

**Solution:**
```bash
# Stream auto-archived after 30 days

# List archived streams
ls .claude/streams/archive/

# Unarchive stream
/stream-unarchive old-feature-stream

# Create new major version for fresh start
/stream-version create major "Resuming after 90 days - new approach"

# Review last checkpoint
# Update goals based on new information
# Continue work with clean version history
```

---

### Use Case 4: Audit Stream Evolution

**Scenario:** Need to understand how project evolved for documentation

**Solution:**
```bash
# View complete version log
/stream-version log feature-user-authentication

# Output shows:
# - All versions with descriptions
# - Major decisions at each version
# - Timeline of sessions
# - Goal evolution

# Use for:
# - Project retrospectives
# - Documentation writing
# - Process improvement
# - Stakeholder reports
```

---

### Use Case 5: Consolidate Duplicate Streams

**Scenario:** Two streams working on same feature, need to merge

**Solution:**
```bash
# Archive first stream
/stream-archive feature-auth-v1 "Consolidating into feature-auth-v2"

# In archive metadata, link streams:
related_streams:
  - name: feature-auth-v2
    relationship: merged-into

# Continue work in primary stream
# Reference archived stream if needed
# Keep history of both approaches
```

---

## Recovery Procedures

### Recover Deleted Stream

**If deleted but not committed:**

```bash
# Git has the data
git checkout HEAD -- .claude/streams/stream-name/

# Stream restored from last commit
```

**If committed deletion:**

```bash
# Find commit that deleted it
git log --oneline --all -- .claude/streams/stream-name/

# Restore from that commit
git checkout <commit-hash> -- .claude/streams/stream-name/

# Stream restored from history
```

---

### Recover Corrupted Version

**If current version corrupted:**

```bash
# List available versions
/stream-version list

# Restore last known good version
/stream-version restore v2.4.0

# Current (corrupted) saved as backup
# Work continues from last good version
```

---

### Recover from Archive

**If accidentally archived:**

```bash
# Unarchive stream
/stream-unarchive stream-name

# Stream moved back to active
# All versions preserved
# Continue work normally
```

---

## Conclusion

### Implementation Priority

**v1.3.0 Alpha:**
- Basic version creation in `/stream-checkpoint`
- versions/ directory structure
- Version metadata in stream.yaml

**v1.3.0 Beta:**
- `/stream-version` command suite
- Automatic archiving in `/stream-end`
- Archive index generation

**v1.3.0 Release:**
- `/stream-archive` and `/stream-unarchive`
- Git tag integration
- Version diff and comparison

**v1.4.0:**
- Automated archive cleanup
- Version statistics dashboard
- Advanced recovery tools

### Benefits Summary

**Versioning provides:**
- ✓ Complete stream lifecycle tracking
- ✓ Rollback capability for errors
- ✓ Historical audit trail
- ✓ Comparison tools for improvement
- ✓ Professional stream management

**Archiving provides:**
- ✓ Clean active directory
- ✓ Long-term storage
- ✓ Recovery procedures
- ✓ Stream consolidation
- ✓ Compliance support

**Together, they make Work Streams enterprise-ready for long-term project management.**

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-03
**Author:** Work Streams Team
**Status:** Specification Complete - Ready for v1.3.0 Implementation
