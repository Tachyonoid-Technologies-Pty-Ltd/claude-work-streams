---
description: Complete a work stream with comprehensive summary
---

# Stream End

End the current work stream with a comprehensive summary of work accomplished.

**Usage:** `/project:stream-end`

**Process:**
1. Find active stream from `.claude/streams/.current-stream`
2. Review entire stream history:
   - All sessions
   - All checkpoints
   - Modified files
   - Decisions made
3. Generate comprehensive summary:
   - Work accomplished
   - Goals achieved
   - Key decisions
   - Files modified
   - Total duration
   - Session count
4. Mark stream as completed
5. Clear `.current-stream`

**Summary format:**
```
Work Stream Summary: [name]
Duration: [total time]
Sessions: [count]
Checkpoints: [count]

Accomplished:
  ✓ [major accomplishment 1]
  ✓ [major accomplishment 2]

Goals Achieved:
  ✓ [goal 1]
  ✓ [goal 2]

Key Decisions:
  - [decision 1]
  - [decision 2]

Files Modified:
  - [file list with brief descriptions]

Next Steps (if any):
  - [future work identified]

Total Context: [summary for future reference]
```

Suggest creating a new stream if more work is needed on related features.
