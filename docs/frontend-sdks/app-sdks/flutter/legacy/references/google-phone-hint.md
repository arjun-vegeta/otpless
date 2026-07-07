> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Phone Hint API

### Initiate Google Phone Hint API for Phone Number Suggestion

The Google Phone Hint API suggests phone numbers stored on the user’s device, prompting them to choose one. If selected, the number can be applied to the input field, reducing manual entry and errors. OTPless offers this feature for a seamless phone number entry process during authentication or registration.

Use the following code snippet to integrate Google Phone Hint API in your Flutter application

<CodeGroup>
  ```dart Dart theme={null}
  final _otplessFlutterPlugin = Otpless();

final result = await _otplessFlutterPlugin.showPhoneHint(true);
if (result["phoneNumber"] != null) {
print(result["phoneNumber"]!);
} else {
print(result["error"]!);
}

```
</CodeGroup>
```
