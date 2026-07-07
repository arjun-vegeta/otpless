> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

#### Custom Expiry

Headless request can be customized with custom expiry.

<CodeGroup>
  ```kotlin Kotlin theme={null}
  val otplessRequest = OtplessRequest()
  otplessRequest.setPhoneNumber(number = "YOUR_PHONE_NUMBER", countryCode = "YOUR_COUNTRY_CODE")
  // in seconds
  otplessRequest.setExpiry("60");
  lifecycleScope.launch {
      OtplessSDK.start(request = otplessRequest, callback = ::onOtplessResponse)
  }
  ```

```java Java theme={null}
final OtplessRequest otplessRequest = new OtplessRequest();
otplessRequest.setPhoneNumber("YOUR_PHONE_NUMBER", "YOUR_COUNTRY_CODE");
// In seconds
otplessRequest.setExpiry("60");
OtplessSDK.INSTANCE.startAsync(otplessRequest, this::onOtplessResponse);
```

</CodeGroup>

#### Custom OTP length

Headless request can be customized with custom OTP length 4 or 6.

<CodeGroup>
  ```kotlin Kotlin theme={null}
  val otplessRequest = OtplessRequest()
  otplessRequest.setPhoneNumber(number = "YOUR_PHONE_NUMBER", countryCode = "YOUR_COUNTRY_CODE")
  // only 4 or 6 
  otplessRequest.setOtpLength("6")
  lifecycleScope.launch {
      OtplessSDK.start(request = otplessRequest, callback = ::onOtplessResponse)
  }
  ```

```java Java theme={null}
final OtplessRequest otplessRequest = new OtplessRequest();
otplessRequest.setPhoneNumber("YOUR_PHONE_NUMBER", "YOUR_COUNTRY_CODE");
// Only 4 or 6
otplessRequest.setOtpLength("6");
OtplessSDK.INSTANCE.startAsync(otplessRequest, this::onOtplessResponse);
```

</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with custom Delivery Channel like `WHATSAPP`, `SMS` and `VIBER`.

<CodeGroup>
  ```kotlin Kotlin theme={null}
  val request = OtplessRequest()
  otplessRequest.setPhoneNumber(number = "YOUR_PHONE_NUMBER", countryCode = "YOUR_COUNTRY_CODE")
  // WHATSAPP,SMS and VIBER
  otplessRequest.setDeliveryChannel("WHATSAPP")
  lifecycleScope.launch {
      OtplessSDK.start(request = otplessRequest, callback = ::onOtplessResponse)
  }
  ```

```java Java theme={null}
final OtplessRequest request = new OtplessRequest();
request.setPhoneNumber("YOUR_PHONE_NUMBER", "YOUR_COUNTRY_CODE");
// WHATSAPP, SMS, and VIBER
request.setDeliveryChannel("WHATSAPP");
OtplessSDK.INSTANCE.startAsync(request, this::onOtplessResponse);
```

</CodeGroup>
