import { Command } from 'commander';
import { lookupError } from '../engine/errors';
import { ErrorContextSchema } from '../types';

export const errorsCommand = new Command('errors')
  .description('Endpoint-aware error lookup.')
  .requiredOption('--surface <surface>', 'Surface (e.g., api, web-sdk)')
  .requiredOption('--endpoint <endpoint>', 'Endpoint or flow')
  .requiredOption('--http-status <status>', 'HTTP status code', parseInt)
  .requiredOption('--error-code <code>', 'OTPless error code')
  .option('--message <message>', 'Error message')
  .action((options) => {
    const context = ErrorContextSchema.parse({
      surface: options.surface,
      endpoint: options.endpoint,
      http_status: options.httpStatus,
      error_code: options.errorCode,
      message: options.message,
    });

    const result = lookupError(context);

    if (result) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.error('Error not found in knowledge base.');
      process.exit(1);
    }
  });
