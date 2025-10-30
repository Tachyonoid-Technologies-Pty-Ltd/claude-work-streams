# Stream Template

Manage and use stream templates for common development workflows.

**Usage:** `/project:stream-template [action] [arguments]`

**Actions:**
- `list` - List all available templates
- `show [name]` - View detailed template information
- `use [template-name] [stream-name]` - Create new stream from template

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
  Create branch? (y/n): y

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

```
# Template not found
✗ Template 'custom-workflow' not found

  Available templates:
    - feature-development
    - bug-fix
    - refactoring
    - documentation

  Use /stream-template list to see all available templates

# Invalid stream name
✗ Invalid stream name format

  Template 'feature-development' expects pattern: feature-[name]
  Example: feature-oauth2-authentication

  Please provide a stream name matching the template pattern

# Stream already exists
✗ Stream 'feature-oauth2-authentication' already exists

  Use /stream-resume to continue existing stream
  Or choose a different stream name
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

## Best Practises

1. **Choose Appropriate Template**: Select template matching your workflow type
2. **Follow Naming Conventions**: Use template's stream naming pattern
3. **Leverage Pre-defined Goals**: Template goals provide comprehensive checklist
4. **Use Checkpoint Guidance**: Follow template's checkpoint recommendations
5. **Adapt as Needed**: Templates are starting points; adapt to your specific needs
6. **Create Custom Templates**: Define your own templates for recurring workflows

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
