import { Stack, Flow, ScaffoldStep, STACKS, FLOWS } from '../../types';

export function scaffoldIntegration(stack: Stack, flow: Flow): ScaffoldStep[] {
  const steps: ScaffoldStep[] = [];

  if (stack === STACKS.WEB_REACT) {
    if (flow === FLOWS.PREBUILT_UI) {
      steps.push({
        target: 'public/index.html',
        action:
          'Include OTPless Prebuilt SDK script: <script id="otpless-sdk" src="https://otpless.com/v4/auth.js" data-appid="YOUR_APP_ID"></script> in the <head> of your HTML.',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/web-sdks/react/pre-built-ui.md',
        ],
        expected_evidence: ['script tag with auth.js is present'],
      });
    } else {
      steps.push({
        target: 'public/index.html',
        action:
          'Include OTPless Headless SDK script: <script id="otpless-sdk" src="https://otpless.com/v4/headless.js" data-appid="YOUR_APP_ID"></script> in the <head> of your HTML.',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/web-sdks/react/headless.md',
        ],
        expected_evidence: ['script tag with headless.js is present'],
      });
    }

    if (flow === FLOWS.HEADLESS) {
      steps.push({
        target: 'src/App.tsx',
        action:
          'Initialize OtplessReact in your application root and handle headless callbacks.',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: [
          'Ensure your App ID is correct in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/web-sdks/react/headless.md',
        ],
        expected_evidence: [
          'Otpless instance is created',
          'Callback function is passed to authentication trigger',
        ],
      });
    } else if (flow === FLOWS.PREBUILT_UI) {
      steps.push({
        target: 'src/App.tsx',
        action: 'Mount the OTPless prebuilt UI component in your login view.',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: [
          'Ensure your App ID is correct in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/web-sdks/react/pre-built-ui.md',
        ],
        expected_evidence: [
          'OTPless component is rendered',
          'onSuccess callback handles the token',
        ],
      });
    } else if (flow === FLOWS.PHONE_OTP) {
      steps.push({
        target: 'src/components/Login.tsx',
        action:
          'Initiate OTPless Headless Phone OTP flow by calling initiate({channel: "PHONE", phone, countryCode}).',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: [
          'Enable SMS/WhatsApp channels in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/web-sdks/react/headless.md',
        ],
        expected_evidence: [
          'initiate() is called with phone and countryCode',
          'Verification UI exists to collect and verify the OTP input',
        ],
      });
    } else if (flow === FLOWS.OAUTH) {
      steps.push({
        target: 'src/components/Login.tsx',
        action:
          'Initiate Social Login/OAuth (Google/WhatsApp) by calling initiate({channel: "OAUTH", channelType: "WHATSAPP" | "GOOGLE"}).',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: [
          'Configure OAuth settings/redirect URIs in dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/web-sdks/react/headless.md',
        ],
        expected_evidence: [
          'initiate() called with channel: "OAUTH" and channelType parameter',
        ],
      });
    } else if (flow === FLOWS.MAGIC_LINK) {
      steps.push({
        target: 'src/components/Login.tsx',
        action: 'Initiate Magic Link flow using OTPless signin initiate.',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: ['Configure redirect URI in OTPless dashboard.'],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/web-sdks/react/headless.md',
        ],
        expected_evidence: ['Otpless initiates magic link flow successfully'],
      });
    } else if (flow === FLOWS.SNA_ONLY) {
      steps.push({
        target: 'src/components/Login.tsx',
        action:
          'Initiate OTPless Headless SNA (Silent Network Authentication) on Web by calling initiate({channel: "PHONE", phone, countryCode}). Make sure smart auth fallback (WhatsApp/SMS) is configured in dashboard.',
        env_vars: ['REACT_APP_OTPLESS_APP_ID'],
        dashboard_notes: [
          'Enable Smart Auth with SNA as primary channel and WhatsApp/SMS as fallback in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/knowledge-base/sna-web.md',
          'https://otpless.com/docs/knowledge-base/smart-auth.md',
        ],
        expected_evidence: [
          'initiate() called with channel: "PHONE"',
          'onHeadlessResponse callback handles SILENT_AUTH responses and fallbacks.',
        ],
      });
    }
  } else if (stack === STACKS.REACT_NATIVE) {
    // Step 0: Install SDK dependency
    const rnPackage =
      flow === FLOWS.PREBUILT_UI
        ? 'otpless-react-native-lp'
        : 'otpless-headless-rn';
    steps.push({
      target: 'package.json',
      action: `Install the OTPless SDK dependency: npm install ${rnPackage} — then run "cd ios && pod install" for iOS.`,
      env_vars: [],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
      ],
      expected_evidence: [
        `${rnPackage} is listed in package.json dependencies.`,
      ],
    });

    // Return manifest / plist configuration as steps always for RN!
    steps.push({
      target: 'android/app/src/main/AndroidManifest.xml',
      action:
        'Configure launchMode="singleTop", exported="true" on MainActivity, add INTERNET permission, and networkSecurityConfig.',
      env_vars: [],
      dashboard_notes: ['Copy lowercase App ID to use as deep link scheme.'],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
      ],
      expected_evidence: [
        'Internet permission is configured.',
        'launchMode is singleTop.',
        'Intent filter with scheme of your App ID is configured for deep-linking callbacks.',
      ],
    });
    steps.push({
      target: 'ios/<YourProjectName>/Info.plist',
      action:
        'Configure CFBundleURLTypes schemes and NSAppTransportSecurity exception domains for SNA.',
      env_vars: [],
      dashboard_notes: [
        'Ensure NSExceptionDomains contains 80.in.safr.sekuramobile.com, api-csp.airtel.in, in-vil.ipification.com, partnerapi.jio.com, v4-api-csp.airtel.in.',
      ],
      docs_citations: ['https://otpless.com/docs/sna/ios-sdk.md'],
      expected_evidence: [
        'CFBundleURLSchemes contains lowercase App ID.',
        'NSAppTransportSecurity contains SA-only carrier domains.',
      ],
    });
    steps.push({
      target: 'ios/connector.swift',
      action:
        'Create connector.swift bridging wrapper and import it in Bridging-Header.h.',
      env_vars: [],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
      ],
      expected_evidence: [
        'Bridging Header is configured in Xcode project settings.',
      ],
    });

    if (flow === FLOWS.HEADLESS) {
      steps.push({
        target: 'App.tsx',
        action:
          'Initialize OtplessReact Native module (OtplessHeadlessModule) and setup callback handling. Ensure commitResponse(response) is called in every callback.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Ensure Android and iOS credentials are correct in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
        ],
        expected_evidence: [
          'OtplessHeadlessModule initialized',
          'Callback invokes commitResponse(response)',
        ],
      });
    } else if (flow === FLOWS.SNA_ONLY) {
      steps.push({
        target: 'App.tsx',
        action:
          'Initialize Otpless SNA module and handle AUTH_TERMINATED / fallback. Verify commitResponse(response) is called.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Ensure SNA-only channel is enabled and mobile data is required.',
        ],
        docs_citations: [
          'https://otpless.com/docs/sna/react-native-sdk.md',
          'https://otpless.com/docs/knowledge-base/sna/auth-terminated-callback.md',
        ],
        expected_evidence: [
          'OtplessModule initialized for SNA',
          'Callback handles AUTH_TERMINATED and SUCCESS states',
          'Callback invokes commitResponse(response)',
        ],
      });
      steps.push({
        target: 'src/backend.ts',
        action:
          'Implement Create API and Status Check API for SNA polling on the backend.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [
          'Backend must use client credentials for Status Check.',
        ],
        docs_citations: [
          'https://otpless.com/docs/sna/create-api.md',
          'https://otpless.com/docs/sna/status-check-api.md',
        ],
        expected_evidence: [
          'Backend makes POST request to Create API endpoint',
          'Status Check API polling endpoint implemented for SUCCESS/FAILED resolution',
        ],
      });
    } else if (flow === FLOWS.PHONE_OTP) {
      steps.push({
        target: 'App.tsx',
        action:
          'Start Headless Phone OTP flow by calling headlessModule.start({phone, countryCode}). Make sure to invoke commitResponse(response) in callbacks.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Verify phone channel configurations in OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
        ],
        expected_evidence: [
          'headlessModule.start() called with phone details.',
          'Response callback invokes commitResponse(response).',
        ],
      });
    } else if (flow === FLOWS.OAUTH) {
      steps.push({
        target: 'App.tsx',
        action:
          'Start Social Login/OAuth (Google/WhatsApp) by calling headlessModule.start({channelType: "WHATSAPP" | "GOOGLE"}). Ensure callback calls commitResponse(response).',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: ['Configure OAuth credentials in dashboard.'],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
        ],
        expected_evidence: ['headlessModule.start() called with channelType.'],
      });
    } else if (flow === FLOWS.MAGIC_LINK) {
      steps.push({
        target: 'App.tsx',
        action:
          'Start Magic Link flow via Otpless headless Module. Verify callback invokes commitResponse(response).',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
        ],
        expected_evidence: ['Otpless initiates magic link flow successfully'],
      });
    } else if (flow === FLOWS.PREBUILT_UI) {
      steps.push({
        target: 'App.tsx',
        action:
          'Mount the OTPless prebuilt UI component (new prebuilt UI) using otpless-react-native-lp, or trigger showLoginPage() (legacy prebuilt UI) using otpless-react-native.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Configure prebuilt UI settings in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/pre-built-ui.md',
          'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/pre-built-ui-legacy.md',
        ],
        expected_evidence: [
          'OTPless prebuilt component rendered or showLoginPage() is invoked.',
        ],
      });
    }
  } else if (stack === STACKS.ANDROID) {
    steps.push({
      target: 'app/build.gradle',
      action:
        'Add io.github.otpless-tech:otpless-headless-sdk to your dependencies and configure minSdk to at least 21.',
      env_vars: [],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro.md',
      ],
      expected_evidence: ['otpless-headless-sdk dependency is added.'],
    });
    steps.push({
      target: 'app/src/main/AndroidManifest.xml',
      action:
        'Configure launchMode="singleTop", exported="true" on MainActivity, add INTERNET permission, and networkSecurityConfig (if SNA is used).',
      env_vars: [],
      dashboard_notes: ['Copy lowercase App ID to use as deep link scheme.'],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro.md',
      ],
      expected_evidence: [
        'Internet permission is configured.',
        'launchMode is singleTop.',
        'Intent filter with scheme of your App ID is configured for deep-linking callbacks.',
      ],
    });

    if (flow === FLOWS.HEADLESS) {
      steps.push({
        target: 'app/src/main/java/com/yourpackage/MainActivity.kt',
        action:
          'Initialize OtplessSDK in onCreate, handle onNewIntent for callbacks, and start the Headless authentication flow.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro.md',
        ],
        expected_evidence: [
          'OtplessSDK is initialized.',
          'onNewIntent handles deep links.',
        ],
      });
    } else if (flow === FLOWS.PREBUILT_UI) {
      steps.push({
        target: 'app/src/main/java/com/yourpackage/MainActivity.kt',
        action:
          'Initialize OtplessSDK in onCreate, handle onNewIntent, and launch the Prebuilt UI login view.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Configure prebuilt UI settings in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/android/pre-built-ui.md',
        ],
        expected_evidence: [
          'OtplessSDK is initialized.',
          'showOtplessLoginPage is invoked.',
        ],
      });
    } else if (flow === FLOWS.SNA_ONLY) {
      steps.push({
        target: 'app/src/main/java/com/yourpackage/MainActivity.kt',
        action:
          'Initialize OtplessSDK in onCreate, handle onNewIntent, and trigger the Silent Network Authentication (SNA) flow specifically.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: ['https://otpless.com/docs/sna/android-sdk.md'],
        expected_evidence: [
          'OtplessSDK is initialized.',
          'startSnaFlow is invoked.',
        ],
      });
    } else if (flow === FLOWS.PHONE_OTP) {
      steps.push({
        target: 'app/src/main/java/com/yourpackage/MainActivity.kt',
        action:
          'Initialize OtplessSDK in onCreate, handle onNewIntent, and trigger Headless Phone OTP flow.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Verify Phone OTP is enabled in your OTPless Dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro.md',
        ],
        expected_evidence: [
          'OtplessSDK is initialized.',
          'startHeadless is invoked with PHONE channel.',
        ],
      });
    } else if (flow === FLOWS.OAUTH) {
      steps.push({
        target: 'app/src/main/java/com/yourpackage/MainActivity.kt',
        action:
          'Initialize OtplessSDK in onCreate, handle onNewIntent, and trigger Social Login/OAuth flow.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro.md',
        ],
        expected_evidence: [
          'OtplessSDK is initialized.',
          'startHeadless is invoked with OAUTH channel.',
        ],
      });
    }
  } else if (stack === STACKS.IOS) {
    steps.push({
      target: 'Podfile',
      action: "Add pod 'OtplessBM/Core' to your Podfile and run pod install.",
      env_vars: [],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless.md',
      ],
      expected_evidence: ["pod 'OtplessBM/Core' is added to Podfile."],
    });
    steps.push({
      target: 'ios/<YourProjectName>/Info.plist',
      action:
        'Configure CFBundleURLTypes schemes and NSAppTransportSecurity exception domains (for SNA).',
      env_vars: [],
      dashboard_notes: [
        'Ensure NSExceptionDomains contains carrier domains if using SNA.',
      ],
      docs_citations: ['https://otpless.com/docs/sna/ios-sdk.md'],
      expected_evidence: ['CFBundleURLSchemes contains lowercase App ID.'],
    });

    if (flow === FLOWS.HEADLESS) {
      steps.push({
        target: 'ios/<YourProjectName>/AppDelegate.swift',
        action:
          'Initialize Otpless SDK in didFinishLaunchingWithOptions, handle openURL callback, and trigger the Headless authentication flow.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless.md',
        ],
        expected_evidence: [
          'Otpless SDK is initialized.',
          'openURL is handled.',
        ],
      });
    } else if (flow === FLOWS.PREBUILT_UI) {
      steps.push({
        target: 'ios/<YourProjectName>/AppDelegate.swift',
        action:
          'Initialize Otpless SDK in didFinishLaunchingWithOptions, handle openURL callback, and launch the Prebuilt UI login view.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Configure prebuilt UI settings in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/ios/pre-built-ui.md',
        ],
        expected_evidence: [
          'Otpless SDK is initialized.',
          'showOtplessLoginPage is invoked.',
        ],
      });
    } else if (flow === FLOWS.SNA_ONLY) {
      steps.push({
        target: 'ios/<YourProjectName>/AppDelegate.swift',
        action:
          'Initialize Otpless SDK in didFinishLaunchingWithOptions, handle openURL callback, and trigger the Silent Network Authentication (SNA) flow specifically.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Enable Smart Auth with SNA as primary channel in the OTPless dashboard.',
        ],
        docs_citations: ['https://otpless.com/docs/sna/ios-sdk.md'],
        expected_evidence: [
          'Otpless SDK is initialized.',
          'startSnaFlow is invoked.',
        ],
      });
    } else if (flow === FLOWS.PHONE_OTP) {
      steps.push({
        target: 'ios/<YourProjectName>/AppDelegate.swift',
        action:
          'Initialize Otpless SDK in didFinishLaunchingWithOptions, handle openURL callback, and trigger Headless Phone OTP flow.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Enable SMS/WhatsApp channels in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless.md',
        ],
        expected_evidence: [
          'Otpless SDK is initialized.',
          'startHeadless is invoked with PHONE channel.',
        ],
      });
    } else if (flow === FLOWS.OAUTH) {
      steps.push({
        target: 'ios/<YourProjectName>/AppDelegate.swift',
        action:
          'Initialize Otpless SDK in didFinishLaunchingWithOptions, handle openURL callback, and trigger Social Login/OAuth flow.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: ['Configure OAuth settings in dashboard.'],
        docs_citations: [
          'https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless.md',
        ],
        expected_evidence: [
          'Otpless SDK is initialized.',
          'startHeadless is invoked with OAUTH channel.',
        ],
      });
    }
  } else if (stack === STACKS.NODE_BACKEND) {
    if (flow === FLOWS.TOKEN_VALIDATION) {
      steps.push({
        target: 'src/routes/auth.ts',
        action:
          'Extract token from request and call OTPless token validation endpoint.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: ['Copy Client ID and Secret from OTPless backend.'],
        docs_citations: [
          'https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data.md',
        ],
        expected_evidence: [
          'Request sends clientId and clientSecret securely via POST to /auth/v1/validate/token',
        ],
      });
      // Add session management step as part of general token verification backend stack
      steps.push({
        target: 'src/routes/session.ts',
        action:
          'Implement Session verification endpoints using POST /v1/sessions/validate-session, revoke-session, etc.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/knowledge-base/session-management/integrating-session-management.md',
        ],
        expected_evidence: [
          'POST to /v1/sessions/validate-session is present.',
          'POST to /v1/sessions/revoke-session is present.',
        ],
      });
    } else if (flow === FLOWS.ID_TOKEN) {
      steps.push({
        target: 'src/routes/auth.ts',
        action:
          'Validate ID Token JWT using OTPless JWKS and verify claims locally.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Ensure you know your App ID for Audience verification.',
        ],
        docs_citations: ['https://otpless.com/docs/knowledge-base/id_token.md'],
        expected_evidence: [
          'JWT signature verified against JWKS',
          'RS256 enforced',
          'Issuer and Audience claims validated',
        ],
      });
    } else if (flow === FLOWS.WEBHOOK) {
      steps.push({
        target: 'src/routes/webhook.ts',
        action: 'Verify webhook signature using raw body and secret.',
        env_vars: ['OTPLESS_WEBHOOK_SECRET'],
        dashboard_notes: [
          'Copy your webhook secret from the OTPless dashboard.',
        ],
        docs_citations: ['https://otpless.com/docs/knowledge-base/webhook.md'],
        expected_evidence: [
          'Raw request body is captured before parsing',
          'HMAC-SHA256 signature is verified',
        ],
      });
    } else if (flow === FLOWS.PHONE_OTP) {
      steps.push({
        target: 'src/routes/auth.ts',
        action:
          'Implement Send and Verify OTP server-side endpoints calling POST /auth/v1/initiate/otp and POST /auth/v1/verify/otp.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/api-reference/endpoint/sign-in/otp/send-otp-phone.md',
          'https://otpless.com/docs/api-reference/endpoint/sign-in/otp/verify.md',
        ],
        expected_evidence: [
          'POST to /auth/v1/initiate/otp is made.',
          'POST to /auth/v1/verify/otp is made.',
        ],
      });
    } else if (flow === FLOWS.OAUTH) {
      steps.push({
        target: 'src/routes/auth.ts',
        action:
          'Implement OAuth initiation server-side call calling POST /auth/v1/initiate/oauth.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [],
        expected_evidence: ['POST to /auth/v1/initiate/oauth is made.'],
      });
      steps.push({
        target: 'src/routes/whatsapp.ts',
        action:
          'Implement WhatsApp messaging integration via S2S API calling POST /v1/api/send or connecting to the WhatsApp Cloud API.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [
          'Configure WhatsApp custom number/connector in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/knowledge-base/whatsapp-authentication.md',
          'https://otpless.com/docs/knowledge-base/connectors/whatsapp.md',
        ],
        expected_evidence: [
          'POST request to /v1/api/send with message payload exists.',
        ],
      });
    } else if (flow === FLOWS.MAGIC_LINK) {
      steps.push({
        target: 'src/routes/auth.ts',
        action:
          'Implement Magic Link send/verify endpoint calling POST /auth/v1/initiate/magiclink.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [],
        expected_evidence: ['POST to /auth/v1/initiate/magiclink is made.'],
      });
    } else if (flow === FLOWS.SNA_ONLY) {
      steps.push({
        target: 'src/routes/auth.ts',
        action:
          'Implement SNA backend logic calling POST /auth/v1/create and polling GET /auth/v2/status.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/sna/create-api.md',
          'https://otpless.com/docs/sna/status-check-api.md',
        ],
        expected_evidence: [
          'POST to /auth/v1/create is present.',
          'GET to /auth/v2/status is polled.',
        ],
      });
    }
  } else if (stack === STACKS.FASTAPI) {
    if (flow === FLOWS.TOKEN_VALIDATION) {
      steps.push({
        target: 'app/api/auth.py',
        action: 'Call OTPless validate token API securely.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: ['Copy Client ID and Secret from OTPless backend.'],
        docs_citations: [
          'https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data.md',
        ],
        expected_evidence: [
          'Httpx/requests POST call to /auth/v1/validate/token',
          'Credentials sent in headers (clientId, clientSecret) with JSON body',
        ],
      });
      steps.push({
        target: 'app/api/session.py',
        action:
          'Implement Session verification endpoints using POST /v1/sessions/validate-session, revoke-session, etc.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/knowledge-base/session-management/integrating-session-management.md',
        ],
        expected_evidence: [
          'POST to /v1/sessions/validate-session is present.',
          'POST to /v1/sessions/revoke-session is present.',
        ],
      });
    } else if (flow === FLOWS.ID_TOKEN) {
      steps.push({
        target: 'app/api/auth.py',
        action: 'Validate ID Token JWT locally using PyJWT and OTPless JWKS.',
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [
          'Ensure you know your App ID for Audience verification.',
        ],
        docs_citations: ['https://otpless.com/docs/knowledge-base/id_token.md'],
        expected_evidence: [
          'jwt.decode is used with verify=True',
          'JWKS client used to fetch keys',
          'Claims validated',
        ],
      });
    } else if (flow === FLOWS.WEBHOOK) {
      steps.push({
        target: 'app/api/webhook.py',
        action: 'Verify webhook signature using FastAPI raw request body.',
        env_vars: ['OTPLESS_WEBHOOK_SECRET'],
        dashboard_notes: [
          'Copy your webhook secret from the OTPless dashboard.',
        ],
        docs_citations: ['https://otpless.com/docs/knowledge-base/webhook.md'],
        expected_evidence: [
          'await request.body() is used',
          'hmac verification against X-Signature header',
        ],
      });
    } else if (flow === FLOWS.PHONE_OTP) {
      steps.push({
        target: 'app/api/auth.py',
        action:
          'Implement Send and Verify OTP server-side endpoints calling POST /auth/v1/initiate/otp and POST /auth/v1/verify/otp.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/api-reference/endpoint/sign-in/otp/send-otp-phone.md',
          'https://otpless.com/docs/api-reference/endpoint/sign-in/otp/verify.md',
        ],
        expected_evidence: [
          'POST to /auth/v1/initiate/otp is made.',
          'POST to /auth/v1/verify/otp is made.',
        ],
      });
    } else if (flow === FLOWS.OAUTH) {
      steps.push({
        target: 'app/api/auth.py',
        action:
          'Implement OAuth initiation server-side call calling POST /auth/v1/initiate/oauth.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [],
        expected_evidence: ['POST to /auth/v1/initiate/oauth is made.'],
      });
      steps.push({
        target: 'app/api/whatsapp.py',
        action:
          'Implement WhatsApp messaging integration via S2S API calling POST /v1/api/send or connecting to the WhatsApp Cloud API.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [
          'Configure WhatsApp custom number/connector in the OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/knowledge-base/whatsapp-authentication.md',
          'https://otpless.com/docs/knowledge-base/connectors/whatsapp.md',
        ],
        expected_evidence: [
          'POST request to /v1/api/send with message payload exists.',
        ],
      });
    } else if (flow === FLOWS.MAGIC_LINK) {
      steps.push({
        target: 'app/api/auth.py',
        action:
          'Implement Magic Link send/verify endpoint calling POST /auth/v1/initiate/magiclink.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [],
        expected_evidence: ['POST to /auth/v1/initiate/magiclink is made.'],
      });
    } else if (flow === FLOWS.SNA_ONLY) {
      steps.push({
        target: 'app/api/auth.py',
        action:
          'Implement SNA backend logic calling POST /auth/v1/create and polling GET /auth/v2/status.',
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/sna/create-api.md',
          'https://otpless.com/docs/sna/status-check-api.md',
        ],
        expected_evidence: [
          'POST to /auth/v1/create is present.',
          'GET to /auth/v2/status is polled.',
        ],
      });
    }
  } else if (
    stack === STACKS.ANGULAR ||
    stack === STACKS.VUE ||
    stack === STACKS.JAVASCRIPT ||
    stack === STACKS.FLUTTER_WEB
  ) {
    const htmlTarget =
      stack === STACKS.ANGULAR ? 'src/index.html' : 'index.html';
    steps.push({
      target: htmlTarget,
      action:
        'Insert the OTPless v4 script tag inside the <head> section: <script id="otpless-sdk" src="https://otpless.com/v4/headless.js" data-appid="YOUR_APP_ID"></script>.',
      env_vars: ['OTPLESS_APP_ID'],
      dashboard_notes: [
        'Replace YOUR_APP_ID with your actual App ID from the OTPless dashboard.',
      ],
      docs_citations: [
        `https://otpless.com/docs/frontend-sdks/web-sdks/${stack}/headless.md`,
      ],
      expected_evidence: [
        '<script id="otpless-sdk" src="https://otpless.com/v4/headless.js" data-appid="..."> is present.',
      ],
    });
    steps.push({
      target: 'src/app/login/login.component.ts',
      action:
        'Initialize OTPless SDK with callback defining handlers for ONETAP, OTP_AUTO_READ, FAILED, and FALLBACK_TRIGGERED. Call OTPlessSignin.initiate({ channel, ... }) and OTPlessSignin.verify({ channel, otp, ... }).',
      env_vars: ['OTPLESS_APP_ID'],
      dashboard_notes: [],
      docs_citations: [
        `https://otpless.com/docs/frontend-sdks/web-sdks/${stack}/headless.md`,
      ],
      expected_evidence: [
        'OTPlessSignin.initiate is invoked.',
        'OTPlessSignin.verify is invoked for OTP.',
      ],
    });
  } else if (stack === STACKS.FLUTTER) {
    steps.push({
      target: 'pubspec.yaml',
      action:
        'Add otpless_headless_flutter: ^<latest_version> under dependencies and run flutter pub get.',
      env_vars: [],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/flutter/new/headless.md',
      ],
      expected_evidence: ['otpless_headless_flutter is in pubspec.yaml.'],
    });
    steps.push({
      target: 'android/app/src/main/AndroidManifest.xml',
      action:
        'Configure intent-filter for scheme otpless.YOUR_APP_ID_LOWERCASE, singleTop, exported=true, networkSecurityConfig for SNA, and extend FlutterFragmentActivity in MainActivity.kt.',
      env_vars: ['OTPLESS_APP_ID'],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/flutter/new/headless.md',
      ],
      expected_evidence: [
        'Intent filter configured.',
        'FlutterFragmentActivity extended.',
      ],
    });
    steps.push({
      target: 'ios/Runner/Info.plist',
      action:
        'Add CFBundleURLSchemes (otpless.YOUR_APP_ID_LOWERCASE), LSApplicationQueriesSchemes, and NSAppTransportSecurity exception domains for SNA.',
      env_vars: ['OTPLESS_APP_ID'],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/flutter/new/headless.md',
      ],
      expected_evidence: ['Info.plist schemes and SNA domains configured.'],
    });
    steps.push({
      target: 'lib/main.dart',
      action:
        'Initialize plugin: _otplessHeadlessPlugin.initialize("YOUR_APP_ID"), set callback _otplessHeadlessPlugin.setResponseCallback(onOtplessResponse), call _otplessHeadlessPlugin.commitResponse(result), and start authentication.',
      env_vars: ['OTPLESS_APP_ID'],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/flutter/new/headless.md',
      ],
      expected_evidence: [
        '_otplessHeadlessPlugin.initialize is invoked.',
        '_otplessHeadlessPlugin.commitResponse is invoked.',
      ],
    });
  } else if (stack === STACKS.IONIC || stack === STACKS.CMP) {
    steps.push({
      target: 'package.json',
      action: 'Add @otpless/ionic-sdk to package dependencies.',
      env_vars: [],
      dashboard_notes: [],
      docs_citations: [
        'https://otpless.com/docs/frontend-sdks/app-sdks/ionic/headless/intro.md',
      ],
      expected_evidence: ['Ionic SDK dependency added.'],
    });
  } else if (
    stack === STACKS.DJANGO ||
    stack === STACKS.FLASK ||
    stack === STACKS.LARAVEL ||
    stack === STACKS.SPRING ||
    stack === STACKS.GO ||
    stack === STACKS.RAILS
  ) {
    if (
      flow === FLOWS.TOKEN_VALIDATION ||
      flow === FLOWS.HEADLESS ||
      flow === FLOWS.UNKNOWN
    ) {
      steps.push({
        target: 'server/auth_controller',
        action: `Implement server-to-server POST to https://auth.otpless.app/auth/v1/validate/token exchanging token for user details using client_id and client_secret in ${stack}.`,
        env_vars: ['OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data.md',
        ],
        expected_evidence: ['Server-to-server token validation call present.'],
      });
    }
    if (flow === FLOWS.ID_TOKEN) {
      steps.push({
        target: 'server/jwks_verifier',
        action: `Fetch JWKS from https://otpless.com/.well-known/jwks and verify ID token JWT using RS256 algorithm, checking issuer (https://otpless.com), audience (OTPLESS_APP_ID), and expiration in ${stack}.`,
        env_vars: ['OTPLESS_APP_ID'],
        dashboard_notes: [],
        docs_citations: [
          'https://otpless.com/docs/api-reference/endpoint/verifytoken/id-token-validate.md',
        ],
        expected_evidence: [
          'JWKS fetching and RS256 JWT signature verification present.',
        ],
      });
    }
    if (flow === FLOWS.WEBHOOK) {
      steps.push({
        target: 'server/webhook_handler',
        action: `Verify X-Signature header by computing HMAC-SHA256 over raw request body using endpoint secret, Base64 encoding the result, and performing constant-time string comparison in ${stack}.`,
        env_vars: ['OTPLESS_WEBHOOK_SECRET'],
        dashboard_notes: [
          'Configure webhook URL and endpoint secret in OTPless dashboard.',
        ],
        docs_citations: [
          'https://otpless.com/docs/knowledge-base/webhook-v2.md',
        ],
        expected_evidence: [
          'HMAC-SHA256 signature verification over raw body is present.',
        ],
      });
    }
  } else if (
    stack === STACKS.WORDPRESS ||
    stack === STACKS.SHOPIFY ||
    stack === STACKS.MAGENTO
  ) {
    steps.push({
      target: 'cms/theme_or_plugin',
      action: `Integrate OTPless ${stack} plugin/script template into your theme or plugin configuration.`,
      env_vars: ['OTPLESS_APP_ID'],
      dashboard_notes: [
        `Configure your ${stack} redirect URLs in the OTPless dashboard.`,
      ],
      docs_citations: ['https://otpless.com/docs/introduction.md'],
      expected_evidence: ['OTPless integration script/plugin installed.'],
    });
  }

  if (stack === STACKS.UNKNOWN || steps.length === 0) {
    throw new Error(
      `Scaffold templates for stack ${stack} with flow ${flow} are not supported in V1. Please check supported stacks.`,
    );
  }

  // Prepend instruction header for the AI agent
  const instructionStep: ScaffoldStep = {
    target: '_INSTRUCTIONS',
    action: `Follow the steps below in order to integrate OTPless ${flow} into your ${stack} project. Create a checklist/todo from these steps and implement each one. To get code snippets and detailed implementation examples for any step, call: get_docs(stack="${stack}", flow="${flow}"). You can also narrow results with a topic parameter, e.g. get_docs(stack="${stack}", flow="${flow}", topic="whatsapp"). Do NOT use web search — all documentation is bundled locally.`,
    env_vars: [],
    dashboard_notes: [
      'Ensure you have created an account at https://otpless.com and have your App ID and Client credentials ready from the Dev Settings page.',
    ],
    docs_citations: [],
    expected_evidence: [],
  };

  return [instructionStep, ...steps];
}
