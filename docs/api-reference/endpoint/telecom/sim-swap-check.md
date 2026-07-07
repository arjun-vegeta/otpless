> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SIM Swap Check

> Check whether a phone number's SIM has been recently swapped. Use as a pre-authentication risk signal for fraud prevention.

<Accordion title="What is maxAge?">
  `maxAge` is the lookback window in **hours**. The API checks whether the SIM was swapped within that window.

- `maxAge: 24` — was the SIM swapped in the last 24 hours?
- `maxAge: 72` — was the SIM swapped in the last 3 days?
- Omit `maxAge` to use the default lookback window.

A smaller `maxAge` gives a tighter, more recent check. For high-risk flows (e.g. password reset, large transaction), a shorter window is more conservative.
</Accordion>

<Accordion title="How to interpret the response">
  | Field     | Value   | Meaning                                                                                 |
  | --------- | ------- | --------------------------------------------------------------------------------------- |
  | `success` | `true`  | Check completed. Use `swapped` for the result.                                          |
  | `success` | `false` | Check could not be completed (e.g. operator not supported). Inspect the `error` object. |
  | `swapped` | `true`  | A SIM swap was detected within the `maxAge` window. Treat this as a risk signal.        |
  | `swapped` | `false` | No SIM swap detected within the window.                                                 |

`swapped: false` does not mean the number has never been swapped — it means no swap was found within the requested window. When `success` is `false`, `swapped` is omitted.
</Accordion>

<Accordion title="What is phoneDetail?">
  `phoneDetail` contains enriched metadata about the phone number returned alongside the swap result — including operator, country, line type, and time zones. All fields are omitted when not available for the given number or operator.

| Field          | Type      | Description                                                                              |
| -------------- | --------- | ---------------------------------------------------------------------------------------- |
| `operator`     | string    | Current network operator (e.g. `JIO`, `AIRTEL`, `VI`)                                    |
| `countryCode`  | string    | Numeric country code (e.g. `91`)                                                         |
| `country`      | string    | ISO 3166-1 alpha-2 country code (e.g. `IN`)                                              |
| `type`         | string    | Phone line type (e.g. `MOBILE`)                                                          |
| `homeOperator` | string    | Registered operator, which may differ from `operator` if the number is roaming or ported |
| `location`     | string    | Location string for the number's registered area                                         |
| `timeZones`    | string\[] | IANA time zones for the number's registered location                                     |

</Accordion>

## OpenAPI

