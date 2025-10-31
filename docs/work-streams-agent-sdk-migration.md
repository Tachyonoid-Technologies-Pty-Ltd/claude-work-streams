# WORK STREAMS Plugin: Claude Agent SDK Migration & Redesign Guide

**Document Purpose:** Comprehensive specification for migrating and enhancing the WORK STREAMS plugin to leverage the Claude Agent SDK's new capabilities for improved isolation, context management, and multi-stream orchestration.

**Target Audience:** Claude Code CLI for implementation execution

**Version:** 2.0.0 (Agent SDK Migration)

---

## Executive Summary

### Why This Migration Matters

The Claude Agent SDK migration unlocks **enterprise-grade capabilities** for the WORK STREAMS plugin:

1. **Perfect Isolation:** Each work stream operates in its own isolated context with zero cross-contamination
2. **Programmatic Control:** Full control over system prompts, settings, and agent behavior per stream
3. **Multi-Tenant Architecture:** Support for multiple concurrent streams without interference
4. **Predictable Behavior:** No dependency on filesystem configurations unless explicitly enabled
5. **Advanced Orchestration:** Build specialized agent behaviors for different stream types

### Business Value

- **Developers** can work on multiple features simultaneously with guaranteed context separation
- **Teams** can share stream configurations without worrying about local settings interference
- **CI/CD** pipelines can use streams predictably without environment-specific behavior
- **Plugin** becomes a foundation for advanced agentic workflows beyond basic context management

---

## Part 1: Benefits Analysis

### Benefit 1: Context Isolation & Predictability

**Problem Solved:**
Previously, Claude Code SDK would automatically load settings from multiple filesystem sources (CLAUDE.md, settings.json, slash commands), causing:
- Unpredictable behavior when switching between streams
- Settings from one stream affecting another
- CI/CD inconsistencies
- Multi-user conflicts

**Agent SDK Solution:**
```typescript
// Before (v0.0.x) - Unpredictable context loading
const result = query({ prompt: "Hello" });
// Would automatically load:
// - ~/.claude/settings.json
// - .claude/settings.json
// - CLAUDE.md files
// - Custom slash commands from all sources

// After (v0.1.0) - Explicit, predictable control
const result = query({
  prompt: "Hello",
  options: {
    systemPrompt: streamContext.customPrompt,
    settingSources: [] // Only what we explicitly want
  }
});
```

**Impact on WORK STREAMS:**
- ✅ Each stream has guaranteed isolated context
- ✅ `/stream-switch` operations are clean and predictable
- ✅ No risk of stream A's settings affecting stream B
- ✅ CI/CD deployments work consistently

### Benefit 2: Custom System Prompts Per Stream

**Problem Solved:**
All Claude Code SDK operations used the same system prompt, making it impossible to optimize agent behavior for different work stream types.

**Agent SDK Solution:**
```typescript
// Feature stream: Focus on implementation
const featureStream = query({
  prompt: userMessage,
  options: {
    systemPrompt: `
      WORK STREAM: ${streamName}
      TYPE: Feature Implementation
      
      FOCUS AREAS:
      - Test-driven development
      - Clean architecture patterns
      - Comprehensive documentation
      
      COMPLETED:
      ${completedMilestones}
      
      CURRENT OBJECTIVE:
      ${currentObjective}
    `
  }
});

// Bugfix stream: Focus on debugging
const bugfixStream = query({
  prompt: userMessage,
  options: {
    systemPrompt: `
      WORK STREAM: ${streamName}
      TYPE: Bug Fix
      
      FOCUS AREAS:
      - Minimal, surgical changes
      - Root cause analysis
      - Regression prevention
      
      BUG DETAILS:
      ${bugDescription}
    `
  }
});
```

**Impact on WORK STREAMS:**
- ✅ Optimized agent behavior per stream type (feature/bugfix/refactor/spike)
- ✅ Context-aware prompting based on stream history
- ✅ Better code quality through specialized instructions
- ✅ Reduced token usage with targeted prompts

### Benefit 3: Multi-Stream Orchestration

**Problem Solved:**
Managing multiple streams required manual coordination. No way to programmatically query stream status or generate insights across streams.

**Agent SDK Solution:**
```typescript
// Dashboard generation with parallel queries
async function generateStreamDashboard(activeStreams: Stream[]) {
  const analyses = await Promise.all(
    activeStreams.map(stream => 
      query({
        prompt: `Analyze stream progress: ${JSON.stringify(stream.metadata)}`,
        options: {
          systemPrompt: "Provide concise stream status analysis",
          settingSources: [],
          model: "claude-sonnet-4-5"
        }
      })
    )
  );
  
  return {
    streams: activeStreams.map((stream, i) => ({
      ...stream,
      aiAnalysis: analyses[i]
    })),
    recommendations: generateRecommendations(analyses)
  };
}
```

**Impact on WORK STREAMS:**
- ✅ `/stream-dashboard` can provide AI-powered insights
- ✅ Cross-stream analysis and recommendations
- ✅ Automated progress summaries
- ✅ Intelligent stream prioritization suggestions

### Benefit 4: Stream Type Templates

**Problem Solved:**
All streams treated identically regardless of their purpose, leading to suboptimal guidance.

**Agent SDK Solution:**
```typescript
const STREAM_TEMPLATES = {
  feature: {
    systemPrompt: `
      Feature development stream.
      Priorities: Clean code, tests, documentation.
      Process: Red-Green-Refactor TDD cycle.
    `,
    settingSources: ['project'],
    recommendedCheckpoints: ['After each component', 'After tests pass']
  },
  
  bugfix: {
    systemPrompt: `
      Bug fix stream.
      Priorities: Minimal changes, root cause fix, regression tests.
      Process: Reproduce → Diagnose → Fix → Verify.
    `,
    settingSources: [],
    recommendedCheckpoints: ['After bug reproduction', 'After fix verification']
  },
  
  refactor: {
    systemPrompt: `
      Refactoring stream.
      Priorities: Maintain behavior, improve structure, preserve tests.
      Process: Test coverage → Refactor → Verify tests green.
    `,
    settingSources: ['project'],
    recommendedCheckpoints: ['After each refactoring step', 'After test suite passes']
  },
  
  spike: {
    systemPrompt: `
      Research spike stream.
      Priorities: Exploration, proof of concept, learning.
      Process: Hypothesis → Experiment → Document findings.
    `,
    settingSources: [],
    recommendedCheckpoints: ['After each experiment', 'After key insights']
  }
};
```

**Impact on WORK STREAMS:**
- ✅ Developers get stream-type-specific guidance
- ✅ Better adherence to best practices per work type
- ✅ Faster onboarding (templates guide behavior)
- ✅ Consistent quality across stream types

### Benefit 5: Advanced Context Management

**Problem Solved:**
Context injection was basic text concatenation. No intelligent prioritization or compression of stream history.

