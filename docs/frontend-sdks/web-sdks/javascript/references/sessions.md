> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Session Management

> Learn how to use OTPless JavaScript SDK functions for session management, including verifying and revoking sessions.

## 1. Get Session

The OTPless JavaScript SDK provides the `OTPlessVerifySession` method to retrieve the current session state. This method helps check whether the user is logged in and returns an in-memory session object if the session is active.

### Usage

```javascript theme={null}
const getSessionDetails = await OTPlessVerifySession();

if (!getSessionDetails.success) {
  //handle error case
}
console.log({ getSessionDetails });
//YOUR LOGIC
```

### Behavior

a. **If Logged In**: Returns the in-memory session object containing details of the active session.

```json theme={null}
{
  "success": true,
  "sessionId": "91d30c1b70e14527b6e889d8da1cdd19",
  "sessionToken": "eyJraWQiOiJwazAxODMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MWQzMGMxYjcwZTE0NTI3YjZlODg5ZDhkYTFjZGQxOSIsImlzcyI6Imh0dHBzOi8vb3RwbGVzcy5jb20iLCJuYW1lIjoiTWloaXQgVGhha2thciIsInNlc3Npb25JZCI6IjkxZDMwYzFiNzBlMTQ1MjdiNmU4ODlkOGRhMWNkZDE5IiwiZXhwIjoxNzMzNDc0OTI4LCJpYXQiOjE3MzMzODg1MjgsInVzZXJJZCI6Ik1PLWZmMGUzYjk4NGIzMzQ5MGZhNTI2NjYyYWJhMzVlNjM4IiwiZW1haWwiOiJtaWhpdC50aGFra2FyQG90cGxlc3MuY29tIn0.pdeLlOyAta6wyuXnphKOadKGsgsaUPXDxPmLDRY8llaadIx-hoVjyVjGb7k2hzIIfDlIuN4PdQIr9lPDEWCkf0iIdKzymOUa1vSEi80ky2w6B3hmraVW9NxJpi4tJdhZ0GHJTQPjinTrPLCxSEu-n6pNvgcP2A4e47NZ9tawulkQyCDAeX8cx6PKt6g7LwWW9MU4olqnOoaeBJmsKXYZjvpmEVEifImhL_PCsTkbz4aVAN6YJP-fkY1-f4rHRAqqA7bbjDQF5jdiklFdce7tKQ-vNIVVQlFwaf4bORjkYaFsSfA8LoY20fzjOfpBC0TxrRdnyH6_HHO8nL1jQTxrOQ",
  "refreshToken": "eyJraWQiOiJwazAxODMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MWQzMGMxYjcwZTE0NTI3YjZlODg5ZDhkYTFjZGQxOSIsImlzcyI6Imh0dHBzOi8vb3RwbGVzcy5jb20iLCJuYW1lIjoiTWloaXQgVGhha2thciIsInNlc3Npb25JZCI6IjkxZDMwYzFiNzBlMTQ1MjdiNmU4ODlkOGRhMWNkZDE5IiwiZXhwIjoxNzMzOTkzMzI4LCJpYXQiOjE3MzMzODg1MjgsInVzZXJJZCI6Ik1PLWZmMGUzYjk4NGIzMzQ5MGZhNTI2NjYyYWJhMzVlNjM4IiwiZW1haWwiOiJtaWhpdC50aGFra2FyQG90cGxlc3MuY29tIn0.lltKW9PFPdQVQLie3aMsnYbHTSA0AvoYgBX3TkO1OqArc2huijqEF7M4mjAz1fU5pWO8mO0hwNeL-kSdTSCMrkTU2cz5CdRcJLIWb8SYH11rvaxOJ7-p9nK2H2cDR42kGtnCOeG0D8J5OTbetiT4VByYHOLWN5HOXNdRp2bR84Ze04oM0o2WnWKs1-FSL8vDVjvKMdsdJ50D6wQbWpToeTP-KjOhzbUhtl0HTyjV597lMqt6uJHd9ddWKuE1EwLykqVUNXP-VxJHgHdLAA2RKc9Vt-vY8n87H2zn8Gjs-EsWkeLog-m3ybZE-hyuKUe_VPkduaZrqRqeRdWa-D__uA"
}
```

b. **If Not Logged In**: Returns an object with `success: false`.

```json theme={null}
{ "success": false }
```

## 2. Revoke Session

The SDK provides a method to log out a user by revoking their current session. This wraps the OTPless Revoke Session endpoint.

### Usage

```javascript theme={null}
export const logout = () => {
  const logout = await OTPlessLogout();
  if(logout.success) {
    //YOUR LOGIC
  }

  //HANDLE ERROR CASE
};
```

### Behavior

- Clears the user and session objects from local storage.
- If the SDK cannot contact the OTPless servers, it retains the local session state for recovery or retry.

### When to Use

Call this method to log out a user securely and ensure their session is invalidated both locally and server-side.
