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
   - Legacy: `OtplessSDK/Core`
   - New: `OtplessBM/Core`

2. **Minimum Requirements**
   - iOS 13.0+
   - Xcode 12.0+
   - Swift 5.5+

## Migration Steps

### 1. Update Dependencies

<Note>
  Please find the latest version of the SDK [here](https://github.com/otpless-tech/otpless-headless-iOS-sdk/releases).
</Note>

#### For Cocoapods:

```diff theme={null}
- pod 'OtplessSDK/Core', '2.2.8'
+ pod 'OtplessBM/Core', 'latest_version'
```

#### For Swift Package Manager:

```diff theme={null}
- URL: https://github.com/otpless-tech/Otpless-iOS-SDK.git
+ URL: https://github.com/otpless-tech/otpless-headless-iOS-sdk.git
```

### 2. Update Import Statement

```diff theme={null}
- import OtplessSDK
+ import OtplessBM
```

### 3. Update Initialization

```diff theme={null}
- Otpless.sharedInstance.initialise(vc: self, appId: "YOUR_APP_ID")
- Otpless.sharedInstance.setHeadlessResponseDelegate(self)
+ Otpless.shared.initialise(withAppId: "YOUR_APP_ID", vc: self)
+ Otpless.shared.setResponseDelegate(self)
```

### 4. Update URL Handling

#### In AppDelegate:

```diff theme={null}
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
-   if Otpless.sharedInstance.isOtplessDeeplink(url: url){
-     Otpless.sharedInstance.processOtplessDeeplink(url: url)
+   if Otpless.shared.isOtplessDeeplink(url: url.url) {
+     Task(priority: .userInitiated) {
+         await Otpless.shared.handleDeeplink(url.url)
+     }
    }
    return true
}
```

#### In SceneDelegate:

```diff theme={null}
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    for context in URLContexts {
-     if Otpless.sharedInstance.isOtplessDeeplink(url: context.url.absoluteURL) {
-       Otpless.sharedInstance.processOtplessDeeplink(url: context.url.absoluteURL)
+     if Otpless.shared.isOtplessDeeplink(url: url.url) {
+       Task(priority: .userInitiated) {
+           await Otpless.shared.handleDeeplink(url.url)
+       }
      break
      }
    }
}
```

### 5. Update Request Objects

```diff theme={null}
- let headlessRequest = HeadlessRequest()
+ let request = OtplessRequest()

// For Phone Auth
- headlessRequest.setPhoneNumber(number: "9899XXXXXX", withCountryCode: "+91")
+ request.set(phoneNumber: "9899XXXXXX", withCountryCode: "+91")

// For Email Auth
- headlessRequest.setEmail("loremipsum@otpless.com")
+ request.set(email: "loremipsum@otpless.com")

// For OAuth
- headlessRequest.setChannelType(HeadlessChannelType.sharedInstance.WHATSAPP)
+ request.set(channelType: .WHATSAPP)
```

### 6. Update Authentication Calls

```diff theme={null}
- Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
+ Task(priority: .userInitiated) {
+     await Otpless.shared.start(withRequest: request)
+ }
```

### 7. Update Response Handling

The callback handling has been significantly improved in the new SDK. Here's how to migrate your callback implementation (For more information find [new sdk documentation](https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless)):

```diff theme={null}
- func onHeadlessResponse(response: OtplessSDK.HeadlessResponse?) {
-     // Push the response received back to Otpless.
-     Otpless.sharedInstance.commitHeadlessResponse(headlessResponse: response)
-
-     // Proceed with response handling
-     if response?.statusCode == 200 {
-         let successResponse = response?.responseData
-     }
-     else {
-         let error = (response?.responseData)?["errorMessage"] as? String
-     }
- }

+ func onResponse(_ response: OtplessBM.OtplessResponse) {
+     Otpless.shared.commitOtplessResponse(response)
+
+     switch response.responseType {
+     case .SDK_READY:
+         // Notify that SDK has been initialized successfully
+         print("SDK has been initialized successfully, you may enable your continue button or proceed with user authentication.")
+     case .FAILED:
+         // Notify that the initialization has failed
+         if response.statusCode == 5003 {
+             print("SDK initialization failed, please try to initialize the SDK again")
+         }
+     case .INITIATE:
+         // Notify that authentication has been initiated
+         if response.statusCode == 200 {
+             print("Authentication initiated")
+             let authType = response.response?["authType"] as? String
+             if authType == "OTP" {
+                 // Take user to OTP verification screen
+             } else if authType == "SILENT_AUTH" {
+                 // Handle Silent Authentication initiation by showing loading status for SNA flow
+             }
+         }
+
+     case .VERIFY:
+         if response.response?["authType"] as? String == "SILENT_AUTH" {
+             if response.statusCode == 9106 {
+                 // Silent Authentication and all fallback authentication methods in SmartAuth have failed
+                 // The transaction cannot proceed further
+                 // Handle the scenario to gracefully exit the authentication flow
+             } else {
+                 // Silent Authentication failed. If SmartAuth is enabled,
+                 // the INITIATE response will include the next available authentication
+                 // method configured in the dashboard
+             }
+         }
+
+     case .FALLBACK_TRIGGERED:
+         // A fallback occurs when an OTP delivery attempt on one channel fails,
+         // and the system automatically retries via the subsequent channel selected on Otpless Dashboard
+         let newDeliveryChannel = response.response?["deliveryChannel"] as? String
+         print("Fallback authentication triggered")
+
+     case .DELIVERY_STATUS:
+         // This function is called when delivery is successful for your authType
+         let authType = response.response?["authType"] as? String
+         let deliveryChannel = response.response?["deliveryChannel"] as? String
+
+     case .ONETAP:
+         if response.statusCode == 200 {
+             if let data = response.response?["data"] as? [String: Any],
+                let token = data["token"] as? String {
+                 // Process token and proceed to verify the token on your backend
+                 print("Received token: \(token)")
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

   ```swift theme={null}
   case .VERIFY:
       if response.response?["authType"] as? String == "SILENT_AUTH" {
           if response.statusCode == 9106 {
               // All authentication methods failed
           } else {
               // Fallback to next authentication method
           }
       }
   ```

3. **Delivery Status**
   The new SDK provides detailed delivery status information:
   ```swift theme={null}
   case .DELIVERY_STATUS:
       let authType = response.response?["authType"] as? String
       let deliveryChannel = response.response?["deliveryChannel"] as? String
   ```

### 8. Task Management

Add a task property to manage ongoing authentication requests:

```swift theme={null}
var otplessTask: Task<Void, Never>?
```

Cancel ongoing tasks before starting new ones:

**Note: Only cancel in the case of phone number request only, not for verify otp request**

```swift theme={null}
otplessTask?.cancel()
otplessTask = Task(priority: .userInitiated) {
    await Otpless.shared.start(withRequest: request)
}
```

**in Case verify otp request**

```swift theme={null}
let request = OtplessRequest()
request.set(phoneNumber: "9899XXXXXX", withCountryCode: "COUNTRY_CODE")
request.set(otp: otp)
Task(priority: .userInitiated) {
    await Otpless.shared.start(withRequest: request)
}
}
```

## Key Benefits of Migration

1. **Improved Performance**: The new SDK is significantly faster and more efficient.
2. **Better Error Handling**: More detailed error responses and improved error handling.
3. **Modern Swift Features**: Utilizes modern Swift features like async/await for better concurrency.
4. **Improved Type Safety**: Better type safety with enhanced Swift type system usage.

## Need Help?

If you encounter any issues during migration, please reach out to our support team or refer to our [documentation](https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless).