**Agent SDK Solution:**
```typescript
function buildIntelligentStreamContext(stream: Stream): string {
  const recentCheckpoints = stream.checkpoints.slice(-3);
  const criticalFiles = stream.modifiedFiles.filter(f => f.changeFrequency > 5);
  const blockers = stream.notes.filter(n => n.type === 'blocker');
  
  return `
STREAM: ${stream.name} [${stream.type}]
PHASE: ${stream.currentPhase.name} (${stream.progress}% complete)

CRITICAL CONTEXT:
${blockers.length > 0 ? `⚠️ BLOCKERS:\n${blockers.map(b => `- ${b.text}`).join('\n')}` : ''}

RECENT PROGRESS:
${recentCheckpoints.map(cp => `✓ ${cp.timestamp}: ${cp.description}`).join('\n')}

FOCUS AREAS:
- Primary: ${stream.currentPhase.objective}
- Files: ${criticalFiles.map(f => f.path).join(', ')}

NEXT STEPS:
${stream.nextSteps.slice(0, 3).map((step, i) => `${i + 1}. ${step}`).join('\n')}
`;
}
```

**Impact on WORK STREAMS:**
- ✅ Intelligent context prioritization (most relevant info first)
- ✅ Token-efficient context injection
- ✅ Better Claude Code understanding of current state
- ✅ Reduced context window pressure

---

## Part 2: Architectural Redesign

### Current Architecture (v1.x)

```
claude-work-streams/
├── src/
│   ├── commands/           # Slash command handlers
│   │   ├── stream-start.ts
│   │   ├── stream-resume.ts
│   │   ├── stream-checkpoint.ts
│   │   └── stream-dashboard.ts
│   ├── core/
│   │   ├── stream-manager.ts    # Basic CRUD operations
│   │   └── git-integration.ts   # Git branch management
│   └── types/
│       └── stream.types.ts      # Type definitions
└── .claude/
    └── streams/                 # Stream data storage
        └── [stream-name]/
            ├── stream.yaml      # Basic metadata
            └── checkpoints/     # Checkpoint files
```

**Limitations:**
- No SDK integration
- Basic context injection (text only)
- No per-stream agent configuration
- Manual context management
- No multi-stream orchestration

### New Architecture (v2.0)

```
claude-work-streams/
├── src/
│   ├── commands/                    # Enhanced command handlers
│   │   ├── stream-start.ts          # ← Enhanced with templates
│   │   ├── stream-resume.ts         # ← Enhanced with SDK query
│   │   ├── stream-checkpoint.ts     
│   │   ├── stream-dashboard.ts      # ← Enhanced with AI insights
│   │   ├── stream-switch.ts         # ← Enhanced with isolation
│   │   └── stream-analyze.ts        # NEW: AI-powered analysis
│   │
│   ├── core/
│   │   ├── agent/                   # NEW: Agent SDK integration
│   │   │   ├── agent-config.ts      # Agent configuration builder
│   │   │   ├── query-service.ts     # Abstraction over SDK query
│   │   │   └── prompt-builder.ts    # Intelligent prompt construction
│   │   │
│   │   ├── context/                 # NEW: Advanced context management
│   │   │   ├── context-builder.ts   # Builds optimized context
│   │   │   ├── context-compressor.ts # Intelligent compression
│   │   │   └── context-prioritizer.ts # Ranks context importance
│   │   │
│   │   ├── stream/
│   │   │   ├── stream-manager.ts    # Enhanced CRUD
│   │   │   ├── stream-orchestrator.ts # NEW: Multi-stream coordination
│   │   │   └── stream-analyzer.ts   # NEW: Stream insights
│   │   │
│   │   ├── templates/               # NEW: Stream templates
│   │   │   ├── template-manager.ts
│   │   │   ├── feature-template.ts
│   │   │   ├── bugfix-template.ts
│   │   │   ├── refactor-template.ts
│   │   │   └── spike-template.ts
│   │   │
│   │   └── git-integration.ts       # Enhanced git operations
│   │
│   └── types/
│       ├── stream.types.ts          # Enhanced types
│       ├── agent.types.ts           # NEW: Agent configuration types
│       └── template.types.ts        # NEW: Template types
│
├── .claude/
│   └── streams/
│       └── [stream-name]/
│           ├── stream.yaml          # Enhanced with agent config
│           ├── context/             # NEW: Context snapshots
│           │   ├── current.json
│           │   └── history/
│           ├── checkpoints/
│           └── analysis/            # NEW: AI analysis results
│
└── package.json                     # Updated dependencies
```

### Key Architectural Changes

#### 1. Agent Configuration Layer

**Purpose:** Manage Claude Agent SDK interactions with stream-specific configuration.

```typescript
// src/core/agent/agent-config.ts
export interface StreamAgentConfig {
  systemPrompt: string | { type: 'preset', preset: 'claude_code' };
  settingSources: ('user' | 'project' | 'local')[];
  model: string;
  customInstructions?: string;
  toolRestrictions?: string[];
}

export class AgentConfigBuilder {
  static buildForStream(stream: Stream, template: StreamTemplate): StreamAgentConfig {
    return {
      systemPrompt: this.buildSystemPrompt(stream, template),
      settingSources: template.settingSources,
      model: stream.config.model || 'claude-sonnet-4-5',
      customInstructions: stream.config.customInstructions
    };
  }
  
  static buildSystemPrompt(stream: Stream, template: StreamTemplate): string {
    const context = ContextBuilder.build(stream);
    const templatePrompt = template.systemPrompt;
    
    return `${templatePrompt}

${context}

STREAM COMMANDS:
- /stream-checkpoint [desc] - Save progress
- /stream-context-check - Check context usage
- /stream-git commit [msg] - Commit changes
- /stream-update [note] - Add progress note
`;
  }
}
```

#### 2. Query Service Layer

**Purpose:** Abstraction over Claude Agent SDK for consistent querying.

```typescript
// src/core/agent/query-service.ts
import { query, ClaudeAgentOptions } from '@anthropic-ai/claude-agent-sdk';

export class StreamQueryService {
  async executeStreamQuery(
    stream: Stream,
    userPrompt: string,
    options?: Partial<ClaudeAgentOptions>
  ): Promise<StreamQueryResult> {
    const template = TemplateManager.getTemplate(stream.type);
    const agentConfig = AgentConfigBuilder.buildForStream(stream, template);
    
    const result = await query({
      prompt: userPrompt,
      options: {
        ...agentConfig,
        ...options
      }
    });
    
    // Track query in stream history
    await StreamManager.logQuery(stream.id, userPrompt, result);
    
    return {
      response: result,
      tokensUsed: result.usage.total_tokens,
      streamId: stream.id
    };
  }
  
  async generateStreamInsight(stream: Stream): Promise<string> {
    const analysisPrompt = PromptBuilder.buildAnalysisPrompt(stream);
    
    return query({
      prompt: analysisPrompt,
      options: {
        systemPrompt: "Provide concise stream progress analysis",
        settingSources: [],
        model: "claude-sonnet-4-5"
      }
    });
  }
}
```

