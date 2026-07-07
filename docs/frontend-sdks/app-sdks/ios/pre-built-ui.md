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

# Overview

OTPless SDK accepts the user's identity (phone number or email), authenticates through multiple channels, and returns a secure token upon success.The merchant app sends this token to its backend, which verifies it with the OTPless Server before proceeding with the user journey.

<img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/loginpage_overview.png?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=372809af0e7255bf7b62373faaa5d9d6" style={{ height: '400px', width: '2000px', pointerEvents: 'none' }} alt="SDK Overview Chart" width="3840" height="2080" data-path="images/loginpage_overview.png" />

# Integration Steps

## Step 1: SDK Installation

SDK can be installed via both Cocoapods and Swift Package Manager.

<Note>
  Please find the latest version of the SDK [here](https://github.com/otpless-tech/iOS-LP/releases).
</Note>

### Cocoapods

- Open your app's project file `.xcodeproj`.
- Add the following line into the dependencies section of your project's `Podfile`:

```ruby theme={null}
pod 'OtplessSwiftLP', 'latest_version'
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
2. In the dialog that appears, enter the repository URL: [https://github.com/otpless-tech/iOS-LP](https://github.com/otpless-tech/iOS-LP).
3. Select the dependency rule as `exact version` and use the **latest version**.

## Step 2: Setup SDK in your App

Add the following keys in your `info.plist` file:

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

Import the SDK at the top of your `ViewController.swift`:

```swift theme={null}
import OtplessSwiftLP
```

---

## Step 3: Implement the ConnectResponseDelegate

Your `ViewController` should conform to `ConnectResponseDelegate`:

```swift LoginViewController.swift theme={null}
func onConnectResponse(_ response: [String: Any]) {
    if let error = response["error"] as? String {
        print("Error: \(error)")
    } else if token = response["token"] as? String {
        print("Token: \(token)")
        // Send this token to your server to validate and get user details.
    } else {
        // Unknown error occurred
        print("Unknown response: \(response)")
    }
}
```

---

## Step 4: Initialize the SDK, Set Delegate and Start

Set the response delegate and optionally enable socket logging:

```swift LoginViewController.swift theme={null}
override func viewDidLoad() {
    super.viewDidLoad()

    OtplessSwiftLP.shared.setResponseDelegate(self)

    // Initialize SDK
    OtplessSwiftLP.shared.initialize(appId: "YOUR_APP_ID", secret: "YOUR_SECRET")
}
```

To start the authentication process, use:

```swift LoginViewController.swift theme={null}
func start() {
  OtplessSwiftLP.shared.start(vc: self)
}
```

---

## Step 5: Stop the process

When your login page is closed or login is successful, stop the Otpless' authentication process:

```swift LoginViewController.swift theme={null}
OtplessSwiftLP.shared.cease()
```

<Note>
  **Make sure that `initialize()` is called again if you call `cease()`.**
</Note>

---

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

<bottomcommon />

<SampleGithubContainer platform="ios" />
