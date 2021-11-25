import { useRef, useCallback } from 'react';

export function useTimeoutFn() {
    const timersRef = useRef<Record<string, number>>({});

    const clearTimer = useCallback((key: string) => {
        clearTimeout(timersRef.current[key]);
        delete timersRef.current[key];
    }, []);

    const setTimer = useCallback((key: string, handler: Function, duration = 0) => {
        timersRef.current[key] = setTimeout(() => {
            handler();
            delete timersRef.current[key];
        }, duration);
    }, []);

    const hasTimer = useCallback((key: string) => !!timersRef.current[key], []);

    return { setTimer, clearTimer, hasTimer };
}
