> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Welcome to the OTPLESS LoginPage SDK documentation. This sdk enables native and chrome custom tab connectivity for your application.

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

<div>
  <h3>Requirements</h3>

  <ul>
    <li>The compileSdk version should be <strong>35</strong>.</li>
    <li>The minimum SDK version supported by the SDK is <strong>21</strong>.</li>
  </ul>
</div>

# Overview

OTPless SDK accepts the user's identity (phone number or email), authenticates through multiple channels, and returns a secure token upon success.The merchant app sends this token to its backend, which verifies it with the OTPless Server before proceeding with the user journey.

<img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/loginpage_overview.png?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=372809af0e7255bf7b62373faaa5d9d6" style={{ height: '400px', width: '2000px', pointerEvents: 'none' }} alt="SDK Overview Chart" width="3840" height="2080" data-path="images/loginpage_overview.png" />

# Integration Steps

## Step 1: Add SDK Dependency

Add the following dependency in your app's `build.gradle`.

```groovy theme={null}
  implementation ("io.github.otpless-tech:otpless-loginpage-android:1.1.1")
```

<>
{/* <Note>
Please check the latest version of the [otpless-loginpage-android](https://central.sonatype.com/artifact/io.github.otpless-tech/otpless-loginpage-android/versions).
</Note> */}
</>

## Step 2: Update AndroidManifest.xml

Add this intent filter to your LoginActivity in `AndroidManifest.xml`:

```xml theme={null}
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.BROWSABLE" />
    <category android:name="android.intent.category.DEFAULT" />
    <data
        android:scheme="otpless.your_appid_in_lowercase"
        android:host="otpless" />
</intent-filter>
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

> 🔍 Example: If your App ID is "AcmeApp123", scheme becomes `otpless.acmeapp123`

Additionally, ensure your activity is set to `singleTop` launch mode and that the `exported` attribute is true:

```xml theme={null}
android:launchMode="singleTop"
android:exported="true"
```

## Silent Network Authentication (SNA) Setup

- Make sure that **Silent Network Authentication** is enabled on the [OTPLESS dashboard](https://otpless.com/dashboard/customer/channels).
- Once you have **successfully integrated OTPLESS** Android SDK in your application, you only have to add the following line in your app's `AndroidManifest` file in the `<application>` tag:

<SNAInfoWidget />

<CodeGroup>
  ```xml AndroidManifest theme={null}
  android:networkSecurityConfig="@xml/otpless_network_security_config"
  ```
</CodeGroup>

## Step 3: Configure your SignIn/SignUp Activity

Import the `OtplessController` class

```kotlin Kotlin theme={null}
import com.otpless.loginpage.main.OtplessController
```

Declare a `otplessController` member in your `SignIn/SignUpActivity`

```kotlin Kotlin theme={null}
private lateinit var otplessController: OtplessController
```

Assign the member in `onCreate` of your `SignIn/SignUpActivity`, initialize the otplessController and register the callback response method.
On initialization is success callback is given in callback method.

```kotlin Kotlin theme={null}
otplessController = OtplessController.getInstance(this)
otplessController.initializeOtpless(OTPLESS_APP_ID){
   // callback
}
otplessController.registerResultCallback(this::onAuthResponse)
```

Override your `SignIn/SignUpActivity` `onNewIntent` and forward the new `Intent` to `otplessController`.

```kotlin theme={null}
override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    otplessController.onNewIntent(this, intent)
}
```

## Step 4: Starting otpless

Call `startOtplessWithLoginPage` method from `otplessController` to start otpless login page.

<Tabs>
  <Tab title="Start">
    ```kotlin Kotlin theme={null}
    coroutineScope.launch {
        // Prepare query parameters map for login (optional)
        otplessController.startOtplessWithLoginPage()
    }
    // show progress screen
    ```
  </Tab>

  <Tab title="Start with Phone">
    ```kotlin Kotlin theme={null}
    coroutineScope.launch {
        val map = mutableMapOf<String, String>()
        val phone = phoneEt.text.toString()
        if (phone.isNotEmpty()) {
            map["phone"] = phone
            map["countryCode"] = "91"
        }
        val loginPageParams = LoginPageParams(extraQueryParams = map)
        otpless.startOtplessWithLoginPage(loginPageParams)
    }
    // show progress screen
    ```
  </Tab>

  <Tab title="Start with Email">
    ```kotlin Kotlin theme={null}
    coroutineScope.launch {
        val map = mutableMapOf<String, String>()
        val email = emailEt.text.toString()
          if (email.isNotEmpty()) {
              map["email"] = email
        }
        val loginPageParams = LoginPageParams(extraQueryParams = map)
        otpless.startOtplessWithLoginPage(loginPageParams)
    }
    // show progress screen
    ```
  </Tab>
</Tabs>

## Step 5: Handle auth response

Extract `token` from `authResponse` and validate `token` with backend apis.
[Backend documentation](https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data)

```kotlin Kotlin theme={null}
import com.otpless.loginpage.model.OtplessResult

private fun onAuthResponse(authResponse: OtplessResult) {
    when(authResponse) {
        is OtplessResult.Success -> {
            // handle success case
        }
        is OtplessResult.Error -> {
            when(authResponse.errorType) {
                ErrorType.INITIATE -> {
                    when(authResponse.errorCode) {
                        10_000 -> {
                            // handle user cancelled (User clicked on back button)
                        }
                        10_001 -> {
                            // handle user cancelled (User clicked on help button)
                        }
                        10_002 -> {
                            // handle user cancelled (User clicked on phone number change button)
                        }
                        7102 -> {
                            // handle invalid phone
                        }
                        7104 -> {
                            // handle invalid email
                        }
                        9120 -> {
                            // SDK not initialized
                        }
                        9125, 5050 -> {
                            // SDK Loading error
                        }

                    }
                }
                ErrorType.NETWORK -> {
                    // errorCode internet is not available 9103
                    when(authResponse.errorCode) {
                        9103 -> {
                            // handle internet error
                        }
                    }
                }
                ErrorType.VERIFY -> {
                    // handle custom error
                }
            }
        }
    }
}
```

## Step 6: Closing otpless

When your login page is closed or login is successful, close the `otplessController`.

```kotlin Kotlin theme={null}
otplessController.closeOtpless()
```

---

## Step 7: Tracking Multiple Events

You can observe all events using:

```kotlin theme={null}
OtplessEventManager.observerEvents { eventData: OtplessEventData ->
    // Handle eventData here
}
```

To track and handle specific event categories, use:

```kotlin theme={null}
OtplessEventManager.observerEvents { eventData: OtplessEventData ->
    when(eventData.category) {
        EventCategory.LOAD -> {
            // track url success loading action
        }
        EventCategory.CLICK -> {
            // track user action
        }
        EventCategory.ACTION -> {
            // track actions with metadata
        }
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

---

<SampleGithubContainer platform="android" />
