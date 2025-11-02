---
description: Manage and use stream templates with conversational template selection
allowed-tools: [bash, read, write]
---

# Stream Template

Manage and use stream templates for common development workflows.

**Usage:** `/project:stream-template [action] [arguments]`

**Aliases:** `/project:template`, `/project:tmpl`

**Actions:**
- `list` - List all available templates
- `show [name]` - View detailed template information
- `use [template-name] [stream-name]` - Create new stream from template
- No arguments - Interactive template browser

---

## How It Works

**Conversational Flow:**
1. I can list templates, show details, or help you start a stream
2. Run without arguments for interactive template browser
3. Each action: I display info → You make choices → I guide you through
4. Template selection is flexible (number, name, or description)

**Flexible Input:**
- By number: `1`, `2`, `3` (when browsing)
- By name: `feature-development`, `bug-fix`
- By category: `feature`, `bugfix`, `docs`

**Direct Actions:**
- List: `/stream-template list`
- Show: `/stream-template show feature-development`
- Use: `/stream-template use feature-development my-feature`

---

## Interactive Template Browser

When run without arguments:

```
/stream-template
```

I display:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TEMPLATE BROWSER                                   │
│                      Browse and select stream templates                      │
└─────────────────────────────────────────────────────────────────────────────┘

Available Stream Templates (6 total):

Built-in Templates (4):
  1. feature-development
     For developing new features with comprehensive tracking
     Goals: 8 | Checkpoints: 5 | Branch: feature/

  2. bug-fix
     Systematic bug fixing with root cause analysis
     Goals: 7 | Checkpoints: 4 | Branch: bugfix/

  3. refactoring
     Code improvement without behaviour changes
     Goals: 6 | Checkpoints: 4 | Branch: refactor/

  4. documentation
     Documentation creation and maintenance
     Goals: 5 | Checkpoints: 3 | Branch: docs/

Custom Templates (2):
  5. performance-optimization
     Custom template for performance work
     Goals: 8 | Checkpoints: 6 | Branch: perf/

  6. security-audit
     Custom template for security reviews
     Goals: 10 | Checkpoints: 5 | Branch: security/

────────────────────────────────────────────────────────────────────────────

What would you like to do?
  • Type number (1-6) to view template details
  • Type 'use [number/name]' to start stream from template
  • Type 'list' for simple list view
  • Type 'exit' to cancel

Your choice:
```

**Example interaction:**

You type: `1` or `feature-development`

I respond:
```
[Shows detailed template view - see "Show Template Details" section below]

Use this template? (yes/no/browse):
```

You type: `yes`

I ask:
```
What's the name for your new stream?
Template pattern: feature-[name]
Examples: feature-oauth2, feature-user-dashboard

Stream name:
```

You type: `oauth2-authentication`

I proceed with stream creation (see "Use Template" section below).

---

## Commands

### List Available Templates

```
/stream-template list
```

**Process:**
1. Scan `.claude/templates/` directory for YAML files
2. Scan `.claude/templates/custom/` for user-defined templates
3. Display template list with descriptions

**Output:**
```
Available Stream Templates

Built-in Templates:
  • feature-development - Developing new features with comprehensive tracking
  • bug-fix - Systematic bug fixing with root cause analysis
  • refactoring - Code improvement without behaviour changes
  • documentation - Documentation creation and maintenance

Custom Templates:
  • performance-optimization - Custom template for performance work
  • security-audit - Custom template for security reviews

Usage:
  /stream-template show [name]       - View template details
  /stream-template use [name] [stream-name] - Start stream from template
```

### Show Template Details

```
/stream-template show feature-development
```

**Process:**
1. Load template YAML file
2. Display comprehensive template information
3. Show stream naming convention, goals, checkpoints, tips

**Output:**
```
Template: feature-development
Description: Template for developing new features with comprehensive tracking and testing

Stream Naming:
  Pattern: feature-[name]
  Examples:
    - feature-oauth2-authentication
    - feature-user-dashboard
    - feature-payment-integration

Git Workflow:
  Branch Prefix: feature/
  Commit Conventions:
    - feat: Add [feature name]
    - feat: Implement [component]
    - test: Add tests for [feature]
    - docs: Document [feature]

Default Goals (8):
  - Define feature requirements and scope
  - Design feature architecture and API
  - Implement core functionality
  - Write unit tests
  - Write integration tests
  - Update documentation
  - Code review and refinement
  - User testing and feedback

Checkpoint Guidance (5):
  - After completing feature design and planning
  - After implementing core functionality
  - After writing tests
  - Before code review
  - After incorporating review feedback

Milestones:
  1. Design Complete - Feature requirements and architecture defined
  2. Core Implementation - Main functionality implemented
  3. Tests Complete - Unit and integration tests written and passing
  4. Documentation Complete - Feature documented with examples
  5. Code Review - Code reviewed and feedback addressed
  6. Ready for Merge - All checks passing, ready to merge

