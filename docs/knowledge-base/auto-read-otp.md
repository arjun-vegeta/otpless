> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Auto Read OTP in OTPless Auth SDK

> Enhance user experience with Auto Read functionality for WhatsApp and SMS on Android Apps, providing a seamless and zero-tap OTP auth.

### What is Auto Read OTP?

Auto Read allows OTPs to be automatically filled into the login page without requiring users to switch apps or manually enter the OTP. This feature enhances the user experience by providing a seamless and zero-tap authentication process.

### Where Does Auto Read Work?

Auto Read is available for **Android apps only**. Our SDK supports auto reading of OTPs from both WhatsApp and SMS, making it versatile and user-friendly.

### How Auto Read Works

Auto Read uses a broadcast service to detect and capture OTPs. To enable this feature, you need to whitelist the OTP template with your App Hash and Package Name with WhatsApp/Meta or pass the app hash in SMS Template.

### How to Whitelist the Template

<Steps>
  <Step title="Generate the App Hash">
    Use the OTPless utility function to get the App Hash.

    **import the following class**

    ```
    com.otpless.utils.Utility;
    ```

    **To get the application signature in base64 **return** `String`**

    ```
    Utility.getAppSignature(context)
    ```

    The App hash is the **first 11 character** string of the returned value.

  </Step>

  <Step title="Send Details for Whitelisting">
    Send the following details to [support@otpless.com](mailto:support@otpless.com) from your registered email ID:

    * App Hash
    * Package Name
    * App ID

  </Step>
</Steps>
