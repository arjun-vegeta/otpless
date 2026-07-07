#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { OTplessTools, handleCallTool } from './tools/index.js';

export class McpServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      { name: 'otpless-mcp-server', version: '1.0.0' },
      { capabilities: { tools: {} } },
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: OTplessTools,
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;
        const result = await handleCallTool(name, args || {});

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          isError: false,
        };
      } catch (error: unknown) {
        return {
          content: [
            {
              type: 'text',
              text: error instanceof Error ? error.message : String(error),
            },
          ],
          isError: true,
        };
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP Server running on stdio');
  }
}

// Start server if run directly
if (require.main === module) {
  const server = new McpServer();
  server.start().catch((e) => {
    console.error('Failed to start MCP server:', e);
    process.exit(1);
  });
}
