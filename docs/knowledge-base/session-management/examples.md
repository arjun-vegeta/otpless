> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Session Management Examples

> Below are examples of ways to use session management.

## 1. Validate Session Token

To validate a session token and retrieve session details, use the following API request:

```bash theme={null}
curl --location 'https://user-auth.otpless.app/v1/sessions/get-session-details' \
  --header 'Content-Type: application/json' \
  --header 'clientId: YOUR_CLIENT_ID' \
  --header 'clientSecret: YOUR_CLIENT_SECRET' \
  --data '{
      "sessionToken": "RECEIVED_SESSION_TOKEN_FROM_OTPLESS"
  }'
```

### Parameters:

- **sessionToken**: The session token received from OTPless after authentication.
- **clientId**: Your unique client ID from OTPless.
- **clientSecret**: Your client secret key from OTPless.

### Response:

If the session token is valid, the API will return session details, including the user’s identity and session status.

---

## 2. Log Out a User

To log out a user and revoke their session, use the following API request:

```bash theme={null}
curl --location 'https://user-auth.otpless.app/v1/sessions/revoke-session' \
--header 'clientId: YOUR_CLIENT_ID' \
--header 'clientSecret: YOUR_CLIENT_SECRET' \
--header 'Content-Type: application/json' \
--data '{
    "sessionToken":"RECEIVED_SESSION_TOKEN_FROM_OTPLESS"
}'
```

### Parameters:

- **sessionToken**: The session token associated with the user session you want to revoke.
- **clientId**: Your unique client ID from OTPless.
- **clientSecret**: Your client secret key from OTPless.

### Response:

Upon successful revocation, the session will be invalidated, and the user will be logged out from the system.

---

## Notes:

- Ensure you store your `clientId` and `clientSecret` securely and do not expose them in client-side code.
- Always use HTTPS to secure communication with OTPless servers.
- For best practices, follow the [OWASP guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookies) for session management and token storage.
