> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhook Guide

> Webhooks are a powerful mechanism for receiving real-time notifications about events occurring within the OTPLESS system. By integrating webhooks into your application, you can gain valuable insights into user authentication activities and delivery reports, enabling efficient tracking and reporting.

# Types of Webhooks

The OTPLESS system offers various webhooks to cater to different needs:

<CardGroup cols={2}>
  <Card title="Message Delivery Events" icon="message-check" iconType="duotone">
    Trigger an event whenever there is a change in the delivery status of a message sent via WhatsApp, SMS, Viber or Email.
  </Card>

  <Card title="Auth Events" icon="shield-check" iconType="duotone">
    Trigger when there is any auth specific events.
  </Card>
</CardGroup>

# Message Delivery Events

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
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "SENT",
          "channel": "WHATSAPP",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Delivered theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "DELIVERED",
          "channel": "WHATSAPP",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Read theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "READ",
          "channel": "WHATSAPP",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Failed theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "FAILED",
          "channel": "WHATSAPP",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```
    </CodeGroup>

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
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "DELIVERED",
          "channel": "SMS",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Failed theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "FAILED",
          "channel": "SMS",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="Viber">
    Webhooks can be leveraged to track the delivery status of authentication requests initiated via `Viber`.

    ### Status Descriptions

    The following statuses are delivered through webhooks for Viber authentication:

    * **`SENT`:** Indicates the message containing the authentication request has been sent to the recipient's Viber number.
    * **`DELIVERED`:** Confirms that the message has been successfully delivered to the recipient's device.
    * **`READ`:** Indicates the recipient has read the message.
    * **`FAILED`:** Signifies that the message delivery has encountered an issue.

    ### Sequence of Statuses

    Ideally, the sequence of status updates follows the order: `SENT -> DELIVERED -> READ`.
    However, variations might occur depending on the recipient's Viber settings (e.g., read receipts disabled). If a later status is received, it implies all preceding statuses have been fulfilled.

    ### Important Notes

    * Webhooks for delivery status updates are not mandatory.
    * The availability of status updates depends on the recipient's Viber settings.
    * There might be instances where webhooks are missed due to technical issues on either side (client or server). The system implements retries to mitigate this.

    ### Example Payloads

    Here are JSON examples illustrating each status update for Viber delivery:

    <CodeGroup>
      ```json Sent theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "SENT",
          "channel": "VIBER",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Delivered theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "DELIVERED",
          "channel": "VIBER",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Read theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "READ",
          "channel": "VIBER",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Failed theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "FAILED",
          "channel": "VIBER",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="Email">
    Webhooks can be leveraged to track the delivery status of authentication requests initiated via `Email`.

    ### Status Descriptions

    The following statuses are delivered through webhooks for Email authentication:

    * **`SENT`:** Indicates the email containing the authentication request has been sent to the recipient's email address.
    * **`DELIVERED`:** Confirms that the email has been successfully delivered to the recipient's mailbox.
    * **`READ`:** Indicates the recipient has opened the email. *(Note: This status is available only with specific email vendors that support read tracking.)*
    * **`FAILED`:** Signifies that the email delivery has encountered an issue.

    ### Sequence of Statuses

    Ideally, the sequence of status updates follows the order: `SENT -> DELIVERED -> READ`.
    However, variations might occur depending on the recipient's email client and settings (e.g., email tracking disabled). If a later status is received, it implies all preceding statuses have been fulfilled.

    ### Important Notes

    * Webhooks for delivery status updates are not mandatory.
    * The availability of status updates depends on the recipient's email client and settings.
    * The `READ` event works only with specific vendors that support read tracking.
    * There might be instances where webhooks are missed due to technical issues on either side (client or server). The system implements retries to mitigate this.

    ### Example Payloads

    Here are JSON examples illustrating each status update for Email delivery:

    <CodeGroup>
      ```json Sent theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "SENT",
          "channel": "EMAIL",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Delivered theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "DELIVERED",
          "channel": "EMAIL",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Read theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "READ",
          "channel": "EMAIL",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```

      ```json Failed theme={null}
      {
        "data": {
          "requestId": "unique_request_id",
          "authSessionId": "unique_auth_session_id",
          "traceId": "unique_trace_id",
          "status": "FAILED",
          "channel": "EMAIL",
          "identity": "identity_value",
          "metaData": {}
        },
        "eventType": "DLR",
        "timestamp": 1734513816000
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

## Clicked Status Events

<Tabs>
  <Tab title="WhatsApp">
    The `CLICKED` event for WhatsApp indicates that the recipient has clicked on the authentication link sent via WhatsApp.

    ### Example Payload

    ```json theme={null}
    {
      "data": {
        "requestId": "unique_request_id",
        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "status": "CLICKED",
        "channel": "WHATSAPP",
        "identity": "identity_value",
        "metaData": {}
      },
      "eventType": "DLR",
      "timestamp": 1734615829169
    }
    ```

  </Tab>

  <Tab title="SMS">
    The `CLICKED` event for SMS indicates that the recipient has clicked on the authentication link sent via SMS.

    ### Example Payload

    ```json theme={null}
    {
      "data": {
        "requestId": "unique_request_id",
        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "status": "CLICKED",
        "channel": "SMS",
        "identity": "identity_value",
        "metaData": {}
      },
      "eventType": "DLR",
      "timestamp": 1734615829169
    }
    ```

  </Tab>

  <Tab title="Viber">
    The `CLICKED` event for Viber indicates that the recipient has clicked on the authentication link sent via Viber.

    ### Example Payload

    ```json theme={null}
    {
      "data": {
        "requestId": "unique_request_id",
        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "status": "CLICKED",
        "channel": "VIBER",
        "identity": "identity_value",
        "metaData": {}
      },
      "eventType": "DLR",
      "timestamp": 1734615829169
    }
    ```

  </Tab>
</Tabs>

# Auth Events

In addition to authentication, OTPLESS offers webhooks for specific auth events for fallback(in case of `Smart Auth`) and on authentication completion:

## Authentication Initiated Events

<Tabs>
  <Tab title="Phone">
    The `AUTH` event is triggered upon successful authentication using a phone number.

    ### Example Payload

    ```json theme={null}
    {
      "data": {

        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "status": "INITIATED",
        "authenticationDetails": {
          "phone": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or SILENT_AUTH
            "channel": [
              "WHATSAPP/SMS/VIBER"
            ],
            "phoneNumber": "USER_NUMBER",
            "countryCode": "COUNTRY_CODE"
          },
          "email": {}
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734513827
    }
    ```

  </Tab>

  <Tab title="Email">
    The `AUTH` event is triggered upon successful authentication using an email address.

    ### Example Payload

    ```json theme={null}
    {
      "data": {

        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "status": "INITIATED",
        "authenticationDetails": {
          "email": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or MAGIC_LINK
            "channel": [
              "EMAIL"
            ],
            "email": "USER_EMAIL"
          }
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734518721
    }
    ```

  </Tab>

  <Tab title="Phone and Email">
    The `AUTH` event is triggered upon successful authentication using both a phone number and an email address.

    ### Example Payload

    ```json theme={null}
    {
      "data": {
        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "status": "INITIATED",
        "authenticationDetails": {
          "phone": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or SILENT_AUTH
            "channel": [
              "WHATSAPP/SMS/VIBER"
            ],
            "phoneNumber": "USER_NUMBER",
            "countryCode": "COUNTRY_CODE"
          },
          "email": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or MAGIC_LINK
            "channel": [
              "EMAIL"
            ],
            "email": "USER_EMAIL"
          }
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734530056
    }
    ```

  </Tab>

  <Tab title="Social Login">
    The `AUTH` event is triggered upon successful authentication using a social login.

    ### Example Payload

    ```json theme={null}
    {
      "data": {
        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "status": "INITIATED",
        "authenticationDetails": {
          "email": {
            "requestId": "unique_request_id",
            "method": "OAUTH",
            "channel": [
              "GOOGLE"
            ],
            "email": "USER_EMAIL"
          }
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734617952
    }
    ```

  </Tab>
</Tabs>

## Fallback Events

The `AUTH` event is triggered when a fallback occurs from one channel to another.

### Example Payload

```json theme={null}
{
  "data": {
    "requestId": "unique_request_id",
    "authSessionId": "unique_auth_session_id",
    "traceId": "unique_trace_id",
    "status": "FALLBACK",
    "fromChannel": "WHATSAPP", //WHATSAPP, SMS, SILENT_AUTH, VIBER
    "toChannel": "SMS" //WHATSAPP, SMS, VIBER
  },
  "eventType": "AUTH",
  "timestamp": 1734516528720
}
```

### Important Notes

- Possible channels could be `WHATSAPP`, `SMS`, `VIBER`, `SILENT_AUTH`

## Authentication Completion Events

<Tabs>
  <Tab title="Phone">
    The `AUTH` event is triggered upon successful authentication using a phone number.

    ### Example Payload

    ```json theme={null}
    {
      "data": {

        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "token": "unique_token",
        "status": "SUCCESS",
        "authenticationDetails": {
          "phone": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or SILENT_AUTH
            "channel": [
              "WHATSAPP/SMS/VIBER"
            ],
            "phoneNumber": "USER_NUMBER",
            "countryCode": "COUNTRY_CODE"
          },
          "email": {}
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734513827
    }
    ```

  </Tab>

  <Tab title="Email">
    The `AUTH` event is triggered upon successful authentication using an email address.

    ### Example Payload

    ```json theme={null}
    {
      "data": {

        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "token": "unique_token",
        "status": "SUCCESS",
        "authenticationDetails": {
          "email": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or MAGIC_LINK
            "channel": [
              "EMAIL"
            ],
            "email": "USER_EMAIL"
          }
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734518721
    }
    ```

  </Tab>

  <Tab title="Phone and Email">
    The `AUTH` event is triggered upon successful authentication using both a phone number and an email address.

    ### Example Payload

    ```json theme={null}
    {
      "data": {
        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "token": "unique_token",
        "status": "SUCCESS",
        "authenticationDetails": {
          "phone": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or SILENT_AUTH
            "channel": [
              "WHATSAPP/SMS/VIBER"
            ],
            "phoneNumber": "USER_NUMBER",
            "countryCode": "COUNTRY_CODE"
          },
          "email": {
            "requestId": "unique_request_id",
            "method": "OTP", //OTP or MAGIC_LINK
            "channel": [
              "EMAIL"
            ],
            "email": "USER_EMAIL"
          }
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734530056
    }
    ```

  </Tab>

  <Tab title="Social Login">
    The `AUTH` event is triggered upon successful authentication using a social login.

    ### Example Payload

    ```json theme={null}
    {
      "data": {
        "authSessionId": "unique_auth_session_id",
        "traceId": "unique_trace_id",
        "token": "unique_token",
        "status": "SUCCESS",
        "authenticationDetails": {
          "email": {
            "requestId": "unique_request_id",
            "method": "OAUTH",
            "channel": [
              "GOOGLE"
            ],
            "email": "USER_EMAIL"
          }
        }
      },
      "eventType": "AUTH",
      "timestamp": 1734617952
    }
    ```

  </Tab>
</Tabs>
