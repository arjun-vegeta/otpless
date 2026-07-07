> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WhatsApp OAuth

> This endpoint initiates an WhatsApp OAuth authentication flow using the specified channel.

<Accordion title="💡 What is WhatsApp OAuth?">
  WhatsApp OAuth is part of the user-initiated WhatsApp authentication flow. For more details, please visit [here](https://otpless.com/docs/knowledge-base/whatsapp-authentication).
</Accordion>

<Accordion title="💡 How to verify an WhatsApp OAuth Request?">
  "After opening link recieved in the WhatsApp OAuth request user enter a chat on WhatsApp with a verified business number, where they send a pre-filled sign-in request message.
  Upon sending, users swiftly receive an approval button. Clicking this button redirects users back to the redirectURI provided in the request of WhatsApp OAuth.
  From redirect Uri extract the `code` parameter and use the Verify Code API to authenticate the user."
</Accordion>

<Accordion title="💡 What's Redirect URI?">
  It is the URL where the user will be redirected after clicking the link received on Whatsapp.
  The Redirect URI serves as the endpoint for receiving the authentication code
  upon successful authentication. [Know more](/knowledge-base/redirect-uri)
</Accordion>

## OpenAPI

```yaml POST /auth/v1/initiate/oauth
openapi: 3.0.3
info:
  title: OTPless Authentication API
  description: API for initiating OAuth authentication using OTPless.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/initiate/oauth:
    post:
      summary: Initiate OAuth
      description: >
        This endpoint initiates an OAuth authentication flow using the specified
        channel like WHATSAPP, GOOGLE, FACEBOOK and many other social channels.
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
                  example: WHATSAPP
                  enum:
                    - WHATSAPP
                    - TWITTER
                    - GOOGLE
                    - APPLE
                    - LINKEDIN
                    - MICROSOFT
                    - FACEBOOK
                    - INSTAGRAM
                    - LINE
                    - SLACK
                    - DROPBOX
                    - GITHUB
                    - BITBUCKET
                    - ATLASSIAN
                    - LINEAR
                    - GITLAB
                    - TIKTOK
                    - TWITCH
                    - TELEGRAM
                    - HUBSPOT
                    - NOTION
                    - BOX
                    - XERO
                  description: >-
                    The channel for which the OAuth request link will be
                    created.
                redirectURI:
                  type: string
                  example: your://redirecturi
                  description: >-
                    The URI to which the user will be redirected after
                    authentication.
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
