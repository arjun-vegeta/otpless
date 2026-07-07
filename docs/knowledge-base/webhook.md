> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhook Guide (Legacy)

> Webhooks are a powerful mechanism for receiving real-time notifications about events occurring within the OTPLESS system. By integrating webhooks into your application, you can gain valuable insights into user authentication activities and system health, enabling efficient tracking and reporting.

# Types of Webhooks

The OTPLESS system offers various webhooks to cater to different needs:

<CardGroup cols={2}>
  <Card title="Message Delivery Event" icon="message-check" iconType="duotone" href="/knowledge-base/webhook#message-delivery-notifications">
    Trigger when there is any change in the status of the message delivery on
    WhatsApp, SMS or Email.
  </Card>

  <Card title="System Events" icon="group-arrows-rotate" iconType="duotone" href="/knowledge-base/webhook#system-notifications">
    Trigger when there is any system specific events.
  </Card>
</CardGroup>

## Delivery Status Events

<Tabs>
  <Tab title="WhatsApp">
    Webhooks can be leveraged to track the delivery status of authentication requests initiated via `WhatsApp`.

    ### Status Descriptions

    The following statuses are delivered through webhooks for WhatsApp authentication:

    * **`SENT`:** Indicates the message containing the authentication request has been sent to the recipient's WhatsApp number.
    * **`DELIVERED`:** Confirms that the message has been successfully delivered to the recipient's device.
    * **`READ`:** Indicates the recipient has read the message.
    * **`FAILED`:** Signifies that the message delivery has encountered an issue.

    ### Sequence of Statuses

    Ideally, the sequence of status updates follows the order: `SENT -> DELIVERED -> READ`.
    However, variations might occur depending on the recipient's WhatsApp settings (e.g., read receipts disabled). If a later status is received, it implies all preceding statuses have been fulfilled.

    ### Important Notes

    * Webhooks for delivery status updates are not mandatory.
    * The availability of status updates depends on the recipient's WhatsApp settings.
    * There might be instances where webhooks are missed due to technical issues on either side (client or server). The system implements retries to mitigate this.

    ### Example Payloads

    Here are JSON examples illustrating each status update for WhatsApp delivery:

    <CodeGroup>
      ```json Sent theme={null}
      {
      "status": "SENT",
      "data": {
          "referenceId": "580884110b1b46668baa1d46a65f46d9",
          "timestamp": 1707743465000,
          "identity": "919899038845",
          "channel": "WHATSAPP"
      }
      }
      ```

      ```json Delivered theme={null}
      {
      "status": "DELIVERED",
      "data": {
          "referenceId": "580884110b1b46668baa1d46a65f46d9",
          "timestamp": 1707743466000,
          "identity": "919899038845",
          "channel": "WHATSAPP"
      }
      }
      ```

      ```json Read theme={null}
      {
      "status": "READ",
      "data": {
          "referenceId": "580884110b1b46668baa1d46a65f46d9",
          "timestamp": 1707743479000,
          "identity": "919899038845",
          "channel": "WHATSAPP"
      }
      }
      ```

      ```json Failed theme={null}
      {
      "status": "FAILED",
      "data": {
          "referenceId": "580884110b1b46668baa1d46a65f46d9",
          "timestamp": 1707743479000,
          "identity": "919899038845",
          "channel": "WHATSAPP",
          "errorCode": "003",
          "errorMessage": "Other Delivery Failure"
      }
      }
      ```
    </CodeGroup>

    | errorCode | errorMessage                                        | Retriable                                                 |
    | --------- | --------------------------------------------------- | --------------------------------------------------------- |
    | `00a`     | Others - Unknown                                    | Yes                                                       |
    | `003`     | - Unknown Subscriber <br />- Other Delivery Failure | No                                                        |
    | `024`     | Others - Undelivered                                | Yes                                                       |
    | `033`     | Mobile Number not OPT-IN                            | Can be retried after OPT-IN                               |
    | `101`     | 24HR\_TimeExceed                                    | No                                                        |
    | `103`     | WhatsApp\_Failed                                    | Have to check the reason from meta on case by case basis. |

  </Tab>

  <Tab title="SMS">
    Similar to WhatsApp, webhooks can be used to track the delivery status of SMS-based authentication requests.

    ### Status Descriptions

    The following statuses are delivered through webhooks for SMS authentication:

    * **`DELIVERED`:** Confirms that the message containing the authentication request has been successfully delivered to the recipient's device.
    * **`FAILED`:** Signifies that the message delivery has encountered an issue.

    ### Example Payloads

    Here are JSON examples illustrating each status update for SMS delivery:

    <CodeGroup>
      ```json Delivered theme={null}
      {
        "status": "DELIVERED",
        "data": {
          "referenceId": "580884110b1b46668baa1d46a65f46d9",
          "timestamp": 1707743466000,
          "identity": "919899038845",
          "channel": "SMS",
          "metaData": {}
        }
      }
      ```

      ```json Failed theme={null}
      {
        "status": "FAILED",
        "data": {
          "referenceId": "580884110b1b46668baa1d46a65f46d9",
          "timestamp": 1707743479000,
          "identity": "919899038845",
          "channel": "SMS",
          "errorCode": "003",
          "errorMessage": "Other Delivery Failure",
          "metaData": {}
        }
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

## System Events

In addition to delivery status updates, OTPLESS offers webhooks for specific system events:

<Tabs>
  <Tab title="Approval Action">
    This webhook is triggered when a user clicks the `Approve` button or the magic link on WhatsApp/SMS/Email during the authentication process.

    ### Payload

    The payload associated with this webhook provides the following information:

    * **token** (string): Unique identifier for the request.
    * **timestamp** (string): Date and time of the event in ISO 8601 format.
    * **mobile** (object): Contains the user's mobile number.
      * **number** (string): User's phone number.
    * **requestId** (string): Unique identifier for the authentication request.
    * **notificationType** (string): Always "APPROVAL\_ACTION" for this webhook.

    ### Example Payload

    ```json theme={null}
    {
      "token": "580884110b1b46668baa1d46a65f46d9",
      "timestamp": 1707743479000,
      "mobile": {
      "number": "919899038845"
      },
      "requestId": "580884110b1b46668baa1d46a65f46d9",
      "notificationType": "APPROVAL_ACTION"
    }
    ```

  </Tab>

  <Tab title="Fallback Action">
    This webhook is triggered only when `Smart Auth` feature is `enabled`.

    If the delivery through the primary channel fails due to an error, a fallback message gets triggered according to the configured fallback channel `(e.g., SMS if WhatsApp delivery fails)` for maximum conversion rates.

    ### Payload

    The payload associated with this webhook provides the following information:

    * **token** (string): Unique identifier for the request.
    * **timestamp** (string): Date and time of the event in ISO 8601 format.
    * **mobile** (object): Contains the user's mobile number.
      * **number** (string): User's phone number.
    * **requestId** (string): Unique identifier for the authentication request.
    * **notificationType** (string): Always "FALLBACK\_TRIGGERED" for this webhook.
    * **fallbackChannel** (string): Indicates the channel used for the fallback notification (e.g., "WHATSAPP", "SMS").

    ### Example Payload

    ```json theme={null}
    {
      "token": "580884110b1b46668baa1d46a65f46d9",
      "timestamp": 1707743479000,
      "mobile": {
        "number": "919899038845"
                },
      "requestId": "580884110b1b46668baa1d46a65f46d9",
      "notificationType": "FALLBACK_TRIGGERED",
      "fallbackChannel": "WHATSAPP/SMS"
    }
    ```

  </Tab>

  <Tab title="Unreachable">
    This webhook is triggered only when there is an unexpected system failure or downtime due to maintenance or technical issues.

    ### Payload

    The payload associated with this webhook provides the following information:

    * token (string): Unique identifier for the request.
    * timestamp (string): Date and time of the event in ISO 8601 format.
    * mobile (object): Contains the user's mobile number (if applicable).
      * number (string): User's phone number (if available).
    * requestId (string): Unique identifier for the authentication request (if applicable).
    * notificationType (string): Always "UNREACHABLE" for this webhook.

    ### Example Payload

    ```json theme={null}
    {
      "token": "580884110b1b46668baa1d46a65f46d9",
      "timestamp": 1707743479000,
      "mobile": {
        "number": "919899038845"
                },
      "requestId": "580884110b1b46668baa1d46a65f46d9",
      "notificationType": "UNREACHABLE"
    }
    ```

    <Note>
      The token, mobile and requestId fields might be absent in the payload if the system failure occurred before user interaction or request initiation.
    </Note>

  </Tab>
</Tabs>

## How to Configure Webhook URL?

<Steps>
  <Step title="Login to OTPLESS Dashboard">
    Access the OTPLESS dashboard using your registered work email address.
  </Step>

  <Step title="Choose the App">
    * In the top left navigation panel, locate the list of applications you have
      access to within OTPLESS. - Select the specific application for which you
      want to configure the webhook URL.
  </Step>

  <Step title="Go to connectors">
    * Navigate to the `Connectors` section from the left navigation bar. -
      Within Connectors, locate and select the `Webhook` option. - On the Webhook
      configuration page, you will find a designated field to `enter the URL`
      where you want to receive webhook notifications for the chosen application.
    * Enter your desired webhook URL in the designated field. - You can also
      configure which specific events (e.g., Delivery Status Events, OTPLESS
      System Events) should trigger webhooks by selecting them from the available
      options. - Once you've entered the URL and selected the desired events, save
      your configuration changes.
  </Step>
</Steps>

<Note>
  Ensure the provided webhook URL is publicly accessible and can handle GET/POST
  requests from the OTPLESS system.
</Note>
