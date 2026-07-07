> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure SDK integration

## Prerequisites

Install the OTPLESS SDK dependency by running the following command in your terminal at the root of your React Native project before utilizing `OtplessSecureService`:

```bash theme={null}
npm install otpless-ionic
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

## Step 2: Instantiate the `OtplessManager`

Create an instance of `OtplessManager` in your javascript/typescript file.

<CodeGroup>
  ```javascript Javascript theme={null}
  let manager = new OtplessManager();
  ```
</CodeGroup>

## Step 3: Attach `OtplessSecureService` in your `LoginScreen`.

When your login screen launches, attach the `OtplessSecureService` using your `APP_ID`. This ensures the secure service is properly initialized on Android platforms and ready to use before authentication.

<CodeGroup>
  ```javascript Javascript theme={null}
  try {
      await manager.attachSecureSDK(APPID);
      alert('Secure SDK attached successfully.');
  } catch (error) {
      alert('Failed to attach Secure SDK:' + error);
  }
  ```
</CodeGroup>
