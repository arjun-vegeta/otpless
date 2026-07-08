import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import { detectStack } from '../packages/cli/src/engine/detect';

vi.mock('fs');

describe('detectStack', () => {
  beforeEach(() => {
    vi.spyOn(fs, 'readdirSync').mockReturnValue([] as any);
  });

  it('detects a react-native project', () => {
    vi.spyOn(fs, 'existsSync').mockImplementation((path: fs.PathLike) => {
      if (path.toString().includes('package.json')) return true;
      if (path.toString().includes('yarn.lock')) return true;
      return false;
    });

    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      return JSON.stringify({
        dependencies: {
          'react-native': '0.72.0',
          'otpless-rn': '1.0.0',
        },
      });
    });

    const result = detectStack('/mock/dir');

    expect(result.platforms).toContain('react-native');
    expect(result.frameworks).toContain('react-native');
    expect(result.package_manager).toBe('yarn');
    expect(result.otpless_packages).toHaveLength(1);
    expect(result.otpless_packages[0].name).toBe('otpless-rn');
    expect(result.detected_flows).toContain('headless');
  });

  it('detects a fastapi project', () => {
    vi.spyOn(fs, 'existsSync').mockImplementation((path: fs.PathLike) => {
      if (path.toString().includes('requirements.txt')) return true;
      if (path.toString().includes('package.json')) return false;
      return false;
    });

    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      return 'fastapi==0.100.0\nuvicorn==0.22.0';
    });

    const result = detectStack('/mock/dir');

    expect(result.platforms).toContain('fastapi');
    expect(result.frameworks).toContain('fastapi');
  });

  it('detects and resolves package versions from package-lock.json', () => {
    vi.spyOn(fs, 'existsSync').mockImplementation((path: fs.PathLike) => {
      if (path.toString().includes('package.json')) return true;
      if (path.toString().includes('package-lock.json')) return true;
      return false;
    });

    vi.spyOn(fs, 'readFileSync').mockImplementation(
      (path: fs.PathLike | number) => {
        if (path.toString().includes('package-lock.json')) {
          return JSON.stringify({
            packages: {
              'node_modules/otpless-react': {
                version: '2.1.3',
              },
            },
          });
        }
        return JSON.stringify({
          dependencies: {
            react: '^18.2.0',
            'otpless-react': '^2.0.0',
          },
        });
      },
    );

    const result = detectStack('/mock/dir');
    expect(result.platforms).toContain('web-react');
    expect(result.frameworks).toContain('react');
    expect(result.otpless_packages).toHaveLength(1);
    expect(result.otpless_packages[0].name).toBe('otpless-react');
    expect(result.otpless_packages[0].resolved_version).toBe('2.1.3');
  });
});
