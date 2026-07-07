> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Initiate SNA

> Generate the link to perform Silent Network Authentication (SNA) transaction.

<Accordion title="Why must the link be opened on the user's device over mobile data?">
  The `link` returned by Initiate SNA **must be opened from the user's device using mobile data**. This is required so the telecom operator can perform SIM and network verification. If the link is opened from your backend, a server, a desktop browser, or Wi‑Fi, SNA verification may fail.
</Accordion>

<Accordion title="What to do after Initiate">
  **If status = INIT:** Store the `requestId`, pass the `link` to the client app, open the `link` from the user's device over mobile data, then call the [Status API](/api-reference/endpoint/sign-in/sna/status) with `requestId` to get the final result.

**If status = PENDING:** The transaction has been accepted and is in progress. Poll the [Status API](/api-reference/endpoint/sign-in/sna/status) with `requestId` until you receive a terminal status (`SUCCESS` or `FAILED`).

**If status = FAILED:** Do not open the link. Inspect the `error` object and show an appropriate message or fallback to another auth method.
</Accordion>

<Accordion title="Request rules (mcc/mnc)">
  **mcc and mnc:** Either send both or omit both. If only one is sent, the request fails.
</Accordion>

## OpenAPI

```yaml POST /auth/v1/initiate/sna
openapi: 3.0.3
info:
  title: OTPless SNA API
  description: >
    **SILENT_AUTH (SNA) flow only.** This spec describes the client-facing API
    for Silent Network Authentication. All request parameters and response
    fields listed are the only ones used or returned for this flow. Parameters
    used in other flows (e.g. channels, mode, smartAuth, email, templateId,
    appHash, code) are not used for SNA and are omitted here.


    Use **Initiate** to create an SNA transaction and **Status** to poll until a
    terminal state (SUCCESS or FAILED).


    **Two error types (both endpoints):**

    - **HTTP non-200 (400/401):** Request failed (validation, auth, invalid
    token). Response body is an **error** object only (errorCode, message,
    description). No transaction created.

    - **HTTP 200 with status FAILED:** Request accepted; transaction exists but
    initiation/verification failed. Response body has **status: "FAILED"** and
    an **error** object (errorCode, message, description). Use the **error**
    param for details; see the error code reference in the schemas.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/initiate/sna:
    post:
      tags:
        - SILENT_AUTH
      summary: Initiate SNA
      description: >
        Creates a new Silent Network Authentication transaction for the given
        phone number.

        Returns a **requestId** (token) and **status** (`INIT` or `FAILED`). Use
        **requestId** for the Status API.

        The `link` returned must be opened from the user's device over **mobile
        data** for verification to succeed.
      operationId: initiateSna
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/InitiateSnaRequest'
      responses:
        '200':
          description: >
            **HTTP 200** — Request accepted. Inspect **status** in body:

            - **INIT** — Transaction created; use requestId and link.

            - **PENDING** — Transaction in progress; poll the Status API with
            requestId.

            - **FAILED** — Initiation failed; body has **status: "FAILED"** and
            **error** (errorCode, message, description). No 400/401; failure is
            in the body.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InitiateSnaResponse'
              examples:
                INIT:
                  summary: Transaction initiated successfully
                  value:
                    requestId: txn_abc123xyz
                    status: INIT
                    link: https://sna.otpless.app/sna/continue/txn_abc123xyz
                    operator: JIO
                    phoneDetail:
                      operator: JIO
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: JIO
                      location: India
                      timeZones:
                        - Asia/Calcutta
                    simDetail:
                      operator: JIO
                      mcc: 404
                      mnc: 10
                    networkDetail:
                      ip: 2409:40c1:53:eaf6:85f0:3cd4:8747:8c5b
                      ipType: IPV6
                      operator: JIO
                PENDING:
                  summary: Transaction in progress
                  value:
                    requestId: txn_abc123xyz
                    status: PENDING
                    link: https://sna.otpless.app/sna/continue/txn_abc123xyz
                    operator: JIO
                    phoneDetail:
                      operator: JIO
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: JIO
                      location: India
                      timeZones:
                        - Asia/Calcutta
                    simDetail:
                      operator: JIO
                      mcc: 404
                      mnc: 10
                    networkDetail:
                      ip: 2409:40c1:53:eaf6:85f0:3cd4:8747:8c5b
                      ipType: IPV6
                      operator: JIO
                FAILED:
                  summary: FAILED — HTTP 200, status FAILED (e.g. operator mismatch)
                  value:
                    requestId: txn_abc123xyz
                    status: FAILED
                    error:
                      message: Operator mismatch
                      errorCode: SP40007
                      description: >-
                        The operator for this phone number doesn't match your
                        SIM or network. Please use the same device and number
                        you started with.
                    phoneDetail:
                      operator: JIO
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: AIRTEL
                      location: Mumbai, Maharashtra
                      timeZones:
                        - Asia/Calcutta
                    simDetail:
                      operator: AIRTEL
                      mcc: 404
                      mnc: 10
                    networkDetail:
                      ip: 2409:40c1:53:eaf6:85f0:3cd4:8747:8c5b
                      ipType: IPV6
                      operator: AIRTEL
        '400':
          description: >
            **HTTP 400.** Request rejected (invalid/missing params, validation).
            Body is **error** only (errorCode, message, description). No
            requestId; no transaction created. Possible errorCode values include
            7101 (invalid/missing params), 7102 (invalid phone), 7106 (missing
            phone), 7113 (invalid expiry 30–86400), 7123 (smart auth required),
            7124 (SNA must be first channel), 7160 (init failed).
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                invalid_params:
                  summary: Invalid or missing params (7101)
                  value:
                    errorCode: '7101'
                    message: Invalid parameters
                    description: >-
                      Required parameters missing or invalid (e.g. only one of
                      mcc/mnc sent).
                invalid_expiry:
                  summary: Invalid expiry (7113)
                  value:
                    errorCode: '7113'
                    message: Invalid expiry
                    description: Invalid expiry (must be 30–86400 seconds).
        '401':
          description: >
            **HTTP 401.** Unauthorized (invalid or missing
            clientId/clientSecret). Body is **error** only. No requestId; no
            transaction created. Possible errorCode 7012 (credentials empty) or
            7002 (invalid credentials).
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                invalid_credentials:
                  summary: Invalid credentials (7002)
                  value:
                    errorCode: '7002'
                    message: Invalid credentials
                    description: Invalid credentials.
                credentials_empty:
                  summary: Credentials empty (7012)
                  value:
                    errorCode: '7012'
                    message: Merchant credentials are empty
                    description: Merchant credentials are empty.
components:
  schemas:
    InitiateSnaRequest:
      type: object
      required:
        - phoneNumber
      properties:
        phoneNumber:
          type: string
          example: '919876543210'
          description: >-
            User mobile number including country code, without plus sign. Must
            be valid for the SILENT_AUTH flow.
        mcc:
          type: string
          example: '404'
          description: >-
            Mobile Country Code of the active data SIM. If provided, mnc must
            also be provided; if omitted, omit mnc as well.
        mnc:
          type: string
          example: '10'
          description: >-
            Mobile Network Code of the active data SIM. If provided, mcc must
            also be provided; if omitted, omit mcc as well.
        expiry:
          type: integer
          minimum: 30
          maximum: 86400
          example: 300
          description: >-
            Transaction expiry in seconds. Allowed range 30-86400. Omit for
            default.
        correlationId:
          type: string
          example: login-req-12345
          description: >-
            Merchant reference ID for request tracking. Echoed back in the
            Status API response and webhook.
        metadata:
          type: object
          additionalProperties: true
          description: >-
            Custom merchant metadata stored with the transaction; returned in
            Status responses.
    InitiateSnaResponse:
      type: object
      required:
        - requestId
        - status
      properties:
        requestId:
          type: string
          example: txn_abc123xyz
          description: Unique transaction identifier. Use this value in the Status API.
        status:
          type: string
          enum:
            - INIT
            - PENDING
            - FAILED
          description: >-
            INIT - transaction created; open link on device. PENDING -
            transaction in progress. FAILED - initiation failed; see error.
        link:
          type: string
          nullable: true
          example: https://sna.otpless.app/session/abc123
          description: >-
            SNA verification URL to be opened on the user device over mobile
            data. Omitted or null when status is FAILED.
        operator:
          type: string
          nullable: true
          example: JIO
          description: Operator selected or detected, when available.
        phoneDetail:
          $ref: '#/components/schemas/PhoneDetail'
        simDetail:
          $ref: '#/components/schemas/SimDetail'
        networkDetail:
          allOf:
            - $ref: '#/components/schemas/NetworkDetail'
            - description: SNA network details (e.g. IP, operator), when available.
        error:
          allOf:
            - $ref: '#/components/schemas/ErrorInBody'
            - description: Error details. Omitted when status is INIT.
    Error:
      type: object
      description: Error response body for HTTP 400/401.
      properties:
        errorCode:
          type: string
          description: >-
            Machine-readable error code. See error code reference for possible
            values (e.g. auth/validation, invalid requestId, token expired).
        message:
          type: string
        description:
          type: string
    PhoneDetail:
      type: object
      description: Phone-related enrichment details; fields omitted when not available.
      properties:
        operator:
          type: string
          example: JIO
          description: Operator name (e.g. JIO, AIRTEL, VI).
        countryCode:
          type: string
          example: '91'
        country:
          type: string
          example: IN
        type:
          type: string
          example: mobile
          description: Phone type.
        homeOperator:
          type: string
          example: JIO
        location:
          type: string
          example: India
          description: Location string (city, state, or country).
        timeZones:
          type: array
          items:
            type: string
          example:
            - Asia/Calcutta
          description: IANA time zones for the phone's location.
        isPorted:
          type: boolean
          description: Whether the number is ported.
    SimDetail:
      type: object
      description: SIM-related details; fields omitted when not available.
      properties:
        operator:
          type: string
          example: JIO
          description: SIM operator.
        mcc:
          type: integer
          example: 404
          description: Mobile Country Code.
        mnc:
          type: integer
          example: 10
          description: Mobile Network Code.
    NetworkDetail:
      type: object
      description: >-
        Network details at the time of the request. Contains the IP, IP type,
        and operator detected for the transaction. Fields omitted when not
        available.
      properties:
        ip:
          type: string
          example: 2409:40c1:53:eaf6:85f0:3cd4:8747:8c5b
          description: IP address (IPv4 or IPv6) detected for the transaction.
        ipType:
          type: string
          nullable: true
          example: IPV6
          description: 'IP version: IPV4 or IPV6.'
        operator:
          type: string
          example: JIO
          description: Network operator detected at request time.
    ErrorInBody:
      type: object
      description: >-
        Error object inside 200 response when status is FAILED. Contains
        errorCode, message, and description returned by the API.
      properties:
        errorCode:
          type: string
          description: >
            When status=FAILED, possible values include: SP30002 (auth already
            initiated), SP40003–SP40011 (verification, operator, country, phone,
            or internal), SP50001 (internal error), 7130 (verification failed),
            7128 (provider failed to verify), 7129 (provider IP mismatch). Use
            message and description for display.
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
