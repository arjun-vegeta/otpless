> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sendgrid

## Description

Integrate your own SendGrid Account to manage and deliver your transactional emails with your custom branding.

## Overview

The SendGrid connector allows you to seamlessly integrate SendGrid's powerful email delivery service with your application. This connector enables you to send transactional emails reliably and at scale, leveraging SendGrid's infrastructure to ensure high deliverability rates and detailed analytics.

## Benefits

- **Custom Branding:** Ensures you send your emails from your own custom branding.
- **High Deliverability:** Ensures your emails reach the inbox, not the spam folder.
- **Scalability:** Handle large volumes of emails with ease.
- **Detailed Analytics:** Access comprehensive email performance metrics.

## Prerequisites

- A SendGrid account. If you do not have one, you can sign up at [SendGrid Signup](https://signup.sendgrid.com/).
- API Key generated from your SendGrid account.
- Access to the OTPLESS app for configuring the connector.

## Activation Steps

1. **Log in to OTPLESS:**
   - Open the OTPLESS app and log in with your credentials.

2. **Navigate to Connectors:**
   - In the dashboard, go to the Connectors section.

3. **Choose SendGrid Connector:**
   - From the list of available connectors, select "SendGrid."

4. **Activate Connector:**
   - Click "Activate" to add the SendGrid connector to your list of active connectors.

## Connector Configuration

1. **Access SendGrid Settings:**
   - Log in to your SendGrid account and navigate to "Settings."

2. **Generate API Key:**
   - Go to "API Keys" and click "Create API Key."
   - Provide a name for your API Key and select the appropriate permissions.
   - Click "Create & View" to generate the key. Copy the API Key.

3. **Configure in OTPLESS:**
   - Go back to the OTPLESS app.
   - In the SendGrid connector settings, paste the API Key and enter the required information (see attached image).
   - Configure any additional settings as required (e.g., sender email address, email templates). If you are unsure about any setting, please ask for clarification.

## Connector Testing

1. **Send Test Email:**
   - In the OTPLESS app, navigate to the SendGrid connector settings.
   - Click on "Send Test Email" to ensure the configuration is correct.
   - Verify that the test email is received in your inbox. It should be from the sender id configured while activiting the connector.

2. **Check Logs:**
   - Monitor the logs in both OTPLESS and SendGrid for any errors or issues with the test email.

## Troubleshooting

- **API Key Issues:**
  - Ensure the API Key is correct and has the necessary permissions.
  - Regenerate the API Key if needed.

- **Email Delivery Problems:**
  - Verify the sender email address is correctly configured.
  - Check SendGrid's suppression lists and email activity logs for any delivery issues.

- **Configuration Errors:**
  - Double-check all configuration settings in OTPLESS and SendGrid.
  - Refer to SendGrid's documentation for additional troubleshooting tips: [SendGrid Documentation](https://docs.sendgrid.com/).

By following this documentation, you should be able to effectively integrate and manage your email communications using the SendGrid connector within OTPLESS.
