#!/usr/bin/env node

/**
 * stream-init - Initialize Claude Work Streams in a project
 *
 * This CLI tool sets up the work streams plugin in your project by:
 * - Creating .claude/commands directory
 * - Creating .claude/templates directory
 * - Copying all stream commands
 * - Copying all templates
 * - Creating plugin.json
 */

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');

program
  .name('stream-init')
  .description('Initialize Claude Work Streams in your project')
  .version(packageJson.version)
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-g, --global', 'Install globally in user config')
  .parse(process.argv);

const options = program.opts();

async function init() {
  console.log(
    boxen(
      chalk.bold.blue('Claude Work Streams') + '\n' +
      chalk.dim('Intelligent session management for Claude Code'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
      }
    )
  );

  // Determine installation target
  let targetDir;
  if (options.global) {
    // Global installation - user's Claude Code config directory
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    targetDir = path.join(homeDir, '.claude');
  } else {
    // Project installation - current directory
    targetDir = path.join(process.cwd(), '.claude');
  }

  // Confirm installation
  if (!options.yes) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Install work streams to ${targetDir}?`,
        default: true
      }
    ]);

    if (!answers.confirm) {
      console.log(chalk.yellow('Installation cancelled.'));
      process.exit(0);
    }
  }

  const spinner = ora('Installing work streams...').start();

  try {
    // Create directories
    const commandsDir = path.join(targetDir, 'commands');
    const templatesDir = path.join(targetDir, 'templates');
    const customTemplatesDir = path.join(templatesDir, 'custom');
    const streamsDir = path.join(targetDir, 'streams');

    fs.mkdirSync(commandsDir, { recursive: true });
    fs.mkdirSync(templatesDir, { recursive: true });
    fs.mkdirSync(customTemplatesDir, { recursive: true });
    fs.mkdirSync(streamsDir, { recursive: true });

    // Copy commands
    const sourceCommandsDir = path.join(__dirname, '../.claude/commands');
    const commandFiles = fs.readdirSync(sourceCommandsDir);

    for (const file of commandFiles) {
      const source = path.join(sourceCommandsDir, file);
      const dest = path.join(commandsDir, file);
      fs.copyFileSync(source, dest);
    }

    // Copy templates
    const sourceTemplatesDir = path.join(__dirname, '../.claude/templates');
    const templateFiles = fs.readdirSync(sourceTemplatesDir).filter(f => f.endsWith('.yaml'));

    for (const file of templateFiles) {
      const source = path.join(sourceTemplatesDir, file);
      const dest = path.join(templatesDir, file);
      fs.copyFileSync(source, dest);
    }

    // Copy custom template README
    const customReadmeSource = path.join(sourceTemplatesDir, 'custom/README.md');
    const customReadmeDest = path.join(customTemplatesDir, 'README.md');
    if (fs.existsSync(customReadmeSource)) {
      fs.copyFileSync(customReadmeSource, customReadmeDest);
    }

    // Copy plugin.json
    const pluginSource = path.join(__dirname, '../plugin.json');
    const pluginDest = path.join(targetDir, 'plugin.json');
    fs.copyFileSync(pluginSource, pluginDest);

    spinner.succeed(chalk.green('Work streams installed successfully!'));

    // Display success message
    console.log('\n' + chalk.bold('Installation Complete') + '\n');
    console.log(chalk.dim('Commands installed:'));
    console.log(chalk.blue('  • /stream-start') + ' - Start a new work stream');
    console.log(chalk.blue('  • /stream-status') + ' - View current stream status');
    console.log(chalk.blue('  • /stream-checkpoint') + ' - Save progress checkpoint');
    console.log(chalk.blue('  • /stream-update') + ' - Add quick progress note');
    console.log(chalk.blue('  • /stream-end') + ' - Complete work stream');
    console.log(chalk.blue('  • /stream-resume') + ' - Resume previous stream');
    console.log(chalk.blue('  • /stream-list') + ' - View all streams');
    console.log(chalk.blue('  • /stream-template') + ' - Manage templates');
    console.log(chalk.blue('  • /stream-context-check') + ' - Monitor context usage');
    console.log(chalk.blue('  • /stream-context-inject') + ' - Generate context summary');
    console.log(chalk.blue('  • /stream-git') + ' - Git integration commands');

    console.log('\n' + chalk.dim('Templates installed:'));
    console.log(chalk.blue('  • feature-development') + ' - Feature implementation workflow');
    console.log(chalk.blue('  • bug-fix') + ' - Systematic bug fixing workflow');
    console.log(chalk.blue('  • refactoring') + ' - Code improvement workflow');
    console.log(chalk.blue('  • documentation') + ' - Documentation creation workflow');

    console.log('\n' + chalk.bold('Get Started:'));
    console.log(chalk.dim('  /stream-template list          ') + chalk.gray('# View available templates'));
    console.log(chalk.dim('  /stream-start my-feature --template feature-development'));
    console.log();

  } catch (error) {
    spinner.fail(chalk.red('Installation failed'));
    console.error(chalk.red('\nError:'), error.message);
    process.exit(1);
  }
}

init();
