---
name: otpless
description: OTPless Integration Skill — scaffold, verify, and troubleshoot OTPless auth flows
---

# OTPless Agent Skill

This skill enables coding agents to integrate OTPless authentication into the current workspace using the bundled CLI and MCP tools. It covers WhatsApp login, Silent Network Authentication (SNA), Phone OTP, Social OAuth, Magic Links, token validation, webhooks, and more.

## Available Interfaces

All capabilities are available through both:

- **CLI** — `otpless-cli <command>` (run via `npx otpless-cli` or globally installed)
- **MCP** — Tools exposed over stdio (`detect_stack`, `get_docs`, `scaffold_integration`, `generate_verification_playbook`, `run_optional_checks`, `run_live_test`, `lookup_error`)

Use whichever interface is available in your environment. Examples below use CLI commands.

## Rules

- NEVER use web search for OTPless documentation. All docs are bundled locally.
- Use `otpless-cli docs` or the MCP `get_docs` tool to fetch scoped documentation.
- Always detect the stack first before scaffolding or verifying.
- Always call `commitResponse(response)` in every SDK callback for React Native integrations.
- Never expose `clientId` or `clientSecret` in frontend code. These belong on the backend only.
- For SNA-only flows, the backend Status Check API is the source of truth — not the SDK callback alone.

## Supported Stacks

| Stack | Description |
| --- | --- |
| `web-react` | React / Next.js web apps |
| `angular` | Angular web apps |
| `vue` | Vue.js web apps |
| `javascript` | Vanilla JavaScript / HTML5 apps |
| `flutter-web` | Flutter Web apps |
| `react-native` | React Native mobile apps (Android + iOS) |
| `android` | Android Native (Kotlin / Java) |
| `ios` | iOS Native (Swift / Objective-C) |
| `flutter` | Flutter mobile apps (Android + iOS) |
| `ionic` | Ionic Framework apps |
| `cmp` | Compose Multiplatform / KMP apps |
| `node-backend` | Node.js / Express backend |
| `fastapi` | Python FastAPI backend |
| `django` | Python Django backend |
| `flask` | Python Flask backend |
| `laravel` | PHP Laravel backend |
| `spring` | Java Spring Boot backend |
| `go` | Go HTTP backend |
| `rails` | Ruby on Rails backend |
| `wordpress` | WordPress site / theme / plugin |
| `shopify` | Shopify theme / app |
| `magento` | Magento / Adobe Commerce store |

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

## Workflow

1. **Detect** — Run `otpless-cli detect` to identify the project's stack, package manager, existing OTPless SDKs, and detected flows.

2. **Docs** — Fetch relevant documentation:

   ```bash
   otpless-cli docs --stack <stack> --flow <flow> --topic <topic>
   ```

3. **Scaffold** — Generate implementation steps:

   ```bash
   otpless-cli scaffold --stack <stack> --flow <flow>
   ```

   Follow the returned steps in order: install dependencies, configure native files, implement SDK initialization/callbacks, implement backend endpoints, set env vars.

4. **Verify** — Generate and execute verification playbook:

   ```bash
   otpless-cli verify --stack <stack> --flow <flow>
   otpless-cli verify --stack <stack> --flow <flow> --run-checks
   ```

5. **Troubleshoot** — Look up errors:

   ```bash
   otpless-cli errors --surface <api|sdk|sna|android|telecom> --endpoint <endpoint> --http-status <code> --error-code <code>
   ```

6. **Live Test** — Validate with real credentials:

   ```bash
   otpless-cli live-test token --token "..." --client-id "..." --client-secret "..."
   otpless-cli live-test id-token --id-token "..." --app-id "..."
   otpless-cli live-test webhook-signature --secret "..." --fixture ./payload.json
   ```

7. **Handoff** — After integration, output:
   "For independent review, open a new agent session in this repo and ask: 'Run the OTPless CLI verification playbook for this project using --run-checks. Do not use web search for OTPless docs; use the CLI/MCP docs tools only.'"

## Key Integration Notes

### React Native SNA

- Android: requires `networkSecurityConfig` in AndroidManifest.xml
- iOS: requires NSAppTransportSecurity exception domains (api-csp.airtel.in, v4-api-csp.airtel.in, in-vil.ipification.com, partnerapi.jio.com, 80.in.safr.sekuramobile.com)
- Backend must implement Create API (POST) and poll Status Check API (GET) for final auth result
- Handle AUTH_TERMINATED callback gracefully with fallback UI

### Android Native SNA

- Add `networkSecurityConfig` to `AndroidManifest.xml` pointing to a network security XML that allows cleartext for SNA carrier domains
- Initialize OTPless SDK in `Application.onCreate()` with your App ID
- Use `OtplessView` or the headless SDK callback to receive the auth result
- Backend must poll the Status Check API (GET) for final SNA result — the SDK callback alone is not authoritative
- Handle `AUTH_TERMINATED` with a fallback to OTP or another channel

### iOS Native SNA

- Add NSAppTransportSecurity exception domains in `Info.plist` for SNA carrier endpoints
- Initialize the OTPless SDK in `AppDelegate` with your App ID
- Use the headless delegate/callback to receive auth results
- Backend must poll the Status Check API (GET) for final SNA result
- For Swift Package Manager: add the OTPless iOS SDK package via Xcode or `Package.swift`
- For CocoaPods: add `pod 'OtplessSDK'` to your `Podfile`

### Webhook Verification

- Capture raw request body BEFORE JSON parsing
- Compute HMAC-SHA256(rawBody, secret) and compare against X-Signature header
- Use constant-time comparison to prevent timing attacks

### Smart Auth Fallback

- Handle FALLBACK_TRIGGERED responseType in callbacks
- Extract deliveryChannel from the fallback response to update UI (e.g., "OTP sent via SMS")

### Token Security

- Opaque tokens expire after 5 minutes — validate immediately
- ID tokens use RS256 — always verify against JWKS at https://otpless.com/.well-known/jwks
- Validate issuer (https://otpless.com), audience (your App ID), and expiration claims
