> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Pre-Built UI

> Leverage our Pre-Built UI for rapid integration and customization of authentication flows in your application. This setup allows you to adjust appearance and functionality through the OTPLESS dashboard with minimal coding.

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

Add the OTPLESS SDK to your project by including the following script in the `<body>` section of your HTML document:

```javascript index.html theme={null}
<!-- Add this script to initiate otpless -->
<script
  data-appid="{YOUR_APP_ID}"
  src="https://otpless.com/v4/flutter.js"
  id="otpless-sdk"
  type="text/javascript"
  variant="HEADLESS"
></script>
```

<appid />

## Step 2: Initialize SDK and Handle Callback

Initialize the SDK and set up a callback function to handle authentication:

- Install OTPLESS SDK Dependency

```bash theme={null}
flutter pub add otpless_flutter_web:1.2.4
flutter pub get
```

- Import the following classes and declare variables:

```dart theme={null}
import 'package:otpless_flutter_web/otpless_flutter_web.dart';

// Add this code inside your class
final _otplessFlutterPlugin = Otpless();
```

- Add this code to your initState() method in your SignIn/SignUp page:

```dart login.dart theme={null}
@override
  void initState() {
    _otplessFlutterPlugin.headlessResponse().then((value) {
      print("responseData : $value");
    });
    super.initState();
}
```

## Step 3: Configure Sign up/Sign in

1. Import the OTPLESS `package` on your login page.

```dart login_page.dart theme={null}
import 'package:otpless_flutter/otpless_flutter.dart';
```

2. Add OTPLESS instance and declare the variable with `YOUR_APP_ID`

```dart login_page.dart theme={null}
final _otplessFlutterPlugin = Otpless();
var arg = {
    'appId': '{{YOUR_APP_ID}}',
};
```

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

3. Add the following code to Initiate OTPLESS Login Page

```dart login_page.dart theme={null}
_otplessFlutterPlugin.openLoginPage((result) {
    var message = "";
    if (result['data'] != null) {
        final token = result['response']['token'];
        message = "token: $token";
    } else {
        message = result['errorMessage'];
    }
}, arg);
```

## **🏁 Checkpoint**

To ensure a smooth integration process:

1. Deploy your app/website with the included OTPLESS SDK.
2. Conduct tests to verify the sign-in flow functions correctly.
3. Ensure that after a successful sign-in, the user is redirected back to your app/website and their information is correctly logged in the console.

### User Information Response Structure

The structure of the user information returned upon successful sign-in is as follows:

```json theme={null}
{
  "status": "SUCCESS",
  "token": "unique_token_here",
  "userId": "unique_user_id_here",
  "timestamp": "ISO_timestamp_here",
  "identities": [
    {
      "identityType": "EMAIL",
      "identityValue": "user@example.com",
      "channel": "OAUTH",
      "methods": ["GOOGLE"],
      "name": "User Name",
      "verified": true,
      "verifiedAt": "ISO_timestamp_here",
      "isCompanyEmail": "true"
    }
  ],
  "idToken": "jwt_token",
  "network": {
    "ip": "127.0.0.1",
    "timezone": "Asia/Kolkata",
    "ipLocation": {}
  },
  "deviceInfo": {},
  "sessionInfo": {},
  "firebaseInfo": {}
}
```

<Tip>
  You can check out a complete sample response [`here.`](https://otpless.com/docs/frontend-sdks/references/sample-response)
</Tip>

## Next Steps

<SampleGithubContainer platform="javascript" />
