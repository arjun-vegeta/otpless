> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OTP Auto Read

### Get Auto Read OTP

For SMS, you can auto-read the OTP if the user's SIM is on the same device. You will get the OTP in the HeadlessResponse itself with `OTP_AUTO_READ` responseType.

```javascript theme={null}
const callback = (eventCallback) => {
  console.log({
    eventCallback,
  });
  const OTP_AUTO_READ = () => {
    const {
      response: { otp },
    } = eventCallback;
    // Auto-read OTP value
    //console.log(otp);
  };
  const EVENTS_MAP = {
    OTP_AUTO_READ,
  };
  if ('responseType' in eventCallback) EVENTS_MAP[eventCallback.responseType]();
};
```
