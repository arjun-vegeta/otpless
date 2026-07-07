> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Error Codes

# OTPless SDK Error Codes

This document provides detailed explanations for all the error codes returned by the OTPless SDK. Each section includes the response type, status code, error code, and a description of the issue.

## Status Code: `429`

### Error Code: `7020` - Authentication Rate Limited

- **Response Type**: `INITIATE`
- **Error Message**: Authentication Rate Limited reached. Please try again after some time.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 429,
      "response": {
          "errorCode": "7020",
          "errorMessage": "Authentication Rate Limited reached. Please try again after some time."
      }
  }
  ```
</CodeGroup>

**Explanation**: This error indicates that the system has received too many authentication requests in a short period. The rate limit is enforced to prevent abuse. Users should wait for a specified period before retrying.

### Error Code: `7022` - Identity Rate Limit Exceeded

- **Response Type**: `INITIATE`
- **Error Message**: The identity associated with this request has exceeded the allowed number of authentication requests. Please wait until the rate limit resets.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 429,
      "response": {
          "errorCode": "7022",
          "errorMessage": "The identity associated with this request has exceeded the allowed number of authentication requests. Please wait until the rate limit resets."
      }
  }
  ```
</CodeGroup>

**Explanation**: The specific identity (e.g., phone number or email) has reached the maximum allowed authentication requests within a certain time frame. Retry after the limit resets.

### Error Code: `7023` - IP Rate Limit Exceeded

- **Response Type**: `INITIATE`
- **Error Message**: The IP associated with this request has exceeded the allowed number of authentication requests. Please wait until the rate limit resets.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 429,
      "response": {
          "errorCode": "7023",
          "errorMessage": "The ip associated with this request has exceeded the allowed number of authentication requests. Please wait until the rate limit resets."
      }
  }
  ```
</CodeGroup>

**Explanation**: The IP address sending the authentication requests has reached the maximum allowed requests. This is commonly used to prevent spam or malicious behavior from specific IP addresses.

### Error Code: `7024` - Application Rate Limit Exceeded

- **Response Type**: `INITIATE`
- **Error Message**: The application has exceeded the allowed number of authentication requests. Please wait until the rate limit resets.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 429,
      "response": {
          "errorCode": "7024",
          "errorMessage": "The application has exceeded the allowed number of authentication requests. Please wait until the rate limit resets."
      }
  }
  ```
</CodeGroup>

**Explanation**: The entire application has reached its authentication request limit. This typically occurs when there are too many simultaneous requests from the same application.

---

## Status Code: `401`

### Error Code: `7025` - SMS Delivery Not Enabled for Country

- **Response Type**: `INITIATE`
- **Error Message**: SMS delivery to this country is not enabled. Contact OTPLESS team to activate.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 401,
      "response": {
          "errorCode": "7025",
          "errorMessage": "SMS delivery to this country is not enabled. Contact OTPLESS team to activate."
      }
  }
  ```
</CodeGroup>

**Explanation**: The system is not set up to send SMS messages to the specified country. Contact the OTPLESS team to enable this functionality for your application.

### Error Code: `401` - Unauthorized Request

- **Response Type**: `INITIATE`
- **Error Message**: UnAuthorized request! Please check your appId.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 401,
      "response": {
          "errorCode": "401",
          "errorMessage": "UnAuthorized request! Please check your appId."
      }
  }
  ```
</CodeGroup>

**Explanation**: The app ID provided is invalid or unauthorized. Verify your credentials and try again.

---

## Status Code: `400`

### Error Code: `7101` - Invalid Parameters

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid parameters values or Required parameters are missing.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7101",
          "errorMessage": "Request error: Invalid parameters values or Required parameters are missing"
      }
  }
  ```
</CodeGroup>

**Explanation**: This error occurs when required parameters are missing or incorrectly formatted in the request. Double-check your API call to ensure all necessary fields are provided and correctly formatted.

### Error Code: `7102` - Invalid Phone Number

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid phone number.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7102",
          "errorMessage": "Request error: Invalid phone number"
      }
  }
  ```
</CodeGroup>

**Explanation**: The phone number provided in the request is invalid. Ensure that the phone number is correctly formatted, including the country code.

### Error Code: `7103` - Invalid Phone Delivery Channel

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid phone number delivery channel.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7103",
          "errorMessage": "Request error: Invalid phone number delivery channel"
      }
  }
  ```
</CodeGroup>

**Explanation**: The specified delivery channel for sending the OTP (e.g., SMS, WhatsApp) is not valid for the provided phone number. Ensure that the correct channel is chosen for the number type.

### Error Code: `7104` - Invalid Email

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid email.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7104",
          "errorMessage": "Request error: Invalid email"
      }
  }
  ```
