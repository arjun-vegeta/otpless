> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Phone Hint API

### Initiate Google Phone Hint API for Phone Number Suggestion

The Google Phone Hint API suggests phone numbers stored on the user’s device, prompting them to choose one. If selected, the number can be applied to the input field, reducing manual entry and errors. OTPless offers this feature for a seamless phone number entry process during authentication or registration.

Use the following code snippet to integrate Google Phone Hint API in your Ionic application

<CodeGroup>
  ```javascript Javascript theme={null}
  let manager = new OtplessManager();

try {
let response = await manager.showPhoneHintLib(true);
if (response.phoneNumber) {
// Handle phone number
} else if (response.error) {
// Handle error
}
} catch (error) {
console.error("Failed to get phone hint:", error);
}

```
</CodeGroup>
```
