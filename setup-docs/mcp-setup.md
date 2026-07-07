# MCP Server Setup

The MCP (Model Context Protocol) server lets AI tools call OTPless CLI capabilities directly over stdio.

## Configuration by Tool

### Claude Code

Add to `.mcp.json` in your project root (or `~/.claude/mcp.json` for global):

```json
{
  "mcpServers": {
    "otpless": {
      "command": "npx",
      "args": ["-y", "-p", "otpless-cli", "otpless-cli-mcp"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "otpless": {
      "command": "npx",
      "args": ["-y", "-p", "otpless-cli", "otpless-cli-mcp"]
    }
  }
}
```

### Kiro

Add to `.kiro/settings/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "otpless": {
      "command": "npx",
      "args": ["-y", "-p", "otpless-cli", "otpless-cli-mcp"]
    }
  }
}
```

### Codex (OpenAI)

Codex uses CLI commands directly. No MCP config needed — just ensure the package is available:

```bash
npm install -g otpless-cli
```

## Available MCP Tools

| Tool | Description |
|------|-------------|
| `detect_stack` | Detect project stack and existing OTPless packages |
| `get_docs` | Retrieve scoped documentation citations |
| `scaffold_integration` | Generate implementation steps for a stack/flow |
| `generate_verification_playbook` | Get verification checklist |
| `run_optional_checks` | Run machine checks against the codebase |
| `run_live_test` | Execute live API tests |
| `lookup_error` | Look up error codes with causes and fixes |

## Running from a Local Clone

If you've cloned the repo instead of installing via npm, point your MCP config to the compiled server:

```json
{
  "mcpServers": {
    "otpless": {
      "command": "node",
      "args": ["./dist/mcp-server/src/server.js"]
    }
  }
}
```

Make sure to run `npm run build` first.
