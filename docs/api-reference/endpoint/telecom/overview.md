> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Query telecom-level signals for a phone number — SIM swap history, call forwarding status, and enriched phone metadata.

## Overview

OTPless Telecom Intelligence APIs let you query carrier-level signals for a phone number directly from your backend. Use these signals as a pre-authentication risk layer alongside your primary auth flow.

**Available APIs:**

- **SIM Swap Check** — Detect whether a phone number's SIM was recently swapped. A recent swap can indicate a SIM-swap attack targeting your users.
- **Call Forwarding Check** — Check whether call forwarding is active on a number. Active forwarding can divert calls (including voice OTPs) to an attacker.

## Authentication

All requests require your OTPless credentials as request headers:

| Header         | Description                |
| -------------- | -------------------------- |
| `clientId`     | Your OTPless Client ID     |
| `clientSecret` | Your OTPless Client Secret |

These are the same credentials you use for other OTPless APIs. Do not expose them in client-side code.

## Base URL

```
https://platform.otpless.app/v1/telecom/
```

## API reference

| Endpoint                            | Method | Purpose                             |
| ----------------------------------- | ------ | ----------------------------------- |
| `/v1/telecom/sim-swap-check`        | `POST` | Check if a SIM was recently swapped |
| `/v1/telecom/call-forwarding-check` | `POST` | Check if call forwarding is active  |

## HTTP status codes

| HTTP  | Meaning                                                  |
| ----- | -------------------------------------------------------- |
| `200` | Request accepted. Check `success` in the response body.  |
| `400` | Invalid request or validation error.                     |
| `401` | Authentication failure — invalid or missing credentials. |

## Error model

- **HTTP 4xx:** Request rejected. Body is an error object only (`message`, `errorCode`, `description`).
- **HTTP 200 with `success: false`:** Request accepted, but the check could not be completed. Inspect the `error` object in the body.

See the [error reference](/api-reference/endpoint/telecom/errors) for the full list of error codes.

## Endpoints

- [SIM Swap Check](/api-reference/endpoint/telecom/sim-swap-check) — `POST /v1/telecom/sim-swap-check`
- [Call Forwarding Check](/api-reference/endpoint/telecom/call-forwarding-check) — `POST /v1/telecom/call-forwarding-check`

## Support

For access, credentials, or questions about these APIs, contact [OTPless support](https://otpless.com/support) or refer to your onboarding documentation.
