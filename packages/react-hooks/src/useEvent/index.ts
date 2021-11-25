import { useEffect } from 'react';
import { useLiveRef } from '../useLiveRef';
import { emptyObj } from '../utils/base';
import { ResolvableTarget, TargetElement, getTargetElement, on, off } from '../utils/dom';

interface Options<T extends TargetElement> {
    target?: ResolvableTarget<T>;
    once?: boolean;
    passive?: boolean;
    capture?: boolean;
}

/* 函数重载 */
function useEvent<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => any,
    options?: Options<Window>,
): void;
function useEvent<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => any,
    options?: Options<Document>,
): void;
function useEvent<K extends keyof ElementEventMap>(
    eventName: K,
    handler: (event: ElementEventMap[K]) => any,
    options?: Options<Element>,
): void;
function useEvent<K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => any,
    options?: Options<HTMLElement>,
): void;
function useEvent(eventName, handler, options = emptyObj) {
    const handlerRef = useLiveRef(handler);
    const { target, once, passive, capture } = options;

    useEffect(() => {
        const el = getTargetElement(target, window);

        if (!el) return;

        const listener = (e: Event) => handlerRef.current(e);

        on(el, eventName, listener, {
            once,
            passive,
            capture,
        });

        return () =>
            off(el, eventName, listener, {
                capture,
            });
    }, [handlerRef, target, once, passive, capture, eventName]);
}

export { useEvent };
