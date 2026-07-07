> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Error Codes

> This section provides a comprehensive overview of potential error codes returned by the OTPLESS API, their meanings, possible causes, and suggested corrective actions.

### HTTP Status Codes Overview

Responses from the OTPLESS API are accompanied by standard HTTP status codes to indicate the success or failure of your requests. Here’s a summary:

- `2xx` - Success: Indicates that the request was successfully received, understood, and accepted.
- `4xx` - Client Errors: Errors resulting from the client's request.
- `5xx` - Server Errors: Errors occurring on the OTPLESS server side.

### Detailed Error Codes Table

Below is a detailed table listing specific error codes, descriptions, common causes, and recommended solutions:

| Error Code | Description           | Common Causes                                 | How to Resolve                                                                            |
| ---------- | --------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 400        | Bad Request           | Invalid syntax or missing parameters          | Verify request syntax and parameters. Ensure all required fields are correctly formatted. |
| 401        | Unauthorized          | Invalid or missing authentication credentials | Ensure your `clientId` and `clientSecret` are correctly included and valid.               |
| 403        | Forbidden             | Insufficient permissions                      | Check if your API key has necessary permissions for the requested operation.              |
| 404        | Not Found             | Endpoint URL typo or resource does not exist  | Verify the endpoint URL and the existence of the resource.                                |
| 429        | Too Many Requests     | Exceeding API rate limits                     | Reduce request frequency. Consider implementing exponential backoff in retry logic.       |
| 500        | Internal Server Error | Server issues                                 | Retry the request. If the issue persists, contact support.                                |
| 503        | Service Unavailable   | Server overload or maintenance                | Wait and retry after some time. Check the Status Page for any known issues.               |

### Need Further Assistance?

If you're facing issues not resolved by this guide or require more in-depth assistance, please don't hesitate to reach out to our support team. Our goal is to ensure a seamless experience with the OTPLESS API.

For support, contact us through our [Support Channel](https://otpless.com/support).
