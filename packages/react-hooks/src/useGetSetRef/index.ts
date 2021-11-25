import { useRef, useCallback } from 'react';
import { isFunction } from '../utils/base';

interface Getter<T> {
    (): T;
}

interface Setter<T> {
    (value: T | ((prevValue: T) => T)): T;
}

function useGetSetRef<T>(initialValue: T): [Getter<T>, Setter<T>];
function useGetSetRef<T = undefined>(): [Getter<T | undefined>, Setter<T | undefined>];
function useGetSetRef<T>(initialValue?: T) {
    const ref = useRef(initialValue);

    const get: Getter<T | undefined> = useCallback(() => ref.current, []);
    const set: Setter<T | undefined> = useCallback(
        value => (ref.current = isFunction(value) ? value(ref.current) : value),
        [],
    );

    return [get, set];
}

export { useGetSetRef };
