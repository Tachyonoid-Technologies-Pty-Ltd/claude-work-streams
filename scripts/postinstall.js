#!/usr/bin/env node

/**
 * Post-install script for @claude-code/work-streams
 *
 * This script runs after npm install and provides guidance to users
 * on how to initialize work streams in their projects.
 */

const chalk = require('chalk');
const boxen = require('boxen');

function postInstall() {
  console.log('\n');
  console.log(
    boxen(
      chalk.bold.blue('Claude Work Streams Installed') + '\n\n' +
      chalk.dim('To set up work streams in your project, run:') + '\n\n' +
      chalk.cyan('  npx stream-init') + '\n\n' +
      chalk.dim('Or for global installation:') + '\n\n' +
      chalk.cyan('  npx stream-init --global'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
      }
    )
  );

  console.log(chalk.dim('\nFor more information:'));
  console.log(chalk.blue('  https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams'));
  console.log();
}

// Only run if this is not a dev installation
if (!process.env.npm_config_dev && !process.env.npm_config_only_dev) {
  postInstall();
}
