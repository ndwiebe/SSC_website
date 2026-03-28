import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = 'https://us.i.posthog.com';

let initialized = false;

export function initPostHog(): void {
  if (initialized) return;

  if (!POSTHOG_KEY || typeof POSTHOG_KEY !== 'string') {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // We handle pageviews manually for SPA routing
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
  });

  initialized = true;
}

export function captureEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (!initialized) return;
  posthog.capture(eventName, properties);
}

export function capturePageview(url?: string): void {
  if (!initialized) return;
  posthog.capture('$pageview', url ? { $current_url: url } : undefined);
}

export { posthog };
