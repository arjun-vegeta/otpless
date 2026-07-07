> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Pre-Built UI

> Leverage our Pre-Built UI for rapid integration and customization of authentication flows in your application. This setup allows you to adjust appearance and functionality through the OTPLESS dashboard with minimal coding.

export const AndroidRequirements = () => {
return <div>
<h3>Requirements</h3>
<ul>
<li>The compileSdk version should be <strong>35</strong>.</li>
<li>The minimum SDK version supported by the SDK is <strong>21</strong>.</li>
<li>The kotlin version should be <strong>1.9.0 and above</strong>.</li>
<li>The gradle version should be <strong>8.3.1 and above</strong>.</li>
</ul>
   </div>;
};

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

Install the OTPLESS SDK dependency by running the following command in your terminal at the root of your Flutter project:

```bash theme={null}
flutter pub add otpless_flutter_lp:1.0.4
flutter pub get
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
    1. Add the following block to your `ios/Runner/info.plist` file:

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

    2. Add the following block to your `ios/Runner/info.plist` file (Only required if
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

    3. Import the OTPLESS SDK in your respective `ios/Runner/AppDelegate.swift` file to handle redirection.

    ```swift AppDelegate.swift theme={null}
    import OtplessSwiftLP

    override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        if OtplessSwiftLP.shared.isOtplessDeeplink(url: url){
            OtplessSwiftLP.shared.processOtplessDeeplink(url: url)
            return true
        }
    	super.application(app, open: url, options: options)
    	return true
    }
    ```

  </Tab>
</Tabs>

## Step 3: Configure Sign up/Sign in

1. Import the OTPLESS `package` on your login page.

```dart login_page.dart theme={null}
import 'package:otpless_flutter_lp/otpless_flutter.dart';
```

2. Add OTPLESS instance and declare the variable with `YOUR_APP_ID`

```dart login_page.dart theme={null}
  final _otplessFlutterLP = Otpless();

  @override
  void initState() {
    super.initState();
    _otplessFlutterLP.initialize("YOUR_APP_ID");
    _otplessFlutterLP.setResponseCallback(onLoginPageResult);
    // only in debug case
    _otplessFlutterLP.setDebugLogging(true);
    _otplessFlutterLP.setWebViewInspectable();
  }
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

3. Show the Otpless Login Page:

```dart login_page.dart theme={null}
  Future<void> openLoginPage() async {
    LoginPageParams pageParams = LoginPageParams(
        extraQueryParams: {"phone": "PHONE_NUMBER", "countryCode": "91"});
    _otplessFlutterLP.start(pageParams);
  }


 void onLoginPageResult(OtplessResult result) {
  // Normalize the dynamic payload to a Map
  if (result is OtplessResultSuccess) {
      print("token: ${result.token}");
      return;
    }
  if (result is OtplessResultError) {
    switch (result.errorType) {
      case  ErrorType.initiate:
        switch (result.errorCode) {
          case 10000:
            // TODO: User cancelled (back button)
            break;
          case 10001:
            // TODO: User cancelled (help button)
            break;
          case 10002:
            // TODO: User cancelled (change phone)
            break;
          case 7102:
            // TODO: Invalid phone
            break;
          case 7104:
            // TODO: Invalid email
            break;
          case 9120:
            // TODO: SDK not initialized
            break;
          case 9125:
          case 5050:
            // TODO: SDK loading error
            break;
          default:
            // TODO: Generic INITIATE error (use errorCode if needed)
            break;
        }
        break;

      case  ErrorType.network:
        if (result.errorCode == 9103) {
          // TODO: No internet connection
        } else {
          // TODO: Generic NETWORK error (use errorCode if needed)
        }
        break;

      case ErrorType.verify:
        // TODO: Custom verify error (use errorCode if needed)
        break;

      default:
        // TODO: Unknown errorType; consider a generic error UI
        break;
    }

    // Optional: Display errorMessage to the user or send traceId to your monitoring
    // e.g., showSnackBar(errorMessage); sendToAnalytics(traceId);
    return;
  }

  // Fallback: unknown payload shape
  // TODO: Handle unexpected response format (m)
}
```

4. When user successfully logs in or your login screen is destroyed, stop Otpless service:

```dart login_page.dart theme={null}
  void stopOtpless() {
    _otplessFlutterLP.stop();
  }
```

5. Tracking Multiple Events

You can observe all events using:

```dart theme={null}
_otplessFlutterLP.setEventListener(onOtplessEvent);
```

To track and handle specific event categories, use:

```dart theme={null}
void onOtplessEvent(OtplessEventData result) {
    // Handle eventData here

    print(result);
    EventCategory category= result.category;
    EventType eventType =result.eventType;
    Map<String, dynamic>? metaData = result.metaData;

    switch (category) {
      case EventCategory.load:
        // track url success loading action
        break;

      case EventCategory.click:
        // track user action
        break;

      case EventCategory.action:
        // track actions with metadata
        break;
    }
  }
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

<SampleGithubContainer platform="flutter" />
