> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OTP Auto Read

### Get Auto Read OTP

For WhatsApp and SMS, you can auto-read the OTP if the user's WhatsApp account or SIM is on the same device. You will get the OTP in the HeadlessResponse itself with `OTP_AUTO_READ` responseType.

<CodeGroup>
  ```java Java theme={null}
  private void onHeadlessCallback(@NonNull final HeadlessResponse response) {
      if (response.getStatusCode() == 200) {
          switch (response.getResponseType()) {
              case "OTP_AUTO_READ":
                  // Automatically read OTP from the message inbox SMS or WhatsApp
                  final String otp = response.getResponse().optString("otp");
                  // Pre fill the OTP and call the verify OTP function automatically
                  break;
              // other cases...
          }
          JSONObject successResponse = response.getResponse();
      } else {
          // Handle error
          String error = response.getResponse().optString("errorMessage");
      }
  }
  ```

```kotlin Kotlin theme={null}
private fun onHeadlessCallback(response: HeadlessResponse) {
    if (response.statusCode == 200) {
        when (response.responseType) {
            "OTP_AUTO_READ" -> {
                // Automatically read OTP from the message inbox SMS or WhatsApp
                val otp = response.response?.optString("otp")
                // Pre fill the OTP and call the verify OTP function automatically
            }
            // other cases...
        }
        val successResponse = response.response
    } else {
        // handle error
        val error = response.response?.optString("errorMessage")
    }
}
```

</CodeGroup>

<Note>Ensure your app package name and app hash are whitelisted with the Auto Read Template for both SMS and WhatsApp. [Know more](/knowledge-base/auto-read-otp)</Note>
