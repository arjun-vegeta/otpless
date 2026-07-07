> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

After successfully integrating the OTPLESS Flutter Headless SDK, you can set the following custom parameters:

#### Custom Expiry

Headless request can be customized with a custom expiry.

<CodeGroup>
  ```dart Dart theme={null}
  final Map<String, dynamic> headlessRequest = {
    "phone": "phoneNumber",
    "countryCode": "countryCode",
    "expiry": "expiryInSeconds", // e.g., 300 for 5 minutes
  };

_otplessHeadlessPlugin.start(headlessRequest);

````
</CodeGroup>

#### Custom OTP length

Headless request can be customized with OTP length — either 4 or 6.

<CodeGroup>
```dart Dart theme={null}
final Map<String, dynamic> headlessRequest = {
  "phone": "phoneNumber",
  "countryCode": "countryCode",
  "otpLength": "otpLength", // 4 or 6
};

_otplessHeadlessPlugin.start(headlessRequest);
````

</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with a preferred delivery channel like `WHATSAPP`, `SMS`, or `VIBER`.

<CodeGroup>
  ```dart Dart theme={null}
  final Map<String, dynamic> headlessRequest = {
    "phone": "phoneNumber",
    "countryCode": "countryCode",
    "deliveryChannel": "deliveryChannel", // "WHATSAPP", "SMS", or "VIBER"
  };

_otplessHeadlessPlugin.start(headlessRequest);

```
</CodeGroup>
```
