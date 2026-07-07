> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# API Error Codes

> Reference for all SNA verification error codes returned in auths[].error.errorCode by the Status Check API.

There are two kinds of errors in the SNA flow:

1. **Request & authentication errors** — returned as an HTTP `4xx` with a top-level `errorCode` when a [Create](/sna/create-api) or [Status Check](/sna/status-check-api) request is rejected (invalid parameters, bad credentials, etc.).
2. **SNA verification errors** — `SP`-prefixed codes returned by the verification engine. They appear inside `auths[].error` (with `errorCode`, `message`, and a user-friendly `description`) on the [Status Check API](/sna/status-check-api) when the `PRIMARY` factor's `status` is `FAILED`.

## Request & authentication errors

Returned as an HTTP `4xx` with a top-level `errorCode` by the [Create](/sna/create-api) (`POST /auth/v1/create`) and [Status Check](/sna/status-check-api) (`GET /auth/v2/status`) APIs. Both APIs share these codes; the **Applies to** column notes any that are specific to one endpoint.

| HTTP  | Error code | Message          | Description                                                                   | Applies to   |
| ----- | ---------- | ---------------- | ----------------------------------------------------------------------------- | ------------ |
| `400` | `7102`     | Invalid Request  | Invalid phone number.                                                         | Create       |
| `400` | `7104`     | Invalid Request  | Invalid email.                                                                | Create       |
| `400` | `7106`     | Invalid Request  | Invalid `phoneNumber` or `email`.                                             | Create       |
| `400` | `7113`     | Invalid Request  | Invalid `expiry` (must be 60–86400 seconds).                                  | Create       |
| `400` | `7119`     | Invalid Request  | Invalid request Id — the `requestId` format is incorrect or malformed.        | Both         |
| `400` | `7170`     | Invalid Request  | Auth not started yet. **Not terminal** — if auth was initiated, keep polling. | Status Check |
| `401` | `7002`     | Access blocked   | Invalid `clientId` / `clientSecret` credentials.                              | Both         |
| `401` | `7012`     | Access blocked   | Merchant credentials are empty (missing headers).                             | Both         |
| `401` | `7019`     | Merchant Blocked | Your account has been temporarily blocked. Contact support.                   | Both         |

## SNA verification errors

When the `PRIMARY` factor's `status` is `FAILED`, the [Status Check API](/sna/status-check-api) returns an `error` object in `auths[].error` containing the `errorCode`, a short `message`, and a user-friendly `description`. Surface the `description` to end users; use the `errorCode` to drive fallback or retry logic.

### Verification & operator errors

Returned when carrier verification could not complete. Operator/eligibility checks (`SP40004`–`SP40008`) are rejected up front; the remaining codes are reported once verification has been attempted.

| Error code | Message                | Description                                                                                              |
| ---------- | ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `SP40003`  | Verification failed    | Verification could not be completed. Please try again or contact OTPless support if it continues.        |
| `SP40004`  | Country not supported  | Verification is not available for this country yet.                                                      |
| `SP40005`  | Operator not supported | This operator is not supported for verification. Please try with a different network.                    |
| `SP40006`  | Operator not enabled   | The operator is not enabled on OTPless.                                                                  |
| `SP40007`  | Operator mismatch      | The network or SIM operator doesn't match. Please use the same device and number you started with.       |
| `SP40008`  | Invalid phone number   | The phone number is invalid. Please enter a valid number and try again.                                  |
| `SP40009`  | HE Failed              | We couldn't verify you with your mobile network. Please try again in a moment.                           |
| `SP40010`  | Operator server error  | There's a temporary issue with the operator. Please try again; if it continues, contact OTPless support. |
| `SP40011`  | Verify failed          | The phone number doesn't match the SIM or network. Please use the correct number and try again.          |
| `SP40012`  | Session expired        | This verification session has expired. Please start a new verification.                                  |
| `SP40013`  | No session URI         | Device match could not be started. Please try again.                                                     |

### SDK-reported errors

Reported by the client SDK when the silent network handshake fails on the device (timeouts, connectivity, or operator-URL issues).

| Error code | Message                                  | Description                                                                                                           |
| ---------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `SP40014`  | Auth Timeout                             | The verification timed out. Please try again.                                                                         |
| `SP40015`  | No Data Connection                       | Verification needs a mobile data connection. Please switch off Wi-Fi and try again.                                   |
| `SP40016`  | Operator URL not whitelisted in host app | The host app blocked a cleartext request to the operator URL. Whitelist the URL in the app's network security config. |
| `SP40017`  | Unable to resolve host URL               | The device could not resolve the operator host. Please check the data connection and DNS.                             |
| `SP40018`  | Duplicate Auth request                   | An auth request is already in progress for this session. Please wait or start a new verification.                     |
| `SP40019`  | Operator - Bad Request                   | The operator returned a bad request / bad gateway response.                                                           |
| `SP40020`  | Operator URL Connection Timeout          | The connection to the operator URL timed out.                                                                         |
| `SP40021`  | Failed to connect to host URL            | The device could not establish a connection to the operator host URL.                                                 |
| `SP40022`  | SSL Error                                | An SSL/TLS error occurred while contacting the operator URL.                                                          |
| `SP40023`  | HOST URL Error                           | An unspecified error occurred while contacting the operator host URL.                                                 |
| `SP40024`  | Auth Cancelled                           | The verification was cancelled before completion.                                                                     |
| `SP40025`  | Unknown Errors                           | The verification failed with an unclassified error.                                                                   |

### System errors

| Error code | Message        | Description                                                                                  |
| ---------- | -------------- | -------------------------------------------------------------------------------------------- |
| `SP50001`  | Internal error | Something went wrong on our end. Please try again. If it continues, contact OTPless support. |
