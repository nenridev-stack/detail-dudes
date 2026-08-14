'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseInViewOptions {
  /** Visibility threshold (0-1). Default: 0.2 */
  threshold?: number;
  /** Only trigger once then disconnect. Default: true */
  triggerOnce?: boolean;
  /** Root margin for the observer. Default: '0px' */
  rootMargin?: string;
}

/**
 * IntersectionObserver hook that tracks whether an element is in the viewport.
 * SSR-safe: returns false on the server.
 *
 * @returns A tuple of [ref to attach to the element, whether the element is in view]
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.2, triggerOnce = true, rootMargin = '0px' } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);

        if (isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, inView];
}
