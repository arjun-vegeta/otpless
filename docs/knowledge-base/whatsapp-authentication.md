> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication via Whatsapp

> Authentication via Whatsapp utilizes the WhatsApp platform to verify and identify user identity, leveraging it as a means of verification.

## Description

Authentication via Whatsapp is a process that verifies and confirms the identity of users, utilizing the WhatsApp platform as a means of authentication. This authentication occurs through two primary methods: User-Initiated Flow and Business-Initiated Flow.

- **User-Initiated**: In the User-Initiated Flow, users click <b>"Continue with WhatsApp"</b> to enter a chat with a verified business number, where they send a pre-filled sign-in request. Upon sending, users swiftly receive an approval button. Clicking this button redirects users back to the originating app or website, seamlessly logging them in.

<Frame type="glass">
  <img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/continue-with-whatsapp.webp?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=53617f8baab6f8aa31fdb379121a4b31" width="200" height="359" data-path="images/continue-with-whatsapp.webp" />
</Frame>

- **Business-Initiated**: In the Business-Initiated Flow, users provide their phone number to the app or website for login. After proceeding, users receive an approval button from a verified WhatsApp business number on their WhatsApp app. Clicking this button in the WhatsApp chat then redirects users back to the app or website they came from, seamlessly logging them in.

## Why Authentication via WhatsApp?

- **Enhanced Security**: WhatsApp provides end-to-end encryption, ensuring that messages sent through the platform are secure and private, potentially reducing the risk of interception compared to SMS-based authentication.
- **Wide User Base**: WhatsApp has a vast global user base, making it a convenient and accessible platform for many people, simplifying the authentication process for a large number of users.
- **User Familiarity**: Most users are already familiar with WhatsApp's interface and functionalities, making the authentication process smoother and more intuitive, reducing the learning curve and potential friction.

## Prerequisite

Enable the Whatsapp channel from [here](https://otpless.com/dashboard/customer/channels) in your otpless dashboard.

## Integration Steps

### Step 1: Load the SDK

First, include the OTPLESS SDK in your project by adding the following script to the `<head>` of your HTML:

```html theme={null}
<script
  id="otpless-sdk"
  src="https://otpless.com/v4/headless.js"
  data-appid="YOUR_APP_ID"
></script>
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

### Step 2: Initialize SDK and Handle Callback

Initialize the SDK and set up a callback function to handle authentication:

```javascript index.html theme={null}
<script>
  const callback = (userinfo) => {
    const emailMap = otplessUser.identities.find(
      (item) => item.identityType === "EMAIL"
    );

    const mobileMap = otplessUser.identities.find(
      (item) => item.identityType === "MOBILE"
    )?.identityValue;

    const token = otplessUser.token;

    const email = emailMap?.identityValue;

    const mobile = mobileMap?.identityValue;

    const name = emailMap?.name || mobileMap?.name;

    console.log(userinfo);

    // Implement your custom logic here.
  };
  // Initialize OTPLESS SDK with the defined callback.
  const OTPlessSignin = new OTPless(callback);
</script>
```

### Step 3: Create Your UI

Design and implement your custom UI for authentication. An example HTML structure could look like this:

```html theme={null}
<button onclick="oauth('WHATSAPP')">Continue with WhatsApp</button>
```

### Step 4: Initiate Authentication

When the user clicks the CTA, call the oauth function

```javascript theme={null}
const oauth = (provider) => {
  OTPlessSignin.initiate({ channel: 'OAUTH', channelType: provider });
};
```

Upon successful authentication, the SDK will invoke the callback function defined in Step 2 , providing a JSON object with user information.

<Note>
  **Please note**: Similarly, you can seamlessly integrate the same flow into mobile apps by following the instructions available [here](https://otpless.com/docs/frontend-sdks/app-sdks/android/headless).
</Note>

## Conclusion

Incorporating authentication via WhatsApp into your applications through OTPLESS streamlines the user experience and enhances security. For custom configurations and advanced settings, explore our comprehensive [full documentation](/frontend-sdks/web-sdks/javascript/headless).
