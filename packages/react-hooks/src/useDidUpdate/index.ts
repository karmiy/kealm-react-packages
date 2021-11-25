import { useRef, useLayoutEffect, useEffect, DependencyList } from 'react';

export function useDidUpdate(fn: () => any, deps?: DependencyList, async = true) {
    const mounted = useRef(true);
    (async ? useEffect : useLayoutEffect)(() => {
        if (mounted.current) {
            mounted.current = false;
        } else {
            return fn?.();
        }
    }, deps);
}
