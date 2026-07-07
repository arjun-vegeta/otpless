> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Biometric Authentication

> Biometric Authentication uses fingerprints or facial recognition for secure, passwordless logins. This enhances security by storing biometric data locally and employing cryptography, while simplifying the login process for users.

## What is Biometric Authentication?

Biometric authentication using WebAuthn uses fingerprints or facial recognition for secure, passwordless logins. As part of the [FIDO2](https://www.w3.org/TR/webauthn-2/) project, WebAuthn allows web apps to verify users through devices like smartphones or biometric scanners. When a user presents their biometric data, the device checks it locally and uses cryptography to create a secure digital signature, which is then sent to the web service for authentication. This keeps biometric data on the user's device, reducing the risk of data breaches and phishing attacks. Users can do quick, easy logins without needing passwords. Biometric information stays private on the user's device, complying with data protection rules. The passwordless method simplifies the login process, improving user satisfaction. WebAuthn's cryptographic security makes it strong against cyber threats, providing a safe and efficient authentication solution for modern web apps.

## Why Biometric Authentication?

**Key Benefits of Biometric Authentication Using WebAuthn:**

\-- **Enhanced Security**: Biometric data never leaves the user's device, reducing the risk of data breaches and phishing attacks. Uses public-key cryptography to create secure digital signatures, protecting against cyber threats like man-in-the-middle attacks and credential stuffing.

\-- **User Convenience**: Users can log in quickly and easily using their fingerprint or facial recognition, without needing to remember passwords.

\-- **Privacy Protection**: Biometric information is stored locally on the user's device, ensuring personal data remains private and complies with data protection regulations.

\-- **Improved User Experience**: The passwordless login process is smooth and fast, reducing friction and enhancing overall user satisfaction.

## How it works?

Biometric authentication through WebAuthn consists of two main processes: <b>Registration</b> and <b>Login</b>. This approach facilitates secure, passwordless access for users.

\-- **Registration**: To begin using biometric authentication on a smartphone, users initiate registration by using their fingerprint, facial scan, or setting up a PIN within the device. During registration, the device generates a unique public-private key pair associated with the user's biometric data or PIN. This key pair is securely linked with the online service or application, where it undergoes verification to complete the registration process. This ensures a personalized and secure authentication method using WebAuthn.

<Frame type="glass">
  <img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/biometricflow-register.webp?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=0f59da9805006df333cd50c80e001e33" width="762" height="742" data-path="images/biometricflow-register.webp" />
</Frame>

\-- **Login**: When the user initiates the password login process on the service or application, the service requests authentication using the Webauthn. The user verifies their identity by providing the registered biometric data or PIN through the device. Once authenticated locally, the device generates a new cryptographic key pair (public and private key) specific to this authentication session. The public key from this session is securely transmitted to the service requesting authentication. The service then verifies this public key against its stored copy of the user's public key associated with the account. If the verification succeeds, the user gains access to the service or application securely, without the need for passwords, ensuring a streamlined and highly secure authentication process.

<Frame type="glass">
  <img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/biometricflow-login.webp?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=4e01c5299f94e19b02faa27cefd600c9" width="762" height="742" data-path="images/biometricflow-login.webp" />
</Frame>

## Potential Implementation Strategy

At OTPless, we have streamlined the entire process of biometric authentication for both websites and apps. With our easy-to-implement [SDK](https://otpless.com/docs/frontend-sdks/web-sdks/javascript/pre-built-ui), you can quickly integrate biometric authentication into your platform. Here are the approaches you can leverage using biometric authentication:

### Primary Factor Authentication

**Single-Factor Login**: Users log in using biometric authentication only.

**Example**: A user signs up using their phone number on a website or app and subsequently registers their biometric data. When the user returns to the website and provides their phone to log in, they can use their biometric data instead of a second factor like OTP or magic link.

### Secondary Factor Authentication

**Enhanced Security**: Add biometric authentication as a secondary factor for login.

**Example**: A user signs up using their phone number on a website or app and registers their biometric data. When the user visits the website again, they first verify their identity using the method provided by the application, such as OTP or magic link, and then provide their biometric data to complete the login process.

### Primary Factor with Anonymous ID

**Seamless and Secure**: Authenticate users without requiring any input, using an Anonymous ID.

**Example**: An Anonymous ID can be generated by the OTPless server or provided by the merchant server. Once the Anonymous ID is discovered, a biometric registration is initiated for the user on the website/app. After registration, the user receives a session token, which can be managed by OTPless or the merchant. When the user visits the website again from the same device, they can be authenticated using the session for the Anonymous ID with biometric authentication, creating a new session upon successful biometric authentication. This way, users never have to input any details to gain access, but their access remains fully secure and device bound.

### Session Management

**Token Refresh**: Biometric authentication can be used to refresh user sessions.

**Example**: Upon signup, a user registers their biometric data. When their session expires, they can regain access by refreshing the token using biometric authentication.

These approaches ensure robust and seamless authentication processes, enhancing user security and convenience.
