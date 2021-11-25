import { useRef, useEffect, MutableRefObject } from 'react';

export function useEnsuredForwardedRef<T>(forwardedRef: MutableRefObject<T>): MutableRefObject<T> {
    const ensuredRef = useRef(forwardedRef?.current);

    useEffect(() => {
        if (!forwardedRef) {
            return;
        }
        forwardedRef.current = ensuredRef.current;
    }, [forwardedRef]);

    return ensuredRef;
}
