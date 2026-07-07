> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Headless

> Utilize our Headless SDK for ultimate flexibility. This guide provides detailed instructions on integrating custom UI elements with OTPLESS's backend authentication functions.

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

This is the new Headless authentication SDK that is significantly faster and more robust than the previous version. This upgrade enhances **performance**, **reliability**, and **security**, ensuring a seamless authentication experience, along with a seamless integration process. We strongly recommend migrating to the new SDK for improved efficiency and better support. To migrate from the old SDK, remove the previous SDK dependency and integration and follow the below mentioned steps.

# Overview

OTPless SDK accepts the user's identity (phone number or email), authenticates through multiple channels, and returns a secure token upon success.The merchant app sends this token to its backend, which verifies it with the OTPless Server before proceeding with the user journey.

<img src="https://mintlify.s3.us-west-1.amazonaws.com/otpless-96/images/Overview%20sdk%20_%20Mermaid%20Chart.png" alt="SDK Overview Chart" />

# Integration Steps

## Step 1: Install OTPLESS SDK Dependency

Install the OTPLESS SDK dependency by running the following command in your terminal at the root of your React Native project:

```bash theme={null}
npm i otpless-headless-rn
```

## Step 2: Platform-specific Integrations

<Tabs>
  <Tab title="Android">
    1. Add intent filter inside your `android/app/src/main/AndroidManifest.xml` file into your Main activity code block:
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    ```xml theme={null}
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data
          android:host="otpless"
          android:scheme= "otpless.YOUR_APP_ID_IN_LOWERCASE"/>
    </intent-filter>
    ```

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

    2. Add Network Security Config inside your `android/app/src/main/AndroidManifest.xml` file into your `<application>` code block (Only required if you are using the SNA feature):

    ```xml theme={null}
    android:networkSecurityConfig="@xml/otpless_network_security_config"
    ```

    3. Change your activity launchMode to singleTop and exported true for your Main Activity:
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    ```xml theme={null}
    android:launchMode="singleTop"
    android:exported="true"
    ```

  </Tab>

  <Tab title="iOS">
    1. Go to your project's root folder in the terminal and run.

    ```bash theme={null}
    pod install
    ```

    2. Add the following block to your `Info.plist` file:
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    ```xml info.plist theme={null}
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>otpless.YOUR_APP_ID_IN_LOWERCASE</string>
            </array>
            <key>CFBundleTypeRole</key>
            <string>Editor</string>
            <key>CFBundleURLName</key>
            <string>otpless</string>
        </dict>
    </array>
    <key>LSApplicationQueriesSchemes</key>
    <array>
        <string>whatsapp</string>
        <string>otpless</string>
        <string>gootpless</string>
        <string>com.otpless.ios.app.otpless</string>
        <string>googlegmail</string>
    </array>
    ```

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

    3. Add the following block to your `Info.plist` file only if you are using the SNA feature.

    * If the `NSAppTransportSecurity` key is not already present, add the entire block below.
    * If the `NSAppTransportSecurity` key is already present, add the listed domains one by one under `NSExceptionDomains`.

    ```xml info.plist theme={null}
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSExceptionDomains</key>
        <dict>
            <key>80.in.safr.sekuramobile.com</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSIncludesSubdomains</key>
                <true/>
            </dict>
            <key>api-csp.airtel.in</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSIncludesSubdomains</key>
                <true/>
            </dict>
            <key>in-vil.ipification.com</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSIncludesSubdomains</key>
                <true/>
            </dict>
            <key>partnerapi.jio.com</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSIncludesSubdomains</key>
                <true/>
            </dict>
        </dict>
    </dict>
    ```

    4. Go to build settings. Search for defines module, this option will appear in packaging
       change it to yes.

    5. Create connector.swift file and it will ask to create bridging header, Click yes.
       Copy-paste the following code into your connector.swift file.
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    ```swift connector.swift theme={null}
    import OtplessSDK
    import Foundation
    class Connector: NSObject {
      @objc public static func loadUrl(_ url: NSURL) {
        Task(priority: .userInitiated) {
          await Otpless.shared.handleDeeplink(url as URL)
        }
      }

      @objc public static func isOtplessDeeplink(_ url: NSURL) -> Bool {
        return Otpless.shared.isOtplessDeeplink(url: url as URL)
      }
    }
    ```

    6. Import the OTPLESS SDK in your respective `AppDelegate.mm` file to handle redirection.
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    <CodeGroup>
      ```objc AppDelegate.mm theme={null}
      #import "{{your_project_name}}-Swift.h"

      - (BOOL) application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
      	if([Connector isOtplessDeeplink:url]){
      	[Connector loadUrl:url];
      	return true;
      }
      	[super application:app openURL:url options:options];
      	return true;
      }
      ```

      ```swift AppDelegate.swift theme={null}
      func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
          if Connector.isOtplessDeeplink(url) {
              Connector.loadUrl(url)
              return true
          }
          return true
      }
      ```
    </CodeGroup>

    <Tip> Replace `your_project_name` with your actual project name </Tip>

  </Tab>
