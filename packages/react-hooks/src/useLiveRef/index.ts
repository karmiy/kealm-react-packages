import { useEffect, useRef } from 'react';

export function useLiveRef<T>(state: T, async = false) {
    const ref = useRef(state);
    if (!async) ref.current = state;

    useEffect(() => {
        if (!async) return;

        ref.current = state;
    }, [state, async]);

    return ref;
}