</CodeGroup>

**Explanation**: The email provided is not valid. Ensure that the email address is correctly formatted and complies with standard email conventions.

### Error Code: `7105` - Invalid Email Channel

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid email channel.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7105",
          "errorMessage": "Request error: Invalid email channel"
      }
  }
  ```
</CodeGroup>

**Explanation**: The email delivery channel specified in the request is invalid. Make sure that the appropriate channel is selected for email delivery.

### Error Code: `7106` - Invalid Phone Number or Email

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid phone number or email.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7106",
          "errorMessage": "Request error: Invalid phoneNumber or email."
      }
  }
  ```
</CodeGroup>

**Explanation**: Either the phone number or email provided in the request is invalid. Ensure both fields are correctly formatted if used together.

### Error Code: `7112` - Empty OTP

- **Response Type**: `VERIFY`
- **Error Message**: Request error: Empty OTP.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "VERIFY",
      "statusCode": 400,
      "response": {
          "errorCode": "7112",
          "errorMessage": "Request error: Empty OTP"
      }
  }
  ```
</CodeGroup>

**Explanation**: The OTP value is missing in the request. Ensure that the OTP field is not left empty when submitting for verification.

### Error Code: `7113` - Invalid Expiry

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid expiry.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7113",
          "errorMessage": "Request error: Invalid expiry"
      }
  }
  ```
</CodeGroup>

**Explanation**: The expiry value provided in the request is invalid. Ensure that the expiry value is in the correct format and within the allowed limits.

### Error Code: `7115` - OTP Already Verified

- **Response Type**: `VERIFY`
- **Error Message**: Request error: OTP is already verified.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "VERIFY",
      "statusCode": 400,
      "response": {
          "errorCode": "7115",
          "errorMessage": "Request error: OTP is already verified"
      }
  }
  ```
</CodeGroup>

**Explanation**: The OTP has already been verified for this request. The same OTP cannot be verified multiple times.

### Error Code: `7116` - Invalid OTP Length

- **Response Type**: `INITIATE`
- **Error Message**: Request error: OTP Length is invalid. 4 and 6 only allowed.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7116",
          "errorMessage": "Request error: OTP Length is invalid. 4 and 6 only allowed"
      }
  }
  ```
</CodeGroup>

**Explanation**: The OTP length provided is incorrect. Only lengths of 4 or 6 are allowed.

### Error Code: `7118` - Incorrect OTP

- **Response Type**: `VERIFY`
- **Error Message**: Request error: Incorrect OTP!

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "VERIFY",
      "statusCode": 400,
      "response": {
          "errorCode": "7118",
          "errorMessage": "Request error: Incorrect OTP!"
      }
  }
  ```
</CodeGroup>

**Explanation**: The OTP provided does not match the one generated by the system. Check the OTP entered and try again.

### Error Code: `7121` - Invalid App Hash

- **Response Type**: `INITIATE`
- **Error Message**: Request error: Invalid app hash.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "7121",
          "errorMessage": "Request error: Invalid app hash"
      }
  }
  ```
</CodeGroup>

**Explanation**: The app hash provided is invalid. Ensure that the correct app hash is used in the request.

### Error Code: `7303` - OTP Expired

- **Response Type**: `VERIFY`
- **Error Message**: Request error: OTP expired.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "VERIFY",
      "statusCode": 400,
      "response": {
          "errorCode": "7303",
          "errorMessage": "Request error: OTP expired"
      }
  }
  ```
</CodeGroup>

**Explanation**: The OTP has expired and is no longer valid for verification. Request a new OTP and try again.

### Error Code: `5003` - Connection Issue

- **Response Type**: `INITIATE`
- **Error Message**: Failed to fetch.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 400,
      "response": {
          "errorCode": "5003",
          "errorMessage": "Failed to fetch"
      }
  }
  ```
</CodeGroup>

**Explanation**: A connectivity issue occurred, preventing the request from being processed. Ensure that the network connection is stable and try again.

### Error Code: `5003` - Connection Issue

- **Response Type**: `VERIFY`
- **Error Message**: Failed to fetch.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "VERIFY",
      "statusCode": 400,
      "response": {
          "errorCode": "5003",
          "errorMessage": "Failed to fetch"
      }
  }
  ```
</CodeGroup>

**Explanation**: A connectivity issue occurred, preventing the request from being processed. Ensure that the network connection is stable and try again.

---

## Status Code: `500`

### Error Code: `500` - Internal Server Error

- **Response Type**: `VERIFY` / `INITIATE`
- **Error Message**: Something went wrong! Please try again.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "VERIFY/INITIATE",
      "statusCode": 500,
      "response": {
          "errorCode": "500",
          "errorMessage": "Something went wrong! Please try again."
      }
  }
  ```
