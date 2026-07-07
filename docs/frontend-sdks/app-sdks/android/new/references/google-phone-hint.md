> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Phone Hint

### Initiate Google Phone Hint API for Phone Number Suggestion

The Google Phone Hint API suggests phone numbers stored on the user’s device, prompting them to choose one. If selected, the number can be applied to the input field, reducing manual entry and errors. OTPless offers this feature for a seamless phone number entry process during authentication or registration.

### Register `OtplessPhoneHint` in the `onCreate()` of your `Activity.kt` file.

<CodeGroup>
  ```kotlin Kotlin theme={null}
  import com.otpless.v2.android.sdk.main.OtplessPhoneHint;

OtplessPhoneHint.register(this)

````

```java Java theme={null}
import com.otpless.v2.android.sdk.main.OtplessPhoneHint;

OtplessPhoneHint.INSTANCE.register(this);
````

</CodeGroup>

### Call the `show()` method of `OtplessPhoneHint` whenever required.

<CodeGroup>
  ```kotlin Kotlin theme={null}
  import com.otpless.v2.android.sdk.main.OtplessPhoneHint

OtplessPhoneHint.show(activity) { phoneHintResponse ->
if (!phoneHintResponse.phoneNumber.isNullOrBlank()) {
// Use phone number
} else {
// Handle error:
val errorMessage = phoneHintResponse.error
}
}

````

```java Java theme={null}
import com.otpless.v2.android.sdk.main.OtplessPhoneHint;

OtplessPhoneHint.INSTANCE.show(activity, phoneHintResponse -> {
    if (phoneHintResponse.getPhoneNumber() != null && !phoneHintResponse.getPhoneNumber().isEmpty()) {
        // Use phone number
    } else {
        // Handle error
        String errorMessage = phoneHintResponse.getError();
    }
});

````

</CodeGroup>
