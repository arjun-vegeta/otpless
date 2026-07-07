> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

#### Custom Expiry

Headless request can be customized with custom expiry.

<CodeGroup>
  ```swift Swift theme={null}
  let headlessRequest = HeadlessRequest()
  headlessRequest.setPhoneNumber(number: "PHONE_NUMBER", withCountryCode: "COUNTRY_CODE")
  // in seconds
  headlessRequest.setExpiry(expiry: "60")
  Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
  ```
</CodeGroup>

#### Custom OTP length

Headless request can be customized with custom OTP length 4 or 6.

<CodeGroup>
  ```swift Swift theme={null}
  let headlessRequest = HeadlessRequest()
  headlessRequest.setPhoneNumber(number: "PHONE_NUMBER", withCountryCode: "COUNTRY_CODE")
  // only 4 or 6 
  headlessRequest.setOtpLength(otpLength: "6")
  Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
  ```
</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with custom Delivery Channel like `WHATSAPP`, `SMS` and `VIBER`.

<CodeGroup>
  ```swift Swift theme={null}
  let headlessRequest = HeadlessRequest()
  headlessRequest.setPhoneNumber(number: "PHONE_NUMBER", withCountryCode: "COUNTRY_CODE")
  // WHATSAPP,SMS and VIBER
  headlessRequest.setDeliveryChannel("WHATSAPP")
  Otpless.sharedInstance.startHeadless(headlessRequest: headlessRequest)
  ```
</CodeGroup>
