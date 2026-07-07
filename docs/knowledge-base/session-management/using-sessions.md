> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# How to use OTPless Session Management

> Learn how to manage OTPless user sessions effectively using session tokens for secure and seamless authentication.

## Starting a Session

To begin a user session, use the OTPless Auth SDK to authenticate the user. After successful authentication, the SDK response includes a `sessioninfo` or you can call [OTPlessVerifySession](/frontend-sdks/web-sdks/javascript/references/sessions#1-get-session) function to retrive the sessioninfo if it exists object containing the following:

- `sessionId`: The primary session identifier.
- `sessionToken`: A JSON Web Token for secure session validation.
- `refreshToken`: Used to refresh expired sessions.

<Warning>
  In our case `sessionId` is basically `session token` and `sessionToken` is `session jwt token`.
</Warning>

### Steps:

1. **Enable Session Management:**
   - Go to the OTPless dashboard.
   - Set the following configurations:
     - **Session Duration**: The total duration a session remains active.
     - **Maximum Lifetime**: The maximum time a session can exist.
     - **Inactivity Timeout**: The time after which an inactive session is terminated.
2. **Store Session Information:**
   - Save the `sessionId` and `sessionToken` client-side (e.g., in cookies or local storage) securely.

## Authenticating a Session

Before performing any action that requires authorization, verify the session validity.

### Steps:

1. Call the [authenticate session](https://otpless.com/docs/api-reference/endpoint/session-management/get-session-details) API with the `sessionId` or Use `sessionToken` JWT to verify it locally.
2. Validate the response:
   - If the session is valid, use the `user_id` from the response to identify the user.
   - Send the `sessionId` or `sessionToken` in a session cookie for subsequent requests.
3. If the session is invalid:
   - Clear the session cookie to log the user out.
   - Do not process the unauthorized request.

<Note>
  Recommendation: Follow [OWASP's guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookies) on secure cookie storage to ensure sensitive information is protected.
</Note>

## Revoking a Session

To terminate a user session:

1. Call the [revoke session API](https://otpless.com/docs/api-reference/endpoint/session-management/revoke-session) or [Use SDK Logout Function](/frontend-sdks/web-sdks/javascript/references/sessions#2-revoke-session) with the `session_token`.
2. Ensure that the session cookie is cleared client-side to prevent further use.
