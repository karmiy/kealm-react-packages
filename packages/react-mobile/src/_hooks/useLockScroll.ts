import { useEffect, useRef } from 'react';
import { globalConfig } from '../config';

export function useLockScroll(visible: boolean, enabled = true) {
    const ref = useRef<Function | null>(null);

    useEffect(() => {
        if (!enabled) return;

        if (visible) {
            ref.current = globalConfig.lockScroll();
            return;
        }

        ref.current?.();
        ref.current = null;
    }, [visible, enabled]);
}
