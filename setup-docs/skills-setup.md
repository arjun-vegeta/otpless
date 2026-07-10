# Agent Skills Setup

Skills are instruction files that tell your AI agent how to use the OTPless CLI/MCP tools correctly. They contain the workflow, rules, and integration notes.

## Claude Code

```bash
mkdir -p .claude
cp node_modules/otpless-cli/skills/claude/SKILL.md .claude/SKILL.md
```

Or if using the repo directly:

```bash
mkdir -p .claude
cp skills/claude/SKILL.md .claude/SKILL.md
```

## Codex (OpenAI)

```bash
mkdir -p .codex
cp node_modules/otpless-cli/skills/codex/SKILL.md .codex/SKILL.md
```

Or if using the repo directly:

```bash
mkdir -p .codex
cp skills/codex/SKILL.md .codex/SKILL.md
```

## What the Skill Teaches the Agent

1. Never use web search for OTPless docs — all documentation is bundled locally
2. Follow the workflow: detect → docs → scaffold → verify → troubleshoot
3. Handle SNA (Silent Network Auth), Smart Auth fallbacks, webhook HMAC verification, and token security correctly
4. Use `--run-checks` for automated machine verification
5. Hand off to a separate agent session for independent review

## Supported Stacks

| Stack          | Description                              |
| -------------- | ---------------------------------------- |
| `web-react`    | React / Next.js web apps                 |
| `react-native` | React Native mobile apps (Android + iOS) |
| `android`      | Android Native (Kotlin / Java)           |
| `ios`          | iOS Native (Swift / Objective-C)         |
| `node-backend` | Node.js / Express backend                |
| `fastapi`      | Python FastAPI backend                   |

## Supported Flows

| Flow                            | Frontend | Backend |
| ------------------------------- | :------: | :-----: |
| `headless`                      |   yes    |    —    |
| `prebuilt-ui`                   |   yes    |    —    |
| `phone-otp`                     |   yes    |   yes   |
| `oauth` (WhatsApp/Google/Apple) |   yes    |   yes   |
| `magic-link`                    |   yes    |   yes   |
| `sna-only`                      |   yes    |   yes   |
| `token-validation`              |    —     |   yes   |
| `id-token`                      |    —     |   yes   |
| `webhook`                       |    —     |   yes   |
