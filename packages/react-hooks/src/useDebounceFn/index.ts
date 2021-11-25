import { useRef, useCallback } from 'react';
import { useLiveRef } from '../useLiveRef';

export function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay = 500) {
    const timer = useRef<number>(0);
    const ref = useLiveRef(fn);

    return useCallback(
        (...args: Parameters<T>) => {
            clearTimeout(timer.current);

            timer.current = setTimeout(() => {
                ref.current(...args);
            }, delay);
        },
        [ref, delay],
    );
}
