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
  }

  if (steps.length === 0) {
    throw new Error(
      `Scaffold templates for ${stack} with flow ${flow} are not supported in V1. Please wait for V2 or use V1-supported combinations (e.g. web-react + headless).`,
    );
  }

  return steps;
}
