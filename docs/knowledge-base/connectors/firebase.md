> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Firebase

## Description

Integrate Firebase to use OTPLESS for sending out authentication messages (OTPs) to users trying to log in/sign up on your Firebase app.

## Overview

The Firebase connector allows you to use OTPLESS for handling authentication messages in your Firebase application. This enables you to streamline your authentication process, leveraging OTPLESS's efficient OTP delivery system.

## Benefits

- **Efficient OTP Delivery:** Utilize OTPLESS to handle the delivery of authentication messages, ensuring they reach your users quickly and reliably.
- **Seamless Integration:** Easily integrate OTPLESS with your Firebase application.
- **Cost Savings:** Save up to 90% on OTP costs by using OTPLESS for your authentication needs.

## Prerequisites

- A Firebase project with the necessary configurations.
- Service account JSON file or the required information for manual entry.
- Access to the OTPLESS app for configuring the connector.

## Activation Steps

1. **Log in to OTPLESS:**
   - Open the OTPLESS app and log in with your credentials.

2. **Navigate to Connectors:**
   - In the dashboard, go to the Connectors section.

3. **Choose Firebase Connector:**
   - From the list of available connectors, select "Firebase."

4. **Activate Connector:**
   - Click "Activate" to add the Firebase connector to your list of active connectors.

## Connector Configuration

1. **Enter Firebase Details:**
   - After activating the connector, you will be prompted to provide your Firebase details.
   - You can either upload a JSON file from Firebase or manually enter the required information:
     - Service account Email
     - Firestore project ID
     - Firebase Database URL (optional)
     - Privacy Key

2. **Save Configuration:**
   - Click "Save Changes" to finalize the setup.

## Connector Testing

1. **Verify OTP Delivery:**
   - Trigger an authentication event in your Firebase app to test OTP delivery.
   - Ensure that the OTP is delivered to the user as expected.

2. **Check Logs:**
   - Monitor the logs in both OTPLESS and Firebase for any errors or issues during the OTP delivery process.

## Troubleshooting

- **Credential Issues:**
  - Ensure all details are correct and properly entered.
  - Regenerate the service account JSON file if needed.

- **OTP Delivery Problems:**
  - Verify that OTPLESS is correctly configured in your Firebase project.
  - Check for any network issues that might affect OTP delivery.

- **Configuration Errors:**
  - Double-check all configuration settings in OTPLESS and Firebase.
  - Refer to Firebase's documentation for additional troubleshooting tips: [Firebase Documentation](https://firebase.google.com/docs).

By following this documentation, you should be able to effectively integrate and manage Firebase authentication using OTPLESS.
