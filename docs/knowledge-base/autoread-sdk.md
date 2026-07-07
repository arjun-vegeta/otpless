> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Auto Read SDK

> The **OTPLESS AutoRead SDK** simplifies the process of automatically reading OTPs from **SMS, WhatsApp ZeroTap or WhatsApp OneTap**, enhancing the user experience in your Android applications.

## Prerequisites

If you are already using **OTPLESS SDK** for authentication, then you don't need to use **AutoRead SDK** because OTPLESS SDK auto reads the OTP itself. **AutoRead SDK** is to be used by merchants using **OTPLESS APIs** or some other vendor for authentication.

### WhatsApp OTP AutoRead

1. Get the **OTP message template** whitelisted by [OTPLESS Support Team](https://otpless.com/support) for OTPs that the users will receive on WhatsApp.
2. Make sure the **app hash** that is whitelisted by OTPLESS matches your **app hash** at application runtime. If the **app hash** is different from the whitelisted **app hash**, WhatsApp OTP AutoRead won't work. You can follow **[this guide](https://developers.google.com/identity/sms-retriever/verify#computing_your_apps_hash_string)** to generate your **app hash**.

### SMS OTP AutoRead

1. Make sure that the SMS template contains your **app hash**. You can follow **[this guide](https://developers.google.com/identity/sms-retriever/verify#computing_your_apps_hash_string)** to generate your **app hash**.

## Dependency

Add the following dependency to your `build.gradle` file:

<CodeGroup>
  ```gradle build.gradle theme={null}
  dependencies {
      implementation("io.github.otpless-tech:otpless-autoread-sdk:0.1.4")
  }
  ```
</CodeGroup>

### How Auto Read Works

Auto Read uses a broadcast service to detect and capture OTPs. To enable this feature, you need to whitelist the OTP template with your App Hash and Package Name with WhatsApp/Meta or pass the app hash in SMS Template.

### How to Whitelist the Template

<Steps>
  <Step title="Generate the App Hash">
    Use the OTPless utility function to get the App Hash.

    **import the following class**

    ```kotlin Kotlin theme={null}
    import com.otpless.autoread.main.AutoReadSDK
    ```

    **To get the application signature in base64 **return** `String`** and take **first 11** characters

    ```kotlin Kotlin theme={null}
    val appSignature = AutoReadSDK.getAppSignature(context).take(11)
    ```

  </Step>

  <Step title="Send Details for Whitelisting">
    Send the following details to [support@otpless.com](mailto:support@otpless.com) from your registered email ID:

    * App Hash
    * Package Name
    * App ID

  </Step>
</Steps>

## Usage

To enable OTP AutoRead, use the following methods based on the type of OTP you want to auto-read:

### SMS OTP AutoRead

Register for auto-reading OTPs from SMS by calling the `registerSmsOtpReceiver` method:

<CodeGroup>
  ```kotlin kotlin theme={null}
  AutoReadSDK.registerSmsOtpReceiver(context) { otpAutoReadResult ->
      if (otpAutoReadResult.otp != null) {
          Log.d(TAG, otpAutoReadResult.otp)
      } else {
          // Handle error
          val errorMessage = otpAutoReadResult.errorMessage
      }
      // Unregister register once SMS is received
      AutoReadSDK.unregisterSmsOtpReceiver()
  }
  ```
</CodeGroup>

### WhatsApp ZeroTap OTP AutoRead

- **WhatsApp ZeroTap OTP AutoRead** works for devices with Android API level 24 (Nougat) and above.
  Register for auto-reading OTPs from WhatsApp by calling the `registerWhatsAppZeroTap` method:

<CodeGroup>
  ```kotlin kotlin theme={null}
  AutoReadSDK.registerWhatsAppZeroTap(context) { otpAutoReadResult ->
      if (otpAutoReadResult.otp != null) {
          Log.d(TAG, otpAutoReadResult.otp)
      } else {
          // Handle error
          val errorMessage = otpAutoReadResult.errorMessage
      }
  }
  ```
</CodeGroup>

### WhatsApp OneTap OTP AutoRead

- **WhatsApp OneTap OTP AutoRead** works for devices with Android API level 24 (Nougat) and above.
  Register for auto-reading OTPs from WhatsApp by calling the `registerWhatsAppOneTap` method:

<CodeGroup>
  ```kotlin kotlin theme={null}
  AutoReadSDK.registerWhatsAppOneTap(context) { otpAutoReadResult ->
      if (otpAutoReadResult.otp != null) {
          Log.d(TAG, otpAutoReadResult.otp)
      } else {
          // Handle error
          val errorMessage = otpAutoReadResult.errorMessage
      }
  }
  ```
</CodeGroup>

Additionally, ensure your activity is set to `singleTop` launch mode and `exported` attribute is true:

<CodeGroup>
  ```xml AndroidManifest.xml theme={null}
  android:launchMode="singleTop"
  android:exported="true"
  ```
</CodeGroup>

Override the `onNewIntent` function to receive intent from WhatsApp for OneTap OTP AutoRead.

<CodeGroup>
  ```kotlin kotlin theme={null}
   override fun onNewIntent(intent: Intent) {
      super.onNewIntent(intent)
      if (AutoReadSDK.onNewIntent(intent)) return
  }
  ```
</CodeGroup>

If you are using both **SMS and WhatsApp OTP AutoRead methods**, then unregister the SMS OTP receiver as well if OTP is fetched via WhatsApp.
