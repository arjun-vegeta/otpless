> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# id_token (JWT)

> Learn how the id_token can simplify and secure user authentication in your applications.

## Understanding the id\_token in JWT

JWT (JSON Web Token) is a compact, URL-safe format for representing claims to be transferred between two parties. In this blog, we will break down the structure of a JWT `id_token` and explain its utility in the authentication process, particularly in enhancing security and streamlining user validation.

### What is a JWT?

A JWT is a string made up of three parts: Header, Payload, and Signature. Each section is base64-url encoded and separated by dots (`.`). Here’s a breakdown of each part using a sample JWT:

### Sample JWT

```plaintext theme={null}
eyJraWQiOiJwazAxODMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MzEiLCJhd WQiOiIxMTQzMWNudiIsImF1dGhfdGltZSI6IjE2OTcyMDI4NzMiLCJpc3MiOiJodHRwczovL290c Gxlc3MuY29tIiwibmFtZSI6IkFzaHdpbiIsInBob25lX251bWJlcl92ZXJpZmllZCI6InRydWUiLCJhdX RoZW50aWNhdGlvbl9kZXRhaWxzIjoibnVsbCIsInBob25lX251bWJlciI6Iis5MTcwNDI1MDc2NDY iLCJleHAiOjE2OTcxODY4MjQsImlhdCI6MTY5NzE4MzIyNH0.m5BwCX59ZpMjhsv8WNxURMu dCjhrm0m7NqEncTqXBENEdMjxp4F7kWbgCfSFuVTzi0xvG3nj8d-LvX1tfXyHwn98Tj-JA4rQbV ORjmkM9gLpEag6c9B0VpHHewNmUBXDS0rOzBQhsui7-jTgB1V388EqSHe-c7dvXndkxETQy wwcPgnT9_AID5hRVlMChfF11mA2bhqwRyzHBAYTxbk2wzY7YbQIxk58NDRV7elSPSSO-uewe L_M4_opiEkjIX0xk4AvZbD_dLtzIknhQ26X7cmxaATeCHN9Jqzoy9eTCRO5l0aIIVYwOdl4Y-y9t-h 6TEVj80gTirN0CoB_NGmxUw
```

### Decoded JWT

- **Header**
  ```json theme={null}
  {
    "kid": "pk0183",
    "typ": "JWT",
    "alg": "RS256"
  }
  ```
- **Payload**
  ```json theme={null}
  {
    "sub": "531",
    "aud": "11431cnv",
    "auth_time": "1697202873",
    "iss": "https://otpless.com",
    "name": "Ashwin",
    "phone_number_verified": "true",
    "authentication_details": "null",
    "phone_number": "+917042507646",
    "exp": 1697186824,
    "iat": 1697183224
  }
  ```
- **Signature**
  Securely verifies the token using HMAC SHA256 algorithm.

### Why Use JWT for Authentication?

JWTs are designed to carry a significant amount of information as claims. Claims are statements about an entity (typically, the user) and additional metadata. There are several benefits to using JWTs:

- **Compact**: Can be sent through URL, POST parameter, or inside HTTP header.
- **Self-contained**: The payload contains all the required information about the user, avoiding the need to query the database more than once.
- **Secure**: Signature ensures that the token isn’t altered.

### Verification of JWT

Verifying the JWT's signature is crucial for ensuring that the token's integrity and authenticity are maintained. Here's what needs to be verified:

- **Signature**: Validate it against the public key.
- **Issuer (iss)**: Confirm it matches the expected issuer.
- **Audience (aud)**: Ensure it matches the expected client ID.
- **Expiration (exp)**: The current date/time must be before the expiration date/time listed in the JWT.
- **Issued at (iat)**: Ensure that the issuance date is reasonable (e.g., the token was not issued in the future).

### Conclusion

JWTs streamline the authentication process by minimizing the need for multiple database hits and providing a secure method to transfer user data. By understanding the structure and usage of `id_token`, developers can implement more efficient and secure web applications.