#### 3. Context Management System

**Purpose:** Intelligent context building, compression, and prioritization.

```typescript
// src/core/context/context-builder.ts
export class ContextBuilder {
  static build(stream: Stream): StreamContext {
    const prioritized = ContextPrioritizer.prioritize(stream);
    const compressed = ContextCompressor.compress(prioritized);
    
    return {
      essential: this.buildEssentialContext(stream),
      recent: this.buildRecentContext(stream, compressed),
      fileContext: this.buildFileContext(stream),
      gitContext: this.buildGitContext(stream)
    };
  }
  
  private static buildEssentialContext(stream: Stream): string {
    return `
STREAM: ${stream.name}
TYPE: ${stream.type}
STATUS: ${stream.status}
PHASE: ${stream.currentPhase.name} (${stream.progress}% complete)
BRANCH: ${stream.gitBranch}
`;
  }
  
  private static buildRecentContext(stream: Stream, compressed: CompressedContext): string {
    const recentCheckpoints = compressed.checkpoints.slice(-3);
    const recentCommits = compressed.commits.slice(-5);
    const activeBlockers = compressed.blockers.filter(b => !b.resolved);
    
    return `
RECENT PROGRESS:
${recentCheckpoints.map(cp => `✓ ${cp.description}`).join('\n')}

RECENT COMMITS:
${recentCommits.map(c => `• ${c.hash.substring(0, 7)}: ${c.message}`).join('\n')}

${activeBlockers.length > 0 ? `
⚠️ ACTIVE BLOCKERS:
${activeBlockers.map(b => `- ${b.description}`).join('\n')}
` : ''}
`;
  }
  
  private static buildFileContext(stream: Stream): string {
    const criticalFiles = stream.modifiedFiles
      .filter(f => f.changeFrequency > 3)
      .slice(0, 10);
    
    return `
KEY FILES:
${criticalFiles.map(f => `- ${f.path} (${f.changeCount} changes)`).join('\n')}
`;
  }
}
```

#### 4. Template System

**Purpose:** Provide stream-type-specific agent configurations and guidance.

```typescript
// src/core/templates/template-manager.ts
export interface StreamTemplate {
  type: 'feature' | 'bugfix' | 'refactor' | 'spike';
  systemPrompt: string;
  settingSources: ('user' | 'project' | 'local')[];
  recommendedCheckpoints: string[];
  recommendedCommitFrequency: string;
  contextPriorities: string[];
}

export class TemplateManager {
  private static templates: Map<string, StreamTemplate> = new Map([
    ['feature', FeatureTemplate],
    ['bugfix', BugfixTemplate],
    ['refactor', RefactorTemplate],
    ['spike', SpikeTemplate]
  ]);
  
  static getTemplate(type: string): StreamTemplate {
    return this.templates.get(type) || this.templates.get('feature')!;
  }
  
  static registerCustomTemplate(name: string, template: StreamTemplate): void {
    this.templates.set(name, template);
  }
}

// src/core/templates/feature-template.ts
export const FeatureTemplate: StreamTemplate = {
  type: 'feature',
  systemPrompt: `
You are working on a FEATURE DEVELOPMENT stream.

DEVELOPMENT APPROACH:
- Follow Test-Driven Development (TDD): Red → Green → Refactor
- Write tests before implementation
- Focus on clean architecture and SOLID principles
- Document as you go (JSDoc, README updates)

CODE QUALITY STANDARDS:
- All functions must have type definitions
- Complex logic requires explanatory comments
- Follow project's established patterns
- Maintain test coverage above 80%

CHECKPOINT STRATEGY:
- After completing each component/module
- After all tests pass for a feature increment
- Before switching to different feature area
- When introducing new dependencies
`,
  settingSources: ['project'],
  recommendedCheckpoints: [
    'After implementing each component',
    'After tests pass',
    'Before architectural changes'
  ],
  recommendedCommitFrequency: 'After each logical unit of work (component, test suite, feature)',
  contextPriorities: ['currentObjective', 'recentTests', 'architectureDecisions']
};
```

#### 5. Stream Orchestrator

**Purpose:** Coordinate multiple streams and provide cross-stream insights.

```typescript
// src/core/stream/stream-orchestrator.ts
export class StreamOrchestrator {
  private queryService: StreamQueryService;
  
  async analyzeAllStreams(): Promise<StreamAnalysisReport> {
    const allStreams = await StreamManager.listAll();
    const activeStreams = allStreams.filter(s => s.status === 'active' || s.status === 'paused');
    
    // Parallel analysis of each stream
    const analyses = await Promise.all(
      activeStreams.map(stream => this.analyzeStream(stream))
    );
    
    return {
      totalStreams: allStreams.length,
      activeStreams: activeStreams.length,
      streamAnalyses: analyses,
      recommendations: this.generateRecommendations(analyses),
      healthScore: this.calculateHealthScore(analyses)
    };
  }
  
  private async analyzeStream(stream: Stream): Promise<StreamAnalysis> {
    const insight = await this.queryService.generateStreamInsight(stream);
    
    return {
      streamId: stream.id,
      streamName: stream.name,
      progress: stream.progress,
      health: this.assessStreamHealth(stream),
      aiInsight: insight,
      risks: this.identifyRisks(stream),
      nextActions: this.suggestNextActions(stream)
    };
  }
  
  private generateRecommendations(analyses: StreamAnalysis[]): string[] {
    const recommendations: string[] = [];
    
    // Identify stale streams
    const staleStreams = analyses.filter(a => 
      a.health === 'stale' && a.streamLastUpdated < Date.now() - 7 * 24 * 60 * 60 * 1000
    );
    if (staleStreams.length > 0) {
      recommendations.push(`Consider closing ${staleStreams.length} stale stream(s): ${staleStreams.map(s => s.streamName).join(', ')}`);
    }
    
    // Identify blocked streams
    const blockedStreams = analyses.filter(a => a.risks.includes('blocked'));
    if (blockedStreams.length > 0) {
      recommendations.push(`Address blockers in: ${blockedStreams.map(s => s.streamName).join(', ')}`);
    }
    
    // Suggest focus
    const highPriorityStreams = analyses.filter(a => a.priority === 'high');
    if (highPriorityStreams.length > 0) {
      recommendations.push(`Focus on high-priority stream: ${highPriorityStreams[0].streamName}`);
    }
    
    return recommendations;
  }
}
```

---

## Part 3: Implementation Tasks

### Phase 1: Core SDK Migration (Estimated: 2-3 days)

