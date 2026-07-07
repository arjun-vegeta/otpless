> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate RequestId

> Revokes user session by exchanging the `sessionToken` obtained from the otpless after successful authentication. This server-to-server call requires the `clientId` and `clientSecret`.

<Accordion title="💡 About RequestId API">
  This API is used to generate a RequestId that will be used for authorization via passkey.
</Accordion>

## OpenAPI

```yaml POST /auth/v1/webauthn
openapi: 3.0.3
info:
  title: Generate RequestId for Passkeys
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Passwordless Authentication Service
security:
  - clientIdHeader: []
    clientSecretHeader: []
paths:
  /auth/v1/webauthn:
    post:
      summary: Generate Request Id
      description: >-
        Revokes user session by exchanging the `sessionToken` obtained from the
        otpless after successful authentication. This server-to-server call
        requires the `clientId` and `clientSecret`.
      operationId: generateRequestId
      requestBody:
        description: >-
          Payload containing the identityType (MOBILE, EMAIL OR CUSTOM),
          identityValue, rpName and domain.
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                identityType:
                  type: string
                  description: >-
                    The type of the identity for which you want to create a
                    passkey. For creating a passkey for a phone number, use
                    MOBILE, for email id, use EMAIL and for a custom name of the
                    passkey that is to be created, use CUSTOM.
                identityValue:
                  type: string
                  description: >-
                    The value of the identity. In case of MOBILE, identityValue
                    must be prefixed with the country code with plus (eg.
                    +919999xxxxx9). In case of CUSTOM, minimum length of the
                    identityValue is 6.
                rpName:
                  type: string
                  description: >-
                    The rpName is a human-readable name for the Relying Party
                    (RP)—the entity (e.g., a website or app) that is requesting
                    authentication using WebAuthn (Passkey).
                domain:
                  type: string
                  description: >-
                    The domain of your website. The value of domain should not
                    be prefixed with `http` or `https`. Eg. example.com
              required:
                - identityType
                - identityValue
                - rpName
                - domain
      responses:
        '200':
          description: >-
            A requestId was successfully generated for the provided request
            payload.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestIdGenerationResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
      x-codeSamples:
        - lang: shell
          label: cURL
          source: |
            curl --location 'https://auth.otpless.app/auth/v1/webauthn' \
            --header 'clientId: YOUR_CLIENT_ID' \
            --header 'clientSecret: YOUR_CLIENT_SECRET' \
            --header 'Content-Type: application/json' \
            --data '{
                "identityType":"IDENTIFIER_TYPE",
                "identityValue":"IDENTIFIER_VALUE",
                "rpName":"RP_NAME",
                "domain":"DOMAIN"
              }'
components:
  schemas:
    RequestIdGenerationResponse:
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
          example: Invalid Request
        errorCode:
          type: string
          example: '7132'
        description:
          type: string
          example: 'Request error: Invalid identity value'
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
