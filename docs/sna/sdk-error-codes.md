> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SDK Error Codes

> Error codes reported by the OTPless Headless SDK on the client (Android & iOS) during the SNA-only flow. Most codes are common to both platforms; some are platform-specific.

These are the errors the **OTPless Headless SDK reports on the client** via its callbacks during the SNA-only flow. They are surfaced in the SDK response — on `FAILED` (initialization), on a non-`200` `INITIATE`, or on `AUTH_TERMINATED`.

<Note>
  These are **client/SDK** errors. For the server-side verification outcome (`SP*` codes in `auths[].error`) and gateway request errors, see [API Error Codes](/sna/api-error-codes). The SDK callback is **not** the source of truth — always confirm the final result with the [Status Check API](/sna/status-check-api).
</Note>

## Error response structure

```json theme={null}
{
    "responseType": RESPONSE_TYPE_ENUM,
    "statusCode": INTEGER_STATUS_CODE,
    "response": {
        "errorCode": "ERROR_CODE",
        "errorMessage": "ERROR_MESSAGE"
    }
}
```

- **`responseType`** — the callback the error arrived on. Errors are carried only on `FAILED`, `INITIATE`, and `AUTH_TERMINATED`. (`SDK_READY` and `ONETAP` are success callbacks and never carry an error.)
- **`statusCode`** — the HTTP status or an OTPless-curated status code.
- **`errorCode`** — the OTPless error code (see tables below).
- **`errorMessage`** — a human-readable description of the error.

## AUTH\_TERMINATED errors

In the SNA-only flow, a terminal failure is delivered on the **`AUTH_TERMINATED`** callback. Common to Android and iOS.

| Error code | responseType                   | Meaning                     |
| ---------- | ------------------------------ | --------------------------- |
| `7160`     | `INITIATE` → `AUTH_TERMINATED` | SNA could not be initiated. |
| `7161`     | `AUTH_TERMINATED`              | SNA verification failed.    |

<Note>
  `7160` first surfaces on an `INITIATE` callback (with the error code) and is then followed by `AUTH_TERMINATED`; `7161` is delivered directly on `AUTH_TERMINATED`. In an SNA-only configuration there is no fallback channel — treat both as terminal and rely on the [Status Check API](/sna/status-check-api) result.
</Note>

## SNA verification errors

Outcomes from carrier verification (the silent-auth status). In an SNA-only flow these surface on the `INITIATE` (with error code) and `AUTH_TERMINATED` callbacks. Common to both platforms unless noted.

| Status code | Error code | Meaning                                                          |
| ----------- | ---------- | ---------------------------------------------------------------- |
| —           | `7122`     | Carrier-level IP mismatch.                                       |
| —           | `7128`     | Carrier failed to verify the number.                             |
| —           | `7169`     | Duplicate request — verification already completed concurrently. |

<Note>
  A timeout or exhausted poll ends the flow on `AUTH_TERMINATED` (`7161`).
</Note>

## Initialization errors

Reported on the `FAILED` callback when the SDK cannot initialize. Common to both platforms.

| Status code | Error code | Meaning                                                                    |
| ----------- | ---------- | -------------------------------------------------------------------------- |
| `5003`      | `5003`     | SDK initialization failed (all retries exhausted). Re-call `initialize()`. |

## Request & configuration errors

Surfaced on the `INITIATE` callback when `statusCode != 200`. Common to both platforms unless noted.

| Status code | Error code | Meaning                                                                                    |
| ----------- | ---------- | ------------------------------------------------------------------------------------------ |
| `400`       | `7101`     | Malformed request body.                                                                    |
| `400`       | `7102`     | Invalid mobile number format.                                                              |
| `400`       | `7139`     | Neither a valid mobile number nor email was provided.                                      |
| `400`       | `7035`     | Country code not configured for this merchant.                                             |
| `400`       | `7025`     | International verification disabled for this merchant.                                     |
| `400`       | `7001`     | Identity is blocked.                                                                       |
| `400`       | `7005`     | Invalid auth state (expired or not found) — the SDK retries automatically.                 |
| `400`       | `7009`     | Request origin does not match the configured login URI.                                    |
| `404`       | `4003`     | Channel not active in the dashboard. For SNA-only, ensure SNA is the only enabled channel. |
| `400`       | `7039`     | **Android only.** App's Android version is deprecated.                                     |
| `400`       | `4000`     | **iOS only.** The request values are incorrect.                                            |
| `400`       | `4001`     | **iOS only.** 2FA is not supported by the headless SDK.                                    |
| `400`       | `5900`     | **iOS only.** The feature requires a newer iOS version.                                    |
| `401`       | `401`      | Unauthorized request — check your App ID.                                                  |

## Transaction state errors

Surfaced on the `INITIATE` callback when the request or token has expired. Call `start()` again with a fresh `requestId`.

| Status code | Error code | Meaning                   |
| ----------- | ---------- | ------------------------- |
| `400`       | `7304`     | Transaction expired.      |
| `400`       | `7301`     | Token expired or missing. |
| `400`       | `7302`     | Auth code expired.        |

## Rate-limit errors

Surfaced on the `INITIATE` callback with `statusCode 429`. Common to both platforms.

| Error code | Limit dimension               |
| ---------- | ----------------------------- |
| `7020`     | General rate limit.           |
| `7022`     | Per phone/email identity.     |
| `7023`     | Per IP address.               |
| `7024`     | Per app.                      |
| `7036`     | Per auth state.               |
| `7037`     | Per auth session.             |
| `7040`     | Per country code.             |
| `7041`     | Per device ID.                |
| `7417`     | Identity — too many requests. |

## Network connectivity errors (iOS)

iOS surfaces granular network errors via the `INITIATE` response. On Android, a network failure during silent auth is not reported with a distinct code in an SNA-only flow — it ends the flow on `AUTH_TERMINATED` (`7160` / `7161`).

| Status code | Error code | Meaning                                   |
| ----------- | ---------- | ----------------------------------------- |
| `408`       | `9100`     | Request timeout.                          |
| `503`       | `9101`     | Network connection was lost.              |
| `503`       | `9102`     | DNS lookup failed.                        |
| `503`       | `9103`     | Cannot connect to server.                 |
| `503`       | `9104`     | No internet connection.                   |
| `503`       | `9105`     | Secure connection failed (SSL issue).     |
| —           | `9110`     | OTPless authentication request cancelled. |
