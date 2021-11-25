import { useRef, useCallback } from 'react';
import { useWillUnMount } from '../useWillUnMount';

export function useUnMountedState() {
    const unMountRef = useRef(false);

    useWillUnMount(() => (unMountRef.current = true));

    const getIsUnMount = useCallback(() => unMountRef.current, []);

    return { getIsUnMount };
}
