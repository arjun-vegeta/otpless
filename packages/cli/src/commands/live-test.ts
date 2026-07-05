import { Command } from 'commander';
import { runLiveTest } from '../engine/live-test';

export const liveTestCommand = new Command('live-test')
  .description(
    'Runs docs-backed smoke tests only when the user supplies real required inputs.',
  )
  .argument('<testType>', 'Type of test (token, id-token, webhook-signature)')
  .option('--token <token>', 'Token for validation')
  .option('--client-id <clientId>', 'Client ID')
  .option('--client-secret <clientSecret>', 'Client Secret')
  .option('--id-token <idToken>', 'ID Token')
  .option('--app-id <appId>', 'App ID')
  .option('--secret <secret>', 'Webhook secret')
  .option('--fixture <fixture>', 'Fixture payload file path')
  .action(async (testType, options) => {
    const result = await runLiveTest(testType, options);
    console.log(JSON.stringify(result, null, 2));
  });
