import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import * as path from 'path';

const MCP_PATH = path.resolve(__dirname, '../mcp-server/src/server.ts');

describe('MCP Server E2E', () => {
  it('boots up and listens on stdio without crashing', () => {
    // We run the server and immediately pass EOF to gracefully shut it down,
    // or just let it time out quickly. Since it's stdio, we can pipe empty input.
    try {
      execSync(`echo "" | npx vite-node ${MCP_PATH}`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 2000, // force exit after 2s if it hangs waiting for stdin
      });
      // The server logs to stderr "MCP Server running on stdio"
    } catch (e: unknown) {
      const err = e as { stdout?: string; stderr?: string; message: string };
      // It might exit due to timeout or EOF, but it should have printed the boot message
      expect(err.stderr || err.stdout).toContain('MCP Server running on stdio');
    }
  });
});
