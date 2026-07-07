> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headless Request

Using the **Headless SDK**, requests can be easily customized to set a specific **expiry**, adjust the **OTP length**, and select a preferred **delivery channel** such as **WhatsApp**, **SMS**, or **Viber** for phone number authentication.

After successfully integrating OTPLESS React Native headless SDK, you can set the following custom parameters:

#### Custom Expiry

Headless request can be customized with custom expiry.

<CodeGroup>
  ```javascript Javascript theme={null}
  let headlessRequest: any = {};
  // Set expiry in seconds
  if (phoneNumber) {
      headlessRequest = {
          phone: phoneNumber,
          countryCode: countryCode,
          expiry: expiry
      };
  }

headlessModule.start(request);

````
</CodeGroup>

#### Custom OTP length

Headless request can be customized with custom OTP length 4 or 6.

<CodeGroup>
```javascript Javascript theme={null}
let headlessRequest: any = {};
// Either 4 or 6
if (phoneNumber) {
    headlessRequest = {
        phone: phoneNumber,
        countryCode: countryCode,
        otpLength: otpLength
    };
}
headlessModule.start(request);
````

</CodeGroup>

#### Custom Delivery Channel

Headless request can be customized with custom Delivery Channel like `WHATSAPP`, `SMS` and `VIBER`.

<CodeGroup>
  ```javascript Javascript theme={null}
  let headlessRequest: any = {};
  // WHATSAPP,SMS and VIBER
  if (phoneNumber) {
      headlessRequest = {
          phone: phoneNumber,
          countryCode: countryCode,
          deliveryChannel: deliveryChannel
      };
  }
  headlessModule.start(request);
  ```
</CodeGroup>
