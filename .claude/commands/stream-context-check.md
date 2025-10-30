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
   - <60%: All good, continue working
   - 60-79%: Consider checkpoint soon
   - 80-89%: Checkpoint recommended, plan transition
   - 90-94%: Create checkpoint now, prepare for transition
   - 95%+: Critical - checkpoint and transition immediately

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
