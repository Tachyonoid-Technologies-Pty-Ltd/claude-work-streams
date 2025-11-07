# Stream Relationships Schema
## Data Model for Inter-Stream Dependencies

**Document Purpose:** Define YAML schema for stream relationship tracking.

**Version:** 1.0.0
**Date:** 2025-11-07

---

## Schema Definition

### relationships Field

```yaml
relationships:
  - stream: backend-stateless-evaluation-api
    type: depends-on | blocks | related-to
    status: blocking | resolved | informational
    since: 2025-11-04T12:00:00Z
    reason: "Requires GridSumLessThan bug fix"
    blocked_goals: [16, 17, 18]
    confidence: 95  # Auto-detected confidence (0-100)
    evidence:
      - "Explicit mention in paused_reason"
      - "Keyword: BLOCKING ISSUES"
```

### blocking Field

```yaml
blocking:
  is_blocked: true
  blocked_by:
    - stream: backend-stateless-evaluation-api
      issue: "GridSumLessThan bug (Line 396)"
      since: 2025-11-04T12:00:00Z
      resolved: false
  blocks_streams: []
```

---

## Relationship Types

**depends-on:** This stream needs other stream to complete
**blocks:** This stream prevents other stream progress
**related-to:** Informational relationship only

---

## Detection Patterns

### Auto-Detection Rules

**95% Confidence:**
- Exact stream name mentioned in update/checkpoint/paused_reason

**80% Confidence:**
- Keywords + same feature name: "blocking", "depends", "waiting for"

**60% Confidence:**
- Git branch name similarity
- Same template type + related description

---

**Related:** 
- [Stream Orchestration Agent Design](./stream-orchestration-agent-design.md)
- [Real-World Workflow Analysis](../analysis/real-world-workflow-analysis.md)
