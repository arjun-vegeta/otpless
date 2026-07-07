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

<Tabs>
  <Tab title="npm">
    ## Installation

    Install the OTPless Headless SDK with your favorite package manager:

    ```bash theme={null}
    npm install otpless-headless-js
    # or
    yarn add otpless-headless-js
    # or
    pnpm add otpless-headless-js
    ```

    ***

    ## 🚀 Quick Start (React Example)

    ```jsx theme={null}
    import React, { useEffect, useState } from 'react';
    import { useOTPless, CHANNELS, EVENT_TYPES } from 'otpless-headless-js';

    function ExampleOTPlessAuth() {
      const { init, initiate, verify, on, loading, ready } = useOTPless();
      const [phone, setPhone] = useState('9876543210');
      const [countryCode, setCountryCode] = useState('+91');
      const [otp, setOtp] = useState('');
      const [status, setStatus] = useState('');

      useEffect(() => {
        // Always pass your actual OTPless App ID
        init('YOUR_APP_ID');
        // Subscribe to single and multiple events
        const unsubAutoRead = on(EVENT_TYPES.OTP_AUTO_READ, (event) => {
          const autoOtp = event?.response?.otp ?? '';
          setOtp(autoOtp);
          setStatus(`OTP auto-read: ${autoOtp}`);
        });
        const unsubAll = on({
          [EVENT_TYPES.ONETAP]: (event) => setStatus('OneTap Auth Success!'),
          [EVENT_TYPES.OTP_AUTO_READ]: (event) => {
            const autoOtp = event?.response?.otp ?? '';
            setOtp(autoOtp);
            setStatus(`OTP auto-read: ${autoOtp}`);
          },
          [EVENT_TYPES.FAILED]: (event) => setStatus(`Failed: ${event.response?.errorMessage}`),
        });
        return () => {
          unsubAutoRead();
          unsubAll();
        };
      }, [init, on]);

      const sendOtp = async () => {
        setStatus('');
        if (!ready) {
          setStatus('SDK not ready yet.');
          return;
        }
        try {
          const result = await initiate({ channel: CHANNELS.PHONE, phone, countryCode });
          if (result.success) setStatus('OTP sent! Check your device.');
          else setStatus(`Failed to send OTP: ${result.response?.errorMessage || 'Unknown error'}`);
        } catch (err) {
          setStatus(`Error sending OTP: ${err.message || err}`);
        }
      };

      const verifyOtp = async () => {
        setStatus('');
        if (!ready) {
          setStatus('SDK not ready yet.');
          return;
        }
        try {
          const result = await verify({ channel: CHANNELS.PHONE, phone, countryCode, otp });
          if (result.success) setStatus('OTP verified! Authenticated.');
          else setStatus(`OTP verification failed: ${result.response?.errorMessage || 'Unknown error'}`);
        } catch (err) {
          setStatus(`Verification error: ${err.message || err}`);
        }
      };

      if (!ready) return <div>Loading OTPless SDK...</div>;

      return (
        <div style={{ maxWidth: 400 }}>
          <div>
            <input
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
              maxLength={5}
              placeholder="Country Code"
              style={{ width: '80px', marginRight: '8px' }}
            />
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Phone Number"
              style={{ width: '160px' }}
            />
          </div>
          <button onClick={sendOtp} disabled={loading} style={{ marginTop: 10, width: '100%' }}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
          <div style={{ marginTop: 12 }}>
            <input
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Enter OTP"
              style={{ width: '150px', marginRight: '8px' }}
            />
            <button onClick={verifyOtp} disabled={loading || !otp}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
          {status && (
            <div style={{ marginTop: 12, color: status.includes('Failed') || status.includes('error') ? 'red' : 'green' }}>
              {status}
            </div>
          )}
        </div>
      );
    }
    ```

    ***

    ## 🧑‍💻 API Reference

    ### `useOTPless()`

    Returns an object with:

    | Property | Type                                                    | Description                                                    |
    | -------- | ------------------------------------------------------- | -------------------------------------------------------------- |
    | ready    | boolean                                                 | Whether the OTPless SDK script is loaded and ready.            |
    | loading  | boolean                                                 | `true` if any operation (init/initiate/verify) is in progress. |
    | init     | (appId: string) => Promise\<void>                       | Initialize the SDK with your App ID. Call once before use.     |
    | initiate | (request: InitiateRequest) => Promise\<OTPlessResponse> | Send OTP (via CHANNELS.PHONE, etc).                            |
    | verify   | (request: VerifyRequest) => Promise\<OTPlessResponse>   | Verify the OTP received by the user.                           |
    | on       | <sub>(see below)</sub>                                  | Subscribe to events; signature below.                          |
    | off      | (event, callback) => void                               | Remove a previously registered listener.                       |

    #### `on(event, handler?)`

    * Subscribe to a single event:
      ```js theme={null}
      on(EVENT_TYPES.OTP_AUTO_READ, event => { ... })
      ```
    * Or to multiple events at once:
      ```js theme={null}
      on({
        [EVENT_TYPES.ONETAP]: handler1,
        [EVENT_TYPES.FAILED]: handler2,
        // ...
      })
      ```
    * Returns an unsubscribe function.

    #### `off(event, handler)`

    * Unsubscribe a specific event handler.

    ***

    ### TypeScript Types & Constants

    ```ts theme={null}
    import type { InitiateRequest, VerifyRequest, EventType, OTPlessResponse } from 'otpless-headless-js';
    import { CHANNELS, EVENT_TYPES } from 'otpless-headless-js';

    const req: InitiateRequest = { channel: CHANNELS.PHONE, phone: '9876543210', countryCode: '+91' };

    const onEvent = (type: EventType) => {
      if (type === EVENT_TYPES.FAILED) {
        console.error('Operation failed');
      }
    };
    ```

    ***

    ### OTPless Response Type

    All SDK calls (`initiate`, `verify`) return:

    ```ts theme={null}
    type OTPlessResponsePayload = {
      otp?: string;
      token?: string;
      [key: string]: any;
    };

    type OTPlessResponse = {
      responseType: string;
      response?: OTPlessResponsePayload;
      success: boolean;
      statusCode: number;
    };
    ```

    **Example:**

    ```js theme={null}
    const res: OTPlessResponse = await initiate({
      channel: CHANNELS.PHONE,
      phone: '9876543210',
      countryCode: '+91',
    });
    if (res.success) {
      console.log('requestId:', res.response?.requestID);
    } else {
      console.error('initiate failed:', res.response?.errorMessage);
    }
    ```

    ***

    ## ⚡️ Framework-Agnostic Usage

    You can use the SDK without React (in any framework):

    ```js theme={null}
    import { otpless, CHANNELS, EVENT_TYPES } from 'otpless-headless-js';

    // Initialize
    await otpless.init('YOUR_APP_ID');

    // Send OTP
    await otpless.initiate({
      channel: CHANNELS.PHONE,
      phone: '9876543210',
      countryCode: '+91',
    });

    // Verify OTP
    await otpless.verify({
      channel: CHANNELS.PHONE,
      phone: '9876543210',
      countryCode: '+91',
      otp: '123456',
    });

    // Listen to single/multiple events
    const unsub = otpless.on(EVENT_TYPES.OTP_AUTO_READ, event => {
      console.log('OTP auto-read:', event.response?.otp);
    });
    const unsubAll = otpless.on({
      [EVENT_TYPES.ONETAP]: event => console.log('Auth Success:', event),
      [EVENT_TYPES.FAILED]: event => console.error('Failed:', event.response?.errorMessage),
    });
    ```

    ***

    ## 🛠 Utility Functions

    ```js theme={null}
    import { normalizeCountryCode, digitsOnly, redactTokens } from 'otpless-headless-js';

    // Normalize country codes
    normalizeCountryCode('91'); // '+91'
    normalizeCountryCode('+1-234'); // '+1234'

    // Extract digits
    digitsOnly('98-765-43210'); // '9876543210'

    // Redact tokens for safe logging
    const safeData = redactTokens({
      phone: '9876543210',
      otp: '123456',
      token: 'secret'
    });
    // { phone: '9876543210', otp: '***redacted***', token: '***redacted***' }
    ```

    ***

    ## 🟢 Next.js Usage

    > For Next.js App Router, add `'use client';` at the top of your component file!

    ```jsx theme={null}
    'use client';
    import { useOTPless } from 'otpless-headless-js';

    export default function AuthPage() {
      const { ready, loading, init, initiate, verify } = useOTPless();

      // ... your component logic here
    }
    ```

    ***

    Find npm package here: [https://www.npmjs.com/package/otpless-headless-js](https://www.npmjs.com/package/otpless-headless-js)
    Find github repository here: [https://github.com/otpless-tech/web-headless-demo](https://github.com/otpless-tech/web-headless-demo)
    Find sandbox here: [https://codesandbox.io/s/github/otpless-tech/web-headless-demo](https://codesandbox.io/s/github/otpless-tech/web-headless-demo)

  </Tab>

  <Tab title="Script Tag">
    ## Step 1: Add SDK Dependency

    Add the OTPLESS SDK to your project by including the following script in the `<head>` section of your HTML document:

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

    Initialize the SDK and set up a callback function to handle authentication:

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

    Design and implement your custom UI for authentication. An example HTML structure could look like this:

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

    Use the `initiate` method of the SDK to start the authentication process:

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
        OTPlessSignin.initiate({ channel: "EMAIL", email: "user@example.com" });
      };
      ```

      ```javascript OAuth theme={null}
      const oauth = (provider) => {
        OTPlessSignin.initiate({ channel: "OAUTH", channelType: provider });
      };
      ```
    </CodeGroup>

    **Object Attributes**

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
          channel: "EMAIL",
          email: "satyam@otpless.com",
          otp: "123456",
        });
      };
      ```
    </CodeGroup>

  </Tab>
</Tabs>

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

<SampleGithubContainer platform="javascript" />
