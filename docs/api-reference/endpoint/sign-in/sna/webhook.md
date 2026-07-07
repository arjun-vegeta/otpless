> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SNA Webhook — Event Reference

> Event reference for the SNA (Silent Network Authentication) webhook. Covers the API flow integration, sample payloads, payload structure, and error codes.

<Note>
  **API Flow** · Version 1.0 · 08 May 2026
</Note>

## Overview

The SNA (Silent Network Authentication) webhook fires whenever a silent auth attempt ends — success or failure. This document covers the **API flow** integration.

## Sample Payloads

<CodeGroup>
  ```json SUCCESS — API flow theme={null}
  {
    "timestamp": 1778101988,
    "eventType": "SNA",
    "data": {
      "correlationId": "dhvl000001",
      "authSessionId": "61BB20A4DE174AEF90E35D4B5ACA14AB",
      "status": "SUCCESS",
      "operator": "AIRTEL",
      "phoneDetail": {
        "operator": "AIRTEL",
        "countryCode": "91",
        "country": "IN",
        "type": "MOBILE",
        "homeOperator": "AIRTEL",
        "location": "India",
        "timeZones": ["Asia/Calcutta"]
      },
      "networkDetail": {
        "continue": {
          "ip": "2401:4900:aabb:f09e::68fa:fe37",
          "operator": "AIRTEL",
          "userAgent": "Chrome/147.0.0.0 Mobile Safari/537.36"
        },
        "callback": {
          "ip": "2401:4900:aabb:f09e::68fa:fe37",
          "operator": "AIRTEL",
          "userAgent": "Chrome/147.0.0.0 Mobile Safari/537.36"
        }
      },
      "authenticationDetails": {
        "phone": {
          "channel": ["SILENT_AUTH"],
          "phoneNumber": "9998914791",
          "countryCode": "+91",
          "method": "SILENT_AUTH",
          "requestId": "78d280caa719472e9acb5adb64124656"
        }
      },
      "metaData": {}
    }
  }
  ```

```json FAILED — API flow (operator mismatch) theme={null}
{
  "timestamp": 1778100344,
  "eventType": "SNA",
  "data": {
    "correlationId": "dhvl000001",
    "authSessionId": "3384083C35F04253A2D1C47B581F2366",
    "status": "FAILED",
    "error": {
      "errorCode": "SP40007",
      "errorMessage": "Operator mismatch"
    },
    "operator": "JIO",
    "phoneDetail": {
      "operator": "JIO",
      "countryCode": "91",
      "country": "IN",
      "type": "MOBILE",
      "homeOperator": "VI",
      "location": "India",
      "timeZones": ["Asia/Calcutta"]
    },
    "networkDetail": {
      "continue": {
        "ip": "2401:4900:aabb:f09e::68fa:fe37",
        "operator": "AIRTEL",
        "userAgent": "Chrome/147.0.0.0 Mobile Safari/537.36"
      }
    },
    "authenticationDetails": {
      "phone": {
        "channel": ["SILENT_AUTH"],
        "phoneNumber": "7069914791",
        "countryCode": "+91",
        "method": "SILENT_AUTH",
        "requestId": "2981807a3556436cb9ea233202c4d70c"
      }
    },
    "metaData": {}
  }
}
```

</CodeGroup>

## Payload Structure

### Top-level fields

| Field       | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| `eventType` | string | Always `"SNA"`                          |
| `timestamp` | long   | Unix epoch seconds                      |
| `data`      | object | Event payload — see `data` fields below |

### `data` fields

| Field                   | Type   | Present     | Description                                                               |
| ----------------------- | ------ | ----------- | ------------------------------------------------------------------------- |
| `authSessionId`         | string | Yes         | Auth session identifier                                                   |
| `correlationId`         | string | nullable    | Merchant-supplied ID — present in API flow only                           |
| `status`                | string | Yes         | `"FAILED"` or `"SUCCESS"`                                                 |
| `error`                 | object | FAILED only | Error detail — omitted on SUCCESS                                         |
| `error.errorCode`       | string | FAILED only | SP codes: string e.g. `"SP40012"`                                         |
| `error.errorMessage`    | string | FAILED only | Human-readable client-facing error message                                |
| `operator`              | string | nullable    | Detected operator e.g. `"JIO"`, `"AIRTEL"`, `"VI"` — null if not detected |
| `phoneDetail`           | object | nullable    | Phone-level detail — null if unavailable                                  |
| `networkDetail`         | object | nullable    | Network-level detail — null if unavailable                                |
| `metaData`              | object | nullable    | Merchant's `clientMetaData` from auth request                             |
| `authenticationDetails` | object | Yes         | Always present — contains the resolved mobile identity                    |

### `authenticationDetails.phone`

| Field         | Type      | Description                               |
| ------------- | --------- | ----------------------------------------- |
| `phoneNumber` | string    | National number without country code      |
| `countryCode` | string    | Calling code with `+` prefix e.g. `"+91"` |
| `channel`     | string\[] | Always `["SILENT_AUTH"]`                  |
| `method`      | string    | Always `"SILENT_AUTH"`                    |
| `requestId`   | string    | Transaction token                         |

### `phoneDetail`

| Field          | Type      | Description                                            |
| -------------- | --------- | ------------------------------------------------------ |
| `operator`     | string    | Network operator name e.g. `"AIRTEL"`, `"JIO"`, `"VI"` |
| `countryCode`  | string    | Calling code without `+` e.g. `"91"`                   |
| `country`      | string    | ISO 3166-1 alpha-2 e.g. `"IN"`                         |
| `type`         | string    | Line type — typically `"MOBILE"`                       |
| `homeOperator` | string    | Home network operator (may differ on roaming/MNP)      |
| `location`     | string    | Human-readable country name                            |
| `timeZones`    | string\[] | Time zones e.g. `["Asia/Calcutta"]`                    |

