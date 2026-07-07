> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrating Silent Network Authentication (SNA) in Web Applications

> Silent Network Authentication (SNA) is a cutting-edge technology designed to authenticate users silently without requiring active input like traditional OTPs. This blog explores what SNA is, why it's beneficial, and how you can integrate it into your web applications.

## What is SNA?

Silent Network Authentication (SNA) is an authentication process that utilizes the user's mobile network details to verify their identity seamlessly. It's conducted in the background, providing a frictionless user experience by leveraging the user's phone network without requiring any user interaction.

## Why SNA?

- **Frictionless Experience**: Users are authenticated without any action required on their part, improving the user experience significantly.
- **Enhanced Security**: Leverages network-based factors, making it more secure against common threats like phishing or credential exploitation.
- **Higher Conversion Rates**: Reduces abandonment rates during the sign-in or sign-up process, as users are not deterred by complex authentication steps.

## How it works?

SNA works by checking if the user's device can be authenticated through their telecom provider without user interaction. If the automatic check fails, it falls back to alternative methods like WhatsApp, SMS, or Viber based on predetermined configurations.

## Prerequisite

To enable SNA for your application, contact your Relationship Manager or [support@otpless.com](mailto:support@otpless.com) to activate the SNA feature.

## Technical Flow

<Frame type="glass">
  <img src="https://mintcdn.com/otpless-96/_aEz_FhlLI0izHsE/images/sna_tech_flow.svg?fit=max&auto=format&n=_aEz_FhlLI0izHsE&q=85&s=3e2fdd805b554e61dc873ffcdf02ded0" width="1920" height="946" data-path="images/sna_tech_flow.svg" />
</Frame>

## Integration Steps

### Step 1: Load the Headless SDK

First, include the OTPLESS Headless SDK in your project by adding the following script to the `<head>` of your HTML:

```html theme={null}
<script
  id="otpless-sdk"
  src="https://otpless.com/v3/headless.js"
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
<input id="mobile-input" placeholder="Enter mobile number" />
<button onclick="phoneAuth()">Verify</button>
```

### Step 4: Initiate SNA

When the user clicks the CTA, call the `initiate` function with the user's input data:

```javascript theme={null}
const phoneAuth = () => {
  OTPlessSignin.initiate({
    channel: 'PHONE',
    phone: document.getElementById('mobile-input').value,
    countryCode: '+62',
  });
};
```

<Note>
  **Pre-check Fallback**: If SNA cannot be verified initially (pre-check failed), the system will automatically trigger the fallback method configured on your dashboard.
</Note>

### Handling Responses

```javascript theme={null}
function handleResponse(response) {
  if (response.event === "fallback_triggered") {
    // Handle fallback scenario
    console.log("Fallback triggered:", response);
  if (response.event === "success") {
    // Handle fallback scenario
    console.log("Success:", response);
  } else {
    // Handle successful SNA
    console.log(response);
  }
}
```

## Conclusion

Integrating SNA into your web applications with OTPLESS not only enhances the user experience by reducing friction during the authentication process but also improves security. For more detailed information on custom configurations and advanced settings, refer to our [full documentation](/frontend-sdks/web-sdks/javascript/headless).
