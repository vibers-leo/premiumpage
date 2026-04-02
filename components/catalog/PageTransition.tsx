"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface PageTransitionProps {
    nextPage: string | null;
    prevPage?: string | null;
    /** wheel 네비게이션 활성화 */
    enableWheel?: boolean;
    /** 키보드 화살표 네비게이션 활성화 */
    enableKeyboard?: boolean;
    /** 모바일 스와이프 네비게이션 활성화 */
    enableSwipe?: boolean;
    /** 스크롤 임계값 (기본 50) */
    threshold?: number;
    /** 풀스크린 페이지 여부 (스크롤 없음) */
    isFullScreenPage?: boolean;
}

/**
 * PageTransition - 통합 페이지 전환 시스템.
 *
 * 3가지 입력 방식을 지원:
 * 1. 마우스 휠/트랙패드: 페이지 끝 도달 → threshold → 추가 스크롤 → 전환
 * 2. 키보드 화살표: ArrowRight/ArrowDown → 다음, ArrowLeft/ArrowUp → 이전
 * 3. 모바일 스와이프: 좌/상 스와이프 → 다음, 우/하 스와이프 → 이전
 */
export function PageTransition({
    nextPage,
    prevPage,
    enableWheel = true,
    enableKeyboard = true,
    enableSwipe = true,
    threshold = 50,
    isFullScreenPage = false,
}: PageTransitionProps) {
    const router = useRouter();
    const scrollAccumulator = useRef(0);
    const lastScrollTime = useRef(Date.now());
    const isReady = useRef(false);
    const touchStartY = useRef(0);
    const touchStartX = useRef(0);

    const navigate = useCallback((direction: 'next' | 'prev') => {
        const target = direction === 'next' ? nextPage : prevPage;
        if (target) router.push(target);
    }, [nextPage, prevPage, router]);

    // ─── Wheel Navigation ────────────────────────────────────────
    useEffect(() => {
        if (!enableWheel) return;

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now();
            if (now - lastScrollTime.current > 200) {
                scrollAccumulator.current = 0;
                isReady.current = false;
            }
            lastScrollTime.current = now;

            let atBottom = isFullScreenPage;
            if (!isFullScreenPage) {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;
                atBottom = scrollTop + clientHeight >= scrollHeight - 10;
            }

            if (atBottom && e.deltaY > 0 && nextPage) {
                scrollAccumulator.current += Math.abs(e.deltaY);
                if (scrollAccumulator.current >= threshold) {
                    if (!isReady.current) {
                        isReady.current = true;
                        scrollAccumulator.current = 0;
                        setTimeout(() => { isReady.current = false; }, 3000);
                    } else {
                        navigate('next');
                        scrollAccumulator.current = 0;
                        isReady.current = false;
                    }
                }
            } else if (e.deltaY < 0 && !isReady.current) {
                scrollAccumulator.current = 0;
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [enableWheel, nextPage, threshold, isFullScreenPage, navigate]);

    // ─── Keyboard Navigation ─────────────────────────────────────
    useEffect(() => {
        if (!enableKeyboard) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // 입력 필드에서는 무시
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    navigate('next');
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    navigate('prev');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enableKeyboard, navigate]);

    // ─── Swipe Navigation ────────────────────────────────────────
    useEffect(() => {
        if (!enableSwipe) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const deltaY = touchStartY.current - e.changedTouches[0].clientY;
            const deltaX = touchStartX.current - e.changedTouches[0].clientX;
            const minSwipe = 80;

            // 세로 스와이프 우선
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipe) {
                if (deltaY > 0) navigate('next');  // 위로 스와이프 → 다음
                else navigate('prev');              // 아래로 스와이프 → 이전
            }
            // 가로 스와이프
            else if (Math.abs(deltaX) > minSwipe) {
                if (deltaX > 0) navigate('next');   // 왼쪽 스와이프 → 다음
                else navigate('prev');               // 오른쪽 스와이프 → 이전
            }
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [enableSwipe, navigate]);

    // 렌더링 없음 (로직만 제공)
    return null;
}