#### Task 1.1: Update Dependencies
```bash
# Remove old package
npm uninstall @anthropic-ai/claude-code

# Install new package
npm install @anthropic-ai/claude-agent-sdk

# Update package.json
```

**Files to modify:**
- `package.json`
- `package-lock.json`

**Acceptance Criteria:**
- ✅ New SDK installed successfully
- ✅ All dependencies resolve without conflicts
- ✅ `npm run build` completes successfully

#### Task 1.2: Create Agent Configuration Layer

**New files to create:**
- `src/core/agent/agent-config.ts`
- `src/core/agent/query-service.ts`
- `src/core/agent/prompt-builder.ts`
- `src/types/agent.types.ts`

**Implementation checklist:**
```typescript
// src/core/agent/agent-config.ts
export interface StreamAgentConfig {
  systemPrompt: string;
  settingSources: ('user' | 'project' | 'local')[];
  model: string;
}

export class AgentConfigBuilder {
  // TODO: Implement buildForStream()
  // TODO: Implement buildSystemPrompt()
  // TODO: Implement buildForDashboard()
}

// src/core/agent/query-service.ts
export class StreamQueryService {
  // TODO: Implement executeStreamQuery()
  // TODO: Implement generateStreamInsight()
  // TODO: Implement analyzeCrossStream()
}

// src/core/agent/prompt-builder.ts
export class PromptBuilder {
  // TODO: Implement buildResumePrompt()
  // TODO: Implement buildAnalysisPrompt()
  // TODO: Implement buildCheckpointPrompt()
}
```

**Acceptance Criteria:**
- ✅ AgentConfigBuilder creates valid configurations
- ✅ StreamQueryService executes queries with SDK
- ✅ PromptBuilder generates effective prompts
- ✅ Unit tests pass for all classes

#### Task 1.3: Update Stream Resume Command

**Files to modify:**
- `src/commands/stream-resume.ts`

**Before:**
```typescript
// Old implementation (basic context injection)
export async function resumeStream(streamName: string) {
  const stream = await StreamManager.load(streamName);
  console.log(`Resuming stream: ${stream.name}`);
  console.log(`Last checkpoint: ${stream.lastCheckpoint}`);
  // No SDK integration
}
```

**After:**
```typescript
// New implementation (SDK-powered resume)
import { StreamQueryService } from '../core/agent/query-service';
import { TemplateManager } from '../core/templates/template-manager';

export async function resumeStream(streamName: string) {
  const stream = await StreamManager.load(streamName);
  const queryService = new StreamQueryService();
  
  // Build resume context
  const resumePrompt = `Resuming work on: ${stream.name}`;
  
  // Execute with stream-specific configuration
  const result = await queryService.executeStreamQuery(stream, resumePrompt);
  
  console.log(`✓ Resumed stream: ${stream.name}`);
  console.log(`Context injected: ${result.tokensUsed} tokens`);
  console.log(`\n${result.response}`);
}
```

**Acceptance Criteria:**
- ✅ Command uses StreamQueryService
- ✅ Stream-specific system prompt injected
- ✅ No filesystem settings loaded (unless configured)
- ✅ Context displays properly
- ✅ Integration test passes

#### Task 1.4: Update Stream Start Command

**Files to modify:**
- `src/commands/stream-start.ts`

**Enhancement:**
Add template selection during stream creation

```typescript
export async function startStream(
  streamName: string,
  type: 'feature' | 'bugfix' | 'refactor' | 'spike' = 'feature'
) {
  // Create stream with template
  const template = TemplateManager.getTemplate(type);
  const stream = await StreamManager.create({
    name: streamName,
    type,
    template,
    agentConfig: AgentConfigBuilder.buildForStream(template)
  });
  
  console.log(`✓ Started ${type} stream: ${streamName}`);
  console.log(`Template: ${template.type}`);
  console.log(`System prompt configured for ${type} development`);
}
```

**Acceptance Criteria:**
- ✅ User can specify stream type
- ✅ Template auto-applied based on type
- ✅ Agent config stored in stream metadata
- ✅ Help text shows available types

### Phase 2: Context Management Enhancement (Estimated: 3-4 days)

#### Task 2.1: Create Context Management System

**New files to create:**
- `src/core/context/context-builder.ts`
- `src/core/context/context-compressor.ts`
- `src/core/context/context-prioritizer.ts`
- `src/types/context.types.ts`

**Implementation:**
```typescript
// src/core/context/context-builder.ts
export interface StreamContext {
  essential: string;
  recent: string;
  fileContext: string;
  gitContext: string;
  tokenEstimate: number;
}

export class ContextBuilder {
  static build(stream: Stream, maxTokens: number = 2000): StreamContext {
    // TODO: Implement intelligent context building
    // Priority order:
    // 1. Essential (stream name, type, phase) - ~100 tokens
    // 2. Recent progress (last 3 checkpoints) - ~400 tokens
    // 3. Active blockers - ~300 tokens
    // 4. Key files (top 10 by change frequency) - ~500 tokens
    // 5. Git context (recent commits) - ~300 tokens
    // 6. Next steps - ~400 tokens
  }
}

// src/core/context/context-prioritizer.ts
export class ContextPrioritizer {
  static prioritize(stream: Stream): PrioritizedContext {
    // Score and rank all context elements
    // Return top N items that fit in token budget
  }
}

// src/core/context/context-compressor.ts
export class ContextCompressor {
  static compress(context: PrioritizedContext, targetTokens: number): CompressedContext {
    // Intelligently compress verbose context
    // Use summarization for long descriptions
    // Keep critical info intact
  }
}
```

**Acceptance Criteria:**
- ✅ Context fits within token budget
- ✅ Most important info prioritized
- ✅ Compression maintains meaning
- ✅ Unit tests validate prioritization logic

#### Task 2.2: Enhance Stream Data Model

**Files to modify:**
- `src/types/stream.types.ts`
- `.claude/streams/[stream-name]/stream.yaml` (schema)

**Add fields:**
```typescript
export interface Stream {
  // Existing fields...
  id: string;
  name: string;
  type: 'feature' | 'bugfix' | 'refactor' | 'spike';
  status: 'active' | 'paused' | 'completed';
  
  // NEW: Agent configuration
  agentConfig: {
    systemPrompt: string;
    settingSources: string[];
    model: string;
    customInstructions?: string;
  };
  
  // NEW: Context management
  contextHistory: {
    snapshots: ContextSnapshot[];
    compressionRatio: number;
    avgTokensPerResume: number;
  };
  
  // NEW: Analytics
  analytics: {
    totalQueryCount: number;
    totalTokensUsed: number;
    avgTokensPerQuery: number;
    sessionCount: number;
  };
  
  // NEW: Priority and health
  priority: 'low' | 'medium' | 'high';
  health: 'healthy' | 'stale' | 'blocked' | 'needs-attention';
  lastActiveDate: Date;
}
```

