> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Google

## Description

Integrate Google to allow users to log in to your app/website using their Google account through your own Google app.

## Overview

The Google connector allows you to use your own Google app for social authentication, providing a seamless and secure login experience for your users. By integrating Google, you can leverage Google's robust authentication infrastructure to manage user access efficiently.

## Benefits

- **Secure Authentication:** Utilize Google's secure authentication mechanism to ensure safe user logins.
- **User Convenience:** Allow users to log in with their Google accounts for a quick and easy authentication process.
- **Custom Integration:** Use your own Google app for authentication, providing greater control over the login process.
- **Enhanced User Data:** Access basic user information from Google (e.g., name, email) for personalized user experiences.

## Prerequisites

- A Google Cloud project with OAuth 2.0 credentials (Client ID and Client Secret).
- Access to the OTPLESS app for configuring the connector.

## Activation Steps

1. **Log in to OTPLESS:**
   - Open the OTPLESS app and log in with your credentials.

2. **Navigate to Connectors:**
   - In the dashboard, go to the Connectors section.

3. **Choose Google Connector:**
   - From the list of available connectors, select "Google."

4. **Activate Connector:**
   - Click "Activate" to add the Google connector to your list of active connectors.

5. **Enter Google App Credentials:**
   - In the Google connector settings, enter the Client ID and Client Secret from your Google Cloud project.
   - Click "Save" to finalize the setup.

## Connector Configuration

1. **Review in OTPLESS:**
   - Ensure that the Client ID and Client Secret are correctly entered in the Google connector settings.

## Connector Testing

1. **Verify Google Login:**
   - Attempt to log in to your app/website using Google.
   - Ensure that the login process redirects to Google's authentication page and then back to your application upon successful login.
   - Check that the user's basic information (name, email) is correctly retrieved and displayed.

2. **Check Branding:**
   - During the Google authentication process, verify that your app's branding (e.g., app name, logo) is correctly displayed on the Google account selection and consent screens.

3. **Check Logs:**
   - Monitor the logs in OTPLESS and Google Cloud Console for any errors or issues during the authentication process.

## Troubleshooting

- **Credential Issues:**
  - Ensure the Client ID and Client Secret are correct and properly entered.
  - Regenerate the credentials in the Google Cloud Console if needed.

- **OAuth Consent Screen Errors:**
  - Verify that all required fields are filled in the OAuth consent screen configuration.
  - Ensure the scopes `email`, `profile`, and `openid` are added.

- **Authentication Problems:**
  - Check the authorized redirect URIs in your Google Cloud project settings.
  - Make sure the Google+ API and other relevant APIs are enabled.

- **Configuration Errors:**
  - Double-check all configuration settings in OTPLESS and Google Cloud Console.
  - Refer to Google's documentation for additional troubleshooting tips: [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2).

By following this documentation, you should be able to effectively integrate and manage Google authentication using your own Google app within OTPLESS.
