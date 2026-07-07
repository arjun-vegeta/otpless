> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get New Session Token

> Fetches a new `sessionToken` using the `refreshToken` provided by OTPLESS. The `sessionToken` is a short lived token that must be replaced by a new token when the current token expires. `refreshToken` has a longer expiry and is used to create a new `sessionToken` till the `refreshToken` is valid. This server-to-server call requires the `clientId` and `clientSecret`.

<Accordion title="💡 About Get New Session Token API">
  Creates a new `sessionToken` when the old `sessionToken` expires using the `refreshToken` issued by OTPLESS on successful authentication.
</Accordion>

## OpenAPI

```yaml POST /v1/sessions/get-new-session-token
openapi: 3.0.3
info:
  title: Get New Session Token
  version: 1.0.0
servers:
  - url: https://user-auth.otpless.app
    description: Passwordless Authentication Service
security:
  - clientIdHeader: []
    clientSecretHeader: []
paths:
  /v1/sessions/get-new-session-token:
    post:
      summary: Get New Session Token
      description: >-
        Fetches a new `sessionToken` using the `refreshToken` provided by
        OTPLESS. The `sessionToken` is a short lived token that must be replaced
        by a new token when the current token expires. `refreshToken` has a
        longer expiry and is used to create a new `sessionToken` till the
        `refreshToken` is valid. This server-to-server call requires the
        `clientId` and `clientSecret`.
      operationId: getNewSessionToken
      requestBody:
        description: >-
          Payload containing the `refreshToken` received from OTPLESS
          authentication.
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                refreshToken:
                  type: string
                  description: The token used to refresh the session.
                  example: REFRESH_TOKEN_FROM_OTPLESS
              required:
                - refreshToken
      responses:
        '200':
          description: The user's information was successfully retrieved.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetNewSessionTokenResponse'
        '400':
          description: Bad Request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '500':
          description: Internal Server Error
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Something went wrong. Please try again!
      x-codeSamples:
        - lang: shell
          label: cURL
          source: >
            curl --location
            'https://user-auth.otpless.app/v1/sessions/get-new-session-token' \

            --header 'clientId: YOUR_CLIENT_ID' \

            --header 'clientSecret: YOUR_CLIENT_SECRET' \

            --header 'Content-Type: application/json' \

            --data '{
                "refreshToken": "REFRESH_TOKEN_FROM_OTPLESS"
            }'
components:
  schemas:
    GetNewSessionTokenResponse:
      type: object
      properties:
        success:
          type: boolean
          description: Indicates whether the operation was successful.
          example: true
        data:
          type: object
          properties:
            sessionId:
              type: string
              description: Unique session identifier provided by OTPLESS.
              example: SESSION_ID_FROM_OTPLESS
            refreshToken:
              type: string
              description: A token that can be used to refresh the session.
              example: REFRESH_TOKEN_FROM_OTPLESS
            sessionToken:
              type: string
              description: A token representing the current session.
              example: SESSION_TOKEN_FROM_OTPLESS
    BadRequestResponse:
      type: object
      properties:
        message:
          type: string
          description: A brief description of the error.
          example: Unexpected Error
        errorCode:
          type: string
          example: '7414'
        description:
          type: string
          example: Session not present
    UnauthorizedResponse:
      type: object
      properties:
        message:
          type: string
          description: A brief description of the error.
          example: Unexpected Error
        errorCode:
          type: string
          example: '7415'
        description:
          type: string
          example: Session is not in active state
  securitySchemes:
    clientIdHeader:
      type: apiKey
      in: header
      name: clientId
      description: The `clientId` used for API authentication.
    clientSecretHeader:
      type: apiKey
      in: header
      name: clientSecret
      description: The `clientSecret` used for API authentication.
```
