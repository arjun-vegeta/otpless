import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { detectStack } from '../../../packages/cli/src/engine/detect';
import { getDocs } from '../../../packages/cli/src/engine/docs';
import { scaffoldIntegration } from '../../../packages/cli/src/engine/scaffold';
import {
  generatePlaybook,
  runOptionalChecks,
} from '../../../packages/cli/src/engine/verify';
import { runLiveTest } from '../../../packages/cli/src/engine/live-test';
import { lookupError } from '../../../packages/cli/src/engine/errors';
import { StackSchema, FlowSchema } from '../../../packages/cli/src/types';
import { z } from 'zod';

export const OTplessTools: Tool[] = [
  {
    name: 'detect_stack',
    description:
      'Detects supported stacks and existing OTPless integration state',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_docs',
    description:
      'Returns scoped OTPless docs packets from the local docs index',
    inputSchema: {
      type: 'object',
      properties: {
        stack: { type: 'string' },
        flow: { type: 'string' },
        topic: { type: 'string' },
      },
      required: ['stack', 'flow'],
    },
  },
  {
    name: 'scaffold_integration',
    description: 'Generates implementation instructions',
    inputSchema: {
      type: 'object',
      properties: {
        stack: { type: 'string' },
        flow: { type: 'string' },
      },
      required: ['stack', 'flow'],
    },
  },
  {
    name: 'generate_verification_playbook',
    description:
      'Generates a verification playbook and evidence report template',
    inputSchema: {
      type: 'object',
      properties: {
        stack: { type: 'string' },
        flow: { type: 'string' },
      },
      required: ['stack', 'flow'],
    },
  },
  {
    name: 'run_live_test',
    description: 'Runs docs-backed smoke tests',
    inputSchema: {
      type: 'object',
      properties: {
        testType: { type: 'string' },
        inputs: { type: 'object', additionalProperties: { type: 'string' } },
      },
      required: ['testType', 'inputs'],
    },
  },
  {
    name: 'lookup_error',
    description: 'Endpoint-aware error lookup',
    inputSchema: {
      type: 'object',
      properties: {
        surface: { type: 'string' },
        endpoint: { type: 'string' },
        http_status: { type: 'number' },
        error_code: { type: 'string' },
      },
      required: ['surface', 'endpoint', 'http_status', 'error_code'],
    },
  },
  {
    name: 'run_optional_checks',
    description:
      'Runs low-risk machine checks for stack integration verification',
    inputSchema: {
      type: 'object',
      properties: {
        stack: { type: 'string' },
        flow: { type: 'string' },
      },
      required: ['stack', 'flow'],
    },
  },
];

export async function handleCallTool(
  name: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  switch (name) {
    case 'detect_stack':
      return detectStack(process.cwd());
    case 'get_docs': {
      const parsed = z
        .object({
          stack: StackSchema,
          flow: FlowSchema,
          topic: z.string().optional(),
        })
        .parse(args);
      return getDocs(parsed.stack, parsed.flow, parsed.topic);
    }
    case 'scaffold_integration': {
      const parsed = z
        .object({ stack: StackSchema, flow: FlowSchema })
        .parse(args);
      return scaffoldIntegration(parsed.stack, parsed.flow);
    }
    case 'generate_verification_playbook': {
      const parsed = z
        .object({ stack: StackSchema, flow: FlowSchema })
        .parse(args);
      return generatePlaybook(parsed.stack, parsed.flow);
    }
    case 'run_optional_checks': {
      const parsed = z
        .object({ stack: StackSchema, flow: FlowSchema })
        .parse(args);
      return runOptionalChecks(process.cwd(), parsed.stack, parsed.flow);
    }
    case 'run_live_test': {
      const parsed = z
        .object({
          testType: z.string(),
          inputs: z.record(z.string()),
        })
        .parse(args);
      return runLiveTest(parsed.testType, parsed.inputs);
    }
    case 'lookup_error': {
      const parsed = z
        .object({
          surface: z.string(),
          endpoint: z.string(),
          http_status: z.number(),
          error_code: z.string(),
        })
        .parse(args);
      return lookupError(parsed);
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
