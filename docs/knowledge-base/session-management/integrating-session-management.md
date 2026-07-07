> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrating Session Management in your application

> Session Management in OTPLESS allows developers to control user session durations, manage inactivity timeouts, validate session tokens, and revoke sessions in real-time for enhanced security and user experience.

### Session Management

Session management is a critical aspect of authentication that ensures users remain securely logged in while interacting with an application. It involves maintaining a user’s authentication state between requests and managing session expiration or invalidation for security. OTPLESS offers two tailored solutions for session management, tailored to different use cases:

#### 1. **Server-Driven Management**

In this workflow, the merchant’s backend server takes full control of managing user sessions. Here's how it works:

- When a user logs in through OTPLESS, the merchant's server communicates directly with the OTPLESS server to validate the authentication token.
- Once the user is authenticated, OTPLESS provides the necessary `sessionToken` and `refreshToken` needed for session management.
- The `sessionToken` is meant for the frontend and should be securely stored in the application's local storage, while the `refreshToken` is intended for the backend and should be stored securely on the server. Further usage of both tokens is explained below.
- OTPLESS provides APIs for all session related logic, such as **validation, renewal, or revocation** of a user's session. All session-related logic is handled by the merchant’s backend by communicating with OTPLESS' backend.

#### 2. **Frontend-Driven Management**

In this workflow, OTPLESS Frontend SDKs manage user sessions directly within the client application (e.g., web or mobile apps). Here's how it works:

- After the user logs in, the OTPLESS SDK authenticates the user and manages session details on the client side.
- The SDK handles token storage, session expiration, and renewal seamlessly, abstracting the complexities from the developer.
- This provides a lightweight and **user-friendly solution** that reduces dependency on server-side infrastructure and effort required by developers to implement a session management solution.

### Choosing the Right Method

- **Server-Driven Management** offers flexibility and should be preferred by merchants requiring strict security controls and advanced flexibility in controlling their sessions.
- **Frontend-Driven Management** simplifies implementation, making it an excellent choice for teams focusing on rapid deployment and enhanced user experience.

