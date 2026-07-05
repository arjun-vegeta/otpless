import { Command } from 'commander';
import { detectStack } from '../engine/detect';

export const detectCommand = new Command('detect')
  .description(
    'Detects supported stacks and existing OTPless integration state.',
  )
  .action(() => {
    const tuple = detectStack(process.cwd());
    console.log(JSON.stringify(tuple, null, 2));
  });