</CodeGroup>

**Explanation**: An unexpected server error occurred. Please retry the request.

## Status Code: `5002`

### Error Code: `-1009` - Internet Error

- **Response Type**: `INTERNET_ERR`
- **Error Message**: Internet Error.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INTERNET_ERR",
      "statusCode": 5002,
      "response": {
          "errorCode": "-1009",
          "errorMessage": "Internet Error"
      }
  }
  ```
</CodeGroup>

**Explanation**: An internet connectivity issue occurred, preventing the request from being processed. Ensure that the network connection is stable and try again.

### Error Code: `-2` - Internet Error

- **Response Type**: `INTERNET_ERR`
- **Error Message**: Internet Error.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INTERNET_ERR",
      "statusCode": 5002,
      "response": {
          "errorCode": "-2",
          "errorMessage": "Internet Error"
      }
  }
  ```
</CodeGroup>

**Explanation**: Another internet-related issue, potentially caused by poor network conditions. Ensure that the network connection is stable and retry the request.

---

## Status Code: `5003`

### Error Code: `5003` - Connection Issue

- **Response Type**: `FAILED`
- **Error Message**: Failed to fetch.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "FAILED",
      "statusCode": 5003,
      "response": {
          "errorCode": "5003",
          "errorMessage": "Failed to fetch"
      }
  }
  ```
</CodeGroup>

**Explanation**: A connectivity issue occurred, preventing the request from being processed. Ensure that the network connection is stable and try again.

---

## Status Code: `4000`

### Error Code: `4000` - Incorrect Request Values

- **Response Type**: `INITIATE`
- **Error Message**: The request values are incorrect, see details.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 4000,
      "response": {
          "errorCode": "4000",
          "errorMessage": "The request values are incorrect, see details."
      }
  }
  ```
</CodeGroup>

**Explanation**: The values provided in the request are invalid. Ensure you are sending valid data.

---

## Status Code: `4001`

### Error Code: `4001` - 2FA Not Supported

- **Response Type**: `INITIATE`
- **Error Message**: OTPless headless SDK doesn't support 2FA as of now.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 4001,
      "response": {
          "errorCode": "4001",
          "errorMessage": "OTPless headless SDK doesn't support 2FA as of now."
      }
  }
  ```
</CodeGroup>

**Explanation**: The current version of OTPless SDK does not support two-factor authentication.

---

## Status Code: `4002`

### Error Code: `4002` - Incorrect Request Parameters

- **Response Type**: `INITIATE`
- **Error Message**: The request parameters are incorrect, see details.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 4002,
      "response": {
          "errorCode": "4002",
          "errorMessage": "The request parameters are incorrect, see details."
      }
  }
  ```
</CodeGroup>

**Explanation**: The parameters sent in the request are invalid. Review the API documentation for the correct parameters.

---

## Status Code: `4003`

### Error Code: `4003` - Incorrect Request Channel

- **Response Type**: `INITIATE`
- **Error Message**: The request channel is incorrect, see details.

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE",
      "statusCode": 4003,
      "response": {
          "errorCode": "4003",
          "errorMessage": "The request channel is incorrect, see details."
      }
  }
  ```
</CodeGroup>

**Explanation**: The channel specified in the request is not supported or invalid. Check the allowed channels and update the request.

## Status Code: `5005`

### Error Code: `5005` - Request Timeout

- **Response Type**: `INITIATE/VERIFY`
- **Error Message**: Request timeout

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE/VERIFY",
      "statusCode": 5005,
      "response": {
          "errorCode": "5005",
          "errorMessage": "Request timeout"
      }
  }
  ```
</CodeGroup>

**Explanation**: The server could not respond in the provided timeout interval.

## Status Code: `5006`

### Error Code: `5006` - Failed to fetch response

- **Response Type**: `INITIATE/VERIFY`
- **Error Message**: Failed to fetch response

<CodeGroup>
  ```json Json theme={null}
  {
      "responseType": "INITIATE/VERIFY",
      "statusCode": 5006,
      "response": {
          "errorCode": "5006",
          "errorMessage": "Failed to fetch response"
      }
  }
  ```
</CodeGroup>

**Explanation**: Failed to fetch response for the given request.
