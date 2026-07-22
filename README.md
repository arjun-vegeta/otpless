# OTPless CLI & MCP Server

> **Disclaimer:** This is an **unofficial**, community-built tool and is **not affiliated with, endorsed by, or maintained by OTPless**. For official documentation and support, visit:
>
> - [OTPless Website](https://otpless.com)
> - [Official Documentation](https://otpless.com/docs)
> - [OTPless Dashboard](https://otpless.com/dashboard)

A CLI and MCP tool that lets AI agents (Claude Code, Codex, Cursor, Kiro) integrate OTPless authentication into your project — WhatsApp login, SNA, Phone OTP, Social OAuth, Magic Links, webhooks, and more.

## How It Works

Install it, connect it to your AI agent, and tell the agent to integrate OTPless. The tool gives your agent access to bundled official docs, step-by-step scaffold instructions, verification playbooks, error lookups, and live testing — all without web search.

## Quick Setup

### 1. Install the CLI

```bash
npm install -g otpless-cli
```

Or use it directly without installing:

```bash
npx otpless-cli detect
```

### 2. Add the MCP server to your AI tool

**Claude Code** — add to `.mcp.json`:

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

**Cursor** — add to `.cursor/mcp.json`  
**Kiro** — add to `.kiro/settings/mcp.json`  
(Same JSON as above)

**Codex** — uses the CLI directly, no MCP config needed.

### 3. (Optional) Add the agent skill

```bash
# Claude Code
mkdir -p .claude && cp node_modules/otpless-cli/skills/claude/SKILL.md .claude/SKILL.md

# Codex
mkdir -p .codex && cp node_modules/otpless-cli/skills/codex/SKILL.md .codex/SKILL.md
```

### 4. Tell your agent what you need

Just prompt it. Examples:

> "Integrate OTPless SNA authentication into my React Native app. Use the otpless-cli to detect my stack, scaffold the integration, and verify it."

> "Add WhatsApp login to my React app using OTPless headless SDK."

> "Set up OTPless webhook verification in my FastAPI backend."

> "I'm getting error SP40003 from SNA. Look it up with otpless-cli."

The agent will use the CLI/MCP tools to detect your stack, pull the right docs, scaffold the code, and verify the integration — all automatically.

## What It Supports

| Category | Tech Stacks | Supported Flows |
| --- | --- | --- |
| **Web Apps** | React / Next.js, Angular, Vue.js, Vanilla JavaScript, Flutter Web | headless, prebuilt-ui, phone-otp, oauth, magic-link, sna |
| **Mobile Apps** | React Native, Android Native, iOS Native, Flutter, Ionic, Compose Multiplatform (CMP) | headless, prebuilt-ui, phone-otp, oauth, magic-link, sna |
| **Backend APIs** | Node.js / Express, FastAPI, Django, Flask, Laravel, Spring Boot, Go, Ruby on Rails | token-validation, id-token, webhook, phone-otp, oauth, magic-link, sna |
| **CMS Platforms** | WordPress, Shopify, Magento | script/plugin template, token-validation, webhook |

## Detailed Docs

For full setup instructions, CLI reference, and more:

- [MCP Setup Guide](./setup-docs/mcp-setup.md) — per-tool configuration
- [Skills Setup](./setup-docs/skills-setup.md) — agent skill installation
- [CLI Reference](./setup-docs/cli-reference.md) — all commands and options
- [Usage Examples](./setup-docs/usage-examples.md) — example prompts and workflows
