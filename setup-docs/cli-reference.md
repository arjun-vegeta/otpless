# CLI Reference

## Installation

```bash
npx otpless-cli detect
```

Or install globally:

```bash
npm install -g otpless-cli
```

## Commands

### detect

Scans your codebase and determines your stack, package manager, existing OTPless SDKs, and detected flows.

```bash
otpless-cli detect
```

### docs

Retrieves scoped documentation from the bundled docs index. No web search needed.

```bash
otpless-cli docs --stack <stack> --flow <flow> [--topic <topic>]
```

Examples:
```bash
otpless-cli docs --stack web-react --flow oauth --topic whatsapp
otpless-cli docs --stack react-native --flow sna-only
otpless-cli docs --stack fastapi --flow token-validation
```

### scaffold

Generates step-by-step implementation instructions for a given stack/flow combination.

```bash
otpless-cli scaffold --stack <stack> --flow <flow>
```

Examples:
```bash
otpless-cli scaffold --stack react-native --flow sna-only
otpless-cli scaffold --stack fastapi --flow webhook
otpless-cli scaffold --stack web-react --flow headless
otpless-cli scaffold --stack node-backend --flow token-validation
```

### verify

Generates a verification playbook, or runs automated machine checks against your codebase.

```bash
otpless-cli verify --stack <stack> --flow <flow>
otpless-cli verify --stack <stack> --flow <flow> --run-checks
```

Machine checks include:
- Package presence and version detection
- Secret exposure scanning in frontend files
- Environment variable configuration
- Android manifest verification (React Native)
- iOS Info.plist and Swift bridge verification (React Native)
- `commitResponse()` call presence in callbacks

### errors

Looks up OTPless error codes with causes, fixes, and next steps.

```bash
otpless-cli errors --surface <surface> --endpoint <endpoint> --http-status <code> --error-code <code>
```

Surfaces: `api`, `sdk`, `sna`, `android`, `telecom`

Examples:
```bash
otpless-cli errors --surface api --endpoint /token --http-status 400 --error-code 7301
otpless-cli errors --surface sna --endpoint /auth --http-status 400 --error-code SP40003
otpless-cli errors --surface sdk --endpoint /init --http-status 400 --error-code 7001
```

### live-test

Runs live validation tests. Requires real credentials.

**Token validation:**
```bash
otpless-cli live-test token --token "YOUR_TOKEN" --client-id "YOUR_ID" --client-secret "YOUR_SECRET"
```

**ID token verification (JWKS):**
```bash
otpless-cli live-test id-token --id-token "YOUR_JWT" --app-id "YOUR_APP_ID"
```

**Webhook signature generation:**
```bash
otpless-cli live-test webhook-signature --secret "YOUR_SECRET" --fixture ./payload.json
```

## Supported Stacks & Flows

| Stack | Flows |
|-------|-------|
| `web-react` | headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only |
| `react-native` | headless, prebuilt-ui, phone-otp, oauth, magic-link, sna-only |
| `node-backend` | token-validation, id-token, webhook, phone-otp, oauth, magic-link, sna-only |
| `fastapi` | token-validation, id-token, webhook, phone-otp, oauth, magic-link, sna-only |