Tips:
  - Use /stream-checkpoint after each milestone
  - Commit frequently with clear, conventional messages
  - Update tests as you implement features
  - Document as you build, not after
  - Use /stream-context-check to monitor context usage
  - Create checkpoints before major refactoring

To use this template:
  /stream-template use feature-development my-feature-name
```

### Use Template to Start Stream

```
/stream-template use feature-development oauth2-authentication
```

**Process:**
1. Load specified template YAML file
2. Extract template configuration:
   - Stream naming pattern
   - Default goals
   - Initial context and next steps
   - Git branch prefix
   - Checkpoint guidance
3. Create stream directory with name following template pattern
4. Initialize stream metadata with template values
5. Suggest git branch name based on template prefix
6. Prompt to create branch
7. Set `.current-stream` marker
8. Display confirmation with template-specific guidance

**Stream Creation:**
- Stream name follows template pattern (e.g., `feature-oauth2-authentication`)
- Goals pre-populated from template
- Context includes template's decision points and next steps
- Git branch suggested with template prefix (e.g., `feature/oauth2-authentication`)

**Output:**
```
✓ Stream created from template: feature-development

Stream: feature-oauth2-authentication
Template: feature-development
Description: Developing new features with comprehensive tracking and testing

Git Branch:
  Current: development
  Suggested: feature/oauth2-authentication

Create this branch? (yes/no):
```

You respond: `yes`

```
✓ Branch created: feature/oauth2-authentication
✓ Stream initialized with template goals

Goals (8):
  - [ ] Define feature requirements and scope
  - [ ] Design feature architecture and API
  - [ ] Implement core functionality
  - [ ] Write unit tests
  - [ ] Write integration tests
  - [ ] Update documentation
  - [ ] Code review and refinement
  - [ ] User testing and feedback

Next Steps (from template):
  - Review existing codebase for integration points
  - Identify dependencies and libraries needed
  - Create feature branch
  - Set up test infrastructure

Template Guidance:
  Checkpoint after: Design, Implementation, Tests, Code Review
  Branch prefix: feature/
  Commit format: feat: Add [feature name]

Use /stream-status to view progress
Use /stream-checkpoint after each milestone
```

**Template Application:**

When creating a stream from template, the following are applied:

1. **Stream Naming**: Uses template pattern (feature-[name], fix-[issue], etc.)
2. **Goals**: Pre-populated from template's goals section
3. **Context**:
   - Decisions list from template with placeholders
   - Next steps from template
4. **Git Configuration**:
   - Branch prefix from template
   - Commit conventions noted in metadata
5. **Guidance**:
   - Checkpoint recommendations
   - File patterns for tracking
   - Tips and best practises

**Template Validation:**

Before creating stream:
- Verify template file exists
- Validate template YAML structure
- Check required fields: name, description, goals, git.branch_prefix
- Warn if template missing recommended sections

**Error Handling:**

### Template Not Found

```
✗ Template 'custom-workflow' not found

Available templates:
  1. feature-development
  2. bug-fix
  3. refactoring
  4. documentation

What would you like to do?
  • Type number (1-4) to select a template
  • Type 'list' to see all templates with descriptions
  • Type 'cancel' to exit

Your choice:
```

### Invalid Stream Name

```
✗ Invalid stream name format

Template 'feature-development' expects pattern: feature-[name]

Valid examples:
  • feature-oauth2-authentication
  • feature-user-dashboard
  • feature-payment-integration

Try again with a valid name, or:
  • Type 'browse' to choose different template
  • Type 'cancel' to exit

Stream name:
```

### Stream Already Exists

```
✗ Stream 'feature-oauth2-authentication' already exists

This stream was created 2 days ago and is currently active.

What would you like to do?
  1. Resume existing stream
  2. Switch to this stream (if not current)
  3. Choose a different name for new stream
  4. Cancel

Your choice:
```

You choose: `3`

```
Enter a different name for your stream:
Template pattern: feature-[name]

Stream name:
```

## Template File Format

Templates are YAML files in `.claude/templates/` or `.claude/templates/custom/`:

```yaml
name: template-name
description: Brief description

stream_naming:
  pattern: "prefix-[placeholder]"
  examples:
    - "example-stream-name"

goals:
  - [ ] Goal 1
  - [ ] Goal 2

context:
  decisions:
    - "Decision point: [to be defined]"
  next_steps:
    - "Initial step"

checkpoint_guidance:
  - "After milestone 1"

git:
  branch_prefix: prefix/
  commit_conventions:
    - "type: Description"

milestones:
  - name: "Milestone Name"
    description: "What it represents"

tips:
  - "Best practice 1"
