> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify token (Legacy)

> Validates user details by exchanging the token obtained from the otplessUser object for the user's information. This server-to-server call requires authentication using the client ID and secret.

## OpenAPI

```yaml POST /userInfo
openapi: 3.0.3
info:
  title: Passwordless Authentication API
  description: >-
    This API provides mechanisms for passwordless authentication, leveraging
    OTPs sent via various channels and supporting token validation for user
    information retrieval.
  version: 1.0.0
servers:
  - url: https://auth.otpless.app/auth
    description: Passwordless Authentication Service
security: []
paths:
  /userInfo:
    post:
      summary: Verify SDK Token
      description: >-
        Validates user details by exchanging the token obtained from the
        otplessUser object for the user's information. This server-to-server
        call requires authentication using the client ID and secret.
      operationId: verifySdkToken
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
                $ref: '#/components/schemas/UserInfoResponse'
        '400':
          description: Bad Request - The provided token has expired.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                message: token is expired
        '401':
          description: Unauthorized - Invalid client credentials.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                message: Invalid secrets
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
          source: |
            curl --location 'https://auth.otpless.app/auth/userInfo' 
            --header 'Content-Type: application/x-www-form-urlencoded' 
            --data-urlencode 'token=RECEIVED_TOKEN_FROM_OTPLESS' 
            --data-urlencode 'client_id=YOUR_CLIENT_ID' 
            --data-urlencode 'client_secret=YOUR_CLIENT_SECRET'
        - lang: python
          label: Python
          source: >
            # Make sure you install the otpless package

            # pip install OTPLessAuthSDK

            import OTPLessAuthSDK


            # Setup necessary parameters

            client_id = "your_client_id"

            client_secret = "your_client_secret"

            token="your_token_token"

            # Use the verify_code function to verify the code and get user
            details

            try:
              user_details = OTPLessAuthSDK.UserDetail.verify_token(token, client_id, client_secret)

              printf("User details: {user_details}")
            except Exception as e:
              printf("An error occurred: {e}")
        - lang: java
          label: Java
          source: |
            //Make sure you add the below dependency in your pom.xml
            //<dependency>
            //<groupId>io.github.otpless-tech.auth</groupId>
            //<artifactId>otpless-auth</artifactId>
            //<version>1.0.8</version>
            //</dependency>
            import com.otpless.authsdk.OTPLessAuth
            import com.otpless.authsdk.UserDetail

            try {
              UserDetail userDetail = OTPLessAuth.verifyToken(
              "your_auth_token_here",
              "your_client_id_here",
              "your_client_secret_here"
              );

              // Access user details
              System.out.println("User Name: " + userDetail.getName());
              System.out.println("User Email: " + userDetail.getEmail());
              // ... (Access other user details as needed)

            } catch (Exception e) {
              // Handle exceptions
            }
        - lang: javascript
          label: Node Js
          source: |
            // Make sure you install the package using npm
            // npm install otpless-node-js-auth-sdk
            const { UserDetail } = require("otpless-node-js-auth-sdk");
            const token = "..."; // Replace with your token
            const clientId = "..."; // Replace with your client ID
            const clientSecret = "..."; // Replace with your client secret

            const userDetail = await UserDetail.verifyToken(
              token,
              clientId,
              clientSecret
            );
            console.log("User Details:", userDetail);
        - lang: javascript
          label: Next Js
          source: >
            // Make sure you install the package using npm

            // npm install otpless-next-js-auth-sdk

            import { verifyToken } from 'otpless-next-js-auth-sdk';


            const token = "..."; // Replace with your token

            const clientId = "..."; // Replace with your client ID

            const clientSecret = "..."; // Replace with your client secret


            const userDetail = await verifyToken(idToken, clientId,
            clientSecret);

            console.log("User Details:", userDetail);
        - lang: php
          label: PHP
          source: |
            // Make sure you install the below package
            // composer require otpless/otpless-auth-sdk

            require '../vendor/autoload.php';
            use Otpless\OTPLessAuth;
            // Your ID token to decode
            $token = 'your token here';

            $clientId = 'your client id here';
            $clientSecret = 'your client secret here';
            // Initialize the library class
            $auth = new OtplessAuth(); 

            $data = $auth->verifyToken("token","client id","client secret");
            print_r($data);
        - lang: go
          label: GO
          source: |
            // Make sure you install the below package
            // go get github.com/otpless-tech/otpless-auth-sdk@latest
            package main

            import (
              "fmt"
              otplessAuthSdk "github.com/otpless-tech/otpless-auth-sdk"
            )
            func main() {
              clientID := "your_client_id"
              clientSecret := "your_client_secret"
              token := "token"

              result, err := otplessAuthSdk.VerifyAuthToken(token, clientID, clientSecret)

              if err != nil {
                fmt.Println("Error:", err)
                return
              }
              fmt.Println("Result:", result)
            }
components:
  schemas:
    UserInfoResponse:
      type: object
      properties:
        name:
          type: string
        email:
          type: string
        first_name:
          type: string
        last_name:
          type: string
        family_name:
          type: string
        phone_number:
          type: string
        national_phone_number:
          type: string
        country_code:
          type: string
        email_verified:
          type: boolean
        auth_time:
          type: string
        authentication_details:
          type: object
          properties:
            phone:
              $ref: '#/components/schemas/PhoneAuthDetails'
            email:
              $ref: '#/components/schemas/EmailAuthDetails'
    ErrorResponse:
      type: object
      properties:
        message:
          type: string
          description: Error message detailing the reason for the failure.
    PhoneAuthDetails:
      type: object
      properties:
        mode:
          type: string
        phone_number:
          type: string
        country_code:
          type: string
        auth_state:
          type: string
    EmailAuthDetails:
      type: object
      properties:
        email:
          type: string
        mode:
          type: string
        auth_state:
          type: string
```
