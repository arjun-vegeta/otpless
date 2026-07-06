import { Command } from 'commander';
import { generatePlaybook, runOptionalChecks } from '../engine/verify';
import { Stack, Flow, StackSchema, FlowSchema } from '../types';

export const verifyCommand = new Command('verify')
  .description(
    'Generates a verification playbook and evidence report template, or runs optional machine checks.',
  )
  .requiredOption(
    '--stack <stack>',
    'The tech stack (e.g., web-react, node-backend)',
  )
  .requiredOption(
    '--flow <flow>',
    'The flow (e.g., headless, token-validation)',
  )
  .option(
    '--run-checks',
    'Run optional machine checks and output evidence report',
  )
  .action(async (options) => {
    const stack = StackSchema.parse(options.stack);
    const flow = FlowSchema.parse(options.flow);
    if (options.runChecks) {
      const report = await runOptionalChecks(
        process.cwd(),
        stack as Stack,
        flow as Flow,
      );
      console.log(JSON.stringify(report, null, 2));
    } else {
      const playbook = generatePlaybook(stack as Stack, flow as Flow);
      console.log(JSON.stringify(playbook, null, 2));
    }
  });
