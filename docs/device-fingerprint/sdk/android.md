> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Android

> Integrate Device Fingerprint SDK in your Android app.

<Info>
  The SDK requires a minimum API level of 26 (Android 8.0 Oreo). Calls on devices below API 26 return silently without an error.
</Info>

## Prerequisites

- Android API level 26 or higher
- App ID, Client ID, and Client Secret from the OTPless dashboard

## Installation

The SDK is distributed on Maven Central. In your app-level `build.gradle`, add the dependency:

```groovy build.gradle theme={null}
dependencies {
    implementation 'io.github.otpless-tech:otpless-intelligence-sdk:1.0.6.5'
}
```

Check [Maven Central](https://central.sonatype.com/artifact/io.github.otpless-tech/otpless-intelligence-sdk) for the latest version.

Sync your project with Gradle files after adding the dependency.

## Add permissions

In your `AndroidManifest.xml`, add the required and optional permissions:

```xml AndroidManifest.xml theme={null}
<uses-permission android:name="android.permission.INTERNET" />

<!-- Optional: improves accuracy -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Optional: used to calculate SIM affinity -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

## Initialize the SDK

Call `initialize` in the `onCreate()` method of your `Application` class. Pass your App ID, Client ID, and Client Secret as a map.

```kotlin Application.kt theme={null}
import com.otpless.impl.veritaserum.OtplessDeviceIntelligence

override fun onCreate() {
    super.onCreate()

    val creds = mapOf(
        "appId" to "<OTPLESS_APP_ID>",
        "clientId" to "<OTPLESS_CLIENT_ID>",
        "clientSecret" to "<OTPLESS_CLIENT_SECRET>"
    )

    OtplessDeviceIntelligence.initialize(applicationContext, creds)
}
```

## Integrate with OtplessAuth SDK

If you are already using the OtplessAuth SDK, you can enable device fingerprinting directly on `OtplessRequest` without calling `getIntelligence()` manually. Set the `deviceFingerprintMode` property before calling `OtplessSDK.start()`.

```kotlin theme={null}
import com.otpless.v2.android.sdk.dto.DeviceFingerprintMode
import com.otpless.v2.android.sdk.dto.OtplessRequest

lifecycleScope.launch(Dispatchers.IO) {
    val otplessRequest = OtplessRequest()
    otplessRequest.setPhoneNumber("PHONE_NUMBER", "COUNTRY_CODE")
    otplessRequest.deviceFingerprintMode = DeviceFingerprintMode.SYNC
    OtplessSDK.start(request = otplessRequest, callback = ::onOtplessResponse)
}
```

### `DeviceFingerprintMode` values

| Value   | Behaviour                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------ |
| `NONE`  | Device fingerprinting is disabled. Default value.                                                      |
| `ASYNC` | Fingerprint is collected in parallel with the auth request. Does not add latency.                      |
| `SYNC`  | Fingerprint is collected before the auth request is sent. Ensures fingerprint data is always included. |

## Fetch device intelligence

`getIntelligence()` is a suspend function. Call it from a coroutine scope and handle the result. It optionally accepts an [`UpdateInfo`](#pass-additional-context-optional) object to attach user-level and event-level context.

```kotlin theme={null}
import com.otpless.impl.veritaserum.OtplessDeviceIntelligence
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

CoroutineScope(Dispatchers.IO).launch {
    val result = OtplessDeviceIntelligence.getIntelligence()
    result.onSuccess { response ->
        val intelligence = response.intelligenceResponse
        // Act on the result
    }
    result.onFailure { error ->
        // Handle the error
    }
}
```

## Pass additional context (optional)

Pass an `UpdateInfo` object directly to `getIntelligence()` to attach user-level and event-level context. This enriches the result and enables more accurate risk scoring.

```kotlin theme={null}
import com.otpless.impl.veritaserum.OtplessDeviceIntelligence
import com.otpless.impl.veritaserum.core.UpdateInfo
import com.otpless.impl.veritaserum.core.PhoneInputType
import com.otpless.impl.veritaserum.core.OtpInputType
import com.otpless.impl.veritaserum.core.UserEventType
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

CoroutineScope(Dispatchers.IO).launch {
    val updateInfo = UpdateInfo(
        userId = "user-123",
        phoneNumber = "1234567890",
        phoneInputType = PhoneInputType.MANUAL,
        otpInputType = OtpInputType.AUTO_FILLED,
        userEventType = UserEventType.TRANSACTION,
        merchantId = "merchant-id",
        additionalInput = mapOf(
            "TRANSACTION_ID" to "txn-abc-123",
            "METHOD" to "UPI",
            "AMOUNT" to "500",
            "CURRENCY" to "INR"
        )
    )

    val result = OtplessDeviceIntelligence.getIntelligence(updateInfo = updateInfo)
    result.onSuccess { response ->
        val intelligence = response.intelligenceResponse
        // Act on the result
    }
    result.onFailure { error ->
        // Handle the error
    }
}
```

### `UpdateInfo` fields

| Field             | Type                   | Description                                                                      |
| ----------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `userId`          | `String?`              | Your internal user identifier. Used to correlate the result with a user account. |
| `phoneNumber`     | `String?`              | Customer phone number.                                                           |
| `phoneInputType`  | `PhoneInputType?`      | How the phone number was entered: `MANUAL`, `COPY_PASTED`, `GOOGLE_HINT`.        |
| `otpInputType`    | `OtpInputType?`        | How the OTP was entered: `MANUAL`, `COPY_PASTED`, `AUTO_FILLED`.                 |
| `userEventType`   | `UserEventType?`       | The action being performed: `LOGIN`, `SIGNUP`, `TRANSACTION`, `OTHERS`.          |
| `merchantId`      | `String?`              | Merchant identifier, if applicable.                                              |
| `additionalInput` | `Map<String, String>?` | Arbitrary key-value pairs for custom context.                                    |

## Sample response

### Success

```json theme={null}
{
  "requestId": "403ad427-5018-47b9-b6e8-790e17a78201",
  "sessionId": "233sd769-9367-39h9-b9e8-650eb6e87820",
  "newDevice": false,
  "deviceId": "43fccb70-d64a-4c32-a251-f07c082d7034",
  "vpn": false,
  "proxy": false,
  "emulator": true,
  "cloned": false,
  "geoSpoofed": false,
  "rooted": false,
  "ip": "106.219.161.71",
  "remoteAppProviders": false,
  "remoteAppProvidersCount": 3,
  "mirroredScreen": false,
  "hooking": true,
  "factoryReset": true,
  "appTampering": true,
  "sessionRiskScore": 99.50516,
  "deviceRiskScore": 99.50516,
  "clientUserIds": ["difansd23r32", "2390ksdfaksd"],
  "genuineInstall": false,
  "developerOptionsEnabled": true,
  "usbDebugging": true,
  "wirelessDebugging": false,
  "unsecuredWifi": false,
  "harmfulAppDetected": false,
  "blacklistedDevice": false,
  "keyloggerDetected": false,
  "factoryResetTime": 1743419662000,
  "gpsLocation": {
    "address": "F2620, Block F, Sushant Lok III, Sector 57, Gurugram, Haryana 122011, India",
    "adminArea": "Haryana",
    "countryCode": "IN",
    "countryName": "India",
    "featureName": "F2620",
    "latitude": "28.420385999999997",
    "locality": "Gurugram",
    "longitude": "77.088926",
    "postalCode": "122011",
    "subAdminArea": "Gurgaon Division",
    "subLocality": "Sector 57"
  },
  "ipDetails": {
    "country": "IN",
    "fraudScore": 27.0,
    "city": "New Delhi",
    "isp": null,
    "latitude": 28.60000038,
    "region": "National Capital Territory of Delhi",
    "asn": "",
    "longitude": 77.19999695
  },
  "simInfo": {
    "simIds": [
      {
        "id": 1,
        "simSlotIndex": 0,
        "carrierName": "JIO 4G | Jio",
        "eSim": false
      },
      { "id": 3, "simSlotIndex": 1, "carrierName": "airtel", "eSim": true }
    ],
    "totalSimUsed": 10
  },
  "deviceMeta": {
    "cpuType": "Qualcomm Technologies, Inc SM7325",
    "product": "I2126i",
    "androidVersion": "14",
    "storageAvailable": "29340553216",
    "storageTotal": "111156146176",
    "model": "I2126",
    "screenResolution": "1080x2316",
    "brand": "iQOO",
    "totalRAM": "7679795200"
  },
  "appAnalytics": {
    "affinity": {
      "entertainment": 0.5,
      "gaming": 0.6,
      "productivity": 0.8,
      "food_and_drink": 0.4
    }
  },
  "ruleAction": {
    "action": "WARN",
    "name": "VPN enabled",
    "description": "A VPN connection was detected on this device.",
    "message": "For security reasons, please disable your VPN and try again."
  },
  "appliedRules": {
    "rules": {
      "55 : VPN enabled": 0,
      "99 : App is tampered": 50
    },
    "totalScore": 50.0
  },
  "additionalData": {}
}
```

### Error

```json theme={null}
{
  "requestId": "7e12d131-2d90-4529-a5c7-35f457d86ae6",
  "errorMessage": "OTPless server error"
}
```

## Response fields

| Field                     | Type    | Description                                                                                      | Default |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------ | ------- |
| `requestId`               | string  | Unique identifier for the request.                                                               | `""`    |
| `sessionId`               | string  | Unique identifier for the current app session.                                                   | `""`    |
| `newDevice`               | boolean | Whether this is the first time this device has been seen.                                        | `false` |
| `deviceId`                | string  | Stable identifier for the device. Persists across reinstalls and factory resets.                 | `""`    |
| `sessionRiskScore`        | float   | Risk score (0–100) based on the current session state.                                           | `0.0`   |
| `deviceRiskScore`         | float   | Risk score that also factors in the device's historical state across past sessions.              | `0.0`   |
| `vpn`                     | boolean | A VPN is active on the device.                                                                   | `false` |
| `proxy`                   | boolean | The device is behind a proxy server.                                                             | `false` |
| `emulator`                | boolean | The app is running on an emulator rather than physical hardware.                                 | `false` |
| `rooted`                  | boolean | The device has been modified for root access.                                                    | `false` |
| `cloned`                  | boolean | The user is running a cloned instance of the app.                                                | `false` |
| `geoSpoofed`              | boolean | The device's location is being faked.                                                            | `false` |
| `remoteAppProviders`      | boolean | A remote access application (e.g. AnyDesk, TeamViewer) is installed.                             | `false` |
| `remoteAppProvidersCount` | number  | Number of remote access applications detected.                                                   | `0`     |
| `mirroredScreen`          | boolean | The device's screen is being mirrored.                                                           | `false` |
| `hooking`                 | boolean | The app has been altered by a hooking framework.                                                 | `false` |
| `factoryReset`            | boolean | A suspicious factory reset has been performed.                                                   | `false` |
| `factoryResetTime`        | long    | Timestamp of the last factory reset. `-1` if not detected.                                       | `-1`    |
| `appTampering`            | boolean | The app binary has been modified in an unauthorized way.                                         | `false` |
| `genuineInstall`          | boolean | The app was installed from an official, trusted source.                                          | `false` |
| `developerOptionsEnabled` | boolean | Developer Options are enabled on the device.                                                     | `false` |
| `usbDebugging`            | boolean | USB debugging is enabled.                                                                        | `false` |
| `wirelessDebugging`       | boolean | Wireless (ADB over Wi-Fi) debugging is enabled.                                                  | `false` |
| `unsecuredWifi`           | boolean | The device is connected to an unsecured Wi-Fi network.                                           | `false` |
| `harmfulAppDetected`      | boolean | Potentially harmful applications are installed on the device.                                    | `false` |
| `blacklistedDevice`       | boolean | The device is on the OTPless internal blocklist.                                                 | `false` |
| `keyloggerDetected`       | boolean | Keylogging behavior has been detected on the device.                                             | `false` |
| `ip`                      | string  | Current IP address of the device.                                                                | `""`    |
| `ipDetails`               | object  | IP metadata including country, city, ISP, coordinates, and fraud score.                          | `{}`    |
| `gpsLocation`             | object  | GPS location details including latitude, longitude, and address.                                 | `{}`    |
| `simInfo`                 | object  | SIM card details: current SIMs per slot and total SIMs used over the device's lifetime.          | `{}`    |
| `deviceMeta`              | object  | Device hardware metadata: brand, model, OS version, screen resolution, storage, RAM, CPU.        | `{}`    |
| `appAnalytics`            | object  | App affinity scores (0–1) per category based on installed apps.                                  | `{}`    |
| `clientUserIds`           | array   | All user IDs associated with this device across its history.                                     | `[]`    |
| `ruleAction`              | object  | The triggered rule and recommended action (`ALLOW`, `WARN`, `BLOCK`) with a user-facing message. | `{}`    |
| `appliedRules`            | object  | Full list of evaluated rules, their scores, and the total rule score.                            | `{}`    |
| `additionalData`          | object  | Reserved for custom fields returned based on your account configuration.                         | `{}`    |
