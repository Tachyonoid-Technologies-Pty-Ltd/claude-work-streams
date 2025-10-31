---
description: Check current context usage and get recommendations
---

# Stream Context Check

Check the current context window usage and receive recommendations for session management.

**Usage:** `/project:stream-context-check`

**Context Window Reality:**
- Total capacity: 200,000 tokens
- System overhead: ~36,000 tokens (system prompt, tools, output buffer)
- Effective usable space: ~164,000 tokens
- Auto-compact trigger: ~155,000 tokens (95% of usable space)

**Process:**
1. Analyze current conversation length
2. Calculate percentage of effective usable space (164k tokens)
3. Provide recommendations based on usage:
   - <75%: Healthy - Continue working normally
   - 75-85%: Monitor - Start planning checkpoint soon
   - 85-90%: Warning - Create checkpoint NOW and prepare transition
   - 90-95%: Critical - Checkpoint IMMEDIATELY (auto-compact imminent)

**Output format:**
```
Context Window Usage Report

Total Capacity: 200,000 tokens
Effective Usable: 164,000 tokens (after system overhead)
Current Usage: [X] tokens ([Y]% of usable space)
Status: [Healthy/Monitor/Warning/Critical]

Recommendation:
[Action items based on current usage]

Current Stream: [stream-name]
Checkpoints: [count]
Last Checkpoint: [time ago]

Thresholds:
- Healthy: <75% (< 123k tokens)
- Monitor: 75-85% (123k-139k tokens)
- Warning: 85-90% (139k-148k tokens)
- Critical: 90-95% (148k-156k tokens)
- Auto-compact: ~95% (~155k tokens)
```

**Recommendations by Status:**

**Healthy (<75%)**:
- Continue working normally
- No immediate action needed
- Monitor periodically

**Monitor (75-85%)**:
- Start planning checkpoint soon
- Finish current task before creating checkpoint
- Consider wrapping up current work unit

**Warning (85-90%)**:
- Create checkpoint NOW with /stream-checkpoint
- Prepare for context transition
- Consider ending stream and resuming later

**Critical (90-95%)**:
- IMMEDIATE ACTION REQUIRED
- Create checkpoint with /stream-checkpoint
- End stream with /stream-end
- Resume in new session with /stream-resume
- Auto-compact will trigger soon (~155k tokens)
