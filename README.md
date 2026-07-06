# OTPless CLI & MCP Server

> **Disclaimer:** This is an **unofficial**, community-built tool and is **not affiliated with, endorsed by, or maintained by OTPless**. For official documentation and support, visit:
> - [OTPless Website](https://otpless.com)
> - [Official Documentation](https://otpless.com/docs)
> - [OTPless Dashboard](https://otpless.com/dashboard)

The ultimate CLI tool and MCP (Model Context Protocol) Server for integrating OTPless authentication natively — covering WhatsApp login, Silent Network Authentication (SNA), Phone OTP, Social OAuth, Magic Links, and more.

## Installation

You can run the CLI immediately using `npx`:

```bash
npx otpless-cli detect
```

Or install it globally:

```bash
npm install -g otpless-cli
otpless-cli detect
```

## Supported Stacks & Flows

| Stack | Flows |
|-------|-------|
| `web-react` | headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only |
| `react-native` | headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only |
| `node-backend` | token-validation, id-token, webhook, phone-otp, oauth, magic-link, sna-only |
| `fastapi` | token-validation, id-token, webhook, phone-otp, oauth, magic-link, sna-only |

## Features

- **Detect:** Automatically scans your codebase (`package.json`, `requirements.txt`, etc.) and determines if you are using React, React Native, Node, Next.js, or FastAPI. Also detects existing OTPless SDK packages and their versions.
- **Docs:** Retrieve precise markdown and OpenAPI citations directly from the local `docs/` index (No web search required for AI agents!).
- **Scaffold:** Generates step-by-step target files, required env vars, and expected logic to build an integration for 9 supported V1 flows — including SNA (Create API → SDK → Status Check), WhatsApp OAuth, Smart Auth with fallback, and webhook HMAC verification.
- **Verify:** Produces an evidence playbook for your agent to execute against your codebase to verify there are no exposed secrets, proper callback states (`commitResponse`), valid HMAC webhooks, and correct Android/iOS native configs. Also runs optional machine checks (`--run-checks`).
- **Errors:** Enter an endpoint, surface, and error code to instantly resolve what went wrong. Covers 5 surfaces: `api`, `sdk`, `sna`, `android`, `telecom` with ~30 error codes.
- **Live Testing**: Sends actual network requests to `https://user-auth.otpless.app` and validates ID Tokens locally via official JWKS. Supports token validation, ID token signature verification, and webhook signature generation.

## Usage Examples

### 1. Detect your current stack

```bash
otpless-cli detect
```

### 2. Scaffold a React Native SNA integration

```bash
otpless-cli scaffold --stack react-native --flow sna-only
```

### 3. Scaffold a FastAPI webhook handler

```bash
otpless-cli scaffold --stack fastapi --flow webhook
```

### 4. Get docs for WhatsApp/OAuth integration

```bash
otpless-cli docs --stack web-react --flow oauth --topic whatsapp
```

### 5. Verify your React Native integration

```bash
otpless-cli verify --stack react-native --flow headless
```

Run machine checks against your codebase:

```bash
otpless-cli verify --stack react-native --flow headless --run-checks
```

### 6. Troubleshoot an API error

```bash
otpless-cli errors --surface api --endpoint /token --http-status 400 --error-code 7301
```

Troubleshoot SNA carrier errors:

```bash
otpless-cli errors --surface sna --endpoint /auth --http-status 400 --error-code SP40003
```

### 7. Validate a generated opaque token

```bash
otpless-cli live-test token --token "YOUR_TOKEN" --client-id "YOUR_ID" --client-secret "YOUR_SECRET"
```

Verify an ID token via JWKS:

```bash
otpless-cli live-test id-token --id-token "YOUR_JWT" --app-id "YOUR_APP_ID"
```

Generate a webhook signature for testing:

```bash
otpless-cli live-test webhook-signature --secret "YOUR_SECRET" --fixture ./payload.json
```

## MCP Server

AI tools like Claude Code, Codex, Cursor, and Kiro can natively invoke the CLI capabilities by connecting to the MCP Server over `stdio`.

### Setup by Tool

<details>
<summary><strong>Claude Code</strong></summary>

Add to your project's `.mcp.json` (or `~/.claude/mcp.json` for global):

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

</details>

<details>
<summary><strong>Cursor</strong></summary>

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

</details>

<details>
<summary><strong>Kiro</strong></summary>

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

</details>

<details>
<summary><strong>Codex (OpenAI)</strong></summary>

Codex uses CLI commands directly. No MCP config needed — just ensure the package is available:

```bash
npm install -g otpless-cli
```

Then reference the skill file (see below).

</details>

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `detect_stack` | Detect project stack and existing OTPless packages |
| `get_docs` | Retrieve scoped documentation citations |
| `scaffold_integration` | Generate implementation steps for a stack/flow |
| `generate_verification_playbook` | Get verification checklist |
| `run_optional_checks` | Run machine checks against the codebase |
| `run_live_test` | Execute live API tests |
| `lookup_error` | Look up error codes with causes and fixes |

(Note: If running from a local clone, point to the compiled `dist/mcp-server/src/server.js` instead of using npx).

## Agent Skills

Skills tell AI agents how to use the CLI/MCP tools effectively. Copy the appropriate skill file into your project:

### Claude Code

```bash
mkdir -p .claude
cp node_modules/otpless-cli/skills/claude/SKILL.md .claude/SKILL.md
```

Or if using the repo directly:

```bash
mkdir -p .claude
cp skills/claude/SKILL.md .claude/SKILL.md
```

### Codex (OpenAI)

```bash
mkdir -p .codex
cp node_modules/otpless-cli/skills/codex/SKILL.md .codex/SKILL.md
```

Or if using the repo directly:

```bash
mkdir -p .codex
cp skills/codex/SKILL.md .codex/SKILL.md
```

### What the skill does

The skill file instructs the agent to:
1. Never use web search for OTPless docs (all docs are bundled)
2. Follow the detect → docs → scaffold → verify → troubleshoot workflow
3. Handle SNA, Smart Auth fallbacks, webhook HMAC, and token security correctly
4. Use `--run-checks` for automated verification
5. Hand off to a separate agent session for independent review

