import { z } from 'zod';

export const STACKS = {
  WEB_REACT: 'web-react',
  REACT_NATIVE: 'react-native',
  NODE_BACKEND: 'node-backend',
  FASTAPI: 'fastapi',
  UNKNOWN: 'unknown',
} as const;

export const FLOWS = {
  HEADLESS: 'headless',
  PREBUILT_UI: 'prebuilt-ui',
  TOKEN_VALIDATION: 'token-validation',
  ID_TOKEN: 'id-token',
  WEBHOOK: 'webhook',
  SNA_ONLY: 'sna-only',
  OAUTH: 'oauth',
  MAGIC_LINK: 'magic-link',
  PHONE_OTP: 'phone-otp',
  UNKNOWN: 'unknown',
} as const;

export type Stack = (typeof STACKS)[keyof typeof STACKS];
export type Flow = (typeof FLOWS)[keyof typeof FLOWS];
export type SdkFamily =
  'headless' | 'prebuilt-ui' | 'connect' | 'session' | 'unknown';
export type SdkGeneration = 'new' | 'legacy' | 'unknown';

export const StackSchema = z.enum([
  'web-react',
  'react-native',
  'node-backend',
  'fastapi',
  'unknown',
]);
export const FlowSchema = z.enum([
  'headless',
  'prebuilt-ui',
  'token-validation',
  'id-token',
  'webhook',
  'sna-only',
  'oauth',
  'magic-link',
  'phone-otp',
  'unknown',
]);

export interface OtplessPackage {
  name: string;
  declared_version: string | null;
  resolved_version: string | null;
  sdk_family: SdkFamily;
  sdk_generation: SdkGeneration;
}

export interface CompatibilityTuple {
  platforms: string[];
  frameworks: string[];
  package_manager:
    | 'npm'
    | 'pnpm'
    | 'yarn'
    | 'gradle'
    | 'cocoapods'
    | 'spm'
    | 'pub'
    | 'unknown';
  otpless_packages: OtplessPackage[];
  detected_flows: Flow[];
  confidence: 'high' | 'medium' | 'low';
}

export type ResultState = 'pass' | 'fail' | 'not_detected' | 'not_applicable';

export interface PlaybookItem {
  id: string;
  requirement: string;
  docs: { url: string; section?: string }[];
  agent_steps: string[];
  expected_evidence: string[];
  optional_commands?: string[];
  failure_examples?: string[];
}

export interface EvidenceReport {
  items: Record<
    string,
    { state: ResultState; evidence: string[]; followup?: string[] }
  >;
}

export interface ScaffoldStep {
  target: string;
  action: string;
  env_vars: string[];
  dashboard_notes: string[];
  docs_citations: string[];
  expected_evidence: string[];
}

export interface ErrorContext {
  surface: string;
  endpoint: string;
  http_status: number;
  error_code: string;
  message?: string;
}

export const ErrorContextSchema = z.object({
  surface: z.string(),
  endpoint: z.string(),
  http_status: z.number(),
  error_code: z.string(),
  message: z.string().optional(),
});

export interface ErrorLookupResult {
  likely_causes: string[];
  docs: string[];
  next_checks: string[];
  suggested_fix: string;
}