```yaml POST /v1/telecom/sim-swap-check
openapi: 3.0.3
info:
  title: OTPless Telecom Intelligence APIs
  description: >
    APIs for querying telecom-level signals about a phone number — including SIM
    swap history and call forwarding status.


    Use these APIs to add a pre-authentication risk check layer before or
    alongside your primary auth flow.


    **Authentication:** All requests require `clientId` and `clientSecret` as
    request headers. Use the same credentials you use for other OTPless APIs.


    **Error model:**

    - **HTTP 4xx:** Request rejected (invalid params, auth failure). Response
    body is an error object only (`errorCode`, `message`, `description`).

    - **HTTP 200 with `success: false`:** Request accepted but the check could
    not be completed. Inspect the error object for details.
  version: 1.0.0
servers:
  - url: https://platform.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /v1/telecom/sim-swap-check:
    post:
      tags:
        - SIM_SWAP
      summary: SIM Swap Check
      description: >
        Checks whether the given phone number's SIM has been swapped within the
        specified time window.


        Returns `swapped: true` if a SIM swap was detected within `maxAge`
        hours. Returns `swapped: false` if no swap was detected. Also returns
        enriched phone details (operator, country, type) regardless of swap
        status.


        Use this as a pre-authentication risk signal — a recent SIM swap can
        indicate a SIM-swap attack.
      operationId: simSwapCheck
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SimSwapCheckRequest'
            examples:
              with_maxAge:
                summary: Check with maxAge window
                value:
                  phoneNumber: '917020141726'
                  maxAge: 72
              without_maxAge:
                summary: Check with default lookback window
                value:
                  phoneNumber: '917020141726'
      responses:
        '200':
          description: >
            **HTTP 200** — Request accepted. Inspect `success` in the body:

            - **`success: true`** — Check completed. Use `swapped` to determine
            result.

            - **`success: false`** — Check could not be completed. Inspect
            `error` for details.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SimSwapCheckResponse'
              examples:
                not_swapped:
                  summary: SIM not swapped
                  value:
                    success: true
                    swapped: false
                    phoneDetail:
                      operator: JIO
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: JIO
                      location: India
                      timeZones:
                        - Asia/Kolkata
                swapped:
                  summary: SIM was recently swapped
                  value:
                    success: true
                    swapped: true
                    phoneDetail:
                      operator: AIRTEL
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: AIRTEL
                      location: India
                      timeZones:
                        - Asia/Kolkata
                telecom_lookup_failed:
                  summary: Telecom lookup failed (P7301)
                  value:
                    success: false
                    error:
                      errorCode: P7301
                      message: Telecom lookup failed
                      description: >-
                        Unable to retrieve operator details from the upstream
                        provider.
                check_failed:
                  summary: SIM swap check failed (P7314)
                  value:
                    success: false
                    error:
                      errorCode: P7314
                      message: SIM swap check failed
                      description: The SIM swap check could not be completed.
        '400':
          description: >
            **HTTP 400.** Request rejected due to invalid parameters or an
            unsupported operator. Body is an error object only — no `success` or
            `swapped` fields.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                invalid_phone:
                  summary: Invalid phone number (P7102)
                  value:
                    message: Invalid Request
                    errorCode: P7102
                    description: 'Request error: Invalid phone number'
                operator_not_supported:
                  summary: Operator not supported (P7311)
                  value:
                    message: SIM swap check not supported for operator
                    errorCode: P7311
                    description: >-
                      No SIM swap check available for the phoneNumber's
                      operator.
        '401':
          description: >
            **HTTP 401.** Unauthorized. `clientId`/`clientSecret` headers are
            missing or invalid. Body is an error object only.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                credentials_required:
                  summary: Credentials missing (70001)
                  value:
                    message: Client credentials are required
                    errorCode: '70001'
                    description: clientId and clientSecret headers are required.
                invalid_credentials:
                  summary: Invalid credentials (70002)
                  value:
                    message: Invalid client credentials
                    errorCode: '70002'
                    description: The provided clientId and clientSecret are invalid.
components:
  schemas:
    SimSwapCheckRequest:
      type: object
      required:
        - phoneNumber
      properties:
        phoneNumber:
          type: string
          example: '917020141726'
          description: >-
            Phone number including country code, without plus sign. Example:
            917020141726 for +91 70201 41726.
        maxAge:
          type: integer
          example: 72
          description: >-
            Maximum age of SIM swap to check, in hours. Example: 72 checks
            whether the SIM was swapped in the last 3 days. Omit to use the
            default lookback window.
    SimSwapCheckResponse:
      type: object
      required:
        - success
      properties:
        success:
          type: boolean
          description: >-
            `true` if the check completed successfully. `false` if the check
            could not be completed — inspect the `error` object for details.
        swapped:
          type: boolean
          description: >-
            `true` if a SIM swap was detected within the `maxAge` window.
            `false` if no swap was detected. Omitted when `success` is `false`.
        phoneDetail:
          $ref: '#/components/schemas/PhoneDetail'
        error:
          $ref: '#/components/schemas/ErrorInBody'
    Error:
      type: object
      description: Error response body for HTTP 4xx responses.
      properties:
        message:
          type: string
          example: Invalid Request
        errorCode:
          type: string
          example: P7102
          description: >-
            Machine-readable error code. See the error code reference for the
            full list.
        description:
          type: string
          example: 'Request error: Invalid phone number'
    PhoneDetail:
      type: object
      description: >-
        Enriched phone metadata. Fields are omitted when not available for the
        given number or operator.
      properties:
        operator:
          type: string
          example: JIO
          description: Current network operator (e.g. JIO, AIRTEL, VI).
        countryCode:
          type: string
          example: '91'
          description: Numeric country code.
        country:
          type: string
          example: IN
          description: ISO 3166-1 alpha-2 country code.
        type:
          type: string
          example: MOBILE
          description: Phone line type (e.g. MOBILE, LANDLINE).
        homeOperator:
          type: string
          example: JIO
          description: >-
            Home (registered) operator, which may differ from current operator
            if roaming.
        isPorted:
          type: boolean
          example: true
          description: >-
            `true` if the number has been ported away from its home operator (so
            `operator` differs from `homeOperator`).
        location:
          type: string
          example: India
          description: >-
            Location string for the phone number (city, state, or country
            level).
        timeZones:
          type: array
          items:
            type: string
          example:
            - Asia/Kolkata
          description: IANA time zones for the phone number's registered location.
    ErrorInBody:
      type: object
      description: Error object returned inside a 200 response when `success` is `false`.
      properties:
        errorCode:
          type: string
          description: Machine-readable error code.
        message:
          type: string
        description:
          type: string
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: clientId
      description: OTPless API Client ID
    ApiSecretAuth:
      type: apiKey
      in: header
      name: clientSecret
      description: OTPless API Client Secret
```
