# Stream Orchestration Agent Design
## Architecture for AI-Driven Stream Management

**Document Purpose:** Technical architecture for stream orchestration agent.

**Version:** 1.0.0
**Date:** 2025-11-07

---

## Agent Architecture

```
Stream Orchestration Agent (Main Coordinator)
  │
  ├─> Stream Discovery Sub-Agent
  │   - Reads all .yaml files in .claude/streams/
  │   - Builds stream inventory
  │
  ├─> Pattern Detection Sub-Agent
  │   - Analyzes text for relationships
  │   - Detects keywords: "blocking", "depends", stream names
  │   - Confidence scoring (95%, 80%, 60%)
  │
  ├─> Dependency Graph Sub-Agent
  │   - Builds relationship graph from detections
  │   - Identifies blocking chains
  │   - Calculates critical paths
  │
  ├─> Context Analysis Sub-Agent
  │   - Calculates gap duration since last activity
  │   - Determines context injection needs
  │   - Recommends compression level
  │
  └─> Recommendation Engine Sub-Agent
      - Prioritizes actions (unblock, complete, resume)
      - Generates actionable recommendations
      - Explains reasoning
```

---

## State Persistence

```yaml
# .claude/streams/.orchestration-state.yaml
version: 1.0.0
last_analysis: 2025-11-07T10:00:00Z

streams_analyzed:
  hera-portal-stateless-evaluation:
    status: active
    last_activity: 2025-11-06T20:09:00Z
    relationships:
      depends_on: [backend-stateless-evaluation-api]

relationships_detected:
  - from: hera-portal-stateless-evaluation
    to: backend-stateless-evaluation-api
    type: depends-on
    confidence: 95%

recommendations:
  - priority: high
    action: switch_to_backend
    reason: "Frontend blocked by backend bugs"
```

---

## Trigger Points

**Auto-Triggered:**
1. `/stream-checkpoint` → Check for relationship mentions
2. `/stream-update` → Detect blocking keywords
3. `/stream-switch` → Provide recommendations
4. `/stream-pause` → Suggest related work

**Manual Trigger:**
```bash
/stream-orchestrate
```

---

## Pattern Detection

**Text Patterns:**
```
"Resume backend-stateless-evaluation-api stream"
  → Detected: depends-on relationship (95% confidence)

"BLOCKING ISSUES (Backend ProcessManagerAPI)"
  → Detected: blocking relationship (80% confidence)

Same feature name + different repos
  → Detected: related-to (60% confidence)
```

---

## Context Injection Strategy

**Gap-Based Adaptive Context:**
```
Gap < 4 hours:  2000 tokens (last 2 checkpoints)
Gap 4-24 hours: 3000 tokens (last 5 checkpoints + blocking)
Gap > 24 hours: 4000 tokens (all sessions + full context)
```

---

**Related:**
- [Stream Relationships Schema](./stream-relationships-schema.md)
- [AI Orchestration Feasibility](../research/ai-orchestration-feasibility.md)
