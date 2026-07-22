import { describe, it, expect } from 'vitest';
import { scaffoldIntegration } from '../packages/cli/src/engine/scaffold';
import { getDocByUrl } from '../packages/cli/src/engine/docs';
import { STACKS, FLOWS, Stack, Flow } from '../packages/cli/src/types';

describe('Scaffold docs_citations validation', () => {
  const testCases: { stack: Stack; flow: Flow }[] = [
    { stack: STACKS.WEB_REACT, flow: FLOWS.HEADLESS },
    { stack: STACKS.WEB_REACT, flow: FLOWS.PREBUILT_UI },
    { stack: STACKS.WEB_REACT, flow: FLOWS.PHONE_OTP },
    { stack: STACKS.WEB_REACT, flow: FLOWS.OAUTH },
    { stack: STACKS.WEB_REACT, flow: FLOWS.MAGIC_LINK },
    { stack: STACKS.WEB_REACT, flow: FLOWS.SNA_ONLY },
    { stack: STACKS.REACT_NATIVE, flow: FLOWS.HEADLESS },
    { stack: STACKS.REACT_NATIVE, flow: FLOWS.SNA_ONLY },
    { stack: STACKS.REACT_NATIVE, flow: FLOWS.PHONE_OTP },
    { stack: STACKS.REACT_NATIVE, flow: FLOWS.OAUTH },
    { stack: STACKS.REACT_NATIVE, flow: FLOWS.MAGIC_LINK },
    { stack: STACKS.REACT_NATIVE, flow: FLOWS.PREBUILT_UI },
    { stack: STACKS.ANDROID, flow: FLOWS.HEADLESS },
    { stack: STACKS.ANDROID, flow: FLOWS.PREBUILT_UI },
    { stack: STACKS.ANDROID, flow: FLOWS.SNA_ONLY },
    { stack: STACKS.ANDROID, flow: FLOWS.PHONE_OTP },
    { stack: STACKS.ANDROID, flow: FLOWS.OAUTH },
    { stack: STACKS.IOS, flow: FLOWS.HEADLESS },
    { stack: STACKS.IOS, flow: FLOWS.PREBUILT_UI },
    { stack: STACKS.IOS, flow: FLOWS.SNA_ONLY },
    { stack: STACKS.IOS, flow: FLOWS.PHONE_OTP },
    { stack: STACKS.IOS, flow: FLOWS.OAUTH },
    { stack: STACKS.NODE_BACKEND, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.NODE_BACKEND, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.NODE_BACKEND, flow: FLOWS.WEBHOOK },
    { stack: STACKS.NODE_BACKEND, flow: FLOWS.PHONE_OTP },
    { stack: STACKS.NODE_BACKEND, flow: FLOWS.OAUTH },
    { stack: STACKS.NODE_BACKEND, flow: FLOWS.MAGIC_LINK },
    { stack: STACKS.NODE_BACKEND, flow: FLOWS.SNA_ONLY },
    { stack: STACKS.FASTAPI, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.FASTAPI, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.FASTAPI, flow: FLOWS.WEBHOOK },
    { stack: STACKS.FASTAPI, flow: FLOWS.PHONE_OTP },
    { stack: STACKS.FASTAPI, flow: FLOWS.OAUTH },
    { stack: STACKS.FASTAPI, flow: FLOWS.MAGIC_LINK },
    { stack: STACKS.ANGULAR, flow: FLOWS.HEADLESS },
    { stack: STACKS.VUE, flow: FLOWS.HEADLESS },
    { stack: STACKS.JAVASCRIPT, flow: FLOWS.HEADLESS },
    { stack: STACKS.FLUTTER_WEB, flow: FLOWS.HEADLESS },
    { stack: STACKS.FLUTTER, flow: FLOWS.HEADLESS },
    { stack: STACKS.IONIC, flow: FLOWS.HEADLESS },
    { stack: STACKS.CMP, flow: FLOWS.HEADLESS },
    { stack: STACKS.DJANGO, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.DJANGO, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.DJANGO, flow: FLOWS.WEBHOOK },
    { stack: STACKS.FLASK, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.FLASK, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.FLASK, flow: FLOWS.WEBHOOK },
    { stack: STACKS.LARAVEL, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.LARAVEL, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.LARAVEL, flow: FLOWS.WEBHOOK },
    { stack: STACKS.SPRING, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.SPRING, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.SPRING, flow: FLOWS.WEBHOOK },
    { stack: STACKS.GO, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.GO, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.GO, flow: FLOWS.WEBHOOK },
    { stack: STACKS.RAILS, flow: FLOWS.TOKEN_VALIDATION },
    { stack: STACKS.RAILS, flow: FLOWS.ID_TOKEN },
    { stack: STACKS.RAILS, flow: FLOWS.WEBHOOK },
    { stack: STACKS.WORDPRESS, flow: FLOWS.HEADLESS },
    { stack: STACKS.SHOPIFY, flow: FLOWS.HEADLESS },
    { stack: STACKS.MAGENTO, flow: FLOWS.HEADLESS },
  ];

  for (const { stack, flow } of testCases) {
    it(`${stack}/${flow} — all docs_citations resolve to valid docs`, () => {
      const steps = scaffoldIntegration(stack, flow);
      const allUrls: string[] = [];

      for (const step of steps) {
        if (step.target === '_INSTRUCTIONS') continue;
        for (const url of step.docs_citations) {
          allUrls.push(url);
        }
      }

      for (const url of allUrls) {
        const result = getDocByUrl(url);
        expect(
          result[0].title,
          `URL "${url}" in ${stack}/${flow} returned "Doc Not Found"`,
        ).not.toBe('Doc Not Found');
        expect(
          result[0].content.length,
          `URL "${url}" in ${stack}/${flow} returned empty content`,
        ).toBeGreaterThan(50);
      }
    });
  }
});
