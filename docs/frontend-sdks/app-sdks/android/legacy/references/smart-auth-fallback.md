> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Smart Auth Fallback

### Smart Auth Fallback

For Smart Auth fallback, the system ensures maximum success in delivering authentication methods by activating fallback mechanisms when the primary channel encounters delivery issues. This process optimizes user conversion by automatically switching to alternative channels as configured on the dashboard.

<Tip>
  Learn more about [**Smart Auth**](https://otpless.com/docs/knowledge-base/smart-authentication).
</Tip>

<CodeGroup>
  ```java Java theme={null}
  private void onHeadlessCallback(@NonNull final HeadlessResponse response) {
      if (response.getStatusCode() == 200) {
          switch (response.getResponseType()) {
              case "FALLBACK_TRIGGERED":
                  // In case of Smart Auth when channel fallback triggered
                  final JSONObject fallbackResponse = response.getResponse();
                  break;
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
            "FALLBACK_TRIGGERED" -> {
                // In case of Smart Auth when channel fallback triggered
                val fallbackResponse = response.getResponse()
            }
        }
        val successResponse = response.response
    } else {
        // handle error
        val error = response.response?.optString("errorMessage")
    }
}
```

</CodeGroup>

### Multi-Channel Fallback Triggered Response

```json Response theme={null}
{
  "statusCode": "200",
  "responseType": "FALLBACK_TRIGGERED",
  "responseData": {
    "channel": "OTP/MOBILE_LOGIN/OTP_LINK/VOICE_CALL",
    "deliveryChannel": "WHATSAPP/SMS/VIBER/VOICE_CALL",
    "requestID": "538bfe617e5347bdac1c911b946c1520",
    "authType": "OTP/MOBILE_LOGIN/OTP_LINK/VOICE_CALL"
  }
}
```

- **`statusCode`**: `"200"` – The request was successful.
- **`responseType`**: `"FALLBACK_TRIGGERED"` – A fallback mechanism was triggered due to failure or timeout in the primary delivery attempt.
- **`responseData`**:
  - **`channel`**: `"OTP/MOBILE_LOGIN/OTP_LINK/VOICE_CALL"` – Multiple authentication methods were attempted.
  - **`deliveryChannel`**: `"WHATSAPP/SMS/VIBER/VOICE_CALL"` – Fallback will use one of these channels.
  - **`requestID`**: `"538bfe617e5347bdac1c911b946c1520"` – Unique identifier for the request.
  - **`authType`**: `"OTP/MOBILE_LOGIN/OTP_LINK/VOICE_CALL"` – Types of authentication methods involved.

This response ensures flexibility by falling back to alternative channels and methods for successful user authentication.
