> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Pre-Built UI Legacy

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

## Step 1: Add SDK Dependency

SDK can be installed via both Cocoapods and Swift Package Manager.

### Cocoapods

- Open your app's project file `.xcodeproj`.
- Add the following line into the dependencies section of your project's `Podfile`:

```ruby theme={null}
pod 'OtplessSDK/Core', '2.2.8'
```

<Note>
  Make sure to run the following commands in your root folder to fetch the
  dependency.
</Note>

```bash theme={null}
pod repo update
pod install
```

### Swift Package Manager

1. In Xcode, click File > Swift Packages > Add Package Dependency.
2. In the dialog that appears, enter the repository URL: [https://github.com/otpless-tech/Otpless-iOS-SDK.git](https://github.com/otpless-tech/Otpless-iOS-SDK.git).
3. Select the dependency rule as `exact version` and use the version `2.2.8`.

## Step 2: Configure info.plist

Add the following block to your `info.plist` file:

```xml info.plist theme={null}
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>otpless.{{YOUR_APP_ID}}</string>
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

## Step 3: Handle Redirection

Add the following code to your `App Delegate` to handle redirection:

<CodeGroup>
  ```swift App Delegate theme={null}
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool { 
      if Otpless.sharedInstance.isOtplessDeeplink(url: url){
      Otpless.sharedInstance.processOtplessDeeplink(url: url) }
      return true 
    }
  ```

```swift Scene Delegate theme={null}
  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    for context in URLContexts {
      if Otpless.sharedInstance.isOtplessDeeplink(url: context.url.absoluteURL) {
      Otpless.sharedInstance.processOtplessDeeplink(url: context.url.absoluteURL)
      break
      }
    }
  }
```

</CodeGroup>

## Step 4: Configure your Signup/Sign in page

Import the OTPLESS SDK in your file:

```swift theme={null}
import OtplessSDK
```

Add the following code in your `viewDidLoad()` function:

```swift theme={null}
Otpless.sharedInstance.setLoginPageDelegate(self)
Otpless.sharedInstance.showOtplessLoginPageWithParams(appId: {YOUR_APP_ID}, vc: self, params: nil)

```

## Step 5: Handle Callback on your Signup/Sign in page

Implement the `OtplessDelegate` protocol and handle the callback from the OTPLESS SDK:

```swift theme={null}
extension YourViewController: OtplessDelegate {
    func onResponse(response: [String : Any]?) {
        if let response = response {
            print(response)
            if let token = response["token"] as? String {
                // Send this token to your backend service to validate otplessUser details received in the callback with OTPless backend service
            }
        }
    }
}
```

<CardGroup cols={2}>
  <Card title="Configure Auth Method" icon="key" iconType="duotone" href="https://otpless.com/dashboard/customer/channels">
    Select from a wide array of auth methods, including SMS, WhatsApp, Email,
    Google, and many more
  </Card>

  <Card title="Configure UI" icon="palette" iconType="duotone" href="https://otpless.com/dashboard/customer/customization">
    Customize logos, headings, color schemes, and more to match your brand
    identity and improve UX.
  </Card>
</CardGroup>

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

<SampleGithubContainer platform="ios" />
