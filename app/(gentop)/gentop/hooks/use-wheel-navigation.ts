"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface WheelNavigationOptions {
  nextPage: string | null;
  prevPage?: string | null;
  isEnabled?: boolean;
  threshold?: number;
  isFullScreenPage?: boolean;
}

interface WheelNavigationState {
  isAtBottom: boolean;
  isAtTop: boolean;
  isReadyToNavigate: boolean;
  isReadyToPrev: boolean;
  scrollProgress: number;
  scrollUpProgress: number;
}

// How long the user must pause at edge before extra scroll triggers navigation (ms)
const PAUSE_DELAY = 500;

export function useWheelNavigation({
  nextPage,
  prevPage = null,
  isEnabled = true,
  threshold = 120,
  isFullScreenPage = false
}: WheelNavigationOptions): WheelNavigationState {
  const router = useRouter();
  const [isAtBottom, setIsAtBottom] = useState(isFullScreenPage);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollUpProgress, setScrollUpProgress] = useState(0);

  const downAccumulator = useRef(0);
  const upAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const isNavigating = useRef(false);

  // "Ready" flags: only true after user paused scrolling while at edge.
  // This prevents continuous scroll momentum from triggering navigation.
  const downReady = useRef(isFullScreenPage); // fullscreen pages are always ready
  const upReady = useRef(isFullScreenPage);

  const isReadyToNavigate = scrollProgress > 0.1;
  const isReadyToPrev = scrollUpProgress > 0.1;

  useEffect(() => {
    if (!isEnabled) return;

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;

      const now = Date.now();
      const timeDiff = now - lastScrollTime.current;
      const scrollPaused = timeDiff > PAUSE_DELAY;

      // Detect edge position
      let atBottom = isFullScreenPage;
      let atTop = isFullScreenPage;

      if (!isFullScreenPage) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        atBottom = scrollTop + clientHeight >= scrollHeight - 10;
        atTop = scrollTop <= 2;
      }

      setIsAtBottom(atBottom);
      setIsAtTop(atTop);

      // If user has been paused (scrolling stopped), re-evaluate ready flags
      if (scrollPaused) {
        downAccumulator.current = 0;
        upAccumulator.current = 0;
        setScrollProgress(0);
        setScrollUpProgress(0);
        // After pause: allow navigation only if currently at the edge
        downReady.current = atBottom;
        upReady.current = atTop;
      }

      lastScrollTime.current = now;

      // If no longer at edge, revoke ready flag and reset accumulator
      if (!atBottom) {
        downReady.current = false;
        downAccumulator.current = 0;
        setScrollProgress(0);
      }
      if (!atTop) {
        upReady.current = false;
        upAccumulator.current = 0;
        setScrollUpProgress(0);
      }

      const delta = Math.abs(e.deltaY);

      if (e.deltaY > 0) {
        // Scrolling DOWN → cancel any upward-navigation readiness
        upReady.current = false;
        upAccumulator.current = 0;
        setScrollUpProgress(0);

        if (atBottom && nextPage && downReady.current) {
          downAccumulator.current += delta;
          const progress = Math.min(downAccumulator.current / threshold, 1);
          setScrollProgress(progress);

          if (downAccumulator.current >= threshold) {
            isNavigating.current = true;
            downAccumulator.current = 0;
            downReady.current = false;
            setScrollProgress(0);
            router.push(nextPage);
            setTimeout(() => { isNavigating.current = false; }, 1200);
          }
        }
        // If not ready: just let the page scroll naturally (do nothing extra)

      } else if (e.deltaY < 0) {
        // Scrolling UP → cancel any downward-navigation readiness
        downReady.current = false;
        downAccumulator.current = 0;
        setScrollProgress(0);

        if (atTop && prevPage && upReady.current) {
          upAccumulator.current += delta;
          const progress = Math.min(upAccumulator.current / threshold, 1);
          setScrollUpProgress(progress);

          if (upAccumulator.current >= threshold) {
            isNavigating.current = true;
            upAccumulator.current = 0;
            upReady.current = false;
            setScrollUpProgress(0);
            router.push(prevPage);
            setTimeout(() => { isNavigating.current = false; }, 1200);
          }
        }
        // If not ready: just let the page scroll naturally (do nothing extra)
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isEnabled, nextPage, prevPage, threshold, router, isFullScreenPage]);

  return {
    isAtBottom,
    isAtTop,
    isReadyToNavigate,
    isReadyToPrev,
    scrollProgress,
    scrollUpProgress,
  };
}
