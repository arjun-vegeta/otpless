import { describe, it, expect } from 'vitest';
import { scaffoldIntegration } from '../packages/cli/src/engine/scaffold';
import { STACKS, FLOWS } from '../packages/cli/src/types';

describe('Scaffold Engine', () => {
  it('generates scaffold steps for React Headless', () => {
    const steps = scaffoldIntegration(STACKS.WEB_REACT, FLOWS.HEADLESS);
    expect(steps.length).toBeGreaterThan(1);
    expect(steps[0].target).toBe('public/index.html');
    expect(steps[1].target).toBe('src/App.tsx');
    expect(steps[1].env_vars).toContain('REACT_APP_OTPLESS_APP_ID');
  });

  it('generates scaffold steps for FastAPI Token Validation', () => {
    const steps = scaffoldIntegration(STACKS.FASTAPI, FLOWS.TOKEN_VALIDATION);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].target).toBe('app/api/auth.py');
    expect(steps[0].env_vars).toContain('OTPLESS_CLIENT_SECRET');
  });

  it('throws error for unsupported combos', () => {
    expect(() =>
      scaffoldIntegration(
        'unknown' as import('../packages/cli/src/types').Stack,
        'unknown' as import('../packages/cli/src/types').Flow,
      ),
    ).toThrow('not supported in V1');
  });
});
