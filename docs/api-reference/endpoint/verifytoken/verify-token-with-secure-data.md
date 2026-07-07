> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify token

> Validates user details by exchanging the token obtained from the otplessUser object for the user's information. This server-to-server call requires authentication using the client ID and secret. Also the secureInfo details will only be included when the Secure SDK is integrated as part of the authentication implementation.

## OpenAPI

```yaml POST /auth/v1/validate/token
openapi: 3.0.3
info:
  title: Verify Token With Secure Data
  version: 1.0.0
servers:
  - url: https://user-auth.otpless.app
    description: Passwordless Authentication Service
security:
  - clientIdHeader: []
    clientSecretHeader: []
paths:
  /auth/v1/validate/token:
    post:
      summary: Verify SDK Token with secure data
      description: >-
        Validates user details by exchanging the token obtained from the
        otplessUser object for the user's information. This server-to-server
        call requires authentication using the client ID and secret. Also the
        secureInfo details will only be included when the Secure SDK is
        integrated as part of the authentication implementation.
      operationId: verifySdkTokenWithSecureData
      requestBody:
        description: >-
          Payload containing the token received from otpless authentication for
          verification.
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                token:
                  type: string
                  description: Token received from otplessUser object.
              required:
                - token
      responses:
        '200':
          description: The user's information was successfully retrieved.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SecureTokenResponse'
        '400':
          description: Bad Request - The provided token has expired.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                message: Invalid Request
                errorCode: '7114'
                description: 'Request error: Invalid token'
        '401':
          description: Unauthorized - Invalid client credentials.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                message: Expired
                errorCode: '7301'
                description: 'Request error: Token is expired'
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
            curl --location
            'https://user-auth.otpless.app/auth/v1/validate/token' \
              --header 'Content-Type: application/json' \
              --header 'clientId: YOUR_CLIENT_ID' \
              --header 'clientSecret: YOUR_CLIENT_SECRET' \
              --data '{
                  "token": "RECEIVED_TOKEN_FROM_OTPLESS"
              }'
components:
  schemas:
    SecureTokenResponse:
      type: object
      properties:
        token:
          type: string
          example: TOKEN_VALUE
        status:
          type: string
          example: SUCCESS
        userId:
          type: string
          example: USER_ID
        timestamp:
          type: string
          format: date-time
          example: '2024-10-15T14:07:14Z'
        identities:
          type: array
          items:
            type: object
            properties:
              identityType:
                type: string
                example: MOBILE
              identityValue:
                type: string
                example: '919999999999'
              channel:
                type: string
                example: OAUTH
              methods:
                type: array
                items:
                  type: string
                  example: TRUE_CALLER
              verified:
                type: boolean
                example: true
              verifiedAt:
                type: string
                format: date-time
                example: '2024-10-15T14:07:14Z'
        network:
          type: object
          properties:
            ip:
              type: string
              example: 103.246.62.146
            timezone:
              type: string
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
        deviceInfo:
          type: object
          properties:
            userAgent:
              type: string
              example: >-
                Mozilla/5.0 (Linux; Android 14; RMX3998 Build/UP1A.231005.007;
                wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0
                Chrome/129.0.6668.100 Mobile Safari/537.36 otplesssdk
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
              example: en-GB
            cookieEnabled:
              type: boolean
              example: true
            screenWidth:
              type: integer
              example: 360
            screenHeight:
              type: integer
              example: 800
            screenColorDepth:
              type: integer
              example: 24
            devicePixelRatio:
              type: number
              example: 3
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
              example: DEVICE_ID
            browserInfo:
              type: object
              properties:
                browserName:
                  type: string
                  example: Other
                os:
                  type: string
                  example: Android
                osVersion:
                  type: string
                  example: '14'
                device:
                  type: string
                  example: Generic Smartphone
        secureInfo:
          type: object
          properties:
            incognito:
              type: boolean
              example: false
            confidence:
              type: object
              properties:
                score:
                  type: integer
                  example: 1
                revision:
                  type: string
                  example: v1.1
            bot:
              type: object
              properties:
                result:
                  type: string
                  example: notDetected
            rootApps:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            emulator:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
            vpn:
              type: object
              properties:
                result:
                  type: boolean
                  example: true
                originCountry:
                  type: string
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
            tampering:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
                anomalyScore:
                  type: integer
                  example: 0
            jailbroken:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
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
                  example: '2024-10-09T10:53:31Z'
                timestamp:
                  type: integer
                  example: 1728471211
            frida:
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
            privacySettings:
              type: object
              properties:
                result:
                  type: boolean
                  example: false
    ErrorResponse:
      type: object
      properties:
        message:
          type: string
          description: Error message detailing the reason for the failure.
  securitySchemes:
    clientIdHeader:
      type: apiKey
      in: header
      name: clientId
      description: The `clientId` used for API authentication.
    clientSecretHeader:
      type: apiKey
      in: header
      name: clientSecret
      description: The `clientSecret` used for API authentication.
```
