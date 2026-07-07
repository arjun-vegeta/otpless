> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OtplessSwiftConnect SDK Integration

> Welcome to the OTPLESS Connect SDK documentation. This sdk enables native and SFSafariViewController connectivity for your application.

## Integration Steps

### Step 1: Add SDK Dependency

SDK can be installed via both Cocoapods and Swift Package Manager.

#### Cocoapods

- Open your app's project file `.xcodeproj`.
- Add the following line into the dependencies section of your project's `Podfile`:

```ruby theme={null}
pod 'OtplessSwiftConnect', '1.0.1'
```

<Note>
  Make sure to run the following commands in your root folder to fetch the
  dependency.
</Note>

```bash theme={null}
pod repo update
pod install
```

#### Swift Package Manager

1. In Xcode, click File > Swift Packages > Add Package Dependency.
2. In the dialog that appears, enter the repository URL: [https://github.com/otpless-tech/iOS-Connect.git](https://github.com/otpless-tech/iOS-Connect.git).
3. Select the dependency rule as `exact version` and use the version `1.0.1`.

---

### Step 2: Initialize the SDK

In your app code, initialize the SDK before opening SafariViewController:

```swift theme={null}
import OtplessSwiftConnect
import SafariServices

OtplessSwiftConnect.shared.initialize(appId: "YOUR_APP_ID", secret: "YOUR_SECRET")
```

---

### Step 3: Open SafariViewController with Parameters

After initialization, get the required query parameters from the SDK and append them to the login URL that loads in SafariViewController:

```swift theme={null}
func start() {
    let params = OtplessSwiftConnect.shared.startOtpless()
    openSafariVC(urlString: "https://yourwebsite.com/login", params: params)
}

func openSafariVC(urlString: String, params: [String: Any]) {
    guard var components = URLComponents(string: urlString) else {
        return
    }

    // Add SDK parameters to URL
    components.queryItems = params.map {
        URLQueryItem(name: $0.key, value: "\($0.value)")
    }

    guard let finalURL = components.url else { return }

    let safariVC = SFSafariViewController(url: finalURL)
    present(safariVC, animated: true)
}
```

---

### Step 4: Closing Otpless

Once the user has completed the login process, you can close your SFSafariViewController and stop Otpless:

```swift theme={null}

func closeOtpless() {
    OtplessSwiftConnect.shared.cease()
}
```
