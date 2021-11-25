import { useEffect, DependencyList } from 'react';
import { useLiveRef } from '../useLiveRef';

export function useInterval(
    fn: () => any,
    delay?: number | null,
    immediately = false,
    deps: DependencyList = [],
) {
    const liveFnRef = useLiveRef(fn);

    useEffect(() => {
        if (delay === null) return;

        immediately && liveFnRef.current();

        const interval = setInterval(() => liveFnRef.current(), delay || 0);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay, immediately, liveFnRef, ...deps]);
}
