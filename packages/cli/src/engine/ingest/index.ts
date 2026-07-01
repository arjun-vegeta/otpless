import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

import * as os from 'os';
import { getDocsDir } from '../docs';

export interface IndexRecord {
  title: string;
  url: string;
  content: string;
  keywords: string[];
}

let localIndex: IndexRecord[] = [];

export function ingestDocs(): void {
  const docsDir = getDocsDir();
  const CACHE_FILE = path.join(os.tmpdir(), '.otpless-docs-cache.json');

  if (localIndex.length > 0) return;

  if (fs.existsSync(CACHE_FILE)) {
    try {
      const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      localIndex = cached;
      return;
    } catch {
      // If cache read fails, rebuild
    }
  }

  const llmsPath = path.join(docsDir, 'llms.txt');
  const seedFiles = new Set<string>();

  if (fs.existsSync(llmsPath)) {
    const llmsContent = fs.readFileSync(llmsPath, 'utf-8');
    const regex = /\[.*?\]\(.*?otpless\.com\/docs\/(.*?)\)/g;
    let match;
    while ((match = regex.exec(llmsContent)) !== null) {
      const relPath = match[1];
      const fullPath = path.resolve(docsDir, relPath);
      if (fs.existsSync(fullPath)) {
        seedFiles.add(fullPath);
      }
    }
  }

  // Fallback to walk if llms.txt didn't yield enough, but prefer the seed
  const allFiles =
    seedFiles.size > 0 ? Array.from(seedFiles) : walkDir(docsDir);

  for (const file of allFiles) {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(file, 'utf-8');
      const sections = content.split(/(^#+\s+.*$)/m);
      let currentHeading = 'General';
      let currentContent = '';

      for (const section of sections) {
        if (section.trim().startsWith('#')) {
          if (currentContent.trim()) {
            localIndex.push({
              title: currentHeading,
              url: `file://${file}#${currentHeading.toLowerCase().replace(/\\s+/g, '-')}`,
              content: currentContent.trim(),
              keywords: extractKeywords(
                currentContent + ' ' + currentHeading + ' ' + file,
              ),
            });
          }
          currentHeading = section.replace(/^#+\s+/, '').trim();
          currentContent = '';
        } else {
          currentContent += section;
        }
      }

      if (currentContent.trim()) {
        localIndex.push({
          title: currentHeading,
          url: `file://${file}`,
          content: currentContent.trim(),
          keywords: extractKeywords(
            currentContent + ' ' + currentHeading + ' ' + file,
          ),
        });
      }
    } else if (file.endsWith('.yaml') || file.endsWith('.yml')) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const parsed = yaml.parse(content);
        if (parsed.paths) {
          for (const [apiPath, methods] of Object.entries(parsed.paths)) {
            for (const [method, details] of Object.entries(
              methods as Record<string, unknown>,
            )) {
              const summary =
                (details as Record<string, unknown>).summary || 'API Endpoint';
              localIndex.push({
                title: `${method.toUpperCase()} ${apiPath}`,
                url: `file://${file}#${apiPath}`,
                content: JSON.stringify(details, null, 2),
                keywords: extractKeywords(summary + ' ' + apiPath),
              });
            }
          }
        }
      } catch {
        // Skip invalid yaml
      }
    }
  }

  // Save cache
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(localIndex));
  } catch {
    // Ignore cache write errors
  }
}

export function searchIndex(
  query: string,
  limit: number = 3,
  topic?: string,
): IndexRecord[] {
  const queryWords = query.toLowerCase().split(/\s+/);

  return localIndex
    .map((record) => {
      let score = 0;
      const lowerContent = record.content.toLowerCase();
      const lowerUrl = record.url.toLowerCase();
      const lowerTitle = record.title.toLowerCase();

      for (const word of queryWords) {
        if (record.keywords.includes(word)) score += 2;
        if (lowerContent.includes(word)) score += 1;
        if (lowerTitle.includes(word)) score += 3;
        if (lowerUrl.includes(word)) score += 4;
      }

      if (topic) {
        const topicWords = topic.toLowerCase().split(/\s+/);
        for (const word of topicWords) {
          if (lowerTitle.includes(word)) score += 30;
          if (lowerUrl.includes(word)) score += 40;
          if (record.keywords.includes(word)) score += 20;
          if (lowerContent.includes(word)) score += 10;
        }
      }

      if (query.includes('token-validation') && !query.includes('id-token')) {
        if (
          lowerUrl.includes('id_token') ||
          lowerUrl.includes('id-token-validate') ||
          lowerUrl.includes('jwks')
        ) {
          score -= 20;
        }
      }

      if (query.includes('sna-only') || query.includes('sna')) {
        if (lowerUrl.includes('/sna/')) {
          score += 50;
        } else {
          score -= 20;
        }
      }

      // Strong negative weights for cross-stack pollution
      if (
        query.includes('fastapi') ||
        query.includes('node') ||
        query.includes('backend')
      ) {
        if (
          lowerUrl.includes('android') ||
          lowerUrl.includes('ios') ||
          lowerUrl.includes('flutter') ||
          lowerUrl.includes('react-native') ||
          lowerUrl.includes('web-sdks')
        ) {
          score -= 20;
        }
      }

      if (query.includes('web-react')) {
        if (
          lowerUrl.includes('android') ||
          lowerUrl.includes('ios') ||
          lowerUrl.includes('flutter') ||
          lowerUrl.includes('react-native') ||
          lowerUrl.includes('angular') ||
          lowerUrl.includes('vue') ||
          lowerUrl.includes('api-reference') // Prefer frontend docs for web-react
        ) {
          score -= 20;
        }
        if (lowerUrl.includes('web-sdks/react')) {
          score += 10;
        }
      }

      if (query.includes('react-native')) {
        if (
          lowerUrl.includes('android') ||
          lowerUrl.includes('ios') ||
          lowerUrl.includes('flutter') ||
          lowerUrl.includes('web-sdks') ||
          lowerUrl.includes('api-reference')
        ) {
          score -= 20;
        }
        if (lowerUrl.includes('app-sdks/react-native')) {
          score += 10;
          if (lowerUrl.includes('/new/')) score += 20;
          if (lowerUrl.includes('/legacy/')) score -= 10;
        }
      }

      if (query.includes('prebuilt-ui') || query.includes('pre-built-ui')) {
        if (lowerUrl.includes('pre-built-ui')) {
          score += 20;
        }
      }

      return { record, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.record);
}

function walkDir(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.resolve(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3);
}