</Tabs>

## Step 3: Configure Sign up/Sign in

1. Import the `OtplessHeadlessModule` on your page..

```typescript login_page.tsx theme={null}
import { OtplessHeadlessModule } from 'otpless-headless-rn';
```

2. Create an instance of `OtplessHeadlessModule`.

```typescript login_page.tsx theme={null}
const headlessModule = new OtplessHeadlessModule();
```

3. Use useEffect hook to initialize the `OtplessHeadlessModule` and set callback.

```typescript login_page.tsx theme={null}
useEffect(() => {
  headlessModule.initialize('YOUR_APPID');
  headlessModule.setResponseCallback(onHeadlessResult);
  return () => {
    headlessModule.clearListener();
    headlessModule.cleanup();
  };
}, []);
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

4. Add a method to receive callbacks from `OtplessHeadlessModule`.

```typescript login_page.tsx theme={null}
const onHeadlessResult = (result: any) => {
  headlessModule.commitResponse(result);
  const responseType = result.responseType;

  switch (responseType) {
    case 'SDK_READY': {
      // Notify that SDK is ready
      console.log('SDK is ready');
      break;
    }
    case 'FAILED': {
      console.log('SDK initialization failed');
      // Handle SDK initialization failure
      break;
    }
    case 'INITIATE': {
      // Notify that headless authentication has been initiated
      if (result.statusCode == 200) {
        console.log('Headless authentication initiated');
        const authType = result.response.authType; // This is the authentication type
        if (authType === 'OTP') {
          // Take user to OTP verification screen
        } else if (authType === 'SILENT_AUTH') {
          // Handle Silent Authentication initiation by showing
          // loading status for SNA flow.
        }
      } else {
        // Handle initiation error.
        // To handle initiation error response, please refer to the error handling section.
        if (Platform.OS === 'ios') {
          handleInitiateErrorIOS(result.response);
        } else if (Platform.OS === 'android') {
          handleInitiateErrorAndroid(result.response);
        }
      }
      break;
    }
    case 'OTP_AUTO_READ': {
      // OTP_AUTO_READ is triggered only in Android devices for WhatsApp and SMS.
      if (Platform.OS === 'android') {
        const otp = result.response.otp;
        console.log(`OTP Received: ${otp}`);
      }
      break;
    }
    case 'VERIFY': {
      // notify that verification has failed.
      if (result.response.authType == 'SILENT_AUTH') {
        if (result.statusCode == 9106) {
          // Silent Authentication and all fallback authentication methods in SmartAuth have failed.
          //  The transaction cannot proceed further.
          // Handle the scenario to gracefully exit the authentication flow
        } else {
          // Silent Authentication failed.
          // If SmartAuth is enabled, the INITIATE response
          // will include the next available authentication method configured in the dashboard.
        }
      } else {
        // To handle verification failed response, please refer to the error handling section.
        if (Platform.OS === 'ios') {
          handleVerifyErrorIOS(result.response);
        } else if (Platform.OS === 'android') {
          handleVerifyErrorAndroid(result.response);
        }
      }

      break;
    }
    case 'DELIVERY_STATUS': {
      // This function is called when delivery is successful for your authType.
      const authType = result.response.authType;
      // It is the authentication type (OTP, MAGICLINK, OTP_LINK) for which the delivery status is being sent
      const deliveryChannel = result.response.deliveryChannel;
      // It is the delivery channel (SMS, WHATSAPP, etc) on which the authType has been delivered
    }

    case 'ONETAP': {
      const token = result.response.token;
      if (token != null) {
        console.log(`OneTap Data: ${token}`);
        // Process token and proceed.
      }
      break;
    }
    case 'FALLBACK_TRIGGERED': {
      // A fallback occurs when an OTP delivery attempt on one channel fails,
      // and the system automatically retries via the subsequent channel selected on Otpless Dashboard.
      // For example, if a merchant opts for SmartAuth with primary channal as WhatsApp and secondary channel as SMS,
      // in that case, if OTP delivery on WhatsApp fails, the system will automatically retry via SMS.
      // The response will contain the deliveryChannel to which the OTP has been sent.
      if (response.response.deliveryChannel != null) {
        const newDeliveryChannel = response.response.deliveryChannel;
        // This is the deliveryChannel to which the OTP has been sent
      }
      break;
    }
    default: {
      console.warn(`Unknown response type: ${responseType}`);
      break;
    }
  }
};
```

## Response Objects Structure

<Tabs>
  <Tab title="SDK_READY">
    ```json theme={null}
    {
       "responseType": "SDK_READY",
       "statusCode": 200,
       "response": {
           "success": true
        },
    }
    ```
  </Tab>

  <Tab title="FAILED">
    ```json theme={null}
     {
        "responseType": "FAILED",
        "statusCode": 5003,
        "response": {
            "errorCode": "5003",
            "errorMessage": "Failed to initialize the SDK"
        }
    }
    ```
  </Tab>

  <Tab title="INITIATE">
    ```json theme={null}
    {
        "responseType": "INITIATE",
        "statusCode": 200,
        "response": {
            "requestId": "abc123xyz",
            "channel": "MOBILE_LOGIN",
            "authType": "MOBILE_LOGIN",
            "deliveryChannel": "SMS",
        }
    }
    ```
  </Tab>

  <Tab title="OTP_AUTO_READ">
    ```json theme={null}
    {
        "responseType": "OTP_AUTO_READ",
        "statusCode": 200,
        "response": {
            "otp": "482913"
        }
    }
    ```
  </Tab>

  <Tab title="VERIFY">
    All VERIFY response types will always return a non-200 status code.

    ```json theme={null}
     {
        "responseType": "VERIFY",
        "statusCode": 400,
        "response": {
            "errorCode":"7118",
            "errorMessage":"Request error: Incorrect OTP!",
            "authType":"OTP"
        }
    }
    ```

  </Tab>

  <Tab title="ONETAP">
    ```json theme={null}
    {
        "responseType": "ONETAP",
        "statusCode": 200,
        "response": {
            "token": "your_token_here",
            "status": "SUCCESS",
            "userId": "userId_for_identity",
            "timestamp": "2024-07-11T12:51:42Z",
            "identities": [],
            "idToken": "jwt_token",
            "network": {},
            "deviceInfo": {},
            "sessionInfo": { },
            "firebaseInfo": {}
        }
    }
    ```
  </Tab>

  <Tab title="DELIVERY_STATUS">
    ```json theme={null}
    {
        "responseType": "DELIVERY_STATUS",
        "statusCode": 200,
        "response": {
            "deliveryChannel": "WHATSAPP",
            "communicationDelivered": true,
            "authType": "OTP"
        }
    }
    ```
  </Tab>

  <Tab title="FALLBACK_TRIGGERED">
    ```json theme={null}
    {
        "responseType": "FALLBACK_TRIGGERED",
        "statusCode": 200,
        "response": {
            "requestId": "req_98765abc",
            "channel": "MOBILE_LOGIN",
            "authType": "MOBILE_LOGIN",
            "deliveryChannel": "SMS"
        }
    }
    ```
  </Tab>
</Tabs>

## Step 4: Initiate Authentication

Initiate the authentication process based on the user's selected method.

<Tabs>
  <Tab title="Phone Auth">
    Phone authentication allows users to verify their identity using their phone number. Merchants can choose from various authentication methods:

    * **Silent Authentication (SNA)** – Automatically verifies the user without requiring OTP or MAGICLINK.
    * **OTP on Desired Channel** – Sends a one-time password (OTP) via SMS, WhatsApp, or another preferred channel.
    * **Magic Link** – Sends a link that users can click to authenticate.
    * **SNA + OTP** – Uses silent authentication first and falls back to OTP if needed.
    * **OTP + Magic Link** – Sends both an OTP and a magic link, allowing users to authenticate via either method.

    <CodeGroup>
      ```typescript Request theme={null}
      let isSdkReady = await headlessModule.isSdkReady();
      if (isSdkReady) {
      const startPhoneAuth = (phoneNumber: string, countryCode: string) => {
        const request = {
            phone: phoneNumber,
            countryCode
        };
        headlessModule.start(request);
      };
      } else {
        console.log("SDK is not ready");
        // Follow Fallback mechanism to handle the authentication flow.
      }
      ```
    </CodeGroup>

    ### Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters. Verifying OTP is required only in case of `OTP` authentication. No need to verify `OTP` in case of `MAGICLINK`.

    <CodeGroup>
      ```typescript Request theme={null}
      const verifyPhoneOtp = (phoneNumber: string, countryCode: string, otp: string) => {
        const request = {
            phone: phoneNumber,
            countryCode,
            otp
        };
        headlessModule.start(request);
      };
      ```
    </CodeGroup>

  </Tab>

  <Tab title="Email Auth">
    **Email Authentication** 📧\
    Email authentication verifies users using their email address. Merchants can choose from:

    * **OTP via Email** – Sends a one-time password to the user’s email.
    * **Magic Link** – Sends a clickable authentication link to the email.
    * **OTP + Magic Link** – Provides both options for flexibility.

    <CodeGroup>
      ```typescript Request theme={null}
      const startEmailAuth = (email: string) => {
        const request = {
              email
          };
        headlessModule.start(request);
      };
      ```
    </CodeGroup>

    ### Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters. Verifying OTP is required only in case of `OTP` authentication. No need to verify `OTP` in case of `MAGICLINK`.

    <CodeGroup>
      ```typescript Request theme={null}
      const verifyEmailOtp = (email: string, otp: string) => {
        const request = {
              email,
              otp
          };
        headlessModule.start(request);
      };
      ```
    </CodeGroup>

  </Tab>

  <Tab title="OAUTH">
    **OAuth Authentication** 🔑\
    OAuth allows users to authenticate using third-party services like Google, GitHub, or WhatsApp. Instead of entering credentials manually, users can log in using their existing accounts, streamlining the authentication process.

    This is the list of **channels** you can use for OAuth login:

    * WHATSAPP
    * APPLE
    * GMAIL
    * TWITTER
    * DISCORD
    * SLACK
    * FACEBOOK
    * LINKEDIN
    * MICROSOFT
    * LINE
    * LINEAR
    * NOTION
    * TWITCH
    * GITHUB
    * BITBUCKET
    * ATLASSIAN
    * GITLAB

    <CodeGroup>
      ```typescript Request theme={null}
      const startOAuth = () => {
        const request = { channelType: "WHATSAPP" }; // Replace WHATSAPP with the desired channel
        headlessModule.start(request);
      };
      ```
    </CodeGroup>

    <Note>Make sure the channel that you have selected is enabled on the [dashboard](https://otpless.com/dashboard/customer/channels).</Note>

  </Tab>
</Tabs>

## Error Handling

The error codes for android and iOS have to be handled separately.

- Checkout [android error codes](https://otpless.com/docs/frontend-sdks/app-sdks/android/new/references/error-codes)
- Checkout [iOS error codes](https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/references/error-codes)
- To handle all the **verification/initiation error codes** for android and iOS, refer to the following code:

<Tabs>
  <Tab title="Android">
    <CodeGroup>
      ```typescript Initiate error theme={null}
      const handleInitiateErrorAndroid = (response: any) => {
          const errorCode = response?.errorCode as string;
          const errorMessage = response?.errorMessage as string;

          if (!errorCode) {
              console.log("OTPless Error: Unknown error -", errorMessage);
              return;
          }

          switch (errorCode) {
              case "7101":
                  console.log("OTPless Error: Invalid parameters values or missing parameters -", errorMessage);
                  break;
              case "7102":
                  console.log("OTPless Error: Invalid phone number -", errorMessage);
                  break;
              case "7103":
                  console.log("OTPless Error: Invalid phone number delivery channel -", errorMessage);
                  break;
              case "7104":
                  console.log("OTPless Error: Invalid email -", errorMessage);
                  break;
              case "7105":
                  console.log("OTPless Error: Invalid email channel -", errorMessage);
                  break;
              case "7106":
                  console.log("OTPless Error: Invalid phone number or email -", errorMessage);
                  break;
              case "7113":
                  console.log("OTPless Error: Invalid expiry -", errorMessage);
                  break;
              case "7116":
                  console.log("OTPless Error: OTP Length is invalid (4 or 6 only allowed) -", errorMessage);
                  break;
              case "7121":
                  console.log("OTPless Error: Invalid app hash -", errorMessage);
                  break;
              case "4000":
                  console.log("OTPless Error: Invalid request values -", errorMessage);
                  break;
              case "4003":
                  console.log("OTPless Error: Incorrect request channel -", errorMessage);
                  break;
              case "401":
              case "7025":
                  console.log("OTPless Error: Unauthorized request or country not enabled -", errorMessage);
                  break;
              case "7020":
              case "7022":
              case "7023":
              case "7024":
                  console.log("OTPless Error: Too many requests (rate limiting) -", errorMessage);
                  break;
              case "9100":
              case "9104":
              case "9103":
                  console.log("OTPless Error: Network connectivity error -", errorMessage);
                  break;
              default:
                  console.log("OTPless Error: Unknown error -", errorMessage);
          }
      };
      ```

      ```typescript Verify error theme={null}
      const handleVerifyErrorAndroid = (response: any) => {
          const errorCode = response?.errorCode as string;
          const errorMessage = response?.errorMessage as string;

          if (!errorCode) {
              console.log("OTPless Error: Unknown error -", errorMessage);
              return;
          }

          switch (errorCode) {
              case "7112":
                  console.log("OTPless Error: Empty OTP -", errorMessage);
                  break;
              case "7115":
                  console.log("OTPless Error: OTP is already verified -", errorMessage);
                  break;
              case "7118":
                  console.log("OTPless Error: Incorrect OTP -", errorMessage);
                  break;
              case "7303":
                  console.log("OTPless Error: OTP expired -", errorMessage);
                  break;
              case "4000":
                  console.log("OTPless Error: Invalid request -", errorMessage);
                  break;
              case "9100":
              case "9104":
              case "9103":
                  console.log("OTPless Error: Network connectivity error -", errorMessage);
                  break;
              default:
                  console.log("OTPless Error: Unknown error -", errorMessage);
          }
      };
      ```
    </CodeGroup>

  </Tab>

  <Tab title="iOS">
    <CodeGroup>
      ```typescript Initiate error theme={null}
      function handleInitiateErrorIOS(response: any) {
          const errorCode = response?.errorCode as string;
          const errorMessage = response?.errorMessage as string;

          if (!errorCode) {
            console.log("OTPless Error: Unknown error -", errorMessage);
            return;
          }

          switch (errorCode) {
              case "7101":
                  console.log(`OTPless Error: Invalid parameters values or missing parameters - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7102":
                  console.log(`OTPless Error: Invalid phone number - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7103":
                  console.log(`OTPless Error: Invalid phone number delivery channel - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7104":
                  console.log(`OTPless Error: Invalid email - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7105":
                  console.log(`OTPless Error: Invalid email channel - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7106":
                  console.log(`OTPless Error: Invalid phone number or email - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7113":
                  console.log(`OTPless Error: Invalid expiry - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7116":
                  console.log(`OTPless Error: OTP Length is invalid (4 or 6 only allowed) - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7121":
                  console.log(`OTPless Error: Invalid app hash - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "4000":
                  console.log(`OTPless Error: Invalid request values - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "4003":
                  console.log(`OTPless Error: Incorrect request channel - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "401":
              case "7025":
                  console.log(`OTPless Error: Unauthorized request or country not enabled - ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7020":
              case "7022":
              case "7023":
              case "7024":
                  console.log(`OTPless Error: Rate limiting error (Too many requests) - ${errorMessage ?? "Unknown error"}`);
                  break;

              // Internet-related errors
              case "9100":
              case "9101":
              case "9102":
              case "9103":
              case "9104":
              case "9105":
              case "9110":
                  console.log(`OTPless Error: Network error (Connectivity issue) - ${errorMessage}`);
                  break;

              default:
                  console.log(`OTPless Error: ${errorMessage ?? "Unknown error"}`);
          }
      }
      ```

      ```typescript Verify error theme={null}
      function handleVerifyErrorIOS(data: any) {
          const errorCode = response?.errorCode as string;
          const errorMessage = response?.errorMessage as string;

          if (!errorCode) {
            console.log("OTPless Error: Unknown error -", errorMessage);
            return;
          }

          switch (errorCode) {
              case "7112":
                  console.log(`OTPless Error: ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7115":
                  console.log(`OTPless Error: ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7118":
                  console.log(`OTPless Error: ${errorMessage ?? "Unknown error"}`);
                  break;
              case "7303":
                  console.log(`OTPless Error: ${errorMessage ?? "Unknown error"}`);
                  break;
              case "4000":
                  console.log(`OTPless Error: ${errorMessage ?? "Unknown error"}`);
                  break;

              // Internet-related errors
              case "9100":
              case "9101":
              case "9102":
              case "9103":
              case "9104":
              case "9105":
              case "9110":
                  console.log(`OTPless Error: Network error (Connectivity issue) - ${errorMessage}`);
                  break;

              default:
                  console.log(`OTPless Error: ${errorMessage ?? "Unknown error"}`);
          }
      }

      ```
    </CodeGroup>

  </Tab>
</Tabs>

<SampleGithubContainer platform="react native" />
