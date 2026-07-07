> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

After successfully integrating OTPLESS Flutter headless SDK, you can set the following custom parameters:

#### Custom Expiry

Headless request can be customized with custom expiry.

<CodeGroup>
  ```dart Dart theme={null}
  Map<String, dynamic> arg = {};
  arg["phone"] = phoneNumber;
  arg["countryCode"] = countryCode;
  // Set expiry in seconds
  arg["expiry"] = expiry;
  _otplessFlutterPlugin.startHeadless(onHeadlessResult, arg);
  ```
</CodeGroup>

#### Custom OTP length

Headless request can be customized with custom OTP length 4 or 6.

<CodeGroup>
  ```dart Dart theme={null}
  Map<String, dynamic> arg = {};
  arg["phone"] = phoneNumber;
  arg["countryCode"] = countryCode;
  // Either 4 or 6
  arg["otpLength"] = otpLength;
  _otplessFlutterPlugin.startHeadless(onHeadlessResult, arg);
  ```
</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with custom Delivery Channel like `WHATSAPP`, `SMS` and `VIBER`.

<CodeGroup>
  ```dart Dart theme={null}
  Map<String, dynamic> arg = {};
  arg["phone"] = phoneNumber;
  arg["countryCode"] = countryCode;
  // WHATSAPP,SMS and VIBER
  arg["deliveryChannel"] = deliveryChannel;
  _otplessFlutterPlugin.startHeadless(onHeadlessResult, arg);
  ```
</CodeGroup>
