> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog of Full Android Headless SDK

>

<Update label="v0.6.3" description="January 15, 2026">
  ### Added

- Added Airtel SNA whitelisting URL support.
- Added try-catch handling and event logging for Truecaller onActivityResult.
</Update>

<Update label="v0.6.2" description="December 22, 2025">
  ### Fixed

- Resolved _delay uninitialize_ error related to Device ID (Intelligence SDK support).
</Update>

<Update label="v0.6.1" description="December 19, 2025">
  ### Added

- Client metadata support.
- Support for **new VI SNA**.
</Update>

<Update label="v0.6.0" description="December 16, 2025">
  ### Improved

- SNA network enhancements:
  - Improved SIM and network details.
  - Updated default SNA API timeout.
  </Update>

<Update label="v0.5.9" description="December 11, 2025">
  ### Changed

- Updated `otpless-intelligence-sdk` version to **1.0.3**.
</Update>

<Update label="v0.5.8" description="December 4, 2025">
  ### Added

- Intelligence Service Manager:
  - Exposed `stop intelligence` method to the client.

### Changed

- Updated `otpless-intelligence-sdk` dependency to the latest version.
</Update>

<Update label="v0.5.7" description="November 25, 2025">
  ### Added

- Device Intelligence and fraud detection SDK.
</Update>

<Update label="v0.5.6" description="November 20, 2025">
  ### Improved

- Enhanced events for Phone Discovery UI.
</Update>

<Update label="v0.5.5" description="November 11, 2025">
  ### Added

- **TID** support in background auth.
</Update>

<Update label="v0.5.4" description="November 10, 2025">
  ### Changed

- Phone Discovery UI dialog text updates (textual changes).
</Update>

<Update label="v0.5.3" description="November 6, 2025">
  ### Added

- Support for custom **Terms & Conditions** in Phone Discovery UI (repeat users).
</Update>

<Update label="v0.5.2" description="November 5, 2025">
  ### Added

- Exposed method to close dialog (if open) in Phone Discovery UI for repeat users.
</Update>

<Update label="v0.5.1" description="November 3, 2025">
  ### Added

- Correlation ID (**tsid**) for improved log traceability during failures.
</Update>

<Update label="v0.5.0" description="October 31, 2025">
  ### Added

- Added UI for phone number discovery for repeat users.
</Update>

<Update label="v0.3.7" description="October 14, 2025">
  ### Changed

- Updated Verify API method from **GET** to **POST**.
</Update>

<Update label="v0.3.6" description="September 19, 2025">
  ### Changed

- Default SIM configuration updated to prioritize **data network over call**.
</Update>

<Update label="v0.3.5" description="September 19, 2025">
  ### Changed

- Added new keyfiles for publishing.
</Update>

<Update label="v0.3.4" description="August 11, 2025">
  ### Added

- GAID fetching dependency added to the core module (replaced reflection approach).

### Improved

- Event improvements.
</Update>

<Update label="v0.3.3" description="August 7, 2025">
  ### Fixed

- Fixed SNA cellular data connection check to ensure proper functionality.
</Update>

<Update label="v0.3.2" description="July 23, 2025">
  ### Removed

- Removed OkHttp internal dependency (`okhttp3.internal` is no longer used).
</Update>

<Update label="v0.3.1" description="July 9, 2025">
  ### Features

- Introduced new response type `AUTH_TERMINATED` for terminal authentication failures.
</Update>

<Update label="v0.3.0" description="July 2, 2025">
  ### Fixes

- Fixed locale-related issues with the latest SDK update.
</Update>

<Update label="v0.2.9" description="June 17, 2025">
  ### Fixes

- ANR fix added on Otpless initialize.
</Update>

<Update label="v0.2.8" description="June 9, 2025">
  ### Fixes

- Made SNA error event immutable to handle multithreading exception.
</Update>

<Update label="v0.2.7" description="June 3, 2025">
  ### Features

- Logging can be enabled or disabled.
</Update>

<Update label="v0.2.6" description="May 21, 2025">
  ### Fixes

- Made the default object immutable to prevent concurrent modifications.
</Update>

<Update label="v0.2.5" description="May 20, 2025">
  ### Fixes

- Multiple failure response fix in case of Truecaller.
</Update>

<Update label="v0.2.4" description="May 14, 2025">
  ### Fixes

- Fixed code verification on app killed state.

### Improvements

- Removed Truecaller configuration from `AndroidManifest`.
</Update>

<Update label="v0.2.3" description="May 13, 2025">
  ### Fixes

- Truecaller on-activity-result case handled.
</Update>

<Update label="v0.2.2" description="May 12, 2025">
  ### Improvements

- Added explicit declaration of SIM State receiver in `AndroidManifest.xml`.
</Update>

<Update label="v0.2.1" description="May 5, 2025">
  ### Features

- Integrated Truecaller Single Sign-On (SSO) using the native Truecaller SDK.
</Update>

<Update label="v0.2.0" description="April 28, 2025">
  ### Improvements

