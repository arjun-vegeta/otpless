> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Send Magic link (Email)

> This endpoint initiates a Magic Link to be sent to the specified email address using the provided channels.
> It enables a smart authentication flow if multiple channels are specified in the request.

<Accordion title="💡 How to verify an Magic Link?">
  In case of `Magic link`, extract the `code` parameter from the redirect URI and use the Verify Code API to authenticate the user.
</Accordion>

<Accordion title="💡 What's Redirect URI?">
  It is the URL where the user will be redirected after clicking the magic link.
  The Redirect URI serves as the endpoint for receiving the authentication code
  upon successful authentication. [Know more](/knowledge-base/redirect-uri)
</Accordion>

<Warning>
  This API is accessible exclusively to users subscribed to the OTPless Pro plan.
  Ensure you have an active [OTPless Pro Plan](https://otpless.com/dashboard/customer/connectors/OTPLESS_PRO) subscription to utilize this feature.
</Warning>

## OpenAPI

```yaml POST /v1/initiate/magiclink
openapi: 3.0.3
info:
  title: OTPless Authentication API
  description: API for initiating a Magic Link using OTPless.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app/auth
    description: Production server
security:
  - clientId: []
    clientSecret: []
paths:
  /v1/initiate/magiclink:
    post:
      summary: Initiate Magic Link
      description: >
        This endpoint initiates a Magic Link to be sent to the specified email
        address using the provided channels.

        It enables a smart authentication flow if multiple channels are
        specified in the request.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - redirectURI
                - email
                - channels
              properties:
                redirectURI:
                  type: string
                  example: your_redirect_uri_link
                  description: >-
                    The URL to which the user will be redirected after
                    successful authentication.
                expiry:
                  type: integer
                  example: 60
                  description: The expiration time for the Magic Link in seconds.
                email:
                  type: string
                  example: your@email.com
                  description: The email address to which the Magic Link will be sent.
                channels:
                  type: array
                  items:
                    type: string
                    enum:
                      - EMAIL
                  example:
                    - EMAIL
                  description: >
                    An array specifying the channels through which the Magic
                    Link will be sent. 

                    Currently, only the `EMAIL` channel is supported.
                metadata:
                  type: object
                  additionalProperties:
                    type: string
                  example:
                    key1: Data1
                    key2: Data2
                  description: Additional metadata for the request.
      responses:
        '200':
          description: Magic Link initiated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  requestId:
                    type: string
                    example: unique_request_id
                    description: The unique identifier for the Magic Link request.
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
                  description:
                    type: string
                    example: Error Description
        '500':
          description: Internal server error. Something went wrong.
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
    clientId:
      type: apiKey
      in: header
      name: clientId
    clientSecret:
      type: apiKey
      in: header
      name: clientSecret
```
