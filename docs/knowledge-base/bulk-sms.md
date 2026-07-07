> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Send Batch Notifications via SMS

> Learn how to leverage the OTPless Messaging API to send batch notifications via SMS. This guide will walk you through the process, covering both marketing and transactional use cases.

<Tabs>
  <Tab title="V3-OpenBody">
    ## Request

    ```
    POST https://user-auth.otpless.app/notification/v3/batch/send
    ```

    ### Headers

    * `clientId`: Your client ID provided by OTPless.
    * `clientSecret`: Your client secret provided by OTPless.
    * `Content-Type`: application/json

    ### Body

    * `channel` (String, required): The notification channel. For SMS, use `"SMS"`.
    * `dltTemplateId` (String, required): The DLT template ID will be provided by OTPless.
    * `dltTemplateText` (String, required): The template text, which will be static and provided as-is.
    * `recipients` (Array of Objects, required): An array of recipient objects.
      * `sendTo` (String, required): The phone number of the recipient.
      * `metadata` (JsonObject, optional): A JSON object for any additional metadata. Will be attached to the delivery status [webhook](/knowledge-base/webhook-v2) notification data.

    > The `metadata` field is optional and can be used to send any additional data.

    <Info>Max recipients allowed is 1500.</Info>

    ## Example Request

    <CodeGroup>
      ```bash DLT Template Id theme={null}
      curl --location 'https://user-auth.otpless.app/notification/v3/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "dltTemplateId": "YOUR_DLT_TEMPLATE_ID",
          "dltTemplateText": "Static text",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "metadata": {}
              }
          ]
      }'
      ```
    </CodeGroup>

    ## Sample Error Responses

    <Tabs>
      <Tab title="Invalid Channel">
        ```json theme={null}
        {
          "message": "Invalid channel"
        }
        ```
      </Tab>

      <Tab title="Missing DLT Template">
        ```json theme={null}
        {
          "message": "DLT template body is missing"
        }
        ```
      </Tab>

      <Tab title="Missing Template ID">
        ```json theme={null}
        {
          "message": "Template id is missing"
        }
        ```
      </Tab>

      <Tab title="Empty Recipient">
        ```json theme={null}
        {
          "message": "Empty recipient details are not allowed."
        }
        ```
      </Tab>

      <Tab title="Authorization Error">
        ```json theme={null}
        {
          "message": "Access blocked",
          "errorCode": "7002",
          "description": "Authorization error: Invalid credentials"
        }
        ```
      </Tab>
    </Tabs>

  </Tab>

  <Tab title="V3">
    ## Request

    ```
    POST https://auth.otpless.app/notification/v3/batch/send
    ```

    ### Headers

    * `clientId`: Your client ID provided by OTPless.
    * `clientSecret`: Your client secret provided by OTPless.
    * `Content-Type`: application/json

    ### Body

    * `channel` (String, required): The notification channel. For SMS, use `"SMS"`.
    * `senderId` (String, conditional): The sender ID for the template (not required in case of countries like brazil).
    * `templateId` (String, conditional): The OTPless provided template ID. Required if **dltTemplateId** and **dltTemplateText** are not provided.
    * `dltTemplateId` (String, conditional): Template ID registered with DLT. Required if **templateId** is not provided.
    * `orderId` (String, optional): An order ID for tracking purposes. Will be returned in the response.
    * `dltTemplateText` (String, conditional): The template text. Use placeholders for variables as `{#var#}`. Required if `templateId` is not provided.
    * `recipients` (Array of Objects, required): An array of recipient objects.
      * `sendTo` (String, required): The phone number of the recipient.
      * `countryCode` (String, optional): Country code of the phone number. Please note if mobile number already contains country code in
        `sendTo` param then there is no need to provide country code param.
      * `bodyParams` (Array of Strings, required): An array of strings to replace placeholders in the template for `templateId` or `dltTemplateText` provided.
      * `metadata` (JsonObject, optional): A JSON object for any additional metadata. Will be attached to the delivery status [webhook](/knowledge-base/webhook-v2) notification data.

    > You can use either `templateId` or both `dltTemplateId` and `dltTemplateText` in a request, but not all three.

    > The `metadata` field is optional and can be used to send any additional data.

    <Info>Max recipients allowed is 1500.</Info>

    ## Example Request

    <CodeGroup>
      ```bash OTPless Template Id without senderId theme={null}
      curl --location 'https://auth.otpless.app/notification/v3/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "templateId": "YOUR_TEMPLATE_ID",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "countryCode": "COUNTRY_CODE",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```

      ```bash OTPless Template Id with senderId theme={null}
      curl --location 'https://auth.otpless.app/notification/v3/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "senderId":"SENDER_ID",
          "templateId": "YOUR_TEMPLATE_ID",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "countryCode": "COUNTRY_CODE",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```

      ```bash DLT Template Id theme={null}
      curl --location 'https://auth.otpless.app/notification/v3/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "senderId":"SENDER_ID",
          "dltTemplateId": "YOUR_DLT_TEMPLATE_ID",
          "dltTemplateText": "OTPLESS: Your OTP is {#var#} to log in to your account. Do not share the OTP with anyone. {#var#}",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "countryCode": "COUNTRY_CODE",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```
    </CodeGroup>

  </Tab>

  <Tab title="V2">
    ## Request

    ```
    POST https://auth.otpless.app/notification/v2/batch/send
    ```

    ### Headers

    * `clientId`: Your client ID provided by OTPless.
    * `clientSecret`: Your client secret provided by OTPless.
    * `Content-Type`: application/json

    ### Body

    * `channel` (String, required): The notification channel. For SMS, use `"SMS"`.
    * `senderId` (String, conditional): The sender ID for the template (not required in case of countries like brazil).
    * `templateId` (String, conditional): The OTPless provided template ID. Required if **dltTemplateId** and **dltTemplateText** are not provided.
    * `dltTemplateId` (String, conditional): Template ID registered with DLT. Required if **templateId** is not provided.
    * `orderId` (String, optional): An order ID for tracking purposes. Will be returned in the response.
    * `dltTemplateText` (String, conditional): The template text. Use placeholders for variables as `{#var#}`. Required if `templateId` is not provided.
    * `recipients` (Array of Objects, required): An array of recipient objects.
      * `sendTo` (String, required): The phone number of the recipient.
      * `bodyParams` (Array of Strings, required): An array of strings to replace placeholders in the template for `templateId` or `dltTemplateText` provided.
      * `metadata` (JsonObject, optional): A JSON object for any additional metadata. Will be attached to the delivery status [webhook](/knowledge-base/webhook-v2) notification data.

    > You can use either `templateId` or both `dltTemplateId` and `dltTemplateText` in a request, but not all three.

    > The `metadata` field is optional and can be used to send any additional data.

    <Info>Max recipients allowed is 1500.</Info>

    ## Example Request

    <CodeGroup>
      ```bash OTPless Template Id without senderId theme={null}
      curl --location 'https://auth.otpless.app/notification/v2/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "templateId": "YOUR_TEMPLATE_ID",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```

      ```bash OTPless Template Id with senderId theme={null}
      curl --location 'https://auth.otpless.app/notification/v2/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "senderId":"SENDER_ID",
          "templateId": "YOUR_TEMPLATE_ID",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```

      ```bash DLT Template Id theme={null}
      curl --location 'https://auth.otpless.app/notification/v2/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "senderId":"SENDER_ID",
          "dltTemplateId": "YOUR_DLT_TEMPLATE_ID",
          "dltTemplateText": "OTPLESS: Your OTP is {#var#} to log in to your account. Do not share the OTP with anyone. {#var#}",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```
    </CodeGroup>

  </Tab>

  <Tab title="V1">
    ## Request

    ```
    POST https://auth.otpless.app/notification/v1/batch/send
    ```

    ### Headers

    * `clientId`: Your client ID provided by OTPless.
    * `clientSecret`: Your client secret provided by OTPless.
    * `Content-Type`: application/json

    ### Body

    * `channel` (String, required): The notification channel. For SMS, use `"SMS"`.
    * `senderId` (String, required): The sender ID for the template.
    * `templateId` (String, conditional): The OTPless provided template ID. Required if **dltTemplateId** and **dltTemplateText** are not provided.
    * `dltTemplateId` (String, conditional): Template ID registered with DLT. Required if **templateId** is not provided.
    * `orderId` (String, optional): An order ID for tracking purposes. Will be returned in the response.
    * `dltTemplateText` (String, conditional): The template text. Use placeholders for variables as `{#var#}`. Required if `templateId` is not provided.
    * `recipients` (Array of Objects, required): An array of recipient objects.
      * `sendTo` (String, required): The phone number of the recipient.
      * `bodyParams` (Array of Strings, required): An array of strings to replace placeholders in the template for `templateId` or `dltTemplateText` provided.
      * `metadata` (JsonObject, optional): A JSON object for any additional metadata. Will be attached to the delivery status [webhook](/knowledge-base/webhook-v2) notification data.

    > You can use either `templateId` or both `dltTemplateId` and `dltTemplateText` in a request, but not all three.

    > The `metadata` field is optional and can be used to send any additional data.

    <Info>Max recipients allowed is 1500.</Info>

    ## Example Request

    <CodeGroup>
      ```bash OTPless Template Id theme={null}
      curl --location 'https://auth.otpless.app/notification/v1/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "senderId":"SENDER_ID",
          "templateId": "YOUR_TEMPLATE_ID",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```

      ```bash DLT Template Id theme={null}
      curl --location 'https://auth.otpless.app/notification/v1/batch/send' \
      --header 'clientId: YOUR_CLIENT_ID' \
      --header 'clientSecret: YOUR_CLIENT_SECRET' \
      --header 'Content-Type: application/json' \
      --data '{
          "channel": "SMS",
          "senderId":"SENDER_ID",
          "dltTemplateId": "YOUR_DLT_TEMPLATE_ID",
          "dltTemplateText": "OTPLESS: Your OTP is {#var#} to log in to your account. Do not share the OTP with anyone. {#var#}",
          "recipients": [
              {
                  "sendTo": "USER_PHONE_NUMBER",
                  "bodyParams": [
                      "6723663",
                      "bob"
                  ],
                  "metadata": {}
              }
          ]
      }'
      ```
    </CodeGroup>

  </Tab>
</Tabs>

## Example Response

```json theme={null}
{
  "orderId": "edk32023ke02303ie023ie3223e",
  "status": "CREATED"
}
```

For more details on handling delivery status and notifications, refer to our [Webhook Guide](/knowledge-base/webhook-v2).
