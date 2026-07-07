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

### 1. Query Historical SIM Ejection Entries

You can fetch a list of SIM ejection events that occurred on the user's device by directly querying the OTPless SDK. This method is ideal for reviewing historical and latest data.

#### Usage Example:

<CodeGroup>
  ```java Java theme={null}
  final List<SimStateEntry> simStateEntries = OtplessSimStateReceiverApi.INSTANCE.savedEjectedSimEntries(context);
  ```

```kotlin Kotlin theme={null}
val simEntries = OtplessSimStateReceiverApi.savedEjectedSimEntries(context)
```

</CodeGroup>

### 2. Subscribing to SIM Ejection Events

You can subscribe to a listener that notifies your app whenever the state of the SIM card changes while it is active. This enables your application to respond promptly to state changes in real-time.

#### Usage Example:

<CodeGroup>
  ```java Java theme={null}
  OtplessSimStateReceiverApi.INSTANCE.setSimStateChangeListener(simStateEntries -> {
      // todo with sim state change data
      return null;
  });
  ```

```kotlin Kotlin theme={null}
OtplessSecureManager.simStateChangeCallback = { it: List<SimStateEntry> ->
    // todo with sim state change data
}
```

</CodeGroup>
