> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify Code

> This endpoint validates the code received via a Magic link / OAuth request to complete user authentication.

<Accordion title="💡 What's authorization code?">
  Suppose you specify [https://example.com/login](https://example.com/login) as the Redirect URI in authorize endpoint. After the user clicks the Magic Link received to his Mobile or Email, they will be redirected to:

```html theme={null}
https://example.com/login?code=1234abcd
```

Here, 1234abcd represents the authorization code.
</Accordion>

## OpenAPI

```yaml POST /auth/v1/verify/code
openapi: 3.0.3
info:
  title: OTPless Authentication API
  description: API for verifying a code using OTPless.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/verify/code:
    post:
      summary: Verify Code
      description: >
        This endpoint validates the code received via a Magic link / OAuth
        request to complete user authentication.
      operationId: verifyCode
      requestBody:
        required: true
        content:
          application/json:
            schema:
              required:
                - code
              type: object
              properties:
                code:
                  type: string
                  example: CODE
                  description: The code to be verified.
      responses:
        '200':
          description: Code verified successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  requestId:
                    type: string
                    example: unique_request_id
                    description: The unique identifier for the code verification request.
                  message:
                    type: string
                    example: Code verified successfully
                    description: A message indicating the result of the verification.
                  userDetails:
                    type: object
                    properties:
                      token:
                        type: string
                        example: tokenvalue
                      status:
                        type: string
                        example: SUCCESS
                      completedAt:
                        type: integer
                        example: 1724276345786
                      identities:
                        type: array
                        items:
                          type: object
                          properties:
                            identityType:
                              type: string
                              example: MOBILE/EMAIL
                            identityValue:
                              type: string
                              example: IdentityValue
                            channel:
                              type: string
                              example: MAGIC_LINK
                            methods:
                              type: array
                              items:
                                type: string
                                example: WHATSAPP/SMS/VIBER/EMAIL
                            verified:
                              type: boolean
                              example: true
                            verifiedTimestamp:
                              type: integer
                              example: 1724276345786
                      network:
                        type: object
                        properties:
                          ip:
                            type: string
                            example: 192.168.0.1
                      deviceInfo:
                        type: object
                        properties:
                          userAgent:
                            type: string
                            example: >-
                              Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
                              AppleWebKit/537.36 (KHTML, like Gecko)
                              Chrome/127.0.0.0 Safari/537.36
                          platform:
                            type: string
                            example: MacIntel
                          vendor:
                            type: string
                            example: Google Inc.
                          language:
                            type: string
                            example: en-GB
                          cookieEnabled:
                            type: boolean
                            example: true
                          screenWidth:
                            type: integer
                            example: 1512
                          screenHeight:
                            type: integer
                            example: 982
                          screenColorDepth:
                            type: integer
                            example: 30
                          devicePixelRatio:
                            type: number
                            example: 2
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
          description: Internal Server Error. Something went wrong.
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
