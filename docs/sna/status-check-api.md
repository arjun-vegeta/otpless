> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Status Check API

> Poll the current auth status for a requestId. Returns the SNA auth factor plus phone, SIM, network, and device-fingerprinting detail when available.

The Status Check API is the **authoritative source of truth** for the SNA-only flow. Your backend polls it with the `requestId` (ARID token) from the [Create API](/sna/create-api) to determine the final auth outcome. Poll until the `PRIMARY` factor reaches a terminal status (`SUCCESS` or `FAILED`).

<Warning>
  This is a **server-to-server** call. It requires your `clientId` and `clientSecret` headers. Confirm a successful login based on this response — not on the SDK callback alone.
</Warning>

<Note>
  The `deviceFingerprinting` block is enriched **only if the OTPless Device Intelligence SDK is imported and initialized** in your client app. If it isn't, the field is omitted from the response — the rest of the auth status is unaffected.
</Note>

<Accordion title="Interpreting the result">
  For an SNA-only flow, read the `PRIMARY` factor's `status` in `auths[]`:

| `auths[].status` | Meaning                                                                                    | Action                                        |
| ---------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `PENDING`        | SNA is still in progress — the carrier verification callback has not yet been received.    | Keep polling.                                 |
| `SUCCESS`        | Carrier verification completed and the SIM was verified. `verifiedTimestamp` is populated. | Log the user in and proceed with the journey. |
| `FAILED`         | SNA could not be completed. An `error` object with `errorCode` and `message` is present.   | Trigger an OTP fallback / retry flow.         |

Before auth is initialized you may receive an **HTTP 400** with `errorCode` `7170` ("Auth not started yet"). This is **not** terminal — if auth has been initiated, keep polling. A `7119` ("Invalid request Id") means the `requestId` is malformed.

Poll until the `PRIMARY` factor reaches a terminal status (`SUCCESS` or `FAILED`), or until the request expires — the `expiry` you set in the [Create API](/sna/create-api) bounds the request's validity.
</Accordion>

## SNA verification error codes

When `auths[].status` is `FAILED`, inspect `auths[].error.errorCode` to determine the failure and your fallback. See the full [API Error Codes](/sna/api-error-codes) reference for the complete list of `SP*` codes and their messages.

## Polling guidance

Begin polling after initiating SNA on the client. Recommended strategy:

| Parameter        | Recommended value                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| Interval         | 1 – 2 seconds                                                                                            |
| Terminal states  | `SUCCESS` or `FAILED` — stop polling immediately.                                                        |
| Timeout fallback | If still `PENDING` after your max attempts (bounded by `expiry`), treat as timeout and fall back to OTP. |

<Note>
  An HTTP 400 with `errorCode` `7170` is transient — it can appear briefly before auth initializes. Keep polling if auth was initiated; only `7119` indicates a malformed `requestId`.
</Note>

## OpenAPI