```

## Integration with Other Commands

**Stream Start:**
- `/stream-start` can reference templates with `--template` flag
- Example: `/stream-start my-feature --template feature-development`

**Stream Status:**
- Shows which template was used (if any)
- Displays template-specific progress indicators

**Stream Checkpoint:**
- References template's checkpoint guidance
- Suggests next checkpoint based on template milestones

## Conversational Features

**Smart Template Selection:**
- Type number, name, or keywords to select template
- I understand partial matches: `feature`, `bug`, `doc`
- I suggest templates based on your stream name
- I guide you through template usage step by step

**Flexible Navigation:**
- Browse templates interactively
- View details before committing
- Switch between templates during selection
- Cancel anytime and return to normal conversation

**Error Recovery:**
- If template not found, I show alternatives
- If name invalid, I help you correct it
- If stream exists, I offer to resume or rename
- Every error has a conversational recovery path

**Integration:**
- Works with `/stream-start --template [name]`
- Templates appear in `/stream-dashboard` recommendations
- `/stream-status` shows which template was used
- `/stream-config` can set default template

---

## Best Practises

**For Template Selection:**
- Use interactive browser to explore: `/stream-template`
- View details before using: `/stream-template show [name]`
- Choose template matching your workflow type
- Follow template's stream naming pattern

**For Using Templates:**
- Leverage pre-defined goals as comprehensive checklist
- Follow template's checkpoint recommendations
- Use suggested git branch prefixes
- Adapt template to your specific needs (they're starting points)

**For Custom Templates:**
- Create templates for recurring workflows
- Store in `.claude/templates/custom/`
- Follow YAML format from built-in templates
- Test with `/stream-template show custom/[name]`

**For Team Workflows:**
- Share custom templates in repository
- Use consistent naming across team
- Document custom templates in team wiki
- Review templates regularly and improve

## Examples

**List all templates:**
```
/stream-template list
```

**View feature template details:**
```
/stream-template show feature-development
```

**Start feature stream from template:**
```
/stream-template use feature-development user-authentication
# Creates stream: feature-user-authentication
# Suggests branch: feature/user-authentication
```

**Start bug fix from template:**
```
/stream-template use bug-fix memory-leak
# Creates stream: fix-memory-leak
# Suggests branch: bugfix/memory-leak
```

**Start refactoring from template:**
```
/stream-template use refactoring database-layer
# Creates stream: refactor-database-layer
# Suggests branch: refactor/database-layer
```

**Start documentation from template:**
```
/stream-template use documentation api-reference
# Creates stream: docs-api-reference
# Suggests branch: docs/api-reference
```

**Use custom template:**
```
/stream-template use custom/performance-optimization query-speed
# Creates stream using custom template
# Follows custom template's naming and configuration
```

**Interactive browsing:**
```
/stream-template
# Opens interactive browser
# Shows all templates with details
# Guides you through selection and creation
```

**Direct from stream start:**
```
/stream-start my-feature --template feature-development
# Uses template during stream creation
# Same as: /stream-template use feature-development my-feature
```

---

## Tips

**For First-Time Users:**
- Start with interactive browser: `/stream-template`
- Browse all templates to understand options
- Read template details before selecting
- Use built-in templates first before creating custom

**For Quick Workflows:**
- Use direct actions: `/stream-template use [template] [name]`
- Memorize your favorite template names
- Set default template in config: `/stream-config set templates.default "feature-development"`

**For Custom Templates:**
- Copy built-in template as starting point
- Save to `.claude/templates/custom/[name].yaml`
- Test with `/stream-template show custom/[name]`
- Share with team by committing to repository

**For Team Collaboration:**
- Standardize on template names across team
- Create project-specific custom templates
- Document templates in team wiki or README
- Review and update templates regularly

**For Error-Free Usage:**
- Always view template details first: `/stream-template show [name]`
- Follow template naming pattern exactly
- Check if stream name already exists
- Use suggested branch names from template

---

## Common Workflows

**Exploring Templates:**
```
1. /stream-template
2. Browse templates interactively
3. Select template to view details
4. Decide to use or keep browsing
```

**Quick Stream Creation:**
```
1. /stream-template use feature-development my-feature
2. Confirm branch creation
3. Start working immediately
```

**Custom Template Development:**
```
1. Copy existing template: cp .claude/templates/feature-development.yaml .claude/templates/custom/my-workflow.yaml
2. Edit template with your goals and guidance
3. Test: /stream-template show custom/my-workflow
4. Use: /stream-template use custom/my-workflow test-stream
5. Refine based on usage
```

**Team Template Adoption:**
```
1. Clone repository with custom templates
2. Browse available templates: /stream-template list
3. View project-specific templates: /stream-template show custom/[name]
4. Use team template: /stream-template use custom/[name] [stream-name]
```
