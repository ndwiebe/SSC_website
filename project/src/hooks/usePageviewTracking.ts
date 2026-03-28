import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { capturePageview } from '../lib/posthog';

/**
 * Tracks SPA page views on every route change.
 * Must be rendered inside a <Router> context.
 */
export function usePageviewTracking(): void {
  const location = useLocation();

  useEffect(() => {
    capturePageview(window.location.href);
  }, [location.pathname, location.search]);
}
