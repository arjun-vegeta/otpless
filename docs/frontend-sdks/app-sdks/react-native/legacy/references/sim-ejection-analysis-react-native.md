> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sim Ejection Analysis

> After successfully integrating OTPless, you can leverage our SDK to monitor and retrieve SIM ejection events from users' devices. This feature allows you to gather data on SIM ejection events for security and analysis purposes. The SDK provides two approaches for accessing SIM ejection data.

## Getting SIM Ejection Data

Each SIM ejection event contains the following properties:

- `state`: The state of the SIM card, which can be one of the following:
  - `LOADED`: The SIM card is loaded and ready to use.
  - `READY`: The SIM card is in a ready state.
  - `ABSENT`: The SIM card has been removed.
  - `CARD_IO_ERROR`: There was an error reading the SIM card.

- `transactionTime`: The timestamp when the `state` was recorded.

### 1. Set SIM status change listener

You can fetch a list of SIM ejection events that occurred on the user's device by directly querying the OTPless SDK. This method is ideal for reviewing historical and latest data.

#### Usage Example:

<CodeGroup>
  ```javascript Javascript theme={null}
  // Instantiate `OtplessSimUtils`
  const otplessSimUtils = OtplessSimUtils.getInstance();

otplessSimUtils.setupSimStatusChangeListener(handleSimStatusChange);

const handleSimStatusChange = (simEntries: any[]) => {
console.log('Received SIM status changes:', simEntries);
};

````
</CodeGroup>

### 2. Clear SIM status change listener

To clear the listener when it is no longer needed, call:

<CodeGroup>
```javascript Javascript theme={null}
otplessSimUtils.detachSimEjectionListener();
````

</CodeGroup>

### 3. Query historical SIM ejection entries

To fetch past sim ejection entries, use the following code:

<CodeGroup>
  ```javascript Javascript theme={null}
  try {
      const entries = await otplessSimUtils.getEjectedSimsEntries();
      console.log("Ejected SIM Entries:", entries);
  } catch (error) {
      let errorStr = "Error fetching ejected SIM entries: " + error;
      console.log(errorStr)
  }
  ```
</CodeGroup>
