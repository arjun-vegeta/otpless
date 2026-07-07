> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Send OTP (Email)

> This endpoint initiates an OTP to be sent to the specified email.

<Warning>
  This API is accessible exclusively to users subscribed to the OTPless Pro plan.
  Ensure you have an active [OTPless Pro Plan](https://otpless.com/dashboard/customer/connectors/OTPLESS_PRO) subscription to utilize this feature.
</Warning>

## OpenAPI

```yaml POST /auth/v1/initiate/otp
openapi: 3.0.3
info:
  title: OTPless Authentication API
  description: API for initiating OTP using OTPless.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/initiate/otp:
    post:
      summary: Initiate OTP
      description: |
        This endpoint initiates an OTP to be sent to the specified email.
      operationId: initiateOtp
      requestBody:
        required: true
        content:
          application/json:
            schema:
              required:
                - email
                - channels
              type: object
              properties:
                email:
                  type: string
                  example: your@email.com
                  description: >-
                    The phone number to which the OTP will be sent, including
                    country code.
                expiry:
                  type: integer
                  example: 30
                  description: The expiration time for the OTP in seconds.
                otpLength:
                  type: integer
                  example: 4
                  enum:
                    - 4
                    - 6
                  description: The length of the OTP, either 4 or 6.
                channels:
                  type: array
                  items:
                    type: string
                    enum:
                      - EMAIL
                  example:
                    - EMAIL
                  description: >
                    An array specifying the channels through which the OTP will
                    be sent. 

                    Supported channels include `WHATSAPP`, `SMS`, `VOICE_CALL`,
                    and `VIBER`. 

                    If multiple channels are provided, a smart authentication
                    flow is activated, 

                    which automatically falls back to the next channel in the
                    array if the OTP 

                    delivery fails or if the user does not verify within the
                    expected time frame.
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
          description: OTP initiated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  requestId:
                    type: string
                    example: unique_request_id
                    description: The unique identifier for the OTP request.
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
          description: Unauthorized. Access blocked.
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
