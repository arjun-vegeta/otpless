> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Android Headless Lite SDK — Changelog

> Changes in Android Headless Lite SDK releases.

This document tracks changes in **Android Headless Lite SDK** releases.

Lite SDK is a trimmed-down variant of the full Headless SDK, optimized for smaller AAR size while retaining core authentication flows, security fixes, and stability improvements.

## Scope of Lite SDK

### Included

- Core phone-number authentication flows
- SNA (Silent Network Authentication), OTP (WhatsApp/SMS/RCS)
- Security and stability fixes from the corresponding Headless SDK base

### Excluded (by design)

- Passkey flows
- Google / Facebook integrations
- Non-essential intent-based models and APIs not required for Lite phone-auth use cases

## Release Notes

<Update label="v1.3.0" description="June 30, 2026">
  ### Changed

- Restored legacy `OtplessSDK.initialize(...)` as a first-class supported API — the callback-based overload is no longer deprecated.
- Added SIM binding detail in the one-tap response.
</Update>

<Update label="v1.2.0" description="June 11, 2026">
  ### Changed

- New centralized event pipeline.
- Added `mfa_factor_complete` response type.
- Improved app information handling during authentication flows.
</Update>

<Update label="v1.1.1.*" description="May 15, 2026">
  ### Changed

- Added Multi-Factor Authentication (MFA) support.
- Improved MFA flow handling across authentication channels.
- Enhanced authentication failure handling.
- Added IP pinning for a better SNA success rate.
- New public OTP-customization setters: `setDeliveryChannel(...)`, `setOtpLength(...)`,
  `setExpiry(...)`.
- Fetch the SIM profile on each auth initiation to get the latest SIM info.
</Update>

<Update label="v1.1.0" description="May 12, 2026">
  ### Changed

- Added fingerprinting SDK reflection support.
- Added the originating OTP SMS address to the response.
- Added subscription ID parsing for SMS auto-read.
</Update>

<Update label="v1.0.9" description="April 13, 2026">
  ### Changed

- Improved SDK initialization and startup reliability.
</Update>

<Update label="v1.0.1" description="January 8, 2026">
  ### Changed

- Enabled library minification (`minifyEnabled true`) and enhanced Proguard/consumer rules.
- Simplified the public API by removing unnecessary parameters not required for the phone-auth use case.

### Simplified `OtplessRequest`

- Removed `AuthenticationMedium`, locale support, and libphonenumber validation.
- Phone validation is now lightweight digit/length based (E.164-ish 8–15 digits).
- Request JSON generation simplified (phone-number-only path).

### Refactors / Dependency Trimming

- Refactored code to reduce footprint and improve SDK size.
- Removed appcompat, chucker, googleid (credential manager), and libphonenumber dependencies.
- Added explicit `@SerializedName` mappings for network models.
- Added consumer Proguard rules for Retrofit and Gson reflection safety.

### Impact

- Major SDK size reduction.
</Update>

<Update label="v0.0.7" description="January 6, 2026">
  ### Changed

- Added support for Airtel and the new Vi SNA endpoint.
- Expanded network security configuration allowlist.
- Improved SIM detection logic for dual-SIM devices.
- Internal networking improvements.
</Update>

<Update label="v0.0.6" description="November 21, 2025">
  ### Based on

- `android-headless-sdk: 0.3.7`

### Changed

- Updated internal API contract.
</Update>

<Update label="v0.0.5" description="November 17, 2025">
  ### Based on

- `android-headless-sdk: 0.3.6`

### Changed

- Improved SNA flow.
</Update>

<Update label="v0.0.4" description="August 12, 2025">
  ### Based on

- `android-headless-sdk: 0.3.4`

### Changed

- Fixed immutability-related issues.
- Added enhanced fraud-control improvements.
- Improved SNA flow.
</Update>

<Update label="v0.0.3" description="June 16, 2025">
  ### Based on

- `android-headless-sdk: 0.2.9`

### Changed

- Incorporated bug fixes from Headless SDK `0.2.9`.
</Update>

<Update label="v0.0.2" description="June 9, 2025">
  ### Based on

- `android-headless-sdk: 0.2.8`

### Changed

- Incorporated bug fixes from Headless SDK `0.2.8`.
</Update>

<Update label="v0.0.1" description="May 30, 2025">
  ### Based on

- `android-headless-sdk: 0.2.7`

### Changed

- Removed Passkey, Google, and Facebook SDK integrations.
- Removed intent-based data classes.
- Removed APIs related to Passkey, Google, and Facebook authentication methods.

### Impact

- Reduced SDK size by approximately 200 KB.
- Focused Lite SDK on essential authentication flows only.
</Update>

## Size History (AAR)

| Version |     Size |
| ------- | -------: |
| 1.3.0   | 194.0 KB |
| 1.2.0   | 184.9 KB |
| 1.1.1   | 175.9 KB |
| 1.1.0   | 166.1 KB |
| 1.0.9   | 173.8 KB |
| 1.0.1   | 164.0 KB |
| 0.0.7   | 280.7 KB |
| 0.0.6   | 279.6 KB |
| 0.0.5   | 277.5 KB |
| 0.0.4   | 279.1 KB |
| 0.0.3   | 277.4 KB |
| 0.0.2   | 260.2 KB |
| 0.0.1   | 260.2 KB |

## Impact

- SDK size reduced by approximately 32% from v1.0.9 to v1.2.0 while adding support for authentication fingerprinting, MFA, and new event-driven authentication flows.
