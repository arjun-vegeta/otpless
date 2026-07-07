> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SNA errors

> How errors are returned for Silent Network Authentication (Initiate and Status APIs), response formats, and error code reference.

## How errors are returned

Errors can appear in two ways:

| Scenario               | HTTP status | Response body                                                                                | When                                                                       |
| ---------------------- | ----------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Request rejected**   | 4XX         | Single **error** object (`errorCode`, `message`, `description`). No `requestId` or `status`. | Invalid/missing params, bad auth, rate limit exceeded, invalid token, etc. |
| **Transaction failed** | 200         | Normal response with **status: "FAILED"** and an **error** object in the same body.          | Initiate or verification failed after the request was accepted.            |

Always check **HTTP status** first. If it is **200**, then check **status** in the body for `INIT`, `PENDING`, `SUCCESS`, `FAILED`, or `EXPIRED`, and use the **error** object when **status** is `FAILED`.

## Error response body format

Every error is a JSON object with (when present):

| Field         | Type   | Description                                               |
| ------------- | ------ | --------------------------------------------------------- |
| `errorCode`   | string | Machine-readable code. Use the tables below to interpret. |
| `message`     | string | Short message.                                            |
| `description` | string | Longer description for logging or display.                |

## Initiate API — Error details

**Endpoint:** `POST /auth/v1/initiate/sna`

### 1a. Error in Initiate API (non-200 response)

These errors are returned with a non-200 HTTP status code. The response includes an HTTP status, `errorCode`, and `message`.

**Validation / Request Errors**

| HTTP Code | errorCode | Message         | Description                                                  |
| --------- | --------- | --------------- | ------------------------------------------------------------ |
| `400`     | `7101`    | Invalid Request | Invalid parameter values or required parameters are missing. |
| `400`     | `7102`    | Invalid Request | Invalid phone number.                                        |
| `400`     | `7113`    | Invalid Request | Invalid expiry.                                              |

**Authorization Errors**

| HTTP Code | errorCode | Message          | Description                           |
| --------- | --------- | ---------------- | ------------------------------------- |
| `401`     | `7002`    | Access Blocked   | Invalid credentials.                  |
| `401`     | `7011`    | Access Blocked   | IP validation failed.                 |
| `401`     | `7012`    | Access Blocked   | Merchant credentials are empty.       |
| `401`     | `7019`    | Merchant Blocked | Account has been temporarily blocked. |

**Rate Limit Errors**

| HTTP Code | errorCode | Message                      | Description                                                                 |
| --------- | --------- | ---------------------------- | --------------------------------------------------------------------------- |
| `429`     | `7022`    | Identity Rate Limit Exceeded | This identity has exceeded the allowed number of authentication requests.   |
| `429`     | `7023`    | IP Rate Limit Exceeded       | This IP address has exceeded the allowed number of authentication requests. |
| `429`     | `7024`    | App Rate Limit Exceeded      | The application has exceeded the allowed number of authentication requests. |

### 1b. Error in SNA Initiate — Pre-check / Telco failed (HTTP 200)

Returned as HTTP 200 with `status: FAILED`. These errors occur during pre-checks (country, operator, SIM validation) before the SNA flow is attempted.

<Note>
  `SP40005`, `SP40006`, `SP40007`, and `SP40011` may also be received in the SNA Status API / webhook.
</Note>

| errorCode | message                | description                                                                                        |
| --------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `SP40004` | Country not supported  | Verification is not available for this country yet.                                                |
| `SP40005` | Operator not supported | This operator is not supported for verification. Please try with a different network.              |
| `SP40006` | Operator not enabled   | The operator is not enabled on OTPless.                                                            |
| `SP40007` | Operator mismatch      | The network or SIM operator doesn't match. Please use the same device and number you started with. |
| `SP40010` | Operator server error  | The operator's server encountered an error. Please try again.                                      |
| `SP40011` | Verify failed          | The phone number doesn't match the SIM or network. Please use the correct number and try again.    |

## Status API — Error details

**Endpoint:** `POST /auth/v1/status`

Use this endpoint only for transactions created via [Initiate SNA](/api-reference/endpoint/sign-in/sna/initiate-sna). Send the **requestId** from Initiate in the request body.

### Authentication (HTTP 401)

| errorCode | message                        | description                     |
| --------- | ------------------------------ | ------------------------------- |
| `7012`    | Merchant credentials are empty | Merchant credentials are empty. |
| `7002`    | Invalid credentials            | Invalid credentials.            |
| `7301`    | Token expired                  | Token expired.                  |

### Request validation (HTTP 400)

| errorCode | message         | description                                                     |
| --------- | --------------- | --------------------------------------------------------------- |
| `7119`    | Invalid request | Invalid or missing requestId.                                   |
| `7114`    | Invalid token   | Invalid token (transaction not found or merchant/app mismatch). |

### When status = FAILED (HTTP 200)

These errors are received in the SNA Status API response or webhook after SNA fails. `SP40005`, `SP40006`, and `SP40007` may also appear here when operator validation fails post-initiation.

| errorCode | message                | description                                                                                        |
| --------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `SP40005` | Operator not supported | This operator is not supported for verification. Please try with a different network.              |
| `SP40006` | Operator not enabled   | The operator is not enabled on OTPless.                                                            |
| `SP40007` | Operator mismatch      | The network or SIM operator doesn't match. Please use the same device and number you started with. |
| `SP40009` | HE Failed              | We couldn't verify you with your mobile network. Please try again in a moment.                     |
| `SP40010` | Operator server error  | The operator's server encountered an error. Please try again.                                      |
| `SP40011` | Verify failed          | The phone number doesn't match the SIM or network. Please use the correct number and try again.    |
| `SP40014` | Auth Timeout           | The verification timed out. Please try again.                                                      |

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

  <Card title="SNA Webhook" icon="webhook" href="/api-reference/endpoint/sign-in/sna/webhook">
    Webhook event reference and payload structure.
  </Card>
</CardGroup>
