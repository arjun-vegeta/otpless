import * as fs from 'fs';
import * as path from 'path';
import { Stack, Flow } from '../../types';
import { ingestDocs, searchIndex } from '../ingest';

export interface DocCitation {
  title: string;
  url: string;
  content: string;
}

export function getDocsDir(): string {
  let current = __dirname;
  while (current !== path.dirname(current)) {
    const possibleDocs = path.join(current, 'docs');
    const possiblePkg = path.join(current, 'package.json');
    if (fs.existsSync(possiblePkg) && fs.existsSync(possibleDocs)) {
      return possibleDocs;
    }
    current = path.dirname(current);
  }
  return path.resolve(process.cwd(), 'docs');
}

export function getDocs(
  stack: Stack,
  flow: Flow,
  _topic?: string,
): DocCitation[] {
  ingestDocs();

  let query = `${stack} ${flow} ${_topic || ''}`.trim();
  if (
    (stack === 'node-backend' || stack === 'fastapi') &&
    flow === 'token-validation'
  ) {
    query += ' verifytoken verify-token-with-secure-data api-reference';
  }
  const results = searchIndex(query, 5, _topic);

  if (results.length === 0) {
    return [
      {
        title: 'Unsupported Stack/Flow or Docs Not Found',
        url: 'https://otpless.com/docs',
        content:
          'No exact matches found for this stack/flow in the local docs.',
      },
    ];
  }

  return results.map((r) => ({
    title: r.title,
    url: r.url,
    content: r.content,
  }));
}
