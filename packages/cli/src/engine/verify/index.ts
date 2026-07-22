import {
  Stack,
  Flow,
  PlaybookItem,
  STACKS,
  FLOWS,
  EvidenceReport,
} from '../../types';
import * as fs from 'fs';
import * as path from 'path';
import { resolveLatestVersion } from '../registry';

export function generatePlaybook(stack: Stack, flow: Flow): PlaybookItem[] {
  const items: PlaybookItem[] = [];

  const isFrontend =
    stack === STACKS.WEB_REACT ||
    stack === STACKS.REACT_NATIVE ||
    stack === STACKS.ANDROID ||
    stack === STACKS.IOS ||
    stack === STACKS.ANGULAR ||
    stack === STACKS.VUE ||
    stack === STACKS.JAVASCRIPT ||
    stack === STACKS.FLUTTER_WEB ||
    stack === STACKS.FLUTTER ||
    stack === STACKS.IONIC ||
    stack === STACKS.CMP;

  if (isFrontend) {
    items.push({
      id: 'frontend-callback-handling',
      requirement:
        'Frontend SDK callback must properly handle success and failure states.',
      docs: [
        {
          url:
            stack === STACKS.REACT_NATIVE
              ? 'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md'
              : stack === STACKS.ANDROID
                ? 'https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro.md'
                : stack === STACKS.IOS
                  ? 'https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless.md'
                  : 'https://otpless.com/docs/frontend-sdks/web-sdks/react/headless.md',
        },
      ],
      agent_steps: [
        'Inspect the frontend component where OTPless is initialized.',
        'Verify the callback handles both valid tokens and error states.',
      ],
      expected_evidence: [
        'Callback checks for error payload.',
        'Successful login passes token to the backend.',
      ],
      failure_examples: ['Callback silently swallows errors.'],
    });

    items.push({
      id: 'secret-exposure-checks',
      requirement: 'Client ID and Secret must not be exposed in frontend code.',
      docs: [],
      agent_steps: [
        'Scan frontend environment files and source code for client secrets.',
      ],
      expected_evidence: [
        'No OTPLESS_CLIENT_SECRET or equivalent found in frontend bundle.',
      ],
      optional_commands: ['grep -rn "OTPLESS_CLIENT_SECRET" src/'],
      failure_examples: [
        'Client secret hardcoded in App.tsx or MainActivity.kt.',
      ],
    });

    if (stack === STACKS.REACT_NATIVE || stack === STACKS.ANDROID) {
      items.push({
        id: 'android-manifest-config',
        requirement:
          'Android manifest and configs must have proper intent filters/URL schemes.',
        docs: [
          {
            url:
              stack === STACKS.ANDROID
                ? 'https://otpless.com/docs/frontend-sdks/app-sdks/android/new/headless/intro.md'
                : 'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
          },
        ],
        agent_steps: [
          'Inspect AndroidManifest.xml for OTPless intent filters.',
        ],
        expected_evidence: [
          'Intent filter uses lowercase App ID as scheme.',
          'launchMode is singleTop.',
        ],
      });
    }

    if (stack === STACKS.REACT_NATIVE || stack === STACKS.IOS) {
      items.push({
        id: 'ios-info-plist-config',
        requirement: 'iOS Info.plist must have proper URL schemes.',
        docs: [
          {
            url:
              stack === STACKS.IOS
                ? 'https://otpless.com/docs/frontend-sdks/app-sdks/ios/new/headless/headless.md'
                : 'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
          },
        ],
        agent_steps: ['Inspect Info.plist for OTPless URL schemes.'],
        expected_evidence: ['CFBundleURLSchemes contains lowercase App ID.'],
      });

      items.push({
        id: 'ios-sna-exceptions',
        requirement:
          'iOS exception domains for Silent Network Authentication must be present in Info.plist.',
        docs: [{ url: 'https://otpless.com/docs/sna/ios-sdk.md' }],
        agent_steps: [
          'Verify NSAppTransportSecurity exception domains in Info.plist match requirements.',
        ],
        expected_evidence: [
          'Info.plist contains exception domains: 80.in.safr.sekuramobile.com, api-csp.airtel.in, in-vil.ipification.com, partnerapi.jio.com, v4-api-csp.airtel.in.',
        ],
      });
    }

    if (stack === STACKS.REACT_NATIVE) {
      items.push({
        id: 'react-native-ios-swift-bridge',
        requirement:
          'A valid Swift connector file and bridging header must be configured for iOS integration.',
        docs: [
          {
            url: 'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
          },
        ],
        agent_steps: [
          'Verify presence of connector.swift and bridging headers in the ios/ project directory.',
        ],
        expected_evidence: [
          'Bridging headers expose Otpless SDK components to React Native.',
        ],
      });

      items.push({
        id: 'commit-response-check',
        requirement:
          'Every frontend SDK callback must invoke commitResponse(response).',
        docs: [
          {
            url: 'https://otpless.com/docs/frontend-sdks/app-sdks/react-native/new/headless/headless.md',
          },
        ],
        agent_steps: [
          'Check that the callback registered via setResponseCallback calls headlessModule.commitResponse(response).',
        ],
        expected_evidence: [
          'headlessModule.commitResponse(...) is present in response handling.',
        ],
        failure_examples: [
          'Omitted commitResponse calls leading to silent auth failures.',
        ],
      });
    }

    items.push({
      id: 'smart-auth-fallback-handling',
      requirement:
        'Handle Smart Auth fallback triggers gracefully (FALLBACK_TRIGGERED callback).',
      docs: [{ url: 'https://otpless.com/docs/knowledge-base/smart-auth.md' }],
      agent_steps: [
        'Verify the callback handles FALLBACK_TRIGGERED responseType.',
        'Extract and process deliveryChannel in the fallback response if needed.',
      ],
      expected_evidence: [
        'FALLBACK_TRIGGERED case is handled in the switch block.',
      ],
    });
  }

  if (flow === FLOWS.SNA_ONLY) {
    items.push({
      id: 'sna-frontend-handling',
      requirement:
        'Frontend must correctly handle AUTH_TERMINATED, SUCCESS, and fallback scenarios.',
      docs: [
        { url: 'https://otpless.com/docs/sna/react-native-sdk.md' },
        {
          url: 'https://otpless.com/docs/knowledge-base/sna/auth-terminated-callback.md',
        },
      ],
      agent_steps: [
        'Inspect the frontend authentication callback.',
        'Verify it intercepts AUTH_TERMINATED and provides appropriate error feedback.',
        'Verify it handles network fallbacks gracefully.',
      ],
      expected_evidence: [
        'Callback checks for AUTH_TERMINATED explicitly.',
        'Mobile data requirement is enforced.',
      ],
      failure_examples: ['Unhandled AUTH_TERMINATED causing UI freeze.'],
    });

    items.push({
      id: 'sna-backend-polling',
      requirement:
        'Backend must implement Create API and Status Check API for resolution.',
      docs: [
        { url: 'https://otpless.com/docs/sna/create-api.md' },
        { url: 'https://otpless.com/docs/sna/status-check-api.md' },
      ],
      agent_steps: [
        'Search for server-to-server calls addressing the Create API.',
        'Ensure the Status Check API is polled securely from the backend to determine PRIMARY factor status.',
      ],
      expected_evidence: [
        'POST to Create API is present.',
        'Status Check polling mechanism checks for SUCCESS/FAILED states.',
      ],
      failure_examples: [
        'Frontend polls the Status Check API directly with Client Secret.',
      ],
    });
  }

  if (flow === FLOWS.TOKEN_VALIDATION) {
    items.push({
      id: 'opaque-token-server-side-validation',
      requirement: 'Tokens must be verified on the backend via OTPless API.',
      docs: [
        {
          url: 'https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data.md',
        },
      ],
      agent_steps: [
        'Search backend routes for token validation calls.',
        'Confirm the code calls the OTPless server-to-server API with client credentials.',
      ],
      expected_evidence: [
        'POST call to /auth/v1/validate/token is made.',
        'Client secret is sent securely from backend env.',
      ],
      failure_examples: ['Frontend trusts token payload directly.'],
    });
  }

  if (flow === FLOWS.ID_TOKEN) {
    items.push({
      id: 'id-token-jwks-validation',
      requirement: 'ID tokens must be verified locally using JWKS.',
      docs: [{ url: 'https://otpless.com/docs/knowledge-base/id_token.md' }],
      agent_steps: [
        'Inspect the JWT verification logic in backend.',
        'Confirm JWKS URL is used and algorithms are enforced.',
      ],
      expected_evidence: [
        'JWKS URL is https://otpless.com/.well-known/jwks.',
        'RS256 algorithm is enforced.',
        'Issuer and Audience claims are validated.',
      ],
      failure_examples: [
        'Backend decodes JWT without verifying signature.',
        'Audience claim is not checked.',
      ],
    });
  }

  if (flow === FLOWS.WEBHOOK) {
    items.push({
      id: 'webhook-raw-body-hmac',
      requirement: 'Webhook signature must be verified using raw request body.',
      docs: [{ url: 'https://otpless.com/docs/knowledge-base/webhook.md' }],
      agent_steps: [
        'Inspect the webhook route handler.',
        'Ensure the raw body is read before JSON parsing.',
        'Verify HMAC-SHA256 signature logic.',
      ],
      expected_evidence: [
        'Raw body is captured.',
        'HMAC-SHA256 of raw body + secret equals X-Signature header.',
      ],
      failure_examples: [
        'Signature verified against parsed JSON object (spacing issues).',
      ],
    });
  }

  if (flow === FLOWS.PHONE_OTP) {
    items.push({
      id: 'phone-otp-verification',
      requirement:
        'Backend must securely verify OTP using OTPless S2S initiate/verify endpoints.',
      docs: [
        {
          url: 'https://otpless.com/docs/api-reference/endpoint/verifytoken/verify-token-with-secure-data.md',
        },
      ],
      agent_steps: [
        'Verify server-side code performs secure calls to /auth/v1/initiate/otp and /auth/v1/verify/otp.',
      ],
      expected_evidence: [
        'OTP initiation and verification endpoints are verified server-to-server.',
      ],
      failure_examples: [
        'Initiating or verifying OTP credentials from the frontend.',
      ],
    });
  }

  if (flow === FLOWS.OAUTH) {
    items.push({
      id: 'oauth-initiate-verification',
      requirement: 'Backend must call social OAuth initiate endpoint securely.',
      docs: [],
      agent_steps: [
        'Inspect server-to-server OAuth redirection calls to /auth/v1/initiate/oauth.',
      ],
      expected_evidence: ['Backend securely initiates social authentication.'],
    });
  }

  if (flow === FLOWS.MAGIC_LINK) {
    items.push({
      id: 'magiclink-initiate-verification',
      requirement: 'Backend must securely call initiate magic link endpoint.',
      docs: [],
      agent_steps: [
        'Inspect backend logic calling /auth/v1/initiate/magiclink.',
      ],
      expected_evidence: ['Magic link initiation is triggered from server.'],
    });
  }

  if (items.length === 0) {
    items.push({
      id: 'fallback-verification',
      requirement: 'Manual verification required.',
      docs: [],
      agent_steps: ['Review the official docs for verification requirements.'],
      expected_evidence: [],
    });
  }

  return items;
}

