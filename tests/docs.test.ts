import { describe, it, expect, vi } from 'vitest';
import { getDocs } from '../packages/cli/src/engine/docs';
import * as ingest from '../packages/cli/src/engine/ingest';
import { STACKS, FLOWS } from '../packages/cli/src/types';

describe('Docs Engine', () => {
  it('calls ingest and searchIndex correctly', () => {
    const ingestSpy = vi
      .spyOn(ingest, 'ingestDocs')
      .mockImplementation(() => {});
    const searchSpy = vi.spyOn(ingest, 'searchIndex').mockReturnValue([
      {
        title: 'Mocked Doc',
        url: 'mock',
        content: 'mocked content',
        keywords: [],
      },
    ]);

    const results = getDocs(STACKS.WEB_REACT, FLOWS.HEADLESS);

    expect(ingestSpy).toHaveBeenCalled();
    expect(searchSpy).toHaveBeenCalledWith('web-react headless', 5, undefined);
    expect(results[0].title).toBe('Mocked Doc');
  });

  it('returns fallback if no results found', () => {
    vi.spyOn(ingest, 'ingestDocs').mockImplementation(() => {});
    vi.spyOn(ingest, 'searchIndex').mockReturnValue([]);

    const results = getDocs(STACKS.UNKNOWN, FLOWS.UNKNOWN);
    expect(results[0].title).toContain('Not Found');
  });
});
