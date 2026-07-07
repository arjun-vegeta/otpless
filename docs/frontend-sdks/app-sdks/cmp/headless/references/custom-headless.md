> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

After successfully integrating Otpless SDK in your CMP App, you can set the following custom parameters:

#### Custom Expiry

Headless request can be customized with custom expiry.

<CodeGroup>
  ```kotlin Kotlin theme={null}
   val otplessCMPRequest = OtplessCMPRequest(
          phoneNumber = phoneNumber,
          countryCode = countryCode,
          otpExpiry = otpExpiry,
      )
  start(otplessCMPRequest)
  ```
</CodeGroup>

#### Custom OTP length

Headless request can be customized with custom OTP length 4 or 6.

<CodeGroup>
  ```kotlin Kotlin theme={null}
   val otplessCMPRequest = OtplessCMPRequest(
          phoneNumber = phoneNumber,
          countryCode = countryCode,
          otpLength = otpLength,
      )
  start(otplessCMPRequest)
  ```
</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with custom Delivery Channel like `WHATSAPP`, `SMS` and `VIBER`.

<CodeGroup>
  ```kotlin Kotlin theme={null}
   val otplessCMPRequest = OtplessCMPRequest(
          phoneNumber = phoneNumber,
          countryCode = countryCode,
          deliveryChannel = deliveryChannel,
      )
  start(otplessCMPRequest)
  ```
</CodeGroup>
