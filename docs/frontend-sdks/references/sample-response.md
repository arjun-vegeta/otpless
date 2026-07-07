> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SDK Sample Response

```json theme={null}
{
  "token": "your_token_here",
  "status": "SUCCESS",
  "userId": "userId_for_identity",
  "timestamp": "2024-07-11T12:51:42Z",
  "identities": [
    {
      "identityType": "EMAIL",
      "identityValue": "anubhav@otpless.com",
      "channel": "OAUTH",
      "methods": ["GOOGLE"],
      "name": "Anubhav Mathur",
      "verified": true,
      "verifiedAt": "2024-07-11T12:51:42Z",
      "picture": "",
      "isCompanyEmail": true,
      "providerMetadata": {}
    }
  ],
  "idToken": "jwt_token",
  "network": {
    "ip": "127.0.0.1",
    "timezone": "Asia/Kolkata",
    "ipLocation": {
      "city": {},
      "subdivisions": {},
      "country": { "code": "IN", "name": "India" },
      "continent": { "code": "AS" },
      "latitude": 0.0,
      "longitude": 0.0
    }
  },
  "deviceInfo": {
    "userAgent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
    "platform": "MacIntel",
    "vendor": "Google Inc.",
    "browser": "Chrome",
    "connection": "4g",
    "language": "en-GB",
    "cookieEnabled": true,
    "screenWidth": 1512,
    "screenHeight": 982,
    "screenColorDepth": 30,
    "devicePixelRatio": 2,
    "timezoneOffset": -330,
    "cpuArchitecture": "10-core",
    "fontFamily": "Times"
  },
  "sessionInfo": {
    "sessionId": "your_session_id",
    "refreshToken": "refresh_token",
    "sessionToken": "session_token"
  },
  "firebaseInfo": {}
}
```
