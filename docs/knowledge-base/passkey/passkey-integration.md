> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OTPless Passkey API Integration Guide

> This document is designed to assist merchants in integrating the OTPless Passkey API to create user identities and initiate Passkey-based login through the OTPless SDK. Passkey provides secure, device-based authentication for end users, enhancing both security and user experience.

## Prerequisite

<Steps>
  <Step title="Login on OTPless.com">
    Log in using your work email.
  </Step>

  <Step title="Navigate to Dev Settings">
    Once logged in, navigate to **Dev Settings** in the left menu.
  </Step>

  <Step title="Copy Credentials">
    Copy the `clientId`, `clientSecret`, and `appId`.
  </Step>

  <Step title="Contact OTPless Team">
    Please contact the OTPless team to activate passkey functionality for your account.
  </Step>
</Steps>

## Workflow

<Steps>
  <Step title="Initialize Passkey Identity">
    Use the initiate WebAuthn API to create the `requestId`.
  </Step>

  <Step title="Initiate Login via SDK">
    Pass the `requestId` to the OTPless SDK, which will handle the Passkey-based login flow.
  </Step>

  <Step title="Complete Authentication">
    The OTPless SDK validates the user's authentication and notifies your system upon successful login or registration, providing a token.
  </Step>

  <Step title="Validate the Token">
    Use the validate token API to verify the authentication token.
  </Step>
</Steps>

