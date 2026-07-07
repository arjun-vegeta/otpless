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

<AndroidRequirements />

## Step 1: Add SDK Dependency

To get started, incorporate the OTPLESS SDK into your project. Update your app's `build.gradle` file by adding the following dependency:

```groovy build.gradle theme={null}
implementation 'io.github.otpless-tech:otpless-android-sdk:2.6.3'
```

<Note>
  Make sure to `synchronize` your Gradle project to fetch the dependency.
</Note>

## Step 2: Configure AndroidManifest.xml

Modify your `AndroidManifest.xml` to include an intent filter within the activity responsible for sign-up or sign-in. This setup is crucial for handling deep links.

```xml AndroidManifest.xml theme={null}
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:host="otpless" android:scheme="otpless.your_app_id_in_lowercase" />
</intent-filter>
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

Additionally, ensure your activity is set to `singleTop` launch mode and `exported` attribute is true:

```xml AndroidManifest.xml theme={null}
android:launchMode="singleTop"
android:exported="true"
```

## Step 3: Configure Your Signup/Sign In Activity

<Tabs>
  <Tab title="Java">
    First, import necessary classes from the OTPLESS SDK:

    ```java theme={null}
    import com.otpless.dto.OtplessResponse;
    import com.otpless.main.OtplessManager;
    import com.otpless.main.OtplessView;
    ```

    Declare an `OtplessView` instance:

    ```java theme={null}
    OtplessView otplessView;
    ```

    Within your `onCreate()` method, initialize and set up the OTPLESS Sign in:

    ```java theme={null}
    // Initialise OtplessView
    otplessView = OtplessManager.getInstance().getOtplessView(this);
    OtplessRequest request = new OtplessRequest("YOUR_APP_ID");
    otplessView.setCallback(request, this::onOtplessCallback);
    otplessView.showOtplessLoginPage(request, this::onOtplessCallback);
    ```

  </Tab>

  <Tab title="Kotlin">
    First, import necessary classes from the OTPLESS SDK:

    ```Kotlin theme={null}
    import com.otpless.dto.OtplessResponse
    import com.otpless.main.OtplessManager
    import com.otpless.main.OtplessView
    ```

    Declare an `OtplessView` instance:

    ```Kotlin theme={null}
    private lateinit var otplessView: OtplessView
    ```

    Within your `onCreate()` method, initialize and set up the OTPLESS Sign in:

    ```Kotlin theme={null}
    // Initialise OtplessView
    otplessView = OtplessManager.getInstance().getOtplessView(this)
    val request = OtplessRequest("YOUR_APP_ID")
    otplessView.setCallback(request, this::onOtplessCallback)
    otplessView.showOtplessLoginPage(request, this::onOtplessCallback)
    ```

  </Tab>
</Tabs>

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

## Step 4: Handle Callback

Implement a callback method to handle the response from the OTPLESS SDK:

<Tabs>
  <Tab title="Java">
    ```java theme={null}
    private void onOtplessCallback(OtplessResponse response) {
    if (response.getErrorMessage() != null) {
        // Handle error
    } else {
        final String token = response.getData().optString("token");
        // Proceed with token verification
        Log.d("Otpless", "Token: " + token);
    }
    }

    ```

    **Override `onNewIntent()`**

    Ensure you override the `onNewIntent()` method to correctly handle intent verification:

    ```java theme={null}
    if (otplessView != null) {
        otplessView.onNewIntent(intent);
    }
    ```

  </Tab>

  <Tab title="Kotlin">
    ```Kotlin theme={null}
    private fun onOtplessCallback(response: OtplessResponse) {
    if (response.errorMessage != null) {
    // todo error handing
    } else {
    val token = response.data.optString("token")
    // todo token verification with api
    Log.d("Otpless", "token: $token")
    }
    }
    ```

    **Override `onNewIntent()`**

    Ensure you override the `onNewIntent()` method to correctly handle intent verification:

    ```Kotlin theme={null}
    if (otplessView != null) {
        otplessView.onNewIntent(intent)
    }
    ```

  </Tab>
</Tabs>

## Step 5: Handle Back Press

Override the `onBackPressed()` method to manage back press actions properly:

<Tabs>
  <Tab title="Java">
    ```java theme={null}
    // make sure you call this code before super.onBackPressed();
    if (otplessView.onBackPressed()) return;
    ```
  </Tab>

  <Tab title="Kotlin">
    ```Kotlin theme={null}
    // make sure you call this code before super.onBackPressed();
    if (otplessView.onBackPressed()) return
    ```
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

<SampleGithubContainer platform="android" />
