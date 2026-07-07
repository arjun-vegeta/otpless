> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# What's Redirect URI?

> A Redirect URI is a critical component in the authentication process, acting as the endpoint to which users are directed after authentication. In mobile apps, these often take the form of deep links, which bring users back to the app from a web-based authentication flow.

| Type                                                                                                | Description                                                                | Example                        |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------ |
| **Web URL**                                                                                         | A standard HTTPS web URL for redirecting back to web application.          | `https://example.com/auth`     |
| **API Endpoint**                                                                                    | A GET API that can be used to directly handle the authentication response. | `https://api.example.com/auth` |
| **[Application Deep Link](/knowledge-base/redirect-uri#setting-up-a-redirect-uri-for-mobile-apps)** | A custom scheme URL for redirecting back to a mobile application.          | `example://auth`               |

## Setting Up a Redirect URI for Mobile Apps

### Android

1. **Defining a Deep Link in the Manifest**: Start by adding intent filters in your `AndroidManifest.xml`. This tells Android how to handle URLs intended for your app. Define a custom scheme or host to ensure your app uniquely captures the redirect URL.

   ```xml theme={null}
   <activity android:name=".MainActivity">
       <intent-filter>
           <action android:name="android.intent.action.VIEW" />
           <category android:name="android.intent.category.DEFAULT" />
           <category android:name="android.intent.category.BROWSABLE" />
           <data android:scheme="yourcustomscheme" android:host="redirect" />
       </intent-filter>
   </activity>
   ```

2. **Handling the Intent in an Activity**: In your `MainActivity`, override `onCreate` or `onNewIntent` to handle the incoming intent. Extract the code or token from the URI:

   ```java theme={null}
   @Override
   protected void onNewIntent(Intent intent) {
       super.onNewIntent(intent);
       Uri uri = intent.getData();
       if (uri != null && uri.getScheme().equals("yourcustomscheme")) {
           String code = uri.getQueryParameter("code");
           // Handle the code
       }
   }
   ```

### iOS

1. **Configuring URL Schemes**: In Xcode, go to your project settings and add a URL scheme under URL Types. This is your app's custom URL scheme.

2. **Handling Incoming URLs**: Implement URL handling in your `AppDelegate`. This method is invoked when your app is asked to open a custom URL scheme:

   ```swift theme={null}
   func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
       if url.scheme == "yourcustomscheme" {
           let code = url.queryItems?["code"]
           // Process the code
           return true
       }
       return false
   }
   ```

Here,`yourcustomscheme` should be replaced with the custom URL scheme you defined.

### React Native

1. **Register a Custom URL Scheme**:

   - For Android, modify `AndroidManifest.xml` as shown in the Android section.
   - For iOS, configure URL Types in Xcode project settings.

2. **Handling Incoming Links**:

   - Use the `Linking` API in React Native to handle incoming URLs.
   - Listen for incoming URLs and parse them to extract the `code`.

   ```jsx theme={null}
   import { Linking } from 'react-native';

   Linking.addEventListener('url', handleOpenURL);

   function handleOpenURL(event) {
     let data = Linking.parse(event.url);
     let code = data.queryParams.code;
     // Use the code here
   }
   ```

### Flutter

1. **Register a Custom URL Scheme**:

   - For Android, modify `AndroidManifest.xml` as shown in the Android section.
   - For iOS, configure URL Types in Xcode project settings.

2. **Handling Incoming Links**:

   - Use the `Linking` API in React Native to handle incoming URLs.
   - Listen for incoming URLs and parse them to extract the `code`.

   ```jsx theme={null}
   import { Linking } from 'react-native';

   Linking.addEventListener('url', handleOpenURL);

   function handleOpenURL(event) {
     let data = Linking.parse(event.url);
     let code = data.queryParams.code;
     // Use the code here
   }
   ```

### Best Practices

- Ensure the URL scheme is unique to avoid conflicts with other apps.
- Handle exceptions and edge cases where the URL might not contain the expected parameters.

## Conclusion

Implementing and handling Redirect URIs in mobile applications is a key skill in today’s app development landscape. With the right setup and attention to detail, you can create a smooth and secure authentication experience for your users.

## Additional Resources

- [Official Android Deep Linking Guide](https://developer.android.com/training/app-links/deep-linking)
- [Handling URL Schemes in iOS](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app)
- [Deep Linking in React Native](https://reactnative.dev/docs/linking)
- [Deep Linking in Flutter with uni\_links](https://pub.dev/packages/uni_links)
