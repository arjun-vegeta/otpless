import { Command } from 'commander';
import { getDocs } from '../engine/docs';
import { Stack, Flow, StackSchema, FlowSchema } from '../types';

export const docsCommand = new Command('docs')
  .description('Returns scoped OTPless docs packets from the local docs index.')
  .requiredOption(
    '--stack <stack>',
    'The tech stack (e.g., web-react, node-backend)',
  )
  .requiredOption(
    '--flow <flow>',
    'The flow (e.g., headless, token-validation)',
  )
  .option('--topic <topic>', 'Specific topic to search for')
  .action((options) => {
    const stack = StackSchema.parse(options.stack);
    const flow = FlowSchema.parse(options.flow);
    const docs = getDocs(stack as Stack, flow as Flow, options.topic);
    console.log(JSON.stringify(docs, null, 2));
  });
