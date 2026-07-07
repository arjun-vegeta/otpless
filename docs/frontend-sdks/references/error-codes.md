> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Error Codes

> Complete reference for all error codes returned by OTPless Web and Native/Mobile SDKs.

## Error response format

Every error from the SDK follows this structure:

```json theme={null}
{
  "responseType": "INITIATE | VERIFY | FAILED",
  "statusCode": 400,
  "response": {
    "errorCode": "7101",
    "errorMessage": "Request error: Invalid parameters values or Required parameters are missing."
  }
}
```

| Field                   | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `responseType`          | Phase where the error occurred: `INITIATE`, `VERIFY`, or `FAILED`.       |
| `statusCode`            | Numeric status code identifying the error category.                      |
| `response.errorCode`    | Machine-readable error code. Use this to handle errors programmatically. |
| `response.errorMessage` | Human-readable description of the error.                                 |

---

## Error Codes

<Tabs>
  <Tab title="Authorization">
    | errorCode | statusCode                        | responseType | Message                                                                        | Description                                                                |
    | --------- | --------------------------------- | ------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
    | `401`     | <Badge color="orange">401</Badge> | `INITIATE`   | UnAuthorized request! Please check your appId.                                 | App ID is invalid or unauthorized. Verify your credentials.                |
    | `7025`    | <Badge color="orange">401</Badge> | `INITIATE`   | SMS delivery to this country is not enabled. Contact OTPLESS team to activate. | SMS is not enabled for this country. Contact the OTPless team to activate. |
    | `7035`    | <Badge color="orange">401</Badge> | `INITIATE`   | Access blocked.                                                                | The mobile number belongs to a country that is currently not supported.    |
  </Tab>

  <Tab title="Rate Limiting">
    | errorCode | statusCode                        | responseType | Message                                                                                               | Description                                                               |
    | --------- | --------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
    | `7020`    | <Badge color="yellow">429</Badge> | `INITIATE`   | Authentication Rate Limited reached. Please try again after some time.                                | Too many authentication requests in a short period. Wait before retrying. |
    | `7022`    | <Badge color="yellow">429</Badge> | `INITIATE`   | The identity associated with this request has exceeded the allowed number of authentication requests. | This phone number or email has hit the per-identity rate limit.           |
    | `7023`    | <Badge color="yellow">429</Badge> | `INITIATE`   | The IP associated with this request has exceeded the allowed number of authentication requests.       | This IP address has exceeded the allowed request count.                   |
    | `7024`    | <Badge color="yellow">429</Badge> | `INITIATE`   | The application has exceeded the allowed number of authentication requests.                           | The entire application has hit its authentication request limit.          |
  </Tab>

  <Tab title="Request Validation">
    | errorCode | statusCode                        | responseType | Message                                                       | Description                                                                   |
    | --------- | --------------------------------- | ------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
    | `4000`    | <Badge color="blue">4000</Badge>  | `INITIATE`   | The request values are incorrect, see details.                | Request values do not match the expected format.                              |
    | `4002`    | <Badge color="blue">4002</Badge>  | `INITIATE`   | The request parameters are incorrect, see details.            | Request parameters are invalid. Review the API documentation.                 |
    | `4003`    | <Badge color="blue">4003</Badge>  | `INITIATE`   | The request channel is incorrect.                             | The specified channel is not supported or not enabled in the dashboard.       |
    | `7101`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid parameters values or Required parameters are missing. | Required fields are missing or have invalid values. Check all request fields. |
    | `7102`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid phone number.                                         | Phone number is incorrectly formatted. Include the country code.              |
    | `7103`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid phone number delivery channel.                        | The delivery channel (SMS, WhatsApp etc.) is not valid for this phone number. |
    | `7104`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid email.                                                | Email address is incorrectly formatted.                                       |
    | `7105`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid email channel.                                        | The delivery channel for email is not supported.                              |
    | `7106`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid phoneNumber or email.                                 | Either the phone number or email provided is missing or invalid.              |
    | `7112`    | <Badge color="red">400</Badge>    | `VERIFY`     | Empty OTP.                                                    | OTP field is empty. Ensure the OTP is included in the verify request.         |
    | `7113`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid expiry.                                               | Expiry value is invalid or out of allowed range.                              |
    | `7114`    | <Badge color="red">400</Badge>    | `VERIFY`     | Invalid token.                                                | The token provided is invalid or does not match any active session.           |
    | `7116`    | <Badge color="red">400</Badge>    | `INITIATE`   | OTP Length is invalid. 4 and 6 only allowed.                  | OTP length must be 4 or 6 digits.                                             |
    | `7121`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid app hash.                                             | The app hash is invalid or incorrectly formatted.                             |
    | `7136`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid requestId.                                            | The requestId provided is invalid or malformed.                               |
    | `7158`    | <Badge color="red">400</Badge>    | `INITIATE`   | Invalid template id.                                          | The template ID provided is invalid or not found.                             |
    | `7168`    | <Badge color="orange">404</Badge> | `INITIATE`   | No data found for request id.                                 | No data was found for the provided requestId.                                 |
    | `7172`    | <Badge color="red">400</Badge>    | `INITIATE`   | Request id is expired.                                        | The requestId has expired. Initiate a new request.                            |
  </Tab>

  <Tab title="Authentication">
    | errorCode | statusCode                        | responseType | Message                   | Description                                                           |
    | --------- | --------------------------------- | ------------ | ------------------------- | --------------------------------------------------------------------- |
    | `7038`    | <Badge color="orange">401</Badge> | `VERIFY`     | Access blocked.           | Failed to authenticate. Please try again.                             |
    | `7042`    | <Badge color="orange">401</Badge> | `VERIFY`     | Access blocked.           | SSO authentication was rejected by the user.                          |
    | `7115`    | <Badge color="red">400</Badge>    | `VERIFY`     | OTP is already verified.  | This OTP has already been used. Request a new OTP.                    |
    | `7118`    | <Badge color="red">400</Badge>    | `VERIFY`     | Incorrect OTP.            | The OTP entered does not match. Check and retry.                      |
    | `7160`    | <Badge color="red">400</Badge>    | `INITIATE`   | User Verification failed. | Silent authentication failed to initialize.                           |
    | `7169`    | <Badge color="red">400</Badge>    | `VERIFY`     | SNA is already verified.  | This Silent Network Authentication session has already been verified. |
    | `7303`    | <Badge color="red">400</Badge>    | `VERIFY`     | OTP expired.              | The OTP has expired. Request a new one and retry.                     |
    | `7304`    | <Badge color="red">400</Badge>    | `VERIFY`     | Authentication expired.   | The authentication session has expired. Initiate a new request.       |
    | `9002`    | <Badge color="blue">9002</Badge>  | `INITIATE`   | TYPE\_INTERRUPTED         | Passkey operation was interrupted before it could complete.           |
    | `9003`    | <Badge color="blue">9003</Badge>  | `INITIATE`   | TYPE\_NO\_CREDENTIAL      | No passkey credentials are available for the requested operation.     |
    | `9004`    | <Badge color="blue">9004</Badge>  | `INITIATE`   | TYPE\_UNKNOWN             | An unknown error occurred during the passkey operation.               |
    | `9005`    | <Badge color="blue">9005</Badge>  | `INITIATE`   | TYPE\_USER\_CANCELED      | User cancelled the passkey authentication process.                    |
    | `9006`    | <Badge color="blue">9006</Badge>  | `INITIATE`   | TYPE\_NO\_CREATE\_OPTIONS | No passkey creation options are available.                            |
    | `9007`    | <Badge color="blue">9007</Badge>  | `INITIATE`   | TYPE\_NOT\_ALLOWED\_ERROR | Passkey operation is not allowed due to security restrictions.        |
    | `9008`    | <Badge color="blue">9008</Badge>  | `INITIATE`   | TYPE\_TIMEOUT\_ERROR      | The passkey operation timed out before completing.                    |
    | `9009`    | <Badge color="blue">9009</Badge>  | `INITIATE`   | TYPE\_CONSTRAINT\_ERROR   | A constraint was violated during the passkey authentication process.  |
  </Tab>

  <Tab title="Network & Connectivity">
    | errorCode | statusCode                       | responseType                 | Message                                            | Description                                                        |
    | --------- | -------------------------------- | ---------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
    | `5003`    | <Badge color="blue">5003</Badge> | `INITIATE / VERIFY / FAILED` | Failed to fetch.                                   | Request could not be sent due to a connectivity issue.             |
    | `5005`    | <Badge color="blue">5005</Badge> | `INITIATE / VERIFY`          | Request timeout.                                   | Server did not respond within the timeout window. Retry.           |
    | `5006`    | <Badge color="blue">5006</Badge> | `INITIATE / VERIFY`          | Failed to fetch response.                          | Response could not be retrieved for the request.                   |
    | `9100`    | <Badge color="blue">9100</Badge> | `INITIATE / VERIFY`          | Socket timeout exception / Request Timeout.        | Request failed due to a socket timeout. Retry on a stable network. |
    | `9101`    | <Badge color="blue">9101</Badge> | `INITIATE / VERIFY`          | Network Connection Was Lost.                       | Connection was interrupted before the request completed.           |
    | `9102`    | <Badge color="blue">9102</Badge> | `INITIATE / VERIFY`          | DNS Lookup Failed.                                 | Domain name could not be resolved. Check DNS settings.             |
    | `9103`    | <Badge color="blue">9103</Badge> | `INITIATE / VERIFY`          | Unknown Host Exception / Cannot Connect to Server. | Host is unknown or server is unreachable.                          |
    | `9104`    | <Badge color="blue">9104</Badge> | `INITIATE / VERIFY`          | IO Exception / No Internet Connection.             | I/O exception or device has no internet connection.                |
    | `9105`    | <Badge color="blue">9105</Badge> | `INITIATE / VERIFY`          | Secure Connection Failed (SSL issue).              | SSL/TLS handshake failed. Check certificate configuration.         |
    | `9106`    | <Badge color="blue">9106</Badge> | `INITIATE`                   | Transaction timeout.                               | Transaction timed out. Restart the authentication flow.            |
    | `9110`    | <Badge color="blue">9110</Badge> | `INITIATE / VERIFY`          | OTPless authentication request cancelled.          | Authentication request was cancelled by the user or system.        |
  </Tab>

  <Tab title="Server Errors">
    | errorCode | statusCode                       | responseType                 | Message                                                      | Description                                                                    |
    | --------- | -------------------------------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
    | `500`     | <Badge color="red">500</Badge>   | `INITIATE / VERIFY / FAILED` | Something went wrong! Please try again.                      | An unexpected server error occurred. Retry the request.                        |
    | `4001`    | <Badge color="blue">4001</Badge> | `INITIATE`                   | OTPless SDK doesn't support 2FA as of now.                   | Two-factor authentication is not supported.                                    |
    | `5900`    | <Badge color="blue">5900</Badge> | `INITIATE`                   | Feature is not supported — requires iOS version X and above. | The feature requires a newer iOS version. Ask the user to update their device. |
  </Tab>
</Tabs>