- Bug fixes and optimizations for better performance.
</Update>

<Update label="v0.1.9" description="April 4, 2025">
  ### Improvements

- Better internal event handling.
</Update>

<Update label="v0.1.8" description="April 3, 2025">
  ### Fixes

- Fixed a bug in which SNA api did not work as intended sometimes.
</Update>

<Update label="v0.1.7" description="March 28, 2025">
  ### Fixes

- `otpLength` not being sent in case of `OTP_LINK`.
- `authType` not being sent in case of custom request.
</Update>

<Update label="v0.1.6" description="March 27, 2025">
  ### Features

- Added `otpLength` in `INITIATE` response indicating the length of the OTP that has been sent to the user.
</Update>

<Update label="v0.1.5" description="March 25, 2025">
  ### Fixes

- Fixed a bug in which `FALLBACK_TRIGGERED` was sometimes not being sent to the user.
</Update>

<Update label="v0.1.4" description="March 25, 2025">
  ### Fixes

- Fixed a bug in which `DELIVERY_STATUS` resposne was sometimes not sent to the user.
</Update>

<Update label="v0.1.3" description="March 24, 2025">
  ### Features

- `DELIVERY_STATUS` response added for SmartAuth.

### Fixes

- GoogleCredentialApi version downgrade to stable version.
</Update>

<Update label="v0.1.2" description="March 24, 2025">
  ### Features

- Added INITIATE & VERIFY responses for SNA.
</Update>

<Update label="v0.1.1" description="March 17, 2025">
  ### Fixes

- Fixed an issue in which otp auto read did not work properly.
</Update>

<Update label="v0.1.0" description="March 7, 2025">
  ### Fixes

- Fixed an issue in which the app crashed because of `EncryptedSharedPreferences` on some lower end devices.
</Update>

<Update label="v0.0.9" description="March 6, 2025">
  ### Fixes

- Android error codes that did not match the documentation.
</Update>

<Update label="v0.0.8" description="March 6, 2025">
  ### Fixes

- Chucker dependency issue.
</Update>

<Update label="v0.0.7" description="March 6, 2025">
  ### Fixes

- Activity memory leak fix.
- Fixed the bug in which previous ONETAP response was sometimes sent again.
- Android core degraded to `1.13.1` and auto read to `0.1.2` for better backward compatibility.
</Update>

<Update label="v0.0.6" description="March 4, 2025">
  ### Features

- Added templateId support for SmartAuth.
- Added event SDK\_READY to notify that the sdk has been initialized.

### Improvements

- Robust api request handling.
- Further robust utilization of AutoReadSDK.
</Update>

<Update label="v0.0.5" description="February 28, 2025">
  ### Improvements

- Robust request handling by discarding old requests when a new request is made.
- Added retry mechanism for SDK initialization.

### Fixes

- Fixed a bug in which `No Internet Connection` response was sent when it was not required.
</Update>

<Update label="v0.0.4" description="February 27, 2025">
  ### Features

- SmartAuth templateId support added for OTP delivery.
</Update>

<Update label="v0.0.3" description="February 19, 2025">
  ### Fixes

- Fixed crash related to network connectivity issues.
- Fixed SNA timeout issues.

### Improvements

- Performance and resources optimizations for OTP delivery.
</Update>

<Update label="v0.0.2" description="February 10, 2025">
  ### Fixes

- Fixed SDK initialization tracking bug.
</Update>

<Update label="v0.0.1" description="January 31, 2025">
  * Initial release.
</Update>

## Size History (AAR)

| SDK Version | Size (bytes) | Size (MB) |
| ----------- | -----------: | --------: |
| 0.2.7       |      449,882 |    0.4290 |
| 0.2.8       |      449,955 |    0.4291 |
| 0.2.9       |      466,775 |    0.4452 |
| 0.3.1       |      468,646 |    0.4469 |
| 0.3.2       |      468,829 |    0.4471 |
| 0.3.3       |      468,827 |    0.4471 |
| 0.3.4       |      473,064 |    0.4511 |
| 0.3.5       |      476,778 |    0.4547 |
| 0.3.6       |      475,839 |    0.4538 |
| 0.3.7       |      476,451 |    0.4544 |
| 0.3.8       |      482,745 |    0.4604 |
| 0.5.0       |      511,406 |    0.4877 |
| 0.5.1       |      511,628 |    0.4879 |
| 0.5.2       |      511,548 |    0.4879 |
| 0.5.3       |      517,645 |    0.4937 |
| 0.5.4       |      518,811 |    0.4948 |
| 0.5.5       |      521,162 |    0.4970 |
| 0.5.7       |      521,601 |    0.4974 |
| 0.5.8       |      531,635 |    0.5070 |
| 0.5.9       |      572,775 |    0.5462 |
| 0.6.0       |      573,577 |    0.5470 |
| 0.6.1       |      573,407 |    0.5468 |
| 0.6.2       |      573,453 |    0.5469 |
| 0.6.3       |      570,061 |    0.5436 |
