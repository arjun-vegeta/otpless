# Usage Examples

## Example Prompts for Your AI Agent

Once you have the MCP server configured (or the CLI installed), just tell your agent what you want. Here are some example prompts:

### React Native + SNA

> "Integrate OTPless Silent Network Authentication into my React Native app. Use the otpless-cli to detect my stack, scaffold the integration, and verify everything is correct."

### FastAPI + Webhook

> "Add OTPless webhook verification to my FastAPI backend. Use the otpless-cli tools to get the implementation steps and verify the HMAC signature handling."

### React + WhatsApp Login

> "Add WhatsApp login to my React app using OTPless. Use the otpless-cli to scaffold the OAuth flow and show me what I need."

### Node.js + Token Validation

> "Set up OTPless token validation in my Express backend. Use otpless-cli to scaffold and verify the integration."

### Troubleshooting

> "I'm getting error code 7301 from the OTPless API on the /token endpoint. Use otpless-cli errors to look it up."

> "SNA is returning SP40003 on my React Native app. What does it mean and how do I fix it?"

### Full Integration (Frontend + Backend)

> "I need to add OTPless authentication to my project. I have a React Native frontend and FastAPI backend. Use the otpless-cli to detect my stack, scaffold both frontend (sna-only) and backend (token-validation), then verify everything."

## CLI Workflow Example

Here's what a full manual workflow looks like:

```bash
# 1. Detect your stack
otpless-cli detect

# 2. Get relevant docs
otpless-cli docs --stack react-native --flow sna-only

# 3. Generate scaffold steps
otpless-cli scaffold --stack react-native --flow sna-only

# 4. After implementing, generate verification playbook
otpless-cli verify --stack react-native --flow sna-only

# 5. Run automated checks
otpless-cli verify --stack react-native --flow sna-only --run-checks

# 6. If something goes wrong, look up errors
otpless-cli errors --surface sna --endpoint /auth --http-status 400 --error-code SP40003

# 7. Validate with real credentials
otpless-cli live-test token --token "..." --client-id "..." --client-secret "..."
```
