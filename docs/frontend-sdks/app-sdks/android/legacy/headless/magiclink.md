> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Headless - MAGIC LINK

> Welcome to the Magic Link integration guide! Follow these steps to send and verify phone and email using the OTPLESS Headless SDK.

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

### Choose your Programming Language:

<Tabs>
  <Tab title="Java">
    ## Step 1: Send Magic Link

    #### Choose your identity type to verify:

    <Tabs>
      <Tab title="Phone">
        To initiate an Magic Link for phone number verification, set the phone number and country code for the Magic Link request.

        **Request**

        <CodeGroup>
          ```java Code theme={null}
          final HeadlessRequest request = new HeadlessRequest();
          request.setPhoneNumber("YOUR_COUNTRY_CODE","YOUR_PHONE_NUMBER");
          otplessView.startHeadless(request, this::onHeadlessCallback);
          ```

          ```java Example theme={null}
          final HeadlessRequest request = new HeadlessRequest();
          request.setPhoneNumber("91","9899038845");
          otplessView.startHeadless(request, this::onHeadlessCallback);
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
              "authType": "MAGICLINK",
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
                    "enum": ["MAGICLINK"]
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
      </Tab>

      <Tab title="Email">
        To initiate a Magic Link for email verification, set the email address for the Magic Link request.

        **Request**

        <CodeGroup>
          ```java Code theme={null}
          final HeadlessRequest request = new HeadlessRequest();
          request.setEmail("YOUR_EMAIL_ID");
          otplessView.startHeadless(request, this::onHeadlessCallback);
          ```

          ```java Example theme={null}
          final HeadlessRequest request = new HeadlessRequest();
          request.setEmail("satyam@otpless.com");
          otplessView.startHeadless(request, this::onHeadlessCallback);
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
              "authType": "MAGICLINK",
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
                    "enum": ["MAGICLINK"]
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
      </Tab>
    </Tabs>

  </Tab>

  <Tab title="Kotlin">
    ## Step 1: Send Magic Link

    #### Choose your identity type to verify:

    <Tabs>
      <Tab title="Phone">
        To initiate an Magic Link for phone number verification, set the phone number and country code for the Magic Link request.

        **Request**

        <CodeGroup>
          ```kotlin Code theme={null}
          val request = HeadlessRequest()
          request.setPhoneNumber("YOUR_COUNTRY_CODE", "YOUR_PHONE_NUMBER")
          otplessView.startHeadless(request, this::onHeadlessCallback)
          ```

          ```kotlin Example theme={null}
          val request = HeadlessRequest()
          request.setPhoneNumber("91", "9899038845")
          otplessView.startHeadless(request, this::onHeadlessCallback)
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
              "authType": "MAGICLINK",
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
                    "enum": ["MAGICLINK"]
                  },
                  "requestId": {
                    "type": "string"
                  }
                },
                "required": ["channel", "delivery

          Channel", "authType", "requestId"]
              }
            },
            "required": ["statusCode", "success", "response"]
          }
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Email">
        To initiate a Magic Link for email verification, set the email address for the Magic Link request.

        **Request**

        <CodeGroup>
          ```kotlin Code theme={null}
          val request = HeadlessRequest()
          request.setEmail("YOUR_EMAIL_ID")
          otplessView.startHeadless(request, this::onHeadlessCallback)
          ```

          ```kotlin Example theme={null}
          val request = HeadlessRequest()
          request.setEmail("satyam@Magic Linkless.com")
          otplessView.startHeadless(request, this::onHeadlessCallback)
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
              "authType": "MAGICLINK",
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
                    "enum": ["MAGICLINK"]
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
      </Tab>
    </Tabs>

  </Tab>
</Tabs>

## Step 2: Get Auth Token

Awesome! You've completed the client-side integration. Now, after the Magic Link is verified, you'll get a callback with the `ONETAP` response containing the **token**. You'll need to parse the token from the response JSON.

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
        "channel": "MAGIC_LINK",
        "methods": ["WHATSAPP"],
        "verified": true,
        "verifiedAt": "2024-08-05T14:01:31Z"
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

<Tip>
  You can view a complete sample response [`here`](https://otpless.com/docs/frontend-sdks/references/sample-response-ML)
</Tip>

**How to parse the token from response?**

<CodeGroup>
  ```java Java theme={null}
  private void onHeadlessCallback(HeadlessResponse response) {
      if (response.getStatusCode() == 200) {
          switch (response.getResponseType()) {
              case "ONETAP":
                  // final response with token
                  JSONObject responseWithToken = response.getResponse();
                  // Your API to send the token to your backend and then follow the next step.
                  break;
              // other response types
          }
          JSONObject successResponse = response.getResponse();
      } else {
          // handle error
          String error = response.getResponse().optString("errorMessage");
      }
  }
  ```

```kotlin Kotlin theme={null}
private fun onHeadlessCallback(response: HeadlessResponse) {
    if (response.getStatusCode() == 200) {
        when (response.getResponseType()) {
            "ONETAP" -> {
                // final response with token
                val responseWithToken = response.getResponse()
                // Your API to send the token to your backend and then follow the next step.
            }
            // other response types
        }
        val successResponse = response.getResponse()
    } else {
        // handle error
        val error = response.getResponse().optString("errorMessage")
    }
}
```

</CodeGroup>

## 🏁 Check Point : Verify Auth Token

Once you have retrieved the token, send it to your backend and call the verify token API.

<a href="https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data" className="activate-button" target="_blank">
  Verify Token API →
</a>

## Additional Functions

### Initiate Google Phone Hint API for Phone Number Suggestion

The Google Phone Hint API suggests phone numbers stored on the user’s device, prompting them to choose one. If selected, the number can be applied to the input field, reducing manual entry and errors. OTPless offers this feature for a seamless phone number entry process during authentication or registration.

#### Select the event to trigger the Phone Hint API.

<Tabs>
  <Tab title="Inside OnCreate()">
    <CodeGroup>
      ```java Java theme={null}
      otplessView.getPhoneHintManager().registerInOnCreate(this);
      otplessView.getPhoneHintManager().showPhoneNumberHint(true, result -> {
                          if (result.getSecond() != null) {
                              Exception error = result.getSecond();
                          } else {
                              // here you will receive the phone number after user selection
                              final String phone = result.getFirst();
                          }
                          return null;
                      }
              );
      ```

      ```kotlin Kotlin theme={null}
      otplessView.phoneHintManager.registerInOnCreate(this)
      otplessView.phoneHintManager.showPhoneNumberHint(true) {
          if (it.second != null) {
              val error = it.second!!
          } else {
              // here you will receive the phone number after user selection
              val phone = it.first!!
          }
      }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="On Event(button click, focus change and custom events)">
    <CodeGroup>
      ```java Java theme={null}
      otplessView.getPhoneHintManager().showPhoneNumberHint(true, result -> {
                          if (result.getSecond() != null) {
                              Exception error = result.getSecond();
                          } else {
                              // here you will receive the phone number after user selection
                              final String phone = result.getFirst();
                          }
                          return null;
                      }
              );
      ```

      ```kotlin Kotlin theme={null}
      otplessView.phoneHintManager.showPhoneNumberHint(true) {
          if (it.second != null) {
              val error = it.second!!
          } else {
              // here you will receive the phone number after user selection
              val phone = it.first!!
          }
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>