**Migration script needed:**
Create `scripts/migrate-streams-v2.ts` to update existing streams

**Acceptance Criteria:**
- ✅ New schema fields defined
- ✅ Migration script converts v1 → v2
- ✅ Backward compatibility maintained
- ✅ All existing streams migrated successfully

#### Task 2.3: Implement Context Snapshots

**Purpose:** Save context state at each checkpoint for historical reference

**New files:**
- `src/core/context/snapshot-manager.ts`

```typescript
export class SnapshotManager {
  static async createSnapshot(stream: Stream): Promise<ContextSnapshot> {
    const context = ContextBuilder.build(stream);
    
    const snapshot: ContextSnapshot = {
      id: generateId(),
      streamId: stream.id,
      timestamp: new Date(),
      context,
      checkpointId: stream.lastCheckpoint?.id,
      tokenCount: context.tokenEstimate
    };
    
    // Save to .claude/streams/[stream-name]/context/history/
    await this.saveSnapshot(stream, snapshot);
    
    return snapshot;
  }
  
  static async loadSnapshot(stream: Stream, snapshotId: string): Promise<ContextSnapshot> {
    // Load historical snapshot for analysis
  }
}
```

**Acceptance Criteria:**
- ✅ Snapshots created at checkpoints
- ✅ Snapshots stored efficiently (compressed)
- ✅ Historical snapshots retrievable
- ✅ Snapshot size monitored (warn if > 3KB)

### Phase 3: Template System (Estimated: 2-3 days)

#### Task 3.1: Create Template Infrastructure

**New files to create:**
- `src/core/templates/template-manager.ts`
- `src/core/templates/feature-template.ts`
- `src/core/templates/bugfix-template.ts`
- `src/core/templates/refactor-template.ts`
- `src/core/templates/spike-template.ts`
- `src/types/template.types.ts`

**Implementation:**
```typescript
// src/types/template.types.ts
export interface StreamTemplate {
  type: string;
  displayName: string;
  description: string;
  systemPrompt: string;
  settingSources: ('user' | 'project' | 'local')[];
  recommendedCheckpoints: string[];
  recommendedCommitFrequency: string;
  contextPriorities: string[];
  icon?: string;
}

// src/core/templates/template-manager.ts
export class TemplateManager {
  private static templates = new Map<string, StreamTemplate>();
  
  static {
    // Auto-register built-in templates
    this.register(FeatureTemplate);
    this.register(BugfixTemplate);
    this.register(RefactorTemplate);
    this.register(SpikeTemplate);
  }
  
  static register(template: StreamTemplate): void {
    this.templates.set(template.type, template);
  }
  
  static getTemplate(type: string): StreamTemplate {
    const template = this.templates.get(type);
    if (!template) {
      throw new Error(`Template not found: ${type}`);
    }
    return template;
  }
  
  static listTemplates(): StreamTemplate[] {
    return Array.from(this.templates.values());
  }
}
```

**Acceptance Criteria:**
- ✅ All 4 built-in templates implemented
- ✅ Template registration system works
- ✅ Templates retrievable by type
- ✅ Unit tests for template manager

#### Task 3.2: Implement Built-in Templates

**Feature Template** (see Benefit 4 above for full example)

**Bugfix Template:**
```typescript
export const BugfixTemplate: StreamTemplate = {
  type: 'bugfix',
  displayName: 'Bug Fix',
  description: 'Focused stream for diagnosing and fixing bugs with minimal changes',
  systemPrompt: `
You are working on a BUG FIX stream.

BUG FIX PROCESS:
1. REPRODUCE: Create test that reproduces the bug
2. DIAGNOSE: Identify root cause (add logging if needed)
3. FIX: Minimal, surgical fix targeting root cause
4. VERIFY: Ensure fix works and doesn't break anything
5. PREVENT: Add regression test

PRINCIPLES:
- Minimum code changes to fix the issue
- No "while we're here" improvements (save for separate stream)
- Root cause fix, not symptom bandaid
- Add test coverage for the bug scenario

CHECKPOINT STRATEGY:
- After successfully reproducing bug
- After identifying root cause
- After implementing fix
- After all tests pass
`,
  settingSources: [],
  recommendedCheckpoints: [
    'After reproducing bug',
    'After root cause identified',
    'After fix verification'
  ],
  recommendedCommitFrequency: 'After bug reproduction, after fix, after tests',
  contextPriorities: ['bugDescription', 'reproductionSteps', 'rootCause', 'recentCommits']
};
```

**Refactor Template:**
```typescript
export const RefactorTemplate: StreamTemplate = {
  type: 'refactor',
  displayName: 'Refactoring',
  description: 'Stream for improving code structure while maintaining behavior',
  systemPrompt: `
You are working on a REFACTORING stream.

