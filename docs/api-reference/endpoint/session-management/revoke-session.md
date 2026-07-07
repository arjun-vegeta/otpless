> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Revoke User Session

> Revokes user session by exchanging the `sessionToken` obtained from the otpless after successful authentication. This server-to-server call requires the `clientId` and `clientSecret`.

<Accordion title="💡 About Revoke Session API">
  Revoke Session API is used to revoke a user session. Revoke Session API should be called when a user logs out.
</Accordion>

## OpenAPI

```yaml POST /v1/sessions/revoke-session
openapi: 3.0.3
info:
  title: Revoke User Session
  version: 1.0.0
servers:
  - url: https://user-auth.otpless.app
    description: Passwordless Authentication Service
security:
  - clientIdHeader: []
    clientSecretHeader: []
paths:
  /v1/sessions/revoke-session:
    post:
      summary: Revoke User Session
      description: >-
        Revokes user session by exchanging the `sessionToken` obtained from the
        otpless after successful authentication. This server-to-server call
        requires the `clientId` and `clientSecret`.
      operationId: revokeUserSessionUsingsessionToken
      requestBody:
        description: >-
          Payload containing the sessionToken received from otpless
          authentication and client credentials for verification.
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                sessionToken:
                  type: string
                  description: The unique identifier of the session.
              required:
                - sessionToken
      responses:
        '200':
          description: The user's session was successfully revoked.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RevokeSessionDetailsResponse'
        '400':
          description: Unexpected Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
        '401':
          description: Unexpected Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '500':
          description: Internal server error.
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
            'https://user-auth.otpless.app/v1/sessions/revoke-session' \

            --header 'clientId: YOUR_CLIENT_ID' \

            --header 'clientSecret: YOUR_CLIENT_SECRET' \

            --header 'Content-Type: application/json' \

            --data '{
                "sessionToken":"RECEIVED_SESSION_TOKEN_FROM_OTPLESS"
            }'
components:
  schemas:
    RevokeSessionDetailsResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
    BadRequestResponse:
      type: object
      properties:
        message:
          type: string
          example: Unexpected Error
          description: A brief description of the error.
        errorCode:
          type: string
          example: '7414'
        description:
          type: string
          example: session not present
    UnauthorizedResponse:
      type: object
      properties:
        message:
          type: string
          example: Unexpected Error
        errorCode:
          type: string
          example: '7415'
        description:
          type: string
          example: session is not in active state
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
