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
  We have launched a new SDK for Headless integration. Please consider migrating from the current SDK to the new SDK for more seamless integration and robust performance. Checkout the [new SDK here](/frontend-sdks/app-sdks/ios/new/headless/headless). This SDK (legacy) will be deprecated and archived soon, we suggest migrating to the new SDK at the earliest.
</Tip>

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

Add the following block to your `info.plist` file (Only required if
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

## Step 4: Initialize OTPLESS

Import OtplessSDK in your signup/sign in file.

```swift theme={null}
import OtplessSDK
```

Initialise OTPLESS in viewDidLoad() function before proceeding further.

```swift theme={null}
Otpless.sharedInstance.initialise(vc: self, appId: ("{YOUR_APP_ID}"))
Otpless.sharedInstance.setHeadlessResponseDelegate(self)
```

## Step 5: Handle Callback

Conform to `onHeadlessResponseDelegate` in your signup/sign in file to receive callbacks from OtplessSDK.

```swift theme={null}
func onHeadlessResponse(response: OtplessSDK.HeadlessResponse?) {
    // Push the response received back to Otpless.
  Otpless.sharedInstance.commitHeadlessResponse(headlessResponse: response)

  // Proceed with response handling
	if response?.statusCode == 200 {
		let successResponse = response?.responseData
	}
	else {
		let error = (response?.responseData)?["errorMessage"] as? String
	}
}
```

## Step 6: Initiate Authentication

Initiate the authentication process based on the user's selected method by using the `initiate` method of the SDK.

<Tabs>
  <Tab title="Phone Auth">
    <CodeGroup>
      ```swift Request theme={null}
      let headlessRequest = HeadlessRequest()
      headlessRequest.setPhoneNumber(number: "9899XXXXXX", withCountryCode: "+91")
      Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
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
      ```swift Request theme={null}
      let headlessRequest = HeadlessRequest()
      headlessRequest.setPhoneNumber(number: "9899XXXXXX", withCountryCode: "+91")
      headlessRequest.setOtp(otp: otp)
      Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
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

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

  </Tab>

  <Tab title="Email Auth">
    <CodeGroup>
      ```swift Request theme={null}
      let headlessRequest = HeadlessRequest()
      headlessRequest.setEmail("loremipsum@otpless.com")
      Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
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
      ```swift Request theme={null}
      let headlessRequest = HeadlessRequest()
      headlessRequest.setEmail("loremipsum@otpless.com")
      headlessRequest.setOtp(otp: otp)
      Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
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

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

  </Tab>

  <Tab title="OAUTH">
    <CodeGroup>
      ```swift Request theme={null}
      let headlessRequest = HeadlessRequest()
      headlessRequest.setChannelType(HeadlessChannelType.sharedInstance.WHATSAPP)
      Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
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

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

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

<SampleGithubContainer platform="ios" />