REFACTORING RULES:
1. Tests MUST pass before starting
2. Tests MUST pass after each refactoring step
3. Behavior MUST NOT change (unless that's the explicit goal)
4. Refactor in small, verifiable steps
5. Commit after each successful refactoring step

REFACTORING TECHNIQUES:
- Extract method/function
- Rename for clarity
- Move to appropriate location
- Simplify conditionals
- Remove duplication
- Improve abstraction

SAFETY NET:
- Run full test suite after each change
- Use IDE refactoring tools when possible
- Keep commits small and focused
- Can revert quickly if tests break

CHECKPOINT STRATEGY:
- After each major refactoring step
- After test suite passes
- Before changing approach
`,
  settingSources: ['project'],
  recommendedCheckpoints: [
    'After each refactoring step',
    'After test suite passes',
    'Before architectural changes'
  ],
  recommendedCommitFrequency: 'After each successful refactoring with passing tests',
  contextPriorities: ['currentRefactoring', 'testStatus', 'codeSmells', 'architectureGoals']
};
```

**Spike Template:**
```typescript
export const SpikeTemplate: StreamTemplate = {
  type: 'spike',
  displayName: 'Research Spike',
  description: 'Exploratory stream for learning and proof-of-concept work',
  systemPrompt: `
You are working on a RESEARCH SPIKE stream.

SPIKE PURPOSE:
- Learn new technology/approach
- Prove feasibility of solution
- Estimate complexity/effort
- Answer technical questions
- NOT production code (throwaway)

SPIKE PROCESS:
1. Define hypothesis/question to answer
2. Set timebox (usually 1-4 hours)
3. Experiment and document findings
4. Make decision: proceed or pivot
5. Share learnings with team

DOCUMENTATION FOCUS:
- What did we try?
- What worked / didn't work?
- Key insights gained
- Recommendations for actual implementation
- Code snippets (as reference, not for production)

CHECKPOINT STRATEGY:
- After each experiment
- After key insights
- At timebox completion
- Before deciding next steps
`,
  settingSources: [],
  recommendedCheckpoints: [
    'After each experiment',
    'After key insights',
    'At spike completion'
  ],
  recommendedCommitFrequency: 'Optional - focus on documentation over commits',
  contextPriorities: ['hypothesis', 'experiments', 'findings', 'recommendations']
};
```

**Acceptance Criteria:**
- ✅ All templates have comprehensive system prompts
- ✅ Templates provide clear guidance
- ✅ Each template optimized for its purpose
- ✅ Documentation matches template behavior

#### Task 3.3: Add Template Selection to Stream Start

**Files to modify:**
- `src/commands/stream-start.ts`

**Enhancement:**
Interactive template selection

```typescript
export async function startStream(streamName: string, templateType?: string) {
  // If no template specified, show interactive selection
  if (!templateType) {
    const templates = TemplateManager.listTemplates();
    
    console.log('\n📋 Select stream template:\n');
    templates.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.icon || '•'} ${t.displayName}`);
      console.log(`     ${t.description}\n`);
    });
    
    // In real implementation, use readline for input
    templateType = 'feature'; // Default
  }
  
  const template = TemplateManager.getTemplate(templateType);
  
  // Create stream with template
  const stream = await StreamManager.create({
    name: streamName,
    type: templateType,
    template,
    agentConfig: AgentConfigBuilder.buildForStream(template)
  });
  
  console.log(`\n✓ Started ${template.displayName} stream: ${streamName}`);
  console.log(`\n${template.systemPrompt.substring(0, 200)}...`);
  console.log(`\n💡 Recommended checkpoints:`);
  template.recommendedCheckpoints.forEach(cp => console.log(`  • ${cp}`));
}
```

**Acceptance Criteria:**
- ✅ Interactive template selection works
- ✅ Template can be specified via flag: `/stream-start my-feature --type=bugfix`
- ✅ Template guidance displayed after creation
- ✅ Help command shows available templates

### Phase 4: Multi-Stream Orchestration (Estimated: 2-3 days)

#### Task 4.1: Create Stream Orchestrator

**New files:**
- `src/core/stream/stream-orchestrator.ts`
- `src/core/stream/stream-analyzer.ts`

**Implementation:** (see Benefit 3 and Architectural Change 5 above)

**Acceptance Criteria:**
- ✅ Can analyze multiple streams in parallel
- ✅ Generates cross-stream insights
- ✅ Identifies stale/blocked streams
- ✅ Provides actionable recommendations

#### Task 4.2: Enhance Stream Dashboard

**Files to modify:**
- `src/commands/stream-dashboard.ts`

**Before:**
```typescript
export async function showDashboard() {
  const streams = await StreamManager.listAll();
  
  console.log('\n📊 Work Streams Dashboard\n');
  streams.forEach(stream => {
    console.log(`• ${stream.name} [${stream.status}]`);
    console.log(`  Progress: ${stream.progress}%`);
    console.log(`  Last updated: ${stream.lastUpdated}\n`);
  });
}
```

**After:**
```typescript
export async function showDashboard(includeAiInsights: boolean = false) {
  const orchestrator = new StreamOrchestrator();
  const report = await orchestrator.analyzeAllStreams();
  
  console.log('\n📊 Work Streams Dashboard\n');
  console.log(`Total Streams: ${report.totalStreams} | Active: ${report.activeStreams}`);
  console.log(`Overall Health: ${report.healthScore}/100\n`);
  
  report.streamAnalyses.forEach(analysis => {
    console.log(`${getHealthIcon(analysis.health)} ${analysis.streamName}`);
    console.log(`  Type: ${analysis.streamType} | Progress: ${analysis.progress}%`);
    console.log(`  Status: ${analysis.health}`);
    
    if (includeAiInsights) {
      console.log(`  💡 AI Insight: ${analysis.aiInsight}`);
    }
    
    if (analysis.risks.length > 0) {
      console.log(`  ⚠️  Risks: ${analysis.risks.join(', ')}`);
    }
    
    console.log(`  ➡️  Next: ${analysis.nextActions[0]}\n`);
  });
  
  if (report.recommendations.length > 0) {
    console.log('📌 Recommendations:');
    report.recommendations.forEach(rec => console.log(`  • ${rec}`));
  }
}
```

**Acceptance Criteria:**
- ✅ Dashboard shows AI-powered insights
- ✅ Health indicators visible
- ✅ Recommendations actionable
- ✅ Can toggle AI insights on/off
- ✅ Performance acceptable (< 3s with 10 streams)

#### Task 4.3: Create Stream Analyze Command

**New file:**
- `src/commands/stream-analyze.ts`

**Purpose:** Deep AI-powered analysis of single stream

```typescript
export async function analyzeStream(streamName: string) {
  const stream = await StreamManager.load(streamName);
  const queryService = new StreamQueryService();
  
  // Generate comprehensive analysis
  const analysisPrompt = `
Analyze this work stream comprehensively:

${JSON.stringify(stream, null, 2)}

Provide:
1. Progress assessment (on track, behind, ahead)
2. Code quality concerns (if any)
3. Potential blockers or risks
4. Recommendations for next steps
5. Estimation of time to completion
`;
  
  const analysis = await queryService.executeStreamQuery(
    stream,
    analysisPrompt,
    { systemPrompt: "You are an expert software development coach analyzing a work stream." }
  );
  
  console.log(`\n🔍 Stream Analysis: ${streamName}\n`);
  console.log(analysis.response);
}
```

**Acceptance Criteria:**
- ✅ Provides actionable insights
- ✅ Identifies genuine blockers
- ✅ Estimates are reasonable
- ✅ Suggestions are specific

### Phase 5: Advanced Features (Estimated: 2-3 days)

#### Task 5.1: Smart Checkpoint Recommendations

**Enhancement:** AI suggests when to checkpoint

```typescript
// src/core/stream/checkpoint-advisor.ts
export class CheckpointAdvisor {
  async shouldRecommendCheckpoint(stream: Stream): Promise<CheckpointRecommendation> {
    const timeSinceLastCheckpoint = Date.now() - stream.lastCheckpoint?.timestamp;
    const changesSinceCheckpoint = stream.uncommittedChanges.length;
    const contextUsage = await this.estimateContextUsage(stream);
    
    const reasons: string[] = [];
    let priority: 'low' | 'medium' | 'high' = 'low';
    
    // Time-based
    if (timeSinceLastCheckpoint > 30 * 60 * 1000) { // 30 minutes
      reasons.push('30+ minutes since last checkpoint');
      priority = 'medium';
    }
    
    // Change-based
    if (changesSinceCheckpoint > 5) {
      reasons.push(`${changesSinceCheckpoint} files changed`);
      priority = 'high';
    }
    
    // Context-based
    if (contextUsage > 0.8) {
      reasons.push('Context approaching limit (80%)');
      priority = 'high';
    }
    
    return {
      shouldCheckpoint: priority !== 'low',
      priority,
      reasons
    };
  }
}
```

**Integration:**
Add to `/stream-status` command to show checkpoint recommendation

**Acceptance Criteria:**
- ✅ Recommendations are helpful
- ✅ False positives minimized
- ✅ Clear reasoning provided

#### Task 5.2: Context Usage Monitoring

**Enhancement:** Real-time context tracking

```typescript
// src/core/context/context-monitor.ts
export class ContextMonitor {
  private static currentUsage: number = 0;
  private static warningThreshold: number = 0.8;
  
