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

Install the OTPLESS SDK dependency by running the following command in your terminal at the root of your Ionic project:

```bash theme={null}
npm install otpless-ionic
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
          android:scheme= "otpless.{{YOUR_APP_ID}}"/>
    </intent-filter>
    ```

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

    2. Change your activity launchMode to singleTop and exported true for your Main Activity:

    ```xml theme={null}
    android:launchMode="singleTop"
    android:exported="true"
    ```

    3. Add the following override method in `android/app/src/main/java/MainActivity.java` to handle callback:

    * Import the following classes:

    ```java theme={null}
    import com.otpless.ionic.OtplessPlugin;
    import android.os.Bundle;

    ```

    * Add this code to your `onCreate()` method in your main activity:

    ```java theme={null}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	registerPlugin(OtplessPlugin.class);
    	super.onCreate(savedInstanceState);
    }
    ```

    * Add this code to your `onBackPressed()` method in your main activity:

    ```java theme={null}
    @Override
    public void onBackPressed() {
    	if (OtplessPlugin.onBackPressed(this)) return;
    	super.onBackPressed();
    }
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

    2. Import the OTPLESS SDK in your respective `AppDelegate.swift` file to handle redirection.

    ```swift AppDelegate.swift theme={null}
    import OtplessSDK

    override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    if Otpless.sharedInstance.isOtplessDeeplink(url: url){
    Otpless.sharedInstance.processOtplessDeeplink(url: url)
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

```js login_page.js theme={null}
import { OtplessManager } from 'otpless-ionic';
```

2. Add OTPLESS instance and declare the variable with `YOUR_APP_ID`

```js login_page.js theme={null}
let manager = new OtplessManager();
let extras = {
  method: 'get',
  params: {
    appId: '{{YOUR_APP_ID}}',
  },
};
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

3. Add the following code to Initiate OTPLESS Login Page

```js login_page.js theme={null}
manager.showFabButton(false);
const data = await manager.showOtplessLoginPage(extras);

let message: string = "";
if (data.data === null || data.data === undefined) {
  message = data.errorMessage;
} else {
  message = "token: ${data.data.token}";
  // todo here
}
```

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

<SampleGithubContainer platform="ionic" />
