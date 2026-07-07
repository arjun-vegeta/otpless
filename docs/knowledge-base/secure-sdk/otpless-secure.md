> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure SDK

> OTPless Secure SDK offers enhanced protection by providing detailed device information, security and trust signals, activity behavior analysis, and fraud detection. This comprehensive approach ensures robust user authentication and security.

<Frame type="glass">
  <img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/secureSDK.png?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=8da46176311f61761f9a38ea4395c68e" width="5284" height="3204" data-path="images/secureSDK.png" />
</Frame>

# Why Integrating OTPless Secure

**OTPless Secure** provides an extensive set of data points and security insights to enhance user authentication.

## 1. Device Information

Merchants are provided with comprehensive device-level details, allowing them to verify device authenticity and security:

- **IP Address**: Captures the user's IP address for geo-location and security analysis.
- **Browser Details**: Information about the browser in use, including the user-agent string, platform, and version.
- **IP Info**: Additional geolocation data associated with the IP, helping merchants identify risky or flagged regions.
- **Device Details**: Detailed specifications like operating system, screen resolution, and device model to identify legitimate or risky devices.

## 2. Security and Trust Signals

OTPless Secure generates various risk scores and indicators that help merchants assess the trustworthiness of a user session:

- **Suspect Score**: A risk score generated based on anomalies detected in the user's device environment, including:
- **Bot Detection**: Identifies automated or non-human behavior.
- **Incognito Detection**: Flags users browsing in incognito or private mode.
- **VPN Detection**: Detects the use of a VPN to obscure location.
- **Virtual Machine Detection**: Identifies whether the device is operating within a virtual machine, often used for fraud.
- **Developer Tools Detection**: Monitors if developer tools are active, which can indicate an attempt to manipulate the session.
- **Confidence Score**: Reflects the likelihood of the same user interacting across sessions, utilizing the **securetraceID**—a persistent visitor ID that tracks users on the same device.
- **IP Blocklist**: Alerts if the user's IP address is listed on a known blacklist, suggesting repeated fraudulent behavior or compromised security.

## 3. Activity and Behavior

OTPless Secure provides insights into user behavior and patterns, identifying suspicious or inconsistent activities:

- **SIM Ejections**: Detects whether the SIM card has been removed or swapped during the session, which can indicate tampering.
- **Velocity Checks**: OTPless Secure tracks **securetraceID** across multiple data points to monitor behavior velocity, linking:
  - Unique IP addresses.
  - Unique countries associated with the session.
  - Linked user identities at distinct time intervals, to identify rapid or abnormal activity changes.
- **Visit Trace**: Tracks user navigation behavior to detect irregularities.
- **SecuretraceID**: A persistent identifier that tracks the same user across multiple sessions on a single device, adding an extra layer of verification.

## 4. Fraud Detection

Advanced fraud detection mechanisms continuously monitor for signs of tampering, manipulation, or malicious behavior:

- **Emulator Detection**: Detects if the app is being run on an emulator, which is commonly used for fraudulent purposes.
- **Tamper Detection**: Identifies any attempts to tamper with the device's browser or application software.
- **Cloned App Detection**: Identifies when a cloned version of the application is being used.
- **Factory Reset Detection**: Flags devices that have recently undergone a factory reset, which can be a tactic to bypass security.
- **Frida Detection**: Detects the use of the Frida tool, which is often employed for reverse-engineering applications.
- **VPN Detection**: Identifies the use of a VPN, which can obscure a user's real location.
- **Jailbroken Device Detection**: Flags devices that have been jailbroken or rooted, making them more vulnerable to exploits.
- **Location Spoofing**: Detects attempts to falsify or manipulate the device’s location.
- **Developer Tools and Privacy Settings**: Identifies if developer tools are being used to manipulate app behavior or bypass privacy protections.
- **Bot Detection**: Confirms if the session is being controlled by a bot or other automated processes.

By integrating **OTPless Secure**, merchants gain access to a powerful suite of data and detection tools that significantly enhance the security of their authentication processes. These insights—ranging from device information to real-time fraud detection—allow businesses to better protect themselves and their users from potential security threats, making their authentication more robust.
