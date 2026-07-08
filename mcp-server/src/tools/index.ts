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
      'Detects the project stack (web-react, react-native, node-backend, fastapi), package manager, existing OTPless SDK packages, and detected auth flows. Run this first before scaffold or docs.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_docs',
    description:
      'Returns scoped OTPless documentation with code snippets from the bundled docs index. Use after scaffold to get implementation details. Call with stack="unknown" and flow="unknown" to get the full list of supported queries. Stacks: web-react, react-native, node-backend, fastapi. Flows: headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only, token-validation, id-token, webhook. Optional topic narrows results (e.g. "whatsapp", "smart-auth", "jwks").',
    inputSchema: {
      type: 'object',
      properties: {
        stack: {
          type: 'string',
          description:
            'Target stack: web-react, react-native, node-backend, or fastapi',
        },
        flow: {
          type: 'string',
          description:
            'Auth flow: headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only, token-validation, id-token, or webhook',
        },
        topic: {
          type: 'string',
          description:
            'Optional topic to narrow results (e.g. whatsapp, smart-auth, jwks, session)',
        },
      },
      required: ['stack', 'flow'],
    },
  },
  {
    name: 'scaffold_integration',
    description:
      'Generates step-by-step implementation instructions for integrating OTPless. Returns target files, actions, env vars, dashboard notes, docs citations, and expected evidence. Stacks: web-react, react-native, node-backend, fastapi. Flows: headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only, token-validation, id-token, webhook.',
    inputSchema: {
      type: 'object',
      properties: {
        stack: {
          type: 'string',
          description:
            'Target stack: web-react, react-native, node-backend, or fastapi',
        },
        flow: {
          type: 'string',
          description:
            'Auth flow: headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only, token-validation, id-token, or webhook',
        },
      },
      required: ['stack', 'flow'],
    },
  },
  {
    name: 'generate_verification_playbook',
    description:
      'Generates a verification checklist to confirm OTPless integration correctness. Checks callback handling, secret exposure, native configs (Android/iOS), commitResponse calls, HMAC webhook verification, and more.',
    inputSchema: {
      type: 'object',
      properties: {
        stack: {
          type: 'string',
          description:
            'Target stack: web-react, react-native, node-backend, or fastapi',
        },
        flow: {
          type: 'string',
          description:
            'Auth flow: headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only, token-validation, id-token, or webhook',
        },
      },
      required: ['stack', 'flow'],
    },
  },
  {
    name: 'run_live_test',
    description:
      'Runs live validation tests against OTPless APIs. Test types: "token" (validates opaque token), "id-token" (verifies JWT via JWKS), "webhook-signature" (generates HMAC-SHA256). Requires real credentials.',
    inputSchema: {
      type: 'object',
      properties: {
        testType: {
          type: 'string',
          description: 'Test type: token, id-token, or webhook-signature',
        },
        inputs: {
          type: 'object',
          additionalProperties: { type: 'string' },
          description:
            'Inputs for the test. token: {token, clientId, clientSecret}. id-token: {idToken, appId}. webhook-signature: {secret, fixture}.',
        },
      },
      required: ['testType', 'inputs'],
    },
  },
  {
    name: 'lookup_error',
    description:
      'Looks up OTPless error codes with likely causes, docs links, next checks, and suggested fixes. Surfaces: api, sdk, sna, android, telecom. Example: surface=sna, error_code=SP40003.',
    inputSchema: {
      type: 'object',
      properties: {
        surface: {
          type: 'string',
          description: 'Error surface: api, sdk, sna, android, or telecom',
        },
        endpoint: { type: 'string', description: 'Endpoint or flow context' },
        http_status: { type: 'number', description: 'HTTP status code' },
        error_code: {
          type: 'string',
          description: 'OTPless error code (e.g. 7301, SP40003, 9106)',
        },
      },
      required: ['surface', 'endpoint', 'http_status', 'error_code'],
    },
  },
  {
    name: 'run_optional_checks',
    description:
      'Runs automated machine checks against the codebase: package presence/version, secret exposure scanning, env var config, Android manifest verification, iOS plist checks, and commitResponse() presence.',
    inputSchema: {
      type: 'object',
      properties: {
        stack: {
          type: 'string',
          description:
            'Target stack: web-react, react-native, node-backend, or fastapi',
        },
        flow: {
          type: 'string',
          description:
            'Auth flow: headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only, token-validation, id-token, or webhook',
        },
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
