/**
 * @claude-code/work-streams
 *
 * Main library entry point for programmatic access to work streams functionality.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Get the .claude directory path (project or global)
 */
function getClaudeDir(options = {}) {
  if (options.global) {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    return path.join(homeDir, '.claude');
  }
  return path.join(process.cwd(), '.claude');
}

/**
 * Check if work streams is initialized
 */
function isInitialized(options = {}) {
  const claudeDir = getClaudeDir(options);
  const commandsDir = path.join(claudeDir, 'commands');
  const templatesDir = path.join(claudeDir, 'templates');

  return fs.existsSync(commandsDir) && fs.existsSync(templatesDir);
}

/**
 * Get current active stream
 */
function getCurrentStream(options = {}) {
  const claudeDir = getClaudeDir(options);
  const currentStreamFile = path.join(claudeDir, 'streams', '.current-stream');

  if (!fs.existsSync(currentStreamFile)) {
    return null;
  }

  const streamName = fs.readFileSync(currentStreamFile, 'utf8').trim();
  return getStream(streamName, options);
}

/**
 * Get stream by name
 */
function getStream(streamName, options = {}) {
  const claudeDir = getClaudeDir(options);
  const streamFile = path.join(claudeDir, 'streams', streamName, 'stream.yaml');

  if (!fs.existsSync(streamFile)) {
    return null;
  }

  const content = fs.readFileSync(streamFile, 'utf8');
  return yaml.load(content);
}

/**
 * List all streams
 */
function listStreams(options = {}) {
  const claudeDir = getClaudeDir(options);
  const streamsDir = path.join(claudeDir, 'streams');

  if (!fs.existsSync(streamsDir)) {
    return [];
  }

  const streams = [];
  const entries = fs.readdirSync(streamsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== '.current-stream') {
      const stream = getStream(entry.name, options);
      if (stream) {
        streams.push(stream);
      }
    }
  }

  return streams;
}

/**
 * Get available templates
 */
function listTemplates(options = {}) {
  const claudeDir = getClaudeDir(options);
  const templatesDir = path.join(claudeDir, 'templates');

  if (!fs.existsSync(templatesDir)) {
    return [];
  }

  const templates = [];
  const files = fs.readdirSync(templatesDir);

  for (const file of files) {
    if (file.endsWith('.yaml') && !file.startsWith('.')) {
      const templatePath = path.join(templatesDir, file);
      const content = fs.readFileSync(templatePath, 'utf8');
      const template = yaml.load(content);
      templates.push({
        name: path.basename(file, '.yaml'),
        ...template
      });
    }
  }

  return templates;
}

/**
 * Get template by name
 */
function getTemplate(templateName, options = {}) {
  const claudeDir = getClaudeDir(options);
  const templatePath = path.join(claudeDir, 'templates', `${templateName}.yaml`);

  if (!fs.existsSync(templatePath)) {
    return null;
  }

  const content = fs.readFileSync(templatePath, 'utf8');
  return yaml.load(content);
}

module.exports = {
  getClaudeDir,
  isInitialized,
  getCurrentStream,
  getStream,
  listStreams,
  listTemplates,
  getTemplate
};
