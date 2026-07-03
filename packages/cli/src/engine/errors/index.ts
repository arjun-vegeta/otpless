import * as fs from 'fs';
import * as path from 'path';
import { ErrorContext, ErrorLookupResult } from '../../types';

export function lookupError(context: ErrorContext): ErrorLookupResult | null {
  const errorMapPath = path.join(__dirname, '../../data/error-map.json');
  if (!fs.existsSync(errorMapPath)) return null;

  const errorMap = JSON.parse(fs.readFileSync(errorMapPath, 'utf-8'));

  // Navigate mapping: errorMap[surface][error_code]
  const surfaceMap = errorMap[context.surface];
  if (!surfaceMap) return null;

  const match = surfaceMap[context.error_code];

  if (match) {
    return {
      likely_causes: match.likely_causes,
      docs: match.docs,
      next_checks: match.next_checks,
      suggested_fix: match.suggested_fix,
    };
  }

  return null;
}
