> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure

> Prevent fraud, detect bots, and deliver seamless experiences with reliable browser fingerprinting.

export const SampleGithubContainer = ({platform, href = '/api-reference/endpoint/verifytoken/verify-token-with-secure-data', text = 'authenticity of sign-in'}) => {
let githubLink = "https://github.com";
switch (platform.toLowerCase()) {
case "android":
githubLink = "https://github.com/devbathaniotpless/otpless-androidnative-demo";
break;
case "ios":
githubLink = "https://github.com/devbathaniotpless/otpless-iOS-demo";
break;
case "react native":
githubLink = "https://github.com/devbathaniotpless/otpless-react-native-demo";
break;
case "flutter":
githubLink = "https://github.com/devbathaniotpless/otpless-flutter-demo";
break;
case "ionic":
githubLink = "https://github.com/devbathaniotpless/otpless-ionic-demo";
break;
case "javascript":
githubLink = "https://github.com/devbathaniotpless/otpless-javascript-demo";
break;
case "vue":
githubLink = "https://github.com/devbathaniotpless/otpless-vue-demo";
break;
case "angular":
githubLink = "https://github.com/devbathaniotpless/otpless-angular-demo";
break;
case "wordpress":
githubLink = "https://github.com/devbathaniotpless/otpless-wordpress-demo";
break;
case "shopify":
githubLink = "https://github.com/devbathaniotpless/otpless-shopify-demo";
break;
case "react js":
githubLink = "https://github.com/devbathaniotpless/otpless-reactjs-demo";
break;
default:
githubLink = "https://github.com";
}
return <CardGroup cols={2}>
<Card title="Validate ID Token" icon="shield-check" iconType="duotone" href={"/api-reference/endpoint/verifytoken/id-token-validate"}>
Learn how to securely `validate ID token` returned by OTPLESS {platform} SDK to ensure the {text} events from your backend server.
</Card>
<Card title="Validate Token (Opaque)" icon="shield-check" iconType="duotone" href={href}>
Learn how to securely `validate token` returned by OTPLESS {platform} SDK to ensure the {text} events from your backend server.
</Card>
</CardGroup>;
};

## Step 1: Add SDK Dependency

Add the OTPLESS SECURE SDK to your project by including the following script in the `<head>` section of your HTML document:

```javascript index.html theme={null}
<script
  id="otpless-secure-sdk"
  src="https://otpless.com/v3/secure.js"
  data-appid="YOUR_APP_ID"
></script>
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

## Step 2: Initialize SDK and Handle Callback

Initialize the SDK and set up a callback function to handle fingerprinting:

```javascript index.html theme={null}
<script>
  const callback = (callbackEvent) => {

    console.log({callbackEvent});

    // Implement your custom logic here.
  };
  // Initialize OTPLESS SECURE SDK with the defined callback.
  const OTPlessSecure = new OTPless(callback);
</script>
```

## Step 3: Initiate SDK

Use the `initiate` method of the SDK to start the fingerprinting process:

<CodeGroup>
  ```javascript Secure theme={null}
  const secureAuth = () => {
    OTPlessSecure.initiate();
  };
  ```
</CodeGroup>

## **🏁 Checkpoint**

To ensure a smooth integration process:

1. Deploy your app/website with the included OTPLESS SECURE SDK.
2. Conduct tests to verify the fingerprinting flow functions correctly.

### User Information Response Structure

The structure of the response returned upon successful fingerprinting as follows:

```json theme={null}
{
  "token": "unique_token_here"
}
```

## Next Steps

<SampleGithubContainer platform="javascript" text="fingerprinting" href="/api-reference/endpoint/verifytoken/get-secure-info" />
