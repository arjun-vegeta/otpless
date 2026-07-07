> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Persistent device identification and real-time risk profiling.

Device Fingerprint gives every device a stable identifier and a risk score — without relying on cookies, advertising IDs, or any user-visible prompt. The SDK runs passively in the background, collecting device signals and returning a `deviceId`, a `riskScore`, and the specific signals that contributed to the score.

## Persistent device ID

Unlike advertising IDs or cookie-based identifiers, the OTPless device ID is engineered to survive events that normally reset tracking:

- App reinstalls
- Factory resets
- OS updates
- Advertising ID resets

This means you can recognise a returning device even when a user creates a new account, allowing you to correlate suspicious behaviour across sessions and identities.

## Risk score

Every call to `getDeviceIntelligence()` returns a risk score from 0 to 100.

| Score range | Interpretation                                       |
| ----------- | ---------------------------------------------------- |
| 0–30        | Low risk — proceed normally                          |
| 31–70       | Elevated risk — consider step-up verification        |
| 71–100      | High risk — block or require additional verification |

These thresholds are a starting point. Set your own cut-offs based on the sensitivity of the action being performed.

## Risk signals

The risk score is derived from a set of device signals. Signals are returned server-side only — they are not included in the client response.

| Signal              | What it indicates                                    |
| ------------------- | ---------------------------------------------------- |
| VPN active          | Traffic is routed through a VPN                      |
| Proxy detected      | Device is behind a proxy                             |
| Emulator            | Running on an emulated device, not physical hardware |
| Rooted / jailbroken | OS security model has been compromised               |
| SIM absent          | No SIM card present in the device                    |
| Cloned device       | Device identity has been duplicated                  |
| Remote access tool  | AnyDesk, TeamViewer, or similar tool is active       |
| Tampered            | App binary has been modified                         |

## How to act on the score

<Columns cols={3}>
  <Card title="Allow" icon="check">
    Low score — no unusual signals. Continue the user's session without interruption.
  </Card>

  <Card title="Step-up" icon="shield-check">
    Elevated score — require an additional verification factor before allowing a sensitive action.
  </Card>

  <Card title="Block" icon="ban">
    High score or critical signal (e.g. emulator, tampered) — deny the request and surface an appropriate error.
  </Card>
</Columns>

## When to use it

- **Account creation** — flag devices with high risk scores before an account is created
- **Login** — identify repeat offenders across account resets
- **Transactions** — add a device-level check before fund transfers or profile changes
- **Abuse prevention** — detect emulators used in bulk account creation or credential stuffing

## Platform support

| Platform     | Status      |
| ------------ | ----------- |
| Android      | Available   |
| iOS          | Coming soon |
| Web          | Coming soon |
| React Native | Coming soon |
| Flutter      | Coming soon |
| Ionic        | Coming soon |

<Note>
  Risk signals are served server-side only. Your backend receives the full signal set; the client response includes only `deviceId` and `riskScore`.
</Note>

## Integration

Native SDK for Android and iOS — passive, no login widget, no Pre-Built UI or Headless split.

<Columns cols={2}>
  <Card title="Android SDK" icon="smartphone" href="/device-fingerprint/sdk/android">
    Add Device Fingerprint to your Android app.
  </Card>
</Columns>
