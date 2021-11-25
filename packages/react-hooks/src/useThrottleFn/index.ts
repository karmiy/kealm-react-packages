import { useRef, useCallback } from 'react';
import { useLiveRef } from '../useLiveRef';

export function useThrottleFn<T extends (...args: any[]) => any>(fn: T, delay = 500) {
    const timer = useRef<number | null>(null);
    const ref = useLiveRef(fn);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timer.current) return;

            timer.current = setTimeout(() => {
                timer.current = null;
            }, delay);
            return ref.current(...args) as ReturnType<T>;
        },
        [ref, delay],
    );
}
