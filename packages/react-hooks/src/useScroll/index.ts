import { useState, useEffect, useCallback } from 'react';
import { useDidMount } from '../useDidMount';
import { useLiveRef } from '../useLiveRef';
import { useThrottleFn } from '../useThrottleFn';
import { emptyObj } from '../utils/base';
import { ResolvableTarget, TargetElement, getTargetElement, on, off } from '../utils/dom';

interface Position {
    left: number;
    top: number;
}

interface Options {
    target?: ResolvableTarget<Window | Document | HTMLElement>;
    handler?: (e: Event) => void;
    scrollEventThrottle?: number;
}

export function useScroll(options: Options = emptyObj) {
    const { target, handler, scrollEventThrottle = 0 } = options;
    const scrollHandlerRef = useLiveRef(handler);
    const [position, setPosition] = useState<Position>({
        left: NaN,
        top: NaN,
    });

    const updatePosition = useCallback((currentTarget: TargetElement) => {
        if (currentTarget === window || currentTarget === document) {
            if (!document.scrollingElement) return;

            setPosition({
                left: document.scrollingElement.scrollLeft,
                top: document.scrollingElement.scrollTop,
            });
            return;
        }
        setPosition({
            left: (currentTarget as HTMLElement).scrollLeft,
            top: (currentTarget as HTMLElement).scrollTop,
        });
    }, []);

    const onScroll = useCallback(
        (e: Event) => {
            const currentTarget = e.target;
            updatePosition(currentTarget as TargetElement);
            scrollHandlerRef.current?.(e);
        },
        [scrollHandlerRef, updatePosition],
    );

    const onScrollThrottle = useThrottleFn(onScroll, scrollEventThrottle);

    useDidMount(() => {
        const el = getTargetElement(target, window);
        if (!el) return;

        // 初始立即更新
        updatePosition(el);
    });

    useEffect(() => {
        const el = getTargetElement(target, window);
        if (!el) return;

        const listener = scrollEventThrottle ? onScrollThrottle : onScroll;

        on(el, 'scroll', listener);

        return () => off(el, 'scroll', listener);
    }, [target, updatePosition, scrollHandlerRef, scrollEventThrottle, onScrollThrottle, onScroll]);

    return position;
}
