> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Headless

> Utilize our Headless SDK for ultimate flexibility. Craft your own tailored UI and seamlessly integrate OTPLESS authentication capabilities using our SDK.

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

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>

## Step 2: Initialize SDK and Handle Callback

Initialize the SDK and set up a callback function to handle authentication:

- Install OTPLESS SDK Dependency

```bash theme={null}
flutter pub add otpless_flutter_web:1.2.6
flutter pub get
```

- Import the following classes and declare variables:

```dart login_page.dart theme={null}
import 'package:otpless_flutter_web/otpless_flutter_web.dart';

// Add this code inside your class
final _otplessFlutterPlugin = Otpless();
```

- Add a method to receive callbacks from OTPless:

```dart login_page.dart theme={null}
void onHeadlessResult(result) {
    // Parse the result JSON string into a Map
    Map<String, dynamic> parsedResult = jsonDecode(result);

    switch (parsedResult['responseType'] as String) {
      case "INITIATE":
        {
          print("INITIATE  ${parsedResult["response"]}");
          responseData = parsedResult.toString();
          setState(() {});
          break;
        }
      case "FALLBACK_TRIGGERED":
        {
          print("FALLBACK_TRIGGERED  ${parsedResult["response"]}");
          responseData = parsedResult.toString();
          setState(() {});
          break;
        }

      case "VERIFY":
        {
          print("VERIFY  ${parsedResult["response"]}");
          responseData = parsedResult.toString();
          setState(() {});
          break;
        }

      case 'ONETAP':
        {
          print("ONETAP  ${parsedResult["response"]}");
          responseData = parsedResult.toString();
          setState(() {});
        }
    }
  }

```

- Add this code to your `initState()` method in your SignIn/SignUp page:

```dart login.dart theme={null}
@override
void initState() {
  _otplessFlutterPlugin.headlessRespons(onHeadlessResult);
  super.initState();
}
```

## Step 3: Initiate Authentication

Initiate the authentication process based on the user's selected method by using the `initiate` method of the SDK.

<Tabs>
  <Tab title="Phone Auth">
    <CodeGroup>
      ```dart Request theme={null}
      Map<String, dynamic> arg = {};
      arg["phone"] = "YOUR_PHONE_NUMBER";
      arg["countryCode"] = "YOUR_COUNTRY_CODE";
      _otplessFlutterPlugin.initiatePhoneAuth(onHeadlessResult, arg);
      ```

      ```json Response theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "channel": "PHONE",
          "deliveryChannel": "WHATSAPP",
          "authType": "OTP",
          "requestId": "xxxxxxxxxxxxxxxx"
        }
      }
      ```
    </CodeGroup>

    ### (Optional): Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters.

    <CodeGroup>
      ```dart Request theme={null}
      Map<String, dynamic> arg = {};
      arg["phone"] = "YOUR_PHONE_NUMBER";
      arg["countryCode"] = "YOUR_COUNTRY_CODE";
      arg["otp"] = "YOUR_COUNTRY_CODE";
      _otplessFlutterPlugin.verifyAuth(onHeadlessResult, arg);
      ```

      ```json Response theme={null}
        {
            "statusCode": 200,
            "success": true,
            "response": {
                "verification": "COMPLETED",
                "requestId": "xxxxxxxxxxxxxxxx",
                "channel": "PHONE"
            }
        }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="Email Auth">
    <CodeGroup>
      ```dart Request theme={null}
      Map<String, dynamic> arg = {};
      arg["email"] = "YOUR_EMAIL_ID";
      _otplessFlutterPlugin.initiateEmailAuth(onHeadlessResult, arg);
      ```

      ```json Response theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "channel": "EMAIL",
          "deliveryChannel": "EMAIL",
          "authType": "OTP",
          "requestId": "xxxxxxxxxxxxxxxx"
        }
      }
      ```
    </CodeGroup>

    ### (Optional): Verify OTP

    To verify the OTP entered by the user, use the `verify` method with the necessary parameters.

    <CodeGroup>
      ```dart Request theme={null}
      Map<String, dynamic> arg = {};
      arg["email"] = "YOUR_EMAIL_ID";
      arg["otp"] = "YOUR_EMAIL_ID";
      _otplessFlutterPlugin.verifyAuth(onHeadlessResult, arg);
      ```

      ```json Response theme={null}
        {
            "statusCode": 200,
            "success": true,
            "response": {
                "verification": "COMPLETED",
                "requestId": "xxxxxxxxxxxxxxxx",
                "channel": "EMAIL"
            }
        }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="OAUTH">
    <CodeGroup>
      ```dart Request theme={null}
      Map<String, dynamic> arg = {'channelType': "WHATSAPP"};
      _otplessFlutterPlugin.initiateOAuth(onHeadlessResult, channelType);
      ```

      ```json Response theme={null}
      {
        "statusCode": 200,
        "success": true,
        "response": {
          "channel": "OAUTH",
          "channelType": "WHATSAPP",
          "requestId": "xxxxxxxxxxxxxxxx"
        }
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>

**Object Attributes**

<Tabs>
  <Tab title="Request">
    | Attribute     | Mandatory   | Description                                                      |
    | ------------- | ----------- | ---------------------------------------------------------------- |
    | `channel`     | Yes         | The authentication method selected by the user.                  |
    | `phone`       | Conditional | User's phone number (required if channel is PHONE).              |
    | `countryCode` | Conditional | Country code of the phone number (required if channel is PHONE). |
    | `email`       | Conditional | User's email (required if channel is EMAIL).                     |
    | `channelType` | Conditional | Type of social login initiated (required if channel is OAUTH).   |
  </Tab>

  <Tab title="Response">
    | Attribute    | Mandatory | Description                                                        |
    | ------------ | --------- | ------------------------------------------------------------------ |
    | `statusCode` | Yes       | Outcome of the request. 2xx for success, 4xx and 5xx for failures. |
    | `success`    | Yes       | Boolean flag indicating request success.                           |
    | `response`   | Yes       | Detailed response JSON containing the response details.            |
  </Tab>

  <Tab title="Error Codes">
    | StatusCode | ErrorMessage                                       | Short Description                                                     |
    | ---------- | -------------------------------------------------- | --------------------------------------------------------------------- |
    | `401`      | Unauthorized request! Please check your appId      | Suggests missing or invalid app ID for authorization.                 |
    | `500`      | API\_ERROR                                         | Indicates a server-side error, possibly due to parameter issues.      |
    | `4000`     | The request values are incorrect, see details.     | Points to incorrect request values; refer to details for corrections. |
    | `4001`     | OTPless headless SDK doesn't support 2FA as of now | Indicates the lack of 2FA support in the SDK.                         |
    | `4002`     | The request parameters are incorrect, see details. | Suggests parameter errors; check details for specifics.               |
    | `4003`     | The request channel is incorrect, see details.     | Notes an incorrect request channel; see details for correct usage.    |
    | `5002`     | No internet connection is present.                 | Indicates no internet connection, troubleshoot network and device.    |
  </Tab>
</Tabs>

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

<SampleGithubContainer platform="flutter" />
