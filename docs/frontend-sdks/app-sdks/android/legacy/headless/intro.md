> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Welcome to the OTPLESS Headless SDK documentation! This guide will walk you through the steps to integrate our SDK into your Android project, providing you with the flexibility to create custom UI elements for your authentication flows.

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

<Tip>
  We have launched a new SDK for Headless integration. Please consider migrating from the current SDK to the new SDK for more seamless integration and robust performance. Checkout the [new SDK here](/frontend-sdks/app-sdks/android/new/headless/intro). This SDK (legacy) will be deprecated and archived soon, we suggest migrating to the new SDK at the earliest.
</Tip>

## Step 1: Add SDK Dependency

First, let's add the OTPLESS SDK to your project. Update your app's `build.gradle` file by adding the following dependency:

```groovy theme={null}
implementation 'io.github.otpless-tech:otpless-android-sdk:2.6.6'
```

<Note>
  Make sure to **synchronize** your Gradle project to fetch the dependency.
</Note>

## Step 2: Configure AndroidManifest.xml

Next, we'll configure your AndroidManifest.xml to handle deep links. This setup is crucial for managing the authentication flow via Link.

Add the following intent filter within the activity responsible for sign-up or sign-in:

```xml theme={null}
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

Additionally, ensure your activity is set to `singleTop` launch mode and that the `exported` attribute is true:

```xml theme={null}
android:launchMode="singleTop"
android:exported="true"
```

## Step 3: Configure Your Signup/Sign In Activity

Great! Now let's configure your activity for sign-up or sign-in. Below are the steps for both Java and Kotlin.

<Tabs>
  <Tab title="Java">
    First, import the necessary classes from the OTPLESS SDK:

    ```java theme={null}
    import com.otpless.main.OtplessManager;
    import com.otpless.main.OtplessView;
    import com.otpless.dto.HeadlessRequest;
    import com.otpless.dto.HeadlessResponse;
    import com.otpless.dto.HeadlessChannelType;
    ```

    Declare an `OtplessView` instance:

    ```java theme={null}
    OtplessView otplessView;
    ```

    Within your `onCreate()` method, initialize and set up the OTPLESS sign-in:

    ```java theme={null}
    // Initialize OtplessView
    otplessView = OtplessManager.getInstance().getOtplessView(this);
    otplessView.initHeadless("YOUR_APP_ID");
    otplessView.setHeadlessCallback(this::onHeadlessCallback);
    ```

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

    ## Step 4: Handle Callback

    Now, let's implement a callback method to handle the response from the OTPLESS SDK:

    ```java theme={null}
    private void onHeadlessCallback(@NonNull final HeadlessResponse response) {
        otplessView.commitHeadlessResponse(response);
        if (response.getStatusCode() == 200) {
            switch (response.getResponseType()) {
                case "INITIATE":
                    // notify that headless authentication has been initiated
                    break;
                case "VERIFY":
                    // notify that verification is completed
                    // and this is notified just before "ONETAP" final response
                    break;
                case "OTP_AUTO_READ":
                    final String otp = response.getResponse().optString("otp");
                    break;
                case "ONETAP":
                    // final response with token
                    final JSONObject responseWithToken = response.getResponse();
                    break;
                case "FALLBACK_TRIGGERED":
                    // In case of Smart Auth when channel fallback triggered
                    final JSONObject fallbackResponse = response.getResponse();
                    break;
            }
            JSONObject successResponse = response.getResponse();
        } else if (response.getStatusCode() == 5002) {
            // handle network connectivity error
        } else if (response.getStatusCode() == 5050) {
            // failed to add webview, terminal case go to your login
        } else {
          // handle error
          String error = response.getResponse().optString("errorMessage");
        }
    }
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

    **Override `onNewIntent()`**

    Ensure you override the `onNewIntent()` method to correctly handle intent verification:

    ```java theme={null}
    if (otplessView != null) {
      otplessView.onNewIntent(intent);
    }
    ```

    **Override `onBackPressed()`**

    Override the `onBackPressed()` method to manage back press actions properly:

    ```java theme={null}
    // Make sure you call this code before super.onBackPressed();
    if (otplessView.onBackPressed()) return;
    ```

  </Tab>

  <Tab title="Kotlin">
    First, import the necessary classes from the OTPLESS SDK:

    ```kotlin theme={null}
    import com.otpless.main.OtplessManager
    import com.otpless.main.OtplessView
    import com.otpless.dto.HeadlessRequest
    import com.otpless.dto.HeadlessResponse
    import com.otpless.dto.HeadlessChannelType
    ```

    Declare an `OtplessView` instance:

    ```kotlin theme={null}
    private lateinit var otplessView: OtplessView
    ```

    Within your `onCreate()` method, initialize and set up the OTPLESS sign-in:

    ```kotlin theme={null}
    // Initialize OtplessView
    otplessView = OtplessManager.getInstance().getOtplessView(this)
    otplessView.initHeadless("YOUR_APP_ID")
    otplessView.setHeadlessCallback(this::onHeadlessCallback)
    ```

    <Tip>
      Replace `YOUR_APP_ID` with [your actual App
      ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
      your OTPLESS dashboard.
    </Tip>

    ## Step 4: Handle Callback

    Now, let's implement a callback method to handle the response from the OTPLESS SDK:

    ```kotlin theme={null}
    private fun onHeadlessCallback(response: HeadlessResponse) {
        otplessView.commitHeadlessResponse(response)
        if (response.getStatusCode() == 200) {
            when (response.getResponseType()) {
                "INITIATE" -> {
                    // notify that headless authentication has been initiated
                }
                "VERIFY" -> {
                    // notify that verification is completed
                    // and this is notified just before "ONETAP" final response
                }
                "OTP_AUTO_READ" -> {
                    val otp = response.getResponse().optString("otp")
                }
                "ONETAP" -> {
                    // final response with token
                    val responseWithToken = response.getResponse()
                }
                "FALLBACK_TRIGGERED" -> {
                 // In case of Smart Authentication when channel fallback triggered
                  val fallbackResponse = response.getResponse()
                }
            }
            val successResponse = response.getResponse()
        } else if (response.getStatusCode() == 5002) {
                // handle network connectivity error
        } else if (response.getStatusCode() == 5050) {
            // failed to add webview, terminal case go to your login
        } else {
            // handle error
            val error = response.getResponse().optString("errorMessage")
        }
    }
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

    **Override `onNewIntent()`**

    Ensure you override the `onNewIntent()` method to correctly handle intent verification:

    ```kotlin theme={null}
    if (otplessView != null) {
      otplessView.onNewIntent(intent)
    }
    ```

    **Override `onBackPressed()`**

    Override the `onBackPressed()` method to manage back press actions properly:

    ```kotlin theme={null}
    // Make sure you call this code before super.onBackPressed();
    if (otplessView.onBackPressed()) return
    ```

  </Tab>
</Tabs>

## Step 5: Initiate Authentication

Well done! You have completed the foundational setup of the SDK. Now, let’s move to the next step and understand how to initiate and verify different authentication modes.

**Choose the authentication mode you want to integrate from the options below:**

<CardGroup cols={3}>
  <Card title="OTP" icon="comment-dots" iconType="duotone" href="https://otpless.com/docs/frontend-sdks/app-sdks/android/legacy/headless/otp">
    Send a One-Time Password (OTP) via SMS, WhatsApp, or Email for secure user verification.
  </Card>

  <Card title="Magic Link" icon="link" iconType="duotone" href="https://otpless.com/docs/frontend-sdks/app-sdks/android/legacy/headless/magiclink">
    Provide a seamless login experience by sending an authentication link through SMS, WhatsApp, or Email.
  </Card>

  <Card title="Social Auth" icon="user-shield" iconType="duotone" href="https://otpless.com/docs/frontend-sdks/app-sdks/android/legacy/headless/oauth">
    Authenticate users through popular social applications like WhatsApp, Google, Apple, and GitHub.
  </Card>
</CardGroup>
