import { describe, it, expect } from 'vitest';
import { runLiveTest } from '../packages/cli/src/engine/live-test';

describe('Live Test Engine', () => {
  it('fails token test when missing inputs', async () => {
    const res = await runLiveTest('token', {});
    expect(res.state).toBe('fail');
    expect(res.details).toContain('Missing');
  });

  it('fails id-token test with bad JWT structure', async () => {
    const res = await runLiveTest('id-token', { idToken: 'bad', appId: '123' });
    expect(res.state).toBe('fail');
    expect(res.details).toContain('Invalid JWT');
  });

  it('returns not_applicable for unknown test types', async () => {
    const res = await runLiveTest('unknown', {});
    expect(res.state).toBe('not_applicable');
  });
});
