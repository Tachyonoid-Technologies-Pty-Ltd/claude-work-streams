---
description: Check current context usage and get recommendations
---

# Stream Context Check

Check the current context window usage and receive recommendations for session management.

**Usage:** `/project:stream-context-check`

**Process:**
1. Analyze current conversation length
2. Estimate context usage percentage
3. Provide recommendations based on usage:
   - <90%: Healthy ✓ - Continue working normally
   - 90-94%: Monitor ⚠ - Start planning checkpoint soon
   - 95-97%: Warning ⚠⚠ - Create checkpoint NOW and prepare transition
   - 98%+: Critical 🚨 - Checkpoint and transition IMMEDIATELY

**Output format:**
```
Context Status: [percentage]% used
Status: [Healthy/Monitor/Warning/Critical]

Recommendation:
[Action items based on current usage]

Current Stream: [stream-name]
Checkpoints: [count]
Last Checkpoint: [time ago]
```

Include suggestions:
- When to checkpoint
- How to transition smoothly
- Commands to use next