### `networkDetail`

| Field                | Type   | Description                                       |
| -------------------- | ------ | ------------------------------------------------- |
| `continue.ip`        | string | Client IP at the SNA redirect step (IPv4 or IPv6) |
| `continue.operator`  | string | Network operator detected at the continue step    |
| `continue.userAgent` | string | HTTP client user-agent at the continue step       |
| `callback.ip`        | string | Client IP on the operator callback                |
| `callback.operator`  | string | Network operator at callback time                 |
| `callback.userAgent` | string | HTTP client user-agent at callback time           |

## X-Signature — Webhook Request Signing

Every outbound webhook request carries an `X-Signature` header so receivers can verify the payload was sent by OTPless and has not been tampered with.

### Algorithm

| Property         | Value             |
| ---------------- | ----------------- |
| Algorithm        | HMAC-SHA256       |
| Key encoding     | UTF-8             |
| Payload encoding | UTF-8             |
| Output encoding  | Base64 (standard) |

**Inputs:**

- `secret` — generated by OTPless and provided to you at endpoint registration.
- `payload` — the raw JSON string sent as the HTTP request body.

### HTTP Header

```
X-Signature: <Base64-encoded HMAC-SHA256>
```

No prefix (e.g. no `sha256=`) — just the raw Base64 string.

### Verification (Receiver Side)

To verify an incoming webhook:

1. Read the raw request body as a UTF-8 string — do not parse and re-serialize JSON, as whitespace differences will break the signature.
2. Retrieve your endpoint secret (provided during subscription setup).
3. Compute `HMAC-SHA256(secret, rawBody)` and Base64-encode the result.
4. Compare your computed value to the `X-Signature` header using a constant-time comparison.

<CodeGroup>
  ```javascript Node.js theme={null}
  const crypto = require('crypto');

function verifySignature(secret, rawBody, headerValue) {
const computed = crypto
.createHmac('sha256', secret)
.update(rawBody, 'utf8')
.digest('base64');
return crypto.timingSafeEqual(
Buffer.from(computed),
Buffer.from(headerValue)
);
}

````

```python Python theme={null}
import hmac, hashlib, base64

def verify_signature(secret: str, raw_body: str, header_value: str) -> bool:
    computed = base64.b64encode(
        hmac.new(secret.encode(), raw_body.encode(), hashlib.sha256).digest()
    ).decode()
    return hmac.compare_digest(computed, header_value)
````

```java Java theme={null}
public static String generateHmacSha256(String secret, String data) throws Exception {
    Mac mac = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKeySpec = new SecretKeySpec(
            secret.getBytes("UTF-8"), "HmacSHA256"
    );
    mac.init(secretKeySpec);
    byte[] hash = mac.doFinal(data.getBytes("UTF-8"));
    return Base64.getEncoder().encodeToString(hash);
}
```

</CodeGroup>

## Error Codes

| errorCode | errorMessage                                                                    |
| --------- | ------------------------------------------------------------------------------- |
| `SP40003` | Verification failed / could not be completed.                                   |
| `SP40004` | Verification is not available for this country yet.                             |
| `SP40005` | Operator not supported / could not be detected / SIM not supported.             |
| `SP40006` | SIM operator not enabled / Phone/MNP operator not enabled / no matching config. |
| `SP40007` | Operator mismatch.                                                              |
| `SP40008` | The phone number is invalid.                                                    |
| `SP40009` | HE Failed / couldn't verify with mobile network.                                |
| `SP40010` | Operator server error.                                                          |
| `SP40011` | Verify failed / phone number doesn't match SIM.                                 |
| `SP40012` | Session expired / verification session has expired.                             |
| `SP40013` | Device match could not be started.                                              |
| `SP50001` | Something went wrong on our end.                                                |
| `SP40020` | App network policy blocked verification.                                        |
| `SP40021` | Network unavailable / Unable to resolve with telecom.                           |
| `SP40022` | Network configuration issue.                                                    |
| `SP40023` | Verification timed out.                                                         |
| `SP40024` | Could not reach verification server.                                            |
| `SP40025` | Secure connection failed.                                                       |
| `SP40026` | Operator service error.                                                         |
| `SP40027` | Edge service error.                                                             |
| `SP40028` | Verification URL malformed.                                                     |
| `SP40029` | Network permission denied.                                                      |
| `SP40030` | Unexpected verification response.                                               |
| `SP40031` | Verification already in progress. Multiple request not allowed.                 |
| `SP40032` | Invalid app credentials.                                                        |
| `SP40033` | Conflict / Internal server error / Unauthorized.                                |
| `SP40099` | Verification failed.                                                            |
| `SP99999` | Unexpected error occurred.                                                      |
| `5404`    | An unknown error occurred. Please try again or contact support.                 |

## Related references

<CardGroup cols={2}>
  <Card title="Overview" icon="book-open" href="/api-reference/endpoint/sign-in/sna/overview">
    SNA integration model and end-to-end flow.
  </Card>

  <Card title="Initiate SNA" icon="play" href="/api-reference/endpoint/sign-in/sna/initiate-sna">
    `POST /auth/v1/initiate/sna` — create an SNA transaction.
  </Card>

  <Card title="Check SNA status" icon="circle-check" href="/api-reference/endpoint/sign-in/sna/status">
    `POST /auth/v1/status` — fetch the final result.
  </Card>

  <Card title="Errors" icon="triangle-exclamation" href="/api-reference/endpoint/sign-in/sna/errors">
    SNA error codes and response formats.
  </Card>
</CardGroup>
