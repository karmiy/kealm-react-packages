import { useLayoutEffect, useEffect } from 'react';
import { useLiveRef } from '../useLiveRef';

export function useWillUnMount(fn: () => any, async = true) {
    const ref = useLiveRef(fn);
    (async ? useEffect : useLayoutEffect)(() => ref.current, []);
}
