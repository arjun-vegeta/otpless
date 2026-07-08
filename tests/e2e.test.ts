import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import * as path from 'path';
import { ScaffoldStep, PlaybookItem } from '../packages/cli/src/types';

const CLI_PATH = path.resolve(__dirname, '../packages/cli/src/index.ts');
const runCli = (args: string) => {
  return execSync(`npx vite-node ${CLI_PATH} ${args}`, { encoding: 'utf-8' });
};

describe('E2E CLI Tests', () => {
  it('detect command runs and outputs valid JSON', () => {
    const output = runCli('detect');
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty('platforms');
    expect(parsed).toHaveProperty('frameworks');
  });

  it('docs command fetches valid JSON docs array', () => {
    const output = runCli('docs --stack web-react --flow headless');
    const parsed = JSON.parse(output);
    expect(Array.isArray(parsed)).toBe(true);
    // Since ingest might run or fallback to empty, we just ensure it returns an array of objects
    if (parsed.length > 0) {
      expect(parsed[0]).toHaveProperty('title');
    }
  });

  it('docs command correctly routes FastAPI token validation', () => {
    const output = runCli('docs --stack fastapi --flow token-validation');
    const parsed = JSON.parse(output);
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed[0].url).toContain('verify-token-with-secure-data');
  });

  it('docs command correctly routes React Native SNA', () => {
    const output = runCli('docs --stack react-native --flow sna-only');
    const parsed = JSON.parse(output);
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed[0].url).toContain('/sna/');
  });

  it('scaffold command generates steps', () => {
    const output = runCli('scaffold --stack fastapi --flow id-token');
    const parsed = JSON.parse(output);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(1);
    expect(parsed[0]).toHaveProperty('target');
    expect(parsed[0].target).toBe('_INSTRUCTIONS');
    expect(parsed[1].target).toContain('app/api');
  });

  it('scaffold command generates SNA steps', () => {
    const output = runCli('scaffold --stack react-native --flow sna-only');
    const parsed = JSON.parse(output);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);
    // Frontend and backend steps should be present
    expect(parsed.some((s: ScaffoldStep) => s.target === 'App.tsx')).toBe(true);
    expect(
      parsed.some((s: ScaffoldStep) =>
        s.expected_evidence.some((e: string) =>
          e.includes('Status Check API polling'),
        ),
      ),
    ).toBe(true);
  });

  it('verify command generates a playbook', () => {
    const output = runCli('verify --stack react-native --flow headless');
    const parsed = JSON.parse(output);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed[0]).toHaveProperty('id');
    expect(parsed[0].id).toContain('frontend-callback');
  });

  it('verify command generates SNA playbook with backend polling check', () => {
    const output = runCli('verify --stack react-native --flow sna-only');
    const parsed = JSON.parse(output);
    expect(
      parsed.some((p: PlaybookItem) => p.id === 'sna-backend-polling'),
    ).toBe(true);
  });

  it('errors command looks up error correctly', () => {
    const output = runCli(
      'errors --surface api --endpoint /token --http-status 400 --error-code 7301',
    );
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty('likely_causes');
    expect(parsed.likely_causes.length).toBeGreaterThan(0);
  });

  it('live-test command validates missing inputs correctly', () => {
    const output = runCli('live-test token');
    const parsed = JSON.parse(output);
    expect(parsed.state).toBe('fail');
    expect(parsed.details).toContain('Missing required inputs');
  });

  it('crashes on Zod validation failure for invalid stack', () => {
    try {
      runCli('scaffold --stack invalid-stack --flow headless');
      expect.fail('Should have thrown an error');
    } catch (e: unknown) {
      const err = e as { stdout?: string; stderr?: string; message: string };
      expect(err.stdout || err.stderr || err.message).toContain(
        'Invalid enum value',
      );
    }
  });
});
