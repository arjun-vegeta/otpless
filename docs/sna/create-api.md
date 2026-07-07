> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create API

> Create an auth request and obtain a requestId that links a user's identity to a future SNA flow. Called server-to-server.

The Create API is the **first step** of the authentication flow. Your backend calls it with the user's phone number and, in return, receives a `requestId`. By passing the phone number you are effectively generating a `requestId` bound to that identity — you then use this same `requestId` to invoke the SDK and perform the authentication on the client, and to track the result via the [Status Check API](/sna/status-check-api).

<Warning>
  This is a **server-to-server** call. It requires your `clientId` and `clientSecret`, which must never be exposed in client-side code.
</Warning>

<Note>
  Either **`phoneNumber` + `countryCode`** or **`email`** must be provided. For SNA-only flows, use `phoneNumber` + `countryCode` — SNA authenticates against the SIM and requires a mobile number.
</Note>

## OpenAPI

```yaml POST /auth/v1/create
openapi: 3.0.3
info:
  title: OTPless SNA SDK APIs
  description: >
    Server-to-server APIs for the SNA-only SDK authentication flow.


    - **Create** — register a user's identity (phone number) and obtain a
    `requestId`. Pass this `requestId` to the SDK on the client to perform
    authentication.

    - **Status Check** — poll the consolidated auth status for a `requestId` to
    determine the final, authoritative outcome.


    **Authentication:** All requests require `clientId` and `clientSecret` as
    request headers. Never expose these in client-side code.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/create:
    post:
      tags:
        - SNA
      summary: Create
      description: >
        Creates an auth request and returns a `requestId` that links an identity
        to a future auth flow.


        By passing the user's phone number you generate a `requestId` bound to
        that identity. Pass this same `requestId` to the SDK on the client to
        invoke and perform the authentication, and use it to poll the [Status
        Check](#tag/sna/get/auth/v2/status) API.


        Either `phoneNumber` + `countryCode` or `email` must be provided. For
        SNA-only flows, use `phoneNumber` + `countryCode` — SNA authenticates
        against the SIM and requires a mobile number.
      operationId: createAuthRequest
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateRequest'
            examples:
              phone:
                summary: Create with phone number
                value:
                  phoneNumber: '9876543210'
                  countryCode: '91'
                  expiry: 300
                  tid: your-template-id
      responses:
        '200':
          description: >-
            **HTTP 200** — Auth request created. Returns the `requestId` to pass
            to the SDK.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateResponse'
              examples:
                success:
                  summary: requestId generated
                  value:
                    requestId: ARID_A1B2C3D4E5F6
        '400':
          description: >-
            **HTTP 400.** Request rejected due to invalid parameters. Body is an
            error object.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                invalid_request_id:
                  summary: Invalid request Id (7119)
                  value:
                    message: Invalid Request
                    errorCode: '7119'
                    description: 'Request error: Invalid request Id'
                invalid_phone_or_email:
                  summary: Invalid phoneNumber or email (7106)
                  value:
                    message: Invalid Request
                    errorCode: '7106'
                    description: 'Request error: Invalid phoneNumber or email.'
                invalid_phone:
                  summary: Invalid phone number (7102)
                  value:
                    message: Invalid Request
                    errorCode: '7102'
                    description: 'Request error: Invalid phone number'
                invalid_email:
                  summary: Invalid email (7104)
                  value:
                    message: Invalid Request
                    errorCode: '7104'
                    description: 'Request error: Invalid email'
                invalid_expiry:
                  summary: Invalid expiry (7113)
                  value:
                    message: Invalid Request
                    errorCode: '7113'
                    description: 'Request error: Invalid expiry'
        '401':
          description: >-
            **HTTP 401.** Unauthorized. `clientId`/`clientSecret` headers are
            missing, invalid, or the merchant is blocked.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                credentials_empty:
                  summary: Credentials empty (7012)
                  value:
                    message: Access blocked
                    errorCode: '7012'
                    description: 'Authorization error: Merchant credentials are empty'
                invalid_credentials:
                  summary: Invalid credentials (7002)
                  value:
                    message: Access blocked
                    errorCode: '7002'
                    description: 'Authorization error: Invalid credentials'
                merchant_blocked:
                  summary: Merchant blocked (7019)
                  value:
                    message: Merchant Blocked
                    errorCode: '7019'
                    description: >-
                      Your account has been temporarily Blocked. Please contact
                      support for assistance.
components:
  schemas:
    CreateRequest:
      type: object
      properties:
        phoneNumber:
          type: string
          example: '9876543210'
          description: >-
            Phone number without country code. Required if `email` is not
            provided.
        countryCode:
          type: string
          example: '91'
          description: >-
            Country dial code (e.g. 91). Required when `phoneNumber` is
            provided.
        email:
          type: string
          example: user@example.com
          description: User email. Required if `phoneNumber` is not provided.
        expiry:
          type: integer
          example: 300
          description: 'Auth request validity in seconds. Min: 60, Max: 86400. Default: 900.'
        tid:
          type: string
          example: your-template-id
          description: >-
            Template ID to pin a specific channel config template for the
            subsequent initiate call.
    CreateResponse:
      type: object
      required:
        - requestId
      properties:
        requestId:
          type: string
          example: ARID_A1B2C3D4E5F6
          description: >-
            Unique auth request ID (ARID token). Pass this to the SDK and use it
            when polling Status Check.
    Error:
      type: object
      description: Error response body for HTTP 4xx responses.
      properties:
        message:
          type: string
          example: Invalid Request
        errorCode:
          type: string
          example: '7170'
          description: Machine-readable error code.
        description:
          type: string
          example: Auth not started yet. Please initiate authentication first.
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
