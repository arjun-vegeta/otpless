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

<Tip>
  We have launched a new SDK for Headless integration. Please consider migrating from the current SDK to the new SDK for more seamless integration and robust performance. Checkout the [new SDK here](/frontend-sdks/app-sdks/react-native/new/headless/headless). This SDK (legacy) will be deprecated and archived soon, we suggest migrating to the new SDK at the earliest.
</Tip>

## Step 1: Install OTPLESS SDK Dependency

Install the OTPLESS SDK dependency by running the following command in your terminal at the root of your React Native project:

```bash theme={null}
npm i otpless-react-native
```

## Step 2: Platform-specific Integrations

<Tabs>
  <Tab title="Android">
    1. Add intent filter inside your `android/app/src/main/AndroidManifest.xml` file into your Main activity code block:

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

    ```xml theme={null}
    android:launchMode="singleTop"
    android:exported="true"
    ```

    4. Add the following override method in `android/app/src/main/kotlin/MainActivity.kt` to handle callback and initialize OTPLESS:

    <Tabs>
      <Tab title="Java">
        * Import the following classes:

        ```java theme={null}
        import com.otplessreactnative.OtplessReactNativeManager;
        import android.content.Intent;
        ```

        * Add this code to your `onCreate()` method in your MainActivity to initialize OTPLESS:

        ```java theme={null}
        @Override
          protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          OtplessReactNativeManager.INSTANCE.registerOtplessView(this);
          //Your code ...
        }
        ```

        * Add this code to your `onBackPressed()` method in your MainActivity:

        ```java theme={null}
        @Override
        public void onBackPressed() {
          if (OtplessReactNativeManager.INSTANCE.onBackPressed()) return;
          super.onBackPressed();
        }
        ```
      </Tab>

      <Tab title="Kotlin">
        * Import the following classes:

        ```kotlin theme={null}
        import com.otplessreactnative.OtplessReactNativeManager
        import android.content.Intent
        ```

        * Add this code to your `onCreate()` method in your MainActivity to initialize OTPLESS:

        ```kotlin theme={null}
        override fun onCreate(savedInstanceState: Bundle?) {
          super.onCreate(savedInstanceState)
          OtplessReactNativeManager.registerOtplessView(this)
          //Your code ...
        }
        ```

        * Add this code to your `onBackPressed()` method in your MainActivity:

        ```kotlin theme={null}
        override fun onBackPressed() {
          if (OtplessReactNativeManager.onBackPressed()) return
          super.onBackPressed()
        }
        ```
      </Tab>
    </Tabs>

  </Tab>

  <Tab title="iOS">
    1. Go to your project's root folder in the terminal and run.

    ```bash theme={null}
    pod install
    ```

    2. Add the following block to your `info.plist` file:

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

    3. Add the following block to your `info.plist` file (Only required if
       you are using the SNA feature):

    ```xml info.plist theme={null}
    <dict>
    	<key>NSAllowsArbitraryLoads</key>
    	<true/>
    	<key>NSExceptionDomains</key>
    	<dict>
    		<key>80.in.safr.sekuramobile.com</key>
    		<dict>
    			<key>NSIncludesSubdomains</key>
    			<true/>
    			<key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
    			<true/>
    			<key>NSTemporaryExceptionMinimumTLSVersion</key>
    			<string>TLSv1.1</string>
    		</dict>
    		<key>partnerapi.jio.com</key>
    		<dict>
    			<key>NSIncludesSubdomains</key>
    			<true/>
    			<key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
    			<true/>
    			<key>NSTemporaryExceptionMinimumTLSVersion</key>
    			<string>TLSv1.1</string>
    		</dict>
    	</dict>
    </dict>
    ```

    4. Go to build settings. Search for defines module, this option will appear in packaging
       change it to yes.

    5. Create connector.swift file and it will ask to create bridging header, Click yes.
       Copy-paste the following code into your connector.swift file.

    ```swift connector.swift theme={null}
    import OtplessSDK
    import Foundation
    class Connector: NSObject {
    	@objc public static func loadUrl(_ url: NSURL) {
    	Otpless.sharedInstance.processOtplessDeeplink(url: url as URL)
    	}
    	@objc public static func isOtplessDeeplink(_ url: NSURL) -> Bool {
    	return Otpless.sharedInstance.isOtplessDeeplink(url: url as URL)
    	}
    }
    ```

    6. Import the OTPLESS SDK in your respective `AppDelegate.mm` file to handle redirection.

    <CodeGroup>
      ```c# AppDelegate.mm theme={null}
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
import { OtplessHeadlessModule } from 'otpless-react-native';
```

2. Create an instance of `OtplessHeadlessModule`.

