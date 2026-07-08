import { describe, it, expect } from 'vitest';
import {
  generatePlaybook,
  runOptionalChecks,
} from '../packages/cli/src/engine/verify';
import { STACKS, FLOWS } from '../packages/cli/src/types';

describe('Verify Engine', () => {
  it('generates playbook items for React Native', () => {
    const items = generatePlaybook(STACKS.REACT_NATIVE, FLOWS.HEADLESS);
    const ids = items.map((i) => i.id);
    expect(ids).toContain('frontend-callback-handling');
    expect(ids).toContain('secret-exposure-checks');
    expect(ids).toContain('android-manifest-config'); // specific to RN / Android
  });

  it('generates webhook playbook items', () => {
    const items = generatePlaybook(STACKS.NODE_BACKEND, FLOWS.WEBHOOK);
    const ids = items.map((i) => i.id);
    expect(ids).toContain('webhook-raw-body-hmac');
  });

  it('returns fallback for unknown flows without stack matches', () => {
    const items = generatePlaybook(
      'unknown' as import('../packages/cli/src/types').Stack,
      'unknown' as import('../packages/cli/src/types').Flow,
    );
    expect(items[0].id).toBe('fallback-verification');
  });

  it('runs optional checks successfully', async () => {
    const report = await runOptionalChecks(
      process.cwd(),
      STACKS.WEB_REACT,
      FLOWS.HEADLESS,
    );
    expect(report).toHaveProperty('items');
    expect(report.items).toHaveProperty('package-presence');
    expect(report.items).toHaveProperty('public-secret-exposure');
    expect(report.items).toHaveProperty('config-presence');
  });
});