<Tabs>
  <Tab title="Server driven management">
    In this workflow, the session management is handled by the merchant's server, which communicates with the OTPLESS server to ensure that the user's session is valid.
    This is the most secure and scalable method, as it centralizes session management at the server level.

    Here's a flowchart showcasing how session management and authentication with OTPLESS work together:

    <img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/backend-session-validation-flow.png?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=738cfd19ff8302771ccc5bb332f9f898" alt="otpless session management overview" width="1902" height="1260" data-path="images/backend-session-validation-flow.png" />

    **Summary of the flowchart:**

    1. **User Authentication**: When the user successfully authenticates via **OTPLESS SDK** on the merchant’s application, the merchant receives a `sessionToken` and a `refreshToken` from OTPLESS. The `sessionToken` is meant for the frontend and should be securely stored in the application's local storage, while the `refreshToken` is intended for the backend and should be stored securely on the server.

    2. **Action Trigger**: When the user performs an action that requires session validation, the merchant’s frontend sends the `sessionToken` to merchant’s server, which then forwards the `sessionToken` provided by OTPLESS during user authentication **for validation to OTPLESS server**.

    3. **OTPLESS Server Validation**: The OTPLESS server checks the validity of the `sessionToken` and responds to the merchant server with a validation result:
       * If **valid**: The action proceeds smoothly, indicating the user's session is valid and the user can proceed with the action they wanted to perform.
       * If **invalid**: The merchant server proceeds to the next step by sending the `refreshToken` to OTPLESS to validate the `refreshToken` and create a new `sessionToken`.

    4. **Refresh Token Validation**: The OTPLESS server validates the `refreshToken` to determine if it is still valid:

       * If **valid**: OTPLESS generates a new `sessionToken`, which is returned to the merchant server. The merchant server updates the previously issues `sessionToken` with the newly issued `sessionToken`.
       * If **invalid**: The user's session is terminated, and they are required to authenticate again.

    ### Key Terms

    * `sessionToken`: A temporary [JWT (JSON Web Token)](https://jwt.io/) key that allows the user to stay logged in without re-authenticating each time. It has a short expiry time.
    * `refreshToken`: A backup [JWT (JSON Web Token)](https://jwt.io/) key used to request a new `sessionToken` when the current one expires, keeping the user logged in. It has a long expiry time, typically the time for which you want the user to be kept logged in.

    This method ensures that the session management process is both secure and resilient, leveraging centralized validation at the backend level.

    ## Integration & Setup

    ### Initial setup

    1. **Configure OTPLESS dashboard**: In [Session Management section](https://otpless.com/dashboard/customer/session-management), enable Session Management and set the parameters as per your choice. Click the save button once session management is enabled and its parameters are set.
    2. **Get OTPLESS credentials**: Get the OTPLESS credentials from [dashboard](https://otpless.com/dashboard/customer/dev-settings). Store them securely for using them in session management.
    3. **Integrate OTPLESS on your application**: Users must be authenticated via **Otpless SDK** to implement session management. To integrate **Otpless SDK** on your application, follow [this guide](https://otpless.com/docs/frontend-sdks/).

    ### Workflow

    1. Once the user **successfully logs in via OTPLESS SDK** on your application, securely store `sessionToken` and `refreshToken` provided by OTPLESS at your preferred location.
    2. To perform any session related logic such as **validation, renewal, or revocation of a user's session**, follow the below mentioned API endpoints.

    ### API Endpoints

    These are the API endpoints that OTPLESS provided to seamlessly integrate Session Management in your application.

    1. **[Validate Session](http://otpless.com/api-reference/endpoint/session-management/validate-session)** (`v1/sessions/validate-session`): Validates an existing user session using `sessionToken` issued by OTPLESS.
       * This API should be used whenever user performs an action on merchant app/website that requires their session to be valid.
       * *Example*: A user is navigating the merchant’s app or website and tries to access a feature like viewing order history or account settings. Before allowing access, the app checks if their **session is still valid** by using this endpoint. If the session is invalid, the user may need to \*\*create a new `sessionToken`.

    2. **[Create New Session Token](http://otpless.com/api-reference/endpoint/session-management/get-new-session-token)** (`v1/sessions/get-new-session-token`): Creates a new `sessionToken` using the `refreshToken` if the `refreshToken` is still valid.
       * This API should be used when the **[Validate Session API](http://otpless.com/api-reference/endpoint/session-management/validate-session)** responds that the session is not valid. It returns a new `sessionToken` if the `refreshToken` is valid.
       * *Example*: A user’s session expires while they are still actively using the app. Instead of forcing the user to log in again, the app uses this endpoint to generate a new `sessionToken` using the existing `refreshToken`, ensuring uninterrupted access.

    3. **[Get Session Details](http://otpless.com/api-reference/endpoint/session-management/get-session-details)** (`v1/sessions/get-session-details`): Retrieves detailed information related to the user's session, such as user phone number and network details.
       * This API should be used when the merchant wants to fetch the user's details associated with the corresponding `sessionToken`.
       * *Example*: A merchant wants to personalize the user’s experience by displaying their name or phone number in the app. By calling this endpoint, the app can retrieve the session details associated with the `sessionToken`, such as the user’s phone number or email id, whichever the user has provided for authentication.

    4. **[Revoke Session](http://otpless.com/api-reference/endpoint/session-management/revoke-session)** (`v1/sessions/revoke-session`): Revokes a user's session, typically called upon logout.
       * This API should be used when the merchant wants to terminate the user's session. This API will revoke the corresponding `sessionToken` and `refreshToken`.
       * *Example*: A user logs out of the app, either manually or due to inactivity or there may have been suspicious activity on user's device, due to which merchant may want to re-authenticate the user. This endpoint is used to securely terminate the user's session, ensuring that their `sessionToken` can no longer be used for validation and a new `sessionToken` cannot be created using the `refreshToken`.

  </Tab>

  <Tab title="Frontend driven management">
    Here's a flowchart showcasing how session management and authentication with OTPLESS work together:

    <Frame type="glass">
      <img src="https://mintcdn.com/otpless-96/MG5MLCTUP00EUtvA/images/frontend-session-validation-flow.png?fit=max&auto=format&n=MG5MLCTUP00EUtvA&q=85&s=33192b0b2b4c750063094bde22209d2c" alt="otpless session management overview" width="1782" height="1270" data-path="images/frontend-session-validation-flow.png" />
    </Frame>

    Summary of the flowchart:

    1. The **user logs in via Otpless** on the merchant’s website. Login via **Otpless** is necessary to proceed with session management.
    2. **Otpless SDK authenticates the user** and creates a session for the user.
    3. The **user performs an action that requires session validation** on the merchant’s website.
    4. The **merchant app queries the Otpless SDK** to check if the session is valid.
    5. The **Otpless SDK verifies the session**:
       * **If false** (session invalid), the merchant app **logs out the user**.
       * **If true** (session valid), the merchant app **performs the action requested by the user**.

    This process ensures that the user’s session remains active only if validated by the Otpless SDK.

    ## Integration & Setup

    ### Initial setup

    1. **Configure OTPLESS dashboard**: In [Session Management section](https://otpless.com/dashboard/customer/session-management), enable Session Management and set the parameters as per your choice. Click the save button once session management is enabled and its parameters are set.
    2. **Get OTPLESS credentials**: Get the OTPLESS credentials from [dashboard](https://otpless.com/dashboard/customer/dev-settings). Store them securely for using them in session management.
    3. **Integrate OTPLESS on website**: Users must be authenticated via **Otpless SDK** to implement session management. To integrate **Otpless SDK** on your website, follow [this guide](https://otpless.com/docs/frontend-sdks/web-sdks/javascript/intro).

    ### SDK Integration

    Execute the below mentioned code whenever you have to check for an active session. OTPLESS' frontend SDK automatically detects whether an active session exists or not.

    <CodeGroup>
      ```javascript Code theme={null}
      const validate = Reflect.get(window, 'OTPlessVerifySession');
      const resp = await validate();
      if (!resp.success) {
          console.log("Session Verified for token:-", resp.sessionToken)
      } else {
          console.log("Session Expired!")
      }
      ```
    </CodeGroup>

    To logout the user, merchant should also revoke the session from OTPLESS SDK.
    Execute the below mentioned code to revoke user session:

    <CodeGroup>
      ```javascript Code theme={null}
      const logout = Reflect.get(window, 'OTPlessLogout');
      await logout();
      ```
    </CodeGroup>

  </Tab>
</Tabs>

<Note>
  Need help with your integration? [Contact support](https://otpless.com/support) for expert guidance and personalized assistance.
</Note>
