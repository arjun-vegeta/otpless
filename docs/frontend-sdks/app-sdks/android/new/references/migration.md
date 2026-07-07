> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Migration Guide

> Guide to migrate from Legacy Headless SDK to New Headless SDK

## Overview

This guide will help you migrate from the legacy OTPLESS Headless SDK to the new version. The new SDK offers improved performance, reliability, and security features.

## Key Changes

1. **Package Name Change**
   - Legacy: `io.github.otpless-tech:otpless-android-sdk`
   - New: `io.github.otpless-tech:otpless-headless-sdk`

2. **Minimum Requirements**
   - compileSdk 35
   - minSdk 21 (Android 5.0)
   - Kotlin 1.9.0+
   - Gradle 8.3.1+

## Migration Steps

### 1. Update Dependencies

<Note>
  Please check the latest version of the SDK [here](https://central.sonatype.com/artifact/io.github.otpless-tech/otpless-headless-sdk).
</Note>

```diff theme={null}
- implementation 'io.github.otpless-tech:otpless-android-sdk:2.6.3'
+ implementation 'io.github.otpless-tech:otpless-headless-sdk:latest_version'
```

### 2. Update Import Statements

```diff theme={null}
- import com.otpless.main.OtplessManager
- import com.otpless.main.OtplessView
+ import com.otpless.v2.android.sdk.main.OtplessSDK
```

### 3. Update Initialization

```diff theme={null}
- val otplessView = OtplessManager.getInstance().getOtplessView(this)
- otplessView.initHeadless("YOUR_APP_ID")
- otplessView.setHeadlessCallback(this::onHeadlessCallback)
+ OtplessSDK.initialize(appId = "YOUR_APP_ID", activity = activity)
+ OtplessSDK.setResponseCallback(this::onOtplessResponse)
```

### 4. Update URL Handling

#### In Activity:

```diff theme={null}
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
-   otplessView?.onNewIntent(intent)
+   lifecycleScope.launch {
+       OtplessSDK.onNewIntent(intent)
+   }
}

- override fun onBackPressed() {
-     if (otplessView?.onBackPressed() == true) return
-     super.onBackPressed()
- }
```

### 5. Update Request Objects

```diff theme={null}
- val request = HeadlessRequest()
+ val request = OtplessRequest()

// For Phone Auth
- request.setPhoneNumber("91", "9899038845")
+ request.setPhoneNumber(number = "9899038845", countryCode = "91")

// For Email Auth
- request.setEmail("user@example.com")
+ request.setEmail("user@example.com")

// For OAuth
- request.setChannelType(HeadlessChannelType.WHATSAPP)
+ request.setChannelType(OtplessChannelType.WHATSAPP)
```

### 6. Update Authentication Calls

```diff theme={null}
- otplessView.startHeadless(request, this::onHeadlessCallback)
+ lifecycleScope.launch {
+     OtplessSDK.start(request = request, callback = ::onOtplessResponse)
+ }
```

### 7. Update Response Handling

The callback handling has been significantly improved in the new SDK. Here's how to migrate your callback implementation (For more information find [new sdk documentation](https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless)):

```diff theme={null}
- private fun onHeadlessCallback(response: HeadlessResponse) {
-     when (response.getResponseType()) {
-         "INITIATE" -> {
-             // Handle initiation
-         }
-         "VERIFY" -> {
-             // Handle verification
-         }
-         "ONETAP" -> {
-             val token = response.getResponse().optString("token")
-         }
-     }
- }

+ private fun onOtplessResponse(response: OtplessResponse) {
+     OtplessSDK.commit(response)
+     when (response.responseType) {
+         ResponseTypes.SDK_READY -> {
+             // SDK has been initialized successfully
+             // You can enable your continue button or proceed with user authentication
+         }
+
+         ResponseTypes.FAILED -> {
+             if (response.statusCode == 5003) {
+                 // SDK initialization failed, try to initialize again
+             }
+         }
+
+         ResponseTypes.INITIATE -> {
+             if (response.statusCode != 200) {
+                 handleInitiateError(response)
+             } else {
+                 val authType = response.response?.optString("authType")
+                 when (authType) {
+                     "OTP" -> {
+                         // Navigate to OTP verification screen
+                     }
+                     "SILENT_AUTH" -> {
+                         // Show loading status for Silent Authentication
+                     }
+                 }
+             }
+         }
+
+         ResponseTypes.OTP_AUTO_READ -> {
+             val otp = response.response?.optString("otp")
+             if (!otp.isNullOrBlank()) {
+                 // Autofill the OTP in your input field
+             }
+         }
+
+         ResponseTypes.VERIFY -> {
+             if (response.response?.optString("authType") == "SILENT_AUTH") {
+                 if (response.statusCode == 9106) {
+                     // Silent Authentication and all fallback methods failed
+                     // Handle graceful exit from authentication flow
+                 } else {
+                     // Silent Authentication failed
+                     // If SmartAuth is enabled, INITIATE response will include next available auth method
+                 }
+             } else {
+                 handleVerifyError(response)
+             }
+         }
+
+         ResponseTypes.DELIVERY_STATUS -> {
+             val authType = response.response?.optString("authType")
+             val deliveryChannel = response.response?.optString("deliveryChannel")
+             // Update UI based on delivery channel (SMS, WhatsApp, etc.)
+         }
+
+         ResponseTypes.FALLBACK_TRIGGERED -> {
+             val newDeliveryChannel = response.response?.optString("deliveryChannel")
+             // Update UI to show new delivery channel
+         }
+
+         ResponseTypes.ONETAP -> {
+             val data = response.response?.optJSONObject("data")
+             val token = data?.optString("token")
+             if (!token.isNullOrBlank()) {
+                 // Process authentication token
+                 // Send to your backend for validation
+             }
+         }
+     }
+ }
```

#### Key Differences in Response Handling:

1. **Error Handling**
   - Legacy SDK: Basic error message extraction
   - New SDK: Comprehensive error handling with specific error codes and messages

2. **Silent Authentication**
   The new SDK adds support for Silent Authentication (SNA) with proper fallback handling:

   ```kotlin theme={null}
   if (response.response?.optString("authType") == "SILENT_AUTH") {
       if (response.statusCode == 9106) {
           // All authentication methods failed
       } else {
           // Fallback to next authentication method
       }
   }
   ```

3. **Delivery Status**
   The new SDK provides detailed delivery status information:
   ```kotlin theme={null}
   ResponseTypes.DELIVERY_STATUS -> {
       val authType = response.response?.optString("authType")
       val deliveryChannel = response.response?.optString("deliveryChannel")
   }
   ```

## Key Benefits of Migration

1. **Improved Performance**: The new SDK is significantly faster and more efficient.
2. **Better Error Handling**: More detailed error responses and improved error handling.
3. **Modern Kotlin Features**: Utilizes Kotlin Coroutines for better concurrency.
4. **Improved Type Safety**: Better type safety with enhanced Kotlin type system usage.

## Need Help?

If you encounter any issues during migration, please reach out to our support team or refer to our [documentation](https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro).
