> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

#### Custom Expiry

Headless request can be customized with custom expiry.

<CodeGroup>
  ```java Java theme={null}
  final HeadlessRequest request = new HeadlessRequest();
  request.setPhoneNumber("YOUR_COUNTRY_CODE","YOUR_PHONE_NUMBER");
  // in seconds
  request.setExpiry(60);
  otplessView.startHeadless(request, this::onHeadlessCallback);
  ```

```kotlin Kotlin theme={null}
val request = HeadlessRequest()
request.setPhoneNumber("YOUR_COUNTRY_CODE", "YOUR_PHONE_NUMBER")
// in seconds
request.setExpiry(60);
otplessView.startHeadless(request, this::onHeadlessCallback)
```

</CodeGroup>

#### Custom OTP length

Headless request can be customized with custom OTP length 4 or 6.

<CodeGroup>
  ```java Java theme={null}
  final HeadlessRequest request = new HeadlessRequest();
  request.setPhoneNumber("YOUR_COUNTRY_CODE","YOUR_PHONE_NUMBER");
  // only 4 or 6 
  request.setOtpLength(6)
  otplessView.startHeadless(request, this::onHeadlessCallback);
  ```

```kotlin Kotlin theme={null}
val request = HeadlessRequest()
request.setPhoneNumber("YOUR_COUNTRY_CODE", "YOUR_PHONE_NUMBER")
// only 4 or 6
request.setOtpLength(6)
otplessView.startHeadless(request, this::onHeadlessCallback)
```

</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with custom Delivery Channel like `WHATSAPP`, `SMS` and `VIBER`.

<CodeGroup>
  ```java Java theme={null}
  final HeadlessRequest request = new HeadlessRequest();
  request.setPhoneNumber("YOUR_COUNTRY_CODE","YOUR_PHONE_NUMBER");
  // WHATSAPP,SMS and VIBER
  request.setDeliveryChannel(OtpDeliveryChannel.WHATSAPP);
  otplessView.startHeadless(request, this::onHeadlessCallback);
  ```

```kotlin Kotlin theme={null}
val request = HeadlessRequest()
request.setPhoneNumber("YOUR_COUNTRY_CODE", "YOUR_PHONE_NUMBER")
// WHATSAPP,SMS and VIBER
request.setDeliveryChannel(OtpDeliveryChannel.WHATSAPP)
otplessView.startHeadless(request, this::onHeadlessCallback)
```

</CodeGroup>
