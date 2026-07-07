> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Send Message

> Sends messages across different channels like WhatsApp, SMS, or Email based on the provided parameters.

## OpenAPI

```yaml POST /v1/api/send
openapi: 3.0.3
info:
  title: Messaging API
  description: Use this API for sending messages to your users WhatsApp Number.
  version: 1.0.0
servers:
  - url: https://marketing.otpless.app
    description: Base URL for the Messaging Services
security: []
paths:
  /v1/api/send:
    post:
      summary: Send a message via various channels
      description: >-
        Sends messages across different channels like WhatsApp, SMS, or Email
        based on the provided parameters.
      operationId: sendMessage
      requestBody:
        description: Payload containing parameters for sending the message.
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MessageRequest'
            examples:
              TemplateMessageWithoutVariable:
                summary: Template Message without Variable
                value:
                  sendTo: recipient_phone_number
                  channel: WHATSAPP
                  templateId: template_id
              TemplateMessageWithVariables:
                summary: Template Message with Variables
                value:
                  sendTo: recipient_phone_number
                  channel: WHATSAPP
                  templateId: template_id
                  headerValues:
                    '1': header_value
                  bodyValues:
                    '1': body_value
                  buttonValues:
                    '1': button_value
              TemplateMessageWithMedia:
                summary: Template Message with Media
                value:
                  sendTo: recipient_phone_number
                  channel: WHATSAPP
                  templateId: template_id
                  headerValues:
                    '1': image_url
              ServiceMessage:
                summary: Service Message (2-way Communication)
                value:
                  sendTo: recipient_phone_number
                  channel: WHATSAPP
                  message: Your text message here
      responses:
        '200':
          description: Request successfully sent.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'
              example:
                status: 200
                success: true
                message: Request successfully sent to Meta.
                data:
                  requestId: nijwbeiu234o2i01
                  orderId: 8790873hjknbvh
        '400':
          description: Bad Request - Incorrect or missing request parameters.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                status: 400
                errorCode: InvalidRequest
                success: false
                message: The request parameters are incorrect, see details.
                data:
                  required: sendTo field is required.
        '401':
          description: Unauthorized - Authentication failure.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                status: 401
                errorCode: Unauthorized
                success: false
                message: Failed authentication due to incorrect credentials.
        '429':
          description: Rate Limit Exceeded.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                status: 429
                errorCode: RateLimitExceeded
                success: false
                message: Exceeded the number of allowed requests.
        '500':
          description: Internal Server Error.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                status: 500
                errorCode: InternalServerError
                success: false
                message: Unexpected server error.
      security:
        - clientIdHeader: []
          clientSecretHeader: []
components:
  schemas:
    MessageRequest:
      type: object
      properties:
        sendTo:
          type: string
          description: The recipient's phone number with country code.
        channel:
          type: string
          description: >-
            The messaging channel for sending the message. Accepted values are
            `WHATSAPP`, `EMAIL`, `SMS`.
        templateId:
          type: string
          description: >-
            Identifier for a pre-defined message template, required if 'message'
            is not used.
        message:
          type: string
          description: The text of the message, required if 'templateId' is not used.
        headerValues:
          type: object
          description: >-
            Variables for personalizing the header in template messages. If you
            have created the template with media then pass the public URL for
            the media.
          additionalProperties:
            type: string
        bodyValues:
          type: object
          description: Variables for personalizing the body in template messages.
          additionalProperties:
            type: string
        buttonValues:
          type: object
          description: Variables for dynamic buttons in template messages.
          additionalProperties:
            type: string
        orderId:
          type: string
          description: A unique Identifier for the order or message.
      required:
        - sendTo
        - channel
    SuccessResponse:
      type: object
      properties:
        status:
          type: integer
          example: 200
        success:
          type: boolean
          example: true
        message:
          type: string
          example: Request successfully sent to Meta.
        data:
          type: object
          properties:
            requestId:
              type: string
              example: nijwbxxxxxo2i01
            orderId:
              type: string
              example: 879xxxxxxnbvh
    ErrorResponse:
      type: object
      properties:
        status:
          type: integer
        errorCode:
          type: string
        success:
          type: boolean
        message:
          type: string
        data:
          type: object
          additionalProperties: true
  securitySchemes:
    clientIdHeader:
      type: apiKey
      in: header
      name: clientId
      description: Your unique client identifier.
    clientSecretHeader:
      type: apiKey
      in: header
      name: clientSecret
      description: A secret key associated with your client ID for authentication.
```
