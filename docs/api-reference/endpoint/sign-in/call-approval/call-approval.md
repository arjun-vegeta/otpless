> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Phone Call Approval

> This endpoint initiates a Phone Call Approval request to the specified phone number.

<Accordion title="💡 What is Phone call Approval?">
  In this request, the user receives an automated call on their specified phone number where they are prompted to either approve or reject a transaction. This feature allows for direct confirmation of user intent, enhancing security and ensuring that transactions are authorized by the user.
</Accordion>

<Accordion title="💡 How to verify an Phone Approval request?">
  To verify a Phone Call Approval request, the `requestId` received during the initiation can be used with the Request Status API. This API checks the status of the user's decision, confirming whether the transaction was approved or rejected. By passing the `requestId`, you can retrieve the current status and proceed based on the user's confirmation.
</Accordion>

<Note>
  This API is accessible exclusively to users subscribed to the OTPless Pro plan.
  Ensure you have an active [OTPless Pro Plan](https://otpless.com/dashboard/customer/connectors/OTPLESS_PRO) subscription to utilize this feature.
</Note>

## OpenAPI

```yaml POST /auth/v1/initiate/voice_approval
openapi: 3.0.3
info:
  title: OTPless Voice Approval API
  description: API for initiating a voice approval process using OTPless.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v1/initiate/voice_approval:
    post:
      summary: Initiate Voice Approval
      description: >
        This endpoint initiates a Phone Call Approval request to the specified
        phone number.
      operationId: initiateVoiceApproval
      requestBody:
        required: true
        content:
          application/json:
            schema:
              required:
                - phoneNumber
              type: object
              properties:
                phoneNumber:
                  type: string
                  example: '917406859499'
                  description: >-
                    The phone number to which the voice approval request will be
                    sent.
      responses:
        '200':
          description: Voice approval request initiated successfully.
          content:
            application/json:
              schema:
                type: object
                properties:
                  requestId:
                    type: string
                    example: unique_request_id
                    description: The unique identifier for the voice approval request.
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
