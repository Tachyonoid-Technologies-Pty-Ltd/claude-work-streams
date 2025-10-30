# Custom Templates

This directory is for your custom work stream templates.

## Creating Custom Templates

You can create custom templates to match your specific workflows. Templates are YAML files that define goals, checkpoints, and best practices for different types of work.

### Template Structure

```yaml
# Template metadata
name: my-custom-template
description: Brief description of when to use this template

# Goals template - common objectives
goals:
  - [ ] First goal
  - [ ] Second goal
  - [ ] Third goal

# Context template - tracking needs
context:
  decisions:
    - "Decision point 1: [to be defined]"
    - "Decision point 2: [to be defined]"

  next_steps:
    - "Initial step 1"
    - "Initial step 2"

# Checkpoint recommendations
checkpoint_guidance:
  - "After completing major milestone 1"
  - "After completing major milestone 2"

# Git workflow
git:
  branch_prefix: custom/
  commit_conventions:
    - "type: Description format"

# File tracking patterns
file_patterns:
  - "path/to/files/**/*"

# Milestones
milestones:
  - name: "Milestone 1"
    description: "What this milestone represents"
  - name: "Milestone 2"
    description: "What this milestone represents"

# Tips
tips:
  - "Best practice 1"
  - "Best practice 2"
```

### Example: Performance Optimization Template

```yaml
name: performance-optimization
description: Template for systematic performance improvement

goals:
  - [ ] Profile application to identify bottlenecks
  - [ ] Set performance targets
  - [ ] Implement optimizations
  - [ ] Benchmark improvements
  - [ ] Verify no regressions

git:
  branch_prefix: perf/
  commit_conventions:
    - "perf: Optimize [component]"
    - "perf: Reduce [metric] by [amount]"

checkpoint_guidance:
  - "After profiling and identifying bottlenecks"
  - "After implementing each optimization"
  - "After benchmarking results"

tips:
  - "Always profile before optimizing"
  - "Set measurable performance targets"
  - "Optimize the biggest bottleneck first"
  - "Benchmark after each change"
```

## Using Custom Templates

Once you create a custom template, you can reference it when starting a stream:

```bash
/stream-start my-feature --template custom/my-custom-template
```

Or if using the built-in templates:

```bash
/stream-start my-feature --template feature-development
/stream-start fix-bug --template bug-fix
/stream-start code-cleanup --template refactoring
/stream-start update-docs --template documentation
```

## Template Naming

- Use kebab-case for template names
- Use descriptive names that indicate the workflow
- Place custom templates in this directory
- Built-in templates are in the parent `.claude/templates/` directory

## Tips

- Start with a built-in template and customize it
- Keep templates focused on specific workflow types
- Include clear guidance on when to use checkpoints
- Define realistic goals and milestones
- Add tips based on your team's best practices