```yaml GET /auth/v2/status
openapi: 3.0.3
info:
  title: OTPless SNA SDK APIs
  description: >
    Server-to-server APIs for the SNA-only SDK authentication flow.


    - **Create** — register a user's identity (phone number) and obtain a
    `requestId`. Pass this `requestId` to the SDK on the client to perform
    authentication.

    - **Status Check** — poll the consolidated auth status for a `requestId` to
    determine the final, authoritative outcome.


    **Authentication:** All requests require `clientId` and `clientSecret` as
    request headers. Never expose these in client-side code.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app
    description: Production server
security:
  - ApiKeyAuth: []
    ApiSecretAuth: []
paths:
  /auth/v2/status:
    get:
      tags:
        - SNA
      summary: Status Check
      description: >
        Returns the current status of a Silent Network Authentication (SNA)
        request for a given `requestId`.


        The response carries the auth factor(s) in `auths[]` along with phone,
        SIM, network, and device-fingerprinting detail when available. For an
        SNA-only flow, read the `PRIMARY` factor's `status`.


        Poll until the `PRIMARY` factor reaches a terminal status (`SUCCESS` or
        `FAILED`). The result from this API — not the SDK callback alone — is
        the source of truth for confirming a successful login.
      operationId: checkAuthStatus
      parameters:
        - name: requestId
          in: query
          required: true
          schema:
            type: string
            example: ARID_A1B2C3D4E5F6
          description: The ARID token (`requestId`) returned by POST /auth/v1/create.
      responses:
        '200':
          description: >-
            **HTTP 200** — Current auth status for the `requestId`.
            `auths[].status` is `PENDING`, `SUCCESS`, or `FAILED`.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StatusResponse'
              examples:
                pending:
                  summary: Pending — SNA still in progress
                  value:
                    auths:
                      - identityType: MOBILE
                        identityValue: '917069914791'
                        channel: SILENT_AUTH
                        methods:
                          - SILENT_AUTH
                        status: PENDING
                        type: PRIMARY
                    derivedOperator: AIRTEL
                    phoneDetail:
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: VI
                      location: India
                      timeZones:
                        - Asia/Calcutta
                    simDetail:
                      operator: AIRTEL
                      mcc: 405
                      mnc: 51
                    networkDetail:
                      ip: 2401:4900:1c50:1a3b::1
                      ipType: IPV6
                      operator: AIRTEL
                    deviceFingerprinting:
                      status: SUCCESS
                      sessionId: a98ead44-f4db-4801-8c3f-041f98140734
                      deviceId: 781b21f7-220b-4f44-9155-6261f8564924
                      newDevice: false
                      riskAssessment:
                        sessionRiskLevel: HIGH
                        deviceRiskLevel: HIGH
                        sessionRiskScore: 95
                        deviceRiskScore: 90
                        ipFraudScore: 0
                        flags:
                          isVpn: false
                          isEmulator: false
                          isAppTampered: true
                      deviceContext:
                        brand: iQOO
                        model: I2410
                        os: Android
                        osVersion: '16'
                      networkContext:
                        ipAddress: 106.205.222.198
                        ipType: v4
                        asn: '45609'
                        isp: Bharti Airtel Limited
                success:
                  summary: Success — carrier verification completed
                  value:
                    auths:
                      - identityType: MOBILE
                        identityValue: '917069914791'
                        channel: SILENT_AUTH
                        methods:
                          - SILENT_AUTH
                        status: SUCCESS
                        verifiedTimestamp: 1781091069000
                        type: PRIMARY
                    derivedOperator: AIRTEL
                    phoneDetail:
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: VI
                      location: India
                      timeZones:
                        - Asia/Calcutta
                    simDetail:
                      operator: AIRTEL
                      mcc: 405
                      mnc: 51
                    networkDetail:
                      ip: 2401:4900:1c50:1a3b::1
                      ipType: IPV6
                      operator: AIRTEL
                      callback:
                        ip: 2401:4900:aabb:f09e::68fa:fe37
                        operator: AIRTEL
                        userAgent: Chrome/147.0.0.0 Mobile Safari/537.36
                    deviceFingerprinting:
                      status: SUCCESS
                      sessionId: a98ead44-f4db-4801-8c3f-041f98140734
                      deviceId: 781b21f7-220b-4f44-9155-6261f8564924
                      newDevice: false
                      riskAssessment:
                        sessionRiskLevel: HIGH
                        deviceRiskLevel: HIGH
                        sessionRiskScore: 95
                        deviceRiskScore: 90
                        ipFraudScore: 0
                        flags:
                          isVpn: false
                          isEmulator: false
                          isAppTampered: true
                      deviceContext:
                        brand: iQOO
                        model: I2410
                        os: Android
                        osVersion: '16'
                      networkContext:
                        ipAddress: 106.205.222.198
                        ipType: v4
                        asn: '45609'
                        isp: Bharti Airtel Limited
                failed:
                  summary: Failed — carrier verification could not complete
                  value:
                    auths:
                      - identityType: MOBILE
                        identityValue: '917069914791'
                        channel: SILENT_AUTH
                        methods:
                          - SILENT_AUTH
                        status: FAILED
                        type: PRIMARY
                        error:
                          errorCode: SP40005
                          message: Operator not supported
                          description: >-
                            This operator is not supported for verification.
                            Please try with a different network.
                    derivedOperator: JIO
                    phoneDetail:
                      countryCode: '91'
                      country: IN
                      type: MOBILE
                      homeOperator: VI
                      location: India
                      timeZones:
                        - Asia/Calcutta
                    simDetail:
                      operator: JIO
                      mcc: 405
                      mnc: 872
                    networkDetail:
                      ip: 49.204.148.177
                      ipType: IPV4
                    deviceFingerprinting:
                      status: SUCCESS
                      sessionId: a98ead44-f4db-4801-8c3f-041f98140734
                      deviceId: 781b21f7-220b-4f44-9155-6261f8564924
                      newDevice: false
                      riskAssessment:
                        sessionRiskLevel: HIGH
                        deviceRiskLevel: HIGH
                        sessionRiskScore: 95
                        deviceRiskScore: 90
                        ipFraudScore: 0
                        flags:
                          isVpn: false
                          isEmulator: false
                          isAppTampered: true
                      deviceContext:
                        brand: iQOO
                        model: I2410
                        os: Android
                        osVersion: '16'
                      networkContext:
                        ipAddress: 49.204.148.177
                        ipType: v4
                        asn: '45609'
                        isp: Reliance Jio Infocomm Limited
        '400':
          description: >
            **HTTP 400.** Request rejected. `7170` is not necessarily terminal —
            if auth has been initiated, keep polling.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                auth_not_started:
                  summary: Auth not started yet (7170)
                  value:
                    message: Invalid Request
                    errorCode: '7170'
                    description: >-
                      Auth not started yet. Please initiate authentication
                      first.
                invalid_request_id:
                  summary: Invalid request Id (7119)
                  value:
                    message: Invalid Request
                    errorCode: '7119'
                    description: 'Request error: Invalid request Id'
        '401':
          description: >-
            **HTTP 401.** Unauthorized. `clientId`/`clientSecret` headers are
            missing, invalid, or the merchant is blocked.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                credentials_empty:
                  summary: Credentials empty (7012)
                  value:
                    message: Access blocked
                    errorCode: '7012'
                    description: 'Authorization error: Merchant credentials are empty'
                invalid_credentials:
                  summary: Invalid credentials (7002)
                  value:
                    message: Access blocked
                    errorCode: '7002'
                    description: 'Authorization error: Invalid credentials'
                merchant_blocked:
                  summary: Merchant blocked (7019)
                  value:
                    message: Merchant Blocked
                    errorCode: '7019'
                    description: >-
                      Your account has been temporarily Blocked. Please contact
                      support for assistance.
components:
  schemas:
    StatusResponse:
      type: object
      properties:
        auths:
          type: array
          description: >-
            Authentication factor(s) for the request. For SNA-only flows this
            contains the `PRIMARY` `SILENT_AUTH` factor.
          items:
            $ref: '#/components/schemas/AuthFactor'
        derivedOperator:
          type: string
          example: AIRTEL
          description: >-
            Best-guess active network operator, derived from IP and SIM signals
            (e.g. JIO, AIRTEL, VI).
        phoneDetail:
          $ref: '#/components/schemas/PhoneDetail'
        simDetail:
          $ref: '#/components/schemas/SimDetail'
        networkDetail:
          $ref: '#/components/schemas/NetworkDetail'
        deviceFingerprinting:
          $ref: '#/components/schemas/DeviceFingerprinting'
    Error:
      type: object
      description: Error response body for HTTP 4xx responses.
      properties:
        message:
          type: string
          example: Invalid Request
        errorCode:
          type: string
          example: '7170'
          description: Machine-readable error code.
        description:
          type: string
          example: Auth not started yet. Please initiate authentication first.
    AuthFactor:
      type: object
      properties:
        identityType:
          type: string
          example: MOBILE
          description: Type of identity verified. Always `MOBILE` for SNA.
        identityValue:
          type: string
          example: '917069914791'
          description: The phone number being verified, in E.164 format (without `+`).
        channel:
          type: string
          example: SILENT_AUTH
          description: Auth channel. Always `SILENT_AUTH` for SNA flows.
        methods:
          type: array
          items:
            type: string
          example:
            - SILENT_AUTH
          description: List of auth methods used. Contains `SILENT_AUTH`.
        status:
          type: string
          enum:
            - SUCCESS
            - FAILED
            - PENDING
          description: Current status of this auth factor.
        type:
          type: string
          enum:
            - PRIMARY
            - MFA
          description: Role of this auth step. `PRIMARY` for the main attempt.
        verifiedTimestamp:
          type: integer
          format: int64
          example: 1781091069000
          description: >-
            Unix timestamp (ms) of successful verification. Present only when
            `status` is `SUCCESS`.
        error:
          $ref: '#/components/schemas/AuthError'
    PhoneDetail:
      type: object
      description: Phone number metadata.
      properties:
        countryCode:
          type: string
          example: '91'
          description: Country calling code (e.g. 91 for India).
        country:
          type: string
          example: IN
          description: ISO 3166-1 alpha-2 country code.
        type:
          type: string
          example: MOBILE
          description: Line type. Always `MOBILE` for SNA.
        homeOperator:
          type: string
          example: VI
          description: Registered home operator of the SIM (from number portability data).
        location:
          type: string
          example: India
          description: Country name in English.
        timeZones:
          type: array
          items:
            type: string
          example:
            - Asia/Calcutta
          description: IANA timezone identifiers for the phone's country.
    SimDetail:
      type: object
      description: SIM / carrier detection from the network.
      properties:
        operator:
          type: string
          example: AIRTEL
          description: Detected active carrier from the network IP (e.g. JIO, AIRTEL, VI).
        mcc:
          type: integer
          example: 405
          description: Mobile Country Code of the detected network.
        mnc:
          type: integer
          example: 51
          description: Mobile Network Code of the detected network.
    NetworkDetail:
      type: object
      description: >
        IP and connection info for the two legs of the SNA flow.


        - **Start leg** — the network the user started on. Provided either as
        the root-level `ip` / `ipType` / `operator` fields **or** as the
        `continue` object. **One of the two is present** in the payload.

        - **End leg** — the network the carrier completed verification on.
        Provided as the `callback` object, **always present once the telco
        reaches a terminal state**.
      properties:
        ip:
          type: string
          example: 2401:4900:1c50:1a3b::1
          description: >-
            Start-leg client IP at time of SNA initiation. Present when the
            `continue` object is not.
        ipType:
          type: string
          enum:
            - IPV4
            - IPV6
          description: IP version of the start-leg `ip`.
        operator:
          type: string
          example: AIRTEL
          description: >-
            Operator resolved from the start-leg IP. Present when operator
            detection succeeds.
        continue:
          allOf:
            - $ref: '#/components/schemas/NetworkLeg'
          description: >-
            Start-leg network details. An alternative to the root-level `ip`
            fields — one of the two is present.
        callback:
          allOf:
            - $ref: '#/components/schemas/NetworkLeg'
          description: >-
            End-leg network details from the carrier verification callback.
            Always present once the telco reaches a terminal state.
    DeviceFingerprinting:
      type: object
      description: >-
        Device risk and context signals. Enriched only if the OTPless Device
        Intelligence SDK is imported and initialized in the client app;
        otherwise this field is omitted.
      properties:
        status:
          type: string
          enum:
            - SUCCESS
            - FAILED
          description: Fingerprinting result.
        sessionId:
          type: string
          format: uuid
          description: Unique identifier for this fingerprinting session.
        deviceId:
          type: string
          format: uuid
          description: Stable identifier for the device across sessions.
        newDevice:
          type: boolean
          description: '`true` if this is the first time this device has been seen.'
        riskAssessment:
          $ref: '#/components/schemas/RiskAssessment'
        deviceContext:
          $ref: '#/components/schemas/DeviceContext'
        networkContext:
          $ref: '#/components/schemas/NetworkContext'
    AuthError:
      type: object
      description: >-
        Error details for a failed auth factor. Present only when `status` is
        `FAILED`. See the full [Error Codes](/sna/error-codes) reference.
      properties:
        errorCode:
          type: string
          example: SP40005
          description: Machine-readable `SP`-prefixed error code (e.g. SP40005).
        message:
          type: string
          example: Operator not supported
          description: Short, machine-oriented error message.
        description:
          type: string
          example: >-
            This operator is not supported for verification. Please try with a
            different network.
          description: User-friendly description suitable for showing to end users.
    NetworkLeg:
      type: object
      description: Network details for one leg of the SNA flow.
      properties:
        ip:
          type: string
          example: 2401:4900:aabb:f09e::68fa:fe37
          description: IP address for this leg.
        operator:
          type: string
          example: AIRTEL
          description: Carrier resolved for this leg.
        userAgent:
          type: string
          example: Chrome/147.0.0.0 Mobile Safari/537.36
          description: User-Agent header observed for this leg.
    RiskAssessment:
      type: object
      description: Risk scores and detection flags.
      properties:
        sessionRiskLevel:
          type: string
          enum:
            - LOW
            - MEDIUM
            - HIGH
          description: Risk level for this session.
        deviceRiskLevel:
          type: string
          enum:
            - LOW
            - MEDIUM
            - HIGH
          description: Risk level for this device.
        sessionRiskScore:
          type: integer
          description: Session risk score, 0–100. Higher = riskier.
        deviceRiskScore:
          type: integer
          description: Device risk score, 0–100. Higher = riskier.
        ipFraudScore:
          type: integer
          description: Fraud score for the client IP, 0–100.
        flags:
          $ref: '#/components/schemas/RiskFlags'
    DeviceContext:
      type: object
      description: Hardware and OS context.
      properties:
        brand:
          type: string
          example: iQOO
          description: Device manufacturer brand (e.g. iQOO, Samsung, Apple).
        model:
          type: string
          example: I2410
          description: Device model identifier.
        product:
          type: string
          description: Product/SKU variant name.
        os:
          type: string
          example: Android
          description: 'Operating system: Android or iOS.'
        osVersion:
          type: string
          example: '16'
          description: OS version string.
        cpuType:
          type: string
          description: CPU chipset model.
        screenResolution:
          type: string
          description: Screen resolution in WxH pixels.
        totalRamBytes:
          type: integer
          format: int64
          description: Total physical RAM in bytes.
        storage:
          type: object
          properties:
            totalBytes:
              type: integer
              format: int64
              description: Total internal storage capacity in bytes.
            availableBytes:
              type: integer
              format: int64
              description: Available (free) internal storage in bytes.
        lifecycle:
          type: object
          properties:
            firstSeenAt:
              type: integer
              format: int64
              description: >-
                Unix timestamp (ms) when this device was first observed by
                OTPless.
            firstSeenDays:
              type: integer
              description: Number of days since the device was first seen.
            factoryResetTime:
              type: integer
              format: int64
              description: Unix timestamp (ms) of the last detected factory reset.
        simInfo:
          type: object
          properties:
            totalSimsUsed:
              type: integer
              description: Total number of distinct SIMs ever used in this device.
            activeSims:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: integer
                    description: Internal SIM record identifier.
                  slotIndex:
                    type: integer
                    description: Physical SIM slot index (0-based).
                  carrierName:
                    type: string
                    description: Carrier name as reported by the SIM.
    NetworkContext:
      type: object
      description: IP and location context from device fingerprinting.
      properties:
        ipAddress:
          type: string
          example: 106.205.222.198
          description: Client IP address at time of fingerprinting.
        ipType:
          type: string
          enum:
            - v4
            - v6
          description: IP version.
        asn:
          type: string
          example: '45609'
          description: Autonomous System Number of the IP.
        isp:
          type: string
          example: Bharti Airtel Limited
          description: Internet Service Provider name.
        location:
          type: object
          properties:
            city:
              type: string
              description: City resolved from the IP address.
            region:
              type: string
              description: State or region resolved from the IP address.
            country:
              type: string
              description: Country resolved from the IP address.
            latitude:
              type: number
              description: Latitude of the IP geolocation.
            longitude:
              type: number
              description: Longitude of the IP geolocation.
    RiskFlags:
      type: object
      description: >-
        Boolean detection flags. Availability of individual flags depends on
        platform and signal coverage.
      properties:
        isVpn:
          type: boolean
          description: Device is connected via a VPN.
        isProxy:
          type: boolean
          description: Device is connected via a proxy.
        isTor:
          type: boolean
          description: Device is connected via the Tor network.
        isEmulator:
          type: boolean
          description: Device is an emulator or virtual device.
        isRooted:
          type: boolean
          description: Device has been rooted (Android) or jailbroken (iOS).
        isCloned:
          type: boolean
          description: App is running in a cloned or parallel space environment.
        isAppTampered:
          type: boolean
          description: App binary has been modified or tampered with.
        isGeoSpoofed:
          type: boolean
          description: Device location appears to be spoofed.
        isMirroredScreen:
          type: boolean
          description: Screen is being mirrored or cast to another device.
        isHooking:
          type: boolean
          description: Runtime hooking framework (e.g. Frida, Xposed) detected.
        adbEnabled:
          type: boolean
          description: Android Debug Bridge (ADB) is enabled on the device.
        debuggingEnabled:
          type: boolean
          description: Debugging mode is active on the device.
        developerOptionsEnabled:
          type: boolean
          description: Developer options are enabled in Android settings.
        usbDebuggingEnabled:
          type: boolean
          description: USB debugging is enabled.
        accessibilityEnabled:
          type: boolean
          description: Accessibility services are active (potential overlay/bot risk).
        identifiersChanged:
          type: boolean
          description: Device identifiers have changed since last seen.
        onCall:
          type: boolean
          description: Device is on an active phone call during auth.
        isOEMUnlockAllowed:
          type: boolean
          description: OEM bootloader unlock is allowed on this device.
        googlePlayStoreInstall:
          type: boolean
          description: App was installed from the Google Play Store.
        debuggerAttached:
          type: boolean
          description: A debugger is currently attached to the app process.
        wirelessDebugging:
          type: boolean
          description: Wireless ADB debugging is enabled.
        usbConnected:
          type: boolean
          description: Device is connected to a computer via USB.
        isIpProxy:
          type: boolean
          description: Client IP is flagged as a known proxy address.
        isIpVpn:
          type: boolean
          description: Client IP is flagged as a known VPN exit node.
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: clientId
      description: OTPless API Client ID
    ApiSecretAuth:
      type: apiKey
      in: header
      name: clientSecret
      description: OTPless API Client Secret
```