  static updateUsage(tokens: number): void {
    this.currentUsage = tokens;
    
    if (this.shouldWarn()) {
      this.displayWarning();
    }
  }
  
  private static shouldWarn(): boolean {
    return this.currentUsage / this.maxContextTokens() > this.warningThreshold;
  }
  
  private static displayWarning(): void {
    console.warn(`\n⚠️  Context Usage: ${this.getUsagePercentage()}%`);
    console.warn('Consider creating a checkpoint soon with /stream-checkpoint\n');
  }
  
  static getUsagePercentage(): number {
    return Math.round((this.currentUsage / this.maxContextTokens()) * 100);
  }
}
```

**Acceptance Criteria:**
- ✅ Accurate token counting
- ✅ Warning displays at 80%
- ✅ Integrates with all commands

#### Task 5.3: Git Integration Enhancement

**Enhancement:** Better commit message generation using SDK

```typescript
// src/core/git/commit-generator.ts
export class CommitGenerator {
  async generateCommitMessage(stream: Stream, changes: GitDiff): Promise<string> {
    const queryService = new StreamQueryService();
    
    const prompt = `
Generate a conventional commit message for these changes:

Stream: ${stream.name} (${stream.type})
Current Phase: ${stream.currentPhase.name}

Changes:
${changes.summary}

Files modified:
${changes.files.map(f => `- ${f.path}`).join('\n')}

Generate a commit message in this format:
type(scope): subject

body

Guidelines:
- type: feat, fix, refactor, test, docs, etc.
- subject: <50 chars, imperative mood
- body: explain what and why (not how)
- reference stream in body
`;
    
    const result = await queryService.executeStreamQuery(
      stream,
      prompt,
      { systemPrompt: "Generate concise, professional commit messages following conventional commits format" }
    );
    
    return this.parseCommitMessage(result.response);
  }
}
```

**Acceptance Criteria:**
- ✅ Messages follow conventional commits format
- ✅ Messages are concise and clear
- ✅ User can edit before committing
- ✅ Stream reference included in body

---

## Part 4: Testing Strategy

### Unit Tests

**Test Coverage Requirements:**
- ✅ Core classes: 90%+ coverage
- ✅ Commands: 80%+ coverage
- ✅ Utilities: 95%+ coverage

**Key Test Files:**
```
tests/
├── core/
│   ├── agent/
│   │   ├── agent-config.test.ts
│   │   ├── query-service.test.ts
│   │   └── prompt-builder.test.ts
│   ├── context/
│   │   ├── context-builder.test.ts
│   │   ├── context-compressor.test.ts
│   │   └── context-prioritizer.test.ts
│   ├── stream/
│   │   ├── stream-manager.test.ts
│   │   ├── stream-orchestrator.test.ts
│   │   └── stream-analyzer.test.ts
│   └── templates/
│       ├── template-manager.test.ts
│       └── feature-template.test.ts
└── commands/
    ├── stream-start.test.ts
    ├── stream-resume.test.ts
    └── stream-dashboard.test.ts
```

### Integration Tests

**Test Scenarios:**
1. **Full Stream Lifecycle:**
   - Start stream with template
   - Make checkpoints
   - Switch to different stream
   - Resume original stream
   - Complete stream

2. **Multi-Stream Scenario:**
   - Create 3 streams (feature, bugfix, refactor)
   - Work on each
   - Generate dashboard
   - Verify isolation

3. **Context Management:**
   - Fill context to 90%
   - Verify compression works
   - Resume with compressed context
   - Verify no data loss

4. **SDK Integration:**
   - Verify queries use correct config
   - Verify settings isolation works
   - Verify system prompts applied
   - Verify responses appropriate

### Manual Testing Checklist

**Before Release:**
- [ ] Install plugin in fresh project
- [ ] Create stream of each type
- [ ] Resume each stream
- [ ] Switch between streams
- [ ] Generate dashboard with insights
- [ ] Test with 10+ streams
- [ ] Test context compression
- [ ] Test git integration
- [ ] Test checkpoint system
- [ ] Verify no settings leakage

---

## Part 5: Documentation Updates

### Files to Update

1. **README.md**
   - Add section on templates
   - Add section on AI-powered insights
   - Update examples with new commands
   - Add migration guide from v1 to v2

2. **ARCHITECTURE.md** (new)
   - Document agent configuration system
   - Document context management
   - Document template system
   - Document orchestration layer

3. **TEMPLATES.md** (new)
   - Document all built-in templates
   - Guide for creating custom templates
   - Template best practices

4. **MIGRATION-V2.md** (new)
   - Guide for upgrading from v1.x
   - Breaking changes
   - New features
   - Step-by-step migration

### Command Documentation

Update command reference for:
- `/stream-start [name] --type=[feature|bugfix|refactor|spike]`
- `/stream-resume [name]` (now with AI-powered context)
- `/stream-dashboard` (now with insights)
- `/stream-analyze [name]` (new command)
- `/stream-switch [name]` (enhanced isolation)

---

## Part 6: Migration Plan for Existing Users

### Step 1: Backup Existing Data
```bash
# Before upgrade
cp -r .claude/streams .claude/streams.backup
```

### Step 2: Install Updated Plugin
```bash
npm install @claude-code/work-streams@2.0.0
```

### Step 3: Run Migration Script
```bash
npx work-streams migrate-v1-to-v2
```

**Migration script tasks:**
1. Add `agentConfig` to all existing streams
2. Add `contextHistory` structure
3. Add `analytics` with default values
4. Add `priority` and `health` assessments
5. Create initial context snapshots

### Step 4: Test Existing Streams
```bash
# Verify all streams still work
work-streams list
work-streams resume [existing-stream]
```

### Step 5: Enjoy New Features!
```bash
# Try new dashboard
work-streams dashboard --insights

# Analyze existing stream
work-streams analyze [stream-name]

