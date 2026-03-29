import posthog from 'posthog-js';

export function captureEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  posthog.capture(eventName, properties);
}

export { posthog };
