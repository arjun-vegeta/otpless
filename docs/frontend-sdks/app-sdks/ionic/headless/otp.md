> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Headless - OTP

> Welcome to the OTP integration guide! Follow these steps to send and verify phone and email using the OTPLESS Headless SDK.

## Prerequisites

1. Make sure you have followed the [SDK Setup Guide](/frontend-sdks/app-sdks/android/legacy/headless/intro) before starting with this document.
2. Ensure you have admin access to the OTPless Account.

## Configure Magic Link Auth on Dashboard

1. Log in to the OTPless dashboard with your registered email ID.
2. Go to [**Configure Channel**](https://otpless.com/dashboard/customer/channels).
3. Enable the phone or email channel based on your requirement.
4. When you enable the channel, you will see the option to configure the auth method and delivery channel.
5. Choose **Magic Link** as the auth method.

<Warning>
  **Important:** Don't forget to save and publish the configuration.
</Warning>

## Step 1: Send OTP

#### Choose your identity type to verify:

<Tabs>
  <Tab title="Phone">
    To initiate an OTP for phone number verification, set the phone number and country code for the OTP request.

    **Request**

    <CodeGroup>
      ```javascript Code theme={null}
      let headlessRequest = {};
      headlessRequest = {
          countryCode,
          phone
      }
      await manager.startHeadless(headlessRequest);
      ```

      ```javascript Example theme={null}
      let countryCode = "+91";
      let phone = "9899038845";
      let headlessRequest = {};
      headlessRequest = {
          countryCode,
          phone
      }
      await manager.startHeadless(headlessRequest);
      ```
    </CodeGroup>

    **Response**

    <CodeGroup>
      ```json Example theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "channel": "PHONE",
          "deliveryChannel": "WHATSAPP",
          "authType": "OTP",
          "requestId": "xxxxxxxxxxxxxxxx"
        }
      }
      ```

      ```json Schema theme={null}
      {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer"
          },
          "success": {
            "type": "boolean"
          },
          "response": {
            "type": "object",
            "properties": {
              "channel": {
                "type": "string",
                "enum": ["PHONE", "EMAIL"]
              },
              "deliveryChannel": {
                "type": "string",
                "enum": ["WHATSAPP", "SMS", "VIBER", "VOICE", "EMAIL"]
              },
              "authType": {
                "type": "string",
                "enum": ["OTP"]
              },
              "requestId": {
                "type": "string"
              }
            },
            "required": ["channel", "deliveryChannel", "authType", "requestId"]
          }
        },
        "required": ["statusCode", "success", "response"]
      }
      ```
    </CodeGroup>

    ## Step 2: Verify OTP

    To verify the OTP entered by the user, set the phone number, country code, and OTP for the verification request.

    **Request**

    <CodeGroup>
      ```javascript Code theme={null}
      let headlessRequest = {};
      headlessRequest = {
          countryCode,
          phone,
          otp
      }
      await manager.startHeadless(headlessRequest);
      ```

      ```javascript Code theme={null}
      let headlessRequest = {};
      let countryCode = "+91";
      let phone = "9899038845"
      let otp = "123456"

      headlessRequest = {
          countryCode,
          phone,
          otp
      }
      await manager.startHeadless(headlessRequest);
      ```
    </CodeGroup>

    **Response**

    <CodeGroup>
      ```json Example theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "verification": "COMPLETED",
          "requestId": "xxxxxxxxxxxxxxxx",
          "channel": "PHONE"
        }
      }
      ```

      ```json Schema theme={null}
      {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer"
          },
          "success": {
            "type": "boolean"


          },
          "response": {
            "type": "object",
            "properties": {
              "verification": {
                "type": "string",
                "enum": ["COMPLETED"]
              },
              "requestId": {
                "type": "string"
              },
              "channel": {
                "type": "string",
                "enum": ["PHONE"]
              }
            },
            "required": ["verification", "requestId", "channel"]
          }
        },
        "required": ["statusCode", "success", "response"]
      }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="Email">
    To initiate an OTP for email verification, set the email address for the OTP request.
    **Request**

    <CodeGroup>
      ```javascript Code theme={null}
      let headlessRequest = {};
      headlessRequest = {
          email
      }
      await manager.startHeadless(headlessRequest);
      ```

      ```javascript Example theme={null}
      let headlessRequest = {};
      let email = "satyam@otpless.com"
      headlessRequest = {
         email
      }
      await manager.startHeadless(headlessRequest);
      ```
    </CodeGroup>

    **Response**

    <CodeGroup>
      ```json Example theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "channel": "EMAIL",
          "deliveryChannel": "EMAIL",
          "authType": "OTP",
          "requestId": "xxxxxxxxxxxxxxxx"
        }
      }
      ```

      ```json Schema theme={null}
      {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer"
          },
          "success": {
            "type": "boolean"
          },
          "response": {
            "type": "object",
            "properties": {
              "channel": {
                "type": "string",
                "enum": ["PHONE", "EMAIL"]
              },
              "deliveryChannel": {
                "type": "string",
                "enum": ["WHATSAPP", "SMS", "VIBER", "VOICE", "EMAIL"]
              },
              "authType": {
                "type": "string",
                "enum": ["OTP"]
              },
              "requestId": {
                "type": "string"
              }
            },
            "required": ["channel", "deliveryChannel", "authType", "requestId"]
          }
        },
        "required": ["statusCode", "success", "response"]
      }
      ```
    </CodeGroup>

    ## Step 2: Verify OTP

    To verify the OTP entered by the user, set the email address and OTP for the verification request.

    **Request**

    <CodeGroup>
      ```javascript Code theme={null}
      let headlessRequest = {};

      headlessRequest = {
          email,
          otp
      }
      await manager.startHeadless(headlessRequest);
      ```

      ```javascript Example theme={null}
      let headlessRequest = {};
      let email = "satyam@otpless.com"
      let otp = "123456"

      headlessRequest = {
          email,
          otp
      }
      await manager.startHeadless(headlessRequest);
      ```
    </CodeGroup>

    **Response**

    <CodeGroup>
      ```json Example theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "verification": "COMPLETED",
          "requestId": "xxxxxxxxxxxxxxxx",
          "channel": "EMAIL"
        }
      }
      ```

      ```json Schema theme={null}
      {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer"
          },
          "success": {
            "type": "boolean"
          },
          "response": {
            "type": "object",
            "properties": {
              "verification": {
                "type": "string",
                "enum": ["COMPLETED"]
              },
              "requestId": {
                "type": "string"
              },
              "channel": {
                "type": "string",
                "enum": ["PHONE", "EMAIL"]
              }
            },
            "required": ["

      verification", "requestId", "channel"]
          }
        },
        "required": ["statusCode", "success", "response"]
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

## Step 3: Get Auth Token

Awesome! You've completed the client-side integration. Now, after the OTP is verified, you'll get a callback with the `ONETAP` response containing the **token**. You'll need to parse the token from the response JSON.

**Sample Callback JSON**

```json theme={null}
{
  "responseType": "ONETAP",
  "statusCode": 200,
  "response": {
    "status": "SUCCESS",
    "token": "unique_token_here",
    "userId": "unique_user_id_here",
    "timestamp": "ISO_timestamp_here",
    "identities": [
      {
        "identityType": "MOBILE",
        "identityValue": "919899038845",
        "channel": "OTP",
        "methods": ["SMS"],
        "verified": true,
        "verifiedAt": "2024-08-05T13:57:56Z"
      }
    ],
    "idToken": "jwt_token",
    "network": {
      "ip": "127.0.0.1",
      "timezone": "Asia/Kolkata",
      "ipLocation": {}
    },
    "deviceInfo": {},
    "sessionInfo": {},
    "firebaseInfo": {}
  }
}
```

<SampleResponseOTP />

## 🏁 Check Point : Verify Auth Token

Once you have retrieved the token, send it to your backend and call the verify token API.

<a href="https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data" className="activate-button" target="_blank">
  Verify Token API →
</a>
