# API Documentation

Programmatic API for Claude Work Streams v1.2.0.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Initialization](#initialization)
  - [Stream Management](#stream-management)
  - [Template Management](#template-management)
  - [Configuration](#configuration)
- [TypeScript Support](#typescript-support)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)

---

## Installation

```bash
npm install @tachyonoid/work-streams
```

---

## Quick Start

```javascript
const streams = require('@tachyonoid/work-streams');

// Check if initialized
if (!streams.isInitialized()) {
  console.log('Work streams not initialized');
  process.exit(1);
}

// Get current active stream
const current = streams.getCurrentStream();
console.log('Current stream:', current.name);

// List all streams
const allStreams = streams.listStreams();
console.log(`Found ${allStreams.length} streams`);

// Get available templates
const templates = streams.listTemplates();
console.log('Available templates:', templates.map(t => t.name));
```

---

## API Reference

### Initialization

#### `isInitialized(options)`

Check if work streams is initialized in the current project.

**Parameters:**
- `options` (Object, optional)
  - `global` (Boolean): Check global installation instead of project. Default: `false`

**Returns:** `Boolean` - `true` if initialized, `false` otherwise

**Example:**
```javascript
const streams = require('@tachyonoid/work-streams');

// Check project installation
if (streams.isInitialized()) {
  console.log('Work streams is initialized');
}

// Check global installation
if (streams.isInitialized({ global: true })) {
  console.log('Global work streams is initialized');
}
```

---

#### `getClaudeDir(options)`

Get the path to the .claude directory.

**Parameters:**
- `options` (Object, optional)
  - `global` (Boolean): Get global directory instead of project. Default: `false`

**Returns:** `String` - Absolute path to .claude directory

**Example:**
```javascript
const streams = require('@tachyonoid/work-streams');

// Project .claude directory
const projectDir = streams.getClaudeDir();
// Returns: /path/to/project/.claude

// Global .claude directory
const globalDir = streams.getClaudeDir({ global: true });
// Returns: /home/user/.claude or C:\Users\user\.claude
```

---

### Stream Management

#### `getCurrentStream(options)`

Get the currently active stream.

**Parameters:**
- `options` (Object, optional)
  - `global` (Boolean): Use global streams directory. Default: `false`

**Returns:** `Object|null` - Stream object or `null` if no active stream

**Stream Object Structure:**
```javascript
{
  name: "stream-name",
  description: "Stream description",
  status: "active",  // "active", "paused", "completed"
  created: "2025-10-31T18:00:00Z",
  updated: "2025-10-31T20:00:00Z",
  template: "feature-development",
  git: {
    branch: "feature/stream-name",
    created_branch: true,
    base_branch: "main"
  },
  sessions: [
    {
      id: "session-1",
      started: "2025-10-31T18:00:00Z",
      status: "active"
    }
  ],
  goals: [
    "[x] Completed goal",
    "[ ] Pending goal"
  ],
  context: {
    files: ["file1.js", "file2.js"],
    decisions: ["Decision 1", "Decision 2"],
    next_steps: ["Step 1", "Step 2"]
  },
  updates: [
    {
      timestamp: "2025-10-31T18:30:00Z",
      session_id: "session-1",
      note: "Progress update"
    }
  ],
  checkpoints: [
    {
      timestamp: "2025-10-31T19:00:00Z",
      session_id: "session-1",
      description: "Checkpoint description",
      git: { /* git state */ },
      files_modified: ["file1.js"],
      summary: "Detailed summary"
    }
  ]
}
```

**Example:**
```javascript
const streams = require('@tachyonoid/work-streams');

const current = streams.getCurrentStream();

if (current) {
  console.log(`Active stream: ${current.name}`);
  console.log(`Status: ${current.status}`);
  console.log(`Goals: ${current.goals.length}`);
  console.log(`Checkpoints: ${current.checkpoints.length}`);
} else {
  console.log('No active stream');
}
```

---

#### `getStream(streamName, options)`

Get a specific stream by name.

**Parameters:**
- `streamName` (String): Name of the stream
- `options` (Object, optional)
  - `global` (Boolean): Use global streams directory. Default: `false`

**Returns:** `Object|null` - Stream object or `null` if not found

**Example:**
```javascript
const streams = require('@tachyonoid/work-streams');

const stream = streams.getStream('my-feature');

if (stream) {
  console.log('Found stream:', stream.name);
  console.log('Created:', stream.created);
  console.log('Template:', stream.template);
} else {
  console.log('Stream not found');
}
```

---

#### `listStreams(options)`

Get all streams.

**Parameters:**
- `options` (Object, optional)
  - `global` (Boolean): Use global streams directory. Default: `false`

**Returns:** `Array<Object>` - Array of stream objects

**Example:**
```javascript
const streams = require('@tachyonoid/work-streams');

const allStreams = streams.listStreams();

console.log(`Total streams: ${allStreams.length}`);

// Filter by status
const active = allStreams.filter(s => s.status === 'active');
const completed = allStreams.filter(s => s.status === 'completed');

console.log(`Active: ${active.length}`);
console.log(`Completed: ${completed.length}`);

// Sort by date
allStreams.sort((a, b) => new Date(b.updated) - new Date(a.updated));

// Display
allStreams.forEach(stream => {
  console.log(`- ${stream.name} (${stream.status})`);
});
```

---

### Template Management

#### `listTemplates(options)`

Get all available templates.

**Parameters:**
- `options` (Object, optional)
  - `global` (Boolean): Use global templates directory. Default: `false`

**Returns:** `Array<Object>` - Array of template objects

**Template Object Structure:**
```javascript
{
  name: "feature-development",
  type: "feature",
  description: "Comprehensive feature development workflow",
  goals: [
    "Design feature architecture",
    "Implement core functionality",
    // ...
  ],
  context: {
    decision_points: ["Key decisions to track"],
    next_steps: ["Suggested next steps"]
  },
  checkpoints: {
    guidance: ["Recommended checkpoint moments"]
  },
  git: {
    suggested_branch: "feature/[name]"
  },
  tips: ["Best practices and tips"]
}
```

**Example:**
```javascript
const streams = require('@tachyonoid/work-streams');

const templates = streams.listTemplates();

console.log('Available templates:');
templates.forEach(template => {
  console.log(`\n${template.name}`);
  console.log(`  Type: ${template.type}`);
  console.log(`  Description: ${template.description}`);
  console.log(`  Goals: ${template.goals.length}`);
});
```

---

#### `getTemplate(templateName, options)`

Get a specific template by name.

**Parameters:**
- `templateName` (String): Name of the template
- `options` (Object, optional)
  - `global` (Boolean): Use global templates directory. Default: `false`

**Returns:** `Object|null` - Template object or `null` if not found

**Example:**
```javascript
const streams = require('@tachyonoid/work-streams');

const template = streams.getTemplate('feature-development');

if (template) {
  console.log('Template:', template.name);
  console.log('Goals:');
  template.goals.forEach((goal, i) => {
    console.log(`  ${i + 1}. ${goal}`);
  });
} else {
  console.log('Template not found');
}
```

---

### Configuration

Configuration is managed via `.claude-streams.config.yaml` in the project root.

For programmatic configuration management, use the CLI commands or directly read/write the YAML file:

```javascript
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// Read configuration
function getConfig() {
  const configPath = path.join(process.cwd(), '.claude-streams.config.yaml');
  if (!fs.existsSync(configPath)) {
    return null;
  }
  const content = fs.readFileSync(configPath, 'utf8');
  return yaml.load(content);
}

// Write configuration
function setConfig(config) {
  const configPath = path.join(process.cwd(), '.claude-streams.config.yaml');
  const content = yaml.dump(config);
  fs.writeFileSync(configPath, content, 'utf8');
}

// Usage
const config = getConfig();
console.log('Context thresholds:', config.context.thresholds);

config.context.thresholds.warning = 92;
setConfig(config);
```

---

## TypeScript Support

Type definitions are included in the package.

```typescript
import * as streams from '@tachyonoid/work-streams';

interface StreamOptions {
  global?: boolean;
}

interface Stream {
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  created: string;
  updated: string;
  template?: string;
  git?: {
    branch: string;
    created_branch: boolean;
    base_branch: string;
  };
  sessions: Array<{
    id: string;
    started: string;
    status: string;
  }>;
  goals: string[];
  context: {
    files: string[];
    decisions: string[];
    next_steps: string[];
  };
  updates: Array<{
    timestamp: string;
    session_id: string;
    note: string;
  }>;
  checkpoints: Array<any>;
}

// Usage
const current: Stream | null = streams.getCurrentStream();
const allStreams: Stream[] = streams.listStreams();
```

---

## Error Handling

All functions return `null` for "not found" scenarios rather than throwing errors.

```javascript
const streams = require('@tachyonoid/work-streams');

// Safe usage
const current = streams.getCurrentStream();
if (!current) {
  console.log('No active stream');
  process.exit(0);
}

const stream = streams.getStream('non-existent');
if (!stream) {
  console.error('Stream not found');
  process.exit(1);
}

// Filesystem errors will throw
try {
  const allStreams = streams.listStreams();
} catch (error) {
  console.error('Error reading streams:', error.message);
  process.exit(1);
}
```

---

## Advanced Usage

### Dashboard Script

Create a custom dashboard:

```javascript
#!/usr/bin/env node
const streams = require('@tachyonoid/work-streams');

function displayDashboard() {
  const current = streams.getCurrentStream();
  const allStreams = streams.listStreams();

  console.log('='.repeat(60));
  console.log('WORK STREAMS DASHBOARD');
  console.log('='.repeat(60));

  if (current) {
    console.log(`\nActive Stream: ${current.name}`);
    console.log(`Status: ${current.status}`);
    console.log(`Template: ${current.template || 'none'}`);
    console.log(`Goals: ${current.goals.filter(g => g.startsWith('[x]')).length}/${current.goals.length} completed`);
    console.log(`Checkpoints: ${current.checkpoints.length}`);
  } else {
    console.log('\nNo active stream');
  }

  console.log(`\nAll Streams (${allStreams.length}):`);
  const active = allStreams.filter(s => s.status === 'active');
  const paused = allStreams.filter(s => s.status === 'paused');
  const completed = allStreams.filter(s => s.status === 'completed');

  console.log(`  Active: ${active.length}`);
  console.log(`  Paused: ${paused.length}`);
  console.log(`  Completed: ${completed.length}`);

  console.log('='.repeat(60));
}

displayDashboard();
```

### Stream Analytics

Analyze stream metrics:

```javascript
const streams = require('@tachyonoid/work-streams');

function analyzeStreams() {
  const allStreams = streams.listStreams();

  const stats = {
    total: allStreams.length,
    byStatus: {
      active: 0,
      paused: 0,
      completed: 0
    },
    byTemplate: {},
    avgCheckpoints: 0,
    avgGoals: 0,
    totalCheckpoints: 0,
    totalGoals: 0
  };

  allStreams.forEach(stream => {
    // Status count
    stats.byStatus[stream.status]++;

    // Template count
    const template = stream.template || 'none';
    stats.byTemplate[template] = (stats.byTemplate[template] || 0) + 1;

    // Checkpoints
    stats.totalCheckpoints += stream.checkpoints.length;

    // Goals
    stats.totalGoals += stream.goals.length;
  });

  stats.avgCheckpoints = (stats.totalCheckpoints / allStreams.length).toFixed(1);
  stats.avgGoals = (stats.totalGoals / allStreams.length).toFixed(1);

  return stats;
}

// Usage
const stats = analyzeStreams();
console.log('Stream Analytics:');
console.log(JSON.stringify(stats, null, 2));
```

### CI/CD Integration

Check stream status in CI/CD:

```javascript
#!/usr/bin/env node
const streams = require('@tachyonoid/work-streams');

function checkStreamHealth() {
  const current = streams.getCurrentStream();

  if (!current) {
    console.log('No active stream - OK for CI');
    process.exit(0);
  }

  // Warn if stream has uncommitted work
  if (current.status === 'active') {
    console.warn('Warning: Active stream detected in CI');
    console.warn(`Stream: ${current.name}`);
    console.warn('Consider ending stream before CI run');
    process.exit(1);
  }

  process.exit(0);
}

checkStreamHealth();
```

### Template Validator

Validate custom templates:

```javascript
const streams = require('@tachyonoid/work-streams');
const fs = require('fs');
const yaml = require('js-yaml');

function validateTemplate(templatePath) {
  const content = fs.readFileSync(templatePath, 'utf8');
  const template = yaml.load(content);

  const errors = [];

  // Required fields
  if (!template.type) errors.push('Missing: type');
  if (!template.description) errors.push('Missing: description');
  if (!template.goals || !Array.isArray(template.goals)) {
    errors.push('Missing or invalid: goals');
  }

  // Validate structure
  if (template.goals && template.goals.length === 0) {
    errors.push('goals array is empty');
  }

  if (errors.length > 0) {
    console.error('Template validation failed:');
    errors.forEach(err => console.error(`  - ${err}`));
    return false;
  }

  console.log('Template is valid');
  return true;
}

// Usage
validateTemplate('.claude/templates/custom/my-template.yaml');
```

---

## Examples

### Example 1: List All Streams

```javascript
const streams = require('@tachyonoid/work-streams');

const allStreams = streams.listStreams();

console.log(`Total streams: ${allStreams.length}\n`);

allStreams.forEach(stream => {
  const status = stream.status.toUpperCase();
  const checkpoints = stream.checkpoints.length;
  const completedGoals = stream.goals.filter(g => g.startsWith('[x]')).length;
  const totalGoals = stream.goals.length;

  console.log(`${stream.name}`);
  console.log(`  Status: ${status}`);
  console.log(`  Goals: ${completedGoals}/${totalGoals}`);
  console.log(`  Checkpoints: ${checkpoints}`);
  console.log(`  Updated: ${stream.updated}`);
  console.log();
});
```

### Example 2: Find Streams by Template

```javascript
const streams = require('@tachyonoid/work-streams');

function findByTemplate(templateName) {
  const allStreams = streams.listStreams();
  return allStreams.filter(s => s.template === templateName);
}

const featureStreams = findByTemplate('feature-development');
console.log(`Feature streams: ${featureStreams.length}`);

featureStreams.forEach(stream => {
  console.log(`  - ${stream.name} (${stream.status})`);
});
```

### Example 3: Export Stream Data

```javascript
const streams = require('@tachyonoid/work-streams');
const fs = require('fs');

function exportStreamData(streamName, outputFile) {
  const stream = streams.getStream(streamName);

  if (!stream) {
    console.error(`Stream not found: ${streamName}`);
    return;
  }

  const data = {
    name: stream.name,
    description: stream.description,
    status: stream.status,
    created: stream.created,
    updated: stream.updated,
    template: stream.template,
    goals: stream.goals,
    checkpoints: stream.checkpoints.map(cp => ({
      timestamp: cp.timestamp,
      description: cp.description
    })),
    updates: stream.updates
  };

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Exported to ${outputFile}`);
}

exportStreamData('my-stream', './stream-export.json');
```

### Example 4: Stream Progress Report

```javascript
const streams = require('@tachyonoid/work-streams');

function generateReport(streamName) {
  const stream = streams.getStream(streamName);

  if (!stream) {
    console.error('Stream not found');
    return;
  }

  const completed = stream.goals.filter(g => g.startsWith('[x]')).length;
  const total = stream.goals.length;
  const progress = ((completed / total) * 100).toFixed(1);

  console.log(`Stream: ${stream.name}`);
  console.log(`Progress: ${progress}% (${completed}/${total} goals)`);
  console.log(`Checkpoints: ${stream.checkpoints.length}`);
  console.log(`Updates: ${stream.updates.length}`);
  console.log(`Files: ${stream.context.files.length}`);

  console.log('\nRecent Activity:');
  const recent = stream.updates.slice(-5).reverse();
  recent.forEach(update => {
    console.log(`  ${update.timestamp}: ${update.note}`);
  });
}

generateReport('my-stream');
```

---

## See Also

- [INSTALLATION.md](./INSTALLATION.md) - Installation instructions
- [EXAMPLES.md](./EXAMPLES.md) - Real-world usage scenarios
- [README.md](./README.md) - Overview and quick start
- [CHANGELOG.md](./CHANGELOG.md) - Version history

---

**Questions or Issues?**

- GitHub Issues: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/issues)
- Documentation: [https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams](https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams)
