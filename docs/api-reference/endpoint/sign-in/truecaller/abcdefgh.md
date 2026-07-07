> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Truecaller Authentication

> This endpoint initiates an Truecaller authentication flow.

<Accordion title="💡 How to verify an Truecaller authentication Request?">
  In case of `Truecaller`, extract the `requestId` parameter from the initiate request and use the `requestId` in Request Status API to authenticate the user.
</Accordion>

<Note>
  This API is accessible exclusively to users subscribed to the OTPless Pro plan.
  Ensure you have an active [OTPless Pro Plan](https://otpless.com/dashboard/customer/connectors/OTPLESS_PRO) subscription to utilize this feature.
</Note>

## OpenAPI

```yaml POST /v1/initiate/oauth
openapi: 3.0.3
info:
  title: OTPless Authentication API
  description: API for initiating OAuth authentication using OTPless.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app/auth/
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /v1/initiate/oauth:
    post:
      summary: Initiate OAuth
      description: |
        This endpoint initiates an Truecaller authentication flow.
      operationId: initiateOauth
      requestBody:
        required: true
        content:
          application/json:
            schema:
              required:
                - channel
                - redirectURI
              type: object
              properties:
                channel:
                  type: string
                  example: TRUE_CALLER
                  enum:
                    - TRUE_CALLER
                  description: >-
                    The channel for which the OAuth request link will be
                    created.
      responses:
        '200':
          description: OAuth link generated successfully.
          content:
            application/json:
              schema:
                type: object
                properties:
                  requestId:
                    type: string
                    example: unique_request_id
                    description: The unique identifier for the OAuth request.
                  link:
                    type: string
                    example: https://otpless.me/e3r3
                    description: The OAuth link generated for authentication.
        '400':
          description: Bad request. Invalid input.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Invalid Request
                    description: A brief description of the error.
                  errorCode:
                    type: string
                    example: Error Code
                    description: A specific code representing the error type.
                  description:
                    type: string
                    example: Error Code description
                    description: Detailed description of the error.
        '401':
          description: Unauthorized. Access blocked.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Access blocked
                    description: A brief description of the error.
                  description:
                    type: string
                    example: Error Description
                    description: Detailed description of the error.
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
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: clientId
    ApiSecretAuth:
      type: apiKey
      in: header
      name: clientSecret
```
