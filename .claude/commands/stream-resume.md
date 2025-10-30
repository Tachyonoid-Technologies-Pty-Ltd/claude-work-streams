---
description: Resume a paused or previous work stream
---

# Stream Resume

Resume working on a paused work stream with full context restoration.

**Usage:** `/project:stream-resume [stream-name]`

**Process:**
1. Find specified stream in `.claude/streams/`
2. Read stream metadata and latest checkpoint
3. Display basic resume information:
   - Stream name and description
   - Previous session summary
   - Duration and checkpoint count
4. Create new session entry in stream metadata
5. Update `.claude/streams/.current-stream` to this stream
6. Mark stream as active
7. **Automatically generate and display smart context summary:**
   - Use `/stream-context-inject` to generate condensed context
   - Display last 2-3 checkpoints with key decisions
   - Show active files and remaining goals
   - Provide actionable next steps

**Smart Context Injection:**
After resuming the stream, automatically call the context injection system to provide
an intelligent, condensed summary optimized for quick context restoration. This gives
you both the administrative details (session info, timestamps) AND the development
context (what was built, decisions made, what's next) in a digestible format.

**Context restoration includes:**
- Recent progress (last 2-3 checkpoints)
- Key architectural decisions
- Active files with purposes
- Completed and pending goals
- Identified next steps

This integrated approach provides full context restoration so work can continue seamlessly.
