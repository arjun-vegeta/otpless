> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Signup and Signin configuration

> This documentation outlines the flexible and customizable sign-up and sign-in configurations available in OTPLESS, including passwordless authentication methods, social logins, and multi-factor authentication (MFA) options, designed to enhance security and user experience. It provides detailed guidance on configuring these settings through the OTPLESS dashboard and upcoming features like password-based authentication and resetting MFA.

## Overview

OTPLESS provides flexible and customizable options for configuring the sign-up and sign-in journeys of your application. These configurations allow you to tailor how users are onboarded and authenticated, improving both security and user experience.\
OTPLESS currently offers passwordless methods, such as OTP (One-Time Password), Magic Links, Biometric, and social logins, to simplify the user experience. Password-based authentication options will be added soon.

## Sign-Up vs. Sign-In

### Sign-Up

The sign-up journey is designed to facilitate the onboarding of new users. It allows you to define what information needs to be collected and verified during the registration process. For example, you can decide whether to collect a phone number or email as a primary identifier and whether to verify these identifiers immediately.

**Additional Fields Collection:** Coming soon, OTPLESS will support the collection of custom fields during the sign-up process. This feature will enable you to gather more information from users, such as name, address, or other custom-defined data points, to better understand and serve your user base.

### Sign-In

The sign-in journey is tailored for returning users. Depending on your configuration, users can authenticate using different methods like phone, email, or social logins. This journey focuses on user convenience and security, leveraging flexible, passwordless authentication methods.

## Primary Channels

Primary channels are the main identifiers users can use to sign up or sign in to your application. OTPLESS currently supports the following primary channels:

- **Phone:** Allows users to register and authenticate using their phone numbers.
- **Email:** Allows users to register and authenticate using their email addresses.
- **Biometric (Coming soon):** Will allow users to authenticate using biometric data such as fingerprints or facial recognition.

> **Note:** The channel chosen as a primary method cannot be selected again as a secondary method for multi-factor authentication.

## Secondary Channels

Secondary channels provide additional layers of security by enabling a second method of verification. Currently, OTPLESS allows the following secondary channels:

- **Phone:** Can be used as a secondary channel to verify a user's identity.
- **Email:** Can also be set up as a secondary channel for added security.
- **Biometric:** Available as a secondary channel to enhance security.

## Authentication Configurations

**Authentication configurations** are journeys that users can use to sign up and sign in to your application. OTPLESS focuses on a passwordless strategy to streamline user access while maintaining security.

### Configuration Options for Primary Channels

#### Allow to Sign-In

- **Off:** Users cannot use the selected identifier (phone or email) to sign in.
- **On:** Users can use the selected identifier to sign in.

**Explanation:** When this option is enabled, the input field on your sign-in page will allow users to enter their phone number or email, depending on your selection. This means that if the "Allow to Sign-In" toggle is on for the phone number, the input field will accept phone numbers for authentication. Similarly, enabling this toggle for the email will allow users to enter their email for sign-in.

#### Required at Sign-Up

- **Off:** The selected identifier (phone or email) is not mandatory during the sign-up process.
- **On:** The identifier is mandatory at sign-up.

**Explanation:** When enabled, this configuration collects the chosen identifier at sign-up. For example, if the "Required at Sign-Up" toggle is on for phone numbers, users must provide their phone number during registration. If verification is also enabled, the identifier is verified immediately, securing the registration process against fraudulent activities.

#### Verify at Sign-Up

- **Off:** The identifier (phone or email) is collected without verification.
- **On:** The identifier is verified during the sign-up process.

**Explanation:** Enabling this toggle ensures that users provide a valid identifier (phone number or email) that is verified immediately during sign-up. This step prevents fraudulent sign-ups and secures the user onboarding process. If this toggle is enabled, the "Required at Sign-Up" toggle is automatically activated.

## Social Login Methods

Social login methods allow users to sign up or sign in using third-party accounts, such as: WhatsApp, Google, Apple, LinkedIn, etc. These options are available as primary channels only.

**Explanation:** When a social login method is enabled (e.g., WhatsApp SSO), it effectively activates the "Allow to Sign-In" toggle for the associated identifier type (e.g., WhatsApp SSO enables phone-based sign-in).

## Multi-Factor Authentication (MFA) with OTPLESS

Multi-Factor Authentication (MFA), widely known as Two-Factor Authentication (2FA), adds an additional layer of security by requiring users to complete a second verification step during sign-in. This enhances security by enforcing two different types of verification, making it harder for unauthorized users to gain access to an account. With OTPLESS, you can configure MFA settings directly from the OTPLESS Dashboard.

### Configuring MFA in OTPLESS

To enable MFA for your application, follow these steps:

1. Navigate to the OTPLESS Dashboard and select your application.
2. In the navigation sidebar, go to **Configure Channels > Multi-Factor**.
3. Toggle on the MFA strategies you want to enable.

### MFA Strategies Available in OTPLESS

#### Phone

- **Methods Available:** OTP (One-Time Password), MagicLink, and more.
- Users can verify their identity using their phone number, either by receiving an OTP or a MagicLink.

#### Email

- **Methods Available:** OTP, MagicLink, and more.
- Users can verify their identity through their email by receiving a code or link for authentication.

#### Biometric

- **Auto Trigger Biometric:** When enabled, this setting automatically triggers the biometric authentication prompt (e.g., a fingerprint or face recognition prompt) instead of showing a button. The prompt appears directly on the screen, and closing it will display a "Continue with Biometric" button, which becomes the default behavior when auto-trigger is off.

#### TOTP

**Authenticator Application (TOTP - To Be Added Soon):** Users can use an authenticator app (like Google Authenticator) to generate a time-based one-time password (TOTP) for added security.

> **Note:** You can choose a maximum of two secondary factors for MFA, as one of the three (Phone, Email, Biometric) would already be set as the primary authentication channel.

## Resetting a User's MFA in OTPLESS

There might be instances where a user needs to reset their MFA settings. While OTPLESS is planning to add a direct "Reset MFA" button soon, here is what you can do currently:

Please <a href="https://otpless.com/support" style={{ textDecoration: 'none',color:'inherit' }}>get in touch</a> with the OTPLESS support team for assistance.
