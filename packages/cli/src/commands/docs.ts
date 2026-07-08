import { Command } from 'commander';
import { getDocs, getDocByUrl } from '../engine/docs';
import { Stack, Flow, StackSchema, FlowSchema } from '../types';

export const docsCommand = new Command('docs')
  .description('Returns scoped OTPless docs packets from the local docs index.')
  .option(
    '--stack <stack>',
    'The tech stack (e.g., web-react, node-backend)',
  )
  .option(
    '--flow <flow>',
    'The flow (e.g., headless, token-validation)',
  )
  .option('--topic <topic>', 'Specific topic to search for')
  .option('--url <url>', 'Fetch a specific doc by its URL or path')
  .action((options) => {
    if (options.url) {
      const docs = getDocByUrl(options.url);
      console.log(JSON.stringify(docs, null, 2));
      return;
    }

    if (!options.stack || !options.flow) {
      console.error(
        JSON.stringify(
          { error: 'Either --url or both --stack and --flow are required.' },
          null,
          2,
        ),
      );
      process.exit(1);
    }

    const stack = StackSchema.parse(options.stack);
    const flow = FlowSchema.parse(options.flow);
    const docs = getDocs(stack as Stack, flow as Flow, options.topic);
    console.log(JSON.stringify(docs, null, 2));
  });
