# Stream Archive Management Guide
## Practical Operations and Maintenance for Work Streams Archive

**Document Purpose:** Provide practical guidance for managing, maintaining, and utilizing the stream archive directory in Work Streams.

**Target Audience:** Developers and teams actively managing work stream archives.

**Version:** 1.0.0
**Date:** 2025-11-03
**Status:** Operational Guide

---

## Table of Contents

1. [Overview](#overview)
2. [Archive Purpose and Benefits](#archive-purpose-and-benefits)
3. [Archive Structure](#archive-structure)
4. [Archive Operations](#archive-operations)
5. [Daily Operations](#daily-operations)
6. [Archive Maintenance](#archive-maintenance)
7. [Archive Index Management](#archive-index-management)
8. [Search and Discovery](#search-and-discovery)
9. [Recovery Operations](#recovery-operations)
10. [Archive Statistics](#archive-statistics)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## Overview

### What is the Stream Archive

The stream archive is a dedicated directory within `.claude/streams/archive/` that preserves completed and long-term paused streams with their complete version history.

**Location:**
```
.claude/streams/archive/
```

**Purpose:**
- Preserve completed stream history
- Enable recovery and restoration
- Maintain audit trail
- Support learning and retrospectives
- Keep active directory clean and performant

### Relationship to Versioning System

This guide is complementary to the comprehensive [Stream Versioning and Archiving System](./stream-versioning-and-archiving.md) specification. This document focuses on practical operations, while the versioning guide provides the complete specification.

**When to Use Each Document:**

**Use This Guide (Archive Management) When:**
- Archiving a completed stream
- Searching for archived streams
- Restoring from archive
- Maintaining archive index
- Performing daily archive operations

**Use Versioning Guide When:**
- Understanding semantic versioning
- Designing version strategies
- Implementing versioning commands
- Planning archive architecture

---

## Archive Purpose and Benefits

### Primary Purposes

**1. Historical Preservation**

Maintain complete record of project work including:
- All stream versions from inception to completion
- Session summaries and achievements
- Decision history and rationale
- Lessons learned and insights

**2. Active Directory Optimization**

Keep active streams directory clean by:
- Moving completed streams to archive
- Removing long-term paused streams
- Maintaining manageable active stream count (10-20 recommended)
- Improving performance and navigation

**3. Recovery Capability**

Enable restoration of archived streams:
- Resume paused streams after blockers resolved
- Reference completed stream approaches
- Restore accidentally deleted streams
- Extract lessons for new streams

**4. Audit and Compliance**

Provide audit trail for:
- Project retrospectives
- Compliance requirements
- Process improvement analysis
- Stakeholder reporting

### Benefits

**For Individual Developers:**
- Clean workspace with only active streams
- Easy access to historical decisions
- Learning from past approaches
- Quick recovery from mistakes

**For Teams:**
- Shared project history
- Consistent archive organization
- Collaborative learning resource
- Professional stream management

**For Projects:**
- Complete lifecycle documentation
- Compliance and audit support
- Knowledge preservation
- Process improvement foundation

---

## Archive Structure

### Directory Layout

```
.claude/streams/archive/
├── README.md                                    # Archive index (this document maintains)
│
├── feature-user-authentication/                 # Archived stream (completed)
│   ├── stream.yaml                             # Final version
│   ├── versions/                               # Complete version history
│   │   ├── v1.0.0.yaml                        # Initial version
│   │   ├── v1.1.0.yaml                        # First checkpoint
│   │   ├── v1.2.0.yaml                        # Second checkpoint
│   │   ├── v2.0.0.yaml                        # Major review
│   │   ├── v2.1.0.yaml                        # Final version
│   │   └── VERSION-LOG.md                      # Human-readable log
│   ├── metadata.yaml                           # Stream metadata
│   └── archive-metadata.yaml                   # Archive-specific metadata
│
├── refactor-database-layer/                     # Archived stream (paused)
│   ├── stream.yaml                             # Last version before pause
│   ├── versions/
│   │   ├── v1.0.0.yaml
│   │   ├── v2.0.0.yaml
│   │   ├── v3.0.0.yaml
│   │   ├── v3.1.0.yaml                        # Paused at this version
│   │   └── VERSION-LOG.md
│   ├── metadata.yaml
│   └── archive-metadata.yaml
│
└── legacy-migration-2024/                       # Archived stream (completed)
    ├── stream.yaml
    ├── versions/
    │   └── [...10 versions]
    ├── metadata.yaml
    └── archive-metadata.yaml
```

### File Descriptions

**stream.yaml**
- Final version of the stream
- Reflects state at archive time
- Never modified after archiving
- Used for restoration

**versions/ directory**
- Complete version history
- All snapshots from v1.0.0 to final
- Immutable after archiving
- Used for historical analysis

**versions/VERSION-LOG.md**
- Human-readable version history
- Explains changes in each version
- Links to git commits
- Documents reasoning

**metadata.yaml**
- Original stream metadata
- Creation date and template
- Tags and categories
- Never modified after archiving

**archive-metadata.yaml**
- Archive-specific information
- Why archived, when archived
- Resume instructions
- Statistics and summaries
- Relationships to other streams

---

## Archive Operations

### Archiving a Stream

**When to Archive:**

**Automatically (via `/stream-end`):**
1. Stream status: completed
2. All goals achieved
3. Final version created

**Manually (via `/stream-archive`):**
1. Long-term pause (30+ days inactive)
2. Stream consolidation (merged into another)
3. Major restructuring (original preserved)

**Archive Process:**

```bash
# Method 1: Automatic (when ending stream)
/stream-end --archive

# Method 2: Manual archiving
/stream-archive stream-name "Archive reason here"
```

**What Happens:**

1. **Create Archive Directory**
   ```
   .claude/streams/archive/stream-name/
   ```

2. **Copy Stream Files**
   - stream.yaml (final version)
   - versions/ directory (complete history)
   - metadata.yaml (original metadata)

3. **Generate Archive Metadata**
   ```yaml
   # archive-metadata.yaml
   archived_date: 2025-11-03T15:30:00Z
   archived_reason: Stream completed - all goals achieved
   final_version: v2.4.0
   final_status: completed

   statistics:
     duration_days: 12
     sessions: 5
     checkpoints: 8
     versions: 9
     goals_completed: 10
     goals_total: 10
   ```

4. **Update Archive Index**
   - Add entry to archive/README.md
   - Include summary and statistics

5. **Remove from Active**
   - Delete from active streams directory
   - Update .current-stream if needed

6. **Git Commit**
   ```bash
   git add .claude/streams/archive/stream-name/
   git commit -m "stream: Archive stream-name v2.4.0 - completed"
   git tag -a stream-stream-name-archived -m "Stream completed"
   ```

### Manual Archive Process

If you need to archive manually without the command:

```bash
# Step 1: Create archive directory
mkdir -p .claude/streams/archive/stream-name

# Step 2: Copy stream files
cp -r .claude/streams/stream-name/* .claude/streams/archive/stream-name/

# Step 3: Create archive metadata (see template below)
nano .claude/streams/archive/stream-name/archive-metadata.yaml

# Step 4: Update archive index
nano .claude/streams/archive/README.md

# Step 5: Remove from active (optional)
rm -rf .claude/streams/stream-name/

# Step 6: Commit to git
git add .claude/streams/archive/stream-name/
git commit -m "stream: Archive stream-name - reason"
```

### Archive Metadata Template

```yaml
# archive-metadata.yaml
name: stream-name
archived_date: 2025-11-03T15:30:00Z
archived_reason: completed | long-pause | consolidation | restructuring
final_version: v2.4.0
final_status: completed | paused

# Statistics
statistics:
  duration_days: 12
  duration_hours: 48
  sessions: 5
  checkpoints: 8
  updates: 23
  versions: 9
  goals_completed: 10
  goals_total: 10
  files_modified: 45

# Version summary
versions:
  first: v1.0.0
  last: v2.4.0
  count: 9
  major_versions: 2

# Sessions
sessions:
  - id: session-001
    duration: "2025-11-01 to 2025-11-03"
    versions: [v1.0.0, v1.1.0, v1.2.0]

  - id: session-002
    duration: "2025-11-05 to 2025-11-08"
    versions: [v2.0.0, v2.1.0]

  - id: session-003
    duration: "2025-11-10 to 2025-11-12"
    versions: [v2.2.0, v2.3.0, v2.4.0]

# Related streams
related_streams:
  - name: follow-up-feature
    relationship: depends-on

  - name: previous-attempt
    relationship: follows

# Tags for categorization
tags:
  - authentication
  - security
  - user-management
  - feature

# Resume instructions
resume_instructions: |
  To resume this stream:
  1. Run: /stream-unarchive stream-name
  2. Review final version (v2.4.0) and last checkpoint
  3. Check if any dependencies or blockers have changed
  4. Update goals if project direction has evolved
  5. Create new session and continue work

# Blockers (if paused)
blocked_by: []
blocked_on: null
```

---

## Daily Operations

### Viewing Archived Streams

**List all archived streams:**

```bash
ls -la .claude/streams/archive/
```

**View archive index:**

```bash
cat .claude/streams/archive/README.md
```

**View specific stream metadata:**

```bash
cat .claude/streams/archive/stream-name/archive-metadata.yaml
```

### Searching Archives

**Find streams by status:**

```bash
# Completed streams
grep -r "final_status: completed" .claude/streams/archive/

# Paused streams
grep -r "final_status: paused" .claude/streams/archive/
```

**Find streams by tag:**

```bash
# Streams tagged "authentication"
grep -r "authentication" .claude/streams/archive/*/archive-metadata.yaml
```

**Find streams archived in date range:**

```bash
# Archived in November 2025
grep "archived_date: 2025-11" .claude/streams/archive/*/archive-metadata.yaml
```

### Comparing Archived Versions

**Compare two versions within archived stream:**

```bash
diff -u \
  .claude/streams/archive/stream-name/versions/v1.0.0.yaml \
  .claude/streams/archive/stream-name/versions/v2.0.0.yaml
```

**Using visual diff tool:**

```bash
code --diff \
  .claude/streams/archive/stream-name/versions/v1.0.0.yaml \
  .claude/streams/archive/stream-name/versions/v2.0.0.yaml
```

### Extracting Information

**View complete version history:**

```bash
cat .claude/streams/archive/stream-name/versions/VERSION-LOG.md
```

**Extract lessons learned:**

```bash
# From all archived streams
grep -r "lessons_learned" .claude/streams/archive/

# From specific stream
yq '.lessons_learned' .claude/streams/archive/stream-name/stream.yaml
```

**Get statistics summary:**

```bash
yq '.statistics' .claude/streams/archive/stream-name/archive-metadata.yaml
```

---

## Archive Maintenance

### Regular Maintenance Tasks

**Weekly:**

1. **Update Archive Index**
   - Review archive/README.md
   - Ensure all archived streams listed
   - Update statistics section

2. **Check Archive Integrity**
   ```bash
   # Verify all archived streams have metadata
   for dir in .claude/streams/archive/*/; do
     if [ ! -f "$dir/archive-metadata.yaml" ]; then
       echo "Missing metadata: $dir"
     fi
   done
   ```

**Monthly:**

1. **Archive Statistics Review**
   - Count total archived streams
   - Calculate total development hours
   - Identify patterns and trends

2. **Cleanup Old Paused Streams**
   - Review paused streams in active directory
   - Archive streams inactive >30 days
   - Update blockers if resolved

**Quarterly:**

1. **Archive Audit**
   - Review all archived streams
   - Verify git tags present
   - Check version history completeness

2. **Archive Index Reorganization**
   - Update categorization
   - Improve search metadata
   - Add cross-references

### Archive Index Maintenance

The archive/README.md file should be kept up to date with:

**Required Sections:**

1. **Purpose** - Why archive exists
2. **Structure** - Directory layout
3. **Current Archives** - All archived streams
4. **Statistics** - Summary counts
5. **Best Practices** - Usage guidelines
6. **Related Documentation** - Links to guides

**Archive Entry Template:**

```markdown
### stream-name (vX.Y.Z)

**Status**: completed | paused
**Archived**: YYYY-MM-DD
**Duration**: X days
**Sessions**: N
**Final Version**: vX.Y.Z

**Summary**: Brief description of what stream accomplished.

**Versions**:
- v1.0.0 to v1.5.0: Session-001 (initial implementation)
- v2.0.0 to v2.4.0: Session-002 (refinement and completion)

**Resume Instructions**: See `stream-name/archive-metadata.yaml`

**Tags**: tag1, tag2, tag3

---
```

---

## Archive Index Management

### Creating Archive Index

When initializing archive directory:

```bash
cat > .claude/streams/archive/README.md <<'EOF'
# Stream Archive

This directory contains archived work streams, preserving version history and providing audit trails.

## Purpose

- **Version History**: Track evolution of streams across sessions
- **Audit Trail**: Document decisions, changes, and corrections
- **Recovery**: Restore previous versions if needed
- **Learning**: Review past approaches and lessons learned

## Structure

```
archive/
├── README.md                                    # This file
├── {stream-name}/                               # Stream-specific archive
│   ├── archive-metadata.yaml                    # Archive metadata
│   ├── metadata.yaml                            # Original stream metadata
│   ├── stream.yaml                              # Final version
│   └── versions/                                # Version history
│       ├── v{major}.{minor}.{patch}.yaml       # Versioned snapshots
│       └── VERSION-LOG.md                       # Human-readable log
└── [other-stream-archives]/
```

## Current Archives

(Archive entries will be added here as streams are archived)

---

## Statistics

**Total Streams Archived**: 0
**Total Versions**: 0
**Total Development Hours**: 0

Last updated: YYYY-MM-DD

---

## How to Use

### View Archive
```bash
cat .claude/streams/archive/README.md
```

### List Archives
```bash
ls -la .claude/streams/archive/
```

### View Stream Metadata
```bash
cat .claude/streams/archive/{stream-name}/archive-metadata.yaml
```

### Restore from Archive
```bash
/stream-unarchive {stream-name}
```

---

## Related Documentation

- **Stream Versioning Guide**: ../docs/stream-versioning-and-archiving.md
- **Archive Management**: ../docs/stream-archive-management.md

EOF
```

### Updating Archive Index

When adding new archived stream:

```markdown
## Current Archives

### new-stream-name (v2.1.0)

**Status**: completed
**Archived**: 2025-11-03
**Duration**: 8 days
**Sessions**: 3
**Final Version**: v2.1.0

**Summary**: Implemented user authentication with OAuth 2.0 and JWT tokens.

**Versions**:
- v1.0.0 to v1.3.0: Session-001 (basic auth)
- v2.0.0 to v2.1.0: Session-002 (OAuth integration)

**Resume Instructions**: See `new-stream-name/archive-metadata.yaml`

**Tags**: authentication, security, oauth

---

(... existing entries below ...)
```

### Statistics Section Update

Update after each archive operation:

```markdown
## Statistics

### Archive Summary

| Stream | Versions | Sessions | Hours | Status | Latest |
|--------|----------|----------|-------|--------|--------|
| stream-1 | 9 | 3 | 24h | completed | v2.1.0 |
| stream-2 | 11 | 5 | 48h | paused | v3.2.0 |
| stream-3 | 7 | 2 | 16h | completed | v1.7.0 |

**Total Streams Archived**: 3
**Total Versions**: 27
**Total Development Hours**: 88
**Average Duration**: 8 days per stream

Last updated: 2025-11-03
```

---

## Search and Discovery

### Finding Archived Streams

**By Status:**

```bash
# Find completed streams
grep -l "final_status: completed" .claude/streams/archive/*/archive-metadata.yaml

# Find paused streams
grep -l "final_status: paused" .claude/streams/archive/*/archive-metadata.yaml
```

**By Date Range:**

```bash
# Archived in November 2025
grep "archived_date: 2025-11" .claude/streams/archive/*/archive-metadata.yaml

# Archived in last 30 days
find .claude/streams/archive -name "archive-metadata.yaml" -mtime -30
```

**By Duration:**

```bash
# Long-running streams (>20 days)
grep -A 1 "duration_days:" .claude/streams/archive/*/archive-metadata.yaml | \
  awk '/duration_days:/ {if ($2 > 20) print FILENAME}'
```

**By Tags:**

```bash
# Streams tagged "security"
grep -l "security" .claude/streams/archive/*/archive-metadata.yaml

# Multiple tags (security AND authentication)
grep -l "security" .claude/streams/archive/*/archive-metadata.yaml | \
  xargs grep -l "authentication"
```

**By Goal Count:**

```bash
# Streams with 10+ goals
grep -A 1 "goals_total:" .claude/streams/archive/*/archive-metadata.yaml | \
  awk '/goals_total:/ {if ($2 >= 10) print FILENAME}'
```

### Creating Search Index

For large archives, create searchable index:

```bash
# Create search index
cat > .claude/streams/archive/SEARCH-INDEX.md <<'EOF'
# Archive Search Index

## By Status

### Completed Streams
- stream-1 (v2.1.0)
- stream-3 (v1.7.0)

### Paused Streams
- stream-2 (v3.2.0)

## By Tags

### Authentication
- stream-1, stream-2

### Security
- stream-1, stream-3

### Performance
- stream-2

## By Date

### 2025-11
- stream-1 (2025-11-03)
- stream-2 (2025-11-05)

### 2025-10
- stream-3 (2025-10-28)

## By Duration

### Long-running (>20 days)
- stream-2 (45 days)

### Medium (10-20 days)
- stream-1 (12 days)

### Short (<10 days)
- stream-3 (8 days)

EOF
```

---

## Recovery Operations

### Unarchiving a Stream

**Using Command:**

```bash
/stream-unarchive stream-name
```

**Manual Unarchive:**

```bash
# Step 1: Copy from archive to active
cp -r .claude/streams/archive/stream-name .claude/streams/

# Step 2: Remove archive metadata (keep original metadata)
rm .claude/streams/stream-name/archive-metadata.yaml

# Step 3: Update status in stream.yaml
# Change status from "completed" or "paused" to "active"

# Step 4: Update .current-stream if this is new active stream
echo "stream-name" > .claude/streams/.current-stream

# Step 5: Commit
git add .claude/streams/stream-name/
git commit -m "stream: Unarchive stream-name - resuming work"
```

### Partial Recovery

**Extract single version:**

```bash
# Copy specific version to active stream
cp .claude/streams/archive/stream-name/versions/v2.0.0.yaml \
   .claude/streams/new-stream-name/stream.yaml
```

**Extract lessons learned:**

```bash
# Extract lessons from archived stream
yq '.lessons_learned' \
  .claude/streams/archive/stream-name/stream.yaml \
  > lessons.md
```

**Extract context only:**

```bash
# Get context from archived version
yq '.context' \
  .claude/streams/archive/stream-name/versions/v2.0.0.yaml \
  > context-reference.yaml
```

### Recovery from Git

**If archive accidentally deleted:**

```bash
# Find commit that deleted it
git log --oneline --all -- .claude/streams/archive/stream-name/

# Restore from git history
git checkout <commit-hash> -- .claude/streams/archive/stream-name/

# Commit restoration
git add .claude/streams/archive/stream-name/
git commit -m "stream: Restore accidentally deleted archive"
```

---

## Archive Statistics

### Generating Statistics

**Total Counts:**

```bash
# Count archived streams
ls -1d .claude/streams/archive/*/ | wc -l

# Count total versions across all archives
find .claude/streams/archive -name "v*.yaml" | wc -l
```

**Average Statistics:**

```bash
# Average duration
grep "duration_days:" .claude/streams/archive/*/archive-metadata.yaml | \
  awk '{sum+=$2; count++} END {print "Average:", sum/count, "days"}'

# Average sessions per stream
grep "sessions:" .claude/streams/archive/*/archive-metadata.yaml | \
  awk '{sum+=$2; count++} END {print "Average:", sum/count, "sessions"}'
```

**Distribution Analysis:**

```bash
# Status distribution
echo "Completed:"
grep -c "final_status: completed" .claude/streams/archive/*/archive-metadata.yaml

echo "Paused:"
grep -c "final_status: paused" .claude/streams/archive/*/archive-metadata.yaml
```

### Statistics Report Template

```markdown
# Archive Statistics Report
Generated: 2025-11-03

## Summary

- Total Archived Streams: 15
- Total Versions: 127
- Total Development Hours: 560
- Total Sessions: 45

## By Status

- Completed: 12 (80 percent)
- Paused: 3 (20 percent)

## By Duration

- Short (under 7 days): 5 streams
- Medium (7-14 days): 7 streams
- Long (over 14 days): 3 streams

Average Duration: 12.5 days

## By Complexity

- Simple (under 5 goals): 3 streams
- Medium (5-10 goals): 8 streams
- Complex (over 10 goals): 4 streams

## Tag Distribution

- authentication: 5 streams
- refactoring: 4 streams
- feature: 8 streams
- bug-fix: 2 streams
- documentation: 3 streams

## Version Distribution

- Major versions: 32 (average 2.1 per stream)
- Minor versions: 78 (average 5.2 per stream)
- Patch versions: 17 (average 1.1 per stream)

## Session Analysis

- Average sessions per stream: 3
- Average checkpoints per session: 2.5
- Average updates per session: 5.2
```

---

## Best Practices

### Archiving Practices

**1. Archive Promptly**

Archive completed streams within 7 days:
- Keeps active directory clean
- Prevents confusion with active work
- Maintains clear separation

**2. Complete Documentation**

Ensure archive metadata includes:
- Clear archive reason
- Complete statistics
- Resume instructions (for paused streams)
- Related streams and dependencies

**3. Meaningful Tags**

Use consistent tagging system:
- Feature type (authentication, payment, etc.)
- Stream type (feature, bug-fix, refactoring, documentation)
- Technology (react, python, database, etc.)
- Priority (critical, high, medium, low)

**4. Version History Verification**

Before archiving, verify:
- All versions present in versions/ directory
- VERSION-LOG.md is complete
- Final version matches last checkpoint
- Git tags created for major versions

### Maintenance Practices

**1. Regular Index Updates**

Update archive/README.md:
- After each archive operation
- Weekly statistics refresh
- Monthly reorganization
- Quarterly comprehensive review

**2. Archive Integrity Checks**

Monthly verification:
```bash
# Check all archives have required files
for dir in .claude/streams/archive/*/; do
  [ -f "$dir/stream.yaml" ] || echo "Missing: $dir/stream.yaml"
  [ -f "$dir/archive-metadata.yaml" ] || echo "Missing: $dir/archive-metadata.yaml"
  [ -d "$dir/versions" ] || echo "Missing: $dir/versions/"
done
```

**3. Git Hygiene**

Maintain clean git history:
- Commit each archive operation separately
- Use descriptive commit messages
- Tag archived streams
- Never force-push archive commits

**4. Storage Management**

Monitor archive size:
```bash
# Archive directory size
du -sh .claude/streams/archive/

# Largest archives
du -sh .claude/streams/archive/*/ | sort -h | tail -5
```

### Usage Practices

**1. Search Before Creating**

Before starting new stream:
- Search archive for similar past work
- Extract lessons learned
- Reference successful approaches
- Avoid repeating mistakes

**2. Extract Reusable Patterns**

From archived streams:
- Checkpoint strategies that worked
- Goal structure templates
- Context organization patterns
- Decision documentation approaches

**3. Team Knowledge Sharing**

Use archives for:
- Onboarding new team members
- Project retrospectives
- Process improvement
- Best practice documentation

**4. Recovery Planning**

Know recovery procedures:
- Practice unarchive operations
- Document recovery steps
- Test git restoration
- Maintain recovery runbook

---

## Troubleshooting

### Common Issues

**Issue 1: Missing Archive Metadata**

**Symptoms**: Archive directory exists but archive-metadata.yaml missing

**Solution**:
```bash
# Create archive metadata from stream.yaml
nano .claude/streams/archive/stream-name/archive-metadata.yaml

# Use template from "Archive Operations" section above
# Fill in archived_date, reason, and statistics
```

**Issue 2: Incomplete Version History**

**Symptoms**: Versions missing from versions/ directory

**Solution**:
```bash
# Restore missing versions from git history
git log --oneline --all -- .claude/streams/stream-name/versions/

# Checkout missing versions
git show <commit>:path/to/version.yaml > versions/vX.Y.Z.yaml
```

**Issue 3: Archive Index Out of Sync**

**Symptoms**: README.md doesn't list all archived streams

**Solution**:
```bash
# List all archived streams
ls -1d .claude/streams/archive/*/ | xargs -n1 basename

# Compare with README.md entries
# Add missing entries using template
```

**Issue 4: Cannot Unarchive Stream**

**Symptoms**: Stream name conflicts with existing active stream

**Solution**:
```bash
# Option 1: Rename existing active stream
mv .claude/streams/stream-name .claude/streams/stream-name-new

# Option 2: Unarchive with different name
cp -r .claude/streams/archive/stream-name \
      .claude/streams/stream-name-resumed

# Update name in stream.yaml
```

**Issue 5: Archive Too Large**

**Symptoms**: Archive directory consuming significant disk space

**Solution**:
```bash
# Identify largest archives
du -sh .claude/streams/archive/*/ | sort -h | tail -10

# Review largest archives for:
# - Unnecessary large files
# - Duplicate versions
# - Binary files that shouldn't be tracked

# Consider git LFS for large files
git lfs track "*.bin"
```

**Issue 6: Lost Archive Statistics**

**Symptoms**: Missing statistics in archive-metadata.yaml

**Solution**:
```bash
# Recalculate from stream.yaml and versions
# Count versions
VERSIONS=$(ls -1 .claude/streams/archive/stream-name/versions/v*.yaml | wc -l)

# Extract other stats from stream.yaml
yq '.sessions | length' stream.yaml  # Session count
yq '.checkpoints | length' stream.yaml  # Checkpoint count
yq '.updates | length' stream.yaml  # Update count

# Update archive-metadata.yaml with calculated values
```

---

## Conclusion

### Quick Reference

**Archive a Stream:**
```bash
/stream-archive stream-name "reason"
```

**Unarchive a Stream:**
```bash
/stream-unarchive stream-name
```

**View Archive Index:**
```bash
cat .claude/streams/archive/README.md
```

**Search Archives:**
```bash
grep -r "search-term" .claude/streams/archive/
```

**View Stream Metadata:**
```bash
cat .claude/streams/archive/stream-name/archive-metadata.yaml
```

### Key Takeaways

**Archive Management Provides:**
- Clean active workspace
- Historical preservation
- Recovery capability
- Learning resource
- Audit trail

**Best Practices:**
- Archive completed streams promptly (within 7 days)
- Maintain complete archive metadata
- Update archive index regularly
- Use consistent tagging
- Verify version history before archiving
- Commit archive operations to git
- Test recovery procedures

**Regular Maintenance:**
- Weekly: Update archive index
- Monthly: Integrity checks and cleanup
- Quarterly: Comprehensive audit and reorganization

### Related Documentation

**Comprehensive Guides:**
- [Stream Versioning and Archiving System](./stream-versioning-and-archiving.md) - Complete specification
- [Work Streams Documentation Hub](./README.md) - All documentation index

**Implementation Plans:**
- [v1.3.0 Stream Archaeology Agent](./v1.3.0-stream-archaeology-agent.md) - Intelligent context management
- [v1.3.0 Automated Diagram Generation](./v1.3.0-automated-diagram-generation.md) - Visual documentation

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-03
**Author:** Work Streams Team
**Status:** Operational Guide - Ready for Immediate Use

**Note:** This guide is complementary to the Stream Versioning and Archiving System specification. Use both documents together for complete archive management understanding.