import { Command } from 'commander';
import { scaffoldIntegration } from '../engine/scaffold';
import { Stack, Flow, StackSchema, FlowSchema } from '../types';

export const scaffoldCommand = new Command('scaffold')
  .description('Generates implementation instructions.')
  .requiredOption(
    '--stack <stack>',
    'The tech stack (e.g., web-react, node-backend)',
  )
  .requiredOption(
    '--flow <flow>',
    'The flow (e.g., headless, token-validation)',
  )
  .action((options) => {
    const stack = StackSchema.parse(options.stack);
    const flow = FlowSchema.parse(options.flow);
    const steps = scaffoldIntegration(stack as Stack, flow as Flow);
    console.log(JSON.stringify(steps, null, 2));
  });
