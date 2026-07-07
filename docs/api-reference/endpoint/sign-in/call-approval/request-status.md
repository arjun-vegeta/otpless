> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Request Status

<Accordion title="💡 What is Request Status API?">
  This endpoint retrieves the status of an ongoing authentication request using the provided `requestId`.
</Accordion>

## OpenAPI

```yaml POST /auth/v1/status
openapi: 3.0.3
info:
  title: OTPless Status API
  description: API for retrieving the status of an authentication request.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/status:
    post:
      summary: Retrieve Authentication Status
      description: >
        This endpoint retrieves the status of an ongoing authentication request
        using the provided request ID.
      operationId: retrieveStatus
      requestBody:
        required: true
        content:
          application/json:
            schema:
              required:
                - requestId
              type: object
              properties:
                requestId:
                  type: string
                  example: unique_request_id
                  description: The unique request ID of the authentication process.
      responses:
        '200':
          description: Status retrieved successfully.
          content:
            application/json:
              schema:
                type: object
                oneOf:
                  - type: object
                    properties:
                      token:
                        type: string
                        example: unique_token_for_transaction
                        description: A token representing the completed transaction.
                      status:
                        type: string
                        example: SUCCESS
                        description: The status of the authentication.
                      completedAt:
                        type: integer
                        example: 1725945420000
                        description: The timestamp when the authentication was completed.
                      identities:
                        type: array
                        items:
                          type: object
                          properties:
                            identityType:
                              type: string
                              example: MOBILE
                              description: The type of identity used.
                            identityValue:
                              type: string
                              example: USER_PHONENUMBER
                              description: The value of the identity.
                            channel:
                              type: string
                              example: VOICE_APPROVAL
                              description: The channel used for the authentication.
                            methods:
                              type: array
                              items:
                                type: string
                                example: VOICE_CALL
                              description: The methods used for authentication.
                            verified:
                              type: boolean
                              example: true
                              description: Whether the identity was verified.
                            verifiedTimestamp:
                              type: integer
                              example: 1725945420000
                              description: The timestamp when the identity was verified.
                  - type: object
                    properties:
                      status:
                        type: string
                        example: PENDING
                        description: The status of the authentication request.
                      message:
                        type: string
                        example: Authentication not completed, please try again later.
                        description: A message describing the current status.
                  - type: object
                    properties:
                      status:
                        type: string
                        example: DECLINE
                        description: The status of the authentication request.
                      message:
                        type: string
                        example: >-
                          Authentication failed. User declined the
                          authentication.
                        description: >-
                          A message describing why the authentication was
                          declined.
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
