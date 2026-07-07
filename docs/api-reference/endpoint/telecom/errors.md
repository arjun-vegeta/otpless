> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Telecom API errors

> How errors are returned for OTPless Telecom Intelligence APIs, response formats, and error code reference.

## How errors are returned

Errors can appear in two ways:

| Scenario             | HTTP status | Response body                                                                    | When                                                    |
| -------------------- | ----------- | -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Request rejected** | 4XX         | Single error object (`message`, `errorCode`, `description`). No `success` field. | Invalid params, bad credentials, unsupported operator.  |
| **Check failed**     | 200         | Normal response with **`success: false`** and an **`error`** object in the body. | Request was valid but the check could not be completed. |

Always check **HTTP status** first. If it is **200**, check `success` in the body — only read `swapped` when `success` is `true`.

## Error response body format

| Field         | Type   | Description                                               |
| ------------- | ------ | --------------------------------------------------------- |
| `message`     | string | Short human-readable message.                             |
| `errorCode`   | string | Machine-readable code. Use the tables below to interpret. |
| `description` | string | Longer description for logging or display.                |

---

## SIM Swap Check — Error details

**Endpoint:** `POST /v1/telecom/sim-swap-check`

### Authentication errors (HTTP 401)

Returned when `clientId` or `clientSecret` headers are missing or invalid.

| HTTP  | errorCode | message                         | description                                             |
| ----- | --------- | ------------------------------- | ------------------------------------------------------- |
| `401` | `70001`   | Client credentials are required | `clientId` and `clientSecret` headers are required.     |
| `401` | `70002`   | Invalid client credentials      | The provided `clientId` and `clientSecret` are invalid. |

### Request errors (HTTP 400)

Returned when the request is malformed or the phone number's operator does not support the check.

| HTTP  | errorCode | message                                   | description                                                  |
| ----- | --------- | ----------------------------------------- | ------------------------------------------------------------ |
| `400` | `P7102`   | Invalid Request                           | Invalid phone number.                                        |
| `400` | `P7311`   | SIM swap check not supported for operator | No SIM swap check available for the phone number's operator. |

### Check failed — HTTP 200 with `success: false`

Returned as HTTP 200 with `success: false` when the request was valid but the check could not be completed.

| errorCode | message               | description                                                     |
| --------- | --------------------- | --------------------------------------------------------------- |
| `P7301`   | Telecom lookup failed | Unable to retrieve operator details from the upstream provider. |
| `P7314`   | SIM swap check failed | The SIM swap check could not be completed.                      |

---

## Call Forwarding Check — Error details

**Endpoint:** `POST /v1/telecom/call-forwarding-check`

### Authentication errors (HTTP 401)

Returned when `clientId` or `clientSecret` headers are missing or invalid.

| HTTP  | errorCode | message                         | description                                             |
| ----- | --------- | ------------------------------- | ------------------------------------------------------- |
| `401` | `70001`   | Client credentials are required | `clientId` and `clientSecret` headers are required.     |
| `401` | `70002`   | Invalid client credentials      | The provided `clientId` and `clientSecret` are invalid. |

### Request errors (HTTP 400)

Returned when the request is malformed or the phone number's operator does not support the check.

| HTTP  | errorCode | message                                          | description                                                         |
| ----- | --------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| `400` | `P7102`   | Invalid Request                                  | Invalid phone number.                                               |
| `400` | `P7331`   | Call forwarding check not supported for operator | No call forwarding check available for the phone number's operator. |

### Check failed — HTTP 200 with `success: false`

Returned as HTTP 200 with `success: false` when the request was valid but the check could not be completed.

| errorCode | message                      | description                                                     |
| --------- | ---------------------------- | --------------------------------------------------------------- |
| `P7301`   | Telecom lookup failed        | Unable to retrieve operator details from the upstream provider. |
| `P7334`   | Call forwarding check failed | The call forwarding check could not be completed.               |

---

## Number Portability Check — Error details

**Endpoint:** `POST /v1/telecom/portability`

### Authentication errors (HTTP 401)

Returned when `clientId` or `clientSecret` headers are missing or invalid.

| HTTP  | errorCode | message                         | description                                             |
| ----- | --------- | ------------------------------- | ------------------------------------------------------- |
| `401` | `70001`   | Client credentials are required | `clientId` and `clientSecret` headers are required.     |
| `401` | `70002`   | Invalid client credentials      | The provided `clientId` and `clientSecret` are invalid. |

### Request errors (HTTP 400)

Returned when the request is malformed (e.g. an invalid phone number).

| HTTP  | errorCode | message         | description           |
| ----- | --------- | --------------- | --------------------- |
| `400` | `P7102`   | Invalid Request | Invalid phone number. |

### Check failed — HTTP 200 with `success: false`

Returned as HTTP 200 with `success: false` when the request was valid but the check could not be completed.

| errorCode | message               | description                                                     |
| --------- | --------------------- | --------------------------------------------------------------- |
| `P7301`   | Telecom lookup failed | Unable to retrieve operator details from the upstream provider. |
