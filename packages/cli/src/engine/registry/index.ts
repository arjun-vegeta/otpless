import * as https from 'https';

export interface RegistryResult {
  name: string;
  latestVersion: string;
}

export async function resolveLatestVersion(
  packageName: string,
): Promise<RegistryResult> {
  return new Promise((resolve, reject) => {
    https
      .get(`https://registry.npmjs.org/${packageName}/latest`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const parsed = JSON.parse(data);
              resolve({ name: packageName, latestVersion: parsed.version });
            } catch {
              reject(
                new Error(
                  `Failed to parse registry response for ${packageName}`,
                ),
              );
            }
          } else {
            reject(
              new Error(
                `Registry returned status ${res.statusCode} for ${packageName}`,
              ),
            );
          }
        });
      })
      .on('error', (e) => {
        reject(e);
      });
  });
}
