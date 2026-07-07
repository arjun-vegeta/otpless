> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrate Facebook, Apple & Google SDKs

This section provides detailed steps for integrating Google and Facebook login functionality into your application using the Google SDK and Facebook SDK. This guide will walk you through the process of incorporating authentication via Google and Facebook, enabling users to seamlessly log in using their existing accounts. The integration covers both the setup of the respective SDKs and the necessary configuration steps for a smooth login experience.

## Prerequisites

Before you proceed with integrating Google and Facebook login using the Google SDK and Facebook SDK, make sure to complete the integration steps from the [OTPless iOS Headless SDK Documentation](/frontend-sdks/app-sdks/ios/new/headless).

Once you’ve completed the integration from the link above, you can continue with the following steps to incorporate Google and Facebook login into your app.

<Note>
  Please find the latest version of the SDK [here](https://github.com/otpless-tech/otpless-headless-iOS-sdk/releases).
</Note>

## Add SDK Dependency

SDK can be installed via both Cocoapods and Swift Package Manager.

### Cocoapods

- Open your app's project file `.xcodeproj`.
- Add the following line into the dependencies section of your project's `Podfile`:

```ruby theme={null}
# To use both Google and Facebook SDK, use:
pod 'OtplessBM'

# To use either one of Google or Facebook SDK, use Otpless/Core with either of the commands:
pod 'OtplessBM/Core'
pod 'OtplessBM/FacebookSupport'
# or GoogleSupport for Google SDK
pod 'OtplessBM/GoogleSupport'
```

### Swift Package Manager

1. In Xcode, click File > Swift Packages > Add Package Dependency.
2. In the dialog that appears, enter the repository URL: [https://github.com/otpless-tech/otpless-headless-iOS-sdk.git](https://github.com/otpless-tech/otpless-headless-iOS-sdk.git).
3. Select the dependency rule as `exact version` and use the **latest version**.

- **Note**: If you are using SPM for SDK installation, both GoogleSupport and FacebookSupport are installed. Also, no dependency is required for Apple SDK.

#### Choose your platform type to initiate login:

<Tabs>
  <Tab title="Google">
    ## Configuration for Google SDK Login

    ### Update the `Info.plist` File

    To enable Google SDK login in your app, you'll need to add the necessary configurations in your `Info.plist` file.

    * **Add your `GIDClientID`**: This is the Google Client ID that you will obtain from the Google Developer Console.

    ```xml theme={null}
    <key>GIDClientID</key>
    <string>YOUR_GOOGLE_CLIENT_ID</string>
    ```

    ### Configure URL Schemes

    Google sign-in requires a URL scheme that ensures the app can handle the redirect after authentication. This URL scheme should be based on the reversed Google Client ID.

    * **Add the `CFBundleURLTypes` configuration**:

    ```xml theme={null}
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>DOT_REVERSED_GOOGLE_CLIENT_ID</string>
            </array>
        </dict>
    </array>
    ```

    Make sure to replace `YOUR_GOOGLE_CLIENT_ID` with the actual `ClientID` provided by Google and `DOT_REVERSED_GOOGLE_CLIENT_ID` with the reversed version of your `ClientID`.

    This setup ensures that your app can integrate smoothly with Google's login system and handle redirects after authentication.

    ### AppDelegate Configuration

    Handles OTPless deeplinks when the app is opened via a URL.

    <CodeGroup>
      ```swift App Delegate theme={null}
      func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
            if Otpless.shared.isOtplessDeeplink(url: url) {
                Task(priority: .background) {
                    await Otpless.shared.processOtplessDeeplink(url: url)
                }
                return true
            }
            return false
      }
      ```

      ```swift Scene Delegate theme={null}
      func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
            for context in URLContexts {
                if Otpless.shared.isOtplessDeeplink(url: context.url.absoluteURL) {
                  Task(priority: .background) {
                      await Otpless.shared.processOtplessDeeplink(url: context.url.absoluteURL)
                  }
                  break
                }
            }
      }
      ```
    </CodeGroup>

    ## Request

    To initiate an google login, set the channel type as `GOOGLE_SDK`.

    ```swift theme={null}
    let request = OtplessRequest()
    request.set(channelType: .GOOGLE_SDK)
    Task(priority: .background) {
        await Otpless.shared.start(withRequest: request)
    }
    ```

    ## Note: Provide Google Client ID

    For proper functioning of Google login in your application, you need to provide the `ClientId` and `Client Secret` of the credentials created on the [Google Cloud Console](https://console.cloud.google.com/).

    Please ensure that the `ClientId` and `Client Secret` associated with your application is provided to OTPless for seamless integration and authentication functionality. This is crucial for the authentication process to work correctly.

  </Tab>

  <Tab title="Facebook">
    ## Configuration for Facebook SDK Login

    ### Update the `Info.plist` File

    To enable Facebook SDK login in your app, you'll need to add the necessary configurations in your `Info.plist` file.

    * **Add your** `FacebookAppID`,`FacebookClientToken` and `FacebookDisplayName`: These details you will obtain from the Facebook Developer Console.

    ```xml theme={null}
    <key>FacebookAppID</key>
    <string>FACEBOOK_APPID</string>
    <key>FacebookClientToken</key>
    <string>FACEBOOK_CLIENT_TOKEN</string>
    <key>FacebookDisplayName</key>
    <string>YOUR_APP_NAME</string>
    ```

    ### Configure URL Schemes

    Facebook sign-in requires a query to `fbapi` URL scheme and a URL scheme that ensures the app can handle the redirect after authentication.

    * **Add the `CFBundleURLTypes` configuration**:

    ```xml theme={null}
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
    		<key>CFBundleURLSchemes</key>
    		  <array>
    		    <string>fb{FB_APPID}</string>
    		  </array>
      </dict>
    </array>
    <key>LSApplicationQueriesSchemes</key>
    <array>
        <string>fbapi</string>
    </array>
    ```

    ### AppDelegate Configuration

    Handles OTPless deeplinks when the app is opened via a URL.

    <CodeGroup>
      ```swift App Delegate theme={null}
      func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
            Otpless.shared.registerFBApp(application, didFinishLaunchingWithOptions: launchOptions)
            // Your code
            return true
      }

      func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
            Otpless.shared.registerFBApp(app, open: url, options: options)
            if Otpless.shared.isOtplessDeeplink(url: url){
                Task(priority: .background) {
                    await Otpless.shared.processOtplessDeeplink(url: url)
                }
            }
            return true
      }
      ```

      ```swift Scene Delegate theme={null}

      func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        Otpless.shared.registerFBApp(openURLContexts: URLContexts)
          for context in URLContexts {
            if Otpless.shared.isOtplessDeeplink(url: context.url.absoluteURL) {
              Task(priority: .background) {
                  await Otpless.shared.processOtplessDeeplink(url: context.url.absoluteURL)
              }
              break
            }
          }
      }
      ```
    </CodeGroup>

    ## Request

    To initiate an facebook login, set the channel type as `FACEBOOK_SDK`.

    ```swift theme={null}
    if (Otpless.shared.isSdkReady()){
        let request = OtplessRequest()
        request.set(channelType: OtplessChannelType.APPLE_SDK)
        otplessTask?.cancel()
        otplessTask = Task(priority: .userInitiated) {
            await Otpless.shared.start(withRequest: request)
        }
    }
    ```

  </Tab>

  <Tab title="Apple">
    ## Configuration for Apple SDK Login

    ### Configure Otpless dashboard

    * Go to the [Otpless Dashboard](https://otpless.com/dashboard/customer/channels).
    * Select your app.
    * Enable the "Sign in with Apple" channel.
    * Enable the `Native SDK Configuration` option.

    ### Add capabilities

    * Open your project in Xcode.
    * Select your project in the sidebar.
    * Select your target.
    * Select the "Capabilities" tab.
    * Enable the "Sign in with Apple" capability.

    ## Request

    To initiate an apple login, set the channel type as `APPLE_SDK`.

    ```swift theme={null}
    let request = OtplessRequest()
    request.set(channelType: .APPLE_SDK)
    Task(priority: .background) {
        await Otpless.shared.start(withRequest: request)
    }
    ```

  </Tab>
</Tabs>
