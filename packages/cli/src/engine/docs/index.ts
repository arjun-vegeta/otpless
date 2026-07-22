import * as fs from 'fs';
import * as path from 'path';
import { Stack, Flow } from '../../types';
import { ingestDocs, searchIndex } from '../ingest';

export interface DocCitation {
  title: string;
  url: string;
  content: string;
}

export function getDocsDir(): string {
  let current = __dirname;
  while (current !== path.dirname(current)) {
    const possibleDocs = path.join(current, 'docs');
    const possiblePkg = path.join(current, 'package.json');
    if (fs.existsSync(possiblePkg) && fs.existsSync(possibleDocs)) {
      return possibleDocs;
    }
    current = path.dirname(current);
  }
  return path.resolve(process.cwd(), 'docs');
}

export function getDocByUrl(url: string): DocCitation[] {
  const docsDir = getDocsDir();

  // Extract relative path from URL like "https://otpless.com/docs/sna/android-sdk.md"
  let relativePath = url;
  if (url.includes('otpless.com/docs/')) {
    relativePath = url.split('otpless.com/docs/')[1];
  } else if (url.startsWith('file://')) {
    // Handle file:// URLs from the index
    const filePath = url.replace('file://', '').split('#')[0];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const title =
        content.match(/^#\s+(.+)$/m)?.[1] || path.basename(filePath, '.md');
      return [{ title, url, content }];
    }
    return [
      {
        title: 'Doc Not Found',
        url,
        content: `File not found: ${filePath}`,
      },
    ];
  }

  // Try to find the file in the docs directory
  const fullPath = path.join(docsDir, relativePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const title =
      content.match(/^#\s+(.+)$/m)?.[1] || path.basename(fullPath, '.md');
    return [{ title, url, content }];
  }

  // Try without .md extension
  const withMd = fullPath.endsWith('.md') ? fullPath : fullPath + '.md';
  if (fs.existsSync(withMd)) {
    const content = fs.readFileSync(withMd, 'utf-8');
    const title =
      content.match(/^#\s+(.+)$/m)?.[1] || path.basename(withMd, '.md');
    return [{ title, url, content }];
  }

  return [
    {
      title: 'Doc Not Found',
      url,
      content: `No doc found for path: ${relativePath}. Use get_docs with stack and flow params instead.`,
    },
  ];
}

function getFlowDescription(stack: string, flow: string): string {
  const descriptions: Record<string, string> = {
    headless: 'Custom UI with SDK callbacks (phone, email, social)',
    'prebuilt-ui': 'OTPless managed login UI component',
    'phone-otp': 'Phone number OTP verification',
    oauth: 'Social login (WhatsApp, Google, Apple, etc.)',
    'magic-link': 'Passwordless magic link authentication',
    'sna-only': 'Silent Network Authentication (carrier-based)',
    'token-validation': 'Server-side opaque token verification via OTPless API',
    'id-token': 'Local JWT verification using JWKS (RS256)',
    webhook: 'Webhook signature verification (HMAC-SHA256)',
  };
  return descriptions[flow] || flow;
}

export function getDocs(
  stack: Stack,
  flow: Flow,
  _topic?: string,
): DocCitation[] {
  // If stack is 'unknown' and flow is 'unknown', return the full list of supported queries
  if (stack === 'unknown' && flow === 'unknown') {
    return [
      {
        title: 'Supported Docs Queries',
        url: 'https://otpless.com/docs',
        content: JSON.stringify(
          {
            stacks: [
              'web-react',
              'react-native',
              'android',
              'ios',
              'node-backend',
              'fastapi',
              'angular',
              'vue',
              'javascript',
              'flutter-web',
              'flutter',
              'ionic',
              'cmp',
              'django',
              'flask',
              'laravel',
              'spring',
              'go',
              'rails',
              'wordpress',
              'shopify',
              'magento',
            ],
            flows: {
              frontend: [
                'headless',
                'prebuilt-ui',
                'phone-otp',
                'oauth',
                'magic-link',
                'sna-only',
              ],
              backend: [
                'token-validation',
                'id-token',
                'webhook',
                'phone-otp',
                'oauth',
                'magic-link',
                'sna-only',
              ],
            },
            topics: [
              'whatsapp',
              'smart-auth',
              'jwks',
              'session',
              'sna',
              'webhook',
              'otp',
              'magiclink',
            ],
            usage:
              'Call with stack + flow to get scoped docs. Add topic to narrow results. Call with a specific stack + flow="unknown" to see flows available for that stack.',
            examples: [
              { stack: 'react-native', flow: 'sna-only' },
              { stack: 'web-react', flow: 'oauth', topic: 'whatsapp' },
              { stack: 'fastapi', flow: 'token-validation' },
              { stack: 'node-backend', flow: 'webhook' },
            ],
          },
          null,
          2,
        ),
      },
    ];
  }

  // If flow is 'unknown' but stack is known, return flows available for that stack
  if (flow === 'unknown' && stack !== 'unknown') {
    const frontendFlows = [
      'headless',
      'prebuilt-ui',
      'phone-otp',
      'oauth',
      'magic-link',
      'sna-only',
    ];
    const backendFlows = [
      'token-validation',
      'id-token',
      'webhook',
      'phone-otp',
      'oauth',
      'magic-link',
      'sna-only',
    ];

    const isFrontend =
      stack === 'web-react' ||
      stack === 'react-native' ||
      stack === 'android' ||
      stack === 'ios' ||
      stack === 'angular' ||
      stack === 'vue' ||
      stack === 'javascript' ||
      stack === 'flutter-web' ||
      stack === 'flutter' ||
      stack === 'ionic' ||
      stack === 'cmp';
    const flows = isFrontend ? frontendFlows : backendFlows;

    const examples = flows.map((f) => ({
      stack,
      flow: f,
      description: getFlowDescription(stack, f),
    }));

    return [
      {
        title: `Available flows for ${stack}`,
        url: 'https://otpless.com/docs',
        content: JSON.stringify(
          {
            stack,
            available_flows: flows,
            queries: examples,
            topics: [
              'whatsapp',
              'smart-auth',
              'jwks',
              'session',
              'sna',
              'webhook',
              'otp',
              'magiclink',
            ],
            usage: `Call get_docs with stack="${stack}" and one of the flows above.`,
          },
          null,
          2,
        ),
      },
    ];
  }

  ingestDocs();

  let query = `${stack} ${flow} ${_topic || ''}`.trim();

  const isBackendStack =
    stack === 'node-backend' ||
    stack === 'fastapi' ||
    stack === 'django' ||
    stack === 'flask' ||
    stack === 'laravel' ||
    stack === 'spring' ||
    stack === 'go' ||
    stack === 'rails';

  if (isBackendStack) {
    if (flow === 'token-validation') {
      query += ' verifytoken verify-token-with-secure-data api-reference';
    } else if (flow === 'phone-otp') {
      query += ' initiate otp verify send-otp-phone api-reference sign-in';
    } else if (flow === 'magic-link') {
      query += ' initiate magiclink send-magiclink-phone api-reference sign-in';
    } else if (flow === 'oauth') {
      query += ' initiate oauth whatsapp api-reference sign-in';
    } else if (flow === 'webhook') {
      query += ' webhook signature hmac';
    }
  }

  const isWebStack =
    stack === 'web-react' ||
    stack === 'angular' ||
    stack === 'vue' ||
    stack === 'javascript' ||
    stack === 'flutter-web';

  // Augment web sna-only to prioritize the web SNA guide
  if (isWebStack && flow === 'sna-only') {
    query += ' sna-web smart-auth';
  }

  const results = searchIndex(query, 5, _topic);

  if (results.length === 0) {
    return [
      {
        title: 'Unsupported Stack/Flow or Docs Not Found',
        url: 'https://otpless.com/docs',
        content:
          'No exact matches found for this stack/flow in the local docs.',
      },
    ];
  }

  return results.map((r) => ({
    title: r.title,
    url: r.url,
    content: r.content,
  }));
}
