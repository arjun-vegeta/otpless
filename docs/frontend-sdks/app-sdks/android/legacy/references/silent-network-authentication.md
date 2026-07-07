> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrating Silent Network Authentication (SNA) in Android

## Implementation

- Make sure that **Silent Network Authentication** is enabled on the [OTPLESS dashboard](https://otpless.com/dashboard/customer/channels).
- Once you have **successfully integrated OTPLESS** Android SDK in your application, you only have to add the following line in your app's `AndroidManifest` file in the `<application>` tag:

<Tip>
  Learn more about [**Silent Network Authentication**](https://otpless.com/docs/knowledge-base/sna/sna-101).
</Tip>

<CodeGroup>
  ```xml AndroidManifest theme={null}
  android:networkSecurityConfig="@xml/otpless_network_security_config"
  ```
</CodeGroup>
