> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

#### Custom Expiry

Headless request can be customized with custom expiry.

<CodeGroup>
  ```javascript js  theme={null}
  // in seconds
  OTPlessSignin.initiate({
              channel: 'PHONE',
              phone: "9999999999",
              countryCode: "+91",
              expiry: "60"
          })
  ```
</CodeGroup>

#### Custom OTP length

Headless request can be customized with custom OTP length 4 or 6.

<CodeGroup>
  ```javascript js theme={null}
  // only 4 or 6 
  OTPlessSignin.initiate({
              channel: 'PHONE',
              phone: "9999999999",
              countryCode: "+91",
              otpLength: 6
          })
  ```
</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with custom Delivery Channel like `WHATSAPP`, `SMS` and `VIBER`.

<CodeGroup>
  ```javascript js theme={null}
  // WHATSAPP,SMS and VIBER
   OTPlessSignin.initiate({
              channel: 'PHONE',
              phone: "9999999999",
              countryCode: "+91",
              deliveryChannel: "WHATSAPP"
          })
  ```
</CodeGroup>
