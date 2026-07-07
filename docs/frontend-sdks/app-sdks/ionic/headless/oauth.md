> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Headless - Social Auth

> Welcome to the Social Auth integration guide! Follow these steps to send and verify phone and email using the OTPLESS Headless SDK.

## Prerequisites

1. Make sure you have followed the [SDK Setup Guide](/frontend-sdks/app-sdks/android/legacy/headless/intro) before starting with this document.
2. Ensure you have admin access to the OTPless Account.

## Configure OAuth platforms on Dashboard

1. Log in to the OTPless dashboard with your registered email ID.
2. Go to [**Configure Channel**](https://otpless.com/dashboard/customer/channels).
3. Enable the channels from list of social Auth.

<Warning>
  **Important:** Don't forget to save and publish the configuration.
</Warning>

## Step 1: Initiate Social Auth

To initiate Social Auth for phone number or email verification

**Request**

<CodeGroup>
  ```javascript Code theme={null}
  let headlessRequest = { channelType: channelType.toUpperCase() };
  await manager.startHeadless(headlessRequest);
  ```

```javascript Example theme={null}
let headlessRequest = { channelType: 'WHATSAPP' };
await manager.startHeadless(headlessRequest);
```

</CodeGroup>

**Enums for social auth**

```json theme={null}
[
  "WHATSAPP",
  "GMAIL",
  "APPLE",
  "LINKEDIN",
  "MICROSOFT",
  "FACEBOOK",
  "SLACK",
  "TWITTER",
  "DISCORD",
  "LINE",
  "LINEAR",
  "NOTION",
  "TWITCH",
  "GITHUB",
  "BITBUCKET",
  "ATLASSIAN",
  "GITLAB",
  "TRUE_CALLER"
]
```

**Response**

<CodeGroup>
  ```json Example theme={null}
  {
    "statusCode": 200,
    "success": true,
    "response": {
      "channel": "OAuth",
      "channelType": "WHATSAPP",
      "requestId": "xxxxxxxxxxxxxxxx"
    }
  }
  ```

```json Schema theme={null}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
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
          "enum": ["OAuth"]
        },
        "channelType": {
          "type": "string",
          "enum": [
            "WHATSAPP",
            "GMAIL",
            "APPLE",
            "LINKEDIN",
            "MICROSOFT",
            "FACEBOOK",
            "SLACK",
            "TWITTER",
            "DISCORD",
            "LINE",
            "LINEAR",
            "NOTION",
            "TWITCH",
            "GITHUB",
            "BITBUCKET",
            "ATLASSIAN",
            "GITLAB",
            "TRUE_CALLER"
          ]
        },
        "requestId": {
          "type": "string"
        }
      },
      "required": ["channel", "channelType", "requestId"]
    }
  },
  "required": ["statusCode", "success", "response"]
}
```

</CodeGroup>

## Step 2: Get Auth Token

Awesome! You've completed the client-side integration. Now, after the User identity is verified with social platform, you'll get a callback with the `ONETAP` response containing the **token**. You'll need to parse the token from the response JSON.

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
        "channel": "WHATSAPP",
        "methods": ["WHATSAPP"],
        "name": "Satyam Nathani",
        "verified": true,
        "verifiedAt": "2024-08-05T14:02:57Z"
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
  You can view a complete sample response [`here`](https://otpless.com/docs/frontend-sdks/references/sample-response-OAUTH)
</Tip>

## 🏁 Check Point : Verify Auth Token

Once you have retrieved the token, send it to your backend and call the verify token API.

<a href="https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data" className="activate-button" target="_blank">
  Verify Token API →
</a>
