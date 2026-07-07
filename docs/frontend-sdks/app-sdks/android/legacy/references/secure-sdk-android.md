> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure SDK integration

## Step 1: Add `OtplessSecureService` dependencies

To integrate `OtplessSecureService` into your project, include the following dependency in your app-level `build.gradle` file under the `dependencies` section:

```groovy build.gradle theme={null}
// Otpless auth SDK dependency (required)
implementation 'io.github.otpless-tech:otpless-android-sdk:2.5.2'
// Otpless Secure SDK dependency
implementation 'io.github.otpless-tech:otpless-secure-sdk:0.1.5'
```

In your `settings.gradle` file, add the following dependencies:

```groovy settings.gradle theme={null}
dependencyResolutionManagement {
  repositories {
        maven {  url 'https://maven.fpregistry.io/releases'  }
        maven {  url 'https://jitpack.io'  }
  }
 }
```

Make sure to sync your project with Gradle after adding this dependency.

## Step 2: Initialize `OtplessView` in your `LoginActivity`

<Tabs>
  <Tab title="Java">
    First, import `OtplessView`:

    ```java theme={null}
    import com.otpless.main.OtplessView;
    ```

    Declare an `OtplessView` instance:

    ```java theme={null}
    OtplessView otplessView;
    ```

    Initialize `OtplessView` in `onCreate()` of your activity:

    ```java theme={null}
    otplessView = OtplessManager.getInstance().getOtplessView(this);
    ```

  </Tab>

  <Tab title="Kotlin">
    First, import `OtplessView`:

    ```kotlin theme={null}
    import com.otpless.main.OtplessView
    ```

    Declare an `OtplessView` instance:

    ```kotlin theme={null}
    private lateinit var otplessView: OtplessView
    ```

    Initialize `OtplessView` in `onCreate()` of your activity:

    ```kotlin theme={null}
    otplessView = OtplessManager.getInstance().getOtplessView(this)
    ```

  </Tab>
</Tabs>

## Step 3: Attach `OtplessSecureService` in your activity

<Tabs>
  <Tab title="Java">
    ```java theme={null}
    otplessView.attachOtplessSecureService(  
            OtplessSecureManager.INSTANCE.getOtplessSecureService(this, YOUR_APP_ID)  
    );
    ```
  </Tab>

  <Tab title="Kotlin">
    ```kotlin theme={null}
    otplessView.attachOtplessSecureService(  
        OtplessSecureManager.getOtplessSecureService(this, YOUR_APP_ID)  
    )
    ```
  </Tab>
</Tabs>

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>
