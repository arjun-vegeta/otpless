> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Phone Hint

### Initiate Google Phone Hint API for Phone Number Suggestion

The Google Phone Hint API suggests phone numbers stored on the user’s device, prompting them to choose one. If selected, the number can be applied to the input field, reducing manual entry and errors. OTPless offers this feature for a seamless phone number entry process during authentication or registration.

#### Select the event to trigger the Phone Hint API.

<Tabs>
  <Tab title="Inside OnCreate()">
    <CodeGroup>
      ```java Java theme={null}
      otplessView.getPhoneHintManager().registerInOnCreate(this);
      otplessView.getPhoneHintManager().showPhoneNumberHint(true, result -> {
                          if (result.getSecond() != null) {
                              Exception error = result.getSecond();
                          } else {
                              // here you will receive the phone number after user selection
                              final String phone = result.getFirst();
                          }
                          return null;
                      }
              );
      ```

      ```kotlin Kotlin theme={null}
      otplessView.phoneHintManager.registerInOnCreate(this)
      otplessView.phoneHintManager.showPhoneNumberHint(true) {
          if (it.second != null) {
              val error = it.second!!
          } else {
              // here you will receive the phone number after user selection
              val phone = it.first!!
          }
      }
      ```
    </CodeGroup>

  </Tab>

  <Tab title="On Event(button click, focus change and custom events)">
    <CodeGroup>
      ```java Java theme={null}
      otplessView.getPhoneHintManager().showPhoneNumberHint(true, result -> {
                          if (result.getSecond() != null) {
                              Exception error = result.getSecond();
                          } else {
                              // here you will receive the phone number after user selection
                              final String phone = result.getFirst();
                          }
                          return null;
                      }
              );
      ```

      ```kotlin Kotlin theme={null}
      otplessView.phoneHintManager.showPhoneNumberHint(true) {
          if (it.second != null) {
              val error = it.second!!
          } else {
              // here you will receive the phone number after user selection
              val phone = it.first!!
          }
      }
      ```
    </CodeGroup>

  </Tab>
</Tabs>
