> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OAuth Authentication

> This endpoint initiates an WhatsApp OAuth authentication flow using the specified channel.

<Accordion title="💡 What is OAuth?">
  In OAuth  users can authenticate via multiple OAuth-enabled channels. The process completes when the code returned in the `redirectURI` is used in Verify Code API to authenticate the user.
</Accordion>

<Accordion title="💡 What all channels are supported in OAuth flow?">
  The channels supported in the OAuth flow for OTPless are:

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
</Accordion>

<Accordion title="💡 How to verify an OAuth Request?">
  In case of `OAuth`, extract the `code` parameter from the redirect URI and use the Verify Code API to authenticate the user.
</Accordion>

<Accordion title="💡 What's Redirect URI?">
  It is the URL where the user will be redirected after completing the OAuth flow with appended param `code` and its value.
  [Know more](/knowledge-base/redirect-uri)
</Accordion>

<Warning>
  This API is accessible exclusively to users subscribed to the OTPless Pro plan.
  Ensure you have an active [OTPless Pro Plan](https://otpless.com/dashboard/customer/connectors/OTPLESS_PRO) subscription to utilize this feature.
</Warning>

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
