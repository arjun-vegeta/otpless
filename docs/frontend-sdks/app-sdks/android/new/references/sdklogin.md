> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrate Facebook & Google SDKs

This section provides detailed steps for integrating Google and Facebook login functionality into your application using the Google SDK and Facebook SDK. This guide will walk you through the process of incorporating authentication via Google and Facebook, enabling users to seamlessly log in using their existing accounts. The integration covers both the setup of the respective SDKs and the necessary configuration steps for a smooth login experience.

## Prerequisites

1. Before you proceed with integrating Google and Facebook login using the Google SDK and Facebook SDK, make sure to complete the integration steps from the [OTPless Android Headless SDK Documentation](/frontend-sdks/app-sdks/android/new/headless/intro).

2. Add SDK dependencies:

```groovy Build.gradle theme={null}
dependencies {
    // For facebook login sdk:
    implementation("io.github.otpless-tech:fusionfacebook:latest_version")
    // For google login sdk:
    implementation("io.github.otpless-tech:fusiongoogle:latest_version")
}
```

Once you’ve completed the integration from the link above, you can continue with the following steps to incorporate Google and Facebook login into your app.

<Note>
  Please check the latest version of the [Google SDK here](https://central.sonatype.com/artifact/io.github.otpless-tech/fusiongoogle) and [Facebook SDK here](https://central.sonatype.com/artifact/io.github.otpless-tech/fusionfacebook).
  Make sure to **synchronize** your Gradle project to fetch the dependency.
</Note>

#### Choose your platform type to initiate login:

<Tabs>
  <Tab title="Google">
    ## Request

    To initiate an google login, set the channel type as `GOOGLE_SDK`.

    <CodeGroup>
      ```java Java theme={null}
      final OtplessRequest googleSdkRequest = new OtplessRequest();
      googleSdkRequest.setChannelType(OtplessChannelType.GOOGLE_SDK);
      OtplessSDK.INSTANCE.startAsync(googleSdkRequest, this::onOtplessResponse);
      ```

      ```kotlin Kotlin theme={null}
      val googleSdkRequest = OtplessRequest()
      googleSdkRequest.setChannelType(OtplessChannelType.GOOGLE_SDK)
      OtplessSDK.start(request, this::onOtplessResponse)
      ```
    </CodeGroup>

    ## Note: Provide Google Client ID

    For proper functioning of Google login in your application, you need to provide the `ClientId` and `Client Secret` of the credentials created on the [Google Cloud Console](https://console.cloud.google.com/).

    Please ensure that the `ClientId` and `Client Secret` associated with your application is provided to OTPless for seamless integration and authentication functionality. This is crucial for the authentication process to work correctly.

  </Tab>

  <Tab title="Facebook">
    ## Add Facebook Login Configuration to `strings.xml`

    To integrate Facebook login into your Android application, you need to add the following configuration to your `strings.xml` file:

    ```xml theme={null}
    <string name="facebook_app_id">FACEBOOK_APP_ID</string>
    <string name="fb_login_protocol_scheme">fbFACEBOOK_APP_ID</string>
    <string name="facebook_client_token">FACEBOOK_CLIENT_TOKEN</string>
    ```

    Replace `FACEBOOK_APP_ID` with your actual Facebook app ID and `FACEBOOK_CLIENT_TOKEN` with your Facebook client token.

    Make sure to add these strings in the `res/values/strings.xml` file of your Android project to configure Facebook login successfully.

    ## Add Facebook Login Configuration to `AndroidManifest.xml`

    To configure Facebook login in your Android application, add the following code in the `<application>` tag of your `AndroidManifest.xml`:

    ```xml theme={null}
    <meta-data
        android:name="com.facebook.sdk.ApplicationId"
        android:value="@string/facebook_app_id" />
    <meta-data
        android:name="com.facebook.sdk.ClientToken"
        android:value="@string/facebook_client_token" />

    <activity
        android:name="com.facebook.FacebookActivity"
        android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        android:label="@string/app_name" />
    <activity
        android:name="com.facebook.CustomTabActivity"
        android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="@string/fb_login_protocol_scheme" />
        </intent-filter>
    </activity>
    ```

    Additionally, add the following code to the `<manifest>` tag of your `AndroidManifest.xml`:

    ```xml theme={null}
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" tools:node="remove"/>
    <queries>
        <package android:name="com.facebook.katana" />
    </queries>
    ```

    These entries are necessary for enabling Facebook login in your app and ensuring it functions properly.

    ## Request

    To initiate an google login, set the channel type as `FACEBOOK_SDK`.

    <CodeGroup>
      ```java Java theme={null}
      final OtplessRequest facebookSdkRequest = new OtplessRequest();
      facebookSdkRequest.setChannelType(OtplessChannelType.FACEBOOK_SDK);
      OtplessSDK.INSTANCE.startAsync(facebookSdkRequest, this::onOtplessResponse);
      ```

      ```kotlin Kotlin theme={null}
      val facebookSdkRequest = OtplessRequest()
      facebookSdkRequest.setChannelType(OtplessChannelType.FACEBOOK_SDK)
      OtplessSDK.start(request, this::onOtplessResponse)
      ```
    </CodeGroup>

  </Tab>
</Tabs>