# Create new stream with template
work-streams start new-feature --type=feature
```

---

## Part 7: Performance Considerations

### Context Token Budget

**Limits per component:**
- Essential context: ~100 tokens
- Recent progress: ~400 tokens
- Blockers: ~300 tokens
- File context: ~500 tokens
- Git context: ~300 tokens
- Next steps: ~400 tokens
- **Total Target: ~2000 tokens**

### Query Optimization

**Strategies:**
1. Cache template system prompts (don't regenerate)
2. Compress old checkpoints (keep last 10 uncompressed)
3. Lazy-load stream analytics (only when requested)
4. Batch cross-stream analysis queries
5. Use streaming responses for long analyses

### File System Efficiency

**Storage optimization:**
- Compress context snapshots (gzip)
- Prune snapshots older than 30 days
- Limit checkpoint history to 100 per stream
- Use JSON streaming for large stream lists

---

## Part 8: Success Metrics

### Functional Metrics
- ✅ 100% of commands work with new SDK
- ✅ Context isolation verified across streams
- ✅ Templates provide useful guidance
- ✅ Dashboard insights are actionable
- ✅ No performance regression

### Quality Metrics
- ✅ 85%+ test coverage
- ✅ Zero critical bugs in first week
- ✅ Migration successful for 100% of test users
- ✅ Documentation complete and clear

### User Experience Metrics
- ✅ User satisfaction with templates: 8+/10
- ✅ AI insights rated useful: 7+/10
- ✅ Migration process rated smooth: 8+/10
- ✅ Performance acceptable: < 2s for most operations

---

## Part 9: Future Enhancements (Post v2.0)

### v2.1: Team Collaboration
- Share streams across team members
- Stream templates repository
- Collaborative checkpoints
- Stream merge capabilities

### v2.2: Advanced Analytics
- Stream velocity tracking
- Productivity insights
- Code quality metrics per stream
- Burndown charts

### v2.3: IDE Integration
- VS Code extension
- JetBrains plugin
- Real-time context usage widget
- Inline checkpoint markers

### v2.4: CI/CD Integration
- GitHub Actions integration
- Automated stream creation from issues
- PR-based stream completion
- Slack/Discord notifications

---

## Appendix A: Complete File Structure

```
claude-work-streams/
├── src/
│   ├── commands/
│   │   ├── stream-start.ts
│   │   ├── stream-resume.ts
│   │   ├── stream-pause.ts
│   │   ├── stream-end.ts
│   │   ├── stream-switch.ts
│   │   ├── stream-checkpoint.ts
│   │   ├── stream-dashboard.ts
│   │   ├── stream-analyze.ts          # NEW
│   │   ├── stream-list.ts
│   │   ├── stream-status.ts
│   │   ├── stream-git.ts
│   │   └── stream-config.ts
│   │
│   ├── core/
│   │   ├── agent/                      # NEW
│   │   │   ├── agent-config.ts
│   │   │   ├── query-service.ts
│   │   │   └── prompt-builder.ts
│   │   │
│   │   ├── context/                    # NEW
│   │   │   ├── context-builder.ts
│   │   │   ├── context-compressor.ts
│   │   │   ├── context-prioritizer.ts
│   │   │   ├── context-monitor.ts
│   │   │   └── snapshot-manager.ts
│   │   │
│   │   ├── stream/
│   │   │   ├── stream-manager.ts
│   │   │   ├── stream-orchestrator.ts  # NEW
│   │   │   ├── stream-analyzer.ts      # NEW
│   │   │   └── checkpoint-advisor.ts   # NEW
│   │   │
│   │   ├── templates/                  # NEW
│   │   │   ├── template-manager.ts
│   │   │   ├── feature-template.ts
│   │   │   ├── bugfix-template.ts
│   │   │   ├── refactor-template.ts
│   │   │   └── spike-template.ts
│   │   │
│   │   ├── git/
│   │   │   ├── git-integration.ts
│   │   │   └── commit-generator.ts     # NEW
│   │   │
│   │   └── utils/
│   │       ├── file-utils.ts
│   │       ├── token-counter.ts
│   │       └── logger.ts
│   │
│   ├── types/
│   │   ├── stream.types.ts
│   │   ├── agent.types.ts              # NEW
│   │   ├── context.types.ts            # NEW
│   │   ├── template.types.ts           # NEW
│   │   └── index.ts
│   │
│   └── index.ts
│
├── tests/
│   ├── unit/
│   │   ├── core/
│   │   └── commands/
│   └── integration/
│       └── full-workflow.test.ts
│
├── scripts/
│   ├── migrate-v1-to-v2.ts            # NEW
│   └── cleanup-old-snapshots.ts        # NEW
│
├── docs/
│   ├── README.md
│   ├── ARCHITECTURE.md                 # NEW
│   ├── TEMPLATES.md                    # NEW
│   ├── MIGRATION-V2.md                 # NEW
│   └── API.md
│
├── .claude/
│   └── commands/
│       └── work-streams.json
│
├── package.json
├── tsconfig.json
└── LICENSE
```

---

## Appendix B: Implementation Timeline

### Week 1: Core SDK Migration
- **Days 1-2:** Update dependencies, create agent layer
- **Days 3-4:** Update stream-resume and stream-start commands
- **Day 5:** Testing and bug fixes

### Week 2: Context Management
- **Days 1-2:** Build context management system
- **Days 3-4:** Implement context snapshots and compression
- **Day 5:** Testing and optimization

### Week 3: Templates
- **Days 1-2:** Create template infrastructure
- **Days 3-4:** Implement all 4 built-in templates
- **Day 5:** Testing and documentation

### Week 4: Orchestration & Polish
- **Days 1-2:** Build stream orchestrator
- **Day 3:** Enhance dashboard with AI insights
- **Day 4:** Final testing and bug fixes
- **Day 5:** Documentation and release prep

**Total Estimated Time: 4 weeks**

---

## Appendix C: Command Reference

### New Commands
```bash
# Analyze stream with AI insights
/stream-analyze [stream-name]

# Dashboard with AI-powered insights
/stream-dashboard --insights

# Start stream with template
/stream-start [name] --type=[feature|bugfix|refactor|spike]

# List available templates
/stream-templates list

# Show context usage
/stream-context-check
```

### Enhanced Commands
```bash
# Resume now uses AI-powered context injection
/stream-resume [stream-name]

# Switch with perfect isolation
/stream-switch [stream-name]

# Checkpoint with snapshot
/stream-checkpoint [description]
```

---

## Getting Started with Implementation

**For Claude Code CLI:**

1. Start with Phase 1, Task 1.1 (update dependencies)
2. Follow tasks sequentially within each phase
3. Run tests after each task
4. Create checkpoints after completing each phase
5. Use the WORK STREAMS plugin itself to track this development!

**Recommended approach:**
```bash
# Start a stream for this work
/stream-start agent-sdk-migration --type=refactor

# Follow implementation tasks from Phase 1
# After each major task:
/stream-checkpoint [task description]

# Monitor context usage
/stream-context-check

# When complete:
/stream-end
```

---

**This comprehensive guide provides everything needed to successfully migrate the WORK STREAMS plugin to leverage the Claude Agent SDK's powerful new capabilities. The result will be a more robust, isolated, and intelligent work stream management system.**