```typescript login_page.tsx theme={null}
const headlessModule = new OtplessHeadlessModule();
```

3. Use useEffect hook to initialize the `OtplessHeadlessModule` and set callback.

```typescript login_page.tsx theme={null}
useEffect(() => {
  headlessModule.initHeadless('YOUR_APP_ID');
  headlessModule.setHeadlessCallback(onHeadlessResult);
  return () => {
    headlessModule.clearListener();
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
  if (result?.statusCode === 200) {
    const responseType = result.responseType;

    switch (responseType) {
      case 'INITIATE': {
        // Notify that headless authentication has been initiated
        console.log('Headless authentication initiated');
        break;
      }
      case 'VERIFY': {
        // Notify that verification is completed
        // This is notified just before "ONETAP" final response
        console.log('Verification completed');
        break;
      }
      case 'OTP_AUTO_READ': {
        if (Platform.OS === 'android') {
          const otp = result;
          console.log(`OTP Received: ${otp}`);
        }
        break;
      }
      case 'ONETAP': {
        const token = result;
        console.log(`OneTap Data: ${token}`);
        break;
      }
      default: {
        console.warn(`Unknown response type: ${responseType}`);
        break;
      }
    }
  } else {
    // Handle non-200 status codes
    console.error(`Error: Status code ${result?.statusCode || 'unknown'}`);
  }
};
```

| **ResponseType**    | **Description**                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **INITIATE**        | When authentication is initiated.                                                                                                                         |
| **VERIFY**          | When OTP is verified for an authentication and in case of link based authentication when user redirected back to the application after clicking the link. |
| **ONETAP**          | This is the final response of an authentication session. It includes the token that should be sent to your backend for server-to-server validation.       |
| **OTP\_AUTO\_READ** | When the OTP is automatically retrieved from SMS or WhatsApp. It includes OTP value in this responseType                                                  |

#### Error Codes

| StatusCode | ErrorMessage                                       | Short Description                                                     |
| ---------- | -------------------------------------------------- | --------------------------------------------------------------------- |
| `401`      | Unauthorized request! Please check your appId      | Suggests missing or invalid app ID for authorization.                 |
| `500`      | API\_ERROR                                         | Indicates a server-side error, possibly due to parameter issues.      |
| `4000`     | The request values are incorrect, see details.     | Points to incorrect request values; refer to details for corrections. |
| `4001`     | OTPless headless SDK doesn't support 2FA as of now | Indicates the lack of 2FA support in the SDK.                         |
| `4002`     | The request parameters are incorrect, see details. | Suggests parameter errors; check details for specifics.               |
| `4003`     | The request channel is incorrect, see details.     | Notes an incorrect request channel; see details for correct usage.    |
| `5002`     | No internet connection is present.                 | Indicates no internet connection, troubleshoot network and device.    |

## Step 4: Initiate Authentication

Initiate the authentication process based on the user's selected method by using the `initiate` method of the SDK.

<Tabs>
  <Tab title="Phone Auth">
    <CodeGroup>
      ```typescript Request theme={null}
      const headlessRequest = {phone: "YOUR_PHONE_NUMBER", countryCode: "YOUR_COUNTRY_CODE"};
      headlessModule.startHeadless(headlessRequest);
      ```

      ```json Response theme={null}
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
    </CodeGroup>

    ### (Optional): Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters.

    <CodeGroup>
      ```typescript Request theme={null}
      const headlessRequest = {phone: "YOUR_PHONE_NUMBER", countryCode: "YOUR_COUNTRY_CODE", otp: "otp"};
      headlessModule.startHeadless(headlessRequest);
      ```

      ```json Response theme={null}
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
    </CodeGroup>

  </Tab>

  <Tab title="Email Auth">
    <CodeGroup>
      ```typescript Request theme={null}
      const headlessRequest = {email: "YOUR_EMAIL"};
      headlessModule.startHeadless(headlessRequest);
      ```

      ```json Response theme={null}
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
    </CodeGroup>

    ### (Optional): Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters.

    <CodeGroup>
      ```typescript Request theme={null}
      const headlessRequest = {email: "YOUR_EMAIL", otp: "otp"};
      headlessModule.startHeadless(headlessRequest);
      ```

      ```json Response theme={null}
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
    </CodeGroup>

  </Tab>

  <Tab title="OAUTH">
    <CodeGroup>
      ```typescript Request theme={null}
      const headlessRequest = {channelType: "WHATSAPP"};
      headlessModule.startHeadless(headlessRequest);
      ```

      ```json Response theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "channel": "OAUTH",
          "channelType": "WHATSAPP",
          "requestId": "xxxxxxxxxxxxxxxx"
        }
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

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

<SampleGithubContainer platform="flutter" />
