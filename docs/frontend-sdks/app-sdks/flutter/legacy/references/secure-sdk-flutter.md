> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure SDK integration

## Prerequisites

Install the OTPLESS SDK dependency by running the following command in your terminal at the root of your Flutter project before utilizing `OtplessSecureService`:

```bash theme={null}
flutter pub add otpless_flutter:2.2.1
flutter pub get
```

## Step 1: Add `OtplessSecureService` dependencies

To integrate `OtplessSecureService` into your project, include the following dependency in your app-level `build.gradle` file under the `dependencies` section:

<CodeGroup>
  ```groovy build.gradle theme={null}
  implementation 'io.github.otpless-tech:otpless-secure-sdk:0.1.5'
  ```
</CodeGroup>

In your project-level `build.gradle`, add the following:

<CodeGroup>
  ```groovy build.gradle theme={null}
  allprojects {  
    repositories {  
          maven {  url 'https://maven.fpregistry.io/releases'  }  
          maven {  url 'https://jitpack.io'  }  
    }
   }
  ```
</CodeGroup>

Make sure to sync your project with Gradle after adding this dependency.

## Step 2: Instantiate the `Otpless` Plugin

Create an instance of `Otpless` in your dart file.

<CodeGroup>
  ```dart Dart theme={null}
  final _otplessFlutterPlugin = Otpless();
  ```
</CodeGroup>

## Step 3: Attach `OtplessSecureService` in `initState()`

In the `initState()` method of your widget, attach the `OtplessSecureService` using your `APP_ID`. This ensures the secure service is properly initialized on Android platforms.

<CodeGroup>
  ```dart Dart theme={null}
  @override  
  void initState() {  
    super.initState();  
    if (Platform.isAndroid) {   
  	attachSecureService();  
    }  
    //...
  }
  ```
</CodeGroup>

Attach the Secure SDK:

<CodeGroup>
  ```dart Dart theme={null}
  Future<void> attachSecureService() async {  
    try {  
      await _otplessFlutterPlugin.attachSecureService(YOUR_APP_ID);  
    } on PlatformException catch (e) {  
      // Could not attach OtplessSecureService, handle error
      print(  
          'PlatformException: ${e.message}, code: ${e.code}, details: ${e.details}');  
    }  
  }
  ```
</CodeGroup>

<Tip>
  Replace `YOUR_APP_ID` with [your actual App
  ID](https://otpless.com/dashboard/customer/dev-settings/apiKeys) provided in
  your OTPLESS dashboard.
</Tip>
