---
description: Generate and inject smart context summary from stream history
---

# Stream Context Inject

Generate an intelligent context summary from stream history and inject it into the conversation.

**Usage:** `/project:stream-context-inject [stream-name]`

**Process:**
1. Read stream metadata from specified stream
2. Analyze stream history:
   - Last 2-3 checkpoints (most recent work)
   - Key decisions made
   - Modified files (focus on recently changed)
   - Current goals and status
3. Generate condensed context summary (aim for <2000 tokens)
4. Format as clear, structured prompt
5. Display for review
6. Optionally inject into conversation

**Context Summary Structure:**
```
WORK STREAM CONTEXT: [stream-name]

RECENT PROGRESS:
- [Last 2-3 checkpoint summaries, most recent first]

KEY DECISIONS:
- [Important architectural/technical decisions]

ACTIVE FILES:
- [List of files being modified, with brief purpose]

CURRENT GOALS:
□ [Remaining goals]
✓ [Completed goals - brief mention]

NEXT STEPS:
- [What was planned next]
```

**Smart Context Selection:**
- Prioritize recent activity (last 2-3 checkpoints)
- Include critical decisions regardless of age
- Limit file list to actively modified files
- Keep goal list concise
- Total context should be digestible (< 2000 tokens)

After generation, ask user if they want to inject into conversation.
