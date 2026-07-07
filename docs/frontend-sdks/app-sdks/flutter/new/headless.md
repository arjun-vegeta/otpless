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

## Step 1: Installation

Add the following to your `pubspec.yaml`:

```yaml theme={null}
dependencies:
  otpless_headless_flutter: ^<latest_version>
```

Then, run:

```bash theme={null}
flutter pub get
```

<Note>Please find the latest version of the SDK [here](https://pub.dev/packages/otpless_headless_flutter).</Note>

## Step 2: Platform-specific Integrations

<Tabs>
  <Tab title="Android">
    <AndroidRequirements />

    1. Add intent filter inside your `android/app/src/main/AndroidManifest.xml` file into your Main activity code block:
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    ```xml theme={null}
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data
          android:host="otpless"
          android:scheme= "otpless.YOUR_APP_ID_LOWERCASE"/>
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

    4. If your MainActivity extends `FlutterActivity`, change it to extend `FlutterFragmentActivity` for lifecycle awareness.

    ```kotlin theme={null}
      import io.flutter.embedding.android.FlutterFragmentActivity
      class MainActivity : FlutterFragmentActivity() {
      }
    ```

  </Tab>

  <Tab title="iOS">
    1. Go to your project's root folder in the terminal and run.

    ```bash theme={null}
    pod install
    ```

    2. Add the following block to your `ios/Runner/Info.plist` file:
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    ```xml info.plist theme={null}
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>otpless.YOUR_APP_ID_LOWERCASE</string>
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

    3. Add the following block to your `ios/Runner/Info.plist` file only if you are using the SNA feature.

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

    4. Import the OTPLESS SDK in your respective `ios/Runner/AppDelegate.swift` file to handle redirection.
       <Note>This step is only needed for Magic Link. Smart Auth integration do not require this step.</Note>

    ```swift theme={null}
    import OtplessBM
    ```

    <CodeGroup>
      ```swift App Delegate theme={null}
      func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
          if Otpless.shared.isOtplessDeeplink(url: url.url) {
                    Task(priority: .userInitiated) {
                        await Otpless.shared.handleDeeplink(url.url)
                    }
            }
          return true
      }
      ```

      ```swift Scene Delegate theme={null}
      func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
          for context in URLContexts {
             if Otpless.shared.isOtplessDeeplink(url: url.url) {
                      Task(priority: .userInitiated) {
                          await Otpless.shared.handleDeeplink(url.url)
                      }
              break
            }
          }
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

## Step 3: Initialize the SDK

1. Import the SDK in your `main.dart` file:

```dart theme={null}
import 'package:otpless_headless_flutter/otpless_flutter.dart';
```

2. Then, create an instance of the SDK:

```dart theme={null}
final _otplessHeadlessPlugin = Otpless();
```

3. In your LoginScreen's `initState`, initialize the SDK and set the response callback:

```dart LoginScreen theme={null}
@override
void initState() {
  super.initState();
  _otplessHeadlessPlugin.initialize("YOUR_APP_ID");
  _otplessHeadlessPlugin.setResponseCallback(onOtplessResponse);
}
```

4. Create a callback function to handle the response:

```dart LoginScreen theme={null}
void onOtplessResponse(dynamic result) {
  _otplessHeadlessPlugin.commitResponse(result);

  final responseType = result['responseType'];

  switch (responseType) {
    case "SDK_READY":
      debugPrint("SDK is ready");
      break;

    case "FAILED":
      debugPrint("SDK initialization failed");
      // Handle SDK initialization failure
      break;

    case "INITIATE":
      if (result["statusCode"] == 200) {
        debugPrint("Headless authentication initiated");
        final authType = result["response"]["authType"]; // This is the authentication type
        if (authType == "OTP") {
         // Take user to OTP verification screen
        } else if (authType == "SILENT_AUTH") {
          // Handle Silent Authentication initiation by showing
          // loading status for SNA flow.
        }
      } else {
        // Handle initiation error.
        // To handle initiation error response, please refer to the error handling section.
        if (Platform.isAndroid) {
          handleInitiateErrorAndroid(result["response"]);
        } else if (Platform.isIOS) {
          handleInitiateErrorIOS(result["response"]);
        }
      }
      break;

    case "OTP_AUTO_READ":
      // OTP_AUTO_READ is triggered only in ANDROID devices for WhatsApp and SMS.
        final otp = result["response"]["otp"];
        debugPrint("OTP Received: $otp");
      break;

    case "VERIFY":
      final authType = result["response"]["authType"];
      if (authType == "SILENT_AUTH") {
        if (result["statusCode"] == 9106) {
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
        if (Platform.isAndroid) {
          handleVerifyErrorAndroid(result["response"]);
        } else if (Platform.isIOS) {
          handleVerifyErrorIOS(result["response"]);
        }
      }
      break;

    case "DELIVERY_STATUS":
        // This function is called when delivery is successful for your authType.
        final authType = result["response"]["authType"];
        // It is the authentication type (OTP, MAGICLINK, OTP_LINK) for which the delivery status is being sent
        final deliveryChannel = result["response"]["deliveryChannel"];
        // It is the delivery channel (SMS, WHATSAPP, etc) on which the authType has been delivered
        break;

    case "ONETAP":
      final token = result["response"]["token"];
      if (token != null) {
        debugPrint("OneTap Data: $token");
        // Process token and proceed
      }
      break;

    case "FALLBACK_TRIGGERED":
        // A fallback occurs when an OTP delivery attempt on one channel fails,
        // and the system automatically retries via the subsequent channel selected on Otpless Dashboard.
        // For example, if a merchant opts for SmartAuth with primary channal as WhatsApp and secondary channel as SMS,
        // in that case, if OTP delivery on WhatsApp fails, the system will automatically retry via SMS.
        // The response will contain the deliveryChannel to which the OTP has been sent.
        final newDeliveryChannel = result["response"]["deliveryChannel"];
        if (newDeliveryChannel != null) {
            // This is the deliveryChannel to which the OTP has been sent
        }
      break;

    default:
      debugPrint("Unknown response type: $responseType");
      break;
  }

}

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
      ```dart LoginScreen theme={null}
      void startWithPhone(String phoneNumber) async {
        final bool isSdkReady = await _otplessHeadlessPlugin.isSdkReady();
        if (isSdkReady) {
          final Map<String, dynamic> args = {
              "phone": "phoneNumber",
              "countryCode": "countryCode",
          };
          _otplessHeadlessPlugin.start(onOtplessResponse, args);
        } else {
          // Follow Fallback mechanism to handle the authentication flow.
        }
      }
      ```
    </CodeGroup>

    ### Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters. Verifying OTP is required only in case of `OTP` authentication. No need to verify `OTP` in case of `MAGICLINK`.

    <CodeGroup>
      ```dart LoginScreen theme={null}
      void verifyPhoneOtp(String phoneNumber, String otp) {
          final Map<String, dynamic> args = {
              "phone": "phoneNumber",
              "countryCode": "countryCode",
              "otp": "otp",
          };
          _otplessHeadlessPlugin.start(onOtplessResponse, args);
      }
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
      ```dart LoginScreen theme={null}
      void startWithEmail(String email) {
          final Map<String, dynamic> args = {
              "email": email,
          };
          _otplessHeadlessPlugin.start(onOtplessResponse, args);
      }
      ```
    </CodeGroup>

    ### Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters. Verifying OTP is required only in case of `OTP` authentication. No need to verify `OTP` in case of `MAGICLINK`.

    <CodeGroup>
      ```dart LoginScreen theme={null}
      void verifyEmailOtp(String email, String otp) {
          final Map<String, dynamic> args = {
              "email": email,
              "otp": otp,
          };
          _otplessHeadlessPlugin.start(onOtplessResponse, args);
      }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="OAuth">
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
      ```dart LoginScreen theme={null}
      void startWithOAuth(String channelType) {
          final Map<String, dynamic> args = {
              "channelType": "WHATSAPP", // Replace WHATSAPP with your desired channel
          };
          _otplessHeadlessPlugin.start(onOtplessResponse, args);
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

---

## Error Handling

The error codes for android and iOS have to be handled separately.

- Checkout [android error codes](https://otpless.com/docs/frontend-sdks/app-sdks/android/new/references/error-codes)
- Checkout [iOS error codes](https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/references/error-codes)
- To handle all the **verification/initiation error codes** for android and iOS, refer to the following code:

<Tabs>
  <Tab title="Android">
    <CodeGroup>
      ```dart Initiate Error theme={null}
      void handleInitiateErrorAndroid(dynamic response) {
        final String? errorCode = response?['errorCode'];
        final String? errorMessage = response?['errorMessage'];

        if (errorCode == null) {
          debugPrint("OTPless Error: Unknown error - $errorMessage");
          return;
        }

        switch (errorCode) {
          case "7101":
            debugPrint("OTPless Error: Invalid parameters values or missing parameters - $errorMessage");
            break;
          case "7102":
            debugPrint("OTPless Error: Invalid phone number - $errorMessage");
            break;
          case "7103":
            debugPrint("OTPless Error: Invalid phone number delivery channel - $errorMessage");
            break;
          case "7104":
            debugPrint("OTPless Error: Invalid email - $errorMessage");
            break;
          case "7105":
            debugPrint("OTPless Error: Invalid email channel - $errorMessage");
            break;
          case "7106":
            debugPrint("OTPless Error: Invalid phone number or email - $errorMessage");
            break;
          case "7113":
            debugPrint("OTPless Error: Invalid expiry - $errorMessage");
            break;
          case "7116":
            debugPrint("OTPless Error: OTP Length is invalid (4 or 6 only allowed) - $errorMessage");
            break;
          case "7121":
            debugPrint("OTPless Error: Invalid app hash - $errorMessage");
            break;
          case "4000":
            debugPrint("OTPless Error: Invalid request values - $errorMessage");
            break;
          case "4001":
            debugPrint("OTPless Error: Unsupported 2FA request - $errorMessage");
            break;
          case "4003":
            debugPrint("OTPless Error: Incorrect request channel - $errorMessage");
            break;
          case "401":
          case "7025":
            debugPrint("OTPless Error: Unauthorized request or country not enabled - $errorMessage");
            break;
          case "7020":
          case "7022":
          case "7023":
          case "7024":
            debugPrint("OTPless Error: Too many requests (rate limiting) - $errorMessage");
            break;
          case "9100":
          case "9104":
          case "9103":
            debugPrint("OTPless Error: Network connectivity error - $errorMessage");
            break;
          default:
            debugPrint("OTPless Error: Unknown error - $errorMessage");
        }
      }
      ```

      ```dart Verify Error theme={null}
      void handleVerifyErrorAndroid(dynamic response) {
        final String? errorCode = response?['errorCode'];
        final String? errorMessage = response?['errorMessage'];

        if (errorCode == null) {
          debugPrint("OTPless Error: Unknown error - $errorMessage");
          return;
        }

        switch (errorCode) {
          case "7112":
            debugPrint("OTPless Error: Empty OTP - $errorMessage");
            break;
          case "7115":
            debugPrint("OTPless Error: OTP is already verified - $errorMessage");
            break;
          case "7118":
            debugPrint("OTPless Error: Incorrect OTP - $errorMessage");
            break;
          case "7303":
            debugPrint("OTPless Error: OTP expired - $errorMessage");
            break;
          case "4000":
            debugPrint("OTPless Error: Invalid request - $errorMessage");
            break;
          case "9100":
          case "9104":
          case "9103":
            debugPrint("OTPless Error: Network connectivity error - $errorMessage");
            break;
          default:
            debugPrint("OTPless Error: Unknown error - $errorMessage");
        }
      }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="iOS">
    <CodeGroup>
      ```dart Initiate Error theme={null}
      void handleInitiateErrorIOS(dynamic response) {
        final String? errorCode = response?['errorCode'];
        final String? errorMessage = response?['errorMessage'];

        if (errorCode == null) {
          debugPrint("OTPless Error: Unknown error - ${errorMessage ?? 'Unknown error'}");
          return;
        }

        switch (errorCode) {
          case "7101":
            debugPrint("OTPless Error: Invalid parameters values or missing parameters - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7102":
            debugPrint("OTPless Error: Invalid phone number - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7103":
            debugPrint("OTPless Error: Invalid phone number delivery channel - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7104":
            debugPrint("OTPless Error: Invalid email - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7105":
            debugPrint("OTPless Error: Invalid email channel - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7106":
            debugPrint("OTPless Error: Invalid phone number or email - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7113":
            debugPrint("OTPless Error: Invalid expiry - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7116":
            debugPrint("OTPless Error: OTP Length is invalid (4 or 6 only allowed) - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7121":
            debugPrint("OTPless Error: Invalid app hash - ${errorMessage ?? 'Unknown error'}");
            break;
          case "4000":
            debugPrint("OTPless Error: Invalid request values - ${errorMessage ?? 'Unknown error'}");
            break;
          case "4003":
            debugPrint("OTPless Error: Incorrect request channel - ${errorMessage ?? 'Unknown error'}");
            break;
          case "401":
          case "7025":
            debugPrint("OTPless Error: Unauthorized request or country not enabled - ${errorMessage ?? 'Unknown error'}");
            break;
          case "7020":
          case "7022":
          case "7023":
          case "7024":
            debugPrint("OTPless Error: Rate limiting error (Too many requests) - ${errorMessage ?? 'Unknown error'}");
            break;

          // iOS feature limitation
          case "5900":
            debugPrint("OTPless Error: The feature is not supported because it requires a newer iOS version - ${errorMessage ?? 'The requested feature is only available on newer iOS versions.'}");
            break;

          // Internet-related errors
          case "9100":
          case "9101":
          case "9102":
          case "9103":
          case "9104":
          case "9105":
            debugPrint("OTPless Error: Network issue detected - ${errorMessage ?? 'A network error occurred. Please check your internet connection or try again later.'}");
            break;
          case "9110":
            debugPrint("OTPless Error: Otpless Authentication Request Cancelled - ${errorMessage ?? 'The authentication request was manually canceled by the user or the system.'}");
            break;

          default:
            debugPrint("OTPless Error: ${errorMessage ?? 'Unknown error'}");
        }
      }
      ```

      ```dart Verify Error theme={null}
      void handleVerifyErrorIOS(dynamic response) {
        final String? errorCode = response?['errorCode'];
        final String? errorMessage = response?['errorMessage'];

        if (errorCode == null) {
          debugPrint("OTPless Error: Unknown error - ${errorMessage ?? 'Unknown error'}");
          return;
        }

        switch (errorCode) {
          case "7112":
            debugPrint("OTPless Error: ${errorMessage ?? 'Unknown error'}");
            break;
          case "7115":
            debugPrint("OTPless Error: ${errorMessage ?? 'Unknown error'}");
            break;
          case "7118":
            debugPrint("OTPless Error: ${errorMessage ?? 'Unknown error'}");
            break;
          case "7303":
            debugPrint("OTPless Error: ${errorMessage ?? 'Unknown error'}");
            break;
          case "4000":
            debugPrint("OTPless Error: ${errorMessage ?? 'Unknown error'}");
            break;

          // Internet-related errors
          case "9100":
          case "9101":
          case "9102":
          case "9103":
          case "9104":
          case "9105":
            debugPrint("OTPless Error: Network issue detected - ${errorMessage ?? 'A network error occurred. Please check your internet connection or try again later.'}");
            break;
          case "9110":
            debugPrint("OTPless Error: Otpless Authentication Request Cancelled - ${errorMessage ?? 'The authentication request was manually canceled by the user or the system.'}");
            break;

          default:
            debugPrint("OTPless Error: ${errorMessage ?? 'Unknown error'}");
        }
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

<SampleGithubContainer platform="flutter" />
