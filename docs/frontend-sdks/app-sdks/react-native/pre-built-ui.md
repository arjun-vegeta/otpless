> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Pre-Built UI

> Leverage our Pre-Built UI for rapid integration and customization of authentication flows in your application. This setup allows you to adjust appearance and functionality through the OTPLESS dashboard with minimal coding.

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

## Step 1: Install OTPLESS SDK Dependency

Install the OTPLESS SDK dependency by running the following command in your terminal at the root of your React Native project:

```bash theme={null}
npm i otpless-react-native-lp
```

## Step 2: Platform-specific Integrations

<Tabs>
  <Tab title="Android">
    <AndroidRequirements />

    1. Add intent filter inside your `android/app/src/main/AndroidManifest.xml` file into your Main activity code block:

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

    ```xml theme={null}
    android:launchMode="singleTop"
    android:exported="true"
    ```

  </Tab>

  <Tab title="iOS">
    1. Add the following block to your `ios/info.plist` file:

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

    2. Add the following block to your `ios/info.plist` file (Only required if
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

    3. Go to build settings. Search for defines module, this option will appear in packaging
       change it to yes.

    4. Create connector.swift file and it will ask to create bridging header, Click yes.
       Copy-paste the following code into your connector.swift file.

    ```swift connector.swift theme={null}
    import OtplessSwiftLP
    import Foundation

    class Connector: NSObject {
      @objc public static func isOtplessDeeplink(_ url: URL) -> Bool {
        return OtplessSwiftLP.shared.isOtplessDeeplink(url: url)
      }

      @objc public static func processDeepLink(_ url: URL) {
        OtplessSwiftLP.shared.processOtplessDeeplink(url: url)
      }
    }
    ```

    5. Import the OTPLESS SDK in your respective `ios/AppDelegate.mm` file to handle redirection.

    ```swift AppDelegate.h theme={null}
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

  </Tab>
</Tabs>

## Step 3: Configure Sign up/Sign in

1. Import the OTPLESS `package` on your login page.

```typescript login_page.tsx theme={null}
import { OtplessReactNativeModule } from 'otpless-react-native-lp';
```

2. Add OTPLESS instance and initialize the SDK:

```typescript login_page.tsx theme={null}
const otplessModule = new OtplessReactNativeModule();

useEffect(() => {
  initializeModule();
  return () => {
    otplessModule.clearListener();
    otplessModule.stop(); // You may stop the module if needed.
  };
}, []);

const initializeModule = () => {
  otplessModule.initialize('APPID').then((traceId) => {
    // traceId to track events
  });
  otplessModule.setResponseCallback(onResponse);
  // only in debug case
  otplessModule.setWebViewInspectable();
  otplessModule.setLogging(true);
};
```

3. Add the following code to Initiate OTPLESS Login Page

```typescript login_page.tsx theme={null}
const startHeadless = () => {
  const baseRequest: IOTPlessRequest = {};

  if (phoneNumber) {
    baseRequest.extraQueryParams = {
      phone: phoneNumber,
      countryCode: '91',
    };
  }
  otplessModule.start(baseRequest);
};
```

4. Add the following code to handle response callback:

```typescript login_page.tsx theme={null}
const onResponse = (authResponse: OTPlessAuthCallback) => {
  if (authResponse.status === 'success') {
    const token = authResponse.token;
    console.log('Token received:', token);
  } else if (authResponse.status === 'error') {
    switch (authResponse.errorType) {
      case 'INITIATE':
        switch (authResponse.errorCode) {
          case 10000:
            // handle user cancelled (User clicked on back button)
            break;
          case 10001:
            // handle user cancelled (User clicked on help button)
            break;
          case 10002:
            // handle user cancelled (User clicked on phone number change button)
            break;
          case 7102:
            // handle invalid phone
            break;
          case 7104:
            // handle invalid email
            break;
          case 9120:
            // SDK not initialized
            break;
          case 9125:
          case 5050:
            // SDK Loading error
            break;
        }
        break;

      case 'NETWORK':
        // errorCode internet is not available 9103
        if (authResponse.errorCode === 9103) {
          // handle internet error
        }
        break;

      case 'VERIFY':
        // handle custom error
        break;
    }
  }
};
```

5. When user successfully logs in, stop Otpless:

```typescript login_page.tsx theme={null}
otplessModule.stop();
```

## Step 4: Tracking Multiple Events

You can observe all events using:

```javascript theme={null}
otplessModule.addEventObserver(onOtplessEvent);
```

To track and handle specific event categories, use:

```javascript theme={null}
const onOtplessEvent = (data: any) => {
    console.log("OTPless Event:", data);

    // Ensure result is an object before processing
    const category = data.category || '';
    const eventType = data.eventType || '';
    const metaData = data.metaData || {};

    switch (category) {
      case 'LOAD':
        // track url success loading action
        break;

      case 'CLICK':
        // track user action
        break;

      case 'ACTION':
        // track actions with metadata
        break;
    }
};

```

### Sample Event JSON Payloads

<Tabs>
  <Tab title="ACTION">
    <Tabs>
      <Tab title="INITIATE">
        ```json theme={null}
        {
          "event": "ACTION",
          "type": "INITIATE",
          "metaData": {
            "requestId": "abc123xyz",
            "channel": "OTP/SILENT_AUTH",
            "authType": "OTP/SILENT_AUTH",
            "deliveryChannel": "OTP/SILENT_AUTH"
          }
        }
        ```
      </Tab>

      <Tab title="VERIFY_ERROR">
        ```json theme={null}
        {
          "event": "ACTION",
          "type": "VERIFY_ERROR",
          "metaData": {
            "errorCode": "errorCode",
            "errorMessage": "errorMessage",
            "authType": "OTP/SILENT_AUTH"
          }
        }
        ```
      </Tab>

      <Tab title="OTP_AUTO_READ">
        ```json theme={null}
        {
          "event": "ACTION",
          "type": "OTP_AUTO_READ",
          "metaData": {
            "otp": "000000"
          }
        }
        ```
      </Tab>

      <Tab title="DELIVERY_STATUS">
        ```json theme={null}
        {
          "event": "ACTION",
          "type": "DELIVERY_STATUS",
          "metaData": {
            "deliveryChannel": "WHATSAPP/SMS/VOICE_CALL",
            "communicationDelivered": true,
            "authType": "OTP"
          }
        }
        ```
      </Tab>

      <Tab title="FALLBACK_TRIGGERED">
        ```json theme={null}
        {
          "event": "ACTION",
          "type": "FALLBACK_TRIGGERED",
          "metaData": {
            "requestId": "req_98765abc",
            "channel": "OTP",
            "authType": "OTP",
            "deliveryChannel": "SMS/WHATSAPP/VOICE_CALL"
          }
        }
        ```
      </Tab>
    </Tabs>

  </Tab>

  <Tab title="CLICK">
    <Tabs>
      <Tab title="PHONE_CHANGE">
        ```json theme={null}
        {
          "event": "CLICK",
          "type": "PHONE_CHANGE",
          "metaData": {}
        }
        ```
      </Tab>

      <Tab title="VERIFY">
        ```json theme={null}
        {
          "event": "CLICK",
          "type": "VERIFY",
          "metaData": {}
        }
        ```
      </Tab>

      <Tab title="RESEND">
        ```json theme={null}
        {
          "event": "CLICK",
          "type": "RESEND",
          "metaData": {
            "resendbuttonType": "WHATSAPP/SMS/CALL/DEFAULT"
          }
        }
        ```
      </Tab>

      <Tab title="CUSTOM">
        ```json theme={null}
        {
          "event": "CLICK",
          "type": "CUSTOM",
          "metaData": {
            "custombuttonType": "buttonKeyName"
          }
        }
        ```
      </Tab>
    </Tabs>

  </Tab>

  <Tab title="LOAD">
    <Tab title="PAGE_LOADED">
      ```json theme={null}
      {
        "event": "LOAD",
        "type": "PAGE_LOADED",
        "metaData": {}
      }
      ```
    </Tab>
  </Tab>
</Tabs>

<SampleGithubContainer platform="react native" />
