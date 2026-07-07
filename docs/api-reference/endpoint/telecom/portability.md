> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Number Portability Check

> Check whether a phone number has been ported (MNP). Use as a pre-authentication risk signal for fraud prevention.

<Accordion title="Why check number portability?">
  Mobile Number Portability (MNP) lets a subscriber keep their number while switching network operators. A number whose current `operator` differs from its `homeOperator` has been ported.

A recent or unexpected port can be a fraud signal — porting is a known vector for account takeover (an attacker ports a victim's number to a SIM they control). Use this check as a pre-authentication risk layer for sensitive flows.
</Accordion>

<Accordion title="How to interpret the response">
  | Field                  | Value   | Meaning                                                                                      |
  | ---------------------- | ------- | -------------------------------------------------------------------------------------------- |
  | `success`              | `true`  | Check completed. Use `phoneDetail.isPorted` for the result.                                  |
  | `success`              | `false` | Check could not be completed (e.g. telecom lookup failed). Inspect the `error` object.       |
  | `phoneDetail.isPorted` | `true`  | The number has been ported — `operator` differs from `homeOperator`. Treat as a risk signal. |
  | `phoneDetail.isPorted` | `false` | The number is on its original operator (not ported).                                         |

The portability result is carried by `phoneDetail.isPorted`; there is no separate top-level result field. When `success` is `false`, `phoneDetail` may be omitted.
</Accordion>

<Accordion title="What is phoneDetail?">
  `phoneDetail` contains enriched metadata about the phone number — including operator, country, line type, and time zones. All fields are omitted when not available for the given number or operator.

| Field          | Type      | Description                                                                        |
| -------------- | --------- | ---------------------------------------------------------------------------------- |
| `operator`     | string    | Current network operator (e.g. `JIO`, `AIRTEL`, `VI`)                              |
| `countryCode`  | string    | Numeric country code (e.g. `91`)                                                   |
| `country`      | string    | ISO 3166-1 alpha-2 country code (e.g. `IN`)                                        |
| `type`         | string    | Phone line type (e.g. `MOBILE`)                                                    |
| `homeOperator` | string    | Registered (original) operator — differs from `operator` when the number is ported |
| `isPorted`     | boolean   | `true` if the number has been ported away from its home operator                   |
| `location`     | string    | Location string for the number's registered area                                   |
| `timeZones`    | string\[] | IANA time zones for the number's registered location                               |

</Accordion>

## OpenAPI

```yaml POST /v1/telecom/portability
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
  /v1/telecom/portability:
    post:
      tags:
        - PORTABILITY
      summary: Number Portability Check
      description: >
        Checks whether the given phone number has been ported (Mobile Number
        Portability / MNP) — that is, whether its current network operator
        differs from its home (originally registered) operator.


        Returns enriched phone details including `isPorted`. When `isPorted` is
        `true`, the `operator` (current network) differs from the `homeOperator`
        (original network).


        Use this as a pre-authentication risk signal — a recently ported number
        can be associated with porting-based account-takeover fraud.
      operationId: portabilityCheck
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PortabilityCheckRequest'
            examples:
              default:
                summary: Check number portability status
                value:
                  phoneNumber: '917020141726'
      responses:
        '200':
          description: >
            **HTTP 200** — Request accepted. Inspect `success` in the body:

            - **`success: true`** — Check completed. Use `phoneDetail.isPorted`
            to determine the result.

            - **`success: false`** — Check could not be completed. Inspect
            `error` for details.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PortabilityCheckResponse'
              examples:
                ported:
                  summary: Number is ported
                  value:
                    success: true
                    phoneDetail:
                      operator: JIO
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: AIRTEL
                      isPorted: true
                      location: India
                      timeZones:
                        - Asia/Kolkata
                not_ported:
                  summary: Number is not ported
                  value:
                    success: true
                    phoneDetail:
                      operator: AIRTEL
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: AIRTEL
                      isPorted: false
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
        '400':
          description: >
            **HTTP 400.** Request rejected due to invalid parameters. Body is an
            error object only — no `success` field.
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
    PortabilityCheckRequest:
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
    PortabilityCheckResponse:
      type: object
      required:
        - success
      properties:
        success:
          type: boolean
          description: >-
            `true` if the check completed successfully. `false` if the check
            could not be completed — inspect the `error` object for details.
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
