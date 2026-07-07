> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Welcome to the OTPLESS Connect SDK documentation. This sdk enables native and chrome custom tab connectivity for your application.

export const AndroidRequirements = () => {
return <div>
<h3>Requirements</h3>
<ul>
<li>The compileSdk version should be <strong>35</strong>.</li>
<li>The minimum SDK version supported by the SDK is <strong>21</strong>.</li>
<li>The kotlin version should be <strong>1.9.0 and above</strong>.</li>
<li>The gradle version should be <strong>8.3.1 and above</strong>.</li>
</ul>
   </div>;
};

<AndroidRequirements />

## Step 1: Add SDK Dependency

Add the following dependency in your app's `build.gradle`.

```groovy theme={null}
  implementation ("io.github.otpless-tech:otpless-connect-android:latest_version")
```

<Note>
  Please check the latest version of the [otpless-connect-android](https://central.sonatype.com/artifact/io.github.otpless-tech/otpless-connect-android/versions).
</Note>

## Step 2: Configure your SignIn/SignUp Activity

Import the `ConnectController` class

```kotlin Kotlin theme={null}
import com.otpless.connect.main.ConnectController
```

Declare a `connectController` member in your `SignIn/SignUpActivity`

```kotlin Kotlin theme={null}
private lateinit var connectController: ConnectController
```

Assign the member in `onCreate` of your `SignIn/SignUpActivity` and initialize the connectController.
On initialization is success callback is given in callback method.

```kotlin Kotlin theme={null}
connectController = ConnectController.getInstance(this, BuildConfig.OTPLESS_APP_ID, BuildConfig.OTPLESS_SECRET)
connectController.initializeOtpless {  }
```

To enable the logging in debug app, enable it from our Utility class

```kotlin Kotlin theme={null}
import com.otpless.connect.util.Utility
Utility.isLoggingEnabled = true
```

## Step 3: Starting otpless

When calling the `startOtpless` method from `connectController`, extract the `data` object from its JSON response, convert its key-value pairs into query parameters, append them to your loading URL, and then open the Chrome Custom Tab with the updated URL.

```kotlin Kotlin theme={null}
coroutineScope.launch(Dispatchers.Default) {
  // use response json to pass query params to loading url
    val response = connectController.startOtpless()
    val url = makeLoadingUrl(response.optJSONObject("data")!!)
    launch(Dispatchers.Main) {
            connectController.openChromeTab(Uri.parse(url))
            }
}
```

Sample code to create a loading url

```kotlin Kotlin theme={null}
private fun makeLoadingUrl(queryData: JSONObject): String {
    val uri = Uri.parse(BASE_LOADING_URL).buildUpon()
    for (key in queryData.keys()) {
        val value = queryData.optString(key)
        if (value.isEmpty()) continue
        uri.appendQueryParameter(key, value)
    }
    return uri.build().toString()
}
```

## Step 4: Closing otpless

When your login page is closed or login is successful, close the `connectController`.

```kotlin Kotlin theme={null}
connectController.closeOtpless()
```