**Demo Link**: [Passkey Demo](https://passkey.otpless.dev/)

## 1. Initiate API

The OTPless Passkey initiate API allows merchants to generate `requestId` for a particular user identity.

#### API Endpoint

`POST` `https://auth.otpless.app/auth/v1/webauthn`

#### Headers

<ParamField header="clientId" type="string" required>
  Unique identifier for the merchant's application.
</ParamField>

<ParamField header="clientSecret" type="string" required>
  Secret key associated with the `clientId`.
</ParamField>

<ParamField header="Content-Type" type="string" default="application/json">
  Specifies JSON format.
</ParamField>

#### Body

The request body must be a JSON object with the following fields:

<ParamField body="identityType" type="string" required>
  Specifies the type of identity. Options: `PHONE_NUMBER`, `EMAIL`, `CUSTOM`.
</ParamField>

<ParamField body="identityValue" type="string" required>
  The actual value for the specified `identityType`, e.g., the user's phone number, email address, or user ID.
</ParamField>

<ParamField body="rpName" type="string" required>
  The name of the Relying Party (merchant) initiating the WebAuthn request.
</ParamField>

<ParamField body="domain" type="string" required>
  The merchant's application domain where Passkey is implemented.
</ParamField>

<ParamField body="userDisplayName" type="string" required>
  The display name of the user initiating the request, typically used for personalization purposes.
</ParamField>

<ParamField body="attachment" type="string">
  Specifies the attachment type. Options: `ALL`, `PLATFORM`, `CROSS_PLATFORM`. If `isSPC` is true, this will always be set to `PLATFORM`.

- `ALL`: The user has the option to authenticate with either a QR code (if the key is stored on a different device) or with the key stored on the same device.
- `PLATFORM`: The user can authenticate only if the key is stored on the same device.
- `CROSS_PLATFORM`: The user can authenticate only by scanning a QR code to use a key stored on another device.
</ParamField>

<ParamField body="isRegistration" type="boolean">
  Indicates whether the request is for a registration flow (`true`). Don't pass this key if you want a normal login or registration flow. Useful in case you want to enforce registration (for example: Registration of a new device).
</ParamField>

<ParamField body="isSPC" type="boolean">
  Indicates if Secure Payment Confirmation (SPC) is required.
</ParamField>

<ParamField body="spc" type="object">
  Secure Payment Confirmation details (required if `isSPC` is true).

  <Expandable title="child attributes" defaultOpen>
    <ParamField body="instrumentDisplayName" type="string" required>
      Display name of the payment instrument.
    </ParamField>

    <ParamField body="instrumentDisplayIcon" type="string" required>
      URL of the payment instrument icon. Must be HTTPS and publicly accessible.
    </ParamField>

    <ParamField body="payeeOrigin" type="string" required>
      Origin of the payee, usually the merchant's website. Must be a URL with HTTPS scheme.
    </ParamField>

    <ParamField body="amount" type="number" required>
      Payment amount.
    </ParamField>

    <ParamField body="currency" type="string" required>
      Currency code in ISO format (e.g., `INR`).
    </ParamField>

  </Expandable>
</ParamField>

> If `isSPC` is true, the `spc` object is mandatory, otherwise it can be omitted.

#### Response

<ResponseField name="requestId" type="string" required>
  A unique identifier for the session initiation request.
</ResponseField>

<Expandable title="Know More About SPC">
  **What is SPC?**

Secure Payment Confirmation (SPC) is an extension of the WebAuthn protocol that provides additional security for payment transactions. It allows merchants to securely confirm payment details during the authentication process, ensuring that the payment information is validated by both the user and the authenticating platform.

**How it works?**

SPC works by combining the user authentication flow with payment confirmation. When SPC is enabled, users are prompted to approve the payment information along with their authentication, creating a seamless and secure experience for both authentication and payment confirmation.

**Limitations of SPC**

1. SPC requires the use of the PLATFORM attachment type, which means it only works on devices where key is present.
2. Not all browsers and devices support SPC, which can limit its applicability depending on the user's environment. However, we have implemented a fallback mechanism that reverts to the normal passkey flow if the browser or device does not support SPC.

**User Experience of SPC enabled Passkey**

  <img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/SPC-makePayment.png?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=3faa1035e5de5a1503768f9ed7558917" width="447" height="437" data-path="images/SPC-makePayment.png" />
</Expandable>

#### Sample

<CodeGroup>
  ```bash Request theme={null}
  curl --location 'https://auth.app/auth/v1/webauthn' \
  --header 'clientId: xxxxxx' \
  --header 'clientSecret: xxxxxx' \
  --header 'Content-Type: application/json' \
  --data '{
      "identityType": "PHONE_NUMBER",
      "identityValue": "+1234567890",
      "rpName": "YourAppName",
      "domain": "yourapp.com",
      "attachment": "ALL"
  }'
  ```

```bash Request with isSPC = true theme={null}
curl --location 'https://auth.otpless.app/auth/v1/webauthn' \
--header 'clientId: xxxxxxx' \
--header 'clientSecret: xxxxxx' \
--header 'Content-Type: application/json' \
--data '{
    "identityType": "PHONE_NUMBER",
    "identityValue": "+1234567890",
    "rpName": "YourAppName",
    "domain": "yourapp.com",
    "isSPC": true,
    "attachment": "PLATFORM",
    "spc": {
        "instrumentDisplayName": "xxx1234",
        "instrumentDisplayIcon": "https://media.licdn.com/dms/image/v2/D4D0BAQFyZcEMFwZk-Q/company-logo_200_200/company-logo_200_200/0/1692083921904/otpless_logo?e=2147483647&v=beta&t=Lygoj29DP4AsJ8vsziHsdApMHM1n7lu6ZQ9kzo74Qj0",
        "payeeOrigin": "https://example.com",
        "amount": 1.0,
        "currency": "INR"
    }
}'
```

```json Response theme={null}
{
  "requestId": "5265c6ae10xxxxx61adb36ecc211"
}
```

</CodeGroup>

#### Error Codes

The following error codes and responses help merchants handle errors during integration:

| Status Code | Message               | Error Code | Description                                          | Solution                                                       |
| ----------- | --------------------- | ---------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| 400         | Bad Request           | 7134       | Invalid syntax or missing parameters for RP name     | Verify the `rpName` format and ensure it’s valid.              |
| 400         | Bad Request           | 7135       | Invalid domain                                       | Check and correct the `domain` parameter.                      |
| 400         | Bad Request           | 7131       | Invalid identity type                                | Ensure `identityType` is `PHONE_NUMBER`, `EMAIL`, or `CUSTOM`. |
| 400         | Bad Request           | 7133       | Invalid identity value                               | Verify the format and value of `identityValue`.                |
| 400         | Bad Request           | 7140       | `spc` object missing or invalid when `isSPC` is true | Ensure `spc` object is provided and valid if `isSPC` is true.  |
| 401         | Unauthorized          | -          | Invalid or missing authentication credentials        | Confirm `clientId` and `clientSecret` are valid.               |
| 403         | Forbidden             | -          | Insufficient permissions                             | Check if the API key has the required permissions.             |
| 404         | Not Found             | -          | Endpoint URL typo or resource does not exist         | Verify the endpoint URL and resource.                          |
| 429         | Too Many Requests     | -          | Exceeding API rate limits                            | Reduce request frequency or use exponential backoff.           |
| 500         | Internal Server Error | -          | Server issues                                        | Retry. Contact support if the issue persists.                  |
| 503         | Service Unavailable   | -          | Server overload or maintenance                       | Retry after a delay. Check the Status Page for issues.         |

## 2. Initiate OTPless SDK with `requestId`

To initiate the OTPless SDK, include the following code snippet on your web page to load the SDK and use it to trigger the passkey authentication flow.

#### Step 1: Include the OTPless SDK Script

```html theme={null}
<script
  id="otpless-sdk"
  src="https://otpless.com/v3/headless.js"
  data-appid="YOUR_APP_ID"
></script>
```

> Replace `YOUR_APP_ID` with your actual application ID.

#### Step 2: Define the Callback Function

The callback function is used to handle the response after authentication. This function will receive user information and can be used to implement any custom logic.

```html theme={null}
<script>
  const callback = (userinfo) => {
    const token = userinfo.token;
    console.log(userinfo);

    // Implement your custom logic here.
  };

  // Initialize OTPLESS SDK with the defined callback.
  const OTPlessSignin = new OTPless(callback);
</script>
```

#### Step 3: Initiate Passkey with `requestId`

Below is the code to initiate the Passkey flow using the OTPless SDK with a specific `requestId` obtained from the identity creation API.

```javascript theme={null}
async function initiateWebAuthn() {
  const request = {
    channel: 'WEB_AUTHN',
    requestId: 'unique_request_id', // Replace with your actual request ID
  };

  const initiate = await OTPlessSignin.initiate({
    requestType: 'initiate',
    request,
  });
}
```

In this code:

1. The `channel` is set to `"WEB_AUTHN"`.
2. Replace `"unique_request_id"` with the actual `requestId` obtained from the initiate API.
3. Use the `initiate` method from the OTPless SDK to trigger the authentication flow.

## 3. Validate Token API

This endpoint validates an authentication token and retrieves user identity, authentication status, network, and device information associated with the token.

#### API Endpoint

`POST` `https://auth.otpless.app/auth/v1/validate/token`

#### Headers

<ParamField header="clientId" type="string" required>
  Unique identifier for the merchant's application.
</ParamField>

<ParamField header="clientSecret" type="string" required>
  Secret key associated with the `clientId`.
</ParamField>

<ParamField header="Content-Type" type="string" default="application/json">
  Specifies JSON format.
</ParamField>

#### Body

<ParamField body="token" type="string" required>
  The authentication token to be validated.
</ParamField>

#### Response

<ResponseField name="token" type="string" required>
  The validated token.
</ResponseField>

<ResponseField name="status" type="string" required>
  Status of the validation, e.g., "SUCCESS".
</ResponseField>

<ResponseField name="userId" type="string" required>
  Unique identifier for the user.
</ResponseField>

<ResponseField name="timestamp" type="string" required>
  The timestamp when the validation occurred.
</ResponseField>

<ResponseField name="identities" type="array" required>
  List of user identity objects.

  <Expandable title="identities Object" defaultOpen>
    <ResponseField name="identityType" type="string" required>
      Type of identity, e.g., "CUSTOM".
    </ResponseField>

    <ResponseField name="identityValue" type="string" required>
      Value of the identity (e.g., user ID).
    </ResponseField>

    <ResponseField name="channel" type="string" required>
      The channel will be "WEBAUTHN".
    </ResponseField>

    <ResponseField name="verified" type="boolean" required>
      Whether the identity was verified.
    </ResponseField>

    <ResponseField name="verifiedAt" type="string" required>
      Timestamp of verification.
    </ResponseField>

    <ResponseField name="type" type="string" required>
      Type of identity operation; can be "LOGIN" or "REGISTRATION".
    </ResponseField>

  </Expandable>
</ResponseField>

<ResponseField name="network" type="object">
  Network details of the user's location.

  <Expandable title="network Object">
    <ResponseField name="ip" type="string">
      IP address of the user.
    </ResponseField>

    <ResponseField name="timezone" type="string">
      Time zone of the user's location.
    </ResponseField>

    <ResponseField name="ipLocation" type="object">
      Geolocation information based on IP.
    </ResponseField>

  </Expandable>
</ResponseField>

<ResponseField name="deviceInfo" type="object">
  Information about the user's device, browser, and connection.

  <Expandable title="deviceInfo Object">
    <ResponseField name="userAgent" type="string">
      User agent string of the browser.
    </ResponseField>

    <ResponseField name="platform" type="string">
      Platform of the device.
    </ResponseField>

    <ResponseField name="vendor" type="string">
      Vendor of the device or browser.
    </ResponseField>

    <ResponseField name="browser" type="string">
      Browser name.
    </ResponseField>

    <ResponseField name="connection" type="string">
      Connection type (e.g., "4g").
    </ResponseField>

    <ResponseField name="language" type="string">
      Language setting in the browser.
    </ResponseField>

    <ResponseField name="cookieEnabled" type="boolean">
      Whether cookies are enabled.
    </ResponseField>

    <ResponseField name="screenWidth" type="integer">
      Screen width of the device in pixels.
    </ResponseField>

    <ResponseField name="screenHeight" type="integer">
      Screen height of the device in pixels.
    </ResponseField>

    <ResponseField name="screenColorDepth" type="integer">
      Color depth of the screen in bits.
    </ResponseField>

    <ResponseField name="devicePixelRatio" type="number">
      Device pixel ratio.
    </ResponseField>

    <ResponseField name="timezoneOffset" type="integer">
      Timezone offset from UTC in minutes.
    </ResponseField>

    <ResponseField name="cpuArchitecture" type="string">
      CPU architecture details.
    </ResponseField>

    <ResponseField name="fontFamily" type="string">
      Font family used by the device.
    </ResponseField>

  </Expandable>
</ResponseField>

#### Sample

<CodeGroup>
  ```bash Request theme={null}
  curl --location 'https://auth.otpless.app/auth/v1/validate/token' \
    --header 'Content-Type: application/json' \
    --header 'clientId: xxxxxx' \
    --header 'clientSecret: xxxxxx' \
    --data '{
        "token": "84655683e89f40c794aebd0f2f3532f2"
    }'
  ```

```json Response theme={null}
{
  "token": "84655683e89f40c794aebd0f2f3532f2",
  "status": "SUCCESS",
  "userId": "MO-9e91e2eeddac436db944e034ccd82123",
  "timestamp": "2024-11-05T07:39:07Z",
  "identities": [
    {
      "identityType": "CUSTOM",
      "identityValue": "1234567890",
      "channel": "WEBAUTHN",
      "verified": true,
      "verifiedAt": "2024-11-05T07:39:07Z",
      "type": "LOGIN"
    }
  ],
  "network": {
    "ip": "103.246.62.146",
    "timezone": "Asia/Kolkata",
    "ipLocation": {
      "city": {},
      "subdivisions": {},
      "country": {
        "code": "IN",
        "name": "India"
      },
      "continent": {
        "code": "AS"
      },
      "latitude": 21.9974,
      "longitude": 79.0011
    }
  },
  "deviceInfo": {
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "vendor": "Google Inc.",
    "browser": "Chrome",
    "connection": "4g",
    "language": "en-GB",
    "cookieEnabled": true,
    "screenWidth": 1512,
    "screenHeight": 982,
    "screenColorDepth": 30,
    "devicePixelRatio": 2.5,
    "timezoneOffset": -330,
    "cpuArchitecture": "10-core",
    "fontFamily": "Times"
  }
}
```

</CodeGroup>
