import * as crypto from 'crypto';
import * as fs from 'fs';
import { ResultState } from '../../types';

export async function runLiveTest(
  testType: string,
  inputs: Record<string, string>,
): Promise<{ state: ResultState; details: string }> {
  if (testType === 'token') {
    if (!inputs.token || !inputs.clientId || !inputs.clientSecret) {
      return {
        state: 'fail',
        details: 'Missing required inputs: token, clientId, clientSecret',
      };
    }

    try {
      const response = await fetch(
        'https://user-auth.otpless.app/auth/v1/validate/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            clientId: inputs.clientId,
            clientSecret: inputs.clientSecret,
          },
          body: JSON.stringify({ token: inputs.token }),
        },
      );

      const data = await response.json();
      if (response.ok && data.success === true) {
        return {
          state: 'pass',
          details: `Token validated successfully. User: ${data.name || data.mobile || 'Unknown'}`,
        };
      } else {
        return {
          state: 'fail',
          details: `Token validation failed: ${JSON.stringify(data)}`,
        };
      }
    } catch (e: unknown) {
      return {
        state: 'fail',
        details: `Network error during token validation: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  if (testType === 'id-token') {
    if (!inputs.idToken || !inputs.appId) {
      return {
        state: 'fail',
        details: 'Missing required inputs: idToken, appId',
      };
    }

    try {
      // Basic local parsing to check structure, actual signature validation requires fetching JWKS
      const parts = inputs.idToken.split('.');
      if (parts.length !== 3) {
        return { state: 'fail', details: 'Invalid JWT structure' };
      }

      const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
      if (header.alg !== 'RS256') {
        return {
          state: 'fail',
          details: `Invalid algorithm: ${header.alg}. Expected RS256`,
        };
      }

      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());

      if (payload.iss !== 'https://otpless.com') {
        return { state: 'fail', details: `Invalid Issuer: ${payload.iss}` };
      }

      if (payload.aud !== inputs.appId) {
        return {
          state: 'fail',
          details: `Invalid Audience: expected ${inputs.appId}, got ${payload.aud}`,
        };
      }

      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return { state: 'fail', details: 'Token has expired' };
      }

      // Fetch JWKS and verify signature
      const jwksRes = await fetch('https://otpless.com/.well-known/jwks');
      const jwks = await jwksRes.json();
      const jwk = (jwks as { keys: { kid: string }[] }).keys.find(
        (k) => k.kid === header.kid,
      );
      if (!jwk) {
        return {
          state: 'fail',
          details: `Key ID ${header.kid} not found in JWKS`,
        };
      }

      const publicKey = crypto.createPublicKey({ key: jwk, format: 'jwk' });
      const verify = crypto.createVerify('RSA-SHA256');
      verify.update(`${parts[0]}.${parts[1]}`);
      const isValid = verify.verify(publicKey, parts[2], 'base64url');

      if (!isValid) {
        return {
          state: 'fail',
          details: 'RS256 signature verification failed',
        };
      }

      return {
        state: 'pass',
        details:
          'ID token verified successfully including RS256 signature, issuer, audience, and expiration.',
      };
    } catch (e: unknown) {
      return {
        state: 'fail',
        details: `Error parsing ID token: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  if (testType === 'webhook-signature') {
    if (!inputs.secret || !inputs.fixture) {
      return {
        state: 'fail',
        details: 'Missing required inputs: secret, fixture path',
      };
    }

    try {
      const fixtureContent = fs.readFileSync(inputs.fixture, 'utf-8');
      const hmac = crypto.createHmac('sha256', inputs.secret);
      hmac.update(fixtureContent);
      const signature = hmac.digest('base64'); // SNA requires standard Base64 HMAC-SHA256

      return {
        state: 'pass',
        details: `Generated signature: ${signature}. Your webhook endpoint should expect this exact value in the X-Signature header.`,
      };
    } catch (e: unknown) {
      return {
        state: 'fail',
        details: `Error processing fixture: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  return {
    state: 'not_applicable',
    details: `Test type ${testType} unsupported or not applicable.`,
  };
}
