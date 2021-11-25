import { useRef } from 'react';
import { useLiveRef } from '../useLiveRef';

export function usePersistFn<T extends (...args: any[]) => any>(fn: T) {
    const fnRef = useLiveRef(fn);

    const persistFnRef = useRef((...params: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...params);
    });

    return persistFnRef.current;
}