export async function runOptionalChecks(
  projectDir: string,
  stack: Stack,
  _flow: Flow,
): Promise<EvidenceReport> {
  const items: EvidenceReport['items'] = {};

  // Check 1: Package presence & version detection
  if (stack === STACKS.WEB_REACT || stack === STACKS.REACT_NATIVE) {
    const pkgNames =
      stack === STACKS.WEB_REACT
        ? ['otpless-react', 'otpless-headless-js']
        : [
            'otpless-rn',
            'otpless-headless-rn',
            'otpless-react-native',
            'otpless-react-native-lp',
          ];

    const packageJsonPath = path.join(projectDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const deps = {
          ...(pkg.dependencies || {}),
          ...(pkg.devDependencies || {}),
        };

        let foundAny = false;
        const evidence: string[] = [];
        let state: EvidenceReport['items'][string]['state'] = 'pass';

        for (const pkgName of pkgNames) {
          if (deps[pkgName]) {
            foundAny = true;
            const currentVer = deps[pkgName].replace(/[\^~]/g, '');
            evidence.push(
              `Found dependency ${pkgName} with version ${deps[pkgName]} in package.json`,
            );

            try {
              const reg = await resolveLatestVersion(pkgName);
              if (reg.latestVersion !== currentVer) {
                evidence.push(
                  `  [WARNING] Outdated SDK version! Current: ${currentVer}, Latest: ${reg.latestVersion}`,
                );
              } else {
                evidence.push(`  [PASS] Version ${currentVer} is up to date.`);
              }
            } catch (e) {
              evidence.push(
                `  [INFO] Version verification skipped (registry unreachable): ${(e as Error).message}`,
              );
            }
          }
        }

        if (!foundAny) {
          state = 'fail';
          evidence.push(
            `None of the target packages (${pkgNames.join(', ')}) were found in package.json`,
          );
        }

        items['package-presence'] = { state, evidence };
      } catch {
        items['package-presence'] = {
          state: 'fail',
          evidence: ['Failed to parse package.json'],
        };
      }
    } else {
      items['package-presence'] = {
        state: 'not_detected',
        evidence: ['package.json not found in project directory'],
      };
    }
  } else if (stack === STACKS.ANDROID) {
    const buildGradlePath = fs.existsSync(
      path.join(projectDir, 'app/build.gradle'),
    )
      ? path.join(projectDir, 'app/build.gradle')
      : fs.existsSync(path.join(projectDir, 'build.gradle'))
        ? path.join(projectDir, 'build.gradle')
        : null;

    if (buildGradlePath) {
      const content = fs.readFileSync(buildGradlePath, 'utf-8');
      if (content.includes('otpless-android-sdk')) {
        items['package-presence'] = {
          state: 'pass',
          evidence: [
            `Found otpless-android-sdk dependency in ${path.relative(projectDir, buildGradlePath)}`,
          ],
        };
      } else {
        items['package-presence'] = {
          state: 'fail',
          evidence: [
            `otpless-android-sdk dependency not found in ${path.relative(projectDir, buildGradlePath)}`,
          ],
        };
      }
    } else {
      items['package-presence'] = {
        state: 'not_detected',
        evidence: ['No build.gradle found in project directory'],
      };
    }
  } else if (stack === STACKS.IOS) {
    const podfilePath = path.join(projectDir, 'Podfile');
    const spmPath = path.join(projectDir, 'Package.swift');
    if (fs.existsSync(podfilePath)) {
      const content = fs.readFileSync(podfilePath, 'utf-8');
      if (content.includes('OtplessSDK')) {
        items['package-presence'] = {
          state: 'pass',
          evidence: ['Found OtplessSDK dependency in Podfile'],
        };
      } else {
        items['package-presence'] = {
          state: 'fail',
          evidence: ['OtplessSDK dependency not found in Podfile'],
        };
      }
    } else if (fs.existsSync(spmPath)) {
      const content = fs.readFileSync(spmPath, 'utf-8');
      if (content.includes('otpless-ios-sdk')) {
        items['package-presence'] = {
          state: 'pass',
          evidence: ['Found otpless-ios-sdk dependency in Package.swift'],
        };
      } else {
        items['package-presence'] = {
          state: 'fail',
          evidence: ['otpless-ios-sdk dependency not found in Package.swift'],
        };
      }
    } else {
      items['package-presence'] = {
        state: 'not_detected',
        evidence: ['No Podfile or Package.swift found in project directory'],
      };
    }
  } else {
    items['package-presence'] = {
      state: 'not_applicable',
      evidence: ['No package.json check needed for this backend stack'],
    };
  }

  // Check 2: Public secret scan in frontend files
  const secretsFound: string[] = [];
  const scanForSecrets = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file === 'node_modules' || file.startsWith('.')) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanForSecrets(fullPath);
      } else if (
        file.endsWith('.js') ||
        file.endsWith('.tsx') ||
        file.endsWith('.ts') ||
        file.endsWith('.html') ||
        file.endsWith('.kt') ||
        file.endsWith('.swift') ||
        file.endsWith('.java') ||
        file.endsWith('.m') ||
        file.endsWith('.h') ||
        file.endsWith('.dart') ||
        file.endsWith('.py') ||
        file.endsWith('.php') ||
        file.endsWith('.go') ||
        file.endsWith('.rb')
      ) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          if (
            content.includes('OTPLESS_CLIENT_SECRET') &&
            !content.includes('process.env')
          ) {
            secretsFound.push(`${file} (matches client secret pattern)`);
          }
        } catch {
          // ignore
        }
      }
    }
  };

  const isFrontendCheck =
    stack === STACKS.WEB_REACT ||
    stack === STACKS.REACT_NATIVE ||
    stack === STACKS.ANDROID ||
    stack === STACKS.IOS ||
    stack === STACKS.ANGULAR ||
    stack === STACKS.VUE ||
    stack === STACKS.JAVASCRIPT ||
    stack === STACKS.FLUTTER_WEB ||
    stack === STACKS.FLUTTER ||
    stack === STACKS.IONIC ||
    stack === STACKS.CMP;
  if (isFrontendCheck) {
    scanForSecrets(projectDir);
    if (secretsFound.length > 0) {
      items['public-secret-exposure'] = {
        state: 'fail',
        evidence: [
          'Potential exposure of OTPless Client Secret in frontend files:',
          ...secretsFound,
        ],
      };
    } else {
      items['public-secret-exposure'] = {
        state: 'pass',
        evidence: [
          'No exposed OTPLESS_CLIENT_SECRET or equivalent found in frontend files.',
        ],
      };
    }
  } else {
    items['public-secret-exposure'] = {
      state: 'not_applicable',
      evidence: [
        'Frontend secret checks are not applicable to backend stack integrations',
      ],
    };
  }

  // Check 3: Required config presence
  const envPath = path.join(projectDir, '.env');
  const envExamplePath = path.join(projectDir, '.env.example');
  const checkEnv = fs.existsSync(envPath)
    ? envPath
    : fs.existsSync(envExamplePath)
      ? envExamplePath
      : null;

  if (checkEnv) {
    try {
      const content = fs.readFileSync(checkEnv, 'utf-8');
      const expectedVars: string[] = [];
      if (
        stack === STACKS.WEB_REACT ||
        stack === STACKS.REACT_NATIVE ||
        stack === STACKS.ANDROID ||
        stack === STACKS.IOS
      ) {
        expectedVars.push('OTPLESS_APP_ID');
      } else {
        expectedVars.push('OTPLESS_CLIENT_ID', 'OTPLESS_CLIENT_SECRET');
      }

      const missing: string[] = [];
      const found: string[] = [];
      for (const v of expectedVars) {
        if (content.includes(v)) {
          found.push(v);
        } else {
          missing.push(v);
        }
      }

      if (missing.length === 0) {
        items['config-presence'] = {
          state: 'pass',
          evidence: [
            `Found expected config environment variables in ${path.basename(checkEnv)}: ${found.join(', ')}`,
          ],
        };
      } else {
        items['config-presence'] = {
          state: 'fail',
          evidence: [
            `Missing expected config variables in ${path.basename(checkEnv)}: ${missing.join(', ')}`,
          ],
        };
      }
    } catch {
      items['config-presence'] = {
        state: 'fail',
        evidence: [
          `Failed to read environment config file ${path.basename(checkEnv)}`,
        ],
      };
    }
  } else {
    items['config-presence'] = {
      state: 'not_detected',
      evidence: [
        'No .env or .env.example file found to verify config presence.',
      ],
    };
  }

  // Check 4: Android Manifest setup (for React Native)
  if (stack === STACKS.REACT_NATIVE || stack === STACKS.ANDROID) {
    let manifestState: EvidenceReport['items'][string]['state'] =
      'not_detected';
    const manifestEvidence: string[] = [];

    const findAndroidManifest = (dir: string): string | null => {
      if (!fs.existsSync(dir)) return null;
      const list = fs.readdirSync(dir);
      for (const file of list) {
        if (file === 'node_modules' || file.startsWith('.')) continue;
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          const res = findAndroidManifest(fullPath);
          if (res) return res;
        } else if (file === 'AndroidManifest.xml') {
          return fullPath;
        }
      }
      return null;
    };

    const manifestPath = findAndroidManifest(projectDir);
    if (manifestPath) {
      try {
        const content = fs.readFileSync(manifestPath, 'utf-8');
        const hasInternet = content.includes('android.permission.INTERNET');
        const hasNetworkConfig = content.includes(
          'android:networkSecurityConfig',
        );
        const hasSingleTop = content.includes('android:launchMode="singleTop"');
        const hasExported = content.includes('android:exported="true"');

        manifestEvidence.push(
          `Found AndroidManifest.xml at ${path.relative(projectDir, manifestPath)}`,
        );
        if (hasInternet)
          manifestEvidence.push('  [PASS] Internet permission is configured.');
        else manifestEvidence.push('  [FAIL] Internet permission is missing.');
        if (hasNetworkConfig)
          manifestEvidence.push(
            '  [PASS] networkSecurityConfig attribute is present.',
          );
        else
          manifestEvidence.push(
            '  [WARNING] networkSecurityConfig is missing (needed for SNA).',
          );
        if (hasSingleTop)
          manifestEvidence.push('  [PASS] launchMode is singleTop.');
        else
          manifestEvidence.push(
            '  [WARNING] launchMode="singleTop" is missing (needed for oauth/redirect callbacks).',
          );
        if (hasExported)
          manifestEvidence.push('  [PASS] exported="true" is configured.');
        else
          manifestEvidence.push(
            '  [WARNING] exported="true" is missing on the main intent activity.',
          );

        manifestState =
          hasInternet && hasSingleTop && hasExported ? 'pass' : 'fail';
      } catch (e) {
        manifestState = 'fail';
        manifestEvidence.push(
          `Error reading AndroidManifest.xml: ${(e as Error).message}`,
        );
      }
    } else {
      manifestEvidence.push('AndroidManifest.xml not found in project.');
    }
    items['android-manifest-checks'] = {
      state: manifestState,
      evidence: manifestEvidence,
    };
  }

  // Check 5: iOS Plist & Swift bridging
  if (stack === STACKS.REACT_NATIVE || stack === STACKS.IOS) {
    let iosState: EvidenceReport['items'][string]['state'] = 'not_detected';
    const iosEvidence: string[] = [];

    const findInfoPlist = (dir: string): string | null => {
      if (!fs.existsSync(dir)) return null;
      const list = fs.readdirSync(dir);
      for (const file of list) {
        if (file === 'node_modules' || file.startsWith('.')) continue;
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          const res = findInfoPlist(fullPath);
          if (res) return res;
        } else if (file === 'Info.plist') {
          return fullPath;
        }
      }
      return null;
    };

    const plistPath = findInfoPlist(projectDir);
    if (plistPath) {
      try {
        const content = fs.readFileSync(plistPath, 'utf-8');
        const hasATS = content.includes('NSAppTransportSecurity');
        const hasAirtel =
          content.includes('api-csp.airtel.in') ||
          content.includes('v4-api-csp.airtel.in');
        const hasSekura = content.includes('sekuramobile.com');
        const hasJio = content.includes('partnerapi.jio.com');
        const hasIpification = content.includes('ipification.com');

        iosEvidence.push(
          `Found Info.plist at ${path.relative(projectDir, plistPath)}`,
        );
        if (hasATS) {
          iosEvidence.push(
            '  [PASS] NSAppTransportSecurity configuration is present.',
          );
          const snaDomains = [hasAirtel, hasSekura, hasJio, hasIpification];
          const foundDomainsCount = snaDomains.filter(Boolean).length;
          if (foundDomainsCount >= 2) {
            iosEvidence.push(
              `  [PASS] Found ${foundDomainsCount} SNA exception domains configured.`,
            );
          } else {
            iosEvidence.push(
              '  [WARNING] Some required SNA exception domains might be missing.',
            );
          }
        } else {
          iosEvidence.push(
            '  [WARNING] NSAppTransportSecurity exception domains missing (needed for iOS SNA).',
          );
        }

        const findSwiftConnector = (dir: string): boolean => {
          if (!fs.existsSync(dir)) return false;
          const list = fs.readdirSync(dir);
          for (const file of list) {
            if (file === 'node_modules' || file.startsWith('.')) continue;
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
              if (findSwiftConnector(fullPath)) return true;
            } else if (
              file.toLowerCase().includes('connector.swift') ||
              file.endsWith('-Bridging-Header.h')
            ) {
              return true;
            }
          }
          return false;
        };
        const hasBridge = findSwiftConnector(projectDir);
        if (hasBridge) {
          iosEvidence.push(
            '  [PASS] iOS Swift bridge/connector file detected.',
          );
          iosState = 'pass';
        } else {
          iosEvidence.push(
            '  [WARNING] iOS connector.swift or Bridging-Header.h not detected.',
          );
          iosState = 'fail';
        }
      } catch (e) {
        iosState = 'fail';
        iosEvidence.push(
          `Error checking iOS configuration: ${(e as Error).message}`,
        );
      }
    } else {
      iosEvidence.push('Info.plist not found in project.');
    }
    items['ios-config-checks'] = { state: iosState, evidence: iosEvidence };
  }

  // Check 6: commitResponse() verification in source files
  if (stack === STACKS.REACT_NATIVE || stack === STACKS.WEB_REACT) {
    let commitState: EvidenceReport['items'][string]['state'] = 'pass';
    const commitEvidence: string[] = [];
    let foundCallbacks = false;
    let missingCommitsCount = 0;

    const scanForCallbacks = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      const list = fs.readdirSync(dir);
      for (const file of list) {
        if (file === 'node_modules' || file.startsWith('.')) continue;
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          scanForCallbacks(fullPath);
        } else if (
          file.endsWith('.js') ||
          file.endsWith('.jsx') ||
          file.endsWith('.ts') ||
          file.endsWith('.tsx')
        ) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            if (
              content.includes('OtplessHeadlessModule') ||
              content.includes('responseCallback') ||
              content.includes('setResponseCallback')
            ) {
              foundCallbacks = true;
              if (content.includes('commitResponse')) {
                commitEvidence.push(
                  `[PASS] Found callback with commitResponse call in ${path.relative(projectDir, fullPath)}`,
                );
              } else {
                commitEvidence.push(
                  `[FAIL] Callback initialized but missing commitResponse call in ${path.relative(projectDir, fullPath)}`,
                );
                missingCommitsCount++;
              }
            }
          } catch {
            // ignore
          }
        }
      }
    };
    scanForCallbacks(projectDir);
    if (foundCallbacks) {
      if (missingCommitsCount > 0) {
        commitState = 'fail';
      }
    } else {
      commitState = 'not_detected';
      commitEvidence.push(
        'No OTPless callback initializations detected in source files.',
      );
    }
    items['callback-commit-check'] = {
      state: commitState,
      evidence: commitEvidence,
    };
  }

  return { items };
}
