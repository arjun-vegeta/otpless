> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrating Silent Network Authentication (SNA) in Ionic

## What is SNA?

Silent Network Authentication (SNA) is an authentication process that utilizes the user's mobile network details to verify their identity seamlessly. It's conducted in the background, providing a frictionless user experience by leveraging the user's phone network without requiring any user interaction.

## Why SNA?

- **Frictionless Experience**: Users are authenticated without any action required on their part, improving the user experience significantly.
- **Enhanced Security**: Leverages network-based factors, making it more secure against common threats like phishing or credential exploitation.
- **Higher Conversion Rates**: Reduces abandonment rates during the sign-in or sign-up process, as users are not deterred by complex authentication steps.

## How it works?

SNA works by checking if the user's device can be authenticated through their telecom provider without user interaction. If the automatic check fails, it falls back to alternative methods like WhatsApp, SMS, or Viber based on predetermined configurations.

## Implementation

- Make sure that **Silent Network Authentication** is enabled on the [OTPLESS dashboard](https://otpless.com/dashboard/customer/channels).

<Tabs>
  <Tab title="Android">
    - Once you have **successfully integrated OTPLESS** Ionic SDK in your application, you only have to add the following line in your app's `AndroidManifest` file in the `<application>` tag:

    <CodeGroup>
      ```xml AndroidManifest theme={null}
      android:networkSecurityConfig="@xml/otpless_network_security_config"
      ```
    </CodeGroup>

  </Tab>

  <Tab title="iOS">
    * Once you have **successfully integrated OTPLESS** Ionic SDK in your application, you only have to add the following line in your app's `info.plist` file:

    <CodeGroup>
      ```xml info.plist theme={null}
      	<key>NSAllowsArbitraryLoads</key>
      	<true/>
      	<key>NSExceptionDomains</key>
      	<dict>
      		<key>80.in.safr.sekuramobile.com</key>
      		<dict>
      			<key>NSIncludesSubdomains</key>
      			<true/>
      			<key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
      			<true/>
      			<key>NSTemporaryExceptionMinimumTLSVersion</key>
      			<string>TLSv1.1</string>
      		</dict>
      		<key>partnerapi.jio.com</key>
      		<dict>
      			<key>NSIncludesSubdomains</key>
      			<true/>
      			<key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
      			<true/>
      			<key>NSTemporaryExceptionMinimumTLSVersion</key>
      			<string>TLSv1.1</string>
      		</dict>
      	</dict>
      ```
    </CodeGroup>

  </Tab>
</Tabs>
