> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Headless

> Utilize our Headless SDK for ultimate flexibility. Craft your own tailored UI and seamlessly integrate OTPLESS authentication capabilities using our SDK.

export const SampleGithubContainer = ({platform, href = '/api-reference/endpoint/verifytoken/verify-token-with-secure-data', text = 'authenticity of sign-in'}) => {
let githubLink = "https://github.com";
switch (platform.toLowerCase()) {
case "android":
githubLink = "https://github.com/devbathaniotpless/otpless-androidnative-demo";
break;
case "ios":
githubLink = "https://github.com/devbathaniotpless/otpless-iOS-demo";
break;
case "react native":
githubLink = "https://github.com/devbathaniotpless/otpless-react-native-demo";
break;
case "flutter":
githubLink = "https://github.com/devbathaniotpless/otpless-flutter-demo";
break;
case "ionic":
githubLink = "https://github.com/devbathaniotpless/otpless-ionic-demo";
break;
case "javascript":
githubLink = "https://github.com/devbathaniotpless/otpless-javascript-demo";
break;
case "vue":
githubLink = "https://github.com/devbathaniotpless/otpless-vue-demo";
break;
case "angular":
githubLink = "https://github.com/devbathaniotpless/otpless-angular-demo";
break;
case "wordpress":
githubLink = "https://github.com/devbathaniotpless/otpless-wordpress-demo";
break;
case "shopify":
githubLink = "https://github.com/devbathaniotpless/otpless-shopify-demo";
break;
case "react js":
githubLink = "https://github.com/devbathaniotpless/otpless-reactjs-demo";
break;
default:
githubLink = "https://github.com";
}
return <CardGroup cols={2}>
<Card title="Validate ID Token" icon="shield-check" iconType="duotone" href={"/api-reference/endpoint/verifytoken/id-token-validate"}>
Learn how to securely `validate ID token` returned by OTPLESS {platform} SDK to ensure the {text} events from your backend server.
</Card>
<Card title="Validate Token (Opaque)" icon="shield-check" iconType="duotone" href={href}>
Learn how to securely `validate token` returned by OTPLESS {platform} SDK to ensure the {text} events from your backend server.
</Card>
</CardGroup>;
};

## Step 1: Add SDK Dependency

Begin by adding the OTPLESS SDK to your project. Insert the following script tag in the `<head>` section of your HTML document.

```javascript index.html theme={null}
<script
  id="otpless-sdk"
  src="https://otpless.com/v4/headless.js"
  data-appid="YOUR_APP_ID"
></script>
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

## Step 2: Initialize SDK and Handle Callback

With the SDK embedded, initialize it and define a callback function to handle authentication responses as shown below.

```javascript index.html theme={null}
<script>
 const callback = (eventCallback) => {

    // console.log({eventCallback});

    const ONETAP = () => {
        const {
            response
        } = eventCallback;
        const token = response.token;
        // Implement your custom logic here.
        console.log({
            response,
            token: response.token
        });
    };

    const OTP_AUTO_READ = () => {
        const {
            response: {
                otp
            }
        } = eventCallback;
         // Auto-read OTP value
        //console.log(otp);
    }

    const FAILED = () => {
        const {
            response
        } = eventCallback;

        console.log({
            response
        })
    }

    const FALLBACK_TRIGGERED = () => {
        const {
            response
        } = eventCallback;

        console.log({
            response
        })
    }


    const EVENTS_MAP = {
        ONETAP,
        OTP_AUTO_READ,
        FAILED,
        FALLBACK_TRIGGERED
    }

    if ("responseType" in eventCallback) EVENTS_MAP[eventCallback.responseType]()
}
  // Initialize OTPLESS SDK with the defined callback.
  const OTPlessSignin = new OTPless(callback);
</script>
```

## Step 3: Create Your UI

Design a user interface for authentication. An example HTML structure could look like this:

```html login.html theme={null}
<div>
  <input id="mobile-input" placeholder="Enter mobile number" />
  <button onclick="phoneAuth()">Request OTP</button>
</div>

<div id="otp-section" style="display: none;">
  <input id="otp-input" placeholder="Enter OTP" />
  <button onclick="verifyOTP()">Verify OTP</button>
</div>

