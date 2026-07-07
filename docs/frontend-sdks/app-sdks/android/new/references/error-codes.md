> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Error Codes

export const CHANNEL_0 = undefined

## Error response structure

```json theme={null}
{
    "responseType": RESPONSE_TYPE_ENUM,
    "statusCode": INTEGER_STATUS_CODE,
    "response": {
        "errorCode": "ERROR_CODE",
        "errorMessage": "ERROR_MESSAGE"
    }
}
```

- **RESPONSE\_TYPE\_ENUM** - The type of response for which the error occurred. It can be `INITIATE`, `VERIFY`, or `FAILED`.
- **INTEGER\_STATUS\_CODE** - The HTTP status code or a status code curated by Otpless.
- **ERROR\_CODE** - The error code for the specific error curated by Otpless.
- **ERROR\_MESSAGE** - The error message that describes the error in detail.

## Errors for different Response Types

<Tabs>
  <Tab title="INITIATE">
    ## Bad requests:

    ***

    | **Status Code** | **Error Code** | **Error Message**                                                                | **Explanation**                                                            |
    | --------------- | -------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
    | **400**         | **7101**       | **Request error: Invalid parameters values or Required parameters are missing.** | **Some required parameters are either missing or have invalid values.**    |
    | **400**         | **7102**       | **Request error: Invalid phone number.**                                         | **The provided phone number format is incorrect or invalid.**              |
    | **400**         | **7103**       | **Request error: Invalid phone number delivery channel.**                        | **The selected delivery channel for the phone number is not supported.**   |
    | **400**         | **7104**       | **Request error: Invalid email.**                                                | **The provided email address is incorrectly formatted or invalid.**        |
    | **400**         | **7105**       | **Request error: Invalid email channel.**                                        | **The selected delivery channel for the email is not supported.**          |
    | **400**         | **7106**       | **Request error: Invalid phoneNumber or email.**                                 | **Either the phone number or email provided is incorrect or missing.**     |
    | **400**         | **7113**       | **Request error: Invalid expiry.**                                               | **The provided expiry time for OTP or request is invalid.**                |
    | **400**         | **7116**       | **Request error: OTP Length is invalid. 4 and 6 only allowed.**                  | **The OTP length must be either 4 or 6 digits.**                           |
    | **400**         | **7121**       | **Request error: Invalid app hash.**                                             | **The provided app hash does not match the expected format.**              |
    | **4000**        | **4000**       | **The request values are incorrect, See details.**                               | **The provided values do not match the expected format.**                  |
    | **4001**        | **4001**       | **The Otpless SDK does not support 2FA as of now.**                              | **The requested authentication method (2FA) is not currently supported.**  |
    | **4003**        | **4003**       | **The request channel \${CHANNEL_0} is incorrect.**                              | **The specified request channel is not enabled in the OTPLESS Dashboard.** |

    ***

    ## Unauthorized requests:

    | **Status Code** | **Error Code** | **Error Message**                                                                  | **Explanation**                                                |
    | --------------- | -------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- |
    | **401**         | **401**        | **UnAuthorized request! Please check your appId.**                                 | **The provided appId is incorrect or missing authentication.** |
    | **401**         | **7025**       | **SMS delivery to this country is not enabled. Contact OTPLESS team to activate.** | **The requested country is not supported for SMS delivery.**   |

    ## HTTP Status Code 429: Too Many Requests:

    ***

    | **Status Code** | **Error Code** | **Error Message**                                                                                                                                  | **Explanation**                                                                                                                           |
    | --------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
    | **429**         | **7020**       | **Authentication Rate Limited reached. Please try again after some time.**                                                                         | **Too many authentication attempts have been made in a short period. The user must wait before trying again.**                            |
    | **429**         | **7022**       | **The identity associated with this request has exceeded the allowed number of authentication requests. Please wait until the rate limit resets.** | **The specific user or identity has hit the authentication request limit. Further attempts are blocked until the limit resets.**          |
    | **429**         | **7023**       | **The IP associated with this request has exceeded the allowed number of authentication requests. Please wait until the rate limit resets.**       | **The IP address sending the request has surpassed the allowed authentication attempts. The user must wait before retrying.**             |
    | **429**         | **7024**       | **The application has exceeded the allowed number of authentication requests. Please wait until the rate limit resets.**                           | **The entire application has reached its authentication request threshold. No further requests can be made until the rate limit resets.** |

    ## Passkey Error Codes for Android

    These are the types of errors that may arise during passkey authentication:

    <Note>
      Error messages and types may depend upon the device manufacturer. Hence if an unknown error type is encountered, errorCode 500 is provided.
    </Note>

    | **Status Code** | **Error Code** | **Error Message**             | **Explanation**                                                    |
    | --------------- | -------------- | ----------------------------- | ------------------------------------------------------------------ |
    | **500**         | **9002**       | **TYPE\_INTERRUPTED**         | **The operation was interrupted before completion.**               |
    | **500**         | **9003**       | **TYPE\_NO\_CREDENTIAL**      | **No credentials are available for the requested operation.**      |
    | **500**         | **9004**       | **TYPE\_UNKNOWN**             | **An unknown issue was encountered during the operation.**         |
    | **500**         | **9005**       | **TYPE\_USER\_CANCELED**      | **The user canceled the authentication process.**                  |
    | **500**         | **9006**       | **TYPE\_NO\_CREATE\_OPTIONS** | **No credential creation options are available for this request.** |
    | **500**         | **9007**       | **TYPE\_NOT\_ALLOWED\_ERROR** | **The operation is not allowed due to security restrictions.**     |
    | **500**         | **9008**       | **TYPE\_TIMEOUT\_ERROR**      | **The operation timed out before completion.**                     |
    | **500**         | **9009**       | **TYPE\_CONSTRAINT\_ERROR**   | **A constraint was violated during the authentication process.**   |
    | **500**         | **500**        | **UNKNOWN ERROR**             | **An unspecified error occurred during the operation.**            |

    ## Network connectivity errors

    | **Status Code** | **Error Code** | **Error Message**            | **Explanation**                                           |
    | --------------- | -------------- | ---------------------------- | --------------------------------------------------------- |
    | **9100**        | **9100**       | **Socket timeout exception** | **The request failed due to a socket timeout exception.** |
    | **9104**        | **9104**       | **IO Exception occurred**    | **The request failed due to an IOException.**             |
    | **9103**        | **9103**       | **Unknown Host Exception**   | **The request failed because the host is unknown.**       |

  </Tab>

  <Tab title="VERIFY">
    ## Bad requests:

    ***

    | **Status Code** | **Error Code** | **Error Message**                          |
    | --------------- | -------------- | ------------------------------------------ |
    | **400**         | **7112**       | **Request error: Empty OTP**               |
    | **400**         | **7115**       | **Request error: OTP is already verified** |
    | **400**         | **7118**       | **Request error: Incorrect OTP!**          |
    | **400**         | **7303**       | **Request error: OTP expired**             |

    ***

    ## Internal server error:

    ***

    | **Status Code** | **Error Message**                           | **Error Code** |
    | --------------- | ------------------------------------------- | -------------- |
    | **500**         | **Something went wrong! Please try again.** | **500**        |

    ***

    ## Network connectivity errors

    | **Status Code** | **Error Code** | **Error Message**            | **Explanation**                                           |
    | --------------- | -------------- | ---------------------------- | --------------------------------------------------------- |
    | **9100**        | **9100**       | **Socket timeout exception** | **The request failed due to a socket timeout exception.** |
    | **9104**        | **9104**       | **IO Exception occurred**    | **The request failed due to an IOException.**             |
    | **9103**        | **9103**       | **Unknown Host Exception**   | **The request failed because the host is unknown.**       |

  </Tab>

  <Tab title="FAILED">
    | **Status Code** | **Error Message**                | **Error Code** |
    | --------------- | -------------------------------- | -------------- |
    | **5003**        | **Failed to initialize the SDK** | **5003**       |

    ***

  </Tab>
</Tabs>
