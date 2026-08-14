'use client';

import { useState, useEffect } from 'react';

/**
 * Matches a CSS media query string and returns whether it currently matches.
 * SSR-safe: defaults to false on the server.
 * Listens for changes so the UI reacts to viewport resizes.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** Returns true when viewport is below 768px */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/** Returns true when viewport is between 768px and 1023px */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

/** Returns true when viewport is 1024px or above */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