<button onclick="oauth('WHATSAPP')">Continue with WhatsApp</button>
<button onclick="oauth('GMAIL')">Continue with Gmail</button>
<!-- Add more buttons for different OAuth providers as needed -->
```

## Step 4: Initiate Authentication

Initiate the authentication process based on the user's selected method by using the `initiate` method of the SDK.

<CodeGroup>
  ```javascript Phone theme={null}
  const phoneAuth = () => {
    OTPlessSignin.initiate({
      channel: "PHONE",
      phone: "839899038845",
      countryCode: "+62",
    });
  };
  ```

```javascript Email theme={null}
const emailAuth = () => {
  OTPlessSignin.initiate({ channel: 'EMAIL', email: 'user@example.com' });
};
```

```javascript OAuth theme={null}
const oauth = (provider) => {
  OTPlessSignin.initiate({ channel: 'OAUTH', channelType: provider });
};
```

</CodeGroup>

### Object Attributes

<Tabs>
  <Tab title="Request">
    | Attribute     | Mandatory   | Description                                                      |
    | ------------- | ----------- | ---------------------------------------------------------------- |
    | `channel`     | Yes         | The authentication method selected by the user.                  |
    | `phone`       | Conditional | User's phone number (required if channel is PHONE).              |
    | `countryCode` | Conditional | Country code of the phone number (required if channel is PHONE). |
    | `email`       | Conditional | User's email (required if channel is EMAIL).                     |
    | `channelType` | Conditional | Type of social login initiated (required if channel is OAUTH).   |
  </Tab>

  <Tab title="Response">
    | Attribute    | Mandatory | Description                                                        |
    | ------------ | --------- | ------------------------------------------------------------------ |
    | `statusCode` | Yes       | Outcome of the request. 2xx for success, 4xx and 5xx for failures. |
    | `success`    | Yes       | Boolean flag indicating request success.                           |
    | `response`   | Yes       | Detailed response JSON containing the response details.            |
  </Tab>

  <Tab title="Error Codes">
    | StatusCode | ErrorMessage                                       | Short Description                                                     |
    | ---------- | -------------------------------------------------- | --------------------------------------------------------------------- |
    | `401`      | Unauthorized request! Please check your appId      | Suggests missing or invalid app ID for authorization.                 |
    | `500`      | API\_ERROR                                         | Indicates a server-side error, possibly due to parameter issues.      |
    | `4000`     | The request values are incorrect, see details.     | Points to incorrect request values; refer to details for corrections. |
    | `4001`     | OTPless headless SDK doesn't support 2FA as of now | Indicates the lack of 2FA support in the SDK.                         |
    | `4002`     | The request parameters are incorrect, see details. | Suggests parameter errors; check details for specifics.               |
    | `4003`     | The request channel is incorrect, see details.     | Notes an incorrect request channel; see details for correct usage.    |
    | `5002`     | No internet connection is present.                 | Indicates no internet connection, troubleshoot network and device.    |
  </Tab>
</Tabs>

## Step 5: Verify OTP

To verify the OTP entered by the user, use the `verify` method with the necessary parameters.

<CodeGroup>
  ```javascript Phone theme={null}
  const verifyOTP = () => {
  OTPlessSignin.verify({
    channel: "PHONE",
    phone: "98785XXXXX",
    otp: "123456",
    countryCode: "+91",
  });
  };
  ```

```javascript Email theme={null}
const verifyOTP = () => {
  OTPlessSignin.verify({
    channel: 'EMAIL',
    email: 'satyam@otpless.com',
    otp: '123456',
  });
};
```

</CodeGroup>

## **🏁 Checkpoint**

To ensure a smooth integration process:

1. Deploy your app/website with the included OTPLESS SDK.
2. Conduct tests to verify the sign-in flow functions correctly.
3. Ensure that after a successful sign-in, the user is redirected back to your app/website and their information is correctly logged in the console.

### User Information Response Structure

The structure of the user information returned upon successful sign-in is as follows:

```json theme={null}
{
  "status": "SUCCESS",
  "token": "unique_token_here",
  "userId": "unique_user_id_here",
  "timestamp": "ISO_timestamp_here",
  "identities": [
    {
      "identityType": "EMAIL",
      "identityValue": "user@example.com",
      "channel": "OAUTH",
      "methods": ["GOOGLE"],
      "name": "User Name",
      "verified": true,
      "verifiedAt": "ISO_timestamp_here",
      "isCompanyEmail": "true"
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
```

<Tip>
  You can check out a complete sample response [`here.`](https://otpless.com/docs/frontend-sdks/references/sample-response)
</Tip>

## Next Steps

<SampleGithubContainer platform="react js" />
