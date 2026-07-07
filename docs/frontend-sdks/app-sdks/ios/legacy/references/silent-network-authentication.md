> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrating Silent Network Authentication (SNA) in iOS

## Implementation

- Make sure that **Silent Network Authentication** is enabled on the [OTPLESS dashboard](https://otpless.com/dashboard/customer/channels).
- Once you have **successfully integrated OTPLESS** iOS SDK in your application, you only have to add the following line in your app's `info.plist`:

<Tip>
  Learn more about [**Silent Network Authentication**](https://otpless.com/docs/knowledge-base/sna/sna-101).
</Tip>

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
