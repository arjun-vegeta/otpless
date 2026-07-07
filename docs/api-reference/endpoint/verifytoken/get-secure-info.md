> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get SecureInfo Of User

> Fetches the SecureInfo of the user by exchanging the token received from OTPLESS after user successfully authenticates.

## OpenAPI

```yaml POST /auth/v1/secure-info
openapi: 3.0.3
info:
  title: Get SecureInfo Of User
  version: 1.0.0
servers:
  - url: https://user-auth.otpless.app
    description: Passwordless Authentication Service
security: []
paths:
  /auth/v1/secure-info:
    post:
      summary: >-
        Get Secure Info By Exchanging Token Received By OTPLESS After User
        Authenticates Successfully
      description: >-
        Fetches the SecureInfo of the user by exchanging the token received from
        OTPLESS after user successfully authenticates.
      operationId: getSecureInfoUsingToken
      requestBody:
        description: >-
          Payload containing the token received from otpless authentication and
          client credentials for verification.
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                client_id:
                  type: string
                  description: Client ID for verification.
                client_secret:
                  type: string
                  description: Client Secret for verification.
                token:
                  type: string
                  description: Token received from otplessUser object.
              required:
                - client_id
                - client_secret
                - token
      responses:
        '200':
          description: The user's information was successfully retrieved.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetSecureInfoResponse'
        '400':
          description: Bad Request - The provided token in invalid.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InvalidTokenResponse'
        '401':
          description: Unauthorized - Invalid client credentials or the token has expired.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ExpiredTokenResponse'
        '429':
          description: >-
            Rate Limit Exceeded - Too many requests were made in a short amount
            of time.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                message: Rate Limit Exceeded
        '500':
          description: >-
            Internal Server Error - An unexpected error occurred while
            processing the request.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                message: Something went wrong. please try again!!
      x-codeSamples:
        - lang: shell
          label: cURL
          source: >
            curl --location 'https://user-auth.otpless.app/auth/v1/secure-info'
            \
             --header 'Content-Type: application/json' \
             --header 'clientId: YOUR_CLIENT_ID' \
             --header 'clientSecret: YOUR_CLIENT_SECRET' \
             --data '{
               "token": "RECEIVED_TOKEN_FROM_OTPLESS"
             }'
components:
  schemas:
    GetSecureInfoResponse:
      type: object
      properties:
        status:
          type: string
          description: Status of the response.
          example: SUCCESS
        secure_info:
          type: object
          properties:
            incognito:
              type: boolean
              description: Indicates if the user is browsing in incognito mode.
              example: false
            confidence:
              type: object
              properties:
                score:
                  type: integer
                  description: Confidence score.
                  example: 0
                revision:
                  type: string
                  description: Revision version of the confidence metric.
                  example: v1.1
            bot:
              type: object
              properties:
                result:
                  type: string
                  description: Bot detection result.
                  example: notDetected
            rootApps:
              type: object
              properties:
                result:
                  type: boolean
                  description: Indicates if root apps are detected.
                  example: false
            emulator:
              type: object
              properties:
                result:
                  type: boolean
                  description: Indicates if the device is an emulator.
                  example: false
            vpn:
              type: object
              properties:
                result:
                  type: boolean
                  description: Indicates if a VPN is active.
                  example: true
                originTimezone:
                  type: string
                  description: The original timezone of the VPN.
                  example: ''
                originCountry:
                  type: string
                  description: The country of the VPN origin.
                  example: unknown
                methods:
                  type: object
                  properties:
                    timezoneMismatch:
                      type: boolean
                      example: false
                    publicVPN:
                      type: boolean
                      example: true
                    auxiliaryMobile:
                      type: boolean
                      example: false
                    osMismatch:
                      type: boolean
                      example: false
            tampering:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
                anomalyScore:
                  type: integer
                  example: 0
            clonedApp:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            factoryReset:
              type: object
              properties:
                time:
                  type: string
                  format: date-time
                  example: '2024-11-10T10:01:48Z'
                timestamp:
                  type: integer
                  example: 1731232908
            jailbroken:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            frida:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            privacySettings:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            virtualMachine:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            locationSpoofing:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            suspectScore:
              type: object
              properties:
                result:
                  type: integer
                  example: 5
            developerTools:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
        network_info:
          type: object
          properties:
            ip:
              type: string
              description: User's IP address.
              example: 103.246.62.146
            timezone:
              type: string
              description: User's timezone.
              example: Asia/Kolkata
            ipLocation:
              type: object
              properties:
                accuracyRadius:
                  type: integer
                  example: 1000
                city:
                  type: object
                subdivisions:
                  type: object
                country:
                  type: object
                  properties:
                    code:
                      type: string
                      example: IN
                    name:
                      type: string
                      example: India
                continent:
                  type: object
                  properties:
                    code:
                      type: string
                      example: AS
                latitude:
                  type: number
                  example: 21.9974
                longitude:
                  type: number
                  example: 79.0011
                asn:
                  type: object
                  properties:
                    asn:
                      type: string
                      example: '139570'
                    name:
                      type: string
                      example: Spectrum Internet Services
                    network:
                      type: string
                      example: 103.246.62.0/23
        device_info:
          type: object
          properties:
            userAgent:
              type: string
              example: >-
                Mozilla/5.0 (Linux; Android 14; SM-A556E Build/UP1A.231005.007;
                wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0
                Chrome/130.0.6723.107 Mobile Safari/537.36 otplesssdk
            platform:
              type: string
              example: Linux aarch64
            vendor:
              type: string
              example: Google Inc.
            browser:
              type: string
              example: Chrome
            connection:
              type: string
              example: 4g
            language:
              type: string
              example: en-IN
            cookieEnabled:
              type: boolean
              example: true
            screenWidth:
              type: integer
              example: 412
            screenHeight:
              type: integer
              example: 892
            screenColorDepth:
              type: integer
              example: 24
            devicePixelRatio:
              type: number
              example: 2.625
            timezoneOffset:
              type: integer
              example: -330
            cpuArchitecture:
              type: string
              example: 8-core
            fontFamily:
              type: string
              example: sans-serif
            deviceId:
              type: string
              example: lm7zn1nz9jyyh0ab
            browserInfo:
              type: object
              properties:
                browserName:
                  type: string
                  example: Other
                browserMajorVersion:
                  type: string
                  example: ''
                browserFullVersion:
                  type: string
                  example: ''
                os:
                  type: string
                  example: Android
                osVersion:
                  type: string
                  example: '14'
                device:
                  type: string
                  example: Samsung SM-A556E
                userAgent:
                  type: string
                  example: >-
                    Dalvik/2.1.0 (Linux; U; Android 14; SM-A556E
                    Build/UP1A.231005.007)
    InvalidTokenResponse:
      type: object
      properties:
        message:
          type: string
          description: A brief error message.
        errorCode:
          type: string
          description: Specific error code related to the failure.
        description:
          type: string
          description: Detailed description of the error.
      example:
        message: Invalid Request
        errorCode: '7114'
        description: 'Request error: Invalid token'
    ExpiredTokenResponse:
      type: object
      properties:
        message:
          type: string
          description: A brief error message.
        errorCode:
          type: string
          description: Specific error code related to the failure.
        description:
          type: string
          description: Detailed description of the error.
      example:
        message: Expired
        errorCode: '7301'
        description: 'Request error: Token is expired'
    ErrorResponse:
      type: object
      properties:
        message:
          type: string
          description: Error message detailing the reason for the failure.
```
