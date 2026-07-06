#!/usr/bin/env node
import { Command } from 'commander';
import { detectCommand } from './commands/detect';
import { docsCommand } from './commands/docs';
import { scaffoldCommand } from './commands/scaffold';
import { verifyCommand } from './commands/verify';
import { liveTestCommand } from './commands/live-test';
import { errorsCommand } from './commands/errors';

const program = new Command();

process.on('uncaughtException', (err) => {
  console.error(JSON.stringify({ error: err.message }, null, 2));
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(
    JSON.stringify(
      { error: err instanceof Error ? err.message : String(err) },
      null,
      2,
    ),
  );
  process.exit(1);
});

program
  .name('otpless-cli')
  .description('OTPless Integration Tool - CLI and MCP Server')
  .version('1.0.0');

program.addCommand(detectCommand);
program.addCommand(docsCommand);
program.addCommand(scaffoldCommand);
program.addCommand(verifyCommand);
program.addCommand(liveTestCommand);
program.addCommand(errorsCommand);

program.parse(process.argv);
