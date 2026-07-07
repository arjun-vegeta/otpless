> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Send OTP Link (Email)

> This endpoint initiates an OTP link to be sent to the specified email or phone number using the provided channels.

<Accordion title="💡 What is an OTP Link?">
  An OTP link is a message that contains a one-time password (OTP) and a magic link, allowing the user to either enter the OTP manually or simply click the link for quick authentication.
  It combines security and convenience in one message.
</Accordion>

<Accordion title="💡 How to verify an OTP Link?">
  An OTP link can be verified in two ways:
  If it's an `OTP`, use the OTP entered by the user or auto-read in the application and validate it using the Verify OTP API.
  If it's a `Magic link`, extract the `code` parameter from the redirect URI and use the Verify Code API to authenticate the user.
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

```yaml POST /auth/v1/initiate/otplink
openapi: 3.0.3
info:
  title: OTPless Authentication API
  description: API for initiating OTP links using OTPless.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/initiate/otplink:
    post:
      summary: Initiate OTP Link
      description: >
        This endpoint initiates an OTP link to be sent to the specified email or
        phone number using the provided channels.
      operationId: initiateOtpLink
      requestBody:
        required: true
        content:
          application/json:
            schema:
              required:
                - channels
                - redirectURI
                - email
              type: object
              properties:
                redirectURI:
                  type: string
                  example: your_redirect_uri_link
                  description: The URI to redirect the user after verification.
                expiry:
                  type: integer
                  example: 120
                  description: The expiration time for the OTP in seconds.
                otpLength:
                  type: integer
                  example: 4
                  enum:
                    - 4
                    - 6
                  description: The length of the OTP, either 4 or 6.
                email:
                  type: string
                  example: your@email.com
                  description: The email to which the OTP will be sent.
                channels:
                  type: array
                  items:
                    type: string
                    enum:
                      - EMAIL
                  example:
                    - EMAIL
                  description: >
                    An array specifying the channels through which the OTP link
                    will be sent. 

                    Supported channels include `EMAIL`.
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
          description: OTP link initiated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  requestId:
                    type: string
                    example: unique_request_id
                    description: The unique identifier for the OTP link request.
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
